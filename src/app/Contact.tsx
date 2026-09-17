import { useState } from "react";
import { Mail, Globe, CheckCircle, Clock } from "lucide-react";
import {
  NAVY, GOLD, LIGHT_GRAY, TEXT_GRAY, BORDER_GRAY, SERIF,
  PageBanner,
} from "./shared";
import { submitContactForm } from "./api";

const CONTACT_CARDS = [
  {
    title: "Editorial Office",
    description: "Central Asian Journal of Artificial Intelligence and Digital Transformation",
    email: "editorial@cajaidt.org",
    website: "www.cajaidt.org",
    icon: <Globe size={20} />,
  },
  {
    title: "Manuscript Support",
    description: "For questions about submissions, revisions, and manuscript status.",
    email: "submissions@cajaidt.org",
    icon: <Mail size={20} />,
  },
  {
    title: "Editorial Queries",
    description: "For editorial board, reviewer, or policy-related questions.",
    email: "editorial@cajaidt.org",
    icon: <Mail size={20} />,
  },
  {
    title: "Technical Support",
    description: "For website or platform access issues.",
    email: "support@cajaidt.org",
    icon: <Mail size={20} />,
  },
];

const INQUIRY_TYPES = [
  "Submission question",
  "Editorial question",
  "Reviewer inquiry",
  "Technical issue",
  "General inquiry",
];

type FormData = {
  name: string;
  email: string;
  affiliation: string;
  inquiryType: string;
  subject: string;
  message: string;
};

const EMPTY_FORM: FormData = {
  name: "", email: "", affiliation: "",
  inquiryType: "", subject: "", message: "",
};

