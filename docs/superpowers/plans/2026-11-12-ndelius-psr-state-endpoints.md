# nDelius PSR State Endpoints Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** nDelius can lock, unlock, and soft-delete PSRs via authenticated API endpoints; every status change is audited; users hitting a locked/deleted report's pages are redirected to dedicated pages.

**Architecture:** Extend the existing `ReportStatus` enum with `COMPLETED`/`LOCKED` (TEXT column, so migration is a data backfill only). A new `report_status_history` table + `ReportStatusHistoryService` records every transition; the write is centralised in `ReportService` so all status-changing call sites are covered. Three new API routes reuse the existing JWT-guarded `apiRouter`. The existing `lockGuard` middleware is extended to redirect locked/deleted reports to two new static pages.

**Tech Stack:** TypeScript, Express, TypeORM 0.2-style (`getConnection`), PostgreSQL, Nunjucks, Jest + supertest.

**Spec:** `docs/superpowers/specs/2026-11-11-ndelius-psr-state-endpoints-design.md`

## Global Constraints

- **NEVER `git commit` or `git push`. The user commits. Tasks end with `git add` (staging) only.**
- Run single test files with `npx jest <path>`.
- Migrations: raw SQL via `queryRunner.query`, class named `<Name><timestamp>` implementing `MigrationInterface`, file `db/migrations/<timestamp>-<kebab-name>.ts`. Existing max timestamp is `1777200000000`.
- Errors thrown by new service methods use `createError(status, message)` from the existing `http-errors` dependency; API handlers respond `res.status(error.status || 500).json({ message: error.message })`.
- New API success responses: `200` with `{ id: string, status: string }`.
- Status transitions are strict: lock requires `COMPLETED`, unlock requires `LOCKED`, nDelius delete requires `COMPLETED`. Unknown or soft-deleted report → 404. Malformed UUID → 400.
- `DELETED` is a history-only value — it is NOT added to the `ReportStatus` enum.
- Placeholder page copy (exact, from spec): locked page heading "This report is locked", body "This pre-sentence report has been locked in NDelius and can no longer be edited."; deleted page heading "This report has been deleted", body "This pre-sentence report has been deleted in NDelius and is no longer available."
- No new code comments unless the code cannot express a constraint (user preference).
- Do not break the existing sign/submit journey or its SNS event publishing.

## Review Focus

Spec-implied failure modes, each pinned by a test in the owning task:

1. Lock called on an already-locked report must 409, not silently 200 — Task 6.
2. Delete/lock/unlock on a soft-deleted report must 404 (not 409, not 500) — Task 5.
3. A malformed UUID (`not-a-uuid`) must 400 before reaching Postgres (which would 500 on a bad uuid cast) — Task 6.
4. A LOCKED report's `publish-report`/`pdf` URLs (previously reachable when submitted) must redirect to the locked page, not render — Task 7.
5. When submit's event-publish fails, status must roll back to the previous value and the COMPLETED history row must be removed — no phantom audit entry — Task 4.

---

### Task 1: Status enum values + backfill migration

**Files:**
- Modify: `server/repositories/entities/reportDetails.ts:4-7`
- Create: `db/migrations/1777300000000-backfill-completed-status.ts`

**Interfaces:**
- Produces: `ReportStatus.COMPLETED = 'COMPLETED'`, `ReportStatus.LOCKED = 'LOCKED'` (used by all later tasks).

- [ ] **Step 1: Add `COMPLETED = 'COMPLETED'` and `LOCKED = 'LOCKED'` to the `ReportStatus` enum**

- [ ] **Step 2: Create migration `BackfillCompletedStatus1777300000000`**

`up`: `UPDATE presentenceservice.report_details SET status = 'COMPLETED' WHERE "submittedAt" IS NOT NULL;`
`down`: `UPDATE presentenceservice.report_details SET status = 'STARTED' WHERE status IN ('COMPLETED', 'LOCKED');`
Model the file on `db/migrations/1777000000000-add-submitted-at-to-report-details.ts`. The column is TEXT at the SQL level, so no type change is needed.

- [ ] **Step 3: Verify compilation**

Run: `npx tsc --noEmit`
Expected: no errors (ignore pre-existing errors only if unrelated; expect none).

