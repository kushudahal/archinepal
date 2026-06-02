import type { Article, Event, Firm, Job, Professional, Project, ProjectCategory } from "@/types";

const fallbackImage = "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85";
const fallbackCover = "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=85";

const categoryLabels: Record<string, ProjectCategory> = {
  residential: "Residential",
  commercial: "Commercial",
  interior: "Interior",
  landscape: "Landscape",
  urban: "Urban Design",
  structural: "Structural",
  BIM: "BIM",
  visualization: "Visualization"
};

const roleLabels: Record<string, string> = {
  architect: "Architect",
  civil_engineer: "Civil Engineer",
  interior_designer: "Interior Designer",
  student: "Student",
  firm_owner: "Firm Owner",
  admin: "Admin",
  super_admin: "Super Admin",
  moderator: "Moderator",
  editor: "Editor"
};

function readTime(content?: string) {
  const words = content?.trim().split(/\s+/).filter(Boolean).length ?? 0;
  return `${Math.max(1, Math.ceil(words / 220))} min read`;
}

function employeeSize(count?: number | null) {
  if (!count) return "1-10";
  if (count <= 10) return "1-10";
  if (count <= 30) return "11-30";
  if (count <= 50) return "31-50";
  return "50+";
}

function enumLabel(value?: string) {
  return (value ?? "")
    .split("_")
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase() + part.slice(1))
    .join(" ");
}

export function adaptProject(item: any): Project {
  return {
    id: item.slug ?? item.id,
    title: item.title,
    firm: item.firm?.name ?? "Independent",
    architect: item.user?.name ?? "ARCHINEPAL Creator",
    location: item.location,
    category: categoryLabels[item.category] ?? "Residential",
    tags: item.tags ?? [],
    image: item.coverImage ?? fallbackImage,
    gallery: item.galleryImages?.length ? item.galleryImages : [item.coverImage ?? fallbackImage],
    likes: item.likesCount ?? 0,
    views: item.views ?? 0,
    year: item.projectYear ? String(item.projectYear) : "Recent",
    area: "Not specified",
    software: item.softwareUsed ?? [],
    materials: [],
    constructionType: enumLabel(item.category) || "Project",
    story: item.description ?? ""
  };
}

export function adaptFirm(item: any): Firm {
  return {
    id: item.slug ?? item.id,
    name: item.name,
    location: item.location,
    image: item.logo ?? item.banner ?? fallbackCover,
    banner: item.banner ?? item.logo ?? fallbackCover,
    specialties: item.services ?? [],
    size: employeeSize(item.employeeCount),
    hiring: false,
    about: item.description ?? ""
  };
}

export function adaptUser(item: any): Professional {
  const profile = item.profile ?? {};
  const role = roleLabels[item.role] ?? enumLabel(item.role) ?? "Professional";
  return {
    id: item.id,
    name: item.name,
    role,
    location: item.location ?? "Nepal",
    image: item.avatar ?? "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=85",
    cover: fallbackCover,
    bio: item.bio ?? "Member of Nepal's architecture and engineering community.",
    specialties: [profile.specialization, role].filter(Boolean),
    skills: profile.softwareSkills ?? [],
    followers: 0,
    following: 0
  };
}

export function adaptArticle(item: any): Article {
  return {
    id: item.slug ?? item.id,
    title: item.title,
    topic: item.category,
    author: item.author?.name ?? "ARCHINEPAL Editorial",
    image: item.coverImage ?? fallbackCover,
    readTime: readTime(item.content),
    excerpt: item.content ? `${item.content.replace(/\s+/g, " ").slice(0, 150)}...` : ""
  };
}

export function adaptEvent(item: any): Event {
  return {
    id: item.id,
    title: item.title,
    type: enumLabel(item.eventType),
    date: item.startDate ? new Intl.DateTimeFormat("en", { month: "short", day: "2-digit", year: "numeric" }).format(new Date(item.startDate)) : "TBA",
    location: item.location,
    image: item.banner ?? fallbackCover,
    speakers: item.organizer?.name ? [item.organizer.name] : []
  };
}

export function adaptJob(item: any): Job {
  return {
    id: item.id,
    title: item.title,
    company: item.company,
    location: item.location,
    level: item.requirements?.[0] ?? "Open role",
    type: enumLabel(item.employmentType),
    salary: item.salaryRange ?? "Undisclosed"
  };
}
