import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useAuth } from "../AuthContext";
import { fetchReviewAssignments } from "../api";
import {
  NAVY, GOLD, BORDER, TEXT, SERIF,
  PortalLayout, StatusBadge, Card, CardHeader, SidebarItem, Th, Td,
} from "./portalShared";

const NAV: SidebarItem[] = [
  { label: "Dashboard", to: "/portal/reviewer" },
  { label: "Review Assignments", to: "/portal/reviewer/assignments" },
  { label: "Completed Reviews", to: "/portal/reviewer/completed" },
  { label: "Resources", to: "/portal/reviewer/resources" },
  { label: "Messages", to: "/portal/reviewer/messages" },
  { label: "Profile", to: "/portal/reviewer/profile" },
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

function formatDate(iso: string): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default function ReviewerCompleted() {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviewAssignments()
      .then((data) => {
        const list = Array.isArray(data) ? data : data.results || [];
        setAssignments(list.filter((a: Assignment) => a.status === "review_submitted"));
      })
      .catch(() => setAssignments([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PortalLayout role="Reviewer" name={user?.full_name || "Reviewer"} navItems={NAV} activePath={pathname}>
      <div className="mb-6">
        <div className="text-[11px] font-bold uppercase tracking-wider mb-1" style={{ color: GOLD }}>Reviewer Portal</div>
        <h1 className="text-2xl font-bold" style={{ color: NAVY, fontFamily: SERIF }}>Completed Reviews</h1>
      </div>

      <Card>
        <CardHeader title="Review History" />
        {loading ? (
          <div className="p-8 text-center text-sm" style={{ color: TEXT }}>Loading...</div>
        ) : assignments.length === 0 ? (
          <div className="p-8 text-center text-sm" style={{ color: TEXT }}>No completed reviews yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <Th>Manuscript ID</Th>
                  <Th>Title</Th>
                  <Th>Type</Th>
                  <Th>Completed</Th>
                  <Th>Status</Th>
                </tr>
              </thead>
              <tbody>
                {assignments.map((a) => (
                  <tr key={a.id} className="hover:bg-gray-50 transition-colors">
                    <Td><span className="font-mono text-[11px] font-semibold" style={{ color: NAVY }}>{a.submission_manuscript_id || `#${a.id}`}</span></Td>
                    <Td>
                      <div className="text-[12px] font-medium leading-snug" style={{ color: NAVY, maxWidth: "250px" }}>
                        {a.submission_title || "Untitled"}
                      </div>
                    </Td>
                    <Td><span className="text-[12px]" style={{ color: TEXT }}>{a.submission_article_type || "—"}</span></Td>
                    <Td><span className="text-[12px]" style={{ color: TEXT }}>{formatDate(a.due_date || a.created_at)}</span></Td>
                    <Td><StatusBadge status="Completed" /></Td>
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
