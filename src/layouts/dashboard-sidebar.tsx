"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Bookmark, ChartNoAxesCombined, FolderKanban, Settings, Upload, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const items: { label: string; href: string; icon: LucideIcon }[] = [
  { label: "Overview", href: "/dashboard", icon: ChartNoAxesCombined },
  { label: "Projects", href: "/dashboard/projects", icon: FolderKanban },
  { label: "Upload", href: "/dashboard/upload", icon: Upload },
  { label: "Analytics", href: "/dashboard/analytics", icon: ChartNoAxesCombined },
  { label: "Bookmarks", href: "/dashboard/bookmarks", icon: Bookmark },
  { label: "Followers", href: "/dashboard/followers", icon: Users },
  { label: "Notifications", href: "/dashboard/notifications", icon: Bell },
  { label: "Settings", href: "/dashboard/settings", icon: Settings }
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="rounded-xl bg-charcoal p-4 text-white">
      <div className="mb-6 text-sm font-semibold tracking-[0.2em]">ARCHINEPAL</div>
      <nav className="grid gap-1">
        {items.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-white/68 transition hover:bg-white/10 hover:text-white",
              pathname === href && "bg-white/12 text-white"
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
