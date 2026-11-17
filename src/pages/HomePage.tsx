import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Clock,
  CreditCard,
  ExternalLink,
  FileText,
  Headphones,
  Headset,
  Keyboard,
  Mail,
  MapPin,
  MessageCircle,
  MonitorCog,
  Mouse,
  PackageCheck,
  Phone,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
} from 'lucide-react';
import { PRODUCTS, STORE_ASSETS, STORE_CONTACT } from '../data/catalog';
import { CartItem, CategoryId, PageId, Product } from '../types';
import { formatThb } from '../utils/promotions';
import { ConsultationModal, QuotationModal } from '../components/HomepageModals';
import { ProductVisual } from '../components/ProductVisual';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onBrowseCategory: (category: CategoryId) => void;
  onSelectProduct: (product: Product) => void;
  onAddItemsToCart: (items: CartItem[]) => void;
  onOpenPrivacyPolicy: () => void;
}

const FEATURED_CATEGORIES = [
  {
    id: CategoryId.MiceAndPads,
    titleTh: 'เมาส์และแผ่นรองเมาส์',
    titleEn: 'Gaming Mice & Mousepads',
    description:
      'เมาส์ไร้สายน้ำหนักเบา 60g เซ็นเซอร์ระดับ Esports และแผ่นรองเมาส์ Speed / Control แบรนด์แท้',
    image: STORE_ASSETS.micePads,
    icon: Mouse,
    accent: '#00E5FF',
  },
  {
    id: CategoryId.KeyboardsAndCaps,
    titleTh: 'คีย์บอร์ดและปุ่มกด',
    titleEn: 'Mechanical Keyboards & Keycaps',
    description:
      'คีย์บอร์ดไร้สาย 65% / 75% / TKL รองรับ QMK/VIA และคีย์แคป PBT สีคมชัดพร้อมสายถัก Aviator',
    image: STORE_ASSETS.keyboardsCaps,
    icon: Keyboard,
    accent: '#D6B45A',
  },
  {
    id: CategoryId.AudioAndMics,
    titleTh: 'หูฟัง ลำโพง และไมโครโฟน',
    titleEn: 'Headsets, Speakers & Microphones',
    description:
      'หูฟังเกมมิ่ง 3D Spatial Audio ลำโพงตั้งโต๊ะ และไมโครโฟนสตูดิโอสำหรับการสตรีมและประชุมออนไลน์',
    image: STORE_ASSETS.headsetsAudio,
    icon: Headphones,
    accent: '#D946EF',
  },
  {
    id: CategoryId.DeskAndCables,
    titleTh: 'อุปกรณ์จัดโต๊ะคอมและสายเชื่อมต่อ',
    titleEn: 'Desk Setup, Hubs & Cables',
    description:
      'แขนจับจอ Monitor Arm โคมไฟติดหน้าจอถนอมสายตา USB-C Hub 100W และสาย HDMI 2.1 / LAN Cat 8',
    image: STORE_ASSETS.deskSetupHubs,
    icon: MonitorCog,
    accent: '#2196F3',
  },
];

const TESTIMONIALS = [
  {
    id: 'review-1',
    productId: 'logitech-g-pro-x-superlight-2',
    productName: 'Logitech G PRO X SUPERLIGHT 2',
    reviewer: 'ณัฐพล ก.',
    role: 'นักศึกษาแผนกเทคโนโลยีสารสนเทศ · ผู้เล่น FPS',
    rating: 5,
    quote:
      'ไปลองจับตัวจริงที่ร้านในวิทยาลัยอาชีวศึกษาเอเซียแล้วตัดสินใจซื้อทันที น้ำหนักเบา 60 กรัม สะบัดเมาส์ใน Valorant นิ่งขึ้นชัดเจน ประกันศูนย์ไทยครบกล่องครับ',
  },
  {
    id: 'review-2',
    productId: 'keychron-k2-max',
    productName: 'Keychron K2 Max QMK Wireless',
    reviewer: 'กัญญารัตน์ ว.',
    role: 'นักออกแบบกราฟิกและเขียนโค้ด',
    rating: 5,
    quote:
      'ชอบที่สลับโหมด macOS กับ Windows ได้ในปุ่มเดียว สัญญาณ 2.4GHz เสถียรมาก พิมพ์งานทั้งวันเสียงโฟมในตัวนุ่มแน่น แถมได้โปรคู่เมาส์ลด 15% คุ้มสุดๆ',
  },
  {
    id: 'review-3',
    productId: 'hyperx-cloud-iii-wired',
    productName: 'HyperX Cloud III Gaming Headset',
    reviewer: 'ธนวัฒน์ ช.',
    role: 'สตรีมเมอร์และลูกค้าประจำหน้าร้าน',
    rating: 5,
    quote:
      'ใส่เล่นเกมและเรียนออนไลน์ต่อเนื่อง 4-5 ชั่วโมงไม่บีบหูเลยครับ ไมโครโฟนตัดเสียงรบกวนในหอพักได้ดีมาก มีไฟ LED บอกสถานะ Mute ชัดเจน',
  },
];

