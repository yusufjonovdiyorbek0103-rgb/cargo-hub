const API_BASE = "/api";

let accessToken: string | null = localStorage.getItem("access_token");
let refreshToken: string | null = localStorage.getItem("refresh_token");

function setTokens(access: string, refresh: string) {
  accessToken = access;
  refreshToken = refresh;
  localStorage.setItem("access_token", access);
  localStorage.setItem("refresh_token", refresh);
}

function clearTokens() {
  accessToken = null;
  refreshToken = null;
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}

async function refreshAccessToken(): Promise<boolean> {
  if (!refreshToken) return false;
  try {
    const res = await fetch(`${API_BASE}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: refreshToken }),
    });
    if (!res.ok) {
      clearTokens();
      return false;
    }
    const data = await res.json();
    setTokens(data.access, data.refresh || refreshToken!);
    return true;
  } catch {
    clearTokens();
    return false;
  }
}

export async function apiFetch(
  path: string,
  options: RequestInit = {},
): Promise<Response> {
  const headers = new Headers(options.headers || {});
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }
  if (
    !headers.has("Content-Type") &&
    !(options.body instanceof FormData)
  ) {
    headers.set("Content-Type", "application/json");
  }

  let res = await fetch(`${API_BASE}${path}`, { ...options, headers });

  if (res.status === 401 && refreshToken) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      headers.set("Authorization", `Bearer ${accessToken}`);
      res = await fetch(`${API_BASE}${path}`, { ...options, headers });
    }
  }

  return res;
}

// ── Auth ──

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
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Login failed");
  }
  const data = await res.json();
  setTokens(data.access, data.refresh);
  return data;
}

export interface SignupData {
  email: string;
  password: string;
  full_name: string;
  affiliation?: string;
  country?: string;
  orcid_id?: string;
  roles: string[];
}

export async function signup(data: SignupData) {
  const res = await fetch(`${API_BASE}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || JSON.stringify(err) || "Signup failed");
  }
  return res.json();
}

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

export async function fetchMe(): Promise<UserProfile> {
  const res = await apiFetch("/me");
  if (!res.ok) throw new Error("Not authenticated");
  return res.json();
}

