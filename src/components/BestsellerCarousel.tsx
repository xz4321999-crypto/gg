import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Eye, Pause, Play, ShoppingCart } from 'lucide-react';
import { BESTSELLERS, PRODUCTS } from '../data/catalog';
import { Product } from '../types';
import { formatThb } from '../utils/promotions';
import { ProductVisual } from './ProductVisual';

interface BestsellerCarouselProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity?: number) => void;
}

export const BestsellerCarousel: React.FC<BestsellerCarouselProps> = ({
  onSelectProduct,
  onAddToCart,
}) => {
  const slides = BESTSELLERS.map((b) => ({
    bestseller: b,
    product: PRODUCTS.find((p) => p.id === b.productId),
  })).filter(
    (entry): entry is { bestseller: (typeof BESTSELLERS)[number]; product: Product } =>
      Boolean(entry.product)
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
    }, 3500);

    return () => window.clearInterval(timer);
  }, [slides.length, isAutoPlaying, isHovered, activeIndex]);

  if (slides.length === 0) return null;

  const activeSlide = slides[activeIndex];
  const { bestseller, product } = activeSlide;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  const handleSelectSlide = (idx: number) => {
    setDirection(idx >= activeIndex ? 1 : -1);
    setActiveIndex(idx);
  };

  return (
    <div
      className="flex h-full flex-col overflow-hidden rounded-xl border border-[#D6B45A] bg-[#152A42]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-roledescription="carousel"
      aria-label="พรีวิวสินค้าขายดี 5 อันดับยอดนิยม"
    >
      {/* Main Auto-Sliding Viewport */}
      <div className="relative h-72 flex-1 overflow-hidden bg-[#0B192C] sm:h-80 lg:min-h-[340px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={product.id}
            initial={{ opacity: 0, x: direction * 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -24 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-72 w-full sm:h-80 lg:h-[340px]"
          >
            <ProductVisual
              src={product.image}
              alt={product.name}
              category={product.category}
              loading="eager"
              className="h-full w-full object-cover"
            />
            {/* Measured Contrast Scrim */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B192C] via-[#0B192C]/35 to-transparent"
            />
            {/* Slide Overlay Details */}
            <div className="absolute right-0 bottom-0 left-0 z-10 flex flex-col justify-end p-5 sm:p-6">
              <div className="flex items-center gap-2 text-xs font-medium text-[#D6B45A]">
                <span>สินค้าขายดีอันดับ #{bestseller.rank}</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#CBD5E1]">{product.brand}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono-num text-[#00E5FF]">
                  {bestseller.rank}/{slides.length}
                </span>
              </div>

              <div className="mt-1 flex flex-wrap items-end justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <h2 className="truncate font-display text-lg font-bold text-white sm:text-xl">
                    {product.name}
                  </h2>
                  <p className="font-mono-num mt-0.5 text-base font-bold text-[#D6B45A]">
                    ฿{formatThb(product.price)}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onSelectProduct(product)}
                    className="inline-flex min-h-[36px] cursor-pointer items-center gap-1.5 rounded-lg border border-white/25 bg-[#0B192C]/85 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm hover:border-[#D6B45A]"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    <span>ดูสินค้า</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onAddToCart(product, 1)}
                    className="inline-flex min-h-[36px] cursor-pointer items-center gap-1.5 rounded-lg border border-[#D6B45A] bg-gradient-to-r from-[#2196F3] to-[#D946EF] px-3.5 py-1.5 text-xs font-semibold text-white hover:brightness-110"
                  >
                    <ShoppingCart className="h-3.5 w-3.5" />
                    <span>ใส่ตะกร้า</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Auto-play Toggle Top-Right */}
        <button
          type="button"
          onClick={() => setIsAutoPlaying((prev) => !prev)}
          aria-label={isAutoPlaying ? 'หยุดหมุนรูปอัตโนมัติ' : 'เปิดหมุนรูปอัตโนมัติ'}
          className="absolute top-3 right-3 z-20 inline-flex h-8 cursor-pointer items-center gap-1 rounded-lg border border-[#D6B45A]/60 bg-[#0B192C]/85 px-2.5 text-[11px] font-medium text-white backdrop-blur-sm hover:border-[#00E5FF]"
        >
          {isAutoPlaying ? (
            <>
              <Pause className="h-3 w-3 text-[#D6B45A]" />
              <span>Auto</span>
            </>
          ) : (
            <>
              <Play className="h-3 w-3 text-[#00E5FF]" />
              <span>Paused</span>
            </>
          )}
        </button>

        {/* Prev / Next Controls */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="สินค้าขายดีก่อนหน้า"
          className="absolute top-1/2 left-3 z-20 inline-flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg border border-[#D6B45A]/75 bg-[#0B192C]/85 text-white backdrop-blur-sm transition-colors hover:border-[#00E5FF] hover:text-[#00E5FF]"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={handleNext}
          aria-label="สินค้าขายดีถัดไป"
          className="absolute top-1/2 right-3 z-20 inline-flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg border border-[#D6B45A]/75 bg-[#0B192C]/85 text-white backdrop-blur-sm transition-colors hover:border-[#00E5FF] hover:text-[#00E5FF]"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* 5-Thumbnail Selector Strip for the 5 Bestsellers */}
      <div className="grid grid-cols-5 gap-2 border-t border-[#D6B45A]/40 bg-[#0B192C] p-2.5">
        {slides.map(({ bestseller: b, product: p }, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => handleSelectSlide(idx)}
              aria-label={`ดูพรีวิวอันดับ ${b.rank}: ${p.name}`}
              aria-current={isActive ? 'true' : undefined}
              className={`group relative cursor-pointer overflow-hidden rounded-md border text-left transition-all ${
                isActive
                  ? 'border-[#D6B45A] ring-1 ring-[#00E5FF]'
                  : 'border-white/15 opacity-70 hover:border-[#D6B45A]/60 hover:opacity-100'
              }`}
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-[#152A42]">
                <ProductVisual
                  src={p.image}
                  alt={p.name}
                  category={p.category}
                  loading="eager"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="truncate bg-[#152A42] px-1.5 py-1 text-[10px] font-semibold text-white">
                <span className="font-mono-num text-[#D6B45A]">#{b.rank}</span> {p.brand}
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
