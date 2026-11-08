import Image from "next/image";
import Link from "next/link";
import { getRentalProduct } from "@/app/rentals/products";
import { calculateOrderTotal, formatCurrency, getDeliveryQuote } from "@/lib/checkout";
import { formatBookingDate, getBookingRange } from "@/lib/booking";
import "../../home.css";
import "../checkout.css";
import "./preview.css";

// Local preview only: shows the review and payment step with the booking details from the link.
// The payment button is not connected, so this page creates no orders.

// Set NEXT_PUBLIC_PAYMENT_LIVE=true when the PayFast integration is connected. The preview note then disappears.
const PAYMENT_LIVE = process.env.NEXT_PUBLIC_PAYMENT_LIVE === "true";

interface PreviewPageProps {
  searchParams?: Promise<{ product?: string; date?: string; postal?: string }>;
}

export default async function PaymentPreviewPage({ searchParams }: PreviewPageProps) {
  const params = (await searchParams) ?? {};
  const product = getRentalProduct(params.product ?? "inflatable-water-slide-7m-x-1m");
  const date = params.date ?? "2027-02-20";
  const postal = params.postal ?? "2191";

  if (!product) {
    return (
      <div className="checkout-page hg-home">
        <section className="checkout-shell">
          <div className="hg-container">
            <p>Unknown product. Try ?product=standard-jumping-castle-4m-x-4m</p>
          </div>
        </section>
      </div>
    );
  }

  const range = getBookingRange(date);
  const windowLabel = range.from && range.to && range.from !== range.to
    ? `${formatBookingDate(range.from)} to ${formatBookingDate(range.to)}`
    : formatBookingDate(date);
  const delivery = getDeliveryQuote(postal);
  const total = calculateOrderTotal(product.price, postal);

  return (
    <div className="checkout-page hg-home">
      <section className="checkout-intro">
        <div className="hg-container">
          <h1>One Last Step!</h1>
          <p>Review your booking and complete your payment.</p>
        </div>
      </section>

      <section className="checkout-shell">
        <div className="hg-container preview-grid">
          <div className="checkout-summary-card">
            <div className="checkout-summary-product">
              <Image src={product.image} alt={product.name} width={120} height={90} className="checkout-summary-image" />
              <div>
                <h2>{product.name}</h2>
                <p>{product.size}</p>
              </div>
            </div>
            <div className="checkout-summary-dates">
              <span>Selected weekend</span>
              <strong>{windowLabel}</strong>
            </div>
            <dl className="checkout-summary-rows">
              <div>
                <dt>Weekend hire</dt>
                <dd>{product.price}</dd>
              </div>
              <div>
                <dt>Delivery</dt>
                <dd>{formatCurrency(delivery.deliveryTotal)}</dd>
              </div>
              <div className="checkout-summary-total">
                <dt>Total payable</dt>
                <dd>{formatCurrency(total)}</dd>
              </div>
            </dl>
          </div>

          <div className="checkout-summary-card preview-pay-card">
            <h2 className="preview-pay-heading">Secure Payment</h2>
            <p className="preview-payfast">
              Payment provider: <strong>PayFast</strong>
            </p>
            <p className="preview-privacy">
              Your card details are entered on PayFast&apos;s secure page, not on this website.{" "}
              <Link href="/privacy-policy">Privacy policy</Link>
            </p>
            <button type="button" className="checkout-btn-primary checkout-btn-block preview-pay-button" aria-disabled="true" tabIndex={-1}>
              <svg viewBox="0 0 24 24" aria-hidden="true" className="preview-lock">
                <rect x="5" y="11" width="14" height="10" rx="2" />
                <path d="M8 11V8a4 4 0 0 1 8 0v3" />
              </svg>
              Pay {formatCurrency(total)} Securely
            </button>
            {PAYMENT_LIVE ? null : <p className="preview-note">Preview only. This button is not connected to PayFast.</p>}
          </div>
        </div>
      </section>
    </div>
  );
}
