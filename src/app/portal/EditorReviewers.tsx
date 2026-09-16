import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Search, Bell } from "lucide-react";
import { useAuth } from "../AuthContext";
import { fetchEditorSubmissions, remindReviewer } from "../api";
import {
  NAVY, GOLD, LIGHT, BORDER, TEXT, SERIF,
  PortalLayout, StatusBadge, SummaryCard,
  Card, CardHeader, SidebarItem, Th, Td,
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

interface Assignment {
  id: number;
  reviewer_name: string;
  reviewer_email: string;
  status: string;
  due_date: string | null;
  invited_at: string;
  responded_at: string | null;
}

interface Submission {
  id: number;
  manuscript_id: string;
  title: string;
  status: string;
  review_assignments?: Assignment[];
}

const ASSIGN_STATUS: Record<string, string> = {
  invited: "Invitation Pending",
  accepted: "Review in Progress",
  review_submitted: "Completed",
  declined: "Declined",
  expired: "Expired",
};

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default function EditorReviewers() {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQ, setSearchQ] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [reminding, setReminding] = useState<number | null>(null);

  useEffect(() => {
    fetchEditorSubmissions()
      .then((data) => {
        const list = Array.isArray(data) ? data : data.results || [];
        setSubmissions(list.filter((s: Submission) => s.review_assignments && s.review_assignments.length > 0));
      })
      .catch(() => setSubmissions([]))
      .finally(() => setLoading(false));
  }, []);

  const allAssignments = submissions.flatMap((s) =>
    (s.review_assignments || []).map((a) => ({ ...a, submission: s }))
  );

  const invited = allAssignments.filter((a) => a.status === "invited");
  const inProgress = allAssignments.filter((a) => a.status === "accepted");
  const completed = allAssignments.filter((a) => a.status === "review_submitted");
  const declined = allAssignments.filter((a) => a.status === "declined" || a.status === "expired");

  const filtered = allAssignments.filter((a) => {
    if (statusFilter !== "all" && a.status !== statusFilter) return false;
    if (searchQ) {
      const q = searchQ.toLowerCase();
      return (
        (a.reviewer_name || "").toLowerCase().includes(q) ||
        (a.reviewer_email || "").toLowerCase().includes(q) ||
        a.submission.manuscript_id?.toLowerCase().includes(q) ||
        a.submission.title.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleRemind = async (assignmentId: number) => {
    setReminding(assignmentId);
    try {
      await remindReviewer(assignmentId);
      alert("Reminder sent successfully");
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : "Failed to send reminder");
    } finally {
      setReminding(null);
    }
  };

  return (
    <PortalLayout role="Editor" name={user?.full_name || "Editor"} navItems={NAV} activePath={pathname}>
      <div className="mb-6">
        <div className="text-[11px] font-bold uppercase tracking-wider mb-1" style={{ color: GOLD }}>Editor Portal</div>
        <h1 className="text-2xl font-bold" style={{ color: NAVY, fontFamily: SERIF }}>Reviewer Assignments</h1>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <SummaryCard label="Invited" value={invited.length} color="#EA580C" />
        <SummaryCard label="In Progress" value={inProgress.length} color="#7C3AED" />
        <SummaryCard label="Completed" value={completed.length} color="#16A34A" />
        <SummaryCard label="Declined / Expired" value={declined.length} color="#DC2626" />
      </div>

      <Card>
        <CardHeader
          title="All Reviewer Assignments"
          action={
            <div className="flex items-center gap-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-xs rounded-lg border px-2 py-1.5 outline-none bg-white"
                style={{ borderColor: BORDER, color: NAVY }}
              >
                <option value="all">All Statuses</option>
                <option value="invited">Invited</option>
                <option value="accepted">In Progress</option>
                <option value="review_submitted">Completed</option>
                <option value="declined">Declined</option>
                <option value="expired">Expired</option>
              </select>
              <div className="relative">
                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: TEXT }} />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQ}
                  onChange={(e) => setSearchQ(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-xs rounded-lg border bg-white outline-none"
                  style={{ borderColor: BORDER, color: NAVY, width: "160px" }}
                />
              </div>
            </div>
          }
        />
        {loading ? (
          <div className="p-8 text-center text-sm" style={{ color: TEXT }}>Loading assignments...</div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-sm" style={{ color: TEXT }}>No reviewer assignments found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <Th>Manuscript</Th>
                  <Th>Reviewer</Th>
                  <Th>Status</Th>
                  <Th>Invited</Th>
                  <Th>Due Date</Th>
                  <Th>Actions</Th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((a) => (
                  <tr key={`${a.submission.id}-${a.id}`} className="hover:bg-gray-50 transition-colors">
                    <Td>
                      <div className="font-mono text-[11px] font-semibold" style={{ color: NAVY }}>
                        {a.submission.manuscript_id || `#${a.submission.id}`}
                      </div>
                      <div className="text-[11px] mt-0.5 leading-snug" style={{ color: TEXT, maxWidth: "180px" }}>
                        {a.submission.title}
                      </div>
                    </Td>
                    <Td>
                      <div className="text-[12px] font-medium" style={{ color: NAVY }}>{a.reviewer_name || "—"}</div>
                      <div className="text-[11px]" style={{ color: TEXT }}>{a.reviewer_email || "—"}</div>
                    </Td>
                    <Td><StatusBadge status={ASSIGN_STATUS[a.status] || a.status} /></Td>
                    <Td><span className="text-[12px]" style={{ color: TEXT }}>{formatDate(a.invited_at)}</span></Td>
                    <Td><span className="text-[12px]" style={{ color: TEXT }}>{formatDate(a.due_date)}</span></Td>
                    <Td>
                      {(a.status === "invited" || a.status === "accepted") && (
                        <button
                          type="button"
                          disabled={reminding === a.id}
                          onClick={() => handleRemind(a.id)}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold rounded text-white transition-opacity hover:opacity-80 disabled:opacity-40"
                          style={{ backgroundColor: "#2563EB" }}
                        >
                          <Bell size={11} /> Remind
                        </button>
                      )}
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </PortalLayout>
  );
}
