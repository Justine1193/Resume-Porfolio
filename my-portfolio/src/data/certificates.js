/**
 * Auto-load local certificate PDFs from src/assets/Certificates.
 * Add files there and they will appear in the Certificates section.
 */
const pdfModules = {
  ...import.meta.glob('../assets/Certificates/*.pdf', { eager: true, import: 'default' }),
  ...import.meta.glob('../assets/Certificates/*.PDF', { eager: true, import: 'default' }),
}

function humanizeFileName(filePath) {
  const fileName = filePath.split('/').pop()?.replace(/\.(pdf)$/i, '') ?? 'Certificate'
  return fileName
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

export const CERTIFICATES = Object.entries(pdfModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, href]) => ({
    title: humanizeFileName(path),
    issuer: 'Certificate file',
    date: '—',
    href,
  }))
