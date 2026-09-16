import {
  NAVY, GOLD, LIGHT_GRAY, TEXT_GRAY, BORDER_GRAY, SERIF,
  PageBanner, SectionHeader, NavA, PolicyCardGrid, InfoBox,
} from "./shared";

const STATUS_CARD = [
  { label: "Journal Status", value: "In development" },
  { label: "ISSN", value: "Coming soon" },
  { label: "DOI Registration", value: "Planned" },
  { label: "Open Access Model", value: "Planned" },
  { label: "Peer Review Model", value: "Double-blind peer review" },
  { label: "Publication Frequency", value: "Monthly" },
  { label: "Indexing Status", value: "Not yet indexed" },
];

const STAGES = [
  {
    num: 1,
    title: "Journal Foundation",
    status: "In progress",
    statusColor: "#16A34A",
    statusBg: "#F0FDF4",
    items: [
      "Journal scope and policies",
      "Editorial board formation",
      "Website and submission platform",
      "Author guidelines",
      "Peer-review workflow",
      "Publication ethics policies",
    ],
  },
  {
    num: 2,
    title: "National Recognition Preparation",
    status: "Planned",
    statusColor: "#2563EB",
    statusBg: "#EFF6FF",
    items: [
      "OAK/VAK requirements review",
      "Publication regularity",
      "Editorial quality control",
      "Ethical and technical compliance",
      "Documentation package preparation",
    ],
  },
  {
    num: 3,
    title: "Metadata and DOI Infrastructure",
    status: "Planned",
    statusColor: "#2563EB",
    statusBg: "#EFF6FF",
    items: [
      "Article landing pages",
      "DOI-ready metadata",
      "Crossref membership preparation",
      "ORCID fields",
      "Citation export",
      "Reference linking",
    ],
  },
  {
    num: 4,
    title: "Open Access Directory Preparation",
    status: "Planned",
    statusColor: "#2563EB",
    statusBg: "#EFF6FF",
    items: [
      "DOAJ criteria review",
      "Open access policy",
      "Copyright and licensing clarity",
      "APC transparency",
      "Editorial board transparency",
      "Peer-review process documentation",
    ],
  },
  {
    num: 5,
    title: "International Indexing Readiness",
    status: "Long-term roadmap",
    statusColor: "#7C3AED",
    statusBg: "#F5F3FF",
    items: [
      "Scopus evaluation preparation",
      "Web of Science / ESCI readiness",
      "International authorship",
      "Citation development",
      "Publication consistency",
      "Academic quality improvement",
    ],
  },
];

const PRINCIPLES = [
  "Transparent editorial policies",
  "Ethical peer review",
  "Complete article metadata",
  "Stable publication schedule",
  "International visibility",
  "DOI-ready article pages",
  "Open access availability",
  "Editorial independence",
];

