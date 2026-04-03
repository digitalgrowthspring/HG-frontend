"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getRentalProduct } from "@/app/rentals/products";
import {
  formatBookingDate,
  getBookingRange,
  getBlockedDates,
  getNextBookableDateString,
  getTomorrowDateString,
  isBookableDate,
  isDateAvailable,
  isHolidayDate,
  toDateKey,
} from "@/lib/booking";
import "./book.css";

function addMonths(date: Date, months: number) {
  return new Date(date.getFullYear(), date.getMonth() + months, 1);
}

function getMonthDays(monthDate: Date) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const startWeekday = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: Array<string | null> = [];

  for (let i = 0; i < startWeekday; i += 1) {
    cells.push(null);
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const current = new Date(year, month, day);
    cells.push(toDateKey(current));
  }

  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  return cells;
}

function getMonthLabel(monthDate: Date) {
  return monthDate.toLocaleDateString("en-ZA", {
    month: "long",
    year: "numeric",
  });
}

function isBeforeMinDate(date: string, minDate: string) {
  return date < minDate;
}

function getWeekendPartnerDate(date: string) {
  if (!date) return "";

  const parsed = new Date(`${date}T00:00:00`);
  const day = parsed.getDay();

  if (day === 6) {
    parsed.setDate(parsed.getDate() + 1);
    return toDateKey(parsed);
  }

  if (day === 0) {
    parsed.setDate(parsed.getDate() - 1);
    return toDateKey(parsed);
  }

  return "";
}

