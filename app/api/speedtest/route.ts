import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  try {
    // 绑定 fetch 到 globalThis
    const boundFetch = fetch.bind(globalThis);
    const response = await boundFetch(
      "https://speedtest-api.pages.dev/speedtest"
    );
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Speedtest API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch speedtest data" },
      { status: 500 }
    );
  }
}
