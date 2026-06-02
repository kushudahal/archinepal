import Link from "next/link";
import { Instagram, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="container grid gap-10 py-14 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <div className="mb-4 text-lg font-semibold tracking-[0.2em]">ARCHINEPAL</div>
          <p className="max-w-sm text-sm leading-6 text-white/62">
            A digital ecosystem for Nepal's architecture, engineering, interiors, BIM, and design culture.
          </p>
        </div>
        {[
          ["Platform", "Explore", "Projects", "Professionals", "Firms"],
          ["Community", "Students", "Jobs", "Events", "Articles"],
          ["Company", "About", "Press", "Contact", "Privacy"]
        ].map(([title, ...items]) => (
          <div key={title}>
            <h3 className="mb-4 text-sm font-semibold">{title}</h3>
            <div className="grid gap-3">
              {items.map((item) => (
                <Link href="#" key={item} className="text-sm text-white/58 transition hover:text-white">
                  {item}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="container flex flex-col gap-4 border-t border-white/10 py-6 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
        <span>© 2026 ARCHINEPAL. Built for Nepal's design future.</span>
        <div className="flex gap-3">
          <Instagram className="h-4 w-4" />
          <Linkedin className="h-4 w-4" />
          <Mail className="h-4 w-4" />
        </div>
      </div>
    </footer>
  );
}
