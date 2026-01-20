import React, { useState, useEffect } from 'react';
import { 
  Search, ShoppingCart, User, Bell, Menu, X, Filter, 
  MapPin, Star, Heart, Share2, MessageCircle, ShieldCheck, 
  Truck, CreditCard, ChevronRight, Home, HelpCircle, 
  Settings, LogOut, TrendingUp, DollarSign, ArrowLeft,
  Plus, Minus, Trash2, CheckCircle, AlertCircle, SlidersHorizontal
} from 'lucide-react';

// --- Mock Data (Expanded to 50+ items) ---

const CATEGORIES = [
  { id: 1, name: 'มือถือ & แท็บเล็ต', icon: '📱' },
  { id: 2, name: 'คอมพิวเตอร์', icon: '💻' },
  { id: 3, name: 'แฟชั่น', icon: '👕' },
  { id: 4, name: 'ของตกแต่งบ้าน', icon: '🛋️' },
  { id: 5, name: 'กล้องถ่ายรูป', icon: '📷' },
  { id: 6, name: 'หนังสือ', icon: '📚' },
  { id: 7, name: 'กีฬา', icon: '⚽' },
  { id: 8, name: 'ยานยนต์', icon: '🚗' },
];

const PRODUCTS = [
  // --- Mobile & Tablet ---
  {
    id: 1,
    title: 'iPhone 13 Pro Max 256GB สี Sierra Blue',
    price: 28500,
    originalPrice: 32000,
    condition: 'สภาพดีเยี่ยม (95%)',
    category: 'มือถือ & แท็บเล็ต',
    location: 'เชียงใหม่, เมือง',
    rating: 4.8,
    reviews: 12,
    image: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&q=80&w=400',
    seller: 'TechHunter_CNX',
    sellerVerified: true,
    description: 'เครื่องศูนย์ไทย สภาพสวยมาก ไม่มีรอยตกหล่น แบตเตอรี่ 89% อุปกรณ์ครบกล่อง แถมเคสแท้ 2 อัน นัดรับได้แถวมช. หรือส่ง Kerry ประกันใจให้ 7 วันครับ',
    tags: ['มือสอง', 'ส่งฟรี', 'ผ่อนชำระได้'],
    isPromoted: true,
  },
  {
    id: 101,
    title: 'Samsung Galaxy S23 Ultra 5G',
    price: 31900,
    originalPrice: 43900,
    condition: 'เหมือนใหม่ (99%)',
    category: 'มือถือ & แท็บเล็ต',
    location: 'กรุงเทพฯ, สยาม',
    rating: 5.0,
    reviews: 8,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&q=80&w=400',
    seller: 'MobileZone_BK',
    sellerVerified: true,
    description: 'เครื่องสวยมาก ประกันศูนย์เหลือ 6 เดือน อุปกรณ์ครบกล่อง ไม่เคยตกน้ำ',
    tags: ['ประกันศูนย์', 'ยอดนิยม'],
    isPromoted: false,
  },
  {
    id: 102,
    title: 'iPad Air 5 64GB WiFi สีฟ้า',
    price: 16500,
    originalPrice: 19900,
    condition: 'สภาพดี (90%)',
    category: 'มือถือ & แท็บเล็ต',
    location: 'ขอนแก่น, มข.',
    rating: 4.7,
    reviews: 15,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=400',
    seller: 'StudentGadget',
    sellerVerified: false,
    description: 'ขายเพราะเรียนจบแล้วครับ มีรอยขนแมวนิดหน่อยตรงขอบ แถมปากกาเทียบให้ครับ',
    tags: ['นัดรับ', 'แถมเคส'],
    isPromoted: false,
  },
  {
    id: 103,
    title: 'Xiaomi Pad 6 Pro Snapdragon 8+',
    price: 10500,
    originalPrice: 12900,
    condition: 'ใหม่แกะกล่อง',
    category: 'มือถือ & แท็บเล็ต',
    location: 'กรุงเทพฯ, ลาดพร้าว',
    rating: 5.0,
    reviews: 2,
    image: 'https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?auto=format&fit=crop&q=80&w=400',
    seller: 'GadgetHub',
    sellerVerified: true,
    description: 'ของใหม่ยังไม่แกะซีล ประกันศูนย์ไทย 1 ปีเต็ม',
    tags: ['ของใหม่', 'ประกันศูนย์'],
    isPromoted: false,
  },
  {
    id: 104,
    title: 'iPhone 11 128GB สีม่วง',
    price: 9500,
    originalPrice: 15000,
    condition: 'มีรอยตามการใช้งาน (80%)',
    category: 'มือถือ & แท็บเล็ต',
    location: 'ชลบุรี, บางแสน',
    rating: 4.3,
    reviews: 5,
    image: 'https://images.unsplash.com/photo-1574712769435-08e08d13262a?auto=format&fit=crop&q=80&w=400',
    seller: 'NanaPhone',
    sellerVerified: false,
    description: 'ใช้งานได้ปกติทุกฟังก์ชัน สแกนหน้าได้ แบต 78% เปลี่ยนแบตแล้วใช้ยาวๆ',
    tags: ['ราคาถูก', 'มือสอง'],
    isPromoted: false,
  },
  {
    id: 105,
    title: 'Google Pixel 7 Pro',
    price: 18900,
    originalPrice: 29900,
    condition: 'สภาพนางฟ้า (98%)',
    category: 'มือถือ & แท็บเล็ต',
    location: 'เชียงใหม่, นิมมาน',
    rating: 4.9,
    reviews: 10,
    image: 'https://images.unsplash.com/photo-1665930263309-c16723229b4e?auto=format&fit=crop&q=80&w=400',
    seller: 'AndroidLover',
    sellerVerified: true,
    description: 'กล้องเทพ สายเพียวแอนดรอยด์ห้ามพลาด เครื่องนอก สัญญาณดีครบ',
    tags: ['กล้องสวย', 'หายาก'],
    isPromoted: true,
  },

  // --- Computer ---
  {
    id: 4,
    title: 'MacBook Air M1 Ram 8 SSD 256',
    price: 19900,
    originalPrice: 24000,
    condition: 'เหมือนใหม่ (99%)',
    category: 'คอมพิวเตอร์',
    location: 'ขอนแก่น, เมือง',
    rating: 4.9,
    reviews: 20,
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80&w=400',
    seller: 'IT_Outlet',
    sellerVerified: true,
    description: 'Cycle count 15 รอบ ประกันศูนย์เหลือ 3 เดือน เครื่องแทบไม่ได้ใช้เลยครับ กล่องอุปกรณ์ครบ',
    tags: ['ประกันศูนย์', 'พร้อมส่ง'],
    isPromoted: true,
  },
  {
    id: 201,
    title: 'Asus ROG Zephyrus G14 Gaming Notebook',
    price: 35000,
    originalPrice: 49900,
    condition: 'สภาพดี (85%)',
    category: 'คอมพิวเตอร์',
    location: 'กรุงเทพฯ, ลาดพร้าว',
    rating: 4.6,
    reviews: 5,
    image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=400',
    seller: 'GamerStore_TH',
    sellerVerified: true,
    description: 'สเปกแรง Ryzen 9 RTX 3060 เล่นได้ทุกเกม มีรอยตามการใช้งานนิดหน่อย',
    tags: ['เกมมิ่ง', 'ส่งด่วน'],
    isPromoted: false,
  },
  {
    id: 202,
    title: 'Dell Monitor 24" IPS 75Hz',
    price: 2500,
    originalPrice: 4500,
    condition: 'ปานกลาง (80%)',
    category: 'คอมพิวเตอร์',
    location: 'เชียงใหม่, สันทราย',
    rating: 4.2,
    reviews: 3,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=400',
    seller: 'OfficeClearance',
    sellerVerified: false,
    description: 'จอทำงานสภาพดี สีตรง ไม่มี Dead pixel ขายโล๊ะสต็อกออฟฟิศครับ',
    tags: ['มือสอง', 'ราคาถูก'],
    isPromoted: false,
  },
  {
    id: 203,
    title: 'Keychron K2 V2 Mechanical Keyboard',
    price: 2200,
    originalPrice: 3200,
    condition: 'สภาพดี (90%)',
    category: 'คอมพิวเตอร์',
    location: 'กรุงเทพฯ, เอกมัย',
    rating: 4.8,
    reviews: 15,
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=400',
    seller: 'MechaKeyTH',
    sellerVerified: true,
    description: 'Red Switch เสียงเงียบ ไฟ RGB ครบกล่อง แถมที่ดึงคีย์แคป',
    tags: ['ยอดฮิต', 'อุปกรณ์ครบ'],
    isPromoted: false,
  },
  {
    id: 204,
    title: 'Logitech MX Master 3S',
    price: 2800,
    originalPrice: 3500,
    condition: 'ใหม่แกะกล่อง',
    category: 'คอมพิวเตอร์',
    location: 'ภูเก็ต, ถลาง',
    rating: 5.0,
    reviews: 1,
    image: 'https://images.unsplash.com/photo-1629429408209-1f912961dbd8?auto=format&fit=crop&q=80&w=400',
    seller: 'GadgetZone',
    sellerVerified: true,
    description: 'เมาส์เพื่อสุขภาพ ซื้อมาผิดสี ยังไม่ได้ใช้งาน',
    tags: ['ของใหม่', 'ส่งฟรี'],
    isPromoted: false,
  },
  {
    id: 205,
    title: 'iPad Pro 12.9" M1 256GB WiFi',
    price: 28900,
    originalPrice: 35900,
    condition: 'สภาพดีเยี่ยม (95%)',
    category: 'คอมพิวเตอร์',
    location: 'นนทบุรี, ปากเกร็ด',
    rating: 4.9,
    reviews: 8,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=400',
    seller: 'AppleResell',
    sellerVerified: true,
    description: 'จอ Mini-LED สวยมาก ติดฟิล์มกระดาษแล้ว แถมเคสแม่เหล็ก',
    tags: ['จอสวย', 'ตัวท็อป'],
    isPromoted: true,
  },

  // --- Fashion ---
  {
    id: 301,
    title: 'เสื้อยืด Vintage Nike Tag Orange',
    price: 850,
    originalPrice: 1200,
    condition: 'สภาพดี (90%)',
    category: 'แฟชั่น',
    location: 'กรุงเทพฯ, จตุจักร',
    rating: 4.9,
    reviews: 45,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=400',
    seller: 'VintageHunter',
    sellerVerified: true,
    description: 'เสื้อยืดวินเทจปี 90s สภาพดีมาก สกรีนไม่แตก ไซส์ L อก 22 ยาว 29',
    tags: ['Vintage', 'Rare'],
    isPromoted: false,
  },
  {
    id: 302,
    title: 'กระเป๋า Freitag รุ่น Jamie',
    price: 4500,
    originalPrice: 5900,
    condition: 'เหมือนใหม่ (98%)',
    category: 'แฟชั่น',
    location: 'ภูเก็ต, เมือง',
    rating: 5.0,
    reviews: 10,
    image: 'https://images.unsplash.com/photo-1559563458-527698bf5295?auto=format&fit=crop&q=80&w=400',
    seller: 'BagLover_PK',
    sellerVerified: true,
    description: 'ผ้าใบสีน้ำเงินล้วน หายาก สภาพใหม่กริบ ไม่ค่อยได้ใช้ แท็กครบ',
    tags: ['ของแท้', 'ส่งฟรี'],
    isPromoted: true,
  },
  {
    id: 303,
    title: 'รองเท้า Nike Dunk Low Panda',
    price: 3200,
    originalPrice: 4500,
    condition: 'สภาพดี (85%)',
    category: 'แฟชั่น',
    location: 'กรุงเทพฯ, สยาม',
    rating: 4.5,
    reviews: 22,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400',
    seller: 'SneakerHead_TH',
    sellerVerified: true,
    description: 'ไซส์ 9US พื้นยังเต็ม มีรอยยับหน้าเท้านิดหน่อย กล่องครบ',
    tags: ['ยอดฮิต', 'พร้อมส่ง'],
    isPromoted: false,
  },
  {
    id: 304,
    title: 'Levi\'s 501 Original Jeans',
    price: 1200,
    originalPrice: 2500,
    condition: 'สภาพดี (90%)',
    category: 'แฟชั่น',
    location: 'เชียงใหม่, สันกำแพง',
    rating: 4.6,
    reviews: 12,
    image: 'https://images.unsplash.com/photo-1542272454315-4c01d7434b98?auto=format&fit=crop&q=80&w=400',
    seller: 'DenimLover',
    sellerVerified: false,
    description: 'เอว 32 ยาว 32 สีเข้ม เฟดสวย ผ้าหนา',
    tags: ['ยีนส์', 'คลาสสิก'],
    isPromoted: false,
  },
  {
    id: 305,
    title: 'นาฬิกา Seiko 5 Sports Automatic',
    price: 5500,
    originalPrice: 8900,
    condition: 'สภาพดีเยี่ยม (95%)',
    category: 'แฟชั่น',
    location: 'กรุงเทพฯ, สีลม',
    rating: 4.8,
    reviews: 7,
    image: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80&w=400',
    seller: 'WatchCollector',
    sellerVerified: true,
    description: 'หน้าปัดเขียว สายสแตนเลส กล่องใบครบ ประกันเหลือ',
    tags: ['นาฬิกา', 'ของแท้'],
    isPromoted: true,
  },
  {
    id: 306,
    title: 'กระเป๋าสะพาย Coach แท้',
    price: 3500,
    originalPrice: 6900,
    condition: 'มีตำหนิเล็กน้อย (85%)',
    category: 'แฟชั่น',
    location: 'สงขลา, หาดใหญ่',
    rating: 4.4,
    reviews: 3,
    image: 'https://images.unsplash.com/photo-1590874102752-ce35448c26e7?auto=format&fit=crop&q=80&w=400',
    seller: 'BrandName2Hand',
    sellerVerified: false,
    description: 'หนังแท้สีดำ มีรอยตรงมุมก้นกระเป๋านิดหน่อย ใช้งานต่อได้ยาวๆ',
    tags: ['แบรนด์เนม', 'ราคาเบาๆ'],
    isPromoted: false,
  },

  // --- Home ---
  {
    id: 3,
    title: 'IKEA Poang Chair เก้าอี้พักผ่อน',
    price: 1200,
    originalPrice: 2500,
    condition: 'ปานกลาง (80%)',
    category: 'ของตกแต่งบ้าน',
    location: 'นนทบุรี, บางใหญ่',
    rating: 4.5,
    reviews: 2,
    image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=400',
    seller: 'HomeDecorByJane',
    sellerVerified: false,
    description: 'เก้าอี้รุ่นยอดฮิต เบาะผ้าสีกรมท่า มีรอยแมวข่วนนิดหน่อยที่ขาเก้าอี้ นั่งสบายมาก มารับเองลดได้อีกครับ',
    tags: ['มือสอง', 'นัดรับเท่านั้น'],
    isPromoted: false,
  },
  {
    id: 401,
    title: 'โคมไฟตั้งโต๊ะ Minimal Style',
    price: 350,
    originalPrice: 790,
    condition: 'สภาพดีเยี่ยม (95%)',
    category: 'ของตกแต่งบ้าน',
    location: 'เชียงใหม่, นิมมาน',
    rating: 4.8,
    reviews: 6,
    image: 'https://images.unsplash.com/photo-1507473888900-52e1adad54cd?auto=format&fit=crop&q=80&w=400',
    seller: 'DecorSpace',
    sellerVerified: true,
    description: 'โคมไฟไม้สไตล์มูจิ ปรับระดับแสงได้ 3 ระดับ พร้อมหลอดไฟ',
    tags: ['แต่งห้อง', 'ส่งลงทะเบียนฟรี'],
    isPromoted: false,
  },
  {
    id: 402,
    title: 'ต้นมอนสเตอร่าด่าง (ตัดสด)',
    price: 1500,
    originalPrice: 2500,
    condition: 'แข็งแรง',
    category: 'ของตกแต่งบ้าน',
    location: 'กรุงเทพฯ, ตลิ่งชัน',
    rating: 5.0,
    reviews: 18,
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=400',
    seller: 'GreenGarden',
    sellerVerified: true,
    description: 'ไม้ด่างยอดฮิต ลายสวย รากเดินดี ตัดจากต้นแม่ แข็งแรงแน่นอน',
    tags: ['ต้นไม้', 'ไม้ด่าง'],
    isPromoted: true,
  },
  {
    id: 403,
    title: 'เครื่องชงกาแฟ Nespresso Essenza Mini',
    price: 2800,
    originalPrice: 4500,
    condition: 'สภาพดี (90%)',
    category: 'ของตกแต่งบ้าน',
    location: 'เชียงใหม่, สารภี',
    rating: 4.7,
    reviews: 9,
    image: 'https://images.unsplash.com/photo-1517088455889-bfa75135412c?auto=format&fit=crop&q=80&w=400',
    seller: 'CoffeeLover',
    sellerVerified: true,
    description: 'ใช้งานน้อย ล้างตะกรันแล้ว แถมแคปซูลให้ 1 หลอด',
    tags: ['กาแฟ', 'เครื่องใช้ไฟฟ้า'],
    isPromoted: false,
  },

  // --- Camera ---
  {
    id: 501,
    title: 'Fujifilm X100V Silver',
    price: 45900,
    originalPrice: 52000,
    condition: 'เหมือนใหม่ (99%)',
    category: 'กล้องถ่ายรูป',
    location: 'กรุงเทพฯ, ทองหล่อ',
    rating: 5.0,
    reviews: 8,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=400',
    seller: 'CameraPro_TH',
    sellerVerified: true,
    description: 'ชัตเตอร์ 500 รูป ประกันเหลือยาวๆ อุปกรณ์ครบกล่อง แถม Filter หน้าเลนส์',
    tags: ['หายาก', 'ประกันศูนย์'],
    isPromoted: true,
  },
  {
    id: 502,
    title: 'เลนส์ Canon EF 50mm f/1.8 STM',
    price: 2500,
    originalPrice: 3900,
    condition: 'สภาพดี (90%)',
    category: 'กล้องถ่ายรูป',
    location: 'นครราชสีมา, เมือง',
    rating: 4.6,
    reviews: 12,
    image: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&q=80&w=400',
    seller: 'PhotoKorat',
    sellerVerified: false,
    description: 'เลนส์ละลายหลังตัวเริ่มต้น สภาพเลนส์ใส ไร้ฝ้า ไร้รา',
    tags: ['เลนส์มือหมุน', 'ราคาถูก'],
    isPromoted: false,
  },
  {
    id: 503,
    title: 'Sony A7III Body Only',
    price: 39000,
    originalPrice: 59000,
    condition: 'ใช้งาน (85%)',
    category: 'กล้องถ่ายรูป',
    location: 'กรุงเทพฯ, พระราม9',
    rating: 4.8,
    reviews: 25,
    image: 'https://images.unsplash.com/photo-1516961642265-531546e84af2?auto=format&fit=crop&q=80&w=400',
    seller: 'SonyAlphaUser',
    sellerVerified: true,
    description: 'ชัตเตอร์ 4 หมื่น ยางบวมนิดหน่อย เซ็นเซอร์ใส ใช้งานปกติทุกระบบ',
    tags: ['FullFrame', 'มืออาชีพ'],
    isPromoted: false,
  },
  {
    id: 504,
    title: 'GoPro Hero 10 Black',
    price: 8500,
    originalPrice: 13500,
    condition: 'สภาพดี (90%)',
    category: 'กล้องถ่ายรูป',
    location: 'ภูเก็ต, ป่าตอง',
    rating: 4.5,
    reviews: 6,
    image: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&q=80&w=400',
    seller: 'AdventureLife',
    sellerVerified: true,
    description: 'กล้องแอคชั่นแคมยอดนิยม จอหน้าหลังติดฟิล์มแล้ว ไม่เคยลงน้ำลึก',
    tags: ['ActionCam', 'ท่องเที่ยว'],
    isPromoted: false,
  },

  // --- Books ---
  {
    id: 601,
    title: 'หนังสือ Atomic Habits (แปลไทย)',
    price: 180,
    originalPrice: 295,
    condition: 'สภาพดี (90%)',
    category: 'หนังสือ',
    location: 'กรุงเทพฯ, บางนา',
    rating: 4.9,
    reviews: 30,
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400',
    seller: 'BookWorm_TH',
    sellerVerified: true,
    description: 'อ่านจบแล้วครับ สภาพดีมาก ไม่มีรอยขีดเขียน ห่อปกพลาสติกแล้ว',
    tags: ['หนังสือมือสอง', 'พัฒนาตนเอง'],
    isPromoted: false,
  },
  {
    id: 602,
    title: 'Boxset Harry Potter 1-7 (ปกแข็ง)',
    price: 2500,
    originalPrice: 3800,
    condition: 'สะสม (95%)',
    category: 'หนังสือ',
    location: 'เชียงใหม่, หางดง',
    rating: 5.0,
    reviews: 5,
    image: 'https://images.unsplash.com/photo-1610466024868-90d350d74b64?auto=format&fit=crop&q=80&w=400',
    seller: 'RareBooks_CNX',
    sellerVerified: true,
    description: 'เหมาะสำหรับนักสะสม พิมพ์ครั้งที่ 1 สภาพเก็บในตู้โชว์',
    tags: ['ของสะสม', 'หายาก'],
    isPromoted: true,
  },
  {
    id: 603,
    title: 'มังงะ One Piece เล่ม 1-100 (ไม่ครบ)',
    price: 2000,
    originalPrice: 4500,
    condition: 'บ้าน (80%)',
    category: 'หนังสือ',
    location: 'ขอนแก่น, เมือง',
    rating: 4.3,
    reviews: 11,
    image: 'https://images.unsplash.com/photo-1612532152865-c7743d5f5778?auto=format&fit=crop&q=80&w=400',
    seller: 'Manga2Hand',
    sellerVerified: false,
    description: 'ขาดเล่ม 50-60 กระดาษเหลืองตามกาลเวลา อ่านได้ปกติ',
    tags: ['การ์ตูน', 'เหมา'],
    isPromoted: false,
  },

  // --- Sports ---
  {
    id: 701,
    title: 'ไม้แบดมินตัน Yonex Astrox 88D',
    price: 3200,
    originalPrice: 4800,
    condition: 'มีรอยถลอก (80%)',
    category: 'กีฬา',
    location: 'กรุงเทพฯ, รามคำแหง',
    rating: 4.5,
    reviews: 18,
    image: 'https://images.unsplash.com/photo-1626224583764-847890e058f5?auto=format&fit=crop&q=80&w=400',
    seller: 'BadmintonPro',
    sellerVerified: true,
    description: 'ไม้บุก สายตบหนัก มีรอยสีถลอก 2 จุดจากการตักลูก ไม่มีผลต่อการใช้งาน ขึ้นเอ็น 26 ปอนด์',
    tags: ['กีฬา', 'Yonex'],
    isPromoted: false,
  },
  {
    id: 702,
    title: 'ดัมเบลปรับน้ำหนัก 20kg (1 คู่)',
    price: 1500,
    originalPrice: 2900,
    condition: 'สภาพดี (90%)',
    category: 'กีฬา',
    location: 'นนทบุรี, ปากเกร็ด',
    rating: 4.7,
    reviews: 4,
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=400',
    seller: 'GymAtHome',
    sellerVerified: false,
    description: 'เลิกเล่นครับ ขายถูกๆ มารับเองเท่านั้นหนักมาก',
    tags: ['ออกกำลังกาย', 'นัดรับ'],
    isPromoted: false,
  },
  {
    id: 703,
    title: 'จักรยานเสือหมอบ Trek Domane AL2',
    price: 15000,
    originalPrice: 24000,
    condition: 'สภาพดี (85%)',
    category: 'กีฬา',
    location: 'เชียงใหม่, ดอยสุเทพ',
    rating: 4.8,
    reviews: 8,
    image: 'https://images.unsplash.com/photo-1485965120184-e224f723d621?auto=format&fit=crop&q=80&w=400',
    seller: 'BikeLover_CNX',
    sellerVerified: true,
    description: 'ไซส์ 52 คนสูง 170-175 ปั่นได้ มีรอยขนแมว ชุดขับ Claris',
    tags: ['จักรยาน', 'ออกกำลังกาย'],
    isPromoted: true,
  },

  // --- Vehicles ---
  {
    id: 801,
    title: 'Honda Scoopy i 2020 สีขาว',
    price: 28000,
    originalPrice: 49000,
    condition: 'สภาพดี (85%)',
    category: 'ยานยนต์',
    location: 'เชียงใหม่, อาเขต',
    rating: 4.8,
    reviews: 7,
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=400',
    seller: 'BikeSecondHand_CNX',
    sellerVerified: true,
    description: 'รถบ้านมือเดียว ผู้หญิงขับ ไมล์ 15,xxx km เพิ่งถ่ายน้ำมันเครื่อง พร้อมโอน',
    tags: ['รถมอเตอร์ไซค์', 'พร้อมโอน'],
    isPromoted: true,
  },
  {
    id: 802,
    title: 'หมวกกันน็อค Real Helmet ไซส์ L',
    price: 1200,
    originalPrice: 2200,
    condition: 'สภาพดี (90%)',
    category: 'ยานยนต์',
    location: 'ชลบุรี, บางแสน',
    rating: 4.4,
    reviews: 9,
    image: 'https://images.unsplash.com/photo-1558641496-6d60155263d9?auto=format&fit=crop&q=80&w=400',
    seller: 'BikerShop',
    sellerVerified: false,
    description: 'ใส่ไปทริป 2 ครั้ง ไม่เคยตก บุบนวมสะอาด',
    tags: ['อุปกรณ์ขับขี่', 'ปลอดภัย'],
    isPromoted: false,
  },
  {
    id: 803,
    title: 'ล้อแม็ก TE37 ขอบ 15 4รู100',
    price: 4500,
    originalPrice: 8900,
    condition: 'มีรอยเบียด (80%)',
    category: 'ยานยนต์',
    location: 'กรุงเทพฯ, บางนา',
    rating: 4.2,
    reviews: 4,
    image: 'https://images.unsplash.com/photo-1565691062086-4556488730b2?auto=format&fit=crop&q=80&w=400',
    seller: 'RacingWheels',
    sellerVerified: false,
    description: 'งานเทียบ ไม่คด ไม่ดุ้ง มีรอยเบียดฟุตบาท 1 วง ขายตามสภาพ',
    tags: ['แต่งรถ', 'อะไหล่'],
    isPromoted: false,
  },
  
  // อิเล็กทรอนิกส์ (อื่นๆ)
  {
    id: 2,
    title: 'Sony WH-1000XM4 Noise Canceling',
    price: 6500,
    originalPrice: 8900,
    condition: 'สภาพดี (90%)',
    category: 'อุปกรณ์อิเล็กทรอนิกส์',
    location: 'กรุงเทพฯ, จตุจักร',
    rating: 5.0,
    reviews: 5,
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=400',
    seller: 'MusicLover99',
    sellerVerified: true,
    description: 'หูฟังตัดเสียงตัวท็อป สภาพยางยังดี เสียงปกติทุกอย่าง ขายเพราะจะไปรุ่นใหม่ อุปกรณ์มีแค่ตัวหูฟังกับสายชาร์จ',
    tags: ['ลดราคา', 'ยอดนิยม'],
    isPromoted: false,
  },
];

