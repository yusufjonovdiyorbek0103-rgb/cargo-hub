import { CheckCircle, Info } from "lucide-react";
import {
  NAVY, GOLD, LIGHT_GRAY, TEXT_GRAY, BORDER_GRAY, SERIF,
  PageBanner, BottomCTA, SectionHeader, ProseSection,
  QuickLinksSidebar, InfoBox,
} from "./shared";

const AUTHOR_RIGHTS = [
  "Authors may share the article link on personal and institutional websites.",
  "Authors may cite and promote their published work freely.",
  "Authors may deposit the article according to the journal's archiving policy.",
  "Authors remain responsible for the accuracy and integrity of their work.",
];

const SIDEBAR_LINKS = [
  { label: "Author Guidelines", to: "/author-guidelines" },
  { label: "Submit Manuscript", to: "/submit" },
  { label: "Publication Ethics", to: "/publication-ethics" },
  { label: "Peer Review Policy", to: "/peer-review-policy" },
];

export default function CopyrightFees() {
  return (
    <>
      <PageBanner
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Policies" }, { label: "Copyright, License & Fees" }]}
        title="Copyright, License, and Publication Fees"
        subtitle="Information about author rights, open access licensing, and publication fee transparency."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-14">

            {/* Copyright */}
            <section>
              <SectionHeader eyebrow="Rights" title="Copyright" />
              <ProseSection>
                CAJAIDT supports transparent copyright and licensing practices. Authors retain appropriate rights to their work according to the journal's copyright and license policy. The final published version is made available through the journal website under the applicable open-access license. Copyright details will be clearly stated in the author agreement at the time of acceptance.
              </ProseSection>
            </section>

            <div className="border-t" style={{ borderColor: BORDER_GRAY }} />

            {/* License */}
            <section>
              <SectionHeader eyebrow="Open Access" title="Open Access License" />
              <ProseSection>
                The journal intends to use an open-access license that allows readers to access, read, download, share, and cite published articles according to the terms of the selected license. The final license type will be clearly displayed on each published article page.
              </ProseSection>
              <div
                className="mt-6 rounded-xl border p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5"
                style={{ borderColor: BORDER_GRAY, borderTop: `3px solid ${GOLD}` }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-lg font-bold text-white"
                  style={{ backgroundColor: NAVY }}
                >
                  CC
                </div>
                <div>
                  <div className="text-sm font-bold mb-1" style={{ color: NAVY }}>
                    Recommended License: Creative Commons Attribution 4.0 International
                  </div>
                  <div className="text-[13px] mb-1" style={{ color: TEXT_GRAY }}>
                    CC BY 4.0 — Planned
                  </div>
                  <p className="text-[12px] leading-relaxed" style={{ color: TEXT_GRAY }}>
                    Under CC BY 4.0, readers may share and adapt the work for any purpose, provided appropriate credit is given. The final license will be confirmed and displayed on all published article pages.
                  </p>
                </div>
              </div>
            </section>

            <div className="border-t" style={{ borderColor: BORDER_GRAY }} />

            {/* Publication Fees */}
            <section>
              <SectionHeader eyebrow="Transparency" title="Publication Fees" />
              <div
                className="rounded-xl border overflow-hidden"
                style={{ borderColor: BORDER_GRAY }}
              >
                <div className="px-6 py-4" style={{ backgroundColor: NAVY }}>
                  <h3 className="text-sm font-bold text-white">Fee Schedule</h3>
                </div>
                <div className="divide-y" style={{ divideColor: BORDER_GRAY }}>
                  {[
                    { label: "Article Processing Charge (APC)", value: "To be announced", note: "Will be clearly stated before any charges apply" },
                    { label: "Submission Fee", value: "No submission fee", note: "Submission is free of charge" },
                    { label: "Waiver Policy", value: "To be announced", note: "Waiver and discount information will be provided" },
                    { label: "Payment Timing", value: "Only after acceptance", note: "No payment requested during review" },
                  ].map((row, i) => (
                    <div key={i} className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="text-[13px] font-semibold" style={{ color: NAVY }}>{row.label}</div>
                        <div className="text-[11px]" style={{ color: TEXT_GRAY }}>{row.note}</div>
                      </div>
                      <span
                        className="text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap self-start sm:self-center"
                        style={{
                          color: row.value === "No submission fee" ? "#16A34A" : GOLD,
                          backgroundColor: row.value === "No submission fee" ? "#F0FDF4" : "rgba(195,154,59,0.09)",
                        }}
                      >
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5">
                <InfoBox type="rule" title="Fee Transparency Commitment">
                  No payment is requested during submission or peer review. Any applicable publication fee is communicated only after acceptance and does not influence editorial decisions. Fee decisions are based solely on scholarly merit, ethical compliance, and journal scope relevance.
                </InfoBox>
              </div>
            </section>

            <div className="border-t" style={{ borderColor: BORDER_GRAY }} />

            {/* Fee Transparency */}
            <section>
              <SectionHeader eyebrow="Policy" title="Fee Transparency" />
              <ProseSection>
                Publication fees, if introduced, will be clearly stated on the journal website. Editorial decisions are based only on scholarly merit, ethical compliance, methodological quality, and relevance to the journal scope. No author should be disadvantaged due to inability to pay publication fees; the waiver policy will be announced with fee information.
              </ProseSection>
            </section>

            <div className="border-t" style={{ borderColor: BORDER_GRAY }} />

            {/* Author Rights */}
            <section>
              <SectionHeader eyebrow="Author Rights" title="What Authors May Do" />
              <div className="space-y-2.5">
                {AUTHOR_RIGHTS.map((right, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-lg px-4 py-3"
                    style={{ border: `1px solid ${BORDER_GRAY}`, backgroundColor: "white" }}
                  >
                    <CheckCircle size={15} style={{ color: GOLD, flexShrink: 0, marginTop: 1 }} />
                    <span className="text-[13px] leading-relaxed" style={{ color: TEXT_GRAY }}>{right}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <QuickLinksSidebar
                title="Author Resources"
                links={SIDEBAR_LINKS}
                primaryAction={{ label: "Submit Manuscript", href: "/submit" }}
                note={
                  <span>
                    For questions about fees or licensing, contact{" "}
                    <a href="mailto:editorial@cajaidt.org" className="underline hover:no-underline" style={{ color: GOLD }}>
                      editorial@cajaidt.org
                    </a>
                  </span>
                }
              />
            </div>
          </div>
        </div>
      </div>

      <BottomCTA
        title="Questions about copyright or publication fees?"
        primaryLabel="Read Author Guidelines"
        primaryHref="/author-guidelines"
        secondaryLabel="Contact Editorial Office"
        secondaryHref="mailto:editorial@cajaidt.org"
      />
    </>
  );
}
