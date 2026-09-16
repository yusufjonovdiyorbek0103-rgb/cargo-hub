import {
  Globe, Eye, BookOpen, FileText, MessageSquare,
  Cpu, BarChart2, CheckCircle,
} from "lucide-react";
import {
  NAVY, GOLD, LIGHT_GRAY, TEXT_GRAY, BORDER_GRAY, SERIF,
  PageBanner, BottomCTA, SectionHeader, ProseSection,
} from "./shared";

// ─── Publication model data ───────────────────────────────────────────────────
const PUB_MODEL = [
  { label: "Publishing Model", value: "Online Open Access" },
  { label: "Review Model", value: "Double-Blind Peer Review" },
  { label: "Publication Frequency", value: "Monthly" },
  { label: "Article Language", value: "English, Uzbek, and Russian" },
  { label: "Required Metadata", value: "English title, abstract, and keywords for all articles" },
  { label: "Article Identifiers", value: "DOI-ready article landing pages" },
  { label: "Editorial Focus", value: "AI, data science, intelligent systems, and digital transformation" },
];

const ARTICLE_TYPES = [
  { icon: <BarChart2 size={16} />, label: "Original Research Article" },
  { icon: <BookOpen size={16} />, label: "Review Article" },
  { icon: <FileText size={16} />, label: "Systematic Literature Review" },
  { icon: <Cpu size={16} />, label: "Case Study" },
  { icon: <MessageSquare size={16} />, label: "Technical Note" },
  { icon: <Globe size={16} />, label: "Short Communication" },
  { icon: <Eye size={16} />, label: "Perspective / Policy Paper" },
];

