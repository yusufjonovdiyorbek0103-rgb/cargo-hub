import { useState } from "react";
import { CheckCircle, Download } from "lucide-react";
import {
  NAVY, GOLD, LIGHT_GRAY, TEXT_GRAY, BORDER_GRAY, SERIF,
  PageBanner, BottomCTA,
} from "./shared";

const GROUPS = [
  {
    title: "Scope and Originality",
    color: NAVY,
    items: [
      "The manuscript fits the journal's aims and scope.",
      "The manuscript contains a clear research problem.",
      "The manuscript presents a clear academic contribution.",
      "The manuscript is original.",
      "The manuscript is not submitted to another journal.",
    ],
  },
  {
    title: "Structure",
    color: GOLD,
    items: [
      "Title is clear and specific.",
      "Abstract is 180–250 words.",
      "5–7 keywords are included.",
      "Introduction explains the research problem and objective.",
      "Literature review identifies the research gap.",
      "Methodology is clear and reproducible.",
      "Results are presented logically.",
      "Discussion explains the significance of findings.",
      "Conclusion summarizes contribution and limitations.",
      "References are complete and accurate.",
    ],
  },
  {
    title: "Metadata",
    color: NAVY,
    items: [
      "English title is included.",
      "English abstract is included.",
      "English keywords are included.",
      "Author affiliations are complete.",
      "Corresponding author is identified.",
      "ORCID IDs are included where available.",
    ],
  },
  {
    title: "Ethics and Declarations",
    color: GOLD,
    items: [
      "Conflict of interest statement is included.",
      "Funding statement is included.",
      "Data availability statement is included.",
      "AI use disclosure is included if applicable.",
      "Ethics approval is included if required.",
      "All co-authors have approved the submission.",
    ],
  },
  {
    title: "Files",
    color: NAVY,
    items: [
      "Anonymized manuscript file is prepared.",
      "Title page is prepared separately.",
      "Figures and tables are readable.",
      "Supplementary files are uploaded if needed.",
      "Cover letter is prepared.",
    ],
  },
];

function ChecklistGroup({
  group,
  groupIndex,
  checked,
  onToggle,
}: {
  group: typeof GROUPS[0];
  groupIndex: number;
  checked: Record<string, boolean>;
  onToggle: (key: string) => void;
}) {
  const [open, setOpen] = useState(true);
  const total = group.items.length;
  const done = group.items.filter((_, i) => checked[`${groupIndex}-${i}`]).length;
  const allDone = done === total;

  return (
    <div className="rounded-xl border overflow-hidden" style={{ borderColor: allDone ? GOLD : BORDER_GRAY }}>
      <button
        className="w-full flex items-center justify-between px-6 py-4 text-left transition-colors hover:bg-gray-50"
        onClick={() => setOpen(!open)}
        style={{ borderLeft: `4px solid ${group.color}` }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
            style={{ backgroundColor: allDone ? GOLD : group.color }}
          >
            {allDone ? <CheckCircle size={14} color="white" /> : groupIndex + 1}
          </div>
          <div>
            <div className="text-sm font-bold" style={{ color: NAVY, fontFamily: SERIF }}>
              {group.title}
            </div>
            <div className="text-[11px]" style={{ color: TEXT_GRAY }}>
              {done} of {total} completed
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Progress bar */}
          <div className="w-20 h-1.5 rounded-full hidden sm:block" style={{ backgroundColor: LIGHT_GRAY }}>
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${(done / total) * 100}%`, backgroundColor: allDone ? GOLD : NAVY }}
            />
          </div>
          <span className="text-[18px] text-gray-400 transition-transform" style={{ transform: open ? "rotate(180deg)" : undefined }}>
            ›
          </span>
        </div>
      </button>

      {open && (
        <div className="divide-y" style={{ divideColor: BORDER_GRAY }}>
          {group.items.map((item, i) => {
            const key = `${groupIndex}-${i}`;
            const isChecked = !!checked[key];
            return (
              <button
                key={i}
                onClick={() => onToggle(key)}
                className="w-full flex items-start gap-4 px-6 py-3.5 text-left transition-colors hover:bg-gray-50"
                style={{ backgroundColor: isChecked ? "rgba(195,154,59,0.03)" : "white" }}
              >
                <div
                  className="w-5 h-5 rounded border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all"
                  style={{
                    borderColor: isChecked ? GOLD : BORDER_GRAY,
                    backgroundColor: isChecked ? GOLD : "white",
                  }}
                >
                  {isChecked && <CheckCircle size={11} color="white" />}
                </div>
                <span
                  className="text-[13px] leading-relaxed transition-all"
                  style={{
                    color: isChecked ? TEXT_GRAY : NAVY,
                    textDecoration: isChecked ? "line-through" : undefined,
                  }}
                >
                  {item}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function Checklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const toggle = (key: string) => setChecked(prev => ({ ...prev, [key]: !prev[key] }));

  const totalItems = GROUPS.reduce((sum, g) => sum + g.items.length, 0);
  const doneItems = Object.values(checked).filter(Boolean).length;
  const pct = Math.round((doneItems / totalItems) * 100);

  return (
    <>
      <PageBanner
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "For Authors" }, { label: "Manuscript Preparation Checklist" }]}
        title="Manuscript Preparation Checklist"
        subtitle="A practical checklist for authors before submitting a manuscript to CAJAIDT."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14">
        {/* Overall progress */}
        <div
          className="rounded-xl p-6 mb-10 flex flex-col sm:flex-row items-start sm:items-center gap-5"
          style={{ backgroundColor: NAVY }}
        >
          <div className="flex-1">
            <div className="text-white font-bold text-lg mb-1" style={{ fontFamily: SERIF }}>
              Submission Readiness
            </div>
            <div className="text-[13px]" style={{ color: "#b8c8da" }}>
              {doneItems} of {totalItems} checklist items confirmed
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16">
              <svg viewBox="0 0 36 36" className="w-16 h-16 -rotate-90">
                <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="3" />
                <circle
                  cx="18" cy="18" r="15.5"
                  fill="none"
                  stroke={GOLD}
                  strokeWidth="3"
                  strokeDasharray={`${pct} 100`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold text-white">{pct}%</span>
              </div>
            </div>
            {pct === 100 && (
              <span
                className="text-xs font-bold px-3 py-1.5 rounded-full text-white"
                style={{ backgroundColor: GOLD }}
              >
                Ready!
              </span>
            )}
          </div>
        </div>

        {/* Checklist groups */}
        <div className="space-y-4">
          {GROUPS.map((group, gi) => (
            <ChecklistGroup
              key={gi}
              group={group}
              groupIndex={gi}
              checked={checked}
              onToggle={toggle}
            />
          ))}
        </div>

        {/* Note */}
        <div
          className="mt-8 rounded-xl p-5"
          style={{ backgroundColor: LIGHT_GRAY, border: `1px solid ${BORDER_GRAY}` }}
        >
          <p className="text-[12px] leading-relaxed" style={{ color: TEXT_GRAY }}>
            This checklist is a practical tool to help authors self-assess their manuscript before submission. Completing all items does not guarantee acceptance, but it helps ensure the manuscript meets the journal's basic requirements and reduces the likelihood of desk rejection.
          </p>
        </div>
      </div>

      <BottomCTA
        title="Ready to submit?"
        primaryLabel="Start Submission"
        primaryHref="/submit"
        secondaryLabel="Download Checklist"
        secondaryHref="#"
      />
    </>
  );
}