const DESK_SETUPS = [
  {
    title: 'Pro Esports Minimal Desk',
    owner: 'ผลงานจัดเซตให้ทีมแข่งเกมประจำวิทยาลัย',
    gearSummary: 'Logitech G PRO X SUPERLIGHT 2 + Keychron K2 Max + Artisan FX Zero',
    image: STORE_ASSETS.micePads,
  },
  {
    title: 'Night Coder & Designer Studio',
    owner: 'ผลงานจัดโต๊ะทำงานและเรียนออนไลน์ถนอมสายตา',
    gearSummary: 'BenQ ScreenBar Halo 2 + Ergotron LX Arm + Logitech MX Master 3S',
    image: '/src/assets/images/prod_monitor_light_bar_1794897706346.jpg',
  },
  {
    title: 'Creator & Streaming Command Station',
    owner: 'ผลงานจัดชุดสตรีมมิ่งเสียงใสระดับสตูดิโอ',
    gearSummary: 'Elgato Stream Deck MK.2 + HyperX QuadCast S + HyperX Cloud III',
    image: '/src/assets/images/prod_stream_deck_mk2_1794897707453.jpg',
  },
];

const BRAND_PARTNERS = [
  { name: 'Logitech G', specialty: 'Pro Wireless Mice & Audio' },
  { name: 'Keychron', specialty: 'QMK/VIA Mechanical Keyboards' },
  { name: 'HyperX', specialty: 'Gaming Headsets & Studio Mics' },
  { name: 'BenQ', specialty: 'ScreenBar Desk Lighting' },
  { name: 'Razer', specialty: 'Esports Peripherals' },
  { name: 'SteelSeries', specialty: 'QcK Mousepads & Acoustic' },
  { name: 'Elgato', specialty: 'Streaming Control Gear' },
  { name: 'UGREEN', specialty: 'USB-C Hubs & High-Speed Cables' },
];

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'เลือกสินค้าจาก 40 รุ่นแท้',
    detail: 'คัดกรองจาก 4 หมวดหมู่อุปกรณ์เสริมและเกมมิ่งเกียร์ เปรียบเทียบสเปกและราคาชัดเจน',
    icon: ShoppingBag,
  },
  {
    step: '02',
    title: 'ยืนยันคำสั่งซื้อ & ชำระเงิน',
    detail: 'รับส่วนลดชุดคู่ 15% อัตโนมัติ พร้อมชำระผ่านสแกน PromptPay QR หรือโอนธนาคารกสิกรไทย',
    icon: CreditCard,
  },
  {
    step: '03',
    title: 'จัดส่งรวดเร็ว / นัดรับฟรีที่วิทยาลัย',
    detail: 'ส่งด่วนทั่วไทยตัดรอบ 15:00 น. (ฟรีเมื่อครบ 2,500.-) หรือรับฟรีหน้าร้านในโรงเรียน',
    icon: Truck,
  },
  {
    step: '04',
    title: 'รับสินค้าพร้อมใช้งานและประกันศูนย์',
    detail: 'ตรวจสอบ Serial Number ก่อนส่งทุกชิ้น พร้อมทีมงานดูแลเคลมและคำปรึกษาหลังการขาย',
    icon: PackageCheck,
  },
];

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onBrowseCategory,
  onSelectProduct,
  onAddItemsToCart,
  onOpenPrivacyPolicy,
}) => {
  const [consultOpen, setConsultOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);

  const signatureProducts = useMemo(() => {
    const ids = [
      'logitech-g-pro-x-superlight-2',
      'keychron-k2-max',
      'hyperx-cloud-iii-wired',
      'benq-screenbar-halo-2',
    ];
    return ids
      .map((id) => PRODUCTS.find((p) => p.id === id))
      .filter((p): p is Product => Boolean(p));
  }, []);

  const openReviewedProduct = (productId: string) => {
    const found = PRODUCTS.find((p) => p.id === productId);
    if (found) onSelectProduct(found);
  };

  const mapsSearchUrl =
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent('วิทยาลัยอาชีวศึกษาเอเซีย');

  return (
    <div>
      {/* =================================================================== */}
      {/* Section 1: Hero Section (ส่วนหัวและคำโปรยหลัก)                       */}
      {/* =================================================================== */}
      <section className="border-b border-[#D6B45A]/40 bg-[#0B192C]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
            {/* Left Copy & Brand Identity */}
            <div className="flex flex-col justify-between rounded-xl border border-[#D6B45A] bg-[#152A42] p-7 sm:p-10 lg:col-span-6">
              <div>
                <div className="flex items-center gap-3">
                  <img
                    src={STORE_ASSETS.logo}
                    alt="GEAR PRO STORE Logo"
                    referrerPolicy="no-referrer"
                    className="h-12 w-12 shrink-0 rounded-lg border border-[#D6B45A] object-cover"
                  />
                  <div>
                    <p className="font-display text-sm font-bold tracking-wider text-[#D6B45A]">
                      GEAR PRO STORE
                    </p>
                    <p className="text-xs text-[#CBD5E1]">
                      ร้านอุปกรณ์คอมพิวเตอร์และเกมมิ่งเกียร์ · วิทยาลัยอาชีวศึกษาเอเซีย
                    </p>
                  </div>
                </div>

                <h1 className="mt-6 font-display text-2xl font-bold leading-snug text-white text-balance sm:text-3xl lg:text-[2.35rem]">
                  GEAR PRO STORE — ศูนย์รวมอุปกรณ์เสริมคอมพิวเตอร์และเกมมิ่งเกียร์เกรดพรีเมียม
                  ตอบโจทย์ทุกการเล่นเกมและการทำงาน
                </h1>

                <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#CBD5E1] sm:text-base">
                  คัดสรรเฉพาะอุปกรณ์ต่อพ่วงของแท้ 100% ทั้งเมาส์ไร้สายระดับโปร คีย์บอร์ดเมคานิคอล
                  หูฟัง ไมโครโฟน และอุปกรณ์จัดโต๊ะคอมจากแบรนด์ชั้นนำ พร้อมรับประกันศูนย์ไทยทุกชิ้น
                </p>

                {/* Crisp Value Metrics */}
                <div className="mt-6 grid grid-cols-3 gap-3 border-t border-white/10 pt-5">
                  <div>
                    <p className="font-mono-num text-lg font-bold text-[#D6B45A] sm:text-xl">
                      40 รุ่น
                    </p>
                    <p className="text-xs text-[#CBD5E1]">อุปกรณ์ต่อพ่วงแท้</p>
                  </div>
                  <div>
                    <p className="font-mono-num text-lg font-bold text-[#00E5FF] sm:text-xl">
                      ลด 15%
                    </p>
                    <p className="text-xs text-[#CBD5E1]">ชุดคู่ Pro Esports</p>
                  </div>
                  <div>
                    <p className="font-mono-num text-lg font-bold text-[#D946EF] sm:text-xl">
                      รับฟรี 0.-
                    </p>
                    <p className="text-xs text-[#CBD5E1]">ที่วิทยาลัยอาชีวศึกษาเอเซีย</p>
                  </div>
                </div>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate(PageId.Catalog)}
                  className="inline-flex min-h-[46px] items-center gap-2 rounded-lg border border-[#D6B45A] bg-gradient-to-r from-[#2196F3] to-[#D946EF] px-6 py-2.5 text-sm font-semibold text-white transition-all hover:brightness-110"
                >
                  <span>เลือกซื้อสินค้าทั้งหมด</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate(PageId.Promotions)}
                  className="inline-flex min-h-[46px] items-center gap-2 rounded-lg border border-[#D6B45A] bg-[#0B192C] px-5 py-2.5 text-sm font-semibold text-[#D6B45A] transition-colors hover:border-[#00E5FF] hover:text-white"
                >
                  <Sparkles className="h-4 w-4 text-[#00E5FF]" />
                  <span>ดูโปรโมชั่นมาแรง</span>
                </button>
              </div>
            </div>

            {/* Right Promotional Banner & Quick Hardware Picks */}
            <div className="flex flex-col justify-between gap-4 lg:col-span-6">
              <div className="relative overflow-hidden rounded-xl border border-[#D6B45A] bg-[#152A42]">
                <div className="aspect-[16/10] w-full overflow-hidden">
                  <img
                    src={STORE_ASSETS.hero}
                    alt="โปรโมชั่นอุปกรณ์เกมมิ่งเกียร์และอุปกรณ์จัดโต๊ะคอม GEAR PRO STORE"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="border-t border-[#D6B45A]/45 bg-[#0B192C]/90 px-5 py-3.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-[#D6B45A]">
                      PRO PERIPHERALS SHOWCASE
                    </span>
                    <span className="text-xs text-[#00E5FF]">
                      เฉพาะอุปกรณ์เสริมคอมพิวเตอร์และเกมมิ่งเกียร์
                    </span>
                  </div>
                </div>
              </div>

              {/* 4 Signature Clickable Hardware Picks */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {signatureProducts.map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => onSelectProduct(product)}
                    className="group overflow-hidden rounded-lg border border-[#D6B45A]/60 bg-[#152A42] p-2.5 text-left transition-all hover:border-[#00E5FF]"
                  >
                    <div className="aspect-[4/3] overflow-hidden rounded bg-[#0B192C]">
                      <ProductVisual
                        src={product.image}
                        alt={product.name}
                        category={product.category}
                        className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                      />
                    </div>
                    <p className="mt-2 truncate text-xs font-semibold text-white group-hover:text-[#00E5FF]">
                      {product.name}
                    </p>
                    <p className="font-mono-num text-xs font-bold text-[#D6B45A]">
                      ฿{formatThb(product.price)}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* Section 2: About Us & Unique Value (เกี่ยวกับเรา / จุดเด่นของธุรกิจ) */}
      {/* =================================================================== */}
      <section className="border-b border-[#D6B45A]/25 bg-[#0E1E33] py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold tracking-wider text-[#D6B45A]">
                ABOUT GEAR PRO STORE · เกี่ยวกับเราและจุดเด่นของธุรกิจ
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
                คัดสรรเกมมิ่งเกียร์ของแท้ เพื่อประสิทธิภาพสูงสุดทั้งในสนามแข่งและโต๊ะทำงาน
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#CBD5E1]">
                GEAR PRO STORE ก่อตั้งขึ้นภายใน{' '}
                <strong className="text-white">{STORE_CONTACT.locationTh}</strong>{' '}
                ด้วยความตั้งใจที่จะให้นักศึกษา เกมเมอร์ และคนทำงานสายครีเอทีฟ
                สามารถเข้าถึงอุปกรณ์คอมพิวเตอร์ระดับสากลได้ง่ายในราคาที่คุ้มค่า
                โดยเน้นเฉพาะอุปกรณ์ต่อพ่วงคุณภาพสูง (Peripherals &amp; Desk Setup Only)
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[#CBD5E1]">
                ทุกชิ้นผ่านการคัดเลือกจากผู้ใช้งานจริง ทั้งแบรนด์{' '}
                <strong className="text-[#D6B45A]">Logitech, Keychron, HyperX, BenQ</strong>{' '}
                พร้อมให้ทดลองจับ ทดสอบเสียงสวิตช์ และรับคำแนะนำตรงจุดก่อนตัดสินใจ
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
              <article className="rounded-xl border border-[#D6B45A]/75 bg-[#152A42] p-5">
                <ShieldCheck className="h-7 w-7 text-[#D6B45A]" />
                <h3 className="mt-3 font-display text-base font-bold text-white">
                  สินค้าของแท้ 100% ประกันศูนย์ไทย
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-[#CBD5E1]">
                  จำหน่ายเฉพาะสินค้าแท้จากตัวแทนจำหน่ายอย่างเป็นทางการ ตรวจสอบ Serial Number
                  ก่อนส่งมอบและรับประกันศูนย์ไทยสูงสุด 2 ปี
                </p>
              </article>

              <article className="rounded-xl border border-[#D6B45A]/75 bg-[#152A42] p-5">
                <Award className="h-7 w-7 text-[#00E5FF]" />
                <h3 className="mt-3 font-display text-base font-bold text-white">
                  คัดสรรแบบ Gamer-Focused Curation
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-[#CBD5E1]">
                  เลือกเฉพาะรุ่นยอดนิยมที่ผ่านการพิสูจน์จากโปรเพลเยอร์และนักพัฒนาจริง
                  ไม่มีสินค้าค้างสต็อกหรืออุปกรณ์คุณภาพต่ำ
                </p>
              </article>

              <article className="rounded-xl border border-[#D6B45A]/75 bg-[#152A42] p-5">
                <Sparkles className="h-7 w-7 text-[#D946EF]" />
                <h3 className="mt-3 font-display text-base font-bold text-white">
                  ราคาคุ้มค่าพร้อมโปรโมชั่นประจำเดือน
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-[#CBD5E1]">
                  จับคู่ชุดเมาส์และคีย์บอร์ดรับส่วนลด 15% ทันที พร้อมโปรส่งฟรีเมื่อช้อปครบ 2,500
                  บาท และของแถมพิเศษตามช่วงเทศกาล
                </p>
              </article>

              <article className="rounded-xl border border-[#D6B45A]/75 bg-[#152A42] p-5">
                <MapPin className="h-7 w-7 text-[#2196F3]" />
                <h3 className="mt-3 font-display text-base font-bold text-white">
                  มีหน้าร้านจริง นัดรับฟรีและลองสินค้าได้
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-[#CBD5E1]">
                  ตั้งอยู่ภายในวิทยาลัยอาชีวศึกษาเอเซีย สามารถเข้ามารับสินค้าฟรีไม่มีค่าส่ง
                  หรือนัดปรึกษาจัดโต๊ะคอมกับทีมงานได้โดยตรง
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* Section 3: Services / Products Highlight (บริการหรือสินค้าหลัก)       */}
      {/* =================================================================== */}
      <section className="border-b border-[#D6B45A]/25 bg-[#0B192C] py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold tracking-wider text-[#D6B45A]">
                CORE PRODUCT CATEGORIES · สินค้าหลักทั้ง 4 หมวดหมู่
              </p>
              <h2 className="mt-1.5 font-display text-2xl font-bold text-white sm:text-3xl">
                เลือกช้อปตามหมวดหมู่อุปกรณ์ต่อพ่วง
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onBrowseCategory(CategoryId.All)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#00E5FF] hover:text-white"
            >
              <span>ดูสินค้าทั้งหมด 40 รุ่น</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURED_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => onBrowseCategory(cat.id)}
                  className="group flex flex-col justify-between overflow-hidden rounded-xl border border-[#D6B45A]/80 bg-[#152A42] text-left transition-all duration-150 hover:-translate-y-1 hover:border-[#00E5FF] hover:shadow-[0_12px_28px_rgba(33,150,243,0.2)]"
                >
                  <div>
                    <div className="aspect-[4/3] w-full overflow-hidden border-b border-[#D6B45A]/35 bg-[#0B192C]">
                      <img
                        src={cat.image}
                        alt={cat.titleTh}
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center justify-between gap-2">
                        <div
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#D6B45A]/50 bg-[#0B192C]"
                          style={{ color: cat.accent }}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="font-mono-num text-xs font-semibold text-[#D6B45A]">
                          10 รุ่นแท้
                        </span>
                      </div>
                      <h3 className="mt-3 font-display text-base font-bold text-white group-hover:text-[#00E5FF]">
                        {cat.titleTh}
                      </h3>
                      <p className="text-xs font-medium text-[#D6B45A]">{cat.titleEn}</p>
                      <p className="mt-2 text-xs leading-relaxed text-[#CBD5E1]">
                        {cat.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/10 bg-[#0B192C]/45 px-5 py-3 text-xs font-semibold text-[#00E5FF] group-hover:text-white">
                    <span>ดูสินค้าในหมวดนี้</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* Section 4: Social Proof & Testimonials (ผลงาน ความน่าเชื่อถือ และรีวิว) */}
      {/* =================================================================== */}
      <section className="border-b border-[#D6B45A]/25 bg-[#0E1E33] py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold tracking-wider text-[#D6B45A]">
              SOCIAL PROOF &amp; CUSTOMER SETUPS · ความน่าเชื่อถือและรีวิวจากลูกค้าจริง
            </p>
            <h2 className="mt-1.5 font-display text-2xl font-bold text-white sm:text-3xl">
              เสียงตอบรับจากเกมเมอร์และผู้ใช้งานจริง
            </h2>
          </div>

          {/* 3 Product Testimonials */}
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((review) => (
              <article
                key={review.id}
                className="flex flex-col justify-between rounded-xl border border-[#D6B45A]/75 bg-[#152A42] p-6"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1 text-[#D6B45A]" aria-label="5 ดาว">
                      {Array.from({ length: review.rating }).map((_, idx) => (
                        <Star key={idx} className="h-4 w-4 fill-[#D6B45A]" />
                      ))}
                    </div>
                    <span className="text-xs font-medium text-[#00E5FF]">ยืนยันผู้ซื้อจริง</span>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-[#CBD5E1]">
                    “{review.quote}”
                  </p>
                </div>

                <div className="mt-5 border-t border-white/10 pt-4">
                  <p className="font-display text-sm font-bold text-white">{review.reviewer}</p>
                  <p className="text-xs text-[#CBD5E1]">{review.role}</p>
                  <button
                    type="button"
                    onClick={() => openReviewedProduct(review.productId)}
                    className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#D6B45A] hover:text-[#00E5FF]"
                  >
                    <span>สินค้าที่รีวิว: {review.productName}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Customer Desk Setups Showcase */}
          <div className="mt-10">
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-display text-lg font-bold text-white sm:text-xl">
                ตัวอย่างผลงานจัดโต๊ะคอมจากอุปกรณ์ของ GEAR PRO STORE
              </h3>
              <button
                type="button"
                onClick={() => onBrowseCategory(CategoryId.DeskAndCables)}
                className="text-xs font-semibold text-[#D6B45A] hover:text-[#00E5FF]"
              >
                ดูอุปกรณ์จัดโต๊ะคอม →
              </button>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-3">
              {DESK_SETUPS.map((setup) => (
                <div
                  key={setup.title}
                  className="overflow-hidden rounded-xl border border-[#D6B45A]/60 bg-[#152A42]"
                >
                  <div className="aspect-[16/10] w-full overflow-hidden border-b border-[#D6B45A]/30 bg-[#0B192C]">
                    <img
                      src={setup.image}
                      alt={setup.title}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-display text-sm font-bold text-white">{setup.title}</h4>
                    <p className="mt-1 text-xs text-[#00E5FF]">{setup.owner}</p>
                    <p className="mt-2 text-xs text-[#CBD5E1]">{setup.gearSummary}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Brand Partners Strip */}
          <div className="mt-10 rounded-xl border border-[#D6B45A]/50 bg-[#152A42] p-6">
            <p className="text-center text-xs font-semibold tracking-wider text-[#D6B45A]">
              AUTHORIZED BRAND PARTNERS · แบรนด์พันธมิตรอย่างเป็นทางการ
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
              {BRAND_PARTNERS.map((brand) => (
                <div
                  key={brand.name}
                  className="rounded-lg border border-white/10 bg-[#0B192C] px-3 py-3 text-center"
                >
                  <p className="font-display text-sm font-bold text-white">{brand.name}</p>
                  <p className="mt-0.5 truncate text-[10px] text-[#CBD5E1]">{brand.specialty}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* Section 5: How It Works / Process (กระบวนการทำงาน 4 ขั้นตอน)        */}
      {/* =================================================================== */}
      <section className="border-b border-[#D6B45A]/25 bg-[#0B192C] py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold tracking-wider text-[#D6B45A]">
                HOW IT WORKS · ขั้นตอนการสั่งซื้อและรับสินค้า
              </p>
              <h2 className="mt-1.5 font-display text-2xl font-bold text-white sm:text-3xl">
                สั่งซื้อง่าย ปลอดภัย ได้รับของไวภายใน 4 ขั้นตอน
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate(PageId.Checkout)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#00E5FF] hover:text-white"
            >
              <span>ไปหน้าคำสั่งซื้อและการชำระเงิน</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.step}
                  className="rounded-xl border border-[#D6B45A]/75 bg-[#152A42] p-6"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono-num text-2xl font-bold text-[#D6B45A]">
                      {item.step}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#00E5FF]/40 bg-[#0B192C] text-[#00E5FF]">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="mt-4 font-display text-base font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#CBD5E1]">{item.detail}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* Section 6: Call to Action (ส่วนกระตุ้นการตัดสินใจ - CTA)             */}
      {/* =================================================================== */}
      <section className="border-b border-[#D6B45A]/30 bg-[#0E1E33] py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-[#D6B45A] bg-gradient-to-br from-[#152A42] via-[#102238] to-[#1A1A3E] p-7 sm:p-10 lg:p-12">
            <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold tracking-wider text-[#D6B45A]">
                  READY TO UPGRADE YOUR SETUP · พร้อมยกระดับอุปกรณ์ของคุณหรือยัง
                </p>
                <h2 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
                  เลือกอุปกรณ์ที่ใช่ หรือขอคำแนะนำและใบเสนอราคาจากทีมผู้เชี่ยวชาญได้ทันที
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[#CBD5E1]">
                  ไม่ว่าคุณจะจัดเซตเล่นเกม FPS จัดโต๊ะทำงานสายโค้ด หรือสั่งซื้อเป็นชุดสำหรับชมรมและหน่วยงาน
                  ทีมงาน GEAR PRO STORE ยินดีแนะนำรุ่นที่คุ้มงบที่สุดโดยไม่มีค่าใช้จ่าย
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-[#00E5FF]">
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4" />
                    ปรึกษาสเปกฟรีไม่มีค่าบริการ
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4" />
                    ออกใบเสนอราคาคำนวณส่วนลด Bundle 15% ทันที
                  </span>
                </div>
              </div>

              <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto lg:flex-col">
                <button
                  type="button"
                  onClick={() => setConsultOpen(true)}
                  className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-lg border border-[#00E5FF] bg-[#0B192C] px-6 py-2.5 text-sm font-semibold text-[#00E5FF] transition-colors hover:bg-[#00E5FF] hover:text-[#0B192C]"
                >
                  <Headset className="h-4 w-4" />
                  <span>ปรึกษาฟรี</span>
                </button>

                <button
                  type="button"
                  onClick={() => setQuoteOpen(true)}
                  className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-lg border border-[#D6B45A] bg-[#0B192C] px-6 py-2.5 text-sm font-semibold text-[#D6B45A] transition-colors hover:bg-[#D6B45A] hover:text-[#0B192C]"
                >
                  <FileText className="h-4 w-4" />
                  <span>ขอใบเสนอราคา</span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate(PageId.Catalog)}
                  className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-lg border border-[#D6B45A] bg-gradient-to-r from-[#2196F3] to-[#D946EF] px-6 py-2.5 text-sm font-semibold text-white transition-all hover:brightness-110"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>สั่งซื้อสินค้า</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* Section 7: Contact, Location Pin & Privacy Info (ติดต่อและตำแหน่งร้าน) */}
      {/* =================================================================== */}
      <section className="bg-[#0B192C] py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
            {/* Contact Channels & Hours */}
            <div className="flex flex-col justify-between rounded-xl border border-[#D6B45A] bg-[#152A42] p-6 sm:p-8 lg:col-span-6">
              <div>
                <p className="text-xs font-semibold tracking-wider text-[#D6B45A]">
                  CONTACT &amp; STORE INFORMATION · ข้อมูลติดต่อและเวลาทำการ
                </p>
                <h2 className="mt-2 font-display text-2xl font-bold text-white">
                  ติดต่อหน้าร้าน GEAR PRO STORE
                </h2>
                <p className="mt-2 text-sm text-[#CBD5E1]">
                  พร้อมให้บริการทั้งหน้าร้านภายในวิทยาลัยอาชีวศึกษาเอเซียและช่องทางออนไลน์ทุกวันทำการ
                </p>

                <div className="mt-6 space-y-3.5 text-sm">
                  <div className="flex items-start gap-3">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#00E5FF]" />
                    <div className="space-y-0.5 text-white">
                      {STORE_CONTACT.phones.map((phone) => (
                        <p key={phone} className="font-mono-num text-xs sm:text-sm">
                          {phone}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-white">
                    <Mail className="h-4 w-4 shrink-0 text-[#D6B45A]" />
                    <span>Official Email: {STORE_CONTACT.email}</span>
                  </div>

                  <div className="flex items-center gap-3 text-white">
                    <MessageCircle className="h-4 w-4 shrink-0 text-[#D946EF]" />
                    <span>
                      LINE OA: <strong className="text-[#00E5FF]">{STORE_CONTACT.lineOa}</strong> ·
                      Facebook: {STORE_CONTACT.facebook} · IG: {STORE_CONTACT.instagram}
                    </span>
                  </div>

                  <div className="flex items-start gap-3 text-white">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#D6B45A]" />
                    <div>
                      <p>{STORE_CONTACT.hoursTh}</p>
                      <p className="text-xs text-[#CBD5E1]">{STORE_CONTACT.cutoffTh}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
                <button
                  type="button"
                  onClick={onOpenPrivacyPolicy}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#D6B45A] hover:text-[#00E5FF]"
                >
                  <ShieldCheck className="h-4 w-4" />
                  <span>อ่านนโยบายความเป็นส่วนตัว (Privacy Policy)</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate(PageId.Contact)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00E5FF] hover:text-white"
                >
                  <span>ดูทีมงานและแบบฟอร์มติดต่อ</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Storefront Pin & Campus Location Card */}
            <div className="flex flex-col justify-between overflow-hidden rounded-xl border border-[#D6B45A] bg-[#152A42] lg:col-span-6">
              <div className="relative h-56 overflow-hidden border-b border-[#D6B45A]/45 bg-[#0B192C] sm:h-64">
                <img
                  src={STORE_ASSETS.storefront}
                  alt="หน้าร้าน GEAR PRO STORE วิทยาลัยอาชีวศึกษาเอเซีย"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
                <div className="absolute right-3 bottom-3 left-3 rounded-lg border border-[#D6B45A] bg-[#0B192C]/90 px-4 py-2.5 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#D6B45A]">
                    <MapPin className="h-4 w-4 shrink-0 text-[#00E5FF]" />
                    <span>{STORE_CONTACT.locationTh}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <h3 className="font-display text-base font-bold text-white">
                    พิกัดหน้าร้านและจุดนัดรับสินค้าฟรี
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#CBD5E1]">
                    ตั้งอยู่บริเวณอาคารบริการนักศึกษา ภายในวิทยาลัยอาชีวศึกษาเอเซีย
                    นักศึกษาและลูกค้าทั่วไปสามารถแวะชม ทดลองอุปกรณ์จริง และรับสินค้าหน้าร้านได้ฟรีทุกวันจันทร์ – เสาร์
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <a
                    href={mapsSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-[#D6B45A] bg-[#0B192C] px-4 py-2 text-xs font-semibold text-[#D6B45A] transition-colors hover:border-[#00E5FF] hover:text-white"
                  >
                    <MapPin className="h-4 w-4 text-[#00E5FF]" />
                    <span>เปิดดูตำแหน่งบน Google Maps</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={() => onNavigate(PageId.Checkout)}
                    className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-white/20 bg-[#0B192C] px-4 py-2 text-xs font-semibold text-white hover:border-[#D6B45A]"
                  >
                    <span>สั่งซื้อและเลือกนัดรับที่วิทยาลัย</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ConsultationModal
        isOpen={consultOpen}
        onClose={() => setConsultOpen(false)}
        onSelectProduct={onSelectProduct}
      />

      <QuotationModal
        isOpen={quoteOpen}
        onClose={() => setQuoteOpen(false)}
        onAddItemsToCart={onAddItemsToCart}
      />
    </div>
  );
};
