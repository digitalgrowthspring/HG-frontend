import { createHash } from "crypto";

// Server-only PayFast helpers. Settings come from environment variables; nothing is hardcoded.

export type PayfastField = [string, string];

export function getPayfastConfig() {
  return {
    merchantId: process.env.PAYFAST_MERCHANT_ID || "",
    merchantKey: process.env.PAYFAST_MERCHANT_KEY || "",
    passphrase: process.env.PAYFAST_PASSPHRASE || "",
    sandbox: process.env.PAYFAST_SANDBOX === "true",
  };
}

export function isPayfastConfigured() {
  const config = getPayfastConfig();
  return Boolean(config.merchantId && config.merchantKey);
}

export function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || "https://heavenlygiggles.com").replace(/\/$/, "");
}

export function payfastProcessUrl() {
  return getPayfastConfig().sandbox
    ? "https://sandbox.payfast.co.za/eng/process"
    : "https://www.payfast.co.za/eng/process";
}

export function payfastValidateUrl() {
  return getPayfastConfig().sandbox
    ? "https://sandbox.payfast.co.za/eng/query/validate"
    : "https://www.payfast.co.za/eng/query/validate";
}

function encodeFields(fields: PayfastField[]) {
  return fields
    .map(([key, value]) => `${key}=${phpEncode(value)}`)
    .join("&");
}

function phpEncode(value: string) {
  return encodeURIComponent(value)
    .replace(/[!'()*~]/g, (c) => "%" + c.charCodeAt(0).toString(16).toUpperCase())
    .replace(/%20/g, "+");
}

// PayFast signature: MD5 of the fields in the order they are sent (empty values left out),
// with the passphrase appended when one is set.
export function payfastSignature(fields: PayfastField[], passphrase: string) {
  const filled = fields.filter(([, value]) => value !== "");
  let text = encodeFields(filled);

  if (passphrase) {
    text += `&passphrase=${phpEncode(passphrase)}`;
  }

  return createHash("md5").update(text).digest("hex");
}

export function buildPayfastPaymentFields(input: {
  orderId: number;
  amount: string;
  itemName: string;
  itemDescription?: string;
  name: string;
  email: string;
  phone: string;
}): PayfastField[] {
  const config = getPayfastConfig();
  const siteUrl = getSiteUrl();
  const [firstName, ...rest] = input.name.trim().split(/\s+/);

  const fields: PayfastField[] = [
    ["merchant_id", config.merchantId],
    ["merchant_key", config.merchantKey],
    ["return_url", `${siteUrl}/checkout/return?order=${input.orderId}`],
    ["cancel_url", `${siteUrl}/checkout/cancel?order=${input.orderId}`],
    ["notify_url", `${siteUrl}/api/payfast/notify`],
    ["name_first", firstName || ""],
    ["name_last", rest.join(" ")],
    ["email_address", input.email],
    ["cell_number", input.phone],
    ["m_payment_id", String(input.orderId)],
    ["amount", Number(input.amount).toFixed(2)],
    ["item_name", input.itemName.slice(0, 100)],
    ["item_description", (input.itemDescription || "").slice(0, 255)],
  ];

  const signature = payfastSignature(fields, config.passphrase);
  fields.push(["signature", signature]);

  return fields;
}

// Confirms a notification really came from PayFast for our merchant account.
export function verifyPayfastSignature(received: PayfastField[]) {
  const config = getPayfastConfig();
  const signatureField = received.find(([key]) => key === "signature");
  const unsigned = received.filter(([key]) => key !== "signature");

  if (!signatureField) {
    return false;
  }

  return payfastSignature(unsigned, config.passphrase) === signatureField[1];
}

export function verifyPayfastItnSignature(received: PayfastField[]) {
  const config = getPayfastConfig();
  const signatureField = received.find(([key]) => key === "signature");

  if (!signatureField) {
    return false;
  }

  let text = received
    .filter(([key]) => key !== "signature")
    .map(([key, value]) => `${key}=${phpEncode(value)}`)
    .join("&");

  if (config.passphrase) {
    text += `&passphrase=${phpEncode(config.passphrase)}`;
  }

  return createHash("md5").update(text).digest("hex") === signatureField[1];
}

export async function payfastServerValidate(received: PayfastField[]) {
  const unsigned = received.filter(([key]) => key !== "signature");
  const response = await fetch(payfastValidateUrl(), {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: encodeFields(unsigned),
    cache: "no-store",
  });

  return (await response.text()).trim() === "VALID";
}
