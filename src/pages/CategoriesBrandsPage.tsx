import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Eye,
  Headphones,
  Images,
  Keyboard,
  MonitorCog,
  Mouse,
  ShoppingCart,
  X,
} from 'lucide-react';
import {
  BrandGalleryPhoto,
  getBrandGalleryPhotos,
  getBrandsForCategory,
} from '../data/brandGalleries';
import { PRODUCTS } from '../data/catalog';
import { CategoryId, PageId, Product } from '../types';
import { formatThb } from '../utils/promotions';
import { ProductVisual } from '../components/ProductVisual';

interface CategoriesBrandsPageProps {
  initialCategory?: Exclude<CategoryId, CategoryId.All>;
  onAddToCart: (product: Product, quantity?: number) => void;
  onSelectProduct: (product: Product) => void;
  onNavigate: (page: PageId) => void;
}

const CATEGORY_MODES: {
  id: Exclude<CategoryId, CategoryId.All>;
  labelTh: string;
  labelEn: string;
  descriptionTh: string;
  icon: typeof Mouse;
}[] = [
  {
    id: CategoryId.MiceAndPads,
    labelTh: 'โหมดเมาส์และแผ่นรองเมาส์',
    labelEn: 'Gaming Mice & Mousepads',
    descriptionTh: 'รวมยี่ห้อเมาส์เกมมิ่งไร้สาย เมาส์ทำงาน และแผ่นรองเมาส์ระดับโปร',
    icon: Mouse,
  },
  {
    id: CategoryId.KeyboardsAndCaps,
    labelTh: 'โหมดคีย์บอร์ดและปุ่มกด',
    labelEn: 'Mechanical Keyboards & Keycaps',
    descriptionTh: 'รวมยี่ห้อคีย์บอร์ดเมคานิคอล คีย์บอร์ดไร้สาย และชุดคีย์แคป PBT',
    icon: Keyboard,
  },
  {
    id: CategoryId.AudioAndMics,
    labelTh: 'โหมดหูฟัง ลำโพง และไมโครโฟน',
    labelEn: 'Headsets, Speakers & Microphones',
    descriptionTh: 'รวมยี่ห้อหูฟังเกมมิ่ง ลำโพงตั้งโต๊ะ ซาวด์บาร์ และไมโครโฟนสตูดิโอ',
    icon: Headphones,
  },
  {
    id: CategoryId.DeskAndCables,
    labelTh: 'โหมดอุปกรณ์จัดโต๊ะคอมและสายเชื่อมต่อ',
    labelEn: 'Desk Setup, Hubs & Cables',
    descriptionTh: 'รวมยี่ห้อโคมไฟติดจอ ขาจับจอ USB-C Hub แท่นวางและสายเชื่อมต่อ',
    icon: MonitorCog,
  },
];

