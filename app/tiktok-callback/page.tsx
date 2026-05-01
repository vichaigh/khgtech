"use client";

import React from "react";

export default function TikTokCallbackPage() {
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
          maxWidth: 400,
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: 28, marginBottom: 10, letterSpacing: "1px" }}>
          TikTok Callback
        </h1>
        <div style={{ marginBottom: 20, wordBreak: "break-all", textAlign: "left" }}>
          {typeof window !== "undefined" && (
            <>
              {(() => {
                const params = new URLSearchParams(window.location.search);
                const code = params.get("code");
                if (code) {
                  const handleCopy = () => {
                    navigator.clipboard.writeText(code);
                  };
                  return (
                    <div>
                      <div style={{ marginBottom: 8 }}>
                        Received code from TikTok:
                      </div>
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
                    </div>
                  );
                }
                return <>No code parameter found in TikTok callback.</>;
              })()}
            </>
          )}
        </div>
   
        {/* You can implement logic here to handle callback params */}
        <p style={{ fontSize: 13, color: "#888" }}>
          If you are not redirected automatically, please close this window.
        </p>
      </div>
    </div>
  );
}