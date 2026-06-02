import Image from "next/image";
import { CalendarDays, MapPin } from "lucide-react";
import { Event } from "@/types";
import { Button } from "@/components/ui/button";

export function EventCard({ event }: { event: Event }) {
  return (
    <article className="overflow-hidden rounded-xl bg-white shadow-soft">
      <div className="relative h-52">
        <Image src={event.image} alt={event.title} fill className="object-cover" />
      </div>
      <div className="p-5">
        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-sage">{event.type}</span>
        <h3 className="mt-2 text-xl font-semibold">{event.title}</h3>
        <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground"><CalendarDays className="h-4 w-4" />{event.date}</p>
        <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="h-4 w-4" />{event.location}</p>
        <Button className="mt-5 w-full" variant="secondary">RSVP</Button>
      </div>
    </article>
  );
}
