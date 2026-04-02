import { getRentalProduct } from "@/app/rentals/products";
import { getBookingRange, isDateAvailable } from "@/lib/booking";

export interface CheckoutFormValues {
  product: string;
  date: string;
  area: string;
  notes?: string;
  fullName: string;
  phone: string;
  email: string;
  addressLine1: string;
  suburb: string;
  city: string;
  postalCode: string;
}

export interface CheckoutSubmissionResult {
  ok: boolean;
  message?: string;
  fieldErrors?: Partial<Record<keyof CheckoutFormValues, string>>;
  checkoutUrl?: string;
  bookingReference?: string;
}

function extractFirstName(fullName: string) {
  return fullName.trim().split(/\s+/)[0] || fullName.trim();
}

function extractLastName(fullName: string) {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length <= 1) return "";
  return parts.slice(1).join(" ");
}

function parsePrice(price: string) {
  const numeric = Number(price.replace(/[^\d.]/g, ""));
  return Number.isFinite(numeric) ? numeric.toFixed(2) : "0.00";
}

const FOURWAYS_POSTCODES = new Set(["2191"]);
const GAUTENG_DELIVERY_FEE = 120;

export interface DeliveryQuote {
  shippingMethodId: "free_shipping" | "flat_rate";
  shippingMethodTitle: string;
  deliveryLabel: string;
  deliveryTotal: string;
  supported: boolean;
  message?: string;
}

export function isJohannesburgCity(city: string) {
  return city.trim().toLowerCase() === "johannesburg";
}

export function getDeliveryQuote(postalCode: string, city = "Johannesburg"): DeliveryQuote {
  const normalizedPostcode = postalCode.trim();
  const inJohannesburg = isJohannesburgCity(city);

  if (!inJohannesburg) {
    return {
      shippingMethodId: "flat_rate",
      shippingMethodTitle: "Unavailable",
      deliveryLabel: "Area not currently serviced",
      deliveryTotal: "0.00",
      supported: false,
      message: "Sorry, we’re currently only servicing Johannesburg addresses.",
    };
  }

  if (FOURWAYS_POSTCODES.has(normalizedPostcode)) {
    return {
      shippingMethodId: "free_shipping",
      shippingMethodTitle: "Free shipping",
      deliveryLabel: "Free delivery in Fourways",
      deliveryTotal: "0.00",
      supported: true,
    };
  }

  return {
    shippingMethodId: "flat_rate",
    shippingMethodTitle: "Flat rate",
    deliveryLabel: "Gauteng delivery",
    deliveryTotal: GAUTENG_DELIVERY_FEE.toFixed(2),
    supported: true,
  };
}

export function formatCurrency(amount: string | number) {
  const numeric = typeof amount === "number" ? amount : Number(amount);
  const safeAmount = Number.isFinite(numeric) ? numeric : 0;

  return `R${safeAmount.toFixed(0)}`;
}

export function calculateOrderTotal(productPrice: string, postalCode: string, city = "Johannesburg") {
  return (Number(parsePrice(productPrice)) + Number(getDeliveryQuote(postalCode, city).deliveryTotal)).toFixed(2);
}

export function validateCheckoutForm(values: CheckoutFormValues): CheckoutSubmissionResult {
  const product = getRentalProduct(values.product);
  const fieldErrors: Partial<Record<keyof CheckoutFormValues, string>> = {};

  if (!product) {
    fieldErrors.product = "We couldn’t find that inflatable.";
  }

  if (!values.date || (product && !isDateAvailable(product.slug, values.date))) {
    fieldErrors.date = "Please choose an available booking date first.";
  }

  if (!values.fullName.trim()) {
    fieldErrors.fullName = "Please enter your full name.";
  }

  if (!values.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    fieldErrors.email = "Please enter a valid email address.";
  }

  if (!values.addressLine1.trim()) {
    fieldErrors.addressLine1 = "Please enter the delivery address.";
  }

  if (!values.suburb.trim()) {
    fieldErrors.suburb = "Please enter the suburb or area.";
  }

  if (!values.city.trim()) {
    fieldErrors.city = "Please enter the city.";
  } else if (!isJohannesburgCity(values.city)) {
    fieldErrors.city = "Sorry, we’re currently only servicing Johannesburg addresses.";
  }

  if (!/^\d{4}$/.test(values.postalCode.trim())) {
    fieldErrors.postalCode = "Please enter a valid 4-digit postal code.";
  }

  return {
    ok: Object.keys(fieldErrors).length === 0,
    fieldErrors,
  };
}

export function buildWooOrderPayload(values: CheckoutFormValues) {
  const product = getRentalProduct(values.product);

  if (!product) {
    throw new Error("Invalid product");
  }

  const bookingRange = getBookingRange(values.date);
  const deliveryQuote = getDeliveryQuote(values.postalCode, values.city);

  return {
    payment_method: "payfast",
    payment_method_title: "PayFast",
    set_paid: false,
    status: "pending",
    billing: {
      first_name: extractFirstName(values.fullName),
      last_name: extractLastName(values.fullName),
      email: values.email.trim(),
      phone: values.phone.trim(),
      address_1: values.addressLine1.trim(),
      city: values.city.trim(),
      state: "Gauteng",
      postcode: values.postalCode.trim(),
    },
    shipping: {
      first_name: extractFirstName(values.fullName),
      last_name: extractLastName(values.fullName),
      address_1: values.addressLine1.trim(),
      city: values.city.trim(),
      state: "Gauteng",
      postcode: values.postalCode.trim(),
    },
    fee_lines: [
      {
        name: `${product.name} Weekend Hire`,
        total: parsePrice(product.price),
      },
    ],
    shipping_lines: [
      {
        method_id: deliveryQuote.shippingMethodId,
        method_title: deliveryQuote.shippingMethodTitle,
        total: deliveryQuote.deliveryTotal,
      },
    ],
    meta_data: [
      { key: "_hg_booking_slug", value: product.slug },
      { key: "_hg_booking_product_name", value: product.name },
      { key: "_hg_booking_selected_date", value: values.date },
      { key: "_hg_booking_from", value: bookingRange.from },
      { key: "_hg_booking_to", value: bookingRange.to },
      { key: "_hg_booking_area", value: values.area.trim() },
      { key: "_hg_booking_suburb", value: values.suburb.trim() },
      { key: "_hg_booking_postal_code", value: values.postalCode.trim() },
      { key: "_hg_delivery_rule", value: deliveryQuote.deliveryLabel },
      { key: "_hg_booking_notes", value: values.notes?.trim() || "" },
      { key: "_hg_booking_source", value: "nextjs_checkout" },
    ],
  };
}
