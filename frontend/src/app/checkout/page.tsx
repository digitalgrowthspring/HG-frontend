import Link from "next/link";
import CheckoutForm from "@/components/CheckoutForm";
import { getRentalProduct } from "@/app/rentals/products";
import { formatBookingDate, getBookingRange, isDateAvailable } from "@/lib/booking";
import "../home.css";
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
  const windowLabel = hasWeekendWindow
    ? `${formatBookingDate(bookingRange.from)} to ${formatBookingDate(bookingRange.to)}`
    : formatBookingDate(date);

  if (!product) {
    return (
      <div className="checkout-page hg-home">
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
      <div className="checkout-page hg-home">
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
    <div className="checkout-page hg-home">
      <section className="checkout-intro">
        <div className="hg-container">
          <h1>Almost Time for Fun!</h1>
          <p>Just a few details and your weekend is sorted.</p>
        </div>
      </section>

      <section className="checkout-shell">
        <div className="hg-container">
          <CheckoutForm
            windowLabel={windowLabel}
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
              postalCode: "2191",
            }}
          />
        </div>
      </section>
    </div>
  );
}
