# nDelius PSR state endpoints: lock, unlock, delete (PRS-390/407)

**Date:** 2026-11-11
**Status:** Approved for planning

## Intent and why

nDelius is taking over the locking lifecycle of pre-sentence reports. When a
report writer locks, unlocks, or deletes a PSR inside nDelius, nDelius will
call back into this service so our copy of the report reflects that state.
Locked reports must be uneditable (fraud protection); unlocked reports return
to Completed; deleted reports are soft-deleted and inaccessible.

Context: a follow-up ticket will separate signing from locking entirely
(signed/Completed reports become reopenable and editable in this service).
This ticket lays the state-model groundwork but must NOT build any of that
reopen/edit journey. "Unlock" here only restores the Completed state — it does
not make the report editable; that is the next ticket's job.

## Goals

1. Three API endpoints nDelius can call to lock, unlock, and soft-delete a PSR
   by its UUID, secured identically to the existing create-report endpoint.
2. A real status model: `COMPLETED` and `LOCKED` added to the `ReportStatus`
   enum, with existing data migrated.
3. An audit trail recording every report status change (and creation): what
   changed, who did it, when.
4. User-facing "report is locked" and "report is deleted" pages; any attempt
   to open a page of a locked or deleted report redirects there.

## Non-goals

- Anything from the follow-up "separate signing from locking" ticket: the
  Edit-completed-report landing page, reopen flow, sign-page copy changes,
  confirmation page redesign, PDF date changes.
- Final page copy for the locked/deleted pages — placeholder GOV.UK-styled
  wording, to be tweaked when designs are supplied.
- Hard deletion. Delete is the existing soft-delete (`isDeleted` flag).
- New domain-event (SNS) publishing for lock/unlock/delete. Only the existing
  submit-report event flow exists today and it is untouched.
- Changes to nDelius itself; their side is configurable, they will point at
  whatever paths we publish.

## Anti-goals (failure even if it "works")

