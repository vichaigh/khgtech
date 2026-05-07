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
    <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", backgroundColor: "#f4f4f9", minHeight: "100vh", color: "#333" }}>
      <SiteHeader subtitle="Check TikTok Post Status" />
      <main style={{ maxWidth: 620, margin: "40px auto", padding: "0 20px" }}>
        <div style={{ background: "#fff", borderRadius: 10, boxShadow: "0 2px 12px rgba(0,0,0,0.07)", padding: 36 }}>
          <h2 style={{ marginTop: 0, marginBottom: 8, fontSize: 22 }}>Check Post Status</h2>
          <p style={{ color: "#888", fontSize: 13, marginBottom: 24 }}>
            Enter the <code>publish_id</code> returned from a video or photo upload to check its current status.
          </p>
          <form onSubmit={handleSubmit}>
            <label style={labelStyle}>
              Publish ID
              <input style={inputStyle} value={publishId} onChange={e => setPublishId(e.target.value)} required placeholder="e.g. v_pub_url~v12345..." />
            </label>
            <button
              type="submit"
              disabled={loading}
              style={{ width: "100%", padding: "10px 0", background: "#5a3ea1", color: "#fff", border: "none", borderRadius: 6, fontSize: 15, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}
            >
              {loading ? "Checking..." : "Check Status"}
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
                <> <a href="/tiktok-connect" style={{ color: "#5a3ea1" }}>Connect now →</a></>
              )}
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
