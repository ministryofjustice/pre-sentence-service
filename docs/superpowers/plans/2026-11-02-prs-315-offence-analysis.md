# PRS-315 Offence Analysis / Edit Offences Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the read-only "Review offences from NDelius" table with an editable offence store: a summary-card review component on the Offence Analysis page, a new Edit Offences page, offence persistence in the PSR backend, and PDF generation that uses stored offences instead of a live nDelius call.

**Architecture:** Offences are stored as two question answers on a report page named `edit-offences` (`mainOffence`: a single "description - DD/MM/YYYY" string; `additionalOffences`: newline-joined strings, order preserved). On first visit to Offence Analysis (or Edit Offences), offences are fetched from nDelius once, formatted, and persisted; from then on the stored values are the source of truth and nDelius is never re-queried for offences. PDF generation reads the flattened stored answers (`configureReportData`) and no longer calls `getOffences`.

**Tech Stack:** Express + nunjucks (govuk-frontend v6 summary card), zod schemas, TypeORM-backed `reportService.updateFieldValues`, jest + ts-jest.

**Spec:** PRS-315 ticket (in conversation) + Figma mocks. Scenarios 22–23 (hint text, checkbox removal) already shipped in PR #591 — out of scope here.

## Global Constraints

- NEVER commit or push — stage files with `git add` only (user preference overrides skill defaults).
- No code comments unless explaining a constraint the code can't show.
- Copy text comes from the Figma mocks (ticket says content "shall match the approved Figma design"):
  - Review heading: `Review offences`
  - Review guidance: `You can edit offences in this PSR but your changes will not be shown in NDelius. Any further changes to offences in NDelius will not be shown in this report.`
  - Card title: `Offence details`; link: `Edit offences`; rows `Main offence` / `Additional offences`; empty state `No additional offences`
  - Edit page h1: `Edit offences`; guidance: `Any edits you make to offences in this PSR will not be shown in NDelius.`
  - Labels: `Main offence`, `Additional offences (if applicable)`; buttons `Save and continue` / `Cancel`
  - Validation message (summary + inline): `You must include a main offence`
- Edit Offences form must NOT have `data-autosave="true"` and must not include `autosaveStatus.njk` (Scenario 15).
- "No additional offences" must never appear in the PDF (Scenario 14).
- No sorting of offences anywhere (Scenarios 16–17).
- Invalid Edit Offences submissions must NOT persist anything (Scenario 11) — unlike other pages which persist-on-invalid.

## Review Focus

1. Whitespace-only Main Offence (`"   "`) submitted → must fail validation with `You must include a main offence` (pinned in Task 2 schema test).
2. Additional offences textarea with blank lines / trailing newline → blank lines dropped, order of remaining lines preserved (pinned in Task 1 `splitOffenceLines` test and Task 3 `correctFormData` test).
3. Report whose offences were never stored (old report, user never revisits Offence Analysis) generates a PDF → renders empty main offence and omits additional offences section, no nDelius offence call, no crash (pinned in Task 5 pdf service test).
4. nDelius offence fetch fails on first visit with nothing stored → Offence Analysis still renders with the existing warning fallback, nothing persisted (pinned in Task 4 controller test).
5. Invalid submit on Edit Offences (empty main offence but populated additional offences) → stored offences untouched, re-rendered form retains the typed additional offences (pinned in Task 3 controller test).

---

### Task 1: Offence storage/format utility

**Files:**
- Create: `server/utils/offenceDetails.ts`
- Test: `server/utils/offenceDetails.test.ts`

**Interfaces:**
- Consumes: `TransformedOffence`, `TransformedOffences`, `transformOffenceDetails` from `server/utils/apiDataTransformers.ts`; `ReportService.updateFieldValues`; `PreSentenceToDeliusService.getOffences`.
- Produces (used by Tasks 3, 4, 5):
  - `interface StoredOffences { mainOffence: string; additionalOffences: string[] }`
  - `formatOffenceLine(offence: TransformedOffence): string`
  - `splitOffenceLines(text: unknown): string[]`
  - `readStoredOffences(data: Record<string, unknown>): StoredOffences | null`
  - `ensureStoredOffences(data, reportId, reportService, preSentenceToDeliusService?): Promise<StoredOffences | null>`
  - `OFFENCES_PAGE_NAME = 'edit-offences'`

- [ ] **Step 1: Write the failing test**

`server/utils/offenceDetails.test.ts`:

