import {
  BestsellerFeature,
  CategoryId,
  FestiveDateEvent,
  Product,
  PromotionCampaign,
  TeamMember,
} from '../types';
import { AUDIO_AND_MICS_PRODUCTS } from './products/audioAndMics';
import { DESK_AND_CABLES_PRODUCTS } from './products/deskAndCables';
import { KEYBOARDS_AND_CAPS_PRODUCTS } from './products/keyboardsAndCaps';
import { MICE_AND_PADS_PRODUCTS } from './products/miceAndPads';
import logoImg from '../assets/store/logo.jpg';
import heroImg from '../assets/store/hero.jpg';
import micePadsImg from '../assets/store/cat-mice-pads.jpg';
import keyboardsCapsImg from '../assets/store/cat-keyboards-caps.jpg';
import headsetsAudioImg from '../assets/store/cat-headsets-audio.jpg';
import deskSetupHubsImg from '../assets/store/cat-desk-hubs.jpg';
import storefrontImg from '../assets/store/storefront.jpg';
import setupLightbarImg from '../assets/store/setup-lightbar.jpg';
import setupStreamdeckImg from '../assets/store/setup-streamdeck.jpg';

export const STORE_ASSETS = {
  logo: logoImg,
  hero: heroImg,
  micePads: micePadsImg,
  keyboardsCaps: keyboardsCapsImg,
  headsetsAudio: headsetsAudioImg,
  deskSetupHubs: deskSetupHubsImg,
  storefront: storefrontImg,
  setupLightbar: setupLightbarImg,
  setupStreamdeck: setupStreamdeckImg,
};

export const PRODUCTS: Product[] = [
  ...MICE_AND_PADS_PRODUCTS,
  ...KEYBOARDS_AND_CAPS_PRODUCTS,
  ...AUDIO_AND_MICS_PRODUCTS,
  ...DESK_AND_CABLES_PRODUCTS,
];

export const CATEGORIES: {
  id: CategoryId;
  labelTh: string;
  labelEn: string;
  count: number;
}[] = [
  {
    id: CategoryId.All,
    labelTh: 'ทั้งหมด',
    labelEn: 'All Products',
    count: PRODUCTS.length,
  },
  {
    id: CategoryId.MiceAndPads,
    labelTh: 'เมาส์และแผ่นรองเมาส์',
    labelEn: 'Mice & Mousepads',
    count: MICE_AND_PADS_PRODUCTS.length,
  },
  {
    id: CategoryId.KeyboardsAndCaps,
    labelTh: 'คีย์บอร์ดและปุ่มกด',
    labelEn: 'Keyboards & Keycaps',
    count: KEYBOARDS_AND_CAPS_PRODUCTS.length,
  },
  {
    id: CategoryId.AudioAndMics,
    labelTh: 'หูฟัง ลำโพง และไมโครโฟน',
    labelEn: 'Headsets, Speakers & Mics',
    count: AUDIO_AND_MICS_PRODUCTS.length,
  },
  {
    id: CategoryId.DeskAndCables,
    labelTh: 'อุปกรณ์จัดโต๊ะคอมและสายเชื่อมต่อ',
    labelEn: 'Desk Setup, Hubs & Cables',
    count: DESK_AND_CABLES_PRODUCTS.length,
  },
];

