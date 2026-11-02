import { createFileRoute, Link } from "@tanstack/react-router";
import { Compass, Heart, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TripCard } from "@/components/site/TripCard";
import { images, trips } from "@/data/trips";
import { useI18n, WHATSAPP_URL } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Widego Adventures — Go Beyond the Ordinary" },
      { name: "description", content: "Guided hikes, desert sunsets, wadis and trips abroad across the UAE, Oman and beyond." },
      { property: "og:title", content: "Widego Adventures — Go Beyond the Ordinary" },
      { property: "og:description", content: "Guided outdoor adventures across the UAE, Oman and the world." },
    ],
  }),
  component: Home,
});

const cats = [
  { img: images.hero, en: "Mountains & Hiking", ar: "جبال ومشي" },
  { img: images.desert, en: "Desert", ar: "صحراء" },
  { img: images.wadi, en: "Wadis & Water", ar: "أودية ومياه" },
  { img: images.alpine, en: "International", ar: "رحلات دولية" },
];

function Home() {
  const { t, lang } = useI18n();
  return (
    <>
      <section className="relative flex min-h-screen items-end overflow-hidden text-cream">
        <img src={images.hero} alt="Hiker overlooking mountains at sunrise" width={1920} height={1088} className="absolute inset-0 h-full w-full animate-slowzoom object-cover" />
        <div className="bg-hero-overlay absolute inset-0" />
        <div className="container-x relative pb-24 pt-32 animate-rise">
          <p className="eyebrow !text-gold">{t("hero.eyebrow")}</p>
          <h1 className="mt-4 max-w-4xl text-5xl font-semibold leading-[1] md:text-8xl">{t("hero.title")}</h1>
          <p className="mt-6 max-w-xl text-lg text-cream/85">{t("hero.sub")}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="hero" size="lg"><Link to="/trips">{t("cta.explore")}</Link></Button>
            <Button asChild variant="glass" size="lg"><Link to="/plan">{t("cta.plan")}</Link></Button>
          </div>
        </div>
      </section>

      <section className="container-x py-24">
        <p className="eyebrow">{t("home.featured")}</p>
        <h2 className="mt-2 text-4xl font-semibold md:text-5xl">{t("home.featuredSub")}</h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {trips.slice(0, 3).map((tr) => <TripCard key={tr.slug} trip={tr} />)}
        </div>
      </section>

      <section className="container-x pb-24">
        <h2 className="text-4xl font-semibold">{t("home.categories")}</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {cats.map((c) => (
            <Link key={c.en} to="/trips" className="group relative aspect-[3/4] overflow-hidden rounded-3xl">
              <img src={c.img} alt={c.en} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="bg-hero-overlay absolute inset-0" />
              <span className="absolute bottom-5 start-5 text-xl font-semibold text-cream">{lang === "ar" ? c.ar : c.en}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="topo py-24 text-cream">
        <div className="container-x">
          <p className="eyebrow !text-gold">{t("home.why")}</p>
          <div className="mt-8 grid gap-8 md:grid-cols-4">
            {[
              [Compass, "Expert-led trails", "مسارات بإرشاد خبراء"],
              [Users, "Welcoming groups", "مجموعات مرحّبة"],
              [ShieldCheck, "Safety first", "السلامة أولاً"],
              [Heart, "Tailor-made trips", "رحلات مخصصة"],
            ].map(([Icon, en, ar]) => {
              const I = Icon as typeof Compass;
              return (
                <div key={en as string} className="rounded-3xl border border-cream/10 bg-cream/5 p-6">
                  <I className="h-8 w-8 text-gold" />
                  <h3 className="mt-4 text-xl font-semibold">{lang === "ar" ? (ar as string) : (en as string)}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container-x grid items-center gap-12 py-24 md:grid-cols-2">
        <img src={images.summit} alt="Friends on a summit" loading="lazy" className="aspect-[4/3] w-full rounded-3xl object-cover shadow-card" />
        <div>
          <p className="eyebrow">{t("home.story")}</p>
          <h2 className="mt-2 text-4xl font-semibold">{lang === "ar" ? "وُلدنا من حب الطبيعة" : "Born from a love of wild places"}</h2>
          <p className="mt-4 text-muted-foreground">{lang === "ar" ? "نؤمن بأن أجمل الذكريات تُصنع في الهواء الطلق." : "We believe the best memories are made outdoors — on ridgelines, dunes and hidden trails, with good people."}</p>
          <Button asChild variant="outline" className="mt-6"><Link to="/about">{t("nav.about")}</Link></Button>
        </div>
      </section>

      <section className="container-x pb-24">
        <h2 className="text-4xl font-semibold">{t("home.gallery")}</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
          {[images.camp, images.kayak, images.desert, images.alpine, images.wadi, images.summit].map((src, i) => (
            <img key={i} src={src} alt="" loading="lazy" className="aspect-square w-full rounded-2xl object-cover" />
          ))}
        </div>
      </section>

      <section className="bg-secondary py-24">
        <div className="container-x">
          <p className="eyebrow">{t("home.voices")}</p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <blockquote key={n} className="rounded-3xl bg-card p-6 shadow-card">
                <p className="text-lg">“Placeholder testimonial — replace with a real traveler review.”</p>
                <footer className="mt-4 text-sm text-muted-foreground">{t("placeholder")}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-24 text-center">
        <h2 className="mx-auto max-w-3xl text-4xl font-semibold md:text-5xl">{t("home.finalTitle")}</h2>
        <p className="mt-4 text-muted-foreground">{t("home.finalSub")}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild variant="hero" size="lg"><Link to="/plan">{t("cta.plan")}</Link></Button>
          <Button asChild variant="whatsapp" size="lg"><a href={WHATSAPP_URL} target="_blank" rel="noreferrer">{t("cta.whatsapp")}</a></Button>
        </div>
      </section>
    </>
  );
}
