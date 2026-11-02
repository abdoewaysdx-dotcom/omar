import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_URL, useI18n } from "@/lib/i18n";

const prefersReduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Fades + lifts content in when it scrolls into view. Content is visible without JS / for reduced motion. */
export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "hidden" | "shown">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced() || !("IntersectionObserver" in window)) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
      setState("shown");
      return;
    }
    setState("hidden");
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setState("shown");
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const hidden = state === "hidden";
  return (
    <div
      ref={ref}
      style={{ transitionDelay: hidden ? "0ms" : `${delay}ms` }}
      className={`transition duration-700 ease-out will-change-transform ${hidden ? "translate-y-8 opacity-0" : "translate-y-0 opacity-100"} ${className}`}
    >
      {children}
    </div>
  );
}

/** Drifts its children vertically relative to scrolling (speed > 0 = slower than the page, < 0 = faster). */
export function Parallax({ children, speed = 0.15, className = "", style }: { children: ReactNode; speed?: number; className?: string; style?: CSSProperties }) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const o = outer.current;
    const i = inner.current;
    if (!o || !i || prefersReduced()) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = o.getBoundingClientRect();
      if (r.bottom < -300 || r.top > window.innerHeight + 300) return;
      const d = r.top + r.height / 2 - window.innerHeight / 2;
      i.style.transform = `translate3d(0, ${Math.round(-d * speed)}px, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [speed]);
  return (
    <div ref={outer} className={className} style={style}>
      <div ref={inner} className="h-full" style={{ willChange: "transform" }}>
        {children}
      </div>
    </div>
  );
}

/** Scroll progress 0..1 of the whole page. */
export function useScrollProgress() {
  const [p, setP] = useState(0);
  const [y, setY] = useState(0);
  useEffect(() => {
    let raf = 0;
    const calc = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setY(window.scrollY);
      setP(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(calc);
    };
    calc();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return { progress: p, scrollY: y };
}

/** Floating call-to-action: a WhatsApp bubble, plus a glass bar that slides up after the hero. */
export function FloatingCTA() {
  const { t, lang } = useI18n();
  const { scrollY } = useScrollProgress();
  const show = scrollY > 700;
  return (
    <>
      <div
        className={`glass-nav fixed bottom-4 start-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full border border-cream/10 p-1.5 ps-5 text-cream shadow-lg transition duration-500 rtl:translate-x-1/2 ${show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-24 opacity-0"}`}
        aria-hidden={!show}
      >
        <span className="hidden text-sm font-semibold sm:block">{lang === "ar" ? "جاهز لمغامرتك القادمة؟" : "Ready for your next adventure?"}</span>
        <Link to="/plan" tabIndex={show ? 0 : -1} className="rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-accent-foreground transition hover:brightness-105">
          {t("cta.plan")}
        </Link>
        <a href={WHATSAPP_URL} tabIndex={show ? 0 : -1} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="grid h-10 w-10 place-items-center rounded-full bg-whatsapp text-cream">
          <MessageCircle className="h-5 w-5" />
        </a>
      </div>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        className={`fixed bottom-5 end-5 z-40 hidden h-14 w-14 place-items-center rounded-full bg-whatsapp text-cream shadow-lg transition hover:scale-105 md:grid ${show ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </>
  );
}
