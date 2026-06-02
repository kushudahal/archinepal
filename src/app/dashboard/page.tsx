"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Bell, Bookmark, Eye, Heart, Loader2, Upload, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ProjectCard } from "@/components/project-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/auth-context";
import { getDashboardSummary, type DashboardSummary } from "@/services/users.service";

function formatNumber(value: number) {
  return new Intl.NumberFormat("en", { notation: value >= 10000 ? "compact" : "standard" }).format(value);
}

export default function DashboardPage() {
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

  const stats: [LucideIcon, string, number][] = useMemo(
    () => [
      [Eye, "Project views", summary?.stats.profileViews ?? 0],
      [Heart, "Project likes", summary?.stats.projectLikes ?? 0],
      [Bookmark, "Bookmarks", summary?.stats.bookmarks ?? 0],
      [Users, "Followers", summary?.stats.followers ?? 0]
    ],
    [summary]
  );

  if (isLoading) {
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
            <p className="mt-2 text-sm text-muted-foreground">Your dashboard is connected to your ArchiNepal account.</p>
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
          <div className="flex flex-col gap-4 rounded-xl bg-white p-5 shadow-soft md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-sage">Creator dashboard</p>
              <h1 className="mt-2 text-3xl font-semibold">Good evening, {summary?.user.name ?? user.name}</h1>
            </div>
            <div className="flex gap-2">
              <Button asChild variant="outline" size="icon" aria-label="Notifications">
                <Link href="/dashboard/notifications">
                  <Bell className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild>
                <Link href="/dashboard/upload">
                  <Upload className="h-4 w-4" />
                  Upload project
                </Link>
              </Button>
            </div>
          </div>

          {error ? (
            <Card>
              <CardContent>
                <p className="text-sm text-destructive">{error}</p>
              </CardContent>
            </Card>
          ) : null}

          <div className="grid gap-4 md:grid-cols-4">
            {stats.map(([Icon, label, value]) => (
              <Card key={label}>
                <CardContent>
                  <Icon className="mb-4 h-5 w-5 text-sage" />
                  <div className="text-3xl font-semibold">{formatNumber(value)}</div>
                  <p className="mt-1 text-sm text-muted-foreground">{label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
            <Card>
              <CardContent>
                <h2 className="text-xl font-semibold">Analytics overview</h2>
                <div className="mt-6 flex h-64 items-end gap-3 rounded-xl bg-muted p-5">
                  {(summary?.chart.length ? summary.chart : [{ label: "No projects", views: 0, likes: 0 }]).map((item) => {
                    const max = Math.max(...(summary?.chart.map((entry) => entry.views) ?? [0]), 1);
                    return (
                      <div key={item.label} className="flex flex-1 flex-col items-center gap-2">
                        <div className="w-full rounded-t-lg bg-sage" style={{ height: `${Math.max(8, (item.views / max) * 100)}%` }} />
                        <span className="line-clamp-1 w-full text-center text-[10px] text-muted-foreground">{item.label}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <h2 className="text-xl font-semibold">Recent activity</h2>
                <div className="mt-5 grid gap-4 text-sm text-muted-foreground">
                  {summary?.notifications.length ? (
                    summary.notifications.map((notification) => <p key={notification.id}>{notification.message}</p>)
                  ) : (
                    <p>No account activity yet.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <h2 className="mb-5 text-2xl font-semibold">Uploaded projects</h2>
            {summary?.projects.length ? (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {summary.projects.slice(0, 3).map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <p className="text-sm text-muted-foreground">No uploaded projects yet.</p>
                  <Button asChild>
                    <Link href="/dashboard/upload">Upload project</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </section>
  );
}
