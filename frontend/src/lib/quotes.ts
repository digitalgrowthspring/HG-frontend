import { createHmac, timingSafeEqual } from "crypto";

// A quote is a signed token: base64url(JSON payload) + "." + HMAC-SHA256 signature.
// The server signs it with QUOTE_SECRET (server-only env var) and verifies it at checkout,
// so a customer cannot change the agreed price in the URL.
export interface QuotePayload {
  p: string; // product slug
  d: string; // booking date, YYYY-MM-DD
  h: number; // hire total, ZAR
  l: number; // delivery total, ZAR
  exp: number; // expiry, unix seconds
  n?: string; // customer name the quote was prepared for (optional)
  c?: QuoteContact; // contact and delivery details, prefilled at checkout
  o?: number; // WooCommerce pending order created for this quote, if any
}

export interface QuoteContact {
  e?: string; // email
  ph?: string; // phone
  a?: string; // street address
  s?: string; // suburb / area
  pc?: string; // postal code
  ci?: string; // city
  no?: string; // notes for the booking
}

export const QUOTE_DEFAULT_DAYS = 7;

function getSecret(): string | null {
  const secret = process.env.QUOTE_SECRET;
  return secret && secret.length >= 32 ? secret : null;
}

function sign(body: string, secret: string) {
  return createHmac("sha256", secret).update(body).digest("base64url");
}

export function createQuoteToken(
  fields: Omit<QuotePayload, "exp">,
  days = QUOTE_DEFAULT_DAYS,
  now = Date.now(),
): string | null {
  const secret = getSecret();
  if (!secret) return null;

  const payload: QuotePayload = { ...fields, exp: Math.floor(now / 1000) + days * 86400 };
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${body}.${sign(body, secret)}`;
}

export type QuoteCheck =
  | { ok: true; quote: QuotePayload }
  | { ok: false; reason: string };

export function verifyQuoteToken(token: string, now = Date.now()): QuoteCheck {
  const secret = getSecret();
  if (!secret) return { ok: false, reason: "Quotes are not configured yet." };

  const [body, signature] = token.split(".");
  if (!body || !signature) return { ok: false, reason: "This quote link is not valid." };

  const expected = Buffer.from(sign(body, secret));
  const received = Buffer.from(signature);
  if (expected.length !== received.length || !timingSafeEqual(expected, received)) {
    return { ok: false, reason: "This quote link is not valid." };
  }

  let quote: QuotePayload;
  try {
    quote = JSON.parse(Buffer.from(body, "base64url").toString("utf-8")) as QuotePayload;
  } catch {
    return { ok: false, reason: "This quote link is not valid." };
  }

  if (!quote.p || !quote.d || !Number.isFinite(quote.h) || !Number.isFinite(quote.l)) {
    return { ok: false, reason: "This quote link is not valid." };
  }

  if (Math.floor(now / 1000) >= quote.exp) {
    return { ok: false, reason: "This quote has expired. WhatsApp us and we’ll send a fresh one." };
  }

  return { ok: true, quote };
}
