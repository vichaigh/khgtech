import type { ReactNode } from "react";

type AppShellProps = {
  children: ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  return (
    <main className="flex min-h-screen flex-col bg-black text-white">
      <header className="border-b border-gray-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <img
              src="/crmapp-logo.png"
              alt="crmapp logo"
              className="h-20 w-auto"
            />
      
            <p className="text-sm text-gray-400">
              TikTok Marketing & CRM Platform
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-3">
            <a
              href="/"
              className="rounded-md bg-gray-800 px-4 py-2 text-sm font-medium hover:bg-gray-700"
            >
              Home
            </a>

            <a
              href="/tiktok-connect"
              style={{
                color: "#000",
                textDecoration: "none",
                background: "#fff",
                padding: "5px 16px",
                borderRadius: 5,
                fontSize: 14,
                fontWeight: 700,
              }}
              className="rounded-md font-semibold hover:bg-gray-200"
            >
              🎵 Connect TikTok
            </a>
            <a
              href="/tiktok-upload/video"
              style={{
                color: "#fff",
                textDecoration: "none",
                background: "#e02d2d",
                padding: "5px 16px",
                borderRadius: 5,
                fontSize: 14,
              }}
              className="rounded-md font-semibold hover:bg-red-600"
            >
              Upload Video
            </a>
            <a
              href="/tiktok-upload/photo"
              style={{
                color: "#fff",
                textDecoration: "none",
                background: "#1d6fa5",
                padding: "5px 16px",
                borderRadius: 5,
                fontSize: 14,
              }}
              className="rounded-md font-semibold hover:bg-blue-600"
            >
              Upload Photo
            </a>
            <a
              href="/tiktok-upload/status"
              style={{
                color: "#fff",
                textDecoration: "none",
                background: "#5a3ea1",
                padding: "5px 16px",
                borderRadius: 5,
                fontSize: 14,
              }}
              className="rounded-md font-semibold hover:bg-purple-600"
            >
              Post Status
            </a>
          </nav>
        </div>
      </header>

      <div className="flex-1">{children}</div>

      <footer className="border-t border-gray-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">
          <div>© 2026 crmapp. All rights reserved.</div>

          <div className="flex gap-6">
            <a href="/privacy-policy" className="hover:text-gray-300">
              Privacy Policy
            </a>

            <a href="/terms-of-service" className="hover:text-gray-300">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
