import React from "react";

export default function SiteFooter() {
  return (
    <footer
      style={{
        backgroundColor: "#000",
        color: "#ccc",
        padding: "20px",
        textAlign: "center",
        marginTop: "auto",
        fontSize: "0.95rem",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <a
          href="/tiktok-privacy-policy"
          style={{ color: "#fff", textDecoration: "none" }}
        >
          Privacy Policy
        </a>
        <span style={{ color: "#555" }}>|</span>
        <a
          href="/tiktok-terms-of-service"
          style={{ color: "#fff", textDecoration: "none" }}
        >
          Terms of Service
        </a>
        <span style={{ color: "#555" }}>|</span>
        <a href="/contact" style={{ color: "#fff", textDecoration: "none" }}>
          Contact
        </a>
      </nav>
      <p style={{ margin: "12px 0 0", color: "#888", fontSize: "0.85rem" }}>
        &copy; {new Date().getFullYear()} KHG Tech. All rights reserved.
      </p>
    </footer>
  );
}
