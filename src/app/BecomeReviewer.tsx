import { useState } from "react";
import {
  NAVY, GOLD, LIGHT_GRAY, TEXT_GRAY, BORDER_GRAY, SERIF,
  PageBanner, SectionHeader, NavA, InfoBox,
} from "./shared";

const ELIGIBILITY = [
  "Relevant academic or professional expertise",
  "Research experience in journal scope areas",
  "Ability to provide objective and constructive feedback",
  "No conflict of interest with assigned manuscripts",
  "Commitment to confidentiality",
  "Ability to complete reviews within the requested timeline",
  "ORCID, Google Scholar, Scopus, or institutional profile recommended",
];

const EXPERTISE_TAGS = [
  "Artificial Intelligence", "Machine Learning", "Data Science",
  "NLP", "Computer Vision", "Digital Transformation",
  "Cybersecurity", "Responsible AI", "HCI / UX",
  "Smart Cities", "IoT", "Digital Economy",
  "EdTech", "GovTech", "FinTech", "Business IT",
];

const ACADEMIC_TITLES = [
  "PhD Candidate", "PhD", "Assistant Professor", "Associate Professor",
  "Professor", "Senior Researcher", "Industry Expert", "Other",
];

const COUNTRIES = [
  "Kazakhstan", "Uzbekistan", "Kyrgyzstan", "Tajikistan", "Turkmenistan",
  "Russia", "Germany", "United Kingdom", "United States", "China",
  "South Korea", "Turkey", "Other",
];

