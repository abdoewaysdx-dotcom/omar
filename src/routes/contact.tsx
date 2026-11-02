import { createFileRoute } from "@tanstack/react-router";
import { Instagram, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { InquiryForm } from "@/components/site/InquiryForm";
import { images } from "@/data/trips";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, WHATSAPP_URL, useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Widego Adventures" },
      { name: "description", content: "Reach Widego Adventures on WhatsApp, Instagram or by inquiry form." },
      { property: "og:title", content: "Contact Widego Adventures" },
      { property: "og:description", content: "Message us on WhatsApp or Instagram." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { t } = useI18n();
  return (
    <>
      <PageHero image={images.desert} eyebrow={t("nav.contact")} title={t("home.finalTitle")} />
      <section className="container-x grid gap-10 py-16 lg:grid-cols-3">
        <div className="space-y-4">
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-lg border border-border bg-card p-6 hover:text-accent">
            <MessageCircle className="h-6 w-6 text-whatsapp" /><span dir="ltr" className="font-semibold">+971 56 699 9901</span>
          </a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-lg border border-border bg-card p-6 hover:text-accent">
            <Instagram className="h-6 w-6 text-accent" /><span className="font-semibold">@{INSTAGRAM_HANDLE}</span>
          </a>
        </div>
        <div className="lg:col-span-2">
          <InquiryForm context="General contact" fields={["name", "email", "whatsapp", "message"]} />
        </div>
      </section>
    </>
  );
}
