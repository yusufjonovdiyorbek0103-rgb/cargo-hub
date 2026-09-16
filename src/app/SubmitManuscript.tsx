import { useState } from "react";
import { CheckCircle, Upload, Mail, Clock, ArrowRight } from "lucide-react";
import {
  NAVY, GOLD, LIGHT_GRAY, TEXT_GRAY, BORDER_GRAY, SERIF,
  PageBanner, BottomCTA, SectionHeader, ProseSection, InfoBox,
} from "./shared";

const PRE_SUBMIT_CHECKLIST = [
  "The manuscript fits the journal's aims and scope.",
  "The manuscript is original and has not been published elsewhere.",
  "The manuscript is not under review by another journal.",
  "The manuscript has been anonymized for double-blind review.",
  "The title page is prepared as a separate file.",
  "English title, abstract, and keywords are included.",
  "References are complete and accurate.",
  "All declarations are included (funding, conflicts, data availability).",
  "Figures and tables are properly numbered.",
  "The corresponding author has confirmed all co-author details.",
];

const SUBMISSION_STEPS = [
  {
    num: 1,
    title: "Create or log in to your account",
    desc: "Authors must register with the online journal platform and complete their profile information before starting a submission.",
  },
  {
    num: 2,
    title: "Start a new submission",
    desc: "Select the appropriate article type and confirm that the manuscript follows the journal's scope and formatting requirements.",
  },
  {
    num: 3,
    title: "Upload manuscript files",
    desc: "Upload the anonymized manuscript, title page, figures, tables, supplementary files, and cover letter where applicable.",
  },
  {
    num: 4,
    title: "Enter metadata",
    desc: "Provide the title, abstract, keywords, author details, affiliations, references, and all required declarations.",
  },
  {
    num: 5,
    title: "Confirm ethical statements",
    desc: "Confirm originality, authorship, conflicts of interest, funding, data availability, and AI-use disclosure where relevant.",
  },
  {
    num: 6,
    title: "Review and submit",
    desc: "Review all submission information carefully for accuracy and completeness before clicking final submission.",
  },
];

const REQUIRED_FILES = [
  { label: "Anonymized Manuscript", required: true, desc: "Main manuscript file with author information removed." },
  { label: "Title Page", required: true, desc: "Separate file with full author details, affiliations, and contact." },
  { label: "Cover Letter", required: true, desc: "Brief letter explaining contribution and originality." },
  { label: "Figures and Tables", required: false, note: "if separate", desc: "High-resolution figures as separate image files." },
  { label: "Supplementary Files", required: false, note: "if applicable", desc: "Supporting data, code, or additional material." },
  { label: "Ethics Approval Document", required: false, note: "if applicable", desc: "Ethics committee approval or waiver letter." },
  { label: "Dataset or Code Link", required: false, note: "if applicable", desc: "URL to open repository containing research data or code." },
];

const STATUS_FLOW = [
  "Submitted",
  "Technical Check",
  "Editor Screening",
  "Under Review",
  "Revision Required",
  "Accepted / Rejected",
  "Copyediting",
  "Production",
  "Published",
];

