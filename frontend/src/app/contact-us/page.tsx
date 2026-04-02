import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Link from "next/link";
import "./contact.css";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us | Heavenly Giggles Jumping Castle Hire",
  description: "Get in touch with Heavenly Giggles. WhatsApp, email, or find us in Fourways, Johannesburg. We'll help you book the perfect jumping castle.",
  path: "/contact-us",
});

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP ?? "27828828864";
const WA_LINK = `https://wa.me/${WHATSAPP}?text=Hi%2C%20I%27d%20like%20to%20book%20a%20jumping%20castle!`;
const MAP_QUERY = "39A Albatross, Fourways, Johannesburg";
const MAP_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&z=14&output=embed`;

const details = [
  {
    icon: "📲",
    label: "Call or WhatsApp",
    value: "082 882 8864",
    href: WA_LINK,
    cta: "Open WhatsApp",
    highlight: true,
  },
  {
    icon: "✉️",
    label: "Email",
    value: "shaney@heavenlygiggles.com",
    href: "mailto:shaney@heavenlygiggles.com",
    cta: "Send Email",
  },
  {
    icon: "📍",
    label: "Where We Deliver",
    value: "Fourways free delivery, rest of JHB R120 flat fee",
    href: "https://maps.google.com/?q=Fourways,Johannesburg",
    cta: "Open Maps",
  },
  {
    icon: "🕗",
    label: "Hours",
    value: "Monday – Sunday, 8:00 – 17:00",
  },
];

const faqs = [
  {
    q: "Pick your inflatable",
    a: "Choose the jumping castle or slide that fits your party best.",
  },
  {
    q: "Choose your date and location",
    a: "Send us your preferred date and your area so we can confirm availability.",
  },
  {
    q: "Confirm your booking",
    a: "We’ll confirm everything with you and handle the rest. Seriously, that’s it.",
  },
];

const reasons = [
  {
    icon: "📲",
    title: "No calls, no paperwork, no stress",
    text: "We’ve made renting an inflatable as easy as clicking a button, with quick, easy booking from your phone.",
  },
  {
    icon: "🚚",
    title: "Delivery & Setup - You Chill, We Work",
    text: "We bring the fun straight to your door, set it up, secure it, and make sure everything is perfect.",
  },
  {
    icon: "🧼",
    title: "Sanitised, Safe, and Party-Ready",
    text: "Every inflatable is deep cleaned, sanitised, and safety-checked before and after each hire.",
  },
  {
    icon: "🎉",
    title: "More Giggles, Less Stress",
    text: "Kids burn energy, you get a break. We make the fun effortless for you and exhausting, in the best way, for them.",
  },
];

export default function ContactPage() {
  return (
    <div className="contact-page">

      {/* ── Hero ── */}
      <section className="contact-hero">
        <div className="contact-hero-glow-1" />
        <div className="contact-hero-glow-2" />
        <div className="hg-container">
          <div className="contact-hero-top">
            <div className="contact-hero-content">
              <div className="contact-badge">Get in Touch</div>
              <h1>
                Because Parenting Is <span className="contact-hero-highlight">Hard Enough!</span>
              </h1>
              <p className="contact-hero-sub">
                Need a jumping castle, slide, or just a way to keep the kids busy while you sip your coffee in peace? We&apos;ve got you.
              </p>
              <div className="contact-hero-ctas">
                <Link href="/rentals#rentals-products" className="btn-contact-primary">
                  Rent Online Now
                </Link>
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-contact-secondary">
                  Speak to Us on WhatsApp
                </a>
              </div>
            </div>

            <div className="contact-hero-panel">
              <p className="contact-hero-panel-kicker">No Stress. No Mess.</p>
              <h2>Just bouncing kids and a happy, relaxed you.</h2>
              <ul className="contact-hero-list">
                <li><strong>Birthdays, school events, or random Tuesdays</strong> — we show up for all of them.</li>
                <li><strong>We set up, secure, and collect</strong> so you don&apos;t lift a finger.</li>
                <li><strong>Available 7 days, 8am–5pm</strong> with real people ready to help.</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="contact-trustbar">
          <div className="hg-container contact-trustbar-inner">
            <div className="contact-trustitem">
              <span>🚚</span>
              <strong>Free Delivery to Fourways</strong>
            </div>
            <div className="contact-trustitem">
              <span>💬</span>
              <strong>Fastest on WhatsApp</strong>
            </div>
            <div className="contact-trustitem">
              <span>✔</span>
              <strong>SABS Quality Checked</strong>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Book ── */}
      <section className="contact-section contact-section-light">
        <div className="hg-container">
          <div className="contact-section-header">
            <h2>Why Book With Us?</h2>
            <p>No calls, no paperwork, no stress. Just pure, effortless fun for parents and party planners.</p>
          </div>
          <div className="contact-faq-list">
            {reasons.map((reason) => (
              <div key={reason.title} className="contact-faq-item">
                <div className="contact-faq-icon">{reason.icon}</div>
                <h3>{reason.title}</h3>
                <p>{reason.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Delivery ── */}
      <section className="contact-section contact-section-alt">
        <div className="hg-container">
          <div className="contact-section-header">
            <h2>Where We Deliver</h2>
          </div>
          <div className="contact-delivery-grid">
            {[
              { zone: "Fourways", fee: "FREE", highlight: true },
              { zone: "Rest of JHB", fee: "R120" },
            ].map((z) => (
              <div key={z.zone} className={`contact-delivery-row${z.highlight ? " contact-delivery-free" : ""}`}>
                <span className="contact-delivery-zone">{z.zone}</span>
                <span className="contact-delivery-fee">{z.fee}</span>
              </div>
            ))}
          </div>
          <p className="contact-delivery-note">
            Not sure if we deliver to your area? Just WhatsApp us and we&apos;ll confirm in minutes.
          </p>
        </div>
      </section>

      {/* ── Map ── */}
      <section className="contact-section contact-section-light">
        <div className="hg-container">
          <div className="contact-section-header">
            <h2>Find Us</h2>
            <p>Based in Fourways and ready to make booking easy if you want to chat, email, or open directions.</p>
          </div>
          <div className="contact-map-card">
            <div className="contact-map-details">
              <div className="contact-map-item">
                <span>📍</span>
                <div>
                  <strong>39A Albatross, Fourways</strong>
                  <p>Johannesburg, South Africa</p>
                </div>
              </div>
              <div className="contact-map-item">
                <span>📲</span>
                <div>
                  <strong>082 882 8864</strong>
                  <p>Call or WhatsApp for the fastest reply.</p>
                </div>
              </div>
              <div className="contact-map-item">
                <span>✉️</span>
                <div>
                  <strong>shaney@heavenlygiggles.com</strong>
                  <p>Email us anytime.</p>
                </div>
              </div>
              <div className="contact-map-item">
                <span>🕗</span>
                <div>
                  <strong>Monday – Sunday, 8:00 – 17:00</strong>
                  <p>We&apos;re available 7 days a week.</p>
                </div>
              </div>
              <div className="contact-map-ctas">
                <Link href="/rentals#rentals-products" className="btn-contact-primary">
                  Rent Online Now
                </Link>
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-contact-secondary">
                  Speak to Us on WhatsApp
                </a>
              </div>
            </div>
            <div className="contact-map-frame">
              <iframe
                src={MAP_EMBED}
                title="Heavenly Giggles location map"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
