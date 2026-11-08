export type IconKind =
  | "pin"
  | "phone"
  | "mail"
  | "clock"
  | "card"
  | "plug"
  | "bolt"
  | "smile"
  | "shield"
  | "calendar"
  | "truck"
  | "wrench"
  | "garden"
  | "water"
  | "id"
  | "warning"
  | "balloon"
  | "sparkle"
  | "castle"
  | "slide"
  | "home"
  | "cushion"
  | "cup"
  | "sun"
  | "heart";

export function LineIcon({ kind, className = "" }: { kind: IconKind; className?: string }) {
  const paths: Record<IconKind, string> = {
    bolt: "M13 2 4 13h6l-1 9 9-11h-6z",
    heart: "M20.8 8.8c0 5.2-8.8 10.2-8.8 10.2S3.2 14 3.2 8.8A4.8 4.8 0 0 1 12 6.1a4.8 4.8 0 0 1 8.8 2.7z",
    cushion: "M6 5h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zM8 8h8v8H8z",
    cup: "M5 4h12v7a6 6 0 0 1-12 0zM17 7h2a2 2 0 0 1 0 4h-2M8 21h8M12 17v4",
    sun: "M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z",
    truck: "M3 7h11v9H3zM14 10h4l3 3v3h-7zM7.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM17.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z",
    wrench: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",
    shield: "M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6zM9 12l2 2 4-4",
    smile: "M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0zM8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01",
    calendar: "M4 6h16v13H4zM4 10h16M8 3v4M16 3v4",
    home: "M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z",
    castle: "M3 21V9l3-3 3 3 3-3 3 3 3-3 3 3v12M3 21h18M7 21v-5h3v5M14 21v-5h3v5",
    slide: "M4 20h16M6 20l8-12h4M10 8h8M14 8V4h4v4",
    water: "M3 17c2.5-2 5.5-2 8 0s5.5 2 8 0M3 11c2.5-2 5.5-2 8 0s5.5 2 8 0M12 3v5",
    garden: "M12 21V9M12 13c-4 0-6-2-6-6 4 0 6 2 6 6zM12 10c0-4 2-6 6-6 0 4-2 6-6 6z",
    id: "M4 5h16v14H4zM8 9h3M8 13h8M14 9h2",
    warning: "M12 3 2.5 20h19zM12 9v5M12 17h.01",
    balloon: "M12 3a6 6 0 0 1 6 6c0 4-6 8-6 8s-6-4-6-8a6 6 0 0 1 6-6zM12 17v4M10 21h4",
    sparkle: "m12 3 1.5 6.5L20 11l-6.5 1.5L12 19l-1.5-6.5L4 11l6.5-1.5z",
    card: "M3 6h18v12H3zM3 10h18M7 15h4",
    pin: "M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
    phone: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z",
    mail: "M3 6h18v12H3zM3 7l9 6 9-6",
    clock: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3 2",
    plug: "M9 2v5M15 2v5M7 7h10v4a5 5 0 0 1-10 0zM12 16v6",
  };

  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d={paths[kind]} />
    </svg>
  );
}
