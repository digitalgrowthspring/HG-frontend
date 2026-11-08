import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { getRentalProduct, rentalProducts } from "@/app/rentals/products";
import ProductBookingCard from "@/components/ProductBookingCard";
import ProductGallery from "@/components/ProductGallery";
import { LineIcon, type IconKind } from "@/components/LineIcon";
import HomeReviews from "@/components/HomeReviews";
import "../../home.css";
import "./product.css";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

const WP_UPLOADS_BASE = "https://wp.heavenlygiggles.com/wp-content/uploads";

const testimonials = [
  {
    quote: "We rented a jumping castle and what a treat! The boys had more fun jumping than in the swimming pool. Equipment was in immaculate condition and easy to operate.",
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

const heroReviewIndex: Record<string, number> = {
  "standard-jumping-castle-4m-x-4m": 2,
  "jumping-castle-slide-7m-x-4m": 1,
  "inflatable-water-slide-7m-x-1m": 0,
};

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP ?? "27827713949";
const WA_LINK = `https://wa.me/${WHATSAPP}?text=Hi%2C%20I%27d%20like%20to%20book%20a%20jumping%20castle!`;

function fullSizeImage(url: string) {
  return url.replace(/-\d+x\d+(\.\w+)$/, "$1");
}

function stripEmoji(value: string) {
  return value.replace(/\p{Extended_Pictographic}[\uFE0F\u200D\p{Extended_Pictographic}]*/gu, "").replace(/\s{2,}/g, " ").trim();
}

function toneIcon(index: number): IconKind {
  return ["bolt", "heart", "cushion", "calendar", "cup", "sun"][index % 6] as IconKind;
}

function labelIcon(label: string): IconKind {
  const value = label.toLowerCase();
  if (value.includes("delivery")) return "truck";
  if (value.includes("grass") || value.includes("setting")) return "garden";
  if (value.includes("water") || value.includes("hose")) return "water";
  if (value.includes("identification") || value.includes("id")) return "id";
  if (value.includes("safety") || value.includes("hygiene")) return "shield";
  if (value.includes("payment")) return "calendar";
  if (value.includes("indemnity") || value.includes("warning")) return "warning";
  if (value.includes("signature")) return "balloon";
  return "sparkle";
}

export async function generateStaticParams() {
  return rentalProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getRentalProduct(slug);

  if (!product) return buildMetadata({ title: "Product Not Found", path: `/product/${slug}` });

  return buildMetadata({
    title: `${product.name} Rental & Hire Fourways`,
    description: product.summary,
    path: `/product/${product.slug}`,
  });
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getRentalProduct(slug);

  if (!product) notFound();

  const price = product.price;
  const benefits: Array<{ title?: string; text: string }> =
    "reasons" in product && product.reasons
      ? product.reasons
      : "descriptionBullets" in product && product.descriptionBullets
        ? product.descriptionBullets
        : [];
  const heroReview = testimonials[heroReviewIndex[product.slug] ?? 0];
  const heroQuote = heroReview.quote.split(/(?<=[.!])\s/)[0];
  const infoRows = [
    ...(product.additionalSectionRows ?? []).map((row) => ({
      label: stripEmoji(row.label),
      icon: labelIcon(row.label),
      body: row.body.map((paragraph) => stripEmoji(paragraph)),
    })),
    ...(product.requirementsRows ?? []).map((row) => ({
      label: stripEmoji(row.label),
      icon: labelIcon(row.label),
      body: [stripEmoji(row.value)],
    })),
  ];

  const knowRows = infoRows.slice(0, product.additionalSectionRows?.length ?? 0);

  return (
    <div className="product-page hg-home">
      <section id="product-hero" className="hg-hero product-hero">
        <div className="hg-hero-copy product-hero-copy">
          <p className="hg-badge">{stripEmoji(product.eyebrow || "Jumping Castle Hire & Rental Fourways")}</p>
          <h1 className="hg-hero-h1">
            {stripEmoji(product.heroTitle || product.name)}.
            {product.heroHighlight ? <><br /><span>{stripEmoji(product.heroHighlight)}.</span></> : null}
            {product.heroTitleSecondLine ? <><br />{stripEmoji(product.heroTitleSecondLine)}</> : null}
          </h1>
          {product.heroLead ? <p className="hg-hero-sub">{stripEmoji(product.heroLead)}</p> : null}
          <div className="hg-hero-price">
            <strong>From <span className="hg-hero-price-amount">{price}</span> for the whole weekend.</strong>
            <span>Because <strong>mums deserve two days off,</strong> not one.</span>
          </div>
          <div className="hg-actions product-hero-actions">
            <ProductBookingCard slug={product.slug} name={product.name} showSupportCta={false} />
            <Link href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-hg-secondary">
              WhatsApp
            </Link>
          </div>
          <p className="hg-hero-proof">
            <span className="hg-stars" role="img" aria-label="5 out of 5 stars">★★★★★</span>
            &ldquo;{heroQuote}&rdquo; <strong>{heroReview.name.split(" ")[0]}, Fourways</strong>
          </p>
        </div>

        <ProductGallery name={product.name} mainSrc={fullSizeImage(product.image)} angles={product.angles ?? []} />
      </section>

      <section className="hg-strip">
        <div className="hg-container hg-why">
          <ul className="hg-why-list">
            <li><LineIcon kind="truck" className="hg-why-icon" /><div><p>Free Delivery to Fourways</p><p>Flat R120 for the rest of Johannesburg.</p></div></li>
            <li><LineIcon kind="wrench" className="hg-why-icon" /><div><p>Setup &amp; Takedown Included</p><p>We set up, secure and collect.</p></div></li>
            <li><LineIcon kind="shield" className="hg-why-icon" /><div><p>SABS Safety Checked</p><p>Cleaned, sanitised and safety checked.</p></div></li>
          </ul>
        </div>
      </section>

      {knowRows.length ? (
        <section className="hg-section product-know-section">
          <div className="hg-container">
            <div className="hg-section-header">
              <h2>What to Know Before We Arrive</h2>
              <p>Everything that helps the weekend run smoothly.</p>
            </div>
            <ul className="product-know-grid">
              {knowRows.map((row) => (
                <li key={row.label} className="product-know-item">
                  <h3>{row.label}</h3>
                  <div>
                    {row.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="hg-section hg-section-brand product-benefits-section">
        <div className="hg-container">
          <div className="hg-section-header">
            <h2>{"benefitsHeading" in product && product.benefitsHeading ? stripEmoji(product.benefitsHeading) : "Why Kids Love It (and Parents Do Too)"}</h2>
            {"benefitsIntro" in product && product.benefitsIntro ? <p>{stripEmoji(product.benefitsIntro)}</p> : null}
          </div>
          <div className="hg-benefit-grid product-benefits-grid">
            {benefits.map((item, index) => (
              <article key={`${index}-${item.text}`} className="hg-benefit">
                <div className="hg-benefit-icon"><LineIcon kind={toneIcon(index)} /></div>
                <h3>{stripEmoji(item.title ?? "")}</h3>
                <p>{stripEmoji(item.text)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {product.rentalColumns?.length ? (
        <section className="hg-section hg-section-mint product-rental-section">
          <div className="hg-container">
            <div className="hg-section-header">
              <h2>Rental Information</h2>
              <p>Everything you need to know before booking.</p>
            </div>
            <ul className="product-rental-columns">
              {product.rentalColumns.map((column) => (
                <li key={column.label} className="product-rental-column">
                  <LineIcon kind={column.icon} className="product-rental-icon" />
                  <h3>{column.label}</h3>
                  <p>{column.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <HomeReviews className="product-reviews-section" />

      <section className="hg-section hg-section-mint hg-section-cta product-cta-section">
        <div className="hg-container hg-cta">
          <div>
            <h2>Ready to Make Their Day?</h2>
            <p>Choose your dates and leave the fun to us.</p>
            <p className="product-cta-reassurance">Every hire is for the whole weekend, with setup and collection included.</p>
          </div>
          <div className="hg-actions product-hero-actions product-cta-actions">
            <ProductBookingCard slug={product.slug} name={product.name} showSupportCta={false} />
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-hg-secondary">
              Speak to Us on WhatsApp
            </a>
          </div>
        </div>
      </section>




    </div>
  );
}
