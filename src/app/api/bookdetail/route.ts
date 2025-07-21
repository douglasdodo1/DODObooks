import { EditionDTO } from "@/dtos/edition-dto";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");

  const resp = await fetch(`https://openlibrary.org/works/OL472549W.json?key=${key}`);
  const editionsRes = await fetch(`https://openlibrary.org/${key}/editions.json?limit=10`);
  const data: EditionDTO = await resp.json();

  const editionsData = await editionsRes.json();
  const editions: EditionDTO[] = Array.isArray(editionsData.entries) ? editionsData.entries : [];

  const pagesArr = editions
    .map((e: EditionDTO) => e.number_of_pages)
    .filter((n: number | undefined) => typeof n === "number");

  const avg =
    pagesArr.length > 0 ? Math.round(pagesArr.reduce((sum: number, n) => sum + n, 0) / pagesArr.length) : undefined;

  const publishers = editions[0].publishers;

  const response: EditionDTO = {
    ...data,
    publishers: publishers,
    avg_number_of_pages: avg,
  };

  return NextResponse.json(response);
}