- [ ] **Step 4: Stage**

```bash
git add server/repositories/entities/reportDetails.ts db/migrations/1777300000000-backfill-completed-status.ts
```

---

### Task 2: Audit entity, table migration, and history service

**Files:**
- Create: `server/repositories/entities/reportStatusHistory.ts`
- Create: `db/migrations/1777310000000-create-report-status-history.ts`
- Create: `server/services/reportStatusHistoryService.ts`
- Create: `server/services/reportStatusHistoryService.test.ts`
- Modify: `server/repositories/db.ts:31` (add entity to `entities` array)

**Interfaces:**
- Produces:
  - entity `ReportStatusHistory` with fields `id: string`, `reportId: string`, `previousStatus?: string | null`, `newStatus: string`, `changedBy: string`, `changedAt: Date`
  - `export const DELETED_STATUS = 'DELETED'` (in `reportStatusHistoryService.ts`)
  - `export interface IStatusChange { reportId: string; previousStatus: string | null; newStatus: string; changedBy: string }`
  - `class ReportStatusHistoryService`:
    - `recordStatusChange(change: IStatusChange, manager?: EntityManager): Promise<ReportStatusHistory>` — saves a row with `changedAt: new Date()`
    - `removeStatusChange(id: string, manager?: EntityManager): Promise<void>` — hard-deletes a history row by id

- [ ] **Step 1: Write failing tests in `server/services/reportStatusHistoryService.test.ts`**

Mock typeorm the way `server/services/reportService.test.ts:7-10` does (`jest.mock('typeorm', ...)` overriding `getConnection`). Tests:

```ts
it('recordStatusChange saves a row with the given fields and a changedAt date', ...)
// assert repository.save called with objectContaining({ reportId: 'r1', previousStatus: null, newStatus: 'NOT_STARTED', changedBy: 'user1', changedAt: expect.any(Date) })
it('recordStatusChange uses the provided EntityManager when given', ...)
// assert manager.getRepository used, getConnection().manager not used
it('removeStatusChange deletes the row by id', ...)
// assert repository.delete called with 'h1'
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx jest server/services/reportStatusHistoryService.test.ts`
Expected: FAIL (module not found).

- [ ] **Step 3: Implement entity `ReportStatusHistory`**

`@Entity({ schema: 'presentenceservice', name: 'report_status_history' })`, `@PrimaryGeneratedColumn('uuid')` + `@Generated('uuid')` for `id` (mirror `reportDetails.ts:22-24`), `@Column({ type: 'uuid' }) reportId`, `@Column({ type: 'text', nullable: true }) previousStatus`, `@Column({ type: 'text' }) newStatus`, `@Column() changedBy`, `@Column({ type: 'timestamp' }) changedAt`.

- [ ] **Step 4: Implement `ReportStatusHistoryService`**

Follow the `manager: EntityManager = getConnection().manager` default-parameter pattern from `reportDetailsService.ts:42-53`.

- [ ] **Step 5: Create migration `CreateReportStatusHistory1777310000000`**

`up` creates `presentenceservice.report_status_history` with columns matching the entity (camelCase quoted names: `"reportId"`, `"previousStatus"`, `"newStatus"`, `"changedBy"`, `"changedAt" TIMESTAMP NOT NULL DEFAULT now()`), FK `"reportId"` → `presentenceservice.report_details(id)`, and an index on `"reportId"`. Copy the `id` uuid PK column definition style used for `report_details.id` in `db/migrations/1768557000000-create-new-structure-tables.ts` so uuid generation matches. `down` drops the table.

- [ ] **Step 6: Register `ReportStatusHistory` in the `entities` array in `server/repositories/db.ts`**

- [ ] **Step 7: Run tests to verify they pass**

Run: `npx jest server/services/reportStatusHistoryService.test.ts`
Expected: PASS.

- [ ] **Step 8: Stage**

```bash
git add server/repositories/entities/reportStatusHistory.ts db/migrations/1777310000000-create-report-status-history.ts server/services/reportStatusHistoryService.ts server/services/reportStatusHistoryService.test.ts server/repositories/db.ts
```

---

### Task 3: Audit wiring for existing transitions (create, STARTED promotion, cleanup delete)

