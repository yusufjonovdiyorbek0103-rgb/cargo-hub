import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useAuth } from "../AuthContext";
import { fetchEditorSubmissions } from "../api";
import {
  NAVY, GOLD, TEXT, SERIF,
  PortalLayout, SummaryCard, Card, CardHeader, SidebarItem,
} from "./portalShared";

const NAV: SidebarItem[] = [
  { label: "Dashboard", to: "/portal/editor" },
  { label: "Submissions", to: "/portal/editor/submissions" },
  { label: "Reviewer Assignments", to: "/portal/editor/reviewers" },
  { label: "Decisions", to: "/portal/editor/decisions" },
  { label: "Issues", to: "/portal/editor/issues" },
  { label: "Messages", to: "/portal/editor/messages" },
  { label: "Editorial Board", to: "/editorial-board" },
  { label: "Reports", to: "/portal/editor/reports" },
];

interface Submission {
  id: number;
  status: string;
  article_type: string;
  created_at: string;
  updated_at: string;
  review_assignments?: { status: string }[];
}

const TYPE_LABELS: Record<string, string> = {
  original_research: "Original Research",
  review_article: "Review Article",
  short_communication: "Short Communication",
  case_study: "Case Study",
  technical_note: "Technical Note",
  perspective: "Perspective",
  editorial: "Editorial",
  letter: "Letter to Editor",
  book_review: "Book Review",
};

