import { NotificationType, Prisma } from "@prisma/client";
import { prisma } from "../../config/prisma.js";
import { emitToUser } from "../../sockets/index.js";

export async function createNotification(recipientId: string, type: NotificationType, message: string, metadata?: Prisma.InputJsonValue) {
  const notification = await prisma.notification.create({
    data: { recipientId, type, message, metadata }
  });
  emitToUser(recipientId, "notification:new", notification);
  return notification;
}

export async function listNotifications(recipientId: string) {
  return prisma.notification.findMany({
    where: { recipientId },
    orderBy: { createdAt: "desc" },
    take: 50
  });
}

export async function markRead(recipientId: string, id: string) {
  return prisma.notification.updateMany({
    where: { id, recipientId },
    data: { isRead: true }
  });
}
