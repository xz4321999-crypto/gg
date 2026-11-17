import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Eye,
  Package,
  Pause,
  Play,
  ShoppingCart,
  Star,
} from 'lucide-react';
import { BESTSELLERS, PRODUCTS } from '../data/catalog';
import { Product } from '../types';
import { formatThb } from '../utils/promotions';
import { ProductVisual } from './ProductVisual';

interface BestsellersSectionProps {
  addedMap: Record<string, boolean>;
  onQuickAdd: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const BestsellersSection: React.FC<BestsellersSectionProps> = ({
  addedMap,
  onQuickAdd,
  onSelectProduct,
}) => {
  const entries = BESTSELLERS.map((bestseller) => ({
    bestseller,
    product: PRODUCTS.find((p) => p.id === bestseller.productId),
  })).filter(
    (item): item is { bestseller: (typeof BESTSELLERS)[number]; product: Product } =>
      Boolean(item.product)
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isAutoPlaying || isHovered || entries.length <= 1) return;

    const timer = window.setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % entries.length);
    }, 4000);

    return () => window.clearInterval(timer);
  }, [isAutoPlaying, isHovered, entries.length, activeIndex]);

  if (entries.length === 0) return null;

  const activeEntry = entries[activeIndex];
  const { bestseller, product } = activeEntry;
  const isAdded = !!addedMap[product.id];

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + entries.length) % entries.length);
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % entries.length);
  };

  const handleSelectTab = (idx: number) => {
    setDirection(idx >= activeIndex ? 1 : -1);
    setActiveIndex(idx);
  };

  return (
    <section
      className="border-b border-[#D6B45A]/30 bg-[#0B192C] py-12"
      aria-label="สินค้าขายดี 5 อันดับยอดนิยม"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header & Carousel Controls */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold tracking-wider text-[#D6B45A]">
              FEATURED BESTSELLERS · สินค้าขายดีประจำร้าน
            </p>
            <h2 className="mt-1.5 font-display text-2xl font-bold text-white sm:text-3xl">
              สินค้าขายดี 5 อันดับยอดนิยม
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono-num mr-1 text-xs font-semibold text-[#00E5FF]">
              อันดับ {activeIndex + 1} / {entries.length}
            </span>
            <button
              type="button"
              onClick={() => setIsAutoPlaying((prev) => !prev)}
              aria-label={isAutoPlaying ? 'หยุดเลื่อนอัตโนมัติ' : 'เปิดเลื่อนอัตโนมัติ'}
              className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-lg border border-[#D6B45A]/60 bg-[#152A42] px-3 text-xs font-medium text-[#CBD5E1] transition-colors hover:border-[#00E5FF] hover:text-white"
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
              aria-label="ดูสินค้าขายดีอันดับก่อนหน้า"
              className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-[#D6B45A]/60 bg-[#152A42] text-white transition-colors hover:border-[#00E5FF] hover:text-[#00E5FF]"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="ดูสินค้าขายดีอันดับถัดไป"
              className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-[#D6B45A]/60 bg-[#152A42] text-white transition-colors hover:border-[#00E5FF] hover:text-[#00E5FF]"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* 5 Bestseller Quick-Selector Tabs */}
        <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-5">
          {entries.map(({ bestseller: itemBestseller, product: itemProduct }, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={itemProduct.id}
                type="button"
                onClick={() => handleSelectTab(idx)}
                aria-current={isActive ? 'true' : undefined}
                className={`flex cursor-pointer items-center gap-2.5 rounded-lg border p-2 text-left transition-all duration-150 ${
                  isActive
                    ? 'border-[#D6B45A] bg-[#152A42] shadow-[0_0_14px_rgba(214,180,90,0.22)]'
                    : 'border-white/15 bg-[#152A42]/45 opacity-75 hover:border-[#D6B45A]/60 hover:opacity-100'
                }`}
              >
                <div className="h-11 w-14 shrink-0 overflow-hidden rounded border border-white/10 bg-[#0B192C]">
                  <ProductVisual
                    src={itemProduct.image}
                    alt={itemProduct.name}
                    category={itemProduct.category}
                    loading="eager"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="font-mono-num text-[11px] font-bold text-[#D6B45A]">
                    อันดับ #{itemBestseller.rank}
                  </p>
                  <p className="truncate text-xs font-semibold text-white">{itemProduct.name}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Auto-Sliding 5-Product Showcase (3 Content Blocks per Item) */}
        <div
          className="mt-5 overflow-hidden rounded-xl border border-[#D6B45A] bg-[#152A42]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.article
              key={product.id}
              initial={{ opacity: 0, x: direction * 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -24 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="w-full p-5 sm:p-7"
            >
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                {/* Content Block 1: Prominent Product Visual with On-Image Rotate Buttons, Rank, Price & Actions */}
                <div className="flex flex-col justify-between gap-4 lg:col-span-4 lg:border-r lg:border-white/10 lg:pr-6">
                  <div>
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-[#D6B45A]/60 bg-[#0B192C]">
                      <ProductVisual
                        src={product.image}
                        alt={product.name}
                        category={product.category}
                        loading="eager"
                        className="h-full w-full object-cover"
                      />

                      {/* Direct Left/Right Rotate Buttons on Image */}
                      <button
                        type="button"
                        onClick={handlePrev}
                        aria-label="เลื่อนรูปสินค้าก่อนหน้า"
                        className="absolute top-1/2 left-2.5 z-20 inline-flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg border border-[#D6B45A]/80 bg-[#0B192C]/85 text-white backdrop-blur-sm transition-colors hover:border-[#00E5FF] hover:text-[#00E5FF]"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={handleNext}
                        aria-label="เลื่อนรูปสินค้าถัดไป"
                        className="absolute top-1/2 right-2.5 z-20 inline-flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg border border-[#D6B45A]/80 bg-[#0B192C]/85 text-white backdrop-blur-sm transition-colors hover:border-[#00E5FF] hover:text-[#00E5FF]"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mt-4">
                      <div className="flex items-center gap-2 text-xs text-[#D6B45A]">
                        <Star className="h-3.5 w-3.5 fill-[#D6B45A]" />
                        <span className="font-mono-num font-bold">
                          อันดับ #{bestseller.rank}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="text-[#CBD5E1]">{product.brand}</span>
                      </div>
                      <h3 className="mt-1 font-display text-lg font-bold leading-snug text-white">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-xs font-medium text-[#00E5FF]">
                        {bestseller.taglineTh}
                      </p>
                    </div>

                    <p className="mt-2.5 text-xs leading-relaxed text-[#CBD5E1]">
                      {bestseller.block1Highlight}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-3.5">
                    <span className="font-mono-num text-2xl font-bold text-[#D6B45A]">
                      ฿{formatThb(product.price)}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onSelectProduct(product)}
                        className="inline-flex min-h-[38px] cursor-pointer items-center gap-1.5 rounded-lg border border-white/20 bg-[#0B192C] px-3 py-1.5 text-xs font-medium text-[#CBD5E1] hover:border-[#D6B45A] hover:text-white"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        <span>ดูสเปก</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onQuickAdd(product)}
                        className="inline-flex min-h-[38px] cursor-pointer items-center gap-1.5 rounded-lg border border-[#D6B45A] bg-gradient-to-r from-[#2196F3] to-[#D946EF] px-4 py-1.5 text-xs font-semibold text-white hover:brightness-110"
                      >
                        {isAdded ? (
                          <>
                            <Check className="h-3.5 w-3.5" />
                            <span>เพิ่มแล้ว</span>
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="h-3.5 w-3.5" />
                            <span>ใส่ตะกร้า</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Content Block 2: Core Technical Specifications */}
                <div className="flex flex-col justify-between lg:col-span-4 lg:border-r lg:border-white/10 lg:pr-6">
                  <div>
                    <p className="text-xs font-semibold text-[#D6B45A]">
                      02. สเปกเทคนิคสำคัญ (Core Specifications)
                    </p>
                    <dl className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
                      {bestseller.block2Specs.map((spec) => (
                        <div
                          key={spec.label}
                          className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-[#0B192C]/75 px-3.5 py-3"
                        >
                          <dt className="text-xs text-[#CBD5E1]">{spec.label}</dt>
                          <dd className="font-mono-num text-right text-xs font-semibold text-white">
                            {spec.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                  <div className="mt-4 rounded-lg border border-white/10 bg-[#0B192C]/50 px-3.5 py-2.5 text-xs text-[#CBD5E1]">
                    การเชื่อมต่อ:{' '}
                    <span className="font-medium text-white">{product.connectivity}</span>
                  </div>
                </div>

                {/* Content Block 3: Real-World Use Case & Box Contents */}
                <div className="flex flex-col justify-between lg:col-span-4">
                  <div>
                    <p className="text-xs font-semibold text-[#D6B45A]">
                      03. การใช้งานจริงและอุปกรณ์ในกล่อง
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-white">
                      {bestseller.block3UseCase}
                    </p>
                    <div className="mt-4 flex items-start gap-2.5 rounded-lg border border-white/10 bg-[#0B192C]/65 px-3.5 py-3 text-xs leading-relaxed text-[#CBD5E1]">
                      <Package className="mt-0.5 h-4 w-4 shrink-0 text-[#00E5FF]" />
                      <span>{bestseller.block3BoxIncluded}</span>
                    </div>
                  </div>
                  <div className="mt-4 border-t border-white/10 pt-3 text-xs font-medium text-[#D6B45A]">
                    {product.warranty} · พร้อมจัดส่งทั่วไทยหรือรับฟรีที่โรงเรียน
                  </div>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
