const mockGeneratePdf = jest.fn().mockResolvedValue(undefined)

class PdfGenerationService {
  constructor() {
    // Empty constructor - preSentenceToDeliusService parameter is ignored in mock
  }

  generatePdf = mockGeneratePdf
}

export default PdfGenerationService
export { mockGeneratePdf }
