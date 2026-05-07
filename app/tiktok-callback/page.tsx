"use client";

import { useEffect, useState } from "react";

export default function TikTokCallbackPage() {
  const [code, setCode] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [redirectUri, setRedirectUri] = useState("");
  const [tokenResult, setTokenResult] = useState<string | null>(null);
  const [tokenError, setTokenError] = useState<string | null>(null);
  const [tokenLoading, setTokenLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setCode(params.get("code"));
    setRedirectUri(`${window.location.origin}/tiktok-callback`);
    setMounted(true);
  }, []);

  const handleCopy = () => {
    if (code) navigator.clipboard.writeText(code);
  };

  const handleExchangeToken = async () => {
    if (!code) return;
    setTokenResult(null);
    setTokenError(null);
    setTokenLoading(true);
    try {
      const res = await fetch("/api/tiktok/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, redirectUri }),
      });
      const data = await res.json();
      setTokenResult(JSON.stringify(data, null, 2));
    } catch (err: unknown) {
      setTokenError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setTokenLoading(false);
    }
  };

  const handleCopyToken = () => {
    if (!tokenResult) return;
    try {
      const parsed = JSON.parse(tokenResult);
      const token = parsed?.data?.access_token ?? parsed?.access_token;
      if (token) navigator.clipboard.writeText(token);
    } catch {
      navigator.clipboard.writeText(tokenResult);
    }
  };

  return (
    <div
      style={{
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: "#f4f4f9",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#333",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 10,
          boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
          padding: 40,
          maxWidth: 440,
          width: "100%",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: 28, marginBottom: 10, letterSpacing: "1px" }}>
          TikTok Callback
        </h1>

        {mounted && code && (
          <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 16 }}>
            {[...Array(3)].map((_, i) => (
              <span
                key={i}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "#22c55e",
                  color: "#fff",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                ✓
              </span>
            ))}
          </div>
        )}

        <div style={{ marginBottom: 20, wordBreak: "break-all", textAlign: "left" }}>
          {mounted && (
            code ? (
              <div>
                <div style={{ marginBottom: 8 }}>Received code from TikTok:</div>
                <div
                  style={{
                    background: "#f4f4f9",
                    borderRadius: 5,
                    padding: "8px 10px",
                    fontSize: 13,
                    wordBreak: "break-all",
                    marginBottom: 8,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span style={{ flex: 1 }}>{code}</span>
                  <button
                    onClick={handleCopy}
                    style={{
                      marginLeft: 10,
                      padding: "2px 10px",
                      fontSize: 13,
                      border: "1px solid #ccc",
                      background: "#f7f7fa",
                      borderRadius: 4,
                      cursor: "pointer",
                    }}
                    title="Copy code to clipboard"
                  >
                    Copy
                  </button>
                </div>

                {/* Token exchange */}
                <div style={{ borderTop: "1px solid #eee", marginTop: 16, paddingTop: 16 }}>
                  <div style={{ fontWeight: 600, marginBottom: 8, fontSize: 14 }}>Exchange for Access Token</div>
                  <div style={{ fontSize: 12, color: "#888", marginBottom: 10 }}>
                    Redirect URI used during auth:
                  </div>
                  <input
                    type="text"
                    value={redirectUri}
                    onChange={e => setRedirectUri(e.target.value)}
                    style={{ width: "100%", padding: "6px 8px", borderRadius: 4, border: "1px solid #ccc", fontSize: 12, boxSizing: "border-box", marginBottom: 10 }}
                  />
                  <button
                    onClick={handleExchangeToken}
                    disabled={tokenLoading}
                    style={{
                      width: "100%",
                      padding: "8px 0",
                      background: "#000",
                      color: "#fff",
                      border: "none",
                      borderRadius: 5,
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: tokenLoading ? "not-allowed" : "pointer",
                      opacity: tokenLoading ? 0.7 : 1,
                    }}
                  >
                    {tokenLoading ? "Exchanging..." : "Get Access Token"}
                  </button>
                </div>

                {tokenResult && (
                  <div style={{ marginTop: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                      <span style={{ fontSize: 13, fontWeight: 600 }}>Token Response:</span>
                      <button onClick={handleCopyToken} style={{ fontSize: 12, padding: "2px 8px", border: "1px solid #ccc", borderRadius: 4, cursor: "pointer", background: "#f7f7fa" }}>
                        Copy Token
                      </button>
                    </div>
                    <pre style={{ background: "#f4f4f9", borderRadius: 5, padding: 10, fontSize: 12, overflow: "auto", whiteSpace: "pre-wrap", wordBreak: "break-all", textAlign: "left" }}>
                      {tokenResult}
                    </pre>
                  </div>
                )}
                {tokenError && (
                  <div style={{ marginTop: 10, color: "#c00", fontSize: 13 }}>Error: {tokenError}</div>
                )}
              </div>
            ) : (
              <>No code parameter found in TikTok callback.</>
            )
          )}
        </div>

        <p style={{ fontSize: 13, color: "#888" }}>
          If you are not redirected automatically, please close this window.
        </p>
        <a
          href="/"
          style={{
            display: "inline-block",
            marginTop: 16,
            padding: "8px 24px",
            background: "#333",
            color: "#fff",
            borderRadius: 6,
            fontSize: 14,
            textDecoration: "none",
          }}
        >
          Back Home
        </a>
      </div>
    </div>
  );
}
