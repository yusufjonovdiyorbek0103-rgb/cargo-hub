import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { NavA } from "../shared";
import { useAuth } from "../AuthContext";
import { fetchSubmissions } from "../api";
import {
  NAVY, GOLD, TEXT, SERIF,
  PortalLayout, StatusBadge, Card, CardHeader, SidebarItem, Th, Td,
} from "./portalShared";

const NAV: SidebarItem[] = [
  { label: "Dashboard", to: "/portal/author" },
  { label: "New Submission", to: "/portal/author/submit" },
  { label: "My Submissions", to: "/portal/author/submissions" },
  { label: "Revisions", to: "/portal/author/revisions" },
  { label: "Messages", to: "/portal/author/messages" },
  { label: "Profile", to: "/portal/author/profile" },
  { label: "Help Center", to: "/portal/author/help" },
];

interface Submission {
  id: number;
  manuscript_id: string;
  title: string;
  status: string;
  updated_at: string;
}

function formatDate(iso: string): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default function AuthorRevisions() {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const [revisions, setRevisions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions()
      .then((data) => {
        const list = Array.isArray(data) ? data : data.results || [];
        setRevisions(list.filter((s: Submission) => s.status === "revision_required"));
      })
      .catch(() => setRevisions([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PortalLayout role="Author" name={user?.full_name || "Author"} navItems={NAV} activePath={pathname}>
      <div className="mb-6">
        <div className="text-[11px] font-bold uppercase tracking-wider mb-1" style={{ color: GOLD }}>Author Portal</div>
        <h1 className="text-2xl font-bold" style={{ color: NAVY, fontFamily: SERIF }}>Revisions Required</h1>
      </div>

      <Card>
        <CardHeader title="Manuscripts Requiring Revision" />
        {loading ? (
          <div className="p-8 text-center text-sm" style={{ color: TEXT }}>Loading...</div>
        ) : revisions.length === 0 ? (
          <div className="p-8 text-center text-sm" style={{ color: TEXT }}>No revisions required at this time.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <Th>Manuscript ID</Th>
                  <Th>Title</Th>
                  <Th>Last Updated</Th>
                  <Th>Status</Th>
                  <Th>Action</Th>
                </tr>
              </thead>
              <tbody>
                {revisions.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                    <Td><span className="font-mono text-[11px] font-semibold" style={{ color: NAVY }}>{s.manuscript_id || `#${s.id}`}</span></Td>
                    <Td>
                      <div className="text-[12px] font-medium leading-snug" style={{ color: NAVY, maxWidth: "250px" }}>
                        {s.title || "Untitled"}
                      </div>
                    </Td>
                    <Td><span className="text-[12px]" style={{ color: TEXT }}>{formatDate(s.updated_at)}</span></Td>
                    <Td><StatusBadge status="Revision Required" /></Td>
                    <Td>
                      <NavA
                        to={`/portal/author/submit?revision=${s.id}`}
                        className="text-[11px] font-bold px-3 py-1.5 rounded text-white transition-opacity hover:opacity-80"
                        style={{ backgroundColor: GOLD }}
                      >
                        Submit Revision
                      </NavA>
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
