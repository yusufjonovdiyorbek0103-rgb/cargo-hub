import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { FileText, ExternalLink, Copy, Share2, Download, ChevronDown, ChevronUp } from "lucide-react";
import {
  NAVY, GOLD, LIGHT_GRAY, TEXT_GRAY, BORDER_GRAY, SERIF,
  PageBanner,
} from "./shared";
import { ArticleTypeBadge } from "./ArticleCard";
import { fetchArticle } from "./api";

const SAMPLE_ARTICLE = {
  type: "Research Article",
  title: "Responsible Artificial Intelligence for Digital Transformation in Emerging Economies",
  authors: ["Author Name 1", "Author Name 2", "Author Name 3"],
  affiliations: [
    "1. Department of Artificial Intelligence, University / Institution, Country",
    "2. School of Digital Transformation, University / Institution, Country",
  ],
  corresponding: "corresponding.author@example.com",
  doi: "To be assigned",
  license: "Planned open-access license",
  received: "To be added",
  revised: "To be added",
  accepted: "To be added",
  published: "To be added",
  volume: 1, issue: 1, year: 2027, pages: "1–14",
  abstract: "This sample article page demonstrates the recommended metadata structure for CAJAIDT publications. Each article page should include complete bibliographic information, abstract, keywords, author affiliations, DOI, publication dates, license details, funding statement, conflict of interest statement, data availability statement, AI use disclosure, references, and citation tools. The layout is designed to support readability, indexing readiness, and international scholarly publishing standards.",
  keywords: ["Responsible AI", "Digital Transformation", "Emerging Economies", "AI Governance", "Data-Driven Innovation"],
};

const REFERENCES = [
  "Author Surname, I., & Co-Author, J. (2023). Frameworks for responsible AI governance in public institutions. Journal of AI Policy and Governance, 5(2), 112–134. DOI: To be added.",
  "Another Surname, K. (2022). Digital transformation in emerging economies: Challenges and opportunities. International Journal of Digital Innovation, 3(1), 45–67. DOI: To be added.",
  "Surname, L., Surname, M., & Surname, N. (2021). Human-centered approaches to AI deployment in developing contexts. AI & Society, 36(4), 899–915. DOI: To be added.",
  "Researcher, O. (2024). Data governance models for national digital transformation strategies. Data Policy Journal, 6(3), 78–99. DOI: To be added.",
  "Scholar, P., & Scholar, Q. (2023). Ethical implications of AI adoption in e-government services. Government Information Quarterly, 40(2), 101–118. DOI: To be added.",
  "Investigator, R. (2022). Measuring digital readiness in transitional economies. Journal of Information Technology for Development, 28(1), 15–38. DOI: To be added.",
];

