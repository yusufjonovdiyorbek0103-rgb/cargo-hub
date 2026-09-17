import { useState } from "react";
import { JournalEmblem, NavA } from "../shared";
import { NAVY, GOLD, LIGHT, BORDER, TEXT, SERIF } from "./portalShared";
import { requestPasswordReset } from "../api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await requestPasswordReset(email);
      setSent(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
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
            Reset Password
          </h1>
          <p className="text-xs mt-1" style={{ color: TEXT }}>
            Enter your email to receive a password reset link.
          </p>
        </div>

        {sent ? (
          <div className="text-center py-6">
            <div
              className="w-12 h-12 rounded-full mx-auto flex items-center justify-center mb-4"
              style={{ backgroundColor: `${GOLD}15` }}
            >
              <span className="text-2xl" style={{ color: GOLD }}>✓</span>
            </div>
            <h2 className="text-sm font-bold mb-2" style={{ color: NAVY }}>Check Your Email</h2>
            <p className="text-xs leading-relaxed" style={{ color: TEXT }}>
              If an account exists for <strong>{email}</strong>, we've sent a password reset link.
              Check your inbox (and spam folder).
            </p>
            <NavA to="/portal/login" className="inline-block mt-6 text-xs font-semibold hover:underline" style={{ color: GOLD }}>
              Back to Sign In
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
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-2.5 rounded-lg border text-sm mb-4"
              style={{ borderColor: BORDER }}
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-sm font-bold text-white rounded-lg transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: GOLD }}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
            <div className="text-center mt-4">
              <NavA to="/portal/login" className="text-xs hover:underline" style={{ color: TEXT }}>
                Back to Sign In
              </NavA>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
