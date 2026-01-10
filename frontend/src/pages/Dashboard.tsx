import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import CreateUrlForm from "../components/CreateUrlForm";
import UrlList from "../components/UrlList";
import Modal from "../components/Modal";
import { useState } from "react";

export default function Dashboard() {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-black">URL Shortener</h1>

          <div className="flex gap-2">
            <button
              onClick={() => setOpen(true)}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              + Create URL
            </button>

            <button
              onClick={handleLogout}
              className="rounded-lg bg-red-500 px-4 py-2 text-white"
            >
              Logout
            </button>
          </div>
        </div>

        {/* URL List */}
        <UrlList />
      </div>

      {/* Modal */}
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <CreateUrlForm onSuccess={() => setOpen(false)} />
      </Modal>
    </div>
  );
}
