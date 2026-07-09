import { useState } from "react";
import {
  Truck, Package, MapPin, Star, ArrowRight, CheckCircle,
  Clock, Phone, MessageSquare, Calculator, CreditCard,
  Shield, Zap, Bell, LogOut, Home, List, DollarSign,
  User, Plus, Upload, Search, Filter, Menu, X,
  BarChart2, Users, TrendingUp, Navigation, Eye,
  ChevronRight, Layers, Award, FileText
} from "lucide-react";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

// ─── Types ────────────────────────────────────────────────────────────────────

type Page =
  | "landing" | "auth" | "customer-dashboard" | "create-order"
  | "driver-dashboard" | "order-details" | "tracking"
  | "price-calculator" | "payment" | "ratings" | "admin" | "profile";

type Role = "customer" | "driver" | "admin" | null;

// ─── Constants ────────────────────────────────────────────────────────────────

const CITIES = [
  "Toshkent", "Samarqand", "Farg'ona", "Andijon",
  "Buxoro", "Nukus", "Termiz", "Qarshi", "Namangan"
];

const CARGO_TYPES = [
  "Qurilish materiali", "Qishloq xo'jaligi mahsuloti",
  "Maishiy texnika", "Mebel", "Boshqa"
];

const TRANSPORT_TYPES = ["Kichik yuk mashina", "Gazel", "Isuzu", "Fura"];

// ─── Shared Components ────────────────────────────────────────────────────────

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
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md z-10">
        {children}
      </div>
    </div>
  );
}

function Sidebar({
  role, currentPage, navigate, mobileOpen, setMobileOpen
}: {
  role: Role; currentPage: Page; navigate: (p: Page) => void;
  mobileOpen: boolean; setMobileOpen: (v: boolean) => void;
}) {
  const customerNav = [
    { label: "Bosh sahifa", page: "customer-dashboard" as Page, icon: Home },
    { label: "Yangi yuk joylashtirish", page: "create-order" as Page, icon: Plus },
    { label: "Buyurtmalarim", page: "order-details" as Page, icon: List },
    { label: "Kuzatuv", page: "tracking" as Page, icon: Navigation },
    { label: "To'lovlar", page: "payment" as Page, icon: CreditCard },
    { label: "Reyting", page: "ratings" as Page, icon: Star },
    { label: "Profil", page: "profile" as Page, icon: User },
  ];
  const driverNav = [
    { label: "Bosh sahifa", page: "driver-dashboard" as Page, icon: Home },
    { label: "Mavjud yuklar", page: "driver-dashboard" as Page, icon: Package },
    { label: "Mening takliflarim", page: "order-details" as Page, icon: List },
    { label: "Marshrutlarim", page: "tracking" as Page, icon: Navigation },
    { label: "Daromadlar", page: "payment" as Page, icon: DollarSign },
    { label: "Reyting", page: "ratings" as Page, icon: Star },
    { label: "Profil", page: "profile" as Page, icon: User },
  ];
  const adminNav = [
    { label: "Umumiy ko'rsatkichlar", page: "admin" as Page, icon: BarChart2 },
    { label: "Foydalanuvchilar", page: "admin" as Page, icon: Users },
    { label: "Buyurtmalar", page: "admin" as Page, icon: Package },
    { label: "Haydovchilar", page: "admin" as Page, icon: Truck },
    { label: "To'lovlar", page: "admin" as Page, icon: CreditCard },
    { label: "Analitika", page: "admin" as Page, icon: TrendingUp },
  ];

  const nav = role === "customer" ? customerNav : role === "driver" ? driverNav : adminNav;

  const content = (
    <div className="flex flex-col h-full w-64" style={{ background: "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)" }}>
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
        <div className="w-9 h-9 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
          <Truck size={18} className="text-white" />
        </div>
        <div>
          <div className="font-bold text-white text-base leading-none">CargoHub</div>
          <div className="text-[10px] text-blue-300 mt-0.5">
            {role === "customer" ? "Mijoz paneli" : role === "driver" ? "Haydovchi" : "Admin"}
          </div>
        </div>
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
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                active
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-900/50"
                  : "text-slate-400 hover:bg-white/8 hover:text-white"
              }`}
            >
              <Icon size={16} className={active ? "text-white" : "text-slate-500"} />
              <span className="font-medium">{label}</span>
              {active && <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full" />}
            </button>
          );
        })}
      </nav>

      <div className="px-3 pb-4 border-t border-white/10 pt-3">
        <button
          onClick={() => navigate("landing")}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-white/8 transition-all"
        >
          <LogOut size={16} />
          <span>Chiqish</span>
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
  role, currentPage, navigate, children, title
}: {
  role: Role; currentPage: Page; navigate: (p: Page) => void;
  children: React.ReactNode; title: string;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#f1f5f9" }}>
      <Sidebar role={role} currentPage={currentPage} navigate={navigate} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-slate-200 px-6 py-3.5 flex items-center gap-4 flex-shrink-0 shadow-sm">
          <button className="md:hidden text-slate-500 hover:text-slate-700" onClick={() => setMobileOpen(true)}>
            <Menu size={20} />
          </button>
          <h1 className="text-base font-semibold text-slate-800">{title}</h1>
          <div className="ml-auto flex items-center gap-3">
            <button
              onClick={() => navigate("price-calculator")}
              className="hidden md:flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 border border-slate-200 rounded-lg px-3 py-1.5 hover:border-blue-300 transition-all"
            >
              <Calculator size={12} /> Narx hisoblash
            </button>
            <button className="relative p-2 text-slate-400 hover:text-slate-700 transition-colors">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
            </button>
            <div
              className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-sm font-bold cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => navigate("profile")}
            >
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

function LandingPage({ navigate }: { navigate: (p: Page) => void }) {
  const stats = [
    { label: "Vaqt tejaladi", value: "30–40%", icon: Clock, color: "text-blue-600 bg-blue-50" },
    { label: "Xarajat optimallashadi", value: "15–20%", icon: DollarSign, color: "text-green-600 bg-green-50" },
    { label: "Bo'sh yurish kamayadi", value: "25–30%", icon: Truck, color: "text-purple-600 bg-purple-50" },
    { label: "Real-time kuzatuv", value: "24/7", icon: Navigation, color: "text-orange-600 bg-orange-50" },
  ];

  const steps = [
    { n: 1, text: "Yuk ma'lumotlarini kiriting" },
    { n: 2, text: "Narx avtomatik hisoblanadi" },
    { n: 3, text: "Haydovchi taklif beradi" },
    { n: 4, text: "Yuk xaritada kuzatiladi" },
    { n: 5, text: "Yetkazilgandan so'ng reyting qoldiriladi" },
  ];

  const services = [
    { icon: Truck, title: "Viloyatlararo yuk tashish", desc: "Barcha viloyatlar o'rtasida ishonchli yuk tashish xizmati" },
    { icon: Package, title: "Kichik biznes uchun yetkazib berish", desc: "Kichik va o'rta bizneslar uchun moslashuvchan logistika" },
    { icon: Layers, title: "Fermer va ishlab chiqaruvchilar", desc: "Qishloq xo'jaligi mahsulotlari uchun maxsus logistika" },
    { icon: MapPin, title: "Shaharlararo yuk tashish", desc: "Tez va xavfsiz shaharlararo yetkazib berish" },
  ];

  const testimonials = [
    { name: "Sardor Umarov", role: "Kichik biznes egasi, Samarqand", text: "CargoHub orqali Toshkentga yuk yubordim. Juda tez va qulay!", stars: 5 },
    { name: "Nodira Rashidova", role: "Fermer, Farg'ona", text: "Haydovchi tez topildi, narx adolatli edi. Tavsiya qilaman.", stars: 5 },
    { name: "Akbar Mirzayev", role: "Qurilish kompaniyasi, Toshkent", text: "Real vaqt kuzatuvi juda foydali — materiallar qayerda ekanini bildim.", stars: 4 },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-md">
              <Truck size={17} className="text-white" />
            </div>
            <span className="font-bold text-xl text-slate-900" style={{ fontFamily: "var(--font-display)" }}>CargoHub</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button className="hover:text-blue-600 transition-colors">Xizmatlar</button>
            <button onClick={() => navigate("price-calculator")} className="hover:text-blue-600 transition-colors">Narx hisoblash</button>
            <button className="hover:text-blue-600 transition-colors">Biz haqimizda</button>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("auth")}
              className="text-sm text-slate-700 hover:text-blue-600 font-semibold transition-colors"
            >
              Kirish
            </button>
            <button
              onClick={() => navigate("auth")}
              className="text-sm bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-md shadow-blue-200"
            >
              Ro'yxatdan o'tish
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-20 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #1e293b 100%)" }}>
        {/* Background SVG map decoration */}
        <div className="absolute inset-0 opacity-[0.07]">
          <svg width="100%" height="100%" viewBox="0 0 1400 600" preserveAspectRatio="xMidYMid slice">
            <defs>
              <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#60a5fa" />
              </marker>
            </defs>
            {/* Route network */}
            <line x1="200" y1="120" x2="520" y2="280" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="10 5" markerEnd="url(#arrow)" />
            <line x1="520" y1="280" x2="820" y2="180" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="10 5" markerEnd="url(#arrow)" />
            <line x1="820" y1="180" x2="1150" y2="320" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="10 5" markerEnd="url(#arrow)" />
            <line x1="200" y1="120" x2="350" y2="420" stroke="#34d399" strokeWidth="1" strokeDasharray="8 5" />
            <line x1="350" y1="420" x2="700" y2="470" stroke="#34d399" strokeWidth="1" strokeDasharray="8 5" />
            <line x1="700" y1="470" x2="950" y2="400" stroke="#34d399" strokeWidth="1" strokeDasharray="8 5" />
            <line x1="520" y1="280" x2="700" y2="470" stroke="#a78bfa" strokeWidth="1" strokeDasharray="6 4" opacity="0.7" />
            {/* City dots */}
            {[
              [200,120],[520,280],[820,180],[1150,320],[350,420],[700,470],[950,400],[1050,200],[300,280]
            ].map(([x,y], i) => (
              <g key={i}>
                <circle cx={x} cy={y} r="6" fill="#60a5fa" opacity="0.8" />
                <circle cx={x} cy={y} r="12" fill="#60a5fa" opacity="0.15" />
              </g>
            ))}
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 rounded-full px-4 py-1.5 mb-7">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-blue-300 text-sm font-medium">O'zbekiston #1 yuk tashish platformasi</span>
            </div>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              CargoHub —
              <span className="block text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(90deg, #60a5fa, #34d399)" }}>
                Yuk tashishning raqamli platformasi
              </span>
            </h1>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-xl">
              Yukingizni joylashtiring, mos haydovchini toping, narxni oldindan biling va yetkazib berishni xaritada kuzating.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate("auth")}
                className="bg-blue-600 hover:bg-blue-500 text-white px-7 py-3.5 rounded-xl font-semibold flex items-center gap-2 transition-all shadow-xl shadow-blue-900/50 hover:shadow-blue-800/60"
              >
                Yuk joylashtirish <ArrowRight size={18} />
              </button>
              <button
                onClick={() => navigate("auth")}
                className="border border-white/20 hover:bg-white/10 text-white px-7 py-3.5 rounded-xl font-semibold flex items-center gap-2 transition-all"
              >
                <Truck size={18} className="text-blue-300" />
                Haydovchi sifatida kirish
              </button>
            </div>
            <p className="mt-8 text-sm text-slate-400 italic">"Yuk tashishni oson, tez va shaffof qiling"</p>
          </div>
        </div>

        {/* Floating cards */}
        <div className="hidden lg:block absolute right-16 top-32 space-y-3 z-10">
          <div className="bg-white/10 backdrop-blur border border-white/15 rounded-2xl p-4 w-56">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <CheckCircle size={14} className="text-white" />
              </div>
              <div>
                <div className="text-white text-xs font-semibold">Yetkazildi</div>
                <div className="text-slate-400 text-[10px]">Toshkent → Samarqand</div>
              </div>
            </div>
            <div className="text-green-400 text-sm font-bold">850 000 so'm</div>
          </div>
          <div className="bg-white/10 backdrop-blur border border-white/15 rounded-2xl p-4 w-56">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <Navigation size={14} className="text-white" />
              </div>
              <div>
                <div className="text-white text-xs font-semibold">Yo'lda</div>
                <div className="text-slate-400 text-[10px]">Farg'ona → Toshkent</div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span className="text-blue-300 text-xs">Jizzax yaqinida</span>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur border border-white/15 rounded-2xl p-4 w-56">
            <div className="text-slate-400 text-xs mb-1">Bugungi buyurtmalar</div>
            <div className="text-3xl font-bold text-white">124</div>
            <div className="text-green-400 text-xs mt-1">↑ 18% o'sish</div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${color}`}>
                  <Icon size={20} />
                </div>
                <div className="text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>{value}</div>
                <div className="text-sm text-slate-500 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-3" style={{ fontFamily: "var(--font-display)" }}>Qanday ishlaydi?</h2>
            <p className="text-slate-500">Oddiy 5 qadamda yukingizni yetkazing</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {steps.map(({ n, text }, i) => (
              <div key={n} className="relative">
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 text-center hover:border-blue-200 hover:shadow-md transition-all h-full">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-3 shadow-lg shadow-blue-200">
                    {n}
                  </div>
                  <p className="text-sm text-slate-700 font-medium leading-relaxed">{text}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 -right-4 z-10">
                    <ArrowRight size={16} className="text-blue-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-3" style={{ fontFamily: "var(--font-display)" }}>Xizmatlarimiz</h2>
            <p className="text-slate-500">Har turdagi yuk uchun moslashuvchan yechimlar</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg hover:border-blue-100 transition-all group">
                <div className="w-12 h-12 bg-blue-50 group-hover:bg-blue-100 rounded-2xl flex items-center justify-center mb-4 transition-colors">
                  <Icon size={22} className="text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2 text-sm">{title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-3" style={{ fontFamily: "var(--font-display)" }}>Foydalanuvchilar fikri</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map(t => (
              <div key={t.name} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className={i < t.stars ? "text-yellow-400 fill-yellow-400" : "text-slate-200 fill-slate-200"} />
                  ))}
                </div>
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
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" viewBox="0 0 800 300">
            <circle cx="700" cy="50" r="150" fill="white" />
            <circle cx="100" cy="250" r="100" fill="white" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>Bugunoq birinchi buyurtmani yarating</h2>
          <p className="text-blue-100 mb-8">Minglab haydovchilar va mijozlar allaqachon ishonishadi</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => navigate("auth")}
              className="bg-white text-blue-700 px-8 py-3.5 rounded-xl font-semibold hover:bg-blue-50 transition-colors shadow-xl"
            >
              Boshlash →
            </button>
            <button
              onClick={() => navigate("price-calculator")}
              className="bg-white/15 border border-white/30 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-white/25 transition-colors flex items-center gap-2"
            >
              <Calculator size={16} /> Narx hisoblash
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
                <Truck size={13} className="text-white" />
              </div>
              <span className="font-bold text-white text-lg">CargoHub</span>
            </div>
            <p className="text-sm mb-1">O'zbekiston bo'ylab yuk tashish platformasi</p>
            <p className="text-xs">© 2025 CargoHub. Barcha huquqlar himoyalangan.</p>
          </div>
          <div className="flex gap-12 text-sm">
            <div>
              <div className="text-white font-semibold mb-3">Xizmatlar</div>
              <div className="space-y-2 text-slate-400">
                <div className="hover:text-white cursor-pointer transition-colors">Yuk tashish</div>
                <div className="hover:text-white cursor-pointer transition-colors">Narx hisoblash</div>
                <div className="hover:text-white cursor-pointer transition-colors">Real-time kuzatuv</div>
                <div className="hover:text-white cursor-pointer transition-colors">Reyting tizimi</div>
              </div>
            </div>
            <div>
              <div className="text-white font-semibold mb-3">Aloqa</div>
              <div className="space-y-2 text-slate-400">
                <div>+998 71 123 45 67</div>
                <div>info@cargohub.uz</div>
                <div>Toshkent, O'zbekiston</div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─── Auth Page ────────────────────────────────────────────────────────────────

