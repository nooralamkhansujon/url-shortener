import type { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const { isHydrated, token } = useAuthStore();

  if (!isHydrated) {
    return null;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
