import { useState } from "react";
import { useLocation } from "react-router";
import { Mail, Bell } from "lucide-react";
import {
  NAVY, GOLD, LIGHT, BORDER, TEXT, SERIF,
  PortalLayout, Card, CardHeader, GhostBtn, SidebarItem, StatusBadge,
} from "./portalShared";

const AUTHOR_NAV: SidebarItem[] = [
  { label: "Dashboard", to: "/portal/author" },
  { label: "New Submission", to: "/portal/author/submit" },
  { label: "My Submissions", to: "/portal/author/submissions" },
  { label: "Revisions", to: "/portal/author/revisions" },
  { label: "Messages", to: "/portal/author/messages" },
  { label: "Profile", to: "/portal/author/profile" },
  { label: "Help", to: "/portal/author/help" },
];

const REVIEWER_NAV: SidebarItem[] = [
  { label: "Dashboard", to: "/portal/reviewer" },
  { label: "Review Assignments", to: "/portal/reviewer/assignments" },
  { label: "Completed Reviews", to: "/portal/reviewer/completed" },
  { label: "Resources", to: "/portal/reviewer/resources" },
  { label: "Messages", to: "/portal/reviewer/messages" },
  { label: "Profile", to: "/portal/reviewer/profile" },
];

const EDITOR_NAV: SidebarItem[] = [
  { label: "Dashboard", to: "/portal/editor" },
  { label: "Active Submissions", to: "/portal/editor/submissions" },
  { label: "Reviewers", to: "/portal/editor/reviewers" },
  { label: "Decisions", to: "/portal/editor/decisions" },
  { label: "Issues", to: "/portal/editor/issues" },
  { label: "Messages", to: "/portal/editor/messages" },
  { label: "Profile", to: "/portal/editor/profile" },
];

const INBOX = [
  {
    id: 1,
    sender: "Editorial Office",
    subject: "Technical check started — CAJAIDT-2027-001",
    date: "14 Jan 2027, 09:22",
    manuscriptId: "CAJAIDT-2027-001",
    status: "Technical Check",
    unread: true,
    body: "Dear Author,\n\nYour manuscript 'Responsible Artificial Intelligence for Digital Transformation in Emerging Economies' (CAJAIDT-2027-001) has passed the initial technical check and has been forwarded to the section editor for editorial screening.\n\nYou will receive further communication as your submission progresses through the review process.\n\nBest regards,\nCAJAIDT Editorial Office",
  },
  {
    id: 2,
    sender: "Section Editor",
    subject: "Revision request — minor revisions required",
    date: "28 Dec 2026, 15:40",
    manuscriptId: "CAJAIDT-2026-089",
    status: "Revision Required",
    unread: false,
    body: "Dear Author,\n\nThank you for your submission to CAJAIDT. After peer review, the editorial team has decided to request minor revisions. Please review the attached reviewer comments and submit your revised manuscript within 30 days.\n\nBest regards,\nSection Editor",
  },
  {
    id: 3,
    sender: "Reviewer System",
    subject: "Reminder: Review invitation pending response",
    date: "15 Jan 2027, 08:00",
    manuscriptId: "CAJAIDT-2027-004",
    status: "Invitation Pending",
    unread: true,
    body: "Dear Reviewer,\n\nThis is a reminder that you have a pending review invitation for manuscript CAJAIDT-2027-004. Please log in to your reviewer dashboard to accept or decline the invitation.\n\nBest regards,\nCAJAIDT System",
  },
  {
    id: 4,
    sender: "Production Office",
    subject: "Proof review request",
    date: "5 Jan 2027, 11:20",
    manuscriptId: "CAJAIDT-2026-074",
    status: "In Production",
    unread: false,
    body: "Dear Author,\n\nYour manuscript has been typeset and the proofs are ready for your review. Please review the proof document carefully and return any corrections within 5 working days.\n\nBest regards,\nCAJAIDT Production Office",
  },
];

