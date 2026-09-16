import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import {
  NAVY, GOLD, LIGHT_GRAY, TEXT_GRAY, BORDER_GRAY, SERIF,
  PageBanner, SectionHeader, NavA,
} from "./shared";

const CATEGORIES = [
  "For Authors",
  "For Reviewers",
  "For Editors",
  "Submission Platform",
  "Policies",
  "Publication Process",
];

const FAQ: Record<string, { q: string; a: string }[]> = {
  "For Authors": [
    {
      q: "How do I submit a manuscript?",
      a: "Create an account on the CAJAIDT submission portal, click 'New Submission', and complete all required steps: confirm eligibility, enter manuscript details, upload files, provide author information, complete metadata and declarations, then submit. You will receive a confirmation email with your manuscript ID.",
    },
    {
      q: "Can I submit by email?",
      a: "Manuscripts should be submitted through the online submission system. Email submission is not normally accepted.",
    },
    {
      q: "What languages are accepted?",
      a: "CAJAIDT accepts manuscripts in English, Uzbek, and Russian. An English title, abstract, and keywords are required for all manuscripts regardless of the submission language.",
    },
    {
      q: "Is there a publication fee?",
      a: "Publication fees are to be announced. There is currently no submission fee. Any future fees will be published transparently on the Copyright & Fees page before being introduced.",
    },
    {
      q: "What file formats are accepted?",
      a: "The manuscript must be uploaded as a Word document (.docx). The title page, cover letter, and supplementary files may also be in PDF format. Figures should be in high-resolution TIFF, PNG, or JPEG format.",
    },
    {
      q: "How do I prepare for double-blind peer review?",
      a: "Remove all author names, affiliations, and identifying information from the main manuscript file. Upload this anonymized file as your manuscript. Include all author details on the separate title page document.",
    },
    {
      q: "What happens after submission?",
      a: "After submission, your manuscript undergoes a technical check, then editorial screening, and if passed, double-blind peer review. You can track the status of your submission from your author dashboard.",
    },
  ],
  "For Reviewers": [
    {
      q: "How do I accept a review invitation?",
      a: "Log in to the reviewer dashboard and select 'Accept' or 'Decline' for the assigned manuscript. Please respond promptly — typically within 3–5 working days of receiving the invitation.",
    },
    {
      q: "Can I use AI tools while reviewing?",
      a: "Reviewers must not upload confidential manuscript materials into external AI tools unless explicitly permitted by the journal and appropriate confidentiality safeguards are in place. Limited use of AI for grammar assistance is permissible provided reviewer responsibility for the assessment is maintained.",
    },
    {
      q: "How do I become a reviewer?",
      a: "Complete the Become a Reviewer application form with your academic background, expertise areas, and contact information. The editorial office will contact qualified applicants when suitable manuscripts are available.",
    },
    {
      q: "What should a review include?",
      a: "A complete review includes: evaluation of relevance, originality, methodology, results, discussion, and writing quality; a recommendation; specific comments for the authors; and any confidential notes for the editor. Refer to the Reviewer Guidelines for the full checklist.",
    },
  ],
  "For Editors": [
    {
      q: "How are manuscripts assigned to editors?",
      a: "The managing editor assigns manuscripts to section editors based on the subject area and scope of the submission. Editors can view and manage their assigned manuscripts from the editor dashboard.",
    },
    {
      q: "How do I invite reviewers?",
      a: "From the editor dashboard, open the manuscript detail, go to the Peer Review tab, and use the reviewer assignment panel to search for and invite qualified reviewers.",
    },
  ],
  "Submission Platform": [
    {
      q: "I forgot my password. How do I reset it?",
      a: "On the login page, click 'Forgot password?' and enter your registered email address. A reset link will be sent to your inbox. Check your spam folder if you do not receive it within a few minutes.",
    },
    {
      q: "Can I save a submission as a draft?",
      a: "Yes. During the submission process, you can click 'Save Draft' at any step. Your draft will be saved and accessible from your author dashboard under 'My Submissions'.",
    },
    {
      q: "How do I update my profile information?",
      a: "Log in to the portal and navigate to Profile & Account Settings from your dashboard sidebar. You can update your personal information, affiliations, ORCID ID, and notification preferences.",
    },
  ],
  "Policies": [
    {
      q: "What is the peer review model?",
      a: "CAJAIDT uses double-blind peer review. Authors do not know the identity of reviewers and reviewers do not know the identity of authors during the review process.",
    },
    {
      q: "What is the journal's policy on AI use?",
      a: "AI tools may be used for grammar, language, and formatting assistance but may not be listed as authors. AI-assisted content must be disclosed in the manuscript's declarations. Reviewers must not share manuscript content with external AI tools.",
    },
    {
      q: "Is the journal open access?",
      a: "CAJAIDT is planned as an open-access journal. The open access model and any associated licensing terms will be published on the Copyright & Fees page.",
    },
  ],
  "Publication Process": [
    {
      q: "Is the journal indexed?",
      a: "CAJAIDT is currently in development. Indexing applications are planned after the journal establishes a publication history and meets required indexing standards. View the Indexing Roadmap for the full transparency report.",
    },
    {
      q: "How long does peer review take?",
      a: "Peer review is conducted on a rolling basis. The review timeline depends on reviewer availability. Authors are notified of editorial decisions as soon as they are available.",
    },
    {
      q: "Can I withdraw my submission?",
      a: "Authors may request withdrawal before the manuscript enters peer review. Contact the editorial office through the Messages section of your author dashboard or by email.",
    },
  ],
};

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b last:border-b-0" style={{ borderColor: BORDER_GRAY }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="text-[14px] font-semibold leading-snug pr-2" style={{ color: NAVY }}>{q}</span>
        <ChevronDown
          size={16}
          style={{
            color: GOLD,
            flexShrink: 0,
            transform: open ? "rotate(180deg)" : undefined,
            transition: "transform 0.15s",
            marginTop: "2px",
          }}
        />
      </button>
      {open && (
        <div className="px-5 pb-5">
          <p className="text-[13px] leading-relaxed" style={{ color: TEXT_GRAY }}>{a}</p>
        </div>
      )}
    </div>
  );
}

