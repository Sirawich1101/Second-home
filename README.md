[README.md](https://github.com/user-attachments/files/27753085/README.md)
# SecondHome

SecondHome คือ frontend prototype สำหรับแพลตฟอร์มซื้อขายสินค้ามือสอง โดยโฟกัสที่ประสบการณ์การเลือกดูสินค้า เปิดหน้ารายละเอียดสินค้า เพิ่มลงตะกร้า และจำลองขั้นตอน checkout ในรูปแบบเว็บแอปภาษาไทย

ซอร์สโค้ดของแอปอยู่ในโฟลเดอร์ [`marketplace/`](marketplace/)

## ภาพรวมโปรเจค

- หน้าแรกพร้อม hero section และปุ่มลัดหมวดหมู่สินค้า
- รายการสินค้า mock มากกว่า 30 รายการ ครอบคลุม 8 หมวดหมู่
- หน้ารายละเอียดสินค้าพร้อมข้อมูลผู้ขาย ราคา รีวิว และจุดขายของสินค้า
- ตะกร้าสินค้าแบบ side drawer และ modal checkout จำลองหลายขั้นตอน
- ระบบ login, notifications และ profile page สำหรับเดโม flow การใช้งาน
- UI แบบ responsive เหมาะกับการนำไปต่อยอดเป็น marketplace จริง

## Tech Stack

- React 19
- Vite 7
- Lucide React
- Tailwind CSS ผ่าน CDN
- Mock data ฝังอยู่ในฝั่ง frontend

## โครงสร้างโปรเจค

```text
.
├── README.md
└── marketplace/
    ├── public/
    ├── src/
    │   ├── App.jsx
    │   ├── App.css
    │   ├── index.css
    │   └── main.jsx
    ├── index.html
    ├── package.json
    └── package-lock.json
```

## วิธีรันโปรเจค

```bash
cd marketplace
npm install
npm run dev
```

จากนั้นเปิด URL ที่ Vite แสดงใน terminal

## Scripts ที่ใช้บ่อย

- `npm run dev` เริ่ม development server
- `npm run build` build สำหรับ production
- `npm run preview` preview ไฟล์ build
- `npm run lint` ตรวจ lint

## สถานะปัจจุบันของโปรเจค

โปรเจคนี้เป็น frontend demo/prototype และยังไม่ได้เชื่อมระบบ backend จริง โดยสถานะปัจจุบันมีข้อสังเกตดังนี้

- ใช้ข้อมูลสินค้า ผู้ใช้ และการแจ้งเตือนแบบ mock
- ระบบ login และ checkout เป็นการจำลอง flow การใช้งาน
- search, sort และ filter บางส่วนยังเป็น UI demo
- รูปสินค้าและฟอนต์บางส่วนโหลดจาก external source

## เหมาะสำหรับนำไปต่อยอดเป็น

- โปรเจคพอร์ตโฟลิโอสาย Frontend
- ต้นแบบ marketplace สำหรับงานนำเสนอ
- จุดเริ่มต้นของระบบซื้อขายสินค้ามือสองพร้อม backend ในอนาคต

## แนวทางต่อยอด

- เชื่อมต่อ backend และฐานข้อมูลจริง
- เพิ่มระบบ authentication และจัดการ session
- เพิ่มระบบค้นหา กรอง และเรียงลำดับแบบใช้งานได้จริง
- เพิ่มระบบแชทระหว่างผู้ซื้อและผู้ขาย
- เชื่อม payment, order tracking และ seller dashboard
