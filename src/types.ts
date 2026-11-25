export enum PageId {
  Home = 'home',
  Catalog = 'catalog',
  CategoriesBrands = 'categories-brands',
  Promotions = 'promotions',
  Checkout = 'checkout',
  Contact = 'contact',
}

export enum CategoryId {
  All = 'all',
  MiceAndPads = 'mice-pads',
  KeyboardsAndCaps = 'keyboards-caps',
  AudioAndMics = 'audio-mics',
  DeskAndCables = 'desk-cables',
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: Exclude<CategoryId, CategoryId.All>;
  categoryLabelTh: string;
  categoryLabelEn: string;
  price: number;
  connectivity: string;
  specs: string[];
  descriptionTh: string;
  warranty: string;
  boxContents: string;
  image: string;
  isWirelessHeadset?: boolean;
  isBestseller?: boolean;
}

export interface BestsellerFeature {
  productId: string;
  rank: number;
  taglineTh: string;
  block1Highlight: string;
  block2Specs: { label: string; value: string }[];
  block3UseCase: string;
  block3BoxIncluded: string;
}

export interface PromotionCampaign {
  id: string;
  titleTh: string;
  titleEn: string;
  validityText: string;
  descriptionTh: string;
  highlightMetric: string;
  ctaLabel: string;
  actionType: 'add-bundle' | 'view-catalog' | 'filter-headsets';
}

export interface FestiveDateEvent {
  id: string;
  nameTh: string;
  nameEn: string;
  dateLabel: string;
  dealTitleTh: string;
  dealDetailTh: string;
  featuredCategory: Exclude<CategoryId, CategoryId.All>;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface TeamMember {
  id: string;
  nameTh: string;
  roleTh: string;
  roleEn: string;
  department: string;
  bioTh: string;
  specialty: string;
}

export interface OrderReceipt {
  orderId: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  deliveryMethod: 'shipping' | 'pickup';
  address: string;
  paymentMethod: 'promptpay' | 'bank-transfer';
  items: CartItem[];
  subtotal: number;
  bundleDiscount: number;
  shippingFee: number;
  total: number;
  freeGiftName: string | null;
}