**Files:**
- Modify: `server/services/reportService.ts` (`createReport:61-77`, `updateReport:173-179`, `deleteReport:181-183`, `saveSourcesOfInformation:138`, constructor)
- Modify: `server/services/reportDetailsService.ts` (add one method)
- Modify: `server/controllers/shared/sharedController.ts:277-293, 325-340, 415-433`
- Modify: `server/controllers/psr/autosave-controller.ts:8-22`
- Test: `server/services/reportService.test.ts` (extend), `server/controllers/psr/autosave-controller.test.ts` (extend)

**Interfaces:**
- Consumes: `ReportStatusHistoryService`, `IStatusChange`, `DELETED_STATUS` (Task 2).
- Produces (later tasks rely on):
  - `ReportService` has a private `reportStatusHistoryService: ReportStatusHistoryService` instantiated in the constructor (tests reach it via the same cast pattern used for `reportDetailsService` at `reportService.test.ts:24-26`)
  - `ReportService.updateReport(id: string, updates: Partial<IReportDetails>, manager?: EntityManager, username?: string): Promise<ReportDetails | null>` — username defaults to `'system'`
  - `ReportService.deleteReport(id: string, username?: string): Promise<boolean>` — username defaults to `'system'`
  - `ReportDetailsService.getReportDetailsByIdIncludingDeleted(id: string, manager?: EntityManager): Promise<ReportDetails | null>` — same as `getReportDetailsById` but without the `isDeleted: false` filter
  - `ReportService.getReportByIdIncludingDeleted(id: string): Promise<ReportDetails | null>` — delegates to the above

- [ ] **Step 1: Write failing tests in `server/services/reportService.test.ts`**

New describe blocks, using the existing mock pattern (`jest.mock('./reportStatusHistoryService')` added alongside the existing service mocks):

```ts
describe('status history wiring', () => {
  it('createReport records null -> NOT_STARTED with the creating username', ...)
  it('updateReport records a history row when status changes, with the given username', ...)
  // updateReport('r1', { status: ReportStatus.STARTED }, undefined, 'user1') with current status NOT_STARTED
  // expect recordStatusChange({ reportId: 'r1', previousStatus: 'NOT_STARTED', newStatus: 'STARTED', changedBy: 'user1' }, manager-or-undefined)
  it('updateReport does not record history when updates contain no status', ...)
  it('updateReport does not record history when status is unchanged', ...)
  it('deleteReport records previousStatus -> DELETED with the given username', ...)
  it('deleteReport records changedBy system when no username given', ...)
})
```

- [ ] **Step 2: Run to verify failure**

Run: `npx jest server/services/reportService.test.ts`
Expected: new tests FAIL.

- [ ] **Step 3: Implement in `reportService.ts`**

- Constructor: instantiate `this.reportStatusHistoryService = new ReportStatusHistoryService()`.
- `createReport`: after `createReportDetails`, call `recordStatusChange({ reportId: report.id, previousStatus: null, newStatus: ReportStatus.NOT_STARTED, changedBy: createdBy })`.
- `updateReport(id, updates, manager?, username = 'system')`: when `updates.status !== undefined`, first fetch the current report via `getReportDetailsById(id, manager)`; after a successful update where the status actually changed, record the history row (pass `manager` through).
- `deleteReport(id, username = 'system')`: fetch via `getReportDetailsByIdIncludingDeleted` first; after a successful `deleteReportDetails`, record `{ previousStatus: report.status, newStatus: DELETED_STATUS, changedBy: username }`. Skip the history row when the report was already deleted or not found.
- Add `getReportByIdIncludingDeleted(id)` delegating to `reportDetailsService.getReportDetailsByIdIncludingDeleted(id)`.

- [ ] **Step 4: Implement `getReportDetailsByIdIncludingDeleted` in `reportDetailsService.ts`**

Copy of `getReportDetailsById` (lines 42-53) without the `isDeleted: false` where-clause.

- [ ] **Step 5: Thread usernames through the four STARTED-promotion sites**

