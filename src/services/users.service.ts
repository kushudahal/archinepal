import { professionals as mockProfessionals } from "@/data/mock";
import { apiFetch } from "@/lib/api";
import type { Professional, Project } from "@/types";
import { adaptProject, adaptUser } from "./adapters";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string | null;
  bio?: string | null;
  location?: string | null;
  website?: string | null;
  isEmailVerified?: boolean;
};

export type DashboardSummary = {
  user: AuthUser;
  stats: {
    profileViews: number;
    projectLikes: number;
    bookmarks: number;
    followers: number;
    projects: number;
    unreadNotifications: number;
  };
  projects: Project[];
  notifications: { id: string; message: string; type: string; isRead: boolean; createdAt: string }[];
  chart: { label: string; views: number; likes: number }[];
};

export async function getMe(): Promise<AuthUser | null> {
  try {
    return await apiFetch<AuthUser>("/users/me", { cache: "no-store" });
  } catch {
    return null;
  }
}

export async function updateMe(input: Partial<AuthUser> & { profile?: Record<string, unknown> }): Promise<AuthUser> {
  return apiFetch<AuthUser>("/users/me", { method: "PUT", body: JSON.stringify(input) });
}

export async function getDashboardSummary(): Promise<DashboardSummary> {
  const result = await apiFetch<any>("/users/me/dashboard", { cache: "no-store" });
  return {
    user: result.user,
    stats: result.stats,
    projects: (result.projects ?? []).map(adaptProject),
    notifications: result.notifications ?? [],
    chart: result.chart ?? []
  };
}

export async function getUser(id: string): Promise<Professional | null> {
  try {
    return adaptUser(await apiFetch<any>(`/users/${id}`, { next: { revalidate: 60 } }));
  } catch {
    return mockProfessionals.find((person) => person.id === id) ?? null;
  }
}

export async function listProfessionals(): Promise<Professional[]> {
  return mockProfessionals;
}
