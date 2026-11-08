import Link from "next/link";
import "../../home.css";
import "../checkout.css";

// Returning from PayFast does not confirm the booking. The notification does that.
export default function CheckoutReturnPage() {
  return (
    <div className="checkout-page hg-home">
      <section className="checkout-intro">
        <div className="hg-container">
          <h1>Thanks, we&apos;re confirming your payment</h1>
          <p>PayFast is confirming your payment. Your booking is confirmed once it has been verified, and we&apos;ll be in touch.</p>
          <Link href="/rentals" className="checkout-link-back">Back to Rentals</Link>
        </div>
      </section>
    </div>
  );
}
