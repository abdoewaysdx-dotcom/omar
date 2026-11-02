import type { ReactNode } from "react";

export function PageHero({ image, eyebrow, title, sub, children }: { image: string; eyebrow?: string; title: string; sub?: string; children?: ReactNode }) {
  return (
    <section className="relative flex min-h-[46vh] items-end overflow-hidden text-cream md:min-h-[52vh]">
      <img src={image} alt="" width={1920} height={1088} className="absolute inset-0 h-full w-full animate-slowzoom object-cover" />
      <div className="bg-hero-overlay absolute inset-0" />
      <div className="bg-hero-side absolute inset-0" />
      <div className="container-x relative pb-12 pt-32 animate-rise">
        {eyebrow && <p className="eyebrow !text-gold">{eyebrow}</p>}
        <h1 className="mt-3 max-w-3xl text-3xl font-extrabold leading-[1.08] md:text-5xl">{title}</h1>
        {sub && <p className="mt-4 max-w-2xl text-base text-cream/85 md:text-lg">{sub}</p>}
        {children}
      </div>
    </section>
  );
}
