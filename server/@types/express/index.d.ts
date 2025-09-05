import { IFieldValue } from '../../services/reportService'

export default {}

declare module 'express-session' {
  // Declare that the session will potentially contain these additional fields
  interface SessionData {
    returnTo: string
    nowInMinutes: number
    fieldValues: Array<IFieldValue>
    isAllowedAccess: boolean
    userDetails: UserDetails
  }
}

export declare global {
  namespace Express {
    interface User {
      username: string
      token: string
      authSource: string
    }

    interface Request {
      verified?: boolean
      id: string
    }

    interface Response {
      internalRedirect(url: string): void
      renderPDF(
        view: string,
        pageData: Record<string, unknown>,
        options?: { filename: string; pdfOptions: PdfOptions }
      ): void
    }
  }
}
