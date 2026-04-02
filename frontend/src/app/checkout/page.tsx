import Link from "next/link";
import CheckoutForm from "@/components/CheckoutForm";
import { getRentalProduct } from "@/app/rentals/products";
import { calculateOrderTotal, formatCurrency, getDeliveryQuote } from "@/lib/checkout";
import { formatBookingDate, getBookingRange, isDateAvailable } from "@/lib/booking";
import "./checkout.css";

interface CheckoutPageProps {
  searchParams?: Promise<{
    product?: string;
    date?: string;
    area?: string;
    notes?: string;
  }>;
}

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const resolvedSearchParams = await searchParams;
  const productSlug = resolvedSearchParams?.product ?? "";
  const date = resolvedSearchParams?.date ?? "";
  const area = resolvedSearchParams?.area ?? "Fourways";
  const notes = resolvedSearchParams?.notes ?? "";
  const product = getRentalProduct(productSlug);
  const hasValidBooking = Boolean(product && date && isDateAvailable(product.slug, date));
  const bookingRange = date ? getBookingRange(date) : { from: "", to: "" };
  const hasWeekendWindow = Boolean(
    bookingRange.from &&
    bookingRange.to &&
    bookingRange.from !== bookingRange.to,
  );
  const defaultPostalCode = "2191";
  const defaultDeliveryQuote = getDeliveryQuote(defaultPostalCode);
  const defaultEstimatedTotal = product ? calculateOrderTotal(product.price, defaultPostalCode) : "0.00";

  if (!product) {
    return (
      <div className="checkout-page">
        <section className="checkout-shell">
          <div className="hg-container">
            <div className="checkout-empty">
              <h1>Booking Not Found</h1>
              <p>We couldn’t find the inflatable attached to this checkout. Head back to rentals and start again.</p>
              <Link href="/rentals" className="checkout-link-back">
                Back to Rentals
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (!hasValidBooking) {
    return (
      <div className="checkout-page">
        <section className="checkout-shell">
          <div className="hg-container">
            <div className="checkout-empty">
              <h1>Choose a Valid Booking Date First</h1>
              <p>
                This checkout needs a live date selection from the booking calendar first. Head back, choose an available date, and then we&apos;ll bring the correct hire window through.
              </p>
              <Link href={`/book/${product.slug}`} className="checkout-link-back">
                Back to Booking
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <section className="checkout-hero">
        <div className="hg-container">
          <p className="checkout-kicker">Checkout</p>
          <h1>Lock In Your Booking</h1>
          <p className="checkout-hero-sub">
            We&apos;ve carried your selected booking date and hire window through. Fill in the final details and you&apos;re ready for payment and confirmation.
          </p>
        </div>
      </section>

      <section className="checkout-shell">
        <div className="hg-container">
          <div className="checkout-grid">
            <aside className="checkout-summary-card">
              <h2>Your Order</h2>
              <div className="checkout-summary-meta">
                <p className="checkout-summary-meta-label">Rental window</p>
                <strong>
                  {hasWeekendWindow
                    ? `${formatBookingDate(bookingRange.from)} to ${formatBookingDate(bookingRange.to)}`
                    : formatBookingDate(date)}
                </strong>
              </div>
              <div className="checkout-summary-row">
                <span>Product</span>
                <strong>{product.name}</strong>
              </div>
              <div className="checkout-summary-row">
                <span>Subtotal</span>
                <strong>{product.price}</strong>
              </div>
              <div className="checkout-summary-row">
                <span>Delivery</span>
                <strong>{defaultDeliveryQuote.deliveryLabel}</strong>
              </div>
              <div className="checkout-summary-row checkout-summary-total">
                <span>Estimated total</span>
                <strong>{formatCurrency(defaultEstimatedTotal)}</strong>
              </div>
            </aside>

            <div className="checkout-form-card">
              <h2>Your Details</h2>
              <CheckoutForm
                initialValues={{
                  product: product.slug,
                  date,
                  area,
                  notes,
                  fullName: "",
                  phone: "",
                  email: "",
                  addressLine1: "",
                  suburb: area,
                  city: "Johannesburg",
                  postalCode: defaultPostalCode,
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
