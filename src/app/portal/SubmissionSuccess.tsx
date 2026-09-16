import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router";
import { NAVY, GOLD, LIGHT, BORDER, TEXT, SERIF } from "./portalShared";

export default function SubmissionSuccess() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: LIGHT }}
    >
      <div className="max-w-lg w-full">
        {/* Success icon */}
        <div className="text-center mb-8">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
            style={{ backgroundColor: "#F0FDF4", border: "2px solid #BBF7D0" }}
          >
            <CheckCircle size={40} style={{ color: "#16A34A" }} />
          </div>
          <div className="text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: GOLD }}>
            Submission Portal
          </div>
          <h1 className="text-2xl font-bold mb-3" style={{ color: NAVY, fontFamily: SERIF }}>
            Submission Completed
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: TEXT }}>
            Your manuscript has been submitted successfully to CAJAIDT.
          </p>
        </div>

        {/* Confirmation card */}
        <div
          className="rounded-2xl border bg-white overflow-hidden mb-6"
          style={{ borderColor: BORDER }}
        >
          <div className="px-5 py-3.5 border-b" style={{ backgroundColor: NAVY, borderColor: BORDER }}>
            <span className="text-xs font-bold text-white tracking-wide uppercase">Submission Confirmation</span>
          </div>
          <div className="divide-y" style={{ divideColor: BORDER }}>
            {[
              { label: "Manuscript ID", value: "CAJAIDT-2027-XXX", mono: true },
              { label: "Status", value: "Submitted" },
              { label: "Next Step", value: "Technical Check" },
              { label: "Editorial Response", value: "Usually within 5–7 working days" },
            ].map((row) => (
              <div key={row.label} className="flex flex-wrap items-center gap-2 px-5 py-3.5">
                <span className="text-[11px] font-bold uppercase tracking-wider w-44 flex-shrink-0" style={{ color: TEXT }}>
                  {row.label}
                </span>
                <span
                  className={`text-[13px] font-semibold ${row.mono ? "font-mono" : ""}`}
                  style={{ color: row.label === "Status" ? "#16A34A" : NAVY }}
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>
          <div className="px-5 py-4 bg-amber-50 border-t" style={{ borderColor: BORDER }}>
            <p className="text-[12px] leading-relaxed" style={{ color: TEXT }}>
              A confirmation email has been sent to your registered email address. You can track your submission status from your author dashboard at any time.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => navigate("/portal/author")}
            className="flex-1 py-3 text-sm font-semibold text-white rounded-xl transition-opacity hover:opacity-90"
            style={{ backgroundColor: GOLD }}
          >
            Go to Author Dashboard
          </button>
          <button
            type="button"
            onClick={() => navigate("/portal/author/submissions")}
            className="flex-1 py-3 text-sm font-semibold rounded-xl border-2 transition-opacity hover:opacity-70"
            style={{ color: NAVY, borderColor: NAVY }}
          >
            View Submission Details
          </button>
          <button
            type="button"
            onClick={() => navigate("/portal/author/submit")}
            className="flex-1 py-3 text-sm font-semibold rounded-xl border transition-opacity hover:opacity-70 bg-white"
            style={{ color: TEXT, borderColor: BORDER }}
          >
            Start Another Submission
          </button>
        </div>
      </div>
    </div>
  );
}
