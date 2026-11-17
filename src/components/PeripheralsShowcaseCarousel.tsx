import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Eye, Pause, Play, ShoppingCart } from 'lucide-react';
import { PRODUCTS } from '../data/catalog';
import { CategoryId, Product } from '../types';
import { formatThb } from '../utils/promotions';
import { ProductVisual } from './ProductVisual';

interface PeripheralsShowcaseCarouselProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  onBrowseCategory: (category: CategoryId) => void;
}

const SHOWCASE_PRODUCT_IDS = [
  'logitech-g-pro-x-superlight-2',
  'razer-deathadder-v3-pro',
  'logitech-mx-master-3s',
  'keychron-k2-max',
  'asus-rog-strix-scope-ii-96',
  'ducky-one-3-sf-daybreak',
  'hyperx-cloud-iii-wired',
  'hyperx-quadcast-s',
  'benq-screenbar-halo-2',
  'ergotron-lx-monitor-arm',
];

export const PeripheralsShowcaseCarousel: React.FC<PeripheralsShowcaseCarouselProps> = ({
  onSelectProduct,
  onAddToCart,
  onBrowseCategory,
}) => {
  const slides = useMemo(
    () =>
      SHOWCASE_PRODUCT_IDS.map((id) => PRODUCTS.find((p) => p.id === id)).filter(
        (p): p is Product => Boolean(p)
      ),
    []
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (slides.length <= 1 || !isAutoPlaying || isHovered) return;

    const timer = window.setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 3200);

    return () => window.clearInterval(timer);
  }, [slides.length, isAutoPlaying, isHovered, activeIndex]);

  if (slides.length === 0) return null;

  const activeProduct = slides[activeIndex];

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  const handleSelectSlide = (idx: number) => {
    setDirection(idx >= activeIndex ? 1 : -1);
    setActiveIndex(idx);
  };

  return (
    <div
      className="mt-6 overflow-hidden rounded-xl border border-[#D6B45A] bg-[#152A42]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-roledescription="carousel"
      aria-label="ตัวอย่างอุปกรณ์ต่อพ่วงหมุนอัตโนมัติ 10 รุ่น"
    >
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#D6B45A]/35 bg-[#0B192C]/85 px-5 py-3">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-semibold text-[#D6B45A]">
            AUTO PREVIEW · ตัวอย่างอุปกรณ์ต่อพ่วง 10 รุ่นจากทั้ง 4 หมวด
          </span>
          <span aria-hidden="true" className="text-white/30">
            ·
          </span>
          <span className="font-mono-num font-bold text-[#00E5FF]">
            {activeIndex + 1} / {slides.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsAutoPlaying((prev) => !prev)}
            aria-label={isAutoPlaying ? 'หยุดหมุนรูปอัตโนมัติ' : 'เปิดหมุนรูปอัตโนมัติ'}
            className="inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-md border border-[#D6B45A]/60 bg-[#152A42] px-3 text-xs font-medium text-white hover:border-[#00E5FF]"
          >
            {isAutoPlaying ? (
              <>
                <Pause className="h-3.5 w-3.5 text-[#D6B45A]" />
                <span>Auto</span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 text-[#00E5FF]" />
                <span>Paused</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handlePrev}
            aria-label="ตัวอย่างสินค้าก่อนหน้า"
            className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-[#D6B45A]/60 bg-[#152A42] text-white hover:border-[#00E5FF] hover:text-[#00E5FF]"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="ตัวอย่างสินค้าถัดไป"
            className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-[#D6B45A]/60 bg-[#152A42] text-white hover:border-[#00E5FF] hover:text-[#00E5FF]"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main Spotlight Slide */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeProduct.id}
          initial={{ opacity: 0, x: direction * 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -24 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 items-stretch lg:grid-cols-12"
        >
          {/* Image Column */}
          <div className="relative h-64 overflow-hidden border-b border-[#D6B45A]/30 bg-[#0B192C] sm:h-72 lg:col-span-6 lg:h-80 lg:border-r lg:border-b-0">
            <ProductVisual
              src={activeProduct.image}
              alt={activeProduct.name}
              category={activeProduct.category}
              loading="eager"
              className="h-full w-full object-cover"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B192C]/80 via-transparent to-transparent"
            />
            <div className="absolute right-4 bottom-3 left-4 flex items-center justify-between text-xs">
              <span className="font-semibold text-[#D6B45A]">
                ตัวอย่างที่ {activeIndex + 1} · {activeProduct.categoryLabelTh}
              </span>
              <span className="font-medium text-[#00E5FF]">{activeProduct.brand}</span>
            </div>
          </div>

          {/* Info Column */}
          <div className="flex flex-col justify-between p-6 sm:p-7 lg:col-span-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#CBD5E1]">
                <span className="font-semibold text-[#D6B45A]">{activeProduct.brand}</span>
                <span aria-hidden="true">·</span>
                <button
                  type="button"
                  onClick={() => onBrowseCategory(activeProduct.category)}
                  className="text-[#00E5FF] hover:underline"
                >
                  {activeProduct.categoryLabelTh}
                </button>
                <span aria-hidden="true">·</span>
                <span>{activeProduct.warranty}</span>
              </div>

              <h3 className="mt-2 font-display text-xl font-bold text-white sm:text-2xl">
                {activeProduct.name}
              </h3>

              <p className="mt-2.5 text-sm leading-relaxed text-[#CBD5E1]">
                {activeProduct.descriptionTh}
              </p>

              <ul className="mt-4 grid grid-cols-1 gap-1.5 text-xs text-[#CBD5E1] sm:grid-cols-2">
                {activeProduct.specs.slice(0, 4).map((spec) => (
                  <li key={spec} className="flex items-center gap-2 truncate">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#00E5FF]" />
                    <span className="truncate">{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4">
              <div>
                <p className="text-[11px] text-[#CBD5E1]">ราคาจำหน่ายหน้าร้านและออนไลน์</p>
                <p className="font-mono-num text-2xl font-bold text-[#D6B45A]">
                  ฿{formatThb(activeProduct.price)}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => onSelectProduct(activeProduct)}
                  className="inline-flex min-h-[40px] cursor-pointer items-center gap-1.5 rounded-lg border border-white/25 bg-[#0B192C] px-4 py-2 text-xs font-semibold text-white hover:border-[#D6B45A]"
                >
                  <Eye className="h-4 w-4 text-[#00E5FF]" />
                  <span>ดูรายละเอียด</span>
                </button>
                <button
                  type="button"
                  onClick={() => onAddToCart(activeProduct, 1)}
                  className="inline-flex min-h-[40px] cursor-pointer items-center gap-1.5 rounded-lg border border-[#D6B45A] bg-gradient-to-r from-[#2196F3] to-[#D946EF] px-4 py-2 text-xs font-semibold text-white hover:brightness-110"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>ใส่ตะกร้า</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 10-Item Thumbnail Selector Strip */}
      <div className="grid grid-cols-2 gap-2 border-t border-[#D6B45A]/35 bg-[#0B192C] p-3 sm:grid-cols-5 lg:grid-cols-10">
        {slides.map((product, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={product.id}
              type="button"
              onClick={() => handleSelectSlide(idx)}
              aria-label={`ดูตัวอย่างสินค้า ${idx + 1}: ${product.name}`}
              aria-current={isActive ? 'true' : undefined}
              className={`group relative cursor-pointer overflow-hidden rounded-md border text-left transition-all ${
                isActive
                  ? 'border-[#D6B45A] ring-1 ring-[#00E5FF]'
                  : 'border-white/15 opacity-70 hover:border-[#D6B45A]/60 hover:opacity-100'
              }`}
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-[#152A42]">
                <ProductVisual
                  src={product.image}
                  alt={product.name}
                  category={product.category}
                  loading="eager"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="truncate bg-[#152A42] px-1.5 py-1 text-[10px] font-semibold text-white">
                <span className="font-mono-num text-[#D6B45A]">{idx + 1}.</span> {product.brand}
              </div>
              {isActive && (
                <span
                  aria-hidden="true"
                  className="absolute right-0 bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#D6B45A] via-[#00E5FF] to-[#D946EF]"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
