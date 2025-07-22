import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const page = searchParams.get("page") ?? 1;
  const limit = searchParams.get("limit") ?? 50;
  const category = searchParams.get("category") ?? "";

  if (category) {
    const resp = await fetch(
      `https://openlibrary.org/search.json?subject=${category}&limit=${limit}&offset=${
        (Number(page) - 1) * Number(limit)
      }&q=${searchParams.get("q")}`
    );
    const data = await resp.json();
    return NextResponse.json(data);
  }
  const resp = await fetch(
    `https://openlibrary.org/search.json?limit=${limit}&offset=${
      (Number(page) - 1) * Number(limit)
    }&q=${searchParams.get("q")}`
  );

  const data = await resp.json();

  return NextResponse.json(data);
}
