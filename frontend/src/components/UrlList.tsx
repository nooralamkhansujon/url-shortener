import toast from "react-hot-toast";
import { useDeleteUrl, useUrls } from "../hooks/useUrls";

export default function UrlList() {
  const { data, isLoading } = useUrls();
  const baseUrl = import.meta.env.VITE_API_URL;

  const deleteUrl = useDeleteUrl();

  if (isLoading) {
    return <p className="text-center text-black">Loading URLs...</p>;
  }

  if (!data?.length) {
    return <p className="text-center text-gray-500">No URLs yet</p>;
  }

  const copy = (shortUrl: string) => {
    const originalUrl = `${baseUrl}/${shortUrl}`;
    navigator.clipboard.writeText(originalUrl);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="overflow-x-auto rounded-xl bg-white shadow text-black">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="px-4 py-3">Original URL</th>
            <th className="px-4 py-3">Short Code</th>
            <th className="px-4 py-3">Short URL</th>
            <th className="px-4 py-3 text-center">Clicks</th>
            <th className="px-4 py-3">Created</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((url: any) => (
            <tr key={url.id} className="border-t hover:bg-gray-50">
              {/* Original URL */}
              <td className="max-w-xs px-4 py-3">
                <div className="truncate" title={url.originalUrl}>
                  {url.originalUrl}
                </div>
              </td>

              {/* Short Code */}
              <td className="px-4 py-3 font-mono">{url.shortCode}</td>

              {/* Short URL */}
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="font-medium">
                    {baseUrl}/{url.shortCode}
                  </span>
                  <button
                    onClick={() => copy(url.shortCode)}
                    className="text-blue-600 hover:underline"
                  >
                    Copy
                  </button>
                </div>
              </td>

              {/* Clicks */}
              <td className="px-4 py-3 text-center font-semibold">
                {url.clickCount}
              </td>

              {/* Created */}
              <td className="px-4 py-3">
                {new Date(url.createdAt).toLocaleDateString()}
              </td>

              {/* Actions */}
              <td className="px-4 py-3 text-center">
                <button
                  onClick={() => deleteUrl.mutate(url.id)}
                  className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
