import { Request, Response } from 'express'

interface TemplateValues {
  preSentenceType: string
  data?: Record<string, unknown>
}

export default class BaseController {
  path = 'record-of-oral'

  templateValues: TemplateValues = {
    preSentenceType: 'Record of Oral Pre-Sentence Report',
  }

  get = async (_req: Request, _res: Response): Promise<void> => {
    return null
  }

  post = async (_req: Request, _res: Response): Promise<void> => {
    return null
  }
}
