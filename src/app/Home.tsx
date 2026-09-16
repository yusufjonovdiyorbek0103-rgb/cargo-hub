import {
  FileText, Download, Globe,
  CheckCircle, ArrowRight, Cpu, Eye,
  BarChart2, Database, Layers,
  Monitor, GraduationCap, Hash, Link,
  AlertCircle, ExternalLink, Shield, Search, Award,
} from "lucide-react";
import coverImage from "../imports/image.png";
import { logoMasthead, JournalEmblem, NavA, NAVY, GOLD, LIGHT_GRAY, TEXT_GRAY, BORDER_GRAY, SERIF } from "./shared";

// ─── Hero ─────────────────────────────────────────────────────────────────────
const HERO_BADGES = [
  "Open Access",
  "Double-Blind Peer Review",
  "English Metadata Required",
  "DOI-ready Publishing",
];

function HeroSection() {
  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: LIGHT_GRAY }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <div
            className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase mb-6 px-3 py-1.5 rounded-full border"
            style={{ color: GOLD, borderColor: GOLD, backgroundColor: "rgba(195,154,59,0.07)" }}
          >
            Knowledge · Intelligence · Transformation
          </div>
          <h1
            className="text-[2.1rem] md:text-5xl font-bold leading-tight mb-6"
            style={{ color: NAVY, fontFamily: SERIF, lineHeight: 1.18 }}
          >
            Central Asian Journal of Artificial Intelligence and Digital Transformation
          </h1>
          <p className="text-base md:text-[17px] mb-4 leading-relaxed font-medium" style={{ color: TEXT_GRAY }}>
            An international open-access, peer-reviewed journal on artificial intelligence, data science, intelligent systems, and digital innovation.
          </p>
          <p className="text-sm mb-9 leading-relaxed" style={{ color: TEXT_GRAY }}>
            CAJAIDT publishes original research, reviews, case studies, and technical notes covering AI, machine learning, data science, digital transformation, human-centered AI, cybersecurity, smart systems, and applied digital innovation.
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            <NavA
              to="/portal/login"
              className="px-6 py-2.5 text-sm font-semibold text-white rounded transition-opacity hover:opacity-90"
              style={{ backgroundColor: GOLD }}
            >
              Submit Manuscript
            </NavA>
            <NavA
              to="/current-issue"
              className="px-6 py-2.5 text-sm font-semibold rounded border-2 transition-opacity hover:opacity-70"
              style={{ color: NAVY, borderColor: NAVY }}
            >
              View Current Issue
            </NavA>
            <NavA
              to="/author-guidelines"
              className="px-6 py-2.5 text-sm font-semibold rounded border transition-opacity hover:opacity-70"
              style={{ color: TEXT_GRAY, borderColor: BORDER_GRAY, backgroundColor: "white" }}
            >
              Author Guidelines
            </NavA>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {HERO_BADGES.map((badge) => (
              <span
                key={badge}
                className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-full bg-white border"
                style={{ color: NAVY, borderColor: BORDER_GRAY }}
              >
                <CheckCircle size={11} style={{ color: GOLD }} />
                {badge}
              </span>
            ))}
          </div>
        </div>
        {/* Cover mockup */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative">
            <div
              className="absolute -inset-6 rounded-3xl opacity-15 blur-2xl"
              style={{ background: `radial-gradient(ellipse, ${NAVY}, transparent)` }}
            />
            <div
              className="relative rounded-xl overflow-hidden shadow-2xl max-w-[260px]"
              style={{ transform: "rotate(1.8deg)" }}
            >
              <img src={coverImage} alt="CAJAIDT Volume 1 Issue 1 2027 Cover" className="w-full h-auto block" />
              <div className="px-4 py-2.5 text-center" style={{ backgroundColor: "rgba(255,255,255,0.97)" }}>
                <div
                  className="text-[11px] font-bold tracking-widest uppercase"
                  style={{ color: NAVY }}
                >
                  Volume 1 · Issue 1 · 2027
                </div>
              </div>
            </div>
            <div
              className="absolute -bottom-5 -right-5 w-24 h-24 rounded-full opacity-15"
              style={{ backgroundColor: GOLD }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Metrics strip ────────────────────────────────────────────────────────────
const METRICS = [
  { icon: <BarChart2 size={20} />, label: "Publication Frequency", value: "Monthly" },
  { icon: <Eye size={20} />, label: "Review Model", value: "Double-Blind Peer Review" },
  { icon: <FileText size={20} />, label: "Article Types", value: "Research · Review · Case Study · Technical Note" },
  { icon: <Globe size={20} />, label: "Languages", value: "English, Uzbek, Russian" },
];

function MetricsStrip() {
  return (
    <div className="border-b border-t" style={{ borderColor: BORDER_GRAY }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
          {METRICS.map((m, i) => (
            <div key={i} className="flex items-start gap-3 px-6 py-5">
              <span style={{ color: GOLD, marginTop: 2 }}>{m.icon}</span>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: TEXT_GRAY }}>
                  {m.label}
                </div>
                <div className="text-sm font-semibold" style={{ color: NAVY }}>
                  {m.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── About section ────────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="text-[11px] font-bold tracking-widest uppercase mb-4" style={{ color: GOLD }}>
            About the Journal
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-5" style={{ color: NAVY, fontFamily: SERIF }}>
            About CAJAIDT
          </h2>
          <div className="w-12 h-0.5 mb-8" style={{ backgroundColor: GOLD }} />
          <p className="text-[15px] leading-relaxed mb-5" style={{ color: TEXT_GRAY }}>
            The Central Asian Journal of Artificial Intelligence and Digital Transformation is a scholarly open-access journal dedicated to advancing research in artificial intelligence, data science, intelligent systems, and digital transformation. The journal aims to connect Central Asian research communities with international academic standards and global scientific dialogue.
          </p>
          <p className="text-[15px] leading-relaxed mb-9" style={{ color: TEXT_GRAY }}>
            CAJAIDT is committed to rigorous peer review, open science principles, and supporting researchers from Central Asia and the broader international community in disseminating high-quality, impactful scholarship.
          </p>
          <NavA
            to="/about"
            className="inline-flex items-center gap-2 text-sm font-semibold border-b-2 pb-0.5 transition-all hover:gap-3"
            style={{ color: NAVY, borderColor: GOLD }}
          >
            Read More About the Journal
            <ArrowRight size={15} />
          </NavA>
        </div>
        <div className="flex justify-center">
          <div
            className="rounded-2xl flex items-center justify-center p-10"
            style={{ backgroundColor: LIGHT_GRAY, border: `1px solid ${BORDER_GRAY}` }}
          >
            <img src={logoMasthead} alt="CAJAIDT Official Journal Logo" className="max-w-sm w-full h-auto" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Aims & Scope ─────────────────────────────────────────────────────────────
const AIMS_SCOPE_ITEMS = [
  { icon: <Cpu size={20} />, title: "Artificial Intelligence and Machine Learning" },
  { icon: <BarChart2 size={20} />, title: "Data Science and Big Data Analytics" },
  { icon: <Eye size={20} />, title: "Natural Language Processing and Computer Vision" },
  { icon: <Layers size={20} />, title: "Digital Transformation in Education, Business, Government, and Industry" },
  { icon: <Monitor size={20} />, title: "Human-Centered AI, HCI, and UX Analytics" },
  { icon: <Shield size={20} />, title: "Cybersecurity, AI Governance, and Responsible AI" },
  { icon: <Globe size={20} />, title: "Smart Cities, IoT, and Intelligent Systems" },
  { icon: <GraduationCap size={20} />, title: "Digital Economy, FinTech, EdTech, and GovTech" },
];

function AimsScopeSection() {
  return (
    <section id="aims-scope" className="py-24" style={{ backgroundColor: LIGHT_GRAY }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <div className="text-[11px] font-bold tracking-widest uppercase mb-4" style={{ color: GOLD }}>
            Research Coverage
          </div>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: NAVY, fontFamily: SERIF }}>
            Aims & Scope
          </h2>
          <div className="w-12 h-0.5 mx-auto mt-4 mb-5" style={{ backgroundColor: GOLD }} />
          <p className="text-sm max-w-xl mx-auto leading-relaxed" style={{ color: TEXT_GRAY }}>
            CAJAIDT welcomes submissions across the full breadth of artificial intelligence, data science, and digital innovation.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {AIMS_SCOPE_ITEMS.map((item, i) => (
            <NavA
              key={i}
              to="/aims-scope"
              className="bg-white rounded-lg p-5 transition-shadow hover:shadow-md flex flex-col gap-3"
              style={{
                border: `1px solid ${BORDER_GRAY}`,
                borderLeft: `4px solid ${i % 2 === 0 ? NAVY : GOLD}`,
              }}
            >
              <span style={{ color: i % 2 === 0 ? NAVY : GOLD }}>{item.icon}</span>
              <div className="text-sm font-semibold leading-snug" style={{ color: NAVY }}>
                {item.title}
              </div>
            </NavA>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Current Issue ────────────────────────────────────────────────────────────
const SAMPLE_ARTICLES = [
  {
    type: "Research Article",
    title: "Responsible Artificial Intelligence for Digital Transformation in Emerging Economies",
    authors: "A. Karimov, B. Yusupova, C. Rakhimov",
    abstract:
      "This paper examines frameworks for responsible AI deployment in emerging economies, with emphasis on governance structures, ethical guidelines, and sociotechnical considerations for digital transformation initiatives.",
    doi: "10.12345/cajaidt.2027.001",
  },
  {
    type: "Research Article",
    title: "Machine Learning-Based Decision Support Systems for Smart Public Services",
    authors: "D. Nazarov, E. Sultanova, F. Tashkentov",
    abstract:
      "We propose a machine learning framework for optimizing public service delivery in smart city contexts, demonstrating efficiency improvements across healthcare, transportation, and administrative services.",
    doi: "10.12345/cajaidt.2027.002",
  },
  {
    type: "Review Article",
    title: "Human-Centered AI and UX Analytics in Digital Learning Platforms",
    authors: "G. Mirzaev, H. Umarov, I. Ergasheva",
    abstract:
      "A systematic review synthesizing current research on human-centered AI applied to educational technology, analyzing UX analytics methodologies across 47 peer-reviewed digital learning platform studies.",
    doi: "10.12345/cajaidt.2027.003",
  },
];

function CurrentIssueSection() {
  return (
    <section id="current-issue" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <div className="text-[11px] font-bold tracking-widest uppercase mb-4" style={{ color: GOLD }}>
            Latest Publication
          </div>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: NAVY, fontFamily: SERIF }}>
            Current Issue
          </h2>
          <div className="w-12 h-0.5 mx-auto mt-4" style={{ backgroundColor: GOLD }} />
        </div>
        {/* Issue card */}
        <div
          className="rounded-xl border overflow-hidden mb-10 flex flex-col md:flex-row"
          style={{ borderColor: BORDER_GRAY }}
        >
          <div
            className="md:w-52 flex-shrink-0 flex items-center justify-center p-8"
            style={{ backgroundColor: NAVY }}
          >
            <div className="rounded-lg overflow-hidden shadow-2xl w-28">
              <img src={coverImage} alt="Current Issue Cover" className="w-full h-auto block" />
            </div>
          </div>
          <div className="flex-1 p-7 md:p-10">
            <div className="text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: GOLD }}>
              Volume 1, Issue 1 · January 2027
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-3" style={{ color: NAVY, fontFamily: SERIF }}>
              Central Asian Journal of Artificial Intelligence and Digital Transformation
            </h3>
            <p className="text-sm mb-5 leading-relaxed max-w-2xl" style={{ color: TEXT_GRAY }}>
              The inaugural issue presents groundbreaking scholarship at the intersection of artificial intelligence, data science, and digital transformation from Central Asia and the international research community.
            </p>
            <div className="flex flex-wrap gap-3">
              <NavA
                to="/current-issue"
                className="px-5 py-2.5 text-sm font-semibold text-white rounded transition-opacity hover:opacity-90"
                style={{ backgroundColor: NAVY }}
              >
                View Issue
              </NavA>
              <NavA
                to="/articles-in-press"
                className="px-5 py-2.5 text-sm font-semibold rounded border-2 transition-opacity hover:opacity-70"
                style={{ color: NAVY, borderColor: NAVY }}
              >
                Articles in Press
              </NavA>
            </div>
          </div>
        </div>
        {/* Article cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {SAMPLE_ARTICLES.map((article, i) => (
            <div
              key={i}
              className="border rounded-lg overflow-hidden flex flex-col transition-shadow hover:shadow-md"
              style={{ borderColor: BORDER_GRAY }}
            >
              <div className="px-5 pt-5 pb-4 flex-1">
                <span
                  className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded"
                  style={{ color: GOLD, backgroundColor: "rgba(195,154,59,0.09)" }}
                >
                  {article.type}
                </span>
                <h4
                  className="text-[13px] font-bold leading-snug mt-3 mb-2"
                  style={{ color: NAVY, fontFamily: SERIF }}
                >
                  {article.title}
                </h4>
                <p className="text-[11px] mb-2 font-medium" style={{ color: TEXT_GRAY }}>
                  {article.authors}
                </p>
                <p className="text-[11px] leading-relaxed mb-3" style={{ color: TEXT_GRAY }}>
                  {article.abstract}
                </p>
                <p className="text-[10px] font-mono" style={{ color: TEXT_GRAY, opacity: 0.7 }}>
                  DOI: {article.doi}
                </p>
              </div>
              <div
                className="px-5 py-3 border-t flex gap-2"
                style={{ borderColor: BORDER_GRAY, backgroundColor: LIGHT_GRAY }}
              >
                <button
                  className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded text-white transition-opacity hover:opacity-80"
                  style={{ backgroundColor: NAVY }}
                >
                  <FileText size={11} />
                  PDF
                </button>
                <button
                  className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded border transition-opacity hover:opacity-70"
                  style={{ color: NAVY, borderColor: BORDER_GRAY, backgroundColor: "white" }}
                >
                  <ExternalLink size={11} />
                  HTML
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── For Authors ──────────────────────────────────────────────────────────────
const SUBMISSION_STEPS = [
  { num: 1, title: "Prepare Manuscript", desc: "Format your manuscript per CAJAIDT author guidelines. Ensure full English abstract and metadata." },
  { num: 2, title: "Check Ethics & Plagiarism", desc: "Review ethics policy. Declare AI use, conflicts of interest, funding sources, and data availability." },
  { num: 3, title: "Submit Online", desc: "Upload via the online submission portal. All submissions acknowledged within 48 hours." },
  { num: 4, title: "Double-Blind Peer Review", desc: "Reviewed by at least two independent domain experts under strict double-blind conditions." },
  { num: 5, title: "DOI, Copyediting & Publication", desc: "Accepted manuscripts receive copyediting, DOI assignment, and open-access publication." },
];

function ForAuthorsSection() {
  return (
    <section id="for-authors" className="py-24" style={{ backgroundColor: LIGHT_GRAY }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <div className="text-[11px] font-bold tracking-widest uppercase mb-4" style={{ color: GOLD }}>
            Submission Guide
          </div>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: NAVY, fontFamily: SERIF }}>
            For Authors
          </h2>
          <div className="w-12 h-0.5 mx-auto mt-4 mb-5" style={{ backgroundColor: GOLD }} />
          <p className="text-sm max-w-xl mx-auto leading-relaxed" style={{ color: TEXT_GRAY }}>
            Follow these five steps to submit your manuscript. Our editorial team is committed to a transparent, rigorous, and author-friendly review process.
          </p>
        </div>
        <div className="relative">
          <div
            className="hidden lg:block absolute h-0.5 top-8"
            style={{ backgroundColor: BORDER_GRAY, left: "calc(10% + 24px)", right: "calc(10% + 24px)", zIndex: 0 }}
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 relative z-10">
            {SUBMISSION_STEPS.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold text-white mb-5 shadow"
                  style={{ backgroundColor: i === 2 ? GOLD : NAVY, flexShrink: 0 }}
                >
                  {step.num}
                </div>
                <div className="text-sm font-bold mb-2" style={{ color: NAVY }}>{step.title}</div>
                <p className="text-xs leading-relaxed" style={{ color: TEXT_GRAY }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-14">
          <NavA
            to="/portal/login"
            className="px-6 py-2.5 text-sm font-semibold text-white rounded transition-opacity hover:opacity-90"
            style={{ backgroundColor: GOLD }}
          >
            Submit Manuscript
          </NavA>
          <NavA
            to="/author-guidelines"
            className="px-6 py-2.5 text-sm font-semibold rounded border-2 transition-opacity hover:opacity-70"
            style={{ color: NAVY, borderColor: NAVY }}
          >
            Author Guidelines
          </NavA>
          <NavA
            to="/checklist"
            className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded border transition-opacity hover:opacity-70"
            style={{ color: TEXT_GRAY, borderColor: BORDER_GRAY, backgroundColor: "white" }}
          >
            <Download size={14} />
            Manuscript Checklist
          </NavA>
        </div>
      </div>
    </section>
  );
}

// ─── Editorial Standards ──────────────────────────────────────────────────────
const EDITORIAL_STANDARDS = [
  { icon: <Eye size={18} />, title: "Double-Blind Peer Review", desc: "All manuscripts undergo rigorous double-blind peer review by at least two independent domain experts.", to: "/peer-review-policy" },
  { icon: <Award size={18} />, title: "Publication Ethics", desc: "CAJAIDT adheres to COPE guidelines and international standards for research integrity.", to: "/publication-ethics" },
  { icon: <Cpu size={18} />, title: "AI Use Disclosure", desc: "Authors must disclose any AI tool usage in manuscript preparation per our AI Use Policy.", to: "/ai-use-policy" },
  { icon: <Search size={18} />, title: "Plagiarism Screening", desc: "All manuscripts are screened for originality prior to peer review using industry-standard tools.", to: "/plagiarism-policy" },
  { icon: <AlertCircle size={18} />, title: "Conflict of Interest", desc: "Authors, editors, and reviewers must declare all potential conflicts of interest transparently.", to: "/publication-ethics" },
  { icon: <Database size={18} />, title: "Data Availability", desc: "Authors are encouraged to provide data availability statements and deposit datasets in open repositories.", to: "/publication-ethics" },
  { icon: <Hash size={18} />, title: "ORCID Recommended", desc: "All authors are strongly encouraged to link their ORCID identifier to manuscript submissions.", to: undefined },
  { icon: <Link size={18} />, title: "DOI-ready Article Pages", desc: "All published articles receive a unique Digital Object Identifier (DOI) registered via Crossref.", to: undefined },
];

function EditorialStandardsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <div className="text-[11px] font-bold tracking-widest uppercase mb-4" style={{ color: GOLD }}>
            Quality & Integrity
          </div>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: NAVY, fontFamily: SERIF }}>
            Editorial Standards
          </h2>
          <div className="w-12 h-0.5 mx-auto mt-4" style={{ backgroundColor: GOLD }} />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {EDITORIAL_STANDARDS.map((item, i) => {
            const inner = (
              <>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: "rgba(6,38,74,0.07)", color: NAVY }}>
                  {item.icon}
                </div>
                <div className="text-sm font-semibold mb-2" style={{ color: NAVY }}>{item.title}</div>
                <p className="text-[12px] leading-relaxed" style={{ color: TEXT_GRAY }}>{item.desc}</p>
                {item.to && <span className="text-[10px] font-semibold mt-2 block" style={{ color: GOLD }}>Learn more →</span>}
              </>
            );
            return item.to ? (
              <NavA key={i} to={item.to} className="border rounded-lg p-5 transition-shadow hover:shadow-md flex flex-col" style={{ borderColor: BORDER_GRAY }}>
                {inner}
              </NavA>
            ) : (
              <div key={i} className="border rounded-lg p-5 transition-shadow hover:shadow-sm" style={{ borderColor: BORDER_GRAY }}>
                {inner}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Indexing Roadmap ─────────────────────────────────────────────────────────
const INDEXING_STAGES = [
  { stage: 1, title: "OAK Preparation", status: "In Preparation", statusColor: "#2563EB", desc: "Establishing journal infrastructure, editorial policies, and compliance with open-access archiving standards." },
  { stage: 2, title: "Google Scholar and Crossref DOI", status: "Planned", statusColor: GOLD, desc: "Registering DOIs via Crossref and ensuring automatic indexing in Google Scholar from the first published issue." },
  { stage: 3, title: "DOAJ Application", status: "Roadmap", statusColor: TEXT_GRAY, desc: "Planned submission to the Directory of Open Access Journals following publication of the first full volume." },
  { stage: 4, title: "Scopus Evaluation Preparation", status: "Roadmap", statusColor: TEXT_GRAY, desc: "Building citation quality, editorial board standing, and manuscript standards toward Scopus evaluation readiness." },
  { stage: 5, title: "Web of Science / ESCI Readiness", status: "Roadmap", statusColor: TEXT_GRAY, desc: "Long-term goal of meeting Web of Science Emerging Sources Citation Index (ESCI) standards and eligibility criteria." },
];

function IndexingRoadmapSection() {
  return (
    <section id="indexing" className="py-24" style={{ backgroundColor: LIGHT_GRAY }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <div className="text-[11px] font-bold tracking-widest uppercase mb-4" style={{ color: GOLD }}>
            Discovery & Impact
          </div>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: NAVY, fontFamily: SERIF }}>
            Indexing & Abstracting Roadmap
          </h2>
          <div className="w-12 h-0.5 mx-auto mt-4 mb-5" style={{ backgroundColor: GOLD }} />
          <p className="text-sm leading-relaxed" style={{ color: TEXT_GRAY }}>
            CAJAIDT is actively working toward international indexing. The stages below reflect our development roadmap — not current indexed status.
          </p>
        </div>
        <div className="space-y-0">
          {INDEXING_STAGES.map((stage, i) => (
            <div key={i} className="flex gap-5">
              <div className="flex flex-col items-center">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                  style={{ backgroundColor: stage.status === "In Preparation" ? "#2563EB" : stage.status === "Planned" ? GOLD : "#9CA3AF" }}
                >
                  {stage.stage}
                </div>
                {i < INDEXING_STAGES.length - 1 && (
                  <div className="w-px flex-1 my-2" style={{ backgroundColor: BORDER_GRAY }} />
                )}
              </div>
              <div className="pb-8 flex-1">
                <div className="bg-white rounded-lg border p-5" style={{ borderColor: BORDER_GRAY }}>
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <div className="text-sm font-bold" style={{ color: NAVY }}>{stage.title}</div>
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                      style={{ color: stage.statusColor, backgroundColor: `${stage.statusColor}18` }}
                    >
                      {stage.status}
                    </span>
                  </div>
                  <p className="text-[12px] leading-relaxed" style={{ color: TEXT_GRAY }}>{stage.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <NavA
            to="/indexing-roadmap"
            className="inline-block px-7 py-2.5 text-sm font-semibold rounded border-2 transition-opacity hover:opacity-70"
            style={{ color: NAVY, borderColor: NAVY }}
          >
            View Full Indexing Roadmap →
          </NavA>
        </div>
      </div>
    </section>
  );
}

// ─── Call for Papers ──────────────────────────────────────────────────────────
function CallForPapersSection() {
  return (
    <section className="py-24" style={{ backgroundColor: NAVY }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="flex justify-center mb-6 opacity-25">
          <JournalEmblem size={56} />
        </div>
        <div className="text-[11px] font-bold tracking-widest uppercase mb-4" style={{ color: GOLD }}>
          Open for Submissions
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-5" style={{ fontFamily: SERIF }}>
          Call for Papers
        </h2>
        <div className="w-12 h-0.5 mx-auto mb-7" style={{ backgroundColor: GOLD }} />
        <p className="text-[15px] leading-relaxed mb-10 max-w-2xl mx-auto" style={{ color: "#b8c8da" }}>
          CAJAIDT invites original research articles, review papers, case studies, and technical notes in artificial intelligence, data science, intelligent systems, and digital transformation.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <NavA
            to="/portal/login"
            className="px-7 py-3 text-sm font-semibold text-white rounded transition-opacity hover:opacity-90"
            style={{ backgroundColor: GOLD }}
          >
            Submit Manuscript
          </NavA>
          <NavA
            to="/call-for-papers"
            className="flex items-center gap-2 px-7 py-3 text-sm font-semibold text-white rounded border border-white/25 hover:border-white/50 transition-colors"
          >
            View Call for Papers
          </NavA>
        </div>
      </div>
    </section>
  );
}

// ─── Homepage default export ──────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <HeroSection />
      <MetricsStrip />
      <AboutSection />
      <AimsScopeSection />
      <CurrentIssueSection />
      <ForAuthorsSection />
      <EditorialStandardsSection />
      <IndexingRoadmapSection />
      <CallForPapersSection />
    </>
  );
}
