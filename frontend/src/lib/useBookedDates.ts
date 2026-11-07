"use client";

import { useEffect, useState } from "react";

export function useBookedDates(slug: string) {
  const [bookedDates, setBookedDates] = useState<string[]>([]);

  useEffect(() => {
    let isCurrent = true;

    fetch(`/api/availability?product=${encodeURIComponent(slug)}`)
      .then((response) => (response.ok ? response.json() : { bookedDates: [] }))
      .then((result: { bookedDates?: string[] }) => {
        if (isCurrent) {
          setBookedDates(result.bookedDates ?? []);
        }
      })
      .catch(() => undefined);

    return () => {
      isCurrent = false;
    };
  }, [slug]);

  return bookedDates;
}
