const HTML_ESCAPE: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, ch => HTML_ESCAPE[ch])
}

export function plainTextToEditorHtml(value: unknown): string {
  if (value === null || value === undefined || value === '') return ''
  const s = typeof value === 'string' ? value : String(value)
  if (s === '') return ''

  const paragraphs = s.split(/\n{2,}/)
  return paragraphs.map(p => `<p>${escapeHtml(p).replace(/\n/g, '<br>')}</p>`).join('')
}
