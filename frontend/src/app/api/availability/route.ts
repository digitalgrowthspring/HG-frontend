import { NextResponse } from "next/server";
import { getRentalProduct } from "@/app/rentals/products";
import { getBookedDates } from "@/lib/bookedDates";

export async function GET(request: Request) {
  const slug = new URL(request.url).searchParams.get("product") ?? "";

  if (!getRentalProduct(slug)) {
    return NextResponse.json({ bookedDates: [] }, { status: 404 });
  }

  return NextResponse.json({ bookedDates: await getBookedDates(slug) });
}
