'use client';

import { useState, useRef } from 'react';
import { NdaFormData } from '@/types/nda';
import NdaPreview from './NdaPreview';

const today = new Date().toISOString().split('T')[0];

const initialData: NdaFormData = {
  contractDate: today,
  projectName: '',
  companyRep: '',
  teacherName: '',
  address: '',
  idCard: '',
  phone: '',
  secretYears: '',
  penalty: '',
  witness1: '',
  witness2: '',
};

export default function NdaForm() {
  const [data, setData] = useState<NdaFormData>(initialData);
  const [logoDataUrl, setLogoDataUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  function set(field: keyof NdaFormData) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setData((prev) => ({ ...prev, [field]: e.target.value }));
    };
  }

  function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setLogoDataUrl(ev.target?.result as string);
    reader.readAsDataURL(file);
  }

  function clearLogo() {
    setLogoDataUrl('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">Mentora Consulting Group</div>
          <div className="sidebar-subtitle">NDA · กรอกข้อมูลสัญญา</div>
        </div>

        <div className="form-body">

          {/* โลโก้ */}
          <div className="form-section">
            <div className="form-section-label">โลโก้บริษัท</div>
            <div className="field">
              <label>อัปโหลดรูปโลโก้</label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}
              />
            </div>
            <div className="logo-preview-sidebar">
              {logoDataUrl ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logoDataUrl}
                    alt="logo preview"
                    style={{ maxHeight: 40, maxWidth: 160, objectFit: 'contain', borderRadius: 4, background: 'rgba(255,255,255,0.08)', padding: 4 }}
                  />
                  <button
                    onClick={clearLogo}
                    style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                  >
                    ลบ
                  </button>
                </div>
              ) : (
                <span className="logo-status">ยังไม่มีโลโก้</span>
              )}
            </div>
          </div>

          {/* ข้อมูลสัญญา */}
          <div className="form-section">
            <div className="form-section-label">ข้อมูลสัญญา</div>
            <div className="field">
              <label>วันที่ทำสัญญา</label>
              <input type="date" value={data.contractDate} onChange={set('contractDate')} />
            </div>
            <div className="field">
              <label>ชื่อคอร์ส / โปรเจค</label>
              <input type="text" value={data.projectName} onChange={set('projectName')} placeholder="เช่น AI Transformation Workshop" />
            </div>
            <div className="field">
              <label>ชื่อกรรมการผู้มีอำนาจลงนาม (ฝั่งบริษัท)</label>
              <input type="text" value={data.companyRep} onChange={set('companyRep')} placeholder="ชื่อ-นามสกุล กรรมการ" />
            </div>
          </div>

          {/* ข้อมูลผู้สอน */}
          <div className="form-section">
            <div className="form-section-label">ข้อมูลผู้สอน</div>
            <div className="field">
              <label>ชื่อ-นามสกุล ผู้สอน</label>
              <input type="text" value={data.teacherName} onChange={set('teacherName')} placeholder="ชื่อ-นามสกุล" />
            </div>
            <div className="field">
              <label>ที่อยู่</label>
              <textarea
                value={data.address}
                onChange={set('address')}
                placeholder="เลขที่ ถนน แขวง/ตำบล เขต/อำเภอ จังหวัด รหัสไปรษณีย์"
              />
            </div>
            <div className="field-row">
              <div className="field">
                <label>เลขบัตรประชาชน</label>
                <input type="text" value={data.idCard} onChange={set('idCard')} placeholder="X-XXXX-XXXXX-XX-X" maxLength={17} />
              </div>
              <div className="field">
                <label>โทรศัพท์</label>
                <input type="text" value={data.phone} onChange={set('phone')} placeholder="0XX-XXX-XXXX" />
              </div>
            </div>
          </div>

          {/* เงื่อนไขสัญญา */}
          <div className="form-section">
            <div className="form-section-label">เงื่อนไขสัญญา</div>
            <div className="field">
              <label>ระยะเวลารักษาความลับ (หลังสิ้นสุดงาน)</label>
              <select value={data.secretYears} onChange={set('secretYears')}>
                <option value="">— เลือก —</option>
                <option value="1">1 ปี</option>
                <option value="2">2 ปี</option>
                <option value="3">3 ปี</option>
                <option value="5">5 ปี</option>
                <option value="ไม่มีกำหนด">ไม่มีกำหนด</option>
              </select>
              <div className="hint">ข้อ 14</div>
            </div>
            <div className="field">
              <label>ค่าปรับต่อการฝ่าฝืนแต่ละครั้ง (บาท)</label>
              <input type="text" value={data.penalty} onChange={set('penalty')} placeholder="เท่ามูลค่าสัญญา" />
              <div className="hint">ข้อ 15</div>
            </div>
          </div>

          {/* พยาน */}
          <div className="form-section">
            <div className="form-section-label">พยาน</div>
            <div className="field">
              <label>ชื่อ-นามสกุล พยานที่ 1</label>
              <input type="text" value={data.witness1} onChange={set('witness1')} placeholder="ชื่อ-นามสกุล" />
            </div>
            <div className="field">
              <label>ชื่อ-นามสกุล พยานที่ 2</label>
              <input type="text" value={data.witness2} onChange={set('witness2')} placeholder="ชื่อ-นามสกุล" />
            </div>
          </div>

        </div>

        <button className="print-btn" onClick={() => window.print()}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 6 2 18 2 18 9" />
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
            <rect x="6" y="14" width="12" height="8" />
          </svg>
          พิมพ์ / บันทึก PDF
        </button>
      </aside>

      <NdaPreview data={data} logoDataUrl={logoDataUrl} />
    </div>
  );
}
