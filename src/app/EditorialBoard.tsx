import { useState, useEffect } from "react";
import { Mail, Globe, Users } from "lucide-react";
import {
  NAVY, GOLD, LIGHT_GRAY, TEXT_GRAY, BORDER_GRAY, SERIF,
  PageBanner, BottomCTA, SectionHeader,
} from "./shared";
import { fetchEditorialBoard } from "./api";

// ─── Types ────────────────────────────────────────────────────────────────────
interface EditorProfile {
  role: string;
  name: string;
  affiliation: string;
  country: string;
  expertise: string;
  orcid: string;
  isLeadership?: boolean;
}

interface AdvisoryMember {
  country: string;
  expertise: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const LEADERSHIP: EditorProfile[] = [
  {
    role: "Editor-in-Chief",
    name: "Prof. Name Surname, PhD",
    affiliation: "University / Research Institution",
    country: "Uzbekistan",
    expertise: "Artificial Intelligence, Data Science, Digital Transformation",
    orcid: "To be added",
    isLeadership: true,
  },
  {
    role: "Managing Editor",
    name: "Dr. Name Surname",
    affiliation: "Editorial Office, CAJAIDT",
    country: "Uzbekistan",
    expertise: "Scholarly Publishing, Editorial Management, Research Communication",
    orcid: "To be added",
    isLeadership: true,
  },
];

const SECTION_EDITORS: EditorProfile[] = [
  { role: "Section Editor", name: "Dr. Name Surname", affiliation: "To be confirmed", country: "To be confirmed", expertise: "Artificial Intelligence and Machine Learning", orcid: "To be added" },
  { role: "Section Editor", name: "Dr. Name Surname", affiliation: "To be confirmed", country: "To be confirmed", expertise: "Data Science and Analytics", orcid: "To be added" },
  { role: "Section Editor", name: "Dr. Name Surname", affiliation: "To be confirmed", country: "To be confirmed", expertise: "NLP and Computer Vision", orcid: "To be added" },
  { role: "Section Editor", name: "Dr. Name Surname", affiliation: "To be confirmed", country: "To be confirmed", expertise: "Digital Transformation and E-Government", orcid: "To be added" },
  { role: "Section Editor", name: "Dr. Name Surname", affiliation: "To be confirmed", country: "To be confirmed", expertise: "Human-Centered AI and HCI", orcid: "To be added" },
  { role: "Section Editor", name: "Dr. Name Surname", affiliation: "To be confirmed", country: "To be confirmed", expertise: "Cybersecurity and Responsible AI", orcid: "To be added" },
  { role: "Section Editor", name: "Dr. Name Surname", affiliation: "To be confirmed", country: "To be confirmed", expertise: "Digital Economy and Business IT", orcid: "To be added" },
  { role: "Section Editor", name: "Dr. Name Surname", affiliation: "To be confirmed", country: "To be confirmed", expertise: "Smart Systems and IoT", orcid: "To be added" },
];

const ADVISORY_BOARD: AdvisoryMember[] = [
  { country: "South Korea", expertise: "AI and Information Systems" },
  { country: "Malaysia", expertise: "Data Science and Digital Innovation" },
  { country: "Turkey", expertise: "Intelligent Systems" },
  { country: "Kazakhstan", expertise: "Digital Transformation" },
  { country: "Germany", expertise: "Responsible AI" },
  { country: "United Kingdom", expertise: "HCI and Digital Society" },
];

// ─── Country flags (emoji) ───────────────────────────────────────────────────
const COUNTRY_FLAGS: Record<string, string> = {
  Uzbekistan: "🇺🇿",
  "South Korea": "🇰🇷",
  Malaysia: "🇲🇾",
  Turkey: "🇹🇷",
  Kazakhstan: "🇰🇿",
  Germany: "🇩🇪",
  "United Kingdom": "🇬🇧",
};

// ─── Editor avatar placeholder ────────────────────────────────────────────────
function EditorAvatar({ size = 56, initials = "N S" }: { size?: number; initials?: string }) {
  return (
    <div
      className="rounded-full flex items-center justify-center font-bold text-white flex-shrink-0"
      style={{
        width: size,
        height: size,
        backgroundColor: NAVY,
        fontSize: size * 0.28,
        letterSpacing: "0.05em",
      }}
    >
      {initials}
    </div>
  );
}

// ─── Leadership card ──────────────────────────────────────────────────────────
function LeadershipCard({ editor }: { editor: EditorProfile }) {
  return (
    <div
      className="rounded-xl border p-6 flex flex-col sm:flex-row gap-5"
      style={{ borderColor: BORDER_GRAY, borderTop: `3px solid ${GOLD}` }}
    >
      <EditorAvatar size={64} />
      <div className="flex-1 min-w-0">
        <div
          className="text-[10px] font-bold uppercase tracking-wider mb-1"
          style={{ color: GOLD }}
        >
          {editor.role}
        </div>
        <h3 className="text-base font-bold mb-0.5" style={{ color: NAVY, fontFamily: SERIF }}>
          {editor.name}
        </h3>
        <p className="text-xs mb-3" style={{ color: TEXT_GRAY }}>
          {editor.affiliation}
        </p>
        <div className="flex flex-wrap gap-3 text-[11px]" style={{ color: TEXT_GRAY }}>
          <span className="flex items-center gap-1">
            <Globe size={11} style={{ color: GOLD }} />
            {editor.country} {COUNTRY_FLAGS[editor.country]}
          </span>
          <span className="flex items-center gap-1">
            <span className="w-1 h-1 rounded-full inline-block" style={{ backgroundColor: BORDER_GRAY }} />
            {editor.expertise}
          </span>
        </div>
        <div
          className="mt-3 pt-3 border-t text-[11px]"
          style={{ borderColor: BORDER_GRAY, color: TEXT_GRAY }}
        >
          ORCID: {editor.orcid}
        </div>
        <div
          className="inline-block mt-2 text-[10px] font-semibold px-2 py-0.5 rounded"
          style={{ backgroundColor: "rgba(195,154,59,0.1)", color: GOLD }}
        >
          Placeholder — to be updated
        </div>
      </div>
    </div>
  );
}

// ─── Section editor card ──────────────────────────────────────────────────────
function SectionEditorCard({ editor }: { editor: EditorProfile }) {
  return (
    <div
      className="rounded-xl border p-5 flex flex-col gap-3 transition-shadow hover:shadow-sm"
      style={{ borderColor: BORDER_GRAY }}
    >
      <div className="flex items-center gap-3">
        <EditorAvatar size={44} />
        <div className="min-w-0">
          <div className="text-xs font-bold truncate" style={{ color: NAVY }}>{editor.name}</div>
          <div className="text-[10px]" style={{ color: TEXT_GRAY }}>{editor.affiliation}</div>
        </div>
      </div>
      <div
        className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded self-start"
        style={{ backgroundColor: "rgba(6,38,74,0.07)", color: NAVY }}
      >
        {editor.expertise}
      </div>
      <div className="flex items-center justify-between text-[10px]" style={{ color: TEXT_GRAY }}>
        <span>{editor.country}</span>
        <span
          className="px-1.5 py-0.5 rounded text-[9px] font-semibold"
          style={{ backgroundColor: "rgba(195,154,59,0.1)", color: GOLD }}
        >
          Placeholder
        </span>
      </div>
    </div>
  );
}

// ─── Advisory board card ──────────────────────────────────────────────────────
function AdvisoryCard({ member, index }: { member: AdvisoryMember; index: number }) {
  return (
    <div
      className="rounded-xl border p-5 flex items-start gap-4 transition-shadow hover:shadow-sm"
      style={{ borderColor: BORDER_GRAY }}
    >
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0"
        style={{ backgroundColor: LIGHT_GRAY }}
      >
        {COUNTRY_FLAGS[member.country] || "🌐"}
      </div>
      <div>
        <div className="text-xs font-bold mb-0.5" style={{ color: NAVY }}>
          Prof. Name Surname
        </div>
        <div className="text-[11px] mb-2" style={{ color: TEXT_GRAY }}>
          {member.country}
        </div>
        <div
          className="text-[11px] font-medium"
          style={{ color: GOLD }}
        >
          {member.expertise}
        </div>
        <div
          className="inline-block mt-2 text-[9px] font-semibold px-1.5 py-0.5 rounded"
          style={{ backgroundColor: "rgba(195,154,59,0.1)", color: GOLD }}
        >
          Placeholder
        </div>
      </div>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function EditorialOfficeSidebar() {
  return (
    <aside className="space-y-5">
      <div className="rounded-xl border overflow-hidden" style={{ borderColor: BORDER_GRAY }}>
        <div className="px-5 py-4" style={{ backgroundColor: NAVY }}>
          <h3 className="text-sm font-bold text-white">Editorial Office</h3>
        </div>
        <div className="px-5 py-5 space-y-4">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: GOLD }}>
              Journal
            </div>
            <p className="text-xs leading-snug font-medium" style={{ color: NAVY }}>
              Central Asian Journal of Artificial Intelligence and Digital Transformation
            </p>
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: GOLD }}>
              Email
            </div>
            <a
              href="mailto:editorial@cajaidt.org"
              className="text-xs font-medium flex items-center gap-1.5 transition-colors hover:underline"
              style={{ color: NAVY }}
            >
              <Mail size={11} style={{ color: GOLD }} />
              editorial@cajaidt.org
            </a>
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: GOLD }}>
              Website
            </div>
            <a
              href="http://www.cajaidt.org"
              className="text-xs font-medium flex items-center gap-1.5 transition-colors hover:underline"
              style={{ color: NAVY }}
            >
              <Globe size={11} style={{ color: GOLD }} />
              www.cajaidt.org
            </a>
          </div>
        </div>
      </div>

      {/* Become a reviewer card */}
      <div
        className="rounded-xl p-5 text-center"
        style={{ backgroundColor: LIGHT_GRAY, border: `1px solid ${BORDER_GRAY}` }}
      >
        <Users size={22} style={{ color: GOLD, margin: "0 auto 10px" }} />
        <div className="text-sm font-bold mb-2" style={{ color: NAVY, fontFamily: SERIF }}>
          Join Our Reviewer Pool
        </div>
        <p className="text-[11px] leading-relaxed mb-4" style={{ color: TEXT_GRAY }}>
          We welcome qualified experts to join the CAJAIDT peer-review community.
        </p>
        <a
          href="mailto:editorial@cajaidt.org"
          className="block text-center px-4 py-2 text-xs font-semibold text-white rounded transition-opacity hover:opacity-90"
          style={{ backgroundColor: GOLD }}
        >
          Become a Reviewer
        </a>
      </div>

      {/* Editorial independence note */}
      <div
        className="rounded-xl p-4 border-l-4"
        style={{ backgroundColor: "#f0f4f9", borderLeft: `4px solid ${NAVY}`, border: `1px solid ${BORDER_GRAY}` }}
      >
        <p className="text-[11px] leading-relaxed" style={{ color: TEXT_GRAY }}>
          All editorial decisions are made on the basis of scholarly merit, originality, and adherence to ethical standards, independent of any commercial, institutional, or personal interests.
        </p>
      </div>
    </aside>
  );
}

