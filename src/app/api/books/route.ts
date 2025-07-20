import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const page = searchParams.get("page") ?? 1;
  const limit = searchParams.get("limit") ?? 50;

  console.log(`Fetching books for page ${page} with limit ${limit}`);

  const resp = await fetch(
    `https://openlibrary.org/search.json?subject=mystery&limit=${limit}&offset=${(Number(page) - 1) * Number(limit)}`
  );
  const data = await resp.json();
  return NextResponse.json(data);
}
