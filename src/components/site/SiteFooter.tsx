import { Link } from "@tanstack/react-router";
import { Instagram, MessageCircle } from "lucide-react";
import logo from "@/assets/widego-logo.png";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, WHATSAPP_URL, useI18n } from "@/lib/i18n";

export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="topo text-cream">
      <div className="container-x grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <img src={logo} alt="Widego Adventures" width={80} height={80} loading="lazy" className="h-20 w-20 rounded-full" />
          <p className="mt-5 max-w-sm text-cream/75">{t("footer.tag")}</p>
        </div>
        <div>
          <h4 className="eyebrow !text-gold">{t("footer.explore")}</h4>
          <ul className="mt-4 space-y-2 text-cream/80">
            <li><Link to="/trips" className="hover:text-gold">{t("nav.trips")}</Link></li>
            <li><Link to="/plan" className="hover:text-gold">{t("nav.plan")}</Link></li>
            <li><Link to="/about" className="hover:text-gold">{t("nav.about")}</Link></li>
            <li><Link to="/contact" className="hover:text-gold">{t("nav.contact")}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="eyebrow !text-gold">{t("footer.contact")}</h4>
          <ul className="mt-4 space-y-3 text-cream/80">
            <li>
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-gold">
                <MessageCircle className="h-4 w-4" /> <span dir="ltr">+971 56 699 9901</span>
              </a>
            </li>
            <li>
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-gold">
                <Instagram className="h-4 w-4" /> @{INSTAGRAM_HANDLE}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="container-x py-6 text-sm text-cream/60">© {new Date().getFullYear()} Widego Adventures. {t("footer.rights")}</div>
      </div>
    </footer>
  );
}
