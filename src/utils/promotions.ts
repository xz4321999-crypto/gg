import { CartItem } from '../types';

export interface CartSummary {
  subtotal: number;
  bundleCount: number;
  bundleDiscount: number;
  hasWirelessHeadset: boolean;
  freeGiftName: string | null;
  afterDiscountSubtotal: number;
  shippingFee: number;
  freeShippingRemaining: number;
  total: number;
  totalItems: number;
}

export function calculateCartSummary(
  cart: CartItem[],
  deliveryMethod: 'shipping' | 'pickup'
): CartSummary {
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Promo 1: Logitech G PRO X SUPERLIGHT 2 + Keychron K2 Max Bundle -> 15% off paired units
  const mouseItem = cart.find((i) => i.product.id === 'logitech-g-pro-x-superlight-2');
  const keyboardItem = cart.find((i) => i.product.id === 'keychron-k2-max');
  const bundleCount =
    mouseItem && keyboardItem ? Math.min(mouseItem.quantity, keyboardItem.quantity) : 0;
  const bundleUnitPrice =
    (mouseItem?.product.price ?? 0) + (keyboardItem?.product.price ?? 0);
  const bundleDiscount = Math.round(bundleCount * bundleUnitPrice * 0.15);

  // Promo 3: Free SteelSeries QcK Mousepad when buying any wireless headset
  const hasWirelessHeadset = cart.some(
    (item) => item.product.isWirelessHeadset && item.quantity > 0
  );
  const freeGiftName = hasWirelessHeadset
    ? 'SteelSeries QcK Gaming Mousepad (แถมฟรีจากโปรหูฟังไร้สาย)'
    : null;

  const afterDiscountSubtotal = Math.max(0, subtotal - bundleDiscount);

  // Promo 2 / Delivery terms: 50 THB flat nationwide, free over 2,500 THB or free pickup at school
  const shippingFee =
    totalItems === 0
      ? 0
      : deliveryMethod === 'pickup' || afterDiscountSubtotal >= 2500
      ? 0
      : 50;

  const freeShippingRemaining = Math.max(0, 2500 - afterDiscountSubtotal);
  const total = afterDiscountSubtotal + shippingFee;

  return {
    subtotal,
    bundleCount,
    bundleDiscount,
    hasWirelessHeadset,
    freeGiftName,
    afterDiscountSubtotal,
    shippingFee,
    freeShippingRemaining,
    total,
    totalItems,
  };
}

export function formatThb(amount: number): string {
  return new Intl.NumberFormat('th-TH', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// CRC16-CCITT (0xFFFF) for EMVCo Thai PromptPay QR payload
function crc16(payload: string): string {
  let crc = 0xffff;
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = ((crc << 1) ^ 0x1021) & 0xffff;
      } else {
        crc = (crc << 1) & 0xffff;
      }
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, '0');
}

function tlv(tag: string, value: string): string {
  const len = value.length.toString().padStart(2, '0');
  return `${tag}${len}${value}`;
}

export function generatePromptPayPayload(mobileNumber: string, amountThb: number): string {
  const cleaned = mobileNumber.replace(/[^0-9]/g, '');
  const formattedMobile = cleaned.startsWith('0')
    ? `0066${cleaned.slice(1)}`
    : cleaned.startsWith('66')
    ? `00${cleaned}`
    : cleaned;

  const merchantAccount =
    tlv('00', 'A000000677010111') + tlv('01', formattedMobile);

  let payload =
    tlv('00', '01') +
    tlv('01', amountThb > 0 ? '12' : '11') +
    tlv('29', merchantAccount) +
    tlv('53', '764') +
    tlv('58', 'TH');

  if (amountThb > 0) {
    payload += tlv('54', amountThb.toFixed(2));
  }

  payload += '6304';
  return payload + crc16(payload);
}
