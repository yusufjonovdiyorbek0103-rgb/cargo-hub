import {
  NAVY, GOLD, LIGHT_GRAY, TEXT_GRAY, BORDER_GRAY, SERIF,
  PageBanner, BottomCTA, SectionHeader, ProseSection,
  QuickLinksSidebar, PolicyCardGrid,
} from "./shared";

const REVIEW_WORKFLOW = [
  { num: 1, label: "Submission" },
  { num: 2, label: "Technical Check" },
  { num: 3, label: "Editorial Screening" },
  { num: 4, label: "Reviewer Invitation" },
  { num: 5, label: "Double-Blind Review" },
  { num: 6, label: "Editorial Decision" },
  { num: 7, label: "Revision" },
  { num: 8, label: "Final Decision" },
  { num: 9, label: "Copyediting & Publication" },
];

const REVIEWER_CRITERIA = [
  "Subject expertise in the manuscript's field",
  "Academic or professional experience",
  "Absence of conflict of interest with the authors",
  "Ethical reliability and track record",
  "Ability to provide constructive, objective feedback",
  "Timely response to review invitations",
];

const DECISIONS = [
  {
    label: "Accept",
    desc: "The manuscript is accepted for publication without or with minor editorial adjustments.",
    color: "#16A34A",
    bg: "#F0FDF4",
  },
  {
    label: "Minor Revision",
    desc: "Manuscript requires small corrections or clarifications. Revised version reviewed by editor.",
    color: "#2563EB",
    bg: "#EFF6FF",
  },
  {
    label: "Major Revision",
    desc: "Substantial changes are required. Revised manuscript may be returned to reviewers.",
    color: GOLD,
    bg: "rgba(195,154,59,0.07)",
  },
  {
    label: "Reject and Resubmit",
    desc: "Manuscript has significant gaps but may be reconsidered as a new submission after major reworking.",
    color: "#EA580C",
    bg: "#FFF7ED",
  },
  {
    label: "Reject",
    desc: "Manuscript does not meet the journal's standards and will not be reconsidered.",
    color: "#DC2626",
    bg: "#FEF2F2",
  },
];

const SIDEBAR_LINKS = [
  { label: "Author Guidelines", to: "/author-guidelines" },
  { label: "Submit Manuscript", to: "/submit" },
  { label: "Publication Ethics", to: "/publication-ethics" },
  { label: "Plagiarism Policy", to: "/plagiarism-policy" },
  { label: "AI Use Policy", to: "/ai-use-policy" },
];

