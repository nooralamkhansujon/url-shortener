import { useEffect, useRef } from "react";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { useAuthStore } from "./store/useAuthStore";
import api from "./services/api";

function App() {
  const hydrate = useAuthStore((s) => s.hydrate);
  const { isHydrated, login, logout } = useAuthStore();
  const hasFetchedMe = useRef(false);

  useEffect(() => {
    if (hasFetchedMe.current) return;
    hasFetchedMe.current = true;

    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    api
      .get(`/auth/user`)
      .then((response) => {
        login(response.data, token);
      })
      .catch(() => {
        logout();
      });
  }, []);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  //prevent route flicker
  if (!isHydrated) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }
  return <AppRoutes />;
}

export default App;
