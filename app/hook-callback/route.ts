import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log("TikTok webhook received:", body);

    // TODO: handle event types here
    // Example events:
    // authorization.removed
    // video.upload.failed
    // video.publish.completed

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("TikTok webhook error:", error);

    // Still return 200 if request reached your server,
    // so TikTok does not retry forever during testing.
    return NextResponse.json({ success: true }, { status: 200 });
  }
}

export async function GET() {
  return NextResponse.json({ status: "TikTok webhook endpoint active" }, { status: 200 });
}
