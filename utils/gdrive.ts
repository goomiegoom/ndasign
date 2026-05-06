export function toDirectUrl(url: string): string {
  if (!url) return '';
  if (url.includes('drive.google.com/uc?')) return url;
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (match) return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  return url;
}
