import { NextResponse } from "next/server";

export async function GET() {
  const resp = await fetch("https://openlibrary.org/search.json?subject=mystery&limit=50");
  const data = await resp.json();
  return NextResponse.json(data);
}
