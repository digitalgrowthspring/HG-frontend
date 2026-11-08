import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Link from "next/link";
import { LineIcon } from "@/components/LineIcon";
import ContactMap from "@/components/ContactMap";
import "../home.css";
import "./contact.css";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us | Jumping Castle Rental & Hire",
  description: "Get in touch with Heavenly Giggles. WhatsApp, email, or find us in Fourways, Johannesburg. We'll help you book the perfect jumping castle.",
  path: "/contact-us",
});

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP ?? "27827713949";
const WA_LINK = `https://wa.me/${WHATSAPP}?text=Hi%2C%20I%27d%20like%20to%20book%20a%20jumping%20castle!`;
const MAP_QUERY = "39A Albatross, Fourways, Johannesburg";
const MAP_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&z=14&output=embed`;
const MAP_DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(MAP_QUERY)}`;

const contactInfo: Array<{ icon: "pin" | "phone" | "mail" | "clock"; label: string; value: string; href?: string; external?: boolean; note?: string }> = [
  { icon: "phone", label: "WhatsApp / Phone", value: "+27 82 771 3949", href: WA_LINK, external: true },
  { icon: "mail", label: "Email", value: "ryan@heavenlygiggles.com", href: "mailto:ryan@heavenlygiggles.com" },
  { icon: "pin", label: "Location", value: "39A Albatross, Fourways, Johannesburg", note: "This is our business address. Please WhatsApp before visiting so we can confirm." },
  { icon: "clock", label: "Availability", value: "Monday to Sunday, 08:00 to 17:00" },
];

const trustPoints = [
  { icon: "truck" as const, title: "Free Delivery to Fourways", text: "Flat R120 for the rest of Johannesburg." },
  { icon: "smile" as const, title: "Fastest on WhatsApp", text: "Speak directly to real people." },
  { icon: "shield" as const, title: "SABS Quality Checked", text: "Cleaned, sanitised and safety checked." },
];

const reasons = [
  {
    title: "No Calls, No Paperwork, No Stress",
    text: "Renting an inflatable is as easy as clicking a button, with quick, easy booking from your phone.",
  },
  {
    title: "Delivery & Setup",
    text: "We bring the fun straight to your door, set it up, secure it and make sure everything is ready.",
  },
  {
    title: "Clean, Safe & Party Ready",
    text: "Every inflatable is deep cleaned, sanitised and safety checked before and after each hire.",
  },
  {
    title: "More Giggles, Less Stress",
    text: "Kids burn energy, you get a break. We make the fun effortless for you and exhausting in the best way for them.",
  },
];

const zones = [
  { zone: "Fourways", fee: "FREE", note: "Delivery and collection included." },
  { zone: "Rest of Johannesburg", fee: "R120", note: "Flat delivery and collection fee." },
];

export default function ContactPage() {
  return (
    <div className="contact-page hg-home">

      {/* ── Hero ── */}
      <section className="hg-hero">
        <div className="hg-hero-copy">
          <h1 className="hg-badge">Get in Touch</h1>
          <h2 className="hg-hero-h1">
            Because Parenting Is <span>Hard Enough!</span>
          </h2>
          <p className="hg-hero-sub">
            Need a jumping castle, slide, or just a way to keep the kids busy while you enjoy your coffee in peace? We&apos;ve got you.
          </p>
          <div className="hg-actions">
            <Link href="/rentals#rentals-products" className="btn-hg-primary">
              Rent Online Now
            </Link>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-hg-secondary">
              Speak to Us on WhatsApp
            </a>
          </div>
        </div>

        <div className="hg-hero-photo contact-hero-map">
          <ContactMap
            embedSrc={MAP_EMBED}
            directionsHref={MAP_DIRECTIONS}
            title="Heavenly Giggles location map"
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
                  <h3>{point.title}</h3>
                  <p>{point.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Why Book With Us ── */}
      <section className="hg-section contact-why">
        <div className="hg-container">
          <div className="hg-section-header">
            <h2>Why Book With Us?</h2>
            <p>No calls, no paperwork, no stress. Just pure, effortless fun for parents and party planners.</p>
          </div>
          <ul className="contact-text-list">
            {reasons.map((reason) => (
              <li key={reason.title}>
                <h3>{reason.title}</h3>
                <p>{reason.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Where We Deliver ── */}
      <section className="hg-section hg-section-brand contact-delivery">
        <div className="hg-container">
          <div className="hg-section-header">
            <h2>Where We Deliver</h2>
            <p>Based in Fourways, bringing the fun to families across Johannesburg.</p>
          </div>
          <div className="contact-zone-grid">
            {zones.map((z) => (
              <article key={z.zone} className="hg-benefit contact-zone-card">
                <div className="hg-benefit-icon"><LineIcon kind="truck" /></div>
                <h3>{z.zone}</h3>
                <p className="contact-zone-fee">{z.fee}</p>
                <p>{z.note}</p>
              </article>
            ))}
          </div>
          <p className="contact-delivery-note">
            Not sure if we deliver to your area? WhatsApp us and we&apos;ll confirm.
          </p>
        </div>
      </section>

      {/* ── Get in Touch ── */}
      <section className="hg-section contact-find">
        <div className="hg-container">
          <div className="hg-section-header">
            <h2>Get in Touch</h2>
            <p>Real people, ready to help make your next party easier.</p>
          </div>
          <ul className="contact-info-columns">
            {contactInfo.map((item) => (
              <li key={item.label} className="contact-info-item">
                <LineIcon kind={item.icon} className="contact-info-icon" />
                <h3>{item.label}</h3>
                {item.href ? (
                  <a href={item.href} target={item.external ? "_blank" : undefined} rel={item.external ? "noopener noreferrer" : undefined}>
                    {item.value}
                  </a>
                ) : (
                  <p>{item.value}</p>
                )}
                {item.note ? <p className="contact-info-note">{item.note}</p> : null}
              </li>
            ))}
          </ul>
          <div className="hg-actions contact-find-actions">
            <Link href="/rentals#rentals-products" className="btn-hg-primary">
              Rent Online Now
            </Link>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-hg-secondary">
              Speak to Us on WhatsApp
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
