import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarCheck, Compass, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TripCard } from "@/components/site/TripCard";
import { Parallax, Reveal } from "@/components/site/motion";
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
  const floaters = [
    { img: images.wadi, label: ar ? "أودية" : "Wadis", cls: "start-[4%] top-[16%] w-[42%]", ratio: "aspect-[3/4]", speed: -0.09, delay: "0s" },
    { img: images.desert, label: ar ? "صحراء" : "Desert", cls: "end-[2%] top-[30%] w-[40%]", ratio: "aspect-[4/5]", speed: 0.07, delay: "-2.5s" },
    { img: images.kayak, label: ar ? "كاياك" : "Kayak", cls: "start-[24%] bottom-[8%] w-[32%]", ratio: "aspect-square", speed: -0.05, delay: "-4.5s" },
  ];
  const gallery = [
    [images.camp, images.desert],
    [images.kayak, images.alpine],
    [images.wadi, images.summit],
  ];
  return (
    <>
      <section className="relative flex min-h-screen items-center overflow-hidden text-cream">
        <Parallax speed={0.18} className="absolute inset-x-0 -top-40 h-[calc(100%+20rem)]">
          <img src={images.hero} alt="Hiker overlooking mountains at sunrise" width={1920} height={1088} className="h-full w-full object-cover" />
        </Parallax>
        <div className="bg-hero-overlay absolute inset-0" />
        <div className="bg-hero-side absolute inset-0" />

        {/* Floating photo cluster — each tile drifts at its own speed and bobs gently */}
        <div className="pointer-events-none absolute inset-y-0 end-0 hidden w-[48%] lg:block" aria-hidden>
          {floaters.map((f) => (
            <Parallax key={f.label} speed={f.speed} className={`absolute ${f.cls}`}>
              <div className={`animate-float overflow-hidden rounded-2xl shadow-2xl ring-1 ring-cream/25 ${f.ratio}`} style={{ animationDelay: f.delay }}>
                <img src={f.img} alt="" loading="lazy" className="h-full w-full object-cover" />
                <span className="absolute bottom-3 start-3 rounded-full bg-teal-deep/80 px-3 py-1 text-xs font-bold backdrop-blur">{f.label}</span>
              </div>
            </Parallax>
          ))}
        </div>

        <div className="container-x relative pb-24 pt-36 animate-rise">
          <p className="inline-flex items-center gap-2 rounded-full border border-cream/25 bg-cream/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />{t("hero.eyebrow")}
          </p>
          <h1 className="mt-5 max-w-2xl text-5xl font-extrabold leading-[1.02] md:text-7xl">{t("hero.title")}</h1>
          <p className="mt-6 max-w-lg text-lg text-cream/85">{t("hero.sub")}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="hero" size="lg"><Link to="/trips">{t("cta.explore")} <ArrowRight className="rtl:-scale-x-100" /></Link></Button>
            <Button asChild variant="glass" size="lg"><Link to="/plan">{t("cta.plan")}</Link></Button>
          </div>
        </div>
      </section>

      <section className="container-x relative z-10 -mt-12">
        <Reveal>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border shadow-card lg:grid-cols-4">
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
        </Reveal>
      </section>

      <section className="container-x py-24">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">{t("home.featured")}</p>
            <h2 className="mt-2 text-3xl font-extrabold md:text-5xl">{t("home.featuredSub")}</h2>
          </div>
          <Link to="/trips" className="inline-flex items-center gap-1.5 font-bold text-primary hover:text-accent">
            {ar ? "عرض كل الرحلات" : "View all trips"} <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
          </Link>
        </Reveal>
        <div className="-mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 lg:grid-cols-3">
          {trips.slice(0, 3).map((tr, i) => (
            <Reveal key={tr.slug} delay={i * 120} className="min-w-[82%] snap-start md:min-w-0 [&>a]:h-full">
              <TripCard trip={tr} />
            </Reveal>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted-foreground">* {t("price.note")}</p>
      </section>

      <section className="container-x pb-24">
        <Reveal><h2 className="text-3xl font-extrabold md:text-5xl">{t("home.categories")}</h2></Reveal>
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {cats.map((c, i) => (
            <Reveal key={c.en} delay={i * 90}>
              <Link to="/trips" className="group relative block aspect-[3/4] overflow-hidden rounded-lg">
                <img src={c.img} alt={c.en} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                <div className="bg-hero-overlay absolute inset-0" />
                <span className="absolute inset-x-5 bottom-5 flex items-center justify-between text-xl font-extrabold text-cream">
                  {ar ? c.ar : c.en}
                  <ArrowRight className="h-5 w-5 text-gold transition group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="topo py-24 text-cream">
        <div className="container-x grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-32">
              <p className="eyebrow !text-gold">{ar ? "كيف تعمل الرحلة" : "How it works"}</p>
              <h2 className="mt-3 text-3xl font-extrabold md:text-5xl">{ar ? "من الفكرة إلى القمة في ثلاث خطوات" : "From idea to summit in three steps"}</h2>
              <p className="mt-4 max-w-md text-cream/70">{ar ? "نهتم بكل التفاصيل حتى تركّز أنت على المغامرة." : "We handle every detail so you can focus on the adventure."}</p>
              <Button asChild variant="hero" size="lg" className="mt-8"><Link to="/plan">{t("cta.plan")}</Link></Button>
            </div>
          </div>
          <div className="space-y-5 lg:col-span-3">
            {steps.map((st, i) => (
              <Reveal key={st.en}>
                <div className="rounded-2xl border border-cream/10 bg-cream/5 p-8 md:p-10 lg:min-h-[240px]">
                  <span className="text-5xl font-extrabold text-accent">0{i + 1}</span>
                  <h3 className="mt-4 text-2xl font-extrabold">{ar ? st.ar : st.en}</h3>
                  <p className="mt-2 max-w-md text-cream/70">{ar ? st.dAr : st.dEn}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x grid items-center gap-12 py-24 md:grid-cols-2">
        <Reveal>
          <div className="overflow-hidden rounded-lg shadow-card">
            <img src={images.summit} alt="Friends on a summit" loading="lazy" className="aspect-[4/3] w-full object-cover" />
          </div>
        </Reveal>
        <Reveal delay={120}>
          <p className="eyebrow">{t("home.story")}</p>
          <h2 className="mt-2 text-3xl font-extrabold md:text-5xl">{ar ? "وُلدنا من حب الطبيعة" : "Born from a love of wild places"}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{ar ? "نؤمن بأن أجمل الذكريات تُصنع في الهواء الطلق." : "We believe the best memories are made outdoors — on ridgelines, dunes and hidden trails, with good people."}</p>
          <Button asChild variant="outline" className="mt-6"><Link to="/about">{t("nav.about")}</Link></Button>
        </Reveal>
      </section>

      <section className="container-x pb-24">
        <Reveal><h2 className="text-3xl font-extrabold md:text-5xl">{t("home.gallery")}</h2></Reveal>
        <div className="mt-8 grid grid-cols-3 gap-3 md:gap-4">
          {gallery.map((col, ci) => (
            <Parallax key={ci} speed={[0.05, -0.08, 0.05][ci]} className={ci === 1 ? "mt-8 md:mt-16" : ""}>
              <div className="flex flex-col gap-3 md:gap-4">
                {col.map((src, i) => (
                  <img key={i} src={src} alt="" loading="lazy" className={`w-full rounded-lg object-cover ${(ci + i) % 2 ? "aspect-[3/4]" : "aspect-square"}`} />
                ))}
              </div>
            </Parallax>
          ))}
        </div>
      </section>

      <section className="bg-secondary py-24">
        <div className="container-x">
          <Reveal><p className="eyebrow">{t("home.voices")}</p></Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <Reveal key={n} delay={n * 100}>
                <blockquote className="h-full rounded-2xl bg-card p-6 shadow-card">
                  <p className="text-lg">“Placeholder testimonial — replace with a real traveler review.”</p>
                  <footer className="mt-4 text-sm text-muted-foreground">{t("placeholder")}</footer>
                </blockquote>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-24">
        <Reveal>
          <div className="topo rounded-2xl px-6 py-16 text-center text-cream md:py-20">
            <h2 className="mx-auto max-w-3xl text-3xl font-extrabold md:text-5xl">{t("home.finalTitle")}</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-cream/70">{t("home.finalSub")}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild variant="hero" size="lg"><Link to="/plan">{t("cta.plan")}</Link></Button>
              <Button asChild variant="whatsapp" size="lg"><a href={WHATSAPP_URL} target="_blank" rel="noreferrer">{t("cta.whatsapp")}</a></Button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
