import { prisma } from "../config/prisma.js";
import { createNotification } from "../modules/notifications/notification.service.js";

export async function enqueueEventReminders() {
  const soon = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const events = await prisma.event.findMany({ where: { startDate: { lte: soon, gte: new Date() } }, take: 50 });
  await Promise.all(
    events.map((event) =>
      createNotification(event.organizerId, "event_reminder", `Reminder: ${event.title} starts soon.`, { eventId: event.id })
    )
  );
}

export async function enqueueJobAlerts() {
  const jobs = await prisma.job.findMany({ orderBy: { createdAt: "desc" }, take: 10 });
  const users = await prisma.user.findMany({ where: { isEmailVerified: true }, take: 100 });
  await Promise.all(
    users.flatMap((user) =>
      jobs.slice(0, 2).map((job) => createNotification(user.id, "job_alert", `New role: ${job.title} at ${job.company}`, { jobId: job.id }))
    )
  );
}
