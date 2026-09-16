import { CheckCircle, AlertTriangle } from "lucide-react";
import {
  Cpu, BarChart2, Eye, Layers, Monitor, Shield, Globe, GraduationCap,
  Database, Zap,
} from "lucide-react";
import {
  NAVY, GOLD, LIGHT_GRAY, TEXT_GRAY, BORDER_GRAY, SERIF,
  PageBanner, BottomCTA, SectionHeader, ProseSection,
} from "./shared";

// ─── Core research areas ──────────────────────────────────────────────────────
const RESEARCH_AREAS = [
  {
    icon: <Cpu size={22} />,
    title: "Artificial Intelligence and Machine Learning",
    desc: "Algorithms, models, intelligent agents, decision systems, predictive analytics, and applied AI solutions.",
  },
  {
    icon: <BarChart2 size={22} />,
    title: "Data Science and Big Data Analytics",
    desc: "Data mining, statistical learning, large-scale data analysis, visualization, forecasting, and evidence-based decision-making.",
  },
  {
    icon: <Eye size={22} />,
    title: "Natural Language Processing and Computer Vision",
    desc: "Text analytics, language technologies, speech systems, image recognition, video analysis, and multimodal AI.",
  },
  {
    icon: <Database size={22} />,
    title: "Intelligent Information Systems",
    desc: "Decision support systems, expert systems, recommendation systems, automation platforms, and smart digital services.",
  },
  {
    icon: <Layers size={22} />,
    title: "Digital Transformation",
    desc: "Digitalization in education, business, government, public services, healthcare, logistics, industry, and society.",
  },
  {
    icon: <Monitor size={22} />,
    title: "Human-Centered AI, HCI, and UX Analytics",
    desc: "User experience, human-computer interaction, usability, digital behavior analytics, and responsible human-centered design.",
  },
  {
    icon: <Shield size={22} />,
    title: "Cybersecurity, AI Governance, and Responsible AI",
    desc: "AI ethics, data privacy, algorithmic accountability, cybersecurity, trustworthy AI, policy, and governance.",
  },
  {
    icon: <Globe size={22} />,
    title: "Smart Cities, IoT, and Cyber-Physical Systems",
    desc: "Connected systems, sensor networks, smart infrastructure, urban technologies, and sustainable digital ecosystems.",
  },
  {
    icon: <GraduationCap size={22} />,
    title: "Digital Economy, FinTech, EdTech, and GovTech",
    desc: "Digital platforms, technology-driven business models, e-commerce, financial technologies, educational technologies, and public-sector innovation.",
  },
  {
    icon: <Zap size={22} />,
    title: "Applied AI for Sustainable Development",
    desc: "AI applications in agriculture, energy, environment, healthcare, transportation, climate action, and sustainable development goals.",
  },
];

const OUT_OF_SCOPE = [
  "Are not related to AI, data science, intelligent systems, or digital transformation",
  "Lack a clear research question or academic contribution",
  "Present only general descriptive information without methodology",
  "Contain fabricated data, unsupported claims, or unreliable references",
  "Are promotional, non-scholarly, or purely opinion-based without evidence",
  "Do not follow ethical standards or author guidelines",
];

