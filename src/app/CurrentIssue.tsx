import { Download } from "lucide-react";
import coverImage from "../imports/image.png";
import { NAVY, GOLD, LIGHT_GRAY, TEXT_GRAY, BORDER_GRAY, SERIF, PageBanner, NavA } from "./shared";
import { ArticleCard, Article } from "./ArticleCard";

const ISSUE_ARTICLES: Article[] = [
  {
    type: "Research Article",
    title: "Responsible Artificial Intelligence for Digital Transformation in Emerging Economies",
    authors: "Author Name, Author Name",
    abstract: "This sample article card demonstrates how published research articles will appear on the journal website. The final article page will include full metadata, abstract, keywords, DOI, references, and downloadable PDF.",
    keywords: ["Responsible AI", "Digital Transformation", "Emerging Economies", "AI Governance"],
    pages: "1–14",
    doi: "To be assigned",
    status: "Sample layout",
    year: 2027,
  },
  {
    type: "Research Article",
    title: "Machine Learning-Based Decision Support Systems for Smart Public Services",
    authors: "Author Name, Author Name",
    abstract: "This sample article demonstrates how research articles on machine learning and public administration will be presented. Full content, references, and supplementary materials will be available upon publication.",
    keywords: ["Machine Learning", "Decision Support", "Smart Cities", "Public Services"],
    pages: "15–28",
    doi: "To be assigned",
    status: "Sample layout",
    year: 2027,
  },
  {
    type: "Review Article",
    title: "Human-Centered AI and UX Analytics in Digital Learning Platforms",
    authors: "Author Name, Author Name",
    abstract: "A systematic review synthesising research on human-centered AI design principles and user experience analytics across digital learning platforms. Sample layout demonstrating review article presentation.",
    keywords: ["Human-Centered AI", "UX Analytics", "EdTech", "Digital Learning"],
    pages: "29–45",
    doi: "To be assigned",
    status: "Sample layout",
    year: 2027,
  },
  {
    type: "Case Study",
    title: "Digital Transformation Readiness in Higher Education Institutions",
    authors: "Author Name, Author Name",
    abstract: "An evidence-based analysis of digital transformation readiness frameworks applied to higher education institutions in Central Asia. Sample layout for case study article format.",
    keywords: ["Digital Transformation", "Higher Education", "Readiness Assessment"],
    pages: "46–60",
    doi: "To be assigned",
    status: "Sample layout",
    year: 2027,
  },
  {
    type: "Technical Note",
    title: "A Prototype Framework for AI-Enabled Research Data Management",
    authors: "Author Name, Author Name",
    abstract: "Description of a prototype technical framework for managing research data using AI-assisted cataloguing, versioning, and metadata enrichment tools. Sample layout for technical note format.",
    keywords: ["Research Data Management", "AI Framework", "Data Governance"],
    pages: "61–72",
    doi: "To be assigned",
    status: "Sample layout",
    year: 2027,
  },
];

const ISSUE_META = [
  { label: "Volume", value: "1" },
  { label: "Issue", value: "1" },
  { label: "Year", value: "2027" },
  { label: "Publication Month", value: "To be confirmed" },
  { label: "ISSN", value: "Coming soon" },
  { label: "DOI Prefix", value: "Planned" },
  { label: "License", value: "Planned open-access license" },
];

export default function CurrentIssue() {
  return (
    <>
      <PageBanner
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Current Issue" }]}
        title="Current Issue"
        subtitle="The latest published issue of the Central Asian Journal of Artificial Intelligence and Digital Transformation."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">

        {/* Issue header card */}
        <div
          className="rounded-xl border overflow-hidden mb-14 flex flex-col lg:flex-row"
          style={{ borderColor: BORDER_GRAY }}
        >
          {/* Cover */}
          <div
            className="lg:w-64 flex-shrink-0 flex items-center justify-center p-10"
            style={{ backgroundColor: NAVY }}
          >
            <div className="rounded-xl overflow-hidden shadow-2xl w-36">
              <img src={coverImage} alt="CAJAIDT Volume 1 Issue 1 2027" className="w-full h-auto block" />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 p-7 lg:p-10">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded text-white" style={{ backgroundColor: GOLD }}>
                Open Access
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded" style={{ color: TEXT_GRAY, backgroundColor: LIGHT_GRAY }}>
                Publication Status: Planned
              </span>
            </div>

            <h2 className="text-xl md:text-2xl font-bold mb-2" style={{ color: NAVY, fontFamily: SERIF }}>
              Central Asian Journal of Artificial Intelligence and Digital Transformation
            </h2>
            <p className="text-sm mb-6" style={{ color: TEXT_GRAY }}>Volume 1, Issue 1 · 2027 · Monthly Publication</p>

            {/* Meta grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-7">
              {ISSUE_META.map(m => (
                <div key={m.label} className="rounded-lg p-3" style={{ backgroundColor: LIGHT_GRAY, border: `1px solid ${BORDER_GRAY}` }}>
                  <div className="text-[9px] font-bold uppercase tracking-wider mb-0.5" style={{ color: GOLD }}>{m.label}</div>
                  <div className="text-xs font-semibold leading-snug" style={{ color: NAVY }}>{m.value}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                disabled
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded border-2 opacity-40 cursor-not-allowed"
                style={{ color: NAVY, borderColor: NAVY }}
              >
                <Download size={14} />
                Download Full Issue PDF
                <span className="text-[10px] ml-1">(Coming soon)</span>
              </button>
              <NavA
                to="/archives"
                className="px-5 py-2.5 text-sm font-semibold rounded border-2 transition-opacity hover:opacity-70"
                style={{ color: NAVY, borderColor: NAVY }}
              >
                View Archives
              </NavA>
              <NavA
                to="/submit"
                className="px-5 py-2.5 text-sm font-semibold text-white rounded transition-opacity hover:opacity-90"
                style={{ backgroundColor: GOLD }}
              >
                Submit Manuscript
              </NavA>
            </div>
          </div>
        </div>

        {/* Article list */}
        <div className="mb-8 flex items-center justify-between flex-wrap gap-3">
          <div>
            <div className="text-[11px] font-bold tracking-widest uppercase mb-1" style={{ color: GOLD }}>
              Volume 1, Issue 1, 2027
            </div>
            <h2 className="text-2xl font-bold" style={{ color: NAVY, fontFamily: SERIF }}>Articles</h2>
          </div>
          <div className="w-10 h-0.5" style={{ backgroundColor: GOLD }} />
        </div>

        <div
          className="rounded-lg p-4 mb-6 flex items-start gap-3"
          style={{ backgroundColor: "rgba(195,154,59,0.07)", border: `1px solid ${GOLD}`, borderLeft: `4px solid ${GOLD}` }}
        >
          <span className="text-[12px] leading-relaxed" style={{ color: TEXT_GRAY }}>
            <strong style={{ color: NAVY }}>Note:</strong> The articles below are sample layout previews. Final published articles will include complete metadata, full text, reviewer-revised content, DOI assignments, and citation tools.
          </span>
        </div>

        <div className="space-y-5">
          {ISSUE_ARTICLES.map((article, i) => (
            <ArticleCard key={i} article={article} to="/article" />
          ))}
        </div>
      </div>
    </>
  );
}
