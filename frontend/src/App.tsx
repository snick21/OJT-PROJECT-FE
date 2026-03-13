import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SubmitTicket from "./pages/SubmitTicket";
import Archive from "./pages/Archive";
import Login from "./pages/Login";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem("access_token");
  return token ? <>{children}</> : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/submit-ticket" element={<PrivateRoute><SubmitTicket /></PrivateRoute>} />
      <Route path="/archive" element={<PrivateRoute><Archive /></PrivateRoute>} />
    </Routes>
  );
}