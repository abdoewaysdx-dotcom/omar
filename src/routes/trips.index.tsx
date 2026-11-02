import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHero } from "@/components/site/PageHero";
import { TripCard } from "@/components/site/TripCard";
import { difficultyLabels, images, regionLabels, trips, typeLabels } from "@/data/trips";
import { useI18n, type Localized } from "@/lib/i18n";

export const Route = createFileRoute("/trips/")({
  head: () => ({
    meta: [
      { title: "Explore Trips — Widego Adventures" },
      { name: "description", content: "Browse hikes, desert walks, wadi escapes and international treks." },
      { property: "og:title", content: "Explore Trips — Widego Adventures" },
      { property: "og:description", content: "Find your next adventure in the UAE, Oman and beyond." },
    ],
  }),
  component: Trips,
});

const durations: Record<string, Localized> = {
  day: { en: "1 day", ar: "يوم واحد" },
  short: { en: "2–3 days", ar: "2–3 أيام" },
  long: { en: "4+ days", ar: "4+ أيام" },
};

function Trips() {
  const { t, l, lang } = useI18n();
  const [q, setQ] = useState("");
  const [region, setRegion] = useState("");
  const [type, setType] = useState("");
  const [dur, setDur] = useState("");
  const [diff, setDiff] = useState("");

  const list = useMemo(() => trips.filter((tr) => {
    const text = `${tr.title.en} ${tr.title.ar} ${tr.destination.en} ${tr.destination.ar}`.toLowerCase();
    const d = tr.durationDays === 1 ? "day" : tr.durationDays <= 3 ? "short" : "long";
    return (!q || text.includes(q.toLowerCase())) && (!region || tr.region === region) && (!type || tr.type === type) && (!dur || d === dur) && (!diff || tr.difficulty === diff);
  }), [q, region, type, dur, diff]);

  const sel = (label: string, value: string, set: (v: string) => void, opts: Record<string, Localized>) => (
    <select aria-label={label} value={value} onChange={(e) => set(e.target.value)} className="rounded-lg border border-input bg-card px-4 py-2.5 text-sm font-semibold">
      <option value="">{label}: {t("trips.all")}</option>
      {Object.entries(opts).map(([k, v]) => <option key={k} value={k}>{l(v)}</option>)}
    </select>
  );

  return (
    <>
      <PageHero image={images.alpine} eyebrow="Widego" title={t("trips.title")} sub={t("trips.sub")} />
      <section className="container-x py-12">
        <div className="flex flex-wrap gap-3">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("trips.search")} className="min-w-60 flex-1 rounded-lg border border-input bg-card px-4 py-2.5" />
          {sel(t("trips.destination"), region, setRegion, regionLabels)}
          {sel(t("trips.type"), type, setType, typeLabels)}
          {sel(t("trips.duration"), dur, setDur, durations)}
          {sel(t("trips.difficulty"), diff, setDiff, difficultyLabels)}
        </div>
        <p className="mt-6 text-sm font-extrabold text-muted-foreground">{list.length} {lang === "ar" ? "رحلة" : list.length === 1 ? "trip" : "trips"}</p>
        {list.length ? (
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{list.map((tr) => <TripCard key={tr.slug} trip={tr} />)}</div>
        ) : (
          <p className="py-20 text-center text-muted-foreground">{t("trips.none")}</p>
        )}
        <p className="mt-10 text-sm text-muted-foreground">* {t("price.note")}</p>
      </section>
    </>
  );
}
