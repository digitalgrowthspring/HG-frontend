import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import ProductBookingCard from "@/components/ProductBookingCard";
import "../home.css";
import "./rentals.css";
import { rentalProducts as products } from "./products";

export const metadata: Metadata = buildMetadata({
  title: "Jumping Castle Rental & Hire Fourways",
  description: "Browse our jumping castles and inflatables. Free delivery to Fourways. Setup included. From R700 for the whole weekend.",
  path: "/rentals",
});

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP ?? "27827713949";
const WA_LINK = `https://wa.me/${WHATSAPP}?text=Hi%2C%20I%27d%20like%20to%20book%20a%20jumping%20castle!`;
const WP_UPLOADS_BASE = "https://wp.heavenlygiggles.com/wp-content/uploads";

const trustPoints = [
  {
    title: "Free Delivery to Fourways",
    text: "Flat R120 for the rest of Johannesburg.",
    icon: <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7zM7.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM17.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />,
  },
  {
    title: "Setup & Takedown Included",
    text: "We set up, secure and collect.",
    icon: <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />,
  },
  {
    title: "SABS Safety Checked",
    text: "Cleaned, sanitised and safety checked.",
    icon: <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6zM9 12l2 2 4-4" />,
  },
];

const parentReasons = [
  {
    title: "Kids entertained for hours",
    text: "No screens, no arguments, just bouncing.",
    icon: <path d="M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0zM8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />,
  },
  {
    title: "Two full days of peace",
    text: "So you actually get to enjoy the party too.",
    icon: <path d="M4 6h16v13H4zM4 10h16M8 3v4M16 3v4" />,
  },
  {
    title: "Something for every backyard",
    text: "Castles, slides and water fun available.",
    icon: <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />,
  },
];

const bookingInfo = [
  {
    title: "Delivery",
    text: (
      <>
        <strong>Free</strong> to Fourways. R120 flat fee for the rest of Johannesburg.
      </>
    ),
    icon: <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7zM7.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM17.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />,
  },
  {
    title: "Rental Period",
    text: "Friday delivery and dropoff, Monday collection. A whole weekend of fun.",
    icon: <path d="M4 6h16v13H4zM4 10h16M8 3v4M16 3v4" />,
  },
  {
    title: "How to Book",
    text: "Pick an available weekend and pay securely online, or WhatsApp us. We confirm every booking on WhatsApp.",
    icon: <path d="M21 12a9 9 0 0 1-13.5 7.8L3 21l1.2-4.5A9 9 0 1 1 21 12z" />,
  },
  {
    title: "Cleanliness",
    text: "Every castle is deep cleaned, sanitised and safety checked before and after each hire.",
    icon: <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6zM9 12l2 2 4-4" />,
  },
];

export default function RentalsPage() {
  return (
    <div className="hg-home hg-rentals">

      {/* ── Hero ── */}
      <section className="hg-hero">
        <div className="hg-hero-copy">
          <h1 className="hg-badge">Jumping Castle Rental Fourways</h1>
          <h2 className="hg-hero-h1">
            Find Your <span>Perfect Jumping Castle</span>
          </h2>
          <p className="hg-hero-sub">
            Choose your inflatable, pick an available weekend and pay securely online. We&apos;ll confirm your booking on WhatsApp, then deliver, set up and collect.
          </p>
          <div className="hg-hero-price">
            <strong>From <span className="hg-hero-price-amount">R700</span> for the whole weekend.</strong>
            <span>Because <strong>mums deserve two days off,</strong> not one.</span>
          </div>
          <div className="hg-actions">
            <a href="#rentals-products" className="btn-hg-primary">
              Rent Online Now
            </a>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-hg-secondary">
              Speak to Us on WhatsApp
            </a>
          </div>
          <div className="hg-hero-proof">
            <div className="hg-stars" role="img" aria-label="5 out of 5 stars">★★★★★</div>
            &ldquo;I was overwhelmed planning my son&apos;s birthday, but Heavenly Giggles handled everything. The kids had an amazing time.&rdquo; <span className="hg-hero-proof-name"><strong>Michelle</strong>, Fourways</span>
          </div>
        </div>

        <div className="hg-hero-photo">
          <Image
            src="/rentals-hero-obstacle-course.png"
            alt="Joyful children playing on a colourful bouncy obstacle course"
            width={1672}
            height={941}
            className="hg-hero-img"
            priority
            fetchPriority="high"
            sizes="(max-width: 900px) 100vw, 50vw"
          />
        </div>
      </section>

      {/* ── Trust strip ── */}
      <section className="hg-strip">
        <div className="hg-container hg-why">
          <ul className="hg-why-list">
            {trustPoints.map((point) => (
              <li key={point.title}>
                <svg viewBox="0 0 24 24" aria-hidden="true" className="hg-why-icon">{point.icon}</svg>
                <div>
                  <p>{point.title}</p>
                  <p>{point.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Products ── */}
      <section id="rentals-products" className="hg-section">
        <div className="hg-container">
          <div className="hg-section-header">
            <h2>Choose Your Fun</h2>
            <p>Three inflatables, one very simple goal: keep the kids happy while you actually enjoy the day.</p>
          </div>
          <div className="hg-product-grid">
            {products.map((p) => (
              <article key={p.slug} className="hg-product">
                <Link href={`/product/${p.slug}`} className="hg-product-visual">
                  {p.badge && <span className="hg-product-badge">{p.badge}</span>}
                  <Image
                    src={p.image}
                    alt={p.name}
                    width={600}
                    height={450}
                    className="hg-product-image"
                    sizes="(max-width: 900px) 100vw, 33vw"
                  />
                </Link>
                <h2>{p.name}</h2>
                <div className="hg-product-size">{p.size}</div>
                <div className="hg-product-price">
                  <span>From</span>
                  <span className="hg-product-price-row"><strong>{p.price}</strong> / weekend</span>
                </div>
                <p>{p.desc}</p>
                <ul className="hg-rental-features">
                  {p.features.filter((f) => !/SABS/i.test(f)).slice(0, 3).map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <div className="rental-actions">
                  <ProductBookingCard slug={p.slug} name={p.name} showSupportCta={false} />
                  <Link href={`/product/${p.slug}`} className="btn-hg-secondary">
                    View Details
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Parents Love This ── */}
      <section className="hg-section hg-section-brand">
        <div className="hg-container hg-benefits">
          <div className="hg-benefits-layout">
            <div className="hg-section-header">
              <h2>Why Parents Love This</h2>
              <p>Keep the kids busy and enjoy the party yourself. A whole weekend means more breathing room.</p>
            </div>
            <div className="hg-benefit-grid">
              {parentReasons.map((r) => (
                <div key={r.title} className="hg-benefit">
                  <span className="hg-benefit-icon">
                    <svg viewBox="0 0 24 24" aria-hidden="true">{r.icon}</svg>
                  </span>
                  <div className="hg-benefit-copy">
                    <h3>{r.title}</h3>
                    <p>{r.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Booking Made Easy ── */}
      <section className="hg-section hg-section-steps">
        <div className="hg-container">
          <div className="hg-section-header">
            <h2>Booking Made Easy</h2>
            <p>Here&apos;s everything you need to know before you lock in your date.</p>
          </div>
          <ul className="hg-info-grid">
            {bookingInfo.map((item) => (
              <li key={item.title}>
                <svg viewBox="0 0 24 24" aria-hidden="true" className="hg-why-icon">{item.icon}</svg>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-hg-primary">
            Speak to Us on WhatsApp
          </a>
        </div>
      </section>

    </div>
  );
}
