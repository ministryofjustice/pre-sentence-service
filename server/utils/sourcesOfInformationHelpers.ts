import { Session, SessionData } from 'express-session'
import formatKey from './formatKey'

export interface SourceOfInformation {
  key: string
  value: string
  isCustom: boolean
  checked?: boolean
}

export type SourceKey = string

export interface PendingChanges {
  sourcesToAdd?: CustomSource[]
  sourcesToRemove?: SourceKey[]
}

export interface CustomSource {
  key: string
  value: string
}

export type ReportId = string

export const buildSourcesOfInformation = (
  sourcesOfInformation: SourceOfInformation[],
  pendingChanges: PendingChanges | null,
  selectedSources: string | undefined
): SourceOfInformation[] => {
  const selectedSourcesArr = selectedSources ? selectedSources.split(',') : ([] as SourceKey[])

  const removed = new Set(pendingChanges?.sourcesToRemove ?? [])
  const base = sourcesOfInformation.filter(s => !removed.has(s.key))
  const adds = (pendingChanges?.sourcesToAdd ?? [])
    .filter(s => !removed.has(s.key) && !base.some(b => b.key === s.key))
    .map(s => ({ ...s, isCustom: true }))
  const sourcesToDisplay = [...base, ...adds].sort((a, b) =>
    a.value.localeCompare(b.value, undefined, { sensitivity: 'base' })
  )
  const selected = new Set<SourceKey>(selectedSourcesArr)
  return sourcesToDisplay.map(s => ({
    ...s,
    checked: selected.has(s.key),
  }))
}

export const clearPendingSourcesForReportId = (pendingChanges: Record<ReportId, PendingChanges>, reportId: string) => {
  if (!pendingChanges[reportId]) return

  const changes = pendingChanges[reportId]
  changes.sourcesToAdd = []
  changes.sourcesToRemove = []
}

export const getPendingChangesForReport = (
  session: Session & Partial<SessionData>,
  reportId: ReportId
): PendingChanges => {
  session.pendingChanges ??= {}
  session.pendingChanges[reportId] ??= {
    sourcesToAdd: [],
    sourcesToRemove: [],
  }
  return session.pendingChanges[reportId]
}

export const updatePendingChanges = (
  pendingChanges: PendingChanges,
  opts: { customSource?: string; removeKey?: SourceKey }
) => {
  if (opts.customSource) {
    const value = opts.customSource.trim()
    const key = `custom_${formatKey(value)}`
    pendingChanges.sourcesToAdd.push({
      key,
      value,
    })
  }

  if (!opts.removeKey) return

  const key = opts.removeKey
  if (pendingChanges.sourcesToAdd?.some(s => s.key === key)) {
    pendingChanges.sourcesToAdd = pendingChanges.sourcesToAdd.filter(s => s.key !== key)
  } else {
    pendingChanges.sourcesToRemove ??= []
    if (!pendingChanges.sourcesToRemove.includes(key)) {
      pendingChanges.sourcesToRemove.push(key)
    }
  }
}
