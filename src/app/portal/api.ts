/**
 * API client for the CAJAIDT Django backend.
 * Handles JWT token storage, automatic refresh, and typed fetch helpers.
 */

const API_BASE = "/api";

// ── Token storage ───────────────────────────────────────────────────────────────

export function getAccessToken(): string | null {
  return localStorage.getItem("access_token");
}

export function getRefreshToken(): string | null {
  return localStorage.getItem("refresh_token");
}

export function setTokens(access: string, refresh: string) {
  localStorage.setItem("access_token", access);
  localStorage.setItem("refresh_token", refresh);
}

export function clearTokens() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}

/** Decode JWT payload (no verification -- just base64). */
export function decodeToken(token: string): Record<string, unknown> | null {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

// ── Core fetch wrapper ──────────────────────────────────────────────────────────

let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  const refresh = getRefreshToken();
  if (!refresh) return null;

  try {
    const res = await fetch(`${API_BASE}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh }),
    });
    if (!res.ok) {
      clearTokens();
      return null;
    }
    const data = await res.json();
    setTokens(data.access, data.refresh ?? refresh);
    return data.access;
  } catch {
    clearTokens();
    return null;
  }
}

/**
 * Authenticated fetch wrapper.
 * Automatically attaches Authorization header and retries once on 401 via token refresh.
 */
export async function apiFetch(
  path: string,
  init: RequestInit = {},
): Promise<Response> {
  const url = path.startsWith("http") ? path : `${API_BASE}${path}`;

  const doFetch = (token: string | null) => {
    const headers = new Headers(init.headers);
    if (token) headers.set("Authorization", `Bearer ${token}`);
    // Only set Content-Type for non-FormData bodies
    if (init.body && !(init.body instanceof FormData) && !headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }
    return fetch(url, { ...init, headers });
  };

  let token = getAccessToken();
  let res = await doFetch(token);

  if (res.status === 401 && getRefreshToken()) {
    // Deduplicate concurrent refresh calls
    if (!refreshPromise) {
      refreshPromise = refreshAccessToken().finally(() => {
        refreshPromise = null;
      });
    }
    token = await refreshPromise;
    if (token) {
      res = await doFetch(token);
    }
  }

  return res;
}

/** Convenience: fetch JSON and throw on error. */
export async function apiJson<T = unknown>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const res = await apiFetch(path, init);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const msg =
      body.detail || body.message || Object.values(body).flat().join(", ") || res.statusText;
    throw new ApiError(msg, res.status, body);
  }
  return res.json();
}

export class ApiError extends Error {
  status: number;
  body: unknown;
  constructor(message: string, status: number, body: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

// ── Auth endpoints ──────────────────────────────────────────────────────────────

export interface LoginResponse {
  access: string;
  refresh: string;
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new ApiError(
      body.detail || "Invalid credentials",
      res.status,
      body,
    );
  }
  const data: LoginResponse = await res.json();
  setTokens(data.access, data.refresh);
  return data;
}

export interface SignupPayload {
  email: string;
  password: string;
  full_name: string;
  affiliation?: string;
  country?: string;
  roles: string[];
  why_to_be?: string;
}

export async function signup(payload: SignupPayload) {
  return apiJson("/auth/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// ── User ────────────────────────────────────────────────────────────────────────

export interface UserProfile {
  id: number;
  email: string;
  full_name: string;
  affiliation: string;
  country: string;
  orcid_id: string;
  google_scholar_url: string;
  is_email_verified: boolean;
  roles: string[];
  reviewer_status: string | null;
  editor_status: string | null;
  date_joined: string;
}

export function fetchMe(): Promise<UserProfile> {
  return apiJson<UserProfile>("/me");
}

export function updateMe(data: Partial<UserProfile>): Promise<UserProfile> {
  return apiJson<UserProfile>("/me", {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

// ── Submissions ─────────────────────────────────────────────────────────────────

export interface TopicArea {
  id: number;
  name: string;
  slug: string;
}

export interface Submission {
  id: number;
  manuscript_id: string;
  status: string;
  article_type: string;
  language: string;
  doi: string | null;
  doi_status: string;
  reason: string;
  title: string;
  running_title: string;
  abstract: string;
  keywords: string[];
  topic_area: TopicArea | null;
  cover_letter_text: string;
  originality_confirmation: boolean;
  plagiarism_agreement: boolean;
  ethics_compliance: boolean;
  copyright_agreement: boolean;
  manuscript_pdf: string | null;
  title_page_url: string | null;
  cover_letter_file_url: string | null;
  ethics_approval_file_url: string | null;
  supplementary_files: { id: number; file: string; name: string; created_at: string }[];
  co_authors: Array<Record<string, string>>;
  english_title: string;
  english_abstract: string;
  english_keywords: string[];
  references: string;
  funding_info: string;
  data_availability_statement: string;
  conflict_of_interest: string;
  ai_use_disclosure: string;
  ethics_approval_details: string;
  issue: { id: number; title: string; volume: number; issue_number: number } | null;
  issue_order: number | null;
  page_start: number | null;
  page_end: number | null;
  author_name: string;
  author_email: string;
  created_at: string;
  updated_at: string;
}

export function fetchTopicAreas(): Promise<TopicArea[]> {
  return apiJson<TopicArea[]>("/topic-areas/");
}

export function fetchMySubmissions(): Promise<Submission[]> {
  return apiJson<Submission[]>("/submissions/");
}

export function fetchSubmission(id: number | string): Promise<Submission> {
  return apiJson<Submission>(`/submissions/${id}/`);
}

export function createSubmission(
  data: Partial<Submission> & { topic_area_id?: number },
): Promise<Submission> {
  return apiJson<Submission>("/submissions/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateSubmission(
  id: number | string,
  data: Partial<Submission> & { topic_area_id?: number },
): Promise<Submission> {
  return apiJson<Submission>(`/submissions/${id}/`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function uploadSubmissionFile(
  submissionId: number | string,
  file: File,
  fileType: "manuscript" | "supplementary" = "manuscript",
): Promise<{ url: string; file_type: string; id?: number }> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("file_type", fileType);
  return apiJson(`/submissions/${submissionId}/upload-file/`, {
    method: "POST",
    body: formData,
  });
}

export function submitSubmission(id: number | string): Promise<Submission> {
  return apiJson<Submission>(`/submissions/${id}/submit/`, {
    method: "POST",
  });
}

export function resubmitSubmission(id: number | string): Promise<Submission> {
  return apiJson<Submission>(`/submissions/${id}/resubmit/`, {
    method: "POST",
  });
}

// ── Reviews (reviewer) ──────────────────────────────────────────────────────────

export interface ReviewAssignment {
  id: number;
  submission: number;
  submission_title: string;
  submission_abstract: string;
  submission_topic_area: string;
  submission_manuscript_id: string;
  submission_article_type: string;
  submission_version: { id: number; version_number: number } | null;
  reviewer_email: string;
  manuscript_url: string | null;
  status: string;
  due_date: string | null;
  invited_at: string;
  responded_at: string | null;
  review: Review | null;
}

export interface Review {
  id: number;
  conflict_of_interest: string;
  conflict_details: string;
  relevance: string;
  originality: string;
  literature_review: string;
  methodology: string;
  results_validity: string;
  discussion_quality: string;
  ethical_compliance: string;
  reference_quality: string;
  writing_clarity: string;
  overall_merit: string;
  comments_to_authors: string;
  strengths: string;
  weaknesses: string;
  suggestions: string;
  confidential_to_editor: string;
  recommendation: string;
  review_file_url: string | null;
  submitted_at: string | null;
  created_at: string;
  updated_at: string;
}

export function fetchMyAssignments(): Promise<ReviewAssignment[]> {
  return apiJson<ReviewAssignment[]>("/reviewer/assignments/");
}

export function fetchAssignment(id: number | string): Promise<ReviewAssignment> {
  return apiJson<ReviewAssignment>(`/reviewer/assignments/${id}/`);
}

export function acceptAssignment(id: number | string): Promise<ReviewAssignment> {
  return apiJson<ReviewAssignment>(`/reviewer/assignments/${id}/accept/`, {
    method: "POST",
  });
}

export function declineAssignment(id: number | string): Promise<ReviewAssignment> {
  return apiJson<ReviewAssignment>(`/reviewer/assignments/${id}/decline/`, {
    method: "POST",
  });
}

export function submitReview(
  assignmentId: number | string,
  data: Partial<Review>,
): Promise<unknown> {
  return apiJson(`/reviewer/assignments/${assignmentId}/submit-review/`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// ── Editorial ───────────────────────────────────────────────────────────────────

export function fetchEditorSubmissions(): Promise<Submission[]> {
  return apiJson<Submission[]>("/editor/submissions/");
}

export function fetchEditorSubmission(id: number | string): Promise<Submission> {
  return apiJson<Submission>(`/editor/submissions/${id}/`);
}

export function editorStartScreening(id: number | string): Promise<unknown> {
  return apiJson(`/editor/submissions/${id}/start-screening/`, { method: "POST" });
}

export function editorDeskReject(
  id: number | string,
  reason: string,
): Promise<unknown> {
  return apiJson(`/editor/submissions/${id}/desk-reject/`, {
    method: "POST",
    body: JSON.stringify({ reason }),
  });
}

export function editorSendToReview(id: number | string): Promise<unknown> {
  return apiJson(`/editor/submissions/${id}/send-to-review/`, { method: "POST" });
}

export function editorInviteReviewer(
  submissionId: number | string,
  data: { email: string; due_date?: string },
): Promise<unknown> {
  return apiJson(`/editor/submissions/${submissionId}/invite-reviewer/`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function editorDecision(
  id: number | string,
  data: { decision: string; letter?: string },
): Promise<unknown> {
  return apiJson(`/editor/submissions/${id}/decision/`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function editorPublish(id: number | string): Promise<unknown> {
  return apiJson(`/editor/submissions/${id}/publish/`, { method: "POST" });
}

export function fetchReviewerList(): Promise<
  { id: number; email: string; full_name: string; affiliation: string }[]
> {
  return apiJson("/editor/reviewers");
}

// ── Public articles ─────────────────────────────────────────────────────────────

export function fetchPublicArticles() {
  return apiJson("/articles/");
}

export function fetchPublicArticle(slug: string) {
  return apiJson(`/articles/${slug}/`);
}

export function fetchPublishedIssues() {
  return apiJson("/published/issues/");
}

export function fetchPublishedIssue(id: number | string) {
  return apiJson(`/published/issues/${id}/`);
}
