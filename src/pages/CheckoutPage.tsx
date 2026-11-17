import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import {
  CheckCircle2,
  Clock,
  Copy,
  CreditCard,
  Gift,
  MapPin,
  MessageCircle,
  Minus,
  Phone,
  Plus,
  QrCode,
  ShoppingBag,
  Trash2,
  Truck,
} from 'lucide-react';
import { PRODUCTS, STORE_ASSETS, STORE_CONTACT } from '../data/catalog';
import { CartItem, OrderReceipt, PageId, Product } from '../types';
import {
  calculateCartSummary,
  formatThb,
  generatePromptPayPayload,
} from '../utils/promotions';
import { ProductVisual } from '../components/ProductVisual';

interface CheckoutPageProps {
  cart: CartItem[];
  onUpdateQty: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  onClearCart: () => void;
  onNavigate: (page: PageId) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  cart,
  onUpdateQty,
  onRemoveItem,
  onAddToCart,
  onClearCart,
  onNavigate,
}) => {
  const [deliveryMethod, setDeliveryMethod] = useState<'shipping' | 'pickup'>('shipping');
  const [paymentMethod, setPaymentMethod] = useState<'promptpay' | 'bank-transfer'>('promptpay');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [address, setAddress] = useState('');
  const [qrSvgDataUrl, setQrSvgDataUrl] = useState<string>('');
  const [copiedBank, setCopiedBank] = useState(false);
  const [formError, setFormError] = useState('');
  const [receipt, setReceipt] = useState<OrderReceipt | null>(null);

  const summary = calculateCartSummary(cart, deliveryMethod);

  // Quick-pick bestsellers if user wants to add items right on Checkout page
  const quickPickProducts = PRODUCTS.filter((p) => p.isBestseller);

  // Generate real scannable EMVCo PromptPay QR code matching total THB
  useEffect(() => {
    const payload = generatePromptPayPayload(STORE_CONTACT.promptPayId, summary.total);
    QRCode.toDataURL(payload, {
      width: 240,
      margin: 2,
      color: {
        dark: '#0B192C',
        light: '#FFFFFF',
      },
    })
      .then((url) => setQrSvgDataUrl(url))
      .catch(() => setQrSvgDataUrl(''));
  }, [summary.total]);

  const handleCopyAccount = () => {
    navigator.clipboard?.writeText(STORE_CONTACT.bankAccountNumber);
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 1500);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (cart.length === 0) {
      setFormError('กรุณาเพิ่มสินค้าอย่างน้อย 1 รายการก่อนยืนยันคำสั่งซื้อ');
      return;
    }
    if (!customerName.trim() || !customerPhone.trim()) {
      setFormError('กรุณากรอกชื่อ-นามสกุล และเบอร์โทรศัพท์ติดต่อ');
      return;
    }
    if (deliveryMethod === 'shipping' && !address.trim()) {
      setFormError('กรุณากรอกที่อยู่สำหรับจัดส่งทั่วประเทศไทย');
      return;
    }

    const orderId = `GP-${Math.floor(100000 + Math.random() * 900000)}`;
    const newReceipt: OrderReceipt = {
      orderId,
      createdAt: new Date().toLocaleString('th-TH'),
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      deliveryMethod,
      address:
        deliveryMethod === 'pickup'
          ? STORE_CONTACT.locationTh
          : address.trim(),
      paymentMethod,
      items: [...cart],
      subtotal: summary.subtotal,
      bundleDiscount: summary.bundleDiscount,
      shippingFee: summary.shippingFee,
      total: summary.total,
      freeGiftName: summary.freeGiftName,
    };

    setReceipt(newReceipt);
    onClearCart();
  };

  if (receipt) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-[#D6B45A] bg-[#152A42] p-7 sm:p-10">
          <div className="flex items-center gap-3 text-[#00E5FF]">
            <CheckCircle2 className="h-8 w-8 shrink-0" />
            <div>
              <p className="text-xs font-semibold text-[#D6B45A]">ORDER CONFIRMED</p>
              <h1 className="font-display text-2xl font-bold text-white">
                ยืนยันคำสั่งซื้อเรียบร้อย #{receipt.orderId}
              </h1>
            </div>
          </div>

          <p className="mt-4 text-sm text-[#CBD5E1]">
            ขอบคุณคุณ <strong className="text-white">{receipt.customerName}</strong> ที่สั่งซื้อกับ{' '}
            <strong className="text-[#D6B45A]">GEAR PRO STORE</strong> ทีมงานจะตรวจสอบยอดชำระและแจ้งเลขพัสดุหรือนัดรับสินค้าทางโทรศัพท์{' '}
            <span className="font-mono-num text-white">{receipt.customerPhone}</span>
          </p>

          <div className="mt-6 space-y-2 rounded-lg border border-[#D6B45A]/45 bg-[#0B192C] p-5 text-sm">
            <div className="flex justify-between">
              <span className="text-[#CBD5E1]">วัน-เวลาสั่งซื้อ</span>
              <span className="font-mono-num text-white">{receipt.createdAt}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-[#CBD5E1]">การจัดส่ง</span>
              <span className="text-right text-white">
                {receipt.deliveryMethod === 'pickup'
                  ? `รับฟรีที่โรงเรียน (${receipt.address})`
                  : `จัดส่งพัสดุทั่วไทย (${receipt.address})`}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#CBD5E1]">วิธีชำระเงิน</span>
              <span className="text-white">
                {receipt.paymentMethod === 'promptpay' ? 'PromptPay QR Code' : 'โอนผ่านธนาคารกสิกรไทย'}
              </span>
            </div>
          </div>

          <div className="mt-6 border-t border-white/10 pt-5">
            <h2 className="text-sm font-bold text-[#D6B45A]">รายการสินค้าในคำสั่งซื้อ</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {receipt.items.map((item) => (
                <li key={item.product.id} className="flex justify-between text-white">
                  <span>
                    {item.product.name} × {item.quantity}
                  </span>
                  <span className="font-mono-num">
                    ฿{formatThb(item.product.price * item.quantity)}
                  </span>
                </li>
              ))}
              {receipt.freeGiftName && (
                <li className="flex justify-between text-[#00E5FF]">
                  <span>{receipt.freeGiftName}</span>
                  <span className="font-mono-num">ฟรี</span>
                </li>
              )}
            </ul>

            <div className="mt-4 space-y-1.5 border-t border-white/10 pt-4 text-sm">
              {receipt.bundleDiscount > 0 && (
                <div className="flex justify-between text-[#00E5FF]">
                  <span>ส่วนลด Bundle 15%</span>
                  <span className="font-mono-num">-฿{formatThb(receipt.bundleDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#CBD5E1]">
                <span>ค่าจัดส่ง</span>
                <span className="font-mono-num">
                  {receipt.shippingFee === 0 ? 'ฟรี' : `฿${formatThb(receipt.shippingFee)}`}
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold text-white">
                <span>ยอดสุทธิที่ชำระ</span>
                <span className="font-mono-num text-[#D6B45A]">฿{formatThb(receipt.total)}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                setReceipt(null);
                onNavigate(PageId.Catalog);
              }}
              className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-[#D6B45A] bg-gradient-to-r from-[#2196F3] to-[#D946EF] px-6 py-2.5 text-sm font-semibold text-white hover:brightness-110"
            >
              กลับไปหน้าสินค้าทั้งหมด
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
      {/* Checkout Header matching Brand & Theme */}
      <div className="flex flex-col justify-between gap-4 rounded-xl border border-[#D6B45A] bg-[#152A42] p-6 sm:flex-row sm:items-center sm:p-8">
        <div className="flex items-center gap-4">
          <img
            src={STORE_ASSETS.logo}
            alt="GEAR PRO STORE"
            referrerPolicy="no-referrer"
            className="h-20 w-20 shrink-0 rounded-xl border-2 border-[#D6B45A] object-cover"
          />
          <div>
            <p className="text-xs font-semibold tracking-wider text-[#D6B45A]">
              CHECKOUT &amp; ORDER SUMMARY · หน้าคำสั่งซื้อ
            </p>
            <h1 className="mt-1 font-display text-2xl font-bold text-white sm:text-3xl">
              สรุปรายการสั่งซื้อและชำระเงิน
            </h1>
          </div>
        </div>
        <div className="text-xs text-[#CBD5E1] sm:text-right">
          <p className="font-semibold text-white">{STORE_CONTACT.cutoffTh}</p>
          <p className="mt-0.5">{STORE_CONTACT.locationTh}</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column: Catalog Summary, Terms & Customer Form */}
        <div className="space-y-6 lg:col-span-7">
          {/* Accessory Order List */}
          <section className="rounded-xl border border-[#D6B45A] bg-[#152A42] p-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-[#D6B45A]" />
                <h2 className="font-display text-lg font-bold text-white">
                  รายการอุปกรณ์ในคำสั่งซื้อ ({summary.totalItems} ชิ้น)
                </h2>
              </div>
              <button
                type="button"
                onClick={() => onNavigate(PageId.Catalog)}
                className="text-xs font-semibold text-[#00E5FF] hover:underline"
              >
                + เลือกสินค้าเพิ่ม
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="py-8 text-center">
                <p className="text-sm font-medium text-white">ตะกร้าสินค้าของคุณยังว่างอยู่</p>
                <p className="mt-1 text-xs text-[#CBD5E1]">
                  กดเพิ่มอุปกรณ์ขายดีด้านล่าง หรือเลือกชมสินค้าทั้ง 40 รุ่น
                </p>

                <div className="mt-5 grid grid-cols-1 gap-2.5 text-left sm:grid-cols-2">
                  {quickPickProducts.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onAddToCart(item, 1)}
                      className="flex items-center justify-between gap-3 rounded-lg border border-[#D6B45A]/50 bg-[#0B192C] px-3.5 py-2.5 text-xs hover:border-[#00E5FF]"
                    >
                      <span className="truncate font-medium text-white">{item.name}</span>
                      <span className="font-mono-num shrink-0 font-bold text-[#D6B45A]">
                        + ฿{formatThb(item.price)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mt-4 space-y-3">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-white/10 bg-[#0B192C]/75 p-3.5"
                  >
                    <div className="flex min-w-0 flex-1 items-center gap-3">
                      <div className="h-14 w-16 shrink-0 overflow-hidden rounded border border-[#D6B45A]/40">
                        <ProductVisual
                          src={item.product.image}
                          alt={item.product.name}
                          category={item.product.category}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-white">
                          {item.product.name}
                        </p>
                        <p className="font-mono-num mt-0.5 text-xs text-[#CBD5E1]">
                          ราคาต่อชิ้น ฿{formatThb(item.product.price)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center rounded border border-[#D6B45A]/45 bg-[#152A42]">
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.product.id, -1)}
                          aria-label="ลดจำนวน"
                          className="inline-flex h-8 w-8 items-center justify-center text-[#CBD5E1] hover:text-white"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="font-mono-num w-7 text-center text-xs font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.product.id, 1)}
                          aria-label="เพิ่มจำนวน"
                          className="inline-flex h-8 w-8 items-center justify-center text-[#CBD5E1] hover:text-white"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="font-mono-num min-w-[4.5rem] text-right text-sm font-bold text-[#D6B45A]">
                        ฿{formatThb(item.product.price * item.quantity)}
                      </span>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.product.id)}
                        aria-label={`ลบ ${item.product.name}`}
                        className="p-1 text-[#CBD5E1] hover:text-[#D946EF]"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Terms & Delivery */}
          <section className="rounded-xl border border-[#D6B45A] bg-[#152A42] p-6">
            <h2 className="font-display text-lg font-bold text-white">
              เงื่อนไขการจัดส่งและพื้นที่ให้บริการ (Terms &amp; Delivery)
            </h2>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-white/10 bg-[#0B192C]/70 p-3.5">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#D6B45A]">
                  <Truck className="h-4 w-4" />
                  <span>ค่าจัดส่งมาตรฐาน</span>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-[#CBD5E1]">
                  เหมาจ่าย <strong className="text-white">50 บาท</strong> ทั่วประเทศไทย
                  (ส่งฟรีเมื่อยอดซื้อครบ 2,500 บาท)
                </p>
              </div>

              <div className="rounded-lg border border-white/10 bg-[#0B192C]/70 p-3.5">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#00E5FF]">
                  <MapPin className="h-4 w-4" />
                  <span>พื้นที่รับสินค้าฟรี</span>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-[#CBD5E1]">
                  รับสินค้าฟรีด้วยตนเองที่{' '}
                  <strong className="text-white">วิทยาลัยอาชีวศึกษาเอเซีย</strong> (ร้านอยู่ภายในโรงเรียน)
                </p>
              </div>

              <div className="rounded-lg border border-white/10 bg-[#0B192C]/70 p-3.5">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#D946EF]">
                  <Clock className="h-4 w-4" />
                  <span>เวลาตัดรอบจัดส่ง</span>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-[#CBD5E1]">
                  ตัดรอบจัดส่งทุกวันเวลา <strong className="text-white">15:00 น.</strong>{' '}
                  แจ้งโอนก่อน 15:00 น. ส่งออกภายในวันเดียว
                </p>
              </div>
            </div>

            {/* Checkout Form */}
            <form id="checkout-form" onSubmit={handlePlaceOrder} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#D6B45A]">
                  เลือกรูปแบบการรับสินค้า
                </label>
                <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('shipping')}
                    className={`flex items-center justify-between rounded-lg border px-4 py-3 text-left text-xs transition-all ${
                      deliveryMethod === 'shipping'
                        ? 'border-[#00E5FF] bg-[#0B192C] text-white'
                        : 'border-white/15 bg-[#0B192C]/50 text-[#CBD5E1]'
                    }`}
                  >
                    <div>
                      <p className="font-semibold">จัดส่งด่วนทั่วประเทศไทย</p>
                      <p className="mt-0.5 text-[11px] opacity-80">Flash / Kerry · ตัดรอบ 15:00 น.</p>
                    </div>
                    <span className="font-mono-num font-bold text-[#D6B45A]">
                      {summary.afterDiscountSubtotal >= 2500 ? 'ฟรี' : '฿50'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('pickup')}
                    className={`flex items-center justify-between rounded-lg border px-4 py-3 text-left text-xs transition-all ${
                      deliveryMethod === 'pickup'
                        ? 'border-[#00E5FF] bg-[#0B192C] text-white'
                        : 'border-white/15 bg-[#0B192C]/50 text-[#CBD5E1]'
                    }`}
                  >
                    <div>
                      <p className="font-semibold">รับหน้าร้านฟรีที่โรงเรียน</p>
                      <p className="mt-0.5 text-[11px] opacity-80">วิทยาลัยอาชีวศึกษาเอเซีย</p>
                    </div>
                    <span className="font-mono-num font-bold text-[#00E5FF]">ฟรี ฿0</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="cust-name" className="block text-xs font-medium text-[#CBD5E1]">
                    ชื่อ-นามสกุลผู้รับ *
                  </label>
                  <input
                    id="cust-name"
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="เช่น นายสมชาย ใจดี"
                    className="mt-1.5 h-11 w-full rounded-lg border border-[#D6B45A]/50 bg-[#0B192C] px-3.5 text-sm text-white placeholder-[#CBD5E1]/50 focus:border-[#00E5FF] focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="cust-phone" className="block text-xs font-medium text-[#CBD5E1]">
                    เบอร์โทรศัพท์ติดต่อ *
                  </label>
                  <input
                    id="cust-phone"
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="08X-XXX-XXXX"
                    className="font-mono-num mt-1.5 h-11 w-full rounded-lg border border-[#D6B45A]/50 bg-[#0B192C] px-3.5 text-sm text-white placeholder-[#CBD5E1]/50 focus:border-[#00E5FF] focus:outline-none"
                  />
                </div>
              </div>

              {deliveryMethod === 'shipping' && (
                <div>
                  <label htmlFor="cust-address" className="block text-xs font-medium text-[#CBD5E1]">
                    ที่อยู่จัดส่ง (บ้านเลขที่ ถนน แขวง/ตำบล เขต/อำเภอ จังหวัด รหัสไปรษณีย์) *
                  </label>
                  <textarea
                    id="cust-address"
                    rows={3}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="กรอกที่อยู่สำหรับการจัดส่งพัสดุ..."
                    className="mt-1.5 w-full rounded-lg border border-[#D6B45A]/50 bg-[#0B192C] p-3.5 text-sm text-white placeholder-[#CBD5E1]/50 focus:border-[#00E5FF] focus:outline-none"
                  />
                </div>
              )}

              {formError && (
                <p role="alert" className="rounded-lg border border-[#D946EF] bg-[#D946EF]/15 px-4 py-2.5 text-xs font-medium text-white">
                  {formError}
                </p>
              )}
            </form>
          </section>
        </div>

        {/* Right Column: Price Summary, PromptPay QR, Bank Transfer & Direct Contact */}
        <div className="space-y-6 lg:col-span-5">
          {/* Payment & Total Module */}
          <section className="rounded-xl border border-[#D6B45A] bg-[#152A42] p-6">
            <h2 className="font-display text-lg font-bold text-white">
              สรุปยอดและช่องทางชำระเงิน
            </h2>

            <div className="mt-4 space-y-2.5 border-b border-white/10 pb-4 text-sm">
              <div className="flex justify-between text-[#CBD5E1]">
                <span>ราคาสินค้า ({summary.totalItems} ชิ้น)</span>
                <span className="font-mono-num">฿{formatThb(summary.subtotal)}</span>
              </div>

              {summary.bundleDiscount > 0 && (
                <div className="flex justify-between text-[#00E5FF]">
                  <span>ส่วนลด Bundle 15% ({summary.bundleCount} ชุด)</span>
                  <span className="font-mono-num">-฿{formatThb(summary.bundleDiscount)}</span>
                </div>
              )}

              {summary.freeGiftName && (
                <div className="flex items-start justify-between gap-2 text-xs text-[#00E5FF]">
                  <span className="flex items-center gap-1.5">
                    <Gift className="h-3.5 w-3.5 shrink-0" />
                    {summary.freeGiftName}
                  </span>
                  <span className="font-mono-num shrink-0 font-semibold">ฟรี</span>
                </div>
              )}

              <div className="flex justify-between text-[#CBD5E1]">
                <span>
                  ค่าจัดส่ง ({deliveryMethod === 'pickup' ? 'รับที่โรงเรียน' : 'จัดส่งทั่วไทย'})
                </span>
                <span className="font-mono-num">
                  {summary.shippingFee === 0 ? 'ฟรี' : `฿${formatThb(summary.shippingFee)}`}
                </span>
              </div>

              <div className="flex justify-between pt-2 text-lg font-bold text-white">
                <span>ยอดชำระสุทธิ</span>
                <span className="font-mono-num text-2xl text-[#D6B45A]">
                  ฿{formatThb(summary.total)}
                </span>
              </div>
            </div>

            {/* Payment Method Tabs */}
            <div className="mt-5 grid grid-cols-2 gap-2 rounded-lg border border-white/10 bg-[#0B192C] p-1">
              <button
                type="button"
                onClick={() => setPaymentMethod('promptpay')}
                className={`flex min-h-[38px] items-center justify-center gap-1.5 rounded-md text-xs font-semibold transition-colors ${
                  paymentMethod === 'promptpay'
                    ? 'bg-[#152A42] text-[#D6B45A] border border-[#D6B45A]/60'
                    : 'text-[#CBD5E1] hover:text-white'
                }`}
              >
                <QrCode className="h-4 w-4" />
                <span>PromptPay QR</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('bank-transfer')}
                className={`flex min-h-[38px] items-center justify-center gap-1.5 rounded-md text-xs font-semibold transition-colors ${
                  paymentMethod === 'bank-transfer'
                    ? 'bg-[#152A42] text-[#D6B45A] border border-[#D6B45A]/60'
                    : 'text-[#CBD5E1] hover:text-white'
                }`}
              >
                <CreditCard className="h-4 w-4" />
                <span>โอนบัญชีธนาคาร</span>
              </button>
            </div>

            {/* PromptPay QR Code Card */}
            {paymentMethod === 'promptpay' ? (
              <div className="mt-4 flex flex-col items-center rounded-xl border border-[#D6B45A]/50 bg-white p-5 text-center text-[#0B192C]">
                <div className="w-full rounded-md bg-[#113F67] py-1.5 text-xs font-bold tracking-wider text-white">
                  THAI QR PAYMENT · PROMPTPAY
                </div>
                {qrSvgDataUrl ? (
                  <img
                    src={qrSvgDataUrl}
                    alt="PromptPay QR Code สำหรับชำระเงิน GEAR PRO STORE"
                    className="mt-3 h-44 w-44"
                  />
                ) : (
                  <div className="mt-3 flex h-44 w-44 items-center justify-center border border-slate-200 text-xs text-slate-500">
                    กำลังสร้าง QR...
                  </div>
                )}
                <p className="mt-2 text-xs font-bold text-[#0B192C]">
                  {STORE_CONTACT.bankAccountName}
                </p>
                <p className="font-mono-num text-xs text-slate-600">
                  PromptPay ID: {STORE_CONTACT.promptPayDisplay}
                </p>
                <p className="font-mono-num mt-1 text-sm font-bold text-[#113F67]">
                  ยอดชำระ ฿{formatThb(summary.total)}
                </p>
              </div>
            ) : (
              <div className="mt-4 rounded-xl border border-[#D6B45A]/50 bg-[#0B192C] p-5">
                <p className="text-xs font-semibold text-[#D6B45A]">{STORE_CONTACT.bankName}</p>
                <p className="mt-1 text-sm font-semibold text-white">
                  {STORE_CONTACT.bankAccountName}
                </p>
                <div className="mt-3 flex items-center justify-between rounded-lg border border-white/10 bg-[#152A42] px-3.5 py-2.5">
                  <span className="font-mono-num text-base font-bold text-[#00E5FF]">
                    {STORE_CONTACT.bankAccountNumber}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyAccount}
                    className="inline-flex items-center gap-1 rounded border border-[#D6B45A]/60 px-2.5 py-1 text-xs font-semibold text-[#D6B45A] hover:bg-[#0B192C]"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    <span>{copiedBank ? 'คัดลอกแล้ว' : 'คัดลอกเลขบัญชี'}</span>
                  </button>
                </div>
              </div>
            )}

            <button
              type="submit"
              form="checkout-form"
              className="mt-5 inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-lg border border-[#D6B45A] bg-gradient-to-r from-[#2196F3] to-[#D946EF] px-6 py-3 text-sm font-bold text-white transition-all hover:brightness-110"
            >
              <span>ยืนยันคำสั่งซื้อ (฿{formatThb(summary.total)})</span>
            </button>
          </section>

          {/* Direct Contact Links */}
          <section className="rounded-xl border border-[#D6B45A]/70 bg-[#152A42] p-6">
            <h3 className="font-display text-base font-bold text-white">
              แจ้งสลิปและสอบถามสถานะคำสั่งซื้อโดยตรง
            </h3>
            <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              <a
                href="tel:0894567890"
                className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-[#0B192C] px-3.5 py-2.5 text-xs text-white hover:border-[#00E5FF]"
              >
                <Phone className="h-4 w-4 text-[#00E5FF]" />
                <span className="font-mono-num">089-456-7890</span>
              </a>
              <button
                type="button"
                onClick={() => onNavigate(PageId.Contact)}
                className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-[#0B192C] px-3.5 py-2.5 text-left text-xs text-white hover:border-[#D6B45A]"
              >
                <MessageCircle className="h-4 w-4 text-[#D6B45A]" />
                <span>LINE OA: {STORE_CONTACT.lineOa}</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate(PageId.Contact)}
                className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-[#0B192C] px-3.5 py-2.5 text-left text-xs text-white hover:border-[#2196F3]"
              >
                <span className="font-bold text-[#2196F3]">FB</span>
                <span>{STORE_CONTACT.facebook}</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate(PageId.Contact)}
                className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-[#0B192C] px-3.5 py-2.5 text-left text-xs text-white hover:border-[#D946EF]"
              >
                <span className="font-bold text-[#D946EF]">IG</span>
                <span>{STORE_CONTACT.instagram}</span>
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
