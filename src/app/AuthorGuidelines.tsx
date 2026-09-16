import { CheckCircle, FileText, Download } from "lucide-react";
import {
  NAVY, GOLD, LIGHT_GRAY, TEXT_GRAY, BORDER_GRAY, SERIF,
  PageBanner, BottomCTA, SectionHeader, ProseSection,
  QuickLinksSidebar, InfoBox,
} from "./shared";

const MANUSCRIPT_TYPES = [
  {
    title: "Original Research Article",
    desc: "Reports original theoretical, methodological, experimental, or applied research. Manuscripts should include a clear research problem, literature review, methodology, results, discussion, and conclusion.",
    words: "5,000–8,000 words",
  },
  {
    title: "Review Article",
    desc: "Provides a critical synthesis of existing research in a defined area of artificial intelligence, data science, intelligent systems, or digital transformation.",
    words: "6,000–10,000 words",
  },
  {
    title: "Systematic Literature Review",
    desc: "Uses a transparent search strategy, inclusion and exclusion criteria, and structured analysis of existing literature.",
    words: "6,000–10,000 words",
  },
  {
    title: "Case Study",
    desc: "Presents an evidence-based analysis of a real-world implementation, system, organization, digital transformation initiative, or applied AI solution.",
    words: "4,000–7,000 words",
  },
  {
    title: "Technical Note",
    desc: "Describes a method, tool, dataset, model, prototype, framework, or technical implementation with scholarly relevance.",
    words: "3,000–5,000 words",
  },
  {
    title: "Short Communication",
    desc: "Reports concise research findings, preliminary results, or focused scholarly contributions.",
    words: "2,000–4,000 words",
  },
  {
    title: "Perspective / Policy Paper",
    desc: "Presents a scholarly argument, policy analysis, or expert perspective supported by academic literature and evidence.",
    words: "3,000–6,000 words",
  },
];

const STRUCTURE_ITEMS = [
  "Title",
  "Author names and affiliations",
  "Corresponding author information",
  "Abstract",
  "Keywords",
  "Introduction",
  "Literature Review",
  "Methodology",
  "Results",
  "Discussion",
  "Conclusion",
  "Funding Statement",
  "Conflict of Interest Statement",
  "Data Availability Statement",
  "AI Use Disclosure (if applicable)",
  "References",
  "Appendices (if applicable)",
];

const FORMATTING_CHECKLIST = [
  "Manuscript file must be submitted in Microsoft Word format.",
  "Use clear academic language and consistent terminology.",
  "Tables and figures must be numbered and cited in the text.",
  "Figures must be high-resolution and readable.",
  "References must follow the selected journal citation style.",
  "All in-text citations must appear in the reference list.",
  "All references must be accurate and verifiable.",
  "Manuscripts must be anonymized for double-blind peer review.",
  "Title page must be uploaded separately.",
];

const DECLARATIONS = [
  { label: "Funding Statement", required: true },
  { label: "Conflict of Interest Statement", required: true },
  { label: "Data Availability Statement", required: true },
  { label: "Ethics Approval Statement", required: false, note: "if applicable" },
  { label: "AI Use Disclosure", required: false, note: "if applicable" },
  { label: "Author Contribution Statement", required: false, note: "recommended" },
  { label: "ORCID ID", required: false, note: "recommended" },
];

const SIDEBAR_LINKS = [
  { label: "Manuscript Template", href: "#" },
  { label: "Submission Checklist", to: "/checklist" },
  { label: "Submit Manuscript", to: "/submit" },
  { label: "Peer Review Policy", to: "/peer-review-policy" },
  { label: "Publication Ethics", to: "/publication-ethics" },
  { label: "AI Use Policy", to: "/ai-use-policy" },
];

