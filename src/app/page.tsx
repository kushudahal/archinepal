import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, CalendarDays, Search, Sparkles, UsersRound } from "lucide-react";
import { Reveal, Stagger, item } from "@/animations/reveal";
import { ArticleCard } from "@/components/article-card";
import { EventCard } from "@/components/event-card";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ProfileCard } from "@/components/profile-card";
import { ProjectCard } from "@/components/project-card";
import { SectionHeader } from "@/components/section-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { listArticles } from "@/services/articles.service";
import { listEvents } from "@/services/events.service";
import { listFirms } from "@/services/firms.service";
import { listProjects } from "@/services/projects.service";
import { listProfessionals } from "@/services/users.service";

export default async function Home() {
  const [projects, professionals, firms, articles, events] = await Promise.all([
    listProjects({ limit: 6 }),
    listProfessionals(),
    listFirms({ limit: 3 }),
    listArticles({ limit: 3 }),
    listEvents({ limit: 3 })
  ]);

  return (
    <>
      <Navbar />
      <main>
        <section className="relative min-h-[92vh] overflow-hidden bg-charcoal text-white">
          <Image
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=90"
            alt="Contemporary architecture in warm evening light"
            fill
            priority
            className="object-cover opacity-62"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-charcoal/30 to-charcoal" />
          <div className="container relative flex min-h-[92vh] items-end pb-16 pt-32">
            <Reveal className="max-w-5xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur">
                <Sparkles className="h-4 w-4" />
                Premium platform for Nepal's built-environment culture
              </div>
              <h1 className="text-5xl font-semibold tracking-tight md:text-7xl lg:text-8xl">
                Nepal's Architecture & Engineering Community
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/74">
                Discover remarkable projects, meet designers and engineers, follow firms, publish portfolios, find jobs, and join the conversations shaping Nepal's cities.
              </p>
              <div className="mt-8 max-w-2xl rounded-xl bg-white p-2 shadow-glow">
                <div className="flex items-center gap-2">
                  <Search className="ml-3 h-5 w-5 text-sage" />
                  <Input placeholder="Search projects, firms, designers, BIM workflows..." className="border-0 bg-transparent text-charcoal focus:ring-0" />
                  <Button>Explore</Button>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="container py-20">
          <SectionHeader eyebrow="Featured Projects" title="Cinematic work from Nepal's emerging studios">
            Browse built work, competition entries, interiors, BIM case studies, and cultural visualizations curated for serious creative discovery.
          </SectionHeader>
          <Stagger className="grid gap-5 md:grid-cols-3">
            {projects.slice(0, 3).map((project, index) => (
              <div key={project.id} className={index === 1 ? "md:mt-10" : ""}>
                <ProjectCard project={project} tall={index === 1} />
              </div>
            ))}
          </Stagger>
        </section>

        <section className="bg-charcoal py-20 text-white">
          <div className="container">
            <SectionHeader eyebrow="People" title="Trending professionals">
              <span className="text-white/62">Architects, engineers, BIM specialists, interior designers, and students building credible public portfolios.</span>
            </SectionHeader>
            <div className="grid gap-5 md:grid-cols-3">
              {professionals.map((person) => <ProfileCard key={person.id} person={person} />)}
            </div>
          </div>
        </section>

        <section className="container grid gap-8 py-20 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <SectionHeader eyebrow="Student Spotlight" title="Thesis ideas, competitions, and early portfolios" />
            <div className="relative overflow-hidden rounded-xl bg-linen p-8 shadow-soft">
              <Image src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85" alt="Student studio" fill className="object-cover opacity-28" />
              <div className="relative max-w-xl">
                <h3 className="text-3xl font-semibold">Pulchowk thesis showcase</h3>
                <p className="mt-4 leading-7 text-charcoal/70">Urban resilience, rural health posts, craft schools, and humane high-density living from the next wave of designers.</p>
                <Button asChild className="mt-6"><Link href="/students">Visit student community</Link></Button>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHeader eyebrow="Featured Firms" title="Studios to follow" />
            <div className="grid gap-4">
              {firms.map((firm) => (
                <Card key={firm.id}>
                  <CardContent className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="font-semibold">{firm.name}</h3>
                      <p className="text-sm text-muted-foreground">{firm.location} · {firm.size} people</p>
                    </div>
                    {firm.hiring ? <span className="rounded-full bg-sage px-3 py-1 text-xs font-medium text-white">Hiring</span> : null}
                  </CardContent>
                </Card>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="container py-20">
          <SectionHeader eyebrow="Insights" title="Architecture, BIM, sustainability, and urban development" />
          <div className="grid gap-5 lg:grid-cols-3">
            {articles.map((article) => <ArticleCard key={article.id} article={article} />)}
          </div>
        </section>

        <section className="container py-20">
          <SectionHeader eyebrow="Events" title="Workshops, walks, webinars, and competitions" />
          <div className="grid gap-5 md:grid-cols-3">
            {events.map((event) => <EventCard key={event.id} event={event} />)}
          </div>
        </section>

        <section className="bg-stonewash py-20">
          <div className="container grid gap-5 md:grid-cols-4">
            {[
              ["12K+", "Professionals", UsersRound],
              ["4.8K", "Projects", Building2],
              ["180+", "Firms", Sparkles],
              ["70+", "Events", CalendarDays]
            ].map(([value, label, Icon]) => (
              <Card key={label as string}>
                <CardContent>
                  <Icon className="mb-5 h-6 w-6 text-sage" />
                  <div className="text-4xl font-semibold">{value as string}</div>
                  <p className="mt-2 text-sm text-muted-foreground">{label as string}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="container py-20">
          <div className="rounded-xl bg-charcoal p-8 text-white shadow-glow md:p-14">
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <h2 className="text-4xl font-semibold">Launch your architecture presence in Nepal.</h2>
                <p className="mt-4 max-w-2xl text-white/65">Create a portfolio, publish case studies, recruit talent, and connect with Nepal's most serious design community.</p>
              </div>
              <Button asChild variant="secondary" size="lg">
                <Link href="/dashboard">Open dashboard <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
