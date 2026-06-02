import Image from "next/image";
import { notFound } from "next/navigation";
import { Globe, Linkedin, MapPin } from "lucide-react";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ProjectCard } from "@/components/project-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getFirm } from "@/services/firms.service";
import { listJobs } from "@/services/jobs.service";
import { listProjects } from "@/services/projects.service";
import { listProfessionals } from "@/services/users.service";

export default async function FirmProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [firm, projects, professionals, jobs] = await Promise.all([
    getFirm(id),
    listProjects({ limit: 4 }),
    listProfessionals(),
    listJobs({ limit: 3 })
  ]);
  if (!firm) notFound();
  const featuredProjects = firm.projects?.length ? firm.projects : projects;

  return (
    <>
      <Navbar />
      <main className="pt-24">
        <section className="relative h-[56vh] min-h-[440px] text-white">
          <Image src={firm.banner} alt={firm.name} fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/25 to-black/20" />
          <div className="container relative flex h-full items-end pb-12">
            <div>
              {firm.hiring ? <Badge className="bg-sage text-white">Hiring now</Badge> : null}
              <h1 className="mt-4 text-5xl font-semibold">{firm.name}</h1>
              <p className="mt-3 flex items-center gap-2 text-white/72"><MapPin className="h-4 w-4" />{firm.location} · {firm.size} employees</p>
            </div>
          </div>
        </section>
        <section className="container grid gap-8 py-14 lg:grid-cols-[1fr_340px]">
          <div className="space-y-10">
            <Card><CardContent><h2 className="text-2xl font-semibold">About company</h2><p className="mt-4 leading-7 text-muted-foreground">{firm.about} The firm works across architecture, construction intelligence, and digital delivery with a strong interest in Nepali material culture.</p></CardContent></Card>
            <Card><CardContent><h2 className="text-2xl font-semibold">Services</h2><div className="mt-4 flex flex-wrap gap-2">{firm.specialties.concat(["Project management", "Design documentation", "Site coordination"]).map((item) => <Badge key={item}>{item}</Badge>)}</div></CardContent></Card>
            <div>
              <h2 className="mb-5 text-2xl font-semibold">Featured projects</h2>
              <div className="grid gap-5 md:grid-cols-2">{featuredProjects.slice(0, 4).map((project) => <ProjectCard key={project.id} project={project} />)}</div>
            </div>
          </div>
          <aside className="space-y-5">
            <Card><CardContent><h3 className="font-semibold">Team members</h3><div className="mt-4 grid gap-3">{professionals.map((person) => <div key={person.id} className="flex items-center gap-3"><Image src={person.image} alt={person.name} width={44} height={44} className="rounded-lg object-cover" /><div><p className="text-sm font-medium">{person.name}</p><p className="text-xs text-muted-foreground">{person.role}</p></div></div>)}</div></CardContent></Card>
            <Card><CardContent><h3 className="font-semibold">Open jobs</h3><div className="mt-4 grid gap-3">{jobs.slice(0, 3).map((job) => <div key={job.id} className="rounded-xl bg-muted p-3"><p className="text-sm font-medium">{job.title}</p><p className="text-xs text-muted-foreground">{job.location} · {job.level}</p></div>)}</div></CardContent></Card>
            <div className="grid grid-cols-2 gap-2"><Button variant="outline"><Globe className="h-4 w-4" />Website</Button><Button variant="outline"><Linkedin className="h-4 w-4" />LinkedIn</Button></div>
          </aside>
        </section>
      </main>
      <Footer />
    </>
  );
}
