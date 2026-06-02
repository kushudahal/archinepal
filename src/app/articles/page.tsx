import { ArticleCard } from "@/components/article-card";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { SectionHeader } from "@/components/section-header";
import { Button } from "@/components/ui/button";
import { listArticles } from "@/services/articles.service";

export const metadata = { title: "Articles & Insights | ARCHINEPAL" };

export default async function ArticlesPage() {
  const articles = await listArticles({ limit: 12 });
  const topics = ["Nepali architecture", "Sustainability", "BIM", "Smart cities", "Building technology", "Engineering trends", "Urban development"];
  return (
    <>
      <Navbar />
      <main className="container pt-32">
        <SectionHeader eyebrow="Magazine" title="Editorial stories for Nepal's built-environment future">
          Essays, interviews, field notes, and technical insight across architecture, sustainability, BIM, and urban development.
        </SectionHeader>
        <div className="mb-8 flex gap-2 overflow-x-auto pb-2">{topics.map((topic) => <Button key={topic} variant="outline" size="sm" className="bg-white">{topic}</Button>)}</div>
        {articles[0] ? <ArticleCard article={articles[0]} large /> : null}
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {articles.slice(1).map((article, index) => <ArticleCard key={`${article.id}-${index}`} article={article} />)}
        </div>
      </main>
      <Footer />
    </>
  );
}
