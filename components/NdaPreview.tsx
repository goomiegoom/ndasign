'use client';

import { NdaFormData } from '@/types/nda';
import { thDate } from '@/utils/thDate';
import FillBlank from './FillBlank';

interface Props {
  data: NdaFormData;
  logoDataUrl: string;
}

function formatPenalty(val: string): string {
  if (!val) return '';
  const num = val.replace(/,/g, '');
  if (isNaN(Number(num))) return val;
  return Number(num).toLocaleString('th-TH');
}

function formatYears(val: string): string {
  if (!val) return '';
  if (val === 'ไม่มีกำหนด') return 'ไม่มีกำหนด';
  return `${val} ปี`;
}

export default function NdaPreview({ data, logoDataUrl }: Props) {
  const dateStr = data.contractDate ? thDate(data.contractDate) : '';

  return (
    <main className="preview-panel">
      <div className="preview-header">
        <span className="preview-label">ตัวอย่างสัญญา (Live Preview)</span>
        <span className="page-count">A4</span>
      </div>

      <div className="nda-doc">
        <div className="doc-body">

          {/* Header */}
          <div className="doc-header">
            <div className="doc-logo-area">
              {logoDataUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logoDataUrl} alt="logo" style={{ maxHeight: 56, maxWidth: 220, objectFit: 'contain' }} />
              ) : (
                <span className="doc-logo-text">Mentora Consulting Group Co., Ltd.</span>
              )}
            </div>
            <div className="doc-title">สัญญารักษาความลับและไม่เปิดเผยข้อมูล</div>
            <div className="doc-subtitle">Non-Disclosure Agreement (NDA)</div>
            <div className="doc-made-at">ทำขึ้นที่ บริษัทเมนทอรา คอนซัลติง กรุ๊ป จำกัด</div>
            <div className="doc-date-line">
              วันที่ <FillBlank value={dateStr} fallback="……………………………" />
            </div>
          </div>

          {/* Parties */}
          <div className="doc-section">
            <p className="doc-p">
              สัญญาฉบับนี้ทำขึ้นระหว่าง <strong>บริษัทเมนทอรา คอนซัลติง กรุ๊ป จำกัด</strong> โดย{' '}
              <FillBlank value={data.companyRep} fallback="……………………" size="short" />
              {' '}กรรมการผู้มีอำนาจลงนามผูกพันนิติบุคคล ทะเบียนนิติบุคคลเลขที่ 0125568033993
              สำนักงานใหญ่ตั้งอยู่ เลขที่ 3 หมู่ที่ 9 ซ.งามวงศ์วาน 19 แยก 15 ถนนงามวงศ์วาน ตำบลบางกระสอ
              อำเภอเมืองนนทบุรี จังหวัดนนทบุรี ซึ่งต่อไปในสัญญานี้เรียกว่า{' '}
              <strong>&ldquo;บริษัท&rdquo;</strong> หรือ <strong>&ldquo;ผู้เปิดเผยข้อมูล&rdquo;</strong> ฝ่ายหนึ่ง
            </p>

            <div className="parties-block">
              <div className="party-label">ผู้รับข้อมูล / ผู้สอน</div>
              <div className="party-name">
                {data.teacherName || '……………………………………………………'}
              </div>
              <div className="info-row">
                <span className="info-label">ที่อยู่:</span>
                <span>{data.address || '……………………………………………………………………………………'}</span>
              </div>
              <div className="info-row">
                <span className="info-label">เลขบัตรประชาชน:</span>
                <span>{data.idCard || '……………………………'}</span>
                &nbsp;&nbsp;&nbsp;
                <span className="info-label">โทรศัพท์:</span>
                <span>{data.phone || '……………………………'}</span>
              </div>
            </div>

            <p className="doc-p">คู่สัญญาทั้งสองฝ่ายตกลงทำสัญญารักษาความลับและไม่เปิดเผยข้อมูล โดยมีข้อความดังต่อไปนี้</p>
          </div>

          <div className="section-divider" />

          {/* ข้อ 1 */}
          <div className="doc-section">
            <div className="doc-section-title">ข้อ 1. วัตถุประสงค์ของสัญญา</div>
            <p className="doc-p">
              บริษัทประกอบธุรกิจให้คำปรึกษา วางระบบ อบรม และดำเนินโครงการเกี่ยวกับการนำเทคโนโลยีปัญญาประดิษฐ์
              หรือ AI ไปใช้ในองค์กร รวมถึง AI Implementation, AI Transformation, Automation,
              Workflow Design, Data Utilization, Prompt Engineering, AI Policy, AI Governance และงานอื่นที่เกี่ยวข้อง
            </p>
            <p className="doc-p">
              บริษัทมีความประสงค์จะว่าจ้าง หรือมอบหมายให้ผู้สอนเป็นผู้บรรยาย สอน ฝึกอบรม
              ให้คำปรึกษา หรือสนับสนุนการจัดอบรมในหลักสูตร{' '}
              <strong>{data.projectName || '……………………………'}</strong> ให้แก่ลูกค้าของบริษัท
            </p>
          </div>

          {/* ข้อ 2 */}
          <div className="doc-section">
            <div className="doc-section-title">ข้อ 2. คำนิยามของข้อมูลความลับ</div>
            <p className="doc-p">
              ภายใต้สัญญานี้ คำว่า &ldquo;ข้อมูลความลับ&rdquo; หมายความถึง ข้อมูล เอกสาร เนื้อหา ความรู้
              วิธีการทำงาน เทคนิค รูปแบบธุรกิจ ข้อมูลเชิงพาณิชย์ ข้อมูลทางเทคนิค ข้อมูลเชิงกลยุทธ์
              ข้อมูลลูกค้า ข้อมูลพนักงาน ข้อมูลภายในองค์กร ข้อมูลโครงการ ข้อมูลระบบ รวมถึง AI Model,
              Prompt, Workflow, Automation, Dataset, Use Case, Process Design, Implementation Plan,
              Training Material, Consulting Methodology, Business Case, Pain Point ตลอดจนข้อมูลอื่นใด
              ที่บริษัทหรือลูกค้าของบริษัทเปิดเผยให้แก่ผู้สอน ไม่ว่าจะเปิดเผยโดยวิธีการใดก็ตาม
            </p>
          </div>

          {/* ข้อ 3 */}
          <div className="doc-section">
            <div className="doc-section-title">ข้อ 3. หน้าที่ในการรักษาความลับ</div>
            <p className="doc-p">
              ผู้สอนตกลงและรับรองว่าจะรักษาข้อมูลความลับทั้งหมดที่ได้รับจากบริษัทหรือลูกค้าของบริษัทไว้เป็น
              ความลับอย่างเคร่งครัด และจะไม่เปิดเผย ส่งต่อ เผยแพร่ แจกจ่าย ถ่ายทอด ทำซ้ำ คัดลอก อัปโหลด
              โพสต์ นำเสนอ อ้างอิง หรือทำให้บุคคลภายนอกได้รับทราบข้อมูลความลับ เว้นแต่จะได้รับความยินยอม
              เป็นลายลักษณ์อักษรจากบริษัทก่อนทุกครั้ง
            </p>
          </div>

          {/* ข้อ 4 */}
          <div className="doc-section">
            <div className="doc-section-title">ข้อ 4. การจำกัดวัตถุประสงค์ในการใช้ข้อมูล</div>
            <p className="doc-p">
              ผู้สอนตกลงว่าจะใช้ข้อมูลความลับเฉพาะเท่าที่จำเป็นเพื่อการสอน การบรรยาย การเตรียมเนื้อหา
              การให้คำปรึกษา หรือการปฏิบัติงานตามที่บริษัทมอบหมายเท่านั้น และไม่มีสิทธินำข้อมูลความลับ
              ไปใช้เพื่อประโยชน์ส่วนตนหรือบุคคลอื่น เว้นแต่ได้รับอนุญาตเป็นลายลักษณ์อักษรจากบริษัทก่อน
            </p>
          </div>

          {/* ข้อ 5 */}
          <div className="doc-section">
            <div className="doc-section-title">ข้อ 5. การห้ามเผยแพร่เคสจริงของบริษัทและลูกค้า</div>
            <p className="doc-p">
              ผู้สอนห้ามนำเคสจริง ตัวอย่างปัญหา กระบวนการทำงาน เอกสาร ภาพหน้าจอ Workflow, Automation Flow,
              Prompt, Output, Dashboard, Dataset หรือผลลัพธ์ใดๆ จากโครงการของบริษัทหรือลูกค้าไปเผยแพร่ต่อ
              สาธารณะในรูปแบบใด ไม่ว่าจะเป็น Facebook, TikTok, YouTube, Instagram, LinkedIn หรือสื่อออนไลน์
              ใดๆ แม้จะปกปิดชื่อบริษัทแล้วก็ตาม
            </p>
          </div>

          {/* ข้อ 6 */}
          <div className="doc-section">
            <div className="doc-section-title">ข้อ 6. การทำข้อมูลให้ไม่สามารถระบุตัวตนได้</div>
            <p className="doc-p">
              กรณีที่บริษัทอนุญาตให้ผู้สอนใช้เคสจริงเพื่อประกอบการสอน ผู้สอนต้องปรับแต่งข้อมูลให้ไม่สามารถ
              ระบุตัวตนได้อย่างแท้จริง โดยต้องลบ ปกปิด หรือเปลี่ยนแปลงข้อมูลที่สามารถระบุตัวตนได้ทั้งหมด
              และต้องได้รับอนุญาตจากบริษัทเป็นลายลักษณ์อักษรก่อนเสมอ
            </p>
          </div>

          {/* ข้อ 7 */}
          <div className="doc-section">
            <div className="doc-section-title">ข้อ 7. การห้ามบันทึกภาพ เสียง วิดีโอ หรือหน้าจอ</div>
            <p className="doc-p">
              ผู้สอนห้ามบันทึกภาพ บันทึกเสียง บันทึกวิดีโอ ถ่ายภาพหน้าจอ ดาวน์โหลด คัดลอก หรือเก็บสำเนา
              เอกสาร ไฟล์ หรือข้อมูลใดๆ ที่เกี่ยวข้องกับการอบรม ลูกค้า ผู้เข้าร่วมอบรม หรือโครงการของ
              บริษัท เว้นแต่เป็นการกระทำที่จำเป็นต่อการปฏิบัติงานและได้รับอนุญาตจากบริษัทก่อน
            </p>
          </div>

          {/* ข้อ 8 */}
          <div className="doc-section">
            <div className="doc-section-title">ข้อ 8. สิทธิในทรัพย์สินทางปัญญา เอกสาร และสื่อการสอน</div>
            <p className="doc-p">
              บรรดาเอกสาร สื่อการสอน เนื้อหา Slide, Presentation, Prompt, Framework, Workflow, AI Use Case,
              Case Study, Template และงานสร้างสรรค์ใดๆ ที่บริษัทจัดทำหรือส่งมอบให้แก่ผู้สอน ถือเป็น
              กรรมสิทธิ์และทรัพย์สินทางปัญญาของบริษัทโดยสมบูรณ์ ผู้สอนไม่มีสิทธินำไปใช้ ทำซ้ำ ดัดแปลง
              หรือเผยแพร่โดยไม่ได้รับความยินยอมเป็นลายลักษณ์อักษรจากบริษัทก่อน
            </p>
          </div>

          {/* ข้อ 9 */}
          <div className="doc-section">
            <div className="doc-section-title">ข้อ 9. ข้อมูลส่วนบุคคลและข้อมูลลูกค้า</div>
            <p className="doc-p">
              ผู้สอนตกลงว่าจะประมวลผล ใช้ และเก็บรักษาข้อมูลส่วนบุคคลของพนักงาน ลูกค้า ผู้เข้าอบรม
              เท่าที่จำเป็นตามวัตถุประสงค์ของงานเท่านั้น และต้องปฏิบัติตามกฎหมายว่าด้วยการคุ้มครอง
              ข้อมูลส่วนบุคคล (PDPA) และนโยบายของบริษัทอย่างเคร่งครัด
            </p>
          </div>

          {/* ข้อ 10 */}
          <div className="doc-section">
            <div className="doc-section-title">ข้อ 10. การห้ามติดต่อ ชักชวน หรือรับงานจากลูกค้าของบริษัทโดยตรง</div>
            <p className="doc-p">
              ผู้สอนตกลงว่า ในระหว่างที่ปฏิบัติงานให้แก่บริษัท และภายในระยะเวลา <strong>1 ปี</strong> นับแต่
              วันที่งานอบรมสิ้นสุดลง ผู้สอนจะไม่ติดต่อ เสนอขายบริการ รับงาน เจรจาธุรกิจ ชักชวน หรือเข้าไป
              มีส่วนเกี่ยวข้องในการให้บริการแก่ลูกค้าของบริษัทโดยตรง ไม่ว่าด้วยตนเองหรือผ่านบุคคลอื่น
              เว้นแต่ได้รับความยินยอมเป็นลายลักษณ์อักษรจากบริษัทก่อน
            </p>
          </div>

          {/* ข้อ 11 */}
          <div className="doc-section">
            <div className="doc-section-title">ข้อ 11. การห้ามนำเคสจริงไปใช้เพื่อการประชาสัมพันธ์หรือสร้างภาพลักษณ์ส่วนตัว</div>
            <p className="doc-p">
              ผู้สอนตกลงว่าจะไม่นำข้อมูลที่ได้รับจากการปฏิบัติงานไปใช้เพื่อการประชาสัมพันธ์ สร้าง
              Personal Branding ทำ Portfolio, Proposal, Content, Case Study ส่วนตัว หรือกล่าวอ้างต่อ
              บุคคลภายนอกว่าเคยเข้าร่วม ทำงาน วางระบบ ให้คำปรึกษา หรือสอนให้แก่ลูกค้าของบริษัท
              ไม่ว่าทางตรงหรือทางอ้อม เว้นแต่ได้รับความยินยอมเป็นลายลักษณ์อักษรจากบริษัทก่อน
            </p>
          </div>

          {/* ข้อ 12 */}
          <div className="doc-section">
            <div className="doc-section-title">ข้อ 12. ข้อยกเว้นของข้อมูลความลับ</div>
            <p className="doc-p no-indent">ข้อมูลต่อไปนี้ไม่ถือเป็นข้อมูลความลับภายใต้สัญญานี้</p>
            <p className="doc-p no-indent" style={{ paddingLeft: '2em' }}>1. ข้อมูลที่เป็นที่เปิดเผยต่อสาธารณะอยู่แล้วโดยมิใช่ผลจากการกระทำผิดของผู้สอน</p>
            <p className="doc-p no-indent" style={{ paddingLeft: '2em' }}>2. ข้อมูลที่ผู้สอนมีอยู่ก่อนโดยชอบด้วยกฎหมาย และสามารถพิสูจน์ได้เป็นลายลักษณ์อักษร</p>
            <p className="doc-p no-indent" style={{ paddingLeft: '2em' }}>3. ข้อมูลที่ผู้สอนได้รับจากบุคคลภายนอกโดยชอบด้วยกฎหมาย และบุคคลนั้นไม่มีหน้าที่รักษาความลับ</p>
            <p className="doc-p no-indent" style={{ paddingLeft: '2em' }}>4. ข้อมูลที่ต้องเปิดเผยตามคำสั่งศาล หรือบทบัญญัติของกฎหมาย ทั้งนี้ผู้สอนต้องแจ้งให้บริษัททราบเป็นลายลักษณ์อักษรโดยเร็วที่สุดก่อนการเปิดเผย</p>
          </div>

          {/* ข้อ 13 */}
          <div className="doc-section">
            <div className="doc-section-title">ข้อ 13. การคืนและทำลายข้อมูล</div>
            <p className="doc-p">
              เมื่อบริษัทแจ้งเป็นลายลักษณ์อักษร หรือเมื่อสิ้นสุดการปฏิบัติงาน ผู้สอนต้องส่งคืน ลบ ทำลาย
              หรือทำให้ไม่สามารถเข้าถึงได้ซึ่งข้อมูลความลับ เอกสาร ไฟล์ สำเนา บันทึก ภาพถ่าย วิดีโอ
              ข้อมูลใน Cloud Drive อีเมล Chat Application หรืออุปกรณ์จัดเก็บข้อมูลใดๆ ที่เกี่ยวข้องกับ
              บริษัทหรือลูกค้าของบริษัท
            </p>
          </div>

          {/* ข้อ 14 */}
          <div className="doc-section">
            <div className="doc-section-title">ข้อ 14. ระยะเวลาการรักษาความลับ</div>
            <p className="doc-p">
              หน้าที่ในการรักษาความลับตามสัญญานี้ให้มีผลตั้งแต่วันที่ผู้สอนได้รับข้อมูลความลับเป็นครั้งแรก
              และให้มีผลต่อเนื่องไปอีกเป็นระยะเวลา{' '}
              <FillBlank value={formatYears(data.secretYears)} fallback="……" size="short" />
              {' '}นับแต่วันที่งานสิ้นสุดลง สำหรับข้อมูลที่มีลักษณะเป็นความลับทางการค้า ข้อมูลลูกค้า
              ข้อมูลโครงการ ข้อมูลส่วนบุคคล หน้าที่ในการรักษาความลับให้มีผลต่อไปโดยไม่มีกำหนดระยะเวลา
              ตราบเท่าที่ข้อมูลนั้นยังมิได้กลายเป็นข้อมูลสาธารณะโดยชอบด้วยกฎหมาย
            </p>
          </div>

          {/* ข้อ 15 */}
          <div className="doc-section">
            <div className="doc-section-title">ข้อ 15. ความรับผิดกรณีผิดสัญญา</div>
            <p className="doc-p">
              หากผู้สอนฝ่าฝืนสัญญานี้ ผู้สอนตกลงรับผิดชดใช้ค่าเสียหายทั้งหมดที่เกิดขึ้นแก่บริษัท รวมถึง
              ค่าเสียหายทางธุรกิจ ค่าเสียชื่อเสียง ค่าเสียโอกาสทางการค้า ค่าทนายความ และค่าดำเนินคดี
            </p>
            <p className="doc-p">
              นอกจากนี้ ผู้สอนตกลงชำระค่าปรับให้แก่บริษัทเป็นเงินจำนวน{' '}
              <FillBlank value={formatPenalty(data.penalty)} fallback="เท่ามูลค่าสัญญา" size="short" />
              {' '}บาท ต่อการฝ่าฝืนแต่ละครั้ง โดยการชำระค่าปรับดังกล่าวไม่ตัดสิทธิบริษัทในการเรียกค่าเสียหายเพิ่มเติม
            </p>
          </div>

          {/* ข้อ 16-17 */}
          <div className="doc-section">
            <div className="doc-section-title">ข้อ 16–17. สิทธิในการขอให้ระงับการกระทำ / การไม่ถือเป็นการโอนสิทธิ</div>
            <p className="doc-p">
              หากมีเหตุอันควรเชื่อได้ว่าผู้สอนฝ่าฝืนสัญญานี้ บริษัทมีสิทธิเรียกร้องให้ผู้สอนหยุด ระงับ ลบ
              ถอน แก้ไข หรือยุติการกระทำดังกล่าวทันที และการเปิดเผยข้อมูลความลับให้แก่ผู้สอนไม่ถือเป็น
              การโอนสิทธิใดๆ ในข้อมูล ทรัพย์สินทางปัญญา หรือทรัพย์สินของบริษัทแต่อย่างใด
            </p>
          </div>

          {/* ข้อ 18 */}
          <div className="doc-section">
            <div className="doc-section-title">ข้อ 18. ความสัมพันธ์ของคู่สัญญา</div>
            <p className="doc-p">
              สัญญานี้ไม่ก่อให้เกิดความสัมพันธ์ในลักษณะหุ้นส่วน ตัวแทน ลูกจ้าง นายจ้าง หรือผู้ร่วมทุน
              ระหว่างคู่สัญญา ผู้สอนมีหน้าที่ปฏิบัติงานด้วยความสุจริต รอบคอบ และเป็นมืออาชีพ
            </p>
          </div>

          {/* ข้อ 19 */}
          <div className="doc-section">
            <div className="doc-section-title">ข้อ 19. การระงับข้อพิพาท</div>
            <p className="doc-p">
              หากมีข้อพิพาทเกิดขึ้นจากสัญญานี้ คู่สัญญาตกลงเจรจาเพื่อหาทางระงับข้อพิพาทโดยสุจริตก่อน
              หากไม่สามารถตกลงกันได้ภายใน 10 วัน นับแต่วันที่มีหนังสือแจ้งข้อพิพาท คู่สัญญามีสิทธิ
              นำข้อพิพาทเข้าสู่กระบวนการทางศาลที่มีเขตอำนาจตามกฎหมาย โดยใช้กฎหมายไทยในการตีความและ
              บังคับใช้สัญญานี้
            </p>
          </div>

          {/* ข้อ 20 */}
          <div className="doc-section">
            <div className="doc-section-title">ข้อ 20. ข้อตกลงทั้งหมด</div>
            <p className="doc-p">
              สัญญานี้ถือเป็นข้อตกลงทั้งหมดระหว่างคู่สัญญาเกี่ยวกับการรักษาความลับ การแก้ไขเพิ่มเติม
              สัญญานี้จะมีผลใช้บังคับได้ต่อเมื่อทำเป็นลายลักษณ์อักษรและลงนามโดยคู่สัญญาทั้งสองฝ่ายเท่านั้น
              สัญญาฉบับนี้ทำเป็นสองฉบับมีข้อความถูกต้องตรงกัน
            </p>
          </div>

          <div className="section-divider" />

          {/* Signature block */}
          <div className="sig-block">
            <div className="sig-box">
              <div className="sig-line" />
              <div className="sig-name-line" />
              <div className="sig-label">({data.companyRep || '………………………………'})</div>
              <div className="sig-label" style={{ marginTop: 4 }}>บริษัท / ผู้เปิดเผยข้อมูล</div>
            </div>
            <div className="sig-box">
              <div className="sig-line" />
              <div className="sig-name-line" />
              <div className="sig-label">({data.teacherName || '………………………………'})</div>
              <div className="sig-label" style={{ marginTop: 4 }}>ผู้รับข้อมูล / ผู้สอน</div>
            </div>
          </div>

          {/* Witness block */}
          <div className="witness-block">
            <div className="sig-box">
              <div className="sig-line" />
              <div className="sig-name-line" />
              <div className="sig-label">({data.witness1 || '………………………………'})</div>
              <div className="sig-label" style={{ marginTop: 4 }}>พยานที่ 1</div>
            </div>
            <div className="sig-box">
              <div className="sig-line" />
              <div className="sig-name-line" />
              <div className="sig-label">({data.witness2 || '………………………………'})</div>
              <div className="sig-label" style={{ marginTop: 4 }}>พยานที่ 2</div>
            </div>
          </div>

          {/* Attachment checklist */}
          <div className="attachment-block">
            <div className="attachment-title">เอกสารที่แนบมาด้วย</div>
            <div className="attachment-list">
              <div className="attachment-item">
                <div className="checkbox-box" />
                <span>สำเนาบัตรประจำตัวประชาชน (พร้อมลงนามสำเนาถูกต้อง)</span>
              </div>
              <div className="attachment-item">
                <div className="checkbox-box" />
                <span>สำเนาหนังสือเดินทาง / Passport (กรณีไม่มีบัตรประชาชนไทย)</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
