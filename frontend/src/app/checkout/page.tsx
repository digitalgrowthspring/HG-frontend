import Link from "next/link";
import CheckoutForm from "@/components/CheckoutForm";
import { getRentalProduct } from "@/app/rentals/products";
import { formatBookingDate, getBookingRange, isDateAvailable } from "@/lib/booking";
import { verifyQuoteToken, type QuotePayload } from "@/lib/quotes";
import "../home.css";
import "./checkout.css";

interface CheckoutPageProps {
  searchParams?: Promise<{
    product?: string;
    date?: string;
    area?: string;
    notes?: string;
    quote?: string;
  }>;
}

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const resolvedSearchParams = await searchParams;
  const quoteToken = resolvedSearchParams?.quote ?? "";
  let quote: QuotePayload | null = null;
  let quoteError = "";

  if (quoteToken) {
    const check = verifyQuoteToken(quoteToken);

    if (check.ok) {
      quote = check.quote;
    } else {
      quoteError = check.reason;
    }
  }

  if (quoteToken && !quote) {
    return (
      <div className="checkout-page hg-home">
        <section className="checkout-shell">
          <div className="hg-container">
            <div className="checkout-empty">
              <h1>This Quote Can’t Be Used</h1>
              <p>{quoteError}</p>
              <Link href="/rentals" className="checkout-link-back">
                Back to Rentals
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const productSlug = quote?.p ?? resolvedSearchParams?.product ?? "";
  const date = quote?.d ?? resolvedSearchParams?.date ?? "";
  const area = resolvedSearchParams?.area ?? "Fourways";
  const notes = quote?.c?.no ?? resolvedSearchParams?.notes ?? "";
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
          {quote?.n ? <p>Quote prepared for {quote.n}.</p> : null}
        </div>
      </section>

      <section className="checkout-shell">
        <div className="hg-container">
          <CheckoutForm
            windowLabel={windowLabel}
            quote={quote ? { hire: quote.h, delivery: quote.l } : undefined}
            initialValues={{
              product: product.slug,
              date,
              area,
              notes,
              quoteToken: quote ? quoteToken : undefined,
              fullName: quote?.n ?? "",
              phone: quote?.c?.ph ?? "",
              email: quote?.c?.e ?? "",
              addressLine1: quote?.c?.a ?? "",
              suburb: quote?.c?.s ?? area,
              city: quote?.c?.ci ?? "Johannesburg",
              postalCode: quote?.c?.pc ?? "2191",
            }}
          />
        </div>
      </section>
    </div>
  );
}
