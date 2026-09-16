import { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router";
import {
  login as apiLogin,
  signup as apiSignup,
  fetchMe,
  logout as apiLogout,
  isLoggedIn,
  type UserProfile,
  type SignupData,
} from "./api";

interface AuthContextValue {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  primaryRole: string;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshUser = useCallback(async () => {
    try {
      const me = await fetchMe();
      setUser(me);
      setError(null);
    } catch {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn()) {
      refreshUser().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [refreshUser]);

  const login = async (email: string, password: string) => {
    setError(null);
    try {
      await apiLogin(email, password);
      await refreshUser();
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Login failed";
      setError(msg);
      throw e;
    }
  };

  const signup = async (data: SignupData) => {
    setError(null);
    try {
      await apiSignup(data);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Signup failed";
      setError(msg);
      throw e;
    }
  };

  const logout = () => {
    apiLogout();
    setUser(null);
  };

  const primaryRole = user?.roles?.[0] || "author";

  return (
    <AuthContext.Provider
      value={{ user, loading, error, login, signup, logout, refreshUser, primaryRole }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function RequireAuth({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/portal/login", { replace: true });
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!user) return null;
  return <>{children}</>;
}
