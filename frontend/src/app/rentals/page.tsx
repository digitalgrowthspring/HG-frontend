import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import ProductBookingCard from "@/components/ProductBookingCard";
import "./rentals.css";
import { rentalProducts as products } from "./products";

export const metadata: Metadata = buildMetadata({
  title: "Jumping Castle Rentals | Heavenly Giggles",
  description: "Browse our jumping castles and inflatables. Free delivery to Fourways. Setup included. From R700 for the whole weekend.",
  path: "/rentals",
});

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP ?? "27828828864";
const WA_LINK = `https://wa.me/${WHATSAPP}?text=Hi%2C%20I%27d%20like%20to%20book%20a%20jumping%20castle!`;

export default function RentalsPage() {
  return (
    <div className="rentals-page">

      {/* Hero */}
      <section className="rentals-hero">
        <div className="rentals-hero-glow-1" />
        <div className="rentals-hero-glow-2" />
        <div className="hg-container">
          <div className="rentals-hero-top">
            <div className="rentals-hero-content">
              <h1 className="rentals-badge">Jumping Castle Rental Fourways</h1>
              <h2>
                Shop Our <span>Inflatable Rentals</span>
              </h2>
              <p className="rentals-hero-sub">
                Zero effort, maximum fun. Pick the inflatable that suits your party, then let us handle the delivery, setup, and collection.
              </p>
              <div className="rentals-hero-price">
                <strong>From R700 for the whole weekend.</strong>
                <span>Because one afternoon of peace is nice, but a whole weekend is better.</span>
              </div>
              <div className="rentals-hero-ctas">
                <Link href="#rentals-products" className="btn-rentals-primary">
                  Rent Online Now
                </Link>
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-rental-secondary">
                  Speak to Us on WhatsApp
                </a>
              </div>
            </div>

            <div className="rentals-hero-panel">
              <p className="rentals-hero-panel-kicker">Why Parents Love This</p>
              <h3>The easiest way to keep kids busy and actually enjoy the party yourself.</h3>
              <ul className="rentals-hero-list">
                <li><strong>Kids entertained for hours</strong> — no screens, no arguments, just bouncing.</li>
                <li><strong>Two full days of peace</strong> so you actually get to enjoy the party too.</li>
                <li><strong>Something for every backyard</strong> — castles, slides, and water fun available.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="rentals-trustbar">
          <div className="hg-container rentals-trustbar-inner">
            <div className="rentals-trustitem">
              <span>🚚</span>
              <strong>Free Delivery to Fourways</strong>
            </div>
            <div className="rentals-trustitem">
              <span>🛠️</span>
              <strong>Setup &amp; Takedown Included</strong>
            </div>
            <div className="rentals-trustitem">
              <span>✔</span>
              <strong>SABS Safety Checked</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="rentals-products" className="rentals-grid-section">
        <div className="hg-container">
          <div className="rentals-section-header">
            <h2>Choose Your Fun</h2>
            <p>Three inflatables, one very simple goal: keep the kids happy while you actually enjoy the day.</p>
          </div>
          <div className="rentals-grid">
            {products.map((p) => (
              <div key={p.name} className={`rental-card ${p.color}`}>
                {"badge" in p && p.badge && <div className="rental-badge">{p.badge}</div>}
                <Link href={`/product/${p.slug}`} className="rental-visual">
                  <Image
                    src={p.image}
                    alt={p.name}
                    width={420}
                    height={300}
                    className="rental-image"
                  />
                </Link>
                <div className="rental-info">
                  <h2>{p.name}</h2>
                  <div className="rental-size">{p.size}</div>
                  <p>{p.desc}</p>
                  <ul className="rental-features">
                    {p.features.map((f) => (
                      <li key={f}>✓ {f}</li>
                    ))}
                  </ul>
                </div>
                <div className="rental-footer">
                  <div className="rental-price">
                    <span>From</span>
                    <strong>{p.price}</strong>
                    <span>/ weekend</span>
                  </div>
                  <div className="rental-actions">
                    <ProductBookingCard slug={p.slug} name={p.name} showSupportCta={false} />
                    <Link href={`/product/${p.slug}`} className="btn-rental-secondary">
                      Get More Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery info */}
      <section className="rentals-delivery">
        <div className="hg-container">
          <div className="rentals-section-header rentals-section-header-alt">
            <h2>Booking Made Easy</h2>
            <p>Here’s everything you need to know before you lock in your date.</p>
          </div>
          <div className="delivery-grid">
            <div className="delivery-card">
              <div className="delivery-icon">🚚</div>
              <h3>Delivery</h3>
              <p><strong>Free</strong> to Fourways<br />R120 flat fee for rest of Johannesburg</p>
            </div>
            <div className="delivery-card">
              <div className="delivery-icon">📅</div>
              <h3>Rental Period</h3>
              <p>Friday delivery / dropoff<br />Monday collection — a whole weekend of fun</p>
            </div>
            <div className="delivery-card">
              <div className="delivery-icon">📞</div>
              <h3>How to Book</h3>
              <p>WhatsApp us to check availability and confirm your date. We&apos;ll handle the rest.</p>
            </div>
            <div className="delivery-card">
              <div className="delivery-icon">🧼</div>
              <h3>Cleanliness</h3>
              <p>Every castle is deep cleaned, sanitised, and safety checked before and after each hire.</p>
            </div>
          </div>
          <div className="delivery-cta">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-rentals-primary">
              Speak to Us on WhatsApp
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
