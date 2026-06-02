import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { Professional } from "@/types";
import { Button } from "@/components/ui/button";

export function ProfileCard({ person }: { person: Professional }) {
  return (
    <article className="overflow-hidden rounded-xl bg-white shadow-soft">
      <div className="relative h-28">
        <Image src={person.cover} alt="" fill className="object-cover" />
      </div>
      <div className="p-5">
        <Image src={person.image} alt={person.name} width={72} height={72} className="-mt-14 rounded-xl border-4 border-white object-cover" />
        <h3 className="mt-3 text-lg font-semibold">{person.name}</h3>
        <p className="text-sm text-sage">{person.role}</p>
        <p className="mt-2 flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="h-3.5 w-3.5" />{person.location}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {person.specialties.map((tag) => <span key={tag} className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">{tag}</span>)}
        </div>
        <Button asChild className="mt-5 w-full" variant="secondary">
          <Link href={`/profile/${person.id}`}>View portfolio</Link>
        </Button>
      </div>
    </article>
  );
}
