import { prisma } from "../../config/prisma.js";
import { ApiError } from "../../utils/http.js";
import { getPagination } from "../../utils/pagination.js";

export async function listJobs(query: Record<string, unknown>) {
  const pagination = getPagination(query);
  const where = {
    location: query.location ? { contains: String(query.location), mode: "insensitive" as const } : undefined,
    employmentType: query.employmentType as never,
    OR: query.search ? [{ title: { contains: String(query.search), mode: "insensitive" as const } }, { company: { contains: String(query.search), mode: "insensitive" as const } }] : undefined
  };
  const [items, total] = await Promise.all([
    prisma.job.findMany({ where, skip: pagination.skip, take: pagination.take, orderBy: { createdAt: "desc" } }),
    prisma.job.count({ where })
  ]);
  return { items, meta: { page: pagination.page, limit: pagination.limit, total } };
}

export async function createJob(createdBy: string, input: Record<string, unknown>) {
  return prisma.job.create({ data: { ...input, createdBy } as never });
}

export async function getJob(id: string) {
  const job = await prisma.job.findUnique({ where: { id }, include: { creator: { select: { id: true, name: true, avatar: true } } } });
  if (!job) throw new ApiError(404, "Job not found.", "JOB_NOT_FOUND");
  return job;
}
