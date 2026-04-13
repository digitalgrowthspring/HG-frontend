"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
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

interface ProductBookingCardProps {
  slug: string;
  name: string;
  showSupportCta?: boolean;
}

function addMonths(date: Date, months: number) {
  return new Date(date.getFullYear(), date.getMonth() + months, 1);
}

function getMonthDays(monthDate: Date) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const startWeekday = (firstDay.getDay() + 6) % 7;
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

function getCanonicalBookingDate(date: string) {
  if (!date) return "";

  const parsed = new Date(`${date}T00:00:00`);
  const day = parsed.getDay();

  if (day === 0) {
    parsed.setDate(parsed.getDate() - 1);
  }

  return toDateKey(parsed);
}

function getWeekendRange(date: string) {
  if (!date) return [date].filter(Boolean);

  const canonicalDate = getCanonicalBookingDate(date);
  const parsed = new Date(`${canonicalDate}T00:00:00`);
  const day = parsed.getDay();

  if (day === 6) {
    const nextDay = new Date(parsed);
    nextDay.setDate(parsed.getDate() + 1);
    return [canonicalDate, toDateKey(nextDay)];
  }

  return [canonicalDate];
}

function formatShortDate(date: string) {
  if (!date) return "";

  return new Date(`${date}T00:00:00`).toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "short",
  });
}

function getTriggerLabel(date: string) {
  if (!date) return "Select dates";

  const bookingRange = getBookingRange(date);

  if (bookingRange.from && bookingRange.to && bookingRange.from !== bookingRange.to) {
    return `Weekend hire: ${formatShortDate(bookingRange.from)} - ${formatShortDate(bookingRange.to)}`;
  }

  return formatBookingDate(date);
}

