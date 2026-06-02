import { Prisma, ProjectCategory } from "@prisma/client";
import { prisma } from "../../config/prisma.js";
import { projectRepository } from "../../repositories/project.repository.js";
import { ApiError } from "../../utils/http.js";
import { getPagination } from "../../utils/pagination.js";
import { slugify } from "../../utils/slug.js";
import { createNotification } from "../notifications/notification.service.js";

export async function listProjects(query: Record<string, unknown>) {
  const pagination = getPagination(query);
  const where: Prisma.ProjectWhereInput = {
    status: "published",
    category: query.category as ProjectCategory | undefined,
    location: query.location ? { contains: String(query.location), mode: "insensitive" } : undefined,
    OR: query.search
      ? [
          { title: { contains: String(query.search), mode: "insensitive" } },
          { description: { contains: String(query.search), mode: "insensitive" } },
          { tags: { has: String(query.search) } },
          { user: { name: { contains: String(query.search), mode: "insensitive" } } },
          { firm: { name: { contains: String(query.search), mode: "insensitive" } } }
        ]
      : undefined,
    softwareUsed: query.software ? { has: String(query.software) } : undefined
  };

  const [items, total] = await Promise.all([
    projectRepository.findMany({
      where,
      skip: pagination.skip,
      take: pagination.take,
      orderBy: { [pagination.sort ?? "createdAt"]: pagination.order },
      include: { user: { select: { id: true, name: true, avatar: true } }, firm: true }
    }),
    projectRepository.count(where)
  ]);

  return { items, meta: { page: pagination.page, limit: pagination.limit, total } };
}

export async function getProject(slug: string) {
  const project = await projectRepository.findBySlug(slug);
  if (!project) throw new ApiError(404, "Project not found.", "PROJECT_NOT_FOUND");
  await prisma.project.update({ where: { id: project.id }, data: { views: { increment: 1 } } });
  return project;
}

export async function createProject(userId: string, input: Prisma.ProjectUncheckedCreateInput) {
  return prisma.project.create({
    data: {
      ...input,
      userId,
      slug: await uniqueProjectSlug(input.title)
    }
  });
}

export async function updateProject(userId: string, id: string, input: Prisma.ProjectUpdateInput) {
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) throw new ApiError(404, "Project not found.", "PROJECT_NOT_FOUND");
  if (project.userId !== userId) throw new ApiError(403, "Only the owner can update this project.", "FORBIDDEN");
  return prisma.project.update({ where: { id }, data: input });
}

export async function deleteProject(userId: string, id: string) {
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) throw new ApiError(404, "Project not found.", "PROJECT_NOT_FOUND");
  if (project.userId !== userId) throw new ApiError(403, "Only the owner can delete this project.", "FORBIDDEN");
  await prisma.project.delete({ where: { id } });
}

export async function likeProject(userId: string, projectId: string) {
  const project = await prisma.project.findUnique({ where: { id: projectId } });
  if (!project) throw new ApiError(404, "Project not found.", "PROJECT_NOT_FOUND");
  const existing = await prisma.like.findUnique({ where: { userId_projectId: { userId, projectId } } });
  if (existing) return existing;
  const like = await prisma.$transaction(async (tx) => {
    const created = await tx.like.create({ data: { userId, projectId } });
    await tx.project.update({ where: { id: projectId }, data: { likesCount: { increment: 1 } } });
    return created;
  });
  if (project.userId !== userId) await createNotification(project.userId, "like", "Someone liked your project.", { projectId });
  return like;
}

export async function commentOnProject(userId: string, projectId: string, content: string) {
  const project = await prisma.project.findUnique({ where: { id: projectId } });
  if (!project) throw new ApiError(404, "Project not found.", "PROJECT_NOT_FOUND");
  const comment = await prisma.comment.create({ data: { userId, projectId, content } });
  if (project.userId !== userId) await createNotification(project.userId, "comment", "Someone commented on your project.", { projectId, commentId: comment.id });
  return comment;
}

async function uniqueProjectSlug(title: string) {
  const base = slugify(title);
  let slug = base;
  let index = 1;
  while (await prisma.project.findUnique({ where: { slug } })) {
    slug = `${base}-${index++}`;
  }
  return slug;
}
