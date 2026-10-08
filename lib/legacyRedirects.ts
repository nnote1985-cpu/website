// Old WordPress / pre-WordPress URLs → closest page on the new site.
// Source of truth for review: docs/old-url-redirect-map.md
// Paths are written decoded (Thai as-is) and without the trailing slash;
// next.config.ts registers each one in its raw and percent-encoded forms.

const SOLD_OUT = '/projects?status=sold-out';

export const LEGACY_REDIRECTS: [source: string, destination: string][] = [
  // Articles (post-sitemap)
  ['/มาตรการช่วยค่าไฟรับ-covid-19-รอ', '/news'],
  ['/ธอส-เดินหน้าโครงการบ้าน', '/news/home-loan-guide-2024'],
  ['/promotion-asakan-ครบรอบ-21ปี-wela-condo-รามคำแหง-186-เ', '/promotion'],
  ['/เวล่า-รามคำแหง-186-คอนโดเปิ', '/projects/wela-ramkhamhaeng'],
  ['/เวล่า-รามคำแหง-186-คอนโด-low-rise-โค', '/projects/wela-ramkhamhaeng'],
  ['/ส่องศักยภาพทําเลรามคํา', '/news/ramkhamhaeng-area-analysis-2024'],

  // Pages (page-sitemap)
  ['/backup', '/'],
  ['/project', '/projects'],
  ['/past-projects', SOLD_OUT],
  ['/new-project', '/projects'],
  ['/elysiumram', '/projects'],
  ['/asakan-elysium-phahol-59', '/elysium59'],

  // Projects (projects-sitemap)
  ['/projects/asakan-city-phase-b', SOLD_OUT],
  ['/projects/asakan-city-phase-c', SOLD_OUT],
  ['/projects/asakan-place-twin-condo', SOLD_OUT],
  ['/projects/asakan-tower-srinakarin', SOLD_OUT],
  ['/projects/asakan-place-ลาดพร้าว', SOLD_OUT],
  ['/projects/asakan-place-รามคำแหงวงแหวน', SOLD_OUT],
  ['/projects/asakan-place', SOLD_OUT],
  ['/projects/elysiumram', '/projects'],
  ['/projects/theceline', '/projects'],
  ['/projects/elysium59', '/elysium59'],
  ['/projects/asakan-elysium-phahol-59-station', '/elysium59'],
  ['/projects/asakan-tower-ramkhamhaeng', SOLD_OUT],
  ['/projects/page/2', '/projects'],

  // Categories, project status, authors
  ['/category/บทความให้ความรู้', '/news'],
  ['/category/โปรโมชั่น', '/promotion'],
  ['/project-status/current-project', '/projects?status=active'],
  ['/project-status/sold-out', SOLD_OUT],
  ['/author/nateet-champgmail-com', '/news'],
  ['/author/san15981', '/news'],

  // Brands (brand-sitemap)
  ['/brand/wela-by-asakan', '/projects/wela-ramkhamhaeng'],
  ['/brand/wela-ramkhamhaeng', '/projects/wela-ramkhamhaeng'],
  ['/brand/asakan-elysium-phahol-59-station', '/elysium59'],
  ['/brand/asakan-elysium', '/projects'],
  ['/brand/asakan-elysium-ram-interchange', '/projects'],
  ['/brand/the-celine', '/projects'],
  ['/brand/the-celine-bang-chan-station', '/projects'],
  ['/brand/asakan-city', SOLD_OUT],
  ['/brand/asakan-city-phase-b', SOLD_OUT],
  ['/brand/asakan-city-phase-c', SOLD_OUT],
  ['/brand/asakan-place', SOLD_OUT],
  ['/brand/asakan-place-asakan-place', SOLD_OUT],
  ['/brand/asakan-place-twin-condo', SOLD_OUT],
  ['/brand/asakan-place-รามคำแหงวงแหวน', SOLD_OUT],
  ['/brand/asakan-place-ลาดพร้าว', SOLD_OUT],
  ['/brand/asakan-tower', SOLD_OUT],
  ['/brand/asakan-tower-srinakarin', SOLD_OUT],
  ['/brand/asakan-tower-ramkhamhaeng', SOLD_OUT],

  // Older site generations (found via Wayback CDX)
  ['/1908-about-us/pages.html', '/about'],
  ['/1909-project/pages.html', '/projects'],
  ['/1939-register/pages.html', '/contact'],
  ['/contactus.html', '/contact'],
  ['/thank-you', '/contact'],
  ['/index.html', '/'],
  ['/index.php', '/'],
  ['/home', '/'],
  ['/birthday', '/member/birthday'],
  ['/discount', '/member/discount'],
  ['/insurance', '/member/insurance'],
  ['/friends', '/member/fgf'],
  ['/member/Booking/Booking.php', '/member'],

  // Found in Search Console 404 report (Oct 2026)
  ['/package', '/'],
  ['/cdn-cgi/l/email-protection', '/contact'],
];

// Whole groups of old URLs
export const LEGACY_PATTERN_REDIRECTS: [source: string, destination: string][] = [
  ['/th', '/'],
  ['/th/:path*', '/'],
  // First-generation project pages: /185030-asakan-city-phase-b/details.html, /2268-phase-a/show-product/1/product.html
  ['/:id(\\d+-[^/]*)/details.html', SOLD_OUT],
  ['/:id(\\d+-[^/]*)/show-product/:rest*', SOLD_OUT],
  ['/:id(\\d+-[^/]*)/show-gallery/:rest*', SOLD_OUT],
  ['/:page(gift-[^/]*|voucher-[^/]*)', '/member'],
  // WordPress REST API / upload paths still being crawled
  ['/wp-json/:path*', '/'],
  ['/wp-content/uploads/:path*', '/'],
  ['/wp-admin/:path*', '/'],
  // brand feed URLs (e.g. /brand/asakan-tower/feed/)
  ['/brand/:slug/feed', '/projects'],
  ['/brand/:slug/feed/:path*', '/projects'],
];
