import { firms as mockFirms } from "@/data/mock";
import { apiFetch, Paginated } from "@/lib/api";
import type { Firm } from "@/types";
import { adaptFirm, adaptProject } from "./adapters";

export async function listFirms(query?: { page?: number; limit?: number; search?: string; location?: string; service?: string }): Promise<Firm[]> {
  try {
    const result = await apiFetch<Paginated<any>>("/firms", { query, next: { revalidate: 60 } });
    return result.items.length ? result.items.map(adaptFirm) : mockFirms;
  } catch {
    return mockFirms;
  }
}

export async function getFirm(slug: string): Promise<(Firm & { projects?: ReturnType<typeof adaptProject>[] }) | null> {
  try {
    const item = await apiFetch<any>(`/firms/${slug}`, { next: { revalidate: 60 } });
    return { ...adaptFirm(item), projects: item.projects?.map(adaptProject) ?? [] };
  } catch {
    return mockFirms.find((firm) => firm.id === slug) ?? null;
  }
}
