import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Clock, MapPin } from "lucide-react";
import { difficultyLabels, typeLabels, type Difficulty, type Trip } from "@/data/trips";
import { useI18n } from "@/lib/i18n";

export function Duration({ days }: { days: number }) {
  const { t } = useI18n();
  return <>{days} {days === 1 ? t("trips.day") : t("trips.days")}</>;
}

const level: Record<Difficulty, number> = { easy: 1, moderate: 2, challenging: 3 };

export function DifficultyMeter({ value }: { value: Difficulty }) {
  const { l } = useI18n();
  return (
    <span className="inline-flex items-center gap-2">
      <span className="flex items-end gap-0.5" aria-hidden>
        {[1, 2, 3].map((n) => (
          <span key={n} className={`w-1 rounded-sm ${n <= level[value] ? "bg-accent" : "bg-border"}`} style={{ height: 6 + n * 3 }} />
        ))}
      </span>
      {l(difficultyLabels[value])}
    </span>
  );
}

export function TripCard({ trip }: { trip: Trip }) {
  const { t, l } = useI18n();
  return (
    <Link
      to="/trips/$slug"
      params={{ slug: trip.slug }}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card transition duration-300 hover:-translate-y-1 hover:border-accent/40"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={trip.image} alt={l(trip.title)} loading="lazy" width={1280} height={960} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />
        <span className="absolute start-3 top-3 rounded-md bg-teal-deep/90 px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-wider text-cream backdrop-blur">
          {l(typeLabels[trip.type])}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground"><MapPin className="h-3.5 w-3.5 text-accent" />{l(trip.destination)}</p>
        <h3 className="mt-2 text-xl font-extrabold leading-snug">{l(trip.title)}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{l(trip.summary)}</p>
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-4 text-sm font-semibold">
          <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-muted-foreground" /><Duration days={trip.durationDays} /></span>
          <DifficultyMeter value={trip.difficulty} />
        </div>
        <div className="mt-auto flex items-end justify-between pt-5">
          <div>
            <p className="text-xs font-semibold text-muted-foreground">{t("trips.from")}</p>
            <p className="text-xl font-extrabold text-primary">AED {trip.price.toLocaleString()}*</p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-lg bg-primary px-3.5 py-2 text-sm font-bold text-primary-foreground transition group-hover:bg-accent">
            {t("cta.view")} <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
          </span>
        </div>
      </div>
    </Link>
  );
}
