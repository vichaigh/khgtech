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
        <p style={{ marginBottom: 20 }}>
          {typeof window !== "undefined" && (
            <>
              {(() => {
                const params = new URLSearchParams(window.location.search);
                const code = params.get("code");
                return code
                  ? <>Received code from TikTok: <b>{code}</b></>
                  : <>No code parameter found in TikTok callback.</>;
              })()}
            </>
          )}
        </p>
        {/* You can implement logic here to handle callback params */}
        <p style={{ fontSize: 13, color: "#888" }}>
          If you are not redirected automatically, please close this window.
        </p>
      </div>
    </div>
  );
}