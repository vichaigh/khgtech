"use client";

import { useState } from "react";
import AppShell from "../../components/AppShell";

const inputClass =
  "mt-1 w-full rounded-md border border-gray-700 bg-gray-950 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500";

const labelClass = "mb-4 block text-sm font-semibold text-gray-200";

export default function PostStatusPage() {
  const [publishId, setPublishId] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult(null);
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/tiktok/publish-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publish_id: publishId }),
      });
      const data = await res.json();
      if (res.status === 401) {
        setError("Not connected to TikTok. Please go to Connect TikTok first.");
      } else {
        setResult(JSON.stringify(data, null, 2));
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell>
      <div className="mx-auto max-w-2xl px-6 py-12 text-gray-300">
        <div className="rounded-2xl border border-gray-800 bg-gray-900 p-8">
          <h1 className="mb-2 text-2xl font-bold text-white">Check Post Status</h1>
          <p className="mb-6 text-sm text-gray-500">
            Enter the{" "}
            <code className="rounded bg-black/40 px-1 text-gray-300">
              publish_id
            </code>{" "}
            returned from a video or photo upload to check its current status.
          </p>
          <form onSubmit={handleSubmit}>
            <label className={labelClass}>
              Publish ID
              <input
                className={inputClass}
                value={publishId}
                onChange={(e) => setPublishId(e.target.value)}
                required
                placeholder="e.g. v_pub_url~v12345..."
              />
            </label>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-violet-700 py-2.5 text-sm font-semibold text-white hover:bg-violet-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Checking..." : "Check Status"}
            </button>
          </form>
          {result && (
            <pre className="mt-6 overflow-auto whitespace-pre-wrap break-all rounded-lg bg-black/40 p-4 text-xs text-gray-300">
              {result}
            </pre>
          )}
          {error && (
            <div className="mt-4 text-sm text-red-400">
              {error}
              {error.includes("Connect TikTok") && (
                <>
                  {" "}
                  <a href="/tiktok-connect" className="text-violet-300 underline">
                    Connect now →
                  </a>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
