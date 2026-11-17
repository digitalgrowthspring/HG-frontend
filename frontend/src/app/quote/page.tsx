import { notFound } from "next/navigation";
import QuoteBuilderForm from "@/components/QuoteBuilderForm";
import { rentalProducts } from "@/app/rentals/products";
import "../home.css";
import "../checkout/checkout.css";
import "../rentals/rentals.css";
import "../product/[slug]/product.css";
import "./quote.css";

export default function QuoteFillInPage() {
  // Local tool only: quotes are signed and saved here, so this page never ships live.
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  const options = rentalProducts.map((product) => ({ slug: product.slug, name: `${product.name} ${product.size}` }));

  return (
    <div className="checkout-page hg-home quote-page">
      <section className="checkout-intro">
        <div className="hg-container">
          <h1>New Quote</h1>
          <p>Fill in the client details and save. The quote opens with its unique link, ready to send.</p>
        </div>
      </section>

      <section className="checkout-shell">
        <div className="hg-container">
          <QuoteBuilderForm products={options} />
        </div>
      </section>
    </div>
  );
}
