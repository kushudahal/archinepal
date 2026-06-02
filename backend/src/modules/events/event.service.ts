import { prisma } from "../../config/prisma.js";
import { ApiError } from "../../utils/http.js";
import { getPagination } from "../../utils/pagination.js";

export async function listEvents(query: Record<string, unknown>) {
  const pagination = getPagination(query);
  const where = {
    location: query.location ? { contains: String(query.location), mode: "insensitive" as const } : undefined,
    eventType: query.eventType as never
  };
  const [items, total] = await Promise.all([
    prisma.event.findMany({ where, skip: pagination.skip, take: pagination.take, orderBy: { startDate: "asc" }, include: { organizer: { select: { id: true, name: true, avatar: true } } } }),
    prisma.event.count({ where })
  ]);
  return { items, meta: { page: pagination.page, limit: pagination.limit, total } };
}

export async function createEvent(organizerId: string, input: Record<string, unknown>) {
  return prisma.event.create({ data: { ...input, organizerId } as never });
}

export async function getEvent(id: string) {
  const event = await prisma.event.findUnique({ where: { id }, include: { organizer: { select: { id: true, name: true, avatar: true } } } });
  if (!event) throw new ApiError(404, "Event not found.", "EVENT_NOT_FOUND");
  return event;
}
