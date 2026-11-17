import React from 'react';
import { ShieldCheck, X } from 'lucide-react';
import { STORE_CONTACT } from '../data/catalog';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#060E1A]/85 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-policy-title"
      onClick={onClose}
    >
      <div
        className="max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-[#D6B45A] bg-[#152A42] p-6 shadow-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#D6B45A]/60 bg-[#0B192C] text-[#D6B45A]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold tracking-wider text-[#D6B45A]">
                PDPA &amp; PRIVACY POLICY
              </p>
              <h2 id="privacy-policy-title" className="font-display text-xl font-bold text-white">
                นโยบายความเป็นส่วนตัว — GEAR PRO STORE
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="ปิดหน้าต่างนโยบายความเป็นส่วนตัว"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-[#0B192C] text-[#CBD5E1] hover:border-[#D6B45A] hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-5 space-y-5 text-sm leading-relaxed text-[#CBD5E1]">
          <div>
            <h3 className="font-display text-base font-bold text-white">
              1. ข้อมูลส่วนบุคคลที่ร้านเก็บรวบรวม
            </h3>
            <p className="mt-1.5">
              GEAR PRO STORE จัดเก็บเฉพาะข้อมูลที่จำเป็นต่อการให้บริการสั่งซื้อสินค้า จัดส่งพัสดุ
              ออกใบเสนอราคา และประสานงานรับประกันศูนย์ไทย ได้แก่ ชื่อ-นามสกุล เบอร์โทรศัพท์ อีเมล
              LINE ID ที่อยู่สำหรับจัดส่ง และรายการสินค้าที่สั่งซื้อ
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-white">
              2. วัตถุประสงค์ในการนำข้อมูลไปใช้
            </h3>
            <ul className="mt-1.5 list-disc space-y-1 pl-5">
              <li>ยืนยันคำสั่งซื้อ ตรวจสอบการชำระเงิน และแจ้งหมายเลขติดตามพัสดุ</li>
              <li>ประสานงานนัดรับสินค้าหน้าร้าน ณ {STORE_CONTACT.locationTh}</li>
              <li>จัดส่งคำแนะนำด้านอุปกรณ์เสริมและใบเสนอราคาตามที่ลูกค้าร้องขอ</li>
              <li>ดูแลบริการหลังการขายและการเคลมประกันสินค้าตลอดอายุการรับประกัน</li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-white">
              3. การเก็บรักษาและความปลอดภัยของข้อมูล
            </h3>
            <p className="mt-1.5">
              ข้อมูลคำสั่งซื้อและตะกร้าสินค้าบนเบราว์เซอร์จัดเก็บไว้ในเครื่องของผู้ใช้งานเท่านั้น
              ร้านไม่มีนโยบายจำหน่าย แลกเปลี่ยน หรือเปิดเผยข้อมูลส่วนตัวของลูกค้าให้บุคคลภายนอก
              ยกเว้นเฉพาะบริษัทขนส่งและศูนย์บริการรับประกันที่เกี่ยวข้องกับการจัดส่งหรือเคลมสินค้าโดยตรง
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-white">
              4. สิทธิของเจ้าของข้อมูลและช่องทางติดต่อ
            </h3>
            <p className="mt-1.5">
              ท่านสามารถขอตรวจสอบ แก้ไข หรือลบข้อมูลติดต่อได้ตลอดเวลาผ่านอีเมล{' '}
              <strong className="text-white">{STORE_CONTACT.email}</strong> หรือ LINE Official Account{' '}
              <strong className="text-[#00E5FF]">{STORE_CONTACT.lineOa}</strong>
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end border-t border-white/10 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-[#D6B45A] bg-[#0B192C] px-5 py-2.5 text-sm font-semibold text-[#D6B45A] hover:border-[#00E5FF] hover:text-white"
          >
            รับทราบและปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  );
};