- Breaking the existing sign/submit journey or its event publishing.
- Making Completed reports editable (that's the next ticket, deliberately).
- A status migration that mislabels existing reports (e.g. marking in-progress
  reports Completed).

## Constraints

- TypeScript Express app, TypeORM on PostgreSQL (schema `presentenceservice`),
  raw-SQL migrations in `db/migrations/*.ts` (timestamp-prefixed classes,
  loaded from `dist/db/migrations/*.js` at boot when `config.db.migrations`
  is true).
- API auth: JWT (HMPPS Auth) via `apiOnlyAuthenticationMiddleware` in
  `server/routes/apiRouter.ts`; it populates `res.locals.user.username`.
  Auth is skipped when `NODE_ENV === 'test'`.
- Tests: Jest + supertest, co-located `*.test.ts`; route-test helpers in
  `server/routes/testutils/appSetup.ts`. Cypress e2e in `integration_tests/`.
- The `status` column is TEXT at the SQL level (despite the entity's enum
  declaration), so adding enum values needs no DB type change.
- User stages git changes only; the user commits.

## Current state (verified 2026-11-11)

- `ReportStatus` enum (`server/repositories/entities/reportDetails.ts:4-7`)
  has only `NOT_STARTED` and `STARTED`. "Complete" is currently implied by a
  non-null `submittedAt` timestamp, set by `ReportService.submitReport`
  (`server/services/reportService.ts:306-328`), which also publishes an SNS
  event with retry and rolls back `submittedAt` if publishing fails.
- Soft delete exists: `isDeleted` flag; `ReportDetailsService` reads filter
  `isDeleted: false`, so `getReportById` returns null for deleted reports.
- No audit table. `lastUpdatedBy` on `report_details` holds a timestamp
  (misleading name), overwritten on every update.
- nDelius-facing API lives at `server/routes/api/index.ts` +
  `server/controllers/api/apiController.ts` (`POST /api/v1/report` creates,
  `GET /v1/report/:id`, `GET /v1/report/:id/pdf`, `GET /v1/reports/:reportType`).
- Every user-facing PSR page (`/psr/:reportId/<section>`) runs through
  `lockGuard` (`server/middleware/lockedReportMiddleware.ts`): if
  `report.submittedAt` is set it redirects to `/psr/:reportId/publish-report`,
  except for last path segments in `ALLOWED_WHEN_LOCKED` (`publish-report`,
  `pdf`). A deleted/unknown report currently falls through with
  `res.locals.report` unset.

## Decisions (made with the product owner)

- **Security**: same level as the existing create endpoint — the JWT
  middleware. The acting username is taken from the JWT
  (`res.locals.user.username`), the same way `createReport` does.
- **Error contract** (our proposal, to be shared with the nDelius team):
  - 200 + acknowledgment JSON on success
  - 400 malformed UUID
  - 404 unknown ID or already-deleted report
  - 409 report not in the required state for the transition
- **State transitions** (strict, per the ACs):
  - lock: `COMPLETED → LOCKED`
  - unlock: `LOCKED → COMPLETED`
  - delete: `COMPLETED →` soft-deleted. Any other starting state is a 409.
- **Unlock restores Completed only.** Editability of unlocked reports is the
  follow-up ticket.
- **Placeholder copy** on the locked/deleted pages; GOV.UK styling.

## Design decisions (made by the author of this document)

### Status model

- Add `COMPLETED = 'COMPLETED'` and `LOCKED = 'LOCKED'` to `ReportStatus`.
- Migration backfills `status = 'COMPLETED'` where `submitted_at IS NOT NULL`
  (including soft-deleted rows, for consistency).
- `ReportService.submitReport` additionally sets `status = COMPLETED`. Its
  existing failure rollback (on event-publish failure) must also restore the
  previous status alongside nulling `submittedAt`.
- `submittedAt` is kept and still written — the follow-up ticket needs
  "last signed at" data. The lockGuard's existing submittedAt-based redirect
  to publish-report keeps working unchanged for Completed reports.
- Deletion remains the `isDeleted` flag; `report_details.status` is left as-is
  on delete. In the audit trail (below) a delete is recorded with new status
  `'DELETED'` — a history-only value, not added to `ReportStatus` on the
  report row.

### Endpoints

In `server/routes/api/index.ts` / `ApiController`, alongside the existing
routes (nDelius confirmed their side is configurable, so we choose the shape
consistent with our existing `/v1/report/:id` pattern):

- `PUT /api/v1/report/:id/lock` → 200 `{ id, status: 'LOCKED' }`
- `PUT /api/v1/report/:id/unlock` → 200 `{ id, status: 'COMPLETED' }`
- `DELETE /api/v1/report/:id` → 200 `{ id, status: 'DELETED' }`

Error bodies follow the existing controller convention (JSON with a
`message`), e.g. 409 `{ message: "Report <id> is not in a COMPLETED state" }`.
Exact wording is the builder's call. These paths must be communicated to the
nDelius team once merged.

### Service layer

New methods on `ReportService` (thin orchestration, consistent with existing
style): `lockReport(id, username)`, `unlockReport(id, username)`, and a
validated delete path for the nDelius endpoint. Each validates the current
state (including "exists and not deleted"), writes the report change and the
audit row.

The existing internal `deleteReport` has one caller today: the cleanup
rollback in `ApiController.createReport` (`apiController.ts:40`), which
soft-deletes a `NOT_STARTED` report when creation fails partway. That path
stays separate from the nDelius delete (author's call): it keeps its current
no-validation behaviour (applying the COMPLETED-only rule would break the
error path) and writes a `DELETED` history row like any other delete, so the
audit trail truthfully shows created-then-deleted for failed creations.

### Audit trail

- New table `presentenceservice.report_status_history` + TypeORM entity
  (registered in `server/repositories/db.ts`):
  - `id` uuid PK (generated)
  - `report_id` uuid, FK → `report_details.id`
  - `previous_status` text, nullable (null for the creation row)
  - `new_status` text (`NOT_STARTED`, `STARTED`, `COMPLETED`, `LOCKED`,
    `DELETED`)
  - `changed_by` text (username)
  - `changed_at` timestamptz, default now
- Raw-SQL migration following the existing migration pattern.
- A single helper (e.g. on a small `ReportStatusHistoryService` or within
  `ReportService`) records every status change so future transitions
  (Completed → In Progress in the next ticket) reuse it.
- Rows are written on: report creation (null → `NOT_STARTED`),
  `NOT_STARTED → STARTED`, sign (`STARTED → COMPLETED`), lock, unlock,
  delete (including the internal create-failure cleanup delete).
- `NOT_STARTED → STARTED` is promoted from FOUR call sites, all of which
  must produce history rows: `server/services/reportService.ts:135-138`
  (first sources-of-information save),
  `server/controllers/shared/sharedController.ts:285-286` and `:421-422`,
  and `server/controllers/psr/autosave-controller.ts:18-19`. To avoid
  silent gaps, centralise the history write in the service layer where the
  status update is persisted (threading the username through from the
  controllers), rather than hooking each call site individually — author's
  call; the builder may choose the exact seam, but all four paths must be
  covered and tested.
- If the submit-report
  event-publish rollback fires, the corresponding history row is removed or a
  compensating row written — builder's call, but history must not show a
  Completed transition for a report whose submit was rolled back.

### Locked/deleted user-facing pages

- Extend `lockGuard` (`server/middleware/lockedReportMiddleware.ts`):
  1. Fetch the report *including* soft-deleted rows (new repository/service
     method using TypeORM `withDeleted`-equivalent, i.e. not filtering
     `isDeleted`) so deleted can be distinguished from unknown.
  2. Unknown ID → current fall-through behaviour, unchanged.
  3. `isDeleted` → redirect to `/psr/:reportId/deleted`.
  4. `status === LOCKED` → redirect to `/psr/:reportId/locked`.
  5. Else existing behaviour (submittedAt → publish-report redirect).
- The locked and deleted pages are terminal: when a report is locked or
  deleted, every other PSR page for it redirects there — including
  `publish-report` and `pdf` (the existing `ALLOWED_WHEN_LOCKED` bypass
  applies only to Completed reports, not Locked/Deleted ones).
- New GET routes `/psr/:reportId/locked` and `/psr/:reportId/deleted` with
  controllers under `server/controllers/psr/` and Nunjucks views under
  `server/views/psr/`, matching existing page structure/styling.
- Placeholder copy (GOV.UK style, to be replaced when designs arrive):
  - Locked: heading "This report is locked"; body "This pre-sentence report
    has been locked in NDelius and can no longer be edited."
  - Deleted: heading "This report has been deleted"; body "This pre-sentence
    report has been deleted in NDelius and is no longer available."
- Guard behaviour on these two pages themselves: the locked page is only
  shown for a genuinely locked report, the deleted page only for a genuinely
  deleted one; otherwise redirect to the report landing page (prevents
  bookmarked/stale URLs misleading users).

## Left to the builder

- Exact error-message wording and response body details.
- Controller/service/test file naming and structure (follow existing
  conventions).
- Whether the audit write happens in the same transaction as the report
  update (preferred if the existing code paths make it straightforward).
- How the submit-rollback keeps history consistent (delete vs compensating
  row).
- Extending the Cypress API e2e specs (`integration_tests/e2e/api/`) —
  desirable if the existing harness supports it cheaply; unit/route coverage
  with Jest + supertest is required either way.
- Placeholder page layout details (grid width, back links), matching sibling
  PSR pages.
