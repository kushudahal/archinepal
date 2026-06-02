import { prisma } from "../../config/prisma.js";
import { ApiError } from "../../utils/http.js";
import { publicUserSelect } from "../auth/auth.service.js";

export async function getMe(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
    select: { ...publicUserSelect, profile: true }
  });
}

export async function updateMe(userId: string, input: Record<string, unknown>) {
  const { profile, ...userData } = input as { profile?: Record<string, unknown> };
  return prisma.user.update({
    where: { id: userId },
    data: {
      ...userData,
      profile: profile
        ? {
            upsert: {
              create: profile,
              update: profile
            }
          }
        : undefined
    },
    select: { ...publicUserSelect, profile: true }
  });
}

export async function getPublicUser(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    select: { ...publicUserSelect, profile: true, projects: { where: { status: "published" }, take: 12 } }
  });
  if (!user) throw new ApiError(404, "User not found.", "USER_NOT_FOUND");
  return user;
}

export async function getDashboard(userId: string) {
  const [user, projects, projectAggregate, bookmarkCount, notificationCount, notifications] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId }, select: { ...publicUserSelect, profile: true } }),
    prisma.project.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      take: 6,
      include: { firm: true }
    }),
    prisma.project.aggregate({
      where: { userId },
      _sum: { views: true, likesCount: true },
      _count: { id: true }
    }),
    prisma.bookmark.count({ where: { userId } }),
    prisma.notification.count({ where: { recipientId: userId, isRead: false } }),
    prisma.notification.findMany({
      where: { recipientId: userId },
      orderBy: { createdAt: "desc" },
      take: 5
    })
  ]);

  if (!user) throw new ApiError(404, "User not found.", "USER_NOT_FOUND");

  return {
    user,
    stats: {
      profileViews: projectAggregate._sum.views ?? 0,
      projectLikes: projectAggregate._sum.likesCount ?? 0,
      bookmarks: bookmarkCount,
      followers: 0,
      projects: projectAggregate._count.id,
      unreadNotifications: notificationCount
    },
    projects,
    notifications,
    chart: projects.slice(0, 8).map((project) => ({
      label: project.title,
      views: project.views,
      likes: project.likesCount
    }))
  };
}
