import { jobs as mockJobs } from "@/data/mock";
import { apiFetch, Paginated } from "@/lib/api";
import type { Job } from "@/types";
import { adaptJob } from "./adapters";

export async function listJobs(query?: { page?: number; limit?: number; search?: string; location?: string; employmentType?: string }): Promise<Job[]> {
  try {
    const result = await apiFetch<Paginated<any>>("/jobs", { query, next: { revalidate: 60 } });
    return result.items.length ? result.items.map(adaptJob) : mockJobs;
  } catch {
    return mockJobs;
  }
}