- `reportService.ts:138` (`saveSourcesOfInformation`): `this.updateReport(reportId, { status: ReportStatus.STARTED }, manager, username)` — `username` is already in scope.
- `sharedController.ts`: change `updateReportActions(req)` → `updateReportActions(req, username)` and `persistOnInvalid(req, reportId)` → `persistOnInvalid(req, reportId, username)`; both callers are in `post()` where `username` is computed at line 332. Inside both methods pass the username to `this.reportService.updateReport(..., undefined, username)` for the status-setting calls (lines 286, 422). The no-op touch calls (`updateReport(id, {})`) need no username.
- `autosave-controller.ts`: compute `const username = (res.locals?.user?.username as string | undefined) || 'system'` and pass it on the status-setting `updateReport` call (line 19).

- [ ] **Step 6: Write failing test in `server/controllers/psr/autosave-controller.test.ts`**

```ts
it('passes the session username when promoting NOT_STARTED to STARTED', ...)
// report status NOT_STARTED, res.locals.user.username = 'user1'
// expect reportService.updateReport called with (reportId, { status: 'STARTED' }, undefined, 'user1')
```

- [ ] **Step 7: Run all touched test files to verify pass**

Run: `npx jest server/services/reportService.test.ts server/controllers/psr/autosave-controller.test.ts server/controllers/psr/sources-of-information-controller.test.ts`
Expected: PASS (the sources test guards the sharedController threading against regressions).

- [ ] **Step 8: Stage**

```bash
git add server/services/reportService.ts server/services/reportService.test.ts server/services/reportDetailsService.ts server/controllers/shared/sharedController.ts server/controllers/psr/autosave-controller.ts server/controllers/psr/autosave-controller.test.ts
```

---

### Task 4: submitReport sets COMPLETED, audits, and rolls back cleanly

**Files:**
- Modify: `server/services/reportService.ts:306-328` (`submitReport`)
- Test: `server/services/reportService.test.ts` (extend the existing `ReportService.submitReport` describe)

**Interfaces:**
- Consumes: `recordStatusChange` / `removeStatusChange` (Task 2), `ReportStatus.COMPLETED` (Task 1).
- Produces: `submitReport` signature unchanged; it now also sets `status: ReportStatus.COMPLETED` and writes/removes history. The acting username comes from the existing `eventData.username` field.

- [ ] **Step 1: Write failing tests**

```ts
it('stamps submittedAt and sets status COMPLETED, recording previous -> COMPLETED history with eventData.username', ...)
// getReportDetailsById resolves { id: 'r1', status: 'STARTED' }
// expect updateReportDetails called with objectContaining({ submittedAt: expect.any(Date), status: 'COMPLETED' })
// expect recordStatusChange({ reportId: 'r1', previousStatus: 'STARTED', newStatus: 'COMPLETED', changedBy: 'u' })
it('on publish failure, restores previous status and submittedAt null, and removes the history row', ...)
// recordStatusChange resolves { id: 'h1' }; sendReportEvent always rejects (fake timers, as reportService.test.ts:51-71)
// expect updateReportDetails finally called with { submittedAt: null, status: 'STARTED' }
// expect removeStatusChange('h1')
```

Update the three existing `submitReport` tests' expectations where they assert the exact update payload (`reportService.test.ts:43-46` and the rollback assertion) to include `status`.

- [ ] **Step 2: Run to verify failure**

Run: `npx jest server/services/reportService.test.ts`
Expected: new tests FAIL.

- [ ] **Step 3: Implement**

In `submitReport`: fetch the report first (`getReportDetailsById`) to capture `previousStatus` (throw the existing not-found error if null); update `{ submittedAt, status: ReportStatus.COMPLETED }`; record history with `changedBy: eventData.username`; in the catch around `publishWithRetry`, update `{ submittedAt: null, status: previousStatus }` and `removeStatusChange(historyRow.id)` before rethrowing.

- [ ] **Step 4: Run to verify pass**

Run: `npx jest server/services/reportService.test.ts server/controllers/psr/sign-your-report-controller.test.ts`
Expected: PASS.

- [ ] **Step 5: Stage**

```bash
git add server/services/reportService.ts server/services/reportService.test.ts
```

---

### Task 5: lockReport / unlockReport / deleteCompletedReport service methods

**Files:**
- Modify: `server/services/reportService.ts`
- Test: `server/services/reportService.test.ts` (extend)

