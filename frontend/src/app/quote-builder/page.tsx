import { redirect } from "next/navigation";

// The quote fill-in page now lives at /quote.
export default function QuoteBuilderRedirect() {
  redirect("/quote");
}
