import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  Check,
  Eye,
  Search,
  ShoppingCart,
  SlidersHorizontal,
} from 'lucide-react';
import { CATEGORIES, PRODUCTS } from '../data/catalog';
import { CategoryId, PageId, Product } from '../types';
import { formatThb } from '../utils/promotions';
import { BestsellerCarousel } from '../components/BestsellerCarousel';
import { BestsellersSection } from '../components/BestsellersSection';
import { ProductVisual } from '../components/ProductVisual';

interface CatalogPageProps {
  selectedCategory: CategoryId;
  onSelectCategory: (cat: CategoryId) => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  onSelectProduct: (product: Product) => void;
  onNavigate: (page: PageId) => void;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({
  selectedCategory,
  onSelectCategory,
  onAddToCart,
  onSelectProduct,
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');
  const [addedMap, setAddedMap] = useState<Record<string, boolean>>({});

  const handleQuickAdd = (product: Product) => {
    onAddToCart(product, 1);
    setAddedMap((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedMap((prev) => ({ ...prev, [product.id]: false }));
    }, 1000);
  };

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    let list = PRODUCTS.filter((p) => {
      const matchCategory = selectedCategory === CategoryId.All || p.category === selectedCategory;
      const matchQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.descriptionTh.toLowerCase().includes(q) ||
        p.specs.some((s) => s.toLowerCase().includes(q));
      return matchCategory && matchQuery;
    });

    if (sortBy === 'price-asc') {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list = [...list].sort((a, b) => b.price - a.price);
    }
    return list;
  }, [selectedCategory, searchQuery, sortBy]);

  const activeCategoryMeta = CATEGORIES.find((c) => c.id === selectedCategory) ?? CATEGORIES[0];

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog-browser');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      {/* Storefront Hero */}
      <section className="border-b border-[#D6B45A]/35 bg-[#0B192C]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
            {/* Hero Copy */}
            <div className="flex flex-col justify-between rounded-xl border border-[#D6B45A] bg-[#152A42] p-7 sm:p-10 lg:col-span-6">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#D6B45A]">
                  <span>GEAR PRO STORE</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#CBD5E1]">วิทยาลัยอาชีวศึกษาเอเซีย (ร้านอยู่ภายในโรงเรียน)</span>
                </div>

                <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-white text-balance sm:text-4xl lg:text-[2.65rem]">
                  อุปกรณ์คอมพิวเตอร์และเกมมิ่งเกียร์มาตรฐานโปรเพลเยอร์
                </h1>

