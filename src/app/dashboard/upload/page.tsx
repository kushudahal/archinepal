"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createProject } from "@/services/projects.service";

const categories = ["residential", "commercial", "interior", "landscape", "urban", "structural", "BIM"];

function listFromText(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function DashboardUploadPage() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setIsSaving(true);
    setError(null);

    try {
      const project = await createProject({
        title: String(form.get("title") ?? ""),
        description: String(form.get("description") ?? ""),
        category: String(form.get("category") ?? "residential"),
        location: String(form.get("location") ?? ""),
        coverImage: String(form.get("coverImage") ?? ""),
        galleryImages: listFromText(String(form.get("galleryImages") ?? "")),
        softwareUsed: listFromText(String(form.get("softwareUsed") ?? "")),
        tags: listFromText(String(form.get("tags") ?? "")),
        projectYear: form.get("projectYear") ? Number(form.get("projectYear")) : undefined,
        status: form.get("status") === "draft" ? "draft" : "pending_review"
      });
      router.push(`/projects/${project.id}`);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not upload project.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <section className="space-y-5">
      <div className="rounded-xl bg-white p-5 shadow-soft">
        <p className="text-sm uppercase tracking-[0.22em] text-sage">Creator dashboard</p>
        <h1 className="mt-2 text-3xl font-semibold">Upload project</h1>
      </div>
      <Card>
        <CardContent>
          <form className="grid gap-5" onSubmit={onSubmit}>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-medium">
                Title
                <Input name="title" required minLength={3} />
              </label>
              <label className="grid gap-2 text-sm font-medium">
                Location
                <Input name="location" required minLength={2} />
              </label>
              <label className="grid gap-2 text-sm font-medium">
                Category
                <select name="category" className="h-11 rounded-xl border bg-background px-3 text-sm">
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2 text-sm font-medium">
                Completion year
                <Input name="projectYear" type="number" min={1900} max={2100} />
              </label>
            </div>
            <label className="grid gap-2 text-sm font-medium">
              Description
              <textarea name="description" required minLength={20} className="min-h-32 rounded-xl border bg-background p-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring" />
            </label>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-medium">
                Cover image URL
                <Input name="coverImage" type="url" required />
              </label>
              <label className="grid gap-2 text-sm font-medium">
                Gallery image URLs
                <Input name="galleryImages" placeholder="Comma-separated URLs" />
              </label>
              <label className="grid gap-2 text-sm font-medium">
                Software
                <Input name="softwareUsed" placeholder="Revit, Rhino, Enscape" />
              </label>
              <label className="grid gap-2 text-sm font-medium">
                Tags
                <Input name="tags" placeholder="Courtyard, Brick, Passive Cooling" />
              </label>
            </div>
            <label className="grid gap-2 text-sm font-medium md:max-w-xs">
              Status
              <select name="status" className="h-11 rounded-xl border bg-background px-3 text-sm">
                <option value="pending_review">Submit for review</option>
                <option value="draft">Save as draft</option>
              </select>
            </label>
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
            <Button className="w-fit" disabled={isSaving}>
              {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
              Save project
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
