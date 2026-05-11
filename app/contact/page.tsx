import type { Metadata } from "next";
import AppShell from "../components/AppShell";

export const metadata: Metadata = {
  title: "Contact | crmapp",
  description:
    "Get in touch with crmapp. Contact us by email for CRM, TikTok integration, and content posting inquiries.",
  robots: "index, follow",
};

export default function ContactPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="rounded-2xl border border-gray-800 bg-gray-900 p-8 text-gray-300">
          <h1 className="mb-2 text-3xl font-bold text-white">Contact</h1>
          <p className="mb-8 text-sm text-gray-500">
            We&apos;d love to hear from you
          </p>

          <h2 className="mb-4 text-xl font-semibold text-white">Get in Touch</h2>
          <p className="mb-6">
            Have a question about crmapp, our CRM platform, or our TikTok
            integration? Reach out using the details below and we&apos;ll get
            back to you as soon as possible.
          </p>

          <div className="space-y-3">
            <p>
              <strong className="text-white">Email:</strong>{" "}
              <a
                href="mailto:vichaikhg@gmail.com"
                className="text-gray-200 underline decoration-gray-600 underline-offset-2 hover:text-white"
              >
                vichaikhg@gmail.com
              </a>
            </p>
            <p>
              <strong className="text-white">Location:</strong> Cambodia
            </p>
            <p>
              <strong className="text-white">Website:</strong>{" "}
              <a
                href="https://khgtech.vip"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-200 underline decoration-gray-600 underline-offset-2 hover:text-white"
              >
                https://khgtech.vip
              </a>
            </p>
          </div>

          <div className="mt-8">
            <a
              href="/"
              className="inline-block rounded-lg bg-gray-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-700"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
