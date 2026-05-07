"use client";

import { useState } from "react";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "8px 10px",
  borderRadius: 5,
  border: "1px solid #ccc",
  fontSize: 14,
  boxSizing: "border-box",
  marginTop: 4,
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontWeight: 600,
  marginBottom: 14,
  fontSize: 14,
};

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
    <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", backgroundColor: "#f4f4f9", minHeight: "100vh", color: "#333" }}>
      <SiteHeader subtitle="Upload Video to TikTok" />
      <main style={{ maxWidth: 620, margin: "40px auto", padding: "0 20px" }}>
        <div style={{ background: "#fff", borderRadius: 10, boxShadow: "0 2px 12px rgba(0,0,0,0.07)", padding: 36 }}>
          <h2 style={{ marginTop: 0, marginBottom: 24, fontSize: 22 }}>Publish Video</h2>
          <form onSubmit={handleSubmit}>
            <label style={labelStyle}>
              Title
              <input style={inputStyle} value={title} onChange={e => setTitle(e.target.value)} required />
            </label>
            <label style={labelStyle}>
              Description
              <input style={inputStyle} value={description} onChange={e => setDescription(e.target.value)} />
            </label>
            <label style={labelStyle}>
              Video URL
              <input style={inputStyle} value={videoUrl} onChange={e => setVideoUrl(e.target.value)} required placeholder="https://..." />
            </label>
            <label style={labelStyle}>
              Cover Timestamp (ms)
              <input style={inputStyle} type="number" value={coverTimestamp} onChange={e => setCoverTimestamp(Number(e.target.value))} />
            </label>
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginBottom: 14 }}>
              <label style={{ fontSize: 14, display: "flex", alignItems: "center", gap: 6 }}>
                <input type="checkbox" checked={disableComment} onChange={e => setDisableComment(e.target.checked)} /> Disable Comment
              </label>
              <label style={{ fontSize: 14, display: "flex", alignItems: "center", gap: 6 }}>
                <input type="checkbox" checked={disableDuet} onChange={e => setDisableDuet(e.target.checked)} /> Disable Duet
              </label>
              <label style={{ fontSize: 14, display: "flex", alignItems: "center", gap: 6 }}>
                <input type="checkbox" checked={disableStitch} onChange={e => setDisableStitch(e.target.checked)} /> Disable Stitch
              </label>
              <label style={{ fontSize: 14, display: "flex", alignItems: "center", gap: 6 }}>
                <input type="checkbox" checked={brandContent} onChange={e => setBrandContent(e.target.checked)} /> Brand Content
              </label>
              <label style={{ fontSize: 14, display: "flex", alignItems: "center", gap: 6 }}>
                <input type="checkbox" checked={brandOrganic} onChange={e => setBrandOrganic(e.target.checked)} /> Brand Organic
              </label>
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{ width: "100%", padding: "10px 0", background: "#e02d2d", color: "#fff", border: "none", borderRadius: 6, fontSize: 15, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}
            >
              {loading ? "Submitting..." : "Publish Video"}
            </button>
          </form>
          {result && (
            <pre style={{ marginTop: 20, background: "#f4f4f9", borderRadius: 6, padding: 14, fontSize: 13, overflow: "auto", whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
              {result}
            </pre>
          )}
          {error && (
            <div style={{ marginTop: 16, color: "#c00", fontSize: 14 }}>
              {error}
              {error.includes("Connect TikTok") && (
                <> <a href="/tiktok-connect" style={{ color: "#e02d2d" }}>Connect now →</a></>
              )}
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
