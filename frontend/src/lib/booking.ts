const blockedDatesByProduct: Record<string, string[]> = {
  "standard-jumping-castle-4m-x-4m": ["2026-04-04", "2026-04-11", "2026-04-18"],
  "jumping-castle-slide-7m-x-4m": ["2026-04-05", "2026-04-12"],
  "inflatable-water-slide-7m-x-1m": ["2026-04-04", "2026-04-19"],
};

function padDatePart(value: number) {
  return String(value).padStart(2, "0");
}

const selectableHolidayDates = new Set([
  "2026-01-01",
  "2026-03-21",
  "2026-04-03",
  "2026-04-06",
  "2026-04-27",
  "2026-05-01",
  "2026-06-15",
  "2026-06-16",
  "2026-08-09",
  "2026-08-10",
  "2026-09-24",
  "2026-12-16",
  "2026-12-25",
  "2026-12-26",
  "2027-01-01",
  "2027-03-21",
  "2027-03-22",
  "2027-03-26",
  "2027-03-29",
  "2027-04-26",
  "2027-04-27",
  "2027-05-01",
  "2027-06-16",
  "2027-08-09",
  "2027-09-24",
  "2027-12-16",
  "2027-12-25",
  "2027-12-26",
]);

export function getBlockedDates(slug: string) {
  return blockedDatesByProduct[slug] ?? [];
}

export function isHolidayDate(date: string) {
  return selectableHolidayDates.has(date);
}

export function isWeekendDate(date: string) {
  const day = new Date(`${date}T00:00:00`).getDay();
  return day === 0 || day === 6;
}

export function isBookableDate(date: string) {
  if (!date) return false;

  return isWeekendDate(date) || isHolidayDate(date);
}

export function isDateAvailable(slug: string, date: string) {
  if (!date) return false;

  return isBookableDate(date) && !getBlockedDates(slug).includes(date);
}

export function formatBookingDate(date: string) {
  if (!date) return "";

  const parsed = new Date(`${date}T00:00:00`);
  return parsed.toLocaleDateString("en-ZA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getBookingRange(date: string) {
  if (!date) {
    return { from: "", to: "" };
  }

  const parsed = new Date(`${date}T00:00:00`);
  const day = parsed.getDay();

  if (day === 6 || day === 0) {
    const from = new Date(parsed);
    const to = new Date(parsed);

    if (day === 6) {
      from.setDate(from.getDate() - 1);
      to.setDate(to.getDate() + 2);
    }

    if (day === 0) {
      from.setDate(from.getDate() - 2);
      to.setDate(to.getDate() + 1);
    }

    return {
      from: toDateKey(from),
      to: toDateKey(to),
    };
  }

  return {
    from: date,
    to: date,
  };
}

export function toDateKey(date: Date) {
  return `${date.getFullYear()}-${padDatePart(date.getMonth() + 1)}-${padDatePart(date.getDate())}`;
}

export function getTomorrowDateString() {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return toDateKey(date);
}

export function getNextBookableDateString(fromDate = getTomorrowDateString()) {
  const cursor = new Date(`${fromDate}T00:00:00`);

  for (let i = 0; i < 730; i += 1) {
    const dateKey = toDateKey(cursor);

    if (isBookableDate(dateKey)) {
      return dateKey;
    }

    cursor.setDate(cursor.getDate() + 1);
  }

  return fromDate;
}
