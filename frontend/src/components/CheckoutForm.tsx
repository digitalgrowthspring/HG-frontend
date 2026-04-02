"use client";

import { useState, useTransition } from "react";
import { calculateOrderTotal, formatCurrency, getDeliveryQuote, type CheckoutFormValues, type CheckoutSubmissionResult } from "@/lib/checkout";
import { getRentalProduct } from "@/app/rentals/products";

interface CheckoutFormProps {
  initialValues: CheckoutFormValues;
}

const emptyErrors: Partial<Record<keyof CheckoutFormValues, string>> = {};

export default function CheckoutForm({ initialValues }: CheckoutFormProps) {
  const [formValues, setFormValues] = useState(initialValues);
  const [fieldErrors, setFieldErrors] = useState(emptyErrors);
  const [submitMessage, setSubmitMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const product = getRentalProduct(formValues.product);
  const deliveryQuote = getDeliveryQuote(formValues.postalCode, formValues.city);
  const estimatedTotal = product ? calculateOrderTotal(product.price, formValues.postalCode, formValues.city) : "0.00";

  function updateField<K extends keyof CheckoutFormValues>(field: K, value: CheckoutFormValues[K]) {
    setFormValues((current) => ({ ...current, [field]: value }));
    setFieldErrors((current) => ({ ...current, [field]: undefined }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitMessage("");

    startTransition(async () => {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });

      const result = (await response.json()) as CheckoutSubmissionResult;

      if (!response.ok || !result.ok) {
        setFieldErrors(result.fieldErrors ?? emptyErrors);
        setSubmitMessage(result.message || "We couldn’t start the booking yet.");
        return;
      }

      setFieldErrors(emptyErrors);
      setSubmitMessage(result.message || "Booking created.");

      if (result.checkoutUrl) {
        window.location.href = result.checkoutUrl;
      }
    });
  }

  return (
    <form id="checkout-details-form" className="checkout-form-grid" onSubmit={handleSubmit}>
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
        <span>Phone</span>
        <input
          type="tel"
          value={formValues.phone}
          onChange={(event) => updateField("phone", event.target.value)}
          placeholder="Phone number"
        />
        {fieldErrors.phone ? <small className="checkout-field-error">{fieldErrors.phone}</small> : null}
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

      <label className="checkout-field checkout-field-full">
        <span>Delivery Address</span>
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

      <div className="checkout-delivery-estimate checkout-field-full">
        <p className="checkout-delivery-estimate-label">Delivery</p>
        <strong>{formValues.postalCode.trim() ? deliveryQuote.deliveryLabel : "Enter your postal code to confirm delivery"}</strong>
        <span>
          {!deliveryQuote.supported && deliveryQuote.message
            ? deliveryQuote.message
            : formValues.postalCode.trim()
            ? `${formatCurrency(deliveryQuote.deliveryTotal)} delivery · Estimated total ${formatCurrency(estimatedTotal)}`
            : "WooCommerce currently gives free delivery for 2191 and R120 flat delivery across the wider Gauteng zone."}
        </span>
      </div>

      <label className="checkout-field checkout-field-full">
        <span>Anything Else We Should Know?</span>
        <textarea
          rows={4}
          value={formValues.notes || ""}
          onChange={(event) => updateField("notes", event.target.value)}
          placeholder="Gate code, parking notes, setup access, anything helpful."
        />
      </label>

      {submitMessage ? <p className="checkout-submit-message">{submitMessage}</p> : null}

      <div className="checkout-actions checkout-actions-inline checkout-field-full">
        <button type="submit" className="checkout-btn checkout-btn-primary" disabled={isPending || !deliveryQuote.supported}>
          {isPending ? "Starting Booking..." : "Place Booking"}
        </button>
      </div>
    </form>
  );
}
