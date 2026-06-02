import { Search, SlidersHorizontal } from "lucide-react";
import { categories } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function FilterBar({ label = "Search projects, firms, people" }: { label?: string }) {
  return (
    <div className="glass rounded-xl p-3 shadow-soft">
      <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder={label} className="pl-11" />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 lg:pb-0">
          {categories.slice(0, 6).map((category) => (
            <Button key={category} variant="outline" size="sm" className="bg-white/75">
              {category}
            </Button>
          ))}
          <Button variant="secondary" size="sm">
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>
    </div>
  );
}
