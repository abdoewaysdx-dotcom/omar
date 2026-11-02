import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { images } from "@/data/trips";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Widego Adventures" },
      { name: "description", content: "Our story: adventure, discovery, nature and meaningful travel." },
      { property: "og:title", content: "About Widego Adventures" },
      { property: "og:description", content: "Adventure, discovery and meaningful travel experiences." },
    ],
  }),
  component: About,
});

function About() {
  const { t, lang } = useI18n();
  const ar = lang === "ar";
  return (
    <>
      <PageHero image={images.camp} eyebrow={t("home.story")} title={ar ? "نحو ما وراء المألوف" : "Built for the curious and the wild at heart"} />
      <section className="container-x grid gap-12 py-24 md:grid-cols-2">
        <p className="text-2xl leading-relaxed">{ar ? "وايدقو مجتمع من محبي المغامرة يجمع الناس عبر الطبيعة." : "Widego Adventures brings people together through nature — from mountain ridges and desert dunes to hidden wadis and journeys abroad."}</p>
        <p className="text-muted-foreground">{ar ? "نصمم تجارب آمنة ومدروسة لكل المستويات." : "We design thoughtful, safe experiences for every level, and plan custom trips across the UAE, Oman and the wider GCC. (Placeholder story — replace with your own words.)"}</p>
      </section>
      <section className="container-x grid gap-4 pb-24 md:grid-cols-3">
        {[images.summit, images.desert, images.kayak].map((s, i) => <img key={i} src={s} alt="" loading="lazy" className="aspect-[3/4] w-full rounded-3xl object-cover" />)}
      </section>
    </>
  );
}