export default function PeerReviewPolicy() {
  return (
    <>
      <PageBanner
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Policies" }, { label: "Peer Review Policy" }]}
        title="Peer Review Policy"
        subtitle="CAJAIDT applies a double-blind peer-review process to support scholarly quality, fairness, and editorial integrity."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-14">

            {/* Review Model */}
            <section>
              <SectionHeader eyebrow="Model" title="Review Model" />
              <ProseSection>
                CAJAIDT uses a double-blind peer-review model. The identities of authors and reviewers are concealed during the review process. Manuscripts are evaluated based on originality, relevance to the journal scope, methodological quality, clarity, ethical compliance, and contribution to the field.
              </ProseSection>
            </section>

            <div className="border-t" style={{ borderColor: BORDER_GRAY }} />

            {/* Review Workflow */}
            <section>
              <SectionHeader
                eyebrow="Process"
                title="Review Workflow"
                subtitle="Every submitted manuscript follows this structured editorial process."
              />
              <div className="space-y-3">
                {REVIEW_WORKFLOW.map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                        style={{
                          backgroundColor:
                            step.num === 5 ? GOLD :
                            step.num === 9 ? "#16A34A" :
                            NAVY,
                        }}
                      >
                        {step.num}
                      </div>
                      {i < REVIEW_WORKFLOW.length - 1 && (
                        <div className="w-px flex-1 my-1.5" style={{ backgroundColor: BORDER_GRAY }} />
                      )}
                    </div>
                    <div className="pb-3 flex-1 flex items-center">
                      <div
                        className="rounded-lg px-4 py-2.5 flex-1"
                        style={{
                          backgroundColor: step.num === 5 ? "rgba(195,154,59,0.07)" : step.num === 9 ? "#F0FDF4" : LIGHT_GRAY,
                          border: `1px solid ${BORDER_GRAY}`,
                        }}
                      >
                        <span className="text-sm font-semibold" style={{ color: NAVY }}>{step.label}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div className="border-t" style={{ borderColor: BORDER_GRAY }} />

            {/* Reviewer Criteria */}
            <section>
              <SectionHeader
                eyebrow="Reviewer Selection"
                title="Reviewer Criteria"
                subtitle="Reviewers are selected based on the following criteria."
              />
              <PolicyCardGrid items={REVIEWER_CRITERIA} cols={2} />
            </section>

            <div className="border-t" style={{ borderColor: BORDER_GRAY }} />

            {/* Editorial Decisions */}
            <section>
              <SectionHeader eyebrow="Outcomes" title="Editorial Decisions" />
              <div className="space-y-3">
                {DECISIONS.map((d, i) => (
                  <div
                    key={i}
                    className="rounded-xl border p-5 flex items-start gap-4"
                    style={{ borderColor: BORDER_GRAY, backgroundColor: d.bg }}
                  >
                    <span
                      className="text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap flex-shrink-0"
                      style={{ backgroundColor: d.color, color: "white" }}
                    >
                      {d.label}
                    </span>
                    <p className="text-[13px] leading-relaxed" style={{ color: TEXT_GRAY }}>{d.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="border-t" style={{ borderColor: BORDER_GRAY }} />

            {/* Review Timeline */}
            <section>
              <SectionHeader eyebrow="Timeline" title="Review Timeline" />
              <ProseSection>
                The journal aims to complete initial technical screening within 5–7 working days. External peer review usually takes 2–4 weeks, depending on reviewer availability and manuscript complexity. Revised manuscripts are assessed by editors and, when necessary, returned to reviewers.
              </ProseSection>
              <div className="grid sm:grid-cols-2 gap-3 mt-5">
                {[
                  { label: "Technical Screening", value: "5–7 working days" },
                  { label: "External Peer Review", value: "2–4 weeks" },
                ].map(item => (
                  <div key={item.label} className="rounded-lg p-4" style={{ backgroundColor: LIGHT_GRAY, border: `1px solid ${BORDER_GRAY}` }}>
                    <div className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: GOLD }}>{item.label}</div>
                    <div className="text-sm font-bold" style={{ color: NAVY }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </section>

            <div className="border-t" style={{ borderColor: BORDER_GRAY }} />

            {/* Confidentiality */}
            <section>
              <SectionHeader eyebrow="Confidentiality" title="Confidentiality" />
              <ProseSection>
                Reviewers must treat manuscripts as confidential documents. Manuscript content, data, figures, methods, and findings must not be shared, used, or disclosed before publication. Uploading manuscript content into external AI tools or sharing it with colleagues without permission is prohibited.
              </ProseSection>
            </section>

            <div className="border-t" style={{ borderColor: BORDER_GRAY }} />

            {/* Conflicts of Interest */}
            <section>
              <SectionHeader eyebrow="Integrity" title="Conflicts of Interest" />
              <ProseSection>
                Editors and reviewers must declare any actual or potential conflicts of interest. A reviewer should decline a review invitation if there is a personal, institutional, financial, competitive, or collaborative relationship that could affect impartiality.
              </ProseSection>
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
        title="Questions about the peer review process?"
        primaryLabel="Reviewer Guidelines"
        primaryHref="mailto:editorial@cajaidt.org"
        secondaryLabel="Become a Reviewer"
        secondaryHref="mailto:editorial@cajaidt.org"
      />
    </>
  );
}