export default function BookProductPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const product = getRentalProduct(params.slug);
  const [selectedDate, setSelectedDate] = useState("");
  const [area, setArea] = useState("Fourways");
  const [notes, setNotes] = useState("");
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const tomorrow = getTomorrowDateString();
    const firstBookableDate = getNextBookableDateString(tomorrow);
    return new Date(`${firstBookableDate}T00:00:00`);
  });

  if (!product) {
    return (
      <div className="booking-page">
        <section className="booking-shell booking-shell-light">
          <div className="hg-container">
            <div className="booking-empty">
              <h1>Product Not Found</h1>
              <p>We couldn’t find that inflatable. Head back to rentals and we’ll get you sorted.</p>
              <Link href="/rentals" className="booking-link-back">
                Back to Rentals
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const blockedDates = getBlockedDates(product.slug);
  const minDate = getTomorrowDateString();
  const isAvailable = selectedDate ? isDateAvailable(product.slug, selectedDate) : false;
  const canContinue = Boolean(selectedDate && isAvailable);
  const bookingRange = selectedDate ? getBookingRange(selectedDate) : { from: "", to: "" };
  const weekendPartnerDate = selectedDate ? getWeekendPartnerDate(selectedDate) : "";
  const hasWeekendWindow = Boolean(
    selectedDate &&
    bookingRange.from &&
    bookingRange.to &&
    bookingRange.from !== bookingRange.to,
  );
  const monthCells = getMonthDays(calendarMonth);
  const prevMonth = addMonths(calendarMonth, -1);
  const canGoPrev = prevMonth >= new Date(`${minDate}T00:00:00`);
  const checkoutParams = new URLSearchParams({
    product: product.slug,
    date: selectedDate,
    area,
    notes,
  });
  const checkoutHref = `/checkout?${checkoutParams.toString()}`;

  return (
    <div className="booking-page">
      <section className="booking-hero">
        <div className="hg-container">
          <div className="booking-hero-inner">
            <div className="booking-hero-copy">
              <p className="booking-badge">{product.name}</p>
              <h1>Book Your Date First</h1>
              <p className="booking-sub">
                Pick the date that best matches your party, check if it&apos;s open, and then head straight into checkout. Weekend bookings carry the full Friday to Monday hire window with them.
              </p>
              <div className="booking-points">
                <span>Weekend hire from {product.price}</span>
                <span>Free delivery in Fourways</span>
                <span>Setup included</span>
              </div>
            </div>
            <div className="booking-hero-image-wrap">
              <Image src={product.image} alt={product.name} width={640} height={460} className="booking-hero-image" priority fetchPriority="high" sizes="(max-width: 768px) 100vw, 640px" />
            </div>
          </div>
        </div>
      </section>

      <section className="booking-shell booking-shell-light">
        <div className="hg-container">
          <div className="booking-grid">
            <div className="booking-card booking-card-form">
              <p className="booking-card-kicker">Step 1</p>
              <h2>Choose Your Date</h2>
              <p className="booking-card-intro">
                Weekend dates are available by default, and we also allow official holiday dates when they fall on a weekday. Tap a Saturday or Sunday and we&apos;ll carry the full Friday to Monday hire window into checkout.
              </p>
              <p className="booking-card-helper">Tap a weekend date to book the full weekend. Public holidays can be booked as single dates.</p>

              <label className="booking-field">
                <span>Booking Date</span>
                <div className="booking-calendar" role="group" aria-label="Booking calendar">
                  <div className="booking-calendar-header">
                    <button
                      type="button"
                      className="booking-calendar-nav"
                      onClick={() => setCalendarMonth(prevMonth)}
                      disabled={!canGoPrev}
                      aria-label="Show previous month"
                    >
                      Previous
                    </button>
                    <strong>{getMonthLabel(calendarMonth)}</strong>
                    <button
                      type="button"
                      className="booking-calendar-nav"
                      onClick={() => setCalendarMonth(addMonths(calendarMonth, 1))}
                      aria-label="Show next month"
                    >
                      Next
                    </button>
                  </div>

                  <div className="booking-calendar-weekdays" aria-hidden="true">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                      <span key={day}>{day}</span>
                    ))}
                  </div>

                  <div className="booking-calendar-grid">
                    {monthCells.map((date, index) => {
                      if (!date) {
                        return <span key={`empty-${index}`} className="booking-calendar-empty" />;
                      }

                      const blocked = blockedDates.includes(date);
                      const holiday = isHolidayDate(date);
                      const weekend = !holiday && isBookableDate(date);
                      const bookable = isBookableDate(date);
                      const disabled = blocked || isBeforeMinDate(date, minDate) || !bookable;
                      const selected = selectedDate === date;
                      const selectedPartner = weekendPartnerDate === date;

                      return (
                        <button
                          key={date}
                          type="button"
                          className={`booking-calendar-day${selected ? " is-selected" : ""}${selectedPartner ? " is-selected-partner" : ""}${blocked ? " is-blocked" : ""}${!bookable ? " is-weekday" : ""}${holiday ? " is-holiday" : ""}${weekend ? " is-weekend" : ""}`}
                          onClick={() => setSelectedDate(date)}
                          disabled={disabled}
                          aria-pressed={selected}
                          aria-label={`${formatBookingDate(date)}${holiday ? " holiday" : ""}${blocked ? " unavailable" : bookable ? " available" : " weekday unavailable"}`}
                        >
                          <span>{new Date(`${date}T00:00:00`).getDate()}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="booking-calendar-legend">
                    <span><i className="booking-calendar-swatch booking-calendar-swatch-open" /> Available</span>
                    <span><i className="booking-calendar-swatch booking-calendar-swatch-holiday" /> Holiday</span>
                    <span><i className="booking-calendar-swatch booking-calendar-swatch-selected" /> Selected</span>
                    <span><i className="booking-calendar-swatch booking-calendar-swatch-weekday" /> Weekday blocked</span>
                    <span><i className="booking-calendar-swatch booking-calendar-swatch-blocked" /> Unavailable</span>
                  </div>
                </div>
                <input
                  type="date"
                  min={minDate}
                  value={selectedDate}
                  readOnly
                />
              </label>

              <p className="booking-field-note">
                Saturday and Sunday selections reserve the full weekend hire window: Friday delivery through Monday collection. Weekday holiday exceptions stay as single-date bookings for now.
              </p>

              <label className="booking-field">
                <span>Area</span>
                <select value={area} onChange={(event) => setArea(event.target.value)}>
                  <option>Fourways</option>
                  <option>Rest of Johannesburg</option>
                </select>
              </label>

              <label className="booking-field">
                <span>Notes for Delivery</span>
                <textarea
                  rows={4}
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  placeholder="Gate code, parking note, tricky driveway, birthday theme panic, anything helpful."
                />
              </label>

              <div className={`booking-status ${selectedDate ? (isAvailable ? "is-available" : "is-unavailable") : ""}`}>
                {!selectedDate ? (
                  <p>Choose a weekend or public holiday date to continue.</p>
                ) : isAvailable ? (
                  <p>
                    {hasWeekendWindow
                      ? (
                        <>
                          Weekend available for <strong>{product.name}</strong>. Hire runs from{" "}
                          <strong>{formatBookingDate(bookingRange.from)}</strong> to{" "}
                          <strong>{formatBookingDate(bookingRange.to)}</strong>.
                        </>
                      )
                      : (
                        <>
                          <strong>{formatBookingDate(selectedDate)}</strong> is available for{" "}
                          <strong>{product.name}</strong>.
                        </>
                      )}
                  </p>
                ) : (
                  <p>
                    {isBookableDate(selectedDate)
                      ? `${formatBookingDate(selectedDate)} is already taken for this inflatable. Try another weekend or holiday date and we’ll keep the peace.`
                      : `${formatBookingDate(selectedDate)} is a weekday, so bookings are limited to weekends and holiday dates.`}
                  </p>
                )}
              </div>

              <div className="booking-actions">
                <button
                  type="button"
                  className="booking-btn booking-btn-primary"
                  disabled={!canContinue}
                  onClick={() => router.push(checkoutHref)}
                >
                  {canContinue ? "Continue to Checkout" : "Select an Available Date"}
                </button>
                <Link
                  href={`https://wa.me/27828828864?text=${encodeURIComponent(`Hi, I need help booking the ${product.name}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="booking-btn booking-btn-secondary"
                >
                  Need Help? WhatsApp Us
                </Link>
              </div>
            </div>

            <div className="booking-card booking-card-summary">
              <p className="booking-card-kicker">Step 2</p>
              <h2>Your Booking Summary</h2>
              <div className="booking-summary-row">
                <span>Inflatable</span>
                <strong>{product.name}</strong>
              </div>
              <div className="booking-summary-row">
                <span>Price</span>
                <strong>{product.price} / weekend</strong>
              </div>
              <div className="booking-summary-row">
                <span>{hasWeekendWindow ? "Selected Day" : "Selected Date"}</span>
                <strong>{selectedDate ? formatBookingDate(selectedDate) : "Choose a date"}</strong>
              </div>
              <div className="booking-summary-row">
                <span>{hasWeekendWindow ? "Weekend Hire" : "Hire Window"}</span>
                <strong>
                  {selectedDate
                    ? `${formatBookingDate(bookingRange.from)} to ${formatBookingDate(bookingRange.to)}`
                    : "Choose a date"}
                </strong>
              </div>
              <div className="booking-summary-row">
                <span>Area</span>
                <strong>{area}</strong>
              </div>

              <div className="booking-summary-note">
                <h3>Availability Preview</h3>
                <p>
                  The calendar below is still using local placeholder blocked dates while we wire in the live availability source.
                </p>
                {blockedDates.length > 0 ? (
                  <ul>
                    {blockedDates.map((date) => (
                      <li key={date}>{formatBookingDate(date)}</li>
                    ))}
                  </ul>
                ) : null}
              </div>

              <div className="booking-summary-note">
                <h3>Booking Rules</h3>
                <p>Weekends are booked as full Friday to Monday hires. If an official holiday lands on a weekday, we keep that date selectable as a single-date exception.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
