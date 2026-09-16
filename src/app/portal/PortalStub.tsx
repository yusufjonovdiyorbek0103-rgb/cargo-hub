import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import { NAVY, GOLD, LIGHT, BORDER, TEXT, SERIF } from "./portalShared";

/**
 * Catch-all for portal sub-routes that don't yet have dedicated pages.
 * Detects which dashboard the user belongs to and shows a placeholder.
 */
export default function PortalStub() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isEditor   = pathname.startsWith("/portal/editor");
  const isReviewer = pathname.startsWith("/portal/reviewer");
  const dashPath   = isEditor ? "/portal/editor" : isReviewer ? "/portal/reviewer" : "/portal/author";
  const dashLabel  = isEditor ? "Editor Dashboard" : isReviewer ? "Reviewer Dashboard" : "Author Dashboard";

  // Derive a readable section name from the last URL segment
  const segment = pathname.split("/").filter(Boolean).pop() ?? "";
  const sectionName = segment
    .replace(/-/g, " ")
    .replace(/\b\w/g, c => c.toUpperCase());

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: LIGHT }}
    >
      <div className="max-w-md w-full text-center">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
          style={{ backgroundColor: "rgba(195,154,59,0.1)" }}
        >
          <span className="text-2xl font-bold" style={{ color: GOLD }}>⚙</span>
        </div>
        <h2
          className="text-xl font-bold mb-3"
          style={{ color: NAVY, fontFamily: SERIF }}
        >
          {sectionName || "Section"} — Coming Soon
        </h2>
        <p className="text-sm leading-relaxed mb-6" style={{ color: TEXT }}>
          This section of the CAJAIDT submission portal is under development. It will be available in the next platform release.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => navigate(dashPath)}
            className="px-5 py-2.5 text-sm font-semibold text-white rounded-lg transition-opacity hover:opacity-90"
            style={{ backgroundColor: GOLD }}
          >
            ← Back to {dashLabel}
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-5 py-2.5 text-sm font-semibold rounded-lg border-2 transition-opacity hover:opacity-70"
            style={{ color: NAVY, borderColor: NAVY }}
          >
            Go to Website
          </button>
        </div>
      </div>
    </div>
  );
}
