import { Outlet, ScrollRestoration } from "react-router";
import { UtilityBar, Header, Footer } from "./shared";

export default function Root() {
  return (
    <div className="min-h-screen bg-white">
      <UtilityBar />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
}
