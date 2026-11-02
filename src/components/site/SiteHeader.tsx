import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
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
      className={cn("rounded-lg border border-current/30 px-3 py-1.5 text-xs font-bold transition hover:bg-accent hover:text-accent-foreground hover:border-accent", className)}
      aria-label="Switch language"
    >
      {lang === "en" ? "العربية" : "English"}
    </button>
  );
}

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  const solid = !overlay || scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        solid ? "border-b border-border bg-background/95 text-foreground backdrop-blur-lg" : "bg-transparent text-cream",
      )}
    >
      {!solid && <div className="bg-header-fade pointer-events-none absolute inset-x-0 top-0 h-28" />}
      <div className="container-x relative flex h-[72px] items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img src={logo} alt="Widego Adventures" width={48} height={48} className="h-12 w-12 rounded-full ring-2 ring-cream/80" />
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="rounded-lg px-4 py-2 text-sm font-semibold opacity-85 transition hover:opacity-100"
              activeProps={{ className: "!opacity-100 text-accent" }}
            >
              {t(l.k)}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label="Instagram" className="hidden rounded-full p-2 transition hover:text-accent sm:block">
            <Instagram className="h-5 w-5" />
          </a>
          <LangSwitch />
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-bold text-accent-foreground shadow-glow transition hover:-translate-y-0.5 md:inline-flex"
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
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-lg font-semibold hover:bg-muted">
              {t(l.k)}
            </Link>
          ))}
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="mt-2 rounded-xl bg-accent px-4 py-3 text-center font-bold text-accent-foreground">
            WhatsApp +971 56 699 9901
          </a>
        </nav>
      )}
    </header>
  );
}
