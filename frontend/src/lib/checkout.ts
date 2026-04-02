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

  if (!values.phone.trim()) {
    fieldErrors.phone = "Please enter a phone number.";
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
    },
    shipping: {
      first_name: extractFirstName(values.fullName),
      last_name: extractLastName(values.fullName),
      address_1: values.addressLine1.trim(),
      city: values.city.trim(),
      state: "Gauteng",
    },
    fee_lines: [
      {
        name: `${product.name} Weekend Hire`,
        total: parsePrice(product.price),
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
      { key: "_hg_booking_notes", value: values.notes?.trim() || "" },
      { key: "_hg_booking_source", value: "nextjs_checkout" },
    ],
  };
}