```ts
import { formatOffenceLine, splitOffenceLines, readStoredOffences, ensureStoredOffences } from './offenceDetails'
import ReportService from '../services/reportService'
import PreSentenceToDeliusService from '../services/preSentenceToDeliusService'
import type { OffenceDetails } from '../@types/preSentenceToDelius'

jest.mock('../../logger')

const apiOffences: OffenceDetails = {
  mainOffence: {
    date: '2026-05-17',
    mainCategory: { code: '030', description: 'Arson' },
    subCategory: { code: '03001', description: 'Allowing a chimney to be on fire' },
  },
  additionalOffences: [
    {
      date: '2026-09-08',
      mainCategory: { code: '080', description: 'Driving' },
      subCategory: { code: '08001', description: 'Driving after consuming alcohol or taking drugs' },
    },
    {
      date: '2026-09-09',
      mainCategory: { code: '080', description: 'Driving' },
      subCategory: { code: '08001', description: 'Driving after consuming alcohol or taking drugs' },
    },
  ],
}

describe('formatOffenceLine', () => {
  it('joins description and date with a hyphen', () => {
    expect(formatOffenceLine({ description: 'Theft from a shop', code: 'TH68001', date: '12/04/2024' })).toBe(
      'Theft from a shop - 12/04/2024'
    )
  })
})

describe('splitOffenceLines', () => {
  it('splits on newlines, trims, drops blanks and preserves order', () => {
    expect(splitOffenceLines('First - 01/01/2026\n\n  Second - 02/01/2026  \nThird - 03/01/2026\n')).toEqual([
      'First - 01/01/2026',
      'Second - 02/01/2026',
      'Third - 03/01/2026',
    ])
  })

  it('returns an empty array for non-strings and empty strings', () => {
    expect(splitOffenceLines(undefined)).toEqual([])
    expect(splitOffenceLines('')).toEqual([])
  })
})

describe('readStoredOffences', () => {
  it('returns null when no main offence is stored', () => {
    expect(readStoredOffences({})).toBeNull()
    expect(readStoredOffences({ mainOffence: '   ' })).toBeNull()
  })

  it('returns stored offences when a main offence exists', () => {
    expect(
      readStoredOffences({ mainOffence: 'Main - 01/01/2026', additionalOffences: 'A - 02/01/2026\nB - 03/01/2026' })
    ).toEqual({ mainOffence: 'Main - 01/01/2026', additionalOffences: ['A - 02/01/2026', 'B - 03/01/2026'] })
  })
})

describe('ensureStoredOffences', () => {
  let reportService: jest.Mocked<ReportService>
  let deliusService: jest.Mocked<PreSentenceToDeliusService>

  beforeEach(() => {
    reportService = { updateFieldValues: jest.fn().mockResolvedValue(null) } as unknown as jest.Mocked<ReportService>
    deliusService = { getOffences: jest.fn().mockResolvedValue(apiOffences) } as unknown as jest.Mocked<PreSentenceToDeliusService>
  })

  it('returns stored offences without calling the API when already stored', async () => {
    const result = await ensureStoredOffences(
      { mainOffence: 'Edited offence - 01/01/2026', additionalOffences: '' },
      'report-1',
      reportService,
      deliusService
    )

    expect(result).toEqual({ mainOffence: 'Edited offence - 01/01/2026', additionalOffences: [] })
    expect(deliusService.getOffences).not.toHaveBeenCalled()
    expect(reportService.updateFieldValues).not.toHaveBeenCalled()
  })

  it('fetches, persists and returns offences on first load', async () => {
    const result = await ensureStoredOffences({}, 'report-1', reportService, deliusService)

    expect(deliusService.getOffences).toHaveBeenCalledWith('report-1')
    expect(reportService.updateFieldValues).toHaveBeenCalledWith('report-1', [
      {
        pageName: 'edit-offences',
        questionId: 0,
        questionValue: 'mainOffence',
        answer: 'Allowing a chimney to be on fire - 17/05/2026',
      },
      {
        pageName: 'edit-offences',
        questionId: 1,
        questionValue: 'additionalOffences',
        answer:
          'Driving after consuming alcohol or taking drugs - 08/09/2026\nDriving after consuming alcohol or taking drugs - 09/09/2026',
      },
    ])
    expect(result).toEqual({
      mainOffence: 'Allowing a chimney to be on fire - 17/05/2026',
      additionalOffences: [
        'Driving after consuming alcohol or taking drugs - 08/09/2026',
        'Driving after consuming alcohol or taking drugs - 09/09/2026',
      ],
    })
  })

  it('returns null when nothing is stored and the API fails', async () => {
    deliusService.getOffences.mockRejectedValue(new Error('boom'))

    const result = await ensureStoredOffences({}, 'report-1', reportService, deliusService)

    expect(result).toBeNull()
    expect(reportService.updateFieldValues).not.toHaveBeenCalled()
  })

  it('returns null when nothing is stored and no API service is provided', async () => {
    expect(await ensureStoredOffences({}, 'report-1', reportService)).toBeNull()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx jest server/utils/offenceDetails.test.ts`
Expected: FAIL — cannot find module `./offenceDetails`.

- [ ] **Step 3: Write minimal implementation**

`server/utils/offenceDetails.ts`:

```ts
import type ReportService from '../services/reportService'
import type PreSentenceToDeliusService from '../services/preSentenceToDeliusService'
import { TransformedOffence, transformOffenceDetails } from './apiDataTransformers'
import logger from '../../logger'

export const OFFENCES_PAGE_NAME = 'edit-offences'

export interface StoredOffences {
  mainOffence: string
  additionalOffences: string[]
}

export const formatOffenceLine = (offence: TransformedOffence): string => `${offence.description} - ${offence.date}`

export const splitOffenceLines = (text: unknown): string[] =>
  typeof text === 'string'
    ? text
        .split(/\r?\n/)
        .map(line => line.trim())
        .filter(Boolean)
    : []

export const readStoredOffences = (data: Record<string, unknown>): StoredOffences | null => {
  const mainOffence = typeof data.mainOffence === 'string' ? data.mainOffence.trim() : ''
  if (!mainOffence) {
    return null
  }
  return { mainOffence, additionalOffences: splitOffenceLines(data.additionalOffences) }
}

export async function ensureStoredOffences(
  data: Record<string, unknown>,
  reportId: string,
  reportService: ReportService,
  preSentenceToDeliusService?: PreSentenceToDeliusService
): Promise<StoredOffences | null> {
  const stored = readStoredOffences(data)
  if (stored) {
    return stored
  }

  if (!preSentenceToDeliusService) {
    return null
  }

  try {
    const apiData = await preSentenceToDeliusService.getOffences(reportId)
    const transformed = transformOffenceDetails(apiData)
    const mainOffence = formatOffenceLine(transformed.mainOffence)
    const additionalOffences = transformed.additionalOffences.map(formatOffenceLine)

    await reportService.updateFieldValues(reportId, [
      { pageName: OFFENCES_PAGE_NAME, questionId: 0, questionValue: 'mainOffence', answer: mainOffence },
      {
        pageName: OFFENCES_PAGE_NAME,
        questionId: 1,
        questionValue: 'additionalOffences',
        answer: additionalOffences.join('\n'),
      },
    ])

    return { mainOffence, additionalOffences }
  } catch (error) {
    logger.warn({ reportId, error }, 'Failed to fetch offence details from Pre-Sentence to Delius API')
    return null
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx jest server/utils/offenceDetails.test.ts`
Expected: PASS (all 9 tests).

