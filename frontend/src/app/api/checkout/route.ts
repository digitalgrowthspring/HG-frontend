import { NextResponse } from "next/server";
import {
  buildWooOrderPayload,
  type CheckoutFormValues,
  validateCheckoutForm,
} from "@/lib/checkout";

function getWooConfig() {
  return {
    apiUrl: process.env.WOOCOMMERCE_API_URL || "",
    consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY || "",
    consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET || "",
    checkoutBaseUrl: process.env.WOOCOMMERCE_CHECKOUT_URL || "",
  };
}

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

  const orderPayload = buildWooOrderPayload(values);
  const authToken = Buffer.from(`${config.consumerKey}:${config.consumerSecret}`).toString("base64");
  const orderResponse = await fetch(config.apiUrl, {
    method: "POST",
    headers: {
      Authorization: `Basic ${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderPayload),
  });

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

  const order = (await orderResponse.json()) as { id: number; checkout_payment_url?: string; order_key?: string };
  const fallbackCheckoutUrl =
    config.checkoutBaseUrl && order.id && order.order_key
      ? `${config.checkoutBaseUrl}?pay_for_order=true&key=${order.order_key}&order_id=${order.id}`
      : "";

  return NextResponse.json({
    ok: true,
    message: "Order created. Redirecting you into payment...",
    bookingReference: `HG-${order.id}`,
    checkoutUrl: order.checkout_payment_url || fallbackCheckoutUrl || "",
  });
}
