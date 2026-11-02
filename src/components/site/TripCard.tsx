import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Clock, MapPin, Mountain } from "lucide-react";
import { difficultyLabels, typeLabels, type Trip } from "@/data/trips";
import { useI18n } from "@/lib/i18n";

export function Duration({ days }: { days: number }) {
  const { t } = useI18n();
  return <>{days} {days === 1 ? t("trips.day") : t("trips.days")}</>;
}

export function TripCard({ trip }: { trip: Trip }) {
  const { t, l } = useI18n();
  return (
    <Link
      to="/trips/$slug"
      params={{ slug: trip.slug }}
      className="group flex flex-col overflow-hidden rounded-3xl bg-card shadow-card transition duration-500 hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={trip.image} alt={l(trip.title)} loading="lazy" width={1280} height={960} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <span className="absolute start-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-bold text-primary backdrop-blur">
          {l(typeLabels[trip.type])}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="flex items-center gap-1.5 text-sm font-semibold text-accent"><MapPin className="h-4 w-4" />{l(trip.destination)}</p>
        <h3 className="mt-2 text-2xl font-semibold leading-tight">{l(trip.title)}</h3>
        <p className="mt-2 line-clamp-2 text-muted-foreground">{l(trip.summary)}</p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /><Duration days={trip.durationDays} /></span>
          <span className="flex items-center gap-1.5"><Mountain className="h-4 w-4" />{l(difficultyLabels[trip.difficulty])}</span>
        </div>
        <div className="mt-auto flex items-end justify-between pt-6">
          <div>
            <p className="text-xs text-muted-foreground">{t("trips.from")}</p>
            <p className="text-xl font-bold text-primary">AED {trip.price.toLocaleString()}*</p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground transition group-hover:bg-accent">
            {t("cta.view")} <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
          </span>
        </div>
      </div>
    </Link>
  );
}
