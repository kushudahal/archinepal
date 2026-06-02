import { Prisma } from "@prisma/client";
import { prisma } from "../config/prisma.js";

export const projectRepository = {
  findMany(args: Prisma.ProjectFindManyArgs) {
    return prisma.project.findMany(args);
  },
  count(where: Prisma.ProjectWhereInput) {
    return prisma.project.count({ where });
  },
  findBySlug(slug: string) {
    return prisma.project.findUnique({
      where: { slug },
      include: { user: { select: { id: true, name: true, avatar: true, role: true } }, firm: true, comments: { include: { user: { select: { id: true, name: true, avatar: true } } } } }
    });
  }
};
