import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Plus, FileText, GripVertical } from "lucide-react";
import { useAuth } from "../AuthContext";
import { fetchEditorIssues, fetchAcceptedSubmissions, createEditorIssue } from "../api";
import {
  NAVY, GOLD, LIGHT, BORDER, TEXT, SERIF,
  PortalLayout, Card, CardHeader, PrimaryBtn, SidebarItem,
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

interface IssueArticle {
  id: number;
  title: string;
  doi: string;
  author_name: string;
  issue_order: number;
  page_start: number | null;
  page_end: number | null;
  status: string;
}

interface JournalIssue {
  id: number;
  title: string;
  volume: number;
  issue_number: number;
  publication_year: number;
  publication_date: string | null;
  full_issue_pdf_url: string | null;
  articles: IssueArticle[];
  created_at: string;
}

interface AcceptedSubmission {
  id: number;
  title: string;
  author_name: string;
  manuscript_pdf_url: string | null;
  manuscript_page_count: number | null;
  is_already_assigned: boolean;
  status: string;
}

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default function EditorIssues() {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const [issues, setIssues] = useState<JournalIssue[]>([]);
  const [accepted, setAccepted] = useState<AcceptedSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<JournalIssue | null>(null);

  const [newTitle, setNewTitle] = useState("");
  const [newVolume, setNewVolume] = useState("1");
  const [newIssueNum, setNewIssueNum] = useState("1");
  const [newYear, setNewYear] = useState(String(new Date().getFullYear()));
  const [selectedArticles, setSelectedArticles] = useState<number[]>([]);

  useEffect(() => {
    Promise.all([
      fetchEditorIssues().catch(() => []),
      fetchAcceptedSubmissions().catch(() => []),
    ]).then(([iss, acc]) => {
      const issueList = Array.isArray(iss) ? iss : iss.results || [];
      const accList = Array.isArray(acc) ? acc : acc.results || [];
      setIssues(issueList);
      setAccepted(accList);
    }).finally(() => setLoading(false));
  }, []);

  const toggleArticle = (id: number) => {
    setSelectedArticles((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleCreate = async () => {
    if (!newTitle || selectedArticles.length === 0) {
      alert("Please provide a title and select at least one article.");
      return;
    }
    setCreating(true);
    try {
      const data = {
        title: newTitle,
        volume: Number(newVolume),
        issue_number: Number(newIssueNum),
        publication_year: Number(newYear),
        articles: selectedArticles.map((sid, i) => ({
          submission_id: sid,
          order: i + 1,
        })),
      };
      await createEditorIssue(data);
      alert("Issue created successfully");
      setShowCreate(false);
      setNewTitle("");
      setSelectedArticles([]);
      setLoading(true);
      const [iss, acc] = await Promise.all([
        fetchEditorIssues().catch(() => []),
        fetchAcceptedSubmissions().catch(() => []),
      ]);
      setIssues(Array.isArray(iss) ? iss : iss.results || []);
      setAccepted(Array.isArray(acc) ? acc : acc.results || []);
      setLoading(false);
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : "Failed to create issue");
    } finally {
      setCreating(false);
    }
  };

  const availableArticles = accepted.filter((a) => !a.is_already_assigned);

  return (
    <PortalLayout role="Editor" name={user?.full_name || "Editor"} navItems={NAV} activePath={pathname}>
      <div className="mb-6 flex items-start justify-between">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider mb-1" style={{ color: GOLD }}>Editor Portal</div>
          <h1 className="text-2xl font-bold" style={{ color: NAVY, fontFamily: SERIF }}>Journal Issues</h1>
        </div>
        <button
          onClick={() => setShowCreate(!showCreate)}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white rounded-lg transition-opacity hover:opacity-90"
          style={{ backgroundColor: GOLD }}
        >
          <Plus size={15} /> New Issue
        </button>
      </div>

      {showCreate && (
        <Card className="mb-6">
          <CardHeader title="Create New Issue" />
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5" style={{ color: NAVY }}>Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Volume 1, Issue 1"
                  className="w-full px-3 py-2 text-sm rounded-lg border bg-white outline-none"
                  style={{ borderColor: BORDER, color: NAVY }}
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5" style={{ color: NAVY }}>Volume</label>
                <input
                  type="number"
                  min="1"
                  value={newVolume}
                  onChange={(e) => setNewVolume(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border bg-white outline-none"
                  style={{ borderColor: BORDER, color: NAVY }}
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5" style={{ color: NAVY }}>Issue Number</label>
                <input
                  type="number"
                  min="1"
                  value={newIssueNum}
                  onChange={(e) => setNewIssueNum(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border bg-white outline-none"
                  style={{ borderColor: BORDER, color: NAVY }}
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5" style={{ color: NAVY }}>Year</label>
                <input
                  type="number"
                  min="2024"
                  value={newYear}
                  onChange={(e) => setNewYear(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border bg-white outline-none"
                  style={{ borderColor: BORDER, color: NAVY }}
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: NAVY }}>
                Select Articles ({selectedArticles.length} selected)
              </label>
              {availableArticles.length === 0 ? (
                <div className="text-[12px] p-4 text-center rounded-lg" style={{ backgroundColor: LIGHT, color: TEXT }}>
                  No accepted submissions available for assignment.
                </div>
              ) : (
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {availableArticles.map((a) => (
                    <label
                      key={a.id}
                      className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-gray-50 transition-colors"
                      style={{ borderColor: selectedArticles.includes(a.id) ? GOLD : BORDER }}
                    >
                      <input
                        type="checkbox"
                        checked={selectedArticles.includes(a.id)}
                        onChange={() => toggleArticle(a.id)}
                      />
                      <GripVertical size={14} style={{ color: BORDER }} />
                      <div className="flex-1 min-w-0">
                        <div className="text-[12px] font-medium truncate" style={{ color: NAVY }}>{a.title}</div>
                        <div className="text-[11px]" style={{ color: TEXT }}>
                          {a.author_name} {a.manuscript_page_count ? `• ${a.manuscript_page_count} pages` : ""}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <PrimaryBtn onClick={handleCreate} disabled={creating || !newTitle || selectedArticles.length === 0}>
                {creating ? "Creating..." : "Create Issue"}
              </PrimaryBtn>
              <button
                onClick={() => setShowCreate(false)}
                className="px-4 py-2 text-sm font-medium rounded border"
                style={{ color: TEXT, borderColor: BORDER }}
              >
                Cancel
              </button>
            </div>
          </div>
        </Card>
      )}

      {loading ? (
        <div className="p-8 text-center text-sm" style={{ color: TEXT }}>Loading issues...</div>
      ) : issues.length === 0 ? (
        <Card>
          <div className="p-8 text-center">
            <FileText size={40} className="mx-auto mb-3" style={{ color: BORDER }} />
            <div className="text-sm font-medium mb-1" style={{ color: NAVY }}>No Issues Yet</div>
            <div className="text-[12px]" style={{ color: TEXT }}>Create your first journal issue by clicking "New Issue" above.</div>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {issues.map((issue) => (
            <Card key={issue.id}>
              <div
                className="px-6 py-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setSelectedIssue(selectedIssue?.id === issue.id ? null : issue)}
              >
                <div>
                  <div className="text-[13px] font-bold" style={{ color: NAVY }}>
                    {issue.title}
                  </div>
                  <div className="text-[11px] mt-0.5" style={{ color: TEXT }}>
                    Vol. {issue.volume}, No. {issue.issue_number} ({issue.publication_year})
                    &nbsp;• {issue.articles?.length || 0} articles
                    &nbsp;• Created {formatDate(issue.created_at)}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {issue.full_issue_pdf_url && (
                    <a
                      href={issue.full_issue_pdf_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold px-3 py-1.5 rounded text-white"
                      style={{ backgroundColor: NAVY }}
                    >
                      <FileText size={12} /> PDF
                    </a>
                  )}
                  <span className="text-[12px]" style={{ color: TEXT }}>
                    {selectedIssue?.id === issue.id ? "▲" : "▼"}
                  </span>
                </div>
              </div>

              {selectedIssue?.id === issue.id && issue.articles && issue.articles.length > 0 && (
                <div className="border-t overflow-x-auto" style={{ borderColor: BORDER }}>
                  <table className="w-full">
                    <thead>
                      <tr>
                        <Th>#</Th>
                        <Th>Title</Th>
                        <Th>Author</Th>
                        <Th>DOI</Th>
                        <Th>Pages</Th>
                      </tr>
                    </thead>
                    <tbody>
                      {issue.articles.map((a) => (
                        <tr key={a.id} className="hover:bg-gray-50">
                          <Td><span className="text-[12px] font-mono" style={{ color: NAVY }}>{a.issue_order}</span></Td>
                          <Td>
                            <div className="text-[12px] font-medium" style={{ color: NAVY, maxWidth: "250px" }}>
                              {a.title}
                            </div>
                          </Td>
                          <Td><span className="text-[12px]" style={{ color: TEXT }}>{a.author_name || "—"}</span></Td>
                          <Td><span className="text-[11px] font-mono" style={{ color: TEXT }}>{a.doi || "—"}</span></Td>
                          <Td>
                            <span className="text-[12px]" style={{ color: TEXT }}>
                              {a.page_start && a.page_end ? `${a.page_start}–${a.page_end}` : "—"}
                            </span>
                          </Td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </PortalLayout>
  );
}
