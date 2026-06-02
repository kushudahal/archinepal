"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { ProjectCard } from "@/components/project-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/auth-context";
import { getDashboardSummary, type DashboardSummary } from "@/services/users.service";

type DashboardSummaryPageProps = {
  title: string;
  eyebrow: string;
  mode: "projects1" | "analytics" | "bookmarks" | "followers" | "notifications" | "settings";
};

export function DashboardSummaryPage({ title, eyebrow, mode }: DashboardSummaryPageProps) {
  const { user, isLoading } = useAuth();
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    getDashboardSummary()
      .then((result) => {
        setSummary(result);
        setError(null);
      })
      .catch((caught: Error) => setError(caught.message));
  }, [user]);

  if (isLoading || (user && !summary && !error)) {
    return (
      <section className="grid min-h-[60vh] place-items-center">
        <Loader2 className="h-6 w-6 animate-spin text-sage" />
      </section>
    );
  }

  if (!user) {
    return (
      <section className="grid min-h-[60vh] place-items-center">
        <Card className="max-w-md">
          <CardContent className="text-center">
            <h1 className="text-2xl font-semibold">Login required</h1>
            <p className="mt-2 text-sm text-muted-foreground">This dashboard page uses your account data.</p>
            <Button asChild className="mt-5">
              <Link href="/login">Login</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="space-y-5">
      <div className="rounded-xl bg-white p-5 shadow-soft">
        <p className="text-sm uppercase tracking-[0.22em] text-sage">{eyebrow}</p>
        <h1 className="mt-2 text-3xl font-semibold">{title}</h1>
      </div>
      {error ? (
        <Card>
          <CardContent>
            <p className="text-sm text-destructive">{error}</p>
          </CardContent>
        </Card>
      ) : null}
      {mode === "projects" ? <ProjectsPanel summary={summary} /> : null}
      {mode === "analytics" ? <AnalyticsPanel summary={summary} /> : null}
      {mode === "bookmarks" ? <MetricPanel label="Saved projects" value={summary?.stats.bookmarks ?? 0} /> : null}
      {mode === "followers" ? <MetricPanel label="Followers" value={summary?.stats.followers ?? 0} /> : null}
      {mode === "notifications" ? <NotificationsPanel summary={summary} /> : null}
      {mode === "settings" ? <SettingsPanel summary={summary} /> : null}
    </section>
  );
}

function ProjectsPanel({ summary }: { summary: DashboardSummary | null }) {
  if (!summary?.projects.length) {
    return (
      <Card>
        <CardContent className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-muted-foreground">No uploaded projects yet.</p>
          <Button asChild>
            <Link href="/dashboard/upload">Upload project</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {summary.projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}

function AnalyticsPanel({ summary }: { summary: DashboardSummary | null }) {
  const max = Math.max(...(summary?.chart.map((entry) => entry.views) ?? [0]), 1);

  return (
    <Card>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-4">
          <Metric label="Project views" value={summary?.stats.profileViews ?? 0} />
          <Metric label="Project likes" value={summary?.stats.projectLikes ?? 0} />
          <Metric label="Projects" value={summary?.stats.projects ?? 0} />
          <Metric label="Unread alerts" value={summary?.stats.unreadNotifications ?? 0} />
        </div>
        <div className="mt-6 flex h-72 items-end gap-3 rounded-xl bg-muted p-5">
          {(summary?.chart.length ? summary.chart : [{ label: "No projects", views: 0, likes: 0 }]).map((item) => (
            <div key={item.label} className="flex flex-1 flex-col items-center gap-2">
              <div className="w-full rounded-t-lg bg-sage" style={{ height: `${Math.max(8, (item.views / max) * 100)}%` }} />
              <span className="line-clamp-1 w-full text-center text-[10px] text-muted-foreground">{item.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function NotificationsPanel({ summary }: { summary: DashboardSummary | null }) {
  return (
    <Card>
      <CardContent className="grid gap-4">
        {summary?.notifications.length ? (
          summary.notifications.map((notification) => (
            <div key={notification.id} className="rounded-lg border p-4">
              <p className="text-sm">{notification.message}</p>
              <p className="mt-1 text-xs text-muted-foreground">{new Date(notification.createdAt).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No notifications yet.</p>
        )}
      </CardContent>
    </Card>
  );
}

function SettingsPanel({ summary }: { summary: DashboardSummary | null }) {
  return (
    <Card>
      <CardContent className="grid gap-3 text-sm">
        <div><span className="text-muted-foreground">Name:</span> {summary?.user.name}</div>
        <div><span className="text-muted-foreground">Email:</span> {summary?.user.email}</div>
        <div><span className="text-muted-foreground">Role:</span> {summary?.user.role}</div>
        <Button asChild className="mt-2 w-fit">
          <Link href={`/profile/${summary?.user.id}`}>View public profile</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

function MetricPanel({ label, value }: { label: string; value: number }) {
  return (
    <Card>
      <CardContent>
        <Metric label={label} value={value} />
      </CardContent>
    </Card>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="text-3xl font-semibold">{new Intl.NumberFormat("en").format(value)}</div>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
