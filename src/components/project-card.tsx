"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Project } from "@/types";
import { Badge } from "@/components/ui/badge";
import { formatNumber } from "@/lib/utils";

export function ProjectCard({ project, tall = false }: { project: Project; tall?: boolean }) {
  return (
    <motion.article whileHover={{ y: -6 }} className="group mb-4 break-inside-avoid overflow-hidden rounded-xl bg-white shadow-soft">
      <Link href={`/projects/${project.id}`}>
        <div className={`relative overflow-hidden ${tall ? "h-[420px]" : "h-72"}`}>
          <Image src={project.image} alt={project.title} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/58 via-black/5 to-transparent opacity-80" />
          <Badge className="absolute left-4 top-4 bg-white/85 text-charcoal">{project.category}</Badge>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-charcoal">{project.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{project.firm} · {project.location}</p>
          <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
            <span>{project.tags.slice(0, 2).join(" / ")}</span>
            <span className="flex items-center gap-3">
              <span className="flex items-center gap-1"><Heart className="h-3.5 w-3.5" />{formatNumber(project.likes)}</span>
              <span className="flex items-center gap-1"><Eye className="h-3.5 w-3.5" />{formatNumber(project.views)}</span>
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
