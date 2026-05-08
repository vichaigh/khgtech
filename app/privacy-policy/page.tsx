"use client";

import React from "react";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

export default function PrivacyPolicyPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        background: "#fff",
        fontFamily: "Arial, sans-serif",
        color: "#333",
      }}
    >
      <SiteHeader subtitle="Privacy Policy" />
      <div
        className="container"
        style={{
          maxWidth: 800,
          width: "100%",
          margin: "auto",
          padding: "40px 20px",
          lineHeight: 1.6,
          boxSizing: "border-box",
          flex: 1,
        }}
      >
        <h1 style={{ color: "#111", marginBottom: 10 }}>Privacy Policy</h1>
      <p className="updated" style={{ fontSize: 14, color: "#777", marginBottom: 30 }}>
        Last updated: April 30, 2026
      </p>

      <h2 style={{ color: "#111" }}>1. Introduction</h2>
      <p>
        This Privacy Policy explains how we collect, use, and protect your information when you use our website or services.
        By using our services, you agree to the collection and use of information in accordance with this policy.
      </p>

      <h2 style={{ color: "#111" }}>2. Information We Collect</h2>
      <p>We may collect the following types of information:</p>
      <ul style={{ margin: "10px 0 20px 20px" }}>
        <li>Personal information (such as name, email address)</li>
        <li>Usage data (pages visited, time spent, interactions)</li>
        <li>Device information (browser type, IP address, operating system)</li>
      </ul>

      <h2 style={{ color: "#111" }}>3. How We Use Your Information</h2>
      <p>We use your information to:</p>
      <ul style={{ margin: "10px 0 20px 20px" }}>
        <li>Provide and maintain our services</li>
        <li>Improve user experience</li>
        <li>Communicate with you</li>
        <li>Ensure security and prevent fraud</li>
      </ul>

      <h2 style={{ color: "#111" }}>4. Cookies and Tracking</h2>
      <p>
        We may use cookies and similar tracking technologies to monitor activity and store certain information.
        You can instruct your browser to refuse cookies if you prefer.
      </p>

      <h2 style={{ color: "#111" }}>5. Sharing of Information</h2>
      <p>We do not sell your personal information. We may share data with:</p>
      <ul style={{ margin: "10px 0 20px 20px" }}>
        <li>Service providers (hosting, analytics)</li>
        <li>Legal authorities when required by law</li>
      </ul>

      <h2 style={{ color: "#111" }}>6. Data Security</h2>
      <p>
        We take reasonable measures to protect your information, but no method of transmission over the internet is 100% secure.
      </p>

      <h2 style={{ color: "#111" }}>7. Your Rights</h2>
      <p>You may have the right to:</p>
      <ul style={{ margin: "10px 0 20px 20px" }}>
        <li>Access your personal data</li>
        <li>Request correction or deletion</li>
        <li>Withdraw consent where applicable</li>
      </ul>

      <h2 style={{ color: "#111" }}>8. Third-Party Links</h2>
      <p>
        Our website may contain links to third-party sites. We are not responsible for their privacy practices.
      </p>

      <h2 style={{ color: "#111" }}>9. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Changes will be posted on this page.
      </p>

        <h2 style={{ color: "#111" }}>10. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at:
          <br />
          <strong>vichaikhg@gmail.com</strong>
        </p>
      </div>
      <SiteFooter />
    </div>
  );
}