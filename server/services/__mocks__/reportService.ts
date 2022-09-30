export const mockedReportData = {
  reportDefinitionId: 1,
  reportDefinition: {
    id: 1,
    type: 'short-format',
    version: 1,
  },
  eventNumber: '1',
  id: '27ea073b-7a38-4853-bdaa-b6a506053a9e',
  status: 'NOT_STARTED',
  fieldValues: [],
}

export default class ReportService {
  public getReportById(id: string) {
    return new Promise(resolve => {
      process.nextTick(() => resolve(id ? mockedReportData : {}))
    })
  }

  public updateReport() {
    return new Promise(resolve => {
      process.nextTick(() => resolve({}))
    })
  }

  public createReport() {
    return new Promise(resolve => {
      process.nextTick(() =>
        resolve({
          reportDefinitionId: 1,
          eventNumber: '1',
          id: '27ea073b-7a38-4853-bdaa-b6a506053a9e',
          status: 'NOT_STARTED',
          urn: 'uk:gov:hmpps:pre-sentence-service:report:27ea073b-7a38-4853-bdaa-b6a506053a9e',
        })
      )
    })
  }

  public deleteReport() {
    return new Promise(resolve => {
      process.nextTick(() => resolve({}))
    })
  }

  public getDefinitionByType(reportType: string) {
    return new Promise(resolve => {
      process.nextTick(() =>
        resolve(
          reportType === 'short-format'
            ? {
                id: 1,
                type: reportType,
                version: 1,
                fields: [
                  {
                    id: 1,
                    name: 'crn',
                    required: true,
                    validation: '',
                  },
                ],
              }
            : undefined
        )
      )
    })
  }

  public updateFieldValues() {
    return new Promise(resolve => {
      process.nextTick(() => resolve({}))
    })
  }
}
