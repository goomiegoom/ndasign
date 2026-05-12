'use client';

import { useState } from 'react';
import { NdaFormData } from '@/types/nda';
import { toDirectUrl } from '@/utils/gdrive';
import NdaPreview from './NdaPreview';

const today = new Date().toISOString().split('T')[0];

const initialData: NdaFormData = {
  logoUrl: '',
  contractDate: today,
  projectName: '',
  companyRep: '',
  teacherName: '',
  address: '',
  idCard: '',
  phone: '',
  secretYears: '',
  penalty: '',
};

export default function NdaForm() {
  const [data, setData] = useState<NdaFormData>(initialData);
  const [logoError, setLogoError] = useState(false);

  function set(field: keyof NdaFormData) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setData((prev) => ({ ...prev, [field]: e.target.value }));
      if (field === 'logoUrl') setLogoError(false);
    };
  }

  const logoSrc = data.logoUrl ? toDirectUrl(data.logoUrl.trim()) : '';

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
              <label>Google Drive link ของโลโก้</label>
              <input
                type="text"
                value={data.logoUrl}
                onChange={set('logoUrl')}
                placeholder="https://drive.google.com/file/d/.../view"
              />
              <div className="hint">share &ldquo;Anyone with link&rdquo; แล้ววาง link ได้เลย — แปลงให้อัตโนมัติ</div>
            </div>
            <div className="logo-preview-sidebar">
              {logoSrc && !logoError ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={logoSrc}
                  alt="logo preview"
                  style={{ maxHeight: 48, maxWidth: 200, objectFit: 'contain', borderRadius: 4, background: 'rgba(255,255,255,0.08)', padding: 4 }}
                  onError={() => setLogoError(true)}
                />
              ) : logoError ? (
                <span className="logo-error">โหลดรูปไม่ได้ — ตรวจสอบ link และสิทธิ์</span>
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

      <NdaPreview data={data} />
    </div>
  );
}