const ARTICLE_SECTIONS = [
  {
    id: "abstract",
    title: "Abstract",
    content: ARTICLE.abstract,
  },
  {
    id: "introduction",
    title: "1. Introduction",
    content: "Artificial intelligence and digital transformation have emerged as central priorities for governments, institutions, and organisations across the global economy. In emerging economies, the deployment of AI technologies presents both significant opportunities and distinctive challenges related to infrastructure readiness, regulatory capacity, institutional capabilities, and sociotechnical contexts. This study addresses the intersection of responsible AI principles and digital transformation strategies in emerging economy contexts, with particular attention to governance frameworks and implementation pathways.\n\nThe growing body of literature on AI governance recognises the need for context-specific approaches that reflect the institutional, economic, and cultural particularities of different environments. However, relatively limited attention has been paid to the specific conditions of Central Asian and comparable emerging economies. This study aims to contribute to this gap by synthesising existing frameworks and applying them to a structured analysis of digital transformation challenges in these contexts.",
  },
  {
    id: "methodology",
    title: "2. Methodology",
    content: "This study employs a mixed-methods research design combining systematic literature review, framework analysis, and comparative case analysis. The literature search was conducted across major academic databases using predefined search strings covering responsible AI, digital transformation, emerging economies, and AI governance. Inclusion criteria required peer-reviewed publications in English, Uzbek, or Russian, published between 2018 and 2024.\n\nA thematic coding framework was developed and applied iteratively to the selected literature. The resulting themes were subsequently used to structure a comparative analysis of three representative country contexts. All analytical procedures were conducted by multiple researchers to support inter-coder reliability and interpretive validity.",
  },
  {
    id: "results",
    title: "3. Results and Discussion",
    content: "The analysis identifies four primary dimensions along which responsible AI implementation in digital transformation contexts can be assessed: institutional readiness, regulatory capacity, technical infrastructure, and citizen engagement. Findings indicate that while technical infrastructure investment has increased substantially across study contexts, regulatory and institutional dimensions lag significantly behind.\n\nFurthermore, the analysis reveals a consistent pattern of governance fragmentation, in which AI-related policy responsibility is distributed across multiple ministries and agencies without clear coordination mechanisms. This finding aligns with prior scholarship on digital governance challenges in transitional and emerging economy contexts. The discussion situates these findings within broader debates on AI readiness indices and proposes a refined multi-dimensional framework for assessing responsible AI deployment readiness.",
  },
  {
    id: "conclusion",
    title: "4. Conclusion",
    content: "This study contributes to the understanding of responsible AI governance in emerging economy contexts by synthesising existing frameworks and applying them to a comparative analysis. The findings underscore the importance of integrated, context-sensitive governance strategies that address institutional, regulatory, technical, and social dimensions simultaneously.\n\nFuture research should examine longitudinal implementation trajectories and engage directly with practitioners and policymakers in target countries. Limitations of this study include reliance on published literature and the exclusion of grey literature and policy documents from certain jurisdictions.",
  },
  {
    id: "funding",
    title: "Funding Statement",
    content: "This research received no specific grant from any funding agency in the public, commercial, or not-for-profit sectors. [Placeholder — authors should declare funding sources or state that no funding was received.]",
  },
  {
    id: "coi",
    title: "Conflict of Interest Statement",
    content: "The authors declare no conflict of interest. [Placeholder — authors must declare any actual or potential conflicts of interest, or state that none exist.]",
  },
  {
    id: "data",
    title: "Data Availability Statement",
    content: "The data supporting the findings of this study are available upon reasonable request to the corresponding author. [Placeholder — authors should specify whether data are openly available, available on request, or restricted, and provide repository links where applicable.]",
  },
  {
    id: "ai",
    title: "AI Use Disclosure",
    content: "No AI tools were used in the preparation of this manuscript. [Placeholder — if AI tools were used, authors must disclose the tool name, purpose, and scope of use in accordance with the journal's AI Use Policy.]",
  },
  {
    id: "contributions",
    title: "Author Contributions",
    content: "[Placeholder] Author Name 1: Conceptualisation, methodology, writing – original draft. Author Name 2: Data curation, formal analysis, writing – review and editing. Author Name 3: Supervision, validation, writing – review and editing.",
  },
];

function ArticleSection({ section }: { section: typeof ARTICLE_SECTIONS[0] }) {
  return (
    <div id={section.id} className="scroll-mt-28">
      <h2
        className="text-[17px] font-bold mb-4 pb-3 border-b"
        style={{ color: NAVY, fontFamily: SERIF, borderColor: BORDER_GRAY }}
      >
        {section.title}
      </h2>
      {section.content.split("\n\n").map((para, i) => (
        <p key={i} className="text-[14px] leading-relaxed mb-4" style={{ color: "#374151" }}>
          {para}
        </p>
      ))}
    </div>
  );
}

type ArticleData = typeof SAMPLE_ARTICLE;

function mapApiToArticle(api: Record<string, unknown>): ArticleData {
  const authors = Array.isArray(api.authors)
    ? (api.authors as { full_name: string; affiliation?: string }[])
    : [];
  return {
    type: String(api.article_type || "Research Article"),
    title: String(api.title || "Untitled"),
    authors: authors.map(a => a.full_name),
    affiliations: authors.map((a, i) => `${i + 1}. ${a.affiliation || "Affiliation not provided"}`),
    corresponding: "See author details",
    doi: api.doi ? String(api.doi) : "To be assigned",
    license: "Planned open-access license",
    received: api.received_at ? new Date(api.received_at as string).toLocaleDateString() : "—",
    revised: "—",
    accepted: api.accepted_at ? new Date(api.accepted_at as string).toLocaleDateString() : "—",
    published: api.published_at ? new Date(api.published_at as string).toLocaleDateString() : "—",
    volume: Number(api.volume) || 1,
    issue: Number(api.issue_number) || 1,
    year: api.published_at ? new Date(api.published_at as string).getFullYear() : 2027,
    pages: api.page_start && api.page_end ? `${api.page_start}–${api.page_end}` : "—",
    abstract: String(api.abstract || ""),
    keywords: Array.isArray(api.keywords) ? api.keywords as string[] : [],
  };
}

