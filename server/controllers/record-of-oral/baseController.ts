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

  get = async (req: Request, res: Response): Promise<void> => {
    return null
  }

  post = async (req: Request, res: Response): Promise<void> => {
    return null
  }
}
