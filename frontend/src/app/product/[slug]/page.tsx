import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { getRentalProduct, rentalProducts } from "@/app/rentals/products";
import ProductBookingCard from "@/components/ProductBookingCard";
import "./product.css";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return rentalProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getRentalProduct(slug);

  if (!product) {
    return buildMetadata({ title: "Product Not Found", path: `/product/${slug}` });
  }

  return buildMetadata({
    title: `${product.name} | Heavenly Giggles Fourways`,
    description: product.summary,
    path: `/product/${product.slug}`,
  });
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getRentalProduct(slug);

  if (!product) notFound();

  return (
    <div className="product-page">
      <section className="product-hero">
        <div className="product-hero-glow-1" />
        <div className="product-hero-glow-2" />
        <div className="hg-container">
          <div className="product-hero-top">
            <div className="product-hero-content">
              <p className="product-badge">
                {product.eyebrow || "Jumping Castle Hire & Rental Fourways"}
              </p>
              <h1>
                {product.heroTitle}{" "}
                {product.heroHighlight ? <span>{product.heroHighlight}</span> : null}
                {product.heroTitleSecondLine ? (
                  <>
                    <br />
                    {product.heroTitleSecondLine}
                  </>
                ) : null}
              </h1>
              <div className="product-hero-proof">
                {product.heroLead ? <p>{product.heroLead}</p> : null}
                {product.heroProofBullets ? (
                  <ul className="product-hero-proof-list">
                    {product.heroProofBullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
              <div className="product-hero-price">
                <strong>From {product.price} for the whole weekend.</strong>
              </div>
              <ProductBookingCard slug={product.slug} name={product.name} />
            </div>

            <div className="product-hero-image">
              <div className="product-hero-image-glow" />
              <div className="product-hero-image-wrap">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={700}
                  height={520}
                  className="product-hero-img"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        <div className="product-trustbar">
          <div className="hg-container product-trustbar-inner">
            <div className="product-trustitem">
              <span>🚚</span>
              <strong>Free Delivery to Fourways</strong>
            </div>
            <div className="product-trustitem">
              <span>🛠️</span>
              <strong>Setup &amp; Takedown Included</strong>
            </div>
            <div className="product-trustitem">
              <span>✔</span>
              <strong>SABS Safety Checked</strong>
            </div>
          </div>
        </div>
      </section>

      {("descriptionBullets" in product && product.descriptionBullets) || ("reasons" in product && product.reasons) ? (
        <section className="product-section product-section-light">
          <div className="hg-container">
            <div className="product-reasons">
              <div className="product-reasons-header">
                <h2>
                  {"benefitsHeading" in product && product.benefitsHeading
                    ? product.benefitsHeading
                    : `Why This ${product.name} Works So Well`}
                </h2>
              </div>

              <div className="product-reasons-intro">
                <p>
                  {"benefitsIntro" in product && product.benefitsIntro
                    ? product.benefitsIntro
                    : product.summary}
                </p>
              </div>

              <div className="product-reasons-grid">
                {"descriptionBullets" in product && product.descriptionBullets
                  ? product.descriptionBullets.map((item, index) => (
                      <article
                        key={item.text}
                        className={`product-reason-card ${[
                          "product-reason-card-gold",
                          "product-reason-card-pink",
                          "product-reason-card-teal",
                          "product-reason-card-purple",
                          "product-reason-card-pink",
                          "product-reason-card-teal",
                        ][index % 6]}`}
                      >
                        <div className="product-description-block-icon">{item.icon}</div>
                        <div className="product-description-block-copy">
                          {"title" in item && item.title ? <h3>{item.title}</h3> : null}
                          <p>{item.text}</p>
                        </div>
                      </article>
                    ))
                  : "reasons" in product &&
                    product.reasons &&
                    product.reasons.map((reason) => (
                      <article
                        key={reason.title}
                        className={`product-reason-card product-reason-card-${reason.tone}`}
                      >
                        <div className={`product-reason-icon product-reason-icon-${reason.tone}`}>{reason.icon}</div>
                        <h3>{reason.title}</h3>
                        <p>{reason.text}</p>
                      </article>
                    ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {"additionalSectionRows" in product && product.additionalSectionRows ? (
        <section className="product-section product-section-dark">
          <div className="hg-container">
            <div className="product-section-header product-section-header-centered">
              <h2>
                {"additionalSectionHeading" in product && product.additionalSectionHeading
                  ? product.additionalSectionHeading
                  : "What to Know Before We Arrive"}
              </h2>
              {"additionalSectionSubtitle" in product && product.additionalSectionSubtitle ? (
                <p>{product.additionalSectionSubtitle}</p>
              ) : null}
            </div>

            <div className="product-info-grid">
              {product.additionalSectionRows.map((row) => (
                <article key={row.label} className="product-info-card">
                  <div className="product-info-card-heading">
                    <span>{row.icon}</span>
                    <h3>{row.label}</h3>
                  </div>
                  <div className="product-info-card-copy">
                    {row.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {"requirementsRows" in product && product.requirementsRows ? (
        <section className="product-section product-section-light">
          <div className="hg-container">
            <div className="product-section-header product-section-header-centered product-section-header-compact">
              <h2>Rental Information</h2>
              {"requirementsSectionSubtitle" in product && product.requirementsSectionSubtitle ? (
                <p>{product.requirementsSectionSubtitle}</p>
              ) : null}
            </div>

            <div className="product-requirements-table">
              {product.requirementsRows.map((row, index) => (
                <div
                  key={`${row.label}-${index}`}
                  className="product-requirements-row"
                >
                  <div className="product-requirements-label">{row.label}</div>
                  <div className="product-requirements-value">{row.value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="product-section product-section-light">
          <div className="hg-container">
            {("additionalInfo" in product || "rentalInfo" in product) && (
              <div className="product-extra-info">
                <div className="product-extra-grid">
                  {"additionalInfo" in product && product.additionalInfo && (
                    <div className="product-extra-card product-extra-card-additional">
                      <p className="product-extra-kicker">Additional Info</p>
                      <h3>The practical details</h3>
                      <ul className="product-extra-list">
                        {product.additionalInfo.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {"rentalInfo" in product && product.rentalInfo && (
                    <div className="product-extra-card product-extra-card-rental">
                      <p className="product-extra-kicker">Rental Info</p>
                      <h3>How the hire works</h3>
                      <ul className="product-extra-list">
                        {product.rentalInfo.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
