const BASE_URL =
  process.env.WORDPRESS_API_BASE_URL ||
  'https://wp.heavenlygiggles.com/wp-json/wp/v2';

export interface WPPost {
  id: number;
  date: string;
  slug: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
}

export async function getPosts(): Promise<WPPost[]> {
  const res = await fetch(`${BASE_URL}/posts?_embed`, {
    next: { revalidate: 60 }, // Cache for 60 seconds
  });
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }
  return res.json();
}

export async function getPageBySlug(slug: string): Promise<WPPost | null> {
  const res = await fetch(`${BASE_URL}/pages?slug=${slug}&_embed`);
  if (!res.ok) {
    throw new Error('Failed to fetch page');
  }
  const pages = await res.json();
  return pages[0] || null;
}

export async function getPages(): Promise<WPPost[]> {
  const res = await fetch(`${BASE_URL}/pages?_embed`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch pages');
  }
  return res.json();
}
