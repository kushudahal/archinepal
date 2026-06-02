import { events as mockEvents } from "@/data/mock";
import { apiFetch, Paginated } from "@/lib/api";
import type { Event } from "@/types";
import { adaptEvent } from "./adapters";

export async function listEvents(query?: { page?: number; limit?: number; location?: string; eventType?: string }): Promise<Event[]> {
  try {
    const result = await apiFetch<Paginated<any>>("/events", { query, next: { revalidate: 60 } });
    return result.items.length ? result.items.map(adaptEvent) : mockEvents;
  } catch {
    return mockEvents;
  }
}
