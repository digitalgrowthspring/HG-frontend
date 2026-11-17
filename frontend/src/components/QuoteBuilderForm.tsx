"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ProductBookingCard from "@/components/ProductBookingCard";
import { getRentalProduct } from "@/app/rentals/products";
import { formatBookingDate, getBookingRange } from "@/lib/booking";
import { formatCurrency, getDeliveryQuote } from "@/lib/checkout";

interface QuoteBuilderFormProps {
  products: { slug: string; name: string }[];
}

const QUOTE_DAYS = "2";

export default function QuoteBuilderForm({ products }: QuoteBuilderFormProps) {
  const router = useRouter();
  const [product, setProduct] = useState(products[0]?.slug ?? "");
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [suburb, setSuburb] = useState("Fourways");
  const [city, setCity] = useState("Johannesburg");
  const [postalCode, setPostalCode] = useState("2191");
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");
  const [isPending, setIsPending] = useState(false);

  const selected = getRentalProduct(product);
  const hire = Number(selected?.price.replace(/[^\d.]/g, "") ?? 0);
  const delivery = postalCode.trim().length === 4 && city.trim() ? getDeliveryQuote(postalCode, city) : null;
  const range = date ? getBookingRange(date) : null;
  const weekendLabel =
    range && range.from && range.to && range.from !== range.to
      ? `${formatBookingDate(range.from)} to ${formatBookingDate(range.to)}`
      : date
        ? formatBookingDate(date)
        : "";

  async function save(event: React.FormEvent) {
    event.preventDefault();
    setIsPending(true);
    setMessage("");

    try {
      const response = await fetch("/api/quote-builder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // The quote and its date hold run for the same two days.
        body: JSON.stringify({ product, date, name, days: QUOTE_DAYS, email, phone, address, suburb, city, postalCode, notes }),
      });
      const result = (await response.json()) as { ok: boolean; message?: string; quotePath?: string };

      if (!result.ok || !result.quotePath) {
        setMessage(result.message ?? "Couldn’t save the quote.");
        return;
      }

      // Saving opens the branded quote with its unique link.
      router.push(result.quotePath);
    } catch {
      setMessage("Couldn’t reach the local server. Is `next dev` running?");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form id="quote-form" className="checkout-form" onSubmit={save}>
      <div className="checkout-layout quote-fit">
        <div className="quote-col">
          <section className="checkout-section">
            <h2>Booking</h2>
            <div className="checkout-form-grid">
              <label className="checkout-field checkout-field-full">
                <span>Inflatable</span>
                <select
                  value={product}
                  onChange={(event) => {
                    setProduct(event.target.value);
                    setDate("");
                  }}
                  required
                >
                  {products.map((option) => (
                    <option key={option.slug} value={option.slug}>{option.name}</option>
                  ))}
                </select>
              </label>
              <div className="checkout-field checkout-field-full">
                <span>Weekend (Friday to Monday, same calendar as the website)</span>
                <ProductBookingCard
                  key={product}
                  slug={product}
                  name={selected?.name ?? ""}
                  showSupportCta={false}
                  onDateSelect={setDate}
                />
              </div>
            </div>
          </section>

          <section className="checkout-section">
            <h2>Client details</h2>
            <div className="checkout-form-grid">
              <label className="checkout-field">
                <span>Full name</span>
                <input type="text" value={name} onChange={(event) => setName(event.target.value)} maxLength={80} />
              </label>
              <label className="checkout-field">
                <span>Phone</span>
                <input type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} />
              </label>
              <label className="checkout-field checkout-field-full">
                <span>Email (optional now, needed at payment)</span>
                <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
              </label>
              <label className="checkout-field checkout-field-full">
                <span>Notes for the booking (optional)</span>
                <textarea rows={2} value={notes} onChange={(event) => setNotes(event.target.value)} />
              </label>
            </div>
          </section>

        </div>

        <div className="quote-col">
          <section className="checkout-section">
            <h2>Delivery address</h2>
            <div className="checkout-form-grid">
              <label className="checkout-field checkout-field-full">
                <span>Street address</span>
                <input type="text" value={address} onChange={(event) => setAddress(event.target.value)} required />
              </label>
              <label className="checkout-field">
                <span>Suburb / area</span>
                <input type="text" value={suburb} onChange={(event) => setSuburb(event.target.value)} />
              </label>
              <label className="checkout-field">
                <span>City</span>
                <input type="text" value={city} onChange={(event) => setCity(event.target.value)} />
              </label>
              <label className="checkout-field">
                <span>Postal code</span>
                <input type="text" inputMode="numeric" maxLength={4} value={postalCode} onChange={(event) => setPostalCode(event.target.value)} required />
              </label>
            </div>
          </section>

        <aside className="checkout-summary">
          <div className="checkout-summary-card">
            {selected ? (
              <div className="checkout-summary-product">
                <Image src={selected.image} alt={selected.name} width={120} height={90} className="checkout-summary-image" />
                <div>
                  <strong>{selected.name}</strong>
                  <span>{selected.size}</span>
                </div>
              </div>
            ) : null}

            <div className="checkout-summary-dates">
              <span>Selected weekend</span>
              <strong>{weekendLabel || "Pick a weekend above"}</strong>
            </div>

            <dl className="checkout-summary-rows">
              <div>
                <dt>Weekend hire</dt>
                <dd>{formatCurrency(hire)}</dd>
              </div>
              <div>
                <dt>Delivery</dt>
                <dd>{delivery?.supported ? formatCurrency(delivery.deliveryTotal) : "—"}</dd>
              </div>
              <div className="checkout-summary-total">
                <dt>Total</dt>
                <dd>{formatCurrency(hire + Number(delivery?.supported ? delivery.deliveryTotal : 0))}</dd>
              </div>
            </dl>

            {message ? <p role="alert" className="checkout-field-error">{message}</p> : null}

            <button type="submit" form="quote-form" disabled={isPending || !date} className="checkout-btn-primary checkout-btn-block">
              {isPending ? "Saving…" : "Save quote and get link"}
            </button>
            <p className="checkout-summary-note">
              The quote link holds the weekend for 2 days, until the client pays.
            </p>
          </div>
        </aside>
        </div>
      </div>
    </form>
  );
}
