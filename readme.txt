กรณีที่ 1: โปรเจกต์นี้เพิ่งทำเสร็จ ยังไม่เคยเอาขึ้น GitHub เลย (อัปโหลดครั้งแรก)

ขั้นที่ 1: สร้าง Repository (ห้องเก็บโค้ด) บนเว็บ GitHub

    ไปที่เว็บ GitHub แล้ว Log in ให้เรียบร้อย

    กดปุ่ม New (สีเขียวซ้ายมือ) หรือเครื่องหมาย + มุมขวาบน เลือก New repository

    ตั้งชื่อ Repository name (เช่น asakan-website)

    เลื่อนลงมากดปุ่ม Create repository (ไม่ต้องติ๊ก Add README ใดๆ ทั้งสิ้น ปล่อยโล่งๆ ไว้)

    หน้าเว็บจะโชว์คำสั่ง Git ให้ก๊อปปี้ลิงก์ URL ของโปรเจกต์มา (เช่น https://github.com/ชื่อคุณ/asakan-website.git)

ขั้นที่ 2: พิมพ์คำสั่งใน Terminal (VS Code)
เปิด Terminal ใน VS Code (กด `Ctrl + ``) ให้แน่ใจว่า path อยู่ในโฟลเดอร์โปรเจกต์ แล้วพิมพ์ทีละบรรทัดครับ:
Bash

# 1. สร้างระบบ Git ในโฟลเดอร์นี้
git init

# 2. แอดไฟล์ทั้งหมดเตรียมอัปโหลด
git add .

# 3. สร้างข้อความบันทึกการเปลี่ยนแปลง
git commit -m "First commit: Asakan website update"

# 4. เปลี่ยนชื่อสาขาหลักเป็น main
git branch -M main

# 5. เชื่อมต่อโฟลเดอร์ในคอมกับ GitHub (เปลี่ยน URL เป็นของคุณเอง)
git remote add origin https://github.com/ชื่อคุณ/asakan-website.git

# 6. ดันโค้ดขึ้น GitHub
git push -u origin main

กรณีที่ 2: โปรเจกต์นี้เคยเชื่อมกับ GitHub ไว้แล้ว (แค่อัปเดตไฟล์ใหม่)

ถ้าคุณเคยอัปโหลดโปรเจกต์นี้ขึ้นไปแล้วรอบนึง และเพิ่งแก้โค้ดเสร็จ (เช่นแก้ไฟล์ Elysium หรือ ProjectContent เมื่อกี้) ให้พิมพ์แค่ 3 บรรทัดนี้ใน Terminal ครับ:
Bash

git add .
git commit -m "Update project sections and galleries"
git push