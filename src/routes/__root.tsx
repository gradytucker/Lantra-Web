import { createRootRoute, Outlet } from "@tanstack/react-router";
import Navbar from "../components/navigation/Navbar.tsx";

export const Route = createRootRoute({
  component: () => (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        minHeight: 0,
        minWidth: 0,
        display: "flex",
        flexDirection: "row",
        overflow: "hidden",
        background: "#000",
      }}
    >
      {/* Prevent scrolling globally when on player route */}
      <style>{`
        html, body {
          overflow: hidden !important;
          height: 100%;
        }
      `}</style>
      <Navbar />
      <div
        style={{
          flex: 1,
          minWidth: 0,
          minHeight: 0,
          height: "100%",
          width: "100%",
          display: "flex",
        }}
      >
        <Outlet />
      </div>
    </div>
  ),
});
