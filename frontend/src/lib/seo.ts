import type { Metadata } from "next";

export const SITE_URL = "https://heavenlygiggles.com";
export const SITE_NAME = "Heavenly Giggles";
const DEFAULT_DESCRIPTION =
  "Jumping castle and inflatable rentals in Fourways, Johannesburg. Free delivery, setup included. Kids jump. You relax. We handle the rest.";

function normalizeDescription(input?: string) {
  const cleaned = (input || DEFAULT_DESCRIPTION)
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return cleaned || DEFAULT_DESCRIPTION;
}

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL);
}

export function buildMetadata({
  title,
  description,
  path = "/",
}: {
  title: string;
  description?: string;
  path?: string;
}): Metadata {
  const normalizedDescription = normalizeDescription(description);
  const url = absoluteUrl(path);

  return {
    title,
    description: normalizedDescription,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description: normalizedDescription,
      url,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: normalizedDescription,
    },
  };
}

export function extractPlainText(html?: string) {
  return (html || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
