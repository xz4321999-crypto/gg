import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  ExternalLink,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Star,
  Users,
} from 'lucide-react';
import { STORE_ASSETS, STORE_CONTACT, TEAM_MEMBERS } from '../data/catalog';
import { StoreImage } from '../components/ProductVisual';

export const ContactPage: React.FC = () => {
  const [formPlatform, setFormPlatform] = useState<'google-forms' | 'typeform'>('google-forms');
  const [feedbackName, setFeedbackName] = useState('');
  const [feedbackTopic, setFeedbackTopic] = useState('ข้อเสนอแนะบริการหน้าร้าน');
  const [feedbackRating, setFeedbackRating] = useState(5);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const owner = TEAM_MEMBERS.find((m) => m.id === 'owner');
  const manager = TEAM_MEMBERS.find((m) => m.id === 'manager');
  const staff = TEAM_MEMBERS.filter((m) => m.id.startsWith('staff-'));

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackMessage.trim()) return;
    setFeedbackSubmitted(true);
  };

  const resetFeedback = () => {
    setFeedbackName('');
    setFeedbackMessage('');
    setFeedbackRating(5);
    setFeedbackSubmitted(false);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
      {/* Storefront Location & Real Photo Section */}
      <section className="rounded-xl border border-[#D6B45A] bg-[#152A42] p-6 sm:p-8">
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
          <div className="overflow-hidden rounded-xl border border-[#D6B45A] bg-[#0B192C] lg:col-span-7">
            <StoreImage
              src={STORE_ASSETS.storefront}
              alt="หน้าร้าน GEAR PRO STORE ที่วิทยาลัยอาชีวศึกษาเอเซีย"
              loading="eager"
              className="h-64 w-full object-cover sm:h-80 lg:h-full"
            />
          </div>

          <div className="flex flex-col justify-between lg:col-span-5">
            <div>
              <p className="text-xs font-semibold tracking-wider text-[#D6B45A]">
                STORE LOCATION &amp; ABOUT · ติดต่อเรา
              </p>
              <h1 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
                GEAR PRO STORE
              </h1>
              <p className="mt-2 flex items-start gap-2 text-sm font-semibold text-[#00E5FF]">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{STORE_CONTACT.locationTh}</span>
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[#CBD5E1]">
                แวะทดลองจับเมาส์ ฟังเสียงสวิตช์คีย์บอร์ด หรือรับสินค้าที่สั่งออนไลน์ได้ฟรีไม่มีค่าจัดส่ง
                บริเวณอาคารบริการนักศึกษา ภายในวิทยาลัยอาชีวศึกษาเอเซีย
              </p>
            </div>

            <div className="mt-6 space-y-3 border-t border-white/10 pt-5 text-sm">
              <div className="flex items-start gap-2.5 text-white">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#D6B45A]" />
                <div>
                  <p className="font-medium">{STORE_CONTACT.hoursTh}</p>
                  <p className="text-xs text-[#CBD5E1]">{STORE_CONTACT.cutoffTh}</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-white">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#00E5FF]" />
                <div className="space-y-0.5">
                  {STORE_CONTACT.phones.map((phone) => (
                    <p key={phone} className="font-mono-num text-xs sm:text-sm">
                      {phone}
                    </p>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-white">
                <Mail className="h-4 w-4 shrink-0 text-[#D6B45A]" />
                <span className="text-sm">{STORE_CONTACT.email}</span>
              </div>

              <div className="flex items-center gap-2.5 text-white">
                <MessageCircle className="h-4 w-4 shrink-0 text-[#D946EF]" />
                <span className="text-sm">
                  LINE Official Account: <strong className="text-[#00E5FF]">{STORE_CONTACT.lineOa}</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Store Organizational Chart */}
      <section className="mt-12 rounded-xl border border-[#D6B45A] bg-[#152A42] p-6 sm:p-8">
        <div className="text-center">
          <p className="text-xs font-semibold tracking-wider text-[#D6B45A]">
            ORGANIZATIONAL CHART · แผนผังโครงสร้างองค์กรร้าน
          </p>
          <h2 className="mt-1.5 font-display text-2xl font-bold text-white">
            โครงสร้างการบริหารงาน GEAR PRO STORE
          </h2>
        </div>

        <div className="mt-8 flex flex-col items-center">
          {/* Level 1: Owner */}
          <div className="w-full max-w-xs rounded-xl border border-[#D6B45A] bg-[#0B192C] px-5 py-4 text-center">
            <p className="text-xs font-semibold text-[#D6B45A]">เจ้าของร้าน (Owner)</p>
            <p className="mt-1 font-display text-base font-bold text-white">{owner?.nameTh}</p>
            <p className="mt-0.5 text-xs text-[#CBD5E1]">บริหารนโยบายและคัดเลือกแบรนด์แท้</p>
          </div>

          <div aria-hidden="true" className="h-6 w-px bg-[#D6B45A]" />

          {/* Level 2: Store Manager */}
          <div className="w-full max-w-xs rounded-xl border border-[#00E5FF] bg-[#0B192C] px-5 py-4 text-center">
            <p className="text-xs font-semibold text-[#00E5FF]">ผู้จัดการร้าน (Store Manager)</p>
            <p className="mt-1 font-display text-base font-bold text-white">{manager?.nameTh}</p>
            <p className="mt-0.5 text-xs text-[#CBD5E1]">ดูแลหน้าร้าน สต็อก และโปรโมชั่น</p>
          </div>

          {/* Connector lines */}
          <div aria-hidden="true" className="h-6 w-px bg-[#D6B45A]" />
          <div aria-hidden="true" className="hidden h-px w-2/3 bg-[#D6B45A]/60 md:block" />

          {/* Level 3: 3 Departments */}
          <div className="mt-4 grid w-full grid-cols-1 gap-4 md:mt-6 md:grid-cols-3">
            <div className="rounded-xl border border-[#D6B45A]/65 bg-[#0B192C] p-5 text-center">
              <p className="text-xs font-semibold text-[#D6B45A]">
                ฝ่ายคลังสินค้าและแพ็กพัสดุ
              </p>
              <p className="mt-1 text-xs text-[#CBD5E1]">Inventory &amp; Packaging</p>
              <p className="mt-2 font-display text-sm font-bold text-white">คุณกิตติพงศ์ แสงทอง</p>
              <p className="mt-1 text-xs text-[#CBD5E1]">QC สินค้า แพ็กกันกระแทก ส่งรอบ 15:00 น.</p>
            </div>

            <div className="rounded-xl border border-[#D6B45A]/65 bg-[#0B192C] p-5 text-center">
              <p className="text-xs font-semibold text-[#00E5FF]">
                ฝ่ายขายออนไลน์และหน้าร้าน
              </p>
              <p className="mt-1 text-xs text-[#CBD5E1]">Online &amp; Storefront Sales</p>
              <p className="mt-2 font-display text-sm font-bold text-white">คุณณัฐวุฒิ ศรีประเสริฐ</p>
              <p className="mt-1 text-xs text-[#CBD5E1]">แนะนำเกมมิ่งเกียร์และดูแล LINE OA</p>
            </div>

            <div className="rounded-xl border border-[#D6B45A]/65 bg-[#0B192C] p-5 text-center">
              <p className="text-xs font-semibold text-[#D946EF]">
                ฝ่ายบริการลูกค้า
              </p>
              <p className="mt-1 text-xs text-[#CBD5E1]">Customer Support &amp; Warranty</p>
              <p className="mt-2 font-display text-sm font-bold text-white">คุณปภาวรินทร์ จันทร์เพ็ญ</p>
              <p className="mt-1 text-xs text-[#CBD5E1]">รับสินค้าที่โรงเรียนและประสานงานเคลม</p>
            </div>
          </div>
        </div>
      </section>

      {/* Store Team Introductions */}
      <section className="mt-12">
        <div className="flex items-center gap-2.5">
          <Users className="h-5 w-5 text-[#D6B45A]" />
          <h2 className="font-display text-2xl font-bold text-white">
            แนะนำทีมงานประจำร้าน GEAR PRO STORE
          </h2>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[owner, manager, ...staff].filter(Boolean).map((member) => {
            if (!member) return null;
            return (
              <article
                key={member.id}
                className="flex flex-col justify-between rounded-xl border border-[#D6B45A]/75 bg-[#152A42] p-5"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="font-semibold text-[#D6B45A]">{member.roleEn}</span>
                    <span className="text-[#00E5FF]">{member.department}</span>
                  </div>
                  <h3 className="mt-2 font-display text-lg font-bold text-white">
                    {member.nameTh}
                  </h3>
                  <p className="text-xs font-medium text-[#CBD5E1]">{member.roleTh}</p>
                  <p className="mt-3 text-sm leading-relaxed text-[#CBD5E1]">{member.bioTh}</p>
                </div>
                <p className="mt-4 border-t border-white/10 pt-3 text-xs text-white">
                  ความเชี่ยวชาญ: <span className="text-[#D6B45A]">{member.specialty}</span>
                </p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Customer Complaint / Feedback Section (Google Forms / Typeform Embed Style) */}
      <section className="mt-12 rounded-xl border border-[#D6B45A] bg-[#152A42] p-6 sm:p-8">
        <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-5 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-semibold tracking-wider text-[#D6B45A]">
              CUSTOMER FEEDBACK &amp; COMPLAINT PORTAL
            </p>
            <h2 className="mt-1 font-display text-2xl font-bold text-white">
              แบบฟอร์มรับฟังความคิดเห็นและแจ้งข้อร้องเรียนลูกค้า
            </h2>
            <p className="mt-1 text-sm text-[#CBD5E1]">
              เชื่อมต่อรูปแบบ Google Forms / Typeform สำหรับประเมินความพึงพอใจและแจ้งปัญหาการใช้งาน
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-[#D6B45A]/45 bg-[#0B192C] p-1">
            <button
              type="button"
              onClick={() => setFormPlatform('google-forms')}
              className={`rounded-md px-3.5 py-2 text-xs font-semibold transition-colors ${
                formPlatform === 'google-forms'
                  ? 'bg-[#152A42] text-[#D6B45A] border border-[#D6B45A]/50'
                  : 'text-[#CBD5E1] hover:text-white'
              }`}
            >
              Google Forms Embed
            </button>
            <button
              type="button"
              onClick={() => setFormPlatform('typeform')}
              className={`rounded-md px-3.5 py-2 text-xs font-semibold transition-colors ${
                formPlatform === 'typeform'
                  ? 'bg-[#152A42] text-[#00E5FF] border border-[#00E5FF]/50'
                  : 'text-[#CBD5E1] hover:text-white'
              }`}
            >
              Typeform Interactive
            </button>
          </div>
        </div>

        {/* Embedded Interactive Form Container */}
        <div className="mt-6 rounded-xl border border-white/15 bg-[#0B192C] p-6 sm:p-8">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4 text-xs text-[#CBD5E1]">
            <span>
              โหมดแบบฟอร์ม:{' '}
              <strong className="text-white">
                {formPlatform === 'google-forms'
                  ? 'Google Forms — GEAR PRO STORE Customer Care'
                  : 'Typeform — GEAR PRO STORE Feedback Flow'}
              </strong>
            </span>
            <a
              href="#feedback-form-body"
              onClick={(e) => {
                e.preventDefault();
                setFormPlatform(formPlatform === 'google-forms' ? 'typeform' : 'google-forms');
              }}
              className="inline-flex items-center gap-1 text-[#00E5FF] hover:underline"
            >
              <span>สลับรูปแบบฟอร์ม</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          {feedbackSubmitted ? (
            <div className="py-8 text-center">
              <CheckCircle2 className="mx-auto h-12 w-12 text-[#00E5FF]" />
              <h3 className="mt-3 font-display text-xl font-bold text-white">
                ส่งข้อมูลความคิดเห็น / ข้อร้องเรียนเรียบร้อยแล้ว
              </h3>
              <p className="mt-2 text-sm text-[#CBD5E1]">
                หัวข้อ: <strong className="text-white">{feedbackTopic}</strong> · คะแนนความพึงพอใจ{' '}
                <strong className="font-mono-num text-[#D6B45A]">{feedbackRating}/5</strong>
              </p>
              <p className="mt-1 text-xs text-[#CBD5E1]">
                ผู้จัดการร้านและฝ่ายบริการลูกค้าจะตรวจสอบและติดต่อกลับภายใน 24 ชั่วโมง
              </p>
              <button
                type="button"
                onClick={resetFeedback}
                className="mt-5 rounded-lg border border-[#D6B45A] bg-[#152A42] px-5 py-2 text-xs font-semibold text-white hover:border-[#00E5FF]"
              >
                ส่งแบบฟอร์มใหม่อีกครั้ง
              </button>
            </div>
          ) : (
            <form id="feedback-form-body" onSubmit={handleSubmitFeedback} className="space-y-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="fb-name" className="block text-xs font-medium text-[#CBD5E1]">
                    ชื่อผู้แจ้ง / รหัสนักศึกษา (ถ้ามี)
                  </label>
                  <input
                    id="fb-name"
                    type="text"
                    value={feedbackName}
                    onChange={(e) => setFeedbackName(e.target.value)}
                    placeholder="ระบุชื่อหรืออีเมลติดต่อกลับ"
                    className="mt-1.5 h-11 w-full rounded-lg border border-[#D6B45A]/50 bg-[#152A42] px-3.5 text-sm text-white placeholder-[#CBD5E1]/50 focus:border-[#00E5FF] focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="fb-topic" className="block text-xs font-medium text-[#CBD5E1]">
                    หัวข้อเรื่องที่ต้องการแจ้ง
                  </label>
                  <select
                    id="fb-topic"
                    value={feedbackTopic}
                    onChange={(e) => setFeedbackTopic(e.target.value)}
                    className="mt-1.5 h-11 w-full rounded-lg border border-[#D6B45A]/50 bg-[#152A42] px-3.5 text-sm text-white focus:border-[#00E5FF] focus:outline-none"
                  >
                    <option value="ข้อเสนอแนะบริการหน้าร้าน">ข้อเสนอแนะบริการหน้าร้าน</option>
                    <option value="แจ้งปัญหาสินค้า / ส่งเคลม">แจ้งปัญหาสินค้า / ส่งเคลม</option>
                    <option value="ติดตามการจัดส่งพัสดุ">ติดตามการจัดส่งพัสดุ</option>
                    <option value="ร้องเรียนการบริการ">ร้องเรียนการบริการ</option>
                    <option value="เสนอสินค้าที่อยากให้นำเข้าเพิ่ม">เสนอสินค้าที่อยากให้นำเข้าเพิ่ม</option>
                  </select>
                </div>
              </div>

              <div>
                <span className="block text-xs font-medium text-[#CBD5E1]">
                  คะแนนความพึงพอใจโดยรวม
                </span>
                <div className="mt-2 flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((score) => (
                    <button
                      key={score}
                      type="button"
                      onClick={() => setFeedbackRating(score)}
                      aria-label={`ให้คะแนน ${score} ดาว`}
                      className={`inline-flex h-10 items-center gap-1 rounded-lg border px-3 text-xs font-semibold transition-colors ${
                        feedbackRating >= score
                          ? 'border-[#D6B45A] bg-[#152A42] text-[#D6B45A]'
                          : 'border-white/15 bg-[#152A42]/40 text-[#CBD5E1]'
                      }`}
                    >
                      <Star
                        className={`h-3.5 w-3.5 ${
                          feedbackRating >= score ? 'fill-[#D6B45A]' : ''
                        }`}
                      />
                      <span className="font-mono-num">{score}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="fb-message" className="block text-xs font-medium text-[#CBD5E1]">
                  รายละเอียดความคิดเห็นหรือข้อร้องเรียน *
                </label>
                <textarea
                  id="fb-message"
                  rows={4}
                  required
                  value={feedbackMessage}
                  onChange={(e) => setFeedbackMessage(e.target.value)}
                  placeholder="พิมพ์รายละเอียดเพื่อช่วยให้ GEAR PRO STORE พัฒนาบริการให้ดียิ่งขึ้น..."
                  className="mt-1.5 w-full rounded-lg border border-[#D6B45A]/50 bg-[#152A42] p-3.5 text-sm text-white placeholder-[#CBD5E1]/50 focus:border-[#00E5FF] focus:outline-none"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs text-[#CBD5E1]">
                  ข้อมูลจะถูกส่งตรงถึงผู้จัดการร้านและฝ่ายบริการลูกค้า
                </span>
                <button
                  type="submit"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-[#D6B45A] bg-gradient-to-r from-[#2196F3] to-[#D946EF] px-6 py-2.5 text-sm font-semibold text-white hover:brightness-110"
                >
                  <Send className="h-4 w-4" />
                  <span>ส่งแบบฟอร์มความคิดเห็น</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
