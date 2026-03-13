import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AppNav from "./components/AppNav";

export default function App() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <AppNav />
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
}
