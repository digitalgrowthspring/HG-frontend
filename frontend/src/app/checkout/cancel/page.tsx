import Link from "next/link";
import "../../home.css";
import "../checkout.css";

export default function CheckoutCancelPage() {
  return (
    <div className="checkout-page hg-home">
      <section className="checkout-intro">
        <div className="hg-container">
          <h1>Payment cancelled</h1>
          <p>Your booking isn&apos;t confirmed yet. You can try again from the rentals page.</p>
          <Link href="/rentals" className="checkout-link-back">Back to Rentals</Link>
        </div>
      </section>
    </div>
  );
}
