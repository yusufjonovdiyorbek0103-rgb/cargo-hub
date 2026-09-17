import { useEffect, useState } from "react";
import {
  NAVY, GOLD, LIGHT_GRAY, TEXT_GRAY, BORDER_GRAY, SERIF,
  PageBanner, BottomCTA, InfoBox, QuickLinksSidebar,
} from "./shared";
import { InPressCard, Article } from "./ArticleCard";
import { fetchArticlesInPress } from "./api";

const ARTICLE_TYPE_LABELS: Record<string, string> = {
  original_research: "Research Article",
  review_article: "Review Article",
  short_communication: "Short Communication",
  case_study: "Case Study",
  technical_note: "Technical Note",
  perspective: "Perspective / Policy Paper",
  editorial: "Editorial",
  letter: "Letter to Editor",
  book_review: "Book Review",
};

function mapApiArticle(a: Record<string, unknown>): Article {
  const authors = Array.isArray(a.authors)
    ? (a.authors as { full_name: string }[]).map((au) => au.full_name).join(", ")
    : String(a.author_name || "Unknown Author");
  return {
    id: String(a.slug || a.id || ""),
    type: ARTICLE_TYPE_LABELS[String(a.article_type || "")] || String(a.article_type || "Research Article"),
    title: String(a.title || "Untitled"),
    authors,
    abstract: String(a.abstract || ""),
    doi: a.doi ? String(a.doi) : "To be assigned",
    keywords: Array.isArray(a.keywords) ? a.keywords as string[] : [],
    inpressStatus: "Accepted",
  };
}

const SAMPLE_ARTICLES: Article[] = [
  {
    type: "Research Article",
    title: "AI-Driven Decision Support for Digital Public Services",
    authors: "Author Name, Author Name",
    abstract: "This study examines the design and evaluation of AI-driven decision support systems for digital public service delivery.",
    inpressStatus: "In production",
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
  const [articles, setArticles] = useState<Article[]>(SAMPLE_ARTICLES);
  const [usingSamples, setUsingSamples] = useState(true);

  useEffect(() => {
    fetchArticlesInPress()
      .then((data: Record<string, unknown>[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setArticles(data.map(mapApiArticle));
          setUsingSamples(false);
        }
      })
      .catch(() => {});
  }, []);

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
                {articles.length} Article{articles.length !== 1 ? "s" : ""} in Press
              </h2>
              <div className="flex gap-2 text-[10px]">
                {["Accepted", "In production", "Copyediting"].map(s => (
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

            {articles.length === 0 ? (
              <div className="text-center py-12 rounded-xl border" style={{ borderColor: BORDER_GRAY }}>
                <p className="text-sm" style={{ color: TEXT_GRAY }}>No articles currently in press.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-5">
                {articles.map((article, i) => (
                  <InPressCard key={article.id || i} article={article} to={article.id ? `/article/${article.id}` : "/article"} />
                ))}
              </div>
            )}

            {usingSamples && (
              <div
                className="mt-8 rounded-xl p-5"
                style={{ backgroundColor: LIGHT_GRAY, border: `1px solid ${BORDER_GRAY}` }}
              >
                <p className="text-[12px] leading-relaxed" style={{ color: TEXT_GRAY }}>
                  <strong style={{ color: NAVY }}>Note:</strong> Showing sample data. Articles will appear here automatically when manuscripts are accepted through the peer review process.
                </p>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-5">
              <QuickLinksSidebar
                title="Browse Issues"
                links={SIDEBAR_LINKS}
                primaryAction={{ label: "Submit Manuscript", href: "/submit" }}
              />

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
