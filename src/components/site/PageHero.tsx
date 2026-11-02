import type { ReactNode } from "react";

export function PageHero({ image, eyebrow, title, sub, children }: { image: string; eyebrow?: string; title: string; sub?: string; children?: ReactNode }) {
  return (
    <section className="container-x pt-3">
      <div className="relative flex min-h-[320px] items-end overflow-hidden rounded-lg text-cream md:min-h-[400px]">
        <img src={image} alt="" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
        <div className="bg-hero-overlay absolute inset-0" />
        <div className="bg-hero-side absolute inset-0" />
        <div className="relative p-6 md:p-10">
          {eyebrow && <p className="text-sm font-bold uppercase tracking-[0.08em] text-cream/80">{eyebrow}</p>}
          <h1 className="mt-2 max-w-3xl text-3xl font-bold leading-[1.1] md:text-5xl">{title}</h1>
          {sub && <p className="mt-3 max-w-2xl text-base text-cream/85 md:text-lg">{sub}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}