export default function ArticleDetail() {
  const { slug } = useParams();
  const [article, setArticle] = useState<ArticleData>(SAMPLE_ARTICLE);
  const [citeCopied, setCiteCopied] = useState(false);
  const [loading, setLoading] = useState(!!slug);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetchArticle(slug)
      .then((data) => {
        setArticle(mapApiToArticle(data as Record<string, unknown>));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  const ARTICLE = article;

  const citation = `${ARTICLE.authors.join(", ")}. ${ARTICLE.year}. ${ARTICLE.title}. Central Asian Journal of Artificial Intelligence and Digital Transformation, ${ARTICLE.volume}(${ARTICLE.issue}), ${ARTICLE.pages}. DOI: ${ARTICLE.doi}.`;

  const handleCopyCitation = () => {
    navigator.clipboard?.writeText(citation).catch(() => {});
    setCiteCopied(true);
    setTimeout(() => setCiteCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-sm" style={{ color: TEXT_GRAY }}>Loading article...</div>
      </div>
    );
  }

  return (
    <>
      <PageBanner
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Current Issue", to: "/current-issue" },
          { label: "Article" },
        ]}
        title="Article"
        subtitle="Full article page — sample metadata layout demonstrating CAJAIDT's indexing-ready article structure."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid lg:grid-cols-3 gap-10">

          {/* ── Main content ─────────────────────────────────────────────── */}
          <div className="lg:col-span-2">

            {/* Top metadata block */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2 mb-5">
                <ArticleTypeBadge type={ARTICLE.type} />
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded text-white" style={{ backgroundColor: GOLD }}>
                  Open Access
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded" style={{ color: TEXT_GRAY, backgroundColor: LIGHT_GRAY }}>
                  Sample Layout
                </span>
              </div>

              <h1
                className="text-2xl md:text-3xl font-bold leading-snug mb-5"
                style={{ color: NAVY, fontFamily: SERIF }}
              >
                {ARTICLE.title}
              </h1>

              {/* Authors */}
              <p className="text-sm font-medium mb-3" style={{ color: NAVY }}>
                {ARTICLE.authors.join(", ")}
              </p>

              {/* Affiliations */}
              <div className="space-y-1 mb-4">
                {ARTICLE.affiliations.map((aff, i) => (
                  <p key={i} className="text-[12px]" style={{ color: TEXT_GRAY }}>{aff}</p>
                ))}
              </div>

              {/* Corresponding author */}
              <p className="text-[12px] mb-4" style={{ color: TEXT_GRAY }}>
                <span className="font-semibold" style={{ color: NAVY }}>Corresponding author: </span>
                <a href={`mailto:${ARTICLE.corresponding}`} className="hover:underline" style={{ color: GOLD }}>
                  {ARTICLE.corresponding}
                </a>
              </p>

              {/* DOI + dates row */}
              <div
                className="flex flex-wrap gap-4 text-[11px] py-3 border-y"
                style={{ borderColor: BORDER_GRAY, color: TEXT_GRAY }}
              >
                <span><span className="font-semibold">DOI:</span> {ARTICLE.doi}</span>
                <span><span className="font-semibold">Received:</span> {ARTICLE.received}</span>
                <span><span className="font-semibold">Accepted:</span> {ARTICLE.accepted}</span>
                <span><span className="font-semibold">Published:</span> {ARTICLE.published}</span>
                <span><span className="font-semibold">License:</span> {ARTICLE.license}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-2 mb-10 pb-8 border-b" style={{ borderColor: BORDER_GRAY }}>
              <button
                className="flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded text-white transition-opacity hover:opacity-80"
                style={{ backgroundColor: NAVY }}
              >
                <FileText size={14} /> Download PDF
              </button>
              <button
                className="flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded border transition-opacity hover:opacity-70 bg-white"
                style={{ color: NAVY, borderColor: BORDER_GRAY }}
              >
                <ExternalLink size={14} /> View HTML
              </button>
              <button
                onClick={handleCopyCitation}
                className="flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded border transition-opacity hover:opacity-70 bg-white"
                style={{ color: NAVY, borderColor: BORDER_GRAY }}
              >
                <Copy size={14} /> {citeCopied ? "Copied!" : "Cite Article"}
              </button>
              <button
                className="flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded border transition-opacity hover:opacity-70 bg-white"
                style={{ color: NAVY, borderColor: BORDER_GRAY }}
              >
                <Download size={14} /> Download Citation
              </button>
              <button
                className="flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded border transition-opacity hover:opacity-70 bg-white"
                style={{ color: NAVY, borderColor: BORDER_GRAY }}
              >
                <Share2 size={14} /> Share
              </button>
            </div>

            {/* Keywords (before sections) */}
            <div className="mb-8">
              <div className="text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: GOLD }}>Keywords</div>
              <div className="flex flex-wrap gap-2">
                {ARTICLE.keywords.map(kw => (
                  <span
                    key={kw}
                    className="text-[12px] px-3 py-1 rounded-full border"
                    style={{ color: NAVY, borderColor: BORDER_GRAY, backgroundColor: LIGHT_GRAY }}
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Article sections */}
            <div className="space-y-10">
              {ARTICLE_SECTIONS.map(section => (
                <ArticleSection key={section.id} section={section} />
              ))}

              {/* References */}
              <div id="references" className="scroll-mt-28">
                <h2
                  className="text-[17px] font-bold mb-4 pb-3 border-b"
                  style={{ color: NAVY, fontFamily: SERIF, borderColor: BORDER_GRAY }}
                >
                  References
                </h2>
                <ol className="space-y-3">
                  {REFERENCES.map((ref, i) => (
                    <li key={i} className="flex gap-3">
                      <span
                        className="text-[11px] font-bold w-5 flex-shrink-0 pt-0.5"
                        style={{ color: GOLD }}
                      >
                        {i + 1}.
                      </span>
                      <p className="text-[13px] leading-relaxed" style={{ color: TEXT_GRAY }}>{ref}</p>
                    </li>
                  ))}
                </ol>
                <p
                  className="text-[11px] mt-4 italic"
                  style={{ color: TEXT_GRAY }}
                >
                  Note: References above are placeholder samples for layout demonstration. Final published article will contain real citations.
                </p>
              </div>
            </div>
          </div>

          {/* ── Sidebar ───────────────────────────────────────────────────── */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-5">

              {/* Article Information */}
              <div className="rounded-xl border overflow-hidden" style={{ borderColor: BORDER_GRAY }}>
                <div className="px-5 py-4" style={{ backgroundColor: NAVY }}>
                  <h3 className="text-sm font-bold text-white">Article Information</h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {[
                    { label: "Article Type", value: ARTICLE.type },
                    { label: "Volume", value: String(ARTICLE.volume) },
                    { label: "Issue", value: String(ARTICLE.issue) },
                    { label: "Year", value: String(ARTICLE.year) },
                    { label: "Pages", value: ARTICLE.pages },
                    { label: "DOI", value: ARTICLE.doi },
                    { label: "License", value: ARTICLE.license },
                    { label: "Received", value: ARTICLE.received },
                    { label: "Accepted", value: ARTICLE.accepted },
                  ].map(row => (
                    <div key={row.label} className="px-5 py-2.5 flex flex-col">
                      <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: GOLD }}>{row.label}</span>
                      <span className="text-[12px] font-semibold" style={{ color: NAVY }}>{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Citation box */}
              <div className="rounded-xl border overflow-hidden" style={{ borderColor: BORDER_GRAY }}>
                <div className="px-5 py-4" style={{ backgroundColor: LIGHT_GRAY }}>
                  <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: NAVY }}>How to Cite</h3>
                </div>
                <div className="px-5 py-4">
                  <p className="text-[12px] leading-relaxed mb-3" style={{ color: TEXT_GRAY }}>
                    {citation}
                  </p>
                  <button
                    onClick={handleCopyCitation}
                    className="flex items-center gap-1.5 text-[11px] font-semibold transition-opacity hover:opacity-70"
                    style={{ color: GOLD }}
                  >
                    <Copy size={12} />
                    {citeCopied ? "Copied!" : "Copy citation"}
                  </button>
                </div>
              </div>

              {/* Metrics */}
              <div className="rounded-xl border overflow-hidden" style={{ borderColor: BORDER_GRAY }}>
                <div className="px-5 py-4" style={{ backgroundColor: LIGHT_GRAY }}>
                  <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: NAVY }}>Article Metrics</h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {[
                    { label: "Views", value: "Coming soon" },
                    { label: "Downloads", value: "Coming soon" },
                    { label: "Citations", value: "Coming soon" },
                  ].map(m => (
                    <div key={m.label} className="px-5 py-3 flex items-center justify-between">
                      <span className="text-[12px]" style={{ color: TEXT_GRAY }}>{m.label}</span>
                      <span className="text-[11px] font-semibold" style={{ color: NAVY }}>{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick nav */}
              <div className="rounded-xl border overflow-hidden" style={{ borderColor: BORDER_GRAY }}>
                <div className="px-5 py-4" style={{ backgroundColor: LIGHT_GRAY }}>
                  <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: NAVY }}>Jump To</h3>
                </div>
                <ul className="divide-y divide-gray-100">
                  {ARTICLE_SECTIONS.concat([{ id: "references", title: "References", content: "" }]).map(s => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="block px-5 py-2.5 text-[12px] hover:bg-gray-50 transition-colors"
                        style={{ color: NAVY }}
                      >
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
