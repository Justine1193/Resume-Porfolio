const designFiles = import.meta.glob('../assets/designs/*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
})

function readableName(path) {
  const name = path.split('/').pop() ?? 'Design'
  return name
    .replace(/\.[^/.]+$/, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

export const GRAPHICS_DESIGNS = Object.entries(designFiles)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, src]) => ({
    title: readableName(path),
    src,
  }))