                <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#CBD5E1] sm:text-base">
                  คัดสรรเฉพาะอุปกรณ์ต่อพ่วงคอมพิวเตอร์ของแท้ 100% ทั้งเมาส์ไร้สาย คีย์บอร์ดเมคานิคอล
                  หูฟัง ไมโครโฟนสตูดิโอ และอุปกรณ์จัดโต๊ะคอม ครบ 4 หมวดหมู่ 40 รุ่นพร้อมรับประกันศูนย์ไทย
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={scrollToCatalog}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-[#D6B45A] bg-gradient-to-r from-[#2196F3] to-[#D946EF] px-6 py-2.5 text-sm font-semibold text-white transition-all hover:brightness-110"
                >
                  <span>เลือกชมสินค้าทั้งหมด (40 รุ่น)</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate(PageId.Promotions)}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-[#D6B45A]/70 bg-[#0B192C] px-5 py-2.5 text-sm font-semibold text-[#D6B45A] transition-colors hover:border-[#00E5FF] hover:text-white"
                >
                  <span>ดูโปรโมชั่นลด 15% &amp; ของแถม</span>
                </button>
              </div>
            </div>

            {/* Auto-Sliding 5-Image Bestseller Preview Carousel */}
            <div className="lg:col-span-6">
              <BestsellerCarousel
                onSelectProduct={onSelectProduct}
                onAddToCart={onAddToCart}
              />
            </div>
          </div>

          {/* 4-Column Store Highlights Strip */}
          <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            <div className="rounded-lg border border-[#D6B45A]/45 bg-[#152A42] px-4 py-3.5">
              <p className="font-mono-num text-lg font-bold text-[#D6B45A]">40 รุ่นแท้</p>
              <p className="mt-0.5 text-xs text-[#CBD5E1]">อุปกรณ์ต่อพ่วงและจัดโต๊ะคอม 4 หมวด</p>
            </div>
            <div className="rounded-lg border border-[#D6B45A]/45 bg-[#152A42] px-4 py-3.5">
              <p className="font-mono-num text-lg font-bold text-[#00E5FF]">15% Bundle</p>
              <p className="mt-0.5 text-xs text-[#CBD5E1]">จับคู่ Superlight 2 + Keychron K2 Max</p>
            </div>
            <div className="rounded-lg border border-[#D6B45A]/45 bg-[#152A42] px-4 py-3.5">
              <p className="font-mono-num text-lg font-bold text-white">ส่งฟรี 2,500.-</p>
              <p className="mt-0.5 text-xs text-[#CBD5E1]">ค่าส่งปกติ 50.- ตัดรอบทุกวัน 15:00 น.</p>
            </div>
            <div className="rounded-lg border border-[#D6B45A]/45 bg-[#152A42] px-4 py-3.5">
              <p className="font-mono-num text-lg font-bold text-[#D946EF]">รับหน้าร้านฟรี</p>
              <p className="mt-0.5 text-xs text-[#CBD5E1]">วิทยาลัยอาชีวศึกษาเอเซีย ภายในโรงเรียน</p>
            </div>
          </div>
        </div>
      </section>

      {/* Auto-Sliding Featured Bestsellers Section (5 items, 3 content blocks each) */}
      <BestsellersSection
        addedMap={addedMap}
        onQuickAdd={handleQuickAdd}
        onSelectProduct={onSelectProduct}
      />

      {/* Full Catalog Section (4 Sub-Categories, 10 items each = 40 items) */}
      <section id="catalog-browser" className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold tracking-wider text-[#D6B45A]">
                PRODUCT CATALOG · หมวดหมู่สินค้าทั้ง 4 กลุ่ม
              </p>
              <h2 className="mt-1.5 font-display text-2xl font-bold text-white sm:text-3xl">
                {activeCategoryMeta.labelTh}{' '}
                <span className="font-mono-num text-lg font-normal text-[#00E5FF]">
                  ({filteredProducts.length} รายการ)
                </span>
              </h2>
            </div>

            {/* Search & Sort Controls */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative min-w-[230px] flex-1 sm:w-64">
                <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#CBD5E1]" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ค้นหารุ่นสินค้า แบรนด์ หรือสเปก..."
                  aria-label="ค้นหาสินค้า"
                  className="h-10 w-full rounded-lg border border-[#D6B45A]/50 bg-[#152A42] pr-3 pl-9 text-sm text-white placeholder-[#CBD5E1]/70 focus:border-[#00E5FF] focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 rounded-lg border border-[#D6B45A]/50 bg-[#152A42] px-3 h-10">
                <SlidersHorizontal className="h-4 w-4 text-[#D6B45A]" />
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value as 'default' | 'price-asc' | 'price-desc')
                  }
                  aria-label="เรียงลำดับสินค้า"
                  className="bg-transparent text-xs font-medium text-white focus:outline-none"
                >
                  <option value="default" className="bg-[#0B192C]">เรียงตามหมวดหมู่</option>
                  <option value="price-asc" className="bg-[#0B192C]">ราคา: น้อยไปมาก</option>
                  <option value="price-desc" className="bg-[#0B192C]">ราคา: มากไปน้อย</option>
                </select>
              </div>
            </div>
          </div>

          {/* 4 Sub-category Filter Tabs */}
          <div
            role="tablist"
            aria-label="หมวดหมู่อุปกรณ์คอมพิวเตอร์"
            className="mt-6 flex flex-wrap gap-2 rounded-xl border border-[#D6B45A]/40 bg-[#152A42] p-2"
          >
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={isSelected}
                  type="button"
                  onClick={() => onSelectCategory(cat.id)}
                  className={`min-h-[40px] rounded-lg px-4 py-2 text-xs font-semibold whitespace-nowrap transition-all duration-150 sm:text-sm ${
                    isSelected
                      ? 'border border-[#D6B45A] bg-[#0B192C] text-[#D6B45A] shadow-[0_0_12px_rgba(214,180,90,0.2)]'
                      : 'border border-transparent text-[#CBD5E1] hover:bg-[#0B192C]/50 hover:text-white'
                  }`}
                >
                  {cat.labelTh}{' '}
                  <span className="font-mono-num text-xs opacity-80">({cat.count})</span>
                </button>
              );
            })}
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="mt-10 rounded-xl border border-[#D6B45A]/40 bg-[#152A42] p-12 text-center">
              <p className="text-base font-semibold text-white">ไม่พบสินค้าที่ตรงกับคำค้นหา</p>
              <p className="mt-1 text-sm text-[#CBD5E1]">
                ลองเปลี่ยนคำค้นหาหรือเลือกดูหมวดหมู่อุปกรณ์ทั้งหมด
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  onSelectCategory(CategoryId.All);
                }}
                className="mt-5 rounded-lg border border-[#D6B45A] bg-[#0B192C] px-5 py-2 text-sm font-semibold text-[#D6B45A] hover:border-[#00E5FF] hover:text-white"
              >
                แสดงสินค้าทั้งหมด 40 รุ่น
              </button>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => {
                const isAdded = !!addedMap[product.id];
                return (
                  <article
                    key={product.id}
                    className="group flex flex-col justify-between overflow-hidden rounded-xl border border-[#D6B45A]/80 bg-[#152A42] transition-all duration-150 hover:-translate-y-0.5 hover:border-[#00E5FF] hover:shadow-[0_10px_28px_rgba(33,150,243,0.2)]"
                  >
                    <div>
                      {/* 4:3 Studio Visual */}
                      <button
                        type="button"
                        onClick={() => onSelectProduct(product)}
                        className="block w-full overflow-hidden border-b border-[#D6B45A]/35 bg-[#0B192C] text-left"
                      >
                        <div className="aspect-[4/3] w-full overflow-hidden">
                          <ProductVisual
                            src={product.image}
                            alt={product.name}
                            category={product.category}
                            className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
                          />
                        </div>
                      </button>

                      {/* Card Body */}
                      <div className="p-5">
                        {/* Clean Unboxed Metadata */}
                        <div className="flex items-center gap-1.5 text-xs text-[#CBD5E1]">
                          <span className="font-semibold text-[#D6B45A]">{product.brand}</span>
                          <span aria-hidden="true">·</span>
                          <span className="truncate">{product.categoryLabelTh}</span>
                        </div>

                        <h3 className="mt-1.5 font-display text-base font-semibold leading-snug text-white">
                          <button
                            type="button"
                            onClick={() => onSelectProduct(product)}
                            className="text-left hover:text-[#00E5FF] transition-colors"
                          >
                            {product.name}
                          </button>
                        </h3>

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

                    {/* Price & Actions Footer */}
                    <div className="flex items-center justify-between gap-3 border-t border-white/10 bg-[#0B192C]/45 px-5 py-3.5">
                      <div>
                        <span className="font-mono-num text-lg font-bold text-[#D6B45A]">
                          ฿{formatThb(product.price)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onSelectProduct(product)}
                          aria-label={`ดูรายละเอียด ${product.name}`}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 bg-[#0B192C] text-[#CBD5E1] hover:border-[#D6B45A] hover:text-white"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleQuickAdd(product)}
                          className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-[#D6B45A] bg-gradient-to-r from-[#2196F3] to-[#D946EF] px-3.5 py-1.5 text-xs font-semibold text-white whitespace-nowrap transition-all hover:brightness-110"
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
          )}
        </div>
      </section>
    </div>
  );
};