// 5 Featured Bestsellers — Each has 3 structured content blocks
export const BESTSELLERS: BestsellerFeature[] = [
  {
    productId: 'logitech-g-pro-x-superlight-2',
    rank: 1,
    taglineTh: 'เมาส์ไร้สายอันดับ 1 ของโปรเพลเยอร์ FPS ระดับโลก',
    block1Highlight: 'เบาเพียง 60 กรัม พร้อม Polling Rate 4,000Hz ตอบสนองไวกว่าเดิม 4 เท่า',
    block2Specs: [
      { label: 'Sensor', value: 'HERO 2 (32,000 DPI)' },
      { label: 'Switch', value: 'LIGHTFORCE Hybrid' },
      { label: 'Weight', value: '60 g (Ultra-light)' },
      { label: 'Battery', value: 'สูงสุด 95 ชั่วโมง' },
    ],
    block3UseCase: 'เหมาะสำหรับนักแข่งเกม Valorant, CS2, Apex Legends ที่ต้องการความเร็วและความนิ่งในการสะบัดเมาส์',
    block3BoxIncluded: 'ในกล่องมี LIGHTSPEED Dongle, สายชาร์จ USB-C, Grip Tape แท้ และฝาครอบ PTFE เสริมความลื่น',
  },
  {
    productId: 'keychron-k2-max',
    rank: 2,
    taglineTh: 'คีย์บอร์ดไร้สาย 75% สุดยอดความคุ้มค่าสำหรับงานและเกม',
    block1Highlight: 'รองรับการเชื่อมต่อ 2.4GHz 1000Hz พร้อมโปรแกรม QMK/VIA ปรับปุ่มอิสระ',
    block2Specs: [
      { label: 'Layout', value: '75% Compact (84 Keys)' },
      { label: 'Polling', value: '1000Hz (2.4GHz / Wired)' },
      { label: 'Keycaps', value: 'Double-Shot PBT' },
      { label: 'Mounting', value: 'Acoustic + IXPE Foam' },
    ],
    block3UseCase: 'เหมาะทั้งสายเขียนโค้ด ทำงานข้าม OS (Mac/Win) และเล่นเกมด้วยสัญญาณไร้สายความหน่วงต่ำ',
    block3BoxIncluded: 'ในกล่องมี 2.4GHz Receiver, สายถัก USB-C, ตัวถอดคีย์แคป/สวิตช์ และปุ่ม Windows/macOS ครบชุด',
  },
  {
    productId: 'hyperx-cloud-iii-wired',
    rank: 3,
    taglineTh: 'หูฟังเกมมิ่งที่ใส่สบายที่สุด พร้อมเสียงฝีเท้าแม่นยำ',
    block1Highlight: 'Memory Foam นุ่มกระชับหู ไมโครโฟน 10 มม. ตัดเสียงรบกวนพร้อมไฟ LED แจ้งเตือน Mute',
    block2Specs: [
      { label: 'Drivers', value: '53mm Angled Dynamic' },
      { label: 'Audio', value: 'DTS Headphone:X Spatial' },
      { label: 'Mic', value: '10mm Noise-Cancelling' },
      { label: 'Ports', value: '3.5mm / USB-C / USB-A' },
    ],
    block3UseCase: 'เหมาะสำหรับการเล่นเกมต่อเนื่องหลายชั่วโมง เรียนออนไลน์ และประชุมงานโดยไม่บีบศีรษะ',
    block3BoxIncluded: 'ในกล่องมีไมโครโฟนถอดได้, อะแดปเตอร์ USB-C และหัวแปลง USB-A ใช้งานได้ทุกอุปกรณ์',
  },
  {
    productId: 'benq-screenbar-halo-2',
    rank: 4,
    taglineTh: 'โคมไฟติดหน้าจอถนอมสายตา พร้อมไฟ Ambient ด้านหลัง',
    block1Highlight: 'ระบบส่องสว่างแบบ Asymmetric สว่างทั่วโต๊ะทำงานแต่ไม่สะท้อนเข้าหน้าจอแม้แต่นิดเดียว',
    block2Specs: [
      { label: 'Color CRI', value: 'Ra > 95 True Color' },
      { label: 'Control', value: 'Wireless Rotary Puck' },
      { label: 'Lighting', value: 'Front + Back Ambient' },
      { label: 'Range', value: '2700K – 6500K Stepless' },
    ],
    block3UseCase: 'เหมาะสำหรับนักศึกษา นักออกแบบ และโปรแกรมเมอร์ที่ทำงานหรือเล่นเกมในห้องแสงน้อยช่วงกลางคืน',
    block3BoxIncluded: 'ในกล่องมีไฟ ScreenBar Halo 2, รีโมทหมุนไร้สาย, ตัวหนีบจอปกติและจอโค้ง',
  },
  {
    productId: 'elgato-stream-deck-mk2',
    rank: 5,
    taglineTh: 'แผงควบคุมอัจฉริยะ 15 ปุ่ม LCD ยกระดับความเร็วทุกเวิร์กโฟลว์',
    block1Highlight: 'ปรับแต่งไอคอนและคำสั่งได้ไม่จำกัด ทั้งงานสตรีมมิ่ง ตัดต่อวิดีโอ และคีย์ลัดประจำวัน',
    block2Specs: [
      { label: 'Keys', value: '15 Customizable LCD Keys' },
      { label: 'Interface', value: 'Detachable USB-C' },
      { label: 'Ecosystem', value: 'OBS / Discord / Adobe' },
      { label: 'Stand', value: '45° Weighted Stand' },
    ],
    block3UseCase: 'เหมาะสำหรับสตรีมเมอร์ ครีเอเตอร์ และสาย Productivity ที่ต้องการสั่งงานหลายโปรแกรมในคลิกเดียว',
    block3BoxIncluded: 'ในกล่องมี Stream Deck MK.2, ขาตั้งตั้งโต๊ะ 45 องศา และสาย USB-C to USB-A',
  },
];

