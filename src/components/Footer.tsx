import React from 'react';
import { Mail, MapPin, MessageCircle, Phone, ShieldCheck } from 'lucide-react';
import { STORE_ASSETS, STORE_CONTACT } from '../data/catalog';
import { PageId } from '../types';
import { StoreImage } from './ProductVisual';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenPrivacyPolicy?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenPrivacyPolicy }) => {
  const handleNav = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#D6B45A]/50 bg-[#081220] text-[#CBD5E1]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-4">
              <StoreImage
                src={STORE_ASSETS.logo}
                alt="GEAR PRO STORE"
                loading="eager"
                compact
                className="h-16 w-16 shrink-0 rounded-lg border-2 border-[#D6B45A] object-cover"
              />
              <div>
                <h3 className="font-display text-lg font-bold text-[#D6B45A]">
                  {STORE_CONTACT.storeName}
                </h3>
                <p className="text-xs text-[#CBD5E1]">
                  ร้านอุปกรณ์คอมพิวเตอร์และเกมมิ่งเกียร์ของแท้
                </p>
              </div>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-[#CBD5E1]">
              ศูนย์รวมเมาส์ไร้สาย คีย์บอร์ดเมคานิคอล หูฟังเกมมิ่ง ไมโครโฟนสตูดิโอ และอุปกรณ์จัดโต๊ะคอม
              คัดสรรเฉพาะอุปกรณ์ต่อพ่วงคุณภาพสูงพร้อมรับประกันศูนย์ไทยทุกชิ้น
            </p>
            <div className="mt-4 flex items-start gap-2 text-xs text-white">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#D6B45A]" />
              <span>{STORE_CONTACT.locationTh}</span>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <h4 className="font-display text-sm font-bold text-[#D6B45A]">เมนูหน้าร้าน</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => handleNav(PageId.Home)}
                  className="hover:text-white transition-colors"
                >
                  หน้าแรก (ภาพรวมและจุดเด่นร้าน)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav(PageId.Catalog)}
                  className="hover:text-white transition-colors"
                >
                  สินค้าทั้งหมด (4 หมวดหมู่)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav(PageId.CategoriesBrands)}
                  className="hover:text-white transition-colors"
                >
                  หมวดหมู่ &amp; ยี่ห้อ
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav(PageId.Promotions)}
                  className="hover:text-white transition-colors"
                >
                  โปรโมชั่นมาแรงและปฏิทินเทศกาล
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav(PageId.Checkout)}
                  className="hover:text-white transition-colors"
                >
                  คำสั่งซื้อและการชำระเงิน
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav(PageId.Contact)}
                  className="hover:text-white transition-colors"
                >
                  ติดต่อเราและทีมงาน
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Shipping */}
          <div className="md:col-span-4">
            <h4 className="font-display text-sm font-bold text-[#D6B45A]">ติดต่อและจัดส่ง</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-[#00E5FF]" />
                <span className="font-mono-num">
                  {STORE_CONTACT.phones[0]} · {STORE_CONTACT.phones[1]}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 shrink-0 text-[#D946EF]" />
                <span>
                  LINE: {STORE_CONTACT.lineOa} · FB: {STORE_CONTACT.facebook}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-[#D6B45A]" />
                <span>
                  {STORE_CONTACT.email} · IG: {STORE_CONTACT.instagram}
                </span>
              </li>
            </ul>
            <p className="mt-4 border-t border-white/10 pt-3 text-xs text-[#CBD5E1]">
              {STORE_CONTACT.hoursTh} · {STORE_CONTACT.cutoffTh}
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-[#CBD5E1] sm:flex-row">
          <span>© 2026 GEAR PRO STORE — วิทยาลัยอาชีวศึกษาเอเซีย (ร้านอยู่ภายในโรงเรียน)</span>
          <div className="flex flex-wrap items-center gap-4">
            {onOpenPrivacyPolicy && (
              <button
                type="button"
                onClick={onOpenPrivacyPolicy}
                className="inline-flex items-center gap-1.5 font-medium text-[#D6B45A] hover:text-[#00E5FF]"
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>นโยบายความเป็นส่วนตัว</span>
              </button>
            )}
            <span>Computer Accessories &amp; Gaming Peripherals Only</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
