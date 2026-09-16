import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import {
  NAVY, GOLD, LIGHT_GRAY, TEXT_GRAY, BORDER_GRAY, SERIF,
  PageBanner,
} from "./shared";
import { ArticleCard, Article } from "./ArticleCard";

const ALL_ARTICLES: Article[] = [
  {
    type: "Research Article",
    title: "Responsible Artificial Intelligence for Digital Transformation in Emerging Economies",
    authors: "Author Name, Author Name",
    abstract: "This study examines responsible AI deployment frameworks in emerging economies, focusing on governance structures, institutional readiness, and sociotechnical considerations for national digital transformation programmes.",
    keywords: ["Responsible AI", "Digital Transformation", "AI Governance", "Emerging Economies"],
    pages: "1–14", doi: "To be assigned", year: 2027, status: "Sample layout",
  },
  {
    type: "Review Article",
    title: "Human-Centered AI and UX Analytics in Digital Learning Platforms",
    authors: "Author Name, Author Name",
    abstract: "A systematic review synthesising current research on human-centered AI design principles applied to educational technology platforms, analysing UX analytics methodologies across peer-reviewed studies.",
    keywords: ["Human-Centered AI", "UX Analytics", "EdTech", "Digital Learning"],
    pages: "29–45", doi: "To be assigned", year: 2027, status: "Sample layout",
  },
  {
    type: "Research Article",
    title: "Machine Learning-Based Decision Support Systems for Smart Public Services",
    authors: "Author Name, Author Name",
    abstract: "We propose a machine learning framework for optimising public service delivery in smart city contexts, demonstrating efficiency improvements across healthcare, transport, and administrative services.",
    keywords: ["Machine Learning", "Decision Support", "Smart Cities", "Public Services"],
    pages: "15–28", doi: "To be assigned", year: 2027, status: "Sample layout",
  },
  {
    type: "Case Study",
    title: "Digital Transformation Readiness in Higher Education Institutions",
    authors: "Author Name, Author Name",
    abstract: "An evidence-based analysis of digital transformation readiness frameworks applied to higher education institutions in Central Asia, examining barriers, drivers, and implementation patterns.",
    keywords: ["Digital Transformation", "Higher Education", "Readiness Assessment"],
    pages: "46–60", doi: "To be assigned", year: 2027, status: "Sample layout",
  },
  {
    type: "Technical Note",
    title: "A Prototype Framework for AI-Enabled Research Data Management",
    authors: "Author Name, Author Name",
    abstract: "Description of a prototype technical framework for managing research data using AI-assisted cataloguing, versioning, and metadata enrichment tools in academic research environments.",
    keywords: ["Research Data Management", "AI Framework", "Data Governance"],
    pages: "61–72", doi: "To be assigned", year: 2027, status: "Sample layout",
  },
  {
    type: "Research Article",
    title: "Cybersecurity Governance Frameworks for AI-Driven Public Infrastructure",
    authors: "Author Name, Author Name",
    abstract: "This study analyses cybersecurity governance frameworks applicable to AI-driven public digital infrastructure, identifying critical control points, policy gaps, and recommended institutional responses.",
    keywords: ["Cybersecurity", "AI Governance", "Digital Infrastructure", "Risk Management"],
    pages: "73–89", doi: "To be assigned", year: 2027, status: "Sample layout",
  },
];

const ARTICLE_TYPES = [
  "Research Article", "Review Article", "Case Study",
  "Technical Note", "Short Communication", "Perspective / Policy Paper",
];

const SUBJECT_AREAS = [
  "Artificial Intelligence", "Data Science", "Digital Transformation",
  "Human-Centered AI", "Cybersecurity", "Smart Systems", "Digital Economy",
];

const SORT_OPTIONS = ["Newest", "Oldest", "Title A–Z", "Most viewed"];

