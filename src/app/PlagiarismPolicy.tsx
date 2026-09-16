import { ArrowRight } from "lucide-react";
import {
  NAVY, GOLD, LIGHT_GRAY, TEXT_GRAY, BORDER_GRAY, SERIF,
  PageBanner, BottomCTA, SectionHeader, ProseSection,
  QuickLinksSidebar, PolicyCardGrid,
} from "./shared";

const PLAGIARISM_TYPES = [
  "Direct plagiarism — copying text verbatim without attribution",
  "Mosaic plagiarism — paraphrasing with minor word changes without citation",
  "Self-plagiarism — reusing own previously published text without disclosure",
  "Duplicate publication — submitting the same manuscript to multiple journals",
  "Uncited paraphrasing — rewording others' ideas without acknowledgment",
  "Data or image plagiarism — reproducing others' data, tables, or figures without permission",
  "Reference manipulation — citing sources not consulted or fabricating citations",
];

const DECISION_FLOW = [
  {
    trigger: "Minor overlap detected",
    action: "Author clarification or targeted revision requested",
    color: "#2563EB",
    bg: "#EFF6FF",
  },
  {
    trigger: "Significant overlap or undisclosed reuse",
    action: "Rejection before external peer review",
    color: GOLD,
    bg: "rgba(195,154,59,0.07)",
  },
  {
    trigger: "Serious plagiarism or fabrication",
    action: "Rejection and possible institutional notification",
    color: "#EA580C",
    bg: "#FFF7ED",
  },
  {
    trigger: "Plagiarism discovered post-publication",
    action: "Correction, expression of concern, or retraction",
    color: "#DC2626",
    bg: "#FEF2F2",
  },
];

const SIDEBAR_LINKS = [
  { label: "Publication Ethics", to: "/publication-ethics" },
  { label: "Peer Review Policy", to: "/peer-review-policy" },
  { label: "AI Use Policy", to: "/ai-use-policy" },
  { label: "Author Guidelines", to: "/author-guidelines" },
  { label: "Submit Manuscript", to: "/submit" },
];

export default function PlagiarismPolicy() {
  return (
    <>
      <PageBanner
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Policies" }, { label: "Plagiarism Policy" }]}
        title="Plagiarism Policy"
        subtitle="CAJAIDT screens submissions for originality and takes plagiarism, self-plagiarism, and text recycling seriously."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-14">

            {/* Originality */}
            <section>
              <SectionHeader eyebrow="Core Requirement" title="Originality Requirement" />
              <ProseSection>
                Submitted manuscripts must be original and must not contain plagiarized, fabricated, or improperly reused content. Authors are responsible for ensuring that all sources are properly cited and that submitted work does not violate academic integrity standards. The corresponding author guarantees the originality of the manuscript on behalf of all co-authors.
              </ProseSection>
            </section>

            <div className="border-t" style={{ borderColor: BORDER_GRAY }} />

            {/* Types */}
            <section>
              <SectionHeader
                eyebrow="Definitions"
                title="Types of Plagiarism"
                subtitle="CAJAIDT recognizes the following forms of plagiarism and text misappropriation."
              />
              <div className="space-y-2.5">
                {PLAGIARISM_TYPES.map((item, i) => {
                  const [title, ...rest] = item.split(" — ");
                  return (
                    <div
                      key={i}
                      className="rounded-lg border p-4"
                      style={{ borderColor: BORDER_GRAY, borderLeft: `3px solid ${i % 2 === 0 ? NAVY : GOLD}` }}
                    >
                      <div className="text-[13px] font-semibold mb-0.5" style={{ color: NAVY }}>{title}</div>
                      <div className="text-[12px]" style={{ color: TEXT_GRAY }}>{rest.join(" — ")}</div>
                    </div>
                  );
                })}
              </div>
            </section>

            <div className="border-t" style={{ borderColor: BORDER_GRAY }} />

            {/* Screening */}
            <section>
              <SectionHeader eyebrow="Detection" title="Similarity Screening" />
              <ProseSection>
                All submissions may be checked using plagiarism detection tools during technical screening or at later editorial stages. Similarity reports are interpreted by editors, taking into account quoted material, references, methodology descriptions, and legitimate overlap with prior work by the same authors.
              </ProseSection>
              <div
                className="mt-5 rounded-xl p-5"
                style={{ backgroundColor: LIGHT_GRAY, border: `1px solid ${BORDER_GRAY}` }}
              >
                <p className="text-[12px] leading-relaxed" style={{ color: TEXT_GRAY }}>
                  <strong style={{ color: NAVY }}>Note:</strong> A high similarity score does not automatically indicate plagiarism. Editors assess the nature and context of the overlap. Self-citations, properly quoted material, and standard methodological language are taken into account.
                </p>
              </div>
            </section>

            <div className="border-t" style={{ borderColor: BORDER_GRAY }} />

            {/* Editorial Actions */}
            <section>
              <SectionHeader eyebrow="Consequences" title="Editorial Actions" />
              <div className="space-y-3">
                {DECISION_FLOW.map((d, i) => (
                  <div
                    key={i}
                    className="rounded-xl border flex flex-col sm:flex-row overflow-hidden"
                    style={{ borderColor: BORDER_GRAY }}
                  >
                    <div
                      className="sm:w-48 px-4 py-4 flex items-center gap-3 flex-shrink-0"
                      style={{ backgroundColor: d.bg }}
                    >
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: d.color }}
                      />
                      <span className="text-xs font-semibold leading-snug" style={{ color: d.color }}>
                        {d.trigger}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 px-5 py-4 flex-1 bg-white">
                      <ArrowRight size={14} style={{ color: d.color, flexShrink: 0 }} />
                      <span className="text-[13px] font-medium" style={{ color: NAVY }}>{d.action}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div className="border-t" style={{ borderColor: BORDER_GRAY }} />

            {/* Author Responsibility */}
            <section>
              <SectionHeader eyebrow="Author Duty" title="Author Responsibility" />
              <ProseSection>
                Authors should properly cite all sources, avoid copying text from previous publications, clearly identify reused materials, and ensure that all co-authors have reviewed the manuscript before submission. When in doubt about permissible reuse, authors should consult the editorial office before submission.
              </ProseSection>
              <div className="grid sm:grid-cols-2 gap-3 mt-5">
                {[
                  "Properly cite all sources",
                  "Avoid copying text from prior publications",
                  "Clearly identify reused figures or data",
                  "Ensure co-author review before submission",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-lg px-4 py-3"
                    style={{ backgroundColor: LIGHT_GRAY, border: `1px solid ${BORDER_GRAY}` }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: GOLD }} />
                    <span className="text-[13px] font-medium" style={{ color: NAVY }}>{item}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <QuickLinksSidebar
                title="Related Policies"
                links={SIDEBAR_LINKS}
                primaryAction={{ label: "Submit Manuscript", href: "/submit" }}
              />
            </div>
          </div>
        </div>
      </div>

      <BottomCTA
        title="Questions about originality or citations?"
        primaryLabel="Publication Ethics"
        primaryHref="/publication-ethics"
        secondaryLabel="Submit Manuscript"
        secondaryHref="/submit"
      />
    </>
  );
}
