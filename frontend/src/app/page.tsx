import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Link from "next/link";
import Image from "next/image";
import "./home.css";

export const metadata: Metadata = buildMetadata({
  title: "Jumping Castle Rentals Fourways | Heavenly Giggles",
  description: "Kids jump. You relax. We handle the rest. Jumping castle and inflatable rentals in Fourways, Johannesburg. Free delivery, setup included.",
  path: "/",
});

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP ?? "27828828864";
const WA_LINK = `https://wa.me/${WHATSAPP}?text=Hi%2C%20I%27d%20like%20to%20book%20a%20jumping%20castle!`;
const WP_UPLOADS_BASE = "https://wp.heavenlygiggles.com/wp-content/uploads";

const products = [
  {
    slug: "inflatable-water-slide-7m-x-1m",
    name: "Inflatable Water Slide",
    size: "7m × 1m",
    price: "R800",
    desc: "Summer sorted. They'll be too busy sliding to even think about coming inside.",
    image: `${WP_UPLOADS_BASE}/2025/02/large-inflatable-slide-7m-2m--e1741081790716-600x582.webp`,
    color: "card-blue",
  },
  {
    slug: "jumping-castle-slide-7m-x-4m",
    name: "Jumping Castle & Slide",
    size: "7m × 4m",
    price: "R900",
    desc: "Jump AND slide — double the excitement, double the tired kids at bedtime. You're welcome.",
    image: `${WP_UPLOADS_BASE}/2025/02/jumping-cstle-and-slide-600x455.webp`,
    color: "card-featured",
    badge: "Most Popular",
  },
  {
    slug: "standard-jumping-castle-4m-x-4m",
    name: "Standard Jumping Castle",
    size: "4m × 4m",
    price: "R700",
    desc: "The classic. Perfect for birthdays, playdates, and any excuse to keep the kids busy for hours.",
    image: `${WP_UPLOADS_BASE}/2024/11/standard-jumping-castle-600x499.webp`,
    color: "card-teal",
  },
];

const testimonials = [
  {
    quote: "We rented the classic 4m x 4m Jumping Castle and what a treat! The boys had more fun jumping than in the swimming pool. Equipment was in immaculate condition and easy to operate.",
    name: "Marilu Meiring",
    tag: "Single Mom, Fourways",
    image: `${WP_UPLOADS_BASE}/2025/07/testimonial-lady-image.webp`,
  },
  {
    quote: "I was 9 months pregnant and completely overwhelmed planning my son's 7th birthday. Finding Heavenly Giggles was the best thing ever — they handled everything. The kids had an amazing time.",
    name: "Michelle Taylor",
    tag: "Pregnant Mom, Fourways",
    image: `${WP_UPLOADS_BASE}/2025/07/testimonial-2.webp`,
  },
  {
    quote: "I hired a jumping castle for my husband's 40th — absolutely perfect for the kids and teens. The team was professional, handled everything smoothly. Would definitely use them again!",
    name: "Chante de Sousa",
    tag: "Loving Wife, Fourways",
    image: `${WP_UPLOADS_BASE}/2025/07/testimonial.webp`,
  },
];

const benefits = [
  { icon: "⚡", title: "Burn Off Endless Energy", text: "Jumping castles let kids bounce it all out while you finally sit back and relax." },
  { icon: "🥂", title: "Enjoy the Party Stress-Free", text: "With the kids busy bouncing, you get to sip a drink and actually enjoy yourself." },
  { icon: "🎯", title: "Contain the Chaos", text: "Our castles keep the madness in one place, giving you peace of mind and calm." },
  { icon: "⭐", title: "Make the Castle the Star", text: "Let the castle take centre stage so you can step back and chill." },
  { icon: "🏠", title: "Protect Your Home (and Sanity)", text: "The kids burn energy safely on the castle, not your furniture." },
  { icon: "📸", title: "Create Lasting Memories", text: "Jumping castles bring pure joy and laughter — unforgettable moments for kids, priceless smiles for parents." },
];

const funHighlights = [
  {
    title: "Boundless Joy",
    text: "Jumping castles that turn excitement into pure magic.",
    image: `${WP_UPLOADS_BASE}/2025/07/kids-playing-on-jumping-castle.webp`,
  },
  {
    title: "Laughs That Last",
    text: "A space for giggles, smiles, and memories with their friends.",
    image: `${WP_UPLOADS_BASE}/2025/07/little-girl-sitting-on-jumping-castle.webp`,
  },
  {
    title: "Unforgettable Moments",
    text: "The kind of fun they’ll talk about long after the party ends.",
    image: `${WP_UPLOADS_BASE}/2025/07/little-boys-jumping-castle.webp`,
  },
];

