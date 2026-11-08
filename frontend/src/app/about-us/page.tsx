import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { rentalProducts } from "@/app/rentals/products";
import HomeReviews from "@/components/HomeReviews";
import { LineIcon, type IconKind } from "@/components/LineIcon";
import "../home.css";
import "../rentals/rentals.css";
import "./about.css";

export const metadata: Metadata = buildMetadata({
  title: "About Us | Jumping Castle Rental & Hire Fourways",
  description: "Meet the family behind Heavenly Giggles — Fourways' trusted jumping castle hire. SABS-checked equipment, free delivery, and stress-free parties since 2024.",
  path: "/about-us",
});

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP ?? "27827713949";
const WA_LINK = `https://wa.me/${WHATSAPP}?text=Hi%2C%20I%27d%20like%20to%20book%20a%20jumping%20castle!`;

const trustPoints: Array<{ icon: IconKind; title: string; text: string }> = [
  { icon: "truck", title: "Free Delivery to Fourways", text: "Flat R120 for the rest of Johannesburg." },
  { icon: "card", title: "Secure Payment Online", text: "Pay securely online, or on WhatsApp." },
  { icon: "shield", title: "SABS Quality Check", text: "Cleaned, sanitised and safety checked." },
];

const storyCards = [
  {
    icon: "👨‍👩‍👧",
    tone: "teal",
    title: "Built by Parents, for Parents",
    text: "We know the snack requests, the endless energy and the dream of drinking your coffee while it’s still hot. We started Heavenly Giggles because we wanted to make parties easier for families like ours.",
  },
  {
    icon: "🏰",
    tone: "pink",
    title: "Fun for Kids, Less Work for You",
    text: "Our idea was simple. Give kids a brilliant time while parents get to enjoy the party too. We deliver, set up and collect, so there’s one less thing on your list.",
  },
  {
    icon: "☕",
    tone: "gold",
    title: "More Giggles, Less Stress",
    text: "From clean, safe jumping castles to whole-weekend hire, we focus on the little things that make a big difference. More happy kids, more relaxed parents and more memories.",
  },
];

const trustCards: Array<{ icon: IconKind; title: string; text: string }> = [
  {
    icon: "shield",
    title: "Safety First, Always",
    text: "Every castle is SABS safety checked before delivery. We never cut corners — because your kids' safety is non-negotiable.",
  },
  {
    icon: "sparkle",
    title: "Premium Quality",
    text: "Our inflatables are cleaned, inspected, and maintained after every single hire. You get equipment that looks and feels brand new.",
  },
  {
    icon: "calendar",
    title: "Reliable & Punctual",
    text: "We show up when we say we will. Setup is fast, professional, and leaves your yard exactly as we found it.",
  },
  {
    icon: "smile",
    title: "Personal Service",
    text: "No call centres, no bots. You deal directly with us over WhatsApp — real people who care about making your day perfect.",
  },
  {
    icon: "truck",
    title: "Free Delivery to Fourways",
    text: "If you're in Fourways, delivery and collection are completely free. Rest of JHB? Just R120 flat — no surprises.",
  },
  {
    icon: "sun",
    title: "Stress-Free Every Time",
    text: "We handle setup, we handle takedown. You just enjoy your party. That's the whole point.",
  },
];

export default function AboutPage() {
  return (
    <div className="about-page hg-home">

      {/* ── Hero ── */}
      <section className="hg-hero">
        <div className="hg-hero-copy">
          <h1 className="hg-badge">About Heavenly Giggles Fourways</h1>
          <h2 className="hg-hero-h1">
            The Family Behind <span>Heavenly Giggles</span>
          </h2>
          <p className="hg-hero-sub">
            We&apos;re a Fourways family business built on a simple belief: kids deserve a break, and parents do too. We bring the fun to your garden, handle the hard work and give everyone more time to enjoy the day.
          </p>
          <div className="hg-actions">
            <Link href="#about-products" className="btn-hg-primary">
              Rent Online Now
            </Link>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-hg-secondary">
              Speak to Us on WhatsApp
            </a>
          </div>
        </div>

        <div className="hg-hero-photo">
          <Image
            src="/media/about-family-festive.jpg"
            alt="The Heavenly Giggles family"
            className="hg-hero-img"
            width={1448}
            height={1086}
            priority
            fetchPriority="high"
            sizes="(max-width: 900px) 100vw, 50vw"
          />
        </div>
      </section>

      <section className="hg-strip">
        <div className="hg-container hg-why">
          <ul className="hg-why-list">
            {trustPoints.map((point) => (
              <li key={point.title}>
                <LineIcon kind={point.icon} className="hg-why-icon" />
                <div>
                  <p>{point.title}</p>
                  <p>{point.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Story ── */}
      <section id="about-story" className="hg-section about-story-section">
        <div className="hg-container">
          <div className="hg-section-header">
            <h2>Our Story</h2>
            <p>A Fourways family business built on one simple idea: parties should be fun for parents too.</p>
          </div>
          <ul className="about-story-list">
            {storyCards.map((card) => (
              <li key={card.title} className="about-story-item">
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Why Parents Trust Us ── */}
      <section className="hg-section hg-section-brand product-benefits-section about-trust-section">
        <div className="hg-container">
          <div className="hg-section-header">
            <h2>Why Parents Trust Us</h2>
            <p>Six things we do differently, and why they matter to you.</p>
          </div>
          <div className="hg-benefit-grid product-benefits-grid">
            {trustCards.map((card) => (
              <article key={card.title} className="hg-benefit">
                <div className="hg-benefit-icon"><LineIcon kind={card.icon} /></div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <HomeReviews className="about-reviews" />

      {/* ── Products ── */}
      <section id="about-products" className="hg-section hg-rentals about-products">
        <div className="hg-container">
          <div className="hg-section-header">
            <h2>Ready to Pick Your Castle?</h2>
            <p>Choose the inflatable that fits your party best, then let us handle the fun from there.</p>
          </div>
          <div className="hg-product-grid">
            {rentalProducts.map((product) => (
              <article key={product.slug} className="hg-product">
                <Link href={`/product/${product.slug}`} className="hg-product-visual">
                  {product.badge ? <span className="hg-product-badge">{product.badge}</span> : null}
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={600}
                    height={450}
                    className="hg-product-image"
                    sizes="(max-width: 900px) 100vw, 33vw"
                  />
                </Link>
                <h2>{product.name}</h2>
                <div className="hg-product-size">{product.size}</div>
                <div className="hg-product-price">
                  <span>From</span>
                  <span className="hg-product-price-row"><strong>{product.price}</strong> / weekend</span>
                </div>
                <p>{product.desc}</p>
                <ul className="hg-rental-features">
                  {product.features.filter((f) => !/SABS/i.test(f)).slice(0, 3).map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <div className="about-product-actions">
                  <Link href={`/product/${product.slug}`} className="btn-hg-primary">
                    View Details
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
