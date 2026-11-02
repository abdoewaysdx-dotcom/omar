import { createFileRoute, notFound } from "@tanstack/react-router";
import { Check, Clock, MapPin, MessageCircle, Mountain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/PageHero";
import { Duration, TripCard } from "@/components/site/TripCard";
import { InquiryForm } from "@/components/site/InquiryForm";
import { difficultyLabels, getTrip, trips } from "@/data/trips";
import { useI18n, whatsappLink } from "@/lib/i18n";

export const Route = createFileRoute("/trips/$slug")({
  loader: ({ params }) => {
    const trip = getTrip(params.slug);
    if (!trip) throw notFound();
    return { slug: trip.slug, title: trip.title.en, summary: trip.summary.en };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — Widego Adventures` },
          { name: "description", content: loaderData.summary },
          { property: "og:title", content: loaderData.title },
          { property: "og:description", content: loaderData.summary },
        ]
      : [{ title: "Trip not found — Widego" }, { name: "robots", content: "noindex" }],
  }),
  component: TripPage,
});

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <ul className="mt-3 space-y-2">{items.map((i) => <li key={i} className="flex gap-2 text-muted-foreground"><Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />{i}</li>)}</ul>
    </div>
  );
}

function TripPage() {
  const { slug } = Route.useLoaderData();
  const trip = getTrip(slug)!;
  const { t, l } = useI18n();
  return (
    <>
      <PageHero image={trip.image} eyebrow={l(trip.destination)} title={l(trip.title)} sub={l(trip.summary)} />
      <section className="container-x grid gap-12 py-16 lg:grid-cols-3">
        <div className="space-y-12 lg:col-span-2">
          <div className="grid grid-cols-3 gap-3">
            {trip.gallery.map((g, i) => <img key={i} src={g} alt="" loading="lazy" className="aspect-[4/3] w-full rounded-2xl object-cover" />)}
          </div>
          <div>
            <h2 className="text-3xl font-semibold">Overview</h2>
            <p className="mt-3 text-muted-foreground">{trip.overview}</p>
          </div>
          <List title="Highlights" items={trip.highlights} />
          <div>
            <h3 className="text-xl font-semibold">Itinerary</h3>
            <ol className="mt-4 space-y-4 border-s-2 border-accent/40 ps-6">
              {trip.itinerary.map((s) => <li key={s.title}><p className="font-semibold">{s.title}</p><p className="text-muted-foreground">{s.detail}</p></li>)}
            </ol>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            <List title="Inclusions" items={trip.inclusions} />
            <List title="What to bring" items={trip.bring} />
          </div>
          <List title="Important notes" items={trip.notes} />
          <InquiryForm title="Booking inquiry" context={trip.title.en} fields={["name", "email", "whatsapp", "date", "travelers", "notes"]} />
        </div>
        <aside className="lg:sticky lg:top-28 h-fit rounded-3xl bg-card p-6 shadow-card">
          <p className="text-sm text-muted-foreground">{t("trips.from")}</p>
          <p className="text-3xl font-bold text-primary">AED {trip.price.toLocaleString()}*</p>
          <p className="mt-1 text-xs text-muted-foreground">* {t("price.note")}</p>
          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex gap-2"><Clock className="h-4 w-4 text-accent" /><Duration days={trip.durationDays} /></li>
            <li className="flex gap-2"><Mountain className="h-4 w-4 text-accent" />{l(difficultyLabels[trip.difficulty])}</li>
            <li className="flex gap-2"><MapPin className="h-4 w-4 text-accent" />{trip.meetingPoint}</li>
          </ul>
          <Button asChild variant="whatsapp" size="lg" className="mt-6 w-full">
            <a href={whatsappLink(`Hi Widego! I'm interested in: ${trip.title.en}`)} target="_blank" rel="noreferrer"><MessageCircle /> {t("cta.whatsapp")}</a>
          </Button>
        </aside>
      </section>
      <section className="container-x pb-24">
        <h2 className="text-3xl font-semibold">More adventures</h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {trips.filter((x) => x.slug !== trip.slug).slice(0, 3).map((x) => <TripCard key={x.slug} trip={x} />)}
        </div>
      </section>
    </>
  );
}
