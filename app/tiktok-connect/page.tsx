"use client";

import { useEffect, useState } from "react";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

const SCOPES = [
  { value: "user.info.basic", label: "User Info (Basic)", required: true },
  { value: "video.publish", label: "Publish Videos", required: false },
  { value: "video.upload", label: "Upload Videos", required: false },
];

export default function TikTokConnectPage() {
  const [redirectUri, setRedirectUri] = useState("");
  const [selectedScopes, setSelectedScopes] = useState<string[]>(["user.info.basic", "video.publish", "video.upload"]);
  const clientKey = process.env.NEXT_PUBLIC_TIKTOK_CLIENT_KEY ?? "";

  useEffect(() => {
    setRedirectUri(`https://khgtech.vip/tiktok-callback`);
  }, []);

  const toggleScope = (value: string, required: boolean) => {
    if (required) return;
    setSelectedScopes(prev =>
      prev.includes(value) ? prev.filter(s => s !== value) : [...prev, value]
    );
  };

  const handleConnect = () => {
    if (!clientKey || clientKey === "your_client_key_here") {
      alert("Please set NEXT_PUBLIC_TIKTOK_CLIENT_KEY in your .env.local file first.");
      return;
    }
    const state = Math.random().toString(36).slice(2);
    sessionStorage.setItem("tiktok_oauth_state", state);
    const params = new URLSearchParams({
      client_key: clientKey,
      response_type: "code",
      scope: selectedScopes.join(","),
      redirect_uri: redirectUri,
      state,
    });

    console.log("params ==",params);
    window.location.href = `https://www.tiktok.com/v2/auth/authorize/?${params.toString()}`;
  };

  const missingKey = !clientKey || clientKey === "your_client_key_here";

  return (
    <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", backgroundColor: "#f4f4f9", minHeight: "100vh", color: "#333" }}>
      <SiteHeader subtitle="Connect Your TikTok Account" />
      <main style={{ maxWidth: 560, margin: "40px auto", padding: "0 20px" }}>
        <div style={{ background: "#fff", borderRadius: 10, boxShadow: "0 2px 12px rgba(0,0,0,0.07)", padding: 36 }}>

          {/* TikTok logo mark */}
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div style={{ fontSize: 48, lineHeight: 1 }}>🎵</div>
            <h2 style={{ margin: "10px 0 4px", fontSize: 22 }}>Connect to TikTok</h2>
            <p style={{ color: "#888", fontSize: 13, margin: 0 }}>
              Authorize KHG Tech to publish content on your behalf.
            </p>
          </div>

          {missingKey && (
            <div style={{ background: "#fff8e1", border: "1px solid #f5c518", borderRadius: 6, padding: "10px 14px", marginBottom: 20, fontSize: 13, color: "#7a5c00" }}>
              <strong>Setup required:</strong> Set <code>NEXT_PUBLIC_TIKTOK_CLIENT_KEY</code> in <code>.env.local</code> and restart the server.
            </div>
          )}

          {/* Scopes */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 10 }}>Permissions requested:</div>
            {SCOPES.map(scope => (
              <label
                key={scope.value}
                style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, cursor: scope.required ? "default" : "pointer", fontSize: 14 }}
              >
                <input
                  type="checkbox"
                  checked={selectedScopes.includes(scope.value)}
                  onChange={() => toggleScope(scope.value, scope.required)}
                  disabled={scope.required}
                  style={{ width: 16, height: 16 }}
                />
                <span>
                  {scope.label}
                  {scope.required && <span style={{ color: "#888", fontSize: 12, marginLeft: 6 }}>(required)</span>}
                </span>
              </label>
            ))}
          </div>

          {/* Redirect URI */}
          {/* <div style={{ marginBottom: 24 }}>
            <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>Redirect URI</div>
            <input
              type="text"
              value={redirectUri}
              onChange={e => setRedirectUri(e.target.value)}
              style={{ width: "100%", padding: "8px 10px", borderRadius: 5, border: "1px solid #ccc", fontSize: 13, boxSizing: "border-box" }}
            />
            <div style={{ color: "#888", fontSize: 12, marginTop: 4 }}>
              Make sure this matches your TikTok app&apos;s configured redirect URI.
            </div>
          </div> */}

          <button
            onClick={handleConnect}
            disabled={missingKey}
            style={{
              width: "100%",
              padding: "12px 0",
              background: missingKey ? "#ccc" : "#000",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              fontSize: 16,
              fontWeight: 700,
              cursor: missingKey ? "not-allowed" : "pointer",
              letterSpacing: "0.5px",
            }}
          >
            Connect with TikTok
          </button>

          <p style={{ textAlign: "center", fontSize: 12, color: "#aaa", marginTop: 16 }}>
            You will be redirected to TikTok to approve permissions. We never post without your action.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
