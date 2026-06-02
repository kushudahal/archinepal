import { CalendarDays } from "lucide-react";
import { EventCard } from "@/components/event-card";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { SectionHeader } from "@/components/section-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { listEvents } from "@/services/events.service";

export const metadata = { title: "Events | ARCHINEPAL" };

export default async function EventsPage() {
  const events = await listEvents({ limit: 12 });

  return (
    <>
      <Navbar />
      <main className="container pt-32">
        <SectionHeader eyebrow="Events" title="Architecture seminars, BIM workshops, webinars, walks, and competitions">
          RSVP to community events and follow speakers shaping Nepal's design culture.
        </SectionHeader>
        <div className="mb-8 flex gap-2 overflow-x-auto pb-2">{["All", "Seminars", "Workshops", "Webinars", "Competitions", "Walks"].map((item) => <Button key={item} variant="outline" size="sm" className="bg-white">{item}</Button>)}</div>
        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          <div className="grid gap-5 md:grid-cols-2">{events.map((event, index) => <EventCard key={`${event.id}-${index}`} event={event} />)}</div>
          <Card className="h-fit">
            <CardContent>
              <h2 className="flex items-center gap-2 text-xl font-semibold"><CalendarDays className="h-5 w-5 text-sage" />Calendar</h2>
              <div className="mt-5 grid grid-cols-7 gap-2 text-center text-sm">
                {Array.from({ length: 35 }, (_, index) => <div key={index} className={`rounded-lg p-2 ${[5, 12, 24].includes(index) ? "bg-sage text-white" : "bg-muted"}`}>{index + 1}</div>)}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
