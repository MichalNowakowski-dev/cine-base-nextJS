import { NextRequest, NextResponse } from "next/server";

const BLOCKED_BOTS = [
  "semrushbot",
  "ahrefsbot",
  "amazonbot",
  "mj12bot",
  "oai-searchbot",
  "backlinksextendedbot",
  "bingbot",
  "duckduckbot",
  "yandexbot",
  "baiduspider",
];

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get("user-agent")?.toLowerCase() || "";

  for (const bot of BLOCKED_BOTS) {
    if (userAgent.includes(bot)) {
      return new NextResponse("Bot access denied", { status: 403 });
    }
  }

  return NextResponse.next();
}