export default function IndexingRoadmap() {
  return (
    <div>
      <PageBanner
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Indexing & Abstracting Roadmap" }]}
        title="Indexing & Abstracting Roadmap"
        subtitle="CAJAIDT is being developed according to transparent scholarly publishing, metadata, peer-review, and indexing-readiness principles."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-14">

            {/* Current Status */}
            <section>
              <SectionHeader eyebrow="Status" title="Current Journal Status" />
              <div className="rounded-xl border overflow-hidden mb-6" style={{ borderColor: BORDER_GRAY }}>
                <div className="px-5 py-3 border-b" style={{ backgroundColor: NAVY, borderColor: BORDER_GRAY }}>
                  <span className="text-xs font-bold text-white tracking-wide uppercase">CAJAIDT — Status Overview</span>
                </div>
                <div className="divide-y" style={{ divideColor: BORDER_GRAY }}>
                  {STATUS_CARD.map((row) => (
                    <div key={row.label} className="flex flex-wrap items-center gap-3 px-5 py-3.5 bg-white">
                      <span className="text-[11px] font-bold uppercase tracking-wider w-44 flex-shrink-0" style={{ color: TEXT_GRAY }}>{row.label}</span>
                      <span className="text-[13px] font-medium" style={{ color: NAVY }}>{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <InfoBox type="warning" title="Important Notice">
                CAJAIDT does not currently claim indexing in any national or international database. Indexing applications will be considered after the journal develops a consistent publication record, transparent editorial policies, and complete article metadata.
              </InfoBox>
            </section>

            {/* Roadmap Timeline */}
            <section>
              <SectionHeader eyebrow="Timeline" title="Indexing Roadmap" />
              <div className="space-y-5">
                {STAGES.map((stage) => (
                  <div
                    key={stage.num}
                    className="rounded-xl border bg-white overflow-hidden"
                    style={{ borderColor: BORDER_GRAY }}
                  >
                    <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: BORDER_GRAY }}>
                      <div className="flex items-center gap-3">
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                          style={{ backgroundColor: NAVY }}
                        >
                          {stage.num}
                        </div>
                        <span className="font-bold text-[14px]" style={{ color: NAVY, fontFamily: SERIF }}>{stage.title}</span>
                      </div>
                      <span
                        className="text-[11px] font-bold px-3 py-1 rounded-full whitespace-nowrap"
                        style={{ color: stage.statusColor, backgroundColor: stage.statusBg }}
                      >
                        {stage.status}
                      </span>
                    </div>
                    <div className="px-5 py-4">
                      <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
                        {stage.items.map((item) => (
                          <li key={item} className="flex items-center gap-2.5 text-[13px]" style={{ color: TEXT_GRAY }}>
                            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: GOLD }} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Indexing Principles */}
            <section>
              <SectionHeader eyebrow="Principles" title="Indexing Readiness Principles" />
              <PolicyCardGrid items={PRINCIPLES} cols={2} />
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-5">
            <div className="rounded-xl border overflow-hidden sticky top-24" style={{ borderColor: BORDER_GRAY }}>
              <div className="px-5 py-4" style={{ backgroundColor: NAVY }}>
                <div className="text-xs font-bold text-white tracking-wide">Quick Links</div>
              </div>
              <ul className="divide-y" style={{ divideColor: BORDER_GRAY }}>
                {[
                  { label: "Author Guidelines", to: "/author-guidelines" },
                  { label: "Submit Manuscript", to: "/portal/login" },
                  { label: "Publication Ethics", to: "/publication-ethics" },
                  { label: "Peer Review Policy", to: "/peer-review-policy" },
                  { label: "Copyright & Fees", to: "/copyright-fees" },
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
              <div className="px-5 py-4 border-t" style={{ borderColor: BORDER_GRAY }}>
                <NavA
                  to="/portal/login"
                  className="block text-center px-4 py-2 text-xs font-semibold text-white rounded transition-opacity hover:opacity-90"
                  style={{ backgroundColor: GOLD }}
                >
                  Submit Manuscript
                </NavA>
              </div>
            </div>

            <div className="rounded-xl p-5" style={{ backgroundColor: LIGHT_GRAY, border: `1px solid ${BORDER_GRAY}` }}>
              <div className="text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: GOLD }}>Transparency Commitment</div>
              <p className="text-[12px] leading-relaxed" style={{ color: TEXT_GRAY }}>
                CAJAIDT publishes its indexing roadmap openly so that authors, readers, and evaluators can make informed decisions about the journal.
              </p>
            </div>
          </aside>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="py-14 px-4 sm:px-6 border-t" style={{ borderColor: BORDER_GRAY }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl md:text-2xl font-bold mb-7" style={{ color: NAVY, fontFamily: SERIF }}>
            Follow the journal development roadmap
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <NavA
              to="/author-guidelines"
              className="px-7 py-2.5 text-sm font-semibold text-white rounded transition-opacity hover:opacity-90"
              style={{ backgroundColor: GOLD }}
            >
              View Author Guidelines
            </NavA>
            <NavA
              to="/portal/login"
              className="px-7 py-2.5 text-sm font-semibold rounded border-2 transition-opacity hover:opacity-70"
              style={{ color: NAVY, borderColor: NAVY }}
            >
              Submit Manuscript
            </NavA>
          </div>
        </div>
      </div>
    </div>
  );
}