function AuthPage({ navigate, setRole }: { navigate: (p: Page) => void; setRole: (r: Role) => void }) {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [form, setForm] = useState({ phone: "", password: "", name: "", region: "" });

  function handleSubmit() {
    if (!selectedRole) return;
    setRole(selectedRole);
    if (selectedRole === "customer") navigate("customer-dashboard");
    else if (selectedRole === "driver") navigate("driver-dashboard");
    else navigate("admin");
  }

  const roles = [
    { key: "customer" as Role, label: "Mijoz sifatida kirish", icon: User, desc: "Yuk jo'natuvchi" },
    { key: "driver" as Role, label: "Haydovchi sifatida kirish", icon: Truck, desc: "Yuk tashuvchi haydovchi" },
    { key: "admin" as Role, label: "Admin panel", icon: Shield, desc: "Platforma boshqaruvi" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%)" }}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="p-8 text-center border-b border-slate-100" style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #1e3a8a 100%)" }}>
          <button onClick={() => navigate("landing")} className="flex items-center gap-2 mx-auto mb-3">
            <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
              <Truck size={17} className="text-white" />
            </div>
            <span className="font-bold text-2xl text-white" style={{ fontFamily: "var(--font-display)" }}>CargoHub</span>
          </button>
          <p className="text-blue-200 text-sm">Yuk tashishni oson, tez va shaffof qiling</p>
        </div>

        <div className="p-7">
          <div className="flex bg-slate-100 rounded-xl p-1 mb-6">
            {(["login", "register"] as const).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${tab === t ? "bg-white shadow text-slate-900" : "text-slate-500"}`}
              >
                {t === "login" ? "Kirish" : "Ro'yxatdan o'tish"}
              </button>
            ))}
          </div>

          <div className="mb-5">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Rol tanlang</p>
            <div className="space-y-2">
              {roles.map(({ key, label, icon: Icon, desc }) => (
                <button
                  key={key}
                  onClick={() => setSelectedRole(key)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all text-left ${
                    selectedRole === key
                      ? "border-blue-500 bg-blue-50"
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${selectedRole === key ? "bg-blue-600" : "bg-slate-100"}`}>
                    <Icon size={16} className={selectedRole === key ? "text-white" : "text-slate-400"} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm font-semibold ${selectedRole === key ? "text-blue-800" : "text-slate-700"}`}>{label}</div>
                    <div className="text-xs text-slate-400">{desc}</div>
                  </div>
                  {selectedRole === key && <CheckCircle size={16} className="text-blue-600 flex-shrink-0" />}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {tab === "register" && (
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Ism Familiya</label>
                <input
                  type="text"
                  placeholder="Abdullayev Jahongir"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50"
                />
              </div>
            )}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Telefon raqam</label>
              <input
                type="tel"
                placeholder="+998 90 123 45 67"
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
              />
            </div>
            {tab === "register" && (
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Viloyat</label>
                <select
                  value={form.region}
                  onChange={e => setForm({ ...form, region: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                >
                  <option value="">Viloyatni tanlang</option>
                  {CITIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            )}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Parol</label>
              <input
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!selectedRole}
            className="w-full mt-5 py-3 rounded-xl font-bold text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg"
            style={{ background: selectedRole ? "linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)" : "#94a3b8" }}
          >
            {tab === "login" ? "Kirish" : "Ro'yxatdan o'tish"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Customer Dashboard ───────────────────────────────────────────────────────

function CustomerDashboard({ navigate }: { navigate: (p: Page) => void }) {
  const orders = [
    { id: "#CH-1024", route: "Toshkent → Samarqand", type: "Maishiy texnika", status: "Taklif kutilmoqda", price: "850 000", driver: "—" },
    { id: "#CH-1025", route: "Farg'ona → Toshkent", type: "Qishloq xo'jaligi mahsuloti", status: "Yo'lda", price: "1 200 000", driver: "Akmal R." },
    { id: "#CH-1026", route: "Buxoro → Qarshi", type: "Qurilish materiali", status: "Yetkazildi", price: "950 000", driver: "Jasur T." },
    { id: "#CH-1027", route: "Andijon → Namangan", type: "Mebel", status: "Haydovchi tanlandi", price: "680 000", driver: "Bobur M." },
  ];

  const topCards = [
    { label: "Faol buyurtmalar", value: "3", icon: Package, bg: "from-blue-500 to-blue-700", change: "+1 bu hafta" },
    { label: "Kutilayotgan takliflar", value: "5", icon: Clock, bg: "from-amber-400 to-amber-600", change: "Yangi takliflar" },
    { label: "Yetkazilgan yuklar", value: "12", icon: CheckCircle, bg: "from-green-500 to-green-700", change: "+2 bu oy" },
    { label: "Umumiy xarajat", value: "4.8 mln", icon: DollarSign, bg: "from-purple-500 to-purple-700", change: "so'm" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
            Xush kelibsiz, Jahongir! 👋
          </h2>
          <p className="text-slate-500 text-sm mt-0.5">Buyurtmalaringiz holati</p>
        </div>
        <button
          onClick={() => navigate("create-order")}
          className="bg-blue-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-md shadow-blue-200"
        >
          <Plus size={16} /> Yangi yuk
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {topCards.map(({ label, value, icon: Icon, bg, change }) => (
          <div key={label} className={`rounded-2xl p-5 bg-gradient-to-br ${bg} text-white shadow-lg`}>
            <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center mb-3">
              <Icon size={17} className="text-white" />
            </div>
            <div className="text-2xl font-bold">{value}</div>
            <div className="text-xs text-white/70 mt-0.5">{label}</div>
            <div className="text-xs text-white/60 mt-1">{change}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-semibold text-slate-900">So'nggi buyurtmalar</h3>
          <button
            onClick={() => navigate("order-details")}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
          >
            Barchasini ko'rish <ChevronRight size={14} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                {["Buyurtma ID", "Yo'nalish", "Yuk turi", "Holat", "Narx (so'm)", "Haydovchi", ""].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.map(o => (
                <tr key={o.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <span className="font-mono text-blue-600 font-semibold text-xs">{o.id}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1.5 text-slate-700">
                      <MapPin size={11} className="text-slate-400 flex-shrink-0" />
                      {o.route}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600 text-xs">{o.type}</td>
                  <td className="px-4 py-3"><StatusBadge status={o.status} /></td>
                  <td className="px-4 py-3 font-semibold text-slate-900">{o.price}</td>
                  <td className="px-4 py-3 text-slate-500 text-xs">{o.driver}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => navigate(o.status === "Yo'lda" ? "tracking" : "order-details")}
                      className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Eye size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Create Order ─────────────────────────────────────────────────────────────

function CreateOrderPage({ navigate }: { navigate: (p: Page) => void }) {
  const [step, setStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [form, setForm] = useState({
    name: "", type: "", weight: "", volume: "",
    from: "", to: "", fromAddr: "", toAddr: "", date: "",
    refrigerated: false, loader: false, express: false, insurance: false,
  });

  const steps = ["Yuk ma'lumotlari", "Yo'nalish", "Qo'shimcha talablar", "Narx hisoblash"];

  function calcPrice() {
    const base = 550000;
    const extras =
      (form.refrigerated ? 100000 : 0) +
      (form.express ? 150000 : 0) +
      (form.insurance ? 50000 : 0) +
      (form.loader ? 80000 : 0);
    const sub = base + extras;
    return { base, extras, commission: Math.round(sub * 0.05), total: Math.round(sub * 1.05) };
  }

  const inputCls = "w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50";
  const selectCls = inputCls + " bg-slate-50";

  return (
    <div className="max-w-2xl mx-auto">
      {/* Step progress */}
      <div className="flex items-center mb-8">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                step > i + 1 ? "bg-green-500 text-white" :
                step === i + 1 ? "bg-blue-600 text-white shadow-lg shadow-blue-200" :
                "bg-slate-200 text-slate-500"
              }`}>
                {step > i + 1 ? <CheckCircle size={16} /> : i + 1}
              </div>
              <span className={`text-[10px] font-medium hidden sm:block whitespace-nowrap ${step === i + 1 ? "text-blue-600" : "text-slate-400"}`}>
                {s}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-1 mb-3 transition-colors ${step > i + 1 ? "bg-green-400" : "bg-slate-200"}`} />
            )}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        {step === 1 && (
          <div>
            <h3 className="font-bold text-slate-900 mb-5 text-base">Yuk ma'lumotlari</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Yuk nomi</label>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Masalan: Samsung televizorlar" className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Yuk turi</label>
                <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className={selectCls}>
                  <option value="">Tanlang</option>
                  {CARGO_TYPES.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Og'irligi (kg)</label>
                <input type="number" value={form.weight} onChange={e => setForm({ ...form, weight: e.target.value })} placeholder="1000" className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Hajmi (m³)</label>
                <input type="number" value={form.volume} onChange={e => setForm({ ...form, volume: e.target.value })} placeholder="5" className={inputCls} />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Yuk rasmi (ixtiyoriy)</label>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-blue-300 hover:bg-blue-50/30 transition-all cursor-pointer">
                  <Upload size={22} className="mx-auto mb-2 text-slate-400" />
                  <p className="text-sm text-slate-400">Rasm yuklash uchun bosing</p>
                  <p className="text-xs text-slate-300 mt-1">PNG, JPG (max 5MB)</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="font-bold text-slate-900 mb-5 text-base">Yo'nalish</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Jo'natish shahri</label>
                <select value={form.from} onChange={e => setForm({ ...form, from: e.target.value })} className={selectCls}>
                  <option value="">Tanlang</option>
                  {CITIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Yetkazish shahri</label>
                <select value={form.to} onChange={e => setForm({ ...form, to: e.target.value })} className={selectCls}>
                  <option value="">Tanlang</option>
                  {CITIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Yuk olish manzili</label>
                <input value={form.fromAddr} onChange={e => setForm({ ...form, fromAddr: e.target.value })} placeholder="Ko'cha, uy raqami" className={inputCls} />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Yetkazish manzili</label>
                <input value={form.toAddr} onChange={e => setForm({ ...form, toAddr: e.target.value })} placeholder="Ko'cha, uy raqami" className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Sana va vaqt</label>
                <input type="datetime-local" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className={inputCls} />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 className="font-bold text-slate-900 mb-5 text-base">Qo'shimcha talablar</h3>
            <div className="space-y-3">
              {[
                { key: "refrigerated" as const, label: "Sovutkichli transport kerak", icon: "❄️", desc: "+100 000 so'm" },
                { key: "loader" as const, label: "Yuk ko'taruvchi kerak", icon: "💪", desc: "+80 000 so'm" },
                { key: "express" as const, label: "Tezkor yetkazish", icon: "⚡", desc: "+150 000 so'm" },
                { key: "insurance" as const, label: "Sug'urta kerak", icon: "🛡️", desc: "+50 000 so'm" },
              ].map(({ key, label, icon, desc }) => (
                <label
                  key={key}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    form[key] ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
                >
                  <input type="checkbox" checked={form[key]} onChange={e => setForm({ ...form, [key]: e.target.checked })} className="w-4 h-4 accent-blue-600" />
                  <span className="text-2xl">{icon}</span>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-slate-900">{label}</div>
                    <div className="text-xs text-slate-400">{desc}</div>
                  </div>
                  {form[key] && <CheckCircle size={18} className="text-blue-600" />}
                </label>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (() => {
          const p = calcPrice();
          return (
            <div>
              <h3 className="font-bold text-slate-900 mb-5 text-base">Narx hisoblash</h3>
              <div className="rounded-2xl p-6 mb-4" style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #1e3a8a 100%)" }}>
                <div className="flex items-center gap-2 mb-5">
                  <Calculator size={18} className="text-blue-200" />
                  <span className="font-bold text-white">Taxminiy narx hisob-kitobi</span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-200">Masofa</span>
                    <span className="font-semibold text-white">305 km</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-200">Asosiy tarif</span>
                    <span className="font-semibold text-white">{p.base.toLocaleString()} so'm</span>
                  </div>
                  {p.extras > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-200">Qo'shimcha xizmatlar</span>
                      <span className="font-semibold text-green-300">+{p.extras.toLocaleString()} so'm</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-200">Platforma komissiyasi (5%)</span>
                    <span className="font-semibold text-white">{p.commission.toLocaleString()} so'm</span>
                  </div>
                  <div className="border-t border-blue-400/50 pt-4 flex justify-between items-center">
                    <span className="font-bold text-white">Umumiy to'lov</span>
                    <span className="text-3xl font-extrabold text-white">{p.total.toLocaleString()}</span>
                  </div>
                  <div className="text-right text-xs text-blue-200">so'm</div>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Narx masofa, yuk hajmi, yuk turi, transport turi va bozor talabi asosida hisoblanadi. Yakuniy narx haydovchi taklifiga qarab o'zgarishi mumkin.
              </p>
            </div>
          );
        })()}

        <div className="flex justify-between mt-6 pt-5 border-t border-slate-100">
          <button
            onClick={() => step > 1 ? setStep(step - 1) : navigate("customer-dashboard")}
            className="px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            {step > 1 ? "← Orqaga" : "Bekor qilish"}
          </button>
          {step < 4 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-md shadow-blue-200"
            >
              Keyingi <ChevronRight size={16} />
            </button>
          ) : (
            <button
              onClick={() => setShowSuccess(true)}
              className="px-5 py-2.5 bg-green-600 text-white rounded-xl text-sm font-semibold hover:bg-green-700 transition-colors flex items-center gap-2 shadow-md shadow-green-200"
            >
              <CheckCircle size={16} /> Buyurtmani joylashtirish
            </button>
          )}
        </div>
      </div>

      <Modal open={showSuccess} onClose={() => { setShowSuccess(false); navigate("customer-dashboard"); }}>
        <div className="p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle size={40} className="text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Buyurtma yaratildi!</h3>
          <p className="text-slate-500 text-sm mb-6 leading-relaxed">
            Buyurtma muvaffaqiyatli joylashtirildi. Endi haydovchilardan takliflarni kuting. Odatda 30 daqiqa ichida taklif keladi.
          </p>
          <button
            onClick={() => { setShowSuccess(false); navigate("customer-dashboard"); }}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            Bosh sahifaga qaytish
          </button>
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
  const [filterType, setFilterType] = useState("");
  const [offerForm, setOfferForm] = useState({ price: "", time: "", note: "" });

  const cargos = [
    { id: 1, from: "Toshkent", to: "Samarqand", weight: "800 kg", type: "Maishiy texnika", price: "850 000", date: "25-iyul 2025", rating: 4.8 },
    { id: 2, from: "Andijon", to: "Toshkent", weight: "1.2 tonna", type: "Qishloq xo'jaligi mahsuloti", price: "1 300 000", date: "26-iyul 2025", rating: 4.5 },
    { id: 3, from: "Buxoro", to: "Qarshi", weight: "2 tonna", type: "Qurilish materiali", price: "950 000", date: "27-iyul 2025", rating: 4.9 },
    { id: 4, from: "Namangan", to: "Toshkent", weight: "500 kg", type: "Mebel", price: "720 000", date: "28-iyul 2025", rating: 4.7 },
    { id: 5, from: "Nukus", to: "Toshkent", weight: "3 tonna", type: "Qurilish materiali", price: "1 800 000", date: "29-iyul 2025", rating: 4.6 },
    { id: 6, from: "Termiz", to: "Samarqand", weight: "1.5 tonna", type: "Qishloq xo'jaligi mahsuloti", price: "1 100 000", date: "30-iyul 2025", rating: 4.3 },
  ];

  const filtered = cargos.filter(c =>
    (!filterFrom || c.from === filterFrom) &&
    (!filterTo || c.to === filterTo) &&
    (!filterType || c.type === filterType)
  );

  const topCards = [
    { label: "Mavjud yuklar", value: "24", icon: Package, bg: "from-blue-500 to-blue-700" },
    { label: "Faol marshrut", value: "1", icon: Navigation, bg: "from-green-500 to-green-700" },
    { label: "Bu oy daromad", value: "8.4 mln", icon: DollarSign, bg: "from-purple-500 to-purple-700" },
    { label: "Reyting", value: "4.8 ⭐", icon: Award, bg: "from-amber-400 to-amber-600" },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>Haydovchi paneli</h2>
        <p className="text-slate-500 text-sm mt-0.5">Mavjud yuklar va marshrutlar</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {topCards.map(({ label, value, icon: Icon, bg }) => (
          <div key={label} className={`rounded-2xl p-5 bg-gradient-to-br ${bg} text-white shadow-lg`}>
            <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center mb-3">
              <Icon size={17} className="text-white" />
            </div>
            <div className="text-2xl font-bold">{value}</div>
            <div className="text-xs text-white/70 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 mb-4 flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
          <Filter size={15} className="text-slate-400" /> Filtr:
        </div>
        <select value={filterFrom} onChange={e => setFilterFrom(e.target.value)} className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Jo'natish shahri</option>
          {CITIES.map(c => <option key={c}>{c}</option>)}
        </select>
        <select value={filterTo} onChange={e => setFilterTo(e.target.value)} className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Yetkazish shahri</option>
          {CITIES.map(c => <option key={c}>{c}</option>)}
        </select>
        <select value={filterType} onChange={e => setFilterType(e.target.value)} className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Yuk turi</option>
          {CARGO_TYPES.map(t => <option key={t}>{t}</option>)}
        </select>
        {(filterFrom || filterTo || filterType) && (
          <button onClick={() => { setFilterFrom(""); setFilterTo(""); setFilterType(""); }} className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 border border-red-200 rounded-lg px-2 py-1.5">
            <X size={12} /> Tozalash
          </button>
        )}
        <span className="ml-auto text-xs text-slate-400">{filtered.length} ta yuk topildi</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(c => (
          <div key={c.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 hover:shadow-md hover:border-blue-100 transition-all">
            <div className="flex items-start justify-between mb-3">
              <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full">{c.type}</span>
              <div className="flex items-center gap-1 text-yellow-500">
                <Star size={12} fill="currentColor" />
                <span className="text-xs text-slate-600 font-medium">{c.rating}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex-1 bg-slate-50 rounded-lg px-3 py-2 text-center">
                <div className="text-xs text-slate-400 mb-0.5">Dan</div>
                <div className="text-sm font-bold text-slate-900">{c.from}</div>
              </div>
              <ArrowRight size={14} className="text-blue-400 flex-shrink-0" />
              <div className="flex-1 bg-slate-50 rounded-lg px-3 py-2 text-center">
                <div className="text-xs text-slate-400 mb-0.5">Ga</div>
                <div className="text-sm font-bold text-slate-900">{c.to}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-4 text-xs text-slate-500">
              <div className="flex items-center gap-1.5"><Package size={11} className="text-slate-400" /> {c.weight}</div>
              <div className="flex items-center gap-1.5"><Clock size={11} className="text-slate-400" /> {c.date}</div>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-slate-400">Taxminiy narx</span>
              <span className="font-bold text-slate-900">{c.price} so'm</span>
            </div>
            <button
              onClick={() => { setOfferModal(c.id); setOfferSent(false); setOfferForm({ price: "", time: "", note: "" }); }}
              className="w-full bg-blue-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-md shadow-blue-100"
            >
              <Zap size={14} /> Taklif berish
            </button>
          </div>
        ))}
      </div>

      <Modal open={offerModal !== null} onClose={() => setOfferModal(null)}>
        <div className="p-6">
          {offerSent ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-green-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Taklif yuborildi!</h3>
              <p className="text-sm text-slate-500 mb-5">Mijoz sizning taklifingizni ko'rib chiqadi va tez orada javob beradi.</p>
              <button onClick={() => setOfferModal(null)} className="w-full bg-blue-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700">Yopish</button>
            </div>
          ) : (
            <div>
              <h3 className="font-bold text-slate-900 mb-5 text-base">Taklif yuborish</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Taklif narxi (so'm)</label>
                  <input value={offerForm.price} onChange={e => setOfferForm({ ...offerForm, price: e.target.value })} placeholder="850 000" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Yetib borish vaqti</label>
                  <input value={offerForm.time} onChange={e => setOfferForm({ ...offerForm, time: e.target.value })} placeholder="4 soat" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Izoh (ixtiyoriy)</label>
                  <textarea value={offerForm.note} onChange={e => setOfferForm({ ...offerForm, note: e.target.value })} placeholder="Qo'shimcha ma'lumot..." rows={3} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 resize-none" />
                </div>
              </div>
              <div className="flex gap-3 mt-5">
                <button onClick={() => setOfferModal(null)} className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50">Bekor qilish</button>
                <button onClick={() => setOfferSent(true)} className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 shadow-md">Taklif yuborish</button>
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

  const order = {
    id: "#CH-1024",
    route: "Toshkent → Samarqand",
    type: "Maishiy texnika",
    weight: "800 kg",
    volume: "4 m³",
    date: "25-iyul 2025, 09:00",
    customer: "Jahongir Abdullayev",
    phone: "+998 90 234 56 78",
    price: "850 000 so'm",
  };

  const drivers = [
    { id: 1, name: "Akmal Rahimov", vehicle: "Isuzu, 5 tonna", rating: 4.8, orders: 124, price: "850 000", time: "4 soat", plate: "01 A 234 BC" },
    { id: 2, name: "Bobur Mirzayev", vehicle: "Gazel, 1.5 tonna", rating: 4.5, orders: 87, price: "820 000", time: "4.5 soat", plate: "10 B 567 CD" },
    { id: 3, name: "Jasur Toshmatov", vehicle: "Fura, 10 tonna", rating: 4.9, orders: 203, price: "900 000", time: "3.5 soat", plate: "30 M 890 EF" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-2">
        <button onClick={() => navigate("customer-dashboard")} className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-white rounded-lg transition-all">
          <ChevronRight size={18} className="rotate-180" />
        </button>
        <h2 className="text-xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>Buyurtma: {order.id}</h2>
        <StatusBadge status={status} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <FileText size={16} className="text-blue-600" /> Buyurtma ma'lumotlari
            </h3>
            <div className="space-y-3 text-sm">
              {[
                ["Yo'nalish", order.route],
                ["Yuk turi", order.type],
                ["Og'irligi", order.weight],
                ["Hajmi", order.volume],
                ["Sana", order.date],
              ].map(([l, v]) => (
                <div key={l} className="flex justify-between items-start gap-2">
                  <span className="text-slate-500 text-xs flex-shrink-0">{l}</span>
                  <span className="font-medium text-slate-900 text-xs text-right">{v}</span>
                </div>
              ))}
              <div className="border-t border-slate-100 pt-3 flex justify-between items-center">
                <span className="text-slate-500 text-xs">Taxminiy narx</span>
                <span className="font-bold text-blue-700">{order.price}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <User size={16} className="text-blue-600" /> Mijoz
            </h3>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold">J</div>
              <div>
                <div className="text-sm font-semibold text-slate-900">{order.customer}</div>
                <div className="text-xs text-slate-500">{order.phone}</div>
                <div className="flex items-center gap-1 mt-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={10} className={i < 4 ? "text-yellow-400 fill-yellow-400" : "text-slate-200 fill-slate-200"} />
                  ))}
                  <span className="text-xs text-slate-500 ml-0.5">4.7</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Truck size={16} className="text-blue-600" /> Haydovchilarning takliflari
              <span className="ml-auto text-xs text-slate-400 font-normal">{drivers.length} ta taklif</span>
            </h3>
            <div className="space-y-3">
              {drivers.map(d => (
                <div
                  key={d.id}
                  className={`rounded-xl p-4 border-2 transition-all ${
                    selectedDriver === d.id ? "border-green-500 bg-green-50" : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-700 flex-shrink-0">
                      {d.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center flex-wrap gap-2 mb-0.5">
                        <span className="font-semibold text-slate-900 text-sm">{d.name}</span>
                        {selectedDriver === d.id && (
                          <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded-full">✓ Tanlandi</span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500 mb-1">{d.vehicle} · {d.plate}</div>
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Star size={10} fill="currentColor" className="text-yellow-400" /> {d.rating}
                        </span>
                        <span>{d.orders} buyurtma</span>
                        <span className="flex items-center gap-1"><Clock size={10} /> {d.time}</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-bold text-blue-700 text-base">{d.price}</div>
                      <div className="text-xs text-slate-400 mb-2">so'm</div>
                      {selectedDriver !== d.id && status !== "Haydovchi tanlandi" ? (
                        <button
                          onClick={() => { setSelectedDriver(d.id); setStatus("Haydovchi tanlandi"); }}
                          className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Tanlash
                        </button>
                      ) : selectedDriver === d.id ? (
                        <button
                          onClick={() => navigate("tracking")}
                          className="text-xs bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-1"
                        >
                          <Navigation size={10} /> Kuzatuv
                        </button>
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
    { name: "Farg'ona", x: 84, y: 26 },
    { name: "Andijon", x: 90, y: 22 },
    { name: "Buxoro", x: 28, y: 52 },
    { name: "Nukus", x: 10, y: 20 },
    { name: "Namangan", x: 80, y: 20 },
    { name: "Qarshi", x: 42, y: 66 },
    { name: "Termiz", x: 50, y: 80 },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-2">
        <h2 className="text-xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>Real vaqt kuzatuvi</h2>
        <span className="flex items-center gap-1.5 text-xs font-semibold bg-green-100 text-green-700 border border-green-200 px-3 py-1 rounded-full">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> Jonli
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2 font-semibold text-slate-900 text-sm">
              <MapPin size={16} className="text-blue-600" /> Toshkent → Samarqand
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span>305 km</span>
              <span className="text-blue-600 font-semibold">~60% yakunlandi</span>
            </div>
          </div>

          {/* Map */}
          <div className="relative bg-gradient-to-br from-blue-50 to-slate-100 h-72">
            <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
              {/* Uzbekistan silhouette */}
              <path
                d="M8,18 L18,14 L32,10 L55,8 L75,10 L92,16 L97,28 L95,42 L92,55 L85,68 L73,78 L58,84 L44,86 L30,80 L18,72 L10,58 L6,42 L8,28 Z"
                fill="#dbeafe" stroke="#93c5fd" strokeWidth="0.4" opacity="0.8"
              />
              {/* Grid lines */}
              {[20,40,60,80].map(x => (
                <line key={x} x1={x} y1="0" x2={x} y2="100" stroke="#e2e8f0" strokeWidth="0.2" />
              ))}
              {[20,40,60,80].map(y => (
                <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#e2e8f0" strokeWidth="0.2" />
              ))}
              {/* Full route (dashed) */}
              <line x1="71" y1="24" x2="45" y2="54" stroke="#93c5fd" strokeWidth="1.2" strokeDasharray="3 2" />
              {/* Completed route */}
              <line x1="71" y1="24" x2="59" y2="40" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round" />
              {/* Cities */}
              {mapCities.map(c => (
                <g key={c.name}>
                  {c.current && (
                    <circle cx={c.x} cy={c.y} r="5" fill="#f59e0b" opacity="0.2" />
                  )}
                  <circle
                    cx={c.x} cy={c.y}
                    r={c.main || c.dest ? "2.5" : c.current ? "2.5" : "1.5"}
                    fill={c.main ? "#1d4ed8" : c.dest ? "#16a34a" : c.current ? "#f59e0b" : "#94a3b8"}
                    stroke="white"
                    strokeWidth={c.main || c.dest || c.current ? "0.6" : "0"}
                  />
                  <text
                    x={c.x + (c.main ? 2 : c.x > 50 ? -2 : 2)}
                    y={c.y - 2}
                    fontSize="3.2"
                    fill={c.main ? "#1e3a8a" : c.dest ? "#166534" : c.current ? "#92400e" : "#64748b"}
                    fontWeight={c.main || c.dest || c.current ? "600" : "400"}
                    textAnchor={c.main ? "start" : "start"}
                  >
                    {c.name}
                  </text>
                </g>
              ))}
              {/* Truck */}
              <text x="56.5" y="43" fontSize="4.5">🚛</text>
            </svg>

            {/* Legend */}
            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur rounded-xl p-3 text-xs space-y-1.5 shadow-sm">
              <div className="flex items-center gap-2"><span className="w-3 h-3 bg-blue-600 rounded-full" /><span className="text-slate-600">Jo'natish nuqtasi</span></div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 bg-green-600 rounded-full" /><span className="text-slate-600">Yetkazish nuqtasi</span></div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 bg-amber-400 rounded-full" /><span className="text-slate-600">Hozirgi joylashuv</span></div>
            </div>

            {/* ETA Card */}
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur rounded-xl p-3 shadow-sm text-xs">
              <div className="text-slate-400">Yetib borish</div>
              <div className="font-bold text-slate-900 text-sm">2 soat 30 daqiqa</div>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="space-y-4">
          {/* Status card */}
          <div className="rounded-2xl p-5 text-white" style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #1e3a8a 100%)" }}>
            <div className="text-blue-200 text-xs font-medium mb-1">Hozirgi joylashuv</div>
            <div className="font-bold text-xl mb-1">Jizzax viloyati</div>
            <div className="text-blue-100 text-sm">Taxminiy yetib borish: 2 soat 30 daqiqa</div>
            <div className="mt-3 bg-white/20 rounded-lg h-1.5">
              <div className="bg-green-400 h-1.5 rounded-lg" style={{ width: "60%" }} />
            </div>
            <div className="text-blue-200 text-xs mt-1">60% yakunlandi</div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <h3 className="font-semibold text-slate-900 mb-4 text-sm">Yetkazish holati</h3>
            <div className="space-y-0">
              {timeline.map(({ label, done, active, time }, i) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                      active ? "bg-blue-600 shadow-lg shadow-blue-200" :
                      done ? "bg-green-500" : "bg-slate-200"
                    }`}>
                      {active ? (
                        <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      ) : done ? (
                        <CheckCircle size={13} className="text-white" />
                      ) : (
                        <span className="w-2 h-2 bg-slate-400 rounded-full" />
                      )}
                    </div>
                    {i < timeline.length - 1 && (
                      <div className={`w-0.5 h-6 ${done && !active ? "bg-green-200" : "bg-slate-100"}`} />
                    )}
                  </div>
                  <div className="flex-1 pb-1 pt-0.5">
                    <div className={`text-xs font-semibold ${active ? "text-blue-600" : done ? "text-green-700" : "text-slate-400"}`}>{label}</div>
                    <div className="text-xs text-slate-400">{time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Driver */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <h3 className="font-semibold text-slate-900 mb-3 text-sm">Haydovchi</h3>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 bg-slate-800 rounded-xl flex items-center justify-center text-white font-bold">A</div>
              <div>
                <div className="font-semibold text-slate-900 text-sm">Akmal Rahimov</div>
                <div className="text-xs text-slate-500">Isuzu · 01 A 234 BC · 5 tonna</div>
                <div className="flex items-center gap-1 mt-0.5">
                  <Star size={10} fill="currentColor" className="text-yellow-400" />
                  <span className="text-xs font-medium text-slate-700">4.8</span>
                  <span className="text-xs text-slate-400">· 124 buyurtma</span>
                </div>
              </div>
            </div>
            <div className="text-xs text-slate-500 mb-4 flex items-center gap-1.5">
              <Phone size={11} /> +998 90 123 45 67
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button className="flex items-center justify-center gap-1.5 bg-green-600 text-white py-2 rounded-xl text-xs font-semibold hover:bg-green-700 transition-colors">
                <Phone size={12} /> Qo'ng'iroq
              </button>
              <button className="flex items-center justify-center gap-1.5 bg-blue-600 text-white py-2 rounded-xl text-xs font-semibold hover:bg-blue-700 transition-colors">
                <MessageSquare size={12} /> Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Price Calculator ─────────────────────────────────────────────────────────

function PriceCalculatorPage() {
  const [form, setForm] = useState({ from: "", to: "", type: "", weight: "", volume: "", transport: "" });
  const [result, setResult] = useState<{ distance: number; base: number; typeCoeff: number; transportCoeff: number; total: number } | null>(null);

  const distanceMap: Record<string, Record<string, number>> = {
    "Toshkent": { "Samarqand": 305, "Farg'ona": 320, "Andijon": 380, "Buxoro": 560, "Nukus": 1100, "Termiz": 650, "Qarshi": 450, "Namangan": 340 },
    "Samarqand": { "Toshkent": 305, "Buxoro": 250, "Qarshi": 150, "Termiz": 300 },
    "Buxoro": { "Toshkent": 560, "Nukus": 530, "Termiz": 400, "Samarqand": 250 },
    "Farg'ona": { "Toshkent": 320, "Andijon": 60, "Namangan": 110 },
    "Andijon": { "Toshkent": 380, "Farg'ona": 60, "Namangan": 150 },
  };

  function calculate() {
    const dist = distanceMap[form.from]?.[form.to] || distanceMap[form.to]?.[form.from] || 280;
    const base = Math.round(dist * 1800);
    const typeCoeff = form.type === "Qurilish materiali" ? 1.15 : form.type === "Qishloq xo'jaligi mahsuloti" ? 0.9 : form.type === "Mebel" ? 1.05 : 1.0;
    const transportCoeff = form.transport === "Fura" ? 1.25 : form.transport === "Isuzu" ? 1.05 : form.transport === "Gazel" ? 0.85 : 0.75;
    const total = Math.round(base * typeCoeff * transportCoeff);
    setResult({ distance: dist, base, typeCoeff, transportCoeff, total });
  }

  const selectCls = "w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500";
  const inputCls = "w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <div>
        <h2 className="text-xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>Narx hisoblash</h2>
        <p className="text-slate-500 text-sm mt-1">Yo'nalish va yuk ma'lumotlarini kiriting, taxminiy narxni bilib oling</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Jo'natish shahri</label>
            <select value={form.from} onChange={e => setForm({ ...form, from: e.target.value })} className={selectCls}>
              <option value="">Tanlang</option>
              {CITIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Yetkazish shahri</label>
            <select value={form.to} onChange={e => setForm({ ...form, to: e.target.value })} className={selectCls}>
              <option value="">Tanlang</option>
              {CITIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Yuk turi</label>
            <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className={selectCls}>
              <option value="">Tanlang</option>
              {CARGO_TYPES.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Transport turi</label>
            <select value={form.transport} onChange={e => setForm({ ...form, transport: e.target.value })} className={selectCls}>
              <option value="">Tanlang</option>
              {TRANSPORT_TYPES.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Og'irlik (kg)</label>
            <input type="number" value={form.weight} onChange={e => setForm({ ...form, weight: e.target.value })} placeholder="1000" className={inputCls} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Hajm (m³)</label>
            <input type="number" value={form.volume} onChange={e => setForm({ ...form, volume: e.target.value })} placeholder="5" className={inputCls} />
          </div>
        </div>
        <button
          onClick={calculate}
          disabled={!form.from || !form.to}
          className="mt-5 w-full py-3 rounded-xl font-bold text-white transition-all disabled:opacity-40 shadow-lg flex items-center justify-center gap-2"
          style={{ background: "linear-gradient(135deg, #1d4ed8, #1e3a8a)" }}
        >
          <Calculator size={18} /> Narxni hisoblash
        </button>
      </div>

      {result && (
        <div className="rounded-2xl overflow-hidden shadow-xl">
          <div className="px-6 py-5 flex items-center gap-3 text-white" style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #1e3a8a 100%)" }}>
            <Calculator size={22} className="text-blue-200" />
            <h3 className="font-bold text-lg">Hisob natijasi</h3>
            <div className="ml-auto text-right">
              <div className="text-blue-200 text-xs">Taxminiy narx</div>
              <div className="text-3xl font-black">{result.total.toLocaleString()} so'm</div>
            </div>
          </div>
          <div className="bg-white p-6">
            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                { label: "Masofa", value: `${result.distance} km` },
                { label: "Asosiy tarif", value: `${result.base.toLocaleString()} so'm` },
                { label: "Yuk turi koeffitsiyenti", value: `×${result.typeCoeff.toFixed(2)}` },
                { label: "Transport koeffitsiyenti", value: `×${result.transportCoeff.toFixed(2)}` },
              ].map(({ label, value }) => (
                <div key={label} className="bg-slate-50 rounded-xl p-3">
                  <div className="text-xs text-slate-500 mb-0.5">{label}</div>
                  <div className="font-bold text-slate-900">{value}</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-400 leading-relaxed border-t border-slate-100 pt-4">
              Narx masofa, yuk hajmi, yuk turi, transport turi va bozor talabi asosida hisoblanadi. Yakuniy narx haydovchi taklifida aniqlanadi.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Payment Page ─────────────────────────────────────────────────────────────

function PaymentPage() {
  const [method, setMethod] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const methods = [
    { id: "uzcard", label: "Uzcard", emoji: "💳", color: "from-blue-500 to-blue-700" },
    { id: "humo", label: "Humo", emoji: "💳", color: "from-emerald-500 to-emerald-700" },
    { id: "qr", label: "QR to'lov", emoji: "📱", color: "from-violet-500 to-violet-700" },
    { id: "cash", label: "Naqd to'lov", emoji: "💵", color: "from-amber-500 to-amber-700" },
  ];

  if (confirmed) {
    return (
      <div className="max-w-md mx-auto mt-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle size={40} className="text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2" style={{ fontFamily: "var(--font-display)" }}>To'lov muvaffaqiyatli!</h2>
          <p className="text-slate-500 text-sm mb-5">To'lov muvaffaqiyatli tasdiqlandi.</p>
          <div className="bg-slate-50 rounded-xl p-4 mb-6 text-left text-sm space-y-2">
            <div className="flex justify-between text-slate-600">
              <span>Buyurtma</span><span className="font-medium text-slate-900">#CH-1026</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>To'lov usuli</span><span className="font-medium text-slate-900">{methods.find(m => m.id === method)?.label}</span>
            </div>
            <div className="border-t border-slate-200 pt-2 flex justify-between">
              <span className="text-slate-600">Jami to'landi</span>
              <span className="font-bold text-green-700 text-base">997 500 so'm</span>
            </div>
          </div>
          <button onClick={() => setConfirmed(false)} className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
            Bosh sahifaga qaytish
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div>
        <h2 className="text-xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>To'lov</h2>
        <p className="text-slate-500 text-sm mt-1">Qulay to'lov usulini tanlang</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h3 className="font-semibold text-slate-900 mb-4">To'lov usuli</h3>
          <div className="grid grid-cols-2 gap-3">
            {methods.map(m => (
              <button
                key={m.id}
                onClick={() => setMethod(m.id)}
                className={`relative p-4 rounded-xl border-2 transition-all text-left ${
                  method === m.id ? "border-blue-500" : "border-slate-200 hover:border-slate-300"
                }`}
              >
                {method === m.id && (
                  <div className="absolute top-2 right-2">
                    <CheckCircle size={16} className="text-blue-600" />
                  </div>
                )}
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${m.color} flex items-center justify-center mb-3 text-xl`}>
                  {m.emoji}
                </div>
                <div className="font-semibold text-sm text-slate-900">{m.label}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col">
          <h3 className="font-semibold text-slate-900 mb-4">Buyurtma #CH-1026</h3>
          <div className="space-y-2 text-sm flex-1">
            <div className="flex justify-between text-slate-600">
              <span>Buyurtma narxi</span><span>950 000</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Platforma komissiyasi</span><span>47 500</span>
            </div>
            <div className="border-t border-slate-200 pt-2 flex justify-between font-bold text-slate-900">
              <span>Jami</span>
              <span className="text-blue-700">997 500 so'm</span>
            </div>
          </div>
          <button
            onClick={() => method && setConfirmed(true)}
            disabled={!method}
            className="mt-5 w-full py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all disabled:opacity-40 shadow-lg"
            style={{ background: method ? "linear-gradient(135deg, #16a34a 0%, #15803d 100%)" : "#94a3b8" }}
          >
            <Shield size={16} /> To'lovni tasdiqlash
          </button>
          <p className="text-xs text-slate-400 text-center mt-2 flex items-center justify-center gap-1">
            <Shield size={10} /> Xavfsiz to'lov
          </p>
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
    {
      name: "Akmal Rahimov", orders: 124, rating: 4.8, vehicle: "Isuzu",
      reviews: ["Yuk o'z vaqtida yetkazildi.", "Haydovchi aloqa uchun doim ochiq bo'ldi."]
    },
    {
      name: "Jasur Toshmatov", orders: 203, rating: 4.9, vehicle: "Fura",
      reviews: ["Transport toza va yuk xavfsiz yetkazildi.", "Juda yaxshi xizmat."]
    },
    {
      name: "Bobur Mirzayev", orders: 87, rating: 4.5, vehicle: "Gazel",
      reviews: ["Narx adolatli, haydovchi muomilali."]
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>Reytinglar va sharhlar</h2>
        <p className="text-slate-500 text-sm mt-1">Ishonchli platforma tizimi</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {driverCards.map(d => (
          <div key={d.name} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center font-bold text-white text-lg">
                {d.name.charAt(0)}
              </div>
              <div>
                <div className="font-bold text-slate-900 text-sm">{d.name}</div>
                <div className="text-xs text-slate-500">{d.vehicle} · {d.orders} buyurtma</div>
              </div>
            </div>
            <div className="flex items-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map(s => (
                <Star key={s} size={16} className={s <= Math.floor(d.rating) ? "text-yellow-400 fill-yellow-400" : "text-slate-200 fill-slate-200"} />
              ))}
              <span className="text-sm font-bold text-slate-900 ml-1">{d.rating}</span>
            </div>
            <div className="space-y-2">
              {d.reviews.map(r => (
                <div key={r} className="bg-slate-50 rounded-xl p-3 text-xs text-slate-600 leading-relaxed border-l-2 border-blue-200">
                  "{r}"
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 max-w-lg">
        <h3 className="font-bold text-slate-900 mb-5 flex items-center gap-2">
          <Star size={16} className="text-yellow-400 fill-yellow-400" /> Sharh qoldirish
        </h3>
        {submitted ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle size={28} className="text-green-600" />
            </div>
            <h4 className="font-bold text-slate-900 mb-1">Rahmat!</h4>
            <p className="text-sm text-slate-500">Sizning sharhingiZ muvaffaqiyatli qabul qilindi.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-2">Reyting bering</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(s => (
                  <button
                    key={s}
                    onMouseEnter={() => setHover(s)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => setRating(s)}
                    className="transition-transform hover:scale-110 active:scale-95"
                  >
                    <Star size={32} className={s <= (hover || rating) ? "text-yellow-400 fill-yellow-400" : "text-slate-200 fill-slate-200"} />
                  </button>
                ))}
                {rating > 0 && (
                  <span className="ml-2 text-sm font-bold text-slate-700 self-center">
                    {["", "Yomon", "Qoniqarsiz", "O'rtacha", "Yaxshi", "A'lo"][rating]}
                  </span>
                )}
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Izoh</label>
              <textarea
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder="Tajribangizni baham ko'ring..."
                rows={3}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 resize-none"
              />
            </div>
            <button
              onClick={() => rating > 0 && setSubmitted(true)}
              disabled={rating === 0}
              className="w-full py-2.5 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-40 shadow-md"
              style={{ background: "linear-gradient(135deg, #1d4ed8, #1e3a8a)" }}
            >
              Sharh qoldirish
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Admin Dashboard ──────────────────────────────────────────────────────────

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "drivers">("overview");

  const barData = [
    { name: "Toshkent", buyurtmalar: 420 },
    { name: "Samarqand", buyurtmalar: 280 },
    { name: "Farg'ona", buyurtmalar: 190 },
    { name: "Andijon", buyurtmalar: 165 },
    { name: "Buxoro", buyurtmalar: 130 },
    { name: "Nukus", buyurtmalar: 85 },
  ];

  const lineData = [
    { oy: "Yan", buyurtmalar: 850 },
    { oy: "Fev", buyurtmalar: 1100 },
    { oy: "Mar", buyurtmalar: 1400 },
    { oy: "Apr", buyurtmalar: 1250 },
    { oy: "May", buyurtmalar: 1800 },
    { oy: "Iyu", buyurtmalar: 2100 },
    { oy: "Iyul", buyurtmalar: 2450 },
  ];

  const latestOrders = [
    { id: "#CH-1030", from: "Toshkent", to: "Farg'ona", type: "Mebel", status: "Yo'lda", amount: "1 100 000" },
    { id: "#CH-1029", from: "Samarqand", to: "Buxoro", type: "Qurilish materiali", status: "Yetkazildi", amount: "750 000" },
    { id: "#CH-1028", from: "Andijon", to: "Toshkent", type: "Qishloq xo'jaligi mahsuloti", status: "Taklif kutilmoqda", amount: "1 350 000" },
    { id: "#CH-1027", from: "Nukus", to: "Toshkent", type: "Maishiy texnika", status: "Haydovchi tanlandi", amount: "1 900 000" },
    { id: "#CH-1026", from: "Termiz", to: "Samarqand", type: "Mebel", status: "Yetkazildi", amount: "920 000" },
  ];

  const pendingDrivers = [
    { name: "Sherzod Nazarov", vehicle: "Isuzu, 5t", region: "Toshkent", status: "Tekshiruvda", date: "24-iyul" },
    { name: "Firdavs Tursunov", vehicle: "Gazel, 1.5t", region: "Samarqand", status: "Tasdiqlangan", date: "23-iyul" },
    { name: "Ulugbek Xasanov", vehicle: "Fura, 10t", region: "Farg'ona", status: "Rad etilgan", date: "22-iyul" },
    { name: "Bahodir Qodirov", vehicle: "Isuzu, 3t", region: "Namangan", status: "Tekshiruvda", date: "25-iyul" },
  ];

  const topCards = [
    { label: "Jami foydalanuvchilar", value: "3 482", icon: Users, bg: "from-blue-500 to-blue-700", sub: "+124 bu oy" },
    { label: "Faol haydovchilar", value: "786", icon: Truck, bg: "from-green-500 to-green-700", sub: "Tasdiqlangan" },
    { label: "Bugungi buyurtmalar", value: "124", icon: Package, bg: "from-purple-500 to-purple-700", sub: "+18 kecha" },
    { label: "Oylik tranzaksiya", value: "1.8 mlrd", icon: DollarSign, bg: "from-amber-400 to-amber-600", sub: "so'm" },
  ];

  const tabs = [
    { id: "overview" as const, label: "Ko'rsatkichlar", icon: BarChart2 },
    { id: "orders" as const, label: "Buyurtmalar", icon: Package },
    { id: "drivers" as const, label: "Haydovchilar", icon: Truck },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>Admin paneli</h2>
        <p className="text-slate-500 text-sm mt-0.5">Platforma statistikasi va boshqaruvi</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {topCards.map(({ label, value, icon: Icon, bg, sub }) => (
          <div key={label} className={`rounded-2xl p-5 bg-gradient-to-br ${bg} text-white shadow-lg`}>
            <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center mb-3">
              <Icon size={17} className="text-white" />
            </div>
            <div className="text-2xl font-bold">{value}</div>
            <div className="text-xs text-white/70 mt-0.5">{label}</div>
            <div className="text-xs text-white/50 mt-1">{sub}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-1 bg-slate-100 rounded-xl p-1 mb-5 w-fit">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === t.id ? "bg-white shadow text-slate-900" : "text-slate-500 hover:text-slate-700"}`}
          >
            <t.icon size={14} /> {t.label}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <h3 className="font-semibold text-slate-900 mb-4 text-sm">Viloyatlar bo'yicha buyurtmalar</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={barData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#64748b" }} />
                <YAxis tick={{ fontSize: 11, fill: "#64748b" }} />
                <Tooltip contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 24px rgba(0,0,0,0.1)" }} />
                <Bar dataKey="buyurtmalar" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <h3 className="font-semibold text-slate-900 mb-4 text-sm">Oylik o'sish</h3>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={lineData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="oy" tick={{ fontSize: 11, fill: "#64748b" }} />
                <YAxis tick={{ fontSize: 11, fill: "#64748b" }} />
                <Tooltip contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 24px rgba(0,0,0,0.1)" }} />
                <Line type="monotone" dataKey="buyurtmalar" stroke="#16a34a" strokeWidth={2.5} dot={{ r: 4, fill: "#16a34a" }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeTab === "orders" && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-semibold text-slate-900">So'nggi buyurtmalar</h3>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search size={14} className="absolute left-2.5 top-2.5 text-slate-400" />
                <input placeholder="Qidirish..." className="pl-8 pr-3 py-1.5 border border-slate-200 rounded-lg text-xs bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  {["ID", "Jo'natish", "Yetkazish", "Yuk turi", "Holat", "Summa"].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {latestOrders.map(o => (
                  <tr key={o.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3"><span className="font-mono text-blue-600 font-semibold text-xs">{o.id}</span></td>
                    <td className="px-4 py-3 text-slate-700 text-xs">{o.from}</td>
                    <td className="px-4 py-3 text-slate-700 text-xs">{o.to}</td>
                    <td className="px-4 py-3 text-slate-500 text-xs">{o.type}</td>
                    <td className="px-4 py-3"><StatusBadge status={o.status} /></td>
                    <td className="px-4 py-3 font-semibold text-slate-900 text-xs">{o.amount} so'm</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "drivers" && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h3 className="font-semibold text-slate-900">Haydovchilar tekshiruvi</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  {["Ism", "Transport", "Viloyat", "Sana", "Holat", "Amal"].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {pendingDrivers.map(d => (
                  <tr key={d.name} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 text-xs font-bold">{d.name.charAt(0)}</div>
                        <span className="font-medium text-slate-900 text-xs">{d.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600 text-xs">{d.vehicle}</td>
                    <td className="px-4 py-3 text-slate-600 text-xs">{d.region}</td>
                    <td className="px-4 py-3 text-slate-500 text-xs">{d.date}</td>
                    <td className="px-4 py-3"><StatusBadge status={d.status} /></td>
                    <td className="px-4 py-3">
                      {d.status === "Tekshiruvda" && (
                        <div className="flex gap-2">
                          <button className="text-xs bg-green-600 text-white px-2.5 py-1 rounded-lg hover:bg-green-700 transition-colors font-medium">✓ Tasdiqlash</button>
                          <button className="text-xs bg-red-500 text-white px-2.5 py-1 rounded-lg hover:bg-red-600 transition-colors font-medium">✗ Rad</button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Profile Page ─────────────────────────────────────────────────────────────

function ProfilePage({ role }: { role: Role }) {
  const isDriver = role === "driver";

  const customerStats = [
    { label: "Viloyat", value: "Toshkent" },
    { label: "Tugallangan buyurtmalar", value: "12" },
    { label: "Umumiy xarajat", value: "4.8 mln so'm" },
    { label: "Reyting", value: "4.7 ⭐" },
    { label: "A'zo bo'lgan sana", value: "Mart 2024" },
    { label: "Holat", value: "Faol" },
  ];

  const driverStats = [
    { label: "Transport turi", value: "Isuzu" },
    { label: "Davlat raqami", value: "01 A 234 BC" },
    { label: "Yuk ko'tarish", value: "5 tonna" },
    { label: "Tugallangan buyurtmalar", value: "124" },
    { label: "Bu oy daromad", value: "8.4 mln so'm" },
    { label: "Reyting", value: "4.8 ⭐" },
  ];

  return (
    <div className="max-w-2xl space-y-4">
      <h2 className="text-xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
        {isDriver ? "Haydovchi profili" : "Profil"}
      </h2>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="h-24 relative" style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #1e3a8a 100%)" }}>
          <div className="absolute -bottom-8 left-6">
            <div className="w-16 h-16 rounded-2xl border-4 border-white flex items-center justify-center font-bold text-2xl text-white shadow-lg"
              style={{ background: "linear-gradient(135deg, #3b82f6, #1d4ed8)" }}>
              {isDriver ? "A" : "J"}
            </div>
          </div>
        </div>
        <div className="pt-12 pb-6 px-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                {isDriver ? "Akmal Rahimov" : "Jahongir Abdullayev"}
              </h3>
              <p className="text-slate-500 text-sm">
                {isDriver ? "+998 90 123 45 67" : "+998 90 234 56 78"}
              </p>
              <div className="mt-1">
                {isDriver ? <StatusBadge status="Tasdiqlangan" /> : <StatusBadge status="Faol" />}
              </div>
            </div>
            <button className="text-xs border border-slate-200 text-slate-600 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors">
              Tahrirlash
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {(isDriver ? driverStats : customerStats).map(({ label, value }) => (
              <div key={label} className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                <div className="text-xs text-slate-400 mb-0.5">{label}</div>
                <div className="font-semibold text-slate-900 text-sm">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isDriver && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <FileText size={16} className="text-blue-600" /> Hujjatlar
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { doc: "Haydovchilik guvohnomasi", uploaded: true },
              { doc: "Texnik pasport", uploaded: true },
              { doc: "Sug'urta polisi", uploaded: false },
            ].map(({ doc, uploaded }) => (
              <div
                key={doc}
                className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${
                  uploaded ? "border-green-300 bg-green-50" : "border-slate-200 hover:border-blue-300 hover:bg-blue-50/30"
                }`}
              >
                <Upload size={20} className={`mx-auto mb-2 ${uploaded ? "text-green-500" : "text-slate-400"}`} />
                <p className="text-xs text-slate-600 font-medium">{doc}</p>
                <p className={`text-xs mt-1 font-semibold ${uploaded ? "text-green-600" : "text-slate-400"}`}>
                  {uploaded ? "✓ Yuklangan" : "Yuklash"}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

const dashboardTitles: Partial<Record<Page, string>> = {
  "customer-dashboard": "Mijoz paneli",
  "create-order": "Yangi yuk joylashtirish",
  "driver-dashboard": "Haydovchi paneli",
  "order-details": "Buyurtma tafsilotlari",
  "tracking": "Real vaqt kuzatuvi",
  "price-calculator": "Narx hisoblash",
  "payment": "To'lov",
  "ratings": "Reytinglar",
  "admin": "Admin paneli",
  "profile": "Profil",
};

export default function App() {
  const [page, setPage] = useState<Page>("landing");
  const [role, setRole] = useState<Role>(null);

  if (page === "landing") return <LandingPage navigate={setPage} />;
  if (page === "auth") return <AuthPage navigate={setPage} setRole={setRole} />;

  return (
    <DashboardLayout role={role} currentPage={page} navigate={setPage} title={dashboardTitles[page] || ""}>
      {page === "customer-dashboard" && <CustomerDashboard navigate={setPage} />}
      {page === "create-order" && <CreateOrderPage navigate={setPage} />}
      {page === "driver-dashboard" && <DriverDashboard navigate={setPage} />}
      {page === "order-details" && <OrderDetailsPage navigate={setPage} />}
      {page === "tracking" && <TrackingPage />}
      {page === "price-calculator" && <PriceCalculatorPage />}
      {page === "payment" && <PaymentPage />}
      {page === "ratings" && <RatingsPage />}
      {page === "admin" && <AdminDashboard />}
      {page === "profile" && <ProfilePage role={role} />}
    </DashboardLayout>
  );
}
