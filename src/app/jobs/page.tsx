import { Bookmark, MapPin, Search } from "lucide-react";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { SectionHeader } from "@/components/section-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { listJobs } from "@/services/jobs.service";

export const metadata = { title: "Jobs | ARCHINEPAL" };

export default async function JobsPage() {
  const jobs = await listJobs({ limit: 20 });

  return (
    <>
      <Navbar />
      <main className="container pt-32">
        <SectionHeader eyebrow="Jobs" title="Premium roles for architects, engineers, BIM designers, and interior teams">
          Search by role, location, experience, and firm culture.
        </SectionHeader>
        <div className="glass mb-8 grid gap-3 rounded-xl p-3 lg:grid-cols-[1fr_auto_auto_auto]">
          <div className="relative"><Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input placeholder="Search jobs" className="pl-11" /></div>
          <Button variant="outline">Role</Button>
          <Button variant="outline">Location</Button>
          <Button variant="outline">Experience</Button>
        </div>
        <div className="grid gap-4">
          {jobs.map((job) => (
            <Card key={job.id}>
              <CardContent className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-charcoal text-white">{job.company.slice(0, 2)}</div>
                    <div>
                      <h2 className="text-xl font-semibold">{job.title}</h2>
                      <p className="text-sm text-muted-foreground">{job.company}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{job.location}</span>
                    <span>{job.level}</span><span>{job.type}</span><span>{job.salary}</span>
                  </div>
                </div>
                <div className="flex gap-2"><Button variant="outline" size="icon"><Bookmark className="h-4 w-4" /></Button><Button>Apply now</Button></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