- [ ] **Step 5: Stage**

```bash
git add server/utils/offenceDetails.ts server/utils/offenceDetails.test.ts
```

---

### Task 2: Edit Offences zod schema

**Files:**
- Create: `server/schemas/edit-offences.ts`
- Test: `server/schemas/edit-offences.test.ts`

**Interfaces:**
- Produces: `editOffencesModel` — zod object with `mainOffence` (required, trimmed, message `You must include a main offence`) and `additionalOffences` (optional free text, defaults to `''`). Consumed by Task 3.

- [ ] **Step 1: Write the failing test**

`server/schemas/edit-offences.test.ts`:

```ts
import { editOffencesModel } from './edit-offences'

describe('editOffencesModel', () => {
  it('accepts a main offence with optional additional offences', () => {
    const result = editOffencesModel.safeParse({
      mainOffence: 'Allowing a chimney to be on fire - 17/05/2026',
      additionalOffences: 'Driving after consuming alcohol or taking drugs - 08/09/2026',
    })
    expect(result.success).toBe(true)
  })

  it('accepts a missing additionalOffences field', () => {
    const result = editOffencesModel.safeParse({ mainOffence: 'Theft from a shop - 01/01/2026' })
    expect(result.success).toBe(true)
  })

  it.each(['', '   ', undefined])('rejects main offence %p', value => {
    const result = editOffencesModel.safeParse({ mainOffence: value, additionalOffences: '' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('You must include a main offence')
      expect(result.error.issues[0].path).toEqual(['mainOffence'])
    }
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx jest server/schemas/edit-offences.test.ts`
Expected: FAIL — cannot find module `./edit-offences`.

- [ ] **Step 3: Write minimal implementation**

`server/schemas/edit-offences.ts`:

```ts
import * as z from 'zod'

const MAIN_OFFENCE_REQUIRED = 'You must include a main offence'

export const editOffencesModel = z.object({
  mainOffence: z.preprocess(
    value => (typeof value === 'string' ? value.trim() : ''),
    z.string().min(1, MAIN_OFFENCE_REQUIRED)
  ),
  additionalOffences: z.preprocess(value => (typeof value === 'string' ? value : ''), z.string()),
})
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx jest server/schemas/edit-offences.test.ts`
Expected: PASS (4 tests).

- [ ] **Step 5: Stage**

```bash
git add server/schemas/edit-offences.ts server/schemas/edit-offences.test.ts
```

---

### Task 3: Edit Offences controller, route, view (+ persist-on-invalid opt-out)

**Files:**
- Modify: `server/controllers/shared/sharedController.ts` (add `protected persistOnValidationFailure = true`; honour it in `post()` around the `persistOnInvalid` call at ~line 384)
- Create: `server/controllers/psr/edit-offences-controller.ts`
- Create: `server/views/psr/edit-offences.njk`
- Modify: `server/routes/psr/index.ts` (register GET/POST `/:reportId/edit-offences`)
- Test: `server/controllers/psr/edit-offences-controller.test.ts`

**Interfaces:**
- Consumes: `editOffencesModel` (Task 2), `ensureStoredOffences` / `splitOffenceLines` (Task 1), `BaseController`.
- Produces: route `/psr/:reportId/edit-offences` (GET renders `psr/edit-offences`, POST saves `mainOffence` + `additionalOffences` under page `edit-offences` and redirects to `offence-analysis`). The Offence Analysis view (Task 4) links to this route.

- [ ] **Step 1: Write the failing test**

`server/controllers/psr/edit-offences-controller.test.ts` (mirrors the setup style of `offence-analysis-controller.test.ts`):

