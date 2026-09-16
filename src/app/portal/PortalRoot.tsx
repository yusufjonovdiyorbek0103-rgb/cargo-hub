/**
 * Portal root layout: wraps all /portal/* routes with AuthProvider.
 * Redirects to login if not authenticated (except /portal/login itself).
 */
import { Outlet, useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "./AuthContext";

function PortalGuard() {
  const { user, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user && !location.pathname.endsWith("/login") && location.pathname !== "/portal") {
      navigate("/portal/login", { replace: true });
    }
  }, [user, loading, location.pathname, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F5F7FA" }}>
        <div className="text-center">
          <div className="w-8 h-8 border-3 border-t-transparent rounded-full animate-spin mx-auto mb-3" style={{ borderColor: "#C39A3B", borderTopColor: "transparent" }} />
          <p className="text-sm" style={{ color: "#4B5563" }}>Loading...</p>
        </div>
      </div>
    );
  }

  return <Outlet />;
}

export default function PortalRoot() {
  return (
    <AuthProvider>
      <PortalGuard />
    </AuthProvider>
  );
}
