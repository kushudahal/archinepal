import { apiFetch } from "@/lib/api";
import type { Firm, Professional, Project } from "@/types";
import { adaptFirm, adaptProject, adaptUser } from "./adapters";

export type SearchResults = {
  projects: Project[];
  firms: Firm[];
  users: Professional[];
};

export async function search(q: string): Promise<SearchResults> {
  const result = await apiFetch<any>("/search", { query: { q }, next: { revalidate: 30 } });
  return {
    projects: result.projects?.map(adaptProject) ?? [],
    firms: result.firms?.map(adaptFirm) ?? [],
    users: result.users?.map(adaptUser) ?? []
  };
}

export async function autocomplete(q: string): Promise<{ label: string; value: string; type: string }[]> {
  return apiFetch("/search/autocomplete", { query: { q }, next: { revalidate: 30 } });
}
