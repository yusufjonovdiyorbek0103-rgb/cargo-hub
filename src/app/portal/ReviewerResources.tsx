import { useLocation } from "react-router";
import { ExternalLink } from "lucide-react";
import { NavA } from "../shared";
import { useAuth } from "../AuthContext";
import {
  NAVY, GOLD, BORDER, TEXT, SERIF,
  PortalLayout, Card, CardHeader, SidebarItem,
} from "./portalShared";

const NAV: SidebarItem[] = [
  { label: "Dashboard", to: "/portal/reviewer" },
  { label: "Review Assignments", to: "/portal/reviewer/assignments" },
  { label: "Completed Reviews", to: "/portal/reviewer/completed" },
  { label: "Resources", to: "/portal/reviewer/resources" },
  { label: "Messages", to: "/portal/reviewer/messages" },
  { label: "Profile", to: "/portal/reviewer/profile" },
];

const RESOURCES = [
  {
    title: "Reviewer Guidelines",
    description: "Detailed instructions for conducting peer reviews, including evaluation criteria, scoring rubrics, and best practices.",
    to: "/reviewer-guidelines",
  },
  {
    title: "Peer Review Policy",
    description: "CAJAIDT's double-blind peer review policy, including timelines, reviewer responsibilities, and confidentiality requirements.",
    to: "/peer-review-policy",
  },
  {
    title: "Publication Ethics",
    description: "COPE guidelines, conflict of interest policies, and ethical standards for peer review.",
    to: "/publication-ethics",
  },
  {
    title: "AI Use Policy",
    description: "Guidelines on the use of AI tools in manuscript preparation and peer review, including disclosure requirements.",
    to: "/ai-use-policy",
  },
  {
    title: "Author Guidelines",
    description: "Manuscript formatting, reference style, and submission requirements to help reviewers assess compliance.",
    to: "/author-guidelines",
  },
];

export default function ReviewerResources() {
  const { pathname } = useLocation();
  const { user } = useAuth();

  return (
    <PortalLayout role="Reviewer" name={user?.full_name || "Reviewer"} navItems={NAV} activePath={pathname}>
      <div className="mb-6">
        <div className="text-[11px] font-bold uppercase tracking-wider mb-1" style={{ color: GOLD }}>Reviewer Portal</div>
        <h1 className="text-2xl font-bold" style={{ color: NAVY, fontFamily: SERIF }}>Resources & Guidelines</h1>
      </div>

      <div className="space-y-4">
        {RESOURCES.map((r) => (
          <Card key={r.title}>
            <div className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-[14px] font-bold mb-1" style={{ color: NAVY }}>{r.title}</h3>
                  <p className="text-[12px] leading-relaxed" style={{ color: TEXT }}>{r.description}</p>
                </div>
                <NavA
                  to={r.to}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold rounded-lg border whitespace-nowrap transition-opacity hover:opacity-70"
                  style={{ borderColor: BORDER, color: NAVY }}
                >
                  View <ExternalLink size={12} />
                </NavA>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </PortalLayout>
  );
}