export async function updateProfile(data: Partial<UserProfile>) {
  const res = await apiFetch("/me", {
    method: "PATCH",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Update failed");
  }
  return res.json();
}

export function logout() {
  clearTokens();
}

export function isLoggedIn() {
  return !!accessToken;
}

export async function requestPasswordReset(email: string) {
  const res = await fetch(`${API_BASE}/auth/password-reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Request failed");
  }
  return res.json();
}

export async function confirmPasswordReset(uid: string, token: string, newPassword: string) {
  const res = await fetch(`${API_BASE}/auth/password-reset-confirm`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ uid, token, new_password: newPassword }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Reset failed");
  }
  return res.json();
}

// ── Submissions ──

export async function fetchSubmissions() {
  const res = await apiFetch("/submissions/");
  if (!res.ok) throw new Error("Failed to fetch submissions");
  return res.json();
}

export async function fetchSubmission(id: string | number) {
  const res = await apiFetch(`/submissions/${id}/`);
  if (!res.ok) throw new Error("Failed to fetch submission");
  return res.json();
}

export async function createSubmission(data: Record<string, unknown> = {}) {
  const res = await apiFetch("/submissions/", {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Failed to create submission");
  }
  return res.json();
}

export async function updateSubmission(id: number, data: Record<string, unknown>) {
  const res = await apiFetch(`/submissions/${id}/`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Failed to update submission");
  }
  return res.json();
}

export async function uploadSubmissionFile(
  submissionId: number,
  file: File,
  fileType: string,
) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("file_type", fileType);
  const res = await apiFetch(`/submissions/${submissionId}/upload-file/`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Upload failed");
  }
  return res.json();
}

export async function submitSubmission(id: number) {
  const res = await apiFetch(`/submissions/${id}/submit/`, { method: "POST" });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Submit failed");
  }
  return res.json();
}

// ── Topic Areas ──

export async function fetchTopicAreas() {
  const res = await apiFetch("/topic-areas/");
  if (!res.ok) throw new Error("Failed to fetch topic areas");
  return res.json();
}

// ── Reviews (Reviewer) ──

export async function fetchReviewAssignments() {
  const res = await apiFetch("/reviewer/assignments/");
  if (!res.ok) throw new Error("Failed to fetch assignments");
  return res.json();
}

export async function acceptAssignment(id: number, token?: string) {
  const res = token
    ? await apiFetch(`/reviewer/accept-by-token/`, {
        method: "POST",
        body: JSON.stringify({ token }),
      })
    : await apiFetch(`/reviewer/assignments/${id}/accept/`, {
        method: "POST",
      });
  if (!res.ok) throw new Error("Failed to accept assignment");
  return res.json();
}

export async function declineAssignment(id: number, token?: string) {
  const res = token
    ? await apiFetch(`/reviewer/decline-by-token/`, {
        method: "POST",
        body: JSON.stringify({ token }),
      })
    : await apiFetch(`/reviewer/assignments/${id}/decline/`, {
        method: "POST",
      });
  if (!res.ok) throw new Error("Failed to decline assignment");
  return res.json();
}

export async function submitReview(assignmentId: number, data: Record<string, unknown>) {
  const res = await apiFetch(`/reviewer/assignments/${assignmentId}/submit-review/`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Failed to submit review");
  }
  return res.json();
}

// ── Editor ──

export async function fetchEditorSubmissions(statusFilter?: string) {
  const query = statusFilter ? `?status=${statusFilter}` : "";
  const res = await apiFetch(`/editor/submissions/${query}`);
  if (!res.ok) throw new Error("Failed to fetch submissions");
  return res.json();
}

export async function fetchReviewers() {
  const res = await apiFetch("/editor/reviewers/");
  if (!res.ok) throw new Error("Failed to fetch reviewers");
  return res.json();
}

export async function inviteReviewer(
  submissionId: number,
  data: { reviewer_user_id?: number; reviewer_email?: string; due_date?: string },
) {
  const res = await apiFetch(`/editor/submissions/${submissionId}/invite-reviewer/`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Failed to invite reviewer");
  }
  return res.json();
}

export async function makeDecision(
  submissionId: number,
  decision: string,
  decisionLetter: string,
) {
  const res = await apiFetch(`/editor/submissions/${submissionId}/decision/`, {
    method: "POST",
    body: JSON.stringify({ decision, decision_letter: decisionLetter }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Failed to make decision");
  }
  return res.json();
}

export async function startScreening(submissionId: number) {
  const res = await apiFetch(`/editor/submissions/${submissionId}/start-screening/`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("Failed to start screening");
  return res.json();
}

export async function sendToReview(submissionId: number) {
  const res = await apiFetch(`/editor/submissions/${submissionId}/send-to-review/`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("Failed to send to review");
  return res.json();
}

export async function moveToDecision(submissionId: number) {
  const res = await apiFetch(`/editor/submissions/${submissionId}/move-to-decision/`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("Failed to move to decision");
  return res.json();
}

export async function publishSubmission(submissionId: number) {
  const res = await apiFetch(`/editor/submissions/${submissionId}/publish/`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("Failed to publish");
  return res.json();
}

// ── Public articles ──

export async function fetchArticles() {
  const res = await fetch(`${API_BASE}/articles/`);
  if (!res.ok) throw new Error("Failed to fetch articles");
  return res.json();
}

export async function fetchArticle(slug: string) {
  const res = await fetch(`${API_BASE}/articles/${slug}/`);
  if (!res.ok) throw new Error("Article not found");
  return res.json();
}

export async function fetchArticlesInPress() {
  const res = await fetch(`${API_BASE}/articles/in-press/`);
  if (!res.ok) throw new Error("Failed to fetch articles in press");
  return res.json();
}

export async function fetchIssues() {
  const res = await fetch(`${API_BASE}/published/issues/`);
  if (!res.ok) throw new Error("Failed to fetch issues");
  return res.json();
}

export async function fetchIssueDetail(id: number) {
  const res = await fetch(`${API_BASE}/published/issues/${id}/`);
  if (!res.ok) throw new Error("Issue not found");
  return res.json();
}

// ── Contact ──

export async function submitContactForm(data: Record<string, string>) {
  const res = await fetch(`${API_BASE}/contact/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Failed to submit");
  }
  return res.json();
}

// ── Reviewer Application ──

export async function submitReviewerApplication(data: Record<string, string>) {
  const res = await fetch(`${API_BASE}/reviewer-application/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Failed to submit application");
  }
  return res.json();
}

// ── Editor: Review Assignments ──

export async function fetchEditorReviewAssignments(submissionId?: number) {
  const query = submissionId ? `?submission=${submissionId}` : "";
  const res = await apiFetch(`/editor/review-assignments/${query}`);
  if (!res.ok) throw new Error("Failed to fetch review assignments");
  return res.json();
}

export async function remindReviewer(assignmentId: number) {
  const res = await apiFetch(`/editor/review-assignments/${assignmentId}/remind/`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("Failed to send reminder");
  return res.json();
}

// ── Editor: Journal Issues ──

export async function fetchEditorIssues() {
  const res = await apiFetch("/editor/issues/");
  if (!res.ok) throw new Error("Failed to fetch issues");
  return res.json();
}

export async function fetchEditorIssue(id: number) {
  const res = await apiFetch(`/editor/issues/${id}/`);
  if (!res.ok) throw new Error("Failed to fetch issue");
  return res.json();
}

export async function createEditorIssue(data: Record<string, unknown>) {
  const res = await apiFetch("/editor/issues/", {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || JSON.stringify(err) || "Failed to create issue");
  }
  return res.json();
}

export async function updateEditorIssue(id: number, data: Record<string, unknown>) {
  const res = await apiFetch(`/editor/issues/${id}/`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || JSON.stringify(err) || "Failed to update issue");
  }
  return res.json();
}

export async function fetchAcceptedSubmissions() {
  const res = await apiFetch("/editor/issues/accepted-submissions/");
  if (!res.ok) throw new Error("Failed to fetch accepted submissions");
  return res.json();
}

// ── Editorial Board (public) ──

export async function fetchEditorialBoard() {
  const res = await fetch(`${API_BASE}/editorial-board/`);
  if (!res.ok) throw new Error("Failed to fetch editorial board");
  return res.json();
}
