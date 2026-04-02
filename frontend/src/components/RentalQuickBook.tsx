"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { RentalProduct } from "@/app/rentals/products";
import {
  formatBookingDate,
  getBlockedDates,
  getBookingRange,
  getNextBookableDateString,
  getTomorrowDateString,
  isBookableDate,
  isDateAvailable,
  isHolidayDate,
  toDateKey,
} from "@/lib/booking";

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
    cells.push(toDateKey(new Date(year, month, day)));
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

export default function RentalQuickBook({ product }: { product: RentalProduct }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const tomorrow = getTomorrowDateString();
    const firstBookableDate = getNextBookableDateString(tomorrow);
    return new Date(`${firstBookableDate}T00:00:00`);
  });

  const blockedDates = useMemo(() => getBlockedDates(product.slug), [product.slug]);
  const minDate = getTomorrowDateString();
  const monthCells = getMonthDays(calendarMonth);
  const prevMonth = addMonths(calendarMonth, -1);
  const canGoPrev = prevMonth >= new Date(`${minDate}T00:00:00`);
  const isAvailable = selectedDate ? isDateAvailable(product.slug, selectedDate) : false;
  const bookingRange = selectedDate ? getBookingRange(selectedDate) : { from: "", to: "" };
  const hasWeekendWindow = Boolean(
    selectedDate &&
    bookingRange.from &&
    bookingRange.to &&
    bookingRange.from !== bookingRange.to,
  );
  const weekendPartnerDate = selectedDate ? getWeekendPartnerDate(selectedDate) : "";

  function handleContinue() {
    if (!selectedDate || !isAvailable) {
      return;
    }

    const checkoutParams = new URLSearchParams({
      product: product.slug,
      date: selectedDate,
      area: "Fourways",
      notes: "",
    });

    router.push(`/checkout?${checkoutParams.toString()}`);
  }

  return (
    <div className="rental-quickbook">
      <button
        type="button"
        className="btn-rental"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
      >
        {isOpen ? "Hide Date Picker" : "Rent Online Now"}
      </button>

      {isOpen ? (
        <div className="rental-quickbook-panel">
          <p className="rental-quickbook-title">Choose your date</p>
          <p className="rental-quickbook-copy">
            Pick a weekend or holiday date here and head straight to checkout.
          </p>

          <div className="booking-calendar rental-booking-calendar" role="group" aria-label={`${product.name} booking calendar`}>
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
          </div>

          <div className={`booking-status rental-quickbook-status ${selectedDate ? (isAvailable ? "is-available" : "is-unavailable") : ""}`}>
            {!selectedDate ? (
              <p>Choose a weekend or public holiday date to continue.</p>
            ) : isAvailable ? (
              <p>
                {hasWeekendWindow
                  ? (
                    <>
                      Weekend hire runs from <strong>{formatBookingDate(bookingRange.from)}</strong> to{" "}
                      <strong>{formatBookingDate(bookingRange.to)}</strong>.
                    </>
                  )
                  : (
                    <>
                      <strong>{formatBookingDate(selectedDate)}</strong> is available.
                    </>
                  )}
              </p>
            ) : (
              <p>
                {isBookableDate(selectedDate)
                  ? `${formatBookingDate(selectedDate)} is already taken. Try another date.`
                  : `${formatBookingDate(selectedDate)} is a weekday, so bookings are limited to weekends and holiday dates.`}
              </p>
            )}
          </div>

          <button
            type="button"
            className="btn-rental rental-quickbook-submit"
            onClick={handleContinue}
            disabled={!isAvailable}
          >
            {isAvailable ? "Continue to Checkout" : "Select an Available Date"}
          </button>
        </div>
      ) : null}
    </div>
  );
}