function BarChart({ data, maxVal }: { data: { label: string; value: number; color: string }[]; maxVal: number }) {
  return (
    <div className="space-y-3">
      {data.map((d) => (
        <div key={d.label} className="flex items-center gap-3">
          <div className="text-[11px] font-medium text-right" style={{ color: TEXT, width: "120px", flexShrink: 0 }}>
            {d.label}
          </div>
          <div className="flex-1 h-6 rounded-full overflow-hidden" style={{ backgroundColor: "#F3F4F6" }}>
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: maxVal > 0 ? `${Math.max((d.value / maxVal) * 100, d.value > 0 ? 4 : 0)}%` : "0%",
                backgroundColor: d.color,
              }}
            />
          </div>
          <div className="text-[12px] font-bold" style={{ color: NAVY, width: "28px", flexShrink: 0 }}>
            {d.value}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function EditorReports() {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEditorSubmissions()
      .then((data) => {
        const list = Array.isArray(data) ? data : data.results || [];
        setSubmissions(list);
      })
      .catch(() => setSubmissions([]))
      .finally(() => setLoading(false));
  }, []);

  const statusCounts = submissions.reduce<Record<string, number>>((acc, s) => {
    acc[s.status] = (acc[s.status] || 0) + 1;
    return acc;
  }, {});

  const typeCounts = submissions.reduce<Record<string, number>>((acc, s) => {
    const t = s.article_type || "unknown";
    acc[t] = (acc[t] || 0) + 1;
    return acc;
  }, {});

  const allAssignments = submissions.flatMap((s) => s.review_assignments || []);
  const reviewStats = {
    total: allAssignments.length,
    invited: allAssignments.filter((a) => a.status === "invited").length,
    accepted: allAssignments.filter((a) => a.status === "accepted").length,
    completed: allAssignments.filter((a) => a.status === "review_submitted").length,
    declined: allAssignments.filter((a) => a.status === "declined").length,
  };

  const accepted = statusCounts["accepted"] || 0;
  const rejected = statusCounts["rejected"] || 0;
  const total = accepted + rejected + (statusCounts["revision_required"] || 0);
  const acceptanceRate = total > 0 ? ((accepted / total) * 100).toFixed(1) : "—";

  const now = new Date();
  const thisMonth = submissions.filter((s) => {
    const d = new Date(s.created_at);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });
  const lastMonth = submissions.filter((s) => {
    const d = new Date(s.created_at);
    const prev = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    return d.getMonth() === prev.getMonth() && d.getFullYear() === prev.getFullYear();
  });

  const statusData = [
    { label: "Submitted", value: statusCounts["submitted"] || 0, color: "#2563EB" },
    { label: "Screening", value: statusCounts["screening"] || 0, color: "#4F46E5" },
    { label: "Under Review", value: statusCounts["under_review"] || 0, color: "#7C3AED" },
    { label: "Decision Pending", value: statusCounts["decision_pending"] || 0, color: "#EA580C" },
    { label: "Revision Required", value: statusCounts["revision_required"] || 0, color: "#F59E0B" },
    { label: "Accepted", value: accepted, color: "#16A34A" },
    { label: "Rejected", value: rejected, color: "#DC2626" },
    { label: "Published", value: statusCounts["published"] || 0, color: "#15803D" },
  ];
  const maxStatus = Math.max(...statusData.map((d) => d.value), 1);

  const typeData = Object.entries(typeCounts)
    .map(([key, value]) => ({
      label: TYPE_LABELS[key] || key,
      value,
      color: GOLD,
    }))
    .sort((a, b) => b.value - a.value);
  const maxType = Math.max(...typeData.map((d) => d.value), 1);

  return (
    <PortalLayout role="Editor" name={user?.full_name || "Editor"} navItems={NAV} activePath={pathname}>
      <div className="mb-6">
        <div className="text-[11px] font-bold uppercase tracking-wider mb-1" style={{ color: GOLD }}>Editor Portal</div>
        <h1 className="text-2xl font-bold" style={{ color: NAVY, fontFamily: SERIF }}>Editorial Reports</h1>
      </div>

      {loading ? (
        <div className="p-8 text-center text-sm" style={{ color: TEXT }}>Loading reports...</div>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <SummaryCard label="Total Submissions" value={submissions.length} />
            <SummaryCard label="This Month" value={thisMonth.length} color="#2563EB" />
            <SummaryCard label="Last Month" value={lastMonth.length} color="#4F46E5" />
            <SummaryCard label="Acceptance Rate" value={acceptanceRate === "—" ? "—" : `${acceptanceRate}%`} color="#16A34A" />
            <SummaryCard label="Total Reviews" value={reviewStats.total} color="#7C3AED" />
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader title="Submissions by Status" />
              <div className="p-5">
                <BarChart data={statusData} maxVal={maxStatus} />
              </div>
            </Card>

            <Card>
              <CardHeader title="Submissions by Type" />
              <div className="p-5">
                {typeData.length === 0 ? (
                  <div className="text-[12px] text-center p-4" style={{ color: TEXT }}>No submissions yet.</div>
                ) : (
                  <BarChart data={typeData} maxVal={maxType} />
                )}
              </div>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader title="Review Statistics" />
              <div className="p-5 space-y-4">
                {[
                  { label: "Total Assignments", value: reviewStats.total, color: NAVY },
                  { label: "Pending Response", value: reviewStats.invited, color: "#EA580C" },
                  { label: "In Progress", value: reviewStats.accepted, color: "#7C3AED" },
                  { label: "Reviews Completed", value: reviewStats.completed, color: "#16A34A" },
                  { label: "Declined", value: reviewStats.declined, color: "#DC2626" },
                ].map((s) => (
                  <div key={s.label} className="flex items-center justify-between py-2 border-b" style={{ borderColor: "#F3F4F6" }}>
                    <span className="text-[12px] font-medium" style={{ color: TEXT }}>{s.label}</span>
                    <span className="text-[14px] font-bold" style={{ color: s.color }}>{s.value}</span>
                  </div>
                ))}
                {reviewStats.total > 0 && (
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[12px] font-medium" style={{ color: TEXT }}>Response Rate</span>
                    <span className="text-[14px] font-bold" style={{ color: "#16A34A" }}>
                      {(((reviewStats.completed + reviewStats.accepted + reviewStats.declined) / reviewStats.total) * 100).toFixed(0)}%
                    </span>
                  </div>
                )}
              </div>
            </Card>

            <Card>
              <CardHeader title="Decision Summary" />
              <div className="p-5 space-y-4">
                {[
                  { label: "Accepted", value: accepted, color: "#16A34A" },
                  { label: "Rejected", value: rejected, color: "#DC2626" },
                  { label: "Revision Required", value: statusCounts["revision_required"] || 0, color: "#EA580C" },
                  { label: "Published", value: statusCounts["published"] || 0, color: "#15803D" },
                ].map((s) => (
                  <div key={s.label} className="flex items-center justify-between py-2 border-b" style={{ borderColor: "#F3F4F6" }}>
                    <span className="text-[12px] font-medium" style={{ color: TEXT }}>{s.label}</span>
                    <span className="text-[14px] font-bold" style={{ color: s.color }}>{s.value}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[12px] font-medium" style={{ color: TEXT }}>Total Decisions Made</span>
                  <span className="text-[14px] font-bold" style={{ color: NAVY }}>{total}</span>
                </div>
              </div>
            </Card>
          </div>
        </>
      )}
    </PortalLayout>
  );
}
