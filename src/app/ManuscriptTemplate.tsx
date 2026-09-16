import { FileText, Download } from "lucide-react";
import {
  NAVY, GOLD, LIGHT_GRAY, TEXT_GRAY, BORDER_GRAY, SERIF,
  PageBanner, SectionHeader, NavA, InfoBox,
} from "./shared";

const TEMPLATES = [
  { name: "Research Article Template", type: "DOCX" },
  { name: "Review Article Template", type: "DOCX" },
  { name: "Case Study Template", type: "DOCX" },
  { name: "Technical Note Template", type: "DOCX" },
  { name: "Title Page Template", type: "DOCX" },
  { name: "Response to Reviewers Template", type: "DOCX" },
];

const STRUCTURE = [
  { num: "1", label: "Title" },
  { num: "2", label: "Abstract" },
  { num: "3", label: "Keywords" },
  { num: "4", label: "Introduction" },
  { num: "5", label: "Literature Review" },
  { num: "6", label: "Methodology" },
  { num: "7", label: "Results" },
  { num: "8", label: "Discussion" },
  { num: "9", label: "Conclusion" },
  { num: "10", label: "Declarations" },
  { num: "11", label: "References" },
  { num: "12", label: "Appendices" },
];

const BLIND_CHECKLIST = [
  "Remove author names from the main manuscript.",
  "Remove affiliations from the main manuscript.",
  "Remove acknowledgments that reveal identity.",
  "Upload author details on the title page only.",
  "Avoid self-identifying language in the manuscript.",
  "Check file metadata before uploading.",
];

export default function ManuscriptTemplate() {
  return (
    <div>
      <PageBanner
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Author Guidelines", to: "/author-guidelines" },
          { label: "Manuscript Template" },
        ]}
        title="Manuscript Template"
        subtitle="Download and follow the CAJAIDT manuscript template before submitting your paper."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-14">

            {/* Overview */}
            <section>
              <SectionHeader eyebrow="Overview" title="Template Overview" />
              <p className="text-[15px] leading-relaxed" style={{ color: TEXT_GRAY }}>
                Authors are required to prepare manuscripts according to the CAJAIDT manuscript template. The template is designed to support consistency, readability, metadata quality, and double-blind peer review.
              </p>
            </section>

            {/* Download cards */}
            <section>
              <SectionHeader eyebrow="Downloads" title="Available Templates" />
              <InfoBox type="warning" title="Templates Coming Soon">
                Manuscript templates are currently being finalized. They will be available for download before the first call for papers is announced. Authors may begin preparing manuscripts using the structure outlined below.
              </InfoBox>
              <div className="grid sm:grid-cols-2 gap-4 mt-6">
                {TEMPLATES.map((tpl) => (
                  <div
                    key={tpl.name}
                    className="rounded-xl border bg-white p-5 flex flex-col gap-4"
                    style={{ borderColor: BORDER_GRAY }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: LIGHT_GRAY }}
                      >
                        <FileText size={18} style={{ color: NAVY }} />
                      </div>
                      <div>
                        <div className="text-[13px] font-semibold leading-snug mb-1" style={{ color: NAVY }}>{tpl.name}</div>
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded"
                          style={{ color: TEXT_GRAY, backgroundColor: LIGHT_GRAY }}
                        >
                          {tpl.type}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      disabled
                      className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-xs font-semibold rounded-lg border opacity-40 cursor-not-allowed"
                      style={{ color: NAVY, borderColor: BORDER_GRAY }}
                    >
                      <Download size={13} />
                      Download Template — Coming soon
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Template Structure */}
            <section>
              <SectionHeader eyebrow="Structure" title="Template Sections" />
              <div className="rounded-xl border overflow-hidden bg-white" style={{ borderColor: BORDER_GRAY }}>
                <div className="divide-y" style={{ divideColor: BORDER_GRAY }}>
                  {STRUCTURE.map((s) => (
                    <div key={s.num} className="flex items-center gap-4 px-5 py-3">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0"
                        style={{ backgroundColor: NAVY }}
                      >
                        {s.num}
                      </div>
                      <span className="text-[14px] font-medium" style={{ color: NAVY }}>{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Double-blind checklist */}
            <section>
              <SectionHeader eyebrow="Anonymization" title="Double-Blind Review Preparation" />
              <p className="text-[14px] leading-relaxed mb-6" style={{ color: TEXT_GRAY }}>
                CAJAIDT uses double-blind peer review. Authors must remove all identifying information from the main manuscript file before submission.
              </p>
              <div className="space-y-3">
                {BLIND_CHECKLIST.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded border-2 flex-shrink-0 mt-0.5"
                      style={{ borderColor: GOLD }}
                    />
                    <span className="text-[14px] leading-relaxed" style={{ color: TEXT_GRAY }}>{item}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside>
            <div className="rounded-xl border overflow-hidden sticky top-24" style={{ borderColor: BORDER_GRAY }}>
              <div className="px-5 py-4" style={{ backgroundColor: NAVY }}>
                <div className="text-xs font-bold text-white tracking-wide">Author Resources</div>
              </div>
              <ul className="divide-y" style={{ divideColor: BORDER_GRAY }}>
                {[
                  { label: "Author Guidelines", to: "/author-guidelines" },
                  { label: "Submission Checklist", to: "/checklist" },
                  { label: "Call for Papers", to: "/call-for-papers" },
                  { label: "Peer Review Policy", to: "/peer-review-policy" },
                  { label: "Publication Ethics", to: "/publication-ethics" },
                  { label: "AI Use Policy", to: "/ai-use-policy" },
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
              <div className="px-5 py-4 border-t" style={{ borderColor: BORDER_GRAY }}>
                <NavA
                  to="/portal/login"
                  className="block text-center px-4 py-2 text-xs font-semibold text-white rounded transition-opacity hover:opacity-90"
                  style={{ backgroundColor: GOLD }}
                >
                  Start Submission
                </NavA>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="py-14 px-4 sm:px-6 border-t" style={{ borderColor: BORDER_GRAY }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl md:text-2xl font-bold mb-7" style={{ color: NAVY, fontFamily: SERIF }}>
            Ready to submit your manuscript?
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <NavA
              to="/checklist"
              className="px-7 py-2.5 text-sm font-semibold text-white rounded transition-opacity hover:opacity-90"
              style={{ backgroundColor: GOLD }}
            >
              Open Submission Checklist
            </NavA>
            <NavA
              to="/portal/login"
              className="px-7 py-2.5 text-sm font-semibold rounded border-2 transition-opacity hover:opacity-70"
              style={{ color: NAVY, borderColor: NAVY }}
            >
              Start Submission
            </NavA>
          </div>
        </div>
      </div>
    </div>
  );
}
