import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Link from "next/link";
import Image from "next/image";
import HomeReviews from "@/components/HomeReviews";
import "./home.css";

export const metadata: Metadata = buildMetadata({
  title: "Jumping Castle Rental & Hire Fourways | Heavenly Giggles",
  description: "Kids jump. You relax. We handle the rest. Jumping castle and inflatable rentals in Fourways, Johannesburg. Free delivery, setup included.",
  path: "/",
});

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP ?? "27827713949";
const WA_LINK = `https://wa.me/${WHATSAPP}?text=Hi%2C%20I%27d%20like%20to%20book%20a%20jumping%20castle!`;
const WP_UPLOADS_BASE = "https://wp.heavenlygiggles.com/wp-content/uploads";

const products = [
  {
    slug: "inflatable-water-slide-7m-x-1m",
    name: "Inflatable Water Slide",
    size: "7m × 1m",
    price: "R800",
    desc: "Summer sorted. They'll be too busy sliding to even think about coming inside.",
    image: "/inflatable-water-slide-hero.jpg",
  },
  {
    slug: "jumping-castle-slide-7m-x-4m",
    name: "Jumping Castle & Slide",
    size: "7m × 4m",
    price: "R900",
    desc: "Jump AND slide. Double the excitement, double the tired kids at bedtime. You're welcome.",
    image: "/jumping-castle-slide-photo-v2.jpg",
    badge: "Most Popular",
  },
  {
    slug: "standard-jumping-castle-4m-x-4m",
    name: "Standard Jumping Castle",
    size: "4m × 4m",
    price: "R700",
    desc: "The classic. Perfect for birthdays, playdates, and any excuse to keep the kids busy for hours.",
    image: "/standard-jumping-castle-photo-v3.jpg",
  },
];

const benefits = [
  {
    title: "Burn Off Endless Energy",
    text: "Jumping castles let kids bounce it all out while you finally sit back and relax.",
    icon: <path d="M13 2 3 14h9l-1 8 10-12h-9z" />,
  },
  {
    title: "Enjoy the Party Stress-Free",
    text: "With the kids busy bouncing, you get to sip a drink and actually enjoy yourself.",
    icon: <path d="M5.8 11.3 2 22l10.7-3.79M4 3h.01M22 8h.01M15 2h.01M22 20h.01M22 2l-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10M22 13l-.82-.33c-.86-.34-1.82.2-1.98 1.11-.11.7-.72 1.22-1.43 1.22H17M11 2l.33.82c.34.86-.2 1.82-1.11 1.98-.7.1-1.22.72-1.22 1.43V7M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2z" />,
  },
  {
    title: "Contain the Chaos",
    text: "Our castles keep the madness in one place, giving you peace of mind and calm.",
    icon: <path d="M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0zM8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />,
  },
  {
    title: "Make the Castle the Star",
    text: "Let the castle take centre stage so you can step back and chill.",
    icon: <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />,
  },
  {
    title: "Protect Your Home (and Sanity)",
    text: "The kids burn energy safely on the castle, not your furniture.",
    icon: <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />,
  },
  {
    title: "Create Lasting Memories",
    text: "Jumping castles bring pure joy and laughter. Unforgettable moments for kids, priceless smiles for parents.",
    icon: <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3zM12 16.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />,
  },
];

const steps = [
  { title: "Choose Your Castle", text: "Find the perfect jumping castle for your party." },
  { title: "Choose Your Date", text: "Book online or chat to us on WhatsApp." },
  { title: "We Deliver and Set Up", text: "We handle the setup and collection so you can enjoy the party." },
];

const sellingPoints = [
  {
    title: "Free Delivery to Fourways",
    text: "Flat R120 for the rest of Johannesburg.",
    icon: <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7zM7.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM17.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />,
  },
  {
    title: "Clean and Safe Equipment",
    text: "Cleaned, sanitised and safety checked.",
    icon: <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6zM9 12l2 2 4-4" />,
  },
  {
    title: "Easy Booking and Secure Payment",
    text: "Book online or on WhatsApp, pay securely.",
    icon: <path d="M4 6h16v13H4zM4 10h16M8 3v4M16 3v4" />,
  },
];

const moments = [
  {
    alt: "Little boys playing on a jumping castle",
    image: `${WP_UPLOADS_BASE}/2025/07/little-boys-jumping-castle.webp`,
    width: 1284,
    height: 1208,
    sizes: "(max-width: 900px) 100vw, 50vw",
  },
  {
    alt: "Kids climbing on an obstacle course inflatable",
    image: "/rentals-hero-obstacle-course.png",
    width: 1672,
    height: 941,
    sizes: "(max-width: 900px) 100vw, 50vw",
  },
  {
    alt: "Little girl sitting on a jumping castle",
    image: `${WP_UPLOADS_BASE}/2025/07/little-girl-sitting-on-jumping-castle.webp`,
    width: 1295,
    height: 865,
    sizes: "(max-width: 900px) 100vw, 50vw",
  },
];

