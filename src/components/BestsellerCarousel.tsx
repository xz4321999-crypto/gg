import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Eye, ShoppingCart } from 'lucide-react';
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
  })).filter((entry): entry is { bestseller: (typeof BESTSELLERS)[number]; product: Product } =>
    Boolean(entry.product)
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (slides.length <= 1 || isPaused) return;
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 3500);

    return () => window.clearInterval(timer);
  }, [slides.length, isPaused]);

  if (slides.length === 0) return null;

  const activeSlide = slides[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <div
      className="flex h-full flex-col overflow-hidden rounded-xl border border-[#D6B45A] bg-[#152A42]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      aria-roledescription="carousel"
      aria-label="พรีวิวสินค้าขายดี 5 อันดับยอดนิยม"
    >
      {/* Main Auto-Sliding Viewport */}
      <div className="relative min-h-[288px] flex-1 overflow-hidden bg-[#0B192C] sm:min-h-[320px]">
        <div
          className="flex h-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {slides.map(({ bestseller, product }) => (
            <div
              key={product.id}
              className="relative h-72 w-full shrink-0 sm:h-80 lg:h-full"
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
                className="absolute inset-0 bg-gradient-to-t from-[#0B192C] via-[#0B192C]/35 to-transparent"
              />
              {/* Slide Overlay Details */}
              <div className="absolute right-0 bottom-0 left-0 flex flex-col justify-end p-5 sm:p-6">
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
                      className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-white/25 bg-[#0B192C]/85 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm hover:border-[#D6B45A]"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>ดูสินค้า</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onAddToCart(product, 1)}
                      className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-[#D6B45A] bg-gradient-to-r from-[#2196F3] to-[#D946EF] px-3.5 py-1.5 text-xs font-semibold text-white hover:brightness-110"
                    >
                      <ShoppingCart className="h-3.5 w-3.5" />
                      <span>ใส่ตะกร้า</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Prev / Next Controls */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="สินค้าขายดีก่อนหน้า"
          className="absolute top-1/2 left-3 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg border border-[#D6B45A]/60 bg-[#0B192C]/80 text-white backdrop-blur-sm transition-colors hover:border-[#00E5FF] hover:text-[#00E5FF]"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={handleNext}
          aria-label="สินค้าขายดีถัดไป"
          className="absolute top-1/2 right-3 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg border border-[#D6B45A]/60 bg-[#0B192C]/80 text-white backdrop-blur-sm transition-colors hover:border-[#00E5FF] hover:text-[#00E5FF]"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* 5-Thumbnail Selector Strip for the 5 Bestsellers */}
      <div className="grid grid-cols-5 gap-2 border-t border-[#D6B45A]/40 bg-[#0B192C] p-2.5">
        {slides.map(({ bestseller, product }, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={product.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              aria-label={`ดูพรีวิวอันดับ ${bestseller.rank}: ${product.name}`}
              aria-current={isActive ? 'true' : undefined}
              className={`group relative overflow-hidden rounded-md border text-left transition-all ${
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
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="truncate bg-[#152A42] px-1.5 py-1 text-[10px] font-semibold text-white">
                <span className="font-mono-num text-[#D6B45A]">#{bestseller.rank}</span>{' '}
                {product.brand}
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

      {/* Hidden live announcement label for screen readers */}
      <span className="sr-only">
        กำลังแสดงสินค้าขายดีอันดับ {activeSlide.bestseller.rank}: {activeSlide.product.name}
      </span>
    </div>
  );
};
