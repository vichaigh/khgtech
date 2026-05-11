"use client";

import { useState } from "react";
import AppShell from "../../components/AppShell";

const inputClass =
  "mt-1 w-full rounded-md border border-gray-700 bg-gray-950 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500";

const labelClass = "mb-4 block text-sm font-semibold text-gray-200";

const PRIVACY_OPTIONS = [
  "SELF_ONLY",
  "PUBLIC_TO_EVERYONE",
  "MUTUAL_FOLLOW_FRIENDS",
  "FOLLOWER_OF_CREATOR",
];

export default function UploadPhotoPage() {
  const [title, setTitle] = useState("funny cat");
  const [description, setDescription] = useState(
    "this will be a #funny photomode on your @tiktok #fyp"
  );
  const [privacyLevel, setPrivacyLevel] = useState("SELF_ONLY");
  const [autoAddMusic, setAutoAddMusic] = useState(true);
  const [disableComment, setDisableComment] = useState(true);
  const [coverIndex, setCoverIndex] = useState(0);
  const [photoUrls, setPhotoUrls] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult(null);
    setError(null);
    setLoading(true);
    const images = photoUrls
      .split("\n")
      .map((u) => u.trim())
      .filter(Boolean);
    try {
      const res = await fetch("/api/tiktok/publish-photo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          post_info: {
            title,
            description,
            privacy_level: "SELF_ONLY",
            disable_comment: disableComment,
            auto_add_music: autoAddMusic,
          },
          source_info: {
            source: "PULL_FROM_URL",
            photo_cover_index: coverIndex,
            photo_images: images,
          },
          post_mode: "DIRECT_POST",
          media_type: "PHOTO",
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
          <h1 className="mb-6 text-2xl font-bold text-white">Publish Photo</h1>
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
              Privacy Level
              <select
                className={inputClass}
                value={privacyLevel}
                onChange={(e) => setPrivacyLevel(e.target.value)}
              >
                {PRIVACY_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </label>
            <label className={labelClass}>
              Photo Image URLs{" "}
              <span className="font-normal text-gray-500">(one per line)</span>
              <textarea
                className={`${inputClass} min-h-[90px] resize-y`}
                value={photoUrls}
                onChange={(e) => setPhotoUrls(e.target.value)}
                required
                placeholder={
                  "https://example.com/image1.jpg\nhttps://example.com/image2.jpg"
                }
              />
            </label>
            <label className={labelClass}>
              Cover Image Index
              <input
                className={inputClass}
                type="number"
                min={0}
                value={coverIndex}
                onChange={(e) => setCoverIndex(Number(e.target.value))}
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
                  checked={autoAddMusic}
                  onChange={(e) => setAutoAddMusic(e.target.checked)}
                  className="rounded border-gray-600 bg-gray-950"
                />{" "}
                Auto Add Music
              </label>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-sky-700 py-2.5 text-sm font-semibold text-white hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Submitting..." : "Publish Photo"}
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
                  <a href="/tiktok-connect" className="text-sky-300 underline">
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