export default function Contact() {
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const set = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const validate = (): boolean => {
    const e: Partial<FormData> = {};
    if (!form.name.trim())    e.name    = "Required";
    if (!form.email.trim())   e.email   = "Required";
    if (!form.subject.trim()) e.subject = "Required";
    if (!form.message.trim()) e.message = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    try {
      await submitContactForm(form);
      setSubmitted(true);
    } catch {
      alert("Failed to send message. Please try again or email us directly.");
    }
  };

  const inputClass = "w-full px-4 py-2.5 text-sm rounded-lg border bg-white outline-none focus:ring-2 transition-shadow";
  const inputStyle = (err?: string) => ({
    borderColor: err ? "#DC2626" : BORDER_GRAY,
    color: NAVY,
  });

  return (
    <>
      <PageBanner
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Contact" }]}
        title="Contact"
        subtitle="Contact the editorial office of the Central Asian Journal of Artificial Intelligence and Digital Transformation."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">

        {/* Contact cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {CONTACT_CARDS.map((card, i) => (
            <div
              key={i}
              className="rounded-xl border p-5 hover:shadow-sm transition-shadow flex flex-col gap-3"
              style={{ borderColor: BORDER_GRAY, borderTop: `3px solid ${i % 2 === 0 ? NAVY : GOLD}` }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "rgba(6,38,74,0.07)", color: NAVY }}
              >
                {card.icon}
              </div>
              <div>
                <div className="text-sm font-bold mb-1" style={{ color: NAVY, fontFamily: SERIF }}>
                  {card.title}
                </div>
                <p className="text-[12px] leading-snug mb-3" style={{ color: TEXT_GRAY }}>
                  {card.description}
                </p>
                <a
                  href={`mailto:${card.email}`}
                  className="text-[12px] font-semibold block transition-opacity hover:opacity-70"
                  style={{ color: GOLD }}
                >
                  {card.email}
                </a>
                {card.website && (
                  <a
                    href={`http://${card.website}`}
                    className="text-[12px] block mt-0.5 transition-opacity hover:opacity-70"
                    style={{ color: TEXT_GRAY }}
                  >
                    {card.website}
                  </a>
                )}
                <p className="text-[9px] font-semibold uppercase tracking-wider mt-2" style={{ color: TEXT_GRAY }}>
                  Placeholder — to be updated
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-16">

          {/* Contact form */}
          <div>
            <div className="mb-7">
              <div className="text-[11px] font-bold tracking-widest uppercase mb-2" style={{ color: GOLD }}>
                Get in Touch
              </div>
              <h2 className="text-2xl font-bold mb-2" style={{ color: NAVY, fontFamily: SERIF }}>
                Send a Message
              </h2>
              <div className="w-10 h-0.5 mb-4" style={{ backgroundColor: GOLD }} />
              <div className="flex items-center gap-2 text-[12px]" style={{ color: TEXT_GRAY }}>
                <Clock size={13} style={{ color: GOLD }} />
                The editorial office aims to respond to general inquiries within 3–5 working days.
              </div>
            </div>

            {submitted ? (
              <div
                className="rounded-xl p-8 text-center"
                style={{ backgroundColor: "#F0FDF4", border: `1px solid #BBF7D0` }}
              >
                <CheckCircle size={36} className="mx-auto mb-4" style={{ color: "#16A34A" }} />
                <h3 className="text-lg font-bold mb-2" style={{ color: "#166534", fontFamily: SERIF }}>
                  Message Received
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#166534" }}>
                  Thank you for contacting the CAJAIDT editorial office. We will respond within 3–5 working days.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm(EMPTY_FORM); }}
                  className="mt-6 px-5 py-2 text-sm font-semibold text-white rounded transition-opacity hover:opacity-90"
                  style={{ backgroundColor: NAVY }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5" style={{ color: NAVY }}>
                      Full Name <span style={{ color: GOLD }}>*</span>
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={set("name")}
                      placeholder="Your full name"
                      className={inputClass}
                      style={inputStyle(errors.name)}
                    />
                    {errors.name && <p className="text-[11px] mt-1" style={{ color: "#DC2626" }}>{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5" style={{ color: NAVY }}>
                      Email Address <span style={{ color: GOLD }}>*</span>
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={set("email")}
                      placeholder="your@email.com"
                      className={inputClass}
                      style={inputStyle(errors.email)}
                    />
                    {errors.email && <p className="text-[11px] mt-1" style={{ color: "#DC2626" }}>{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5" style={{ color: NAVY }}>
                    Affiliation
                  </label>
                  <input
                    type="text"
                    value={form.affiliation}
                    onChange={set("affiliation")}
                    placeholder="University / Institution"
                    className={inputClass}
                    style={inputStyle()}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5" style={{ color: NAVY }}>
                      Inquiry Type
                    </label>
                    <select
                      value={form.inquiryType}
                      onChange={set("inquiryType")}
                      className={inputClass}
                      style={inputStyle()}
                    >
                      <option value="">Select type…</option>
                      {INQUIRY_TYPES.map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5" style={{ color: NAVY }}>
                      Subject <span style={{ color: GOLD }}>*</span>
                    </label>
                    <input
                      type="text"
                      value={form.subject}
                      onChange={set("subject")}
                      placeholder="Message subject"
                      className={inputClass}
                      style={inputStyle(errors.subject)}
                    />
                    {errors.subject && <p className="text-[11px] mt-1" style={{ color: "#DC2626" }}>{errors.subject}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5" style={{ color: NAVY }}>
                    Message <span style={{ color: GOLD }}>*</span>
                  </label>
                  <textarea
                    value={form.message}
                    onChange={set("message")}
                    rows={5}
                    placeholder="Your message to the editorial office…"
                    className={`${inputClass} resize-none`}
                    style={inputStyle(errors.message)}
                  />
                  {errors.message && <p className="text-[11px] mt-1" style={{ color: "#DC2626" }}>{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 text-sm font-bold text-white rounded transition-opacity hover:opacity-90"
                  style={{ backgroundColor: GOLD }}
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Right column: response info + map placeholder */}
          <div className="space-y-6">
            <div>
              <div className="text-[11px] font-bold tracking-widest uppercase mb-2" style={{ color: GOLD }}>
                Office Information
              </div>
              <h2 className="text-2xl font-bold mb-5" style={{ color: NAVY, fontFamily: SERIF }}>
                Editorial Office
              </h2>
            </div>

            <div className="space-y-4">
              {[
                { label: "Email", value: "editorial@cajaidt.org", href: "mailto:editorial@cajaidt.org" },
                { label: "Website", value: "www.cajaidt.org", href: "http://www.cajaidt.org" },
                { label: "Response Time", value: "3–5 working days" },
                { label: "Office Location", value: "To be confirmed" },
              ].map(item => (
                <div key={item.label} className="flex gap-4 items-start">
                  <div
                    className="text-[10px] font-bold uppercase tracking-wider w-28 flex-shrink-0 pt-0.5"
                    style={{ color: GOLD }}
                  >
                    {item.label}
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm font-medium hover:underline transition-colors"
                      style={{ color: NAVY }}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-sm font-medium" style={{ color: NAVY }}>{item.value}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div
              className="rounded-xl flex items-center justify-center"
              style={{
                height: "220px",
                backgroundColor: LIGHT_GRAY,
                border: `1px solid ${BORDER_GRAY}`,
              }}
            >
              <div className="text-center">
                <Globe size={28} className="mx-auto mb-2" style={{ color: BORDER_GRAY }} />
                <div className="text-sm font-semibold" style={{ color: TEXT_GRAY }}>
                  Journal Office Location
                </div>
                <div className="text-[12px] mt-1" style={{ color: TEXT_GRAY }}>
                  To be confirmed
                </div>
              </div>
            </div>

            {/* Response time note */}
            <div
              className="rounded-xl p-5 flex items-start gap-3"
              style={{ backgroundColor: LIGHT_GRAY, border: `1px solid ${BORDER_GRAY}` }}
            >
              <Clock size={16} style={{ color: GOLD, flexShrink: 0, marginTop: 1 }} />
              <div>
                <div className="text-xs font-bold mb-1" style={{ color: NAVY }}>Response Time</div>
                <p className="text-[12px] leading-relaxed" style={{ color: TEXT_GRAY }}>
                  The editorial office aims to respond to general inquiries within 3–5 working days. Manuscript-related queries may take longer depending on editorial workload.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
