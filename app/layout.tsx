import type { Metadata } from 'next';
import { Sarabun, Noto_Serif_Thai } from 'next/font/google';
import './globals.css';

const sarabun = Sarabun({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['thai', 'latin'],
  variable: '--font-sarabun',
  display: 'swap',
});

const notoSerifThai = Noto_Serif_Thai({
  weight: ['400', '600', '700'],
  subsets: ['thai', 'latin'],
  variable: '--font-noto-serif-thai',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Mentora NDA — กรอกข้อมูลสัญญา',
  description: 'สัญญารักษาความลับและไม่เปิดเผยข้อมูล — Mentora Consulting Group',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" className={`${sarabun.variable} ${notoSerifThai.variable}`}>
      <body>{children}</body>
    </html>
  );
}
