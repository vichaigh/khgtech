import type { Metadata } from "next";
import AppShell from "./components/AppShell";

export const metadata: Metadata = {
  title: "khgtech",
  description:
    "khgtech is a CRM and TikTok marketing automation platform for campaign management, lead synchronization, analytics, and content posting.",
  keywords: [
    "khgtech",
    "CRM",
    "TikTok Marketing",
    "TikTok Ads",
    "Content Posting",
    "Campaign Management",
    "Lead Management",
    "Marketing Automation",
  ],
  authors: [{ name: "khgtech", url: "https://khgtech.vip" }],
  robots: "index, follow",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function HomePage() {
  return (
    <AppShell>
      {/* Hero Section */}
      <section className="mx-auto flex max-w-7xl flex-col items-center justify-center px-6 py-24 text-center">
        <h2 className="mb-6 text-5xl font-bold leading-tight">khgtech</h2>

        <p className="mb-10 max-w-3xl text-lg text-gray-300">
           khgtech is a CRM and TikTok marketing automation platform designed for
          campaign management, lead synchronization, analytics, and TikTok
          content posting.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="/privacy-policy"
            className="rounded-lg border border-white px-6 py-3 text-sm font-medium hover:bg-white hover:text-black"
          >
            Privacy Policy
          </a>

          <a
            href="/terms-of-service"
            className="rounded-lg border border-white px-6 py-3 text-sm font-medium hover:bg-white hover:text-black"
          >
            Terms of Service
          </a>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto grid max-w-7xl gap-6 px-6 pb-24 md:grid-cols-3">
        <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
          <h3 className="mb-3 text-xl font-semibold">TikTok Ads Integration</h3>

          <p className="text-gray-400">
            Connect and manage TikTok advertising campaigns directly from
            khgtech.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
          <h3 className="mb-3 text-xl font-semibold">Lead Synchronization</h3>

          <p className="text-gray-400">
            Automatically synchronize leads and customer data into your CRM
            workflows.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
          <h3 className="mb-3 text-xl font-semibold">Content Posting</h3>

          <p className="text-gray-400">
            Schedule and publish TikTok content with analytics and automation
            support.
          </p>
        </div>
      </section>
    </AppShell>
  );
}
