import { useState, useRef } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import { Download, CheckCircle } from "lucide-react";
import { useAuth } from "../AuthContext";
import { submitReview } from "../api";
import {
  NAVY, GOLD, LIGHT, BORDER, TEXT, SERIF,
  PortalLayout, Card, CardHeader, PrimaryBtn, GhostBtn, SidebarItem,
  FieldLabel, TextArea, SelectInput,
} from "./portalShared";

const NAV: SidebarItem[] = [
  { label: "Dashboard", to: "/portal/reviewer" },
  { label: "Review Assignments", to: "/portal/reviewer/assignments" },
  { label: "Completed Reviews", to: "/portal/reviewer/completed" },
  { label: "Resources", to: "/portal/reviewer/resources" },
  { label: "Messages", to: "/portal/reviewer/messages" },
  { label: "Profile", to: "/portal/reviewer/profile" },
];

const CRITERIA_FIELDS = [
  { key: "relevance", label: "Relevance to journal scope" },
  { key: "originality", label: "Originality and contribution" },
  { key: "literature_review", label: "Literature review quality" },
  { key: "methodology", label: "Methodological rigor" },
  { key: "results_validity", label: "Results validity" },
  { key: "discussion_quality", label: "Discussion quality" },
  { key: "ethical_compliance", label: "Ethical compliance" },
  { key: "reference_quality", label: "Reference quality" },
  { key: "writing_clarity", label: "Writing clarity" },
  { key: "overall_merit", label: "Overall scholarly merit" },
];

const RATINGS = ["excellent", "good", "fair", "poor", "na"];
const RATING_LABELS: Record<string, string> = {
  excellent: "Excellent", good: "Good", fair: "Fair", poor: "Poor", na: "N/A",
};

