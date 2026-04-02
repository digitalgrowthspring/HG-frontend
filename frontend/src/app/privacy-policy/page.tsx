import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import LegalShell from "@/components/LegalShell";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy | Heavenly Giggles Jumping Castle Hire Fourways",
  description: "How Heavenly Giggles collects, uses, and protects your information when you enquire or book with us.",
  path: "/privacy-policy",
});

export default function PrivacyPage() {
  return (
    <LegalShell title="Privacy Policy" date="March 2026" badge="Privacy">
      <div className="legal-section">
        <p>
          Heavenly Giggles respects your privacy. This page explains what information we collect, how we use it, and how we protect it when you browse our website, contact us, or book a jumping castle with us.
        </p>
      </div>

      <div className="legal-divider" />

      <div className="legal-section">
        <h2>Who We Are</h2>
        <p>
          Heavenly Giggles is a Fourways-based jumping castle hire business serving families across Fourways and greater Johannesburg.
        </p>
        <p>
          Email: <a href="mailto:shaney@heavenlygiggles.com">shaney@heavenlygiggles.com</a><br />
          WhatsApp: <a href="https://wa.me/27828828864" target="_blank" rel="noopener noreferrer">082 882 8864</a>
        </p>
      </div>

      <div className="legal-section">
        <h2>What We Collect</h2>
        <p>
          We may collect your name, phone number, email address, suburb or delivery area, booking date, and the rental details you send us when you enquire or book.
        </p>
        <p>
          We may also collect limited technical data such as browser type, device information, and page visits to help us improve the website experience.
        </p>
      </div>

      <div className="legal-section">
        <h2>How We Use Your Information</h2>
        <p>
          We use your information to respond to enquiries, confirm availability, manage bookings, arrange delivery and collection, and communicate important updates about your hire.
        </p>
        <p>
          We may also use website data to improve our content, understand how visitors use the site, and make the booking journey easier.
        </p>
      </div>

      <div className="legal-section">
        <h2>WhatsApp, Email, and Booking Enquiries</h2>
        <p>
          Most bookings are handled through WhatsApp or email. When you contact us, we keep the information needed to help you with your enquiry and manage your booking.
        </p>
        <p>
          We do not sell your personal information to third parties.
        </p>
      </div>

      <div className="legal-section">
        <h2>Payments</h2>
        <p>
          Payment details are shared only as needed to confirm and manage your booking. We do not store sensitive card information on this website.
        </p>
      </div>

      <div className="legal-section">
        <h2>Cookies and Analytics</h2>
        <p>
          Our website may use cookies or similar technologies to understand site performance, improve usability, and remember basic visitor preferences. You can control cookies through your browser settings.
        </p>
      </div>

      <div className="legal-section">
        <h2>How Long We Keep Information</h2>
        <p>
          We keep personal information only for as long as needed to manage enquiries, complete bookings, meet reasonable business record-keeping needs, and comply with applicable law.
        </p>
      </div>

      <div className="legal-section">
        <h2>Your Rights</h2>
        <p>
          Subject to applicable South African law, including POPIA, you may ask to access, correct, or delete your personal information, or object to certain uses of it.
        </p>
      </div>

      <div className="legal-section">
        <h2>Contact Us About Privacy</h2>
        <p>
          If you have any privacy-related questions, please email <a href="mailto:shaney@heavenlygiggles.com">shaney@heavenlygiggles.com</a> or message us on <a href="https://wa.me/27828828864" target="_blank" rel="noopener noreferrer">WhatsApp</a>.
        </p>
      </div>
    </LegalShell>
  );
}