export default function ProductBookingCard({
  slug,
  name,
  showSupportCta = true,
}: ProductBookingCardProps) {
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const minDate = getTomorrowDateString();
  const firstBookableDate = getNextBookableDateString(minDate);
  const blockedDates = useMemo(() => getBlockedDates(slug), [slug]);
  const [selectedDate, setSelectedDate] = useState("");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(() => new Date(`${firstBookableDate}T00:00:00`));

  const monthCells = getMonthDays(calendarMonth);
  const prevMonth = addMonths(calendarMonth, -1);
  const canGoPrev = prevMonth >= new Date(`${minDate}T00:00:00`);
  const selectedRange = selectedDate ? getWeekendRange(selectedDate) : [];
  const normalizedSelectedDate = selectedDate ? getCanonicalBookingDate(selectedDate) : "";
  const isAvailable = selectedRange.length > 0
    ? selectedRange.every((date) => isDateAvailable(slug, date))
    : false;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setIsCalendarOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsCalendarOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  function goToCheckout(date: string) {
    const checkoutParams = new URLSearchParams({
      product: slug,
      date,
      area: "Fourways",
      notes: "",
    });

    router.push(`/checkout?${checkoutParams.toString()}`);
  }

  return (
    <div className="product-booking-card" ref={wrapperRef}>
      <label className="product-booking-field">
        <span className="product-booking-label">Rental dates</span>
        <button
          type="button"
          className={`product-booking-trigger${isCalendarOpen ? " is-open" : ""}`}
          onClick={() => {
            if (!isCalendarOpen && normalizedSelectedDate && isAvailable) {
              goToCheckout(normalizedSelectedDate);
              return;
            }

            setIsCalendarOpen((current) => !current);
          }}
          aria-expanded={isCalendarOpen}
          aria-haspopup="dialog"
        >
          <span>{getTriggerLabel(selectedDate)}</span>
          <strong>
            {isCalendarOpen ? "▲" : selectedDate && isAvailable ? "Continue →" : "▼"}
          </strong>
        </button>
      </label>

      {isCalendarOpen ? (
        <div className="product-booking-calendar" role="dialog" aria-label="Rental date picker">
          <div className="product-booking-calendar-header">
            <button
              type="button"
              className="product-booking-nav"
              onClick={() => setCalendarMonth(prevMonth)}
              disabled={!canGoPrev}
              aria-label="Show previous month"
            >
              ←
            </button>
            <strong>{getMonthLabel(calendarMonth)}</strong>
            <button
              type="button"
              className="product-booking-nav"
              onClick={() => setCalendarMonth(addMonths(calendarMonth, 1))}
              aria-label="Show next month"
            >
              →
            </button>
          </div>

          <div className="product-booking-weekdays" aria-hidden="true">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>

          <div className="product-booking-grid">
            {monthCells.map((date, index) => {
              if (!date) {
                return <span key={`empty-${index}`} className="product-booking-empty" />;
              }

              const blocked = blockedDates.includes(date);
              const holiday = isHolidayDate(date);
              const bookable = isBookableDate(date);
              const isPast = isBeforeMinDate(date, minDate);
              const rangeDates = getWeekendRange(date);
              const rangeHasWeekend = rangeDates.length === 2;
              const rangeBlocked = rangeDates.some((rangeDate) => blockedDates.includes(rangeDate));
              const rangePast = rangeDates.some((rangeDate) => isBeforeMinDate(rangeDate, minDate));
              const disabled = rangeHasWeekend ? rangeBlocked || rangePast || !bookable : blocked || isPast || !bookable;
              const weekendBlocked = rangeHasWeekend && rangeBlocked;
              const booked = blocked || weekendBlocked;
              const inSelectedRange = selectedRange.includes(date);
              const isRangeStart = selectedRange[0] === date;
              const isRangeEnd = selectedRange[selectedRange.length - 1] === date;

              return (
                <button
                  key={date}
                  type="button"
                  className={`product-booking-day${inSelectedRange ? " is-selected" : ""}${weekendBlocked ? " is-weekend-blocked" : ""}${booked ? " is-booked" : ""}${isPast || rangePast ? " is-past" : ""}${!bookable ? " is-weekday" : ""}${holiday ? " is-holiday" : ""}${inSelectedRange ? " is-range" : ""}${isRangeStart ? " is-range-start" : ""}${isRangeEnd ? " is-range-end" : ""}`}
                  onClick={() => {
                    setSelectedDate(getCanonicalBookingDate(date));
                    setIsCalendarOpen(false);
                  }}
                  disabled={disabled}
                  aria-pressed={inSelectedRange}
                  aria-label={`${formatBookingDate(date)}${holiday ? " holiday" : ""}${booked ? " booked" : disabled ? " unavailable" : " available"}${rangeHasWeekend ? " weekend booking" : ""}`}
                >
                  <span>{new Date(`${date}T00:00:00`).getDate()}</span>
                </button>
              );
            })}
          </div>

          <div className="product-booking-legend" aria-hidden="true">
            <span><i className="product-booking-legend-swatch product-booking-legend-swatch-weekend" /> Weekend</span>
            <span><i className="product-booking-legend-swatch product-booking-legend-swatch-holiday" /> Public holiday</span>
            <span><i className="product-booking-legend-swatch product-booking-legend-swatch-booked" /> Booked</span>
            <span><i className="product-booking-legend-swatch product-booking-legend-swatch-unavailable" /> Unavailable</span>
          </div>
        </div>
      ) : null}

      <div className={`product-booking-status${selectedDate ? (isAvailable ? " is-available" : " is-unavailable") : ""}`}>
        {!selectedDate ? (
          <p>Weekends and public holidays only.</p>
        ) : isAvailable ? (
          <p>
            Weekend available for <strong>{name}</strong>. Tap the pink bar to continue.
          </p>
        ) : (
          <p>
            {isBookableDate(selectedDate)
              ? "That weekend is not fully available."
              : "This booking widget only allows weekends or public holidays."}
          </p>
        )}
      </div>

      {showSupportCta ? (
        <div className="product-hero-ctas product-hero-ctas-booking">
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP ?? "27828228864"}?text=${encodeURIComponent(`Hi, I have a question about the ${name}.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-product-secondary"
          >
            Speak to Us on WhatsApp
          </a>
        </div>
      ) : null}
    </div>
  );
}
