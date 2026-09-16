import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { NavA } from "../shared";
import { useAuth } from "../AuthContext";
import { fetchSubmissions } from "../api";
import {
  NAVY, GOLD, LIGHT, BORDER, TEXT, SERIF,
  PortalLayout, SummaryCard, StatusBadge,
  Card, CardHeader, GhostBtn,
  SidebarItem,
} from "./portalShared";

const NAV: SidebarItem[] = [
  { label: "Dashboard", to: "/portal/author" },
  { label: "New Submission", to: "/portal/author/submit" },
  { label: "My Submissions", to: "/portal/author/submissions" },
  { label: "Revisions", to: "/portal/author/revisions", badge: 0 },
  { label: "Messages", to: "/portal/author/messages" },
  { label: "Profile", to: "/portal/author/profile" },
  { label: "Help", to: "/portal/author/help" },
];

const RESOURCES = [
  { label: "Author Guidelines", to: "/author-guidelines" },
  { label: "Manuscript Template", to: "/manuscript-template" },
  { label: "Submission Checklist", to: "/checklist" },
  { label: "Publication Ethics", to: "/publication-ethics" },
  { label: "AI Use Policy", to: "/ai-use-policy" },
];

interface Submission {
  id: number;
  manuscript_id: string;
  title: string;
  article_type: string;
  status: string;
  created_at: string;
  updated_at: string;
}

const STATUS_LABEL: Record<string, string> = {
  draft: "Draft",
  submitted: "Submitted",
  screening: "Under Technical Check",
  under_review: "Under Review",
  revision_required: "Revision Required",
  decision_pending: "Decision Pending",
  accepted: "Accepted",
  rejected: "Rejected",
  published: "Published",
};

function formatDate(iso: string): string {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default function AuthorDashboard() {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions()
      .then((data) => {
        const list = Array.isArray(data) ? data : data.results || [];
        setSubmissions(list);
      })
      .catch(() => setSubmissions([]))
      .finally(() => setLoading(false));
  }, []);

  const userName = user?.full_name || "Author";
  const active = submissions.filter((s) => !["draft", "rejected", "published"].includes(s.status));
  const revisions = submissions.filter((s) => s.status === "revision_required");
  const accepted = submissions.filter((s) => s.status === "accepted");
  const published = submissions.filter((s) => s.status === "published");

  return (
    <PortalLayout role="Author" name={userName} navItems={NAV} activePath={pathname}>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider mb-1" style={{ color: GOLD }}>
            Author Dashboard
          </div>
          <h1 className="text-2xl font-bold" style={{ color: NAVY, fontFamily: SERIF }}>
            Welcome back, {userName}
          </h1>
        </div>
        <NavA
          to="/portal/author/submit"
          className="px-5 py-2.5 text-sm font-bold text-white rounded-lg transition-opacity hover:opacity-90"
          style={{ backgroundColor: GOLD }}
        >
          + Start New Submission
        </NavA>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <SummaryCard label="Active Submissions" value={active.length} />
        <SummaryCard label="Revisions Required" value={revisions.length} color="#EA580C" />
        <SummaryCard label="Accepted" value={accepted.length} color="#16A34A" />
        <SummaryCard label="Published" value={published.length} color={GOLD} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader
              title="My Submissions"
              action={<GhostBtn>View All</GhostBtn>}
            />
            {loading ? (
              <div className="p-8 text-center text-sm" style={{ color: TEXT }}>Loading submissions...</div>
            ) : submissions.length === 0 ? (
              <div className="p-8 text-center text-sm" style={{ color: TEXT }}>
                No submissions yet. Start your first submission above.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      {["ID", "Title", "Type", "Submitted", "Status", "Action"].map((h) => (
                        <th
                          key={h}
                          className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wider whitespace-nowrap"
                          style={{ color: TEXT, backgroundColor: LIGHT }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.map((s) => {
                      const statusLabel = STATUS_LABEL[s.status] || s.status;
                      const isRevision = s.status === "revision_required";
                      const isDraft = s.status === "draft";
                      return (
                        <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3.5 text-[12px] font-mono font-medium border-b whitespace-nowrap" style={{ borderColor: BORDER, color: NAVY }}>
                            {s.manuscript_id || `#${s.id}`}
                          </td>
                          <td className="px-4 py-3.5 border-b" style={{ borderColor: BORDER, maxWidth: "240px" }}>
                            <NavA
                              to={`/portal/author/submission/${s.id}`}
                              className="text-[12px] font-semibold leading-snug hover:underline line-clamp-2"
                              style={{ color: NAVY }}
                            >
                              {s.title || "Untitled Submission"}
                            </NavA>
                          </td>
                          <td className="px-4 py-3.5 text-[12px] border-b whitespace-nowrap" style={{ borderColor: BORDER, color: TEXT }}>
                            {s.article_type || "—"}
                          </td>
                          <td className="px-4 py-3.5 text-[12px] border-b whitespace-nowrap" style={{ borderColor: BORDER, color: TEXT }}>
                            {formatDate(s.created_at)}
                          </td>
                          <td className="px-4 py-3.5 border-b whitespace-nowrap" style={{ borderColor: BORDER }}>
                            <StatusBadge status={statusLabel} />
                          </td>
                          <td className="px-4 py-3.5 border-b whitespace-nowrap" style={{ borderColor: BORDER }}>
                            {isRevision ? (
                              <NavA
                                to={`/portal/author/submission/${s.id}`}
                                className="text-[11px] font-bold px-3 py-1.5 rounded text-white transition-opacity hover:opacity-80"
                                style={{ backgroundColor: "#EA580C" }}
                              >
                                Submit Revision
                              </NavA>
                            ) : isDraft ? (
                              <NavA
                                to="/portal/author/submit"
                                className="text-[11px] font-bold px-3 py-1.5 rounded border transition-opacity hover:opacity-70"
                                style={{ color: NAVY, borderColor: BORDER }}
                              >
                                Continue
                              </NavA>
                            ) : (
                              <NavA
                                to={`/portal/author/submission/${s.id}`}
                                className="text-[11px] font-bold px-3 py-1.5 rounded border transition-opacity hover:opacity-70"
                                style={{ color: NAVY, borderColor: BORDER }}
                              >
                                View Details
                              </NavA>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </div>

        <div className="space-y-5">
          <Card>
            <CardHeader title="Author Resources" />
            <ul className="divide-y" style={{ divideColor: BORDER }}>
              {RESOURCES.map((r) => (
                <li key={r.label}>
                  <NavA
                    to={r.to}
                    className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-colors text-[12px] font-medium"
                    style={{ color: NAVY }}
                  >
                    {r.label}
                    <span style={{ color: GOLD }}>→</span>
                  </NavA>
                </li>
              ))}
            </ul>
          </Card>

          <div className="rounded-xl p-5 border-l-4" style={{ backgroundColor: "rgba(195,154,59,0.06)", borderLeft: `4px solid ${GOLD}`, border: `1px solid ${BORDER}` }}>
            <div className="text-xs font-bold mb-2" style={{ color: NAVY }}>Submission Tip</div>
            <p className="text-[12px] leading-relaxed" style={{ color: TEXT }}>
              Ensure your manuscript is anonymized (no author names in the file) and that the title page is uploaded separately before submitting.
            </p>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
