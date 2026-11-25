import React, { useState } from 'react';
import { Check, Minus, Package, Plus, ShieldCheck, ShoppingCart, X } from 'lucide-react';
import { Product } from '../types';
import { formatThb } from '../utils/promotions';
import { ProductVisual } from './ProductVisual';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [addedFeedback, setAddedFeedback] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 1200);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#060E1A]/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-xl border border-[#D6B45A] bg-[#152A42] shadow-[0_24px_60px_rgba(0,0,0,0.65)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="ปิดหน้าต่างรายละเอียดสินค้า"
          className="absolute top-4 right-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#D6B45A]/50 bg-[#0B192C]/90 text-white transition-colors hover:border-[#00E5FF] hover:text-[#00E5FF]"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left: Product Image */}
          <div className="border-b border-[#D6B45A]/30 bg-[#0B192C] p-6 lg:col-span-5 lg:border-r lg:border-b-0">
            <div className="aspect-[4/3] overflow-hidden rounded-lg border border-[#D6B45A]/40 bg-[#0B192C]">
              <ProductVisual
                key={product.id}
                src={product.image}
                alt={product.name}
                category={product.category}
                loading="eager"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="mt-5 space-y-2.5 text-xs text-[#CBD5E1]">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#D6B45A]" />
                <span>{product.warranty} · ของแท้ 100%</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Package className="mt-0.5 h-4 w-4 shrink-0 text-[#00E5FF]" />
                <span>อุปกรณ์ในกล่อง: {product.boxContents}</span>
              </div>
            </div>
          </div>

          {/* Right: Contiguous Purchase Module */}
          <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-7">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#D6B45A]">
                <span className="font-semibold">{product.brand}</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#CBD5E1]">{product.categoryLabelTh}</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#00E5FF]">{product.connectivity}</span>
              </div>

              <h2
                id="modal-product-title"
                className="mt-2 font-display text-2xl font-bold leading-snug text-white"
              >
                {product.name}
              </h2>

              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-mono-num text-3xl font-bold text-[#D6B45A]">
                  ฿{formatThb(product.price)}
                </span>
                <span className="text-xs text-[#CBD5E1]">รวมภาษีมูลค่าเพิ่มแล้ว</span>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-[#CBD5E1]">
                {product.descriptionTh}
              </p>

              <div className="mt-6 border-t border-[#D6B45A]/25 pt-5">
                <h3 className="text-xs font-semibold tracking-wide text-[#D6B45A]">
                  ข้อมูลทางเทคนิค (Specifications)
                </h3>
                <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {product.specs.map((spec) => (
                    <li
                      key={spec}
                      className="flex items-start gap-2 rounded-lg border border-white/10 bg-[#0B192C]/65 px-3 py-2 text-xs text-white"
                    >
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00E5FF]" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Purchase Controls */}
            <div className="mt-7 flex flex-wrap items-center gap-4 border-t border-[#D6B45A]/25 pt-5">
              <div className="flex items-center rounded-lg border border-[#D6B45A]/50 bg-[#0B192C]">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="ลดจำนวน"
                  className="inline-flex h-11 w-11 items-center justify-center text-[#CBD5E1] hover:text-white"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="font-mono-num min-w-[2.5rem] text-center text-sm font-semibold text-white">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="เพิ่มจำนวน"
                  className="inline-flex h-11 w-11 items-center justify-center text-[#CBD5E1] hover:text-white"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-lg border border-[#D6B45A] bg-gradient-to-r from-[#2196F3] to-[#D946EF] px-6 py-2.5 text-sm font-semibold text-white transition-all duration-150 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00E5FF]"
              >
                {addedFeedback ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>เพิ่มลงตะกร้าแล้ว</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-4 w-4" />
                    <span>เพิ่มลงตะกร้า (฿{formatThb(product.price * quantity)})</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
