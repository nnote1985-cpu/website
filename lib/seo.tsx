import type { Metadata } from 'next';

const SITE_URL = 'https://www.asakan.co.th';
const SITE_NAME = 'ASAKAN';

// 1200x630 brand card used wherever a page has no image of its own
export const DEFAULT_OG_IMAGE = { url: '/images/og-image.jpg', width: 1200, height: 630, alt: SITE_NAME };

// Next merges metadata shallowly, so a page that sets openGraph or twitter replaces the
// root ones whole. Build both completely per page so each share card keeps its own
// title, url, image, locale and site name.
export function pageMetadata({
  title, description, path, keywords, ogTitle, ogDescription, image, type = 'website',
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  image?: { url: string; width?: number; height?: number; alt?: string } | null;
  type?: 'website' | 'article';
}): Metadata {
  const shareTitle = ogTitle ?? title;
  const shareDescription = ogDescription ?? description;
  const shareImage = image?.url ? image : DEFAULT_OG_IMAGE;
  return {
    title: { absolute: title },
    description,
    ...(keywords && { keywords }),
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: 'th_TH',
      siteName: SITE_NAME,
      url: path,
      title: shareTitle,
      description: shareDescription,
      images: [shareImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: shareTitle,
      description: shareDescription,
      images: [shareImage.url],
    },
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export { SITE_URL };
