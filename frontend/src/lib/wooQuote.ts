import { buildWooOrderPayload, type CheckoutFormValues } from "@/lib/checkout";
import { getWooConfig } from "@/lib/bookedDates";

// A quote holds its date for this long unless it is paid first.
export const QUOTE_HOLD_HOURS = 48;

// Quote orders are created only when this is switched on. Off locally, so nothing
// reaches the live WooCommerce store until it is deliberately enabled.
export function wooQuoteOrdersEnabled() {
  return process.env.WOO_QUOTE_ORDERS === "on";
}

export function quoteHoldUntil(now = Date.now()) {
  return new Date(now + QUOTE_HOLD_HOURS * 60 * 60 * 1000).toISOString();
}

interface QuoteOrderInput {
  quoteId: string;
  values: CheckoutFormValues;
  hire: number;
  delivery: number;
  holdUntil: string;
}

function quoteMeta(quoteId: string, holdUntil: string) {
  return [
    { key: "_hg_quote_id", value: quoteId },
    { key: "_hg_quote_hold_until", value: holdUntil },
  ];
}

// Creates a pending WooCommerce order that holds the date until holdUntil.
export async function createQuoteOrder(input: QuoteOrderInput): Promise<{ id: number } | { error: string }> {
  const config = getWooConfig();
  if (!config.apiUrl || !config.consumerKey || !config.consumerSecret) {
    return { error: "WooCommerce is not configured." };
  }

  const payload = buildWooOrderPayload(input.values, 0, "", { hire: input.hire, delivery: input.delivery });
  payload.meta_data.push(...quoteMeta(input.quoteId, input.holdUntil));
  const authToken = Buffer.from(`${config.consumerKey}:${config.consumerSecret}`).toString("base64");

  try {
    const response = await fetch(config.apiUrl, {
      method: "POST",
      headers: { Authorization: `Basic ${authToken}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(20000),
    });

    if (!response.ok) {
      return { error: `WooCommerce refused the quote order (status ${response.status}).` };
    }

    const order = (await response.json()) as { id: number };
    return { id: order.id };
  } catch {
    return { error: "WooCommerce did not respond. The quote was not saved." };
  }
}
