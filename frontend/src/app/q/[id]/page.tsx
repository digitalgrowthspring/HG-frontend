import { notFound, redirect } from "next/navigation";
import { getQuote } from "@/lib/quoteStore";

interface QuoteLinkPageProps {
  params: Promise<{ id: string }>;
}

// The unique quote link. It opens the branded quote; "Accept and pay" continues from there.
export default async function QuoteLinkPage({ params }: QuoteLinkPageProps) {
  const { id } = await params;
  const saved = await getQuote(id);

  if (!saved) {
    notFound();
  }

  redirect(`/quote/print?quote=${saved.token}`);
}