// ─── Sidebar card ─────────────────────────────────────────────────────────────
function JournalInfoSidebar() {
  const rows = [
    { label: "ISSN", value: "Coming Soon" },
    { label: "Frequency", value: "Monthly" },
    { label: "Access", value: "Open Access" },
    { label: "Review", value: "Double-Blind Peer Review" },
    { label: "Publisher", value: "To be confirmed" },
    { label: "Contact", value: "editorial@cajaidt.org", isEmail: true },
  ];
  return (
    <aside className="space-y-5">
      {/* Quick info card */}
      <div className="rounded-xl border overflow-hidden" style={{ borderColor: BORDER_GRAY }}>
        <div className="px-5 py-4 border-b" style={{ backgroundColor: NAVY, borderColor: "transparent" }}>
          <h3 className="text-sm font-bold text-white tracking-wide">Journal Information</h3>
        </div>
        <div className="divide-y" style={{ divideColor: BORDER_GRAY }}>
          {rows.map((row) => (
            <div key={row.label} className="px-5 py-3 flex flex-col gap-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: TEXT_GRAY }}>
                {row.label}
              </span>
              {row.isEmail ? (
                <a
                  href={`mailto:${row.value}`}
                  className="text-xs font-medium transition-colors hover:underline"
                  style={{ color: GOLD }}
                >
                  {row.value}
                </a>
              ) : (
                <span className="text-xs font-semibold" style={{ color: NAVY }}>
                  {row.value}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Submit CTA card */}
      <div
        className="rounded-xl p-5 text-center"
        style={{ backgroundColor: LIGHT_GRAY, border: `1px solid ${BORDER_GRAY}` }}
      >
        <div className="text-sm font-bold mb-2" style={{ color: NAVY, fontFamily: SERIF }}>
          Ready to submit?
        </div>
        <p className="text-[11px] leading-relaxed mb-4" style={{ color: TEXT_GRAY }}>
          CAJAIDT welcomes original research and scholarly contributions on AI and digital transformation.
        </p>
        <a
          href="/#for-authors"
          className="block text-center px-4 py-2 text-xs font-semibold text-white rounded transition-opacity hover:opacity-90"
          style={{ backgroundColor: GOLD }}
        >
          Submit Manuscript
        </a>
      </div>

      {/* Open access badge */}
      <div
        className="rounded-xl p-5 flex items-start gap-3"
        style={{ border: `1px solid ${BORDER_GRAY}` }}
      >
        <CheckCircle size={18} style={{ color: GOLD, flexShrink: 0, marginTop: 1 }} />
        <div>
          <div className="text-xs font-bold mb-1" style={{ color: NAVY }}>Open Access Journal</div>
          <p className="text-[11px] leading-relaxed" style={{ color: TEXT_GRAY }}>
            All articles are freely available online to readers worldwide without subscription fees.
          </p>
        </div>
      </div>
    </aside>
  );
}

// ─── Main content sections ────────────────────────────────────────────────────
function JournalOverview() {
  return (
    <div className="mb-12">
      <SectionHeader eyebrow="Overview" title="Journal Overview" />
      <div className="space-y-4">
        <ProseSection>
          The Central Asian Journal of Artificial Intelligence and Digital Transformation (CAJAIDT) is an international, open-access, peer-reviewed scholarly journal dedicated to advancing research in artificial intelligence, data science, intelligent systems, and digital transformation. The journal provides a platform for researchers, practitioners, and policy-oriented scholars to publish original research and applied studies that contribute to the development of intelligent digital systems and evidence-based innovation.
        </ProseSection>
        <ProseSection>
          CAJAIDT aims to connect Central Asian research communities with global academic standards by promoting high-quality, transparent, and ethically reviewed scholarly publishing.
        </ProseSection>
      </div>
    </div>
  );
}

function MissionSection() {
  return (
    <div className="mb-12">
      <SectionHeader eyebrow="Mission" title="Mission" />
      <ProseSection>
        The mission of CAJAIDT is to support rigorous academic research and applied innovation in artificial intelligence and digital transformation. The journal seeks to encourage interdisciplinary dialogue between computer science, information systems, business, education, public administration, economics, engineering, and emerging technology studies.
      </ProseSection>
    </div>
  );
}

function PublicationModelSection() {
  return (
    <div className="mb-12">
      <SectionHeader eyebrow="Publication Details" title="Publication Model" />
      <div className="grid sm:grid-cols-2 gap-3">
        {PUB_MODEL.map((item) => (
          <div
            key={item.label}
            className="rounded-lg p-4"
            style={{ backgroundColor: LIGHT_GRAY, border: `1px solid ${BORDER_GRAY}` }}
          >
            <div
              className="text-[10px] font-bold uppercase tracking-wider mb-1"
              style={{ color: GOLD }}
            >
              {item.label}
            </div>
            <div className="text-sm font-semibold" style={{ color: NAVY }}>
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ArticleTypesSection() {
  return (
    <div className="mb-12">
      <SectionHeader eyebrow="Submissions" title="Article Types" />
      <div className="flex flex-wrap gap-2">
        {ARTICLE_TYPES.map((type) => (
          <span
            key={type.label}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border"
            style={{ color: NAVY, borderColor: BORDER_GRAY, backgroundColor: "white" }}
          >
            <span style={{ color: GOLD }}>{type.icon}</span>
            {type.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function LanguagePolicySection() {
  return (
    <div className="mb-12">
      <SectionHeader eyebrow="Language" title="Language Policy" />
      <ProseSection>
        CAJAIDT accepts manuscripts in English, Uzbek, and Russian. To support international discoverability and indexing readiness, all accepted manuscripts must include an English title, English abstract, and English keywords. References should be formatted according to the journal's citation style and prepared for international metadata visibility.
      </ProseSection>
    </div>
  );
}

function OpenAccessSection() {
  return (
    <div className="mb-4">
      <SectionHeader eyebrow="Accessibility" title="Open Access Statement" />
      <div
        className="rounded-xl p-6 border-l-4"
        style={{ backgroundColor: LIGHT_GRAY, borderLeftColor: GOLD, border: `1px solid ${BORDER_GRAY}`, borderLeft: `4px solid ${GOLD}` }}
      >
        <p className="text-[15px] leading-relaxed" style={{ color: TEXT_GRAY }}>
          CAJAIDT is committed to open scholarly communication. All published articles are made available online to readers without subscription barriers. Authors retain appropriate rights under the journal's copyright and licensing policy, while readers are allowed to access, read, download, and cite published works according to the applicable license terms.
        </p>
      </div>
    </div>
  );
}

// ─── Page export ──────────────────────────────────────────────────────────────
export default function About() {
  return (
    <>
      <PageBanner
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "About the Journal" }]}
        title="About the Journal"
        subtitle="Learn about the mission, editorial direction, publication model, and academic positioning of CAJAIDT."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2">
            <JournalOverview />
            <div className="border-t my-10" style={{ borderColor: BORDER_GRAY }} />
            <MissionSection />
            <div className="border-t my-10" style={{ borderColor: BORDER_GRAY }} />
            <PublicationModelSection />
            <div className="border-t my-10" style={{ borderColor: BORDER_GRAY }} />
            <ArticleTypesSection />
            <div className="border-t my-10" style={{ borderColor: BORDER_GRAY }} />
            <LanguagePolicySection />
            <div className="border-t my-10" style={{ borderColor: BORDER_GRAY }} />
            <OpenAccessSection />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <JournalInfoSidebar />
            </div>
          </div>
        </div>
      </div>

      <BottomCTA
        title="Ready to submit your manuscript?"
        primaryLabel="Submit Manuscript"
        primaryHref="/#for-authors"
        secondaryLabel="Author Guidelines"
        secondaryHref="/#for-authors"
      />
    </>
  );
}