export default function HomePage() {
  return (
    <div className="hg-home">

      {/* ── Hero ── */}
      <section className="hg-hero">
        <div className="hg-hero-copy">
          <h1 className="hg-badge">Jumping Castle Hire &amp; Rental Fourways</h1>
          <h2 className="hg-hero-h1">
            Kids Jump. <span>You Relax.</span><br />
            We Handle the Rest.
          </h2>
          <p className="hg-hero-sub">
            They&apos;ll jump, laugh and burn off all that energy. It&apos;s their party, but let&apos;s be honest, <strong>you&apos;re the real winner here.</strong>
          </p>
          <div className="hg-hero-price">
            <strong>From <span className="hg-hero-price-amount">R700</span> for the whole weekend.</strong>
            <span>Because <strong>mums deserve two days off,</strong> not one.</span>
          </div>
          <div className="hg-actions">
            <a href="#homepage-products" className="btn-hg-primary">
              Rent Online Now
            </a>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-hg-secondary">
              Speak to Us on WhatsApp
            </a>
          </div>
          <p className="hg-hero-proof">
            <span className="hg-stars" role="img" aria-label="5 out of 5 stars">★★★★★</span>
            &ldquo;We rented the classic 4m x 4m Jumping Castle and what a treat! The boys had more fun jumping than in the swimming pool.&rdquo; <span className="hg-hero-proof-name"><strong>Marilu</strong>, Fourways</span>
          </p>
        </div>

        <div className="hg-hero-photo">
          <Image
            src="/hero-castle-hd.webp"
            alt="Kids laughing on a jumping castle"
            width={3072}
            height={2048}
            quality={90}
            className="hg-hero-img"
            priority
            fetchPriority="high"
            sizes="(max-width: 900px) 100vw, 50vw"
          />
        </div>
      </section>

      {/* ── Why Choose Heavenly Giggles ── */}
      <section className="hg-strip">
        <div className="hg-container hg-why">
          <h2 className="hg-visually-hidden">More Fun. Less Fuss.</h2>
          <ul className="hg-why-list">
            {sellingPoints.map((point) => (
              <li key={point.title}>
                <svg viewBox="0 0 24 24" aria-hidden="true" className="hg-why-icon">{point.icon}</svg>
                <div>
                  <h3>{point.title}</h3>
                  <p>{point.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Rentals ── */}
      <section id="homepage-products" className="hg-section">
        <div className="hg-container">
          <div className="hg-section-header">
            <h2>Find the Perfect Jumping Castle</h2>
            <p>Every hire is for the whole weekend, with setup and collection included.</p>
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
                <h3>{p.name}</h3>
                <div className="hg-product-size">{p.size}</div>
                <div className="hg-product-price">
                  <span>From</span>
                  <span className="hg-product-price-row"><strong>{p.price}</strong> / weekend</span>
                </div>
                <p>{p.desc}</p>
                <Link href={`/product/${p.slug}`} className="btn-hg-primary">
                  View Details
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="hg-section hg-section-brand">
        <div className="hg-container hg-benefits">
          <div className="hg-section-header">
            <h2>More bouncing.<br />Less worrying.</h2>
            <p>They jump, laugh and burn off all that energy. You get to enjoy the party too.</p>
          </div>
          <div className="hg-benefit-grid">
            {benefits.map((b) => (
              <div key={b.title} className="hg-benefit">
                <span className="hg-benefit-icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">{b.icon}</svg>
                </span>
                <h3>{b.title}</h3>
                <p>{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="hg-section hg-section-steps">
        <div className="hg-container">
          <div className="hg-section-header">
            <h2>Fun for Them, Freedom for You</h2>
            <p>Throwing a party shouldn&apos;t feel like a second job. Here&apos;s how we make it easy:</p>
          </div>
          <ol className="hg-steps">
            {steps.map((s, i) => (
              <li key={s.title}>
                <span className="hg-step-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
          <a href="#homepage-products" className="btn-hg-primary">
            Rent Online Now
          </a>
        </div>
      </section>

      {/* ── The Experience ── */}
      <section className="hg-section">
        <div className="hg-container">
          <div className="hg-section-header">
            <h2>Big Smiles, Happy Memories</h2>
            <p>The kind of fun they&apos;ll talk about long after the party ends.</p>
          </div>
          <div className="hg-moments">
            {moments.map((m) => (
              <Image
                key={m.image}
                src={m.image}
                alt={m.alt}
                width={m.width}
                height={m.height}
                sizes={m.sizes}
                className="hg-moment"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Reviews ── */}
      <HomeReviews />

      {/* ── Final CTA ── */}
      <section className="hg-section hg-section-mint hg-section-cta">
        <div className="hg-container hg-cta">
          <div>
            <h2>Ready to Make Their Day?</h2>
            <p>Pick your jumping castle, choose your date and leave the fun to us.</p>
          </div>
          <div className="hg-actions">
            <a href="#homepage-products" className="btn-hg-primary">
              Rent Online Now
            </a>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-hg-secondary">
              Speak to Us on WhatsApp
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