interface ApiBoardMember {
  id: number;
  name: string;
  affiliation: string;
  expertise: string[];
  email: string;
  role: string;
}

function mapApiToProfile(m: ApiBoardMember): EditorProfile {
  const roleLabels: Record<string, string> = {
    editor_in_chief: "Editor-in-Chief",
    managing_editor: "Managing Editor",
    associate_editor: "Section Editor",
  };
  return {
    role: roleLabels[m.role] || m.role,
    name: m.name,
    affiliation: m.affiliation || "—",
    country: "—",
    expertise: Array.isArray(m.expertise) ? m.expertise.join(", ") : String(m.expertise || ""),
    orcid: "—",
    isLeadership: m.role === "editor_in_chief" || m.role === "managing_editor",
  };
}

// ─── Page export ──────────────────────────────────────────────────────────────
export default function EditorialBoard() {
  const [leadership, setLeadership] = useState<EditorProfile[]>(LEADERSHIP);
  const [sectionEditors, setSectionEditors] = useState<EditorProfile[]>(SECTION_EDITORS);

  useEffect(() => {
    fetchEditorialBoard()
      .then((data: ApiBoardMember[]) => {
        if (!Array.isArray(data) || data.length === 0) return;
        const leaders = data.filter(m => m.role === "editor_in_chief" || m.role === "managing_editor").map(mapApiToProfile);
        const sections = data.filter(m => m.role === "associate_editor").map(mapApiToProfile);
        if (leaders.length > 0) setLeadership(leaders);
        if (sections.length > 0) setSectionEditors(sections);
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <PageBanner
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Editorial Board" }]}
        title="Editorial Board"
        subtitle="The editorial structure responsible for maintaining the academic quality, integrity, and peer-review standards of CAJAIDT."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-14">

            {/* Editorial Leadership */}
            <section>
              <SectionHeader
                eyebrow="Leadership"
                title="Editorial Leadership"
                subtitle="The Editor-in-Chief and Managing Editor are responsible for the overall academic and operational governance of CAJAIDT."
              />
              <div className="grid gap-5">
                {leadership.map((editor, i) => (
                  <LeadershipCard key={i} editor={editor} />
                ))}
              </div>
            </section>

            <div className="border-t" style={{ borderColor: BORDER_GRAY }} />

            {/* Section Editors */}
            <section>
              <SectionHeader
                eyebrow="Editorial Structure"
                title="Section Editors"
                subtitle="Section editors oversee manuscript review and quality within their designated research domains."
              />
              <div className="grid sm:grid-cols-2 gap-4">
                {sectionEditors.map((editor, i) => (
                  <SectionEditorCard key={i} editor={editor} />
                ))}
              </div>
            </section>

            <div className="border-t" style={{ borderColor: BORDER_GRAY }} />

            {/* International Advisory Board */}
            <section>
              <SectionHeader
                eyebrow="Advisory"
                title="International Advisory Board"
                subtitle="Distinguished scholars from the global AI and digital transformation research community who provide strategic guidance."
              />
              <div className="grid sm:grid-cols-2 gap-4">
                {ADVISORY_BOARD.map((member, i) => (
                  <AdvisoryCard key={i} member={member} index={i} />
                ))}
              </div>
            </section>

            <div className="border-t" style={{ borderColor: BORDER_GRAY }} />

            {/* Editorial Responsibilities */}
            <section>
              <SectionHeader eyebrow="Governance" title="Editorial Responsibilities" />
              <div
                className="rounded-xl p-6"
                style={{ backgroundColor: LIGHT_GRAY, border: `1px solid ${BORDER_GRAY}` }}
              >
                <p className="text-[15px] leading-relaxed" style={{ color: TEXT_GRAY }}>
                  The Editorial Board is responsible for maintaining the academic quality, ethical standards, and editorial independence of the journal. Editors oversee manuscript screening, reviewer selection, peer-review decisions, conflict-of-interest management, and compliance with publication ethics. All editorial decisions are based on scholarly merit, originality, methodological quality, relevance to the journal scope, and adherence to ethical standards.
                </p>
              </div>
            </section>

            <div className="border-t" style={{ borderColor: BORDER_GRAY }} />

            {/* Reviewer Pool */}
            <section>
              <SectionHeader eyebrow="Peer Review" title="Reviewer Pool" />
              <p className="text-[15px] leading-relaxed mb-6" style={{ color: TEXT_GRAY }}>
                CAJAIDT maintains a reviewer pool of scholars and professionals with expertise in artificial intelligence, data science, information systems, digital transformation, cybersecurity, smart systems, and related fields. Reviewers are selected based on subject expertise, publication record, ethical reliability, and absence of conflicts of interest.
              </p>
              <a
                href="mailto:editorial@cajaidt.org"
                className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white rounded transition-opacity hover:opacity-90"
                style={{ backgroundColor: GOLD }}
              >
                <Users size={14} />
                Become a Reviewer
              </a>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <EditorialOfficeSidebar />
            </div>
          </div>
        </div>
      </div>

      <BottomCTA
        title="Interested in joining the reviewer community?"
        primaryLabel="Become a Reviewer"
        primaryHref="/become-reviewer"
        secondaryLabel="Contact Editorial Office"
        secondaryHref="mailto:editorial@cajaidt.org"
      />
    </>
  );
}
