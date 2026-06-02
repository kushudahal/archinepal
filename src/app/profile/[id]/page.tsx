import Image from "next/image";
import { notFound } from "next/navigation";
import { Mail, MapPin, UserPlus } from "lucide-react";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ProjectCard } from "@/components/project-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";
import { listProjects } from "@/services/projects.service";
import { getUser } from "@/services/users.service";

export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [person, projects] = await Promise.all([
    getUser(id),
    listProjects({ limit: 4 })
  ]);
  if (!person) notFound();

  return (
    <>
      <Navbar />
      <main className="pt-24">
        <section className="relative h-80">
          <Image src={person.cover} alt="" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent" />
        </section>
        <section className="container -mt-20 grid gap-8 pb-16 lg:grid-cols-[320px_1fr]">
          <aside className="relative">
            <Card>
              <CardContent>
                <Image src={person.image} alt={person.name} width={132} height={132} className="rounded-xl border-4 border-white object-cover" />
                <h1 className="mt-4 text-3xl font-semibold">{person.name}</h1>
                <p className="text-sage">{person.role}</p>
                <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="h-4 w-4" />{person.location}</p>
                <p className="mt-5 leading-7 text-muted-foreground">{person.bio}</p>
                <div className="mt-5 grid grid-cols-2 gap-3 text-center">
                  <div className="rounded-xl bg-muted p-3"><b>{formatNumber(person.followers)}</b><p className="text-xs text-muted-foreground">Followers</p></div>
                  <div className="rounded-xl bg-muted p-3"><b>{formatNumber(person.following)}</b><p className="text-xs text-muted-foreground">Following</p></div>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-2">
                  <Button><UserPlus className="h-4 w-4" />Follow</Button>
                  <Button variant="outline"><Mail className="h-4 w-4" />Contact</Button>
                </div>
              </CardContent>
            </Card>
          </aside>
          <div className="space-y-8">
            <Card>
              <CardContent>
                <h2 className="text-xl font-semibold">Specialization & Software</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {[...person.specialties, ...person.skills].map((skill) => <Badge key={skill}>{skill}</Badge>)}
                </div>
              </CardContent>
            </Card>
            <div className="grid gap-5 md:grid-cols-2">
              <Card><CardContent><h2 className="text-xl font-semibold">Experience</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">Lead designer at Studio Sthapatya · Independent residential and conservation projects · BIM coordination consultant.</p></CardContent></Card>
              <Card><CardContent><h2 className="text-xl font-semibold">Education</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">Bachelor of Architecture, Tribhuvan University · Workshops in computational design and passive building systems.</p></CardContent></Card>
            </div>
            <div>
              <h2 className="mb-5 text-2xl font-semibold">Featured Projects</h2>
              <div className="grid gap-5 md:grid-cols-2">
                {projects.slice(0, 4).map((project) => <ProjectCard key={project.id} project={project} />)}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
