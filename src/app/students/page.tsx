import Image from "next/image";
import { Award, GraduationCap, Lightbulb, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ProfileCard } from "@/components/profile-card";
import { ProjectCard } from "@/components/project-card";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { listProjects } from "@/services/projects.service";
import { listProfessionals } from "@/services/users.service";

export const metadata = { title: "Student Community | ARCHINEPAL" };

export default async function StudentsPage() {
  const [projects, professionals] = await Promise.all([
    listProjects({ limit: 6 }),
    listProfessionals()
  ]);
  const studentTiles: [LucideIcon, string][] = [[GraduationCap, "Thesis showcase"], [Award, "Competitions"], [Rocket, "Internships"], [Lightbulb, "Workshops"]];

  return (
    <>
      <Navbar />
      <main>
        <section className="relative min-h-[70vh] bg-charcoal pt-32 text-white">
          <Image src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=85" alt="Student studio" fill priority className="object-cover opacity-42" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal to-black/20" />
          <div className="container relative pb-16 pt-24">
            <h1 className="max-w-4xl text-5xl font-semibold md:text-7xl">Student work deserves a serious stage.</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">Thesis showcases, competitions, internships, workshops, and university spotlights for Nepal's next design leaders.</p>
          </div>
        </section>
        <section className="container py-16">
          <div className="grid gap-5 md:grid-cols-4">
            {studentTiles.map(([Icon, label]) => (
              <Card key={label}><CardContent><Icon className="mb-5 h-7 w-7 text-sage" /><h2 className="text-xl font-semibold">{label}</h2><p className="mt-2 text-sm text-muted-foreground">Curated opportunities and student-led creative momentum.</p></CardContent></Card>
            ))}
          </div>
        </section>
        <section className="container py-16">
          <SectionHeader eyebrow="Student projects" title="Ambitious concepts from studios across Nepal" />
          <div className="grid gap-5 md:grid-cols-3">{projects.slice(1, 4).map((project) => <ProjectCard key={project.id} project={project} />)}</div>
        </section>
        <section className="container py-16">
          <SectionHeader eyebrow="Top creators" title="Students and early-career voices to follow" />
          <div className="grid gap-5 md:grid-cols-3">{professionals.map((person) => <ProfileCard key={person.id} person={person} />)}</div>
        </section>
      </main>
      <Footer />
    </>
  );
}
