import { useNavigate } from "react-router";
import { JournalEmblem, NavA } from "../shared";
import { useAuth } from "../AuthContext";

export const NAVY = "#06264A";
export const GOLD = "#C39A3B";
export const LIGHT = "#F5F7FA";
export const BORDER = "#E5E7EB";
export const TEXT = "#4B5563";
export const SERIF = "'Playfair Display', Georgia, serif";
export const DARK_BG = "#021d38";

// ─── Status badge ─────────────────────────────────────────────────────────────
const STATUS_MAP: Record<string, { bg: string; color: string }> = {
  "Draft":              { bg: "#F3F4F6", color: "#6B7280" },
  "Submitted":          { bg: "#EFF6FF", color: "#2563EB" },
  "Technical Check":    { bg: "#EFF6FF", color: "#2563EB" },
  "Under Technical Check": { bg: "#EFF6FF", color: "#2563EB" },
  "Editor Screening":   { bg: "#EEF2FF", color: "#4F46E5" },
  "Under Review":       { bg: "#F5F3FF", color: "#7C3AED" },
  "Revision Required":  { bg: "#FFF7ED", color: "#EA580C" },
  "Accepted":           { bg: "#F0FDF4", color: "#16A34A" },
  "Rejected":           { bg: "#FEF2F2", color: "#DC2626" },
  "Reject and Resubmit":{ bg: "#FFF7ED", color: "#EA580C" },
  "In Production":      { bg: "#F0FDFA", color: "#0D9488" },
  "Published":          { bg: "#F0FDF4", color: "#15803D" },
  "Invitation Pending": { bg: "#FFF7ED", color: "#EA580C" },
  "Review in Progress": { bg: "#F5F3FF", color: "#7C3AED" },
  "Completed":          { bg: "#F0FDF4", color: "#16A34A" },
  "Accepted / In Copyediting": { bg: "#F0FDFA", color: "#0D9488" },
};

export function StatusBadge({ status }: { status: string }) {
  const s = STATUS_MAP[status] ?? { bg: "#F3F4F6", color: "#6B7280" };
  return (
    <span
      className="inline-block text-[11px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap"
      style={{ backgroundColor: s.bg, color: s.color }}
    >
      {status}
    </span>
  );
}

// ─── Summary card ─────────────────────────────────────────────────────────────
export function SummaryCard({
  label, value, color = NAVY,
}: { label: string; value: string | number; color?: string }) {
  return (
    <div className="rounded-xl border bg-white p-5" style={{ borderColor: BORDER }}>
      <div className="text-2xl font-bold mb-1" style={{ color }}>{value}</div>
      <div className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: TEXT }}>{label}</div>
    </div>
  );
}

// ─── Portal top bar ───────────────────────────────────────────────────────────
export function PortalTopBar({ role, name }: { role: string; name: string }) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  return (
    <div
      className="h-14 flex items-center justify-between px-5 border-b bg-white flex-shrink-0"
      style={{ borderColor: BORDER }}
    >
      <NavA to="/" className="flex items-center gap-2.5 text-decoration-none">
        <JournalEmblem size={32} />
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider" style={{ color: NAVY, fontFamily: SERIF }}>
            CAJAIDT
          </div>
          <div className="text-[9px]" style={{ color: TEXT }}>Submission Portal</div>
        </div>
      </NavA>

      <div className="flex items-center gap-4">
        <span
          className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
          style={{ color: GOLD, backgroundColor: "rgba(195,154,59,0.1)" }}
        >
          {role}
        </span>
        <div className="text-right hidden sm:block">
          <div className="text-[12px] font-semibold" style={{ color: NAVY }}>{name}</div>
        </div>
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
          style={{ backgroundColor: NAVY }}
        >
          {name.charAt(0).toUpperCase()}
        </div>
        <button
          onClick={() => { logout(); navigate("/portal/login"); }}
          className="text-[11px] font-medium transition-opacity hover:opacity-70"
          style={{ color: TEXT }}
        >
          Log out
        </button>
      </div>
    </div>
  );
}

// ─── Portal sidebar ───────────────────────────────────────────────────────────
export interface SidebarItem {
  label: string;
  to: string;
  icon?: React.ReactNode;
  badge?: number;
}

