import { ReactNode } from "react";

export function SectionHeader({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow ? <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-sage">{eyebrow}</p> : null}
        <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-charcoal md:text-5xl">{title}</h2>
      </div>
      {children ? <div className="max-w-md text-sm leading-6 text-muted-foreground">{children}</div> : null}
    </div>
  );
}
