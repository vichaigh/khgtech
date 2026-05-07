import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const accessToken = request.cookies.get("tiktok_access_token")?.value;

  if (!accessToken) {
    return NextResponse.json({ error: "Not connected to TikTok. Please authorize first." }, { status: 401 });
  }

  const { publish_id } = await request.json();

  if (!publish_id) {
    return NextResponse.json({ error: "Missing publish_id" }, { status: 400 });
  }

  const res = await fetch("https://open.tiktokapis.com/v2/post/publish/status/fetch/", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({ publish_id }),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
