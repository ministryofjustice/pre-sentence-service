interface FormElement {
  id: string
  minLength?: number
  errorMessage: string
}

export interface FormValidation {
  required: Array<FormElement>
}

export interface ValidatedForm {
  isValid: boolean
  errors: Array<FormElement>
}

export const validateForm = (formData: FormData, formValidation: FormValidation): ValidatedForm => {
  const invalidElements: Array<FormElement> = []

  formValidation.required.forEach(item => {
    let found = false
    Object.entries(formData).forEach(([key, value]) => {
      if (item.id === key) {
        found = true
        if (!value || value.length < (item.minLength || 1)) {
          invalidElements.push(item)
        }
      }
    })
    if (!found) {
      invalidElements.push(item)
    }
  })
  return {
    isValid: !invalidElements.length,
    errors: invalidElements,
  }
}