// --- Mock Notifications ---
const NOTIFICATIONS = [
  { id: 1, text: 'iPhone 13 ลดราคาเหลือ ฿27,000 รีบเลย!', time: '10 นาทีที่แล้ว', unread: true },
  { id: 2, text: 'สินค้าที่คุณสนใจ "MacBook Air" ถูกขายแล้ว', time: '1 ชั่วโมงที่แล้ว', unread: true },
  { id: 3, text: 'ยินดีต้อนรับสู่ SecondHome! เริ่มลงขายกันเลย', time: '1 วันที่แล้ว', unread: false },
];

// --- Components ---

const Badge = ({ children, color = 'bg-gray-100 text-gray-800' }) => (
  <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>
    {children}
  </span>
);

const StarRating = ({ rating }) => (
  <div className="flex items-center text-yellow-400">
    {[...Array(5)].map((_, i) => (
      <Star key={i} size={14} fill={i < Math.floor(rating) ? "currentColor" : "none"} className={i < Math.floor(rating) ? "" : "text-gray-300"} />
    ))}
    <span className="ml-1 text-xs text-gray-500">({rating})</span>
  </div>
);

const NotificationDropdown = ({ onClose }) => (
  <div className="absolute top-12 right-0 w-80 bg-white rounded-xl shadow-xl border border-gray-100 z-50 animate-fade-in overflow-hidden">
    <div className="p-3 border-b border-gray-50 flex justify-between items-center bg-gray-50">
      <h3 className="font-bold text-sm text-gray-800">การแจ้งเตือน</h3>
      <span className="text-xs text-blue-600 cursor-pointer">อ่านทั้งหมด</span>
    </div>
    <div className="max-h-64 overflow-y-auto">
      {NOTIFICATIONS.map(noti => (
        <div key={noti.id} className={`p-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer flex items-start space-x-3 ${noti.unread ? 'bg-blue-50/30' : ''}`}>
          <div className="bg-slate-100 p-2 rounded-full text-slate-600 flex-shrink-0">
            <Bell size={14} />
          </div>
          <div>
            <p className="text-sm text-gray-800 leading-snug">{noti.text}</p>
            <p className="text-xs text-gray-400 mt-1">{noti.time}</p>
          </div>
          {noti.unread && <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5 flex-shrink-0"></div>}
        </div>
      ))}
    </div>
  </div>
);

const CartDrawer = ({ isOpen, onClose, cartItems, onRemove, onCheckout, total }) => (
  <>
    {/* Overlay */}
    {isOpen && <div className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm" onClick={onClose}></div>}
    
    {/* Drawer */}
    <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 transform transition-transform duration-300 shadow-2xl ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="h-full flex flex-col">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h2 className="text-lg font-bold text-slate-800 flex items-center">
            <ShoppingCart size={20} className="mr-2" /> ตะกร้าสินค้า ({cartItems.length})
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition"><X size={20} /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
              <ShoppingCart size={48} className="opacity-20" />
              <p>ยังไม่มีสินค้าในตะกร้า</p>
              <button onClick={onClose} className="text-blue-600 text-sm font-medium hover:underline">ไปเลือกซื้อสินค้า</button>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.cartId} className="flex space-x-4 p-3 border border-gray-100 rounded-xl hover:shadow-sm transition">
                <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 line-clamp-2">{item.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{item.seller}</p>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-bold text-slate-800">฿{item.price.toLocaleString()}</span>
                    <button 
                      onClick={() => onRemove(item.cartId)}
                      className="text-gray-400 hover:text-red-500 p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-5 border-t border-gray-100 bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">ยอดรวมทั้งหมด</span>
              <span className="text-2xl font-bold text-slate-800">฿{total.toLocaleString()}</span>
            </div>
            <button 
              onClick={onCheckout}
              className="w-full bg-slate-800 text-white py-3.5 rounded-xl font-bold hover:bg-slate-700 transition shadow-lg flex items-center justify-center"
            >
              ดำเนินการชำระเงิน <ChevronRight size={18} className="ml-1" />
            </button>
          </div>
        )}
      </div>
    </div>
  </>
);

