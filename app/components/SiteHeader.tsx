import React from "react";

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
        padding: "24px 20px",
        textAlign: "center",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <a
        href="/"
        style={{ color: "#fff", textDecoration: "none" }}
        aria-label="KHG Tech home"
      >
        <h1 style={{ margin: 0, fontSize: "2rem", letterSpacing: "1px" }}>
          KHG Tech
        </h1>
      </a>
      <p style={{ margin: "6px 0 0", fontSize: "1rem", color: "#ccc" }}>
        {subtitle}
      </p>
    </header>
  );
}
