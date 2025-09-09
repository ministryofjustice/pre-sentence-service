import { ZodType } from 'zod'

export interface ValidatedForm {
  isValid: boolean
  errors?: Record<string, string>
  data?: any
}

export const validateForm = (formData: FormData, schema: ZodType<any>): ValidatedForm => {
  const validationResult = schema.safeParse(formData)

  if (validationResult.success) {
    return {
      isValid: true,
      data: validationResult.data,
    }
  } else {
    const formattedErrors: Record<string, string> = {}

    for (const e of validationResult.error.issues) {
      const field = e.path[0]
      if (typeof field === 'string' && !formattedErrors[field]) {
        formattedErrors[field] = e.message
      }
    }

    return {
      isValid: false,
      errors: formattedErrors,
    }
  }
}
