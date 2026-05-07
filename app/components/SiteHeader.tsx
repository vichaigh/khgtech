import React from "react";
import Image from "next/image";

type SiteHeaderProps = {
  subtitle?: string;
};

export default function SiteHeader({
  subtitle = "CRM, TikTok Ads Integration & TikTok Content Posting Platform",
}: SiteHeaderProps) {
  return (
    <header
      style={{
        backgroundColor: "#000",
        color: "#fff",
        padding: "20px",
        textAlign: "center",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <a
        href="/"
        aria-label="Summit home"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "12px",
          color: "#fff",
          textDecoration: "none",
        }}
      >
        <Image
          src="/summit-logo.png"
          alt="Summit logo"
          width={100}
          height={100}
          priority
          style={{ height: "100px", width: "auto", objectFit: "contain" }}
        />
        <h1
          style={{
            margin: 0,
            fontSize: "2rem",
            letterSpacing: "1px",
            lineHeight: 1,
          }}
        >
        </h1>
      </a>
      <p style={{ margin: "8px 0 0", fontSize: "1rem", color: "#ccc" }}>
        {subtitle}
      </p>
      <nav style={{ marginTop: 14, display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
        <a href="/" style={{ color: "#fff", textDecoration: "none", background: "#222", padding: "5px 16px", borderRadius: 5, fontSize: 14 }}>Home</a>
        <a href="/tiktok-connect" style={{ color: "#000", textDecoration: "none", background: "#fff", padding: "5px 16px", borderRadius: 5, fontSize: 14, fontWeight: 700 }}>🎵 Connect TikTok</a>
        <a href="/tiktok-upload/video" style={{ color: "#fff", textDecoration: "none", background: "#e02d2d", padding: "5px 16px", borderRadius: 5, fontSize: 14 }}>Upload Video</a>
        <a href="/tiktok-upload/photo" style={{ color: "#fff", textDecoration: "none", background: "#1d6fa5", padding: "5px 16px", borderRadius: 5, fontSize: 14 }}>Upload Photo</a>
        <a href="/tiktok-upload/status" style={{ color: "#fff", textDecoration: "none", background: "#5a3ea1", padding: "5px 16px", borderRadius: 5, fontSize: 14 }}>Post Status</a>
      </nav>
    </header>
  );
}
