import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import LegalShell from "@/components/LegalShell";

export const metadata: Metadata = buildMetadata({
  title: "Terms & Conditions | Heavenly Giggles Jumping Castle Hire Fourways",
  description: "The terms that apply when you use the Heavenly Giggles website or book a jumping castle with us.",
  path: "/terms-conditions",
});

export default function TermsPage() {
  return (
    <LegalShell title="Terms & Conditions" date="March 2026" badge="Legal">
      <div className="legal-section">
        <p>
          These Terms &amp; Conditions apply to your use of the Heavenly Giggles website and to booking enquiries made with us. By using this site or placing a booking enquiry, you agree to these terms.
        </p>
      </div>

      <div className="legal-divider" />

      <div className="legal-section">
        <h2>Website Use</h2>
        <p>
          You agree to use this website only for lawful purposes and in a way that does not harm the website, interfere with other users, or misuse our content, branding, or contact channels.
        </p>
      </div>

      <div className="legal-section">
        <h2>Bookings and Availability</h2>
        <p>
          All bookings are subject to availability. A requested date is not confirmed until we confirm it directly with you through WhatsApp, email, or another agreed channel.
        </p>
        <p>
          Prices, delivery areas, and product availability may change from time to time.
        </p>
      </div>

      <div className="legal-section">
        <h2>Delivery and Setup</h2>
        <p>
          We deliver, set up, and collect our equipment in the agreed service area. You are responsible for making sure the site is reasonably accessible, safe, and suitable for setup.
        </p>
      </div>

      <div className="legal-section">
        <h2>Safety and Supervision</h2>
        <p>
          While we take safety seriously and provide equipment that is checked and maintained, adult supervision remains the customer&apos;s responsibility during use.
        </p>
      </div>

      <div className="legal-section">
        <h2>Payments and Cancellations</h2>
        <p>
          Payment arrangements are confirmed during the booking process. If you need to cancel or move a booking, please contact us as soon as possible so we can advise what options are available.
        </p>
      </div>

      <div className="legal-section">
        <h2>Intellectual Property</h2>
        <p>
          All text, branding, graphics, logos, and website content belong to Heavenly Giggles unless otherwise stated. You may not copy, republish, or commercially use our content without permission.
        </p>
      </div>

      <div className="legal-section">
        <h2>Privacy</h2>
        <p>
          Please read our <Link href="/privacy-policy">Privacy Policy</Link> to understand how we collect, use, and protect your information.
        </p>
      </div>

      <div className="legal-section">
        <h2>Website Information</h2>
        <p>
          We do our best to keep all website information accurate and up to date, but we cannot guarantee that every detail will always be error-free or immediately updated.
        </p>
      </div>

      <div className="legal-section">
        <h2>Liability</h2>
        <p>
          To the fullest extent permitted by law, Heavenly Giggles will not be liable for indirect or consequential loss arising from use of the website or reliance on website information. Nothing in these terms excludes liability where it cannot legally be excluded.
        </p>
      </div>

      <div className="legal-section">
        <h2>Changes to These Terms</h2>
        <p>
          We may update these Terms &amp; Conditions from time to time. Continued use of the website after updates means you accept the revised terms.
        </p>
      </div>

      <div className="legal-section">
        <h2>Governing Law</h2>
        <p>
          These terms are governed by the laws of South Africa.
        </p>
      </div>

      <div className="legal-section">
        <h2>Contact</h2>
        <p>
          For questions about these terms, email <a href="mailto:shaney@heavenlygiggles.com">shaney@heavenlygiggles.com</a> or message us on <a href="https://wa.me/27828228864" target="_blank" rel="noopener noreferrer">WhatsApp</a>.
        </p>
      </div>
    </LegalShell>
  );
}
