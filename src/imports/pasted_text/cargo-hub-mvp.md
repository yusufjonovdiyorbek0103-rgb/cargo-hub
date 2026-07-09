Create a functional MVP web app prototype for a logistics startup called “CargoHub”.

IMPORTANT:
- The entire website/app must be in Uzbek Latin language.
- Build it as a modern responsive web platform, suitable for desktop and mobile.
- This is not just a landing page. It must feel like a working MVP demo that can be shown tomorrow.
- Use realistic Uzbek logistics context: Toshkent, Samarqand, Farg‘ona, Andijon, Buxoro, Nukus, Termiz, Qarshi, Namangan.
- Use clean SaaS-style UI, modern logistics dashboard style, blue/green color palette, simple icons, maps, cards, tables, forms, status badges.
- Brand name: CargoHub
- Slogan: “Yuk tashishni oson, tez va shaffof qiling”
- Core concept: C2C platform connecting yuk jo‘natuvchilar and yuk tashuvchi haydovchilar across Uzbekistan.

PROJECT CONTEXT:
CargoHub solves problems in Uzbekistan’s internal freight market:
1. Orders are often handled through Telegram groups and phone calls.
2. Prices are not transparent.
3. Finding reliable drivers and cargo is inefficient.
4. Trucks often return empty.
5. Customers cannot track cargo in real time.
6. There is no trusted rating and review system.
CargoHub provides a unified digital platform with order creation, driver matching, smart route suggestion, price calculator, GPS-style tracking, secure payment mockup, and rating system.

MAIN USER ROLES:
1. Yuk jo‘natuvchi / Mijoz
2. Yuk tashuvchi / Haydovchi
3. Admin

CREATE THESE MAIN PAGES / SCREENS:

1. LANDING PAGE
Sections:
- Hero section:
  Title: “CargoHub — O‘zbekiston bo‘ylab yuk tashishning raqamli platformasi”
  Subtitle: “Yukingizni joylashtiring, mos haydovchini toping, narxni oldindan biling va yetkazib berishni xaritada kuzating.”
  Primary button: “Yuk joylashtirish”
  Secondary button: “Haydovchi sifatida kirish”
  Add logistics illustration or map-style background.
- Quick stats cards:
  “30–40% vaqt tejaladi”
  “15–20% xarajat optimallashadi”
  “25–30% bo‘sh yurish kamayadi”
  “Real-time tracking”
- How it works section:
  1. Yuk ma’lumotlarini kiriting
  2. Narx avtomatik hisoblanadi
  3. Haydovchi taklif beradi
  4. Yuk xaritada kuzatiladi
  5. Yetkazilgandan so‘ng reyting qoldiriladi
- Services section:
  “Viloyatlararo yuk tashish”
  “Kichik biznes uchun yetkazib berish”
  “Fermer va ishlab chiqaruvchilar uchun logistika”
  “Shaharlararo yuk tashish”
- CTA section:
  “Bugunoq birinchi buyurtmani yarating”

2. AUTH / ROLE SELECTION PAGE
Create a login/register screen with role selector:
- “Mijoz sifatida kirish”
- “Haydovchi sifatida kirish”
- “Admin panel”
Fields:
- Telefon raqam
- Parol
- “Kirish”
- “Ro‘yxatdan o‘tish”
Registration fields:
- Ism familiya
- Telefon raqam
- Rol tanlash
- Viloyat
- Parol
Make interactions simple: after choosing role, navigate to the relevant dashboard.

3. CUSTOMER DASHBOARD — “Mijoz paneli”
Main layout:
- Sidebar menu:
  Bosh sahifa
  Yangi yuk joylashtirish
  Buyurtmalarim
  Kuzatuv
  To‘lovlar
  Profil
- Top cards:
  “Faol buyurtmalar”
  “Kutilayotgan takliflar”
  “Yetkazilgan yuklar”
  “Umumiy xarajat”
- Recent orders table:
  Columns:
  Buyurtma ID
  Yo‘nalish
  Yuk turi
  Holat
  Narx
  Haydovchi
  Harakat
