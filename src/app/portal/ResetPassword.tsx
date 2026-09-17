import { useState } from "react";
import { useSearchParams } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import { JournalEmblem, NavA } from "../shared";
import { NAVY, GOLD, LIGHT, BORDER, TEXT, SERIF } from "./portalShared";
import { confirmPasswordReset } from "../api";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const uid = params.get("uid") || "";
  const token = params.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      await confirmPasswordReset(uid, token, password);
      setDone(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Reset failed. The link may have expired.");
    } finally {
      setLoading(false);
    }
  }

  if (!uid || !token) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: LIGHT }}>
        <div className="text-center">
          <h1 className="text-lg font-bold mb-2" style={{ color: NAVY }}>Invalid Reset Link</h1>
          <p className="text-sm mb-4" style={{ color: TEXT }}>This password reset link is invalid or has expired.</p>
          <NavA to="/portal/forgot-password" className="text-sm font-semibold hover:underline" style={{ color: GOLD }}>
            Request a New Link
          </NavA>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: LIGHT }}>
      <div
        className="w-full max-w-md rounded-2xl shadow-lg p-8"
        style={{ backgroundColor: "white", border: `1px solid ${BORDER}` }}
      >
        <div className="text-center mb-6">
          <JournalEmblem size={48} />
          <h1 className="text-xl font-bold mt-3" style={{ color: NAVY, fontFamily: SERIF }}>
            Set New Password
          </h1>
        </div>

        {done ? (
          <div className="text-center py-6">
            <div
              className="w-12 h-12 rounded-full mx-auto flex items-center justify-center mb-4"
              style={{ backgroundColor: `${GOLD}15` }}
            >
              <span className="text-2xl" style={{ color: GOLD }}>✓</span>
            </div>
            <h2 className="text-sm font-bold mb-2" style={{ color: NAVY }}>Password Reset Successfully</h2>
            <p className="text-xs mb-4" style={{ color: TEXT }}>
              Your password has been updated. You can now sign in with your new password.
            </p>
            <NavA
              to="/portal/login"
              className="inline-block px-6 py-2.5 text-sm font-bold text-white rounded-lg"
              style={{ backgroundColor: GOLD }}
            >
              Sign In
            </NavA>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="mb-4 p-3 rounded-lg text-xs" style={{ backgroundColor: "#FEE2E2", color: "#B91C1C" }}>
                {error}
              </div>
            )}
            <label className="block text-[11px] font-semibold mb-1" style={{ color: NAVY }}>
              New Password
            </label>
            <div className="relative mb-4">
              <input
                type={showPw ? "text" : "password"}
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Minimum 8 characters"
                className="w-full px-4 py-2.5 rounded-lg border text-sm pr-10"
                style={{ borderColor: BORDER }}
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                style={{ color: TEXT }}
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <label className="block text-[11px] font-semibold mb-1" style={{ color: NAVY }}>
              Confirm Password
            </label>
            <input
              type="password"
              required
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              placeholder="Re-enter your password"
              className="w-full px-4 py-2.5 rounded-lg border text-sm mb-4"
              style={{ borderColor: BORDER }}
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-sm font-bold text-white rounded-lg transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: GOLD }}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
