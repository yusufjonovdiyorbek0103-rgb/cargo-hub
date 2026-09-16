import { CheckCircle } from "lucide-react";
import {
  NAVY, GOLD, LIGHT_GRAY, TEXT_GRAY, BORDER_GRAY, SERIF,
  PageBanner, SectionHeader, NavA, InfoBox,
} from "./shared";

const TOPICS = [
  "Artificial Intelligence and Machine Learning",
  "Data Science and Big Data Analytics",
  "Natural Language Processing and Computer Vision",
  "Intelligent Information Systems",
  "Digital Transformation in Education, Business, Government, and Industry",
  "Human-Centered AI, HCI, and UX Analytics",
  "Cybersecurity, AI Governance, and Responsible AI",
  "Smart Cities, IoT, and Cyber-Physical Systems",
  "Digital Economy, FinTech, EdTech, and GovTech",
  "Applied AI for Sustainable Development",
];

const TYPES = [
  "Original Research Article",
  "Review Article",
  "Systematic Literature Review",
  "Case Study",
  "Technical Note",
  "Short Communication",
  "Perspective / Policy Paper",
];

const DATES = [
  { label: "Submission Deadline", value: "Open throughout the year" },
  { label: "Review Process", value: "Rolling basis" },
  { label: "Publication Frequency", value: "Monthly" },
  { label: "First Issue", value: "Planned" },
  { label: "Publication Model", value: "Online open access" },
];

const REQUIREMENTS = [
  "Manuscript must fit the journal aims and scope.",
  "Manuscript must be original and not under review elsewhere.",
  "Manuscript must follow the Author Guidelines.",
  "English title, abstract, and keywords are required for all manuscripts.",
  "Anonymized manuscript and separate title page are required.",
  "Ethical declarations must be completed.",
  "AI use must be disclosed where applicable.",
];