export const CategoriesBrandsPage: React.FC<CategoriesBrandsPageProps> = ({
  initialCategory = CategoryId.MiceAndPads,
  onAddToCart,
  onSelectProduct,
  onNavigate,
}) => {
  const [activeCategory, setActiveCategory] =
    useState<Exclude<CategoryId, CategoryId.All>>(initialCategory);

  const brands = useMemo(() => getBrandsForCategory(activeCategory), [activeCategory]);

  const [selectedBrand, setSelectedBrand] = useState<string>(
    () => getBrandsForCategory(initialCategory)[0]?.brand ?? ''
  );
  const [addedMap, setAddedMap] = useState<Record<string, boolean>>({});
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    setActiveCategory(initialCategory);
    const firstBrand = getBrandsForCategory(initialCategory)[0]?.brand ?? '';
    setSelectedBrand(firstBrand);
    setLightboxIndex(null);
  }, [initialCategory]);

  const handleSelectCategoryMode = (cat: Exclude<CategoryId, CategoryId.All>) => {
    setActiveCategory(cat);
    const nextBrands = getBrandsForCategory(cat);
    setSelectedBrand(nextBrands[0]?.brand ?? '');
    setLightboxIndex(null);
  };

  const brandPhotos = useMemo<BrandGalleryPhoto[]>(() => {
    if (!selectedBrand) return [];
    return getBrandGalleryPhotos(selectedBrand, activeCategory);
  }, [selectedBrand, activeCategory]);

  const brandProducts = useMemo(
    () =>
      PRODUCTS.filter(
        (p) => p.category === activeCategory && (!selectedBrand || p.brand === selectedBrand)
      ),
    [activeCategory, selectedBrand]
  );

  const activeCategoryMeta =
    CATEGORY_MODES.find((c) => c.id === activeCategory) ?? CATEGORY_MODES[0];

  const handleQuickAdd = (product: Product) => {
    onAddToCart(product, 1);
    setAddedMap((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedMap((prev) => ({ ...prev, [product.id]: false }));
    }, 1000);
  };

  const activeLightboxPhoto =
    lightboxIndex !== null ? brandPhotos[lightboxIndex] ?? null : null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
      {/* Page Header */}
      <div className="rounded-xl border border-[#D6B45A] bg-[#152A42] p-6 sm:p-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-semibold tracking-wider text-[#D6B45A]">
              CATEGORY &amp; BRAND EXPLORER · แยกประเภทสินค้าและยี่ห้อ
            </p>
            <h1 className="mt-1.5 font-display text-2xl font-bold text-white sm:text-3xl">
              เลือกหมวดหมู่อุปกรณ์และดูสินค้าแยกตามยี่ห้อ
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-[#CBD5E1]">
              กระจายสินค้าทั้งหมดในร้านครบทั้ง {PRODUCTS.length} รุ่นลงใน 4 โหมดอุปกรณ์อย่างครบถ้วน
              ทุกยี่ห้อในแต่ละโหมดมีสินค้าครบ 10 รุ่นแท้ กดเลือกโหมดและยี่ห้อด้านล่างได้ทันที
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate(PageId.Catalog)}
            className="inline-flex min-h-[42px] shrink-0 cursor-pointer items-center gap-2 rounded-lg border border-[#D6B45A] bg-[#0B192C] px-5 py-2 text-xs font-semibold text-[#D6B45A] hover:border-[#00E5FF] hover:text-white"
          >
            <span>ไปหน้าสินค้าทั้งหมด ({PRODUCTS.length} รุ่น)</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Step 1: 4 Category Mode Buttons */}
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORY_MODES.map((mode) => {
            const Icon = mode.icon;
            const isSelected = activeCategory === mode.id;
            const modeBrands = getBrandsForCategory(mode.id);
            const brandCount = modeBrands.length;
            const modeProductCount = modeBrands.reduce((sum, b) => sum + b.productCount, 0);
            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => handleSelectCategoryMode(mode.id)}
                className={`flex cursor-pointer flex-col justify-between rounded-xl border p-4 text-left transition-all ${
                  isSelected
                    ? 'border-[#D6B45A] bg-gradient-to-br from-[#2196F3]/25 to-[#D946EF]/25 shadow-[0_0_20px_rgba(214,180,90,0.25)]'
                    : 'border-[#D6B45A]/45 bg-[#0B192C] hover:border-[#00E5FF]'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg border ${
                      isSelected
                        ? 'border-[#D6B45A] bg-[#152A42] text-[#D6B45A]'
                        : 'border-white/15 bg-[#152A42] text-[#00E5FF]'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="text-right">
                    <p className="font-mono-num text-xs font-semibold text-[#00E5FF]">
                      {brandCount} ยี่ห้อ · {modeProductCount} รุ่น
                    </p>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="font-display text-sm font-bold text-white">{mode.labelTh}</p>
                  <p className="mt-0.5 text-[11px] text-[#CBD5E1]">{mode.descriptionTh}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: Brand List Buttons Shown Below Selected Category Mode */}
      <section className="mt-6 rounded-xl border border-[#D6B45A]/75 bg-[#152A42] p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Images className="h-5 w-5 text-[#00E5FF]" />
            <div>
              <h2 className="font-display text-lg font-bold text-white">
                รายชื่อยี่ห้อใน{activeCategoryMeta.labelTh}
              </h2>
              <p className="text-xs text-[#CBD5E1]">
                กดปุ่มยี่ห้อด้านล่างเพื่อเปิดดูรูปตัวอย่างสินค้าของยี่ห้อนั้น
              </p>
            </div>
          </div>
          <span className="font-mono-num text-xs font-semibold text-[#D6B45A]">
            {brands.length} ยี่ห้อในหมวดนี้ · ยี่ห้อละ 10 รุ่น (รวม{' '}
            {brands.reduce((sum, b) => sum + b.productCount, 0)} รุ่น)
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2.5">
          {brands.map((b) => {
            const isBrandActive = selectedBrand === b.brand;
            return (
              <button
                key={b.brand}
                type="button"
                onClick={() => {
                  setSelectedBrand(b.brand);
                  setLightboxIndex(null);
                }}
                className={`inline-flex min-h-[42px] cursor-pointer items-center justify-center rounded-lg border px-4 py-2 text-xs font-semibold transition-all sm:text-sm ${
                  isBrandActive
                    ? 'border-[#D6B45A] bg-gradient-to-r from-[#2196F3] to-[#D946EF] text-white shadow-[0_0_16px_rgba(217,70,239,0.3)]'
                    : 'border-[#D6B45A]/55 bg-[#0B192C] text-white hover:border-[#00E5FF] hover:text-[#00E5FF]'
                }`}
              >
                <span>{b.brand}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Step 3: Exact Brand & Category Products Showcase */}
      {selectedBrand && (
        <section className="mt-6 rounded-xl border border-[#D6B45A] bg-[#152A42] p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <p className="text-xs font-semibold tracking-wider text-[#00E5FF]">
                {activeCategoryMeta.labelEn.toUpperCase()} · {selectedBrand.toUpperCase()}
              </p>
              <h2 className="mt-1 font-display text-xl font-bold text-white sm:text-2xl">
                สินค้ายี่ห้อ {selectedBrand} ใน{activeCategoryMeta.labelTh}{' '}
                <span className="font-mono-num text-base font-normal text-[#D6B45A]">
                  ({brandProducts.length} รุ่น)
                </span>
              </h2>
            </div>
            <p className="text-xs text-[#CBD5E1]">
              กดที่รูปสินค้าเพื่อขยายดูภาพขนาดใหญ่ หรือดูสเปกและสั่งซื้อได้ทันที
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {brandProducts.map((product, idx) => {
              const isAdded = !!addedMap[product.id];
              return (
                <article
                  key={product.id}
                  className="group flex flex-col justify-between overflow-hidden rounded-xl border border-[#D6B45A]/80 bg-[#0B192C] transition-all duration-150 hover:-translate-y-0.5 hover:border-[#00E5FF]"
                >
                  <div>
                    <button
                      type="button"
                      onClick={() => setLightboxIndex(idx)}
                      className="relative block w-full cursor-pointer overflow-hidden border-b border-[#D6B45A]/35 bg-[#081220] text-left"
                    >
                      <div className="aspect-[4/3] w-full overflow-hidden">
                        <ProductVisual
                          src={product.image}
                          alt={product.name}
                          category={product.category}
                          className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
                        />
                      </div>
                      <span className="font-mono-num absolute top-2.5 left-2.5 rounded bg-[#0B192C]/85 px-2 py-0.5 text-[10px] font-bold text-[#D6B45A]">
                        #{String(idx + 1).padStart(2, '0')}
                      </span>
                    </button>

                    <div className="p-5">
                      <div className="flex items-center gap-1.5 text-xs text-[#CBD5E1]">
                        <span className="font-semibold text-[#D6B45A]">{product.brand}</span>
                        <span aria-hidden="true">·</span>
                        <span className="truncate">{product.categoryLabelTh}</span>
                      </div>
                      <h4 className="mt-1.5 font-display text-base font-semibold text-white">
                        {product.name}
                      </h4>
                      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[#CBD5E1]">
                        {product.descriptionTh}
                      </p>
                      <ul className="mt-3 space-y-1 text-xs text-[#CBD5E1]">
                        {product.specs.slice(0, 2).map((spec) => (
                          <li key={spec} className="flex items-center gap-2 truncate">
                            <span className="h-1 w-1 shrink-0 rounded-full bg-[#00E5FF]" />
                            <span className="truncate">{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 border-t border-white/10 bg-[#152A42]/65 px-5 py-3.5">
                    <span className="font-mono-num text-lg font-bold text-[#D6B45A]">
                      ฿{formatThb(product.price)}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onSelectProduct(product)}
                        aria-label={`ดูรายละเอียด ${product.name}`}
                        className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-white/20 bg-[#0B192C] text-[#CBD5E1] hover:border-[#D6B45A] hover:text-white"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleQuickAdd(product)}
                        className="inline-flex min-h-[36px] cursor-pointer items-center gap-1.5 rounded-lg border border-[#D6B45A] bg-gradient-to-r from-[#2196F3] to-[#D946EF] px-3.5 py-1.5 text-xs font-semibold text-white hover:brightness-110"
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
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* Lightbox Preview */}
      {activeLightboxPhoto && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#060E1A]/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="w-full max-w-3xl overflow-hidden rounded-xl border border-[#D6B45A] bg-[#152A42] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 bg-[#0B192C] px-5 py-3.5">
              <div>
                <p className="text-xs font-semibold text-[#D6B45A]">
                  {selectedBrand} · รูปที่ {activeLightboxPhoto.index} / {brandPhotos.length}
                </p>
                <p className="text-sm font-bold text-white">{activeLightboxPhoto.angleLabel}</p>
              </div>
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                aria-label="ปิดภาพตัวอย่าง"
                className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-white/15 bg-[#152A42] text-white hover:border-[#D6B45A]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="relative aspect-[16/10] w-full bg-[#0B192C]">
              <ProductVisual
                key={activeLightboxPhoto.image}
                src={activeLightboxPhoto.image}
                alt={activeLightboxPhoto.titleTh}
                category={activeLightboxPhoto.product.category}
                loading="eager"
                className="h-full w-full object-contain"
              />
              {brandPhotos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxIndex((lightboxIndex - 1 + brandPhotos.length) % brandPhotos.length)
                    }
                    aria-label="รูปก่อนหน้า"
                    className="absolute top-1/2 left-3 inline-flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg border border-[#D6B45A] bg-[#0B192C]/85 text-white hover:border-[#00E5FF]"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setLightboxIndex((lightboxIndex + 1) % brandPhotos.length)}
                    aria-label="รูปถัดไป"
                    className="absolute top-1/2 right-3 inline-flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg border border-[#D6B45A] bg-[#0B192C]/85 text-white hover:border-[#00E5FF]"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 p-5">
              <div>
                <p className="font-display text-base font-bold text-white">
                  {activeLightboxPhoto.product.name}
                </p>
                <p className="font-mono-num text-lg font-bold text-[#D6B45A]">
                  ฿{formatThb(activeLightboxPhoto.product.price)}
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    const prod = activeLightboxPhoto.product;
                    setLightboxIndex(null);
                    onSelectProduct(prod);
                  }}
                  className="inline-flex min-h-[40px] cursor-pointer items-center gap-1.5 rounded-lg border border-[#D6B45A] bg-[#0B192C] px-4 py-2 text-xs font-semibold text-[#D6B45A] hover:border-[#00E5FF] hover:text-white"
                >
                  <Eye className="h-4 w-4" />
                  <span>ดูสเปกสินค้านี้</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickAdd(activeLightboxPhoto.product)}
                  className="inline-flex min-h-[40px] cursor-pointer items-center gap-1.5 rounded-lg border border-[#D6B45A] bg-gradient-to-r from-[#2196F3] to-[#D946EF] px-4 py-2 text-xs font-semibold text-white hover:brightness-110"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>ใส่ตะกร้า</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
