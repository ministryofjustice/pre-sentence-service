import * as z from 'zod'
import { longText } from '../utils/validation'

export const defendantBehaviourModel = z.object({
  defendantBehaviour: longText({
    label: "Assessment of defendant's behaviour and lifestyle",
    requiredMessage: "Assess the defendant's behaviour and lifestyle",
  }),
})

export const isDefendantBehaviourComplete = (data: Record<string, unknown>): boolean => {
  const defendantBehaviour =
    (data.defendantBehaviour as string | undefined) ??
    (data.behaviourAndLifestyleAssessment as string | undefined) ??
    ''
  return defendantBehaviourModel.safeParse({ defendantBehaviour }).success
}
