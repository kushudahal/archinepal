import type { Metadata } from "next";
import { AuthProvider } from "@/context/auth-context";
import "./globals.css";

export const metadata: Metadata = {
  title: "ARCHINEPAL | Nepal's Architecture & Engineering Community",
  description:
    "A premium digital platform for Nepal's architecture, civil engineering, interior design, BIM, firms, students, jobs, articles, and events.",
  keywords: ["architecture Nepal", "civil engineering Nepal", "BIM Nepal", "interior design Nepal", "construction firms Nepal"],
  openGraph: {
    title: "ARCHINEPAL",
    description: "A world-class digital ecosystem for Nepal's design and engineering culture.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body><AuthProvider>{children}</AuthProvider></body>
    </html>
  );
}
