import { prisma } from "../../config/prisma.js";
import { ApiError } from "../../utils/http.js";
import { getPagination } from "../../utils/pagination.js";
import { slugify } from "../../utils/slug.js";

export async function listArticles(query: Record<string, unknown>) {
  const pagination = getPagination(query);
  const where = {
    category: query.category ? String(query.category) : undefined,
    OR: query.search ? [{ title: { contains: String(query.search), mode: "insensitive" as const } }, { tags: { has: String(query.search) } }] : undefined
  };
  const [items, total] = await Promise.all([
    prisma.article.findMany({ where, skip: pagination.skip, take: pagination.take, orderBy: { publishedAt: "desc" }, include: { author: { select: { id: true, name: true, avatar: true } } } }),
    prisma.article.count({ where })
  ]);
  return { items, meta: { page: pagination.page, limit: pagination.limit, total } };
}

export async function createArticle(authorId: string, input: { title: string; [key: string]: unknown }) {
  return prisma.article.create({ data: { ...input, authorId, slug: await uniqueArticleSlug(input.title) } as never });
}

export async function getArticle(slug: string) {
  const article = await prisma.article.findUnique({ where: { slug }, include: { author: { select: { id: true, name: true, avatar: true } } } });
  if (!article) throw new ApiError(404, "Article not found.", "ARTICLE_NOT_FOUND");
  return article;
}

async function uniqueArticleSlug(title: string) {
  const base = slugify(title);
  let slug = base;
  let index = 1;
  while (await prisma.article.findUnique({ where: { slug } })) slug = `${base}-${index++}`;
  return slug;
}
