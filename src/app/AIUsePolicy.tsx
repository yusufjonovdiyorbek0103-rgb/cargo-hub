import { AlertTriangle } from "lucide-react";
import {
  NAVY, GOLD, LIGHT_GRAY, TEXT_GRAY, BORDER_GRAY, SERIF,
  PageBanner, BottomCTA, SectionHeader, ProseSection,
  QuickLinksSidebar, InfoBox,
} from "./shared";

const PROHIBITED_USES = [
  "Generating fake or fabricated data",
  "Creating fabricated references or citations",
  "Producing misleading or unsupported results",
  "Replacing human scholarly judgment in analysis or argumentation",
  "Uploading confidential reviewer comments or unpublished manuscripts into public AI systems",
  "Creating images, figures, or charts without proper disclosure",
  "Submitting AI-generated text without thorough verification and editing",
];

const SIDEBAR_LINKS = [
  { label: "Author Guidelines", to: "/author-guidelines" },
  { label: "Publication Ethics", to: "/publication-ethics" },
  { label: "Plagiarism Policy", to: "/plagiarism-policy" },
  { label: "Peer Review Policy", to: "/peer-review-policy" },
  { label: "Submit Manuscript", to: "/submit" },
];

export default function AIUsePolicy() {
  return (
    <>
      <PageBanner
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Policies" }, { label: "AI Use Policy" }]}
        title="AI Use Policy"
        subtitle="Guidelines for responsible disclosure and use of artificial intelligence tools in manuscript preparation and research."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-14">

            {/* General Principle */}
            <section>
              <SectionHeader eyebrow="General Principle" title="AI Tools in Manuscript Preparation" />
              <ProseSection>
                Authors may use AI-assisted tools for language editing, formatting assistance, coding support, or analytical support when appropriate. However, authors remain fully responsible for the accuracy, originality, integrity, and ethical compliance of the submitted work. The use of AI tools does not reduce authorial responsibility.
              </ProseSection>
            </section>

            <div className="border-t" style={{ borderColor: BORDER_GRAY }} />

            {/* AI Cannot Be Authors */}
            <section>
              <SectionHeader eyebrow="Authorship Rule" title="AI Tools Cannot Be Authors" />
              <InfoBox type="rule" title="Important Authorship Rule">
                AI tools, chatbots, language models, or automated systems cannot be listed as authors. Authorship is limited to individuals who can take responsibility for the work, approve the final manuscript, and respond to questions about accuracy and integrity. Any co-author listed must be a human researcher who meets standard authorship criteria.
              </InfoBox>
            </section>

            <div className="border-t" style={{ borderColor: BORDER_GRAY }} />

            {/* Disclosure */}
            <section>
              <SectionHeader eyebrow="Transparency" title="Disclosure Requirement" />
              <ProseSection>
                If AI tools were used in preparing the manuscript, authors must disclose the tool name, purpose of use, and the parts of the manuscript or research process affected. Simple grammar or spelling correction does not normally require detailed disclosure, but substantial AI-assisted writing, analysis, coding, image generation, or data processing must be disclosed in the manuscript.
              </ProseSection>
              <div className="grid sm:grid-cols-2 gap-3 mt-6">
                {[
                  { label: "Grammar / Spell Check", status: "Disclosure optional", color: "#16A34A" },
                  { label: "Language Editing", status: "Disclosure recommended", color: "#2563EB" },
                  { label: "AI-Assisted Writing", status: "Disclosure required", color: GOLD },
                  { label: "Data Analysis / Coding", status: "Disclosure required", color: GOLD },
                  { label: "Image / Figure Generation", status: "Disclosure required", color: "#DC2626" },
                  { label: "Fabrication / Replacing judgment", status: "Prohibited", color: "#DC2626" },
                ].map(item => (
                  <div
                    key={item.label}
                    className="rounded-lg border p-3.5 flex items-center justify-between gap-3"
                    style={{ borderColor: BORDER_GRAY }}
                  >
                    <span className="text-[13px] font-medium" style={{ color: NAVY }}>{item.label}</span>
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap"
                      style={{ color: item.color, backgroundColor: `${item.color}15` }}
                    >
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <div className="border-t" style={{ borderColor: BORDER_GRAY }} />

            {/* Prohibited Uses */}
            <section>
              <SectionHeader eyebrow="Prohibited Conduct" title="Prohibited Uses of AI" />
              <div className="rounded-xl border overflow-hidden" style={{ borderColor: "#FCA5A5" }}>
                <div className="flex items-center gap-3 px-5 py-4" style={{ backgroundColor: "#FEF2F2" }}>
                  <AlertTriangle size={16} style={{ color: "#DC2626" }} />
                  <span className="text-sm font-bold" style={{ color: "#DC2626" }}>
                    The following uses of AI are prohibited at CAJAIDT
                  </span>
                </div>
                <div className="divide-y divide-red-100">
                  {PROHIBITED_USES.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 px-5 py-3 bg-white">
                      <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: "#DC2626" }} />
                      <span className="text-[13px] leading-relaxed" style={{ color: TEXT_GRAY }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <div className="border-t" style={{ borderColor: BORDER_GRAY }} />

            {/* Sample Statement */}
            <section>
              <SectionHeader eyebrow="Template" title="Suggested Disclosure Statement" />
              <InfoBox type="sample" title="Sample AI Use Disclosure">
                <em>
                  "During the preparation of this manuscript, the authors used [tool name] for [specific purpose, e.g., language editing / data visualization / code generation]. The authors reviewed, edited, and verified all AI-assisted outputs and take full responsibility for the content of the manuscript."
                </em>
              </InfoBox>
              <p className="text-[12px] mt-3 leading-relaxed" style={{ color: TEXT_GRAY }}>
                This disclosure should be placed in the Acknowledgements section or as a separate AI Use Disclosure statement before the References.
              </p>
            </section>

            <div className="border-t" style={{ borderColor: BORDER_GRAY }} />

            {/* Reviewer Use */}
            <section>
              <SectionHeader eyebrow="Reviewer Policy" title="Reviewer Use of AI" />
              <ProseSection>
                Reviewers must not upload confidential manuscripts, unpublished data, or review materials into external AI tools unless explicitly allowed by the journal and the tool meets appropriate confidentiality standards. Reviewers remain responsible for the content and quality of their review reports. AI-generated review reports submitted without reviewer judgment are not acceptable.
              </ProseSection>
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <QuickLinksSidebar
                title="Related Policies"
                links={SIDEBAR_LINKS}
                primaryAction={{ label: "Submit Manuscript", href: "/submit" }}
                note="Questions about AI use in your manuscript? Contact the editorial office before submission."
              />
            </div>
          </div>
        </div>
      </div>

      <BottomCTA
        title="Questions about AI use in your manuscript?"
        primaryLabel="Author Guidelines"
        primaryHref="/author-guidelines"
        secondaryLabel="Publication Ethics"
        secondaryHref="/publication-ethics"
      />
    </>
  );
}
