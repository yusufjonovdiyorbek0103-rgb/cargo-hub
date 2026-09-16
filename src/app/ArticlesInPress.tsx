import {
  NAVY, GOLD, LIGHT_GRAY, TEXT_GRAY, BORDER_GRAY, SERIF,
  PageBanner, BottomCTA, InfoBox, QuickLinksSidebar,
} from "./shared";
import { InPressCard, Article } from "./ArticleCard";

const IN_PRESS_ARTICLES: Article[] = [
  {
    type: "Research Article",
    title: "AI-Driven Decision Support for Digital Public Services",
    authors: "Author Name, Author Name",
    abstract: "This study examines the design and evaluation of AI-driven decision support systems for digital public service delivery. Findings demonstrate improvements in processing efficiency, citizen satisfaction, and resource allocation across three pilot government service contexts.",
    inpressStatus: "In production",
    doi: "To be assigned",
  },
  {
    type: "Review Article",
    title: "Trends in Human-Centered Artificial Intelligence Research",
    authors: "Author Name, Author Name",
    abstract: "A systematic review of human-centered AI research published between 2018 and 2024, examining methodological approaches, thematic developments, and research gaps in the field of AI design for human benefit.",
    inpressStatus: "Copyediting",
    doi: "To be assigned",
  },
  {
    type: "Technical Note",
    title: "A Lightweight Framework for Educational Data Analytics",
    authors: "Author Name, Author Name",
    abstract: "This technical note describes a lightweight, modular framework for educational data analytics applicable to resource-constrained institutional environments. The framework is validated through deployment in three higher education settings.",
    inpressStatus: "Production",
    doi: "To be assigned",
  },
  {
    type: "Case Study",
    title: "Digital Transformation Practices in University Administration",
    authors: "Author Name, Author Name",
    abstract: "An evidence-based case study examining digital transformation practices and outcomes across administrative functions in a Central Asian university context, with a focus on process automation, data governance, and change management.",
    inpressStatus: "Issue assignment pending",
    doi: "To be assigned",
  },
];

const SIDEBAR_LINKS = [
  { label: "Current Issue", to: "/current-issue" },
  { label: "Archives", to: "/archives" },
  { label: "Browse Articles", to: "/browse" },
  { label: "Submit Manuscript", to: "/submit" },
];

export default function ArticlesInPress() {
  return (
    <>
      <PageBanner
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Articles in Press" }]}
        title="Articles in Press"
        subtitle="Accepted manuscripts being prepared for assignment to a future issue."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid lg:grid-cols-3 gap-12">

          <div className="lg:col-span-2">
            <InfoBox type="note">
              Articles in Press are peer-reviewed and accepted manuscripts that are undergoing copyediting, production, DOI assignment, or issue scheduling. Final citation details including volume, issue, and page numbers will be added after assignment to a specific published issue.
            </InfoBox>

            <div className="mt-8 mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold" style={{ color: NAVY, fontFamily: SERIF }}>
                {IN_PRESS_ARTICLES.length} Articles in Press
              </h2>
              <div className="flex gap-2 text-[10px]">
                {["In production", "Copyediting", "Issue assignment pending"].map(s => (
                  <span
                    key={s}
                    className="px-2 py-1 rounded font-semibold"
                    style={{ color: TEXT_GRAY, backgroundColor: LIGHT_GRAY }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {IN_PRESS_ARTICLES.map((article, i) => (
                <InPressCard key={i} article={article} to="/article" />
              ))}
            </div>

            <div
              className="mt-8 rounded-xl p-5"
              style={{ backgroundColor: LIGHT_GRAY, border: `1px solid ${BORDER_GRAY}` }}
            >
              <p className="text-[12px] leading-relaxed" style={{ color: TEXT_GRAY }}>
                <strong style={{ color: NAVY }}>Note:</strong> Article titles, authors, and abstracts above are placeholder samples demonstrating the Articles in Press layout. Content will be updated when real manuscripts are accepted.
              </p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-5">
              <QuickLinksSidebar
                title="Browse Issues"
                links={SIDEBAR_LINKS}
                primaryAction={{ label: "Submit Manuscript", href: "/submit" }}
              />

              {/* Status legend */}
              <div className="rounded-xl border overflow-hidden" style={{ borderColor: BORDER_GRAY }}>
                <div className="px-5 py-4" style={{ backgroundColor: LIGHT_GRAY }}>
                  <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: NAVY }}>Status Guide</h3>
                </div>
                <div className="divide-y divide-gray-100 text-[12px]">
                  {[
                    { s: "Accepted / Copyediting", desc: "Professional language and formatting review.", color: GOLD },
                    { s: "Accepted / In production", desc: "Layout, typesetting, and metadata preparation.", color: "#2563EB" },
                    { s: "Accepted / Issue assignment pending", desc: "Ready for publication — awaiting issue slot.", color: TEXT_GRAY },
                  ].map(item => (
                    <div key={item.s} className="px-5 py-3">
                      <span
                        className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-1"
                        style={{ color: item.color, backgroundColor: `${item.color}15` }}
                      >
                        {item.s}
                      </span>
                      <p style={{ color: TEXT_GRAY }}>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomCTA
        title="Ready to submit your manuscript?"
        primaryLabel="Submit Manuscript"
        primaryHref="/submit"
        secondaryLabel="Author Guidelines"
        secondaryHref="/author-guidelines"
      />
    </>
  );
}
