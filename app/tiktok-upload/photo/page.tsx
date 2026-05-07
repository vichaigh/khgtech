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

const PRIVACY_OPTIONS = ["SELF_ONLY", "PUBLIC_TO_EVERYONE", "MUTUAL_FOLLOW_FRIENDS", "FOLLOWER_OF_CREATOR"];

export default function UploadPhotoPage() {
  const [title, setTitle] = useState("funny cat");
  const [description, setDescription] = useState("this will be a #funny photomode on your @tiktok #fyp");
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
    const images = photoUrls.split("\n").map(u => u.trim()).filter(Boolean);
    try {
      const res = await fetch("/api/tiktok/publish-photo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          post_info: {
            title,
            description,
            disable_comment: disableComment,
            privacy_level: privacyLevel,
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
    <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", backgroundColor: "#f4f4f9", minHeight: "100vh", color: "#333" }}>
      <SiteHeader subtitle="Upload Photo to TikTok" />
      <main style={{ maxWidth: 620, margin: "40px auto", padding: "0 20px" }}>
        <div style={{ background: "#fff", borderRadius: 10, boxShadow: "0 2px 12px rgba(0,0,0,0.07)", padding: 36 }}>
          <h2 style={{ marginTop: 0, marginBottom: 24, fontSize: 22 }}>Publish Photo</h2>
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
              Privacy Level
              <select style={inputStyle} value={privacyLevel} onChange={e => setPrivacyLevel(e.target.value)}>
                {PRIVACY_OPTIONS.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </label>
            <label style={labelStyle}>
              Photo Image URLs <span style={{ fontWeight: 400, color: "#888" }}>(one per line)</span>
              <textarea
                style={{ ...inputStyle, minHeight: 90, resize: "vertical" }}
                value={photoUrls}
                onChange={e => setPhotoUrls(e.target.value)}
                required
                placeholder={"https://example.com/image1.jpg\nhttps://example.com/image2.jpg"}
              />
            </label>
            <label style={labelStyle}>
              Cover Image Index
              <input style={inputStyle} type="number" min={0} value={coverIndex} onChange={e => setCoverIndex(Number(e.target.value))} />
            </label>
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginBottom: 18 }}>
              <label style={{ fontSize: 14, display: "flex", alignItems: "center", gap: 6 }}>
                <input type="checkbox" checked={disableComment} onChange={e => setDisableComment(e.target.checked)} /> Disable Comment
              </label>
              <label style={{ fontSize: 14, display: "flex", alignItems: "center", gap: 6 }}>
                <input type="checkbox" checked={autoAddMusic} onChange={e => setAutoAddMusic(e.target.checked)} /> Auto Add Music
              </label>
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{ width: "100%", padding: "10px 0", background: "#1d6fa5", color: "#fff", border: "none", borderRadius: 6, fontSize: 15, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}
            >
              {loading ? "Submitting..." : "Publish Photo"}
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
                <> <a href="/tiktok-connect" style={{ color: "#1d6fa5" }}>Connect now →</a></>
              )}
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
