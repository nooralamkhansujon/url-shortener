import { useState } from "react";
import toast from "react-hot-toast";
import { useCreateUrl } from "../hooks/useUrls";

interface Props {
  onSuccess: () => void;
}

export default function CreateUrlForm({ onSuccess }: Props) {
  const [url, setUrl] = useState("");
  const createUrl = useCreateUrl();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!url.startsWith("http")) {
      toast.error("Invalid URL");
      return;
    }

    createUrl.mutate(url, {
      onSuccess: () => {
        toast.success("Short URL created 🎉");
        setUrl("");
        onSuccess();
      },
      onError: (error: any) => {
        console.log(error.response?.data?.message, "error fron onError");
        const errorMessage =
          error.response?.data?.message || "Failed to create URL";
        toast.error(errorMessage);
      },
    });
  };

  return (
    <>
      <h2 className="mb-4 text-xl font-bold text-black">Create Short URL</h2>

      <form onSubmit={submit} className="space-y-4">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          className="w-full rounded-lg border border-blue-500 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />

        <button
          disabled={createUrl.isPending}
          className="w-full rounded-lg bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700"
        >
          {createUrl.isPending ? "Creating..." : "Create"}
        </button>
      </form>
    </>
  );
}