Sample data:
  #CH-1024 | Toshkent → Samarqand | Maishiy texnika | Taklif kutilmoqda | 850 000 so‘m
  #CH-1025 | Farg‘ona → Toshkent | Qishloq xo‘jaligi mahsuloti | Yo‘lda | 1 200 000 so‘m
  #CH-1026 | Buxoro → Qarshi | Qurilish materiali | Yetkazildi | 950 000 so‘m

4. CREATE CARGO ORDER PAGE
Create a working multi-step form:
Step 1: Yuk ma’lumotlari
- Yuk nomi
- Yuk turi: Qurilish materiali, Qishloq xo‘jaligi mahsuloti, Maishiy texnika, Mebel, Boshqa
- Og‘irligi, kg
- Hajmi, m³
- Yuk rasmi upload placeholder
Step 2: Yo‘nalish
- Jo‘natish shahri
- Yetkazish shahri
- Yuk olish manzili
- Yetkazish manzili
- Sana va vaqt
Step 3: Qo‘shimcha talablar
- Sovutkichli transport kerak
- Yuk ko‘taruvchi kerak
- Tezkor yetkazish
- Sug‘urta kerak
Step 4: Narx hisoblash
Show automatic price estimate card:
- Masofa: 305 km
- Taxminiy narx: 850 000 so‘m
- Platforma komissiyasi: 5%
- Umumiy: 892 500 so‘m
Button: “Buyurtmani joylashtirish”
After submitting, show success modal:
“Buyurtma yaratildi. Endi haydovchilardan takliflarni kuting.”

5. DRIVER DASHBOARD — “Haydovchi paneli”
Sidebar:
- Bosh sahifa
- Mavjud yuklar
- Mening takliflarim
- Marshrutlarim
- Daromadlar
- Profil
Top cards:
- “Mavjud yuklar”
- “Faol marshrut”
- “Bu oy daromad”
- “Reyting”
Main section:
- Available cargo cards with filters:
  Filter by:
  Jo‘natish shahri
  Yetkazish shahri
  Yuk turi
  Og‘irlik
Each cargo card includes:
- Route
- Cargo type
- Weight
- Price estimate
- Pickup date
- Customer rating
- Button: “Taklif berish”
Sample cargo:
1. Toshkent → Samarqand, 800 kg, Maishiy texnika, 850 000 so‘m
2. Andijon → Toshkent, 1.2 tonna, Qishloq xo‘jaligi mahsuloti, 1 300 000 so‘m
3. Buxoro → Qarshi, 2 tonna, Qurilish materiali, 950 000 so‘m
When driver clicks “Taklif berish”, show modal:
- Taklif narxi
- Yetib borish vaqti
- Izoh
Button: “Taklif yuborish”

6. ORDER DETAILS PAGE
Create a detailed order page:
- Order ID
- Route card
- Cargo details
- Customer details
- Driver offers list
Each driver offer:
- Driver name
- Vehicle type
- Rating
- Completed orders
- Proposed price
- Estimated delivery time
- Button: “Tanlash”
After selecting driver, change order status to “Haydovchi tanlandi”.

7. TRACKING PAGE
Create a realistic tracking page:
- Map placeholder of Uzbekistan route
- Route: Toshkent → Samarqand
- Current status timeline:
  1. Buyurtma yaratildi
  2. Haydovchi tanlandi
  3. Yuk olindi
  4. Yo‘lda
  5. Yetkazildi
- Current location card:
  “Hozirgi joylashuv: Jizzax viloyati”
  “Taxminiy yetib borish: 2 soat 30 daqiqa”
- Driver info:
  Ism: Akmal Rahimov
  Transport: Isuzu, 5 tonna
  Telefon: +998 90 123 45 67
  Reyting: 4.8
- Button: “Haydovchiga qo‘ng‘iroq qilish”
- Button: “Chat ochish”