```ts
import { Request, Response } from 'express'
import EditOffencesController from './edit-offences-controller'
import ReportService from '../../services/reportService'
import PreSentenceToDeliusService from '../../services/preSentenceToDeliusService'
import type { OffenceDetails } from '../../@types/preSentenceToDelius'

jest.mock('../../services/reportService')
jest.mock('../../services/preSentenceToDeliusService')
jest.mock('../../../logger')

const apiOffences: OffenceDetails = {
  mainOffence: {
    date: '2026-05-17',
    mainCategory: { code: '030', description: 'Arson' },
    subCategory: { code: '03001', description: 'Allowing a chimney to be on fire' },
  },
  additionalOffences: [],
}

describe('EditOffencesController', () => {
  let controller: EditOffencesController
  let mockReportService: jest.Mocked<ReportService>
  let mockPreSentenceToDeliusService: jest.Mocked<PreSentenceToDeliusService>
  let mockRequest: Partial<Request>
  let mockResponse: Partial<Response>

  const reportWithStoredOffences = {
    id: 'report-123',
    reportType: 'PSR',
    status: 'STARTED',
    pages: [
      {
        name: 'edit-offences',
        questions: [
          { id: 0, value: 'mainOffence', answer: 'Stored main offence - 01/01/2026' },
          { id: 1, value: 'additionalOffences', answer: 'Stored additional - 02/01/2026' },
        ],
      },
    ],
    person: { id: 1, crn: 'X123456' },
  }

  beforeEach(() => {
    jest.clearAllMocks()

    mockReportService = new ReportService() as jest.Mocked<ReportService>
    mockReportService.getReportById = jest.fn().mockResolvedValue(reportWithStoredOffences)
    mockReportService.updateFieldValues = jest.fn().mockResolvedValue(null)
    mockReportService.updateReport = jest.fn().mockResolvedValue(null)
    mockReportService.getSourcesOfInformation = jest.fn().mockResolvedValue([])
    mockReportService.persistPartialFieldValues = jest.fn().mockResolvedValue({ persisted: [], dropped: [] })

    mockPreSentenceToDeliusService = {
      getDefendantDetails: jest.fn().mockRejectedValue(new Error('not stubbed')),
      getOffences: jest.fn().mockResolvedValue(apiOffences),
    } as unknown as jest.Mocked<PreSentenceToDeliusService>

    mockRequest = {
      params: { reportId: 'report-123' },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      session: {} as any,
      path: '/psr/report-123/edit-offences',
      query: {},
      body: {},
    } as Partial<Request>

    mockResponse = { render: jest.fn(), redirect: jest.fn(), locals: {} } as Partial<Response>

    controller = new EditOffencesController(mockReportService, mockPreSentenceToDeliusService)
  })

  describe('get', () => {
    it('renders stored offences without calling the offences API', async () => {
      await controller.get(mockRequest as Request<{ reportId: string }>, mockResponse as Response)

      expect(mockPreSentenceToDeliusService.getOffences).not.toHaveBeenCalled()
      expect(mockResponse.render).toHaveBeenCalledWith(
        'psr/edit-offences',
        expect.objectContaining({
          data: expect.objectContaining({
            mainOffence: 'Stored main offence - 01/01/2026',
            additionalOffences: 'Stored additional - 02/01/2026',
          }),
        })
      )
    })

    it('seeds offences from the API when none are stored', async () => {
      mockReportService.getReportById = jest.fn().mockResolvedValue({ ...reportWithStoredOffences, pages: [] })
      controller = new EditOffencesController(mockReportService, mockPreSentenceToDeliusService)

      await controller.get(mockRequest as Request<{ reportId: string }>, mockResponse as Response)

      expect(mockPreSentenceToDeliusService.getOffences).toHaveBeenCalledWith('report-123')
      expect(mockReportService.updateFieldValues).toHaveBeenCalledWith('report-123', [
        {
          pageName: 'edit-offences',
          questionId: 0,
          questionValue: 'mainOffence',
          answer: 'Allowing a chimney to be on fire - 17/05/2026',
        },
        { pageName: 'edit-offences', questionId: 1, questionValue: 'additionalOffences', answer: '' },
      ])
      expect(mockResponse.render).toHaveBeenCalledWith(
        'psr/edit-offences',
        expect.objectContaining({
          data: expect.objectContaining({ mainOffence: 'Allowing a chimney to be on fire - 17/05/2026' }),
        })
      )
    })
  })

  describe('post', () => {
    it('saves trimmed offences and redirects back to offence analysis', async () => {
      mockRequest.body = {
        mainOffence: '  Edited offence - 05/05/2026  ',
        additionalOffences: 'One - 01/01/2026\n\n  Two - 02/01/2026 \n',
        CSRFToken: 'token',
        reportId: 'report-123',
        pageName: 'edit-offences',
      }

      await controller.post(mockRequest as Request<{ reportId: string }>, mockResponse as Response)

      expect(mockReportService.updateFieldValues).toHaveBeenCalledWith('report-123', [
        {
          pageName: 'edit-offences',
          questionId: 0,
          questionValue: 'mainOffence',
          answer: 'Edited offence - 05/05/2026',
        },
        {
          pageName: 'edit-offences',
          questionId: 1,
          questionValue: 'additionalOffences',
          answer: 'One - 01/01/2026\nTwo - 02/01/2026',
        },
      ])
      expect(mockResponse.redirect).toHaveBeenCalledWith('/psr/report-123/offence-analysis')
    })

    it('re-renders with an error and persists nothing when main offence is empty', async () => {
      mockRequest.body = {
        mainOffence: '',
        additionalOffences: 'Kept in form - 01/01/2026',
        CSRFToken: 'token',
        reportId: 'report-123',
        pageName: 'edit-offences',
      }

      await controller.post(mockRequest as Request<{ reportId: string }>, mockResponse as Response)

      expect(mockResponse.redirect).not.toHaveBeenCalled()
      expect(mockReportService.updateFieldValues).not.toHaveBeenCalled()
      expect(mockReportService.persistPartialFieldValues).not.toHaveBeenCalled()
      expect(mockResponse.render).toHaveBeenCalledWith(
        'psr/edit-offences',
        expect.objectContaining({
          formValidation: expect.objectContaining({
            isValid: false,
            errors: expect.objectContaining({ mainOffence: 'You must include a main offence' }),
          }),
          data: expect.objectContaining({ additionalOffences: 'Kept in form - 01/01/2026' }),
        })
      )
    })
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx jest server/controllers/psr/edit-offences-controller.test.ts`
Expected: FAIL — cannot find module `./edit-offences-controller`.

- [ ] **Step 3: Implement**

3a. `server/controllers/shared/sharedController.ts` — add the flag below the `pageFields` declaration:

```ts
  persistOnValidationFailure = true
```

and change the invalid branch in `post()` from:

```ts
      if (this.templatePath !== 'sources-of-information') {
        await this.persistOnInvalid(req, reportId)
      }
```

to:

```ts
      if (this.templatePath !== 'sources-of-information' && this.persistOnValidationFailure) {
        await this.persistOnInvalid(req, reportId)
      }
```

3b. `server/controllers/psr/edit-offences-controller.ts`:

