import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const key = searchParams.get("key");

  const resp = await fetch(`https://openlibrary.org/works/OL472549W.json?key=${key}`);
  const data = await resp.json();
  return NextResponse.json(data);
}
