import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useAuth } from "../AuthContext";
import { updateProfile } from "../api";
import {
  NAVY, GOLD, LIGHT, BORDER, TEXT, SERIF,
  PortalLayout, Card, CardHeader, PrimaryBtn, FieldLabel, SidebarItem,
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

const COUNTRIES = [
  "Kazakhstan", "Uzbekistan", "Kyrgyzstan", "Tajikistan", "Turkmenistan",
  "Russia", "Germany", "United Kingdom", "United States", "Other",
];

const NOTIFICATIONS = [
  { label: "Submission status updates", key: "status" },
  { label: "Review invitations", key: "review" },
  { label: "Editorial messages", key: "messages" },
  { label: "Revision reminders", key: "revisions" },
  { label: "Publication alerts", key: "publication" },
  { label: "Journal announcements", key: "announcements" },
];

export default function UserProfile() {
  const { pathname } = useLocation();
  const { user, refreshUser } = useAuth();

  const isEditor   = pathname.startsWith("/portal/editor");
  const isReviewer = pathname.startsWith("/portal/reviewer");
  const navItems   = isEditor ? EDITOR_NAV : isReviewer ? REVIEWER_NAV : AUTHOR_NAV;
  const role       = isEditor ? "Editor" : isReviewer ? "Reviewer" : "Author";

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    affiliation: "",
    country: "",
    orcid: "",
    scholar: "",
  });
  const [notifications, setNotifications] = useState<Record<string, boolean>>({
    status: true, review: true, messages: true, revisions: false, publication: false, announcements: false,
  });
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setForm({
        fullName: user.full_name || "",
        email: user.email || "",
        affiliation: user.affiliation || "",
        country: user.country || "",
        orcid: user.orcid_id || "",
        scholar: user.google_scholar_url || "",
      });
    }
  }, [user]);

  const set = (field: string) => (v: string) => setForm((f) => ({ ...f, [field]: v }));
  const toggleNotif = (key: string) =>
    setNotifications((n) => ({ ...n, [key]: !n[key] }));

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      await updateProfile({
        full_name: form.fullName,
        affiliation: form.affiliation,
        country: form.country,
        orcid_id: form.orcid,
        google_scholar_url: form.scholar,
      });
      await refreshUser();
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const inputBase = "w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white outline-none focus:ring-2 transition-shadow";
  const inputStyle = { borderColor: BORDER, color: NAVY };

  return (
    <PortalLayout role={role} name={form.fullName || "User"} navItems={navItems} activePath={pathname}>
      <div className="max-w-3xl mx-auto space-y-6">

        <div className="mb-2">
          <div className="text-[11px] font-bold uppercase tracking-wider mb-1" style={{ color: GOLD }}>
            Account
          </div>
          <h1 className="text-2xl font-bold" style={{ color: NAVY, fontFamily: SERIF }}>
            Profile & Account Settings
          </h1>
        </div>

        {saved && (
          <div
            className="rounded-xl px-5 py-3.5 text-sm font-semibold"
            style={{ backgroundColor: "#F0FDF4", color: "#16A34A", border: "1px solid #BBF7D0" }}
          >
            Settings saved successfully.
          </div>
        )}

        {error && (
          <div
            className="rounded-xl px-5 py-3.5 text-sm font-semibold"
            style={{ backgroundColor: "#FEF2F2", color: "#DC2626", border: "1px solid #FECACA" }}
          >
            {error}
          </div>
        )}

        <Card>
          <CardHeader title="Personal Information" />
          <div className="p-6 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <FieldLabel required>Full Name</FieldLabel>
                <input type="text" value={form.fullName} onChange={(e) => set("fullName")(e.target.value)}
                  className={inputBase} style={inputStyle} />
              </div>
              <div>
                <FieldLabel required>Email Address</FieldLabel>
                <input type="email" value={form.email} disabled
                  className={inputBase} style={{ ...inputStyle, backgroundColor: LIGHT }} />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <FieldLabel>Affiliation</FieldLabel>
                <input type="text" value={form.affiliation} onChange={(e) => set("affiliation")(e.target.value)}
                  placeholder="University or Institution" className={inputBase} style={inputStyle} />
              </div>
              <div>
                <FieldLabel>Country</FieldLabel>
                <select value={form.country} onChange={(e) => set("country")(e.target.value)}
                  className={inputBase} style={inputStyle}>
                  <option value="">Select country</option>
                  {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <FieldLabel>ORCID ID</FieldLabel>
                <input type="text" value={form.orcid} onChange={(e) => set("orcid")(e.target.value)}
                  placeholder="0000-0000-0000-0000" className={inputBase} style={inputStyle} />
              </div>
              <div>
                <FieldLabel>Google Scholar Profile</FieldLabel>
                <input type="url" value={form.scholar} onChange={(e) => set("scholar")(e.target.value)}
                  placeholder="https://scholar.google.com/..." className={inputBase} style={inputStyle} />
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader title="Role Information" />
          <div className="p-6">
            <div className="text-[11px] font-bold uppercase tracking-wider mb-3" style={{ color: TEXT }}>Current roles</div>
            <div className="flex flex-wrap gap-2">
              {(user?.roles || [role.toLowerCase()]).map((r) => (
                <span
                  key={r}
                  className="text-[12px] font-bold px-3 py-1.5 rounded-full capitalize"
                  style={{ color: GOLD, backgroundColor: "rgba(195,154,59,0.1)" }}
                >
                  {r}
                </span>
              ))}
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader title="Notification Preferences" />
          <div className="p-6 space-y-4">
            {NOTIFICATIONS.map((n) => (
              <label key={n.key} className="flex items-center justify-between gap-4 cursor-pointer">
                <span className="text-[13px] font-medium" style={{ color: NAVY }}>{n.label}</span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={notifications[n.key]}
                  onClick={() => toggleNotif(n.key)}
                  className="relative flex-shrink-0 rounded-full transition-colors"
                  style={{
                    backgroundColor: notifications[n.key] ? GOLD : BORDER,
                    width: "40px",
                    height: "22px",
                  }}
                >
                  <span
                    className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform"
                    style={{
                      transform: notifications[n.key] ? "translateX(18px)" : "translateX(0)",
                    }}
                  />
                </button>
              </label>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader title="Security" />
          <div className="p-6 space-y-3">
            <button
              type="button"
              className="px-4 py-2.5 text-sm font-semibold rounded-lg border-2 transition-opacity hover:opacity-70"
              style={{ color: NAVY, borderColor: NAVY }}
            >
              Change Password
            </button>
            <div className="flex items-center gap-3 text-[12px] pt-2" style={{ color: TEXT }}>
              <span className="px-2.5 py-1 rounded text-[10px] font-bold" style={{ backgroundColor: LIGHT, color: TEXT }}>Coming soon</span>
              Two-Factor Authentication
            </div>
          </div>
        </Card>

        <div className="flex justify-end">
          <PrimaryBtn onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save Settings"}
          </PrimaryBtn>
        </div>
      </div>
    </PortalLayout>
  );
}