```ts
import BaseController from './baseController'
import { Request, Response } from 'express'
import PreSentenceToDeliusService from '../../services/preSentenceToDeliusService'
import { editOffencesModel } from '../../schemas/edit-offences'
import { ensureStoredOffences, splitOffenceLines } from '../../utils/offenceDetails'

export const pageFields: Array<string> = ['mainOffence', 'additionalOffences']

export default class EditOffencesController extends BaseController {
  override templatePath = 'edit-offences'

  override redirectPath = 'offence-analysis'

  override pageFields = pageFields

  override model = editOffencesModel

  override persistOnValidationFailure = false

  constructor(
    reportService: import('../../services/reportService').default,
    preSentenceToDeliusService?: PreSentenceToDeliusService
  ) {
    super(reportService, preSentenceToDeliusService)
  }

  override correctFormData = (req: Request) => ({
    mainOffence: typeof req.body.mainOffence === 'string' ? req.body.mainOffence.trim() : '',
    additionalOffences: splitOffenceLines(req.body.additionalOffences).join('\n'),
  })

  protected override async beforeRender(req: Request<{ reportId: string }>, _res: Response): Promise<void> {
    const offences = await ensureStoredOffences(
      this.data,
      req.params.reportId,
      this.reportService,
      this.preSentenceToDeliusService
    )

    if (offences) {
      this.data = {
        ...this.data,
        mainOffence: offences.mainOffence,
        additionalOffences: offences.additionalOffences.join('\n'),
      }
    }
  }
}
```

(Note: `correctFormData` and `persistOnValidationFailure` are plain class properties on `SharedController`; if `override` upsets the compiler on the assigned-function property, drop the `override` keyword there to match `sources-of-information-controller.ts`.)

3c. `server/views/psr/edit-offences.njk`:

```njk
{% extends "../partials/psrPageLayout.njk" %}

{% from "govuk/components/input/macro.njk" import govukInput %}
{% from "govuk/components/textarea/macro.njk" import govukTextarea %}

{% set currentPage = 'Offence analysis' %}
{% set pageTitle = preSentenceType + " - Edit offences" %}

{% block reportForm %}

<form method="post" novalidate>
  <div class="govuk-!-margin-bottom-7">
    <h1 class="govuk-heading-xl govuk-!-margin-bottom-4">Edit offences</h1>
  </div>

  <section class="section-wrapper">
    <p class="govuk-body">Any edits you make to offences in this PSR will not be shown in NDelius.</p>

    {{ govukInput({
      label: {
        text: "Main offence",
        classes: "govuk-label--s"
      },
      name: "mainOffence",
      id: "mainOffence",
      value: data.mainOffence,
      errorMessage: {
        text: formValidation.errors.mainOffence
      } if 'mainOffence' in elementsWithError
    }) }}

    {{ govukTextarea({
      label: {
        text: "Additional offences (if applicable)",
        classes: "govuk-label--s"
      },
      name: "additionalOffences",
      id: "additionalOffences",
      rows: "5",
      value: data.additionalOffences
    }) }}
  </section>

  <input type="hidden" name="CSRFToken" value="{{ csrfToken }}">
  <input type="hidden" name="reportId" value="{{ reportId }}">
  <input type="hidden" name="pageName" value="{{ pageName }}">

  <div class="govuk-button-group">
    <button class="govuk-button">Save and continue</button>
    <a class="govuk-link" href="/{{ reportPath }}/{{ reportId }}/offence-analysis">Cancel</a>
  </div>
</form>

{% endblock %}
```

3d. `server/routes/psr/index.ts` — import the controller and register after the offence-analysis routes:

```ts
import EditOffencesController from '../../controllers/psr/edit-offences-controller'
```

```ts
  get('/:reportId/edit-offences', (req, res) => {
    return new EditOffencesController(reportService, preSentenceToDeliusService).get(req, res)
  })
  post('/:reportId/edit-offences', (req, res) => {
    return new EditOffencesController(reportService, preSentenceToDeliusService).post(req, res)
  })
```

- [ ] **Step 4: Run tests**

Run: `npx jest server/controllers/psr/edit-offences-controller.test.ts server/controllers/shared/sharedController.test.ts server/controllers/psr/offence-analysis-controller.persist-on-invalid.test.ts`
Expected: PASS — new tests green, existing persist-on-invalid behaviour for other pages unchanged.

- [ ] **Step 5: Stage**

```bash
git add server/controllers/shared/sharedController.ts server/controllers/psr/edit-offences-controller.ts server/controllers/psr/edit-offences-controller.test.ts server/views/psr/edit-offences.njk server/routes/psr/index.ts
```

---

### Task 4: Offence Analysis page — controller + review component

**Files:**
- Modify: `server/controllers/psr/offence-analysis-controller.ts`
- Modify: `server/views/psr/offence-analysis.njk`
- Test: `server/controllers/psr/offence-analysis-controller.test.ts` (rewrite `beforeRender hook` describe block)
- Test: Create `server/views/psr/offence-analysis.test.ts` (view render checks)

**Interfaces:**
- Consumes: `ensureStoredOffences`, `StoredOffences` (Task 1); route `/psr/:reportId/edit-offences` (Task 3).
- Produces: template data `data.offences: StoredOffences | null` and `data.offencesAvailable: boolean` (replaces `offencesData`/`apiOffencesAvailable`).

- [ ] **Step 1: Rewrite controller tests (failing first)**

In `server/controllers/psr/offence-analysis-controller.test.ts`, replace the `beforeRender hook` describe block with (keep the file's existing setup, add `mockReportService.updateFieldValues`, `updateReport`, `getSourcesOfInformation` stubs in `beforeEach` as in Task 3's test):

