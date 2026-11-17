import Image from "next/image";
import Link from "next/link";
import PrintButton from "@/components/PrintButton";
import { getRentalProduct } from "@/app/rentals/products";
import { formatBookingDate, getBookingRange } from "@/lib/booking";
import { verifyQuoteToken } from "@/lib/quotes";
import "../../home.css";
import "../../checkout/checkout.css";
import "./print.css";

interface QuotePrintPageProps {
  searchParams?: Promise<{ quote?: string }>;
}

function formatRand(amount: number) {
  return `R${amount.toLocaleString("en-ZA", { maximumFractionDigits: 0 })}`;
}

export default async function QuotePrintPage({ searchParams }: QuotePrintPageProps) {
  const token = (await searchParams)?.quote ?? "";
  const check = token ? verifyQuoteToken(token) : { ok: false as const, reason: "No quote was given." };

  if (!check.ok) {
    return (
      <div className="checkout-page hg-home">
        <section className="checkout-shell">
          <div className="hg-container">
            <div className="checkout-empty">
              <h1>This Quote Can’t Be Used</h1>
              <p>{check.reason}</p>
              <Link href="/rentals" className="checkout-link-back">
                Back to Rentals
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const { quote } = check;
  const product = getRentalProduct(quote.p);
  const total = quote.h + quote.l;
  const range = getBookingRange(quote.d);
  const weekendLabel =
    range.from && range.to && range.from !== range.to
      ? `${formatBookingDate(range.from)} to ${formatBookingDate(range.to)}`
      : formatBookingDate(quote.d);
  const validUntil = new Date(quote.exp * 1000).toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const deliveryAddress = [quote.c?.a, quote.c?.s, quote.c?.ci, quote.c?.pc].filter(Boolean).join(", ");

  return (
    <div className="checkout-page hg-home">
      <section className="checkout-intro">
        <div className="hg-container">
          <h1>Your Quote</h1>
          <p>
            {quote.n ? `Prepared for ${quote.n}. ` : ""}Valid until {validUntil}.
          </p>
        </div>
      </section>

      <section className="checkout-shell quote-sheet">
        <div className="hg-container">
          <div className="quote-print-logo">
            <Image src="/hg-logo-v17.png" alt="Heavenly Giggles" width={1706} height={909} className="quote-print-logo-img" />
          </div>
          <div className="checkout-layout">
            <div className="quote-details">
              <h2>Booking details</h2>
              <dl className="quote-details-list">
                <div>
                  <dt>Inflatable</dt>
                  <dd>{product?.name ?? quote.p} {product?.size ?? ""}</dd>
                </div>
                <div>
                  <dt>Weekend</dt>
                  <dd>{weekendLabel}</dd>
                </div>
                {deliveryAddress ? (
                  <div>
                    <dt>Delivery to</dt>
                    <dd>{deliveryAddress}</dd>
                  </div>
                ) : null}
                {quote.c?.no ? (
                  <div>
                    <dt>Notes</dt>
                    <dd>{quote.c.no}</dd>
                  </div>
                ) : null}
              </dl>

              <h2>To book</h2>
              <p>
                Tap “Accept and pay” to confirm your booking. Your booking is only confirmed once payment is complete.
              </p>
              <div className="no-print">
                <PrintButton />
              </div>
            </div>

            <aside className="checkout-summary">
              <div className="checkout-summary-card">
                {product ? (
                  <div className="checkout-summary-product">
                    <Image src={product.image} alt={product.name} width={120} height={90} className="checkout-summary-image" />
                    <div>
                      <strong>{product.name}</strong>
                      <span>{product.size}</span>
                    </div>
                  </div>
                ) : null}

                <div className="checkout-summary-dates">
                  <span>Selected weekend</span>
                  <strong>{weekendLabel}</strong>
                </div>

                <dl className="checkout-summary-rows">
                  <div>
                    <dt>Weekend hire</dt>
                    <dd>{formatRand(quote.h)}</dd>
                  </div>
                  <div>
                    <dt>Delivery</dt>
                    <dd>{quote.l === 0 ? "Free" : formatRand(quote.l)}</dd>
                  </div>
                  <div className="checkout-summary-total">
                    <dt>Total</dt>
                    <dd>{formatRand(total)}</dd>
                  </div>
                </dl>

                <Link className="checkout-btn-primary checkout-btn-block no-print" href={`/checkout?quote=${token}`}>
                  Accept and pay
                </Link>
                <p className="checkout-summary-note">Payment is taken on the next step.</p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
