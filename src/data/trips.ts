/**
 * SAMPLE TRIP CONTENT — all trips, prices, itineraries and details below are
 * placeholders. Add, remove or edit entries freely; every page reads from this list.
 * To change a photo, swap the imported image file.
 */
import hero from "@/assets/hero-ridge.jpg";
import desert from "@/assets/desert-dunes.jpg";
import wadi from "@/assets/wadi-oman.jpg";
import camp from "@/assets/mountain-camp.jpg";
import alpine from "@/assets/alpine-trail.jpg";
import kayak from "@/assets/musandam-kayak.jpg";
import summit from "@/assets/summit-group.jpg";
import type { Localized } from "@/lib/i18n";

export const images = { hero, desert, wadi, camp, alpine, kayak, summit };

export type Region = "uae" | "oman" | "international";
export type TripType = "hiking" | "desert" | "water" | "camping" | "day-trip";
export type Difficulty = "easy" | "moderate" | "challenging";

export type Trip = {
  slug: string;
  title: Localized;
  destination: Localized;
  region: Region;
  type: TripType;
  durationDays: number;
  difficulty: Difficulty;
  price: number; // placeholder, AED
  image: string;
  gallery: string[];
  summary: Localized;
  overview: string;
  highlights: string[];
  itinerary: { title: string; detail: string }[];
  meetingPoint: string;
  inclusions: string[];
  bring: string[];
  notes: string[];
};

export const regionLabels: Record<Region, Localized> = {
  uae: { en: "UAE", ar: "الإمارات" },
  oman: { en: "Oman", ar: "عُمان" },
  international: { en: "International", ar: "دولي" },
};
export const typeLabels: Record<TripType, Localized> = {
  hiking: { en: "Hiking", ar: "مشي جبلي" },
  desert: { en: "Desert", ar: "صحراء" },
  water: { en: "Water & Wadis", ar: "مياه وأودية" },
  camping: { en: "Camping", ar: "تخييم" },
  "day-trip": { en: "Day Trip", ar: "رحلة يوم" },
};
export const difficultyLabels: Record<Difficulty, Localized> = {
  easy: { en: "Easy", ar: "سهلة" },
  moderate: { en: "Moderate", ar: "متوسطة" },
  challenging: { en: "Challenging", ar: "صعبة" },
};

const defaultBring = ["Comfortable hiking shoes", "2–3L of water", "Sun protection & hat", "Light snacks", "Small backpack"];
const defaultNotes = [
  "Itinerary may change depending on weather and group pace.",
  "Submitting an inquiry does not confirm a booking — our team will contact you.",
];

