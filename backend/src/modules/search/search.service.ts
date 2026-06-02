import { prisma } from "../../config/prisma.js";
import { redis } from "../../config/redis.js";

export async function search(query: Record<string, unknown>, userId?: string) {
  const q = String(query.q ?? "").trim();
  const cacheKey = `search:${JSON.stringify(query)}`;
  const cached = await redis.get(cacheKey).catch(() => null);
  if (cached) return JSON.parse(cached);

  await prisma.searchLog.create({ data: { query: q, userId, filters: query as never } }).catch(() => undefined);

  const [projects, firms, users] = await Promise.all([
    prisma.project.findMany({
      where: {
        status: "published",
        OR: [
          { title: { contains: q, mode: "insensitive" } },
          { location: { contains: q, mode: "insensitive" } },
          { tags: { has: q } },
          { softwareUsed: { has: q } }
        ]
      },
      take: 8
    }),
    prisma.firm.findMany({
      where: { OR: [{ name: { contains: q, mode: "insensitive" } }, { location: { contains: q, mode: "insensitive" } }, { services: { has: q } }] },
      take: 6
    }),
    prisma.user.findMany({
      where: { OR: [{ name: { contains: q, mode: "insensitive" } }, { location: { contains: q, mode: "insensitive" } }] },
      select: { id: true, name: true, role: true, avatar: true, location: true },
      take: 6
    })
  ]);

  const result = { projects, firms, users };
  await redis.set(cacheKey, JSON.stringify(result), "EX", 60).catch(() => undefined);
  return result;
}

export async function autocomplete(q: string) {
  const projects = await prisma.project.findMany({
    where: { title: { contains: q, mode: "insensitive" }, status: "published" },
    select: { title: true, slug: true },
    take: 8
  });
  return projects.map((project) => ({ label: project.title, value: project.slug, type: "project" }));
}

export async function trendingSearches() {
  return prisma.searchLog.groupBy({
    by: ["query"],
    _count: { query: true },
    orderBy: { _count: { query: "desc" } },
    take: 10
  });
}
