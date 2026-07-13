import { useState } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import cargoHubLogo from "@/imports/image.png";
import {
  Truck, Package, MapPin, Star, ArrowRight, CheckCircle,
  Clock, Phone, MessageSquare, Calculator, CreditCard,
  Shield, Zap, Bell, LogOut, Home, List, DollarSign,
  User, Plus, Upload, Filter, Menu, X,
  BarChart2, Users, TrendingUp, Navigation, Eye,
  ChevronRight, Layers, Award, FileText, AlertCircle,
  Globe, Info
} from "lucide-react";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

// ─── Types ────────────────────────────────────────────────────────────────────

type Page =
  | "landing" | "auth" | "customer-dashboard" | "create-order"
  | "driver-dashboard" | "order-details" | "tracking"
  | "price-calculator" | "send-cargo" | "payment" | "ratings" | "admin" | "profile";

type Role = "customer" | "driver" | "admin" | null;
type Lang = "uz" | "ru" | "en";

// ─── Constants ────────────────────────────────────────────────────────────────

const REGIONS = [
  "Toshkent shahri", "Toshkent viloyati", "Samarqand viloyati",
  "Farg'ona viloyati", "Andijon viloyati", "Namangan viloyati",
  "Buxoro viloyati", "Xorazm viloyati", "Navoiy viloyati",
  "Qashqadaryo viloyati", "Surxondaryo viloyati", "Jizzax viloyati",
  "Sirdaryo viloyati", "Qoraqalpog'iston Respublikasi",
];

const CARGO_TYPES_UZ = ["Qurilish materiali", "Qishloq xo'jaligi mahsuloti", "Maishiy texnika", "Mebel", "Oziq-ovqat", "Boshqa"];
const CARGO_TYPES_RU = ["Строительные материалы", "Сельхозпродукция", "Бытовая техника", "Мебель", "Продукты питания", "Другое"];
const CARGO_TYPES_EN = ["Construction materials", "Agricultural products", "Home appliances", "Furniture", "Food products", "Other"];

const TRANSPORT_TYPES_UZ = ["Kichik yuk mashina", "Gazel", "Isuzu", "Fura (tentli)", "Sovutgichli transport"];
const TRANSPORT_TYPES_RU = ["Малотоннажный грузовик", "Газель", "Исузу", "Фура (тент)", "Рефрижератор"];
const TRANSPORT_TYPES_EN = ["Light truck", "Gazelle", "Isuzu", "Semi-trailer (tarpaulin)", "Refrigerator truck"];

const PACKAGE_TYPES_UZ = ["Standart qadoqlash", "Yumshoq qadoqlash", "Qattiq qadoqlash (yashik)", "Konteyner", "Qadoqlashsiz (yalang'och yuk)"];
const PACKAGE_TYPES_RU = ["Стандартная упаковка", "Мягкая упаковка", "Жёсткая (ящик)", "Контейнер", "Без упаковки"];
const PACKAGE_TYPES_EN = ["Standard packaging", "Soft packaging", "Hard packaging (box)", "Container", "No packaging (bulk)"];

const DISTANCES: Record<string, number> = {
  "Toshkent shahri|Toshkent viloyati": 40,
  "Toshkent shahri|Samarqand viloyati": 305,
  "Toshkent shahri|Jizzax viloyati": 180,
  "Toshkent shahri|Farg'ona viloyati": 320,
  "Toshkent shahri|Andijon viloyati": 380,
  "Toshkent shahri|Namangan viloyati": 340,
  "Toshkent shahri|Buxoro viloyati": 560,
  "Toshkent shahri|Navoiy viloyati": 480,
  "Toshkent shahri|Xorazm viloyati": 980,
  "Toshkent shahri|Qoraqalpog'iston Respublikasi": 1100,
  "Toshkent shahri|Qashqadaryo viloyati": 450,
  "Toshkent shahri|Surxondaryo viloyati": 650,
  "Samarqand viloyati|Buxoro viloyati": 250,
  "Samarqand viloyati|Qashqadaryo viloyati": 150,
  "Samarqand viloyati|Navoiy viloyati": 200,
  "Samarqand viloyati|Surxondaryo viloyati": 300,
  "Buxoro viloyati|Qashqadaryo viloyati": 150,
  "Buxoro viloyati|Xorazm viloyati": 530,
  "Buxoro viloyati|Navoiy viloyati": 130,
  "Farg'ona viloyati|Andijon viloyati": 60,
  "Farg'ona viloyati|Namangan viloyati": 110,
  "Andijon viloyati|Namangan viloyati": 150,
};

function getDistance(from: string, to: string): number {
  if (from === to) return 15;
  return DISTANCES[`${from}|${to}`] || DISTANCES[`${to}|${from}`] || 250;
}

// ─── Translations ─────────────────────────────────────────────────────────────

const T = {
  uz: {
    home: "Bosh sahifa", services: "Xizmatlar", calculator: "Kalkulator",
    sendCargo: "Tovar yuborish", tracking: "Kuzatuv", about: "Biz haqimizda",
    contact: "Aloqa", login: "Kirish", placeOrder: "Buyurtma berish",
    heroTitle: "CargoHub — O'zbekiston bo'ylab yuk tashishning raqamli platformasi",
    heroSubtitle: "Yuk yuboring, taxminiy narxni oldindan hisoblang va yetkazib berish jarayonini qulay boshqaring.",
    heroCta1: "Yuk yuborish", heroCta2: "Kalkulatorni ochish",
    heroTag: "Tez, qulay va shaffof logistika yechimi",
    stat1: "Vaqt tejaladi", stat2: "Xarajat optimallashadi",
    stat3: "Bo'sh yurish kamayadi", stat4: "Real-time kuzatuv",
    howItWorks: "Qanday ishlaydi?", howSubtitle: "Oddiy 5 qadamda yukingizni yetkazing",
    steps: ["Yuk ma'lumotlarini kiriting", "Narx avtomatik hisoblanadi", "Haydovchi taklif beradi", "Yuk xaritada kuzatiladi", "Yetkazilgandan so'ng reyting qoldiriladi"],
    servicesTitle: "Xizmatlarimiz", servicesSubtitle: "Har turdagi yuk uchun moslashuvchan yechimlar",
    ctaTitle: "Bugunoq birinchi buyurtmani yarating", ctaSubtitle: "Minglab haydovchilar va mijozlar allaqachon ishonishadi",
    ctaStart: "Boshlash", ctaCalc: "Kalkulator",
    calcTitle: "Kalkulator", calcSubtitle: "Yo'nalish, yuk turi va aniq manzil asosida taxminiy yetkazib berish narxini hisoblang.",
    fromSection: "Jo'natish manzili", toSection: "Yetkazish manzili", cargoSection: "Yuk ma'lumotlari",
    fromRegion: "Jo'natish viloyati", fromCity: "Jo'natish shahri / tumani", fromAddress: "Jo'natish aniq manzili",
    toRegion: "Yetkazish viloyati", toCity: "Yetkazish shahri / tumani", toAddress: "Yetkazish aniq manzili",
    cargoType: "Yuk turi", weight: "Og'irligi (kg)", volume: "Hajmi (m³)", transportType: "Transport turi",
    urgent: "Shoshilinch yetkazib berish (+30%)", calculate: "Narxni hisoblash",
    estimatedPrice: "Taxminiy narx", addressHelper: "Aniq manzil kiritilishi narxni yanada to'g'ri hisoblashga yordam beradi.",
    fromAddressPlaceholder: "Masalan: Yunusobod tumani, Amir Temur ko'chasi 15",
    toAddressPlaceholder: "Masalan: Registon ko'chasi 8",
    cityPlaceholder: "Masalan: Toshkent shahri, Chilonzor tumani",
    distance: "Masofa", transportTypeLabel: "Transport turi", cargoTypeLabel: "Yuk turi",
    platformFee: "Platforma xizmati (5%)", totalEstimate: "Umumiy taxminiy summa",
    estimatedNote: "Bu narx taxminiy hisoblanadi. Yakuniy narx haydovchi taklifiga qarab o'zgarishi mumkin.",
    disclaimerTitle: "Muhim eslatma",
    disclaimerText: "Platformadagi kalkulator orqali ko'rsatilgan narxlar taxminiy hisoblanadi. Yakuniy narx masofa, aniq manzil, yuk turi, hajmi, og'irligi, transport turi va qo'shimcha xizmatlarga qarab o'zgarishi mumkin. CargoHub foydalanuvchilarni bog'lovchi raqamli platforma hisoblanadi. Yukni to'g'ri qadoqlash, mahsulot tavsifining haqqoniyligi va qonunchilikka muvofiqligi foydalanuvchi zimmasida bo'ladi. Taqiqlangan yoki cheklangan mahsulotlarni yuborish mumkin emas.",
    sendCargoTitle: "Tovar yuborish", sendCargoSubtitle: "Yuk ma'lumotlarini kiriting va mos haydovchini toping",
    cargoName: "Yuk nomi", packaging: "Qadoqlash turi", phone: "Telefon raqam",
    comment: "Qo'shimcha izoh (ixtiyoriy)", submitOrder: "Buyurtmani yuborish",
    successTitle: "Buyurtmangiz qabul qilindi!", successText: "Buyurtmangiz qabul qilindi. Tez orada mos haydovchilar takliflari ko'rsatiladi.",
    footerDesc: "O'zbekiston bo'ylab yuk tashish platformasi",
    terms: "Foydalanish shartlari", privacy: "Maxfiylik siyosati", rules: "Yuk yuborish qoidalari",
    copyright: "© 2025 CargoHub. Barcha huquqlar himoyalangan.",
    samplePrices: "Namuna yo'nalishlar", selectRegion: "Viloyatni tanlang", select: "Tanlang",
    optional: "ixtiyoriy",
  },
  ru: {
    home: "Главная", services: "Услуги", calculator: "Калькулятор",
    sendCargo: "Отправка груза", tracking: "Отслеживание", about: "О нас",
    contact: "Контакты", login: "Войти", placeOrder: "Оформить заказ",
    heroTitle: "CargoHub — цифровая платформа грузоперевозок по Узбекистану",
    heroSubtitle: "Отправляйте грузы, рассчитывайте стоимость заранее и удобно управляйте доставкой.",
    heroCta1: "Отправить груз", heroCta2: "Открыть калькулятор",
    heroTag: "Быстрое, удобное и прозрачное логистическое решение",
    stat1: "Экономия времени", stat2: "Оптимизация затрат",
    stat3: "Сокращение порожних рейсов", stat4: "Отслеживание в реальном времени",
    howItWorks: "Как это работает?", howSubtitle: "Доставьте груз за 5 простых шагов",
    steps: ["Введите данные о грузе", "Стоимость рассчитывается автоматически", "Водитель делает предложение", "Груз отслеживается на карте", "После доставки оставьте отзыв"],
    servicesTitle: "Наши услуги", servicesSubtitle: "Гибкие решения для любого груза",
    ctaTitle: "Создайте первый заказ сегодня", ctaSubtitle: "Тысячи водителей и клиентов уже доверяют нам",
    ctaStart: "Начать", ctaCalc: "Калькулятор",
    calcTitle: "Калькулятор", calcSubtitle: "Рассчитайте ориентировочную стоимость доставки на основе маршрута, типа груза и точного адреса.",
    fromSection: "Адрес отправления", toSection: "Адрес доставки", cargoSection: "Данные о грузе",
    fromRegion: "Регион отправления", fromCity: "Город / район отправления", fromAddress: "Точный адрес отправления",
    toRegion: "Регион доставки", toCity: "Город / район доставки", toAddress: "Точный адрес доставки",
    cargoType: "Тип груза", weight: "Вес (кг)", volume: "Объём (м³)", transportType: "Тип транспорта",
    urgent: "Срочная доставка (+30%)", calculate: "Рассчитать стоимость",
    estimatedPrice: "Ориентировочная цена", addressHelper: "Точный адрес помогает рассчитать стоимость точнее.",
    fromAddressPlaceholder: "Например: Юнусабадский р-н, ул. Амира Темура 15",
    toAddressPlaceholder: "Например: ул. Регистан 8",
    cityPlaceholder: "Например: г. Ташкент, Чиланзарский р-н",
    distance: "Расстояние", transportTypeLabel: "Тип транспорта", cargoTypeLabel: "Тип груза",
    platformFee: "Комиссия платформы (5%)", totalEstimate: "Общая ориентировочная сумма",
    estimatedNote: "Эта цена является ориентировочной. Итоговая стоимость согласовывается с водителем.",
    disclaimerTitle: "Важное примечание",
    disclaimerText: "Цены, рассчитанные в калькуляторе платформы, являются ориентировочными. Итоговая стоимость может изменяться в зависимости от расстояния, точного адреса, типа груза, объема, веса, вида транспорта и дополнительных услуг. CargoHub является цифровой платформой, соединяющей пользователей. Ответственность за правильную упаковку груза, достоверность описания товара и соблюдение законодательства несет пользователь. Отправка запрещенных или ограниченных товаров не допускается.",
    sendCargoTitle: "Отправка груза", sendCargoSubtitle: "Введите данные о грузе и найдите подходящего водителя",
    cargoName: "Название груза", packaging: "Тип упаковки", phone: "Номер телефона",
    comment: "Дополнительный комментарий (необязательно)", submitOrder: "Отправить заявку",
    successTitle: "Заявка принята!", successText: "Ваша заявка принята. Предложения от подходящих водителей появятся в ближайшее время.",
    footerDesc: "Платформа грузоперевозок по Узбекистану",
    terms: "Условия использования", privacy: "Политика конфиденциальности", rules: "Правила перевозки грузов",
    copyright: "© 2025 CargoHub. Все права защищены.",
    samplePrices: "Примерные маршруты", selectRegion: "Выберите регион", select: "Выбрать",
    optional: "необязательно",
  },
  en: {
    home: "Home", services: "Services", calculator: "Calculator",
    sendCargo: "Send Cargo", tracking: "Tracking", about: "About",
    contact: "Contact", login: "Login", placeOrder: "Place Order",
    heroTitle: "CargoHub — Digital Freight Platform Across Uzbekistan",
    heroSubtitle: "Send cargo, estimate prices in advance, and easily manage your entire delivery process.",
    heroCta1: "Send Cargo", heroCta2: "Open Calculator",
    heroTag: "Fast, convenient and transparent logistics solution",
    stat1: "Time saved", stat2: "Cost optimized",
    stat3: "Empty runs reduced", stat4: "Real-time tracking",
    howItWorks: "How it works", howSubtitle: "Deliver your cargo in 5 simple steps",
    steps: ["Enter cargo details", "Price is calculated automatically", "Driver submits an offer", "Cargo is tracked on the map", "Leave a rating after delivery"],
    servicesTitle: "Our Services", servicesSubtitle: "Flexible solutions for every type of cargo",
    ctaTitle: "Create your first order today", ctaSubtitle: "Thousands of drivers and customers already trust us",
    ctaStart: "Get started", ctaCalc: "Calculator",
    calcTitle: "Calculator", calcSubtitle: "Estimate the delivery price based on route, cargo type, and exact address.",
    fromSection: "Pickup address", toSection: "Delivery address", cargoSection: "Cargo details",
    fromRegion: "Pickup region", fromCity: "Pickup city / district", fromAddress: "Exact pickup address",
    toRegion: "Delivery region", toCity: "Delivery city / district", toAddress: "Exact delivery address",
    cargoType: "Cargo type", weight: "Weight (kg)", volume: "Volume (m³)", transportType: "Vehicle type",
    urgent: "Express delivery (+30%)", calculate: "Calculate price",
    estimatedPrice: "Estimated price", addressHelper: "Providing an exact address helps calculate the price more accurately.",
    fromAddressPlaceholder: "E.g.: Yunusabad district, Amir Temur street 15",
    toAddressPlaceholder: "E.g.: Registon street 8",
    cityPlaceholder: "E.g.: Tashkent, Chilonzor district",
    distance: "Distance", transportTypeLabel: "Vehicle type", cargoTypeLabel: "Cargo type",
    platformFee: "Platform fee (5%)", totalEstimate: "Total estimated amount",
    estimatedNote: "This price is an estimate only. Final price is agreed with the driver.",
    disclaimerTitle: "Important notice",
    disclaimerText: "The prices shown in the platform calculator are estimates only. Final pricing may vary depending on distance, exact address, cargo type, volume, weight, vehicle type, and additional services. CargoHub is a digital platform that connects users. The user is responsible for proper packaging, accurate cargo information, and compliance with applicable regulations. Sending prohibited or restricted goods is not allowed.",
    sendCargoTitle: "Send Cargo", sendCargoSubtitle: "Enter your cargo details and find the right driver",
    cargoName: "Cargo name", packaging: "Packaging type", phone: "Phone number",
    comment: "Additional comment (optional)", submitOrder: "Submit Order",
    successTitle: "Order received!", successText: "Your order has been submitted. Matching driver offers will appear shortly.",
    footerDesc: "Freight platform across Uzbekistan",
    terms: "Terms of Use", privacy: "Privacy Policy", rules: "Cargo Shipping Rules",
    copyright: "© 2025 CargoHub. All rights reserved.",
    samplePrices: "Sample routes", selectRegion: "Select region", select: "Select",
    optional: "optional",
  },
} as const;