**Interfaces:**
- Consumes: Task 1-3 products.
- Produces (Task 6 relies on these exact signatures; all throw `http-errors` `createError`):
  - `ReportService.lockReport(id: string, username: string): Promise<ReportDetails>` — 404 `Report <id> not found` if missing or soft-deleted; 409 `Report <id> is not in a COMPLETED state` unless status is `COMPLETED`; sets status `LOCKED`, records `COMPLETED -> LOCKED`, returns the updated report.
  - `ReportService.unlockReport(id: string, username: string): Promise<ReportDetails>` — 404 as above; 409 `Report <id> is not in a LOCKED state` unless status is `LOCKED`; sets status `COMPLETED`, records `LOCKED -> COMPLETED`.
  - `ReportService.deleteCompletedReport(id: string, username: string): Promise<void>` — 404 as above; 409 `Report <id> is not in a COMPLETED state` unless `COMPLETED`; soft-deletes via `deleteReportDetails`, records `COMPLETED -> DELETED`.

- [ ] **Step 1: Write failing tests**

```ts
describe('lockReport', () => {
  it('locks a COMPLETED report, records history, returns the updated report', ...)
  it('throws 404 for an unknown id', ...)
  it('throws 404 for a soft-deleted report', ...)   // Review Focus #2
  it('throws 409 when the report is not COMPLETED', ...)  // e.g. STARTED
})
describe('unlockReport', () => {
  it('unlocks a LOCKED report back to COMPLETED and records history', ...)
  it('throws 409 when the report is not LOCKED', ...)
})
describe('deleteCompletedReport', () => {
  it('soft-deletes a COMPLETED report and records COMPLETED -> DELETED', ...)
  it('throws 404 for a soft-deleted report', ...)
  it('throws 409 when the report is not COMPLETED', ...)
})
```

Assert thrown errors with `expect(...).rejects.toMatchObject({ status: 404 })` etc., and that no update/history write happens on the error paths.

- [ ] **Step 2: Run to verify failure**

Run: `npx jest server/services/reportService.test.ts`
Expected: new tests FAIL.

- [ ] **Step 3: Implement the three methods in `reportService.ts`**

Shared shape: fetch via `getReportDetailsByIdIncludingDeleted`; missing or `isDeleted` → `throw createError(404, ...)`; wrong status → `throw createError(409, ...)`; then `updateReportDetails` (or `deleteReportDetails`) + `recordStatusChange`. Import `createError` from `http-errors`.

- [ ] **Step 4: Run to verify pass**

Run: `npx jest server/services/reportService.test.ts`
Expected: PASS.

- [ ] **Step 5: Stage**

```bash
git add server/services/reportService.ts server/services/reportService.test.ts
```

---

### Task 6: API controller handlers and routes

**Files:**
- Modify: `server/controllers/api/apiController.ts`
- Modify: `server/routes/api/index.ts`
- Test: `server/routes/api/index.test.ts` (extend)

**Interfaces:**
- Consumes: Task 5 service methods.
- Produces the external contract:
  - `PUT /api/v1/report/:id/lock` → 200 `{ id, status: 'LOCKED' }`
  - `PUT /api/v1/report/:id/unlock` → 200 `{ id, status: 'COMPLETED' }`
  - `DELETE /api/v1/report/:id` → 200 `{ id, status: 'DELETED' }`
  - Errors: 400 `{ message: 'Invalid report id' }` for non-UUID ids; 404/409 `{ message }` propagated from the service; 500 fallback.

- [ ] **Step 1: Write failing supertest tests in `server/routes/api/index.test.ts`**

Extend the existing `jest.mock('../../services/reportService', ...)` factory with `lockReport`, `unlockReport`, `deleteCompletedReport` jest-controllable mocks (use a module-level mock-fn trio so individual tests can set resolve/reject). Tests (use a valid uuid like `'11111111-1111-1111-1111-111111111111'`):

```ts
it('PUT /v1/report/:id/lock returns 200 { id, status: LOCKED }', ...)
it('PUT /v1/report/:id/unlock returns 200 { id, status: COMPLETED }', ...)
it('DELETE /v1/report/:id returns 200 { id, status: DELETED }', ...)
it('returns 400 { message } for a malformed uuid on all three routes', ...)   // Review Focus #3
it('returns 409 { message } when the service rejects with status 409 (e.g. lock on an already-LOCKED report)', ...)  // Review Focus #1
it('returns 404 { message } when the service rejects with status 404', ...)
it('passes the authenticated username from res.locals to the service', ...)  // appSetup sets username 'user1'
```