function FilterPanel({
  search, setSearch,
  selectedTypes, toggleType,
  selectedSubjects, toggleSubject,
  year, setYear,
  sortBy, setSortBy,
}: {
  search: string; setSearch: (v: string) => void;
  selectedTypes: string[]; toggleType: (t: string) => void;
  selectedSubjects: string[]; toggleSubject: (s: string) => void;
  year: string; setYear: (v: string) => void;
  sortBy: string; setSortBy: (v: string) => void;
}) {
  return (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <div className="text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: NAVY }}>Search</div>
        <div className="relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: TEXT_GRAY }} />
          <input
            type="text"
            placeholder="Keyword, title, or author…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border bg-white outline-none focus:ring-1"
            style={{ borderColor: BORDER_GRAY, color: NAVY }}
          />
        </div>
      </div>

      {/* Sort */}
      <div>
        <div className="text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: NAVY }}>Sort By</div>
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="w-full py-2 px-3 text-sm rounded-lg border bg-white outline-none"
          style={{ borderColor: BORDER_GRAY, color: NAVY }}
        >
          {SORT_OPTIONS.map(o => <option key={o}>{o}</option>)}
        </select>
      </div>

      {/* Year */}
      <div>
        <div className="text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: NAVY }}>Year</div>
        <select
          value={year}
          onChange={e => setYear(e.target.value)}
          className="w-full py-2 px-3 text-sm rounded-lg border bg-white outline-none"
          style={{ borderColor: BORDER_GRAY, color: NAVY }}
        >
          <option value="all">All years</option>
          <option value="2027">2027</option>
        </select>
      </div>

      {/* Article type */}
      <div>
        <div className="text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: NAVY }}>Article Type</div>
        <div className="space-y-2">
          {ARTICLE_TYPES.map(t => (
            <label key={t} className="flex items-center gap-2.5 cursor-pointer group">
              <div
                onClick={() => toggleType(t)}
                className="w-4 h-4 rounded border-2 flex-shrink-0 flex items-center justify-center cursor-pointer"
                style={{
                  borderColor: selectedTypes.includes(t) ? GOLD : BORDER_GRAY,
                  backgroundColor: selectedTypes.includes(t) ? GOLD : "white",
                }}
              >
                {selectedTypes.includes(t) && (
                  <svg viewBox="0 0 10 8" className="w-2.5 h-2 fill-white">
                    <path d="M1 4l2.5 2.5L9 1" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                  </svg>
                )}
              </div>
              <span
                className="text-[12px] group-hover:opacity-80 transition-opacity"
                style={{ color: NAVY }}
                onClick={() => toggleType(t)}
              >
                {t}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Subject area */}
      <div>
        <div className="text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: NAVY }}>Subject Area</div>
        <div className="space-y-2">
          {SUBJECT_AREAS.map(s => (
            <label key={s} className="flex items-center gap-2.5 cursor-pointer group">
              <div
                onClick={() => toggleSubject(s)}
                className="w-4 h-4 rounded border-2 flex-shrink-0 flex items-center justify-center cursor-pointer"
                style={{
                  borderColor: selectedSubjects.includes(s) ? NAVY : BORDER_GRAY,
                  backgroundColor: selectedSubjects.includes(s) ? NAVY : "white",
                }}
              >
                {selectedSubjects.includes(s) && (
                  <svg viewBox="0 0 10 8" className="w-2.5 h-2 fill-white">
                    <path d="M1 4l2.5 2.5L9 1" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                  </svg>
                )}
              </div>
              <span
                className="text-[12px] group-hover:opacity-80 transition-opacity"
                style={{ color: NAVY }}
                onClick={() => toggleSubject(s)}
              >
                {s}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function BrowseArticles() {
  const [search, setSearch] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [year, setYear] = useState("all");
  const [sortBy, setSortBy] = useState("Newest");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const toggleType = (t: string) =>
    setSelectedTypes(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);

  const toggleSubject = (s: string) =>
    setSelectedSubjects(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  const filtered = ALL_ARTICLES.filter(a => {
    const matchSearch = !search ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.authors.toLowerCase().includes(search.toLowerCase()) ||
      (a.keywords ?? []).some(k => k.toLowerCase().includes(search.toLowerCase()));
    const matchType = selectedTypes.length === 0 || selectedTypes.includes(a.type);
    const matchYear = year === "all" || String(a.year) === year;
    return matchSearch && matchType && matchYear;
  });

  const activeFilters = selectedTypes.length + selectedSubjects.length + (year !== "all" ? 1 : 0);

  return (
    <>
      <PageBanner
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Browse Articles" }]}
        title="Browse Articles"
        subtitle="Search and filter articles by title, author, keyword, article type, year, and issue."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="flex gap-10">

          {/* ── Desktop filter sidebar ─────────────────────────────────── */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div
              className="rounded-xl border p-5 sticky top-24"
              style={{ borderColor: BORDER_GRAY }}
            >
              <div className="flex items-center justify-between mb-5">
                <span className="text-sm font-bold" style={{ color: NAVY }}>Filters</span>
                {activeFilters > 0 && (
                  <button
                    onClick={() => { setSelectedTypes([]); setSelectedSubjects([]); setYear("all"); }}
                    className="text-[11px] font-semibold transition-opacity hover:opacity-70"
                    style={{ color: GOLD }}
                  >
                    Clear all
                  </button>
                )}
              </div>
              <FilterPanel
                search={search} setSearch={setSearch}
                selectedTypes={selectedTypes} toggleType={toggleType}
                selectedSubjects={selectedSubjects} toggleSubject={toggleSubject}
                year={year} setYear={setYear}
                sortBy={sortBy} setSortBy={setSortBy}
              />
            </div>
          </aside>

          {/* ── Results ───────────────────────────────────────────────── */}
          <div className="flex-1 min-w-0">
            {/* Mobile filter button */}
            <div className="lg:hidden mb-5">
              <button
                onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-semibold transition-opacity hover:opacity-70"
                style={{ color: NAVY, borderColor: BORDER_GRAY }}
              >
                <SlidersHorizontal size={15} />
                Filters
                {activeFilters > 0 && (
                  <span
                    className="ml-1 text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white"
                    style={{ backgroundColor: GOLD }}
                  >
                    {activeFilters}
                  </span>
                )}
              </button>

              {mobileFiltersOpen && (
                <div
                  className="mt-4 rounded-xl border p-5"
                  style={{ borderColor: BORDER_GRAY }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-bold" style={{ color: NAVY }}>Filters</span>
                    <button onClick={() => setMobileFiltersOpen(false)}>
                      <X size={18} style={{ color: TEXT_GRAY }} />
                    </button>
                  </div>
                  <FilterPanel
                    search={search} setSearch={setSearch}
                    selectedTypes={selectedTypes} toggleType={toggleType}
                    selectedSubjects={selectedSubjects} toggleSubject={toggleSubject}
                    year={year} setYear={setYear}
                    sortBy={sortBy} setSortBy={setSortBy}
                  />
                </div>
              )}
            </div>

            {/* Results header */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <div>
                <span className="text-sm font-semibold" style={{ color: NAVY }}>
                  {filtered.length} article{filtered.length !== 1 ? "s" : ""} found
                </span>
                {(search || activeFilters > 0) && (
                  <span className="text-xs ml-2" style={{ color: TEXT_GRAY }}>
                    (filtered from {ALL_ARTICLES.length} total)
                  </span>
                )}
              </div>
              {/* Active filter chips */}
              {selectedTypes.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedTypes.map(t => (
                    <button
                      key={t}
                      onClick={() => toggleType(t)}
                      className="flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1 rounded-full border transition-opacity hover:opacity-70"
                      style={{ color: GOLD, borderColor: GOLD, backgroundColor: "rgba(195,154,59,0.07)" }}
                    >
                      {t} <X size={10} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Article cards */}
            {filtered.length > 0 ? (
              <div className="space-y-5">
                {filtered.map((article, i) => (
                  <ArticleCard key={i} article={article} to="/article" />
                ))}
              </div>
            ) : (
              <div
                className="rounded-xl border p-12 text-center"
                style={{ borderColor: BORDER_GRAY }}
              >
                <div className="text-sm font-semibold mb-2" style={{ color: NAVY }}>
                  No articles match your filters.
                </div>
                <p className="text-[13px] mb-5" style={{ color: TEXT_GRAY }}>
                  Try adjusting your search terms or clearing some filters.
                </p>
                <button
                  onClick={() => { setSearch(""); setSelectedTypes([]); setSelectedSubjects([]); setYear("all"); }}
                  className="px-5 py-2 text-sm font-semibold text-white rounded transition-opacity hover:opacity-90"
                  style={{ backgroundColor: NAVY }}
                >
                  Clear all filters
                </button>
              </div>
            )}

            <p className="text-[11px] mt-8 text-center" style={{ color: TEXT_GRAY }}>
              All articles shown are sample placeholders demonstrating the browse interface. Final articles will appear upon publication.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
