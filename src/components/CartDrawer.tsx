import React from 'react';
import { ArrowRight, Gift, Minus, Plus, ShoppingBag, Trash2, Truck, X } from 'lucide-react';
import { CartItem, PageId } from '../types';
import { calculateCartSummary, formatThb } from '../utils/promotions';
import { ProductVisual } from './ProductVisual';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQty: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onGoToCheckout: () => void;
  onNavigate: (page: PageId) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onRemoveItem,
  onGoToCheckout,
  onNavigate,
}) => {
  if (!isOpen) return null;

  const summary = calculateCartSummary(cart, 'shipping');

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="ตะกร้าสินค้า"
      className="fixed inset-0 z-50 flex justify-end bg-[#060E1A]/75 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="flex h-full w-full max-w-md flex-col border-l border-[#D6B45A] bg-[#0B192C] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#D6B45A]/40 bg-[#152A42] px-6 py-4">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="h-5 w-5 text-[#D6B45A]" />
            <h2 className="font-display text-lg font-bold text-white">
              ตะกร้าสินค้า <span className="font-mono-num text-[#D6B45A]">({summary.totalItems})</span>
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="ปิดตะกร้าสินค้า"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#D6B45A]/40 bg-[#0B192C] text-[#CBD5E1] hover:border-[#00E5FF] hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Free shipping progress */}
        <div className="border-b border-white/10 bg-[#152A42]/60 px-6 py-3">
          <div className="flex items-center gap-2 text-xs text-[#CBD5E1]">
            <Truck className="h-4 w-4 shrink-0 text-[#00E5FF]" />
            {summary.totalItems === 0 ? (
              <span>สั่งซื้อครบ 2,500 บาท ส่งฟรีทั่วไทย (หรือรับฟรีที่วิทยาลัยอาชีวศึกษาเอเซีย)</span>
            ) : summary.freeShippingRemaining === 0 ? (
              <span className="font-medium text-[#00E5FF]">
                ยอดถึงเกณฑ์แล้ว — คุณได้รับสิทธิ์จัดส่งฟรีทั่วไทย
              </span>
            ) : (
              <span>
                ซื้อเพิ่มอีก{' '}
                <strong className="font-mono-num text-[#D6B45A]">
                  ฿{formatThb(summary.freeShippingRemaining)}
                </strong>{' '}
                เพื่อรับสิทธิ์ส่งฟรีทั่วไทย
              </span>
            )}
          </div>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center py-12 text-center">
              <ShoppingBag className="h-12 w-12 text-[#D6B45A]/50" />
              <p className="mt-4 text-base font-semibold text-white">ยังไม่มีสินค้าในตะกร้า</p>
              <p className="mt-1 text-sm text-[#CBD5E1]">
                เลือกชมเมาส์ คีย์บอร์ด หูฟัง หรืออุปกรณ์จัดโต๊ะคอมได้เลย
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigate(PageId.Catalog);
                }}
                className="mt-6 rounded-lg border border-[#D6B45A] bg-[#152A42] px-5 py-2.5 text-sm font-semibold text-white hover:border-[#00E5FF]"
              >
                เลือกดูสินค้าทั้งหมด
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3.5 rounded-lg border border-[#D6B45A]/40 bg-[#152A42] p-3"
                >
                  <div className="h-20 w-24 shrink-0 overflow-hidden rounded-md border border-white/10 bg-[#0B192C]">
                    <ProductVisual
                      src={item.product.image}
                      alt={item.product.name}
                      category={item.product.category}
                      loading="eager"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="line-clamp-2 text-sm font-semibold text-white">
                        {item.product.name}
                      </h3>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.product.id)}
                        aria-label={`ลบ ${item.product.name}`}
                        className="shrink-0 p-1 text-[#CBD5E1] hover:text-[#D946EF]"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="font-mono-num text-sm font-bold text-[#D6B45A]">
                        ฿{formatThb(item.product.price * item.quantity)}
                      </span>
                      <div className="flex items-center rounded-md border border-[#D6B45A]/40 bg-[#0B192C]">
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.product.id, -1)}
                          aria-label="ลดจำนวน"
                          className="inline-flex h-7 w-7 items-center justify-center text-[#CBD5E1] hover:text-white"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="font-mono-num w-7 text-center text-xs font-semibold text-white">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.product.id, 1)}
                          aria-label="เพิ่มจำนวน"
                          className="inline-flex h-7 w-7 items-center justify-center text-[#CBD5E1] hover:text-white"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Auto-applied promotions */}
              {summary.bundleDiscount > 0 && (
                <div className="rounded-lg border border-[#00E5FF]/50 bg-[#152A42] px-4 py-3 text-xs text-white">
                  <div className="flex items-center justify-between font-semibold text-[#00E5FF]">
                    <span>โปรโมชั่นจับคู่ Superlight 2 + K2 Max (15%)</span>
                    <span className="font-mono-num">-฿{formatThb(summary.bundleDiscount)}</span>
                  </div>
                </div>
              )}

              {summary.freeGiftName && (
                <div className="flex items-center gap-2.5 rounded-lg border border-[#D6B45A]/60 bg-[#152A42] px-4 py-3 text-xs text-white">
                  <Gift className="h-4 w-4 shrink-0 text-[#D6B45A]" />
                  <span>{summary.freeGiftName}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-[#D6B45A]/40 bg-[#152A42] px-6 py-4">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-[#CBD5E1]">
                <span>ยอดรวมสินค้า</span>
                <span className="font-mono-num">฿{formatThb(summary.subtotal)}</span>
              </div>
              {summary.bundleDiscount > 0 && (
                <div className="flex justify-between text-[#00E5FF]">
                  <span>ส่วนลดชุด Bundle 15%</span>
                  <span className="font-mono-num">-฿{formatThb(summary.bundleDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#CBD5E1]">
                <span>ค่าจัดส่ง (มาตรฐานทั่วไทย)</span>
                <span className="font-mono-num">
                  {summary.shippingFee === 0 ? 'ฟรี' : `฿${formatThb(summary.shippingFee)}`}
                </span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-2 text-base font-bold text-white">
                <span>ยอดสุทธิ</span>
                <span className="font-mono-num text-[#D6B45A]">฿{formatThb(summary.total)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                onClose();
                onGoToCheckout();
              }}
              className="mt-4 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg border border-[#D6B45A] bg-gradient-to-r from-[#2196F3] to-[#D946EF] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:brightness-110"
            >
              <span>ดำเนินการสั่งซื้อ / ชำระเงิน</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
