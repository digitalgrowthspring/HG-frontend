import { NextResponse } from "next/server";
import { getWooConfig } from "@/lib/bookedDates";
import { getPayfastConfig, payfastServerValidate, verifyPayfastItnSignature, type PayfastField } from "@/lib/payfast";

// PayFast's instant notification. Only this route marks an order as paid.
export async function POST(request: Request) {
  const form = await request.formData();
  const received: PayfastField[] = [];
  form.forEach((value, key) => received.push([key, String(value)]));

  const fields = Object.fromEntries(received);
  console.error(`[payfast-notify] received fields=${Object.keys(fields).join(",")}`);
  const config = getPayfastConfig();
  const woo = getWooConfig();

  if (!verifyPayfastItnSignature(received)) {
    console.error("[payfast-notify] reason=invalid_signature");
    return new NextResponse("Invalid signature", { status: 400 });
  }

  if (fields.merchant_id !== config.merchantId) {
    console.error(`[payfast-notify] reason=wrong_merchant received=${fields.merchant_id}`);
    return new NextResponse("Wrong merchant", { status: 400 });
  }

  if (fields.payment_status !== "COMPLETE") {
    return new NextResponse("Not complete", { status: 200 });
  }

  if (!(await payfastServerValidate(received))) {
    console.error("[payfast-notify] reason=validation_failed");
    return new NextResponse("PayFast validation failed", { status: 400 });
  }

  const orderId = Number(fields.m_payment_id);
  const auth = Buffer.from(`${woo.consumerKey}:${woo.consumerSecret}`).toString("base64");
  const orderUrl = `${woo.apiUrl.replace(/\/$/, "")}/${orderId}`;

  const orderResponse = await fetch(orderUrl, {
    headers: { Authorization: `Basic ${auth}` },
    cache: "no-store",
  });

  if (!orderResponse.ok) {
    return new NextResponse("Order lookup failed", { status: 500 });
  }

  const order = (await orderResponse.json()) as { id: number; total: string; status: string };

  if (order.status === "processing" || order.status === "completed") {
    return new NextResponse("Already processed", { status: 200 });
  }

  if (Number(order.total).toFixed(2) !== Number(fields.amount_gross).toFixed(2)) {
    console.error(`[payfast-notify] reason=amount_mismatch order_total=${order.total} amount_gross=${fields.amount_gross}`);
    return new NextResponse("Amount mismatch", { status: 400 });
  }

  const updateResponse = await fetch(orderUrl, {
    method: "PUT",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      set_paid: true,
      status: "processing",
      transaction_id: fields.pf_payment_id,
    }),
  });

  if (!updateResponse.ok) {
    return new NextResponse("Order update failed", { status: 500 });
  }

  return new NextResponse("OK", { status: 200 });
}
