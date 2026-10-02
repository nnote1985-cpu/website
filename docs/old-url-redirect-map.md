# แผน redirect URL เว็บเดิม → เว็บใหม่

ดึงจาก Wayback Machine เมื่อ 2026-10-02
- `sitemap_index.xml` ของเว็บเดิม (สำเนา 10 ก.ค. 2025) มี sitemap ย่อย 7 ไฟล์ รวม **52 URL** (ตาราง A)
- CDX API ของ Wayback เจอ URL อื่นที่ไม่อยู่ใน sitemap อีก **115 URL** จากเว็บรุ่นเก่ากว่า (ตาราง B) จัดเป็นกฎแบบกลุ่ม

ทุกรายการเป็น redirect ถาวร (308 ซึ่ง Google ถือเท่ากับ 301) ยังไม่ได้ใส่ในโค้ด รอ Note ตรวจตารางก่อน

สัญลักษณ์ในคอลัมน์หมายเหตุ
- **ตรง** = มีหน้าใหม่ที่เป็นเนื้อหาเดียวกัน
- **เดา** = ไม่มีหน้าตรงกัน ชี้ไปหน้าที่ใกล้ที่สุด
- **ปิดอยู่** = หน้ารายละเอียดโครงการนี้ถูกปิดด้วยสวิตช์แอดมิน (ตอนนี้เป็น 404) จึงชี้ไปหน้ารายการโครงการแทน ถ้าเปิดสวิตช์ภายหลังควรเปลี่ยนปลายทางเป็นหน้าโครงการ

## ตาราง A: URL จาก sitemap เดิม (52)

### บทความ (post-sitemap, 6)

| URL เดิม | ปลายทางใหม่ | หมายเหตุ |
|---|---|---|
| /มาตรการช่วยค่าไฟรับ-covid-19-รอ/ | /news | เดา: ไม่มีบทความนี้แล้ว |
| /ธอส-เดินหน้าโครงการบ้าน/ | /news/home-loan-guide-2024 | เดา: บทความสินเชื่อ ธอส. ที่ใกล้ที่สุด |
| /promotion-asakan-ครบรอบ-21ปี-wela-condo-รามคำแหง-186-เ/ | /promotion | เดา: โปรโมชันเก่าหมดแล้ว |
| /เวล่า-รามคำแหง-186-คอนโดเปิ/ | /projects/wela-ramkhamhaeng | ตรง: บทความเปิดตัว WELA |
| /เวล่า-รามคำแหง-186-คอนโด-low-rise-โค/ | /projects/wela-ramkhamhaeng | ตรง: บทความ WELA |
| /ส่องศักยภาพทําเลรามคํา/ | /news/ramkhamhaeng-area-analysis-2024 | ตรง: วิเคราะห์ทำเลรามคำแหง |

### หน้าทั่วไป (page-sitemap, 12)

| URL เดิม | ปลายทางใหม่ | หมายเหตุ |
|---|---|---|
| / | / | ไม่ต้อง redirect |
| /about/ | /about | ไม่ต้อง redirect (Next ตัด / ท้ายให้เอง) |
| /contact/ | /contact | ไม่ต้อง redirect |
| /news/ | /news | ไม่ต้อง redirect |
| /promotion/ | /promotion | ไม่ต้อง redirect |
| /theceline/ | /theceline | ปิดอยู่: ตอนนี้ 404 เสนอชี้ไป /projects ชั่วคราว |
| /backup/ | / | เดา: หน้าสำรองของเว็บเดิม |
| /project/ | /projects | ตรง |
| /past-projects/ | /projects?status=sold-out | ตรง |
| /new-project/ | /projects | เดา |
| /elysiumram/ | /projects | ปิดอยู่: Elysium Ram Interchange |
| /asakan-elysium-phahol-59/ | /elysium59 | ตรง |

### โครงการ (projects-sitemap, 11)

| URL เดิม | ปลายทางใหม่ | หมายเหตุ |
|---|---|---|
| /projects/ | /projects | ไม่ต้อง redirect |
| /projects/wela-ramkhamhaeng/ | /projects/wela-ramkhamhaeng | ไม่ต้อง redirect |
| /projects/asakan-city-phase-b/ | /projects?status=sold-out | ปิดอยู่ |
| /projects/asakan-city-phase-c/ | /projects?status=sold-out | ปิดอยู่ |
| /projects/asakan-place-twin-condo/ | /projects?status=sold-out | ปิดอยู่ |
| /projects/asakan-tower-srinakarin/ | /projects?status=sold-out | ปิดอยู่ |
| /projects/asakan-place-ลาดพร้าว/ | /projects?status=sold-out | ปิดอยู่ และ slug ใหม่ในฐานข้อมูลมีช่องว่างท้าย |
| /projects/asakan-place-รามคำแหงวงแหวน/ | /projects?status=sold-out | ปิดอยู่ (หน้าใหม่ /projects/asakan-place-ramkhamhang) |
| /projects/asakan-place/ | /projects?status=sold-out | เดา: แบรนด์รวม Asakan Place |
| /projects/elysiumram/ | /projects | ปิดอยู่: Elysium Ram Interchange |
| /projects/theceline/ | /projects | ปิดอยู่: The Celine |

