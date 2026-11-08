import { NextResponse } from "next/server";
import { getRentalProduct } from "@/app/rentals/products";
import { discountFor, lookupCoupon } from "@/lib/coupons";

function hirePrice(product: { price: string }) {
  const amount = Number(product.price.replace(/[^\d.]/g, ""));
  return Number.isFinite(amount) ? amount : 0;
}

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const code = params.get("code") ?? "";
  const productSlug = params.get("product") ?? "";
  const product = getRentalProduct(productSlug);

  if (!code.trim()) {
    return NextResponse.json({ ok: false, message: "Please enter a voucher code." }, { status: 400 });
  }

  if (!product) {
    return NextResponse.json({ ok: false, message: "We couldn’t find that inflatable." }, { status: 404 });
  }

  const amount = hirePrice(product);
  const coupon = await lookupCoupon(code, amount);

  if (!coupon.ok) {
    return NextResponse.json(coupon, { status: 400 });
  }

  return NextResponse.json({ ...coupon, discount: discountFor(coupon, amount) });
}
