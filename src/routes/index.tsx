import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarCheck, Compass, ShieldCheck, Users } from "lucide-react";
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
  const ar = lang === "ar";
  const trust = [
    { Icon: Users, en: "Small groups", ar: "مجموعات صغيرة", subEn: "Friendly, never crowded", subAr: "ودّية وغير مزدحمة" },
    { Icon: Compass, en: "Expert-led", ar: "بإرشاد خبراء", subEn: "Guides who know the trail", subAr: "مرشدون يعرفون المسار" },
    { Icon: ShieldCheck, en: "Safety first", ar: "السلامة أولاً", subEn: "Briefed, equipped, prepared", subAr: "إرشاد وتجهيز واستعداد" },
    { Icon: CalendarCheck, en: "Since 2022", ar: "منذ 2022", subEn: "UAE · Oman · Beyond", subAr: "الإمارات · عُمان · وما بعدها" },
  ];
  const steps = [
    { en: "Pick a trip", ar: "اختر رحلتك", dEn: "Browse hikes, desert nights and wadi escapes — or ask for something custom.", dAr: "تصفّح رحلات المشي والصحراء والأودية — أو اطلب رحلة مخصصة." },
    { en: "Message us", ar: "راسلنا", dEn: "Ask on WhatsApp. We confirm dates, price and every detail with you.", dAr: "اسأل عبر واتساب. نؤكد معك التواريخ والسعر وكل التفاصيل." },
    { en: "Show up & explore", ar: "انطلق واستكشف", dEn: "We handle the route, the guide and the safety. You enjoy the view.", dAr: "نتولى المسار والمرشد والسلامة، وأنت تستمتع بالمنظر." },
  ];
  return (
    <>
      <section className="relative flex min-h-[88vh] items-end overflow-hidden text-cream">
        <img src={images.hero} alt="Hiker overlooking mountains at sunrise" width={1920} height={1088} className="absolute inset-0 h-full w-full animate-slowzoom object-cover" />
        <div className="bg-hero-overlay absolute inset-0" />
        <div className="bg-hero-side absolute inset-0" />
        <div className="container-x relative pb-28 pt-32 animate-rise md:pb-32">
          <p className="inline-flex items-center gap-2 rounded-md border border-cream/25 bg-cream/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />{t("hero.eyebrow")}
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-[1.05] sm:text-5xl md:text-7xl">{t("hero.title")}</h1>
          <p className="mt-5 max-w-xl text-base text-cream/85 md:text-lg">{t("hero.sub")}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="hero" size="lg"><Link to="/trips">{t("cta.explore")} <ArrowRight className="rtl:-scale-x-100" /></Link></Button>
            <Button asChild variant="glass" size="lg"><Link to="/plan">{t("cta.plan")}</Link></Button>
          </div>
        </div>
      </section>

      <section className="container-x relative z-10 -mt-14">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border shadow-card lg:grid-cols-4">
          {trust.map(({ Icon, en, ar: arT, subEn, subAr }) => (
            <div key={en} className="flex items-start gap-3 bg-card p-5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent"><Icon className="h-5 w-5" /></span>
              <div>
                <p className="font-extrabold leading-tight">{ar ? arT : en}</p>
                <p className="mt-1 text-xs text-muted-foreground">{ar ? subAr : subEn}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x py-20 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">{t("home.featured")}</p>
            <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">{t("home.featuredSub")}</h2>
          </div>
          <Link to="/trips" className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-accent">
            {ar ? "عرض كل الرحلات" : "View all trips"} <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trips.slice(0, 3).map((tr) => <TripCard key={tr.slug} trip={tr} />)}
        </div>
        <p className="mt-6 text-xs text-muted-foreground">* {t("price.note")}</p>
      </section>

      <section className="container-x pb-20 md:pb-24">
        <p className="eyebrow">{t("home.categories")}</p>
        <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {cats.map((c) => (
            <Link key={c.en} to="/trips" className="group relative aspect-[4/5] overflow-hidden rounded-xl">
              <img src={c.img} alt={c.en} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="bg-hero-overlay absolute inset-0" />
              <span className="absolute inset-x-4 bottom-4 flex items-center justify-between text-lg font-extrabold text-cream">
                {ar ? c.ar : c.en}
                <ArrowRight className="h-5 w-5 text-accent opacity-0 transition group-hover:opacity-100 rtl:-scale-x-100" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="topo py-20 text-cream md:py-24">
        <div className="container-x">
          <p className="eyebrow !text-gold">{ar ? "كيف تعمل الرحلة" : "How it works"}</p>
          <h2 className="mt-2 max-w-xl text-3xl font-extrabold md:text-4xl">{ar ? "من الفكرة إلى القمة في ثلاث خطوات" : "From idea to summit in three steps"}</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {steps.map((st, i) => (
              <div key={st.en} className="border-t border-cream/20 pt-6">
                <span className="text-sm font-extrabold text-accent">0{i + 1}</span>
                <h3 className="mt-3 text-xl font-extrabold">{ar ? st.ar : st.en}</h3>
                <p className="mt-2 text-cream/70">{ar ? st.dAr : st.dEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x grid items-center gap-12 py-20 md:grid-cols-2 md:py-24">
        <img src={images.summit} alt="Friends on a summit" loading="lazy" className="aspect-[4/3] w-full rounded-xl object-cover shadow-card" />
        <div>
          <p className="eyebrow">{t("home.story")}</p>
          <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">{ar ? "وُلدنا من حب الطبيعة" : "Born from a love of wild places"}</h2>
          <p className="mt-4 text-muted-foreground">{ar ? "نؤمن بأن أجمل الذكريات تُصنع في الهواء الطلق." : "We believe the best memories are made outdoors — on ridgelines, dunes and hidden trails, with good people."}</p>
          <Button asChild variant="outline" className="mt-6"><Link to="/about">{t("nav.about")}</Link></Button>
        </div>
      </section>

      <section className="container-x pb-20 md:pb-24">
        <h2 className="text-3xl font-extrabold md:text-4xl">{t("home.gallery")}</h2>
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3">
          {[images.camp, images.kayak, images.desert, images.alpine, images.wadi, images.summit].map((src, i) => (
            <img key={i} src={src} alt="" loading="lazy" className="aspect-[4/3] w-full rounded-lg object-cover" />
          ))}
        </div>
      </section>

      <section className="bg-secondary py-20 md:py-24">
        <div className="container-x">
          <p className="eyebrow">{t("home.voices")}</p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <blockquote key={n} className="rounded-xl border border-border bg-card p-6 shadow-card">
                <p className="text-lg font-medium">“Placeholder testimonial — replace with a real traveler review.”</p>
                <footer className="mt-4 text-sm text-muted-foreground">{t("placeholder")}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="topo text-cream">
        <div className="container-x py-20 text-center md:py-24">
          <h2 className="mx-auto max-w-3xl text-3xl font-extrabold md:text-5xl">{t("home.finalTitle")}</h2>
          <p className="mx-auto mt-4 max-w-xl text-cream/75">{t("home.finalSub")}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild variant="hero" size="lg"><Link to="/plan">{t("cta.plan")}</Link></Button>
            <Button asChild variant="whatsapp" size="lg"><a href={WHATSAPP_URL} target="_blank" rel="noreferrer">{t("cta.whatsapp")}</a></Button>
          </div>
        </div>
      </section>
    </>
  );
}
