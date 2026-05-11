"use client";

import { useState } from "react";
import AppShell from "../../components/AppShell";

const inputClass =
  "mt-1 w-full rounded-md border border-gray-700 bg-gray-950 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500";

const labelClass = "mb-4 block text-sm font-semibold text-gray-200";

export default function UploadVideoPage() {
  const [title, setTitle] = useState("First try to play csgo");
  const [description, setDescription] = useState("#gaming#csgo");
  const [videoUrl, setVideoUrl] = useState("");
  const [disableComment, setDisableComment] = useState(false);
  const [disableDuet, setDisableDuet] = useState(false);
  const [disableStitch, setDisableStitch] = useState(false);
  const [coverTimestamp, setCoverTimestamp] = useState(1000);
  const [brandContent, setBrandContent] = useState(false);
  const [brandOrganic, setBrandOrganic] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult(null);
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/tiktok/publish-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          post_info: {
            title,
            description,
            privacy_level: "SELF_ONLY",
            disable_comment: disableComment,
            disable_duet: disableDuet,
            disable_stitch: disableStitch,
            video_cover_timestamp_ms: coverTimestamp,
            brand_content_toggle: brandContent,
            brand_organic_toggle: brandOrganic,
          },
          source_info: {
            source: "PULL_FROM_URL",
            video_url: videoUrl,
          },
          post_mode: "DIRECT_POST",
          media_type: "VIDEO",
        }),
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
          <h1 className="mb-6 text-2xl font-bold text-white">Publish Video</h1>
          <form onSubmit={handleSubmit}>
            <label className={labelClass}>
              Title
              <input
                className={inputClass}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </label>
            <label className={labelClass}>
              Description
              <input
                className={inputClass}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <label className={labelClass}>
              Video URL
              <input
                className={inputClass}
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                required
                placeholder="https://..."
              />
            </label>
            <label className={labelClass}>
              Cover Timestamp (ms)
              <input
                className={inputClass}
                type="number"
                value={coverTimestamp}
                onChange={(e) => setCoverTimestamp(Number(e.target.value))}
              />
            </label>
            <div className="mb-4 flex flex-wrap gap-5 text-sm text-gray-300">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={disableComment}
                  onChange={(e) => setDisableComment(e.target.checked)}
                  className="rounded border-gray-600 bg-gray-950"
                />{" "}
                Disable Comment
              </label>
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={disableDuet}
                  onChange={(e) => setDisableDuet(e.target.checked)}
                  className="rounded border-gray-600 bg-gray-950"
                />{" "}
                Disable Duet
              </label>
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={disableStitch}
                  onChange={(e) => setDisableStitch(e.target.checked)}
                  className="rounded border-gray-600 bg-gray-950"
                />{" "}
                Disable Stitch
              </label>
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={brandContent}
                  onChange={(e) => setBrandContent(e.target.checked)}
                  className="rounded border-gray-600 bg-gray-950"
                />{" "}
                Brand Content
              </label>
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={brandOrganic}
                  onChange={(e) => setBrandOrganic(e.target.checked)}
                  className="rounded border-gray-600 bg-gray-950"
                />{" "}
                Brand Organic
              </label>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-red-600 py-2.5 text-sm font-semibold text-white hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Submitting..." : "Publish Video"}
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
                  <a href="/tiktok-connect" className="text-red-300 underline">
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