### หมวดบทความ (category-sitemap, 2)

| URL เดิม | ปลายทางใหม่ | หมายเหตุ |
|---|---|---|
| /category/บทความให้ความรู้/ | /news | ตรง |
| /category/โปรโมชั่น/ | /promotion | ตรง |

### สถานะโครงการ (project-status-sitemap, 2)

| URL เดิม | ปลายทางใหม่ | หมายเหตุ |
|---|---|---|
| /project-status/current-project/ | /projects?status=active | ตรง |
| /project-status/sold-out/ | /projects?status=sold-out | ตรง |

### แบรนด์ (brand-sitemap, 17)

| URL เดิม | ปลายทางใหม่ | หมายเหตุ |
|---|---|---|
| /brand/wela-by-asakan/ | /projects/wela-ramkhamhaeng | ตรง |
| /brand/wela-ramkhamhaeng/ | /projects/wela-ramkhamhaeng | ตรง |
| /brand/asakan-elysium-phahol-59-station/ | /elysium59 | ตรง |
| /brand/asakan-elysium/ | /projects | เดา: แบรนด์รวม Elysium มีสองโครงการ |
| /brand/asakan-elysium-ram-interchange/ | /projects | ปิดอยู่ |
| /brand/the-celine/ | /projects | ปิดอยู่ |
| /brand/the-celine-bang-chan-station/ | /projects | ปิดอยู่ |
| /brand/asakan-city/ | /projects?status=sold-out | เดา: แบรนด์รวม |
| /brand/asakan-city-phase-b/ | /projects?status=sold-out | ปิดอยู่ |
| /brand/asakan-city-phase-c/ | /projects?status=sold-out | ปิดอยู่ |
| /brand/asakan-place/ | /projects?status=sold-out | เดา: แบรนด์รวม |
| /brand/asakan-place-asakan-place/ | /projects?status=sold-out | เดา |
| /brand/asakan-place-twin-condo/ | /projects?status=sold-out | ปิดอยู่ |
| /brand/asakan-place-รามคำแหงวงแหวน/ | /projects?status=sold-out | ปิดอยู่ |
| /brand/asakan-place-ลาดพร้าว/ | /projects?status=sold-out | ปิดอยู่ |
| /brand/asakan-tower/ | /projects?status=sold-out | เดา: แบรนด์รวม |
| /brand/asakan-tower-srinakarin/ | /projects?status=sold-out | ปิดอยู่ |

### ผู้เขียน (author-sitemap, 2)

| URL เดิม | ปลายทางใหม่ | หมายเหตุ |
|---|---|---|
| /author/nateet-champgmail-com/ | /news | เดา |
| /author/san15981/ | /news | เดา |

## ตาราง B: URL เก่าอื่นจาก Wayback (115) ใช้กฎแบบกลุ่ม

| รูปแบบ URL เดิม | ตัวอย่าง | ปลายทางใหม่ | หมายเหตุ |
|---|---|---|---|
| /th/... (ทุกอย่าง, 54 URL) | /th/the-rik, /th/tag/luxury | / | เดา: เนื้อหาตัวอย่างของธีมเก่า ไม่เกี่ยวกับโครงการปัจจุบัน |
| /&lt;เลข&gt;-...-/details.html, product.html, gallery.html (28) | /185030-asakan-city-phase-b/details.html | /projects?status=sold-out | เดา: หน้าโครงการเว็บรุ่นแรก |
| /1908-about-us/pages.html | | /about | ตรง |
| /1909-project/pages.html | | /projects | ตรง |
| /1939-register/pages.html | | /contact | เดา |
| /contactus.html, /thank-you/ | | /contact | ตรง / เดา |
| /index.html, /index.php, /home/ | | / | ตรง |
| /member/, /assetcare/, /elysium59/ | | หน้าเดิม | ไม่ต้อง redirect |
| /birthday/, /discount/, /insurance/ | | /member/birthday, /member/discount, /member/insurance | ตรง |
| /friends/ | | /member/fgf | ตรง |
| /gift-*, /voucher-* (14), /member/Booking/Booking.php | | /member | เดา: ระบบบัตรของขวัญเดิม |
| /projects/elysium59/, /projects/asakan-elysium-phahol-59-station/ | | /elysium59 | ตรง |
| /projects/asakan-tower-ramkhamhaeng/, /brand/asakan-tower-ramkhamhaeng/ | | /projects?status=sold-out | เดา: ไม่มีโครงการนี้ในเว็บใหม่ |
| /projects/page/2/ | | /projects | ตรง |
| /cdn-cgi/l/email-protection | | ไม่ต้องทำ | ของ Cloudflare |

## ที่ต้องการให้ Note ตัดสิน

1. โครงการที่ปิดหน้ารายละเอียดอยู่ (The Celine, Elysium Ram Interchange และโครงการ sold-out) ให้ชี้ไปหน้ารายการโครงการตามตารางนี้ไปก่อน หรือจะเปิดหน้ารายละเอียดแล้วชี้ตรง
2. URL ที่ขึ้นต้นด้วย /th/ เป็นบทความตัวอย่างภาษาอังกฤษจากธีมเก่า เสนอให้ชี้หน้าแรกทั้งหมด
