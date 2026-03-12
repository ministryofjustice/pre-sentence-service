import BaseController from './baseController'
import * as z from 'zod'
import { Request } from 'express'


// Helper to normalize checkbox input to always be an array
// const normalizeToArray = (val: unknown): string[] => {
//   if (Array.isArray(val)) return val
//   if (typeof val === 'string') return [val]
//   return []
// }

export const signYourReportModel = z
  .object({
    signReportName: z
      .string()
      .min(1, 'You must sign your report before you submit'),

    isDangerousReport: z
      .string()
      .min(1, 'Specify whether this is a dangerousness report'),

    spoName: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.isDangerousReport === 'yes' && !data.spoName?.trim()) {
      ctx.addIssue({
        code: 'custom',
        path: ['spoName'],
        message: 'Enter the name of the SPO who reviewed the report',
      });
    }
  });
export const pageFields: Array<string> = [
  'signReportName',
  'isDangerousReport',
  'spoName',
]


export default class SignYourReportController extends BaseController {
  override templatePath = 'sign-your-report'

  // override redirectPath = 'sign-your-report'

  override model = signYourReportModel

  override pageFields = pageFields
  override correctFormData = (req: Request) => {
    const elementsWithError: string[] = []
    // If isDangerouseReport is not selected
    // then show error
    console.log('Radio value:', req.body.isDangerousReport)
    if (!req.body.isDangerousReport) {
        elementsWithError.push("isDangerousReport")
    }
    if (req.body.isDangerousReport === "yes" && !req.body.spoName) {
      elementsWithError.push("spoName")
    }
    return { elementsWithError }
  }

}