// ─── Shared components ────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "Taklif kutilmoqda": "bg-amber-100 text-amber-800 border-amber-200",
    "Yo'lda": "bg-blue-100 text-blue-800 border-blue-200",
    "Yetkazildi": "bg-green-100 text-green-800 border-green-200",
    "Bekor qilindi": "bg-red-100 text-red-800 border-red-200",
    "Haydovchi tanlandi": "bg-purple-100 text-purple-800 border-purple-200",
    "Tasdiqlangan": "bg-green-100 text-green-800 border-green-200",
    "Tekshiruvda": "bg-amber-100 text-amber-800 border-amber-200",
    "Rad etilgan": "bg-red-100 text-red-800 border-red-200",
    "Faol": "bg-blue-100 text-blue-800 border-blue-200",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status] || "bg-slate-100 text-slate-700 border-slate-200"}`}>
      {status}
    </span>
  );
}

function Modal({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md z-10">{children}</div>
    </div>
  );
}

function DisclaimerBox({ lang }: { lang: Lang }) {
  const tr = T[lang];
  return (
    <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Info size={16} className="text-blue-600" />
        </div>
        <div>
          <h4 className="font-semibold text-blue-900 text-sm mb-1.5">{tr.disclaimerTitle}</h4>
          <p className="text-xs text-blue-800/80 leading-relaxed">{tr.disclaimerText}</p>
        </div>
      </div>
    </div>
  );
}

function LanguageSwitcher({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div className="flex items-center bg-slate-100 rounded-lg p-0.5 gap-0.5">
      {(["uz", "ru", "en"] as Lang[]).map(l => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${lang === l ? "bg-white text-blue-700 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const dims = size === "sm" ? "h-7" : size === "lg" ? "h-12" : "h-9";
  return (
    <ImageWithFallback
      src={cargoHubLogo}
      alt="CargoHub logo"
      className={`${dims} w-auto object-contain`}
    />
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function Sidebar({
  role, currentPage, navigate, mobileOpen, setMobileOpen, lang, setLang
}: {
  role: Role; currentPage: Page; navigate: (p: Page) => void;
  mobileOpen: boolean; setMobileOpen: (v: boolean) => void;
  lang: Lang; setLang: (l: Lang) => void;
}) {
  const customerNav = [
    { label: "Bosh sahifa", page: "customer-dashboard" as Page, icon: Home },
    { label: "Yuk yuborish", page: "create-order" as Page, icon: Plus },
    { label: "Buyurtmalarim", page: "order-details" as Page, icon: List },
    { label: "Kuzatuv", page: "tracking" as Page, icon: Navigation },
    { label: "Kalkulator", page: "price-calculator" as Page, icon: Calculator },
    { label: "To'lovlar", page: "payment" as Page, icon: CreditCard },
    { label: "Reyting", page: "ratings" as Page, icon: Star },
    { label: "Profil", page: "profile" as Page, icon: User },
  ];
  const driverNav = [
    { label: "Bosh sahifa", page: "driver-dashboard" as Page, icon: Home },
    { label: "Mavjud yuklar", page: "driver-dashboard" as Page, icon: Package },
    { label: "Takliflarim", page: "order-details" as Page, icon: List },
    { label: "Marshrutlarim", page: "tracking" as Page, icon: Navigation },
    { label: "Daromadlar", page: "payment" as Page, icon: DollarSign },
    { label: "Reyting", page: "ratings" as Page, icon: Star },
    { label: "Profil", page: "profile" as Page, icon: User },
  ];
  const adminNav = [
    { label: "Ko'rsatkichlar", page: "admin" as Page, icon: BarChart2 },
    { label: "Foydalanuvchilar", page: "admin" as Page, icon: Users },
    { label: "Buyurtmalar", page: "admin" as Page, icon: Package },
    { label: "Haydovchilar", page: "admin" as Page, icon: Truck },
    { label: "To'lovlar", page: "admin" as Page, icon: CreditCard },
    { label: "Analitika", page: "admin" as Page, icon: TrendingUp },
  ];

  const nav = role === "customer" ? customerNav : role === "driver" ? driverNav : adminNav;

  const content = (
    <div className="flex flex-col h-full w-64" style={{ background: "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)" }}>
      <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
        <Logo size="md" />
        <button className="ml-auto md:hidden text-white/60 hover:text-white" onClick={() => setMobileOpen(false)}>
          <X size={18} />
        </button>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {nav.map(({ label, page, icon: Icon }) => {
          const active = currentPage === page;
          return (
            <button
              key={label + page}
              onClick={() => { navigate(page); setMobileOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${active ? "bg-blue-600 text-white shadow-lg shadow-blue-900/40" : "text-slate-400 hover:bg-white/8 hover:text-white"}`}
            >
              <Icon size={16} className={active ? "text-white" : "text-slate-500"} />
              <span className="font-medium">{label}</span>
              {active && <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full" />}
            </button>
          );
        })}
      </nav>
      <div className="px-4 py-3 border-t border-white/10 space-y-2">
        <LanguageSwitcher lang={lang} setLang={setLang} />
        <button onClick={() => navigate("landing")} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-white/8 transition-all">
          <LogOut size={16} /><span>Chiqish</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className="hidden md:block flex-shrink-0">{content}</div>
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden flex">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <div className="relative z-10">{content}</div>
        </div>
      )}
    </>
  );
}

function DashboardLayout({
  role, currentPage, navigate, children, title, lang, setLang
}: {
  role: Role; currentPage: Page; navigate: (p: Page) => void;
  children: React.ReactNode; title: string; lang: Lang; setLang: (l: Lang) => void;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#f1f5f9" }}>
      <Sidebar role={role} currentPage={currentPage} navigate={navigate} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} lang={lang} setLang={setLang} />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-slate-200 px-6 py-3.5 flex items-center gap-4 flex-shrink-0 shadow-sm">
          <button className="md:hidden text-slate-500 hover:text-slate-700" onClick={() => setMobileOpen(true)}>
            <Menu size={20} />
          </button>
          <h1 className="text-base font-semibold text-slate-800">{title}</h1>
          <div className="ml-auto flex items-center gap-3">
            <button className="relative p-2 text-slate-400 hover:text-slate-700 transition-colors">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-sm font-bold cursor-pointer" onClick={() => navigate("profile")}>
              {role === "customer" ? "J" : role === "driver" ? "A" : "AD"}
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}

// ─── Landing Page ─────────────────────────────────────────────────────────────

