import type { Metadata } from "next";
import React from "react";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Contact | KHG Tech",
  description:
    "Get in touch with KHG Tech. Contact us by email for CRM, TikTok Ads integration, and TikTok content posting inquiries.",
  robots: "index, follow",
};

export default function ContactPage() {
  return (
    <div
      style={{
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: "#f4f4f9",
        color: "#333",
        minHeight: "100vh",
        lineHeight: 1.6,
      }}
    >
      <SiteHeader subtitle="We'd love to hear from you" />

      <main
        style={{
          maxWidth: 800,
          margin: "40px auto",
          padding: "0 20px",
        }}
      >
        <section
          style={{
            background: "#fff",
            borderRadius: 8,
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
            padding: 30,
          }}
        >
          <h2
            style={{
              marginTop: 0,
              color: "#1a1a1a",
              fontSize: "1.5rem",
              borderBottom: "2px solid #f0f0f0",
              paddingBottom: 10,
              display: "inline-block",
            }}
          >
            Get in Touch
          </h2>

          <p style={{ margin: "16px 0" }}>
            Have a question about KHG Tech, our CRM platform, or our TikTok
            integration? Reach out using the details below and we&apos;ll get
            back to you as soon as possible.
          </p>

          <div style={{ marginTop: 24 }}>
            <p style={{ margin: "10px 0" }}>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:vichaikhg@gmail.com"
                style={{ color: "#0070f3", textDecoration: "none" }}
              >
                vichaikhg@gmail.com
              </a>
            </p>
            <p style={{ margin: "10px 0" }}>
              <strong>Location:</strong> Cambodia
            </p>
            <p style={{ margin: "10px 0" }}>
              <strong>Website:</strong>{" "}
              <a
                href="https://khgtech.vip"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#0070f3", textDecoration: "none" }}
              >
                https://khgtech.vip
              </a>
            </p>
          </div>

          <div style={{ marginTop: 32 }}>
            <a
              href="/"
              style={{
                display: "inline-block",
                padding: "10px 20px",
                backgroundColor: "#000",
                color: "#fff",
                borderRadius: 6,
                textDecoration: "none",
                fontSize: "0.95rem",
              }}
            >
              ← Back to Home
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
