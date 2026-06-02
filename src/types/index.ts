export type ProjectCategory =
  | "Residential"
  | "Commercial"
  | "Interior"
  | "Landscape"
  | "Structural"
  | "Urban Design"
  | "BIM"
  | "Visualization";

export type Project = {
  id: string;
  title: string;
  firm: string;
  architect: string;
  location: string;
  category: ProjectCategory;
  tags: string[];
  image: string;
  gallery: string[];
  likes: number;
  views: number;
  year: string;
  area: string;
  software: string[];
  materials: string[];
  constructionType: string;
  story: string;
};

export type Professional = {
  id: string;
  name: string;
  role: string;
  location: string;
  image: string;
  cover: string;
  bio: string;
  specialties: string[];
  skills: string[];
  followers: number;
  following: number;
};

export type Firm = {
  id: string;
  name: string;
  location: string;
  image: string;
  banner: string;
  specialties: string[];
  size: string;
  hiring: boolean;
  about: string;
};

export type Article = {
  id: string;
  title: string;
  topic: string;
  author: string;
  image: string;
  readTime: string;
  excerpt: string;
};

export type Event = {
  id: string;
  title: string;
  type: string;
  date: string;
  location: string;
  image: string;
  speakers: string[];
};

export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  level: string;
  type: string;
  salary: string;
};
