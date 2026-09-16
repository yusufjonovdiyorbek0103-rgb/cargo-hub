import { CheckCircle } from "lucide-react";
import {
  NAVY, GOLD, LIGHT_GRAY, TEXT_GRAY, BORDER_GRAY, SERIF,
  PageBanner, BottomCTA, SectionHeader, ProseSection,
  QuickLinksSidebar, InfoBox,
} from "./shared";

const RESPONSIBILITIES = [
  { title: "Maintain Confidentiality", desc: "Treat all manuscript content, data, and findings as strictly confidential. Do not share or discuss manuscripts before publication." },
  { title: "Declare Conflicts of Interest", desc: "Disclose any personal, institutional, financial, or collaborative relationships that could compromise impartial review." },
  { title: "Review Within Area of Expertise", desc: "Accept review invitations only for manuscripts that fall within your active area of scholarly or professional expertise." },
  { title: "Provide Objective and Respectful Feedback", desc: "Comments should be evidence-based, constructive, and professional. Personal criticism of authors is not acceptable." },
  { title: "Evaluate Originality and Methodology", desc: "Assess whether the research makes a genuine contribution and whether the methodology is rigorous, reproducible, and appropriate." },
  { title: "Identify Ethical Concerns", desc: "Report any suspected plagiarism, data fabrication, undisclosed AI use, or other ethical issues to the editor." },
  { title: "Submit Reviews on Time", desc: "Complete and submit your review by the agreed deadline. If you need more time, notify the editorial office promptly." },
];

const REVIEW_CRITERIA = [
  "Relevance to journal aims and scope",
  "Originality and scholarly contribution",
  "Clarity of research question and objective",
  "Quality and depth of literature review",
  "Methodological rigor and transparency",
  "Validity and reliability of results",
  "Quality and depth of discussion",
  "Ethical compliance and declarations",
  "Quality and accuracy of references",
  "Clarity of writing and manuscript structure",
];

const DECISIONS = [
  { label: "Accept", desc: "The manuscript is ready for publication without revisions or with only minor editorial adjustments.", color: "#16A34A", bg: "#F0FDF4" },
  { label: "Minor Revision", desc: "Small corrections or clarifications are required. The revised manuscript is typically reviewed by the editor only.", color: "#2563EB", bg: "#EFF6FF" },
  { label: "Major Revision", desc: "Substantial changes to the content, analysis, or structure are necessary. The revised manuscript may be returned to reviewers.", color: GOLD, bg: "rgba(195,154,59,0.07)" },
  { label: "Reject and Resubmit", desc: "The manuscript has significant weaknesses but may be resubmitted as a new submission after fundamental reworking.", color: "#EA580C", bg: "#FFF7ED" },
  { label: "Reject", desc: "The manuscript does not meet the journal's academic standards and is not suitable for reconsideration in its current form.", color: "#DC2626", bg: "#FEF2F2" },
];

const REPORT_STRUCTURE = [
  "Summary of the manuscript — brief description of the research question, approach, and findings.",
  "Major strengths — what the manuscript does well in terms of contribution, methodology, or presentation.",
  "Major concerns — substantive issues that must be addressed before the manuscript can be considered for publication.",
  "Methodological comments — specific observations on research design, data collection, analysis, or validity.",
  "Comments on originality and contribution — assessment of the manuscript's novelty and scholarly value.",
  "Ethical or data concerns — any issues related to research ethics, data handling, AI use, or plagiarism.",
  "Minor comments and formatting suggestions — smaller issues of language, formatting, or structure.",
  "Recommendation to the editor — your overall decision recommendation (confidential, not shared with authors).",
];

const SIDEBAR_LINKS = [
  { label: "Peer Review Policy", to: "/peer-review-policy" },
  { label: "Publication Ethics", to: "/publication-ethics" },
  { label: "AI Use Policy", to: "/ai-use-policy" },
  { label: "Author Guidelines", to: "/author-guidelines" },
  { label: "Contact Editorial Office", to: "/contact" },
];

