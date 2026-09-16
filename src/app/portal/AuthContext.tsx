/**
 * Authentication context for the CAJAIDT portal.
 * Provides current user, login/logout, and role helpers.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  clearTokens,
  decodeToken,
  fetchMe,
  getAccessToken,
  login as apiLogin,
  signup as apiSignup,
  type SignupPayload,
  type UserProfile,
} from "./api";

interface AuthState {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (payload: SignupPayload) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  /** Primary role derived from JWT or user profile */
  primaryRole: "author" | "reviewer" | "editor" | null;
  portalBase: string;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadUser = useCallback(async () => {
    const token = getAccessToken();
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      const profile = await fetchMe();
      setUser(profile);
      setError(null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const login = useCallback(
    async (email: string, password: string) => {
      setError(null);
      const data = await apiLogin(email, password);
      // decode the token to get roles right away
      const payload = decodeToken(data.access);
      // fetch full profile
      const profile = await fetchMe();
      setUser(profile);
    },
    [],
  );

  const signupFn = useCallback(
    async (payload: SignupPayload) => {
      setError(null);
      await apiSignup(payload);
      // After signup, auto-login
      await apiLogin(payload.email, payload.password);
      const profile = await fetchMe();
      setUser(profile);
    },
    [],
  );

  const logout = useCallback(() => {
    clearTokens();
    setUser(null);
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const profile = await fetchMe();
      setUser(profile);
    } catch {
      // ignore
    }
  }, []);

  const primaryRole = useMemo(() => {
    if (!user) return null;
    const roles = user.roles || [];
    // Priority: editor > reviewer > author
    if (roles.includes("editor") && user.editor_status === "approved") return "editor";
    if (roles.includes("reviewer") && user.reviewer_status === "approved") return "reviewer";
    if (roles.includes("author")) return "author";
    // Fallback: first role
    if (roles.length > 0) return roles[0] as "author" | "reviewer" | "editor";
    return "author";
  }, [user]);

  const portalBase = useMemo(() => {
    if (!primaryRole) return "/portal";
    return `/portal/${primaryRole}`;
  }, [primaryRole]);

  const value = useMemo(
    () => ({
      user,
      loading,
      error,
      login,
      signup: signupFn,
      logout,
      refreshUser,
      primaryRole,
      portalBase,
    }),
    [user, loading, error, login, signupFn, logout, refreshUser, primaryRole, portalBase],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
