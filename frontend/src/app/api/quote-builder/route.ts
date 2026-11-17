import { NextResponse } from "next/server";
import { getRentalProduct } from "@/app/rentals/products";
import { getBookedDates } from "@/lib/bookedDates";
import { isDateAvailable } from "@/lib/booking";
import { getDeliveryQuote } from "@/lib/checkout";
import { createQuoteToken, QUOTE_DEFAULT_DAYS } from "@/lib/quotes";
import { newQuoteReference, saveQuote } from "@/lib/quoteStore";
import { SITE_URL } from "@/lib/seo";
import { createQuoteOrder, quoteHoldUntil, wooQuoteOrdersEnabled } from "@/lib/wooQuote";

// Signs quotes, so it must never be reachable on the live site.
// Only works under `next dev` on your own machine.
export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ ok: false, message: "Not available." }, { status: 404 });
  }

  const body = (await request.json()) as {
    product?: string;
    date?: string;
    days?: string | number;
    city?: string;
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    suburb?: string;
    postalCode?: string;
    notes?: string;
  };

  const product = getRentalProduct(body.product ?? "");
  if (!product) {
    return NextResponse.json({ ok: false, message: "Pick an inflatable." }, { status: 400 });
  }

  const date = body.date ?? "";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ ok: false, message: "Date must be YYYY-MM-DD." }, { status: 400 });
  }

  // Same availability check the checkout uses: the date must be open and not already paid for.
  const bookedDates = await getBookedDates(product.slug, { fresh: true });
  if (bookedDates.includes(date) || !isDateAvailable(product.slug, date)) {
    return NextResponse.json(
      { ok: false, message: `${date} is not available for ${product.name}. Pick another weekend.` },
      { status: 409 },
    );
  }

  // Hire price comes from the product's list price, the same figure checkout uses.
  const hire = Number(product.price.replace(/[^\d.]/g, ""));
  const days = Number(body.days ?? QUOTE_DEFAULT_DAYS);

  if (!Number.isFinite(hire) || hire <= 0) {
    return NextResponse.json({ ok: false, message: "This inflatable has no price set." }, { status: 400 });
  }

  // Delivery is worked out from the address with the same rule as checkout:
  // Fourways (2191) free, rest of Johannesburg R120, anywhere else not served.
  const city = body.city?.trim() || "Johannesburg";
  const postal = body.postalCode?.trim() ?? "";
  if (!body.address?.trim()) {
    return NextResponse.json({ ok: false, message: "Enter the delivery street address." }, { status: 400 });
  }
  if (!/^\d{4}$/.test(postal)) {
    return NextResponse.json({ ok: false, message: "Enter a 4-digit postal code." }, { status: 400 });
  }
  const deliveryQuote = getDeliveryQuote(postal, city);
  if (!deliveryQuote.supported) {
    return NextResponse.json({ ok: false, message: deliveryQuote.message ?? "Area not serviced." }, { status: 400 });
  }
  const delivery = Number(deliveryQuote.deliveryTotal);
  if (!Number.isFinite(days) || days <= 0 || days > 60) {
    return NextResponse.json({ ok: false, message: "Validity must be 1 to 60 days." }, { status: 400 });
  }

  const name = body.name?.trim().slice(0, 80) || undefined;
  const email = body.email?.trim().slice(0, 120);
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, message: "That email address doesn’t look right." }, { status: 400 });
  }
  const contact = {
    e: email || undefined,
    ph: body.phone?.trim().slice(0, 30) || undefined,
    a: body.address?.trim().slice(0, 120) || undefined,
    s: body.suburb?.trim().slice(0, 80) || undefined,
    ci: city.slice(0, 60),
    pc: postal,
    no: body.notes?.trim().slice(0, 300) || undefined,
  };
  const hasContact = Object.values(contact).some(Boolean);

  // Quote reference: the saved-quote id. The WooCommerce order is created first when enabled.
  const quoteId = newQuoteReference();
  const holdUntil = quoteHoldUntil();
  let orderId: number | undefined;

  if (wooQuoteOrdersEnabled()) {
    const order = await createQuoteOrder({
      quoteId,
      hire,
      delivery,
      holdUntil,
      values: {
        product: product.slug,
        date,
        area: contact.s ?? "Fourways",
        notes: contact.no ?? "",
        fullName: name ?? "Customer",
        phone: contact.ph ?? "",
        email: contact.e ?? "",
        addressLine1: contact.a ?? "",
        suburb: contact.s ?? "",
        city: contact.ci,
        postalCode: postal,
      },
    });

    if ("error" in order) {
      return NextResponse.json({ ok: false, message: order.error }, { status: 502 });
    }

    orderId = order.id;
  }

  const token = createQuoteToken(
    { p: product.slug, d: date, h: hire, l: delivery, n: name, c: hasContact ? contact : undefined, o: orderId },
    days,
  );

  if (!token) {
    return NextResponse.json(
      { ok: false, message: "QUOTE_SECRET is not set in frontend/.env.local." },
      { status: 500 },
    );
  }

  const saved = await saveQuote({
    id: quoteId,
    token,
    customer: name ?? "",
    productName: product.name,
    date,
    orderId,
    holdUntil: orderId ? holdUntil : undefined,
  });

  return NextResponse.json({
    ok: true,
    id: saved.id,
    quotePath: `/q/${saved.id}`,
    // The link to send: the live quote page, which carries its own signed prices.
    liveQuoteUrl: `${SITE_URL}/quote/print?quote=${token}`,
    checkoutPath: `/checkout?quote=${token}`,
    orderId: orderId ?? null,
    holdUntil: orderId ? holdUntil : null,
  });
}
