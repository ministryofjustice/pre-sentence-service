const emptyArray: Array<unknown> = []

export const mockedReportData = {
  id: 123,
  personId: 1,
  status: 'NOT_STARTED',
  origin: '1',
  reportType: 'short-format',
  pages: emptyArray,
  createdAt: new Date('2024-01-01'),
  createdBy: 'testuser',
  lastUpdatedBy: new Date('2024-01-01'),
  isDeleted: false,
  version: 1,
  person: {
    id: 1,
    crn: 'X123456',
    names: { foreName: 'John', middleName: '', surname: 'Doe' },
    dateOfBirth: new Date('1990-01-01'),
    pnc: 'PNC123',
    mainOffence: 'Theft',
    court: { name: 'Test Court', localJusticeArea: 'Test Area' },
    createdAt: new Date('2024-01-01'),
    createdBy: 'testuser',
    lastUpdatedBy: new Date('2024-01-01'),
    isDeleted: false,
    version: 1,
  },
}

export default class ReportService {
  public getReportById(id: number) {
    return new Promise(resolve => {
      process.nextTick(() => resolve(id ? mockedReportData : null))
    })
  }

  public updateReport(id: number, updates: unknown) {
    return new Promise(resolve => {
      process.nextTick(() => resolve(id && updates ? mockedReportData : null))
    })
  }

  public createReport(reportData: unknown, createdBy: string) {
    return new Promise(resolve => {
      process.nextTick(() =>
        resolve(
          reportData && createdBy
            ? {
                ...mockedReportData,
                id: 123,
              }
            : null
        )
      )
    })
  }

  public deleteReport(id: number) {
    return new Promise(resolve => {
      process.nextTick(() => resolve(id ? true : false))
    })
  }

  public getDefinitionByType(reportType: string) {
    return new Promise(resolve => {
      process.nextTick(() =>
        resolve(
          reportType === 'short-format'
            ? {
                id: 1,
              }
            : null
        )
      )
    })
  }

  public updateFieldValues(reportId: number, fieldValues: unknown) {
    return new Promise(resolve => {
      process.nextTick(() => resolve(reportId && fieldValues ? mockedReportData : null))
    })
  }

  public getAllReportsByType(reportType: string) {
    return new Promise(resolve => {
      process.nextTick(() => resolve(reportType ? [mockedReportData] : []))
    })
  }

  public getSourcesOfInformation(reportId: number) {
    return new Promise(resolve => {
      process.nextTick(() =>
        resolve(
          reportId
            ? [
                {
                  key: 'cps_summary',
                  value: 'CPS summary',
                  isCustom: false,
                },
              ]
            : []
        )
      )
    })
  }

  public saveCustomSourcesOfInformation(
    reportId: number,
    addedSources: unknown,
    removedSources: unknown,
    createdBy: string
  ) {
    return new Promise(resolve => {
      process.nextTick(() => resolve(reportId && addedSources && removedSources && createdBy ? undefined : undefined))
    })
  }
}
