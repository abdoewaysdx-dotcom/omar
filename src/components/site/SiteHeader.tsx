import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useScrollProgress } from "./motion";
import { Instagram, Menu, MessageCircle, X } from "lucide-react";
import logo from "@/assets/widego-logo.png";
import { INSTAGRAM_URL, WHATSAPP_URL, useI18n, type DictKey } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const links: { to: "/" | "/trips" | "/about" | "/plan" | "/contact"; k: DictKey }[] = [
  { to: "/", k: "nav.home" },
  { to: "/trips", k: "nav.trips" },
  { to: "/about", k: "nav.about" },
  { to: "/plan", k: "nav.plan" },
  { to: "/contact", k: "nav.contact" },
];

export function LangSwitch({ className }: { className?: string }) {
  const { lang, setLang } = useI18n();
  return (
    <button
      type="button"
      onClick={() => setLang(lang === "en" ? "ar" : "en")}
      className={cn("rounded-full border border-cream/30 px-3.5 py-1.5 text-xs font-bold transition hover:bg-cream hover:text-charcoal", className)}
      aria-label="Switch language"
    >
      {lang === "en" ? "العربية" : "English"}
    </button>
  );
}

export function SiteHeader(_props: { overlay?: boolean }) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const { progress, scrollY } = useScrollProgress();
  const scrolled = scrollY > 40;

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 md:px-6">
      <div className={cn("glass-nav relative mx-auto max-w-[1400px] overflow-hidden rounded-2xl border border-cream/10 text-cream transition-shadow duration-500", scrolled && "shadow-lg")}>
        <div className={cn("flex items-center justify-between gap-4 px-4 transition-all duration-500 md:px-5", scrolled ? "h-14" : "h-[68px]")}>
          <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <img src={logo} alt="Widego Adventures" width={44} height={44} className={cn("rounded-full ring-2 ring-cream/70 transition-all duration-500", scrolled ? "h-9 w-9" : "h-11 w-11")} />
          </Link>
          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className="rounded-full px-4 py-2 text-sm font-semibold text-cream/75 transition hover:bg-cream/10 hover:text-cream"
                activeProps={{ className: "!bg-cream/15 !text-cream" }}
              >
                {t(l.k)}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label="Instagram" className="hidden rounded-full p-2 text-cream/75 transition hover:text-gold sm:block">
              <Instagram className="h-5 w-5" />
            </a>
            <LangSwitch />
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-accent-foreground transition hover:brightness-105 md:inline-flex"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
            <button className="rounded-full p-2 lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        {open && (
          <nav className="flex flex-col gap-1 px-4 pb-5 lg:hidden">
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-lg font-semibold hover:bg-cream/10">
                {t(l.k)}
              </Link>
            ))}
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="mt-2 rounded-full bg-accent px-4 py-3 text-center font-bold text-accent-foreground">
              WhatsApp +971 56 699 9901
            </a>
          </nav>
        )}
        <div className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-accent" style={{ transform: `scaleX(${progress})` }} />
      </div>
    </header>
  );
}