export default function HelpCenter() {
  const [activeCategory, setActiveCategory] = useState("For Authors");
  const [query, setQuery] = useState("");

  const filtered = FAQ[activeCategory]?.filter(
    (item) =>
      !query ||
      item.q.toLowerCase().includes(query.toLowerCase()) ||
      item.a.toLowerCase().includes(query.toLowerCase())
  ) ?? [];

  return (
    <div>
      <PageBanner
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Help Center" }]}
        title="Help Center"
        subtitle="Find answers to common questions about submission, review, publication, and platform use."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">

        {/* Search bar */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: TEXT_GRAY }} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search help topics…"
              className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border bg-white outline-none focus:ring-2 transition-shadow"
              style={{ borderColor: BORDER_GRAY, color: NAVY }}
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-10">
          {/* Category nav */}
          <aside>
            <div className="rounded-xl border overflow-hidden sticky top-24" style={{ borderColor: BORDER_GRAY }}>
              <div className="px-5 py-4" style={{ backgroundColor: NAVY }}>
                <div className="text-xs font-bold text-white tracking-wide">Categories</div>
              </div>
              <ul className="divide-y" style={{ divideColor: BORDER_GRAY }}>
                {CATEGORIES.map((cat) => (
                  <li key={cat}>
                    <button
                      type="button"
                      onClick={() => { setActiveCategory(cat); setQuery(""); }}
                      className="w-full text-left px-5 py-3 text-[13px] font-medium transition-colors hover:bg-gray-50"
                      style={{
                        color: activeCategory === cat ? GOLD : NAVY,
                        backgroundColor: activeCategory === cat ? "rgba(195,154,59,0.06)" : undefined,
                        fontWeight: activeCategory === cat ? 600 : 400,
                      }}
                    >
                      {cat}
                      <span className="ml-2 text-[11px]" style={{ color: TEXT_GRAY }}>
                        ({FAQ[cat]?.length ?? 0})
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* FAQ content */}
          <div className="lg:col-span-3">
            <SectionHeader
              eyebrow="FAQ"
              title={query ? `Search results in "${activeCategory}"` : activeCategory}
            />
            {filtered.length === 0 ? (
              <div className="rounded-xl border p-10 text-center" style={{ borderColor: BORDER_GRAY }}>
                <p className="text-sm" style={{ color: TEXT_GRAY }}>
                  No results found{query ? ` for "${query}"` : ""}. Try a different search or category.
                </p>
              </div>
            ) : (
              <div className="rounded-xl border overflow-hidden bg-white" style={{ borderColor: BORDER_GRAY }}>
                {filtered.map((item, i) => (
                  <FAQItem key={i} q={item.q} a={item.a} />
                ))}
              </div>
            )}

            {/* Contact prompt */}
            <div
              className="mt-8 rounded-xl p-6 text-center"
              style={{ backgroundColor: LIGHT_GRAY, border: `1px solid ${BORDER_GRAY}` }}
            >
              <div className="text-[13px] font-semibold mb-2" style={{ color: NAVY }}>
                Didn't find your answer?
              </div>
              <p className="text-[12px] mb-5" style={{ color: TEXT_GRAY }}>
                Contact the editorial office directly and we will respond within 3–5 working days.
              </p>
              <NavA
                to="/contact"
                className="inline-block px-6 py-2.5 text-sm font-semibold text-white rounded-lg transition-opacity hover:opacity-90"
                style={{ backgroundColor: GOLD }}
              >
                Contact Editorial Office
              </NavA>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
