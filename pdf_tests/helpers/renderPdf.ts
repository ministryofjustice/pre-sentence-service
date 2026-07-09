import * as fs from 'fs'
import * as path from 'path'
import nunjucks from 'nunjucks'
import superagent from 'superagent'
import GotenbergClient from '../../server/data/gotenbergClient'
import { pdfOptions, getHeader, getDraftHeader, getFooter, getDraftFooter } from '../../server/utils/pdfFormat'

const ROOT = path.join(__dirname, '../..')

export const GOTENBERG_URL = process.env.GOTENBERG_API_URL || 'http://localhost:3001'

const env = nunjucks.configure(
  [
    path.join(ROOT, 'server/views'),
    ROOT,
    path.join(ROOT, 'node_modules/govuk-frontend/dist'),
    path.join(ROOT, 'node_modules/govuk-frontend/dist/govuk/components/'),
  ],
  { autoescape: true }
)

env.addFilter('formatDate', (date: unknown) => (date ? String(date) : ''))

export function renderPsrHtml(data: Record<string, unknown>): string {
  return env.render('reports/psr.njk', { data })
}

function logoB64(file: string): string {
  return fs.readFileSync(path.join(ROOT, 'assets/images', file)).toString('base64')
}

export async function assertGotenbergUp(): Promise<void> {
  try {
    await superagent.get(`${GOTENBERG_URL}/health`).timeout(3000)
  } catch (err) {
    throw new Error(
      `Gotenberg is not reachable at ${GOTENBERG_URL}. Start it with: docker compose up -d gotenberg (${err})`
    )
  }
}

export async function convertToPdf(html: string, opts: { draft?: boolean } = {}): Promise<Buffer> {
  const arms = logoB64('HMPPS_Lesser_Arms_Stacked_HEX.png')
  const purple = logoB64('ProbationPurple.png')
  const headerHtml = opts.draft ? getDraftHeader(arms, purple) : getHeader(arms, purple)
  const footerHtml = opts.draft ? getDraftFooter() : getFooter()
  const client = new GotenbergClient(GOTENBERG_URL)
  return client.renderPdfFromHtml(html, { ...pdfOptions, headerHtml, footerHtml })
}
