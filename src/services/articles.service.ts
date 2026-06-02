import { articles as mockArticles } from "@/data/mock";
import { apiFetch, Paginated } from "@/lib/api";
import type { Article } from "@/types";
import { adaptArticle } from "./adapters";

export async function listArticles(query?: { page?: number; limit?: number; search?: string; category?: string }): Promise<Article[]> {
  try {
    const result = await apiFetch<Paginated<any>>("/articles", { query, next: { revalidate: 60 } });
    return result.items.length ? result.items.map(adaptArticle) : mockArticles;
  } catch {
    return mockArticles;
  }
}
