import bcrypt from "bcryptjs";
import { prisma } from "../config/prisma.js";

async function main() {
  const password = await bcrypt.hash("Archinepal@123", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@archinepal.com" },
    update: {},
    create: {
      name: "ARCHINEPAL Admin",
      email: "admin@archinepal.com",
      password,
      role: "super_admin",
      isEmailVerified: true,
      profile: {
        create: {
          specialization: "Platform Operations",
          softwareSkills: ["Prisma", "PostgreSQL", "Redis"],
          portfolioVisibility: false
        }
      }
    }
  });

  await prisma.firm.upsert({
    where: { slug: "studio-sthapatya" },
    update: {},
    create: {
      name: "Studio Sthapatya",
      slug: "studio-sthapatya",
      description: "A Nepal-focused architecture studio balancing craft, climate, and contemporary urban life.",
      location: "Lalitpur",
      services: ["Architecture", "Interiors", "Conservation"],
      employeeCount: 24,
      foundedYear: 2021,
      ownerId: admin.id
    }
  });
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  });