// --- Mobile Filter Modal ---
const MobileFilterModal = ({ isOpen, onClose, selectedCategory, onCategoryClick }) => (
  <>
    {isOpen && <div className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm" onClick={onClose}></div>}
    <div className={`fixed inset-x-0 bottom-0 max-h-[85vh] bg-white z-50 rounded-t-2xl transform transition-transform duration-300 shadow-2xl overflow-hidden flex flex-col ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
        <h3 className="font-bold text-gray-800 text-lg flex items-center">
          <Filter size={20} className="mr-2" /> ตัวกรอง
        </h3>
        <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition"><X size={20} /></button>
      </div>
      
      <div className="overflow-y-auto p-4 flex-1">
        {/* Same Filter Logic as Sidebar but optimized for mobile touch */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-700 mb-3 text-sm">หมวดหมู่</h4>
          <div className="flex flex-wrap gap-2">
            <div 
              className={`cursor-pointer text-sm py-2 px-4 rounded-full border ${!selectedCategory ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-gray-600 border-gray-200'}`}
              onClick={() => { onCategoryClick(null); onClose(); }}
            >
              ทั้งหมด
            </div>
            {CATEGORIES.map(cat => (
              <div 
                key={cat.id}
                className={`cursor-pointer text-sm py-2 px-4 rounded-full border ${selectedCategory === cat.name ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-gray-600 border-gray-200'}`}
                onClick={() => { onCategoryClick(cat.name); onClose(); }}
              >
                {cat.name}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h4 className="font-medium text-gray-700 mb-3 text-sm">สภาพสินค้า</h4>
          <div className="space-y-3">
            {['ใหม่แกะกล่อง', 'มือสองสภาพดี', 'มีตำหนิเล็กน้อย', 'งานช่าง/อะไหล่'].map((item) => (
              <label key={item} className="flex items-center space-x-3 cursor-pointer">
                <input type="checkbox" className="w-5 h-5 rounded text-slate-800 focus:ring-slate-500 border-gray-300" />
                <span className="text-gray-600">{item}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h4 className="font-medium text-gray-700 mb-3 text-sm">ช่วงราคา</h4>
          <div className="flex items-center space-x-2 mb-2">
            <input type="number" placeholder="ต่ำสุด" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-slate-500" />
            <span className="text-gray-400">-</span>
            <input type="number" placeholder="สูงสุด" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-slate-500" />
          </div>
        </div>

        <div className="mb-8">
          <h4 className="font-medium text-gray-700 mb-3 text-sm">สถานที่</h4>
          <div className="relative">
            <MapPin size={18} className="absolute left-3 top-3.5 text-gray-400" />
            <input type="text" placeholder="ระบุจังหวัด..." className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-slate-500" />
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-gray-100 bg-white">
        <button onClick={onClose} className="w-full bg-slate-800 text-white py-3.5 rounded-xl font-bold shadow-lg">
          ดูผลลัพธ์
        </button>
      </div>
    </div>
  </>
);

const CheckoutModal = ({ isOpen, onClose, cartItems, total, onConfirm }) => {
  const [step, setStep] = useState(1); // 1: Summary, 2: Processing, 3: Success
  
  useEffect(() => {
    if (isOpen) setStep(1);
  }, [isOpen]);

  const handleConfirm = () => {
    setStep(2);
    setTimeout(() => {
      setStep(3);
    }, 2000); // Simulate processing
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl relative">
        {step !== 3 && (
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10">
            <X size={20} />
          </button>
        )}

        {step === 1 && (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">ยืนยันคำสั่งซื้อ</h2>
            
            <div className="mb-6">
              <h3 className="text-sm font-bold text-gray-700 mb-2">ที่อยู่จัดส่ง</h3>
              <div className="p-3 border border-gray-200 rounded-lg bg-gray-50 text-sm text-gray-600 flex items-start">
                <MapPin size={16} className="mt-0.5 mr-2 text-slate-500 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Pongsatorn Dev</p>
                  <p>239 ถ.ห้วยแก้ว ต.สุเทพ อ.เมือง จ.เชียงใหม่ 50200</p>
                  <p className="mt-1 text-blue-600 text-xs cursor-pointer">เปลี่ยนที่อยู่</p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-bold text-gray-700 mb-2">รายการสินค้า ({cartItems.length})</h3>
              <div className="max-h-40 overflow-y-auto space-y-2 pr-2">
                {cartItems.map(item => (
                  <div key={item.cartId} className="flex justify-between text-sm">
                    <span className="text-gray-600 truncate w-2/3">{item.title}</span>
                    <span className="font-medium">฿{item.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-100 mb-6">
              <span className="font-bold text-gray-800">ยอดสุทธิ</span>
              <span className="text-2xl font-bold text-slate-800">฿{total.toLocaleString()}</span>
            </div>

            <button 
              onClick={handleConfirm}
              className="w-full bg-slate-800 text-white py-3 rounded-xl font-bold hover:bg-slate-700 transition shadow-md"
            >
              ยืนยันการชำระเงิน
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-6"></div>
            <h3 className="text-xl font-bold text-gray-800">กำลังดำเนินการ...</h3>
            <p className="text-gray-500 mt-2">กรุณาอย่าปิดหน้านี้</p>
          </div>
        )}

        {step === 3 && (
          <div className="p-12 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6 animate-bounce">
              <CheckCircle size={40} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">สั่งซื้อสำเร็จ!</h2>
            <p className="text-gray-500 mb-8">ขอบคุณที่ใช้บริการ SecondHome<br/>เราจะแจ้งเตือนเมื่อสินค้าถูกจัดส่ง</p>
            <button 
              onClick={() => { onConfirm(); onClose(); }}
              className="bg-slate-800 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-700 transition"
            >
              กลับสู่หน้าหลัก
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const Navbar = ({ onViewChange, cartCount, user, onLoginClick, onCartClick, onNotiClick, showNoti, onSearchMobile }) => (
  <nav className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm font-sans">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16 items-center">
        {/* Logo */}
        <div className="flex items-center cursor-pointer" onClick={() => onViewChange('home')}>
          <div className="bg-slate-800 text-white p-1.5 md:p-2 rounded-lg mr-2">
            <Home size={18} className="md:w-5 md:h-5" />
          </div>
          <span className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">SecondHome</span>
        </div>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex flex-1 max-w-lg mx-8 relative">
          <input
            type="text"
            placeholder="ค้นหาสินค้า แบรนด์ หรือประเภท..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-slate-500 focus:bg-white transition-all text-sm"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <button className="absolute right-2 top-1 bg-slate-800 text-white p-1.5 rounded-full hover:bg-slate-700 transition">
            <Search size={14} />
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-1 md:space-x-4">
          
          {/* Mobile Search Toggle */}
          <button 
            className="md:hidden text-gray-500 hover:text-slate-800 p-2 rounded-full hover:bg-gray-100"
            onClick={onSearchMobile}
          >
            <Search size={20} />
          </button>

          <div className="relative">
            <button 
              className={`text-gray-500 hover:text-slate-800 transition p-2 rounded-full hover:bg-gray-100 ${showNoti ? 'bg-gray-100 text-slate-800' : ''}`}
              onClick={onNotiClick}
            >
              <Bell size={20} className="md:w-[22px] md:h-[22px]" />
              <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center border border-white">3</span>
            </button>
            {showNoti && <NotificationDropdown onClose={onNotiClick} />}
          </div>

          <button 
            className="text-gray-500 hover:text-slate-800 transition relative p-2 rounded-full hover:bg-gray-100"
            onClick={onCartClick}
          >
            <ShoppingCart size={20} className="md:w-[22px] md:h-[22px]" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-slate-800 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center border border-white animate-bounce-short">{cartCount}</span>
            )}
          </button>
          
          {user ? (
            <div className="flex items-center space-x-2 cursor-pointer md:border-l md:pl-4 border-gray-200" onClick={() => onViewChange('profile')}>
              <img src={user.avatar} alt="Profile" className="w-8 h-8 rounded-full border border-gray-200 object-cover" />
              <span className="text-sm font-medium text-gray-700 hidden sm:block">{user.name}</span>
            </div>
          ) : (
            <button 
              onClick={onLoginClick}
              className="bg-slate-800 text-white px-3 py-1.5 md:px-5 md:py-2 rounded-full text-xs md:text-sm font-medium hover:bg-slate-700 transition shadow-sm ml-1"
            >
              เข้าสู่ระบบ
            </button>
          )}
        </div>
      </div>
    </div>
  </nav>
);

const HeroSection = ({ onCategoryClick, selectedCategory }) => (
  <div className="bg-gradient-to-r from-slate-50 to-gray-100 py-8 md:py-12 border-b border-gray-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-800 mb-3 md:mb-4 tracking-tight">
          ส่งต่อของรัก ในบ้านหลังที่สอง
        </h1>
        <p className="text-sm md:text-lg text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto font-light px-4">
          แหล่งรวมสินค้ามือสองคุณภาพดี ตรวจสอบได้ ปลอดภัยทุกการซื้อขาย พร้อมระบบการันตีความพึงพอใจ
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 px-8 sm:px-0">
          <button className="bg-slate-800 text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full font-medium hover:bg-slate-700 transition shadow-lg flex items-center justify-center text-sm md:text-base">
            ลงขายสินค้าฟรี <ChevronRight size={18} className="ml-1" />
          </button>
          <button className="bg-white text-slate-800 border border-gray-200 px-6 md:px-8 py-2.5 md:py-3 rounded-full font-medium hover:bg-gray-50 transition shadow-sm text-sm md:text-base">
            โหมดมือใหม่
          </button>
        </div>
      </div>
      
      {/* Quick Categories */}
      <div className="mt-8 md:mt-12 grid grid-cols-4 md:grid-cols-8 gap-3 md:gap-4 text-center">
        {CATEGORIES.map((cat) => (
          <div 
            key={cat.id} 
            className="group cursor-pointer"
            onClick={() => onCategoryClick(cat.name)}
          >
            <div className={`w-12 h-12 md:w-14 md:h-14 mx-auto rounded-2xl shadow-sm flex items-center justify-center text-xl md:text-2xl transition-all duration-200 border ${selectedCategory === cat.name ? 'bg-slate-800 text-white scale-110 ring-2 ring-offset-2 ring-slate-300' : 'bg-white border-gray-100 group-hover:scale-110 group-hover:border-slate-300'}`}>
              {cat.icon}
            </div>
            <p className={`mt-2 text-[10px] md:text-xs font-medium truncate px-1 ${selectedCategory === cat.name ? 'text-slate-800 font-bold' : 'text-gray-600 group-hover:text-slate-800'}`}>
              {cat.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const FilterSidebar = ({ onCategoryClick, selectedCategory }) => (
  <div className="w-64 flex-shrink-0 hidden lg:block pr-8">
    <div className="sticky top-24">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-800 text-lg">ตัวกรอง</h3>
        <span 
          className="text-xs text-slate-600 cursor-pointer hover:underline"
          onClick={() => onCategoryClick(null)}
        >
          ล้างทั้งหมด
        </span>
      </div>

      {/* Category List in Sidebar */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-2 text-sm">หมวดหมู่</h4>
        <div className="space-y-1">
          <div 
            className={`cursor-pointer text-sm py-1 px-2 rounded ${!selectedCategory ? 'bg-slate-100 text-slate-800 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
            onClick={() => onCategoryClick(null)}
          >
            ทั้งหมด
          </div>
          {CATEGORIES.map(cat => (
            <div 
              key={cat.id}
              className={`cursor-pointer text-sm py-1 px-2 rounded ${selectedCategory === cat.name ? 'bg-slate-100 text-slate-800 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
              onClick={() => onCategoryClick(cat.name)}
            >
              {cat.name}
            </div>
          ))}
        </div>
      </div>
      
      {/* Condition */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-2 text-sm">สภาพสินค้า</h4>
        <div className="space-y-2">
          {['ใหม่แกะกล่อง', 'มือสองสภาพดี', 'มีตำหนิเล็กน้อย', 'งานช่าง/อะไหล่'].map((item) => (
            <label key={item} className="flex items-center space-x-2 cursor-pointer group">
              <input type="checkbox" className="rounded text-slate-800 focus:ring-slate-500 border-gray-300" />
              <span className="text-sm text-gray-600 group-hover:text-slate-800 transition">{item}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-2 text-sm">ช่วงราคา</h4>
        <div className="flex items-center space-x-2 mb-2">
          <input type="number" placeholder="ต่ำสุด" className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:border-slate-500" />
          <span className="text-gray-400">-</span>
          <input type="number" placeholder="สูงสุด" className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:border-slate-500" />
        </div>
        <button className="w-full py-1.5 bg-gray-100 text-gray-600 text-xs font-medium rounded hover:bg-gray-200 transition">ตกลง</button>
      </div>

      {/* Location */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-2 text-sm">สถานที่</h4>
        <div className="relative">
          <MapPin size={14} className="absolute left-3 top-2.5 text-gray-400" />
          <input type="text" placeholder="ระบุจังหวัด..." className="w-full pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:border-slate-500" />
        </div>
      </div>
    </div>
  </div>
);

const ProductCard = ({ product, onClick }) => (
  <div 
    className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer overflow-hidden relative"
    onClick={() => onClick(product)}
  >
    {product.isPromoted && (
      <div className="absolute top-2 left-2 bg-slate-800 text-white text-[10px] px-2 py-0.5 rounded shadow-sm z-10">
        แนะนำ
      </div>
    )}
    <div className="relative aspect-square overflow-hidden bg-gray-100">
      <img 
        src={product.image} 
        alt={product.title} 
        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
      />
      <button className="absolute bottom-2 right-2 bg-white/90 p-1.5 rounded-full text-gray-400 hover:text-red-500 transition shadow-sm opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
        <Heart size={16} />
      </button>
    </div>
    <div className="p-3 md:p-4">
      <div className="flex justify-between items-start mb-1">
        <h3 className="font-medium text-gray-900 line-clamp-2 text-xs md:text-sm leading-snug h-8 md:h-10">{product.title}</h3>
      </div>
      <div className="flex flex-wrap items-baseline gap-1 md:gap-2 mb-1 md:mb-2">
        <span className="text-base md:text-lg font-bold text-slate-800">฿{product.price.toLocaleString()}</span>
        {product.originalPrice > product.price && (
          <span className="text-[10px] md:text-xs text-gray-400 line-through">฿{product.originalPrice.toLocaleString()}</span>
        )}
      </div>
      <div className="flex items-center text-[10px] md:text-xs text-gray-500 mb-2 md:mb-3 gap-1 md:gap-2">
        <span className="flex items-center truncate max-w-[60px] md:max-w-none"><MapPin size={10} className="mr-0.5" />{product.location.split(',')[0]}</span>
        <span className="hidden md:inline w-1 h-1 bg-gray-300 rounded-full"></span>
        <span className="truncate hidden md:inline">{product.condition}</span>
      </div>
      <div className="flex items-center justify-between pt-2 md:pt-3 border-t border-gray-50">
        <div className="flex items-center space-x-1.5">
          <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-slate-200 flex items-center justify-center text-[8px] md:text-[10px] text-slate-600 font-bold">
            {product.seller.charAt(0)}
          </div>
          <span className="text-[10px] md:text-xs text-gray-600 truncate max-w-[60px] md:max-w-[80px]">{product.seller}</span>
          {product.sellerVerified && <ShieldCheck size={10} className="text-blue-500 md:w-3 md:h-3" />}
        </div>
        <div className="hidden md:block">
           <StarRating rating={product.rating} />
        </div>
        <div className="md:hidden flex items-center text-yellow-400 text-[10px]">
           <Star size={10} fill="currentColor" /> <span className="ml-0.5 text-gray-500">{product.rating}</span>
        </div>
      </div>
    </div>
  </div>
);

const ProductDetail = ({ product, onBack, onAddToCart, onBuyNow }) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8 animate-fade-in pb-24 md:pb-8">
    <button onClick={onBack} className="flex items-center text-sm text-gray-500 hover:text-slate-800 mb-4 md:mb-6 transition">
      <ChevronRight className="rotate-180 mr-1" size={16} /> กลับไปหน้ารายการ
    </button>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
      {/* Image Gallery */}
      <div className="space-y-3 md:space-y-4">
        <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden border border-gray-100">
          <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
        </div>
        <div className="grid grid-cols-4 gap-2 md:gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className={`aspect-square rounded-lg overflow-hidden border cursor-pointer ${i === 0 ? 'border-slate-800 ring-1 ring-slate-800' : 'border-gray-100 hover:border-gray-300'}`}>
              <img src={product.image} alt="thumbnail" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition" />
            </div>
          ))}
        </div>
      </div>

      {/* Info */}
      <div>
        <div className="flex justify-between items-start">
          <div>
            <div className="flex flex-wrap gap-2 mb-2 md:mb-3">
              {product.tags.map(tag => (
                <Badge key={tag} color="bg-blue-50 text-blue-700">{tag}</Badge>
              ))}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs md:text-sm text-gray-500 mb-4 md:mb-6">
              <span className="flex items-center"><MapPin size={14} className="mr-1" /> {product.location}</span>
              <span className="flex items-center text-slate-600 font-medium">
                {product.condition}
              </span>
              <span className="text-gray-300 hidden md:inline">|</span>
              <span className="text-xs">ลงขายเมื่อ 2 ชม. ที่แล้ว</span>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 text-gray-500"><Share2 size={18} className="md:w-5 md:h-5" /></button>
            <button className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 text-red-500"><Heart size={18} className="md:w-5 md:h-5" /></button>
          </div>
        </div>

        <div className="bg-gray-50 p-4 md:p-6 rounded-2xl mb-6 md:mb-8 border border-gray-100">
          <div className="flex items-baseline justify-between mb-4">
            <div className="flex items-baseline space-x-2 md:space-x-3">
              <span className="text-3xl md:text-4xl font-bold text-slate-800">฿{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-sm md:text-lg text-gray-400 line-through">฿{product.originalPrice.toLocaleString()}</span>
              )}
            </div>
            <span className="text-green-600 text-xs md:text-sm font-medium flex items-center bg-green-50 px-2 py-1 rounded">
              <TrendingUp size={14} className="mr-1" /> คุ้มค่ามาก
            </span>
          </div>
          
          <div className="hidden md:flex flex-col sm:flex-row gap-3">
            <button 
              onClick={() => onBuyNow(product)}
              className="flex-1 bg-slate-800 text-white py-3.5 rounded-xl font-medium hover:bg-slate-700 transition shadow-lg flex items-center justify-center space-x-2"
            >
              <CreditCard size={18} /> <span>ซื้อเลย</span>
            </button>
            <button 
              onClick={() => onAddToCart(product)}
              className="flex-1 bg-white border border-slate-800 text-slate-800 py-3.5 rounded-xl font-medium hover:bg-gray-50 transition flex items-center justify-center space-x-2"
            >
              <ShoppingCart size={18} /> <span>เพิ่มลงตะกร้า</span>
            </button>
          </div>
        </div>

        {/* Mobile Sticky Action Bar */}
        <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 p-4 z-30 flex gap-3 shadow-top safe-area-bottom">
           <button 
              onClick={() => onAddToCart(product)}
              className="flex-1 bg-gray-100 text-slate-800 py-3 rounded-xl font-bold flex items-center justify-center"
            >
              <ShoppingCart size={20} />
            </button>
            <button 
              onClick={() => onBuyNow(product)}
              className="flex-[3] bg-slate-800 text-white py-3 rounded-xl font-bold shadow-lg flex items-center justify-center"
            >
              ซื้อเลย ฿{product.price.toLocaleString()}
            </button>
        </div>

        {/* Description */}
        <div className="mb-6 md:mb-8">
          <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 md:mb-3">รายละเอียดสินค้า</h3>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed whitespace-pre-line">{product.description}</p>
        </div>

        {/* Guarantee & Safety */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
          <div className="border border-gray-100 p-3 md:p-4 rounded-xl flex items-start space-x-3">
            <div className="bg-green-100 p-2 rounded-lg text-green-600"><ShieldCheck size={20} /></div>
            <div>
              <h4 className="font-bold text-sm text-gray-900">รับประกันคืนเงิน</h4>
              <p className="text-xs text-gray-500 mt-1">คืนเงินเต็มจำนวนหากสินค้าไม่ตรงปก</p>
            </div>
          </div>
          <div className="border border-gray-100 p-3 md:p-4 rounded-xl flex items-start space-x-3">
            <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><Truck size={20} /></div>
            <div>
              <h4 className="font-bold text-sm text-gray-900">จัดส่งปลอดภัย</h4>
              <p className="text-xs text-gray-500 mt-1">มีประกันสินค้าระหว่างขนส่ง</p>
            </div>
          </div>
        </div>

        {/* Seller Info */}
        <div className="border-t border-gray-100 pt-6 md:pt-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3 md:space-x-4">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-slate-200 rounded-full flex items-center justify-center text-lg md:text-xl font-bold text-slate-600">
                {product.seller.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 flex items-center text-sm md:text-base">
                  {product.seller}
                  {product.sellerVerified && <ShieldCheck size={16} className="text-blue-500 ml-1" title="ยืนยันตัวตนแล้ว" />}
                </h3>
                <div className="flex items-center text-xs md:text-sm text-gray-500 space-x-2">
                  <StarRating rating={product.rating} />
                  <span>({product.reviews} รีวิว)</span>
                </div>
              </div>
            </div>
            <button className="border border-gray-200 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium hover:bg-gray-50 transition flex items-center">
              <MessageCircle size={16} className="mr-1 md:mr-2" /> แชทเลย
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const UserProfile = () => (
  <div className="max-w-5xl mx-auto px-4 py-6 md:py-8">
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
      <div className="h-24 md:h-32 bg-slate-800"></div>
      <div className="px-4 md:px-8 pb-6 md:pb-8 relative">
        <div className="flex flex-col sm:flex-row items-end -mt-10 md:-mt-12 mb-6 sm:space-x-6">
          <div className="w-20 h-20 md:w-24 md:h-24 bg-white p-1 rounded-full">
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200" alt="User" className="w-full h-full rounded-full object-cover bg-gray-200" />
          </div>
          <div className="mt-3 sm:mt-0 flex-1 text-center sm:text-left">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">Pongsatorn Dev</h1>
            <p className="text-gray-500 text-xs md:text-sm">สมาชิกตั้งแต่ 2023 • เชียงใหม่, ไทย</p>
          </div>
          <button className="mt-4 sm:mt-0 bg-slate-800 text-white px-4 py-2 rounded-lg text-xs md:text-sm font-medium hover:bg-slate-700 w-full sm:w-auto">
            แก้ไขโปรไฟล์
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-gray-100 pt-6">
          <div className="text-center">
            <div className="text-lg md:text-xl font-bold text-gray-900">4.9</div>
            <div className="text-[10px] md:text-xs text-gray-500">คะแนนผู้ซื้อ</div>
          </div>
          <div className="text-center border-l border-gray-100">
            <div className="text-lg md:text-xl font-bold text-gray-900">12</div>
            <div className="text-[10px] md:text-xs text-gray-500">ซื้อสำเร็จ</div>
          </div>
          <div className="text-center md:border-l border-gray-100 pt-4 md:pt-0 border-t md:border-t-0 col-span-1">
            <div className="text-lg md:text-xl font-bold text-gray-900">0</div>
            <div className="text-[10px] md:text-xs text-gray-500">กำลังจัดส่ง</div>
          </div>
          <div className="text-center border-l border-gray-100 pt-4 md:pt-0 border-t md:border-t-0 col-span-1">
            <div className="text-lg md:text-xl font-bold text-gray-900">฿1,200</div>
            <div className="text-[10px] md:text-xs text-gray-500">คูปองส่วนลด</div>
          </div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="col-span-1">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-2">
          {['ภาพรวมบัญชี', 'รายการสั่งซื้อ', 'สินค้าที่ลงขาย', 'รายการโปรด', 'การตั้งค่า'].map((menu, i) => (
            <div key={menu} className={`p-3 rounded-lg cursor-pointer flex items-center justify-between ${i === 0 ? 'bg-slate-50 text-slate-800 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>
              <span className="text-sm md:text-base">{menu}</span>
              <ChevronRight size={16} className="text-gray-400" />
            </div>
          ))}
          <div className="border-t border-gray-100 mt-2 pt-2">
            <div className="p-3 rounded-lg cursor-pointer text-red-500 hover:bg-red-50 flex items-center space-x-2">
              <LogOut size={16} /> <span className="text-sm md:text-base">ออกจากระบบ</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="col-span-2 space-y-6">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 md:p-6">
          <h3 className="font-bold text-gray-900 mb-4 text-sm md:text-base">สถานะการสั่งซื้อล่าสุด</h3>
          <div className="space-y-4">
            <div className="flex items-center p-3 md:p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div className="p-2 md:p-3 bg-white rounded-md border border-gray-200 mr-3 md:mr-4">
                <Truck size={20} className="text-blue-500 md:w-6 md:h-6" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-gray-900 text-xs md:text-sm line-clamp-1 mr-2">หูฟัง Sony WH-1000XM4</span>
                  <span className="text-xs text-blue-600 font-medium whitespace-nowrap">กำลังจัดส่ง</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                  <div className="bg-blue-500 h-1.5 rounded-full w-2/3"></div>
                </div>
                <p className="text-[10px] md:text-xs text-gray-500 mt-2">คาดว่าจะถึงภายใน 20 ก.ย. 2568</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Footer = () => (
  <footer className="bg-white border-t border-gray-200 pt-10 pb-8 mt-8 md:mt-12 text-sm font-light">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        <div>
          <h4 className="font-bold text-slate-800 mb-4">SecondHome</h4>
          <ul className="space-y-2 text-gray-500 text-xs md:text-sm">
            <li>เกี่ยวกับเรา</li>
            <li>ร่วมงานกับเรา</li>
            <li>นโยบายความเป็นส่วนตัว</li>
            <li>เงื่อนไขการใช้งาน</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-slate-800 mb-4">ช่วยเหลือ</h4>
          <ul className="space-y-2 text-gray-500 text-xs md:text-sm">
            <li>ศูนย์ช่วยเหลือ</li>
            <li>วิธีการซื้อสินค้า</li>
            <li>วิธีการลงขาย</li>
            <li>การคืนเงินและคืนสินค้า</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-slate-800 mb-4">หมวดหมู่</h4>
          <ul className="space-y-2 text-gray-500 text-xs md:text-sm">
            <li>มือถือ & อิเล็กทรอนิกส์</li>
            <li>แฟชั่น</li>
            <li>บ้านและสวน</li>
            <li>กีฬา</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-slate-800 mb-4">ติดตามเรา</h4>
          <div className="flex space-x-4 mb-4">
            {['Facebook', 'Twitter', 'Instagram'].map(social => (
              <div key={social} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-slate-800 hover:text-white transition cursor-pointer">
                <span className="text-xs">{social[0]}</span>
              </div>
            ))}
          </div>
          <p className="text-gray-400 text-xs">© 2026 SecondHome Inc.</p>
        </div>
      </div>
    </div>
  </footer>
);

// --- Login Modal ---
const LoginModal = ({ onClose, onLogin }) => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
    <div className="bg-white rounded-2xl w-full max-w-md p-6 md:p-8 relative shadow-2xl">
      <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
        <X size={20} />
      </button>
      
      <div className="text-center mb-6 md:mb-8">
        <div className="inline-flex items-center justify-center p-3 bg-slate-100 rounded-xl mb-4 text-slate-800">
          <Home size={28} className="md:w-8 md:h-8" />
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-slate-800">ยินดีต้อนรับกลับมา</h2>
        <p className="text-gray-500 text-xs md:text-sm mt-1">เข้าสู่ระบบเพื่อจัดการการซื้อขายของคุณ</p>
      </div>

      <div className="space-y-3 md:space-y-4">
        <button className="w-full py-2.5 border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50 transition relative">
          <span className="font-bold text-blue-600 absolute left-4">G</span>
          <span className="text-gray-700 text-xs md:text-sm font-medium">ดำเนินการต่อด้วย Google</span>
        </button>
        <button className="w-full py-2.5 border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50 transition relative">
          <span className="font-bold text-blue-800 absolute left-4">f</span>
          <span className="text-gray-700 text-xs md:text-sm font-medium">ดำเนินการต่อด้วย Facebook</span>
        </button>
        
        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink-0 mx-4 text-gray-400 text-xs">หรือ</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onLogin(); }} className="space-y-3 md:space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">อีเมล</label>
            <input type="email" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 text-sm" placeholder="name@example.com" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">รหัสผ่าน</label>
            <input type="password" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 text-sm" placeholder="••••••••" />
          </div>
          <button type="submit" className="w-full bg-slate-800 text-white py-2.5 rounded-lg font-medium hover:bg-slate-700 transition shadow-md text-sm">
            เข้าสู่ระบบ
          </button>
        </form>
      </div>
    </div>
  </div>
);

// --- Main App ---

export default function SecondHomeApp() {
  const [view, setView] = useState('home'); // home, detail, profile
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  // State for Cart and UX
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isNotiOpen, setIsNotiOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);

  // Set default font to Kanit (Google Sans alternative for Thai)
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setView('detail');
    window.scrollTo(0, 0);
  };

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  const handleLogin = () => {
    setUser({
      name: 'Pongsatorn Dev',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100'
    });
    setShowLogin(false);
  };

  const handleHomeClick = () => {
    setView('home');
    setSelectedCategory(null);
    window.scrollTo(0,0);
  };

  // --- Cart Functions ---
  const addToCart = (product) => {
    const newItem = { ...product, cartId: Date.now() };
    setCartItems([...cartItems, newItem]);
  };

  const removeFromCart = (cartId) => {
    setCartItems(cartItems.filter(item => item.cartId !== cartId));
  };

  const handleBuyNow = (product) => {
    addToCart(product);
    setIsCartOpen(true);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce((acc, item) => acc + item.price, 0);

  // Filter products based on selected category
  const filteredProducts = selectedCategory 
    ? PRODUCTS.filter(p => p.category === selectedCategory)
    : PRODUCTS;

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans relative" style={{ fontFamily: '"Kanit", sans-serif' }}>
      
      {/* Modals & Drawers */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} onLogin={handleLogin} />}
      
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems}
        onRemove={removeFromCart}
        total={cartTotal}
        onCheckout={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }}
      />

      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        total={cartTotal}
        onConfirm={clearCart}
      />

      <MobileFilterModal 
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        selectedCategory={selectedCategory}
        onCategoryClick={handleCategoryClick}
      />

      <Navbar 
        onViewChange={(v) => { 
          if(v === 'home') handleHomeClick();
          else { setView(v); window.scrollTo(0,0); }
        }} 
        cartCount={cartItems.length} 
        user={user}
        onLoginClick={() => setShowLogin(true)}
        onCartClick={() => setIsCartOpen(true)}
        onNotiClick={() => setIsNotiOpen(!isNotiOpen)}
        showNoti={isNotiOpen}
        onSearchMobile={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
      />

      {/* Mobile Search Bar Expand */}
      {isMobileSearchOpen && (
        <div className="md:hidden px-4 pb-4 pt-2 border-b border-gray-100 bg-white animate-fade-in">
          <div className="relative">
            <input
              type="text"
              placeholder="ค้นหาสินค้า..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 text-sm"
            />
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          </div>
        </div>
      )}

      {view === 'home' && (
        <>
          <HeroSection 
            onCategoryClick={handleCategoryClick} 
            selectedCategory={selectedCategory} 
          />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
            <div className="flex">
              <FilterSidebar 
                onCategoryClick={handleCategoryClick} 
                selectedCategory={selectedCategory}
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <h2 className="text-base md:text-xl font-bold text-gray-900 flex items-center">
                    {selectedCategory ? (
                      <>
                        <span className="text-gray-500 font-normal mr-2 hidden md:inline">หมวดหมู่:</span> 
                        {selectedCategory}
                        <button 
                          onClick={() => setSelectedCategory(null)}
                          className="ml-2 md:ml-4 text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-full text-gray-600 flex items-center transition"
                        >
                          <X size={12} className="mr-1"/> ล้าง
                        </button>
                      </>
                    ) : (
                      'สินค้าแนะนำ'
                    )}
                  </h2>
                  <div className="flex items-center space-x-2 text-xs md:text-sm text-gray-500">
                    {/* Mobile Filter Trigger */}
                    <button 
                      className="lg:hidden flex items-center px-3 py-1.5 bg-gray-100 rounded-full text-gray-700 font-medium"
                      onClick={() => setIsMobileFilterOpen(true)}
                    >
                      <Filter size={14} className="mr-1" /> ตัวกรอง
                    </button>

                    <div className="hidden md:flex items-center">
                      <span>เรียงตาม:</span>
                      <select className="bg-transparent border-none font-medium text-slate-800 focus:ring-0 cursor-pointer text-sm">
                        <option>ยอดนิยม</option>
                        <option>ล่าสุด</option>
                        <option>ราคา ต่ำ-สูง</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                    {filteredProducts.map(product => (
                      <ProductCard 
                        key={product.id} 
                        product={product} 
                        onClick={handleProductClick} 
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 md:py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                    <p className="text-gray-500 text-sm">ไม่พบสินค้าในหมวดหมู่นี้</p>
                    <button 
                      onClick={() => setSelectedCategory(null)}
                      className="mt-3 md:mt-4 text-blue-600 hover:underline text-xs md:text-sm"
                    >
                      ดูสินค้าทั้งหมด
                    </button>
                  </div>
                )}

                {!selectedCategory && (
                  <div className="mt-8 md:mt-12 p-6 md:p-8 bg-blue-50 rounded-2xl flex items-center justify-between border border-blue-100">
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-2">ขายของไม่ได้ใช้?</h3>
                      <p className="text-xs md:text-base text-gray-600 mb-4">ลงขายฟรี ไม่มีค่าธรรมเนียมแรกเข้า ระบบปลอดภัย</p>
                      <button className="bg-slate-800 text-white px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-medium hover:bg-slate-700 transition">
                        เริ่มลงขายเลย
                      </button>
                    </div>
                    <div className="hidden md:block text-8xl">📦</div>
                    <div className="md:hidden text-5xl">📦</div>
                  </div>
                )}
              </div>
            </div>
          </main>
        </>
      )}

      {view === 'detail' && selectedProduct && (
        <ProductDetail 
          product={selectedProduct} 
          onBack={() => setView('home')} 
          onAddToCart={addToCart}
          onBuyNow={handleBuyNow}
        />
      )}

      {view === 'profile' && user && (
        <UserProfile />
      )}

      <Footer />
    </div>
  );
}