function RatingRow({
  criterion, value, onChange,
}: {
  criterion: string; value: string; onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 py-3 border-b" style={{ borderColor: BORDER }}>
      <span className="text-[13px] font-medium" style={{ color: NAVY }}>{criterion}</span>
      <div className="flex gap-2">
        {RATINGS.map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => onChange(r)}
            className="px-3 py-1.5 text-[11px] font-semibold rounded-lg border transition-colors"
            style={{
              borderColor: value === r ? NAVY : BORDER,
              backgroundColor: value === r ? NAVY : "white",
              color: value === r ? "white" : TEXT,
            }}
          >
            {RATING_LABELS[r]}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ReviewForm() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const assignmentId = searchParams.get("assignment");

  const [coi, setCoi] = useState("no_conflict");
  const [coiDetails, setCoiDetails] = useState("");
  const [ratings, setRatings] = useState<Record<string, string>>({});
  const [commentsToAuthors, setCommentsToAuthors] = useState("");
  const [confidentialComments, setConfidentialComments] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [reviewFile, setReviewFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const setRating = (key: string, value: string) => {
    setRatings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!assignmentId) {
      setError("No assignment selected");
      return;
    }
    if (!recommendation) {
      setError("Please select a recommendation");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const coiMap: Record<string, string> = {
        no_conflict: "none",
        potential_conflict: "potential",
        cannot_review: "yes",
      };
      const data: Record<string, unknown> = {
        conflict_of_interest: coiMap[coi] || "none",
        conflict_details: coiDetails,
        comments_to_authors: commentsToAuthors,
        confidential_to_editor: confidentialComments,
        recommendation,
        ...ratings,
      };
      await submitReview(Number(assignmentId), data);
      setSubmitted(true);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <PortalLayout role="Reviewer" name={user?.full_name || "Reviewer"} navItems={NAV} activePath={pathname}>
        <div className="max-w-lg mx-auto mt-12 text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: "#F0FDF4" }}>
            <CheckCircle size={32} style={{ color: "#16A34A" }} />
          </div>
          <h2 className="text-2xl font-bold mb-3" style={{ color: NAVY, fontFamily: SERIF }}>
            Review Submitted Successfully
          </h2>
          <p className="text-sm leading-relaxed mb-8" style={{ color: TEXT }}>
            Thank you for contributing to the CAJAIDT peer-review process. Your review has been submitted to the editorial office.
          </p>
          <button
            onClick={() => navigate("/portal/reviewer")}
            className="px-6 py-2.5 text-sm font-bold text-white rounded-lg"
            style={{ backgroundColor: GOLD }}
          >
            Return to Dashboard
          </button>
        </div>
      </PortalLayout>
    );
  }

  return (
    <PortalLayout role="Reviewer" name={user?.full_name || "Reviewer"} navItems={NAV} activePath={pathname}>
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <div className="text-[11px] font-bold uppercase tracking-wider mb-1" style={{ color: GOLD }}>
            Peer Review Form
          </div>
          <h1 className="text-2xl font-bold mb-2" style={{ color: NAVY, fontFamily: SERIF }}>
            Review Assignment #{assignmentId || "—"}
          </h1>
          <div
            className="inline-block text-[11px] font-semibold px-3 py-1 rounded-full"
            style={{ color: "#7C3AED", backgroundColor: "#F5F3FF" }}
          >
            Double-Blind Peer Review — Author identities are confidential
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg text-sm text-red-700 bg-red-50 border border-red-200">{error}</div>
        )}

        <div className="space-y-5">
          <Card>
            <CardHeader title="Section 1: Conflict of Interest" />
            <div className="p-5">
              <FieldLabel required>Do you have any conflict of interest with this manuscript?</FieldLabel>
              <div className="space-y-2 mt-2">
                {[
                  { value: "no_conflict", label: "No conflict of interest — I can review this manuscript objectively." },
                  { value: "potential_conflict", label: "Potential conflict of interest — I can still review with disclosure." },
                  { value: "cannot_review", label: "I cannot review this manuscript due to a conflict of interest." },
                ].map((opt) => (
                  <label key={opt.value} className="flex items-start gap-3 p-3 rounded-lg border cursor-pointer hover:bg-gray-50 transition-colors" style={{ borderColor: coi === opt.value ? NAVY : BORDER }}>
                    <input type="radio" name="coi" value={opt.value} checked={coi === opt.value} onChange={() => setCoi(opt.value)} className="mt-0.5 flex-shrink-0" />
                    <span className="text-[13px]" style={{ color: NAVY }}>{opt.label}</span>
                  </label>
                ))}
              </div>
              {coi === "potential_conflict" && (
                <div className="mt-3">
                  <TextArea rows={2} placeholder="Describe the conflict of interest..." value={coiDetails} onChange={setCoiDetails} />
                </div>
              )}
            </div>
          </Card>

          <Card>
            <CardHeader title="Section 2: Evaluation Criteria" />
            <div className="px-5 py-3">
              <div className="flex gap-2 flex-wrap mb-3">
                {RATINGS.map((r) => (
                  <span key={r} className="text-[10px] font-bold px-2 py-0.5 rounded" style={{ color: TEXT, backgroundColor: LIGHT }}>{RATING_LABELS[r]}</span>
                ))}
              </div>
              {CRITERIA_FIELDS.map((c) => (
                <RatingRow
                  key={c.key}
                  criterion={c.label}
                  value={ratings[c.key] || ""}
                  onChange={(v) => setRating(c.key, v)}
                />
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader title="Section 3: Comments to Authors" />
            <div className="p-5">
              <FieldLabel required>Constructive comments to share with the authors</FieldLabel>
              <TextArea
                rows={8}
                placeholder="Provide specific, objective, and constructive feedback."
                value={commentsToAuthors}
                onChange={setCommentsToAuthors}
              />
            </div>
          </Card>

          <Card>
            <CardHeader title="Section 4: Confidential Comments to Editor" />
            <div className="p-5">
              <FieldLabel>Comments for the editor only (not shared with authors)</FieldLabel>
              <TextArea
                rows={4}
                placeholder="Confidential observations, concerns about integrity, or additional context."
                value={confidentialComments}
                onChange={setConfidentialComments}
              />
            </div>
          </Card>

          <Card>
            <CardHeader title="Section 5: Recommendation" />
            <div className="p-5">
              <FieldLabel required>Recommendation to the editor</FieldLabel>
              <SelectInput
                options={[
                  {value:"accept",label:"Accept"},
                  {value:"minor_revision",label:"Accept with Minor Revisions"},
                  {value:"major_revision",label:"Major Revisions"},
                  {value:"reject_resubmit",label:"Reject and Resubmit"},
                  {value:"reject",label:"Reject"},
                ]}
                placeholder="Select your recommendation..."
                value={recommendation}
                onChange={setRecommendation}
              />
              <p className="text-[11px] mt-2" style={{ color: TEXT }}>
                This recommendation is confidential and will not be disclosed to the authors directly.
              </p>
            </div>
          </Card>

          <Card>
            <CardHeader title="Section 6: Upload Review File (Optional)" />
            <div className="p-5">
              <p className="text-[12px] mb-3" style={{ color: TEXT }}>
                You may upload an annotated manuscript or a separate review document if needed.
              </p>
              <input ref={fileRef} type="file" className="hidden" onChange={(e) => { if (e.target.files?.[0]) setReviewFile(e.target.files[0]); }} />
              {reviewFile ? (
                <div className="flex items-center gap-3">
                  <span className="text-[12px]" style={{ color: NAVY }}>{reviewFile.name}</span>
                  <GhostBtn onClick={() => setReviewFile(null)}>Remove</GhostBtn>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="px-4 py-2 text-sm font-semibold rounded-lg border transition-opacity hover:opacity-70"
                  style={{ borderColor: BORDER, color: NAVY }}
                >
                  Upload File (optional)
                </button>
              )}
            </div>
          </Card>

          <div className="flex items-center justify-between py-4">
            <GhostBtn onClick={() => navigate("/portal/reviewer")}>Cancel</GhostBtn>
            <PrimaryBtn onClick={handleSubmit} disabled={loading}>
              {loading ? "Submitting..." : "Submit Review"}
            </PrimaryBtn>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