8. PRICE CALCULATOR PAGE
Create a standalone calculator:
Fields:
- Jo‘natish shahri
- Yetkazish shahri
- Yuk turi
- Og‘irlik
- Hajm
- Transport turi: Kichik yuk mashina, Gazel, Isuzu, Fura
Result card:
- Masofa
- Asosiy tarif
- Yuk turi koeffitsiyenti
- Tezkorlik qo‘shimchasi
- Taxminiy yakuniy narx
Add explanation:
“Narx masofa, yuk hajmi, yuk turi, transport turi va bozor talabi asosida hisoblanadi.”

9. PAYMENT MOCKUP PAGE
Create a payment page, not real payment, just demo:
- Payment methods:
  Uzcard
  Humo
  QR to‘lov
  Naqd to‘lov
- Order summary:
  Buyurtma narxi
  Platforma komissiyasi
  Umumiy summa
- Button: “To‘lovni tasdiqlash”
After confirming, show status:
“To‘lov muvaffaqiyatli tasdiqlandi.”

10. RATINGS AND REVIEWS PAGE
Create page for trust system:
- Driver rating cards
- Customer rating cards
- Review form:
  Reyting 1–5
  Izoh
  “Sharh qoldirish”
Sample reviews:
“Yuk o‘z vaqtida yetkazildi.”
“Haydovchi aloqa uchun doim ochiq bo‘ldi.”
“Transport toza va yuk xavfsiz yetkazildi.”

11. ADMIN DASHBOARD
Create simple admin panel:
Sidebar:
- Umumiy ko‘rsatkichlar
- Foydalanuvchilar
- Buyurtmalar
- Haydovchilar
- To‘lovlar
- Analitika
Dashboard cards:
- Jami foydalanuvchilar: 3 482
- Faol haydovchilar: 786
- Bugungi buyurtmalar: 124
- Oylik tranzaksiya: 1.8 mlrd so‘m
Charts:
- Buyurtmalar soni bo‘yicha viloyatlar kesimida bar chart
- Oylik o‘sish line chart
Tables:
- Latest orders
- New drivers pending verification
Add driver verification status:
“Tasdiqlangan”, “Tekshiruvda”, “Rad etilgan”

12. PROFILE PAGE
For customer:
- Name
- Phone
- Region
- Completed orders
- Rating
For driver:
- Name
- Phone
- Vehicle type
- License plate
- Capacity
- Documents upload placeholder
- Verification status
- Rating

INTERACTIONS TO INCLUDE:
- Navigation between pages must work.
- Buttons should open appropriate pages or modals.
- Role selection should route to correct dashboard.
- “Yuk joylashtirish” button opens Create Cargo Order page.
- Submit order shows success modal and adds order to dashboard mock list.
- Driver “Taklif berish” opens offer modal.
- Customer can choose a driver from offers.
- Tracking page should look active with status timeline.
- Price calculator should display calculated result visually.
- Payment confirmation should show success state.
- Rating form should show submitted confirmation.

DESIGN STYLE:
- Modern logistics tech startup.
- Use rounded cards, clear spacing, professional dashboard layout.
- Use blue as primary color, green as success/accent color, light gray backgrounds.
- Include map-like visual elements, route lines, truck icons, location pins.
- Make it look reliable, official, and suitable for a university innovation project demo.
- Avoid too much text on screens. Use concise Uzbek UI copy.
- The interface should be simple enough for Uzbek drivers and small business owners.

CONTENT TONE:
Professional, simple, clear Uzbek.
Use these Uzbek terms consistently:
- Yuk jo‘natuvchi
- Yuk tashuvchi
- Haydovchi
- Buyurtma
- Taklif
- Yo‘nalish
- Narx hisoblash
- Real vaqt kuzatuvi
- Reyting
- Xavfsiz to‘lov
- Bo‘sh yurishni kamaytirish

FINAL OUTPUT:
Generate a complete clickable prototype / MVP website with all screens above, filled with realistic sample data and working basic interactions. The result must be ready to demonstrate as an early-stage CargoHub platform tomorrow.