const PREFERRED_QUALITIES = [
  "Clear research gap and objective",
  "Transparent methodology",
  "Relevant and recent literature",
  "Valid data, experiments, or analytical framework",
  "Clear contribution to theory, practice, policy, or technology",
  "Proper citation and ethical declaration",
  "English metadata for international visibility",
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AimsScope() {
  return (
    <>
      <PageBanner
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Aims & Scope" }]}
        title="Aims & Scope"
        subtitle="Research areas and scholarly priorities of the Central Asian Journal of Artificial Intelligence and Digital Transformation."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 space-y-16">

        {/* Aims */}
        <section>
          <SectionHeader eyebrow="Mission" title="Aims" />
          <ProseSection>
            The aim of CAJAIDT is to publish high-quality scholarly work that advances theoretical, methodological, and applied knowledge in artificial intelligence, data science, intelligent systems, and digital transformation. The journal welcomes interdisciplinary research that demonstrates scientific rigor, practical relevance, methodological transparency, and contribution to the global development of digital innovation.
          </ProseSection>
        </section>

        <div className="border-t" style={{ borderColor: BORDER_GRAY }} />

        {/* Scope */}
        <section>
          <SectionHeader eyebrow="Coverage" title="Scope" />
          <ProseSection>
            The journal covers research related to artificial intelligence and digital transformation across technical, organizational, economic, educational, social, and governance contexts. CAJAIDT is particularly interested in studies that combine strong methodology with real-world relevance and clear academic contribution.
          </ProseSection>
        </section>

        <div className="border-t" style={{ borderColor: BORDER_GRAY }} />

        {/* Core Research Areas */}
        <section>
          <SectionHeader
            eyebrow="Research Coverage"
            title="Core Research Areas"
            subtitle="CAJAIDT welcomes original scholarship across ten interconnected research domains."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {RESEARCH_AREAS.map((area, i) => (
              <div
                key={i}
                className="rounded-xl p-6 transition-shadow hover:shadow-md flex flex-col gap-3"
                style={{
                  border: `1px solid ${BORDER_GRAY}`,
                  borderTop: `3px solid ${i % 3 === 0 ? NAVY : i % 3 === 1 ? GOLD : "#9CA3AF"}`,
                  backgroundColor: "white",
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{
                    backgroundColor: i % 2 === 0 ? "rgba(6,38,74,0.07)" : "rgba(195,154,59,0.09)",
                    color: i % 2 === 0 ? NAVY : GOLD,
                  }}
                >
                  {area.icon}
                </div>
                <div className="text-sm font-bold leading-snug" style={{ color: NAVY, fontFamily: SERIF }}>
                  {area.title}
                </div>
                <p className="text-[12px] leading-relaxed" style={{ color: TEXT_GRAY }}>
                  {area.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="border-t" style={{ borderColor: BORDER_GRAY }} />

        {/* Out of Scope */}
        <section>
          <SectionHeader eyebrow="Editorial Policy" title="Out of Scope" />
          <div
            className="rounded-xl p-6 border-l-4"
            style={{
              backgroundColor: "#fffbf5",
              border: `1px solid #f0e4c8`,
              borderLeft: `4px solid ${GOLD}`,
            }}
          >
            <div className="flex items-start gap-3 mb-4">
              <AlertTriangle size={18} style={{ color: GOLD, flexShrink: 0, marginTop: 2 }} />
              <p className="text-sm font-semibold" style={{ color: NAVY }}>
                CAJAIDT does not normally consider manuscripts that:
              </p>
            </div>
            <ul className="space-y-2.5 ml-7">
              {OUT_OF_SCOPE.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span
                    className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                    style={{ backgroundColor: GOLD }}
                  />
                  <span className="text-[13px] leading-relaxed" style={{ color: TEXT_GRAY }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="border-t" style={{ borderColor: BORDER_GRAY }} />

        {/* Preferred qualities */}
        <section>
          <SectionHeader
            eyebrow="Quality Criteria"
            title="Preferred Manuscript Qualities"
            subtitle="Manuscripts that demonstrate the following qualities are most likely to be considered favourably."
          />
          <div className="grid sm:grid-cols-2 gap-3">
            {PREFERRED_QUALITIES.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-lg px-4 py-3"
                style={{ backgroundColor: LIGHT_GRAY, border: `1px solid ${BORDER_GRAY}` }}
              >
                <CheckCircle size={16} style={{ color: GOLD, flexShrink: 0 }} />
                <span className="text-sm font-medium" style={{ color: NAVY }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <BottomCTA
        title="Does your manuscript fit the journal scope?"
        primaryLabel="Submit Manuscript"
        primaryHref="/#for-authors"
        secondaryLabel="Read Author Guidelines"
        secondaryHref="/#for-authors"
      />
    </>
  );
}
