import { FileText, ExternalLink, Copy } from "lucide-react";
import { NAVY, GOLD, LIGHT_GRAY, TEXT_GRAY, BORDER_GRAY, SERIF, NavA } from "./shared";

// ─── Article type → color map ─────────────────────────────────────────────────
export const TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  "Research Article":            { bg: NAVY,      text: "#fff" },
  "Review Article":              { bg: GOLD,      text: "#fff" },
  "Case Study":                  { bg: "#0D9488", text: "#fff" },
  "Technical Note":              { bg: "#7C3AED", text: "#fff" },
  "Short Communication":         { bg: "#EA580C", text: "#fff" },
  "Perspective / Policy Paper":  { bg: "#475569", text: "#fff" },
  "Systematic Literature Review":{ bg: "#166534", text: "#fff" },
};

// ─── Types ────────────────────────────────────────────────────────────────────
export interface Article {
  id?: string;
  type: string;
  title: string;
  authors: string;
  abstract: string;
  keywords?: string[];
  pages?: string;
  doi?: string;
  status?: string;
  year?: number;
  inpressStatus?: string;
}

// ─── Type badge ───────────────────────────────────────────────────────────────
export function ArticleTypeBadge({ type }: { type: string }) {
  const { bg, text } = TYPE_COLORS[type] ?? { bg: NAVY, text: "#fff" };
  return (
    <span
      className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded"
      style={{ backgroundColor: bg, color: text }}
    >
      {type}
    </span>
  );
}

// ─── Full article card (Current Issue, Browse) ────────────────────────────────
export function ArticleCard({
  article,
  to,
}: {
  article: Article;
  to?: string;
}) {
  return (
    <div
      className="border rounded-xl overflow-hidden flex flex-col transition-shadow hover:shadow-md"
      style={{ borderColor: BORDER_GRAY, backgroundColor: "white" }}
    >
      <div className="px-6 pt-5 pb-4 flex-1">
        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
          <ArticleTypeBadge type={article.type} />
          {article.status && (
            <span
              className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
              style={{ color: TEXT_GRAY, backgroundColor: LIGHT_GRAY }}
            >
              {article.status}
            </span>
          )}
        </div>

        <h3 className="text-[15px] font-bold leading-snug mb-2" style={{ color: NAVY, fontFamily: SERIF }}>
          {to ? (
            <NavA to={to} className="hover:underline">{article.title}</NavA>
          ) : (
            article.title
          )}
        </h3>

        <p className="text-[12px] mb-3" style={{ color: TEXT_GRAY }}>{article.authors}</p>

        <p
          className="text-[12px] leading-relaxed mb-3"
          style={{
            color: TEXT_GRAY,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical" as React.CSSProperties["WebkitBoxOrient"],
            overflow: "hidden",
          }}
        >
          {article.abstract}
        </p>

        {article.keywords && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {article.keywords.slice(0, 5).map(kw => (
              <span
                key={kw}
                className="text-[10px] px-2 py-0.5 rounded-full border"
                style={{ color: TEXT_GRAY, borderColor: BORDER_GRAY }}
              >
                {kw}
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-4 text-[11px]" style={{ color: TEXT_GRAY }}>
          {article.pages && <span>pp. {article.pages}</span>}
          <span>DOI: {article.doi ?? "To be assigned"}</span>
          {article.year && <span>{article.year}</span>}
        </div>
      </div>

      <div
        className="px-6 py-3 border-t flex items-center gap-2"
        style={{ borderColor: BORDER_GRAY, backgroundColor: LIGHT_GRAY }}
      >
        <button className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded text-white transition-opacity hover:opacity-80" style={{ backgroundColor: NAVY }}>
          <FileText size={11} /> PDF
        </button>
        <button className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded border transition-opacity hover:opacity-70 bg-white" style={{ color: NAVY, borderColor: BORDER_GRAY }}>
          <ExternalLink size={11} /> HTML
        </button>
        <button className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded border transition-opacity hover:opacity-70 bg-white" style={{ color: NAVY, borderColor: BORDER_GRAY }}>
          <Copy size={11} /> Cite
        </button>
      </div>
    </div>
  );
}

// ─── In-press card (Articles in Press page) ───────────────────────────────────
export function InPressCard({ article, to }: { article: Article; to?: string }) {
  const statusColors: Record<string, { color: string; bg: string }> = {
    "In production":               { color: "#2563EB", bg: "#EFF6FF" },
    "Copyediting":                 { color: GOLD,      bg: "rgba(195,154,59,0.09)" },
    "Production":                  { color: "#7C3AED", bg: "#F5F3FF" },
    "Issue assignment pending":    { color: TEXT_GRAY, bg: LIGHT_GRAY },
  };

  const statusKey = article.inpressStatus ?? "In production";
  const sc = statusColors[statusKey] ?? statusColors["In production"];

  return (
    <div
      className="border rounded-xl p-5 flex flex-col gap-3 transition-shadow hover:shadow-sm"
      style={{ borderColor: BORDER_GRAY, borderTop: `3px solid ${TYPE_COLORS[article.type]?.bg ?? NAVY}` }}
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <ArticleTypeBadge type={article.type} />
        <span
          className="text-[10px] font-bold px-2.5 py-1 rounded-full"
          style={{ color: sc.color, backgroundColor: sc.bg }}
        >
          Accepted · {statusKey}
        </span>
      </div>

      <h3 className="text-sm font-bold leading-snug" style={{ color: NAVY, fontFamily: SERIF }}>
        {to ? <NavA to={to} className="hover:underline">{article.title}</NavA> : article.title}
      </h3>

      <p className="text-[12px]" style={{ color: TEXT_GRAY }}>{article.authors}</p>

      <p
        className="text-[12px] leading-relaxed"
        style={{
          color: TEXT_GRAY,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical" as React.CSSProperties["WebkitBoxOrient"],
          overflow: "hidden",
        }}
      >
        {article.abstract}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-[11px]" style={{ color: TEXT_GRAY }}>
          DOI: {article.doi ?? "To be assigned"}
        </span>
        <button
          className="text-[11px] font-semibold px-3 py-1.5 rounded border transition-opacity hover:opacity-70 bg-white"
          style={{ color: NAVY, borderColor: BORDER_GRAY }}
        >
          View Article
        </button>
      </div>
    </div>
  );
}
