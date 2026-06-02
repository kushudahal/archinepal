import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Article } from "@/types";

export function ArticleCard({ article, large = false }: { article: Article; large?: boolean }) {
  return (
    <article className={`group overflow-hidden rounded-xl bg-white shadow-soft ${large ? "md:grid md:grid-cols-2" : ""}`}>
      <div className={`relative overflow-hidden ${large ? "h-80 md:h-full" : "h-56"}`}>
        <Image src={article.image} alt={article.title} fill className="object-cover transition duration-700 group-hover:scale-105" />
      </div>
      <div className="p-5">
        <div className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-sage">{article.topic}</div>
        <h3 className={large ? "text-3xl font-semibold" : "text-xl font-semibold"}>{article.title}</h3>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{article.excerpt}</p>
        <div className="mt-5 flex items-center justify-between text-sm text-muted-foreground">
          <span>{article.author} · {article.readTime}</span>
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>
    </article>
  );
}
