import { ProjectStatus, ReportStatus, Role } from "@prisma/client";
import { prisma } from "../../config/prisma.js";
import { createNotification } from "../notifications/notification.service.js";

export async function overview() {
  const [users, projects, firms, jobs, reports] = await Promise.all([
    prisma.user.count(),
    prisma.project.count(),
    prisma.firm.count(),
    prisma.job.count(),
    prisma.report.count({ where: { status: "open" } })
  ]);
  return { users, projects, firms, jobs, openReports: reports };
}

export async function moderateProject(projectId: string, status: ProjectStatus, actorId: string) {
  const project = await prisma.project.update({ where: { id: projectId }, data: { status } });
  await prisma.auditLog.create({ data: { actorId, action: "project.moderate", entity: "Project", entityId: projectId, metadata: { status } } });
  if (status === "published") await createNotification(project.userId, "project_featured", "Your project has been approved and published.", { projectId });
  return project;
}

export async function updateUserRole(userId: string, role: Role, actorId: string) {
  const user = await prisma.user.update({ where: { id: userId }, data: { role } });
  await prisma.auditLog.create({ data: { actorId, action: "user.role.update", entity: "User", entityId: userId, metadata: { role } } });
  return user;
}

export async function listReports(status?: ReportStatus) {
  return prisma.report.findMany({
    where: { status },
    orderBy: { createdAt: "desc" },
    include: { reporter: { select: { id: true, name: true, email: true } }, project: true }
  });
}
