import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { rentalProducts } from "@/app/rentals/products";
import "./about.css";
import familyImage from "../../../about-family.jpg";

export const metadata: Metadata = buildMetadata({
  title: "About Us | Heavenly Giggles Jumping Castle Hire Fourways",
  description: "Meet the family behind Heavenly Giggles — Fourways' trusted jumping castle hire. SABS-checked equipment, free delivery, and stress-free parties since 2024.",
  path: "/about-us",
});

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP ?? "27828828864";
const WA_LINK = `https://wa.me/${WHATSAPP}?text=Hi%2C%20I%27d%20like%20to%20book%20a%20jumping%20castle!`;

const values = [
  {
    icon: "🛡️",
    title: "Safety First, Always",
    text: "Every castle is SABS safety checked before delivery. We never cut corners — because your kids' safety is non-negotiable.",
  },
  {
    icon: "✨",
    title: "Premium Quality",
    text: "Our inflatables are cleaned, inspected, and maintained after every single hire. You get equipment that looks and feels brand new.",
  },
  {
    icon: "🤝",
    title: "Reliable & Punctual",
    text: "We show up when we say we will. Setup is fast, professional, and leaves your yard exactly as we found it.",
  },
  {
    icon: "💬",
    title: "Personal Service",
    text: "No call centres, no bots. You deal directly with us over WhatsApp — real people who care about making your day perfect.",
  },
  {
    icon: "🚚",
    title: "Free Delivery to Fourways",
    text: "If you're in Fourways, delivery and collection are completely free. Rest of JHB? Just R120 flat — no surprises.",
  },
  {
    icon: "🎉",
    title: "Stress-Free Every Time",
    text: "We handle setup, we handle takedown. You just enjoy your party. That's the whole point.",
  },
];

export default function AboutPage() {
  return (
    <div className="about-page">

      {/* ── Hero ── */}
      <section className="about-hero">
        <div className="about-hero-glow-1" />
        <div className="about-hero-glow-2" />
        <div className="hg-container">
          <div className="about-hero-top">
            <div className="about-hero-content">
              <h1 className="about-badge">About Heavenly Giggles Fourways</h1>
              <h2>
                The Family Behind
                <br />
                <span className="about-hero-highlight">Heavenly Giggles</span>
              </h2>
              <p className="about-hero-sub">
                We&apos;re a Fourways-based family business built on one simple belief: parents deserve a break, and kids deserve magic. So we brought both together — premium jumping castles that give your kids the time of their lives, while you actually enjoy the party.
              </p>
              <div className="about-hero-ctas">
                <Link href="#about-products" className="btn-hg-primary">
                  Rent Online Now
                </Link>
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-hg-secondary">
                  Speak to Us on WhatsApp
                </a>
              </div>
            </div>

            <div className="about-hero-image">
              <div className="about-hero-image-glow" />
              <div className="about-hero-image-wrap">
                <Image
                  src={familyImage}
                  alt="The Heavenly Giggles family"
                  className="about-hero-img"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
        <div className="about-trustbar">
          <div className="hg-container about-trustbar-inner">
            <div className="about-trustitem">
              <span>🚚</span>
              <strong>Free Delivery to Fourways</strong>
            </div>
            <div className="about-trustitem">
              <span>💳</span>
              <strong>Secure Payment Online</strong>
            </div>
            <div className="about-trustitem">
              <span>✔</span>
              <strong>SABS Quality Check</strong>
            </div>
          </div>
        </div>
      </section>

      {/* ── Story ── */}
      <section id="about-story" className="about-section about-section-light">
        <div className="hg-container">
          <div className="about-section-header about-story-header">
            <h2>Our Story</h2>
            <p>A Fourways family business built on one simple idea — parties should be fun for parents too.</p>
          </div>
          <div className="about-story-grid">
            <article className="about-story-card about-story-card-teal">
              <div className="about-story-icon about-story-icon-teal">👨‍👩‍👧</div>
              <h3>It Started with Us as Parents</h3>
              <p>We know the snack requests, the nonstop energy, and the dream of drinking your coffee while it’s still hot.</p>
            </article>
            <article className="about-story-card about-story-card-pink">
              <div className="about-story-icon about-story-icon-pink">🏰</div>
              <h3>We Had One Simple Idea</h3>
              <p>What if kids could burn all that energy somewhere fun and safe, and parents could get a little peace back too?</p>
            </article>
            <article className="about-story-card about-story-card-gold">
              <div className="about-story-icon about-story-icon-gold">☕</div>
              <h3>Why? Because Parents Need a Break Too</h3>
              <p>That was the whole point: give parents a little breathing room while the kids bounced, laughed, and stayed happily busy.</p>
            </article>
            <article className="about-story-card about-story-card-purple">
              <div className="about-story-icon about-story-icon-purple">💬</div>
              <h3>So We Kept the Whole Thing Easy</h3>
              <p>No call centres, no admin spiral, no unnecessary hassle. Just a simple, personal booking process that keeps things easy from the start.</p>
            </article>
            <article className="about-story-card about-story-card-teal">
              <div className="about-story-icon about-story-icon-teal">🧼</div>
              <h3>And We Made Sure It Felt Safe</h3>
              <p>Every inflatable is cleaned, sanitised, and safety-checked before it arrives, because fun only works when parents feel relaxed too.</p>
            </article>
            <article className="about-story-card about-story-card-pink">
              <div className="about-story-icon about-story-icon-pink">🎉</div>
              <h3>More Giggles, Less Stress, All Weekend Long</h3>
              <p>That’s why we offer weekend hire, because one rushed afternoon is never enough, but two days of fun gives everyone more room to breathe.</p>
            </article>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="about-section about-section-alt">
        <div className="hg-container">
          <div className="about-section-header">
            <h2>Why Parents Trust Us</h2>
            <p>Six things we do differently — and why they matter to you.</p>
          </div>
          <div className="about-values-grid">
            {values.map((v) => (
              <div key={v.title} className="about-value-card">
                <div className="about-value-icon">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Products ── */}
      <section id="about-products" className="about-section about-section-light">
        <div className="hg-container">
          <div className="about-section-header">
            <h2>Ready to Pick Your Castle?</h2>
            <p>Choose the inflatable that fits your party best, then let us handle the fun from there.</p>
          </div>
          <div className="about-product-grid">
            {rentalProducts.map((product) => (
              <article key={product.slug} className={`about-product-card ${product.color}`}>
                {product.badge ? <div className="about-product-badge">{product.badge}</div> : null}
                <Link href={`/product/${product.slug}`} className="about-product-visual">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={360}
                    height={240}
                    className="about-product-image"
                  />
                </Link>
                <h3>{product.name}</h3>
                <div className="about-product-size">{product.size}</div>
                <div className="about-product-price">From <strong>{product.price}</strong> / weekend</div>
                <Link href={`/product/${product.slug}`} className="about-product-button">
                  Get More Details
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
