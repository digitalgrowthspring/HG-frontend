import Image from "next/image";

const WP_UPLOADS_BASE = "https://wp.heavenlygiggles.com/wp-content/uploads";

export const testimonials = [
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

function Review({ review }: { review: (typeof testimonials)[number] }) {
  return (
    <figure className="hg-review">
      <div className="hg-stars" role="img" aria-label="5 out of 5 stars">★★★★★</div>
      <blockquote>&ldquo;{review.quote}&rdquo;</blockquote>
      <figcaption>
        <Image src={review.image} alt="" width={56} height={56} className="hg-review-image" />
        <span>
          <strong>{review.name}</strong>
          {review.tag}
        </span>
      </figcaption>
    </figure>
  );
}

export default function HomeReviews({ className = "" }: { className?: string }) {
  return (
    <section className={`hg-section hg-section-flush${className ? ` ${className}` : ""}`}>
      <div className="hg-container">
        <div className="hg-section-header">
          <h2>Don&apos;t Just Take Our Word for It</h2>
        </div>
        <div className="hg-reviews">
          {testimonials.map((t) => (
            <Review key={t.name} review={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