export default function BecomeReviewer() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    fullName: "", email: "", title: "", affiliation: "",
    country: "", orcid: "", scholar: "", bio: "", publications: "",
  });

  const toggleTag = (tag: string) =>
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );

  const set = (field: string) => (v: string) =>
    setForm((f) => ({ ...f, [field]: v }));

  const inputBase =
    "w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white outline-none focus:ring-2 transition-shadow";
  const inputStyle = { borderColor: BORDER_GRAY, color: NAVY };

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
            style={{ backgroundColor: "#F0FDF4" }}
          >
            <span className="text-3xl">✓</span>
          </div>
          <h2 className="text-2xl font-bold mb-3" style={{ color: NAVY, fontFamily: SERIF }}>
            Application Submitted
          </h2>
          <p className="text-sm leading-relaxed mb-6" style={{ color: TEXT_GRAY }}>
            Thank you for your interest in joining the CAJAIDT reviewer community. Your application has been received and will be reviewed by the editorial office. You will be contacted if your expertise matches our current needs.
          </p>
          <NavA
            to="/"
            className="inline-block px-6 py-2.5 text-sm font-semibold text-white rounded-lg"
            style={{ backgroundColor: GOLD }}
          >
            Return to Homepage
          </NavA>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageBanner
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Editorial", to: "/editorial-board" },
          { label: "Become a Reviewer" },
        ]}
        title="Become a Reviewer"
        subtitle="Join the CAJAIDT reviewer community and contribute to responsible scholarly publishing."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-14">

            {/* Reviewer Role */}
            <section>
              <SectionHeader eyebrow="About the Role" title="Reviewer Role" />
              <p className="text-[15px] leading-relaxed" style={{ color: TEXT_GRAY }}>
                Reviewers support the journal by providing independent, objective, constructive, and confidential evaluations of submitted manuscripts. CAJAIDT welcomes qualified researchers and professionals with expertise in artificial intelligence, data science, digital transformation, information systems, cybersecurity, smart systems, and related fields.
              </p>
            </section>

            {/* Eligibility */}
            <section>
              <SectionHeader eyebrow="Requirements" title="Reviewer Eligibility" />
              <div className="space-y-3">
                {ELIGIBILITY.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: "rgba(195,154,59,0.12)" }}
                    >
                      <span className="text-[10px] font-bold" style={{ color: GOLD }}>✓</span>
                    </div>
                    <span className="text-[14px] leading-relaxed" style={{ color: TEXT_GRAY }}>{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Expertise Tags */}
            <section>
              <SectionHeader eyebrow="Areas" title="Areas of Expertise" />
              <p className="text-[13px] mb-5" style={{ color: TEXT_GRAY }}>
                Select your areas of expertise below. You can mark multiple areas when completing the application form.
              </p>
              <div className="flex flex-wrap gap-2.5">
                {EXPERTISE_TAGS.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className="px-3.5 py-1.5 text-[12px] font-semibold rounded-full border-2 transition-colors"
                    style={{
                      borderColor: selectedTags.includes(tag) ? NAVY : BORDER_GRAY,
                      backgroundColor: selectedTags.includes(tag) ? NAVY : "white",
                      color: selectedTags.includes(tag) ? "white" : TEXT_GRAY,
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </section>

            {/* Application Form */}
            <section>
              <SectionHeader eyebrow="Apply" title="Reviewer Application Form" />
              <div className="rounded-xl border bg-white p-6 md:p-8 space-y-6" style={{ borderColor: BORDER_GRAY }}>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5" style={{ color: NAVY }}>
                      Full Name <span style={{ color: GOLD }}>*</span>
                    </label>
                    <input type="text" value={form.fullName} onChange={(e) => set("fullName")(e.target.value)}
                      placeholder="Dr. Jane Smith" className={inputBase} style={inputStyle} />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5" style={{ color: NAVY }}>
                      Email Address <span style={{ color: GOLD }}>*</span>
                    </label>
                    <input type="email" value={form.email} onChange={(e) => set("email")(e.target.value)}
                      placeholder="j.smith@university.edu" className={inputBase} style={inputStyle} />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5" style={{ color: NAVY }}>Academic Title</label>
                    <select value={form.title} onChange={(e) => set("title")(e.target.value)} className={inputBase} style={inputStyle}>
                      <option value="">Select title</option>
                      {ACADEMIC_TITLES.map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5" style={{ color: NAVY }}>Country</label>
                    <select value={form.country} onChange={(e) => set("country")(e.target.value)} className={inputBase} style={inputStyle}>
                      <option value="">Select country</option>
                      {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5" style={{ color: NAVY }}>
                    Affiliation <span style={{ color: GOLD }}>*</span>
                  </label>
                  <input type="text" value={form.affiliation} onChange={(e) => set("affiliation")(e.target.value)}
                    placeholder="University or Research Institution" className={inputBase} style={inputStyle} />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5" style={{ color: NAVY }}>ORCID ID</label>
                    <input type="text" value={form.orcid} onChange={(e) => set("orcid")(e.target.value)}
                      placeholder="0000-0000-0000-0000" className={inputBase} style={inputStyle} />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5" style={{ color: NAVY }}>Google Scholar / Scopus Link</label>
                    <input type="url" value={form.scholar} onChange={(e) => set("scholar")(e.target.value)}
                      placeholder="https://scholar.google.com/..." className={inputBase} style={inputStyle} />
                  </div>
                </div>

                {selectedTags.length > 0 && (
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5" style={{ color: NAVY }}>Selected Areas of Expertise</label>
                    <div className="flex flex-wrap gap-2 p-3 rounded-lg border" style={{ borderColor: BORDER_GRAY, backgroundColor: LIGHT_GRAY }}>
                      {selectedTags.map((tag) => (
                        <span key={tag} className="text-[11px] font-semibold px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: NAVY }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5" style={{ color: NAVY }}>
                    Short Academic Bio <span style={{ color: GOLD }}>*</span>
                  </label>
                  <textarea value={form.bio} onChange={(e) => set("bio")(e.target.value)}
                    placeholder="Describe your academic background, research interests, and experience..." rows={4}
                    className={`${inputBase} resize-none`} style={inputStyle} />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5" style={{ color: NAVY }}>Recent Publications or Experience</label>
                  <textarea value={form.publications} onChange={(e) => set("publications")(e.target.value)}
                    placeholder="List relevant publications, review experience, or professional work..." rows={3}
                    className={`${inputBase} resize-none`} style={inputStyle} />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5" style={{ color: NAVY }}>Upload CV (Optional)</label>
                  <div className="rounded-lg border-2 border-dashed px-5 py-6 text-center" style={{ borderColor: BORDER_GRAY }}>
                    <input type="file" accept=".pdf,.doc,.docx" className="hidden" id="cv-upload" />
                    <label htmlFor="cv-upload" className="cursor-pointer">
                      <div className="text-[13px] font-medium mb-1" style={{ color: NAVY }}>Click to upload CV</div>
                      <div className="text-[11px]" style={{ color: TEXT_GRAY }}>PDF, DOC, or DOCX — Max 5 MB</div>
                    </label>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setSubmitted(true)}
                    className="w-full py-3 text-sm font-semibold text-white rounded-lg transition-opacity hover:opacity-90"
                    style={{ backgroundColor: GOLD }}
                  >
                    Submit Reviewer Application
                  </button>
                </div>
              </div>
            </section>

            {/* Ethics */}
            <section>
              <InfoBox type="rule" title="Reviewer Ethics">
                Reviewer applications are reviewed by the editorial office. Reviewers are expected to follow confidentiality, conflict-of-interest, fairness, and ethical review principles. Reviewer participation does not guarantee editorial board membership.
              </InfoBox>
            </section>
          </div>

          {/* Sidebar */}
          <aside>
            <div className="rounded-xl border overflow-hidden sticky top-24" style={{ borderColor: BORDER_GRAY }}>
              <div className="px-5 py-4" style={{ backgroundColor: NAVY }}>
                <div className="text-xs font-bold text-white tracking-wide">Related Resources</div>
              </div>
              <ul className="divide-y" style={{ divideColor: BORDER_GRAY }}>
                {[
                  { label: "Reviewer Guidelines", to: "/reviewer-guidelines" },
                  { label: "Peer Review Policy", to: "/peer-review-policy" },
                  { label: "Publication Ethics", to: "/publication-ethics" },
                  { label: "Editorial Board", to: "/editorial-board" },
                  { label: "AI Use Policy", to: "/ai-use-policy" },
                  { label: "Contact Editorial Office", to: "/contact" },
                ].map((link) => (
                  <li key={link.label}>
                    <NavA
                      to={link.to}
                      className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-colors text-[12px] font-medium"
                      style={{ color: NAVY }}
                    >
                      {link.label}
                      <span style={{ color: GOLD }}>→</span>
                    </NavA>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
