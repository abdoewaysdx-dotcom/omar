import type { ReactNode } from "react";

export function PageHero({ image, eyebrow, title, sub, children }: { image: string; eyebrow?: string; title: string; sub?: string; children?: ReactNode }) {
  return (
    <section className="relative flex min-h-[60vh] items-end overflow-hidden text-cream">
      <img src={image} alt="" width={1920} height={1088} className="absolute inset-0 h-full w-full animate-slowzoom object-cover" />
      <div className="bg-hero-overlay absolute inset-0" />
      <div className="container-x relative pb-14 pt-32 animate-rise">
        {eyebrow && <p className="eyebrow !text-gold">{eyebrow}</p>}
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-[1.05] md:text-6xl">{title}</h1>
        {sub && <p className="mt-4 max-w-2xl text-lg text-cream/85">{sub}</p>}
        {children}
      </div>
    </section>
  );
}
