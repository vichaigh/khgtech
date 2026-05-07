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
    </header>
  );
}
