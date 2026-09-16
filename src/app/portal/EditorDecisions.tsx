import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useAuth } from "../AuthContext";
import { fetchEditorSubmissions, makeDecision } from "../api";
import {
  NAVY, GOLD, LIGHT, BORDER, TEXT, SERIF,
  PortalLayout, StatusBadge, SummaryCard,
  Card, CardHeader, PrimaryBtn, SidebarItem,
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
  updated_at: string;
  author_name: string;
  editorial_decision: string | null;
  decision_letter: string | null;
}

const STATUS_LABEL: Record<string, string> = {
  decision_pending: "Decision Pending",
  accepted: "Accepted",
  rejected: "Rejected",
  revision_required: "Revision Required",
  published: "Published",
};

function formatDate(iso: string): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default function EditorDecisions() {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [decision, setDecision] = useState("");
  const [decisionLetter, setDecisionLetter] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [tab, setTab] = useState<"pending" | "decided">("pending");

  const reload = () => {
    setLoading(true);
    fetchEditorSubmissions()
      .then((data) => {
        const list = Array.isArray(data) ? data : data.results || [];
        setSubmissions(list);
      })
      .catch(() => setSubmissions([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => { reload(); }, []);

  const pending = submissions.filter((s) => s.status === "decision_pending");
  const decided = submissions.filter((s) => ["accepted", "rejected", "revision_required"].includes(s.status));
  const displayed = tab === "pending" ? pending : decided;

  const selected = submissions.find((s) => s.id === selectedId);

  const handleDecision = async () => {
    if (!selectedId || !decision) return;
    setActionLoading(true);
    try {
      await makeDecision(selectedId, decision, decisionLetter);
      setDecision("");
      setDecisionLetter("");
      setSelectedId(null);
      reload();
      alert("Decision sent successfully");
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : "Failed to send decision");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <PortalLayout role="Editor" name={user?.full_name || "Editor"} navItems={NAV} activePath={pathname}>
      <div className="mb-6">
        <div className="text-[11px] font-bold uppercase tracking-wider mb-1" style={{ color: GOLD }}>Editor Portal</div>
        <h1 className="text-2xl font-bold" style={{ color: NAVY, fontFamily: SERIF }}>Editorial Decisions</h1>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <SummaryCard label="Pending Decision" value={pending.length} color="#EA580C" />
        <SummaryCard label="Accepted" value={submissions.filter((s) => s.status === "accepted").length} color="#16A34A" />
        <SummaryCard label="Revision Required" value={submissions.filter((s) => s.status === "revision_required").length} color="#EA580C" />
        <SummaryCard label="Rejected" value={submissions.filter((s) => s.status === "rejected").length} color="#DC2626" />
      </div>

      <div className="flex gap-2 mb-4">
        {(["pending", "decided"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="px-4 py-2 text-[12px] font-semibold rounded-lg transition-colors"
            style={{
              backgroundColor: tab === t ? NAVY : "white",
              color: tab === t ? "white" : NAVY,
              border: `1px solid ${tab === t ? NAVY : BORDER}`,
            }}
          >
            {t === "pending" ? `Pending (${pending.length})` : `Decided (${decided.length})`}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader title={tab === "pending" ? "Manuscripts Awaiting Decision" : "Decision History"} />
            {loading ? (
              <div className="p-8 text-center text-sm" style={{ color: TEXT }}>Loading...</div>
            ) : displayed.length === 0 ? (
              <div className="p-8 text-center text-sm" style={{ color: TEXT }}>
                {tab === "pending" ? "No submissions awaiting decision." : "No decisions recorded yet."}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <Th>ID</Th>
                      <Th>Title</Th>
                      <Th>Author</Th>
                      <Th>Date</Th>
                      <Th>Status</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayed.map((s) => (
                      <tr
                        key={s.id}
                        className="hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => setSelectedId(s.id)}
                        style={{ backgroundColor: selectedId === s.id ? "rgba(195,154,59,0.04)" : undefined }}
                      >
                        <Td><span className="font-mono text-[11px] font-semibold" style={{ color: NAVY }}>{s.manuscript_id || `#${s.id}`}</span></Td>
                        <Td>
                          <div className="text-[12px] font-medium leading-snug" style={{ color: NAVY, maxWidth: "200px" }}>
                            {s.title || "Untitled"}
                          </div>
                        </Td>
                        <Td><span className="text-[12px]" style={{ color: TEXT }}>{s.author_name || "—"}</span></Td>
                        <Td><span className="text-[12px] whitespace-nowrap" style={{ color: TEXT }}>{formatDate(s.updated_at)}</span></Td>
                        <Td><StatusBadge status={STATUS_LABEL[s.status] || s.status} /></Td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader title="Make Decision" />
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5" style={{ color: NAVY }}>
                  Selected Manuscript
                </label>
                <div className="text-[13px] p-3 rounded-lg" style={{ backgroundColor: LIGHT, color: selected ? NAVY : TEXT }}>
                  {selected
                    ? `${selected.manuscript_id || `#${selected.id}`} — ${selected.title}`
                    : "Select a submission from the table"}
                </div>
              </div>

              {selected && selected.status !== "decision_pending" && (
                <div className="text-[12px] p-3 rounded-lg" style={{ backgroundColor: "#F0FDF4", color: "#16A34A" }}>
                  Decision already made: <strong>{STATUS_LABEL[selected.status] || selected.status}</strong>
                  {selected.decision_letter && (
                    <div className="mt-2 text-[11px]" style={{ color: TEXT }}>
                      {selected.decision_letter}
                    </div>
                  )}
                </div>
              )}

              {selected && selected.status === "decision_pending" && (
                <>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: NAVY }}>Decision</label>
                    <div className="space-y-2">
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
                    <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5" style={{ color: NAVY }}>Decision Letter</label>
                    <textarea
                      rows={4}
                      placeholder="Message to the author..."
                      value={decisionLetter}
                      onChange={(e) => setDecisionLetter(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white outline-none resize-none"
                      style={{ borderColor: BORDER, color: NAVY }}
                    />
                  </div>
                  <PrimaryBtn
                    onClick={handleDecision}
                    disabled={!decision || actionLoading}
                  >
                    {actionLoading ? "Sending..." : "Send Decision"}
                  </PrimaryBtn>
                </>
              )}
            </div>
          </Card>
        </div>
      </div>
    </PortalLayout>
  );
}