```ts
  describe('beforeRender hook', () => {
    it('seeds offences from the API and persists them when none are stored', async () => {
      mockPreSentenceToDeliusService.getOffences.mockResolvedValue(mockApiOffenceDetails)

      await controller.get(mockRequest as Request<{ reportId: string }>, mockResponse as Response)

      expect(mockPreSentenceToDeliusService.getOffences).toHaveBeenCalledWith('report-123')
      expect(mockReportService.updateFieldValues).toHaveBeenCalledWith('report-123', [
        {
          pageName: 'edit-offences',
          questionId: 0,
          questionValue: 'mainOffence',
          answer: 'Criminal damage to property - 12/04/2024',
        },
        {
          pageName: 'edit-offences',
          questionId: 1,
          questionValue: 'additionalOffences',
          answer: 'Assault on emergency worker - 12/04/2024\nPossession of class A drugs - 12/04/2024',
        },
      ])
      expect(mockResponse.render).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          data: expect.objectContaining({
            offences: {
              mainOffence: 'Criminal damage to property - 12/04/2024',
              additionalOffences: [
                'Assault on emergency worker - 12/04/2024',
                'Possession of class A drugs - 12/04/2024',
              ],
            },
            offencesAvailable: true,
          }),
        })
      )
    })

    it('uses stored offences and does not call the API when offences are already stored', async () => {
      mockReportService.getReportById = jest.fn().mockResolvedValue({
        ...mockReport,
        pages: [
          {
            name: 'edit-offences',
            questions: [
              { id: 0, value: 'mainOffence', answer: 'Edited offence - 01/01/2026' },
              { id: 1, value: 'additionalOffences', answer: '' },
            ],
          },
        ],
      })
      controller = new OffenceAnalysisController(mockReportService, mockPreSentenceToDeliusService)

      await controller.get(mockRequest as Request<{ reportId: string }>, mockResponse as Response)

      expect(mockPreSentenceToDeliusService.getOffences).not.toHaveBeenCalled()
      expect(mockReportService.updateFieldValues).not.toHaveBeenCalled()
      expect(mockResponse.render).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          data: expect.objectContaining({
            offences: { mainOffence: 'Edited offence - 01/01/2026', additionalOffences: [] },
            offencesAvailable: true,
          }),
        })
      )
    })

    it('handles API errors gracefully when nothing is stored', async () => {
      mockPreSentenceToDeliusService.getOffences.mockRejectedValue(new Error('API Error'))

      await controller.get(mockRequest as Request<{ reportId: string }>, mockResponse as Response)

      expect(mockReportService.updateFieldValues).not.toHaveBeenCalled()
      expect(mockResponse.render).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          data: expect.objectContaining({ offencesAvailable: false }),
        })
      )
    })

    it('should work without PreSentenceToDeliusService injected', async () => {
      const controllerWithoutService = new OffenceAnalysisController(mockReportService)

      await controllerWithoutService.get(mockRequest as Request<{ reportId: string }>, mockResponse as Response)

      expect(mockResponse.render).toHaveBeenCalled()
    })
  })
```

Run: `npx jest server/controllers/psr/offence-analysis-controller.test.ts` — expected FAIL (controller still produces `offencesData`).

- [ ] **Step 2: Rewrite the controller**

`server/controllers/psr/offence-analysis-controller.ts` — replace `beforeRender` (and drop now-unused imports):

```ts
import BaseController from './baseController'
import { Request, Response } from 'express'
import PreSentenceToDeliusService from '../../services/preSentenceToDeliusService'
import { offenceAnalysisModel } from '../../schemas/offence-analysis'
import { ensureStoredOffences } from '../../utils/offenceDetails'

export const pageFields: Array<string> = ['pnc', 'offencesUnderConsideration', 'offencesPattern']

export default class OffenceAnalysisController extends BaseController {
  override templatePath = 'offence-analysis'

  override redirectPath = 'defendant-behaviour'

  override pageFields = pageFields

  override model = offenceAnalysisModel

  constructor(
    reportService: import('../../services/reportService').default,
    preSentenceToDeliusService?: PreSentenceToDeliusService
  ) {
    super(reportService, preSentenceToDeliusService)
  }

  protected override async beforeRender(req: Request<{ reportId: string }>, _res: Response): Promise<void> {
    const offences = await ensureStoredOffences(
      this.data,
      req.params.reportId,
      this.reportService,
      this.preSentenceToDeliusService
    )

    this.data = {
      ...this.data,
      offences,
      offencesAvailable: Boolean(offences),
    }
  }
}
```

- [ ] **Step 3: Update the view**

In `server/views/psr/offence-analysis.njk`, replace the imports at the top:

```njk
{% from "govuk/components/summary-list/macro.njk" import govukSummaryList %}
{% from "components/text-editor/macro.njk" import picTextEditor %}
```

and replace the whole "Review offences from NDelius" section (lines 20–72) with:

```njk
  <section class="section-wrapper">
    <h2 class="govuk-heading-l govuk-!-margin-bottom-6">Review offences</h2>
    <p class="govuk-body">You can edit offences in this PSR but your changes will not be shown in NDelius.
    Any further changes to offences in NDelius will not be shown in this report.</p>

    {% if data.offencesAvailable %}
      {% set additionalOffencesHtml %}
        {% if data.offences.additionalOffences | length %}
          {% for offence in data.offences.additionalOffences %}
            <p class="govuk-body govuk-!-margin-bottom-1">{{ offence }}</p>
          {% endfor %}
        {% else %}
          No additional offences
        {% endif %}
      {% endset %}

      {{ govukSummaryList({
        card: {
          title: { text: "Offence details" },
          actions: {
            items: [
              {
                href: "/" + reportPath + "/" + reportId + "/edit-offences",
                text: "Edit offences",
                visuallyHiddenText: "offence details"
              }
            ]
          }
        },
        rows: [
          { key: { text: "Main offence" }, value: { text: data.offences.mainOffence } },
          { key: { text: "Additional offences" }, value: { html: additionalOffencesHtml } }
        ]
      }) }}
    {% else %}
      <div class="govuk-warning-text">
        <span class="govuk-warning-text__icon" aria-hidden="true">!</span>
        <strong class="govuk-warning-text__text">
          <span class="govuk-visually-hidden">Warning</span>
          Unable to fetch offence details from NDelius. Please refresh the page or check NDelius directly.
        </strong>
      </div>
    {% endif %}
  </section>
```

