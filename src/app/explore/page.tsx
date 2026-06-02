import { FilterBar } from "@/components/filter-bar";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ProjectCard } from "@/components/project-card";
import { SectionHeader } from "@/components/section-header";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/mock";
import { listProjects } from "@/services/projects.service";

export const metadata = { title: "Explore Projects | ARCHINEPAL" };

export default async function ExplorePage() {
  const projects = await listProjects({ limit: 24 });

  return (
    <>
      <Navbar />
      <main className="container pt-32">
        <SectionHeader eyebrow="Explore" title="A visual index of Nepali architecture and engineering work">
          Filter residential homes, interiors, urban ideas, BIM studies, structural systems, and visualization work.
        </SectionHeader>
        <FilterBar />
        <div className="mt-5 flex gap-2 overflow-x-auto pb-3">
          {categories.map((category) => <Button key={category} variant="outline" size="sm" className="bg-white">{category}</Button>)}
        </div>
        <div className="mt-8 masonry">
          {projects.map((project, index) => (
            <ProjectCard key={`${project.id}-${index}`} project={project} tall={index % 3 === 1} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
