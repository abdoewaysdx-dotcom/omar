import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "ar";
export type Localized = { en: string; ar: string };

export const WHATSAPP_NUMBER = "971566999901";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
export const INSTAGRAM_URL = "https://www.instagram.com/widego.adventures/";
export const INSTAGRAM_HANDLE = "widego.adventures";
export const whatsappLink = (text: string) => `${WHATSAPP_URL}?text=${encodeURIComponent(text)}`;

const dict = {
  "nav.home": { en: "Home", ar: "الرئيسية" },
  "nav.trips": { en: "Explore Trips", ar: "الرحلات" },
  "nav.about": { en: "About", ar: "من نحن" },
  "nav.plan": { en: "Custom Trip", ar: "رحلة مخصصة" },
  "nav.contact": { en: "Contact", ar: "تواصل معنا" },
  "cta.explore": { en: "Explore Our Adventures", ar: "اكتشف مغامراتنا" },
  "cta.plan": { en: "Plan Your Trip", ar: "خطط رحلتك" },
  "cta.view": { en: "View Trip", ar: "عرض الرحلة" },
  "cta.whatsapp": { en: "Chat on WhatsApp", ar: "تواصل عبر واتساب" },
  "hero.eyebrow": { en: "UAE · Oman · Beyond", ar: "الإمارات · عُمان · وما بعدها" },
  "hero.title": { en: "Go Beyond the Ordinary", ar: "انطلق إلى ما وراء المألوف" },
  "hero.sub": {
    en: "Guided hikes, desert sunsets, hidden wadis and journeys abroad — discover extraordinary places with people who love the outdoors.",
    ar: "رحلات مشي بإرشاد، غروب الصحراء، أودية خفية ورحلات حول العالم — اكتشف أماكن استثنائية مع من يعشقون الطبيعة.",
  },
  "home.featured": { en: "Featured adventures", ar: "مغامرات مميزة" },
  "home.featuredSub": { en: "A taste of what's waiting for you out there.", ar: "لمحة عمّا ينتظرك هناك." },
  "home.categories": { en: "Explore by experience", ar: "استكشف حسب التجربة" },
  "home.why": { en: "Why Widego", ar: "لماذا وايدقو" },
  "home.story": { en: "Our story", ar: "قصتنا" },
  "home.gallery": { en: "Moments from the trail", ar: "لحظات من الطريق" },
  "home.voices": { en: "Traveler voices", ar: "آراء المسافرين" },
  "home.finalTitle": { en: "Your next adventure starts with a message", ar: "مغامرتك القادمة تبدأ برسالة" },
  "home.finalSub": { en: "Tell us where you dream of going — we'll help you get there.", ar: "أخبرنا إلى أين تحلم بالذهاب — وسنساعدك للوصول." },
  "trips.title": { en: "Explore trips", ar: "استكشف الرحلات" },
  "trips.sub": { en: "Find your kind of adventure across the UAE, Oman and beyond.", ar: "اعثر على مغامرتك في الإمارات وعُمان وخارجها." },
  "trips.search": { en: "Search trips…", ar: "ابحث عن رحلة…" },
  "trips.all": { en: "All", ar: "الكل" },
  "trips.destination": { en: "Destination", ar: "الوجهة" },
  "trips.type": { en: "Trip type", ar: "نوع الرحلة" },
  "trips.duration": { en: "Duration", ar: "المدة" },
  "trips.difficulty": { en: "Difficulty", ar: "الصعوبة" },
  "trips.none": { en: "No trips match your filters yet.", ar: "لا توجد رحلات مطابقة حالياً." },
  "trips.from": { en: "From", ar: "ابتداءً من" },
  "trips.day": { en: "day", ar: "يوم" },
  "trips.days": { en: "days", ar: "أيام" },
  "trips.reset": { en: "Reset filters", ar: "إعادة الضبط" },
  "price.note": { en: "Placeholder price — final price confirmed by our team.", ar: "سعر مبدئي — يؤكده فريقنا لاحقاً." },
  "form.name": { en: "Full name", ar: "الاسم الكامل" },
  "form.email": { en: "Email", ar: "البريد الإلكتروني" },
  "form.whatsapp": { en: "WhatsApp number", ar: "رقم الواتساب" },
  "form.destination": { en: "Preferred destination", ar: "الوجهة المفضلة" },
  "form.date": { en: "Preferred date", ar: "التاريخ المفضل" },
  "form.travelers": { en: "Number of travelers", ar: "عدد المسافرين" },
  "form.experience": { en: "Type of experience", ar: "نوع التجربة" },
  "form.notes": { en: "Additional notes", ar: "ملاحظات إضافية" },
  "form.message": { en: "Your message", ar: "رسالتك" },
  "form.submit": { en: "Send inquiry", ar: "أرسل الاستفسار" },
  "form.disclaimer": {
    en: "This is an inquiry, not a confirmed booking. Our team will contact you to confirm availability and details.",
    ar: "هذا استفسار وليس حجزاً مؤكداً. سيتواصل معك فريقنا لتأكيد التوفر والتفاصيل.",
  },
  "form.thanks": { en: "Thank you — we've received your inquiry!", ar: "شكراً لك — استلمنا استفسارك!" },
  "form.thanksSub": {
    en: "Our team will reach out shortly to confirm availability and details. Want a faster reply? Send it on WhatsApp too.",
    ar: "سيتواصل معك فريقنا قريباً لتأكيد التوفر والتفاصيل. تريد رداً أسرع؟ أرسلها عبر واتساب أيضاً.",
  },
  "form.sendWa": { en: "Send on WhatsApp", ar: "أرسل عبر واتساب" },
  "form.required": { en: "Please fill in your name and a way to reach you.", ar: "يرجى إدخال اسمك ووسيلة للتواصل." },
  "footer.tag": { en: "Adventure & travel experiences across the UAE, Oman and the world.", ar: "تجارب مغامرة وسفر في الإمارات وعُمان والعالم." },
  "footer.follow": { en: "Follow the journey", ar: "تابع الرحلة" },
  "footer.explore": { en: "Explore", ar: "استكشف" },
  "footer.contact": { en: "Get in touch", ar: "تواصل" },
  "footer.rights": { en: "All rights reserved.", ar: "جميع الحقوق محفوظة." },
  "placeholder": { en: "Sample content — to be replaced", ar: "محتوى تجريبي — سيتم استبداله" },
} satisfies Record<string, Localized>;

export type DictKey = keyof typeof dict;

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: DictKey) => string; l: (v: Localized) => string };
const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem("widego-lang");
    if (saved === "ar" || saved === "en") setLangState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    window.localStorage.setItem("widego-lang", l);
  };

  const value: Ctx = { lang, setLang, t: (k) => dict[k][lang], l: (v) => v[lang] };
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
