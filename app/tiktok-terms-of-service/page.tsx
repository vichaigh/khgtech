import type { Metadata } from "next";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "TikTok Terms of Service",
};

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f9fafb] text-[#333] leading-relaxed">
      <SiteHeader subtitle="Terms of Service" />
      <div className="mx-auto w-full max-w-[800px] flex-1 bg-white px-5 py-10">
        <h1 className="mb-2.5 text-[#111]">TikTok Terms of Service</h1>
        <p className="mb-8 text-sm text-[#777]">Last updated: April 30, 2026</p>

        <h2 className="text-[#111]">1. Introduction</h2>
        <p className="my-2.5">
          These Terms of Service (“Terms”) govern your use of the TikTok platform
          and related services. By accessing or using TikTok, you agree to these
          Terms. If you do not agree, please do not use the service.
        </p>

        <h2 className="text-[#111]">2. Eligibility</h2>
        <p className="my-2.5">
          You must be at least 13 years old (or the legal minimum age in your
          country) to use TikTok. If you are under 18, you must have permission
          from a parent or guardian.
        </p>

        <h2 className="text-[#111]">3. User Accounts</h2>
        <p className="my-2.5">
          You are responsible for maintaining the confidentiality of your account
          credentials. TikTok may suspend or terminate accounts that violate these
          Terms.
        </p>

        <h2 className="text-[#111]">4. Acceptable Use</h2>
        <p className="my-2.5">You agree not to:</p>
        <ul className="my-2.5 mb-5 ml-5 list-disc">
          <li>Post illegal, harmful, or abusive content</li>
          <li>Harass or bully other users</li>
          <li>Upload copyrighted material without permission</li>
          <li>Engage in fraud or misleading activities</li>
        </ul>

        <h2 className="text-[#111]">5. Content Ownership</h2>
        <p className="my-2.5">
          You retain ownership of your content. However, by posting, you grant
          TikTok a worldwide, royalty-free license to use, distribute, and
          display your content.
        </p>

        <h2 className="text-[#111]">6. Content Moderation</h2>
        <p className="my-2.5">
          TikTok may remove content or restrict access if it violates these Terms
          or applicable laws.
        </p>

        <h2 className="text-[#111]">7. Data and Privacy</h2>
        <p className="my-2.5">
          TikTok collects and processes data to operate and improve its services.
          This may include device information, usage data, and location data.
        </p>

        <h2 className="text-[#111]">8. Advertising</h2>
        <p className="my-2.5">
          TikTok may display personalized ads based on your activity and interests.
        </p>

        <h2 className="text-[#111]">9. Termination</h2>
        <p className="my-2.5">
          TikTok may suspend or terminate your account at any time for violations
          or legal reasons.
        </p>

        <h2 className="text-[#111]">10. Limitation of Liability</h2>
        <p className="my-2.5">
          The service is provided “as is” without warranties. TikTok is not
          liable for damages resulting from your use of the platform.
        </p>

        <h2 className="text-[#111]">11. Dispute Resolution</h2>
        <p className="my-2.5">
          Disputes may be resolved through arbitration or other legal processes
          depending on your region.
        </p>

        <h2 className="text-[#111]">12. Changes to Terms</h2>
        <p className="my-2.5">
          TikTok may update these Terms at any time. Continued use means you accept
          the updated Terms.
        </p>

        <h2 className="text-[#111]">13. Contact</h2>
        <p className="my-2.5">
          For questions regarding these Terms, please contact TikTok through
          official support channels.
        </p>
      </div>
      <SiteFooter />
    </div>
  );
}
