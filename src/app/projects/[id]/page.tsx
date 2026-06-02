import Image from "next/image";
import { notFound } from "next/navigation";
import { MapPin, MessageCircle, Send, Share2 } from "lucide-react";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ProfileCard } from "@/components/profile-card";
import { ProjectCard } from "@/components/project-card";
import { SectionHeader } from "@/components/section-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getProject, listProjects } from "@/services/projects.service";
import { listProfessionals } from "@/services/users.service";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProject(id);
  return { title: project ? `${project.title} | ARCHINEPAL` : "Project | ARCHINEPAL" };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [project, projects, professionals] = await Promise.all([
    getProject(id),
    listProjects({ limit: 4 }),
    listProfessionals()
  ]);
  if (!project) notFound();
  const architect = professionals.find((person) => person.name === project.architect) ?? professionals[0];

  return (
    <>
      <Navbar />
      <main>
        <section className="relative min-h-screen bg-charcoal text-white">
          <Image src={project.image} alt={project.title} fill priority className="object-cover opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/25 to-black/20" />
          <div className="container relative flex min-h-screen items-end pb-16 pt-32">
            <div className="max-w-4xl">
              <Badge className="bg-white/85 text-charcoal">{project.category}</Badge>
              <h1 className="mt-5 text-5xl font-semibold tracking-tight md:text-7xl">{project.title}</h1>
              <p className="mt-5 flex items-center gap-2 text-white/74"><MapPin className="h-5 w-5" />{project.location} · {project.firm} · {project.year}</p>
            </div>
          </div>
        </section>

        <section className="container grid gap-10 py-16 lg:grid-cols-[1fr_360px]">
          <div>
            <div className="grid gap-4 md:grid-cols-2">
              {project.gallery.map((image) => (
                <div key={image} className="relative h-80 overflow-hidden rounded-xl">
                  <Image src={image} alt={project.title} fill className="object-cover" />
                </div>
              ))}
            </div>
            <article className="prose prose-neutral mt-12 max-w-none">
              <h2 className="text-3xl font-semibold">Project Story</h2>
              <p className="text-lg leading-8 text-muted-foreground">{project.story}</p>
              <p className="leading-8 text-muted-foreground">
                The presentation prioritizes atmosphere, construction intelligence, and the civic role of design in Nepal. Each image, specification, and note is arranged for slow reading rather than quick scrolling.
              </p>
            </article>
            <div className="mt-12">
              <SectionHeader title="Related projects" />
              <div className="grid gap-5 md:grid-cols-2">
                {projects.filter((item) => item.id !== project.id).slice(0, 2).map((item) => <ProjectCard key={item.id} project={item} />)}
              </div>
            </div>
            <Card className="mt-12">
              <CardContent>
                <h3 className="text-xl font-semibold">Comments</h3>
                <div className="mt-5 flex gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-sage text-white">AN</div>
                  <div className="flex-1 rounded-xl bg-muted p-4 text-sm text-muted-foreground">Thoughtful material palette and a strong response to Nepali urban density.</div>
                </div>
              </CardContent>
            </Card>
          </div>
          <aside className="space-y-5">
            <Card className="sticky top-28">
              <CardContent className="space-y-5">
                <div className="flex gap-2">
                  <Button className="flex-1"><Send className="h-4 w-4" />Contact</Button>
                  <Button variant="outline" size="icon"><Share2 className="h-4 w-4" /></Button>
                  <Button variant="outline" size="icon"><MessageCircle className="h-4 w-4" /></Button>
                </div>
                {[
                  ["Area", project.area],
                  ["Construction", project.constructionType],
                  ["Software", project.software.join(", ")],
                  ["Materials", project.materials.join(", ")],
                  ["Tags", project.tags.join(", ")]
                ].map(([label, value]) => (
                  <div key={label} className="border-t pt-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-sage">{label}</p>
                    <p className="mt-1 text-sm text-charcoal">{value}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
            <ProfileCard person={architect} />
          </aside>
        </section>
      </main>
      <Footer />
    </>
  );
}
