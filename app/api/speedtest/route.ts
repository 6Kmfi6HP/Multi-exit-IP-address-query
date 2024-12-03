import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://speedtest-api.pages.dev/speedtest');
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch speedtest data' }, { status: 500 });
  }
}