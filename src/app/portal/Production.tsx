import { useState } from "react";
import { useLocation } from "react-router";
import { CheckCircle, FileText, Send } from "lucide-react";
import {
  NAVY, GOLD, LIGHT, BORDER, TEXT, SERIF,
  PortalLayout, StatusBadge, Card, CardHeader, PrimaryBtn, GhostBtn, SidebarItem,
} from "./portalShared";

const NAV: SidebarItem[] = [
  { label: "Dashboard", to: "/portal/editor" },
  { label: "Submissions", to: "/portal/editor/submissions" },
  { label: "Reviewer Assignments", to: "/portal/editor/reviewers" },
  { label: "Decisions", to: "/portal/editor/decisions" },
  { label: "Production Queue", to: "/portal/production", badge: 4 },
  { label: "Issues", to: "/portal/editor/issues" },
  { label: "Messages", to: "/portal/editor/messages" },
  { label: "Editorial Board", to: "/editorial-board" },
];

const WORKFLOW = [
  "Accepted",
  "Copyediting",
  "Author Proof Review",
  "Layout Production",
  "DOI Assignment",
  "Issue Assignment",
  "Published",
];

const CHECKLIST_ITEMS = [
  { label: "Final manuscript received", done: true },
  { label: "Copyediting completed", done: true },
  { label: "Author proof sent", done: true },
  { label: "Author corrections received", done: false },
  { label: "Final PDF prepared", done: false },
  { label: "HTML version prepared", done: false },
  { label: "DOI metadata prepared", done: false },
  { label: "License added", done: false },
  { label: "Article page created", done: false },
  { label: "Issue assigned", done: false },
  { label: "Published online", done: false },
];

const FILES = [
  { name: "Copyedited Manuscript", file: "cajaidt-2027-002-copyedited.docx", status: "Available", size: "312 KB" },
  { name: "Author Proof", file: "cajaidt-2027-002-proof.pdf", status: "Sent to Author", size: "445 KB" },
  { name: "Final PDF", file: "—", status: "Pending", size: "—" },
  { name: "HTML Galley", file: "—", status: "Pending", size: "—" },
];