export default function ReviewerGuidelines() {
  return (
    <>
      <PageBanner
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Reviewer Guidelines" }]}
        title="Reviewer Guidelines"
        subtitle="Guidance for reviewers participating in the CAJAIDT double-blind peer-review process."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-14">

            <InfoBox type="note">
              Reviewers play an essential role in maintaining the scholarly quality, integrity, and relevance of the journal. Reviews should be objective, constructive, confidential, and focused on the academic merit of the manuscript.
            </InfoBox>

            {/* Responsibilities */}
            <section>
              <SectionHeader eyebrow="Reviewer Duties" title="Reviewer Responsibilities" />
              <div className="grid sm:grid-cols-2 gap-4">
                {RESPONSIBILITIES.map((r, i) => (
                  <div
                    key={i}
                    className="rounded-xl border p-5 flex flex-col gap-2"
                    style={{ borderColor: BORDER_GRAY, borderTop: `3px solid ${i % 2 === 0 ? NAVY : GOLD}` }}
                  >
                    <div className="text-sm font-bold" style={{ color: NAVY }}>{r.title}</div>
                    <p className="text-[12px] leading-relaxed" style={{ color: TEXT_GRAY }}>{r.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="border-t" style={{ borderColor: BORDER_GRAY }} />

            {/* Review Criteria */}
            <section>
              <SectionHeader
                eyebrow="Evaluation Criteria"
                title="Review Criteria"
                subtitle="Reviewers should evaluate each manuscript against the following criteria."
              />
              <div className="space-y-2">
                {REVIEW_CRITERIA.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-lg px-4 py-3"
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

            {/* Recommendations */}
            <section>
              <SectionHeader eyebrow="Decision Options" title="Reviewer Recommendation Options" />
              <div className="space-y-3">
                {DECISIONS.map((d, i) => (
                  <div
                    key={i}
                    className="rounded-xl border p-5 flex items-start gap-4"
                    style={{ borderColor: BORDER_GRAY, backgroundColor: d.bg }}
                  >
                    <span
                      className="text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap flex-shrink-0 text-white"
                      style={{ backgroundColor: d.color }}
                    >
                      {d.label}
                    </span>
                    <p className="text-[13px] leading-relaxed" style={{ color: TEXT_GRAY }}>{d.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="border-t" style={{ borderColor: BORDER_GRAY }} />

            {/* Confidentiality and AI */}
            <section>
              <SectionHeader eyebrow="Integrity" title="Confidentiality and AI Tools" />
              <ProseSection>
                Reviewers must not share manuscripts, data, figures, or unpublished findings with third parties. Reviewers should not upload confidential manuscript materials into external AI tools unless explicitly permitted by the journal and appropriate confidentiality safeguards are in place. The content of review reports must also remain confidential and must not be shared outside the editorial process.
              </ProseSection>
            </section>

            <div className="border-t" style={{ borderColor: BORDER_GRAY }} />

            {/* Review Report Structure */}
            <section>
              <SectionHeader
                eyebrow="Report Format"
                title="Review Report Structure"
                subtitle="We recommend structuring your review report according to the following sections."
              />
              <div className="space-y-3">
                {REPORT_STRUCTURE.map((item, i) => {
                  const [label, ...rest] = item.split(" — ");
                  return (
                    <div
                      key={i}
                      className="rounded-lg border p-4 flex gap-4"
                      style={{ borderColor: BORDER_GRAY }}
                    >
                      <span
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                        style={{ backgroundColor: i === 7 ? GOLD : NAVY }}
                      >
                        {i + 1}
                      </span>
                      <div>
                        <div className="text-sm font-semibold mb-0.5" style={{ color: NAVY }}>{label}</div>
                        <p className="text-[12px] leading-relaxed" style={{ color: TEXT_GRAY }}>{rest.join(" — ")}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-5">
                <InfoBox type="rule">
                  The recommendation to the editor (step 8) is confidential and will not be shared with authors. Comments intended for authors should be placed in the relevant sections of the review form.
                </InfoBox>
              </div>
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-5">
              <QuickLinksSidebar
                title="Related Resources"
                links={SIDEBAR_LINKS}
              />
              <div
                className="rounded-xl p-5 text-center"
                style={{ backgroundColor: LIGHT_GRAY, border: `1px solid ${BORDER_GRAY}` }}
              >
                <div className="text-sm font-bold mb-2" style={{ color: NAVY, fontFamily: SERIF }}>
                  Interested in reviewing?
                </div>
                <p className="text-[11px] leading-relaxed mb-4" style={{ color: TEXT_GRAY }}>
                  Join the CAJAIDT reviewer community and contribute to advancing scholarly publishing in AI and digital transformation.
                </p>
                <a
                  href="mailto:editorial@cajaidt.org"
                  className="block text-center px-4 py-2 text-xs font-semibold text-white rounded transition-opacity hover:opacity-90"
                  style={{ backgroundColor: GOLD }}
                >
                  Become a Reviewer
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomCTA
        title="Interested in joining the reviewer community?"
        primaryLabel="Become a Reviewer"
        primaryHref="mailto:editorial@cajaidt.org"
        secondaryLabel="Contact Editorial Office"
        secondaryHref="/contact"
      />
    </>
  );
}
