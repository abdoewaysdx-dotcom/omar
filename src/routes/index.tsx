import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, CalendarCheck, Compass, MessageCircle, ShieldCheck, Users } from "lucide-react";
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
      {/* Hero — tile grid */}
      <section className="container-x pt-3">
        <div className="grid gap-2 lg:h-[620px] lg:grid-cols-4 lg:grid-rows-2">
          <div className="relative flex min-h-[460px] items-end overflow-hidden rounded-lg text-cream lg:col-span-2 lg:row-span-2">
            <img src={images.hero} alt="Hiker overlooking mountains at sunrise" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
            <div className="bg-hero-overlay absolute inset-0" />
            <div className="relative p-6 md:p-10">
              <p className="text-sm font-bold uppercase tracking-[0.08em] text-cream/80">{t("hero.eyebrow")}</p>
              <h1 className="mt-3 max-w-xl text-4xl font-bold leading-[1.06] md:text-5xl">{t("hero.title")}</h1>
              <p className="mt-4 max-w-md text-base text-cream/85 md:text-lg">{t("hero.sub")}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild variant="hero" size="lg"><Link to="/trips">{t("cta.explore")}</Link></Button>
                <Button asChild variant="glass" size="lg"><Link to="/plan">{t("cta.plan")}</Link></Button>
              </div>
            </div>
          </div>

          <Link to="/trips" className="group relative min-h-[240px] overflow-hidden rounded-lg text-cream lg:col-span-2">
            <img src={images.desert} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/10 to-transparent" />
            <div className="relative flex items-start justify-between p-6">
              <div>
                <h2 className="text-2xl font-bold">{ar ? "ليالي الصحراء" : "Desert nights"}</h2>
                <p className="mt-1 text-cream/85">{ar ? "غروب، نجوم، وصمت." : "Sunsets, stars and silence."}</p>
              </div>
              <span className="grid h-10 w-10 place-items-center rounded-full bg-background text-foreground transition group-hover:bg-accent group-hover:text-accent-foreground"><ArrowUpRight className="h-5 w-5 rtl:-scale-x-100" /></span>
            </div>
          </Link>

          <Link to="/plan" className="group flex min-h-[220px] flex-col justify-between rounded-lg bg-teal-deep p-6 text-cream">
            <div>
              <h2 className="text-xl font-bold">{ar ? "رحلة على مقاسك" : "Tailor-made trips"}</h2>
              <p className="mt-2 text-sm text-cream/70">{ar ? "أخبرنا بوجهتك ونصمّم لك الرحلة." : "Tell us where — we design the trip."}</p>
            </div>
            <span className="grid h-10 w-10 place-items-center rounded-full bg-accent text-accent-foreground"><ArrowUpRight className="h-5 w-5 rtl:-scale-x-100" /></span>
          </Link>

          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="group flex min-h-[220px] flex-col justify-between rounded-lg bg-secondary p-6">
            <div>
              <h2 className="text-xl font-bold">{ar ? "عندك سؤال؟" : "Got a question?"}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{ar ? "نرد عليك على واتساب." : "We reply on WhatsApp."}</p>
            </div>
            <span className="grid h-10 w-10 place-items-center rounded-full bg-whatsapp text-cream"><MessageCircle className="h-5 w-5" /></span>
          </a>
        </div>
      </section>

      {/* Trust row */}
      <section className="container-x pt-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 border-y border-border py-8 lg:grid-cols-4">
          {trust.map(({ Icon, en, ar: arT, subEn, subAr }) => (
            <div key={en} className="flex items-start gap-3">
              <Icon className="mt-0.5 h-6 w-6 shrink-0 text-accent" />
              <div>
                <p className="font-bold leading-tight">{ar ? arT : en}</p>
                <p className="mt-1 text-sm text-muted-foreground">{ar ? subAr : subEn}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured trips */}
      <section className="container-x py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">{t("home.featured")}</p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">{t("home.featuredSub")}</h2>
          </div>
          <Link to="/trips" className="inline-flex items-center gap-1.5 font-bold text-foreground underline-offset-4 hover:text-accent hover:underline">
            {ar ? "عرض كل الرحلات" : "View all trips"} <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
          </Link>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {trips.slice(0, 3).map((tr) => <TripCard key={tr.slug} trip={tr} />)}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">* {t("price.note")}</p>
      </section>

      {/* Categories — text on top, art below */}
      <section className="container-x pb-20">
        <h2 className="text-3xl font-bold md:text-4xl">{t("home.categories")}</h2>
        <div className="mt-8 grid grid-cols-2 gap-2 lg:grid-cols-4">
          {cats.map((c) => (
            <Link key={c.en} to="/trips" className="group flex aspect-[4/5] flex-col overflow-hidden rounded-lg bg-teal-deep text-cream">
              <div className="p-5">
                <h3 className="text-lg font-bold">{ar ? c.ar : c.en}</h3>
                <span className="mt-1 inline-flex items-center gap-1 text-sm text-cream/70 transition group-hover:text-accent">
                  {ar ? "استكشف" : "Explore"} <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
                </span>
              </div>
              <div className="relative min-h-0 flex-1">
                <img src={c.img} alt={c.en} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works — charcoal tile */}
      <section className="container-x pb-20">
        <div className="rounded-lg bg-teal-deep p-8 text-cream md:p-14">
          <p className="text-sm font-bold uppercase tracking-[0.08em] text-cream/60">{ar ? "كيف تعمل الرحلة" : "How it works"}</p>
          <h2 className="mt-3 max-w-xl text-3xl font-bold md:text-4xl">{ar ? "من الفكرة إلى القمة في ثلاث خطوات" : "From idea to summit in three steps"}</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {steps.map((st, i) => (
              <div key={st.en} className="border-t border-cream/20 pt-6">
                <span className="text-sm font-bold text-accent">0{i + 1}</span>
                <h3 className="mt-3 text-xl font-bold">{ar ? st.ar : st.en}</h3>
                <p className="mt-2 text-cream/70">{ar ? st.dAr : st.dEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="container-x grid items-center gap-12 pb-20 md:grid-cols-2">
        <img src={images.summit} alt="Friends on a summit" loading="lazy" className="aspect-[4/3] w-full rounded-lg object-cover" />
        <div>
          <p className="eyebrow">{t("home.story")}</p>
          <h2 className="mt-2 text-3xl font-bold md:text-4xl">{ar ? "وُلدنا من حب الطبيعة" : "Born from a love of wild places"}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{ar ? "نؤمن بأن أجمل الذكريات تُصنع في الهواء الطلق." : "We believe the best memories are made outdoors — on ridgelines, dunes and hidden trails, with good people."}</p>
          <Button asChild variant="outline" className="mt-6"><Link to="/about">{t("nav.about")}</Link></Button>
        </div>
      </section>

      {/* Gallery */}
      <section className="container-x pb-20">
        <h2 className="text-3xl font-bold md:text-4xl">{t("home.gallery")}</h2>
        <div className="mt-8 grid grid-cols-2 gap-2 md:grid-cols-3">
          {[images.camp, images.kayak, images.desert, images.alpine, images.wadi, images.summit].map((src, i) => (
            <img key={i} src={src} alt="" loading="lazy" className="aspect-[4/3] w-full rounded-lg object-cover" />
          ))}
        </div>
      </section>

      {/* Voices */}
      <section className="container-x pb-20">
        <p className="eyebrow">{t("home.voices")}</p>
        <div className="mt-4 grid gap-2 md:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <blockquote key={n} className="rounded-lg bg-secondary p-6">
              <p className="text-lg">“Placeholder testimonial — replace with a real traveler review.”</p>
              <footer className="mt-4 text-sm text-muted-foreground">{t("placeholder")}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="container-x pb-20">
        <div className="rounded-lg bg-teal-deep px-6 py-16 text-center text-cream md:py-20">
          <h2 className="mx-auto max-w-3xl text-3xl font-bold md:text-5xl">{t("home.finalTitle")}</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-cream/70">{t("home.finalSub")}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild variant="hero" size="lg"><Link to="/plan">{t("cta.plan")}</Link></Button>
            <Button asChild variant="whatsapp" size="lg"><a href={WHATSAPP_URL} target="_blank" rel="noreferrer">{t("cta.whatsapp")}</a></Button>
          </div>
        </div>
      </section>
    </>
  );
}
