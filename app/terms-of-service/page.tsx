import type { Metadata } from "next";
import AppShell from "../components/AppShell";

export const metadata: Metadata = {
  title: "khgtech Terms of Service",
};

export default function Page() {
  return (
    <AppShell>
      <div className="mx-auto max-w-3xl px-6 py-12 leading-relaxed text-gray-300">
        <div className="rounded-2xl border border-gray-800 bg-gray-900 p-8">
          <h1 className="mb-2 text-3xl font-bold text-white">
            TikTok Terms of Service
          </h1>
          <p className="mb-8 text-sm text-gray-500">
            Last updated: April 30, 2026
          </p>

          <p className="mb-8 text-gray-300">
            khgtech is a CRM and TikTok marketing automation platform designed for
            campaign management, lead synchronization, analytics, and TikTok content
            posting.
          </p>

          <h2 className="mt-8 text-xl font-semibold text-white">1. Introduction</h2>
          <p className="mt-3">
            These Terms of Service (“Terms”) govern your use of the TikTok
            platform and related services. By accessing or using TikTok, you agree
            to these Terms. If you do not agree, please do not use the service.
          </p>

          <h2 className="mt-8 text-xl font-semibold text-white">2. Eligibility</h2>
          <p className="mt-3">
            You must be at least 13 years old (or the legal minimum age in your
            country) to use TikTok. If you are under 18, you must have permission
            from a parent or guardian.
          </p>

          <h2 className="mt-8 text-xl font-semibold text-white">3. User Accounts</h2>
          <p className="mt-3">
            You are responsible for maintaining the confidentiality of your
            account credentials. TikTok may suspend or terminate accounts that
            violate these Terms.
          </p>

          <h2 className="mt-8 text-xl font-semibold text-white">4. Acceptable Use</h2>
          <p className="mt-3">You agree not to:</p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>Post illegal, harmful, or abusive content</li>
            <li>Harass or bully other users</li>
            <li>Upload copyrighted material without permission</li>
            <li>Engage in fraud or misleading activities</li>
          </ul>

          <h2 className="mt-8 text-xl font-semibold text-white">
            5. Content Ownership
          </h2>
          <p className="mt-3">
            You retain ownership of your content. However, by posting, you grant
            TikTok a worldwide, royalty-free license to use, distribute, and
            display your content.
          </p>

          <h2 className="mt-8 text-xl font-semibold text-white">
            6. Content Moderation
          </h2>
          <p className="mt-3">
            TikTok may remove content or restrict access if it violates these
            Terms or applicable laws.
          </p>

          <h2 className="mt-8 text-xl font-semibold text-white">
            7. Data and Privacy
          </h2>
          <p className="mt-3">
            TikTok collects and processes data to operate and improve its
            services. This may include device information, usage data, and
            location data.
          </p>

          <h2 className="mt-8 text-xl font-semibold text-white">8. Advertising</h2>
          <p className="mt-3">
            TikTok may display personalized ads based on your activity and
            interests.
          </p>

          <h2 className="mt-8 text-xl font-semibold text-white">9. Termination</h2>
          <p className="mt-3">
            TikTok may suspend or terminate your account at any time for
            violations or legal reasons.
          </p>

          <h2 className="mt-8 text-xl font-semibold text-white">
            10. Limitation of Liability
          </h2>
          <p className="mt-3">
            The service is provided “as is” without warranties. TikTok is not
            liable for damages resulting from your use of the platform.
          </p>

          <h2 className="mt-8 text-xl font-semibold text-white">
            11. Dispute Resolution
          </h2>
          <p className="mt-3">
            Disputes may be resolved through arbitration or other legal processes
            depending on your region.
          </p>

          <h2 className="mt-8 text-xl font-semibold text-white">
            12. Changes to Terms
          </h2>
          <p className="mt-3">
            TikTok may update these Terms at any time. Continued use means you
            accept the updated Terms.
          </p>

          <h2 className="mt-8 text-xl font-semibold text-white">13. Contact</h2>
          <p className="mt-3">
            For questions regarding these Terms, please contact TikTok through
            official support channels.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