export default function AuthorGuidelines() {
  return (
    <>
      <PageBanner
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "For Authors" }, { label: "Author Guidelines" }]}
        title="Author Guidelines"
        subtitle="Instructions for preparing and submitting manuscripts to the Central Asian Journal of Artificial Intelligence and Digital Transformation."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main */}
          <div className="lg:col-span-2 space-y-14">

            {/* Intro */}
            <InfoBox type="note">
              Authors are required to prepare manuscripts according to the journal's academic, ethical, formatting, and metadata standards. Submissions that do not follow the author guidelines may be returned before peer review.
            </InfoBox>

            {/* Manuscript Types */}
            <section>
              <SectionHeader eyebrow="Submission Types" title="Manuscript Types" />
              <div className="space-y-4">
                {MANUSCRIPT_TYPES.map((type, i) => (
                  <div
                    key={i}
                    className="rounded-xl border p-5 hover:shadow-sm transition-shadow"
                    style={{ borderColor: BORDER_GRAY, borderLeft: `4px solid ${i % 2 === 0 ? NAVY : GOLD}` }}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <h3 className="text-sm font-bold" style={{ color: NAVY, fontFamily: SERIF }}>
                        {type.title}
                      </h3>
                      <span
                        className="text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap"
                        style={{ color: GOLD, backgroundColor: "rgba(195,154,59,0.1)" }}
                      >
                        {type.words}
                      </span>
                    </div>
                    <p className="text-[13px] leading-relaxed" style={{ color: TEXT_GRAY }}>
                      {type.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <div className="border-t" style={{ borderColor: BORDER_GRAY }} />

            {/* Manuscript Structure */}
            <section>
              <SectionHeader
                eyebrow="Required Structure"
                title="Manuscript Structure"
                subtitle="Manuscripts should follow this standard academic structure in the order listed."
              />
              <div className="grid sm:grid-cols-2 gap-2">
                {STRUCTURE_ITEMS.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-lg px-4 py-2.5"
                    style={{ backgroundColor: i % 2 === 0 ? LIGHT_GRAY : "white", border: `1px solid ${BORDER_GRAY}` }}
                  >
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0"
                      style={{ backgroundColor: NAVY }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-[13px] font-medium" style={{ color: NAVY }}>{item}</span>
                  </div>
                ))}
              </div>
            </section>

            <div className="border-t" style={{ borderColor: BORDER_GRAY }} />

            {/* Abstract and Keywords */}
            <section>
              <SectionHeader eyebrow="Metadata" title="Abstract and Keywords" />
              <ProseSection>
                The abstract should be 180–250 words and clearly summarize the research objective, methodology, main findings, and contribution. Authors should provide 5–7 keywords that accurately represent the content of the manuscript. For Uzbek and Russian manuscripts, an English title, English abstract, and English keywords are required.
              </ProseSection>
              <div className="flex flex-wrap gap-3 mt-5">
                {["180–250 word abstract", "5–7 keywords", "English metadata required"].map(badge => (
                  <span
                    key={badge}
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border"
                    style={{ color: NAVY, borderColor: BORDER_GRAY, backgroundColor: LIGHT_GRAY }}
                  >
                    <CheckCircle size={11} style={{ color: GOLD }} />
                    {badge}
                  </span>
                ))}
              </div>
            </section>

            <div className="border-t" style={{ borderColor: BORDER_GRAY }} />

            {/* Formatting Requirements */}
            <section>
              <SectionHeader eyebrow="Formatting" title="Formatting Requirements" />
              <div className="space-y-2.5">
                {FORMATTING_CHECKLIST.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-lg px-4 py-3"
                    style={{ backgroundColor: "white", border: `1px solid ${BORDER_GRAY}` }}
                  >
                    <CheckCircle size={15} style={{ color: GOLD, flexShrink: 0, marginTop: 1 }} />
                    <span className="text-[13px] leading-relaxed" style={{ color: TEXT_GRAY }}>{item}</span>
                  </div>
                ))}
              </div>
            </section>

            <div className="border-t" style={{ borderColor: BORDER_GRAY }} />

            {/* References */}
            <section>
              <SectionHeader eyebrow="Citations" title="References" />
              <ProseSection>
                Authors should use recent, relevant, and reliable academic sources. Priority should be given to peer-reviewed journal articles, conference papers, books, and reputable academic sources. References should be formatted consistently according to the journal template. Fabricated, unverifiable, or inaccurate references may result in rejection.
              </ProseSection>
            </section>

            <div className="border-t" style={{ borderColor: BORDER_GRAY }} />

            {/* Required Declarations */}
            <section>
              <SectionHeader eyebrow="Ethical Compliance" title="Required Declarations" />
              <div className="grid sm:grid-cols-2 gap-3">
                {DECLARATIONS.map((decl, i) => (
                  <div
                    key={i}
                    className="rounded-lg border p-4 flex items-start gap-3"
                    style={{ borderColor: BORDER_GRAY }}
                  >
                    <FileText size={15} style={{ color: GOLD, flexShrink: 0, marginTop: 1 }} />
                    <div>
                      <div className="text-[13px] font-semibold" style={{ color: NAVY }}>{decl.label}</div>
                      {decl.note && (
                        <div className="text-[10px] font-bold uppercase tracking-wider mt-0.5" style={{ color: TEXT_GRAY }}>
                          {decl.required ? "Required" : decl.note}
                        </div>
                      )}
                      {decl.required && !decl.note && (
                        <div className="text-[10px] font-bold uppercase tracking-wider mt-0.5" style={{ color: GOLD }}>
                          Required
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-5">
              <QuickLinksSidebar
                title="Author Resources"
                links={SIDEBAR_LINKS}
                primaryAction={{ label: "Submit Manuscript", href: "/submit" }}
              />
              <div
                className="rounded-xl p-5"
                style={{ backgroundColor: LIGHT_GRAY, border: `1px solid ${BORDER_GRAY}` }}
              >
                <div className="text-xs font-bold mb-2" style={{ color: NAVY }}>Download Template</div>
                <p className="text-[11px] leading-relaxed mb-3" style={{ color: TEXT_GRAY }}>
                  Use the official CAJAIDT manuscript template for correct formatting.
                </p>
                <a
                  href="#"
                  className="flex items-center gap-2 text-xs font-semibold transition-opacity hover:opacity-70"
                  style={{ color: GOLD }}
                >
                  <Download size={13} />
                  Manuscript Template (.docx)
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomCTA
        title="Prepare your manuscript for submission"
        primaryLabel="Download Manuscript Template"
        primaryHref="#"
        secondaryLabel="Submit Manuscript"
        secondaryHref="/submit"
      />
    </>
  );
}
