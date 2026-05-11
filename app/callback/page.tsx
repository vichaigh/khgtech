"use client";

import { useEffect, useState } from "react";
import AppShell from "../components/AppShell";

export default function TikTokCallbackPage() {
  const [code, setCode] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [redirectUri, setRedirectUri] = useState("");
  const [tokenResult, setTokenResult] = useState<string | null>(null);
  const [tokenError, setTokenError] = useState<string | null>(null);
  const [tokenLoading, setTokenLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setCode(params.get("code"));
    setRedirectUri(`${window.location.origin}/tiktok-callback`);
    setMounted(true);
  }, []);

  const handleCopy = () => {
    if (code) navigator.clipboard.writeText(code);
  };

  const handleExchangeToken = async () => {
    if (!code) return;
    setTokenResult(null);
    setTokenError(null);
    setTokenLoading(true);
    try {
      const res = await fetch("/api/tiktok/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, redirectUri }),
      });
      const data = await res.json();
      setTokenResult(JSON.stringify(data, null, 2));
    } catch (err: unknown) {
      setTokenError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setTokenLoading(false);
    }
  };

  const handleCopyToken = () => {
    if (!tokenResult) return;
    try {
      const parsed = JSON.parse(tokenResult);
      const token = parsed?.data?.access_token ?? parsed?.access_token;
      if (token) navigator.clipboard.writeText(token);
    } catch {
      navigator.clipboard.writeText(tokenResult);
    }
  };

  const inputClass =
    "w-full rounded-md border border-gray-700 bg-gray-950 px-3 py-2 text-xs text-white focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500";

  return (
    <AppShell>
      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-gray-900 p-8 text-center text-gray-300">
          <h1 className="mb-4 text-2xl font-bold tracking-wide text-white">
            TikTok Callback
          </h1>

          {mounted && code && (
            <div className="mb-4 flex justify-center gap-1.5">
              {[...Array(3)].map((_, i) => (
                <span
                  key={i}
                  className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white"
                >
                  ✓
                </span>
              ))}
            </div>
          )}

          <div className="mb-6 text-left text-sm">
            {mounted &&
              (code ? (
                <div>
                  <div className="mb-2 text-gray-400">
                    Received code from TikTok:
                  </div>
                  <div className="mb-3 flex items-center gap-2 rounded-md bg-black/40 p-2">
                    <span className="flex-1 break-all font-mono text-xs text-gray-300">
                      {code}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopy}
                      title="Copy code to clipboard"
                      className="shrink-0 rounded border border-gray-600 bg-gray-800 px-2 py-1 text-xs text-white hover:bg-gray-700"
                    >
                      Copy
                    </button>
                  </div>

                  <div className="mt-5 border-t border-gray-800 pt-5">
                    <div className="mb-2 font-semibold text-white">
                      Exchange for Access Token
                    </div>
                    <div className="mb-2 text-xs text-gray-500">
                      Redirect URI used during auth:
                    </div>
                    <input
                      type="text"
                      value={redirectUri}
                      onChange={(e) => setRedirectUri(e.target.value)}
                      className={`${inputClass} mb-3`}
                    />
                    <button
                      type="button"
                      onClick={handleExchangeToken}
                      disabled={tokenLoading}
                      className="w-full rounded-lg bg-white py-2.5 text-sm font-semibold text-black disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {tokenLoading ? "Exchanging..." : "Get Access Token"}
                    </button>
                  </div>

                  {tokenResult && (
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-sm font-semibold text-green-400">
                        Token exchange successful
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyToken}
                        className="rounded border border-gray-600 bg-gray-800 px-2 py-0.5 text-xs text-white hover:bg-gray-700"
                      >
                        Copy Token
                      </button>
                    </div>
                  )}
                  {tokenError && (
                    <div className="mt-3 text-sm text-red-400">
                      Error: {tokenError}
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-400">
                  No code parameter found in TikTok callback.
                </p>
              ))}
          </div>

          <p className="text-sm text-gray-500">
            If you are not redirected automatically, please close this window.
          </p>
          <a
            href="/"
            className="mt-6 inline-block rounded-lg bg-gray-800 px-6 py-2.5 text-sm font-medium text-white hover:bg-gray-700"
          >
            Back Home
          </a>
        </div>
      </div>
    </AppShell>
  );
}
