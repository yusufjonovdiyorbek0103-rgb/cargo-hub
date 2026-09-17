import { useState, useEffect } from "react";
import { CheckCircle, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router";
import { JournalEmblem, NavA } from "../shared";
import { NAVY, GOLD, LIGHT, BORDER, TEXT, SERIF } from "./portalShared";
import { useAuth } from "../AuthContext";

const TRUST_BADGES = [
  "Open Access",
  "Double-Blind Peer Review",
  "Ethics-Based Publishing",
  "DOI-ready Workflow",
];

const COUNTRIES = [
  "Uzbekistan", "Kazakhstan", "Kyrgyzstan", "Tajikistan", "Turkmenistan",
  "Russia", "Germany", "United Kingdom", "United States", "South Korea",
  "Turkey", "Malaysia", "Other",
];

export default function Login() {
  const navigate = useNavigate();
  const { user, login, signup, error: authError } = useAuth();
  const [tab, setTab] = useState<"login" | "register">("login");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register form state
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirm, setRegConfirm] = useState("");
  const [regAffiliation, setRegAffiliation] = useState("");
  const [regCountry, setRegCountry] = useState("");
  const [regOrcid, setRegOrcid] = useState("");
  const [regRole, setRegRole] = useState("author");

  useEffect(() => {
    if (user) {
      const role = user.roles?.[0] || "author";
      if (role === "editor") navigate("/portal/editor", { replace: true });
      else if (role === "reviewer") navigate("/portal/reviewer", { replace: true });
      else navigate("/portal/author", { replace: true });
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setLoading(true);
    try {
      await login(loginEmail, loginPassword);
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (regPassword !== regConfirm) {
      setFormError("Passwords do not match");
      return;
    }
    if (regPassword.length < 8) {
      setFormError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);
    try {
      await signup({
        email: regEmail,
        password: regPassword,
        full_name: regName,
        affiliation: regAffiliation,
        country: regCountry,
        orcid_id: regOrcid,
        roles: [regRole],
      });
      setRegisterSuccess(true);
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const errorMsg = formError || authError;

  return (
    <div className="min-h-screen grid lg:grid-cols-2" style={{ backgroundColor: LIGHT }}>
      {/* Left panel */}
      <div
        className="hidden lg:flex flex-col justify-between p-12"
        style={{ backgroundColor: NAVY }}
      >
        <div>
          <div className="flex items-center gap-3 mb-10">
            <JournalEmblem size={52} />
            <div>
              <div className="font-bold text-lg text-white tracking-widest uppercase" style={{ fontFamily: SERIF }}>
                CAJAIDT
              </div>
              <div className="text-[11px]" style={{ color: "#7a9cbd" }}>Submission Portal</div>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-white mb-4 leading-snug" style={{ fontFamily: SERIF }}>
            Central Asian Journal of Artificial Intelligence and Digital Transformation
          </h1>
          <p className="text-sm leading-relaxed mb-10" style={{ color: "#b8c8da" }}>
            Online manuscript submission and editorial management system for authors, reviewers, and editors.
          </p>

          <div className="space-y-3">
            {TRUST_BADGES.map((badge) => (
              <div key={badge} className="flex items-center gap-3">
                <CheckCircle size={15} style={{ color: GOLD, flexShrink: 0 }} />
                <span className="text-sm" style={{ color: "#b8c8da" }}>{badge}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-[11px]" style={{ color: "#4a6a8a" }}>
          &copy; 2027 CAJAIDT &middot; editorial@cajaidt.org
        </div>
      </div>

      {/* Right panel */}
      <div className="flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <JournalEmblem size={40} />
            <div className="text-sm font-bold uppercase tracking-wider" style={{ color: NAVY, fontFamily: SERIF }}>
              CAJAIDT Portal
            </div>
          </div>

          {/* Tab switcher */}
          <div className="flex rounded-xl overflow-hidden border mb-6" style={{ borderColor: BORDER }}>
            {(["login", "register"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => { setTab(t); setFormError(""); setRegisterSuccess(false); }}
                className="flex-1 py-2.5 text-sm font-semibold transition-colors capitalize"
                style={{
                  backgroundColor: tab === t ? NAVY : "white",
                  color: tab === t ? "white" : TEXT,
                }}
              >
                {t === "login" ? "Sign In" : "Create Account"}
              </button>
            ))}
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 rounded-lg text-sm text-red-700 bg-red-50 border border-red-200">
              {errorMsg}
            </div>
          )}

          {/* Login form */}
          {tab === "login" && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5" style={{ color: NAVY }}>
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 text-sm rounded-lg border bg-white outline-none focus:ring-2"
                  style={{ borderColor: BORDER, color: NAVY }}
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5" style={{ color: NAVY }}>
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPw ? "text" : "password"}
                    placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 text-sm rounded-lg border bg-white outline-none focus:ring-2 pr-10"
                    style={{ borderColor: BORDER, color: NAVY }}
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
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-[12px] cursor-pointer" style={{ color: TEXT }}>
                  <input type="checkbox" className="rounded" /> Remember me
                </label>
                <NavA to="/portal/forgot-password" className="text-[12px] hover:underline" style={{ color: GOLD }}>
                  Forgot password?
                </NavA>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 text-sm font-bold text-white rounded-lg transition-opacity hover:opacity-90 disabled:opacity-50"
                style={{ backgroundColor: GOLD }}
              >
                {loading ? "Signing in..." : "Sign In to Portal"}
              </button>

              <p className="text-center text-[12px]" style={{ color: TEXT }}>
                No account?{" "}
                <button type="button" onClick={() => setTab("register")} className="font-semibold hover:underline" style={{ color: NAVY }}>
                  Create account
                </button>
              </p>
            </form>
          )}

          {/* Register form */}
          {tab === "register" && !registerSuccess && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5" style={{ color: NAVY }}>Full Name <span style={{ color: GOLD }}>*</span></label>
                  <input type="text" placeholder="Your full name" value={regName} onChange={(e) => setRegName(e.target.value)} required className="w-full px-4 py-2.5 text-sm rounded-lg border bg-white outline-none focus:ring-2" style={{ borderColor: BORDER, color: NAVY }} />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5" style={{ color: NAVY }}>Email Address <span style={{ color: GOLD }}>*</span></label>
                  <input type="email" placeholder="your@email.com" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} required className="w-full px-4 py-2.5 text-sm rounded-lg border bg-white outline-none focus:ring-2" style={{ borderColor: BORDER, color: NAVY }} />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5" style={{ color: NAVY }}>Password <span style={{ color: GOLD }}>*</span></label>
                  <input type="password" placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} required minLength={8} className="w-full px-4 py-2.5 text-sm rounded-lg border bg-white outline-none focus:ring-2" style={{ borderColor: BORDER, color: NAVY }} />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5" style={{ color: NAVY }}>Confirm Password <span style={{ color: GOLD }}>*</span></label>
                  <input type="password" placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;" value={regConfirm} onChange={(e) => setRegConfirm(e.target.value)} required className="w-full px-4 py-2.5 text-sm rounded-lg border bg-white outline-none focus:ring-2" style={{ borderColor: BORDER, color: NAVY }} />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5" style={{ color: NAVY }}>Affiliation <span style={{ color: GOLD }}>*</span></label>
                  <input type="text" placeholder="University / Institution" value={regAffiliation} onChange={(e) => setRegAffiliation(e.target.value)} required className="w-full px-4 py-2.5 text-sm rounded-lg border bg-white outline-none focus:ring-2" style={{ borderColor: BORDER, color: NAVY }} />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5" style={{ color: NAVY }}>Country</label>
                  <select value={regCountry} onChange={(e) => setRegCountry(e.target.value)} className="w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white outline-none" style={{ borderColor: BORDER, color: NAVY }}>
                    <option value="">Select country</option>
                    {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5" style={{ color: NAVY }}>ORCID ID <span style={{ color: TEXT }}>optional</span></label>
                  <input type="text" placeholder="0000-0000-0000-0000" value={regOrcid} onChange={(e) => setRegOrcid(e.target.value)} className="w-full px-4 py-2.5 text-sm rounded-lg border bg-white outline-none focus:ring-2" style={{ borderColor: BORDER, color: NAVY }} />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: NAVY }}>Register as</label>
                <div className="grid grid-cols-3 gap-2">
                  {["Author", "Reviewer", "Editor"].map((r) => (
                    <label key={r} className="flex items-center gap-2 px-3 py-2.5 rounded-lg border cursor-pointer text-sm font-medium" style={{ borderColor: regRole === r.toLowerCase() ? NAVY : BORDER, backgroundColor: regRole === r.toLowerCase() ? `${NAVY}10` : "white" }}>
                      <input type="radio" name="role" value={r.toLowerCase()} checked={regRole === r.toLowerCase()} onChange={() => setRegRole(r.toLowerCase())} /> {r}
                    </label>
                  ))}
                </div>
                <p className="text-[11px] mt-2" style={{ color: TEXT }}>
                  Editor accounts require an invitation code or administrator approval.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 text-sm font-bold text-white rounded-lg transition-opacity hover:opacity-90 disabled:opacity-50"
                style={{ backgroundColor: GOLD }}
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>
            </form>
          )}

          {tab === "register" && registerSuccess && (
            <div className="text-center py-8">
              <CheckCircle size={48} className="mx-auto mb-4" style={{ color: "#16A34A" }} />
              <h2 className="text-lg font-bold mb-2" style={{ color: NAVY }}>Account Created</h2>
              <p className="text-sm mb-6" style={{ color: TEXT }}>
                Your account has been created. Please check your email to verify your account, then sign in.
              </p>
              <button
                type="button"
                onClick={() => { setTab("login"); setRegisterSuccess(false); }}
                className="px-6 py-2.5 text-sm font-bold text-white rounded-lg"
                style={{ backgroundColor: GOLD }}
              >
                Sign In
              </button>
            </div>
          )}

          {/* Footer links */}
          <div className="mt-6 text-center text-[11px]" style={{ color: TEXT }}>
            <NavA to="/" className="hover:underline transition-colors" style={{ color: TEXT }}>&larr; Back to website</NavA>
            <span className="mx-2">&middot;</span>
            <NavA to="/help" className="hover:underline transition-colors" style={{ color: TEXT }}>Help Center</NavA>
            <span className="mx-2">&middot;</span>
            <a href="mailto:editorial@cajaidt.org" className="hover:underline transition-colors" style={{ color: TEXT }}>Contact</a>
          </div>
        </div>
      </div>
    </div>
  );
}
