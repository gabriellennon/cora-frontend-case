import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import { Login } from "./pages/IBanking/Login";
import { IBanking } from "./pages/IBanking";
import Todo from "./pages/Todo";
import { useRequireAuth } from "./hooks/useRequireAuth";

export function Router() {
  useRequireAuth();

  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ibanking" element={<IBanking />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
