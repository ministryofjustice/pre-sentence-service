import BaseController from './baseController'
import * as z from 'zod'
import { Request } from 'express'


// Helper to normalize checkbox input to always be an array
// const normalizeToArray = (val: unknown): string[] => {
//   if (Array.isArray(val)) return val
//   if (typeof val === 'string') return [val]
//   return []
// }

const signYourReportModel = z.object({
  signReportName: z.string().min(1, 'You must sign your report before you submit'),
  isDangerousReport: z.string().min(1, 'Specify whether this is a dangerousness report'),
  spoName: z.string().min(1, 'Enter the name of the SPO who reviewed the report'),
})

export const pageFields: Array<string> = [
  'signReportName',
  'isDangerousReport',
  'spoName',
]


export default class SignYourReportController extends BaseController {
  override templatePath = 'sign-your-report'

  override redirectPath = 'preview-report'

  override model = signYourReportModel

  override pageFields = pageFields
}
