import { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import { CheckCircle, Upload, Plus, Trash2 } from "lucide-react";
import { useAuth } from "../AuthContext";
import { createSubmission, updateSubmission, uploadSubmissionFile, submitSubmission } from "../api";
import {
  NAVY, GOLD, LIGHT, BORDER, TEXT, SERIF,
  PortalLayout, Card, PrimaryBtn, SecondaryBtn, GhostBtn,
  FieldLabel, TextInput, TextArea, SelectInput, SidebarItem,
} from "./portalShared";

const NAV: SidebarItem[] = [
  { label: "Dashboard", to: "/portal/author" },
  { label: "New Submission", to: "/portal/author/submit" },
  { label: "My Submissions", to: "/portal/author/submissions" },
  { label: "Revisions", to: "/portal/author/revisions" },
  { label: "Messages", to: "/portal/author/messages" },
  { label: "Profile", to: "/portal/author/profile" },
  { label: "Help Center", to: "/portal/author/help" },
];

const STEPS = [
  "Start",
  "Manuscript Details",
  "Upload Files",
  "Authors & Affiliations",
  "Metadata",
  "Ethics & Declarations",
  "Review & Submit",
];

const ARTICLE_TYPES = [
  "Original Research Article",
  "Review Article",
  "Systematic Literature Review",
  "Case Study",
  "Technical Note",
  "Short Communication",
  "Perspective / Policy Paper",
];

const SUBJECT_AREAS = [
  "Artificial Intelligence and Machine Learning",
  "Data Science and Big Data Analytics",
  "Natural Language Processing and Computer Vision",
  "Digital Transformation",
  "Human-Centered AI and HCI",
  "Cybersecurity and AI Governance",
  "Smart Cities and IoT",
  "Digital Economy and FinTech",
  "Applied AI for Sustainable Development",
];

interface CoAuthor {
  name: string;
  email: string;
  orcid: string;
  country: string;
  affiliation: string;
  is_corresponding: boolean;
}

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-0 mb-8 overflow-x-auto pb-2">
      {STEPS.map((stepLabel, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={i} className="flex items-center flex-shrink-0">
            <div className="flex flex-col items-center gap-1">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                style={{
                  backgroundColor: done ? GOLD : active ? NAVY : LIGHT,
                  color: done || active ? "white" : TEXT,
                  border: active ? `2px solid ${NAVY}` : "none",
                }}
              >
                {done ? <CheckCircle size={14} /> : i + 1}
              </div>
              <span
                className="text-[9px] font-semibold text-center whitespace-nowrap hidden sm:block"
                style={{ color: active ? NAVY : done ? GOLD : TEXT }}
              >
                {stepLabel}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className="h-0.5 mx-2 flex-shrink-0"
                style={{ width: "30px", backgroundColor: i < current ? GOLD : BORDER }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function FileUploadCard({
  label, note, required, file, onUpload, onRemove,
}: {
  label: string; note: string; required?: boolean;
  file: File | null; onUpload: (f: File) => void; onRemove: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div
      className="rounded-xl border p-4 flex items-center gap-4"
      style={{ borderColor: file ? GOLD : BORDER, backgroundColor: file ? "rgba(195,154,59,0.04)" : "white" }}
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: file ? "rgba(195,154,59,0.1)" : LIGHT }}
      >
        {file ? <CheckCircle size={18} style={{ color: GOLD }} /> : <Upload size={18} style={{ color: TEXT }} />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-semibold flex items-center gap-2" style={{ color: NAVY }}>
          {label}
          {required && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded text-white" style={{ backgroundColor: GOLD }}>Required</span>}
        </div>
        <div className="text-[11px]" style={{ color: TEXT }}>{note}</div>
        {file && <div className="text-[11px] mt-0.5" style={{ color: GOLD }}>{file.name} — Selected</div>}
      </div>
      <input ref={inputRef} type="file" className="hidden" onChange={(e) => { if (e.target.files?.[0]) onUpload(e.target.files[0]); }} />
      <div className="flex gap-2">
        {file ? (
          <>
            <GhostBtn onClick={() => inputRef.current?.click()}>Replace</GhostBtn>
            <button type="button" onClick={onRemove} className="p-2 rounded hover:bg-red-50 transition-colors">
              <Trash2 size={14} style={{ color: "#DC2626" }} />
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="px-4 py-1.5 text-xs font-semibold rounded-lg border transition-colors hover:bg-gray-50"
            style={{ borderColor: BORDER, color: NAVY }}
          >
            Upload File
          </button>
        )}
      </div>
    </div>
  );
}

function DeclarationCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border p-5" style={{ borderColor: BORDER }}>
      <div className="text-sm font-bold mb-3" style={{ color: NAVY }}>{title}</div>
      {children}
    </div>
  );
}

export default function NewSubmission() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const [submissionId, setSubmissionId] = useState<number | null>(null);
  const [manuscriptId, setManuscriptId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [confirmations, setConfirmations] = useState<boolean[]>(Array(5).fill(false));

  // Step 0
  const [articleType, setArticleType] = useState("");
  const [language, setLanguage] = useState("");

  // Step 1
  const [title, setTitle] = useState("");
  const [runningTitle, setRunningTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [keywords, setKeywords] = useState("");
  const [subjectArea, setSubjectArea] = useState("");
  const [coverLetterText, setCoverLetterText] = useState("");

  // Step 2 - files
  const [manuscriptFile, setManuscriptFile] = useState<File | null>(null);
  const [titlePageFile, setTitlePageFile] = useState<File | null>(null);
  const [coverLetterFile, setCoverLetterFile] = useState<File | null>(null);
  const [ethicsFile, setEthicsFile] = useState<File | null>(null);
  const [supplementaryFile, setSupplementaryFile] = useState<File | null>(null);

  // Step 3 - authors
  const [coAuthors, setCoAuthors] = useState<CoAuthor[]>([{
    name: user?.full_name || "",
    email: user?.email || "",
    orcid: user?.orcid_id || "",
    country: user?.country || "",
    affiliation: user?.affiliation || "",
    is_corresponding: true,
  }]);

  // Step 4 - metadata
  const [englishTitle, setEnglishTitle] = useState("");
  const [englishAbstract, setEnglishAbstract] = useState("");
  const [englishKeywords, setEnglishKeywords] = useState("");
  const [references, setReferences] = useState("");
  const [fundingInfo, setFundingInfo] = useState("");
  const [dataAvailability, setDataAvailability] = useState("");

  // Step 5 - ethics
  const [conflictOfInterest, setConflictOfInterest] = useState("");
  const [aiUseDisclosure, setAiUseDisclosure] = useState("");
  const [ethicsApproval, setEthicsApproval] = useState("");

  const toggleConfirm = (i: number) =>
    setConfirmations((prev) => prev.map((v, idx) => idx === i ? !v : v));
  const allConfirmed = confirmations.every(Boolean);

  const CONFIRMS = [
    "My manuscript fits the journal's aims and scope.",
    "The manuscript is original and has not been published elsewhere.",
    "The manuscript is not under consideration by another journal.",
    "I have read and understood the Author Guidelines.",
    "I understand the manuscript will undergo editorial screening and double-blind peer review.",
  ];

  const addCoAuthor = () => {
    setCoAuthors([...coAuthors, { name: "", email: "", orcid: "", country: "", affiliation: "", is_corresponding: false }]);
  };

  const updateCoAuthor = (idx: number, field: keyof CoAuthor, value: string | boolean) => {
    setCoAuthors((prev) => prev.map((a, i) => i === idx ? { ...a, [field]: value } : a));
  };

  const removeCoAuthor = (idx: number) => {
    if (coAuthors.length <= 1) return;
    setCoAuthors((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSaveDraft = async () => {
    setLoading(true);
    setError("");
    try {
      const data = {
        title, article_type: articleType, language,
        running_title: runningTitle, abstract, keywords,
        cover_letter_text: coverLetterText,
        co_authors: coAuthors,
        english_title: englishTitle, english_abstract: englishAbstract,
        english_keywords: englishKeywords.split(";").map((k) => k.trim()).filter(Boolean),
        references, funding_info: fundingInfo,
        data_availability_statement: dataAvailability,
        conflict_of_interest: conflictOfInterest,
        ai_use_disclosure: aiUseDisclosure,
        ethics_approval_details: ethicsApproval,
      };
      if (submissionId) {
        await updateSubmission(submissionId, data);
      } else {
        const created = await createSubmission(data);
        setSubmissionId(created.id);
        setManuscriptId(created.manuscript_id || "");
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to save draft");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      let sid = submissionId;
      if (!sid) {
        const created = await createSubmission({
          title, article_type: articleType, language,
          running_title: runningTitle, abstract, keywords,
          cover_letter_text: coverLetterText,
          co_authors: coAuthors,
          english_title: englishTitle, english_abstract: englishAbstract,
          english_keywords: englishKeywords.split(";").map((k) => k.trim()).filter(Boolean),
          references, funding_info: fundingInfo,
          data_availability_statement: dataAvailability,
          conflict_of_interest: conflictOfInterest,
          ai_use_disclosure: aiUseDisclosure,
          ethics_approval_details: ethicsApproval,
        });
        sid = created.id;
        setSubmissionId(sid);
        setManuscriptId(created.manuscript_id || "");
      } else {
        await updateSubmission(sid, {
          title, article_type: articleType, language,
          running_title: runningTitle, abstract, keywords,
          cover_letter_text: coverLetterText,
          co_authors: coAuthors,
          english_title: englishTitle, english_abstract: englishAbstract,
          english_keywords: englishKeywords.split(";").map((k) => k.trim()).filter(Boolean),
          references, funding_info: fundingInfo,
          data_availability_statement: dataAvailability,
          conflict_of_interest: conflictOfInterest,
          ai_use_disclosure: aiUseDisclosure,
          ethics_approval_details: ethicsApproval,
        });
      }

      if (manuscriptFile) await uploadSubmissionFile(sid, manuscriptFile, "manuscript");
      if (titlePageFile) await uploadSubmissionFile(sid, titlePageFile, "title_page");
      if (coverLetterFile) await uploadSubmissionFile(sid, coverLetterFile, "cover_letter_file");
      if (ethicsFile) await uploadSubmissionFile(sid, ethicsFile, "ethics_approval");
      if (supplementaryFile) await uploadSubmissionFile(sid, supplementaryFile, "supplementary");

      const result = await submitSubmission(sid);
      setManuscriptId(result.manuscript_id || manuscriptId);
      navigate("/portal/author/submission-success");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PortalLayout role="Author" name={user?.full_name || "Author"} navItems={NAV} activePath={pathname}>
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold" style={{ color: NAVY, fontFamily: SERIF }}>
            New Manuscript Submission
          </h1>
          <p className="text-sm mt-1" style={{ color: TEXT }}>
            Complete all steps to submit your manuscript.
          </p>
        </div>

        <StepIndicator current={step} />

        {error && (
          <div className="mb-4 p-3 rounded-lg text-sm text-red-700 bg-red-50 border border-red-200">{error}</div>
        )}

        <Card className="p-6 md:p-8">
          {step === 0 && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold" style={{ color: NAVY, fontFamily: SERIF }}>Start Your Submission</h2>
              <div>
                <FieldLabel required>Article Type</FieldLabel>
                <SelectInput options={ARTICLE_TYPES} placeholder="Select article type..." value={articleType} onChange={setArticleType} />
              </div>
              <div>
                <FieldLabel required>Manuscript Language</FieldLabel>
                <SelectInput options={["English", "Uzbek", "Russian"]} placeholder="Select language..." value={language} onChange={setLanguage} />
                <p className="text-[11px] mt-1.5" style={{ color: TEXT }}>
                  For Uzbek and Russian manuscripts, an English title, abstract, and keywords are required.
                </p>
              </div>
              <div>
                <FieldLabel required>Confirmations</FieldLabel>
                <div className="space-y-3 mt-1">
                  {CONFIRMS.map((txt, i) => (
                    <label key={i} className="flex items-start gap-3 cursor-pointer group">
                      <div
                        onClick={() => toggleConfirm(i)}
                        className="w-5 h-5 rounded border-2 flex-shrink-0 mt-0.5 flex items-center justify-center cursor-pointer transition-colors"
                        style={{ borderColor: confirmations[i] ? GOLD : BORDER, backgroundColor: confirmations[i] ? GOLD : "white" }}
                      >
                        {confirmations[i] && <CheckCircle size={12} color="white" />}
                      </div>
                      <span className="text-[13px] leading-relaxed" style={{ color: NAVY }} onClick={() => toggleConfirm(i)}>
                        {txt}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-5">
              <h2 className="text-lg font-bold" style={{ color: NAVY, fontFamily: SERIF }}>Manuscript Details</h2>
              <div><FieldLabel required>Manuscript Title</FieldLabel><TextInput placeholder="Full title of the manuscript" value={title} onChange={setTitle} /></div>
              <div><FieldLabel>Running Title</FieldLabel><TextInput placeholder="Short title (max 60 characters)" value={runningTitle} onChange={setRunningTitle} /></div>
              <div><FieldLabel required>Abstract</FieldLabel><TextArea rows={6} placeholder="180-250 words." value={abstract} onChange={setAbstract} /></div>
              <div><FieldLabel required>Keywords</FieldLabel><TextInput placeholder="Keyword 1; Keyword 2; Keyword 3" value={keywords} onChange={setKeywords} /></div>
              <div><FieldLabel>Subject Area</FieldLabel><SelectInput options={SUBJECT_AREAS} placeholder="Select subject area..." value={subjectArea} onChange={setSubjectArea} /></div>
              <div><FieldLabel>Cover Letter (text)</FieldLabel><TextArea rows={4} placeholder="Briefly explain the manuscript's contribution." value={coverLetterText} onChange={setCoverLetterText} /></div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <h2 className="text-lg font-bold" style={{ color: NAVY, fontFamily: SERIF }}>Upload Files</h2>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider mb-3" style={{ color: GOLD }}>Required Files</div>
                <div className="space-y-3">
                  <FileUploadCard label="Anonymized Manuscript File" note="Word (.docx) required" required file={manuscriptFile} onUpload={setManuscriptFile} onRemove={() => setManuscriptFile(null)} />
                  <FileUploadCard label="Title Page" note="Contains author details" required file={titlePageFile} onUpload={setTitlePageFile} onRemove={() => setTitlePageFile(null)} />
                </div>
              </div>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider mb-3" style={{ color: TEXT }}>Optional Files</div>
                <div className="space-y-3">
                  <FileUploadCard label="Cover Letter File" note="PDF or Word" file={coverLetterFile} onUpload={setCoverLetterFile} onRemove={() => setCoverLetterFile(null)} />
                  <FileUploadCard label="Ethics Approval Document" note="If applicable" file={ethicsFile} onUpload={setEthicsFile} onRemove={() => setEthicsFile(null)} />
                  <FileUploadCard label="Supplementary Files" note="Any format" file={supplementaryFile} onUpload={setSupplementaryFile} onRemove={() => setSupplementaryFile(null)} />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold" style={{ color: NAVY, fontFamily: SERIF }}>Authors & Affiliations</h2>
              {coAuthors.map((author, idx) => (
                <div key={idx} className="rounded-xl border p-5" style={{ borderColor: BORDER }}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm font-bold" style={{ color: NAVY }}>Author {idx + 1}</div>
                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-2 text-[12px] cursor-pointer" style={{ color: TEXT }}>
                        <input type="checkbox" checked={author.is_corresponding} onChange={(e) => updateCoAuthor(idx, "is_corresponding", e.target.checked)} /> Corresponding Author
                      </label>
                      {coAuthors.length > 1 && (
                        <button type="button" onClick={() => removeCoAuthor(idx)} className="p-1 rounded hover:bg-red-50">
                          <Trash2 size={14} style={{ color: "#DC2626" }} />
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div><FieldLabel required>Full Name</FieldLabel><TextInput placeholder="First Last" value={author.name} onChange={(v) => updateCoAuthor(idx, "name", v)} /></div>
                    <div><FieldLabel required>Email</FieldLabel><TextInput placeholder="author@institution.edu" value={author.email} onChange={(v) => updateCoAuthor(idx, "email", v)} /></div>
                    <div><FieldLabel>ORCID ID</FieldLabel><TextInput placeholder="0000-0000-0000-0000" value={author.orcid} onChange={(v) => updateCoAuthor(idx, "orcid", v)} /></div>
                    <div><FieldLabel required>Country</FieldLabel><SelectInput options={["Uzbekistan", "Kazakhstan", "Germany", "United Kingdom", "Other"]} placeholder="Select country..." value={author.country} onChange={(v) => updateCoAuthor(idx, "country", v)} /></div>
                    <div className="sm:col-span-2"><FieldLabel required>Affiliation</FieldLabel><TextInput placeholder="University / Institution, Department" value={author.affiliation} onChange={(v) => updateCoAuthor(idx, "affiliation", v)} /></div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addCoAuthor}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg border-2 transition-opacity hover:opacity-70"
                style={{ color: NAVY, borderColor: NAVY }}
              >
                <Plus size={15} /> Add Co-author
              </button>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-5">
              <h2 className="text-lg font-bold" style={{ color: NAVY, fontFamily: SERIF }}>Metadata</h2>
              <div><FieldLabel required>English Title</FieldLabel><TextInput placeholder="English title of the manuscript" value={englishTitle} onChange={setEnglishTitle} /></div>
              <div><FieldLabel required>English Abstract</FieldLabel><TextArea rows={5} placeholder="English abstract (180-250 words)" value={englishAbstract} onChange={setEnglishAbstract} /></div>
              <div><FieldLabel required>English Keywords</FieldLabel><TextInput placeholder="Keyword 1; Keyword 2; Keyword 3" value={englishKeywords} onChange={setEnglishKeywords} /></div>
              <div><FieldLabel>References</FieldLabel><TextArea rows={6} placeholder="Paste formatted references here..." value={references} onChange={setReferences} /></div>
              <div><FieldLabel>Funding Information</FieldLabel><TextInput placeholder="Funding agency, grant number, or 'No funding'" value={fundingInfo} onChange={setFundingInfo} /></div>
              <div><FieldLabel>Data Availability Statement</FieldLabel><TextInput placeholder="Data are available upon request / at [repository URL]" value={dataAvailability} onChange={setDataAvailability} /></div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-5">
              <h2 className="text-lg font-bold" style={{ color: NAVY, fontFamily: SERIF }}>Ethics & Declarations</h2>
              <DeclarationCard title="Conflict of Interest">
                <SelectInput
                  options={["No conflict of interest", "Conflict of interest declared"]}
                  placeholder="Select..."
                  value={conflictOfInterest}
                  onChange={setConflictOfInterest}
                />
              </DeclarationCard>
              <DeclarationCard title="AI Use Disclosure">
                <SelectInput
                  options={["No AI tools used beyond basic grammar/spelling correction", "AI tools were used and disclosed"]}
                  placeholder="Select..."
                  value={aiUseDisclosure}
                  onChange={setAiUseDisclosure}
                />
              </DeclarationCard>
              <DeclarationCard title="Ethics Approval">
                <SelectInput
                  options={["Not applicable", "Ethics approval obtained", "Ethics approval required but pending"]}
                  placeholder="Select..."
                  value={ethicsApproval}
                  onChange={setEthicsApproval}
                />
              </DeclarationCard>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-5">
              <h2 className="text-lg font-bold" style={{ color: NAVY, fontFamily: SERIF }}>Review & Submit</h2>
              <p className="text-sm" style={{ color: TEXT }}>
                Review your submission summary before final submission.
              </p>
              <div className="space-y-3">
                {[
                  { label: "Article Type", value: articleType || "—", ok: !!articleType },
                  { label: "Language", value: language || "—", ok: !!language },
                  { label: "Manuscript Title", value: title || "—", ok: !!title },
                  { label: "Authors", value: coAuthors.map((a) => a.name).filter(Boolean).join(", ") || "—", ok: coAuthors.some((a) => a.name) },
                  { label: "Abstract", value: abstract ? `Completed (${abstract.split(/\s+/).length} words)` : "—", ok: !!abstract },
                  { label: "Keywords", value: keywords || "—", ok: !!keywords },
                  { label: "Anonymized Manuscript", value: manuscriptFile?.name || "Not uploaded", ok: !!manuscriptFile },
                  { label: "Title Page", value: titlePageFile?.name || "Not uploaded", ok: !!titlePageFile },
                  { label: "Ethics & Declarations", value: conflictOfInterest ? "Completed" : "Not completed", ok: !!conflictOfInterest },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between rounded-lg px-4 py-3"
                    style={{ backgroundColor: row.ok ? "#F0FDF4" : "#FEF2F2", border: `1px solid ${row.ok ? "#BBF7D0" : "#FECACA"}` }}
                  >
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider" style={{ color: row.ok ? "#15803D" : "#DC2626" }}>
                        {row.label}
                      </div>
                      <div className="text-[13px]" style={{ color: NAVY }}>{row.value}</div>
                    </div>
                    <CheckCircle size={18} style={{ color: row.ok ? "#16A34A" : "#DC2626", flexShrink: 0 }} />
                  </div>
                ))}
              </div>
              <div
                className="rounded-xl p-4 border-l-4"
                style={{ backgroundColor: "rgba(6,38,74,0.04)", borderLeft: `4px solid ${NAVY}`, border: `1px solid ${BORDER}` }}
              >
                <p className="text-[12px]" style={{ color: TEXT }}>
                  By clicking Submit, you confirm that all information is accurate, all authors have approved the submission, and all required declarations have been made.
                </p>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mt-8 pt-6 border-t" style={{ borderColor: BORDER }}>
            <div className="flex gap-3">
              {step > 0 && <SecondaryBtn onClick={() => setStep(step - 1)}>Back</SecondaryBtn>}
              <GhostBtn onClick={handleSaveDraft}>{loading ? "Saving..." : "Save Draft"}</GhostBtn>
            </div>
            {step < STEPS.length - 1 ? (
              <PrimaryBtn
                onClick={() => setStep(step + 1)}
                disabled={step === 0 && (!allConfirmed || !articleType || !language)}
              >
                Continue
              </PrimaryBtn>
            ) : (
              <PrimaryBtn onClick={handleSubmit} disabled={loading}>
                {loading ? "Submitting..." : "Submit Manuscript"}
              </PrimaryBtn>
            )}
          </div>
        </Card>
      </div>
    </PortalLayout>
  );
}