- [ ] **Step 4: Write the view render test**

`server/views/psr/offence-analysis.test.ts` (reuse the nunjucks setup pattern from `preview-report.test.ts`, including the same `jest.mock('../../config', ...)` block):

```ts
import express from 'express'
import nunjucks from 'nunjucks'
import path from 'path'

jest.mock('../../config', () => ({
  __esModule: true,
  default: {
    nonce: 'test-nonce',
    features: { richTextEditor: true },
    session: { expiryMinutes: 120, warningMinutes: 2 },
    wproofreader: {
      bundleUrl: 'https://spellcheck.example.com/wscservice/wscbundle/wscbundle.js',
      host: 'spellcheck.example.com',
    },
  },
}))

import nunjucksSetup from '../../utils/nunjucksSetup'

const baseContext = {
  reportId: '123',
  reportPath: 'psr',
  preSentenceType: 'Pre-Sentence Report',
  pageName: 'offence-analysis',
  csrfToken: 'test-token',
  nonce: 'test-nonce',
  formValidation: { errors: {} },
}

describe('offence analysis and edit offences views', () => {
  let env: nunjucks.Environment

  beforeAll(() => {
    const app = express()
    const configureSpy = jest.spyOn(nunjucks, 'configure')
    nunjucksSetup(app, path)
    env = configureSpy.mock.results[0].value as nunjucks.Environment
    configureSpy.mockRestore()
  })

  const renderOffenceAnalysis = (offences: { mainOffence: string; additionalOffences: string[] } | null) =>
    env.render('psr/offence-analysis.njk', {
      ...baseContext,
      data: {
        offences,
        offencesAvailable: Boolean(offences),
        offencesUnderConsideration: '',
        offencesPattern: '',
        reviewSectionsComplete: false,
        sectionStatuses: {},
      },
    })

  it('shows the review offences card with an edit offences link', () => {
    const html = renderOffenceAnalysis({
      mainOffence: 'Allowing a chimney to be on fire - 17/05/2026',
      additionalOffences: ['Driving after consuming alcohol or taking drugs - 08/09/2026'],
    })

    expect(html).toContain('Review offences')
    expect(html).not.toContain('Review offences from NDelius')
    expect(html).toContain('Offence details')
    expect(html).toContain('/psr/123/edit-offences')
    expect(html).toContain('Edit offences')
    expect(html).toContain('Allowing a chimney to be on fire - 17/05/2026')
    expect(html).toContain('Driving after consuming alcohol or taking drugs - 08/09/2026')
    expect(html).not.toContain('No additional offences')
  })

  it('shows "No additional offences" when there are none', () => {
    const html = renderOffenceAnalysis({ mainOffence: 'Main - 01/01/2026', additionalOffences: [] })

    expect(html).toContain('No additional offences')
  })

  it('renders the edit offences form without autosave', () => {
    const html = env.render('psr/edit-offences.njk', {
      ...baseContext,
      pageName: 'edit-offences',
      data: {
        mainOffence: 'Main - 01/01/2026',
        additionalOffences: 'A - 02/01/2026\nB - 03/01/2026',
        reviewSectionsComplete: false,
        sectionStatuses: {},
      },
    })

    expect(html).toContain('Edit offences')
    expect(html).toContain('Any edits you make to offences in this PSR will not be shown in NDelius.')
    expect(html).not.toContain('data-autosave')
    expect(html).toContain('Main offence')
    expect(html).toContain('Additional offences (if applicable)')
    expect(html).toContain('Save and continue')
    expect(html).toContain('/psr/123/offence-analysis')
  })

  it('shows the main offence validation error inline and in the summary', () => {
    const html = env.render('psr/edit-offences.njk', {
      ...baseContext,
      pageName: 'edit-offences',
      formValidation: { isValid: false, errors: { mainOffence: 'You must include a main offence' } },
      data: { mainOffence: '', additionalOffences: '', reviewSectionsComplete: false, sectionStatuses: {} },
    })

    expect(html).toContain('There is a problem')
    expect(html).toContain('#mainOffence')
    expect(html.match(/You must include a main offence/g)!.length).toBeGreaterThanOrEqual(2)
  })
})
```

- [ ] **Step 5: Run tests**

Run: `npx jest server/controllers/psr/offence-analysis-controller.test.ts server/views/psr/offence-analysis.test.ts server/views/psr/preview-report.test.ts`
Expected: PASS. (`preview-report.test.ts` renders `offence-analysis.njk` with stale keys `offencesData`/`apiOffencesAvailable`; the new view must fall into the warning branch without throwing. If its fixture now has unused keys, leave them — they are harmless.)

- [ ] **Step 6: Stage**

```bash
git add server/controllers/psr/offence-analysis-controller.ts server/controllers/psr/offence-analysis-controller.test.ts server/views/psr/offence-analysis.njk server/views/psr/offence-analysis.test.ts
```

---

### Task 5: PDF generation uses stored offences

**Files:**
- Modify: `server/services/pdfGenerationService.ts`
- Modify: `server/views/reports/psr.njk`
- Test: `server/services/pdfGenerationService.test.ts`
- Modify: `pdf_tests/helpers/fixtureData.ts` (offenceData shape)

**Interfaces:**
- Consumes: `splitOffenceLines` (Task 1), stored answers `mainOffence` / `additionalOffences` flattened by `configureReportData`.
- Produces: template data `data.offenceData: { mainOffence: string; additionalOffences: string[] }` for `reports/psr.njk`.

- [ ] **Step 1: Update the service test (failing first)**

