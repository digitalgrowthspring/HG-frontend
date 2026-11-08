import { NextResponse } from "next/server";
import {
  buildWooOrderPayload,
  calculateOrderTotal,
  type CheckoutFormValues,
  validateCheckoutForm,
} from "@/lib/checkout";
import { getBookedDates, getWooConfig } from "@/lib/bookedDates";
import { discountFor, lookupCoupon } from "@/lib/coupons";
import { getRentalProduct } from "@/app/rentals/products";
import { formatBookingDate, getBookingRange } from "@/lib/booking";
import { buildPayfastPaymentFields, isPayfastConfigured, payfastProcessUrl } from "@/lib/payfast";

export async function POST(request: Request) {
  const values = (await request.json()) as CheckoutFormValues;
  const validation = validateCheckoutForm(values);

  if (!validation.ok) {
    return NextResponse.json(
      {
        ok: false,
        message: "Please fix the highlighted details and try again.",
        fieldErrors: validation.fieldErrors,
      },
      { status: 400 },
    );
  }

  const config = getWooConfig();

  if (!config.apiUrl || !config.consumerKey || !config.consumerSecret) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "WooCommerce checkout is not configured yet. The Next.js booking handoff is ready, but we still need the WooCommerce API credentials and checkout URL.",
      },
      { status: 501 },
    );
  }

  if (!isPayfastConfigured()) {
    return NextResponse.json(
      { ok: false, message: "Payment is not configured yet. No booking has been created." },
      { status: 501 },
    );
  }

  const bookedDates = await getBookedDates(values.product, { fresh: true });

  if (bookedDates.includes(values.date)) {
    const message = "Sorry, that date has just been booked. Please go back and pick another date.";

    return NextResponse.json(
      { ok: false, message, fieldErrors: { date: message } },
      { status: 409 },
    );
  }

  const product = getRentalProduct(values.product);
  const hirePrice = Number(product?.price.replace(/[^\d.]/g, "") ?? 0);
  let couponDiscount = 0;
  let couponCode = "";

  if (values.couponCode?.trim()) {
    const coupon = await lookupCoupon(values.couponCode, hirePrice);

    if (!coupon.ok) {
      return NextResponse.json({ ok: false, message: coupon.message }, { status: 400 });
    }

    couponCode = coupon.code;
    couponDiscount = discountFor(coupon, hirePrice);
  }

  const orderPayload = buildWooOrderPayload(values, couponDiscount, couponCode);
  const authToken = Buffer.from(`${config.consumerKey}:${config.consumerSecret}`).toString("base64");
  let orderResponse: Response;

  try {
    orderResponse = await fetch(config.apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Basic ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderPayload),
      signal: AbortSignal.timeout(20000),
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "Our booking system isn’t responding right now. Please try again in a few minutes, or WhatsApp us to book.",
      },
      { status: 503 },
    );
  }

  if (!orderResponse.ok) {
    const errorText = await orderResponse.text();

    return NextResponse.json(
      {
        ok: false,
        message: "We couldn’t create the WooCommerce order yet.",
        details: errorText,
      },
      { status: 502 },
    );
  }

  const order = (await orderResponse.json()) as { id: number; total: string };
  const fields = buildPayfastPaymentFields({
    orderId: order.id,
    amount: calculateOrderTotal(product?.price ?? "0", values.postalCode, values.city, couponDiscount),
    itemDescription: (() => { const range = getBookingRange(values.date); return range.from === range.to ? `Weekend hire: ${formatBookingDate(range.from)}` : `Weekend hire: ${formatBookingDate(range.from)} to ${formatBookingDate(range.to)}`; })(),
    itemName: (() => { const range = getBookingRange(values.date); const shortDate = (iso: string) => new Date(`${iso}T00:00:00`).toLocaleDateString("en-ZA", { day: "numeric", month: "short" }); const dates = range.from === range.to ? shortDate(range.from) : `${shortDate(range.from)}-${shortDate(range.to)} ${new Date(`${range.to}T00:00:00`).getFullYear()}`; const product = getRentalProduct(values.product); return `${product?.name ?? "Inflatable hire"} ${(product?.size ?? "").replace("×", "x")} (${dates})`.trim(); })(),
    name: values.fullName,
    email: values.email,
    phone: values.phone,
  });

  return NextResponse.json({
    ok: true,
    message: "Redirecting you to PayFast...",
    bookingReference: `HG-${order.id}`,
    payfast: { action: payfastProcessUrl(), fields },
  });
}
