import { useState } from "react";
import { Search } from "lucide-react";
import coverImage from "../imports/image.png";
import {
  NAVY, GOLD, LIGHT_GRAY, TEXT_GRAY, BORDER_GRAY, SERIF,
  PageBanner, BottomCTA, SectionHeader, QuickLinksSidebar, NavA,
} from "./shared";

const ISSUES_2027 = [
  { vol: 1, issue: 1, month: "To be confirmed", articles: "Articles: Planned", status: "Planned" },
  { vol: 1, issue: 2, month: "To be confirmed", articles: "Articles: Planned", status: "Planned" },
  { vol: 1, issue: 3, month: "To be confirmed", articles: "Articles: Planned", status: "Planned" },
];

const SIDEBAR_LINKS = [
  { label: "Browse by Issue", href: "#" },
  { label: "Browse by Article Type", to: "/browse" },
  { label: "Browse by Author", href: "#" },
  { label: "Browse by Keyword", to: "/browse" },
  { label: "View Articles in Press", to: "/articles-in-press" },
];

export default function Archives() {
  const [search, setSearch] = useState("");
  const [year, setYear] = useState("all");
  const [lang, setLang] = useState("all");

  return (
    <>
      <PageBanner
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Archives" }]}
        title="Archives"
        subtitle="Browse past and planned issues of CAJAIDT by year, volume, and issue."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid lg:grid-cols-3 gap-12">

          {/* Main content */}
          <div className="lg:col-span-2">

            {/* Filter bar */}
            <div
              className="rounded-xl border p-5 mb-10"
              style={{ borderColor: BORDER_GRAY, backgroundColor: LIGHT_GRAY }}
            >
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="relative sm:col-span-2 lg:col-span-2">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: TEXT_GRAY }} />
                  <input
                    type="text"
                    placeholder="Search issues…"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border bg-white outline-none focus:ring-2"
                    style={{ borderColor: BORDER_GRAY, color: NAVY }}
                  />
                </div>
                <select
                  value={year}
                  onChange={e => setYear(e.target.value)}
                  className="py-2 px-3 text-sm rounded-lg border bg-white outline-none"
                  style={{ borderColor: BORDER_GRAY, color: NAVY }}
                >
                  <option value="all">All Years</option>
                  <option value="2027">2027</option>
                </select>
                <select
                  value={lang}
                  onChange={e => setLang(e.target.value)}
                  className="py-2 px-3 text-sm rounded-lg border bg-white outline-none"
                  style={{ borderColor: BORDER_GRAY, color: NAVY }}
                >
                  <option value="all">All Languages</option>
                  <option value="en">English</option>
                  <option value="uz">Uzbek</option>
                  <option value="ru">Russian</option>
                </select>
              </div>
            </div>

            {/* Explanation */}
            <div
              className="rounded-xl p-5 mb-10 border-l-4"
              style={{ backgroundColor: LIGHT_GRAY, border: `1px solid ${BORDER_GRAY}`, borderLeft: `4px solid ${GOLD}` }}
            >
              <p className="text-[13px] leading-relaxed" style={{ color: TEXT_GRAY }}>
                CAJAIDT is an online open-access journal. Published issues will appear in the archive with complete article metadata, downloadable PDFs, citation export, and DOI links where available. Issues currently shown are planned.
              </p>
            </div>

            {/* 2027 year section */}
            <div className="mb-3 flex items-center gap-4">
              <h2 className="text-2xl font-bold" style={{ color: NAVY, fontFamily: SERIF }}>2027</h2>
              <div className="flex-1 h-px" style={{ backgroundColor: BORDER_GRAY }} />
              <span
                className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded"
                style={{ color: GOLD, backgroundColor: "rgba(195,154,59,0.09)" }}
              >
                Volume 1
              </span>
            </div>

            <div className="grid sm:grid-cols-3 gap-5 mb-14">
              {ISSUES_2027.map((iss) => (
                <div
                  key={iss.issue}
                  className="border rounded-xl overflow-hidden flex flex-col hover:shadow-md transition-shadow"
                  style={{ borderColor: BORDER_GRAY }}
                >
                  {/* Cover thumbnail */}
                  <div className="flex items-center justify-center p-6" style={{ backgroundColor: NAVY }}>
                    <div className="w-20 rounded-lg overflow-hidden shadow-xl">
                      <img src={coverImage} alt={`Issue ${iss.issue} cover`} className="w-full h-auto block" />
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: GOLD }}>
                      Volume {iss.vol}, Issue {iss.issue}
                    </div>
                    <div className="text-sm font-bold mb-1" style={{ color: NAVY, fontFamily: SERIF }}>2027</div>
                    <div className="text-[11px] mb-1" style={{ color: TEXT_GRAY }}>
                      Publication month: {iss.month}
                    </div>
                    <div className="text-[11px] mb-3" style={{ color: TEXT_GRAY }}>{iss.articles}</div>
                    <div className="mt-auto flex items-center justify-between">
                      <span
                        className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                        style={{ color: TEXT_GRAY, backgroundColor: LIGHT_GRAY }}
                      >
                        {iss.status}
                      </span>
                      <NavA
                        to="/current-issue"
                        className="text-xs font-semibold transition-opacity hover:opacity-70"
                        style={{ color: NAVY }}
                      >
                        View Issue →
                      </NavA>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Future years placeholder */}
            <div
              className="rounded-xl border border-dashed p-8 text-center"
              style={{ borderColor: BORDER_GRAY }}
            >
              <div className="text-sm font-semibold mb-1" style={{ color: TEXT_GRAY }}>
                Future volumes will appear here as they are published.
              </div>
              <p className="text-[12px]" style={{ color: TEXT_GRAY }}>
                CAJAIDT publishes monthly. Archives are updated continuously.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-5">
              <QuickLinksSidebar
                title="Archive Tools"
                links={SIDEBAR_LINKS}
                primaryAction={{ label: "Submit Manuscript", href: "/submit" }}
              />
              <div
                className="rounded-xl p-5"
                style={{ backgroundColor: LIGHT_GRAY, border: `1px solid ${BORDER_GRAY}` }}
              >
                <div className="text-xs font-bold mb-2" style={{ color: NAVY }}>Journal Statistics</div>
                <div className="space-y-2">
                  {[
                    { label: "Volumes", value: "1 (planned)" },
                    { label: "Issues per year", value: "12" },
                    { label: "Articles published", value: "Coming soon" },
                    { label: "Open Access since", value: "2027" },
                  ].map(s => (
                    <div key={s.label} className="flex justify-between text-[12px]">
                      <span style={{ color: TEXT_GRAY }}>{s.label}</span>
                      <span className="font-semibold" style={{ color: NAVY }}>{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomCTA
        title="Looking for a specific article?"
        primaryLabel="Browse Articles"
        primaryHref="/browse"
        secondaryLabel="Articles in Press"
        secondaryHref="/articles-in-press"
      />
    </>
  );
}