export const PROMOTIONS: PromotionCampaign[] = [
  {
    id: 'promo-bundle-15',
    titleTh: 'จับคู่ Pro Esports ลดทันที 15%',
    titleEn: 'Logitech G PRO X SUPERLIGHT 2 + Keychron K2 Max Bundle',
    validityText: '1 – 30 พฤศจิกายน 2026 (1 - 30 Nov 2026)',
    descriptionTh:
      'ซื้อเมาส์ไร้สาย Logitech G PRO X SUPERLIGHT 2 (5,490.-) คู่กับคีย์บอร์ด Keychron K2 Max (4,290.-) รับส่วนลดทันที 15% เหลือเพียง 8,313 บาท (ประหยัดทันที 1,467 บาท)',
    highlightMetric: 'ลดทันที 15% (ประหยัด 1,467.-)',
    ctaLabel: 'เพิ่มชุดโปรโมชั่นลงตะกร้า',
    actionType: 'add-bundle',
  },
  {
    id: 'promo-free-shipping',
    titleTh: 'ส่งฟรีทั่วประเทศไทย เมื่อช้อปครบ 2,500 บาท',
    titleEn: 'Free Nationwide Shipping Over 2,500 THB',
    validityText: '1 – 31 ธันวาคม 2026 (1 - 31 Dec 2026)',
    descriptionTh:
      'สั่งซื้ออุปกรณ์คอมพิวเตอร์และเกมมิ่งเกียร์ชิ้นใดก็ได้ในร้าน ยอดสุทธิตั้งแต่ 2,500 บาทขึ้นไป รับสิทธิ์จัดส่งด่วนทั่วไทยฟรี (ปกติ 50 บาท) ตัดรอบส่งทุกวันเวลา 15:00 น.',
    highlightMetric: 'ฟรีค่าจัดส่ง 50.- ทั่วไทย',
    ctaLabel: 'เลือกช้อปสินค้าเลย',
    actionType: 'view-catalog',
  },
  {
    id: 'promo-free-qck',
    titleTh: 'แถมฟรี! แผ่นรองเมาส์ SteelSeries QcK เมื่อซื้อหูฟังไร้สาย',
    titleEn: 'Free SteelSeries QcK Mousepad with Any Wireless Headset',
    validityText: '1 – 15 มกราคม 2027 (1 - 15 Jan 2027)',
    descriptionTh:
      'เพียงสั่งซื้อหูฟังไร้สายรุ่นใดก็ได้ภายในร้านกว่า 20 รุ่น (เช่น HyperX Cloud III Wireless, Logitech G Pro X 2, Razer BlackShark V2 Pro, Arctis Nova Pro หรือ JBL Quantum 910) รับฟรีแผ่นรองเมาส์ SteelSeries QcK ทันที',
    highlightMetric: 'รับฟรี SteelSeries QcK',
    ctaLabel: 'ดูหูฟังไร้สายที่ร่วมรายการ',
    actionType: 'filter-headsets',
  },
];

