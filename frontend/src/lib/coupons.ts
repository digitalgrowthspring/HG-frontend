import { getWooConfig } from "@/lib/bookedDates";

export type CouponDiscountType = "percent" | "fixed_cart" | "fixed_product";

export interface CouponDetails {
  ok: true;
  code: string;
  discountType: CouponDiscountType;
  amount: number;
  expiresAt: string | null;
  usageLimit: number | null;
  usageCount: number;
  minimumAmount: number;
}

export interface CouponError {
  ok: false;
  message: string;
}

export type CouponResult = CouponDetails | CouponError;

interface WooCoupon {
  code?: unknown;
  status?: unknown;
  discount_type?: unknown;
  amount?: unknown;
  date_expires?: unknown;
  usage_limit?: unknown;
  usage_count?: unknown;
  minimum_amount?: unknown;
}

function toNumber(value: unknown) {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

function couponsUrl(apiUrl: string, code: string) {
  const baseUrl = apiUrl.replace(/\/orders\/?$/, "");
  const params = new URLSearchParams({ code });
  return `${baseUrl}/coupons?${params.toString()}`;
}

export async function lookupCoupon(code: string, purchaseAmount?: number): Promise<CouponResult> {
  const requestedCode = code.trim();

  if (!requestedCode) {
    return { ok: false, message: "Please enter a voucher code." };
  }

  const config = getWooConfig();

  if (!config.apiUrl || !config.consumerKey || !config.consumerSecret) {
    return { ok: false, message: "Voucher lookup is not configured yet." };
  }

  const authToken = Buffer.from(`${config.consumerKey}:${config.consumerSecret}`).toString("base64");
  let response: Response;

  try {
    response = await fetch(couponsUrl(config.apiUrl, requestedCode), {
      headers: { Authorization: `Basic ${authToken}` },
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });
  } catch {
    return { ok: false, message: "We couldn’t check that voucher right now. Please try again." };
  }

  if (!response.ok) {
    return { ok: false, message: "We couldn’t check that voucher right now. Please try again." };
  }

  const coupons = (await response.json()) as WooCoupon[];
  const coupon = coupons.find((candidate) => String(candidate.code ?? "").toLowerCase() === requestedCode.toLowerCase());

  if (!coupon) {
    return { ok: false, message: "That voucher code was not found." };
  }

  if (coupon.status !== "publish") {
    return { ok: false, message: "That voucher is not active." };
  }

  const expiresAt = typeof coupon.date_expires === "string" && coupon.date_expires ? coupon.date_expires : null;

  if (expiresAt && new Date(expiresAt).getTime() <= Date.now()) {
    return { ok: false, message: "That voucher has expired." };
  }

  const usageLimit = coupon.usage_limit === null || coupon.usage_limit === undefined ? null : toNumber(coupon.usage_limit);
  const usageCount = toNumber(coupon.usage_count);

  if (usageLimit !== null && usageCount >= usageLimit) {
    return { ok: false, message: "That voucher has reached its usage limit." };
  }

  const minimumAmount = toNumber(coupon.minimum_amount);

  if (purchaseAmount !== undefined && purchaseAmount < minimumAmount) {
    return { ok: false, message: `This voucher requires a minimum hire price of R${minimumAmount.toFixed(2)}.` };
  }

  const discountType = coupon.discount_type === "percent" ? "percent" : coupon.discount_type === "fixed_product" ? "fixed_product" : "fixed_cart";

  return {
    ok: true,
    code: String(coupon.code ?? requestedCode),
    discountType,
    amount: toNumber(coupon.amount),
    expiresAt,
    usageLimit,
    usageCount,
    minimumAmount,
  };
}

export function discountFor(coupon: CouponDetails, hirePrice: number) {
  const discount = coupon.discountType === "percent"
    ? hirePrice * coupon.amount / 100
    : coupon.amount;

  return Number(Math.min(Math.max(discount, 0), hirePrice).toFixed(2));
}
