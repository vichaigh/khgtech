import type { Metadata } from "next";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";

export const metadata: Metadata = {
  title: "KHG Tech | CRM, TikTok Ads & Content Posting Platform",
  description:
    "KHG Tech is a CRM and marketing automation platform for TikTok Ads integration, campaign management, lead synchronization, analytics, and TikTok content posting.",
  keywords: [
    "CRM",
    "TikTok",
    "TikTok Ads",
    "TikTok Content Posting",
    "Marketing API",
    "Campaign Management",
    "Lead Management",
    "Automation",
  ],
  authors: [{ name: "KHG Tech", url: "https://khgtech.vip" }],
  robots: "index, follow",
  icons: {
    icon: "/favicon.ico",
  },
};

const cardStyle = {
  background: "#fff",
  borderRadius: 8,
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
  padding: 30,
  marginBottom: 25,
};

const headingStyle = {
  marginTop: 0,
  color: "#1a1a1a",
  fontSize: "1.5rem",
  borderBottom: "2px solid #f0f0f0",
  paddingBottom: 10,
  display: "inline-block",
};

export default function Home() {
  return (
    <div
      style={{
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: "#f4f4f9",
        margin: 0,
        padding: 0,
        color: "#333",
        minHeight: "100vh",
        lineHeight: 1.6,
      }}
    >
      <SiteHeader />

      <main
        style={{
          maxWidth: 860,
          margin: "40px auto",
          padding: "0 20px",
        }}
      >
        <section style={cardStyle}>
          <h2 style={headingStyle}>About Us</h2>
          <p>
            KHG Tech is a software company focused on building CRM, marketing
            automation, TikTok Ads integration, and TikTok content posting
            solutions. We help businesses manage customer relationships,
            advertising campaigns, leads, reports, and social media workflows in
            one platform.
          </p>
        </section>

        <section style={cardStyle}>
          <h2 style={headingStyle}>Our Product</h2>
          <p>
            Our CRM platform integrates with TikTok Ads and TikTok account
            authorization to help businesses create, manage, analyze, and
            optimize advertising campaigns. The platform also supports
            user-authorized TikTok video upload and publishing workflows.
          </p>
        </section>

        <section style={cardStyle}>
          <h2 style={headingStyle}>Services</h2>
          <ul style={{ paddingLeft: 20 }}>
            <li style={{ marginBottom: 8 }}>TikTok Ads campaign management</li>
            <li style={{ marginBottom: 8 }}>Lead management and synchronization</li>
            <li style={{ marginBottom: 8 }}>Analytics and reporting dashboard</li>
            <li style={{ marginBottom: 8 }}>Audience targeting and optimization</li>
            <li style={{ marginBottom: 8 }}>TikTok account connection with Login Kit</li>
            <li style={{ marginBottom: 8 }}>User-authorized TikTok video upload and publishing</li>
          </ul>
        </section>

        <section style={cardStyle}>
          <h2 style={headingStyle}>TikTok Content Posting</h2>
          <p>
            KHG Tech allows authorized TikTok users to connect their TikTok
            account and upload or publish videos from our platform. Users must
            log in with TikTok and grant permission before any video is uploaded
            or published. Users control which videos are submitted to TikTok.
          </p>
          <p>
            We use the Content Posting API only for user-initiated video posting
            actions. We do not post content without the user&apos;s authorization.
          </p>
        </section>

        <section style={cardStyle}>
          <h2 style={headingStyle}>How We Use TikTok APIs</h2>
          <p>
            We use TikTok Marketing API to automate campaign creation, monitor
            campaign performance, and synchronize lead data into our CRM system.
          </p>
          <p>
            We use TikTok Login Kit to authenticate TikTok users and verify the
            connected TikTok account. We use the Content Posting API to upload or
            publish videos only after the user grants permission and starts the
            posting action from our platform.
          </p>
        </section>

        <section style={cardStyle}>
          <h2 style={headingStyle}>Privacy Policy</h2>
          <p>
            We respect user privacy and do not sell or share personal data with
            third parties. Data collected through TikTok APIs is used only for CRM
            functionality, campaign management, reporting, lead synchronization,
            account connection, and user-authorized TikTok content posting.
          </p>
          <p>
            Users can contact us to request account disconnection or data removal
            related to their TikTok integration.
          </p>
        </section>

        <section style={cardStyle}>
          <h2 style={headingStyle}>Terms of Service</h2>
          <p>
            By using KHG Tech, users agree to use the platform only for lawful
            business, marketing, CRM, advertising, and content management
            purposes. Users are responsible for ensuring that all uploaded or
            published content complies with TikTok&apos;s policies and applicable laws.
          </p>
        </section>

        <section id="contact" style={cardStyle}>
          <h2 style={headingStyle}>Contact</h2>
          <div>
            <p style={{ margin: "5px 0" }}>
              <strong>Email:</strong> vichaikhg@gmail.com
            </p>
            {/* <p style={{ margin: "5px 0" }}>
              <strong>Company:</strong> KHG Tech
            </p> */}
            <p style={{ margin: "5px 0" }}>
              <strong>Location:</strong> Cambodia
            </p>
            <p style={{ margin: "5px 0" }}>
              <strong>Website:</strong> https://khgtech.vip
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
