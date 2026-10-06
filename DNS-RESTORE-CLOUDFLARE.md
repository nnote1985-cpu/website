# ข้อมูลสำหรับ restore DNS กลับไป Cloudflare (asakan.co.th)

> ไฟล์นี้เก็บไว้ในเครื่องเท่านั้น (อยู่ใน .gitignore) ห้ามใส่รหัสผ่านหรือโทเค็นใดๆ
> บันทึกเมื่อ: 2026-10-02

## ข้อมูลโดเมน

- โดเมน: `asakan.co.th`
- ผู้รับจดทะเบียน: THNIC
- วันหมดอายุ: 15/07/2028

## ค่าเดิมก่อนย้าย (Cloudflare)

### เนมเซิร์ฟเวอร์

- `hal.ns.cloudflare.com`ns2
- `cruz.ns.cloudflare.com`ns1

แหล่งที่มา: ผลตรวจ DNS ของ THNIC และ MxToolbox

### DNSSEC

- ไม่ได้เปิดใช้งาน

### www.asakan.co.th (A record, Cloudflare proxy)

- `172.67.157.215`
- `104.21.8.203`

เว็บเดิมอยู่หลัง Cloudflare proxy จึงมองไม่เห็น IP ของเซิร์ฟเวอร์จริงจากภายนอก

### MX (asakan.co.th)

- ไม่พบเรคอร์ด (ตรวจด้วย MxToolbox เมื่อ 2026-10-02) ยังไม่มีอีเมลตั้งไว้ใน DNS

### ค่าที่ยังไม่ได้เก็บ (กรอกเพิ่มเมื่อได้ผล)

| ประเภท | ชื่อ | ค่า | หมายเหตุ |
|---|---|---|---|
| A | asakan.co.th (@) | | |
| NS | asakan.co.th (@) | | |
| TXT | asakan.co.th (@) | | |
| TXT | | | |

## บัญชี Cloudflare เดิม

- ตอนนี้ยังเข้าไม่ได้ (ไม่ทราบเจ้าของบัญชี)
- เรคอร์ดที่อยู่ในบัญชีนั้นแต่มองไม่เห็นจากภายนอก (เช่น subdomain อื่น, TXT, ค่า origin IP) จึงยังไม่ทราบ

## ค่าที่ย้ายไป (Vercel)

- เนมเซิร์ฟเวอร์: `ns1.vercel-dns.com`, `ns2.vercel-dns.com`
- โดเมนถูกเพิ่มในโปรเจกต์ Vercel `website` แล้ว
- `asakan.co.th` redirect 308 ไป `www.asakan.co.th`

## ขั้นตอน restore กลับ Cloudflare

1. ตรวจว่ามีสิทธิ์เข้าบัญชี Cloudflare ที่ดูแลโซน `asakan.co.th` และเรคอร์ดในโซนยังอยู่ครบ (โดยเฉพาะ A ของ `www` และโดเมนหลัก)
2. เข้าระบบ THNIC แล้วเปลี่ยนเนมเซิร์ฟเวอร์ของ `asakan.co.th` กลับเป็น
   - `hal.ns.cloudflare.com`
   - `cruz.ns.cloudflare.com`
3. รอ DNS อัปเดต (ไม่กี่ชั่วโมงถึง 48 ชั่วโมง)
4. ตรวจผลด้วย MxToolbox หรือ `nslookup -type=ns asakan.co.th` และเปิด `https://www.asakan.co.th` ว่าเว็บเดิมกลับมา