export default function CallForPapers() {
  return (
    <div>
      <PageBanner
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Call for Papers" }]}
        title="Call for Papers"
        subtitle="CAJAIDT invites scholarly submissions in artificial intelligence, data science, intelligent systems, and digital transformation."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-14">

            {/* Announcement */}
            <section>
              <SectionHeader eyebrow="Open Call" title="Invitation to Submit" />
              <p className="text-[15px] leading-relaxed" style={{ color: TEXT_GRAY }}>
                The Central Asian Journal of Artificial Intelligence and Digital Transformation invites researchers, practitioners, and scholars to submit original manuscripts for upcoming issues. The journal welcomes high-quality research that contributes to artificial intelligence, data science, intelligent systems, digital transformation, and applied digital innovation.
              </p>
            </section>

            {/* Topics */}
            <section>
              <SectionHeader eyebrow="Scope" title="Topics of Interest" />
              <div className="grid sm:grid-cols-2 gap-3">
                {TOPICS.map((topic, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-xl px-4 py-4 bg-white border"
                    style={{ borderColor: BORDER_GRAY }}
                  >
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-[11px] font-bold text-white mt-0.5"
                      style={{ backgroundColor: NAVY }}
                    >
                      {i + 1}
                    </div>
                    <span className="text-[13px] font-medium leading-snug" style={{ color: NAVY }}>{topic}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Article Types */}
            <section>
              <SectionHeader eyebrow="Formats" title="Accepted Manuscript Types" />
              <div className="grid sm:grid-cols-2 gap-3">
                {TYPES.map((type) => (
                  <div
                    key={type}
                    className="flex items-center gap-3 rounded-lg px-4 py-3.5 bg-white border"
                    style={{ borderColor: BORDER_GRAY }}
                  >
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: GOLD }} />
                    <span className="text-[13px] font-medium" style={{ color: NAVY }}>{type}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Important Dates */}
            <section>
              <SectionHeader eyebrow="Dates" title="Important Dates" />
              <div className="rounded-xl border overflow-hidden bg-white" style={{ borderColor: BORDER_GRAY }}>
                <div className="px-5 py-3 border-b" style={{ backgroundColor: NAVY }}>
                  <span className="text-xs font-bold text-white tracking-wide uppercase">CAJAIDT — 2027 Submission Schedule</span>
                </div>
                <div className="divide-y" style={{ divideColor: BORDER_GRAY }}>
                  {DATES.map((row) => (
                    <div key={row.label} className="flex flex-wrap items-center gap-3 px-5 py-4">
                      <span className="text-[11px] font-bold uppercase tracking-wider w-44 flex-shrink-0" style={{ color: TEXT_GRAY }}>{row.label}</span>
                      <span className="text-[13px] font-semibold" style={{ color: NAVY }}>{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Requirements */}
            <section>
              <SectionHeader eyebrow="Requirements" title="Submission Requirements" />
              <div className="space-y-3">
                {REQUIREMENTS.map((req, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle size={16} style={{ color: GOLD, marginTop: "2px", flexShrink: 0 }} />
                    <span className="text-[14px] leading-relaxed" style={{ color: TEXT_GRAY }}>{req}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-5">
            <div className="rounded-xl border overflow-hidden sticky top-24" style={{ borderColor: BORDER_GRAY }}>
              <div className="px-5 py-4" style={{ backgroundColor: NAVY }}>
                <div className="text-xs font-bold text-white tracking-wide">Quick Actions</div>
              </div>
              <div className="p-5 space-y-3">
                <NavA
                  to="/portal/login"
                  className="block text-center px-4 py-3 text-sm font-semibold text-white rounded-lg transition-opacity hover:opacity-90"
                  style={{ backgroundColor: GOLD }}
                >
                  Submit Manuscript
                </NavA>
                <NavA
                  to="/author-guidelines"
                  className="block text-center px-4 py-3 text-sm font-semibold rounded-lg border-2 transition-opacity hover:opacity-70"
                  style={{ color: NAVY, borderColor: NAVY }}
                >
                  Author Guidelines
                </NavA>
                <NavA
                  to="/manuscript-template"
                  className="block text-center px-4 py-3 text-sm font-medium rounded-lg border transition-opacity hover:opacity-70 bg-white"
                  style={{ color: NAVY, borderColor: BORDER_GRAY }}
                >
                  Manuscript Template
                </NavA>
              </div>
              <div className="border-t" style={{ borderColor: BORDER_GRAY }}>
                <ul className="divide-y" style={{ divideColor: BORDER_GRAY }}>
                  {[
                    { label: "Checklist", to: "/checklist" },
                    { label: "Peer Review Policy", to: "/peer-review-policy" },
                    { label: "Publication Ethics", to: "/publication-ethics" },
                    { label: "Aims & Scope", to: "/aims-scope" },
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
            </div>

            <InfoBox type="warning" title="No Submission Fee">
              There is currently no submission fee. Publication fees, if applicable, will be announced transparently before any charges are introduced.
            </InfoBox>
          </aside>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="py-14 px-4 sm:px-6 border-t" style={{ borderColor: BORDER_GRAY }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl md:text-2xl font-bold mb-7" style={{ color: NAVY, fontFamily: SERIF }}>
            Submit your manuscript to CAJAIDT
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <NavA
              to="/portal/login"
              className="px-7 py-2.5 text-sm font-semibold text-white rounded transition-opacity hover:opacity-90"
              style={{ backgroundColor: GOLD }}
            >
              Submit Manuscript
            </NavA>
            <NavA
              to="/author-guidelines"
              className="px-7 py-2.5 text-sm font-semibold rounded border-2 transition-opacity hover:opacity-70"
              style={{ color: NAVY, borderColor: NAVY }}
            >
              Read Author Guidelines
            </NavA>
            <NavA
              to="/manuscript-template"
              className="px-7 py-2.5 text-sm font-semibold rounded border transition-opacity hover:opacity-70 bg-white"
              style={{ color: TEXT_GRAY, borderColor: BORDER_GRAY }}
            >
              Download Template
            </NavA>
          </div>
        </div>
      </div>
    </div>
  );
}