const NOTIFICATIONS = [
  { id: 1, text: "Manuscript CAJAIDT-2027-001 submitted successfully.", date: "12 Jan 2027", type: "Manuscripts", read: false },
  { id: 2, text: "Reviewer assigned to CAJAIDT-2027-001.", date: "18 Jan 2027", type: "Reviews", read: false },
  { id: 3, text: "Revision deadline approaching in 5 days for CAJAIDT-2026-089.", date: "23 Jan 2027", type: "Manuscripts", read: true },
  { id: 4, text: "Review submitted successfully for CAJAIDT-2027-004.", date: "30 Jan 2027", type: "Reviews", read: true },
  { id: 5, text: "Manuscript CAJAIDT-2026-074 moved to production.", date: "3 Jan 2027", type: "Production", read: true },
  { id: 6, text: "New Call for Papers announced by CAJAIDT.", date: "1 Jan 2027", type: "System", read: true },
];

const FILTERS = ["All", "Unread", "Manuscripts", "Reviews", "Production", "System"];

export default function Messages() {
  const { pathname } = useLocation();
  const isEditor   = pathname.startsWith("/portal/editor");
  const isReviewer = pathname.startsWith("/portal/reviewer");
  const navItems   = isEditor ? EDITOR_NAV : isReviewer ? REVIEWER_NAV : AUTHOR_NAV;
  const role       = isEditor ? "Editor" : isReviewer ? "Reviewer" : "Author";

  const [activeTab, setActiveTab] = useState<"messages" | "notifications">("messages");
  const [selectedMessage, setSelectedMessage] = useState<typeof INBOX[0] | null>(INBOX[0]);
  const [filter, setFilter] = useState("All");

  const filteredNotifications = NOTIFICATIONS.filter((n) =>
    filter === "All" ? true :
    filter === "Unread" ? !n.read :
    n.type === filter
  );

  return (
    <PortalLayout role={role} name="Author Name" navItems={navItems} activePath={pathname}>
      <div className="mb-6">
        <div className="text-[11px] font-bold uppercase tracking-wider mb-1" style={{ color: GOLD }}>Inbox</div>
        <h1 className="text-2xl font-bold" style={{ color: NAVY, fontFamily: SERIF }}>Messages & Notifications</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-0 mb-6 border-b" style={{ borderColor: BORDER }}>
        {(["messages", "notifications"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className="flex items-center gap-2 px-5 py-3 text-sm font-medium transition-colors border-b-2 -mb-px capitalize"
            style={{
              color: activeTab === tab ? NAVY : TEXT,
              borderColor: activeTab === tab ? GOLD : "transparent",
            }}
          >
            {tab === "messages" ? <Mail size={14} /> : <Bell size={14} />}
            {tab}
            {tab === "messages" && INBOX.filter((m) => m.unread).length > 0 && (
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white" style={{ backgroundColor: GOLD }}>
                {INBOX.filter((m) => m.unread).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {activeTab === "messages" && (
        <div className="grid lg:grid-cols-5 gap-5">
          {/* Message list */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader title="Inbox" action={<span className="text-[11px]" style={{ color: TEXT }}>{INBOX.length} messages</span>} />
              <div className="divide-y" style={{ divideColor: BORDER }}>
                {INBOX.map((msg) => (
                  <button
                    key={msg.id}
                    type="button"
                    onClick={() => setSelectedMessage(msg)}
                    className="w-full text-left px-4 py-4 hover:bg-gray-50 transition-colors"
                    style={{
                      backgroundColor: selectedMessage?.id === msg.id ? "rgba(195,154,59,0.05)" : undefined,
                      borderLeft: selectedMessage?.id === msg.id ? `3px solid ${GOLD}` : "3px solid transparent",
                    }}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <span className="text-[12px] font-bold leading-snug" style={{ color: NAVY }}>
                        {msg.unread && (
                          <span className="inline-block w-2 h-2 rounded-full mr-1.5 mb-0.5" style={{ backgroundColor: GOLD }} />
                        )}
                        {msg.sender}
                      </span>
                      <span className="text-[10px] flex-shrink-0" style={{ color: TEXT }}>{msg.date.split(",")[0]}</span>
                    </div>
                    <div className="text-[12px] font-medium leading-snug mb-1 line-clamp-2" style={{ color: msg.unread ? NAVY : TEXT }}>
                      {msg.subject}
                    </div>
                    <span className="font-mono text-[10px]" style={{ color: TEXT }}>{msg.manuscriptId}</span>
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Message detail */}
          <div className="lg:col-span-3">
            {selectedMessage ? (
              <Card>
                <CardHeader title="Message" action={<GhostBtn>Reply</GhostBtn>} />
                <div className="p-6">
                  <div className="space-y-3 mb-6 pb-6 border-b" style={{ borderColor: BORDER }}>
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <h3 className="text-[15px] font-bold leading-snug" style={{ color: NAVY }}>{selectedMessage.subject}</h3>
                      <StatusBadge status={selectedMessage.status} />
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-[11px]">
                      <div><span className="font-bold uppercase tracking-wider mr-2" style={{ color: TEXT }}>From</span><span style={{ color: NAVY }}>{selectedMessage.sender}</span></div>
                      <div><span className="font-bold uppercase tracking-wider mr-2" style={{ color: TEXT }}>Date</span><span style={{ color: NAVY }}>{selectedMessage.date}</span></div>
                      <div><span className="font-bold uppercase tracking-wider mr-2" style={{ color: TEXT }}>Manuscript</span><span className="font-mono" style={{ color: NAVY }}>{selectedMessage.manuscriptId}</span></div>
                    </div>
                  </div>
                  <div className="text-[13px] leading-relaxed whitespace-pre-line" style={{ color: TEXT }}>
                    {selectedMessage.body}
                  </div>
                  <div className="mt-6 pt-4 border-t" style={{ borderColor: BORDER }}>
                    <GhostBtn>Reply to this message</GhostBtn>
                  </div>
                </div>
              </Card>
            ) : (
              <Card>
                <div className="px-6 py-14 text-center">
                  <Mail size={24} className="mx-auto mb-3" style={{ color: TEXT }} />
                  <p className="text-sm" style={{ color: TEXT }}>Select a message to read it.</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      )}

      {activeTab === "notifications" && (
        <div className="space-y-5">
          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className="px-3.5 py-1.5 text-[12px] font-semibold rounded-full border-2 transition-colors"
                style={{
                  borderColor: filter === f ? NAVY : BORDER,
                  backgroundColor: filter === f ? NAVY : "white",
                  color: filter === f ? "white" : TEXT,
                }}
              >
                {f}
              </button>
            ))}
          </div>

          <Card>
            <CardHeader
              title="Notifications"
              action={<span className="text-[11px]" style={{ color: TEXT }}>{filteredNotifications.length} items</span>}
            />
            {filteredNotifications.length === 0 ? (
              <div className="px-6 py-10 text-center">
                <p className="text-sm" style={{ color: TEXT }}>No notifications in this category.</p>
              </div>
            ) : (
              <div className="divide-y" style={{ divideColor: BORDER }}>
                {filteredNotifications.map((n) => (
                  <div key={n.id} className="flex items-start gap-4 px-5 py-4">
                    <div
                      className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                      style={{ backgroundColor: n.read ? BORDER : GOLD }}
                    />
                    <div className="flex-1">
                      <div className="text-[13px] leading-snug mb-1" style={{ color: n.read ? TEXT : NAVY, fontWeight: n.read ? 400 : 600 }}>
                        {n.text}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px]" style={{ color: TEXT }}>{n.date}</span>
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded"
                          style={{ color: TEXT, backgroundColor: LIGHT }}
                        >
                          {n.type}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      )}
    </PortalLayout>
  );
}