export const trips: Trip[] = [
  {
    slug: "hajar-sunrise-ridge",
    title: { en: "Hajar Sunrise Ridge Hike", ar: "مشي قمة جبال الحجر عند الشروق" },
    destination: { en: "Ras Al Khaimah, UAE", ar: "رأس الخيمة، الإمارات" },
    region: "uae", type: "hiking", durationDays: 1, difficulty: "challenging", price: 250,
    image: hero, gallery: [hero, summit, alpine],
    summary: { en: "Chase first light along a rugged ridge with sweeping mountain views.", ar: "طارد أول ضوء على حافة جبلية وعرة بإطلالات بانورامية." },
    overview: "A guided early-morning ridge hike through the Hajar mountains, timed to catch the sunrise from a scenic viewpoint. (Sample description — replace with real trip details.)",
    highlights: ["Sunrise from a high viewpoint", "Guided by experienced trail leaders", "Small group experience", "Photo stops along the ridge"],
    itinerary: [
      { title: "Early meet-up", detail: "Gather at the meeting point and safety briefing." },
      { title: "Ascent", detail: "Steady climb to the ridge before sunrise." },
      { title: "Summit & breakfast", detail: "Sunrise views and a light breakfast break." },
      { title: "Descent", detail: "Return along the trail and wrap up." },
    ],
    meetingPoint: "To be confirmed — Ras Al Khaimah",
    inclusions: ["Certified guide", "Safety briefing", "Light breakfast", "Group photos"],
    bring: [...defaultBring, "Head torch"], notes: defaultNotes,
  },
  {
    slug: "desert-dune-sunset",
    title: { en: "Desert Dune Sunset Walk", ar: "مشي غروب الكثبان الرملية" },
    destination: { en: "Al Qudra, Dubai", ar: "القدرة، دبي" },
    region: "uae", type: "desert", durationDays: 1, difficulty: "easy", price: 180,
    image: desert, gallery: [desert, camp, summit],
    summary: { en: "Walk the golden dunes as the sun sinks into the Arabian desert.", ar: "امشِ على الكثبان الذهبية مع غروب الشمس في الصحراء العربية." },
    overview: "A relaxed guided walk across the red dunes ending with sunset views and tea. (Sample description.)",
    highlights: ["Golden-hour photography", "Beginner friendly", "Arabic coffee & dates", "Stargazing option"],
    itinerary: [
      { title: "Afternoon meet-up", detail: "Meet the group at the desert edge." },
      { title: "Dune walk", detail: "Easy-paced walk over the dunes." },
      { title: "Sunset", detail: "Enjoy the sunset with refreshments." },
    ],
    meetingPoint: "To be confirmed — Dubai",
    inclusions: ["Guide", "Refreshments", "Group photos"],
    bring: defaultBring, notes: defaultNotes,
  },
  {
    slug: "wadi-shab-escape",
    title: { en: "Turquoise Wadi Escape", ar: "رحلة الوادي الفيروزي" },
    destination: { en: "Sur, Oman", ar: "صور، عُمان" },
    region: "oman", type: "water", durationDays: 2, difficulty: "moderate", price: 950,
    image: wadi, gallery: [wadi, kayak, camp],
    summary: { en: "Hike and swim through canyon pools of impossible blue.", ar: "امشِ واسبح بين برك وادٍ بلون أزرق ساحر." },
    overview: "A weekend escape to Oman's famous wadis — trail walking, swimming in natural pools and a night by the coast. (Sample description.)",
    highlights: ["Natural swimming pools", "Canyon trails", "Coastal overnight stay", "Cross-border logistics handled"],
    itinerary: [
      { title: "Day 1 — Travel & coast", detail: "Drive to Oman, check in and evening by the sea." },
      { title: "Day 2 — Wadi day", detail: "Hike, swim and return to the UAE." },
    ],
    meetingPoint: "To be confirmed — Dubai",
    inclusions: ["Transport", "Accommodation", "Guide", "Selected meals"],
    bring: [...defaultBring, "Swimwear & water shoes", "Passport"], notes: defaultNotes,
  },
  {
    slug: "musandam-fjords-kayak",
    title: { en: "Musandam Fjords Kayak", ar: "التجديف في فيوردات مسندم" },
    destination: { en: "Khasab, Oman", ar: "خصب، عُمان" },
    region: "oman", type: "water", durationDays: 1, difficulty: "moderate", price: 450,
    image: kayak, gallery: [kayak, wadi, hero],
    summary: { en: "Paddle crystal waters beneath towering cliffs of the 'Norway of Arabia'.", ar: "جدّف في مياه صافية تحت منحدرات شاهقة." },
    overview: "Kayak and dhow day trip through the dramatic fjords of Musandam. (Sample description.)",
    highlights: ["Sea kayaking", "Traditional dhow cruise", "Snorkeling stop", "Dramatic coastal cliffs"],
    itinerary: [
      { title: "Morning", detail: "Border crossing and boarding." },
      { title: "Midday", detail: "Kayaking and snorkeling." },
      { title: "Afternoon", detail: "Cruise back and return." },
    ],
    meetingPoint: "To be confirmed",
    inclusions: ["Kayak & gear", "Dhow cruise", "Lunch", "Guide"],
    bring: [...defaultBring, "Swimwear", "Passport"], notes: defaultNotes,
  },
  {
    slug: "mountain-stars-camp",
    title: { en: "Mountain Stars Camp", ar: "مخيم نجوم الجبال" },
    destination: { en: "Jebel Shams, Oman", ar: "جبل شمس، عُمان" },
    region: "oman", type: "camping", durationDays: 3, difficulty: "moderate", price: 1400,
    image: camp, gallery: [camp, hero, summit],
    summary: { en: "Campfires, canyon rims and skies full of stars.", ar: "نار مخيم، حواف الأخاديد وسماء مليئة بالنجوم." },
    overview: "A multi-day camping adventure with rim hikes and nights under the stars. (Sample description.)",
    highlights: ["Canyon rim hike", "Overnight camping", "Campfire dinners", "Stargazing"],
    itinerary: [
      { title: "Day 1", detail: "Travel and set up camp." },
      { title: "Day 2", detail: "Full-day rim hike." },
      { title: "Day 3", detail: "Sunrise and return." },
    ],
    meetingPoint: "To be confirmed — Dubai",
    inclusions: ["Transport", "Camping gear", "Meals", "Guide"],
    bring: [...defaultBring, "Warm layers", "Sleeping bag (if preferred)", "Passport"], notes: defaultNotes,
  },
  {
    slug: "caucasus-valleys-trek",
    title: { en: "Caucasus Valleys Trek", ar: "رحلة وديان القوقاز" },
    destination: { en: "Georgia", ar: "جورجيا" },
    region: "international", type: "hiking", durationDays: 7, difficulty: "challenging", price: 5500,
    image: alpine, gallery: [alpine, summit, camp],
    summary: { en: "Green valleys, glaciers and mountain villages on a week-long trek.", ar: "وديان خضراء وأنهار جليدية وقرى جبلية في رحلة أسبوع." },
    overview: "An international group trek through alpine valleys and mountain villages. (Sample description.)",
    highlights: ["Glacier viewpoints", "Village guesthouses", "Local cuisine", "Group travel from the UAE"],
    itinerary: [
      { title: "Days 1–2", detail: "Arrival and acclimatisation." },
      { title: "Days 3–6", detail: "Valley trekking stages." },
      { title: "Day 7", detail: "Return flight." },
    ],
    meetingPoint: "To be confirmed",
    inclusions: ["Accommodation", "Local guides", "Selected meals", "Ground transport"],
    bring: [...defaultBring, "Trekking poles", "Rain jacket"], notes: defaultNotes,
  },
];

export const getTrip = (slug: string) => trips.find((t) => t.slug === slug);
