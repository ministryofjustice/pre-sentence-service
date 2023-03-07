export const reportTwo = () => ({})
export const createReportData = () => ({
  id: '0a15ce57-c46e-4b71-84f0-49dbed4bb81e',
  status: 'NOT_STARTED',
  lastUpdated: '2023-03-07T14:13:13.646Z',
  reportDefinitionId: 1,
  eventNumber: '41',
  reportDefinition: {
    id: 1,
    type: 'record-of-oral',
    version: 1,
    fields: [
      {
        id: 1,
        name: 'name',
        required: true,
      },
      {
        id: 33,
        name: 'proposal',
        required: true,
      },
    ],
  },
  fieldValues: [
    {
      id: 30,
      fieldId: 1,
      value: 'Lenore Marquez',
      version: 3,
      reportId: '0a15ce57-c46e-4b71-84f0-49dbed4bb81e',
      field: { id: 1, name: 'name', required: true },
    },
    {
      id: 33,
      fieldId: 33,
      value: '<p>test test tese asdfasdf</p>',
      version: 4,
      reportId: '0a15ce57-c46e-4b71-84f0-49dbed4bb81e',
      field: { id: 33, name: 'proposal', required: true },
    },
  ],
})
