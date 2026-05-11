"use client";

import { useEffect, useState } from "react";
import AppShell from "../components/AppShell";

const SCOPES = [
  { value: "user.info.basic", label: "User Info (Basic)", required: true },
  { value: "video.publish", label: "Publish Videos", required: false },
  { value: "video.upload", label: "Upload Videos", required: false },
];

export default function TikTokConnectPage() {
  const [redirectUri, setRedirectUri] = useState("");
  const [selectedScopes, setSelectedScopes] = useState<string[]>([
    "user.info.basic",
    "video.publish",
    "video.upload",
  ]);
  const clientKey = process.env.NEXT_PUBLIC_TIKTOK_CLIENT_KEY ?? "";

  useEffect(() => {
    setRedirectUri(`https://khgtech.vip/tiktok-callback`);
  }, []);

  const toggleScope = (value: string, required: boolean) => {
    if (required) return;
    setSelectedScopes((prev) =>
      prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value]
    );
  };

  const handleConnect = () => {
    if (!clientKey || clientKey === "your_client_key_here") {
      alert(
        "Please set NEXT_PUBLIC_TIKTOK_CLIENT_KEY in your .env.local file first."
      );
      return;
    }
    const state = Math.random().toString(36).slice(2);
    sessionStorage.setItem("tiktok_oauth_state", state);
    const params = new URLSearchParams({
      client_key: clientKey,
      response_type: "code",
      scope: selectedScopes.join(","),
      redirect_uri: redirectUri,
      state,
    });

    console.log("params ==", params);
    window.location.href = `https://www.tiktok.com/v2/auth/authorize/?${params.toString()}`;
  };

  const missingKey = !clientKey || clientKey === "your_client_key_here";

  return (
    <AppShell>
      <div className="mx-auto max-w-lg px-6 py-12">
        <div className="rounded-2xl border border-gray-800 bg-gray-900 p-8 text-gray-300">
          <div className="mb-6 text-center">
            <div className="text-5xl leading-none">🎵</div>
            <h1 className="mt-3 text-2xl font-bold text-white">
              Connect to TikTok
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Authorize crmapp to publish content on your behalf.
            </p>
          </div>

          {missingKey && (
            <div className="mb-6 rounded-lg border border-amber-700/50 bg-amber-950/40 px-4 py-3 text-sm text-amber-200">
              <strong className="text-amber-100">Setup required:</strong> Set{" "}
              <code className="rounded bg-black/30 px-1 text-amber-100">
                NEXT_PUBLIC_TIKTOK_CLIENT_KEY
              </code>{" "}
              in <code className="rounded bg-black/30 px-1">.env.local</code> and
              restart the server.
            </div>
          )}

          <div className="mb-5">
            <div className="mb-3 text-sm font-semibold text-white">
              Permissions requested:
            </div>
            {SCOPES.map((scope) => (
              <label
                key={scope.value}
                className={`mb-3 flex cursor-pointer items-center gap-3 text-sm ${scope.required ? "cursor-default opacity-90" : ""}`}
              >
                <input
                  type="checkbox"
                  checked={selectedScopes.includes(scope.value)}
                  onChange={() => toggleScope(scope.value, scope.required)}
                  disabled={scope.required}
                  className="h-4 w-4 rounded border-gray-600 bg-gray-950 text-white focus:ring-gray-500"
                />
                <span>
                  {scope.label}
                  {scope.required && (
                    <span className="ml-2 text-xs text-gray-500">(required)</span>
                  )}
                </span>
              </label>
            ))}
          </div>

          <button
            type="button"
            onClick={handleConnect}
            disabled={missingKey}
            className="w-full rounded-lg bg-white py-3 text-base font-bold text-black disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          >
            Connect with TikTok
          </button>

          <p className="mt-4 text-center text-xs text-gray-500">
            You will be redirected to TikTok to approve permissions. We never post
            without your action.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
