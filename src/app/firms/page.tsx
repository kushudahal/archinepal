import Image from "next/image";
import Link from "next/link";
import { BriefcaseBusiness, MapPin, Search } from "lucide-react";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { SectionHeader } from "@/components/section-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { listFirms } from "@/services/firms.service";

export const metadata = { title: "Firms Directory | ARCHINEPAL" };

export default async function FirmsPage() {
  const firms = await listFirms({ limit: 18 });

  return (
    <>
      <Navbar />
      <main className="container pt-32">
        <SectionHeader eyebrow="Firms" title="Architecture, engineering, BIM, and construction studios in Nepal">
          Discover firms by location, employee size, specialties, hiring status, and featured work.
        </SectionHeader>
        <div className="glass mb-8 grid gap-3 rounded-xl p-3 md:grid-cols-[1fr_auto_auto]">
          <div className="relative"><Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input placeholder="Search firms in Kathmandu, Pokhara, Lalitpur..." className="pl-11" /></div>
          <Button variant="outline">Employee size</Button>
          <Button variant="outline">Specialties</Button>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {firms.map((firm) => (
            <Card key={firm.id} className="overflow-hidden">
              <div className="relative h-48"><Image src={firm.image} alt={firm.name} fill className="object-cover" /></div>
              <CardContent>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold">{firm.name}</h2>
                    <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="h-4 w-4" />{firm.location}</p>
                  </div>
                  {firm.hiring ? <Badge className="bg-sage text-white">Hiring</Badge> : null}
                </div>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">{firm.about}</p>
                <div className="mt-4 flex flex-wrap gap-2">{firm.specialties.map((item) => <Badge key={item}>{item}</Badge>)}</div>
                <Button asChild className="mt-5 w-full" variant="secondary"><Link href={`/firms/${firm.id}`}><BriefcaseBusiness className="h-4 w-4" />View firm</Link></Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
