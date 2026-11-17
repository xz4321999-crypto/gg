import React, { useState } from 'react';
import { ArrowRight, Calendar, Check, Gift, Percent, ShoppingCart, Truck } from 'lucide-react';
import { FESTIVE_CALENDAR, PRODUCTS, PROMOTIONS } from '../data/catalog';
import { CategoryId, PageId, Product } from '../types';
import { formatThb } from '../utils/promotions';
import { ProductVisual } from '../components/ProductVisual';

interface PromotionsPageProps {
  onAddBundle: () => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  onBrowseCategory: (cat: CategoryId) => void;
  onNavigate: (page: PageId) => void;
}

export const PromotionsPage: React.FC<PromotionsPageProps> = ({
  onAddBundle,
  onAddToCart,
  onBrowseCategory,
  onNavigate,
}) => {
  const [selectedEventId, setSelectedEventId] = useState<string>(FESTIVE_CALENDAR[0].id);
  const [bundleAdded, setBundleAdded] = useState(false);
  const [addedHeadsets, setAddedHeadsets] = useState<Record<string, boolean>>({});

  const wirelessHeadsets = PRODUCTS.filter((p) => p.isWirelessHeadset);
  const activeEvent =
    FESTIVE_CALENDAR.find((ev) => ev.id === selectedEventId) ?? FESTIVE_CALENDAR[0];

  const handleBundleClick = () => {
    onAddBundle();
    setBundleAdded(true);
    setTimeout(() => setBundleAdded(false), 1800);
  };

  const handleAddHeadset = (product: Product) => {
    onAddToCart(product, 1);
    setAddedHeadsets((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedHeadsets((prev) => ({ ...prev, [product.id]: false }));
    }, 1200);
  };

  const renderPromoIcon = (index: number) => {
    if (index === 0) return <Percent className="h-6 w-6 text-[#D6B45A]" />;
    if (index === 1) return <Truck className="h-6 w-6 text-[#00E5FF]" />;
    return <Gift className="h-6 w-6 text-[#D946EF]" />;
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
      {/* Page Header */}
      <div className="rounded-xl border border-[#D6B45A] bg-[#152A42] p-7 sm:p-10">
        <p className="text-xs font-semibold tracking-wider text-[#D6B45A]">
          HOT PROMOTIONS &amp; SEASONAL EVENTS · โปรโมชั่นมาแรง
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold text-white text-balance sm:text-4xl">
          ดีลพิเศษและปฏิทินเทศกาลอุปกรณ์คอมพิวเตอร์
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#CBD5E1] sm:text-base">
          รับส่วนลดชุดเกมมิ่งเกียร์ สิทธิ์ส่งฟรีทั่วประเทศ และของแถมแผ่นรองเมาส์ SteelSeries QcK
          พร้อมโปรโมชั่นพิเศษตลอด 9 วันสำคัญแห่งปี
        </p>
      </div>

      {/* 3 Store-Wide Active Promotions */}
      <section className="mt-10" aria-labelledby="active-promos-heading">
        <h2 id="active-promos-heading" className="font-display text-2xl font-bold text-white">
          3 โปรโมชั่นหลักประจำร้าน (Active Store-Wide Deals)
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {PROMOTIONS.map((promo, idx) => (
            <article
              key={promo.id}
              className="flex flex-col justify-between rounded-xl border border-[#D6B45A] bg-[#152A42] p-6 transition-all duration-150 hover:border-[#00E5FF] hover:shadow-[0_10px_28px_rgba(33,150,243,0.18)]"
            >
              <div>
                <div className="flex items-center justify-between gap-3">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[#D6B45A]/50 bg-[#0B192C]">
                    {renderPromoIcon(idx)}
                  </div>
                  <span className="font-mono-num text-xs font-semibold text-[#D6B45A]">
                    {promo.validityText}
                  </span>
                </div>

                <h3 className="mt-4 font-display text-xl font-bold text-white">
                  {promo.titleTh}
                </h3>
                <p className="mt-1 text-xs font-medium text-[#00E5FF]">{promo.titleEn}</p>

                <p className="mt-3 text-sm leading-relaxed text-[#CBD5E1]">
                  {promo.descriptionTh}
                </p>
              </div>

              <div className="mt-6 border-t border-white/10 pt-4">
                <p className="font-mono-num text-sm font-bold text-[#D6B45A]">
                  {promo.highlightMetric}
                </p>

                {promo.actionType === 'add-bundle' && (
                  <button
                    type="button"
                    onClick={handleBundleClick}
                    className="mt-3 inline-flex min-h-[42px] w-full items-center justify-center gap-2 rounded-lg border border-[#D6B45A] bg-gradient-to-r from-[#2196F3] to-[#D946EF] px-4 py-2 text-sm font-semibold text-white hover:brightness-110"
                  >
                    {bundleAdded ? (
                      <>
                        <Check className="h-4 w-4" />
                        <span>เพิ่มชุด Bundle ลงตะกร้าแล้ว!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="h-4 w-4" />
                        <span>{promo.ctaLabel}</span>
                      </>
                    )}
                  </button>
                )}

                {promo.actionType === 'view-catalog' && (
                  <button
                    type="button"
                    onClick={() => onBrowseCategory(CategoryId.All)}
                    className="mt-3 inline-flex min-h-[42px] w-full items-center justify-center gap-2 rounded-lg border border-[#D6B45A] bg-[#0B192C] px-4 py-2 text-sm font-semibold text-[#D6B45A] hover:border-[#00E5FF] hover:text-white"
                  >
                    <span>{promo.ctaLabel}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                )}

                {promo.actionType === 'filter-headsets' && (
                  <button
                    type="button"
                    onClick={() => {
                      const el = document.getElementById('wireless-headsets-promo');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="mt-3 inline-flex min-h-[42px] w-full items-center justify-center gap-2 rounded-lg border border-[#D6B45A] bg-[#0B192C] px-4 py-2 text-sm font-semibold text-[#D6B45A] hover:border-[#D946EF] hover:text-white"
                  >
                    <span>{promo.ctaLabel}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Eligible Wireless Headsets for Promo 3 */}
      <section id="wireless-headsets-promo" className="mt-12">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold text-[#D946EF]">
              1 – 15 JAN 2027 · แถมฟรี SteelSeries QcK Mousepad
            </p>
            <h2 className="mt-1 font-display text-xl font-bold text-white sm:text-2xl">
              หูฟังไร้สายที่ร่วมรายการรับฟรีแผ่นรองเมาส์ SteelSeries QcK
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate(PageId.Checkout)}
            className="text-xs font-semibold text-[#D6B45A] hover:text-[#00E5FF]"
          >
            ไปที่หน้าคำสั่งซื้อเพื่อตรวจรับของแถม →
          </button>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {wirelessHeadsets.map((headset) => {
            const isAdded = !!addedHeadsets[headset.id];
            return (
              <div
                key={headset.id}
                className="flex flex-col justify-between overflow-hidden rounded-xl border border-[#D6B45A]/70 bg-[#152A42]"
              >
                <div>
                  <div className="aspect-[4/3] border-b border-[#D6B45A]/30 bg-[#0B192C]">
                    <ProductVisual
                      src={headset.image}
                      alt={headset.name}
                      category={headset.category}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs font-semibold text-[#D6B45A]">{headset.brand}</p>
                    <h3 className="mt-1 text-sm font-semibold text-white">{headset.name}</h3>
                    <p className="mt-2 text-xs text-[#00E5FF]">+ แถมฟรี SteelSeries QcK</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-white/10 bg-[#0B192C]/40 px-4 py-3">
                  <span className="font-mono-num text-base font-bold text-[#D6B45A]">
                    ฿{formatThb(headset.price)}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleAddHeadset(headset)}
                    className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-[#D6B45A] bg-gradient-to-r from-[#2196F3] to-[#D946EF] px-3 py-1.5 text-xs font-semibold text-white hover:brightness-110"
                  >
                    {isAdded ? <Check className="h-3.5 w-3.5" /> : <ShoppingCart className="h-3.5 w-3.5" />}
                    <span>{isAdded ? 'เพิ่มแล้ว' : 'รับสิทธิ์'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Seasonal / Festive Promotional Calendar Banner (9 Key Dates) */}
      <section className="mt-14 rounded-xl border border-[#D6B45A] bg-[#152A42] p-6 sm:p-8">
        <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#D6B45A]">
              <Calendar className="h-4 w-4" />
              <span>SEASONAL PROMOTIONAL CALENDAR · ปฏิทินโปรโมชั่น 9 วันสำคัญ</span>
            </div>
            <h2 className="mt-2 font-display text-2xl font-bold text-white">
              ตารางกิจกรรมและส่วนลดอุปกรณ์คอมพิวเตอร์ตามเทศกาล
            </h2>
          </div>
          <p className="text-xs text-[#CBD5E1]">คลิกเลือกเทศกาลเพื่อดูรายละเอียดดีลประจำวันสำคัญ</p>
        </div>

        {/* 9 Key Dates Grid Selector */}
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-3">
          {FESTIVE_CALENDAR.map((event, idx) => {
            const isSelected = event.id === activeEvent.id;
            return (
              <button
                key={event.id}
                type="button"
                onClick={() => setSelectedEventId(event.id)}
                className={`flex flex-col items-start rounded-lg border p-4 text-left transition-all duration-150 ${
                  isSelected
                    ? 'border-[#00E5FF] bg-[#0B192C] shadow-[0_0_16px_rgba(0,229,255,0.2)]'
                    : 'border-[#D6B45A]/45 bg-[#0B192C]/55 hover:border-[#D6B45A]'
                }`}
              >
                <div className="flex w-full items-center justify-between text-xs">
                  <span className="font-mono-num font-semibold text-[#D6B45A]">
                    0{idx + 1}. {event.dateLabel}
                  </span>
                  <span className="text-[#CBD5E1]">{event.nameEn}</span>
                </div>
                <p className="mt-1.5 font-display text-base font-bold text-white">
                  {event.nameTh}
                </p>
                <p className="mt-1 line-clamp-1 text-xs text-[#00E5FF]">{event.dealTitleTh}</p>
              </button>
            );
          })}
        </div>

        {/* Selected Festive Event Detail Banner */}
        <div className="mt-6 flex flex-col justify-between gap-4 rounded-xl border border-[#D6B45A] bg-[#0B192C] p-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-semibold text-[#D6B45A]">
              {activeEvent.nameTh} ({activeEvent.nameEn}) · {activeEvent.dateLabel}
            </p>
            <h3 className="mt-1 font-display text-xl font-bold text-white">
              {activeEvent.dealTitleTh}
            </h3>
            <p className="mt-1.5 max-w-2xl text-sm text-[#CBD5E1]">{activeEvent.dealDetailTh}</p>
          </div>

          <button
            type="button"
            onClick={() => onBrowseCategory(activeEvent.featuredCategory)}
            className="inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-lg border border-[#D6B45A] bg-gradient-to-r from-[#2196F3] to-[#D946EF] px-5 py-2.5 text-sm font-semibold text-white hover:brightness-110"
          >
            <span>ดูสินค้าในหมวดหมู่นี้</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