- [ ] **Step 2: Run to verify failure**

Run: `npx jest server/routes/api/index.test.ts`
Expected: new tests FAIL (404 route not found).

- [ ] **Step 3: Implement `ApiController.lockReport`, `unlockReport`, `deleteReport`**

Each: validate `req.params.id` against a case-insensitive UUID regex → 400; `const username = res.locals?.user?.username || 'system'`; call the service; respond per the contract. Catch per the Global Constraints error shape. Follow the arrow-function style of the existing handlers.

- [ ] **Step 4: Register the three routes in `server/routes/api/index.ts`**

Same inline `new ApiController(...)` pattern as lines 14-25: `router.put('/v1/report/:id/lock', ...)`, `router.put('/v1/report/:id/unlock', ...)`, `router.delete('/v1/report/:id', ...)`.

- [ ] **Step 5: Run to verify pass**

Run: `npx jest server/routes/api/index.test.ts`
Expected: PASS.

- [ ] **Step 6: Stage**

```bash
git add server/controllers/api/apiController.ts server/routes/api/index.ts server/routes/api/index.test.ts
```

---

### Task 7: lockGuard middleware redirects for LOCKED and deleted reports

**Files:**
- Modify: `server/middleware/lockedReportMiddleware.ts`
- Test: `server/middleware/lockedReportMiddleware.test.ts` (extend/update)

**Interfaces:**
- Consumes: `ReportService.getReportByIdIncludingDeleted` (Task 3), `ReportStatus.LOCKED` (Task 1).
- Produces: middleware behaviour relied on by Task 8 — locked reports redirect to `/psr/:reportId/locked`, deleted to `/psr/:reportId/deleted`, before any `ALLOWED_WHEN_LOCKED` bypass.

- [ ] **Step 1: Write failing tests**

```ts
it('redirects a soft-deleted report to /psr/r1/deleted', ...)
it('redirects a LOCKED report to /psr/r1/locked', ...)
it('redirects a LOCKED report to /psr/r1/locked even for publish-report and pdf paths', ...)  // Review Focus #4
it('redirects a deleted report to /psr/r1/deleted even for publish-report and pdf paths', ...)
it('still allows publish-report and pdf for a submitted (COMPLETED) report', ...)
it('calls next with res.locals.report unset for an unknown report', ...)
```

Update the mock service to stub `getReportByIdIncludingDeleted` instead of `getReportById`, and rewrite the existing third test (`lockedReportMiddleware.test.ts:52-63`): the allow-list no longer skips the DB fetch, so assert behaviour (next called, no redirect) rather than "without consulting the report".

- [ ] **Step 2: Run to verify failure**

Run: `npx jest server/middleware/lockedReportMiddleware.test.ts`
Expected: FAIL.

- [ ] **Step 3: Rework the middleware**

New order inside the `.then(report => ...)`:
1. `!report` → `next()` (unchanged fall-through; `res.locals.report` stays unset)
2. `report.isDeleted` → `res.redirect(`/psr/${reportId}/deleted`)`
3. `report.status === ReportStatus.LOCKED` → `res.redirect(`/psr/${reportId}/locked`)`
4. set `res.locals.report = report`
5. `ALLOWED_WHEN_LOCKED.has(action)` → `next()`
6. `report.submittedAt` → `res.redirect(`/psr/${reportId}/publish-report`)` (unchanged)
7. `next()`

The early `ALLOWED_WHEN_LOCKED` return before the fetch (lines 20-24) is removed; fetch switches to `getReportByIdIncludingDeleted`.

- [ ] **Step 4: Run to verify pass**

Run: `npx jest server/middleware/lockedReportMiddleware.test.ts`
Expected: PASS.

- [ ] **Step 5: Stage**

```bash
git add server/middleware/lockedReportMiddleware.ts server/middleware/lockedReportMiddleware.test.ts
```

---

### Task 8: Locked and deleted pages

