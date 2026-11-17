import React, { useMemo, useState } from 'react';
import {
  Check,
  CheckCircle2,
  Copy,
  FileText,
  Headset,
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
  X,
} from 'lucide-react';
import { PRODUCTS, STORE_CONTACT } from '../data/catalog';
import { CartItem, Product } from '../types';
import { calculateCartSummary, formatThb } from '../utils/promotions';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onGoToCheckout?: () => void;
}

const USAGE_PROFILES = [
  {
    id: 'fps',
    label: 'เล่นเกม FPS / Esports',
    recommendedIds: ['logitech-g-pro-x-superlight-2', 'hyperx-cloud-iii-wired', 'artisan-ninja-fx-zero-soft'],
  },
  {
    id: 'work',
    label: 'ทำงาน เขียนโค้ด และกราฟิก',
    recommendedIds: ['keychron-k2-max', 'logitech-mx-master-3s', 'benq-screenbar-halo-2'],
  },
  {
    id: 'stream',
    label: 'สตรีมมิ่ง และทำคอนเทนต์',
    recommendedIds: ['elgato-stream-deck-mk2', 'hyperx-quadcast-s', 'elgato-wave-3'],
  },
  {
    id: 'desk',
    label: 'จัดโต๊ะคอมมินิมอล & Hub',
    recommendedIds: ['ergotron-lx-monitor-arm', 'anker-555-usbc-hub-8in1', 'benq-screenbar-halo-2'],
  },
];

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [profileId, setProfileId] = useState('fps');
  const [budget, setBudget] = useState('3,000 – 7,000 บาท');
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const selectedProfile = useMemo(
    () => USAGE_PROFILES.find((p) => p.id === profileId) ?? USAGE_PROFILES[0],
    [profileId]
  );

  const recommendedProducts = useMemo(
    () =>
      selectedProfile.recommendedIds
        .map((id) => PRODUCTS.find((p) => p.id === id))
        .filter((p): p is Product => Boolean(p)),
    [selectedProfile]
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) return;
    setSubmitted(true);
  };

  const resetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#060E1A]/85 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="consult-modal-title"
      onClick={resetAndClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-[#D6B45A] bg-[#152A42] p-6 shadow-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#00E5FF]/60 bg-[#0B192C] text-[#00E5FF]">
              <Headset className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold tracking-wider text-[#D6B45A]">
                FREE GEAR CONSULTATION
              </p>
              <h2 id="consult-modal-title" className="font-display text-xl font-bold text-white">
                ปรึกษาจัดสเปกอุปกรณ์คอมพิวเตอร์ฟรี
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={resetAndClose}
            aria-label="ปิดหน้าต่างปรึกษาฟรี"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-[#0B192C] text-[#CBD5E1] hover:border-[#D6B45A] hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {submitted ? (
          <div className="mt-6 space-y-5">
            <div className="rounded-xl border border-[#00E5FF]/50 bg-[#0B192C] p-6 text-center">
              <CheckCircle2 className="mx-auto h-11 w-11 text-[#00E5FF]" />
              <h3 className="mt-3 font-display text-lg font-bold text-white">
                บันทึกคำขอปรึกษาของคุณ {name} เรียบร้อยแล้ว
              </h3>
              <p className="mt-1.5 text-sm text-[#CBD5E1]">
                ทีมผู้เชี่ยวชาญ GEAR PRO STORE จะติดต่อกลับทาง{' '}
                <strong className="text-[#00E5FF]">{contact}</strong> ภายในเวลาทำการ (08:30 – 17:30 น.)
                หรือทักด่วนได้ที่ LINE OA: <strong className="text-[#D6B45A]">{STORE_CONTACT.lineOa}</strong>
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold tracking-wider text-[#D6B45A]">
                อุปกรณ์แนะนำเบื้องต้นสำหรับ "{selectedProfile.label}"
              </p>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {recommendedProducts.map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => {
                      resetAndClose();
                      onSelectProduct(product);
                    }}
                    className="rounded-lg border border-[#D6B45A]/60 bg-[#0B192C] p-3 text-left transition-colors hover:border-[#00E5FF]"
                  >
                    <p className="text-xs font-semibold text-[#D6B45A]">{product.brand}</p>
                    <p className="mt-1 line-clamp-2 text-xs font-semibold text-white">
                      {product.name}
                    </p>
                    <p className="mt-2 font-mono-num text-sm font-bold text-[#00E5FF]">
                      ฿{formatThb(product.price)}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={resetAndClose}
                className="rounded-lg border border-[#D6B45A] bg-gradient-to-r from-[#2196F3] to-[#D946EF] px-6 py-2.5 text-sm font-semibold text-white hover:brightness-110"
              >
                เสร็จสิ้น
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="consult-name" className="block text-xs font-medium text-[#CBD5E1]">
                  ชื่อผู้ติดต่อ *
                </label>
                <input
                  id="consult-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="เช่น คุณภูริ / นักศึกษา ปวส."
                  className="mt-1.5 h-11 w-full rounded-lg border border-[#D6B45A]/50 bg-[#0B192C] px-3.5 text-sm text-white placeholder-[#CBD5E1]/50 focus:border-[#00E5FF] focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="consult-contact" className="block text-xs font-medium text-[#CBD5E1]">
                  เบอร์โทร หรือ LINE ID *
                </label>
                <input
                  id="consult-contact"
                  type="text"
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="เช่น 089-xxx-xxxx หรือ @lineid"
                  className="mt-1.5 h-11 w-full rounded-lg border border-[#D6B45A]/50 bg-[#0B192C] px-3.5 text-sm text-white placeholder-[#CBD5E1]/50 focus:border-[#00E5FF] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <span className="block text-xs font-medium text-[#CBD5E1]">
                ลักษณะการใช้งานหลักที่ต้องการคำแนะนำ
              </span>
              <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {USAGE_PROFILES.map((profile) => {
                  const active = profile.id === profileId;
                  return (
                    <button
                      key={profile.id}
                      type="button"
                      onClick={() => setProfileId(profile.id)}
                      className={`rounded-lg border px-3.5 py-2.5 text-left text-xs font-semibold transition-colors ${
                        active
                          ? 'border-[#00E5FF] bg-[#0B192C] text-white'
                          : 'border-white/15 bg-[#0B192C]/55 text-[#CBD5E1] hover:border-[#D6B45A]/60'
                      }`}
                    >
                      {profile.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label htmlFor="consult-budget" className="block text-xs font-medium text-[#CBD5E1]">
                งบประมาณโดยประมาณ
              </label>
              <select
                id="consult-budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="mt-1.5 h-11 w-full rounded-lg border border-[#D6B45A]/50 bg-[#0B192C] px-3.5 text-sm text-white focus:border-[#00E5FF] focus:outline-none"
              >
                <option value="ต่ำกว่า 3,000 บาท">ต่ำกว่า 3,000 บาท</option>
                <option value="3,000 – 7,000 บาท">3,000 – 7,000 บาท</option>
                <option value="7,000 – 15,000 บาท">7,000 – 15,000 บาท</option>
                <option value="มากกว่า 15,000 บาท (จัดเต็มครบชุด)">
                  มากกว่า 15,000 บาท (จัดเต็มครบชุด)
                </option>
              </select>
            </div>

            <div>
              <label htmlFor="consult-note" className="block text-xs font-medium text-[#CBD5E1]">
                ขนาดมือ สวิตช์ที่ชอบ หรือคำถามเพิ่มเติม
              </label>
              <textarea
                id="consult-note"
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="เช่น อยากลองจับ Logitech G PRO X SUPERLIGHT 2 หรือเทียบสวิตช์ Keychron..."
                className="mt-1.5 w-full rounded-lg border border-[#D6B45A]/50 bg-[#0B192C] p-3 text-sm text-white placeholder-[#CBD5E1]/50 focus:border-[#00E5FF] focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
              <span className="text-xs text-[#CBD5E1]">
                สามารถนัดทดลองจับอุปกรณ์จริงได้ที่ {STORE_CONTACT.locationTh}
              </span>
              <button
                type="submit"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-[#D6B45A] bg-gradient-to-r from-[#2196F3] to-[#D946EF] px-6 py-2.5 text-sm font-semibold text-white hover:brightness-110"
              >
                <span>ส่งคำขอปรึกษาฟรี</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

interface QuotationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddItemsToCart: (items: CartItem[]) => void;
}

export const QuotationModal: React.FC<QuotationModalProps> = ({
  isOpen,
  onClose,
  onAddItemsToCart,
}) => {
  const [buyerName, setBuyerName] = useState('');
  const [organization, setOrganization] = useState('วิทยาลัยอาชีวศึกษาเอเซีย / ลูกค้าทั่วไป');
  const [selectedProductId, setSelectedProductId] = useState(PRODUCTS[0].id);
  const [items, setItems] = useState<CartItem[]>(() => {
    const mouse = PRODUCTS.find((p) => p.id === 'logitech-g-pro-x-superlight-2');
    const kb = PRODUCTS.find((p) => p.id === 'keychron-k2-max');
    return [mouse, kb]
      .filter((p): p is Product => Boolean(p))
      .map((product) => ({ product, quantity: 1 }));
  });
  const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'shipping'>('pickup');
  const [copied, setCopied] = useState(false);

  const summary = useMemo(
    () => calculateCartSummary(items, deliveryMethod),
    [items, deliveryMethod]
  );

  if (!isOpen) return null;

  const handleAddProduct = () => {
    const found = PRODUCTS.find((p) => p.id === selectedProductId);
    if (!found) return;
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === found.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === found.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { product: found, quantity: 1 }];
    });
  };

  const handleQtyChange = (productId: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) =>
          i.product.id === productId ? { ...i, quantity: i.quantity + delta } : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const handleCopyQuotation = () => {
    const lines = [
      '=== ใบเสนอราคา GEAR PRO STORE ===',
      `ผู้ขอใบเสนอราคา: ${buyerName.trim() || 'ลูกค้าทั่วไป'}`,
      `หน่วยงาน/สถานศึกษา: ${organization.trim() || '-'}`,
      `สถานที่ร้าน: ${STORE_CONTACT.locationTh}`,
      '----------------------------------',
      ...items.map(
        (item, idx) =>
          `${idx + 1}. ${item.product.name} x${item.quantity} = ฿${formatThb(
            item.product.price * item.quantity
          )}`
      ),
      '----------------------------------',
      `ยอดรวมสินค้า: ฿${formatThb(summary.subtotal)}`,
      ...(summary.bundleDiscount > 0
        ? [`ส่วนลด Bundle 15%: -฿${formatThb(summary.bundleDiscount)}`]
        : []),
      `ค่าจัดส่ง (${deliveryMethod === 'pickup' ? 'รับหน้าร้านฟรี' : 'ส่งพัสดุ'}): ฿${formatThb(
        summary.shippingFee
      )}`,
      `ยอดสุทธิ: ฿${formatThb(summary.total)}`,
      ...(summary.freeGiftName ? [`ของแถม: ${summary.freeGiftName}`] : []),
      `ติดต่อสั่งซื้อ: LINE ${STORE_CONTACT.lineOa} | โทร ${STORE_CONTACT.phones[1]}`,
    ].join('\n');

    navigator.clipboard?.writeText(lines);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#060E1A]/85 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-modal-title"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl border border-[#D6B45A] bg-[#152A42] p-6 shadow-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#D6B45A]/60 bg-[#0B192C] text-[#D6B45A]">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold tracking-wider text-[#D6B45A]">
                INSTANT QUOTATION BUILDER
              </p>
              <h2 id="quote-modal-title" className="font-display text-xl font-bold text-white">
                ขอใบเสนอราคาอุปกรณ์คอมพิวเตอร์และเกมมิ่งเกียร์
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="ปิดหน้าต่างขอใบเสนอราคา"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-[#0B192C] text-[#CBD5E1] hover:border-[#D6B45A] hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-5 space-y-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="quote-buyer" className="block text-xs font-medium text-[#CBD5E1]">
                ชื่อผู้ขอใบเสนอราคา
              </label>
              <input
                id="quote-buyer"
                type="text"
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
                placeholder="ชื่อ-นามสกุล หรือผู้ประสานงาน"
                className="mt-1.5 h-10 w-full rounded-lg border border-[#D6B45A]/50 bg-[#0B192C] px-3 text-sm text-white placeholder-[#CBD5E1]/50 focus:border-[#00E5FF] focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="quote-org" className="block text-xs font-medium text-[#CBD5E1]">
                หน่วยงาน / ชมรม / บุคคลทั่วไป
              </label>
              <input
                id="quote-org"
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                className="mt-1.5 h-10 w-full rounded-lg border border-[#D6B45A]/50 bg-[#0B192C] px-3 text-sm text-white focus:border-[#00E5FF] focus:outline-none"
              />
            </div>
          </div>

          {/* Add Product Selector */}
          <div className="rounded-lg border border-[#D6B45A]/45 bg-[#0B192C] p-4">
            <label htmlFor="quote-product-select" className="block text-xs font-semibold text-[#D6B45A]">
              เลือกเพิ่มอุปกรณ์ลงในรายการใบเสนอราคา (40 รุ่นแท้)
            </label>
            <div className="mt-2 flex flex-col gap-2 sm:flex-row">
              <select
                id="quote-product-select"
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                className="h-10 flex-1 rounded-lg border border-white/20 bg-[#152A42] px-3 text-xs text-white focus:border-[#00E5FF] focus:outline-none sm:text-sm"
              >
                {PRODUCTS.map((p) => (
                  <option key={p.id} value={p.id}>
                    [{p.categoryLabelTh}] {p.name} — ฿{formatThb(p.price)}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={handleAddProduct}
                className="inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-lg border border-[#D6B45A] bg-[#152A42] px-4 text-xs font-semibold text-[#D6B45A] hover:border-[#00E5FF] hover:text-white"
              >
                <Plus className="h-4 w-4" />
                <span>เพิ่มรายการ</span>
              </button>
            </div>
          </div>

          {/* Selected Quote Lines */}
          <div className="space-y-2.5">
            {items.length === 0 ? (
              <p className="rounded-lg border border-white/10 bg-[#0B192C]/60 p-6 text-center text-sm text-[#CBD5E1]">
                ยังไม่มีรายการสินค้า กรุณาเลือกเพิ่มอุปกรณ์ด้านบน
              </p>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-white/15 bg-[#0B192C] px-4 py-3"
                >
                  <div className="min-w-[200px] flex-1">
                    <p className="text-xs font-semibold text-[#D6B45A]">{item.product.brand}</p>
                    <p className="text-sm font-semibold text-white">{item.product.name}</p>
                    <p className="font-mono-num text-xs text-[#CBD5E1]">
                      ฿{formatThb(item.product.price)} / ชิ้น
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center rounded-md border border-white/20 bg-[#152A42]">
                      <button
                        type="button"
                        onClick={() => handleQtyChange(item.product.id, -1)}
                        aria-label={`ลดจำนวน ${item.product.name}`}
                        className="p-1.5 text-[#CBD5E1] hover:text-white"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="font-mono-num px-2.5 text-xs font-bold text-white">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleQtyChange(item.product.id, 1)}
                        aria-label={`เพิ่มจำนวน ${item.product.name}`}
                        className="p-1.5 text-[#CBD5E1] hover:text-white"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <span className="font-mono-num w-24 text-right text-sm font-bold text-white">
                      ฿{formatThb(item.product.price * item.quantity)}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleQtyChange(item.product.id, -item.quantity)}
                      aria-label={`ลบ ${item.product.name}`}
                      className="text-[#CBD5E1] hover:text-[#D946EF]"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Delivery toggle & Live Totals */}
          <div className="rounded-xl border border-[#D6B45A]/60 bg-[#0B192C] p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
              <span className="text-xs font-medium text-[#CBD5E1]">รูปแบบการรับสินค้า:</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setDeliveryMethod('pickup')}
                  className={`rounded-md border px-3 py-1.5 text-xs font-semibold ${
                    deliveryMethod === 'pickup'
                      ? 'border-[#00E5FF] bg-[#152A42] text-[#00E5FF]'
                      : 'border-white/15 text-[#CBD5E1]'
                  }`}
                >
                  รับที่วิทยาลัย (ฟรี)
                </button>
                <button
                  type="button"
                  onClick={() => setDeliveryMethod('shipping')}
                  className={`rounded-md border px-3 py-1.5 text-xs font-semibold ${
                    deliveryMethod === 'shipping'
                      ? 'border-[#00E5FF] bg-[#152A42] text-[#00E5FF]'
                      : 'border-white/15 text-[#CBD5E1]'
                  }`}
                >
                  จัดส่งพัสดุ (ฟรีเมื่อครบ 2,500.-)
                </button>
              </div>
            </div>

            <div className="mt-3 space-y-1.5 text-sm">
              <div className="flex justify-between text-[#CBD5E1]">
                <span>ยอดรวมราคาสินค้า</span>
                <span className="font-mono-num text-white">฿{formatThb(summary.subtotal)}</span>
              </div>
              {summary.bundleDiscount > 0 && (
                <div className="flex justify-between text-[#00E5FF]">
                  <span>ส่วนลด Pro Esports Bundle (15%)</span>
                  <span className="font-mono-num">-฿{formatThb(summary.bundleDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#CBD5E1]">
                <span>ค่าจัดส่ง</span>
                <span className="font-mono-num text-white">
                  {summary.shippingFee === 0 ? 'ฟรี (฿0)' : `฿${formatThb(summary.shippingFee)}`}
                </span>
              </div>
              {summary.freeGiftName && (
                <div className="flex justify-between text-[#D946EF]">
                  <span>ของแถมตามเงื่อนไขโปรโมชั่น</span>
                  <span>{summary.freeGiftName}</span>
                </div>
              )}
              <div className="flex items-baseline justify-between border-t border-white/10 pt-2.5">
                <span className="font-display text-base font-bold text-white">ยอดประเมินสุทธิ</span>
                <span className="font-mono-num text-2xl font-bold text-[#D6B45A]">
                  ฿{formatThb(summary.total)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-3">
            <button
              type="button"
              onClick={handleCopyQuotation}
              disabled={items.length === 0}
              className="inline-flex min-h-[42px] items-center gap-2 rounded-lg border border-[#D6B45A] bg-[#0B192C] px-4 py-2 text-xs font-semibold text-[#D6B45A] hover:border-[#00E5FF] hover:text-white disabled:opacity-40"
            >
              {copied ? <Check className="h-4 w-4 text-[#00E5FF]" /> : <Copy className="h-4 w-4" />}
              <span>{copied ? 'คัดลอกใบเสนอราคาแล้ว' : 'คัดลอกสรุปใบเสนอราคา'}</span>
            </button>

            <button
              type="button"
              disabled={items.length === 0}
              onClick={() => {
                onAddItemsToCart(items);
                onClose();
              }}
              className="inline-flex min-h-[42px] items-center gap-2 rounded-lg border border-[#D6B45A] bg-gradient-to-r from-[#2196F3] to-[#D946EF] px-5 py-2 text-xs font-semibold text-white hover:brightness-110 disabled:opacity-40"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>นำรายการนี้เข้าตะกร้าสั่งซื้อ</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
