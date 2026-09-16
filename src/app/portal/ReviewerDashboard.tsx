import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { NavA } from "../shared";
import { useAuth } from "../AuthContext";
import { fetchReviewAssignments, acceptAssignment, declineAssignment } from "../api";
import {
  NAVY, GOLD, LIGHT, BORDER, TEXT, SERIF,
  PortalLayout, SummaryCard, StatusBadge,
  Card, CardHeader, GhostBtn, SidebarItem,
  Th, Td,
} from "./portalShared";

const NAV: SidebarItem[] = [
  { label: "Dashboard", to: "/portal/reviewer" },
  { label: "Review Assignments", to: "/portal/reviewer/assignments" },
  { label: "Completed Reviews", to: "/portal/reviewer/completed" },
  { label: "Resources", to: "/portal/reviewer/resources" },
  { label: "Messages", to: "/portal/reviewer/messages" },
  { label: "Profile", to: "/portal/reviewer/profile" },
];

const RESOURCES = [
  { label: "Reviewer Guidelines", to: "/reviewer-guidelines" },
  { label: "Peer Review Policy", to: "/peer-review-policy" },
  { label: "Conflict of Interest Policy", to: "/publication-ethics" },
  { label: "AI Use Policy", to: "/ai-use-policy" },
];

interface Assignment {
  id: number;
  submission_title: string;
  submission_manuscript_id: string;
  submission_article_type: string;
  status: string;
  due_date: string;
  created_at: string;
}

const ASSIGNMENT_STATUS: Record<string, string> = {
  invited: "Invitation Pending",
  accepted: "Review in Progress",
  completed: "Completed",
  declined: "Declined",
};