export const FESTIVE_CALENDAR: FestiveDateEvent[] = [
  {
    id: 'loy-krathong',
    nameTh: 'วันลอยกระทง',
    nameEn: 'Loy Krathong',
    dateLabel: 'พฤศจิกายน 2026',
    dealTitleTh: 'โปรคู่ไฟ RGB แต่งโต๊ะยามค่ำคืน',
    dealDetailTh: 'ลด 10% เมื่อซื้อโคมไฟหน้าจอ BenQ หรือ Xiaomi คู่กับคีย์บอร์ดไฟ RGB รุ่นใดก็ได้',
    featuredCategory: CategoryId.DeskAndCables,
  },
  {
    id: 'fathers-day',
    nameTh: 'วันพ่อแห่งชาติ',
    nameEn: "Father's Day",
    dateLabel: '5 ธันวาคม 2026',
    dealTitleTh: 'Ergonomic Gift เพื่อสุขภาพการทำงาน',
    dealDetailTh: 'Logitech MX Master 3S & MX Keys S รับสิทธิ์ผ่อนหรือรับส่วนลดอุปกรณ์จัดโต๊ะ Ergotron LX',
    featuredCategory: CategoryId.MiceAndPads,
  },
  {
    id: 'christmas',
    nameTh: 'วันคริสต์มาส',
    nameEn: 'Christmas Day',
    dateLabel: '25 ธันวาคม 2026',
    dealTitleTh: 'Christmas Desk Setup Box',
    dealDetailTh: 'ฟรีบริการห่อของขวัญพรีเมียมพร้อมการ์ดอวยพร เมื่อซื้อสินค้าครบ 2,000 บาท',
    featuredCategory: CategoryId.KeyboardsAndCaps,
  },
  {
    id: 'new-years-eve',
    nameTh: 'วันสิ้นปี',
    nameEn: "New Year's Eve",
    dateLabel: '31 ธันวาคม 2026',
    dealTitleTh: 'Countdown Streaming Audio Sale',
    dealDetailTh: 'ไมโครโฟน HyperX QuadCast S และ JBL Quantum Stream Studio แถมสายจัดเก็บสาย USB-C ฟรี',
    featuredCategory: CategoryId.AudioAndMics,
  },
  {
    id: 'new-years-day',
    nameTh: 'วันขึ้นปีใหม่',
    nameEn: "New Year's Day",
    dateLabel: '1 มกราคม 2027',
    dealTitleTh: 'New Gear New Year Upgrade',
    dealDetailTh: 'เริ่มต้นปีใหม่ด้วยหูฟังไร้สายทุกรุ่น รับฟรี SteelSeries QcK Mousepad ทันที',
    featuredCategory: CategoryId.AudioAndMics,
  },
  {
    id: 'childrens-day',
    nameTh: 'วันเด็กแห่งชาติ',
    nameEn: "Children's Day",
    dateLabel: 'มกราคม 2027',
    dealTitleTh: 'Campus Student Special',
    dealDetailTh: 'แสดงบัตรนักศึกษา วิทยาลัยอาชีวศึกษาเอเซีย รับส่วนลดอุปกรณ์สายเกมมิ่งที่หน้าร้านเพิ่ม',
    featuredCategory: CategoryId.MiceAndPads,
  },
  {
    id: 'teachers-day',
    nameTh: 'วันครู',
    nameEn: "Teacher's Day",
    dateLabel: '16 มกราคม 2027',
    dealTitleTh: 'Smart Teaching Hub & Audio Deal',
    dealDetailTh: 'อาจารย์และบุคลากรรับส่วนลด 10% สำหรับ USB-C Hub UGREEN / Anker และลำโพง Creative Pebble',
    featuredCategory: CategoryId.DeskAndCables,
  },
  {
    id: 'chinese-new-year',
    nameTh: 'วันตรุษจีน',
    nameEn: 'Chinese New Year',
    dateLabel: 'กุมภาพันธ์ 2027',
    dealTitleTh: 'อั่งเปาส่วนลดต้อนรับตรุษจีน',
    dealDetailTh: 'ซื้อคีย์บอร์ด Ducky หรือ Akko พร้อมชุดคีย์แคป HyperX Pudding รับส่วนลดพิเศษชุดแต่งคีย์บอร์ด',
    featuredCategory: CategoryId.KeyboardsAndCaps,
  },
  {
    id: 'valentines-day',
    nameTh: 'วันวาเลนไทน์',
    nameEn: "Valentine's Day",
    dateLabel: '14 กุมภาพันธ์ 2027',
    dealTitleTh: 'Duo Gaming Peripherals Couple Set',
    dealDetailTh: 'ซื้อเมาส์หรือหูฟัง 2 ชิ้นคู่กันสำหรับสาย Duo รับส่วนลดที่รองข้อมือ Razer Ergonomic Wrist Rest Pro หรือแผ่นรองเมาส์ SteelSeries QcK ราคาพิเศษ',
    featuredCategory: CategoryId.MiceAndPads,
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'owner',
    nameTh: 'คุณฐิตินันท์ ชูอำไพ',
    roleTh: 'เจ้าของร้าน (Founder & Owner)',
    roleEn: 'Store Owner',
    department: 'ผู้บริหาร',
    bioTh: 'ผู้ก่อตั้ง GEAR PRO STORE ด้วยความตั้งใจคัดสรรอุปกรณ์คอมพิวเตอร์และเกมมิ่งเกียร์ของแท้ 100% เพื่อให้นักศึกษาและคนรักการแต่งโต๊ะคอมเข้าถึงอุปกรณ์คุณภาพสูงได้ง่ายภายในวิทยาลัย',
    specialty: 'คัดเลือกแบรนด์และมาตรฐานสินค้าของแท้',
  },
  {
    id: 'manager',
    nameTh: 'คุณณัชพล อินทะนะ',
    roleTh: 'ผู้จัดการร้าน (Store Manager)',
    roleEn: 'Store Manager',
    department: 'บริหารจัดการหน้าร้านและโปรโมชั่น',
    bioTh: 'ดูแลภาพรวมการดำเนินงาน สต็อกสินค้า การจัดโปรโมชั่นประจำเดือน และการประสานงานทุกฝ่ายเพื่อให้ลูกค้าได้รับบริการรวดเร็วและประทับใจที่สุด',
    specialty: 'วางแผนโปรโมชั่นและดูแลคุณภาพบริการ',
  },
  {
    id: 'staff-sales',
    nameTh: 'คุณณัฐวุฒิ ศรีประเสริฐ',
    roleTh: 'เจ้าหน้าที่ฝ่ายขายออนไลน์และหน้าร้าน',
    roleEn: 'Online & Storefront Sales Specialist',
    department: 'ฝ่ายขายออนไลน์และหน้าร้าน',
    bioTh: 'ให้คำแนะนำการเลือกซื้อเมาส์ตามรูปมือ สวิตช์คีย์บอร์ด และระบบเสียงทั้งหน้าร้านและผ่าน LINE Official Account',
    specialty: 'ให้คำปรึกษาเกมมิ่งเกียร์และการจัดโต๊ะคอม',
  },
  {
    id: 'staff-inventory',
    nameTh: 'คุณกิตติพงศ์ แสงทอง',
    roleTh: 'เจ้าหน้าที่คลังสินค้าและแพ็กพัสดุ',
    roleEn: 'Inventory & Packaging Lead',
    department: 'ฝ่ายคลังสินค้าและแพ็กพัสดุ',
    bioTh: 'ตรวจสอบ Serial Number สินค้าทุกชิ้นก่อนจัดส่ง พร้อมแพ็กกันกระแทกหลายชั้นให้ทันรอบตัดยอด 15:00 น. ทุกวัน',
    specialty: 'ตรวจสอบ QC และแพ็กกิ้งปลอดภัย',
  },
  {
    id: 'staff-support',
    nameTh: 'คุณปภาวรินทร์ จันทร์เพ็ญ',
    roleTh: 'เจ้าหน้าที่บริการลูกค้าและรับประกันสินค้า',
    roleEn: 'Customer Support & Warranty Care',
    department: 'ฝ่ายบริการลูกค้า',
    bioTh: 'ดูแลเรื่องการรับสินค้าหน้าร้านวิทยาลัยอาชีวศึกษาเอเซีย การติดตามเลขพัสดุ และการประสานงานส่งเคลมศูนย์ไทย',
    specialty: 'บริการหลังการขายและประสานงานเคลม',
  },
];

export const STORE_CONTACT = {
  storeName: 'GEAR PRO STORE',
  locationTh: 'วิทยาลัยอาชีวศึกษาเอเซีย (ร้านอยู่ภายในโรงเรียน)',
  hoursTh: 'เปิดบริการทุกวัน จันทร์ – เสาร์ เวลา 08:30 – 17:30 น.',
  cutoffTh: 'ตัดรอบจัดส่งพัสดุทุกวันเวลา 15:00 น.',
  phones: ['02-888-4590 (หน้าร้าน)', '089-456-7890 (ฝ่ายขาย)', '092-345-6789 (บริการหลังการขาย)'],
  email: 'contact@gearprostore.th',
  lineOa: '@gearprostore',
  facebook: 'GEAR PRO STORE Thailand',
  instagram: '@gearprostore.th',
  promptPayId: '0894567890',
  promptPayDisplay: '089-456-7890',
  bankName: 'ธนาคารกสิกรไทย (KBANK)',
  bankAccountName: 'บจก. เกียร์ โปร สโตร์ (GEAR PRO STORE)',
  bankAccountNumber: '148-2-90481-5',
};
