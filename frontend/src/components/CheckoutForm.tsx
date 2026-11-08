"use client";

import { useEffect, useState, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { calculateOrderTotal, formatCurrency, getDeliveryQuote, isJohannesburgCity, type CheckoutFormValues, type CheckoutSubmissionResult } from "@/lib/checkout";
import { getRentalProduct } from "@/app/rentals/products";

interface CheckoutFormProps {
  initialValues: CheckoutFormValues;
  windowLabel: string;
}

const emptyErrors: Partial<Record<keyof CheckoutFormValues, string>> = {};

export default function CheckoutForm({ initialValues, windowLabel }: CheckoutFormProps) {
  const [formValues, setFormValues] = useState(initialValues);
  const [fieldErrors, setFieldErrors] = useState(emptyErrors);
  const [submitMessage, setSubmitMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const [couponCode, setCouponCode] = useState(initialValues.couponCode || "");
  const [coupon, setCoupon] = useState<{ code: string; discount: number } | null>(null);
  const [couponMessage, setCouponMessage] = useState("");
  const [isCouponPending, setIsCouponPending] = useState(false);
  const router = useRouter();
  const product = getRentalProduct(formValues.product);
  const deliveryQuote = getDeliveryQuote(formValues.postalCode, formValues.city);
  const estimatedTotal = product ? calculateOrderTotal(product.price, formValues.postalCode, formValues.city, coupon?.discount ?? 0) : "0.00";

  useEffect(() => {
    try {
      const storedDetails = sessionStorage.getItem("hg-checkout-details");
      if (!storedDetails) return;

      const parsedDetails = JSON.parse(storedDetails) as Partial<Pick<CheckoutFormValues, "fullName" | "email" | "phone" | "addressLine1" | "suburb" | "city" | "postalCode" | "notes">>;
      setFormValues((current) => ({ ...current, ...parsedDetails }));
    } catch {
      // Ignore unavailable or malformed session storage.
    }
  }, []);

  function updateField<K extends keyof CheckoutFormValues>(field: K, value: CheckoutFormValues[K]) {
    setFormValues((current) => ({ ...current, [field]: value }));
    setFieldErrors((current) => ({ ...current, [field]: undefined }));
  }

  function saveCheckoutDetails() {
    try {
      sessionStorage.setItem(
        "hg-checkout-details",
        JSON.stringify({
          fullName: formValues.fullName,
          email: formValues.email,
          phone: formValues.phone,
          addressLine1: formValues.addressLine1,
          suburb: formValues.suburb,
          city: formValues.city,
          postalCode: formValues.postalCode,
          notes: formValues.notes,
        }),
      );
    } catch {
      // Continue navigation if session storage is unavailable.
    }
  }

  async function applyCoupon() {
    const code = couponCode.trim();

    if (!code) {
      setCoupon(null);
      setCouponMessage("Please enter a voucher code.");
      return;
    }

    setIsCouponPending(true);
    setCouponMessage("");

    try {
      const params = new URLSearchParams({ code, product: formValues.product });
      const response = await fetch(`/api/coupon?${params.toString()}`);
      const result = (await response.json()) as { ok: boolean; code?: string; discount?: number; message?: string };

      if (!response.ok || !result.ok || typeof result.discount !== "number" || !result.code) {
        setCoupon(null);
        setCouponMessage(result.message || "That voucher could not be applied.");
        return;
      }

      setCoupon({ code: result.code, discount: result.discount });
      setCouponMessage(`Voucher applied: −${formatCurrency(result.discount)}`);
      setFormValues((current) => ({ ...current, couponCode: result.code }));
    } catch {
      setCoupon(null);
      setCouponMessage("We couldn’t check that voucher right now. Please try again.");
    } finally {
      setIsCouponPending(false);
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitMessage("");

    const nextErrors: Partial<Record<keyof CheckoutFormValues, string>> = {};

    if (!formValues.fullName.trim()) {
      nextErrors.fullName = "Please enter your full name.";
    }

    if (!formValues.phone.trim()) {
      nextErrors.phone = "Please enter a phone number so we can coordinate delivery.";
    }

    if (!formValues.email.trim()) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!formValues.addressLine1.trim()) {
      nextErrors.addressLine1 = "Please enter the delivery address.";
    }

    if (!formValues.city.trim()) {
      nextErrors.city = "Please enter the city.";
    } else if (!isJohannesburgCity(formValues.city)) {
      nextErrors.city = "Sorry, we’re currently only servicing Johannesburg addresses.";
    }

    if (!/^\d{4}$/.test(formValues.postalCode.trim())) {
      nextErrors.postalCode = "Please enter a valid 4-digit postal code.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors((current) => ({ ...current, ...nextErrors }));
      setSubmitMessage(nextErrors.city || nextErrors.postalCode || "Please fix the highlighted details and try again.");
      return;
    }

    startTransition(async () => {
      let result: CheckoutSubmissionResult & { payfast?: { action: string; fields: [string, string][] } };

      try {
        const response = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formValues),
        });

        result = (await response.json()) as CheckoutSubmissionResult & { payfast?: { action: string; fields: [string, string][] } };

        if (!response.ok || !result.ok) {
          setFieldErrors(result.fieldErrors ?? emptyErrors);
          setSubmitMessage(result.message || "We couldn’t start the booking yet.");
          return;
        }
      } catch {
        setSubmitMessage("Our booking system isn’t responding right now. Please try again in a few minutes, or WhatsApp us to book.");
        return;
      }

      setFieldErrors(emptyErrors);
      setSubmitMessage(result.message || "Booking created.");

      if (result.payfast) {
        const payfastForm = document.createElement("form");
        payfastForm.method = "POST";
        payfastForm.action = result.payfast.action;

        for (const [name, value] of result.payfast.fields) {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = name;
          input.value = value;
          payfastForm.appendChild(input);
        }

        document.body.appendChild(payfastForm);
        saveCheckoutDetails();
        payfastForm.submit();
      } else if (result.checkoutUrl) {
        saveCheckoutDetails();
        window.location.href = result.checkoutUrl;
      }
    });
  }

  function handleChangeDates() {
    saveCheckoutDetails();

    const bookingParams = new URLSearchParams({
      date: formValues.date,
      area: formValues.area,
      notes: formValues.notes || "",
    });
    router.push(`/book/${formValues.product}?${bookingParams.toString()}`);
  }

  return (
    <div className="checkout-layout">
      <form id="checkout-details-form" className="checkout-form" onSubmit={handleSubmit}>
        <fieldset className="checkout-section">
          <legend>Your Details</legend>
          <div className="checkout-form-grid">
            <label className="checkout-field checkout-field-full">
              <span>Full Name</span>
              <input
                type="text"
                value={formValues.fullName}
                onChange={(event) => updateField("fullName", event.target.value)}
                placeholder="Your full name"
              />
              {fieldErrors.fullName ? <small className="checkout-field-error">{fieldErrors.fullName}</small> : null}
            </label>

            <label className="checkout-field">
              <span>Email Address</span>
              <input
                type="email"
                value={formValues.email}
                onChange={(event) => updateField("email", event.target.value)}
                placeholder="Email address"
              />
              {fieldErrors.email ? <small className="checkout-field-error">{fieldErrors.email}</small> : null}
            </label>

            <label className="checkout-field">
              <span>Phone Number</span>
              <input
                type="tel"
                value={formValues.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                placeholder="Phone number"
              />
              {fieldErrors.phone ? <small className="checkout-field-error">{fieldErrors.phone}</small> : null}
            </label>

          </div>
        </fieldset>

        <fieldset className="checkout-section">
          <legend>Delivery Address</legend>
          <div className="checkout-form-grid">
            <label className="checkout-field checkout-field-full">
              <span>Street Address</span>
              <input
                type="text"
                value={formValues.addressLine1}
                onChange={(event) => updateField("addressLine1", event.target.value)}
                placeholder="House number and street name"
              />
              {fieldErrors.addressLine1 ? <small className="checkout-field-error">{fieldErrors.addressLine1}</small> : null}
            </label>

            <label className="checkout-field">
              <span>Suburb / Area</span>
              <input
                type="text"
                value={formValues.suburb}
                onChange={(event) => updateField("suburb", event.target.value)}
                placeholder="Fourways"
              />
              {fieldErrors.suburb ? <small className="checkout-field-error">{fieldErrors.suburb}</small> : null}
            </label>

            <label className="checkout-field">
              <span>City</span>
              <input
                type="text"
                value={formValues.city}
                onChange={(event) => updateField("city", event.target.value)}
                placeholder="Johannesburg"
              />
              {fieldErrors.city ? <small className="checkout-field-error">{fieldErrors.city}</small> : null}
            </label>

            <label className="checkout-field">
              <span>Postal Code</span>
              <input
                type="text"
                inputMode="numeric"
                maxLength={4}
                value={formValues.postalCode}
                onChange={(event) => updateField("postalCode", event.target.value.replace(/[^\d]/g, "").slice(0, 4))}
                placeholder="2191"
              />
              {fieldErrors.postalCode ? <small className="checkout-field-error">{fieldErrors.postalCode}</small> : null}
            </label>


            <label className="checkout-field checkout-field-full">
              <span>Anything Else We Should Know? (optional)</span>
              <textarea
                rows={2}
                value={formValues.notes || ""}
                onChange={(event) => updateField("notes", event.target.value)}
                placeholder="Gate code, parking notes, setup access, anything helpful."
              />
            </label>
          </div>
        </fieldset>

        {submitMessage ? <p className="checkout-submit-message">{submitMessage}</p> : null}

      </form>

      <aside className="checkout-summary">
        <div className="checkout-summary-card">
          {product ? (
            <div className="checkout-summary-product">
              <Image src={product.image} alt={product.name} width={120} height={90} className="checkout-summary-image" />
              <div>
                <h2>{product.name}</h2>
                <p>{product.size}</p>
              </div>
            </div>
          ) : null}

          <div className="checkout-summary-dates">
            <span>Selected weekend</span>
            <strong>{windowLabel}</strong>
            <button type="button" onClick={handleChangeDates} className="checkout-change-dates">
              Change dates
            </button>
          </div>

          <dl className="checkout-summary-rows">
            <div>
              <dt>Weekend hire</dt>
              <dd>{product?.price ?? ""}</dd>
            </div>
            <div>
              <dt>Delivery</dt>
              <dd>{formValues.postalCode.trim() ? formatCurrency(deliveryQuote.deliveryTotal) : "—"}</dd>
            </div>
            {coupon ? (
              <div>
                <dt>Voucher</dt>
                <dd>−{formatCurrency(coupon.discount)}</dd>
              </div>
            ) : null}
            <div className="checkout-summary-total">
              <dt>Total</dt>
              <dd>{formatCurrency(estimatedTotal)}</dd>
            </div>
          </dl>
          <label className="checkout-field checkout-field-full checkout-voucher">
            <span>Voucher code</span>
            <input
              type="text"
              value={couponCode}
              onChange={(event) => {
                setCouponCode(event.target.value);
                setCoupon(null);
                setCouponMessage("");
                setFormValues((current) => ({ ...current, couponCode: event.target.value }));
              }}
              placeholder="Enter voucher code"
            />
            <button type="button" className="checkout-btn-primary" onClick={applyCoupon} disabled={isCouponPending}>
              {isCouponPending ? "Checking..." : "Apply"}
            </button>
            {couponMessage ? <small className={coupon ? "checkout-submit-message" : "checkout-field-error"}>{couponMessage}</small> : null}
          </label>
          <button type="submit" form="checkout-details-form" className="checkout-btn-primary checkout-btn-block" disabled={isPending}>
            {isPending ? "Starting Booking..." : "Continue to Payment"}
          </button>
          <p className="checkout-summary-note">Payment is taken on the next step. Your booking is only confirmed once payment is complete.</p>
        </div>
      </aside>
    </div>
  );
}
