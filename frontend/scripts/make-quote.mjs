#!/usr/bin/env node
// Creates a signed quote link for a customer.
//
// Usage:
//   QUOTE_SECRET=... node scripts/make-quote.mjs \
//     --product inflatable-water-slide-7m-x-1m --date 2026-11-21 \
//     --hire 1200 --delivery 0 --days 7 --base https://heavenlygiggles.com
//
// QUOTE_SECRET must be the same value the site uses (set in .env.local locally,
// or in Vercel for production). The script never prints the secret.

import { createHmac } from "node:crypto";

const args = Object.fromEntries(
  process.argv.slice(2).reduce((pairs, arg, index, all) => {
    if (arg.startsWith("--")) pairs.push([arg.slice(2), all[index + 1]]);
    return pairs;
  }, []),
);

const secret = process.env.QUOTE_SECRET;
if (!secret || secret.length < 32) {
  console.error("QUOTE_SECRET is missing or shorter than 32 characters.");
  process.exit(1);
}

const required = ["product", "date", "hire"];
const missing = required.filter((key) => !args[key]);
if (missing.length) {
  console.error(`Missing: ${missing.map((key) => `--${key}`).join(", ")}`);
  process.exit(1);
}

const hire = Number(args.hire);
const delivery = Number(args.delivery ?? 0);
const days = Number(args.days ?? 7);
const base = args.base ?? "https://heavenlygiggles.com";

if (!/^\d{4}-\d{2}-\d{2}$/.test(args.date)) {
  console.error("--date must be YYYY-MM-DD");
  process.exit(1);
}
if (!Number.isFinite(hire) || !Number.isFinite(delivery) || !Number.isFinite(days) || days <= 0) {
  console.error("--hire, --delivery and --days must be numbers (days > 0)");
  process.exit(1);
}

const name = args.name?.trim().slice(0, 80);

const payload = {
  p: args.product,
  d: args.date,
  h: hire,
  l: delivery,
  exp: Math.floor(Date.now() / 1000) + days * 86400,
  ...(name ? { n: name } : {}),
};

const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
const signature = createHmac("sha256", secret).update(body).digest("base64url");
const token = `${body}.${signature}`;

const url = new URL("/checkout", base);
url.searchParams.set("quote", token);

console.log(url.toString());
console.error(`Expires: ${new Date(payload.exp * 1000).toISOString()}`);
