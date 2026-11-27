import * as z from 'zod'

export const editOffencesModel = z
  .object({
    mainOffenceDescription: z.string().optional(),
    mainOffenceDate: z.string().optional(),
    mainOffenceCode: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.mainOffenceDescription || data.mainOffenceDescription.trim() === '') {
      ctx.addIssue({
        code: 'custom',
        message: 'You must include a Main Offence',
        path: ['mainOffenceDescription'],
      })
    }
  })
