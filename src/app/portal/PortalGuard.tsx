import { Outlet } from "react-router";
import { RequireAuth } from "../AuthContext";

export default function PortalGuard() {
  return (
    <RequireAuth>
      <Outlet />
    </RequireAuth>
  );
}
