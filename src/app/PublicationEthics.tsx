import {
  NAVY, GOLD, LIGHT_GRAY, TEXT_GRAY, BORDER_GRAY, SERIF,
  PageBanner, BottomCTA, SectionHeader, ProseSection,
  QuickLinksSidebar, InfoBox,
} from "./shared";

const AUTHOR_RESPONSIBILITIES = [
  "Submit original work",
  "Avoid plagiarism and self-plagiarism",
  "Provide accurate data and references",
  "Declare conflicts of interest",
  "Disclose funding sources",
  "Obtain ethics approval where required",
  "Confirm all co-authors have approved the manuscript",
  "Correct significant errors after publication",
];

const EDITOR_RESPONSIBILITIES = [
  "Make decisions based on scholarly merit",
  "Protect editorial independence",
  "Manage conflicts of interest",
  "Ensure fair peer review",
  "Maintain confidentiality of submissions",
  "Address ethical concerns promptly",
  "Issue corrections or retractions where necessary",
];

const REVIEWER_RESPONSIBILITIES = [
  "Provide objective and constructive feedback",
  "Maintain confidentiality of manuscripts",
  "Declare conflicts of interest",
  "Review only within their expertise",
  "Avoid using unpublished material",
  "Submit reviews in a timely manner",
];

const SIDEBAR_LINKS = [
  { label: "Peer Review Policy", to: "/peer-review-policy" },
  { label: "AI Use Policy", to: "/ai-use-policy" },
  { label: "Plagiarism Policy", to: "/plagiarism-policy" },
  { label: "Author Guidelines", to: "/author-guidelines" },
  { label: "Submit Manuscript", to: "/submit" },
];

function ResponsibilityGroup({
  title,
  eyebrow,
  items,
  accent,
}: {
  title: string;
  eyebrow: string;
  items: string[];
  accent: string;
}) {
  return (
    <section>
      <SectionHeader eyebrow={eyebrow} title={title} />
      <div className="grid sm:grid-cols-2 gap-3">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-start gap-3 rounded-lg px-4 py-3.5"
            style={{ border: `1px solid ${BORDER_GRAY}`, backgroundColor: "white" }}
          >
            <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: accent }} />
            <span className="text-[13px] font-medium leading-snug" style={{ color: NAVY }}>{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function PublicationEthics() {
  return (
    <>
      <PageBanner
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Policies" }, { label: "Publication Ethics" }]}
        title="Publication Ethics"
        subtitle="Ethical principles for authors, editors, reviewers, and the publisher."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-14">

            {/* Commitment */}
            <section>
              <SectionHeader eyebrow="Principles" title="Ethical Commitment" />
              <ProseSection>
                CAJAIDT is committed to maintaining high standards of publication ethics, editorial independence, transparency, and scholarly integrity. All parties involved in the publication process, including authors, editors, reviewers, and the publisher, are expected to follow ethical principles and responsible research practices.
              </ProseSection>
            </section>

            <div className="border-t" style={{ borderColor: BORDER_GRAY }} />

            <ResponsibilityGroup
              eyebrow="Author Ethics"
              title="Responsibilities of Authors"
              items={AUTHOR_RESPONSIBILITIES}
              accent={NAVY}
            />

            <div className="border-t" style={{ borderColor: BORDER_GRAY }} />

            <ResponsibilityGroup
              eyebrow="Editorial Ethics"
              title="Responsibilities of Editors"
              items={EDITOR_RESPONSIBILITIES}
              accent={GOLD}
            />

            <div className="border-t" style={{ borderColor: BORDER_GRAY }} />

            <ResponsibilityGroup
              eyebrow="Reviewer Ethics"
              title="Responsibilities of Reviewers"
              items={REVIEWER_RESPONSIBILITIES}
              accent={NAVY}
            />

            <div className="border-t" style={{ borderColor: BORDER_GRAY }} />

            {/* Misconduct */}
            <section>
              <SectionHeader eyebrow="Integrity" title="Research Misconduct" />
              <ProseSection>
                Research misconduct includes plagiarism, data fabrication, data falsification, image manipulation, fake references, duplicate submission, inappropriate authorship, citation manipulation, and unethical use of artificial intelligence tools. Suspected misconduct may result in rejection, correction, retraction, notification to institutions, or other appropriate editorial action.
              </ProseSection>
              <div className="mt-6">
                <InfoBox type="warning" title="Consequences of Research Misconduct">
                  Manuscripts found to contain evidence of misconduct at any stage — before or after publication — may be rejected, retracted, or subject to institutional notification. The journal follows COPE guidelines for handling suspected misconduct.
                </InfoBox>
              </div>
            </section>

            <div className="border-t" style={{ borderColor: BORDER_GRAY }} />

            {/* Corrections */}
            <section>
              <SectionHeader eyebrow="Post-publication" title="Corrections and Retractions" />
              <ProseSection>
                If a significant error or ethical issue is identified after publication, the journal may issue a correction, expression of concern, or retraction depending on the nature and severity of the issue. Authors are encouraged to notify the editorial office if they discover significant errors in their own published work.
              </ProseSection>
              <div className="grid sm:grid-cols-3 gap-3 mt-6">
                {[
                  { label: "Correction", desc: "For minor factual or typographical errors that do not affect conclusions.", color: "#2563EB" },
                  { label: "Expression of Concern", desc: "When an investigation is ongoing and readers should be informed.", color: GOLD },
                  { label: "Retraction", desc: "For serious misconduct, unreliable findings, or ethical violations.", color: "#DC2626" },
                ].map(item => (
                  <div key={item.label} className="rounded-lg border p-4" style={{ borderColor: BORDER_GRAY, borderTop: `3px solid ${item.color}` }}>
                    <div className="text-sm font-bold mb-2" style={{ color: item.color }}>{item.label}</div>
                    <p className="text-[12px] leading-relaxed" style={{ color: TEXT_GRAY }}>{item.desc}</p>
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
                note="CAJAIDT follows the Committee on Publication Ethics (COPE) guidelines for handling ethical concerns."
              />
            </div>
          </div>
        </div>
      </div>

      <BottomCTA
        title="Questions about publication ethics?"
        primaryLabel="Peer Review Policy"
        primaryHref="/peer-review-policy"
        secondaryLabel="Contact Editorial Office"
        secondaryHref="mailto:editorial@cajaidt.org"
      />
    </>
  );
}
