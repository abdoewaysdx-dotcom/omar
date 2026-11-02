import { useState, type FormEvent } from "react";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n, whatsappLink, type DictKey } from "@/lib/i18n";

export type FieldKey = "name" | "email" | "whatsapp" | "destination" | "date" | "travelers" | "experience" | "notes" | "message";

const fieldLabel: Record<FieldKey, DictKey> = {
  name: "form.name", email: "form.email", whatsapp: "form.whatsapp", destination: "form.destination",
  date: "form.date", travelers: "form.travelers", experience: "form.experience", notes: "form.notes", message: "form.message",
};
const fieldType: Partial<Record<FieldKey, string>> = { email: "email", whatsapp: "tel", date: "date", travelers: "number" };
const textareas: FieldKey[] = ["notes", "message"];
const experiences = ["Hiking", "Desert", "Water & Wadis", "Camping", "Day trip", "International trip", "Other"];

const inputCls = "w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20";

export function InquiryForm({ fields, context, title }: { fields: FieldKey[]; context?: string; title?: string }) {
  const { t } = useI18n();
  const [values, setValues] = useState<Partial<Record<FieldKey, string>>>({});
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const summary = [
    `Hi Widego! ${context ? `Inquiry about: ${context}` : "New inquiry"}`,
    ...fields.filter((f) => values[f]).map((f) => `${f}: ${values[f]}`),
  ].join("\n");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!values.name?.trim() || !(values.email?.trim() || values.whatsapp?.trim())) {
      setError(t("form.required"));
      return;
    }
    setError("");
    setSent(true);
  };

  if (sent) {
    return (
      <div className="rounded-2xl bg-card p-8 text-center shadow-card">
        <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
        <h3 className="mt-4 text-2xl font-semibold">{t("form.thanks")}</h3>
        <p className="mt-2 text-muted-foreground">{t("form.thanksSub")}</p>
        <Button asChild variant="whatsapp" size="lg" className="mt-6">
          <a href={whatsappLink(summary)} target="_blank" rel="noreferrer"><MessageCircle /> {t("form.sendWa")}</a>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-2xl bg-card p-6 shadow-card md:p-8" noValidate>
      {title && <h3 className="mb-6 text-2xl font-semibold">{title}</h3>}
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((f) => {
          const id = `f-${f}`;
          const full = textareas.includes(f) || f === "name";
          return (
            <label key={f} htmlFor={id} className={full ? "sm:col-span-2" : ""}>
              <span className="mb-1.5 block text-sm font-semibold">{t(fieldLabel[f])}</span>
              {textareas.includes(f) ? (
                <textarea id={id} rows={4} className={inputCls} value={values[f] ?? ""} onChange={(e) => setValues({ ...values, [f]: e.target.value })} maxLength={1000} />
              ) : f === "experience" ? (
                <select id={id} className={inputCls} value={values[f] ?? ""} onChange={(e) => setValues({ ...values, [f]: e.target.value })}>
                  <option value="">—</option>
                  {experiences.map((x) => <option key={x}>{x}</option>)}
                </select>
              ) : (
                <input id={id} type={fieldType[f] ?? "text"} min={f === "travelers" ? 1 : undefined} className={inputCls} value={values[f] ?? ""} onChange={(e) => setValues({ ...values, [f]: e.target.value })} maxLength={200} />
              )}
            </label>
          );
        })}
      </div>
      {error && <p className="mt-4 text-sm font-semibold text-destructive">{error}</p>}
      <p className="mt-5 text-sm text-muted-foreground">{t("form.disclaimer")}</p>
      <Button type="submit" variant="hero" size="lg" className="mt-5 w-full sm:w-auto">{t("form.submit")}</Button>
    </form>
  );
}