export default function SubmitManuscript() {
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const toggle = (i: number) => setChecked(prev => ({ ...prev, [i]: !prev[i] }));
  const doneCount = Object.values(checked).filter(Boolean).length;

  return (
    <>
      <PageBanner
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "For Authors" }, { label: "Submit Manuscript" }]}
        title="Submit Manuscript"
        subtitle="Step-by-step instructions for submitting a manuscript through the CAJAIDT online submission system."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main */}
          <div className="lg:col-span-2 space-y-14">

            <InfoBox type="note">
              All manuscripts must be submitted through the online submission system. Email submissions are not accepted except in exceptional cases approved by the editorial office. Authors should carefully review the author guidelines, ethics requirements, and manuscript checklist before submission.
            </InfoBox>

            {/* Primary CTA — prominent */}
            <div
              className="rounded-xl p-8 text-center"
              style={{ backgroundColor: NAVY }}
            >
              <div className="text-[11px] font-bold tracking-widest uppercase mb-3" style={{ color: GOLD }}>
                Online Submission Portal
              </div>
              <h2 className="text-xl font-bold text-white mb-3" style={{ fontFamily: SERIF }}>
                Ready to submit your manuscript?
              </h2>
              <p className="text-sm mb-6" style={{ color: "#b8c8da" }}>
                All submissions are acknowledged within 48 hours. Technical screening begins immediately.
              </p>
              <a
                href="#"
                className="inline-block px-8 py-3 text-sm font-bold text-white rounded transition-opacity hover:opacity-90"
                style={{ backgroundColor: GOLD }}
              >
                Start Submission
              </a>
            </div>

            {/* Before You Submit */}
            <section>
              <SectionHeader
                eyebrow="Pre-submission"
                title="Before You Submit"
                subtitle="Confirm all items before starting your submission to avoid delays."
              />
              {/* Progress indicator */}
              {doneCount > 0 && (
                <div
                  className="flex items-center gap-3 rounded-lg px-4 py-3 mb-4"
                  style={{ backgroundColor: "rgba(195,154,59,0.08)", border: `1px solid ${GOLD}` }}
                >
                  <CheckCircle size={16} style={{ color: GOLD }} />
                  <span className="text-xs font-semibold" style={{ color: NAVY }}>
                    {doneCount} of {PRE_SUBMIT_CHECKLIST.length} items confirmed
                  </span>
                </div>
              )}
              <div className="space-y-2">
                {PRE_SUBMIT_CHECKLIST.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => toggle(i)}
                    className="w-full flex items-start gap-3 rounded-lg px-4 py-3 text-left transition-colors hover:bg-gray-50"
                    style={{
                      border: `1px solid ${checked[i] ? GOLD : BORDER_GRAY}`,
                      backgroundColor: checked[i] ? "rgba(195,154,59,0.04)" : "white",
                    }}
                  >
                    <div
                      className="w-5 h-5 rounded border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-colors"
                      style={{
                        borderColor: checked[i] ? GOLD : BORDER_GRAY,
                        backgroundColor: checked[i] ? GOLD : "white",
                      }}
                    >
                      {checked[i] && <CheckCircle size={12} color="white" />}
                    </div>
                    <span
                      className="text-[13px] leading-relaxed transition-colors"
                      style={{
                        color: checked[i] ? TEXT_GRAY : NAVY,
                        textDecoration: checked[i] ? "line-through" : undefined,
                      }}
                    >
                      {item}
                    </span>
                  </button>
                ))}
              </div>
            </section>

            <div className="border-t" style={{ borderColor: BORDER_GRAY }} />

            {/* Submission Steps */}
            <section>
              <SectionHeader eyebrow="Process" title="Submission Steps" />
              <div className="space-y-5">
                {SUBMISSION_STEPS.map((step, i) => (
                  <div key={i} className="flex gap-5">
                    <div className="flex flex-col items-center">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                        style={{ backgroundColor: i === 5 ? GOLD : NAVY }}
                      >
                        {step.num}
                      </div>
                      {i < SUBMISSION_STEPS.length - 1 && (
                        <div className="w-px flex-1 my-2" style={{ backgroundColor: BORDER_GRAY }} />
                      )}
                    </div>
                    <div className="pb-5 flex-1">
                      <div className="text-sm font-bold mb-1" style={{ color: NAVY }}>{step.title}</div>
                      <p className="text-[13px] leading-relaxed" style={{ color: TEXT_GRAY }}>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div className="border-t" style={{ borderColor: BORDER_GRAY }} />

            {/* Required Files */}
            <section>
              <SectionHeader eyebrow="File Upload" title="Required Files" />
              <div className="space-y-3">
                {REQUIRED_FILES.map((file, i) => (
                  <div
                    key={i}
                    className="rounded-lg border p-4 flex items-start gap-4"
                    style={{ borderColor: BORDER_GRAY }}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: file.required ? "rgba(6,38,74,0.07)" : LIGHT_GRAY }}
                    >
                      <Upload size={15} style={{ color: file.required ? NAVY : TEXT_GRAY }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-0.5">
                        <span className="text-sm font-semibold" style={{ color: NAVY }}>{file.label}</span>
                        {file.required ? (
                          <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded" style={{ color: "#fff", backgroundColor: GOLD }}>
                            Required
                          </span>
                        ) : (
                          <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded" style={{ color: TEXT_GRAY, backgroundColor: LIGHT_GRAY }}>
                            {file.note}
                          </span>
                        )}
                      </div>
                      <p className="text-[12px]" style={{ color: TEXT_GRAY }}>{file.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div className="border-t" style={{ borderColor: BORDER_GRAY }} />

            {/* Cover Letter */}
            <section>
              <SectionHeader eyebrow="Documentation" title="Cover Letter" />
              <ProseSection>
                The cover letter should briefly explain the manuscript's contribution, originality, relevance to the journal scope, and confirmation that the manuscript is not under consideration elsewhere. A well-written cover letter helps the editors efficiently assess the fit of the submission.
              </ProseSection>
            </section>

            <div className="border-t" style={{ borderColor: BORDER_GRAY }} />

            {/* After Submission */}
            <section>
              <SectionHeader eyebrow="Post-submission" title="After Submission" />
              <ProseSection>
                After submission, the editorial office conducts a technical and editorial screening. Manuscripts that meet the journal's requirements may be assigned to a section editor and sent for double-blind peer review. Manuscripts that do not meet the scope, formatting, originality, or ethical requirements may be returned or rejected before external review.
              </ProseSection>
            </section>

            <div className="border-t" style={{ borderColor: BORDER_GRAY }} />

            {/* Status Flow */}
            <section>
              <SectionHeader eyebrow="Workflow" title="Submission Status" />
              <div className="overflow-x-auto pb-2">
                <div className="flex items-center gap-0 min-w-max">
                  {STATUS_FLOW.map((status, i) => (
                    <div key={i} className="flex items-center">
                      <div
                        className="flex flex-col items-center gap-1.5"
                        style={{ minWidth: "90px" }}
                      >
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                          style={{ backgroundColor: status === "Published" ? GOLD : status === "Accepted / Rejected" ? "#9CA3AF" : NAVY }}
                        >
                          {i + 1}
                        </div>
                        <div className="text-[10px] font-semibold text-center leading-tight" style={{ color: NAVY, maxWidth: "80px" }}>
                          {status}
                        </div>
                      </div>
                      {i < STATUS_FLOW.length - 1 && (
                        <ArrowRight size={14} style={{ color: BORDER_GRAY, flexShrink: 0, margin: "0 2px", marginBottom: "16px" }} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-5">
              {/* Help card */}
              <div className="rounded-xl border overflow-hidden" style={{ borderColor: BORDER_GRAY }}>
                <div className="px-5 py-4" style={{ backgroundColor: NAVY }}>
                  <h3 className="text-sm font-bold text-white">Need Help?</h3>
                </div>
                <div className="px-5 py-5 space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail size={16} style={{ color: GOLD, flexShrink: 0, marginTop: 1 }} />
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider mb-0.5" style={{ color: TEXT_GRAY }}>Editorial Office</div>
                      <a href="mailto:editorial@cajaidt.org" className="text-xs font-semibold hover:underline" style={{ color: NAVY }}>
                        editorial@cajaidt.org
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock size={16} style={{ color: GOLD, flexShrink: 0, marginTop: 1 }} />
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider mb-0.5" style={{ color: TEXT_GRAY }}>Response Time</div>
                      <span className="text-xs font-semibold" style={{ color: NAVY }}>3–5 working days</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick links */}
              <div className="rounded-xl border overflow-hidden" style={{ borderColor: BORDER_GRAY }}>
                <div className="px-5 py-4" style={{ backgroundColor: LIGHT_GRAY }}>
                  <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: NAVY }}>Before Submitting</h3>
                </div>
                <ul className="divide-y divide-gray-100">
                  {[
                    { label: "Author Guidelines", to: "/author-guidelines" },
                    { label: "Manuscript Checklist", to: "/checklist" },
                    { label: "Peer Review Policy", to: "/peer-review-policy" },
                    { label: "Publication Ethics", to: "/publication-ethics" },
                    { label: "AI Use Policy", to: "/ai-use-policy" },
                  ].map((link, i) => (
                    <li key={i}>
                      <a
                        href={link.to}
                        className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-colors text-xs font-medium"
                        style={{ color: NAVY }}
                      >
                        {link.label}
                        <ArrowRight size={11} style={{ color: GOLD }} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomCTA
        title="Ready to submit your manuscript?"
        primaryLabel="Start Submission"
        primaryHref="#"
        secondaryLabel="Read Author Guidelines"
        secondaryHref="/author-guidelines"
      />
    </>
  );
}
