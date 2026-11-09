import Link from "next/link";
import Image from "next/image";
import { LineIcon } from "@/components/LineIcon";
import "../../home.css";
import "./return.css";

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP ?? "27827713949";
const WA_LINK = `https://wa.me/${WHATSAPP}?text=Hi%2C%20I%27d%20like%20to%20book%20a%20jumping%20castle!`;

type CheckoutReturnPageProps = {
  searchParams?: Promise<{ order?: string }>;
};

// Returning from PayFast does not confirm the booking. The notification does that.
export default async function CheckoutReturnPage({ searchParams }: CheckoutReturnPageProps) {
  const params = (await searchParams) ?? {};

  return (
    <div className="checkout-return-page hg-home">
      <section className="hg-hero">
        <div className="hg-hero-copy">
          <h1 className="hg-badge">Booking Received</h1>
          <h2 className="hg-hero-h1">Thanks, your weekend is <span>sorted.</span></h2>
          <p className="hg-hero-sub">PayFast is confirming your payment. Once it&apos;s verified we&apos;ll WhatsApp you to confirm the delivery time.</p>
          {params.order ? <p className="checkout-return-ref">Booking reference: HG-{params.order}</p> : null}
          <div className="hg-actions">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-hg-primary">
              WhatsApp Us
            </a>
            <Link href="/rentals" className="btn-hg-secondary">Back to Rentals</Link>
          </div>
        </div>
        <div className="hg-hero-photo">
          <Image
            src="/hero-castle-hd.webp"
            alt="Kids having fun on a jumping castle"
            width={3072}
            height={2048}
            className="hg-hero-img"
            priority
            fetchPriority="high"
            sizes="(max-width: 900px) 100vw, 50vw"
          />
        </div>
      </section>

      <section className="hg-strip">
        <div className="hg-container hg-why">
          <h2 className="checkout-return-next-title">What happens next</h2>
          <ul className="hg-why-list">
            <li>
              <LineIcon kind="truck" className="hg-why-icon" />
              <div><h3>We confirm on WhatsApp</h3><p>We&apos;ll message you to agree the delivery time.</p></div>
            </li>
            <li>
              <LineIcon kind="shield" className="hg-why-icon" />
              <div><h3>We set up on Friday</h3><p>We deliver, set up and secure everything for your weekend.</p></div>
            </li>
            <li>
              <LineIcon kind="calendar" className="hg-why-icon" />
              <div><h3>We collect on Monday</h3><p>We take everything away, so you don&apos;t have to.</p></div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
