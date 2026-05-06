'use client';

interface FillBlankProps {
  value: string;
  fallback?: string;
  size?: 'short' | 'normal' | 'long';
}

export default function FillBlank({ value, fallback = '……………………………', size = 'normal' }: FillBlankProps) {
  const isEmpty = !value || value.trim() === '';
  const minWidth = size === 'short' ? '100px' : size === 'long' ? '300px' : '180px';

  return (
    <span
      style={{
        display: 'inline-block',
        borderBottom: '1px solid #333',
        minWidth,
        padding: '0 4px',
        fontWeight: isEmpty ? 400 : 600,
        color: isEmpty ? '#bbb' : 'var(--navy)',
        fontStyle: isEmpty ? 'italic' : 'normal',
        textAlign: 'center',
      }}
    >
      {isEmpty ? fallback : value}
    </span>
  );
}