function formatDate(iso: string): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default function ReviewerDashboard() {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchReviewAssignments()
      .then((data) => {
        const list = Array.isArray(data) ? data : data.results || [];
        setAssignments(list);
      })
      .catch(() => setAssignments([]))
      .finally(() => setLoading(false));
  }, []);

  const userName = user?.full_name || "Reviewer";
  const pending = assignments.filter((a) => a.status === "invited");
  const active = assignments.filter((a) => a.status === "accepted");
  const completed = assignments.filter((a) => a.status === "completed");

  return (
    <PortalLayout role="Reviewer" name={userName} navItems={NAV} activePath={pathname}>
      <div className="mb-6">
        <div className="text-[11px] font-bold uppercase tracking-wider mb-1" style={{ color: GOLD }}>Reviewer Dashboard</div>
        <h1 className="text-2xl font-bold" style={{ color: NAVY, fontFamily: SERIF }}>Welcome, {userName}</h1>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <SummaryCard label="Pending Invitations" value={pending.length} color="#EA580C" />
        <SummaryCard label="Active Reviews" value={active.length} color="#7C3AED" />
        <SummaryCard label="Completed Reviews" value={completed.length} color="#16A34A" />
        <SummaryCard label="Total Assignments" value={assignments.length} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader title="Review Assignments" />
            {loading ? (
              <div className="p-8 text-center text-sm" style={{ color: TEXT }}>Loading assignments...</div>
            ) : assignments.filter((a) => a.status !== "completed").length === 0 ? (
              <div className="p-8 text-center text-sm" style={{ color: TEXT }}>
                No active review assignments.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <Th>ID</Th>
                      <Th>Title</Th>
                      <Th>Type</Th>
                      <Th>Due Date</Th>
                      <Th>Status</Th>
                      <Th>Action</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {assignments.filter((a) => a.status !== "completed").map((a) => (
                      <tr key={a.id} className="hover:bg-gray-50 transition-colors">
                        <Td><span className="font-mono text-[11px] font-semibold" style={{ color: NAVY }}>{a.submission_manuscript_id || `#${a.id}`}</span></Td>
                        <Td>
                          <div className="text-[12px] font-medium leading-snug" style={{ color: NAVY, maxWidth: "220px" }}>
                            {a.submission_title || "Untitled"}
                          </div>
                          <div className="text-[11px] mt-0.5" style={{ color: TEXT }}>Invited: {formatDate(a.created_at)}</div>
                        </Td>
                        <Td><span className="text-[12px]" style={{ color: TEXT }}>{a.submission_article_type || "—"}</span></Td>
                        <Td>
                          <span className="text-[12px] whitespace-nowrap font-semibold" style={{ color: NAVY }}>
                            {formatDate(a.due_date)}
                          </span>
                        </Td>
                        <Td><StatusBadge status={ASSIGNMENT_STATUS[a.status] || a.status} /></Td>
                        <Td>
                          {a.status === "invited" ? (
                            <div className="flex gap-1.5">
                              <button
                                type="button"
                                disabled={actionLoading}
                                onClick={async () => {
                                  setActionLoading(true);
                                  try {
                                    await acceptAssignment(a.id);
                                    const data = await fetchReviewAssignments();
                                    setAssignments(Array.isArray(data) ? data : data.results || []);
                                  } catch (e: unknown) {
                                    alert(e instanceof Error ? e.message : "Failed to accept");
                                  } finally {
                                    setActionLoading(false);
                                  }
                                }}
                                className="text-[11px] font-bold px-3 py-1.5 rounded text-white transition-opacity hover:opacity-80 disabled:opacity-40"
                                style={{ backgroundColor: "#16A34A" }}
                              >
                                Accept
                              </button>
                              <button
                                type="button"
                                disabled={actionLoading}
                                onClick={async () => {
                                  setActionLoading(true);
                                  try {
                                    await declineAssignment(a.id);
                                    const data = await fetchReviewAssignments();
                                    setAssignments(Array.isArray(data) ? data : data.results || []);
                                  } catch (e: unknown) {
                                    alert(e instanceof Error ? e.message : "Failed to decline");
                                  } finally {
                                    setActionLoading(false);
                                  }
                                }}
                                className="text-[11px] font-semibold px-3 py-1.5 rounded border transition-opacity hover:opacity-70 disabled:opacity-40"
                                style={{ color: "#DC2626", borderColor: "#FCA5A5" }}
                              >
                                Decline
                              </button>
                            </div>
                          ) : a.status === "accepted" ? (
                            <NavA
                              to={`/portal/reviewer/review?assignment=${a.id}`}
                              className="text-[11px] font-bold px-3 py-1.5 rounded text-white transition-opacity hover:opacity-80"
                              style={{ backgroundColor: GOLD }}
                            >
                              Write Review
                            </NavA>
                          ) : null}
                        </Td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>

          {completed.length > 0 && (
            <Card className="mt-5">
              <CardHeader title="Recently Completed Reviews" />
              <div className="divide-y" style={{ divideColor: BORDER }}>
                {completed.map((r) => (
                  <div key={r.id} className="px-5 py-3.5 flex items-center justify-between">
                    <div>
                      <div className="text-[12px] font-semibold" style={{ color: NAVY }}>{r.submission_manuscript_id}</div>
                      <div className="text-[11px]" style={{ color: TEXT }}>{r.submission_title}</div>
                    </div>
                    <StatusBadge status="Completed" />
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        <div className="space-y-5">
          <Card>
            <CardHeader title="Reviewer Resources" />
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

          {active.length > 0 && (
            <div className="rounded-xl p-5" style={{ backgroundColor: "rgba(195,154,59,0.06)", border: `1px solid ${BORDER}`, borderLeft: `4px solid ${GOLD}` }}>
              <div className="text-xs font-bold mb-2" style={{ color: NAVY }}>Review Deadline</div>
              <p className="text-[12px] leading-relaxed" style={{ color: TEXT }}>
                You have {active.length} active review{active.length > 1 ? "s" : ""}
                {active[0]?.due_date && (
                  <> due <strong style={{ color: NAVY }}>{formatDate(active[0].due_date)}</strong></>
                )}
                . Please submit your review on time to support the editorial process.
              </p>
            </div>
          )}
        </div>
      </div>
    </PortalLayout>
  );
}
