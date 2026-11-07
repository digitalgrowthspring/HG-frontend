import { toDateKey } from "@/lib/booking";

const CONFIRMED_ORDER_STATUSES = "processing,on-hold,completed";
const ORDERS_PER_PAGE = 100;
const MAX_ORDER_PAGES = 10;

interface WooOrderMeta {
  meta_data?: Array<{ key: string; value: unknown }>;
}

export function getWooConfig() {
  return {
    apiUrl: process.env.WOOCOMMERCE_API_URL || "",
    consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY || "",
    consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET || "",
    checkoutBaseUrl: process.env.WOOCOMMERCE_CHECKOUT_URL || "",
  };
}

function getMetaValue(order: WooOrderMeta, key: string) {
  const value = order.meta_data?.find((item) => item.key === key)?.value;

  return typeof value === "string" ? value : "";
}

function getDatesInRange(from: string, to: string) {
  const dates: string[] = [];
  const cursor = new Date(`${from}T00:00:00`);
  const end = new Date(`${to}T00:00:00`);

  while (cursor <= end) {
    dates.push(toDateKey(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }

  return dates;
}

// A failed lookup returns no dates, so a WooCommerce outage cannot stop bookings.
export async function getBookedDates(slug: string) {
  const config = getWooConfig();

  if (!config.apiUrl || !config.consumerKey || !config.consumerSecret) {
    return [];
  }

  const authToken = Buffer.from(`${config.consumerKey}:${config.consumerSecret}`).toString("base64");
  const today = toDateKey(new Date());
  const bookedDates = new Set<string>();

  try {
    for (let page = 1; page <= MAX_ORDER_PAGES; page += 1) {
      const params = new URLSearchParams({
        status: CONFIRMED_ORDER_STATUSES,
        per_page: String(ORDERS_PER_PAGE),
        page: String(page),
        _fields: "id,meta_data",
      });
      const response = await fetch(`${config.apiUrl}?${params.toString()}`, {
        headers: { Authorization: `Basic ${authToken}` },
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`WooCommerce orders lookup failed with status ${response.status}`);
      }

      const orders = (await response.json()) as WooOrderMeta[];

      for (const order of orders) {
        const from = getMetaValue(order, "_hg_booking_from");
        const to = getMetaValue(order, "_hg_booking_to");

        if (getMetaValue(order, "_hg_booking_slug") !== slug || !from || !to) {
          continue;
        }

        for (const date of getDatesInRange(from, to)) {
          if (date >= today) {
            bookedDates.add(date);
          }
        }
      }

      if (orders.length < ORDERS_PER_PAGE) {
        break;
      }
    }
  } catch (error) {
    console.error("Could not load booked dates", error);
    return [];
  }

  return [...bookedDates].sort();
}
