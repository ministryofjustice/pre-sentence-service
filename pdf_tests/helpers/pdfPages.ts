import pdfParse from 'pdf-parse'

type TextItem = { str: string }
type PageData = { getTextContent: () => Promise<{ items: TextItem[] }> }

export async function extractPages(pdf: Buffer): Promise<string[]> {
  const pages: string[] = []
  await pdfParse(pdf, {
    pagerender: async (pageData: PageData) => {
      const content = await pageData.getTextContent()
      const text = content.items.map(item => item.str).join(' ')
      pages.push(text)
      return text
    },
  })
  return pages
}

const squash = (text: string): string => text.replace(/\s+/g, '')

export function pageOf(pages: string[], needle: string): number {
  const target = squash(needle)
  const idx = pages.findIndex(page => squash(page).includes(target))
  if (idx === -1) {
    throw new Error(`"${needle}" not found on any page. Pages: ${pages.length}`)
  }
  return idx + 1
}