export function PortalSidebar({
  items,
  activePath,
}: {
  items: SidebarItem[];
  activePath: string;
}) {
  const navigate = useNavigate();
  return (
    <aside
      className="w-56 flex-shrink-0 flex flex-col py-5"
      style={{ backgroundColor: DARK_BG, minHeight: "calc(100vh - 56px)" }}
    >
      <nav className="flex-1 space-y-0.5 px-3">
        {items.map((item) => {
          const active = activePath === item.to || activePath.startsWith(item.to + "/");
          return (
            <button
              key={item.to}
              onClick={() => navigate(item.to)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left text-[13px] font-medium transition-colors"
              style={{
                color: active ? "#ffffff" : "#7a9cbd",
                backgroundColor: active ? "rgba(255,255,255,0.1)" : "transparent",
              }}
            >
              <span>{item.label}</span>
              {item.badge !== undefined && item.badge > 0 && (
                <span
                  className="text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: GOLD }}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Return to website */}
      <div className="px-3 mt-4 pt-4 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <NavA
          to="/"
          className="block text-[11px] transition-colors hover:text-white px-3"
          style={{ color: "#4a6a8a" }}
        >
          ← Back to Website
        </NavA>
      </div>
    </aside>
  );
}

// ─── Portal page wrapper ──────────────────────────────────────────────────────
export function PortalLayout({
  role,
  name,
  navItems,
  activePath,
  children,
}: {
  role: string;
  name: string;
  navItems: SidebarItem[];
  activePath: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: LIGHT }}>
      <PortalTopBar role={role} name={name} />
      <div className="flex flex-1 overflow-hidden">
        <PortalSidebar items={navItems} activePath={activePath} />
        <main className="flex-1 overflow-auto p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}

// ─── Action button ────────────────────────────────────────────────────────────
export function PrimaryBtn({
  children, onClick, type = "button", disabled = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="px-5 py-2.5 text-sm font-semibold text-white rounded transition-opacity hover:opacity-90 disabled:opacity-40"
      style={{ backgroundColor: GOLD }}
    >
      {children}
    </button>
  );
}

export function SecondaryBtn({
  children, onClick,
}: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-5 py-2.5 text-sm font-semibold rounded border-2 transition-opacity hover:opacity-70"
      style={{ color: NAVY, borderColor: NAVY }}
    >
      {children}
    </button>
  );
}

export function GhostBtn({
  children, onClick,
}: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-4 py-2 text-sm font-medium rounded border transition-opacity hover:opacity-70 bg-white"
      style={{ color: NAVY, borderColor: BORDER }}
    >
      {children}
    </button>
  );
}

// ─── Section card ─────────────────────────────────────────────────────────────
export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`bg-white rounded-xl border ${className}`}
      style={{ borderColor: BORDER }}
    >
      {children}
    </div>
  );
}

export function CardHeader({ title, action }: { title: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: BORDER }}>
      <h3 className="text-sm font-bold" style={{ color: NAVY }}>{title}</h3>
      {action}
    </div>
  );
}

// ─── Table helpers ────────────────────────────────────────────────────────────
export function Th({ children }: { children: React.ReactNode }) {
  return (
    <th
      className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wider"
      style={{ color: TEXT, backgroundColor: LIGHT }}
    >
      {children}
    </th>
  );
}

export function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <td className={`px-4 py-3.5 text-[13px] border-b ${className}`} style={{ borderColor: BORDER }}>
      {children}
    </td>
  );
}

// ─── Form field helpers ───────────────────────────────────────────────────────
export function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5" style={{ color: NAVY }}>
      {children}
      {required && <span className="ml-1" style={{ color: GOLD }}>*</span>}
    </label>
  );
}

const inputBase = "w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white outline-none focus:ring-2 transition-shadow";
const inputStyle = { borderColor: BORDER, color: NAVY };

export function TextInput({ placeholder, value, onChange }: {
  placeholder?: string; value?: string; onChange?: (v: string) => void;
}) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value ?? ""}
      onChange={(e) => onChange?.(e.target.value)}
      className={inputBase}
      style={inputStyle}
    />
  );
}

export function TextArea({ placeholder, rows = 4, value, onChange }: {
  placeholder?: string; rows?: number; value?: string; onChange?: (v: string) => void;
}) {
  return (
    <textarea
      placeholder={placeholder}
      rows={rows}
      value={value ?? ""}
      onChange={(e) => onChange?.(e.target.value)}
      className={`${inputBase} resize-none`}
      style={inputStyle}
    />
  );
}

export function SelectInput({ options, value, onChange, placeholder }: {
  options: string[]; value?: string; onChange?: (v: string) => void; placeholder?: string;
}) {
  return (
    <select
      value={value ?? ""}
      onChange={(e) => onChange?.(e.target.value)}
      className={inputBase}
      style={inputStyle}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((o) => <option key={o}>{o}</option>)}
    </select>
  );
}
