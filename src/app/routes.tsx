import { createBrowserRouter } from "react-router";
import AppLayout from "./AppLayout";
import Root from "./Root";
import Home from "./Home";
// Portal pages
import Login from "./portal/Login";
import AuthorDashboard from "./portal/AuthorDashboard";
import NewSubmission from "./portal/NewSubmission";
import SubmissionDetail from "./portal/SubmissionDetail";
import EditorDashboard from "./portal/EditorDashboard";
import ReviewerDashboard from "./portal/ReviewerDashboard";
import ReviewForm from "./portal/ReviewForm";
import Production from "./portal/Production";
import UserProfile from "./portal/UserProfile";
import Messages from "./portal/Messages";
import SubmissionSuccess from "./portal/SubmissionSuccess";
import ReviewSuccess from "./portal/ReviewSuccess";
import PortalStub from "./portal/PortalStub";
import AuthorRevisions from "./portal/AuthorRevisions";
import ReviewerCompleted from "./portal/ReviewerCompleted";
import ReviewerResources from "./portal/ReviewerResources";
// Journal information pages
import About from "./About";
import AimsScope from "./AimsScope";
import EditorialBoard from "./EditorialBoard";
// For Authors pages
import AuthorGuidelines from "./AuthorGuidelines";
import SubmitManuscript from "./SubmitManuscript";
import Checklist from "./Checklist";
import ManuscriptTemplate from "./ManuscriptTemplate";
// Policy pages
import PeerReviewPolicy from "./PeerReviewPolicy";
import PublicationEthics from "./PublicationEthics";
import AIUsePolicy from "./AIUsePolicy";
import PlagiarismPolicy from "./PlagiarismPolicy";
import CopyrightFees from "./CopyrightFees";
// Publication & browsing pages
import CurrentIssue from "./CurrentIssue";
import Archives from "./Archives";
import ArticleDetail from "./ArticleDetail";
import ArticlesInPress from "./ArticlesInPress";
import BrowseArticles from "./BrowseArticles";
import ReviewerGuidelines from "./ReviewerGuidelines";
import Contact from "./Contact";
// New supporting pages
import IndexingRoadmap from "./IndexingRoadmap";
import CallForPapers from "./CallForPapers";
import BecomeReviewer from "./BecomeReviewer";
import HelpCenter from "./HelpCenter";
// 404
import NotFound from "./NotFound";
// Auth guard
import PortalGuard from "./portal/PortalGuard";

import { useNavigate } from "react-router";
import { useEffect } from "react";

function RedirectToHelp() {
  const navigate = useNavigate();
  useEffect(() => { navigate("/help", { replace: true }); }, [navigate]);
  return null;
}

export const router = createBrowserRouter([
  {
    Component: AppLayout,
    children: [
      {
        path: "/",
        Component: Root,
        children: [
          { index: true, Component: Home },
          { path: "about", Component: About },
          { path: "aims-scope", Component: AimsScope },
          { path: "editorial-board", Component: EditorialBoard },
          { path: "author-guidelines", Component: AuthorGuidelines },
          { path: "submit", Component: SubmitManuscript },
          { path: "checklist", Component: Checklist },
          { path: "manuscript-template", Component: ManuscriptTemplate },
          { path: "peer-review-policy", Component: PeerReviewPolicy },
          { path: "publication-ethics", Component: PublicationEthics },
          { path: "ai-use-policy", Component: AIUsePolicy },
          { path: "plagiarism-policy", Component: PlagiarismPolicy },
          { path: "copyright-fees", Component: CopyrightFees },
          { path: "current-issue", Component: CurrentIssue },
          { path: "archives", Component: Archives },
          { path: "article/:slug", Component: ArticleDetail },
          { path: "articles-in-press", Component: ArticlesInPress },
          { path: "browse", Component: BrowseArticles },
          { path: "reviewer-guidelines", Component: ReviewerGuidelines },
          { path: "contact", Component: Contact },
          { path: "indexing-roadmap", Component: IndexingRoadmap },
          { path: "call-for-papers", Component: CallForPapers },
          { path: "become-reviewer", Component: BecomeReviewer },
          { path: "help", Component: HelpCenter },
          { path: "*", Component: NotFound },
        ],
      },
      // Portal: login is public, dashboards require auth
      { path: "/portal", Component: Login },
      { path: "/portal/login", Component: Login },
      {
        path: "/portal",
        Component: PortalGuard,
        children: [
          { path: "author", Component: AuthorDashboard },
          { path: "author/submit", Component: NewSubmission },
          { path: "author/submission/:id", Component: SubmissionDetail },
          { path: "author/submissions", Component: AuthorDashboard },
          { path: "author/submission-success", Component: SubmissionSuccess },
          { path: "author/revisions", Component: AuthorRevisions },
          { path: "author/messages", Component: Messages },
          { path: "author/profile", Component: UserProfile },
          { path: "author/help", Component: RedirectToHelp },
          { path: "editor", Component: EditorDashboard },
          { path: "editor/submissions", Component: EditorDashboard },
          { path: "editor/reviewers", Component: PortalStub },
          { path: "editor/decisions", Component: PortalStub },
          { path: "editor/issues", Component: PortalStub },
          { path: "editor/messages", Component: Messages },
          { path: "editor/profile", Component: UserProfile },
          { path: "editor/reports", Component: PortalStub },
          { path: "reviewer", Component: ReviewerDashboard },
          { path: "reviewer/assignments", Component: ReviewerDashboard },
          { path: "reviewer/review", Component: ReviewForm },
          { path: "reviewer/review-success", Component: ReviewSuccess },
          { path: "reviewer/completed", Component: ReviewerCompleted },
          { path: "reviewer/resources", Component: ReviewerResources },
          { path: "reviewer/messages", Component: Messages },
          { path: "reviewer/profile", Component: UserProfile },
          { path: "production", Component: Production },
          { path: "*", Component: PortalStub },
        ],
      },
    ],
  },
]);