function LandingPage({ navigate, lang, setLang }: { navigate: (p: Page) => void; lang: Lang; setLang: (l: Lang) => void }) {
  const tr = T[lang];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: tr.home, action: () => setMobileMenuOpen(false) },
    { label: tr.services, action: () => setMobileMenuOpen(false) },
    { label: tr.calculator, action: () => { navigate("price-calculator"); setMobileMenuOpen(false); } },
    { label: tr.sendCargo, action: () => { navigate("send-cargo"); setMobileMenuOpen(false); } },
    { label: tr.tracking, action: () => { navigate("tracking"); setMobileMenuOpen(false); } },
    { label: tr.about, action: () => setMobileMenuOpen(false) },
    { label: tr.contact, action: () => setMobileMenuOpen(false) },
  ];

  const stats = [
    { label: tr.stat1, value: "30–40%", icon: Clock, color: "text-blue-600 bg-blue-50" },
    { label: tr.stat2, value: "15–20%", icon: DollarSign, color: "text-green-600 bg-green-50" },
    { label: tr.stat3, value: "25–30%", icon: Truck, color: "text-purple-600 bg-purple-50" },
    { label: tr.stat4, value: "24/7", icon: Navigation, color: "text-orange-600 bg-orange-50" },
  ];

  const services = [
    { icon: Truck, title: lang === "uz" ? "Viloyatlararo yuk tashish" : lang === "ru" ? "Межрегиональные перевозки" : "Inter-regional freight", desc: lang === "uz" ? "Barcha viloyatlar o'rtasida ishonchli yuk tashish" : lang === "ru" ? "Надёжные грузоперевозки между всеми регионами" : "Reliable freight between all regions" },
    { icon: Package, title: lang === "uz" ? "Kichik biznes uchun yetkazib berish" : lang === "ru" ? "Доставка для малого бизнеса" : "Small business delivery", desc: lang === "uz" ? "Kichik va o'rta bizneslar uchun moslashuvchan logistika" : lang === "ru" ? "Гибкая логистика для МСБ" : "Flexible logistics for SMEs" },
    { icon: Layers, title: lang === "uz" ? "Fermer va ishlab chiqaruvchilar" : lang === "ru" ? "Фермеры и производители" : "Farmers & producers", desc: lang === "uz" ? "Qishloq xo'jaligi mahsulotlari uchun maxsus logistika" : lang === "ru" ? "Специальная логистика для с/х продукции" : "Specialized logistics for agricultural goods" },
    { icon: MapPin, title: lang === "uz" ? "Shaharlararo yuk tashish" : lang === "ru" ? "Городские перевозки" : "City-to-city freight", desc: lang === "uz" ? "Tez va xavfsiz shaharlararo yetkazib berish" : lang === "ru" ? "Быстрая и безопасная межгородская доставка" : "Fast and safe city-to-city delivery" },
  ];

  const testimonials = [
    { name: "Sardor Umarov", role: lang === "uz" ? "Kichik biznes egasi, Samarqand" : lang === "ru" ? "Малый бизнес, Самарканд" : "Small business, Samarkand", text: lang === "uz" ? "CargoHub orqali Toshkentga yuk yubordim. Juda tez va qulay!" : lang === "ru" ? "Отправил груз в Ташкент через CargoHub. Очень быстро и удобно!" : "Sent cargo to Tashkent via CargoHub. Very fast and convenient!", stars: 5 },
    { name: "Nodira Rashidova", role: lang === "uz" ? "Fermer, Farg'ona" : lang === "ru" ? "Фермер, Фергана" : "Farmer, Fergana", text: lang === "uz" ? "Haydovchi tez topildi, narx adolatli edi. Tavsiya qilaman." : lang === "ru" ? "Водитель нашёлся быстро, цена справедливая. Рекомендую." : "Driver found quickly, fair price. Highly recommend.", stars: 5 },
    { name: "Akbar Mirzayev", role: lang === "uz" ? "Qurilish kompaniyasi, Toshkent" : lang === "ru" ? "Строительная компания, Ташкент" : "Construction company, Tashkent", text: lang === "uz" ? "Real vaqt kuzatuvi juda foydali — materiallar qayerda ekanini bildim." : lang === "ru" ? "Отслеживание в реальном времени очень полезно — всегда знал, где материалы." : "Real-time tracking is very useful — always knew where materials were.", stars: 4 },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-30 bg-white/96 backdrop-blur border-b border-slate-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-4">
          <Logo size="md" />
          <div className="hidden lg:flex items-center gap-1 ml-6">
            {navItems.map(item => (
              <button key={item.label} onClick={item.action} className="px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                {item.label}
              </button>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-2">
            <LanguageSwitcher lang={lang} setLang={setLang} />
            <button onClick={() => navigate("auth")} className="hidden sm:block text-sm font-semibold text-slate-700 hover:text-blue-600 px-3 py-1.5 rounded-lg transition-colors">
              {tr.login}
            </button>
            <button onClick={() => navigate("auth")} className="text-sm bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-md shadow-blue-200 whitespace-nowrap">
              {tr.placeOrder}
            </button>
            <button className="lg:hidden p-2 text-slate-600" onClick={() => setMobileMenuOpen(v => !v)}>
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 px-4 py-3 space-y-1">
            {navItems.map(item => (
              <button key={item.label} onClick={item.action} className="w-full text-left px-3 py-2.5 text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                {item.label}
              </button>
            ))}
            <div className="pt-2 border-t border-slate-100">
              <button onClick={() => { navigate("auth"); setMobileMenuOpen(false); }} className="w-full text-left px-3 py-2.5 text-sm font-medium text-slate-700">
                {tr.login}
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="pt-24 pb-20 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 55%, #1e293b 100%)" }}>
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 1400 600" preserveAspectRatio="xMidYMid slice">
            <defs>
              <marker id="ah" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#60a5fa" />
              </marker>
            </defs>
            <line x1="200" y1="120" x2="520" y2="280" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="10 5" markerEnd="url(#ah)" />
            <line x1="520" y1="280" x2="820" y2="180" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="10 5" markerEnd="url(#ah)" />
            <line x1="820" y1="180" x2="1150" y2="320" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="10 5" markerEnd="url(#ah)" />
            <line x1="200" y1="120" x2="350" y2="420" stroke="#34d399" strokeWidth="1" strokeDasharray="8 5" />
            <line x1="350" y1="420" x2="700" y2="470" stroke="#34d399" strokeWidth="1" strokeDasharray="8 5" />
            {[[200,120],[520,280],[820,180],[1150,320],[350,420],[700,470],[950,400]].map(([x,y], i) => (
              <g key={i}><circle cx={x} cy={y} r="6" fill="#60a5fa" opacity="0.8" /><circle cx={x} cy={y} r="12" fill="#60a5fa" opacity="0.12" /></g>
            ))}
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 rounded-full px-4 py-1.5 mb-7">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-blue-300 text-sm font-medium">{tr.heroTag}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-[52px] font-bold leading-tight mb-5 text-white" style={{ fontFamily: "var(--font-display)" }}>
              {tr.heroTitle}
            </h1>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-2xl">{tr.heroSubtitle}</p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => navigate("send-cargo")} className="bg-blue-600 hover:bg-blue-500 text-white px-7 py-3.5 rounded-xl font-semibold flex items-center gap-2 transition-all shadow-xl shadow-blue-900/50">
                {tr.heroCta1} <ArrowRight size={18} />
              </button>
              <button onClick={() => navigate("price-calculator")} className="border border-white/20 hover:bg-white/10 text-white px-7 py-3.5 rounded-xl font-semibold flex items-center gap-2 transition-all">
                <Calculator size={18} className="text-blue-300" /> {tr.heroCta2}
              </button>
            </div>
          </div>
        </div>

        {/* Floating info cards */}
        <div className="hidden xl:flex flex-col gap-3 absolute right-12 top-28 z-10">
          <div className="bg-white/10 backdrop-blur border border-white/15 rounded-2xl p-4 w-52">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-7 h-7 bg-green-500 rounded-lg flex items-center justify-center"><CheckCircle size={13} className="text-white" /></div>
              <div><div className="text-white text-xs font-semibold">{lang === "uz" ? "Yetkazildi" : lang === "ru" ? "Доставлено" : "Delivered"}</div><div className="text-slate-400 text-[10px]">Toshkent → Samarqand</div></div>
            </div>
            <div className="text-green-400 text-sm font-bold">285 000 so'm</div>
          </div>
          <div className="bg-white/10 backdrop-blur border border-white/15 rounded-2xl p-4 w-52">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-7 h-7 bg-blue-500 rounded-lg flex items-center justify-center"><Navigation size={13} className="text-white" /></div>
              <div><div className="text-white text-xs font-semibold">{lang === "uz" ? "Yo'lda" : lang === "ru" ? "В пути" : "In transit"}</div><div className="text-slate-400 text-[10px]">Farg'ona → Toshkent</div></div>
            </div>
            <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" /><span className="text-blue-300 text-xs">{lang === "uz" ? "Jizzax yaqinida" : lang === "ru" ? "Рядом с Джизаком" : "Near Jizzakh"}</span></div>
          </div>
          <div className="bg-white/10 backdrop-blur border border-white/15 rounded-2xl p-4 w-52">
            <div className="text-slate-400 text-xs mb-1">{lang === "uz" ? "Bugungi buyurtmalar" : lang === "ru" ? "Заказы сегодня" : "Today's orders"}</div>
            <div className="text-3xl font-bold text-white">124</div>
            <div className="text-green-400 text-xs mt-1">↑ 18%</div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color}`}><Icon size={19} /></div>
                <div className="text-2xl font-bold text-slate-900">{value}</div>
                <div className="text-sm text-slate-500 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-2" style={{ fontFamily: "var(--font-display)" }}>{tr.howItWorks}</h2>
            <p className="text-slate-500">{tr.howSubtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {tr.steps.map((text, i) => (
              <div key={i} className="relative">
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 text-center hover:border-blue-200 hover:shadow-md transition-all h-full">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-3 shadow-lg shadow-blue-200">{i + 1}</div>
                  <p className="text-sm text-slate-700 font-medium leading-relaxed">{text}</p>
                </div>
                {i < tr.steps.length - 1 && <div className="hidden md:block absolute top-10 -right-3 z-10"><ArrowRight size={14} className="text-blue-300" /></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-2" style={{ fontFamily: "var(--font-display)" }}>{tr.servicesTitle}</h2>
            <p className="text-slate-500">{tr.servicesSubtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg hover:border-blue-100 transition-all group">
                <div className="w-12 h-12 bg-blue-50 group-hover:bg-blue-100 rounded-2xl flex items-center justify-center mb-4 transition-colors"><Icon size={22} className="text-blue-600" /></div>
                <h3 className="font-semibold text-slate-900 mb-2 text-sm">{title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample prices */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-2" style={{ fontFamily: "var(--font-display)" }}>{tr.samplePrices}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              { route: "Toshkent → Chirchiq", price: "25 000" },
              { route: "Toshkent → Samarqand", price: "55 000" },
              { route: "Toshkent → Namangan", price: "40 000" },
              { route: "Toshkent → Andijon", price: "80 000" },
              { route: "Buxoro → Qarshi", price: "45 000" },
            ].map(({ route, price }) => (
              <div key={route} className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm text-center hover:border-blue-200 hover:shadow-md transition-all">
                <div className="flex items-center justify-center gap-1 mb-2 text-xs font-medium text-slate-600"><MapPin size={11} className="text-blue-500" />{route}</div>
                <div className="text-lg font-bold text-blue-700">{price}</div>
                <div className="text-xs text-slate-400">so'm</div>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-slate-400 mt-4">{tr.estimatedNote}</p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-14 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map(t => (
              <div key={t.name} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <div className="flex mb-3">{[...Array(5)].map((_, i) => <Star key={i} size={14} className={i < t.stars ? "text-yellow-400 fill-yellow-400" : "text-slate-200 fill-slate-200"} />)}</div>
                <p className="text-slate-700 text-sm mb-4 leading-relaxed">"{t.text}"</p>
                <div className="text-sm font-semibold text-slate-900">{t.name}</div>
                <div className="text-xs text-slate-400">{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #1e3a8a 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>{tr.ctaTitle}</h2>
          <p className="text-blue-100 mb-8">{tr.ctaSubtitle}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => navigate("send-cargo")} className="bg-white text-blue-700 px-8 py-3.5 rounded-xl font-semibold hover:bg-blue-50 transition-colors shadow-xl">{tr.ctaStart} →</button>
            <button onClick={() => navigate("price-calculator")} className="bg-white/15 border border-white/30 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-white/25 transition-colors flex items-center gap-2"><Calculator size={16} /> {tr.ctaCalc}</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
            <div>
              <Logo size="md" />
              <p className="text-sm mt-3 mb-1">{tr.footerDesc}</p>
              <p className="text-xs">+998 71 123 45 67 · info@cargohub.uz</p>
              <p className="text-xs mt-1">Toshkent, O'zbekiston</p>
            </div>
            <div className="flex gap-12 text-sm">
              <div>
                <div className="text-white font-semibold mb-3">{tr.services}</div>
                <div className="space-y-2">
                  {[tr.sendCargo, tr.calculator, tr.tracking].map(l => <div key={l} className="hover:text-white cursor-pointer transition-colors text-slate-400">{l}</div>)}
                </div>
              </div>
              <div>
                <div className="text-white font-semibold mb-3">{tr.contact}</div>
                <div className="space-y-2">
                  {[tr.terms, tr.privacy, tr.rules, tr.contact].map(l => <div key={l} className="hover:text-white cursor-pointer transition-colors text-slate-400">{l}</div>)}
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs">{tr.copyright}</p>
            <LanguageSwitcher lang={lang} setLang={setLang} />
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─── Auth Page ────────────────────────────────────────────────────────────────

function AuthPage({ navigate, setRole, lang, setLang }: { navigate: (p: Page) => void; setRole: (r: Role) => void; lang: Lang; setLang: (l: Lang) => void }) {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [form, setForm] = useState({ phone: "", password: "", name: "", region: "" });
  const tr = T[lang];

  function handleSubmit() {
    if (!selectedRole) return;
    setRole(selectedRole);
    if (selectedRole === "customer") navigate("customer-dashboard");
    else if (selectedRole === "driver") navigate("driver-dashboard");
    else navigate("admin");
  }

  const roles = [
    { key: "customer" as Role, label: lang === "uz" ? "Mijoz sifatida kirish" : lang === "ru" ? "Войти как клиент" : "Login as customer", icon: User, desc: lang === "uz" ? "Yuk jo'natuvchi" : lang === "ru" ? "Отправитель груза" : "Cargo sender" },
    { key: "driver" as Role, label: lang === "uz" ? "Haydovchi sifatida kirish" : lang === "ru" ? "Войти как водитель" : "Login as driver", icon: Truck, desc: lang === "uz" ? "Yuk tashuvchi haydovchi" : lang === "ru" ? "Водитель-перевозчик" : "Cargo carrier driver" },
    { key: "admin" as Role, label: lang === "uz" ? "Admin panel" : lang === "ru" ? "Панель администратора" : "Admin panel", icon: Shield, desc: lang === "uz" ? "Platforma boshqaruvi" : lang === "ru" ? "Управление платформой" : "Platform management" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%)" }}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="p-7 text-center" style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #1e3a8a 100%)" }}>
          <button onClick={() => navigate("landing")} className="flex items-center justify-center mx-auto mb-2">
            <Logo size="lg" />
          </button>
          <p className="text-blue-200 text-sm mt-2">{tr.heroTag}</p>
          <div className="mt-3 flex justify-center"><LanguageSwitcher lang={lang} setLang={setLang} /></div>
        </div>
        <div className="p-6">
          <div className="flex bg-slate-100 rounded-xl p-1 mb-5">
            {(["login", "register"] as const).map(t => (
              <button key={t} onClick={() => setTab(t)} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${tab === t ? "bg-white shadow text-slate-900" : "text-slate-500"}`}>
                {t === "login" ? tr.login : lang === "uz" ? "Ro'yxatdan o'tish" : lang === "ru" ? "Регистрация" : "Register"}
              </button>
            ))}
          </div>
          <div className="mb-4 space-y-2">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">{lang === "uz" ? "Rol tanlang" : lang === "ru" ? "Выберите роль" : "Select role"}</p>
            {roles.map(({ key, label, icon: Icon, desc }) => (
              <button key={key} onClick={() => setSelectedRole(key)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all text-left ${selectedRole === key ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:border-slate-300 bg-white"}`}>
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${selectedRole === key ? "bg-blue-600" : "bg-slate-100"}`}>
                  <Icon size={16} className={selectedRole === key ? "text-white" : "text-slate-400"} />
                </div>
                <div className="flex-1">
                  <div className={`text-sm font-semibold ${selectedRole === key ? "text-blue-800" : "text-slate-700"}`}>{label}</div>
                  <div className="text-xs text-slate-400">{desc}</div>
                </div>
                {selectedRole === key && <CheckCircle size={16} className="text-blue-600 flex-shrink-0" />}
              </button>
            ))}
          </div>
          <div className="space-y-3">
            {tab === "register" && (
              <div><label className="block text-xs font-semibold text-slate-600 mb-1.5">{lang === "uz" ? "Ism Familiya" : lang === "ru" ? "Имя и фамилия" : "Full name"}</label><input type="text" placeholder="Abdullayev Jahongir" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50" /></div>
            )}
            <div><label className="block text-xs font-semibold text-slate-600 mb-1.5">{lang === "uz" ? "Telefon raqam" : lang === "ru" ? "Номер телефона" : "Phone number"}</label><input type="tel" placeholder="+998 90 123 45 67" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50" /></div>
            {tab === "register" && (
              <div><label className="block text-xs font-semibold text-slate-600 mb-1.5">{lang === "uz" ? "Viloyat" : lang === "ru" ? "Регион" : "Region"}</label><select value={form.region} onChange={e => setForm({ ...form, region: e.target.value })} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50">{REGIONS.map(r => <option key={r}>{r}</option>)}</select></div>
            )}
            <div><label className="block text-xs font-semibold text-slate-600 mb-1.5">{lang === "uz" ? "Parol" : lang === "ru" ? "Пароль" : "Password"}</label><input type="password" placeholder="••••••••" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50" /></div>
          </div>
          <button onClick={handleSubmit} disabled={!selectedRole} className="w-full mt-5 py-3 rounded-xl font-bold text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg" style={{ background: selectedRole ? "linear-gradient(135deg, #1d4ed8, #1e40af)" : "#94a3b8" }}>
            {tab === "login" ? tr.login : lang === "uz" ? "Ro'yxatdan o'tish" : lang === "ru" ? "Зарегистрироваться" : "Register"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Send Cargo (standalone) ──────────────────────────────────────────────────

function SendCargoPage({ navigate, lang }: { navigate: (p: Page) => void; lang: Lang }) {
  const tr = T[lang];
  const [form, setForm] = useState({
    cargoName: "", cargoType: "", weight: "", volume: "", packaging: "",
    fromRegion: "", fromCity: "", fromAddress: "",
    toRegion: "", toCity: "", toAddress: "",
    phone: "", comment: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const cargoTypes = lang === "uz" ? CARGO_TYPES_UZ : lang === "ru" ? CARGO_TYPES_RU : CARGO_TYPES_EN;
  const packageTypes = lang === "uz" ? PACKAGE_TYPES_UZ : lang === "ru" ? PACKAGE_TYPES_RU : PACKAGE_TYPES_EN;
  const inputCls = "w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50";
  const selectCls = inputCls;
  const labelCls = "block text-xs font-semibold text-slate-600 mb-1.5";
  const sectionCls = "bg-white rounded-2xl shadow-sm border border-slate-100 p-6";

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3.5 flex items-center gap-4">
          <button onClick={() => navigate("landing")} className="flex items-center"><Logo size="md" /></button>
          <h1 className="text-base font-semibold text-slate-800 ml-2">{tr.sendCargoTitle}</h1>
          <div className="ml-auto"><LanguageSwitcher lang={lang} setLang={() => {}} /></div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-5">
        <div>
          <h2 className="text-xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>{tr.sendCargoTitle}</h2>
          <p className="text-slate-500 text-sm mt-1">{tr.sendCargoSubtitle}</p>
        </div>

        {/* Cargo info */}
        <div className={sectionCls}>
          <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2"><Package size={16} className="text-blue-600" />{tr.cargoSection}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2"><label className={labelCls}>{tr.cargoName}</label><input value={form.cargoName} onChange={e => setForm({ ...form, cargoName: e.target.value })} placeholder={lang === "uz" ? "Masalan: Maishiy texnika, qurilish mollari" : lang === "ru" ? "Напр.: Бытовая техника, стройматериалы" : "E.g.: Home appliances, construction materials"} className={inputCls} /></div>
            <div><label className={labelCls}>{tr.cargoType}</label><select value={form.cargoType} onChange={e => setForm({ ...form, cargoType: e.target.value })} className={selectCls}><option value="">{tr.select}</option>{cargoTypes.map(t => <option key={t}>{t}</option>)}</select></div>
            <div><label className={labelCls}>{tr.packaging}</label><select value={form.packaging} onChange={e => setForm({ ...form, packaging: e.target.value })} className={selectCls}><option value="">{tr.select}</option>{packageTypes.map(t => <option key={t}>{t}</option>)}</select></div>
            <div><label className={labelCls}>{tr.weight}</label><input type="number" value={form.weight} onChange={e => setForm({ ...form, weight: e.target.value })} placeholder="500" className={inputCls} /></div>
            <div><label className={labelCls}>{tr.volume}</label><input type="number" value={form.volume} onChange={e => setForm({ ...form, volume: e.target.value })} placeholder="3" className={inputCls} /></div>
          </div>
        </div>

        {/* From */}
        <div className={sectionCls}>
          <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2"><MapPin size={16} className="text-blue-600" />{tr.fromSection}</h3>
          <div className="space-y-3">
            <div><label className={labelCls}>{tr.fromRegion}</label><select value={form.fromRegion} onChange={e => setForm({ ...form, fromRegion: e.target.value })} className={selectCls}><option value="">{tr.selectRegion}</option>{REGIONS.map(r => <option key={r}>{r}</option>)}</select></div>
            <div><label className={labelCls}>{tr.fromCity}</label><input value={form.fromCity} onChange={e => setForm({ ...form, fromCity: e.target.value })} placeholder={tr.cityPlaceholder} className={inputCls} /></div>
            <div><label className={labelCls}>{tr.fromAddress}</label><input value={form.fromAddress} onChange={e => setForm({ ...form, fromAddress: e.target.value })} placeholder={tr.fromAddressPlaceholder} className={inputCls} /><p className="text-xs text-slate-400 mt-1">{tr.addressHelper}</p></div>
          </div>
        </div>

        {/* To */}
        <div className={sectionCls}>
          <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2"><Navigation size={16} className="text-green-600" />{tr.toSection}</h3>
          <div className="space-y-3">
            <div><label className={labelCls}>{tr.toRegion}</label><select value={form.toRegion} onChange={e => setForm({ ...form, toRegion: e.target.value })} className={selectCls}><option value="">{tr.selectRegion}</option>{REGIONS.map(r => <option key={r}>{r}</option>)}</select></div>
            <div><label className={labelCls}>{tr.toCity}</label><input value={form.toCity} onChange={e => setForm({ ...form, toCity: e.target.value })} placeholder={tr.cityPlaceholder} className={inputCls} /></div>
            <div><label className={labelCls}>{tr.toAddress}</label><input value={form.toAddress} onChange={e => setForm({ ...form, toAddress: e.target.value })} placeholder={tr.toAddressPlaceholder} className={inputCls} /></div>
          </div>
        </div>

        {/* Contact */}
        <div className={sectionCls}>
          <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2"><Phone size={16} className="text-blue-600" />{lang === "uz" ? "Aloqa" : lang === "ru" ? "Контакты" : "Contact"}</h3>
          <div className="space-y-3">
            <div><label className={labelCls}>{tr.phone}</label><input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+998 90 123 45 67" className={inputCls} /></div>
            <div><label className={labelCls}>{tr.comment}</label><textarea value={form.comment} onChange={e => setForm({ ...form, comment: e.target.value })} rows={3} placeholder={lang === "uz" ? "Qo'shimcha ma'lumot..." : lang === "ru" ? "Дополнительная информация..." : "Additional information..."} className={inputCls + " resize-none"} /></div>
          </div>
        </div>

        <DisclaimerBox lang={lang} />

        <button
          onClick={() => setShowSuccess(true)}
          className="w-full py-3.5 rounded-xl font-bold text-white text-sm shadow-lg transition-all"
          style={{ background: "linear-gradient(135deg, #1d4ed8, #1e40af)" }}
        >
          {tr.submitOrder}
        </button>
      </main>

      <Modal open={showSuccess} onClose={() => { setShowSuccess(false); navigate("landing"); }}>
        <div className="p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5"><CheckCircle size={40} className="text-green-600" /></div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">{tr.successTitle}</h3>
          <p className="text-slate-500 text-sm mb-6 leading-relaxed">{tr.successText}</p>
          <button onClick={() => { setShowSuccess(false); navigate("landing"); }} className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
            {lang === "uz" ? "Bosh sahifaga qaytish" : lang === "ru" ? "На главную" : "Back to home"}
          </button>
        </div>
      </Modal>
    </div>
  );
}

// ─── Price Calculator (Kalkulator) ────────────────────────────────────────────

function PriceCalculatorPage({ lang, navigate }: { lang: Lang; navigate: (p: Page) => void }) {
  const tr = T[lang];
  const [form, setForm] = useState({ fromRegion: "", fromCity: "", fromAddress: "", toRegion: "", toCity: "", toAddress: "", cargoType: "", weight: "", volume: "", transport: "", urgent: false });
  const [result, setResult] = useState<{ distance: number; base: number; typeCoeff: number; transportLabel: string; cargoLabel: string; platformFee: number; total: number } | null>(null);

  const cargoTypes = lang === "uz" ? CARGO_TYPES_UZ : lang === "ru" ? CARGO_TYPES_RU : CARGO_TYPES_EN;
  const transportTypes = lang === "uz" ? TRANSPORT_TYPES_UZ : lang === "ru" ? TRANSPORT_TYPES_RU : TRANSPORT_TYPES_EN;
  const inputCls = "w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50";
  const selectCls = inputCls;
  const labelCls = "block text-xs font-semibold text-slate-600 mb-1.5";

  function calculate() {
    const dist = getDistance(form.fromRegion, form.toRegion);
    // Tiered base price: cheap demo rates that match the C2C affordability promise
    let base: number;
    if (dist <= 100) base = 15000 + dist * 200;          // 15 000–35 000
    else if (dist <= 250) base = 35000 + (dist - 100) * 133; // 35 000–55 000
    else if (dist <= 400) base = 55000 + (dist - 250) * 133; // 55 000–75 000
    else if (dist <= 600) base = 75000 + (dist - 400) * 100; // 75 000–95 000
    else base = Math.min(95000 + (dist - 600) * 50, 120000); // up to 120 000
    const cargoIndex = cargoTypes.indexOf(form.cargoType);
    // Small cargo-type adjustments (±10%) to keep totals in demo range
    const coeffs = [1.08, 0.92, 1.0, 1.06, 0.90, 1.0];
    const typeCoeff = cargoIndex >= 0 ? (coeffs[cargoIndex] || 1.0) : 1.0;
    const tIndex = transportTypes.indexOf(form.transport);
    const tCoeffs = [0.85, 0.90, 1.05, 1.15, 1.20];
    const transportCoeff = tIndex >= 0 ? (tCoeffs[tIndex] || 1.0) : 1.0;
    const urgentCoeff = form.urgent ? 1.3 : 1.0;
    const sub = Math.min(Math.round(base * typeCoeff * transportCoeff * urgentCoeff), 120000);
    const fee = Math.round(sub * 0.05);
    setResult({ distance: dist, base: sub, typeCoeff, transportLabel: form.transport, cargoLabel: form.cargoType, platformFee: fee, total: sub + fee });
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3.5 flex items-center gap-4">
          <button onClick={() => navigate("landing")} className="flex items-center"><Logo size="md" /></button>
          <h1 className="text-base font-semibold text-slate-800 ml-2">{tr.calcTitle}</h1>
          <div className="ml-auto"><LanguageSwitcher lang={lang} setLang={() => {}} /></div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-5">
        <div>
          <h2 className="text-xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>{tr.calcTitle}</h2>
          <p className="text-slate-500 text-sm mt-1">{tr.calcSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          <div className="lg:col-span-3 space-y-4">
            {/* From */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center"><MapPin size={13} className="text-white" /></div>
                <h3 className="font-semibold text-slate-900 text-sm">{tr.fromSection}</h3>
              </div>
              <div className="space-y-3">
                <div><label className={labelCls}>{tr.fromRegion} *</label><select value={form.fromRegion} onChange={e => setForm({ ...form, fromRegion: e.target.value })} className={selectCls}><option value="">{tr.selectRegion}</option>{REGIONS.map(r => <option key={r}>{r}</option>)}</select></div>
                <div><label className={labelCls}>{tr.fromCity}</label><input value={form.fromCity} onChange={e => setForm({ ...form, fromCity: e.target.value })} placeholder={tr.cityPlaceholder} className={inputCls} /></div>
                <div><label className={labelCls}>{tr.fromAddress}</label><input value={form.fromAddress} onChange={e => setForm({ ...form, fromAddress: e.target.value })} placeholder={tr.fromAddressPlaceholder} className={inputCls} /></div>
              </div>
            </div>

            {/* To */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 bg-green-600 rounded-lg flex items-center justify-center"><Navigation size={13} className="text-white" /></div>
                <h3 className="font-semibold text-slate-900 text-sm">{tr.toSection}</h3>
              </div>
              <div className="space-y-3">
                <div><label className={labelCls}>{tr.toRegion} *</label><select value={form.toRegion} onChange={e => setForm({ ...form, toRegion: e.target.value })} className={selectCls}><option value="">{tr.selectRegion}</option>{REGIONS.map(r => <option key={r}>{r}</option>)}</select></div>
                <div><label className={labelCls}>{tr.toCity}</label><input value={form.toCity} onChange={e => setForm({ ...form, toCity: e.target.value })} placeholder={tr.cityPlaceholder} className={inputCls} /></div>
                <div><label className={labelCls}>{tr.toAddress}</label><input value={form.toAddress} onChange={e => setForm({ ...form, toAddress: e.target.value })} placeholder={tr.toAddressPlaceholder} className={inputCls} /></div>
              </div>
              <p className="text-xs text-slate-400 mt-3">{tr.addressHelper}</p>
            </div>

            {/* Cargo details */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 bg-amber-500 rounded-lg flex items-center justify-center"><Package size={13} className="text-white" /></div>
                <h3 className="font-semibold text-slate-900 text-sm">{tr.cargoSection}</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div><label className={labelCls}>{tr.cargoType}</label><select value={form.cargoType} onChange={e => setForm({ ...form, cargoType: e.target.value })} className={selectCls}><option value="">{tr.select}</option>{cargoTypes.map(t => <option key={t}>{t}</option>)}</select></div>
                <div><label className={labelCls}>{tr.transportType}</label><select value={form.transport} onChange={e => setForm({ ...form, transport: e.target.value })} className={selectCls}><option value="">{tr.select}</option>{transportTypes.map(t => <option key={t}>{t}</option>)}</select></div>
                <div><label className={labelCls}>{tr.weight}</label><input type="number" value={form.weight} onChange={e => setForm({ ...form, weight: e.target.value })} placeholder="500" className={inputCls} /></div>
                <div><label className={labelCls}>{tr.volume}</label><input type="number" value={form.volume} onChange={e => setForm({ ...form, volume: e.target.value })} placeholder="3" className={inputCls} /></div>
                <div className="sm:col-span-2">
                  <label className="flex items-center gap-3 p-3 rounded-xl border-2 border-slate-200 hover:border-blue-300 cursor-pointer transition-all">
                    <input type="checkbox" checked={form.urgent} onChange={e => setForm({ ...form, urgent: e.target.checked })} className="w-4 h-4 accent-blue-600" />
                    <div>
                      <div className="text-sm font-medium text-slate-900">⚡ {tr.urgent}</div>
                      <div className="text-xs text-slate-400">{lang === "uz" ? "Narxga 30% qo'shimcha" : lang === "ru" ? "+30% к стоимости" : "+30% to total price"}</div>
                    </div>
                  </label>
                </div>
              </div>
              <button onClick={calculate} disabled={!form.fromRegion || !form.toRegion} className="w-full mt-4 py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all disabled:opacity-40 shadow-lg" style={{ background: "linear-gradient(135deg, #1d4ed8, #1e3a8a)" }}>
                <Calculator size={18} /> {tr.calculate}
              </button>
            </div>
          </div>

          {/* Result panel */}
          <div className="lg:col-span-2 space-y-4">
            {result ? (
              <div className="rounded-2xl overflow-hidden shadow-xl sticky top-24">
                <div className="px-6 py-5 text-white" style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #1e3a8a 100%)" }}>
                  <div className="flex items-center gap-2 mb-2"><Calculator size={18} className="text-blue-200" /><span className="font-bold text-base">{tr.estimatedPrice}</span></div>
                  <div className="text-4xl font-extrabold">{result.total.toLocaleString()}</div>
                  <div className="text-blue-200 text-sm">so'm</div>
                </div>
                <div className="bg-white p-5 space-y-3">
                  {[
                    { label: tr.distance, value: `${result.distance} km` },
                    { label: tr.cargoTypeLabel, value: result.cargoLabel || "—" },
                    { label: tr.transportTypeLabel, value: result.transportLabel || "—" },
                    { label: lang === "uz" ? "Asosiy narx" : lang === "ru" ? "Базовая стоимость" : "Base price", value: `${result.base.toLocaleString()} so'm` },
                    { label: tr.platformFee, value: `${result.platformFee.toLocaleString()} so'm` },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between items-center text-sm border-b border-slate-100 pb-2">
                      <span className="text-slate-500">{label}</span>
                      <span className="font-semibold text-slate-900">{value}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-1">
                    <span className="font-bold text-slate-900">{tr.totalEstimate}</span>
                    <span className="font-extrabold text-blue-700 text-lg">{result.total.toLocaleString()} so'm</span>
                  </div>
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mt-2">
                    <p className="text-xs text-amber-800 font-medium">{tr.estimatedNote}</p>
                  </div>
                  <button onClick={() => navigate("send-cargo")} className="w-full py-2.5 bg-green-600 text-white rounded-xl text-sm font-bold hover:bg-green-700 transition-colors mt-1">
                    {tr.sendCargo} →
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 text-center sticky top-24">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4"><Calculator size={28} className="text-blue-400" /></div>
                <h4 className="font-semibold text-slate-900 mb-2 text-sm">{tr.estimatedPrice}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{lang === "uz" ? "Viloyatlarni tanlang va narxni hisoblash tugmasini bosing" : lang === "ru" ? "Выберите регионы и нажмите кнопку расчёта" : "Select regions and click calculate"}</p>
              </div>
            )}

            {/* Sample prices */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
              <h4 className="font-semibold text-slate-900 text-sm mb-3">{tr.samplePrices}</h4>
              <div className="space-y-2">
                {[
                  { route: "Toshkent → Chirchiq", price: "25 000" },
                  { route: "Toshkent → Samarqand", price: "55 000" },
                  { route: "Toshkent → Andijon", price: "80 000" },
                  { route: "Farg'ona → Toshkent", price: "85 000" },
                  { route: "Nukus → Toshkent", price: "120 000" },
                ].map(({ route, price }) => (
                  <div key={route} className="flex justify-between items-center text-xs py-1.5 border-b border-slate-50">
                    <span className="text-slate-600">{route}</span>
                    <span className="font-bold text-blue-700">{price} so'm</span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-slate-400 mt-2">{tr.estimatedNote}</p>
            </div>

            <DisclaimerBox lang={lang} />
          </div>
        </div>
      </main>
    </div>
  );
}

// ─── Customer Dashboard ───────────────────────────────────────────────────────

function CustomerDashboard({ navigate }: { navigate: (p: Page) => void }) {
  const orders = [
    { id: "#CH-1024", route: "Toshkent → Samarqand", type: "Maishiy texnika", status: "Taklif kutilmoqda", price: "285 000", driver: "—" },
    { id: "#CH-1025", route: "Farg'ona → Toshkent", type: "Qishloq xo'jaligi mahsuloti", status: "Yo'lda", price: "420 000", driver: "Akmal R." },
    { id: "#CH-1026", route: "Buxoro → Qarshi", type: "Qurilish materiali", status: "Yetkazildi", price: "260 000", driver: "Jasur T." },
    { id: "#CH-1027", route: "Andijon → Namangan", type: "Mebel", status: "Haydovchi tanlandi", price: "180 000", driver: "Bobur M." },
  ];
  const topCards = [
    { label: "Faol buyurtmalar", value: "3", icon: Package, bg: "from-blue-500 to-blue-700", sub: "+1 bu hafta" },
    { label: "Kutilayotgan takliflar", value: "5", icon: Clock, bg: "from-amber-400 to-amber-600", sub: "Yangi" },
    { label: "Yetkazilgan yuklar", value: "12", icon: CheckCircle, bg: "from-green-500 to-green-700", sub: "+2 bu oy" },
    { label: "Umumiy xarajat", value: "1.14 mln", icon: DollarSign, bg: "from-purple-500 to-purple-700", sub: "so'm" },
  ];
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h2 className="text-xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>Xush kelibsiz, Jahongir! 👋</h2><p className="text-slate-500 text-sm mt-0.5">Buyurtmalaringiz holati</p></div>
        <button onClick={() => navigate("create-order")} className="bg-blue-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-md shadow-blue-200"><Plus size={16} /> Yuk yuborish</button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {topCards.map(({ label, value, icon: Icon, bg, sub }) => (
          <div key={label} className={`rounded-2xl p-5 bg-gradient-to-br ${bg} text-white shadow-lg`}>
            <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center mb-3"><Icon size={17} className="text-white" /></div>
            <div className="text-2xl font-bold">{value}</div>
            <div className="text-xs text-white/70 mt-0.5">{label}</div>
            <div className="text-xs text-white/60 mt-1">{sub}</div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-semibold text-slate-900">So'nggi buyurtmalar</h3>
          <button onClick={() => navigate("order-details")} className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">Barchasini ko'rish <ChevronRight size={14} /></button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50"><tr>{["ID", "Yo'nalish", "Yuk turi", "Holat", "Narx (so'm)", "Haydovchi", ""].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-slate-100">
              {orders.map(o => (
                <tr key={o.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3"><span className="font-mono text-blue-600 font-semibold text-xs">{o.id}</span></td>
                  <td className="px-4 py-3"><span className="flex items-center gap-1.5 text-slate-700 text-xs"><MapPin size={11} className="text-slate-400 flex-shrink-0" />{o.route}</span></td>
                  <td className="px-4 py-3 text-slate-600 text-xs">{o.type}</td>
                  <td className="px-4 py-3"><StatusBadge status={o.status} /></td>
                  <td className="px-4 py-3 font-semibold text-slate-900 text-xs">{o.price}</td>
                  <td className="px-4 py-3 text-slate-500 text-xs">{o.driver}</td>
                  <td className="px-4 py-3"><button onClick={() => navigate(o.status === "Yo'lda" ? "tracking" : "order-details")} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Eye size={15} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Create Order (Dashboard) ─────────────────────────────────────────────────

function CreateOrderPage({ navigate, lang }: { navigate: (p: Page) => void; lang: Lang }) {
  const tr = T[lang];
  const [step, setStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [form, setForm] = useState({
    name: "", type: "", weight: "", volume: "", packaging: "", phone: "", comment: "",
    fromRegion: "", fromCity: "", fromAddress: "",
    toRegion: "", toCity: "", toAddress: "", date: "",
    refrigerated: false, loader: false, express: false, insurance: false,
  });

  const steps = [
    lang === "uz" ? "Yuk ma'lumotlari" : lang === "ru" ? "Данные груза" : "Cargo details",
    lang === "uz" ? "Yo'nalish" : lang === "ru" ? "Маршрут" : "Route",
    lang === "uz" ? "Qo'shimcha" : lang === "ru" ? "Доп. услуги" : "Add-ons",
    lang === "uz" ? "Narx" : lang === "ru" ? "Цена" : "Price",
  ];
  const cargoTypes = lang === "uz" ? CARGO_TYPES_UZ : lang === "ru" ? CARGO_TYPES_RU : CARGO_TYPES_EN;
  const packageTypes = lang === "uz" ? PACKAGE_TYPES_UZ : lang === "ru" ? PACKAGE_TYPES_RU : PACKAGE_TYPES_EN;
  const inputCls = "w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50";
  const labelCls = "block text-xs font-semibold text-slate-600 mb-1.5";

  function calcPrice() {
    const dist = getDistance(form.fromRegion || "Toshkent shahri", form.toRegion || "Samarqand viloyati");
    let base: number;
    if (dist <= 100) base = 15000 + dist * 200;
    else if (dist <= 250) base = 35000 + (dist - 100) * 133;
    else if (dist <= 400) base = 55000 + (dist - 250) * 133;
    else if (dist <= 600) base = 75000 + (dist - 400) * 100;
    else base = Math.min(95000 + (dist - 600) * 50, 120000);
    const extras = (form.refrigerated ? 40000 : 0) + (form.express ? 60000 : 0) + (form.insurance ? 20000 : 0) + (form.loader ? 30000 : 0);
    const sub = base + extras;
    return { base, extras, commission: Math.round(sub * 0.05), total: Math.round(sub * 1.05), dist };
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center mb-8">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step > i + 1 ? "bg-green-500 text-white" : step === i + 1 ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "bg-slate-200 text-slate-500"}`}>
                {step > i + 1 ? <CheckCircle size={16} /> : i + 1}
              </div>
              <span className={`text-[10px] font-medium hidden sm:block whitespace-nowrap ${step === i + 1 ? "text-blue-600" : "text-slate-400"}`}>{s}</span>
            </div>
            {i < steps.length - 1 && <div className={`flex-1 h-0.5 mx-1 mb-3 ${step > i + 1 ? "bg-green-400" : "bg-slate-200"}`} />}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        {step === 1 && (
          <div>
            <h3 className="font-bold text-slate-900 mb-5 text-base">{steps[0]}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2"><label className={labelCls}>{tr.cargoName}</label><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Masalan: Samsung televizorlar" className={inputCls} /></div>
              <div><label className={labelCls}>{tr.cargoType}</label><select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className={inputCls}><option value="">{tr.select}</option>{cargoTypes.map(t => <option key={t}>{t}</option>)}</select></div>
              <div><label className={labelCls}>{tr.packaging}</label><select value={form.packaging} onChange={e => setForm({ ...form, packaging: e.target.value })} className={inputCls}><option value="">{tr.select}</option>{packageTypes.map(t => <option key={t}>{t}</option>)}</select></div>
              <div><label className={labelCls}>{tr.weight}</label><input type="number" value={form.weight} onChange={e => setForm({ ...form, weight: e.target.value })} placeholder="500" className={inputCls} /></div>
              <div><label className={labelCls}>{tr.volume}</label><input type="number" value={form.volume} onChange={e => setForm({ ...form, volume: e.target.value })} placeholder="3" className={inputCls} /></div>
              <div><label className={labelCls}>{tr.phone}</label><input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+998 90 123 45 67" className={inputCls} /></div>
              <div><label className={labelCls}>{tr.comment}</label><input value={form.comment} onChange={e => setForm({ ...form, comment: e.target.value })} placeholder="Izoh..." className={inputCls} /></div>
              <div className="md:col-span-2">
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-5 text-center hover:border-blue-300 hover:bg-blue-50/30 transition-all cursor-pointer">
                  <Upload size={20} className="mx-auto mb-2 text-slate-400" />
                  <p className="text-sm text-slate-400">{lang === "uz" ? "Yuk rasmi (ixtiyoriy)" : lang === "ru" ? "Фото груза (необязательно)" : "Cargo photo (optional)"}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="font-bold text-slate-900 mb-5 text-base">{steps[1]}</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div><label className={labelCls}>{tr.fromRegion}</label><select value={form.fromRegion} onChange={e => setForm({ ...form, fromRegion: e.target.value })} className={inputCls}><option value="">{tr.selectRegion}</option>{REGIONS.map(r => <option key={r}>{r}</option>)}</select></div>
                <div><label className={labelCls}>{tr.toRegion}</label><select value={form.toRegion} onChange={e => setForm({ ...form, toRegion: e.target.value })} className={inputCls}><option value="">{tr.selectRegion}</option>{REGIONS.map(r => <option key={r}>{r}</option>)}</select></div>
                <div><label className={labelCls}>{tr.fromCity}</label><input value={form.fromCity} onChange={e => setForm({ ...form, fromCity: e.target.value })} placeholder={tr.cityPlaceholder} className={inputCls} /></div>
                <div><label className={labelCls}>{tr.toCity}</label><input value={form.toCity} onChange={e => setForm({ ...form, toCity: e.target.value })} placeholder={tr.cityPlaceholder} className={inputCls} /></div>
              </div>
              <div><label className={labelCls}>{tr.fromAddress}</label><input value={form.fromAddress} onChange={e => setForm({ ...form, fromAddress: e.target.value })} placeholder={tr.fromAddressPlaceholder} className={inputCls} /></div>
              <div><label className={labelCls}>{tr.toAddress}</label><input value={form.toAddress} onChange={e => setForm({ ...form, toAddress: e.target.value })} placeholder={tr.toAddressPlaceholder} className={inputCls} /></div>
              <div><label className={labelCls}>{lang === "uz" ? "Sana va vaqt" : lang === "ru" ? "Дата и время" : "Date and time"}</label><input type="datetime-local" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className={inputCls} /></div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 className="font-bold text-slate-900 mb-5 text-base">{steps[2]}</h3>
            <div className="space-y-3">
              {[
                { key: "refrigerated" as const, icon: "❄️", label: lang === "uz" ? "Sovutkichli transport" : lang === "ru" ? "Рефрижератор" : "Refrigerator truck", price: "+40 000" },
                { key: "loader" as const, icon: "💪", label: lang === "uz" ? "Yuk ko'taruvchi" : lang === "ru" ? "Грузчик" : "Loader service", price: "+30 000" },
                { key: "express" as const, icon: "⚡", label: lang === "uz" ? "Tezkor yetkazish" : lang === "ru" ? "Срочная доставка" : "Express delivery", price: "+60 000" },
                { key: "insurance" as const, icon: "🛡️", label: lang === "uz" ? "Sug'urta" : lang === "ru" ? "Страховка" : "Insurance", price: "+20 000" },
              ].map(({ key, icon, label, price }) => (
                <label key={key} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${form[key] ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:border-slate-300"}`}>
                  <input type="checkbox" checked={form[key]} onChange={e => setForm({ ...form, [key]: e.target.checked })} className="w-4 h-4 accent-blue-600" />
                  <span className="text-2xl">{icon}</span>
                  <div className="flex-1"><div className="text-sm font-semibold text-slate-900">{label}</div><div className="text-xs text-slate-400">{price} so'm</div></div>
                  {form[key] && <CheckCircle size={16} className="text-blue-600" />}
                </label>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (() => {
          const p = calcPrice();
          return (
            <div>
              <h3 className="font-bold text-slate-900 mb-5 text-base">{steps[3]}</h3>
              <div className="rounded-2xl p-6 mb-4" style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #1e3a8a 100%)" }}>
                <div className="flex items-center gap-2 mb-5"><Calculator size={18} className="text-blue-200" /><span className="font-bold text-white">{tr.estimatedPrice}</span></div>
                <div className="space-y-3">
                  {[
                    [lang === "uz" ? "Masofa" : lang === "ru" ? "Расстояние" : "Distance", `~${p.dist} km`],
                    [lang === "uz" ? "Asosiy narx" : lang === "ru" ? "Базовая стоимость" : "Base price", `${p.base.toLocaleString()} so'm`],
                    p.extras > 0 && [lang === "uz" ? "Qo'shimcha xizmatlar" : lang === "ru" ? "Доп. услуги" : "Add-ons", `+${p.extras.toLocaleString()} so'm`],
                    [tr.platformFee, `${p.commission.toLocaleString()} so'm`],
                  ].filter(Boolean).map((row, i) => (
                    <div key={i} className="flex justify-between text-sm"><span className="text-blue-200">{(row as string[])[0]}</span><span className="font-semibold text-white">{(row as string[])[1]}</span></div>
                  ))}
                  <div className="border-t border-blue-400/50 pt-4 flex justify-between items-center">
                    <span className="font-bold text-white">{tr.totalEstimate}</span>
                    <div className="text-right"><div className="text-3xl font-extrabold text-white">{p.total.toLocaleString()}</div><div className="text-blue-200 text-xs">so'm</div></div>
                  </div>
                </div>
              </div>
              <DisclaimerBox lang={lang} />
            </div>
          );
        })()}

        <div className="flex justify-between mt-6 pt-5 border-t border-slate-100">
          <button onClick={() => step > 1 ? setStep(step - 1) : navigate("customer-dashboard")} className="px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            {step > 1 ? `← ${lang === "uz" ? "Orqaga" : lang === "ru" ? "Назад" : "Back"}` : lang === "uz" ? "Bekor qilish" : lang === "ru" ? "Отмена" : "Cancel"}
          </button>
          {step < 4 ? (
            <button onClick={() => setStep(step + 1)} className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-md shadow-blue-200">
              {lang === "uz" ? "Keyingi" : lang === "ru" ? "Далее" : "Next"} <ChevronRight size={16} />
            </button>
          ) : (
            <button onClick={() => setShowSuccess(true)} className="px-5 py-2.5 bg-green-600 text-white rounded-xl text-sm font-semibold hover:bg-green-700 transition-colors flex items-center gap-2 shadow-md shadow-green-200">
              <CheckCircle size={16} /> {tr.submitOrder}
            </button>
          )}
        </div>
      </div>

      <Modal open={showSuccess} onClose={() => { setShowSuccess(false); navigate("customer-dashboard"); }}>
        <div className="p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5"><CheckCircle size={40} className="text-green-600" /></div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">{tr.successTitle}</h3>
          <p className="text-slate-500 text-sm mb-6 leading-relaxed">{tr.successText}</p>
          <button onClick={() => { setShowSuccess(false); navigate("customer-dashboard"); }} className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700">{lang === "uz" ? "Bosh sahifaga qaytish" : lang === "ru" ? "На главную" : "Back to home"}</button>
        </div>
      </Modal>
    </div>
  );
}

// ─── Driver Dashboard ─────────────────────────────────────────────────────────

function DriverDashboard({ navigate }: { navigate: (p: Page) => void }) {
  const [offerModal, setOfferModal] = useState<number | null>(null);
  const [offerSent, setOfferSent] = useState(false);
  const [filterFrom, setFilterFrom] = useState("");
  const [filterTo, setFilterTo] = useState("");
  const [offerForm, setOfferForm] = useState({ price: "", time: "", note: "" });

  const cargos = [
    { id: 1, from: "Toshkent", to: "Samarqand", weight: "800 kg", type: "Maishiy texnika", price: "285 000", date: "25-iyul 2025", rating: 4.8 },
    { id: 2, from: "Andijon", to: "Toshkent", weight: "1.2 tonna", type: "Qishloq xo'jaligi mahsuloti", price: "380 000", date: "26-iyul 2025", rating: 4.5 },
    { id: 3, from: "Buxoro", to: "Qarshi", weight: "2 tonna", type: "Qurilish materiali", price: "260 000", date: "27-iyul 2025", rating: 4.9 },
    { id: 4, from: "Namangan", to: "Toshkent", weight: "500 kg", type: "Mebel", price: "195 000", date: "28-iyul 2025", rating: 4.7 },
    { id: 5, from: "Farg'ona", to: "Toshkent", weight: "3 tonna", type: "Qurilish materiali", price: "420 000", date: "29-iyul 2025", rating: 4.6 },
    { id: 6, from: "Termiz", to: "Samarqand", weight: "1.5 tonna", type: "Qishloq xo'jaligi mahsuloti", price: "310 000", date: "30-iyul 2025", rating: 4.3 },
  ];
  const filtered = cargos.filter(c => (!filterFrom || c.from === filterFrom) && (!filterTo || c.to === filterTo));
  const cities = [...new Set(cargos.flatMap(c => [c.from, c.to]))];

  return (
    <div>
      <div className="mb-6"><h2 className="text-xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>Haydovchi paneli</h2><p className="text-slate-500 text-sm mt-0.5">Mavjud yuklar va marshrutlar</p></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Mavjud yuklar", value: "24", icon: Package, bg: "from-blue-500 to-blue-700" },
          { label: "Faol marshrut", value: "1", icon: Navigation, bg: "from-green-500 to-green-700" },
          { label: "Bu oy daromad", value: "2.4 mln", icon: DollarSign, bg: "from-purple-500 to-purple-700" },
          { label: "Reyting", value: "4.8 ⭐", icon: Award, bg: "from-amber-400 to-amber-600" },
        ].map(({ label, value, icon: Icon, bg }) => (
          <div key={label} className={`rounded-2xl p-5 bg-gradient-to-br ${bg} text-white shadow-lg`}>
            <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center mb-3"><Icon size={17} className="text-white" /></div>
            <div className="text-2xl font-bold">{value}</div><div className="text-xs text-white/70 mt-0.5">{label}</div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 mb-4 flex flex-wrap gap-3 items-center">
        <Filter size={14} className="text-slate-400" /><span className="text-sm font-semibold text-slate-600">Filtr:</span>
        <select value={filterFrom} onChange={e => setFilterFrom(e.target.value)} className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"><option value="">Jo'natish</option>{cities.map(c => <option key={c}>{c}</option>)}</select>
        <select value={filterTo} onChange={e => setFilterTo(e.target.value)} className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"><option value="">Yetkazish</option>{cities.map(c => <option key={c}>{c}</option>)}</select>
        {(filterFrom || filterTo) && <button onClick={() => { setFilterFrom(""); setFilterTo(""); }} className="flex items-center gap-1 text-xs text-red-500 border border-red-200 rounded-lg px-2 py-1.5"><X size={12} /> Tozalash</button>}
        <span className="ml-auto text-xs text-slate-400">{filtered.length} ta yuk</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(c => (
          <div key={c.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 hover:shadow-md hover:border-blue-100 transition-all">
            <div className="flex items-start justify-between mb-3">
              <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full">{c.type}</span>
              <div className="flex items-center gap-1"><Star size={12} fill="currentColor" className="text-yellow-400" /><span className="text-xs text-slate-600 font-medium">{c.rating}</span></div>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex-1 bg-slate-50 rounded-lg px-3 py-2 text-center"><div className="text-xs text-slate-400 mb-0.5">Dan</div><div className="text-sm font-bold text-slate-900">{c.from}</div></div>
              <ArrowRight size={14} className="text-blue-400 flex-shrink-0" />
              <div className="flex-1 bg-slate-50 rounded-lg px-3 py-2 text-center"><div className="text-xs text-slate-400 mb-0.5">Ga</div><div className="text-sm font-bold text-slate-900">{c.to}</div></div>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-4 text-xs text-slate-500">
              <div className="flex items-center gap-1"><Package size={11} className="text-slate-400" /> {c.weight}</div>
              <div className="flex items-center gap-1"><Clock size={11} className="text-slate-400" /> {c.date}</div>
            </div>
            <div className="flex items-center justify-between mb-4"><span className="text-xs text-slate-400">Taxminiy narx</span><span className="font-bold text-slate-900">{c.price} so'm</span></div>
            <button onClick={() => { setOfferModal(c.id); setOfferSent(false); setOfferForm({ price: "", time: "", note: "" }); }} className="w-full bg-blue-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-md shadow-blue-100">
              <Zap size={14} /> Taklif berish
            </button>
          </div>
        ))}
      </div>
      <Modal open={offerModal !== null} onClose={() => setOfferModal(null)}>
        <div className="p-6">
          {offerSent ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle size={32} className="text-green-600" /></div>
              <h3 className="font-bold text-slate-900 mb-2">Taklif yuborildi!</h3>
              <p className="text-sm text-slate-500 mb-5">Mijoz taklifingizni ko'rib chiqadi.</p>
              <button onClick={() => setOfferModal(null)} className="w-full bg-blue-600 text-white py-2.5 rounded-xl text-sm font-semibold">Yopish</button>
            </div>
          ) : (
            <div>
              <h3 className="font-bold text-slate-900 mb-5">Taklif yuborish</h3>
              <div className="space-y-3">
                <div><label className="block text-xs font-semibold text-slate-600 mb-1.5">Taklif narxi (so'm)</label><input value={offerForm.price} onChange={e => setOfferForm({ ...offerForm, price: e.target.value })} placeholder="285 000" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50" /></div>
                <div><label className="block text-xs font-semibold text-slate-600 mb-1.5">Yetib borish vaqti</label><input value={offerForm.time} onChange={e => setOfferForm({ ...offerForm, time: e.target.value })} placeholder="4 soat" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50" /></div>
                <div><label className="block text-xs font-semibold text-slate-600 mb-1.5">Izoh (ixtiyoriy)</label><textarea value={offerForm.note} onChange={e => setOfferForm({ ...offerForm, note: e.target.value })} rows={3} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 resize-none" /></div>
              </div>
              <div className="flex gap-3 mt-5">
                <button onClick={() => setOfferModal(null)} className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50">Bekor qilish</button>
                <button onClick={() => setOfferSent(true)} className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 shadow-md">Yuborish</button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}

// ─── Order Details ────────────────────────────────────────────────────────────

function OrderDetailsPage({ navigate }: { navigate: (p: Page) => void }) {
  const [selectedDriver, setSelectedDriver] = useState<number | null>(null);
  const [status, setStatus] = useState("Taklif kutilmoqda");
  const drivers = [
    { id: 1, name: "Akmal Rahimov", vehicle: "Isuzu, 5 tonna", rating: 4.8, orders: 124, price: "285 000", time: "4 soat", plate: "01 A 234 BC" },
    { id: 2, name: "Bobur Mirzayev", vehicle: "Gazel, 1.5 tonna", rating: 4.5, orders: 87, price: "270 000", time: "4.5 soat", plate: "10 B 567 CD" },
    { id: 3, name: "Jasur Toshmatov", vehicle: "Fura, 10 tonna", rating: 4.9, orders: 203, price: "310 000", time: "3.5 soat", plate: "30 M 890 EF" },
  ];
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-2">
        <button onClick={() => navigate("customer-dashboard")} className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-white rounded-lg transition-all"><ChevronRight size={18} className="rotate-180" /></button>
        <h2 className="text-xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>Buyurtma: #CH-1024</h2>
        <StatusBadge status={status} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2"><FileText size={16} className="text-blue-600" />Buyurtma ma'lumotlari</h3>
            <div className="space-y-3 text-sm">
              {[["Yo'nalish","Toshkent → Samarqand"],["Yuk turi","Maishiy texnika"],["Og'irligi","800 kg"],["Sana","25-iyul 2025"],].map(([l,v]) => (
                <div key={l} className="flex justify-between items-start gap-2"><span className="text-slate-500 text-xs flex-shrink-0">{l}</span><span className="font-medium text-slate-900 text-xs text-right">{v}</span></div>
              ))}
              <div className="border-t border-slate-100 pt-3 flex justify-between items-center"><span className="text-slate-500 text-xs">Taxminiy narx</span><span className="font-bold text-blue-700">285 000 so'm</span></div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2"><User size={16} className="text-blue-600" />Mijoz</h3>
            <div className="flex items-center gap-3"><div className="w-11 h-11 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold">J</div><div><div className="text-sm font-semibold text-slate-900">Jahongir Abdullayev</div><div className="text-xs text-slate-500">+998 90 234 56 78</div></div></div>
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2"><Truck size={16} className="text-blue-600" />Haydovchilarning takliflari<span className="ml-auto text-xs text-slate-400 font-normal">{drivers.length} ta taklif</span></h3>
            <div className="space-y-3">
              {drivers.map(d => (
                <div key={d.id} className={`rounded-xl p-4 border-2 transition-all ${selectedDriver === d.id ? "border-green-500 bg-green-50" : "border-slate-200 hover:border-slate-300"}`}>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-700 flex-shrink-0">{d.name.charAt(0)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center flex-wrap gap-2 mb-0.5"><span className="font-semibold text-slate-900 text-sm">{d.name}</span>{selectedDriver === d.id && <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded-full">✓ Tanlandi</span>}</div>
                      <div className="text-xs text-slate-500 mb-1">{d.vehicle} · {d.plate}</div>
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1"><Star size={10} fill="currentColor" className="text-yellow-400" />{d.rating}</span>
                        <span>{d.orders} buyurtma</span>
                        <span className="flex items-center gap-1"><Clock size={10} />{d.time}</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-bold text-blue-700 text-base">{d.price}</div><div className="text-xs text-slate-400 mb-2">so'm</div>
                      {selectedDriver !== d.id && status !== "Haydovchi tanlandi" ? (
                        <button onClick={() => { setSelectedDriver(d.id); setStatus("Haydovchi tanlandi"); }} className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors">Tanlash</button>
                      ) : selectedDriver === d.id ? (
                        <button onClick={() => navigate("tracking")} className="text-xs bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 flex items-center gap-1"><Navigation size={10} /> Kuzatuv</button>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Tracking Page ────────────────────────────────────────────────────────────

function TrackingPage() {
  const timeline = [
    { label: "Buyurtma yaratildi", done: true, active: false, time: "09:00" },
    { label: "Haydovchi tanlandi", done: true, active: false, time: "09:45" },
    { label: "Yuk olindi", done: true, active: false, time: "11:30" },
    { label: "Yo'lda", done: true, active: true, time: "12:00" },
    { label: "Yetkazildi", done: false, active: false, time: "~14:30" },
  ];
  const mapCities = [
    { name: "Toshkent", x: 71, y: 24, main: true },
    { name: "Samarqand", x: 45, y: 54, dest: true },
    { name: "Jizzax", x: 59, y: 40, current: true },
    { name: "Farg'ona", x: 84, y: 26 }, { name: "Andijon", x: 90, y: 22 },
    { name: "Buxoro", x: 28, y: 52 }, { name: "Nukus", x: 10, y: 20 },
    { name: "Namangan", x: 80, y: 20 }, { name: "Qarshi", x: 42, y: 66 },
  ];
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-2">
        <h2 className="text-xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>Real vaqt kuzatuvi</h2>
        <span className="flex items-center gap-1.5 text-xs font-semibold bg-green-100 text-green-700 border border-green-200 px-3 py-1 rounded-full"><span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> Jonli</span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2 font-semibold text-slate-900 text-sm"><MapPin size={16} className="text-blue-600" /> Toshkent → Samarqand</div>
            <div className="flex items-center gap-3 text-xs text-slate-500"><span>305 km</span><span className="text-blue-600 font-semibold">~60% yakunlandi</span></div>
          </div>
          <div className="relative bg-gradient-to-br from-blue-50 to-slate-100 h-72">
            <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
              <path d="M8,18 L18,14 L32,10 L55,8 L75,10 L92,16 L97,28 L95,42 L92,55 L85,68 L73,78 L58,84 L44,86 L30,80 L18,72 L10,58 L6,42 L8,28 Z" fill="#dbeafe" stroke="#93c5fd" strokeWidth="0.4" opacity="0.8" />
              {[20,40,60,80].map(x => <line key={x} x1={x} y1="0" x2={x} y2="100" stroke="#e2e8f0" strokeWidth="0.2" />)}
              {[20,40,60,80].map(y => <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#e2e8f0" strokeWidth="0.2" />)}
              <line x1="71" y1="24" x2="45" y2="54" stroke="#93c5fd" strokeWidth="1.2" strokeDasharray="3 2" />
              <line x1="71" y1="24" x2="59" y2="40" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round" />
              {mapCities.map(c => (
                <g key={c.name}>
                  {c.current && <circle cx={c.x} cy={c.y} r="5" fill="#f59e0b" opacity="0.2" />}
                  <circle cx={c.x} cy={c.y} r={c.main || c.dest ? "2.5" : c.current ? "2.5" : "1.5"} fill={c.main ? "#1d4ed8" : c.dest ? "#16a34a" : c.current ? "#f59e0b" : "#94a3b8"} stroke="white" strokeWidth={c.main || c.dest || c.current ? "0.6" : "0"} />
                  <text x={c.x + 2} y={c.y - 2} fontSize="3.2" fill={c.main ? "#1e3a8a" : c.dest ? "#166534" : c.current ? "#92400e" : "#64748b"} fontWeight={c.main || c.dest || c.current ? "600" : "400"}>{c.name}</text>
                </g>
              ))}
              <text x="56.5" y="43" fontSize="4.5">🚛</text>
            </svg>
            <div className="absolute bottom-3 left-3 bg-white/90 rounded-xl p-2.5 text-xs space-y-1.5 shadow-sm">
              {[["bg-blue-600","Jo'natish"],["bg-green-600","Yetkazish"],["bg-amber-400","Hozirgi joylashuv"]].map(([c,l]) => <div key={l} className="flex items-center gap-1.5"><span className={`w-3 h-3 ${c} rounded-full`} /><span className="text-slate-600">{l}</span></div>)}
            </div>
            <div className="absolute top-3 right-3 bg-white/90 rounded-xl p-2.5 shadow-sm text-xs"><div className="text-slate-400">Yetib borish</div><div className="font-bold text-slate-900 text-sm">2 soat 30 daqiqa</div></div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-2xl p-5 text-white" style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #1e3a8a 100%)" }}>
            <div className="text-blue-200 text-xs font-medium mb-1">Hozirgi joylashuv</div>
            <div className="font-bold text-xl mb-1">Jizzax viloyati</div>
            <div className="text-blue-100 text-sm">Taxminiy yetib borish: 2 soat 30 daqiqa</div>
            <div className="mt-3 bg-white/20 rounded-lg h-1.5"><div className="bg-green-400 h-1.5 rounded-lg" style={{ width: "60%" }} /></div>
            <div className="text-blue-200 text-xs mt-1">60% yakunlandi</div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <h3 className="font-semibold text-slate-900 mb-4 text-sm">Yetkazish holati</h3>
            <div className="space-y-0">
              {timeline.map(({ label, done, active, time }, i) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${active ? "bg-blue-600 shadow-lg shadow-blue-200" : done ? "bg-green-500" : "bg-slate-200"}`}>
                      {active ? <span className="w-2 h-2 bg-white rounded-full animate-pulse" /> : done ? <CheckCircle size={13} className="text-white" /> : <span className="w-2 h-2 bg-slate-400 rounded-full" />}
                    </div>
                    {i < timeline.length - 1 && <div className={`w-0.5 h-6 ${done && !active ? "bg-green-200" : "bg-slate-100"}`} />}
                  </div>
                  <div className="flex-1 pb-1 pt-0.5"><div className={`text-xs font-semibold ${active ? "text-blue-600" : done ? "text-green-700" : "text-slate-400"}`}>{label}</div><div className="text-xs text-slate-400">{time}</div></div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <h3 className="font-semibold text-slate-900 mb-3 text-sm">Haydovchi</h3>
            <div className="flex items-center gap-3 mb-4"><div className="w-11 h-11 bg-slate-800 rounded-xl flex items-center justify-center text-white font-bold">A</div><div><div className="font-semibold text-slate-900 text-sm">Akmal Rahimov</div><div className="text-xs text-slate-500">Isuzu · 01 A 234 BC</div><div className="flex items-center gap-1 mt-0.5"><Star size={10} fill="currentColor" className="text-yellow-400" /><span className="text-xs font-medium text-slate-700">4.8</span></div></div></div>
            <div className="text-xs text-slate-500 mb-4 flex items-center gap-1.5"><Phone size={11} />+998 90 123 45 67</div>
            <div className="grid grid-cols-2 gap-2">
              <button className="flex items-center justify-center gap-1.5 bg-green-600 text-white py-2 rounded-xl text-xs font-semibold hover:bg-green-700 transition-colors"><Phone size={12} /> Qo'ng'iroq</button>
              <button className="flex items-center justify-center gap-1.5 bg-blue-600 text-white py-2 rounded-xl text-xs font-semibold hover:bg-blue-700 transition-colors"><MessageSquare size={12} /> Chat</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Payment Page ─────────────────────────────────────────────────────────────

function PaymentPage({ lang }: { lang: Lang }) {
  const [method, setMethod] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const methods = [
    { id: "uzcard", label: "Uzcard", emoji: "💳", color: "from-blue-500 to-blue-700" },
    { id: "humo", label: "Humo", emoji: "💳", color: "from-emerald-500 to-emerald-700" },
    { id: "qr", label: "QR to'lov", emoji: "📱", color: "from-violet-500 to-violet-700" },
    { id: "cash", label: lang === "uz" ? "Naqd to'lov" : lang === "ru" ? "Наличные" : "Cash payment", emoji: "💵", color: "from-amber-500 to-amber-700" },
  ];
  if (confirmed) return (
    <div className="max-w-md mx-auto mt-6">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5"><CheckCircle size={40} className="text-green-600" /></div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">{lang === "uz" ? "To'lov muvaffaqiyatli!" : lang === "ru" ? "Оплата успешна!" : "Payment successful!"}</h2>
        <p className="text-slate-500 text-sm mb-5">{lang === "uz" ? "To'lov muvaffaqiyatli tasdiqlandi." : lang === "ru" ? "Платёж успешно подтверждён." : "Payment has been confirmed."}</p>
        <div className="bg-slate-50 rounded-xl p-4 mb-6 text-left text-sm space-y-2">
          {[["Buyurtma","#CH-1026"],["To'lov usuli",methods.find(m=>m.id===method)?.label || ""],["Jami","260 000 so'm"]].map(([l,v])=><div key={l} className="flex justify-between text-slate-600"><span>{l}</span><span className="font-semibold text-slate-900">{v}</span></div>)}
        </div>
        <button onClick={() => setConfirmed(false)} className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700">{lang === "uz" ? "Bosh sahifaga qaytish" : lang === "ru" ? "На главную" : "Back to home"}</button>
      </div>
    </div>
  );
  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div><h2 className="text-xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>{lang === "uz" ? "To'lov" : lang === "ru" ? "Оплата" : "Payment"}</h2><p className="text-slate-500 text-sm mt-1">{lang === "uz" ? "Qulay to'lov usulini tanlang" : lang === "ru" ? "Выберите удобный способ оплаты" : "Choose a convenient payment method"}</p></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h3 className="font-semibold text-slate-900 mb-4 text-sm">{lang === "uz" ? "To'lov usuli" : lang === "ru" ? "Способ оплаты" : "Payment method"}</h3>
          <div className="grid grid-cols-2 gap-3">
            {methods.map(m => (
              <button key={m.id} onClick={() => setMethod(m.id)} className={`relative p-4 rounded-xl border-2 transition-all text-left ${method === m.id ? "border-blue-500" : "border-slate-200 hover:border-slate-300"}`}>
                {method === m.id && <div className="absolute top-2 right-2"><CheckCircle size={16} className="text-blue-600" /></div>}
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${m.color} flex items-center justify-center mb-3 text-xl`}>{m.emoji}</div>
                <div className="font-semibold text-sm text-slate-900">{m.label}</div>
              </button>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col">
          <h3 className="font-semibold text-slate-900 mb-4 text-sm">Buyurtma #CH-1026</h3>
          <div className="space-y-2 text-sm flex-1">
            {[["Buyurtma narxi","260 000"],["Platforma (5%)","13 000"]].map(([l,v])=><div key={l} className="flex justify-between text-slate-600"><span>{l}</span><span>{v}</span></div>)}
            <div className="border-t border-slate-200 pt-2 flex justify-between font-bold text-slate-900"><span>{lang === "uz" ? "Jami" : lang === "ru" ? "Итого" : "Total"}</span><span className="text-blue-700">273 000 so'm</span></div>
          </div>
          <button onClick={() => method && setConfirmed(true)} disabled={!method} className="mt-5 w-full py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all disabled:opacity-40 shadow-lg" style={{ background: method ? "linear-gradient(135deg, #16a34a, #15803d)" : "#94a3b8" }}>
            <Shield size={16} /> {lang === "uz" ? "To'lovni tasdiqlash" : lang === "ru" ? "Подтвердить оплату" : "Confirm payment"}
          </button>
          <p className="text-xs text-slate-400 text-center mt-2 flex items-center justify-center gap-1"><Shield size={10} />{lang === "uz" ? "Xavfsiz to'lov" : lang === "ru" ? "Безопасный платёж" : "Secure payment"}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Ratings Page ─────────────────────────────────────────────────────────────

function RatingsPage() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const driverCards = [
    { name: "Akmal Rahimov", orders: 124, rating: 4.8, vehicle: "Isuzu", reviews: ["Yuk o'z vaqtida yetkazildi.", "Haydovchi aloqa uchun doim ochiq bo'ldi."] },
    { name: "Jasur Toshmatov", orders: 203, rating: 4.9, vehicle: "Fura", reviews: ["Transport toza va yuk xavfsiz yetkazildi.", "Juda yaxshi xizmat."] },
    { name: "Bobur Mirzayev", orders: 87, rating: 4.5, vehicle: "Gazel", reviews: ["Narx adolatli, haydovchi muomilali."] },
  ];
  return (
    <div className="space-y-6">
      <div><h2 className="text-xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>Reytinglar va sharhlar</h2><p className="text-slate-500 text-sm mt-1">Ishonchli platforma tizimi</p></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {driverCards.map(d => (
          <div key={d.name} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <div className="flex items-center gap-3 mb-4"><div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center font-bold text-white text-lg">{d.name.charAt(0)}</div><div><div className="font-bold text-slate-900 text-sm">{d.name}</div><div className="text-xs text-slate-500">{d.vehicle} · {d.orders} buyurtma</div></div></div>
            <div className="flex items-center gap-1 mb-4">{[1,2,3,4,5].map(s=><Star key={s} size={16} className={s<=Math.floor(d.rating)?"text-yellow-400 fill-yellow-400":"text-slate-200 fill-slate-200"} />)}<span className="text-sm font-bold text-slate-900 ml-1">{d.rating}</span></div>
            <div className="space-y-2">{d.reviews.map(r=><div key={r} className="bg-slate-50 rounded-xl p-3 text-xs text-slate-600 leading-relaxed border-l-2 border-blue-200">"{r}"</div>)}</div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 max-w-lg">
        <h3 className="font-bold text-slate-900 mb-5 flex items-center gap-2"><Star size={16} className="text-yellow-400 fill-yellow-400" /> Sharh qoldirish</h3>
        {submitted ? (
          <div className="text-center py-6"><div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3"><CheckCircle size={28} className="text-green-600" /></div><h4 className="font-bold text-slate-900 mb-1">Rahmat!</h4><p className="text-sm text-slate-500">Sharhingiз qabul qilindi.</p></div>
        ) : (
          <div className="space-y-4">
            <div><label className="block text-xs font-semibold text-slate-600 mb-2">Reyting bering</label><div className="flex gap-2">{[1,2,3,4,5].map(s=><button key={s} onMouseEnter={()=>setHover(s)} onMouseLeave={()=>setHover(0)} onClick={()=>setRating(s)} className="transition-transform hover:scale-110 active:scale-95"><Star size={32} className={s<=(hover||rating)?"text-yellow-400 fill-yellow-400":"text-slate-200 fill-slate-200"} /></button>)}{rating>0&&<span className="text-sm font-bold text-slate-700 self-center">{["","Yomon","Qoniqarsiz","O'rtacha","Yaxshi","A'lo"][rating]}</span>}</div></div>
            <div><label className="block text-xs font-semibold text-slate-600 mb-1.5">Izoh</label><textarea value={comment} onChange={e=>setComment(e.target.value)} rows={3} placeholder="Tajribangizni baham ko'ring..." className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 resize-none" /></div>
            <button onClick={()=>rating>0&&setSubmitted(true)} disabled={rating===0} className="w-full py-2.5 rounded-xl text-sm font-bold text-white disabled:opacity-40 shadow-md" style={{ background:"linear-gradient(135deg,#1d4ed8,#1e3a8a)" }}>Sharh qoldirish</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Admin Dashboard ──────────────────────────────────────────────────────────

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"overview"|"orders"|"drivers">("overview");
  const barData = [{ name: "Toshkent", buyurtmalar: 420 },{ name: "Samarqand", buyurtmalar: 280 },{ name: "Farg'ona", buyurtmalar: 190 },{ name: "Andijon", buyurtmalar: 165 },{ name: "Buxoro", buyurtmalar: 130 },{ name: "Nukus", buyurtmalar: 85 }];
  const lineData = [{ oy: "Yan", b: 850 },{ oy: "Fev", b: 1100 },{ oy: "Mar", b: 1400 },{ oy: "Apr", b: 1250 },{ oy: "May", b: 1800 },{ oy: "Iyu", b: 2100 },{ oy: "Iyul", b: 2450 }];
  const latestOrders = [
    { id:"#CH-1030",from:"Toshkent",to:"Farg'ona",status:"Yo'lda",amount:"420 000" },
    { id:"#CH-1029",from:"Samarqand",to:"Buxoro",status:"Yetkazildi",amount:"260 000" },
    { id:"#CH-1028",from:"Andijon",to:"Toshkent",status:"Taklif kutilmoqda",amount:"380 000" },
    { id:"#CH-1027",from:"Nukus",to:"Toshkent",status:"Haydovchi tanlandi",amount:"520 000" },
  ];
  const pendingDrivers = [
    { name:"Sherzod Nazarov",vehicle:"Isuzu, 5t",region:"Toshkent",status:"Tekshiruvda",date:"24-iyul" },
    { name:"Firdavs Tursunov",vehicle:"Gazel, 1.5t",region:"Samarqand",status:"Tasdiqlangan",date:"23-iyul" },
    { name:"Ulugbek Xasanov",vehicle:"Fura, 10t",region:"Farg'ona",status:"Rad etilgan",date:"22-iyul" },
    { name:"Bahodir Qodirov",vehicle:"Isuzu, 3t",region:"Namangan",status:"Tekshiruvda",date:"25-iyul" },
  ];
  const topCards = [
    { label:"Jami foydalanuvchilar",value:"3 482",icon:Users,bg:"from-blue-500 to-blue-700",sub:"+124 bu oy" },
    { label:"Faol haydovchilar",value:"786",icon:Truck,bg:"from-green-500 to-green-700",sub:"Tasdiqlangan" },
    { label:"Bugungi buyurtmalar",value:"124",icon:Package,bg:"from-purple-500 to-purple-700",sub:"+18 kecha" },
    { label:"Oylik tranzaksiya",value:"480 mln",icon:DollarSign,bg:"from-amber-400 to-amber-600",sub:"so'm" },
  ];
  return (
    <div>
      <div className="mb-6"><h2 className="text-xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>Admin paneli</h2><p className="text-slate-500 text-sm mt-0.5">Platforma statistikasi va boshqaruvi</p></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {topCards.map(({ label, value, icon: Icon, bg, sub }) => (
          <div key={label} className={`rounded-2xl p-5 bg-gradient-to-br ${bg} text-white shadow-lg`}>
            <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center mb-3"><Icon size={17} className="text-white" /></div>
            <div className="text-2xl font-bold">{value}</div><div className="text-xs text-white/70 mt-0.5">{label}</div><div className="text-xs text-white/50 mt-1">{sub}</div>
          </div>
        ))}
      </div>
      <div className="flex gap-1 bg-slate-100 rounded-xl p-1 mb-5 w-fit">
        {([["overview","Ko'rsatkichlar",BarChart2],["orders","Buyurtmalar",Package],["drivers","Haydovchilar",Truck]] as const).map(([id,label,Icon])=>(
          <button key={id} onClick={()=>setActiveTab(id as typeof activeTab)} className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab===id?"bg-white shadow text-slate-900":"text-slate-500 hover:text-slate-700"}`}><Icon size={14}/>{label}</button>
        ))}
      </div>
      {activeTab==="overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5"><h3 className="font-semibold text-slate-900 mb-4 text-sm">Viloyatlar bo'yicha buyurtmalar</h3><ResponsiveContainer width="100%" height={220}><BarChart data={barData} margin={{top:0,right:0,left:-20,bottom:0}}><CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/><XAxis dataKey="name" tick={{fontSize:11,fill:"#64748b"}}/><YAxis tick={{fontSize:11,fill:"#64748b"}}/><Tooltip contentStyle={{borderRadius:"12px",border:"none",boxShadow:"0 4px 24px rgba(0,0,0,0.1)"}}/><Bar dataKey="buyurtmalar" fill="#3b82f6" radius={[6,6,0,0]}/></BarChart></ResponsiveContainer></div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5"><h3 className="font-semibold text-slate-900 mb-4 text-sm">Oylik o'sish</h3><ResponsiveContainer width="100%" height={220}><LineChart data={lineData} margin={{top:0,right:0,left:-20,bottom:0}}><CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/><XAxis dataKey="oy" tick={{fontSize:11,fill:"#64748b"}}/><YAxis tick={{fontSize:11,fill:"#64748b"}}/><Tooltip contentStyle={{borderRadius:"12px",border:"none",boxShadow:"0 4px 24px rgba(0,0,0,0.1)"}}/><Line type="monotone" dataKey="b" stroke="#16a34a" strokeWidth={2.5} dot={{r:4,fill:"#16a34a"}} activeDot={{r:6}}/></LineChart></ResponsiveContainer></div>
        </div>
      )}
      {activeTab==="orders" && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100"><h3 className="font-semibold text-slate-900">So'nggi buyurtmalar</h3></div>
          <div className="overflow-x-auto"><table className="w-full text-sm"><thead className="bg-slate-50"><tr>{["ID","Jo'natish","Yetkazish","Holat","Summa"].map(h=><th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">{h}</th>)}</tr></thead><tbody className="divide-y divide-slate-100">{latestOrders.map(o=><tr key={o.id} className="hover:bg-slate-50"><td className="px-4 py-3"><span className="font-mono text-blue-600 font-semibold text-xs">{o.id}</span></td><td className="px-4 py-3 text-xs">{o.from}</td><td className="px-4 py-3 text-xs">{o.to}</td><td className="px-4 py-3"><StatusBadge status={o.status}/></td><td className="px-4 py-3 font-semibold text-xs">{o.amount} so'm</td></tr>)}</tbody></table></div>
        </div>
      )}
      {activeTab==="drivers" && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100"><h3 className="font-semibold text-slate-900">Haydovchilar tekshiruvi</h3></div>
          <div className="overflow-x-auto"><table className="w-full text-sm"><thead className="bg-slate-50"><tr>{["Ism","Transport","Viloyat","Sana","Holat","Amal"].map(h=><th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">{h}</th>)}</tr></thead><tbody className="divide-y divide-slate-100">{pendingDrivers.map(d=><tr key={d.name} className="hover:bg-slate-50"><td className="px-4 py-3"><div className="flex items-center gap-2"><div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 text-xs font-bold">{d.name.charAt(0)}</div><span className="font-medium text-slate-900 text-xs">{d.name}</span></div></td><td className="px-4 py-3 text-xs text-slate-600">{d.vehicle}</td><td className="px-4 py-3 text-xs text-slate-600">{d.region}</td><td className="px-4 py-3 text-xs text-slate-500">{d.date}</td><td className="px-4 py-3"><StatusBadge status={d.status}/></td><td className="px-4 py-3">{d.status==="Tekshiruvda"&&<div className="flex gap-2"><button className="text-xs bg-green-600 text-white px-2.5 py-1 rounded-lg hover:bg-green-700 font-medium">✓</button><button className="text-xs bg-red-500 text-white px-2.5 py-1 rounded-lg hover:bg-red-600 font-medium">✗</button></div>}</td></tr>)}</tbody></table></div>
        </div>
      )}
    </div>
  );
}

// ─── Profile Page ─────────────────────────────────────────────────────────────

function ProfilePage({ role }: { role: Role }) {
  const isDriver = role === "driver";
  return (
    <div className="max-w-2xl space-y-4">
      <h2 className="text-xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>{isDriver ? "Haydovchi profili" : "Profil"}</h2>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="h-24 relative" style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #1e3a8a 100%)" }}>
          <div className="absolute -bottom-8 left-6"><div className="w-16 h-16 rounded-2xl border-4 border-white flex items-center justify-center font-bold text-2xl text-white shadow-lg" style={{ background: "linear-gradient(135deg, #3b82f6, #1d4ed8)" }}>{isDriver ? "A" : "J"}</div></div>
        </div>
        <div className="pt-12 pb-6 px-6">
          <div className="flex items-start justify-between mb-5">
            <div><h3 className="text-lg font-bold text-slate-900">{isDriver ? "Akmal Rahimov" : "Jahongir Abdullayev"}</h3><p className="text-slate-500 text-sm">{isDriver ? "+998 90 123 45 67" : "+998 90 234 56 78"}</p><div className="mt-1"><StatusBadge status={isDriver ? "Tasdiqlangan" : "Faol"} /></div></div>
            <button className="text-xs border border-slate-200 text-slate-600 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors">Tahrirlash</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {(isDriver ? [["Transport","Isuzu"],["Davlat raqami","01 A 234 BC"],["Yuk ko'tarish","5 tonna"],["Tugallangan buyurtmalar","124"],["Bu oy daromad","2.4 mln so'm"],["Reyting","4.8 ⭐"]] : [["Viloyat","Toshkent"],["Tugallangan buyurtmalar","12"],["Umumiy xarajat","1.14 mln so'm"],["Reyting","4.7 ⭐"],["A'zo bo'lgan sana","Mart 2024"],["Holat","Faol"]]).map(([l,v]) => (
              <div key={l} className="bg-slate-50 rounded-xl p-3 border border-slate-100"><div className="text-xs text-slate-400 mb-0.5">{l}</div><div className="font-semibold text-slate-900 text-sm">{v}</div></div>
            ))}
          </div>
        </div>
      </div>
      {isDriver && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2"><FileText size={16} className="text-blue-600" />Hujjatlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[["Haydovchilik guvohnomasi",true],["Texnik pasport",true],["Sug'urta polisi",false]].map(([doc,uploaded]) => (
              <div key={doc as string} className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${uploaded ? "border-green-300 bg-green-50" : "border-slate-200 hover:border-blue-300 hover:bg-blue-50/30"}`}>
                <Upload size={18} className={`mx-auto mb-2 ${uploaded ? "text-green-500" : "text-slate-400"}`} />
                <p className="text-xs text-slate-600 font-medium">{doc as string}</p>
                <p className={`text-xs mt-1 font-semibold ${uploaded ? "text-green-600" : "text-slate-400"}`}>{uploaded ? "✓ Yuklangan" : "Yuklash"}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Dashboard titles ─────────────────────────────────────────────────────────

const getDashboardTitle = (page: Page, lang: Lang) => {
  const titles: Partial<Record<Page, Record<Lang, string>>> = {
    "customer-dashboard": { uz: "Mijoz paneli", ru: "Панель клиента", en: "Customer panel" },
    "create-order": { uz: "Yuk yuborish", ru: "Отправка груза", en: "Send Cargo" },
    "driver-dashboard": { uz: "Haydovchi paneli", ru: "Панель водителя", en: "Driver panel" },
    "order-details": { uz: "Buyurtma tafsilotlari", ru: "Детали заказа", en: "Order details" },
    "tracking": { uz: "Real vaqt kuzatuvi", ru: "Отслеживание", en: "Live tracking" },
    "price-calculator": { uz: "Kalkulator", ru: "Калькулятор", en: "Calculator" },
    "payment": { uz: "To'lov", ru: "Оплата", en: "Payment" },
    "ratings": { uz: "Reytinglar", ru: "Рейтинги", en: "Ratings" },
    "admin": { uz: "Admin paneli", ru: "Панель администратора", en: "Admin panel" },
    "profile": { uz: "Profil", ru: "Профиль", en: "Profile" },
  };
  return titles[page]?.[lang] || "";
};

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<Page>("landing");
  const [role, setRole] = useState<Role>(null);
  const [lang, setLang] = useState<Lang>("uz");

  if (page === "landing") return <LandingPage navigate={setPage} lang={lang} setLang={setLang} />;
  if (page === "auth") return <AuthPage navigate={setPage} setRole={setRole} lang={lang} setLang={setLang} />;
  if (page === "send-cargo") return <SendCargoPage navigate={setPage} lang={lang} />;
  if (page === "price-calculator") return <PriceCalculatorPage lang={lang} navigate={setPage} />;

  return (
    <DashboardLayout role={role} currentPage={page} navigate={setPage} title={getDashboardTitle(page, lang)} lang={lang} setLang={setLang}>
      {page === "customer-dashboard" && <CustomerDashboard navigate={setPage} />}
      {page === "create-order" && <CreateOrderPage navigate={setPage} lang={lang} />}
      {page === "driver-dashboard" && <DriverDashboard navigate={setPage} />}
      {page === "order-details" && <OrderDetailsPage navigate={setPage} />}
      {page === "tracking" && <TrackingPage />}
      {page === "payment" && <PaymentPage lang={lang} />}
      {page === "ratings" && <RatingsPage />}
      {page === "admin" && <AdminDashboard />}
      {page === "profile" && <ProfilePage role={role} />}
    </DashboardLayout>
  );
}