In `server/services/pdfGenerationService.test.ts`:
- Add stored offence questions to the `report` fixture's questions array:

```ts
        { value: 'mainOffence', answer: 'Allowing a chimney to be on fire - 17/05/2026' },
        {
          value: 'additionalOffences',
          answer:
            'Driving after consuming alcohol or taking drugs - 08/09/2026\nDriving after consuming alcohol or taking drugs - 09/09/2026',
        },
```

- Add a test:

```ts
  it('builds offence data from the stored report without calling the offences API', async () => {
    const renderPDF = jest.fn()
    const res = { renderPDF } as unknown as Response

    const service = new PdfGenerationService(preSentenceToDeliusService, sourcesOfInformationService)
    await service.generatePdf(report, res)

    expect(preSentenceToDeliusService.getOffences).not.toHaveBeenCalled()
    expect(renderPDF).toHaveBeenCalledWith(
      'reports/psr',
      expect.objectContaining({
        data: expect.objectContaining({
          offenceData: {
            mainOffence: 'Allowing a chimney to be on fire - 17/05/2026',
            additionalOffences: [
              'Driving after consuming alcohol or taking drugs - 08/09/2026',
              'Driving after consuming alcohol or taking drugs - 09/09/2026',
            ],
          },
        }),
      }),
      expect.anything()
    )
  })

  it('renders an empty offence section when the report has no stored offences', async () => {
    const renderPDF = jest.fn()
    const res = { renderPDF } as unknown as Response
    const service = new PdfGenerationService(preSentenceToDeliusService, sourcesOfInformationService)

    await service.generatePdf(legacyReport, res)

    expect(renderPDF).toHaveBeenCalledWith(
      'reports/psr',
      expect.objectContaining({
        data: expect.objectContaining({
          offenceData: { mainOffence: '', additionalOffences: [] },
        }),
      }),
      expect.anything()
    )
  })
```

(For the second test, build `legacyReport` without the offence questions — it already filters questions, extend the filter to also drop `mainOffence`/`additionalOffences`, or keep `legacyReport` derived from the pre-offence fixture by defining the offence questions only on `report` after `legacyReport` is created. Simplest: define `legacyReport` from the original question list before pushing offence answers — adjust fixture wiring so `legacyReport` has neither `riskToPrisoners` nor offence answers.)

Also update `jest.clearAllMocks()` usage if needed so `getOffences` call counts are per-test (add `beforeEach(() => { (preSentenceToDeliusService.getOffences as jest.Mock).mockClear() })` if assertions interfere).

Run: `npx jest server/services/pdfGenerationService.test.ts` — expected FAIL (service still calls `getOffences` and passes API shape).

- [ ] **Step 2: Update the service**

In `server/services/pdfGenerationService.ts`:
- Add import: `import { splitOffenceLines } from '../utils/offenceDetails'`
- Delete line: `const offenceData = await this.preSentenceToDeliusService.getOffences(reportId)`
- In `pdfData`, replace `offenceData,` with:

```ts
      offenceData: {
        mainOffence: typeof reportData.mainOffence === 'string' ? reportData.mainOffence : '',
        additionalOffences: splitOffenceLines(reportData.additionalOffences),
      },
```

- [ ] **Step 3: Update the PDF template**

In `server/views/reports/psr.njk`, replace the offence table (lines 30–52, the `<table>` block under "Offence analysis") with:

```njk
    <div class="govuk-body-s govuk-!-margin-bottom-2"><strong>Main offence: </strong>{{ data.offenceData.mainOffence }}</div>

    {% if data.offenceData.additionalOffences | length %}
        <div class="govuk-body-s govuk-!-margin-bottom-2"><strong>Additional offences:</strong></div>
        {% for offence in data.offenceData.additionalOffences %}
            <p class="govuk-body-s govuk-!-margin-bottom-1">{{ offence }}</p>
        {% endfor %}
    {% endif %}
```

(The additional offences block is omitted entirely when empty — Scenario 14: no "No additional offences" text in the PDF.)

- [ ] **Step 4: Update the pdf_tests fixture**

In `pdf_tests/helpers/fixtureData.ts`, change the `offenceData` entry (around line 19) to the new shape:

```ts
    offenceData: {
      mainOffence: 'Test main offence - 01/01/2026',
      additionalOffences: [],
    },
```

- [ ] **Step 5: Run tests**

Run: `npx jest server/services/pdfGenerationService.test.ts server/utils/pdfFormat.test.ts`
Expected: PASS.

- [ ] **Step 6: Stage**

```bash
git add server/services/pdfGenerationService.ts server/services/pdfGenerationService.test.ts server/views/reports/psr.njk pdf_tests/helpers/fixtureData.ts
```

---

### Task 6: Whole-suite verification

**Files:** none new.

- [ ] **Step 1: Typecheck + lint**

Run: `npm run typecheck && npm run lint`
Expected: both clean (lint uses `--max-warnings 0`).

- [ ] **Step 2: Full unit suite**

Run: `npm test`
Expected: all pass EXCEPT the pre-existing environment-dependent failures in sessionTimeout/index route tests caused by the local `.env` timeout override (documented in project memory — they fail locally, pass in CI). Any failure in offence/pdf/controller/view tests must be fixed before finishing.

- [ ] **Step 3: End-to-end sanity check (verify skill)**

Use the `verify` skill: run the app against the wiremock delius stub (`.env` already points there), walk Offence Analysis → Edit offences → save → back, confirm:
- stored offences persist across refresh and are not overwritten by the (stubbed) nDelius data,
- empty main offence shows the error summary + inline error,
- Cancel discards changes,
- draft PDF renders stored offences without a `getOffences` network call.

- [ ] **Step 4: Stage any remaining files; do NOT commit**

```bash
git add -A -- server pdf_tests docs/superpowers/plans
git status
```
