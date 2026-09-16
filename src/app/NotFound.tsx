import { NAVY, GOLD, TEXT_GRAY, SERIF, JournalEmblem, NavA } from "./shared";

export default function NotFound() {
  return (
    <div
      className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center"
      style={{ backgroundColor: "#F5F7FA" }}
    >
      <JournalEmblem size={72} />

      <div className="mt-8 mb-2 text-[11px] font-bold uppercase tracking-widest" style={{ color: GOLD }}>
        Error 404
      </div>
      <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: NAVY, fontFamily: SERIF }}>
        Page Not Found
      </h1>
      <p className="text-sm max-w-md mx-auto mb-10 leading-relaxed" style={{ color: TEXT_GRAY }}>
        The page you are looking for may have been moved, renamed, or is temporarily unavailable.
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        <NavA
          to="/"
          className="px-7 py-2.5 text-sm font-semibold text-white rounded-lg transition-opacity hover:opacity-90"
          style={{ backgroundColor: GOLD }}
        >
          Go to Homepage
        </NavA>
        <NavA
          to="/current-issue"
          className="px-7 py-2.5 text-sm font-semibold rounded-lg border-2 transition-opacity hover:opacity-70"
          style={{ color: NAVY, borderColor: NAVY }}
        >
          Browse Current Issue
        </NavA>
        <NavA
          to="/contact"
          className="px-7 py-2.5 text-sm font-semibold rounded-lg border transition-opacity hover:opacity-70 bg-white"
          style={{ color: TEXT_GRAY, borderColor: "#E5E7EB" }}
        >
          Contact Support
        </NavA>
      </div>
    </div>
  );
}
