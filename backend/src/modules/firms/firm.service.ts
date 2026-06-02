import { prisma } from "../../config/prisma.js";
import { ApiError } from "../../utils/http.js";
import { getPagination } from "../../utils/pagination.js";
import { slugify } from "../../utils/slug.js";

export async function listFirms(query: Record<string, unknown>) {
  const pagination = getPagination(query);
  const where = {
    location: query.location ? { contains: String(query.location), mode: "insensitive" as const } : undefined,
    services: query.service ? { has: String(query.service) } : undefined,
    OR: query.search ? [{ name: { contains: String(query.search), mode: "insensitive" as const } }, { description: { contains: String(query.search), mode: "insensitive" as const } }] : undefined
  };
  const [items, total] = await Promise.all([
    prisma.firm.findMany({ where, skip: pagination.skip, take: pagination.take, orderBy: { createdAt: "desc" }, include: { owner: { select: { id: true, name: true, avatar: true } } } }),
    prisma.firm.count({ where })
  ]);
  return { items, meta: { page: pagination.page, limit: pagination.limit, total } };
}

export async function createFirm(ownerId: string, input: { name: string; [key: string]: unknown }) {
  return prisma.firm.create({
    data: { ...input, ownerId, slug: await uniqueFirmSlug(input.name) } as never
  });
}

export async function getFirm(slug: string) {
  const firm = await prisma.firm.findUnique({
    where: { slug },
    include: { owner: { select: { id: true, name: true, avatar: true } }, projects: { where: { status: "published" }, take: 12 } }
  });
  if (!firm) throw new ApiError(404, "Firm not found.", "FIRM_NOT_FOUND");
  return firm;
}

async function uniqueFirmSlug(name: string) {
  const base = slugify(name);
  let slug = base;
  let index = 1;
  while (await prisma.firm.findUnique({ where: { slug } })) slug = `${base}-${index++}`;
  return slug;
}
