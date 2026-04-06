import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0f1e4a] text-white">
      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-[#f4511e] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <div>
              <div className="font-bold text-xl leading-none">ASAKAN</div>
              <div className="text-xs text-gray-400 leading-none">อัสสกาญจน์</div>
            </div>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            ผู้พัฒนาอสังหาริมทรัพย์คุณภาพ กว่า 21 ปี <br />
            <em className="text-orange-400">"Your happiness is our hope"</em>
          </p>
          <div className="flex gap-3">
            <a
              href="https://www.facebook.com/Asakandevelopment"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700"
              aria-label="Facebook"
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a
              href="https://line.me/ti/p/~@asakan"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600"
              aria-label="LINE"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0C3.582 0 0 3.13 0 6.993c0 3.492 3.1 6.407 7.286 6.926l-.288 1.073c-.049.183.118.35.3.3l3.3-1.07C13.2 13.2 16 10.3 16 6.993 16 3.13 12.418 0 8 0z" />
              </svg>
            </a>
            <a
              href="mailto:info@asakan.co.th"
              className="w-9 h-9 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-500"
              aria-label="Email"
            >
              <Mail size={16} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-bold text-base mb-4 text-white">ลิงก์ด่วน</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            {[
              { label: 'หน้าแรก', href: '/' },
              { label: 'เกี่ยวกับเรา', href: '/about' },
              { label: 'โครงการทั้งหมด', href: '/projects' },
              { label: 'โปรโมชั่น', href: '/promotion' },
              { label: 'สมาชิก ASAKAN', href: '/member' },
              { label: 'AssetCare+', href: '/assetcare' },
              { label: 'ข่าวสาร', href: '/news' },
              { label: 'ติดต่อเรา', href: '/contact' },
            ].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-[#f4511e] transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Projects */}
        <div>
          <h3 className="font-bold text-base mb-4 text-white">โครงการของเรา</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            {[
              { label: 'Asakan Elysium Phahol-59', href: '/projects/elysium-phahol-59' },
              { label: 'Asakan Elysium Ram Interchange', href: '/projects/elysium-ram-interchange' },
              { label: 'The Celine Bang Chan Station', href: '/projects/the-celine-bang-chan' },
              { label: 'Wela Ramkhamhaeng', href: '/projects/wela-ramkhamhaeng' },
            ].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-[#f4511e] transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-bold text-base mb-4 text-white">ติดต่อเรา</h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li className="flex gap-2">
              <MapPin size={16} className="text-[#f4511e] flex-shrink-0 mt-0.5" />
              <span>191 ถนนรามคำแหง แขวงสะพานสูง เขตสะพานสูง กรุงเทพฯ 10240</span>
            </li>
            <li className="flex gap-2">
              <Phone size={16} className="text-[#f4511e] flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <a href="tel:0825265566" className="block hover:text-[#f4511e]">082-526-5566</a>
                <a href="tel:020599655" className="block hover:text-[#f4511e]">02-059-9655</a>
                <a href="tel:0991982940" className="block hover:text-[#f4511e]">099-198-2940</a>
              </div>
            </li>
            <li className="flex gap-2">
              <Mail size={16} className="text-[#f4511e] flex-shrink-0 mt-0.5" />
              <a href="mailto:info@asakan.co.th" className="hover:text-[#f4511e]">info@asakan.co.th</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-2">
          <p>© 2024 บริษัท อัสสกาญจน์ จำกัด (ASAKAN CO., LTD). All rights reserved.</p>
          <p>Developed with Next.js | SEO Optimized</p>
        </div>
      </div>
    </footer>
  );
}
