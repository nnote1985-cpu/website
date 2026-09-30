export const contact = {
  phone: '099 198 2940',
  tel: '+66991982940',
  line: '@asakanelysium',
  lineUrl: 'https://line.me/ti/p/~@asakanelysium',
  email: 'asakanmkt@gmail.com',
  address: '191 ถนนรามคำแหง แขวงสะพานสูง เขตสะพานสูง กรุงเทพฯ 10240',
};

export type Project = {
  name: string; area: string; location: string; href: string; image: string;
  price: number; status: 'active' | 'coming-soon'; type: string; title: string;
};

// Content snapshot from the existing public homepage. Confirm prices before launch.
export const projects: Project[] = [
  { name: 'ASAKAN Elysium', title: 'Phahol 59', area: 'พหลโยธิน', location: '30 เมตร จาก BTS พหลโยธิน 59', href: '/elysium59', image: 'phahol', price: 2190000, status: 'active', type: 'HIGH-RISE RESIDENCE' },
  { name: 'The Celine', title: 'Bang Chan Station', area: 'บางชัน', location: 'ใกล้ MRT สถานีบางชัน', href: '/theceline', image: 'celine', price: 1420000, status: 'active', type: 'LOW-RISE RESIDENCE' },
  { name: 'Wela', title: 'Ramkhamhaeng', area: 'รามคำแหง', location: 'เชื่อมต่อรามคำแหงและ Airport Rail Link', href: '/projects/wela-ramkhamhaeng', image: 'wela', price: 1390000, status: 'active', type: 'LOW-RISE RESIDENCE' },
  { name: 'ASAKAN Elysium', title: 'Ram Interchange', area: 'รามคำแหง', location: 'ทำเลรามคำแหง เชื่อมต่อการเดินทางในเมือง', href: '/projects/elysium-ram-interchange', image: 'ram', price: 1390000, status: 'coming-soon', type: 'HIGH-RISE RESIDENCE' },
];

export const navigation = [
  { href: '#projects', label: 'โครงการของเรา', en: 'Our residences' },
  { href: '#living', label: 'ชีวิตที่นี่', en: 'The art of living' },
  { href: '#care', label: 'บริการดูแล', en: 'Always by your side' },
  { href: '#finance', label: 'วางแผนและติดต่อ', en: 'Your next chapter' },
];
