import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router";

export default function VerifyEmail() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("No verification token provided.");
      return;
    }

    fetch(`/api/auth/verify-email?token=${encodeURIComponent(token)}`)
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (res.ok) {
          setStatus("success");
          setMessage(data.detail || "Your email has been verified successfully.");
        } else {
          setStatus("error");
          setMessage(data.detail || "Verification failed. The link may have expired.");
        }
      })
      .catch(() => {
        setStatus("error");
        setMessage("Network error. Please try again.");
      });
  }, [token]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        {status === "loading" && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#06264A] mx-auto mb-4" />
            <h1 className="text-xl font-semibold text-[#06264A]">Verifying your email...</h1>
          </>
        )}

        {status === "success" && (
          <>
            <div className="text-green-600 text-5xl mb-4">&#10003;</div>
            <h1 className="text-xl font-semibold text-[#06264A] mb-2">Email Verified</h1>
            <p className="text-gray-600 mb-6">{message}</p>
            <Link
              to="/portal/login"
              className="inline-block px-6 py-2 bg-[#06264A] text-white rounded-lg hover:bg-[#0a3a6e] transition"
            >
              Go to Login
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <div className="text-red-500 text-5xl mb-4">&#10007;</div>
            <h1 className="text-xl font-semibold text-[#06264A] mb-2">Verification Failed</h1>
            <p className="text-gray-600 mb-6">{message}</p>
            <Link
              to="/portal/login"
              className="inline-block px-6 py-2 bg-[#06264A] text-white rounded-lg hover:bg-[#0a3a6e] transition"
            >
              Go to Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
