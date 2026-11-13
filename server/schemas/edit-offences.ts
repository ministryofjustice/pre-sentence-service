import * as z from 'zod'

const MAIN_OFFENCE_REQUIRED = 'You must include a main offence'

export const editOffencesModel = z.object({
  mainOffence: z.preprocess(
    value => (typeof value === 'string' ? value.trim() : ''),
    z.string().min(1, MAIN_OFFENCE_REQUIRED)
  ),
  additionalOffences: z.preprocess(value => (typeof value === 'string' ? value : ''), z.string()),
})
