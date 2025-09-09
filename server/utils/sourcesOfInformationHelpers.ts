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
  pendingChanges?: PendingChanges,
  selectedSources?: string
): SourceOfInformation[] => {
  const removed = new Set(pendingChanges?.sourcesToRemove ?? [])
  const base = sourcesOfInformation.filter(s => !removed.has(s.key))
  const adds = (pendingChanges?.sourcesToAdd ?? []).map(s => ({ ...s, isCustom: true }))
  const sourcesToDisplay = [...base, ...adds].sort((a, b) =>
    a.value.localeCompare(b.value, undefined, { sensitivity: 'base' })
  )
  const selected = new Set<SourceKey>(selectedSources ? selectedSources.split(',') : [])
  return sourcesToDisplay.map(s => ({
    ...s,
    checked: selected.has(s.key),
  }))
}

export const clearPendingSourcesForReportId = (pendingChanges: Record<ReportId, PendingChanges>, reportId: string) => {
  const bucket = pendingChanges[reportId]
  if (!bucket) return
  bucket.sourcesToAdd = []
  bucket.sourcesToRemove = []
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
  opts: { customSource?: string; removeKey?: SourceKey; savedSources?: SourceOfInformation[] }
) => {
  const { customSource, removeKey, savedSources } = opts

  if (customSource && customSource.trim()) {
    const value = customSource.trim()
    const key = `custom_${formatKey(value)}`
    const isDuplicate = savedSources?.some(s => s.key === key) || pendingChanges.sourcesToAdd.some(s => s.key === key)

    if (!isDuplicate) {
      pendingChanges.sourcesToAdd.push({
        key,
        value,
      })
      pendingChanges.sourcesToRemove = pendingChanges.sourcesToRemove.filter(k => k !== key)
    } else {
      console.warn(`Duplicate source ignored: ${customSource}`)
    }
  }

  if (!removeKey) return

  if (pendingChanges.sourcesToAdd?.some(s => s.key === removeKey)) {
    pendingChanges.sourcesToAdd = pendingChanges.sourcesToAdd.filter(s => s.key !== removeKey)
  } else if (!pendingChanges.sourcesToRemove.includes(removeKey)) {
    pendingChanges.sourcesToRemove.push(removeKey)
  }
}

export type SourceOfInformationActions = 'add-source' | 'save-list'

export const isSourceAction = (v: unknown): v is SourceOfInformationActions => v === 'add-source' || v === 'save-list'
