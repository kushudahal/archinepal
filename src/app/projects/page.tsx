import { FilterBar } from "@/components/filter-bar";
import { ProjectCard } from "@/components/project-card";
import { SectionHeader } from "@/components/section-header";
import { listProjects } from "@/services/projects.service";

export const revalidate = 60;

export default async function ProjectsPage() {
  const projects = await listProjects({ limit: 24 });

  return (
    <main className="min-h-screen bg-stonewash pt-32">
      <section className="container pb-20">
        <SectionHeader eyebrow="Projects" title="Architecture projects from Nepal's creators">
          Browse published work by category, location, creator, firm, software, and project momentum.
        </SectionHeader>
        <div className="mb-8">
          <FilterBar />
        </div>
        {projects.length ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl bg-white p-8 text-sm text-muted-foreground shadow-soft">No published projects yet.</div>
        )}
      </section>
    </main>
  );
}
