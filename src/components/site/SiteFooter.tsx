import { Link } from "@tanstack/react-router";
import { Instagram, MessageCircle } from "lucide-react";
import logo from "@/assets/widego-logo.png";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, WHATSAPP_URL, useI18n } from "@/lib/i18n";

export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-border bg-background">
      <div className="container-x grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <img src={logo} alt="Widego Adventures" width={72} height={72} loading="lazy" className="h-[72px] w-[72px] rounded-full" />
          <p className="mt-5 max-w-sm text-muted-foreground">{t("footer.tag")}</p>
        </div>
        <div>
          <h4 className="eyebrow">{t("footer.explore")}</h4>
          <ul className="mt-4 space-y-2.5">
            <li><Link to="/trips" className="hover:text-accent">{t("nav.trips")}</Link></li>
            <li><Link to="/plan" className="hover:text-accent">{t("nav.plan")}</Link></li>
            <li><Link to="/about" className="hover:text-accent">{t("nav.about")}</Link></li>
            <li><Link to="/contact" className="hover:text-accent">{t("nav.contact")}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="eyebrow">{t("footer.contact")}</h4>
          <ul className="mt-4 space-y-3">
            <li>
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-accent">
                <MessageCircle className="h-4 w-4" /> <span dir="ltr">+971 56 699 9901</span>
              </a>
            </li>
            <li>
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-accent">
                <Instagram className="h-4 w-4" /> @{INSTAGRAM_HANDLE}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-x py-6 text-sm text-muted-foreground">© {new Date().getFullYear()} Widego Adventures. {t("footer.rights")}</div>
      </div>
    </footer>
  );
}
