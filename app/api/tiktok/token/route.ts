import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { code, redirectUri, clientKey } = await request.json();

  const clientSecret = process.env.TIKTOK_CLIENT_SECRET;
  const resolvedKey = clientKey || process.env.NEXT_PUBLIC_TIKTOK_CLIENT_KEY;

  if (!clientSecret || clientSecret === "your_client_secret_here") {
    return NextResponse.json({ error: "TIKTOK_CLIENT_SECRET not configured on server" }, { status: 500 });
  }
  if (!resolvedKey || !code || !redirectUri) {
    return NextResponse.json({ error: "Missing required fields: code, redirectUri, clientKey" }, { status: 400 });
  }

  const body = new URLSearchParams({
    client_key: resolvedKey,
    client_secret: clientSecret,
    code,
    grant_type: "authorization_code",
    redirect_uri: redirectUri,
  });

  const res = await fetch("https://open.tiktokapis.com/v2/oauth/token/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  const data = await res.json();

  const tokenData = data?.data ?? data;
  const accessToken: string | undefined = tokenData?.access_token;
  const refreshToken: string | undefined = tokenData?.refresh_token;
  const openId: string | undefined = tokenData?.open_id;
  const expiresIn: number = tokenData?.expires_in ?? 86400;
  const refreshExpiresIn: number = tokenData?.refresh_expires_in ?? 31536000;

  const response = NextResponse.json(data, { status: res.status });

  const isSecure = process.env.NODE_ENV === "production";
  const cookieBase = { httpOnly: true, secure: isSecure, sameSite: "lax" as const, path: "/" };

  if (accessToken) {
    response.cookies.set("tiktok_access_token", accessToken, { ...cookieBase, maxAge: expiresIn });
  }
  if (refreshToken) {
    response.cookies.set("tiktok_refresh_token", refreshToken, { ...cookieBase, maxAge: refreshExpiresIn });
  }
  if (openId) {
    response.cookies.set("tiktok_open_id", openId, { ...cookieBase, maxAge: refreshExpiresIn });
  }

  return response;
}
