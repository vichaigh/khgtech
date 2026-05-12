import AppShell from "../components/AppShell";

export default function PrivacyPolicyPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-3xl px-6 py-12 leading-relaxed text-gray-300">
        <div className="rounded-2xl border border-gray-800 bg-gray-900 p-8">
          <h1 className="mb-2 text-3xl font-bold text-white">
          khgtech Privacy Policy
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
            This Privacy Policy explains how we collect, use, and protect your
            information when you use our website or services. By using our
            services, you agree to the collection and use of information in
            accordance with this policy.
          </p>

          <h2 className="mt-8 text-xl font-semibold text-white">
            2. Information We Collect
          </h2>
          <p className="mt-3">We may collect the following types of information:</p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>Personal information (such as name, email address)</li>
            <li>Usage data (pages visited, time spent, interactions)</li>
            <li>
              Device information (browser type, IP address, operating system)
            </li>
          </ul>

          <h2 className="mt-8 text-xl font-semibold text-white">
            3. How We Use Your Information
          </h2>
          <p className="mt-3">We use your information to:</p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>Provide and maintain our services</li>
            <li>Improve user experience</li>
            <li>Communicate with you</li>
            <li>Ensure security and prevent fraud</li>
          </ul>

          <h2 className="mt-8 text-xl font-semibold text-white">
            4. Cookies and Tracking
          </h2>
          <p className="mt-3">
            We may use cookies and similar tracking technologies to monitor
            activity and store certain information. You can instruct your browser
            to refuse cookies if you prefer.
          </p>

          <h2 className="mt-8 text-xl font-semibold text-white">
            5. Sharing of Information
          </h2>
          <p className="mt-3">
            We do not sell your personal information. We may share data with:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>Service providers (hosting, analytics)</li>
            <li>Legal authorities when required by law</li>
          </ul>

          <h2 className="mt-8 text-xl font-semibold text-white">6. Data Security</h2>
          <p className="mt-3">
            We take reasonable measures to protect your information, but no method
            of transmission over the internet is 100% secure.
          </p>

          <h2 className="mt-8 text-xl font-semibold text-white">7. Your Rights</h2>
          <p className="mt-3">You may have the right to:</p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>Access your personal data</li>
            <li>Request correction or deletion</li>
            <li>Withdraw consent where applicable</li>
          </ul>

          <h2 className="mt-8 text-xl font-semibold text-white">
            8. Third-Party Links
          </h2>
          <p className="mt-3">
            Our website may contain links to third-party sites. We are not
            responsible for their privacy practices.
          </p>

          <h2 className="mt-8 text-xl font-semibold text-white">
            9. Changes to This Policy
          </h2>
          <p className="mt-3">
            We may update this Privacy Policy from time to time. Changes will be
            posted on this page.
          </p>

          <h2 className="mt-8 text-xl font-semibold text-white">10. Contact Us</h2>
          <p className="mt-3">
            If you have any questions about this Privacy Policy, please contact us
            at:
            <br />
            <strong className="text-white">vichaikhg@gmail.com</strong>
          </p>
        </div>
      </div>
    </AppShell>
  );
}