export default function Production() {
  const { pathname } = useLocation();
  const [checklist, setChecklist] = useState(CHECKLIST_ITEMS.map(i => i.done));
  const currentStage = 2;

  const toggle = (i: number) => setChecklist(prev => prev.map((v, idx) => idx === i ? !v : v));
  const done = checklist.filter(Boolean).length;

  return (
    <PortalLayout role="Editor" name="Editor Name" navItems={NAV} activePath={pathname}>
      {/* Header */}
      <div className="mb-6">
        <div className="text-[11px] font-bold uppercase tracking-wider mb-1" style={{ color: GOLD }}>
          Production
        </div>
        <h1 className="text-2xl font-bold mb-2" style={{ color: NAVY, fontFamily: SERIF }}>
          Copyediting & Production
        </h1>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-mono font-bold" style={{ color: NAVY }}>CAJAIDT-2027-002</span>
          <StatusBadge status="Accepted / In Copyediting" />
        </div>
        <h2
          className="text-base font-semibold mt-2 max-w-2xl leading-snug"
          style={{ color: TEXT }}
        >
          Human-Centered AI and UX Analytics in Digital Learning Platforms
        </h2>
      </div>

      {/* Workflow timeline */}
      <Card className="p-5 mb-6 overflow-x-auto">
        <div className="flex items-center gap-0 min-w-max">
          {WORKFLOW.map((s, i) => (
            <div key={i} className="flex items-center">
              <div className="flex flex-col items-center gap-1">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    backgroundColor: i < currentStage ? GOLD : i === currentStage ? NAVY : LIGHT,
                    color: i <= currentStage ? "white" : TEXT,
                  }}
                >
                  {i < currentStage ? "✓" : i + 1}
                </div>
                <div
                  className="text-[9px] font-semibold text-center"
                  style={{ color: i === currentStage ? NAVY : TEXT, maxWidth: "72px" }}
                >
                  {s}
                </div>
              </div>
              {i < WORKFLOW.length - 1 && (
                <div className="h-0.5 mx-2 flex-shrink-0" style={{ width: "32px", backgroundColor: i < currentStage ? GOLD : BORDER }} />
              )}
            </div>
          ))}
        </div>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          {/* Production checklist */}
          <Card>
            <CardHeader title={`Production Checklist — ${done} of ${checklist.length} completed`} />
            <div className="p-5 space-y-2">
              {CHECKLIST_ITEMS.map((item, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => toggle(i)}
                  className="w-full flex items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors hover:bg-gray-50"
                  style={{
                    backgroundColor: checklist[i] ? "rgba(195,154,59,0.04)" : "white",
                    border: `1px solid ${checklist[i] ? GOLD : BORDER}`,
                  }}
                >
                  <div
                    className="w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-colors"
                    style={{
                      borderColor: checklist[i] ? GOLD : BORDER,
                      backgroundColor: checklist[i] ? GOLD : "white",
                    }}
                  >
                    {checklist[i] && <CheckCircle size={12} color="white" />}
                  </div>
                  <span
                    className="text-[13px]"
                    style={{
                      color: checklist[i] ? TEXT : NAVY,
                      textDecoration: checklist[i] ? "line-through" : undefined,
                    }}
                  >
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
            {/* Progress bar */}
            <div className="px-5 pb-5">
              <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: LIGHT }}>
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${(done / checklist.length) * 100}%`, backgroundColor: GOLD }}
                />
              </div>
            </div>
          </Card>

          {/* Files */}
          <Card>
            <CardHeader title="Production Files" action={<GhostBtn>Upload File</GhostBtn>} />
            <div className="divide-y" style={{ divideColor: BORDER }}>
              {FILES.map((f) => (
                <div key={f.name} className="px-5 py-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: f.status === "Pending" ? LIGHT : "rgba(195,154,59,0.09)" }}
                    >
                      <FileText size={16} style={{ color: f.status === "Pending" ? TEXT : GOLD }} />
                    </div>
                    <div>
                      <div className="text-[13px] font-semibold" style={{ color: NAVY }}>{f.name}</div>
                      <div className="text-[11px]" style={{ color: TEXT }}>{f.file} {f.size !== "—" ? `· ${f.size}` : ""}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{
                        color: f.status === "Available" || f.status === "Sent to Author" ? GOLD : TEXT,
                        backgroundColor: f.status === "Pending" ? LIGHT : "rgba(195,154,59,0.09)",
                      }}
                    >
                      {f.status}
                    </span>
                    {f.status !== "Pending" && <GhostBtn>Download</GhostBtn>}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Metadata */}
          <Card>
            <CardHeader title="Article Metadata" />
            <div className="divide-y" style={{ divideColor: BORDER }}>
              {[
                { label: "Final Title", value: "Human-Centered AI and UX Analytics in Digital Learning Platforms" },
                { label: "Authors", value: "Author Name 1, Author Name 2" },
                { label: "Affiliations", value: "Institution, Country" },
                { label: "DOI", value: "To be assigned" },
                { label: "Pages", value: "To be assigned" },
                { label: "License", value: "Planned open-access license" },
                { label: "Volume / Issue", value: "Volume 1, Issue 1 — To be assigned" },
              ].map((row) => (
                <div key={row.label} className="px-5 py-3 flex flex-wrap gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider w-36 flex-shrink-0 pt-0.5" style={{ color: GOLD }}>{row.label}</span>
                  <span className="text-[13px]" style={{ color: NAVY }}>{row.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Editor actions */}
        <div>
          <Card>
            <CardHeader title="Editor Actions" />
            <div className="p-5 space-y-3">
              {[
                { label: "Send Proof to Author", icon: <Send size={14} />, primary: true },
                { label: "Mark Copyediting Complete", icon: <CheckCircle size={14} />, primary: false },
                { label: "Assign DOI", icon: <span className="text-[11px] font-bold">DOI</span>, primary: false },
                { label: "Assign to Issue", icon: <FileText size={14} />, primary: false },
                { label: "Publish Article", icon: <CheckCircle size={14} />, primary: false },
              ].map((action) => (
                <button
                  key={action.label}
                  type="button"
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-semibold rounded-lg border transition-opacity hover:opacity-80"
                  style={{
                    backgroundColor: action.primary ? GOLD : "white",
                    color: action.primary ? "white" : NAVY,
                    borderColor: action.primary ? GOLD : BORDER,
                  }}
                >
                  {action.icon}
                  {action.label}
                </button>
              ))}
            </div>
          </Card>

          <div className="mt-5 rounded-xl p-4" style={{ backgroundColor: LIGHT, border: `1px solid ${BORDER}` }}>
            <div className="text-xs font-bold mb-2" style={{ color: NAVY }}>Progress</div>
            <div className="text-2xl font-bold mb-1" style={{ color: GOLD }}>
              {Math.round((done / checklist.length) * 100)}%
            </div>
            <div className="text-[11px]" style={{ color: TEXT }}>{done} of {checklist.length} steps completed</div>
            <div className="h-2 rounded-full mt-3 overflow-hidden" style={{ backgroundColor: BORDER }}>
              <div
                className="h-full rounded-full"
                style={{ width: `${(done / checklist.length) * 100}%`, backgroundColor: GOLD }}
              />
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
