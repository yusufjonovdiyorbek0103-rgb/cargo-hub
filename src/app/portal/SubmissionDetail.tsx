import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { Clock, FileText, User } from "lucide-react";
import { useAuth } from "../AuthContext";
import { fetchSubmission } from "../api";
import {
  NAVY, GOLD, LIGHT, BORDER, TEXT, SERIF,
  PortalLayout, StatusBadge, Card, CardHeader, GhostBtn, SidebarItem,
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

const TIMELINE_STEPS = [
  "Submitted", "Technical Check", "Editor Screening",
  "Under Review", "Decision", "Copyediting", "Production", "Published",
];

const STATUS_TO_STAGE: Record<string, number> = {
  draft: -1,
  submitted: 0,
  screening: 1,
  under_review: 3,
  decision_pending: 4,
  revision_required: 4,
  accepted: 5,
  rejected: 4,
  published: 7,
};

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

const TABS = ["Overview", "Files", "Metadata", "Review", "Decisions", "Messages", "History"];

function formatDate(iso: string): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

interface SubmissionData {
  id: number;
  manuscript_id: string;
  title: string;
  abstract: string;
  keywords: string;
  article_type: string;
  language: string;
  status: string;
  created_at: string;
  updated_at: string;
  author_name: string;
  author_email: string;
  co_authors: Array<{ name: string; email: string; affiliation: string }>;
  manuscript_file_url: string | null;
  title_page_url: string | null;
  cover_letter_file_url: string | null;
  supplementary_file_url: string | null;
  running_title: string;
  english_title: string;
  english_abstract: string;
  english_keywords: string[];
  references: string;
  funding_info: string;
  data_availability_statement: string;
  conflict_of_interest: string;
  ai_use_disclosure: string;
  topic_area_name: string;
}

export default function SubmissionDetail() {
  const { pathname } = useLocation();
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("Overview");
  const [sub, setSub] = useState<SubmissionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    fetchSubmission(id)
      .then(setSub)
      .catch(() => setError("Failed to load submission"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <PortalLayout role="Author" name={user?.full_name || "Author"} navItems={NAV} activePath={pathname}>
        <div className="p-12 text-center text-sm" style={{ color: TEXT }}>Loading submission...</div>
      </PortalLayout>
    );
  }

  if (error || !sub) {
    return (
      <PortalLayout role="Author" name={user?.full_name || "Author"} navItems={NAV} activePath={pathname}>
        <div className="p-12 text-center text-sm" style={{ color: "#DC2626" }}>{error || "Submission not found"}</div>
      </PortalLayout>
    );
  }

  const currentStage = STATUS_TO_STAGE[sub.status] ?? 0;
  const statusLabel = STATUS_LABEL[sub.status] || sub.status;

  const coAuthorNames = sub.co_authors?.map((a) => a.name).join(", ") || "—";

  const files = [
    sub.manuscript_file_url && { name: "Anonymized Manuscript", url: sub.manuscript_file_url, type: "Required" },
    sub.title_page_url && { name: "Title Page", url: sub.title_page_url, type: "Required" },
    sub.cover_letter_file_url && { name: "Cover Letter", url: sub.cover_letter_file_url, type: "Optional" },
    sub.supplementary_file_url && { name: "Supplementary Files", url: sub.supplementary_file_url, type: "Optional" },
  ].filter(Boolean) as Array<{ name: string; url: string; type: string }>;

  return (
    <PortalLayout role="Author" name={user?.full_name || "Author"} navItems={NAV} activePath={pathname}>
      <div className="mb-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm font-mono font-bold" style={{ color: NAVY }}>{sub.manuscript_id || `#${sub.id}`}</span>
              <StatusBadge status={statusLabel} />
            </div>
            <h1
              className="text-xl font-bold leading-snug max-w-2xl"
              style={{ color: NAVY, fontFamily: SERIF }}
            >
              {sub.title || "Untitled Submission"}
            </h1>
          </div>
          {sub.manuscript_file_url && (
            <a href={sub.manuscript_file_url} target="_blank" rel="noreferrer">
              <GhostBtn>Download Manuscript</GhostBtn>
            </a>
          )}
        </div>
      </div>

      <Card className="p-5 mb-6 overflow-x-auto">
        <div className="flex items-center gap-0 min-w-max">
          {TIMELINE_STEPS.map((s, i) => (
            <div key={i} className="flex items-center">
              <div className="flex flex-col items-center gap-1">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold"
                  style={{
                    backgroundColor: i < currentStage ? GOLD : i === currentStage ? NAVY : LIGHT,
                    color: i <= currentStage ? "white" : TEXT,
                  }}
                >
                  {i < currentStage ? "✓" : i + 1}
                </div>
                <div
                  className="text-[9px] font-semibold text-center whitespace-nowrap"
                  style={{ color: i === currentStage ? NAVY : TEXT, maxWidth: "70px" }}
                >
                  {s}
                </div>
              </div>
              {i < TIMELINE_STEPS.length - 1 && (
                <div
                  className="h-0.5 mx-2 flex-shrink-0"
                  style={{ width: "28px", backgroundColor: i < currentStage ? GOLD : BORDER }}
                />
              )}
            </div>
          ))}
        </div>
      </Card>

      <div className="flex flex-wrap gap-0 mb-6 border-b" style={{ borderColor: BORDER }}>
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className="px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px"
            style={{
              color: activeTab === tab ? NAVY : TEXT,
              borderColor: activeTab === tab ? GOLD : "transparent",
              backgroundColor: "transparent",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Overview" && (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader title="Submission Overview" />
              <div className="divide-y" style={{ divideColor: BORDER }}>
                {[
                  { label: "Manuscript Title", value: sub.title },
                  { label: "Authors", value: coAuthorNames },
                  { label: "Corresponding Author", value: sub.author_email },
                  { label: "Article Type", value: sub.article_type || "—" },
                  { label: "Language", value: sub.language || "English" },
                  { label: "Submitted", value: formatDate(sub.created_at) },
                  { label: "Current Status", value: statusLabel },
                  { label: "Last Updated", value: formatDate(sub.updated_at) },
                  { label: "Subject Area", value: sub.topic_area_name || "—" },
                ].map((row) => (
                  <div key={row.label} className="px-5 py-3 flex flex-wrap gap-2">
                    <span className="text-[11px] font-bold w-44 flex-shrink-0" style={{ color: TEXT }}>{row.label}</span>
                    <span className="text-[13px]" style={{ color: NAVY }}>{row.value}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
          <div>
            <Card>
              <CardHeader title="Quick Info" />
              <div className="p-5 space-y-4">
                <div className="flex items-center gap-3 text-[12px]">
                  <Clock size={14} style={{ color: GOLD, flexShrink: 0 }} />
                  <span style={{ color: TEXT }}>Submitted {formatDate(sub.created_at)}</span>
                </div>
                <div className="flex items-center gap-3 text-[12px]">
                  <User size={14} style={{ color: GOLD, flexShrink: 0 }} />
                  <span style={{ color: TEXT }}>Author: {sub.author_name}</span>
                </div>
                <div className="flex items-center gap-3 text-[12px]">
                  <FileText size={14} style={{ color: GOLD, flexShrink: 0 }} />
                  <span style={{ color: TEXT }}>{files.length} file{files.length !== 1 ? "s" : ""} uploaded</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {activeTab === "Files" && (
        <Card>
          <CardHeader title="Uploaded Files" />
          {files.length === 0 ? (
            <div className="p-8 text-center text-sm" style={{ color: TEXT }}>No files uploaded yet.</div>
          ) : (
            <div className="divide-y" style={{ divideColor: BORDER }}>
              {files.map((f) => (
                <div key={f.name} className="px-5 py-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <FileText size={16} style={{ color: GOLD }} />
                    <div>
                      <div className="text-[13px] font-semibold" style={{ color: NAVY }}>{f.name}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded" style={{ color: TEXT, backgroundColor: LIGHT }}>{f.type}</span>
                    <a href={f.url} target="_blank" rel="noreferrer"><GhostBtn>Download</GhostBtn></a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      )}

      {activeTab === "Metadata" && (
        <Card>
          <CardHeader title="Submission Metadata" />
          <div className="divide-y p-0" style={{ divideColor: BORDER }}>
            {[
              { label: "Abstract", value: sub.abstract || "—" },
              { label: "Keywords", value: sub.keywords || "—" },
              { label: "Subject Area", value: sub.topic_area_name || "—" },
              { label: "Funding", value: sub.funding_info || "No funding declared" },
              { label: "Conflict of Interest", value: sub.conflict_of_interest || "No conflict of interest" },
              { label: "Data Availability", value: sub.data_availability_statement || "—" },
              { label: "AI Use Disclosure", value: sub.ai_use_disclosure || "—" },
            ].map((row) => (
              <div key={row.label} className="px-5 py-4">
                <div className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: GOLD }}>{row.label}</div>
                <div className="text-[13px] leading-relaxed" style={{ color: NAVY }}>{row.value}</div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {activeTab === "Review" && (
        <Card>
          <CardHeader title="Peer Review" />
          <div className="px-6 py-10 text-center">
            <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: LIGHT }}>
              <User size={20} style={{ color: TEXT }} />
            </div>
            <div className="text-sm font-semibold mb-2" style={{ color: NAVY }}>Under Editorial Review</div>
            <p className="text-[13px] max-w-sm mx-auto" style={{ color: TEXT }}>
              The manuscript is currently under editorial or peer review. Reviewer identities are confidential and will not be disclosed.
            </p>
          </div>
        </Card>
      )}

      {activeTab === "Messages" && (
        <Card>
          <CardHeader title="Messages" action={<GhostBtn>New Message</GhostBtn>} />
          <div className="px-6 py-10 text-center">
            <p className="text-sm" style={{ color: TEXT }}>No messages yet. The editorial office will contact you if additional information is required.</p>
          </div>
        </Card>
      )}

      {activeTab === "History" && (
        <Card>
          <CardHeader title="Activity History" />
          <div className="p-5 space-y-4">
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-2 h-2 rounded-full mt-1 flex-shrink-0" style={{ backgroundColor: GOLD }} />
              </div>
              <div className="pb-4">
                <div className="text-[11px] mb-0.5" style={{ color: TEXT }}>{formatDate(sub.created_at)}</div>
                <div className="text-[13px]" style={{ color: NAVY }}>Submission created by author.</div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {activeTab === "Decisions" && (
        <Card>
          <CardHeader title="Editorial Decisions" />
          <div className="px-6 py-10 text-center">
            <p className="text-sm" style={{ color: TEXT }}>No editorial decisions have been made yet. You will be notified when a decision is available.</p>
          </div>
        </Card>
      )}
    </PortalLayout>
  );
}