**Files:**
- Create: `server/controllers/psr/locked-report-controller.ts`
- Create: `server/controllers/psr/deleted-report-controller.ts`
- Create: `server/views/psr/report-locked.njk`
- Create: `server/views/psr/report-deleted.njk`
- Create: `server/controllers/psr/locked-report-controller.test.ts`
- Create: `server/controllers/psr/deleted-report-controller.test.ts`
- Modify: `server/routes/psr/index.ts`

**Interfaces:**
- Consumes: `getReportByIdIncludingDeleted`, `ReportStatus.LOCKED`, middleware redirect targets `/psr/:reportId/locked` and `/psr/:reportId/deleted` (Task 7).
- Produces: two GET routes registered WITHOUT the lockGuard (the guard redirects here; wrapping them would loop).

- [ ] **Step 1: Write failing controller tests**

Standalone controllers (not `SharedController` — these pages need none of its form/report machinery). Test with mocked `ReportService` and a stubbed `res` (`render`, `redirect` jest.fn()), in the style of `lockedReportMiddleware.test.ts`:

```ts
// locked-report-controller.test.ts
it('renders psr/report-locked for a LOCKED, non-deleted report', ...)
it('redirects to /psr/:reportId when the report is not locked', ...)   // stale/bookmarked URL guard (spec requirement)
it('redirects to /psr/:reportId when the report is unknown or deleted', ...)
// deleted-report-controller.test.ts
it('renders psr/report-deleted for a soft-deleted report', ...)
it('redirects to /psr/:reportId when the report is not deleted', ...)
```

- [ ] **Step 2: Run to verify failure**

Run: `npx jest server/controllers/psr/locked-report-controller.test.ts server/controllers/psr/deleted-report-controller.test.ts`
Expected: FAIL.

- [ ] **Step 3: Implement the controllers**

```ts
export default class LockedReportController {
  constructor(private readonly reportService: ReportService) {}
  get = async (req: Request<{ reportId: string }>, res: Response): Promise<void> => { ... }
}
```

Locked: render only when `report && !report.isDeleted && report.status === ReportStatus.LOCKED`, else `res.redirect(`/psr/${reportId}`)`. Deleted: render only when `report?.isDeleted`. Render call: `res.render('psr/report-locked', { reportId })` (and `report-deleted` respectively).

- [ ] **Step 4: Create the views**

Model on `server/views/psr/publish-report.njk` (extends `../partials/sharedPageLayout.njk`, `govuk-grid-column-two-thirds`): an `<h1 class="govuk-heading-l">` with the heading and a `govuk-body` paragraph with the body copy from Global Constraints. No links/buttons. Set `pageTitle` to the heading.

- [ ] **Step 5: Register routes in `server/routes/psr/index.ts`**

Directly on the router (NOT via the `get` helper, which applies `lockGuard`):

```ts
router.get<ReportParams>(routePrefix('/:reportId/locked'), asyncMiddleware((req, res) =>
  new LockedReportController(reportService).get(req, res)))
router.get<ReportParams>(routePrefix('/:reportId/deleted'), asyncMiddleware((req, res) =>
  new DeletedReportController(reportService).get(req, res)))
```

- [ ] **Step 6: Run to verify pass**

Run: `npx jest server/controllers/psr/locked-report-controller.test.ts server/controllers/psr/deleted-report-controller.test.ts`
Expected: PASS.

- [ ] **Step 7: Stage**

```bash
git add server/controllers/psr/locked-report-controller.ts server/controllers/psr/deleted-report-controller.ts server/controllers/psr/locked-report-controller.test.ts server/controllers/psr/deleted-report-controller.test.ts server/views/psr/report-locked.njk server/views/psr/report-deleted.njk server/routes/psr/index.ts
```

---

### Task 9: Whole-change verification

**Files:** none new.

- [ ] **Step 1: Run the full unit test suite**

Run: `npm test`
Expected: PASS, except two pre-existing local-environment failures (sessionTimeout / index route tests fail because of a `.env` timeout override; they pass in CI). Any other failure must be fixed.

- [ ] **Step 2: Lint and typecheck**

Run: `npm run lint && npx tsc --noEmit`
Expected: clean.

- [ ] **Step 3: Confirm everything is staged, nothing committed**

Run: `git status`
Expected: all new/modified files staged; branch has no new commits.
