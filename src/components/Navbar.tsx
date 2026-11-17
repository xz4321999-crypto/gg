import React, { useState } from 'react';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { STORE_ASSETS } from '../data/catalog';
import { PageId } from '../types';

interface NavbarProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  cartCount: number;
  onOpenCart: () => void;
}

const NAV_ITEMS: { id: PageId; label: string }[] = [
  { id: PageId.Catalog, label: 'สินค้าทั้งหมด' },
  { id: PageId.Promotions, label: 'โปรโมชั่นมาแรง' },
  { id: PageId.Checkout, label: 'คำสั่งซื้อ' },
  { id: PageId.Contact, label: 'ติดต่อเรา' },
];

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onNavigate,
  cartCount,
  onOpenCart,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSelectPage = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[#D6B45A]/45 bg-[#0B192C]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <button
          type="button"
          onClick={() => handleSelectPage(PageId.Catalog)}
          className="flex shrink-0 items-center gap-3 whitespace-nowrap text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D6B45A]"
        >
          <img
            src={STORE_ASSETS.logo}
            alt="GEAR PRO STORE"
            referrerPolicy="no-referrer"
            className="h-10 w-10 shrink-0 rounded-md border border-[#D6B45A] object-cover"
          />
          <span className="font-display text-lg font-bold tracking-wide text-[#D6B45A] whitespace-nowrap">
            GEAR PRO STORE
          </span>
        </button>

        {/* Zone 2: 4 Clean Single-line Nav Links */}
        <nav
          aria-label="เมนูหลัก"
          className="hidden md:flex items-center gap-7"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectPage(item.id)}
                className={`relative py-2 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00E5FF] ${
                  isActive
                    ? 'text-white'
                    : 'text-[#CBD5E1] hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute right-0 bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#D6B45A] via-[#00E5FF] to-[#D946EF]"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={onOpenCart}
            className="inline-flex min-h-[40px] shrink-0 items-center gap-2 rounded-lg border border-[#D6B45A] bg-[#152A42] px-4 py-2 text-sm font-semibold text-white whitespace-nowrap transition-all duration-150 hover:border-[#00E5FF] hover:shadow-[0_0_16px_rgba(33,150,243,0.3)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00E5FF]"
          >
            <ShoppingBag className="h-4 w-4 text-[#D6B45A]" aria-hidden="true" />
            <span>ตะกร้าสินค้า</span>
            <span className="font-mono-num text-[#D6B45A]">({cartCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'ปิดเมนู' : 'เปิดเมนู'}
            aria-expanded={mobileMenuOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#D6B45A]/40 bg-[#152A42] text-white md:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Panel */}
      {mobileMenuOpen && (
        <nav
          aria-label="เมนูมือถือ"
          className="border-t border-[#D6B45A]/30 bg-[#0B192C] px-4 py-3 md:hidden"
        >
          <div className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectPage(item.id)}
                  className={`flex min-h-[44px] items-center justify-between rounded-lg px-3 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#152A42] text-[#D6B45A] border border-[#D6B45A]/60'
                      : 'text-[#CBD5E1] hover:bg-[#152A42]/60 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="text-xs text-[#00E5FF]">กำลังดู</span>}
                </button>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
};