export default function HomePage() {
  return (
    <div className="hg-home">

      {/* ── Hero ── */}
      <section className="hg-hero">
        <div className="hg-hero-glow-1" />
        <div className="hg-hero-glow-2" />
        <div className="hg-container">
          <div className="hg-hero-top">
            <div className="hg-hero-inner">
              <h1 className="hg-badge">Jumping Castle Hire &amp; Rental Fourways</h1>
              <h2 className="hg-hero-h1">
                Kids Jump. <span>You Relax.</span><br />
                We Handle the Rest.
              </h2>
              <p className="hg-hero-sub">
                They&apos;ll jump, laugh, and burn off all that energy - leaving you to soak in the quiet victory. It&apos;s their party, but let&apos;s be honest, <strong>you&apos;re the real winner here.</strong>
              </p>
              <div className="hg-hero-price">
                <strong>From R700 for the whole weekend.</strong>
                <span>Because <strong>mums deserve two days off,</strong> not one.</span>
              </div>
              <div className="hg-hero-ctas">
                <a href="#homepage-products" className="btn-hg-primary">
                  Rent Online Now
                </a>
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-hg-secondary">
                  Speak to Us on WhatsApp
                </a>
              </div>
            </div>

            <div className="hg-hero-image">
              <div className="hg-hero-image-glow" />
              <div className="hg-hero-image-wrap">
                <Image
                  src="/hero-castle.png"
                  alt="Kids laughing on a jumping castle"
                  width={700}
                  height={520}
                  className="hg-hero-img"
                  priority
                />
              </div>
            </div>
          </div>

          <div className="hg-hero-testimonials">
            {testimonials.map((t) => (
              <div key={t.name} className="hg-hero-quote">
                <div className="hg-hero-quote-stars">★★★★★</div>
                <p>&ldquo;{t.quote.split(". ")[0].slice(0, 92)}...&rdquo; - <strong>{t.name.split(" ")[0]}, Fourways</strong></p>
              </div>
            ))}
          </div>
        </div>

        <div className="hg-hero-trustbar">
          <div className="hg-container hg-hero-trustbar-inner">
            <div className="hg-hero-trustitem">
              <span>🚚</span>
              <strong>Free Delivery to Fourways</strong>
            </div>
            <div className="hg-hero-trustitem">
              <span>💳</span>
              <strong>Secure Payment Online</strong>
            </div>
            <div className="hg-hero-trustitem">
              <span>✔</span>
              <strong>SABS Quality Check</strong>
            </div>
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="hg-section hg-section-dark">
        <div className="hg-container">
          <div className="hg-section-header hg-section-header-light">
            <h2>From Chaos to Calm - Let Us Handle the Fun While You Relax</h2>
            <p>Six reasons your next party needs a jumping castle.</p>
          </div>
          <div className="hg-benefit-grid">
            {benefits.map((b) => (
              <div key={b.title} className="hg-benefit-card">
                <div className="hg-benefit-icon">{b.icon}</div>
                <h3>{b.title}</h3>
                <p>{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Fun Highlights ── */}
      <section className="hg-section hg-section-alt">
        <div className="hg-container">
          <div className="hg-section-header">
            <h2>Non-Stop Fun They&apos;ll Rave About (and Actually Remember)</h2>
            <p>Your kids deserve a party that&apos;s as exciting as their imaginations.</p>
          </div>
          <div className="hg-highlight-grid">
            {funHighlights.map((item) => (
              <article key={item.title} className="hg-highlight-card">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={420}
                  height={280}
                  className="hg-highlight-image"
                />
                <div className="hg-highlight-body">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="hg-band-label">Party Planning Made Simple</div>

      {/* ── Steps ── */}
      <section className="hg-section hg-section-dark">
        <div className="hg-container">
          <div className="hg-section-header">
            <h2>Fun for Them, Freedom for You</h2>
            <p>Throwing a party shouldn&apos;t feel like a second job. Here&apos;s how we make it easy:</p>
          </div>
          <div className="hg-steps">
            {[
              { n: "01", title: "Choose Your Castle", text: "Pick the perfect jumping castle for your event." },
              { n: "02", title: "Let the Fun Begin", text: "Watch the kids leap, bounce, and burn off energy for hours." },
              { n: "03", title: "Enjoy Your Day", text: "Sit back, relax, and let the laughter handle the rest." },
            ].map((s) => (
              <div key={s.n} className="hg-step">
                <div className="hg-step-num">{s.n}</div>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="hg-steps-cta">
            <a href="#homepage-products" className="btn-hg-primary">
              Rent Online Now
            </a>
          </div>
        </div>
      </section>

      <div className="hg-band-label">Testimonials</div>

      {/* ── Testimonials ── */}
      <section className="hg-section hg-section-alt">
        <div className="hg-container">
          <div className="hg-section-header">
            <h2>Parents Agree - This Is the Stress-Free Party Solution</h2>
          </div>
          <div className="hg-testimonial-grid">
            {testimonials.map((t) => (
              <div key={t.name} className="hg-testimonial">
                <Image
                  src={t.image}
                  alt={t.name}
                  width={92}
                  height={92}
                  className="hg-testimonial-image"
                />
                <div className="hg-testimonial-stars">⭐⭐⭐⭐⭐</div>
                <p>&ldquo;{t.quote}&rdquo;</p>
                <div className="hg-testimonial-author">
                  <strong>{t.name}</strong>
                  <span>{t.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section id="homepage-products" className="hg-section hg-cta-section">
        <div className="hg-container">
          <div className="hg-cta-inner">
            <h2>It&apos;s Time to Relax - Book Your Jumping Castle Today!</h2>
            <p>Give your kids the time of their lives while you sit back and savour the moment. Book your jumping castle today and let the fun - and your break - begin.</p>
            <div className="hg-product-grid">
              {products.map((p) => (
                <div key={`cta-${p.name}`} className={`hg-product-card ${p.color}`}>
                  {p.badge && <div className="hg-product-badge">{p.badge}</div>}
                  <Link href={`/product/${p.slug}`} className="hg-product-visual">
                    <Image
                      src={p.image}
                      alt={p.name}
                      width={360}
                      height={240}
                      className="hg-product-image"
                    />
                  </Link>
                  <h3>{p.name}</h3>
                  <div className="hg-product-size">{p.size}</div>
                  <div className="hg-product-price">From <strong>{p.price}</strong> / weekend</div>
                  <Link href={`/product/${p.slug}`} className="btn-hg-card">
                    Get More Details
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
