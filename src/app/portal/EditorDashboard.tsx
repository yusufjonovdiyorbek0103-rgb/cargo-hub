import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Search } from "lucide-react";
import { useAuth } from "../AuthContext";
import { fetchEditorSubmissions, fetchReviewers, inviteReviewer, makeDecision, startScreening, sendToReview, moveToDecision, publishSubmission } from "../api";
import {
  NAVY, GOLD, LIGHT, BORDER, TEXT, SERIF,
  PortalLayout, SummaryCard, StatusBadge,
  Card, CardHeader, GhostBtn, PrimaryBtn, SidebarItem,
  Th, Td,
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
  manuscript_id: string;
  title: string;
  article_type: string;
  status: string;
  created_at: string;
  author_name: string;
}

interface Reviewer {
  id: number;
  full_name: string;
  affiliation: string;
  email: string;
}

const STATUS_LABEL: Record<string, string> = {
  draft: "Draft",
  submitted: "Submitted",
  screening: "Technical Check",
  under_review: "Under Review",
  revision_required: "Revision Required",
  decision_pending: "Decision Pending",
  accepted: "Accepted",
  rejected: "Rejected",
  published: "Published",
};

function formatDate(iso: string): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default function EditorDashboard() {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [reviewers, setReviewers] = useState<Reviewer[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMs, setSelectedMs] = useState<number | null>(null);
  const [decision, setDecision] = useState("");
  const [decisionLetter, setDecisionLetter] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [searchQ, setSearchQ] = useState("");

  useEffect(() => {
    Promise.all([
      fetchEditorSubmissions().catch(() => []),
      fetchReviewers().catch(() => []),
    ]).then(([subs, revs]) => {
      setSubmissions(Array.isArray(subs) ? subs : subs.results || []);
      setReviewers(Array.isArray(revs) ? revs : revs.results || []);
    }).finally(() => setLoading(false));
  }, []);

  const submitted = submissions.filter((s) => s.status === "submitted");
  const screening = submissions.filter((s) => s.status === "screening");
  const underReview = submissions.filter((s) => s.status === "under_review");
  const revisionPending = submissions.filter((s) => s.status === "revision_required");
  const accepted = submissions.filter((s) => s.status === "accepted");

  const selectedSubmission = submissions.find((s) => s.id === selectedMs);

  const handleInvite = async (reviewerUserId: number) => {
    if (!selectedMs) return;
    setActionLoading(true);
    try {
      await inviteReviewer(selectedMs, { reviewer_user_id: reviewerUserId });
      alert("Reviewer invited successfully");
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : "Failed to invite reviewer");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDecision = async () => {
    if (!selectedMs || !decision) return;
    setActionLoading(true);
    try {
      await makeDecision(selectedMs, decision, decisionLetter);
      const updated = await fetchEditorSubmissions().catch(() => []);
      setSubmissions(Array.isArray(updated) ? updated : updated.results || []);
      setDecision("");
      setDecisionLetter("");
      alert("Decision sent successfully");
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : "Failed to send decision");
    } finally {
      setActionLoading(false);
    }
  };

  const handleWorkflowAction = async (action: () => Promise<unknown>, label: string) => {
    if (!selectedMs) return;
    setActionLoading(true);
    try {
      await action();
      const updated = await fetchEditorSubmissions().catch(() => []);
      setSubmissions(Array.isArray(updated) ? updated : (updated as { results?: Submission[] }).results || []);
      alert(`${label} successful`);
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : `Failed: ${label}`);
    } finally {
      setActionLoading(false);
    }
  };

  const filteredSubs = searchQ
    ? submissions.filter((s) =>
        s.title.toLowerCase().includes(searchQ.toLowerCase()) ||
        s.manuscript_id?.toLowerCase().includes(searchQ.toLowerCase())
      )
    : submissions;

  return (
    <PortalLayout role="Editor" name={user?.full_name || "Editor"} navItems={NAV} activePath={pathname}>
      <div className="mb-6">
        <div className="text-[11px] font-bold uppercase tracking-wider mb-1" style={{ color: GOLD }}>Editor Dashboard</div>
        <h1 className="text-2xl font-bold" style={{ color: NAVY, fontFamily: SERIF }}>Editorial Overview</h1>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
        <SummaryCard label="New Submissions" value={submitted.length} />
        <SummaryCard label="Technical Check" value={screening.length} />
        <SummaryCard label="Under Review" value={underReview.length} color="#7C3AED" />
        <SummaryCard label="Revisions Pending" value={revisionPending.length} color="#EA580C" />
        <SummaryCard label="Accepted" value={accepted.length} color="#16A34A" />
        <SummaryCard label="Total" value={submissions.length} color="#0D9488" />
      </div>

      <Card className="mb-6">
        <CardHeader
          title="Submissions"
          action={
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
          }
        />
        {loading ? (
          <div className="p-8 text-center text-sm" style={{ color: TEXT }}>Loading submissions...</div>
        ) : filteredSubs.length === 0 ? (
          <div className="p-8 text-center text-sm" style={{ color: TEXT }}>No submissions found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <Th>ID</Th>
                  <Th>Title</Th>
                  <Th>Type</Th>
                  <Th>Submitted</Th>
                  <Th>Author</Th>
                  <Th>Status</Th>
                  <Th>Actions</Th>
                </tr>
              </thead>
              <tbody>
                {filteredSubs.map((s) => (
                  <tr
                    key={s.id}
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => setSelectedMs(s.id)}
                    style={{ backgroundColor: selectedMs === s.id ? "rgba(195,154,59,0.04)" : undefined }}
                  >
                    <Td><span className="font-mono text-[11px] font-semibold" style={{ color: NAVY }}>{s.manuscript_id || `#${s.id}`}</span></Td>
                    <Td>
                      <div className="text-[12px] font-medium leading-snug" style={{ color: NAVY, maxWidth: "200px" }}>
                        {s.title || "Untitled"}
                      </div>
                    </Td>
                    <Td><span className="text-[12px]" style={{ color: TEXT }}>{s.article_type || "—"}</span></Td>
                    <Td><span className="text-[12px] whitespace-nowrap" style={{ color: TEXT }}>{formatDate(s.created_at)}</span></Td>
                    <Td><span className="text-[12px]" style={{ color: TEXT }}>{s.author_name || "—"}</span></Td>
                    <Td><StatusBadge status={STATUS_LABEL[s.status] || s.status} /></Td>
                    <Td>
                      <div className="flex gap-1.5 flex-wrap">
                        {s.status === "submitted" && (
                          <button type="button" disabled={actionLoading}
                            onClick={(e) => { e.stopPropagation(); setSelectedMs(s.id); handleWorkflowAction(() => startScreening(s.id), "Start screening"); }}
                            className="px-2.5 py-1 text-[11px] font-semibold rounded text-white transition-opacity hover:opacity-80 disabled:opacity-40"
                            style={{ backgroundColor: "#2563EB" }}>Screen</button>
                        )}
                        {s.status === "screening" && (
                          <button type="button" disabled={actionLoading}
                            onClick={(e) => { e.stopPropagation(); setSelectedMs(s.id); handleWorkflowAction(() => sendToReview(s.id), "Send to review"); }}
                            className="px-2.5 py-1 text-[11px] font-semibold rounded text-white transition-opacity hover:opacity-80 disabled:opacity-40"
                            style={{ backgroundColor: "#7C3AED" }}>To Review</button>
                        )}
                        {s.status === "under_review" && (
                          <button type="button" disabled={actionLoading}
                            onClick={(e) => { e.stopPropagation(); setSelectedMs(s.id); handleWorkflowAction(() => moveToDecision(s.id), "Move to decision"); }}
                            className="px-2.5 py-1 text-[11px] font-semibold rounded text-white transition-opacity hover:opacity-80 disabled:opacity-40"
                            style={{ backgroundColor: "#EA580C" }}>To Decision</button>
                        )}
                        {s.status === "decision_pending" && (
                          <button type="button"
                            onClick={(e) => { e.stopPropagation(); setSelectedMs(s.id); }}
                            className="px-2.5 py-1 text-[11px] font-semibold rounded text-white transition-opacity hover:opacity-80"
                            style={{ backgroundColor: NAVY }}>Decide</button>
                        )}
                        {s.status === "accepted" && (
                          <button type="button" disabled={actionLoading}
                            onClick={(e) => { e.stopPropagation(); setSelectedMs(s.id); handleWorkflowAction(() => publishSubmission(s.id), "Publish"); }}
                            className="px-2.5 py-1 text-[11px] font-semibold rounded text-white transition-opacity hover:opacity-80 disabled:opacity-40"
                            style={{ backgroundColor: "#16A34A" }}>Publish</button>
                        )}
                        {!["submitted","screening","under_review","decision_pending","accepted"].includes(s.status) && (
                          <GhostBtn onClick={(e?: React.MouseEvent) => { e?.stopPropagation(); setSelectedMs(s.id); }}>Select</GhostBtn>
                        )}
                      </div>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader title="Reviewer Assignment" />
          <div className="p-5 space-y-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5" style={{ color: NAVY }}>
                Selected Manuscript
              </label>
              <div className="text-[13px] p-3 rounded-lg" style={{ backgroundColor: LIGHT, color: selectedSubmission ? NAVY : TEXT }}>
                {selectedSubmission
                  ? `${selectedSubmission.manuscript_id || `#${selectedSubmission.id}`} — ${selectedSubmission.title}`
                  : "Select a submission from the table above"}
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: NAVY }}>Available Reviewers</label>
              {reviewers.length === 0 ? (
                <div className="text-[12px] p-3 text-center" style={{ color: TEXT }}>No reviewers available.</div>
              ) : (
                reviewers.slice(0, 5).map((r) => (
                  <div key={r.id} className="flex items-center justify-between p-3 rounded-lg mb-2 border" style={{ borderColor: BORDER }}>
                    <div>
                      <div className="text-[13px] font-semibold" style={{ color: NAVY }}>{r.full_name}</div>
                      <div className="text-[11px]" style={{ color: TEXT }}>{r.affiliation || r.email}</div>
                    </div>
                    <button
                      type="button"
                      disabled={!selectedMs || actionLoading}
                      onClick={() => handleInvite(r.id)}
                      className="text-[11px] font-semibold px-3 py-1.5 rounded text-white disabled:opacity-40"
                      style={{ backgroundColor: GOLD }}
                    >
                      Invite
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader title="Editorial Decision" />
          <div className="p-5 space-y-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: NAVY }}>Decision</label>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { d: "accept", label: "Accept", color: "#16A34A" },
                  { d: "revision_required", label: "Revision Required", color: "#EA580C" },
                  { d: "reject", label: "Reject", color: "#DC2626" },
                ].map(({ d, label, color }) => (
                  <label key={d} className="flex items-center gap-2.5 p-2.5 rounded-lg border cursor-pointer hover:bg-gray-50 transition-colors" style={{ borderColor: decision === d ? NAVY : BORDER }}>
                    <input type="radio" name="decision" value={d} checked={decision === d} onChange={() => setDecision(d)} />
                    <span className="text-sm font-semibold" style={{ color }}>{label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5" style={{ color: NAVY }}>Message to Author</label>
              <textarea
                rows={3}
                placeholder="Decision letter text to be shared with the author..."
                value={decisionLetter}
                onChange={(e) => setDecisionLetter(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white outline-none resize-none"
                style={{ borderColor: BORDER, color: NAVY }}
              />
            </div>
            <PrimaryBtn
              onClick={handleDecision}
              disabled={!selectedMs || !decision || actionLoading}
            >
              {actionLoading ? "Sending..." : "Send Decision"}
            </PrimaryBtn>
          </div>
        </Card>
      </div>
    </PortalLayout>
  );
}
