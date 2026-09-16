import { Outlet } from "react-router";
import { AuthProvider } from "./AuthContext";

export default function AppLayout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
