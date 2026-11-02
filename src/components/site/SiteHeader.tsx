import { Link } from "@tanstack/react-router";
import { useState } from "react";
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
      className={cn("rounded-full border border-foreground/30 px-3.5 py-1.5 text-xs font-bold transition hover:bg-foreground hover:text-background", className)}
      aria-label="Switch language"
    >
      {lang === "en" ? "العربية" : "English"}
    </button>
  );
}

export function SiteHeader(_props: { overlay?: boolean }) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background text-foreground">
      <div className="container-x flex h-[72px] items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img src={logo} alt="Widego Adventures" width={44} height={44} className="h-11 w-11 rounded-full" />
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="rounded-full px-4 py-2 text-[0.95rem] font-semibold text-foreground/70 transition hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "!bg-secondary !text-foreground" }}
            >
              {t(l.k)}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label="Instagram" className="hidden rounded-full p-2 text-foreground/70 transition hover:text-accent sm:block">
            <Instagram className="h-5 w-5" />
          </a>
          <LangSwitch />
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-accent-foreground transition hover:brightness-90 md:inline-flex"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
          <button className="rounded-full p-2 lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="container-x flex flex-col gap-1 pb-6 lg:hidden">
          {links.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="rounded-lg px-4 py-3 text-lg font-semibold hover:bg-secondary">
              {t(l.k)}
            </Link>
          ))}
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="mt-2 rounded-full bg-accent px-4 py-3 text-center font-bold text-accent-foreground">
            WhatsApp +971 56 699 9901
          </a>
        </nav>
      )}
    </header>
  );
}
