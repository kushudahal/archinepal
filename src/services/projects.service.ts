import { projects as mockProjects } from "@/data/mock";
import { apiFetch, Paginated } from "@/lib/api";
import type { Project } from "@/types";
import { adaptProject } from "./adapters";

type ProjectQuery = {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  location?: string;
  software?: string;
  sort?: "createdAt" | "views" | "likesCount" | "title";
  order?: "asc" | "desc";
};

export async function listProjects(query?: ProjectQuery): Promise<Project[]> {
  try {
    const result = await apiFetch<Paginated<any>>("/projects", { query, next: { revalidate: 60 } });
    return result.items.length ? result.items.map(adaptProject) : mockProjects;
  } catch {
    return mockProjects;
  }
}

export async function getProject(slug: string): Promise<Project | null> {
  try {
    return adaptProject(await apiFetch<any>(`/projects/${slug}`, { next: { revalidate: 60 } }));
  } catch {
    return mockProjects.find((project) => project.id === slug) ?? null;
  }
}

export type ProjectCreateInput = {
  title: string;
  description: string;
  category: string;
  location: string;
  softwareUsed: string[];
  coverImage: string;
  galleryImages: string[];
  projectYear?: number;
  status?: "draft" | "pending_review";
  tags: string[];
};

export async function createProject(input: ProjectCreateInput): Promise<Project> {
  return adaptProject(await apiFetch<any>("/projects", { method: "POST", body: JSON.stringify(input) }));
}
