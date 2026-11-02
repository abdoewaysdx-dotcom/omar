import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { InquiryForm } from "@/components/site/InquiryForm";
import { images } from "@/data/trips";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/plan")({
  head: () => ({
    meta: [
      { title: "Plan a Custom Trip — Widego Adventures" },
      { name: "description", content: "Request a tailor-made adventure across the UAE, Oman and the GCC." },
      { property: "og:title", content: "Plan a Custom Trip — Widego Adventures" },
      { property: "og:description", content: "Tell us your dream trip and we'll design it with you." },
    ],
  }),
  component: Plan,
});

function Plan() {
  const { t } = useI18n();
  return (
    <>
      <PageHero image={images.wadi} eyebrow={t("nav.plan")} title={t("cta.plan")} sub={t("home.finalSub")} />
      <section className="container-x max-w-3xl py-16">
        <InquiryForm context="Custom trip" fields={["name", "email", "whatsapp", "destination", "date", "travelers", "experience", "notes"]} />
      </section>
    </>
  );
}
