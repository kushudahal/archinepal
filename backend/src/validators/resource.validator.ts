import { EmploymentType, EventType, ProjectCategory, ProjectStatus } from "@prisma/client";
import { z } from "zod";

export const idParamSchema = z.object({ params: z.object({ id: z.string().uuid() }) });
export const slugParamSchema = z.object({ params: z.object({ slug: z.string().min(2) }) });

export const projectQuerySchema = z.object({
  query: z.object({
    page: z.coerce.number().optional(),
    limit: z.coerce.number().optional(),
    search: z.string().optional(),
    category: z.nativeEnum(ProjectCategory).optional(),
    location: z.string().optional(),
    software: z.string().optional(),
    sort: z.enum(["createdAt", "views", "likesCount", "title"]).optional(),
    order: z.enum(["asc", "desc"]).optional()
  })
});

export const projectCreateSchema = z.object({
  body: z.object({
    title: z.string().min(3).max(180),
    description: z.string().min(20),
    category: z.nativeEnum(ProjectCategory),
    location: z.string().min(2),
    softwareUsed: z.array(z.string()).default([]),
    coverImage: z.string().url(),
    galleryImages: z.array(z.string().url()).default([]),
    projectYear: z.number().int().min(1900).max(2100).optional(),
    status: z.nativeEnum(ProjectStatus).optional(),
    firmId: z.string().uuid().optional(),
    tags: z.array(z.string()).default([])
  })
});

export const firmCreateSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(180),
    description: z.string().min(20),
    logo: z.string().url().optional(),
    banner: z.string().url().optional(),
    services: z.array(z.string()).default([]),
    location: z.string().min(2),
    website: z.string().url().optional(),
    employeeCount: z.number().int().positive().optional(),
    foundedYear: z.number().int().min(1800).max(2100).optional()
  })
});

export const jobCreateSchema = z.object({
  body: z.object({
    title: z.string().min(2).max(180),
    description: z.string().min(20),
    company: z.string().min(2),
    location: z.string().min(2),
    employmentType: z.nativeEnum(EmploymentType),
    salaryRange: z.string().optional(),
    requirements: z.array(z.string()).default([]),
    deadline: z.coerce.date().optional()
  })
});

export const articleCreateSchema = z.object({
  body: z.object({
    title: z.string().min(3).max(220),
    content: z.string().min(100),
    coverImage: z.string().url().optional(),
    category: z.string().min(2),
    tags: z.array(z.string()).default([]),
    publishedAt: z.coerce.date().optional()
  })
});

export const eventCreateSchema = z.object({
  body: z.object({
    title: z.string().min(3).max(220),
    description: z.string().min(20),
    banner: z.string().url().optional(),
    location: z.string().min(2),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    eventType: z.nativeEnum(EventType)
  })
});

export const commentCreateSchema = z.object({
  body: z.object({
    content: z.string().min(1).max(1000)
  })
});

export const userUpdateSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(120).optional(),
    avatar: z.string().url().optional(),
    bio: z.string().max(500).optional(),
    location: z.string().optional(),
    website: z.string().url().optional(),
    profile: z.object({
      specialization: z.string().optional(),
      experienceYears: z.number().int().min(0).optional(),
      softwareSkills: z.array(z.string()).optional(),
      education: z.unknown().optional(),
      certifications: z.array(z.string()).optional(),
      socialLinks: z.unknown().optional(),
      portfolioVisibility: z.boolean().optional()
    }).optional()
  })
});
