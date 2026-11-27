export interface ReportOffence {
  description: string
  code?: string
  date?: string // ISO 8601
}

export interface ReportOffences {
  mainOffence: ReportOffence
  additionalOffences: ReportOffence[]
}
