import type { Metadata } from "next";
import { getPageBySlug } from "@/lib/wordpress";
import { buildMetadata, extractPlainText } from "@/lib/seo";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    return buildMetadata({ title: "Page Not Found", path: `/${slug}` });
  }

  return buildMetadata({
    title: extractPlainText(page.title.rendered) || "Page",
    description: extractPlainText(page.excerpt.rendered || page.content.rendered),
    path: `/${slug}`,
  });
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) notFound();

  const content = page.content.rendered
    .replace(/<header[^>]*class="[^"]*tve_lp_header[^"]*"[^>]*>[\s\S]*?<\/header>/gi, "")
    .replace(/<footer[^>]*class="[^"]*tve_lp_footer[^"]*"[^>]*>[\s\S]*?<\/footer>/gi, "")
    .replace(/<div[^>]*class="[^"]*(thrv-hide-mobile|tve_hide_m|tve_hide_t)[^"]*"[^>]*>[\s\S]*?<\/div>/gi, "");

  return (
    <div className="wp-page">
      <div className="wp-page-inner">
        <h1 dangerouslySetInnerHTML={{ __html: page.title.rendered }} />
        <div className="wp-content" dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
}
