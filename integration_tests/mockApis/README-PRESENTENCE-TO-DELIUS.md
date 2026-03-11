# Pre-Sentence to Delius API Mocks

This document describes the mock implementations for the Pre-Sentence Reports to Delius API endpoints.

## API Endpoints

The following endpoints from the [Pre-Sentence Reports to Delius API](https://pre-sentence-reports-to-delius-dev.hmpps.service.justice.gov.uk/swagger-ui/index.html) are mocked:

1. **GET /report/{psrUuid}/defendant-details** - Retrieves defendant details
2. **GET /case/{crn}/event/{event}/offences** - Retrieves offence information

## TypeScript Types

All response types are defined in `server/@types/preSentenceToDelius.ts`:

- `DefendantDetails` - Complete defendant information
- `OffenceDetails` - Main and additional offences
- `Name`, `Address`, `CodeAndDescription`, `Offence` - Supporting types

## Service Methods

The `PreSentenceToDeliusService` (in `server/services/preSentenceToDeliusService.ts`) provides:

```typescript
async getDefendantDetails(psrUuid: string): Promise<DefendantDetails>
async getOffences(crn: string, eventNumber: number): Promise<OffenceDetails>
```

## Available Mock Functions

### Defendant Details

#### `stubDefendantDetails(psrUuid?, status?, customData?)`
Returns a successful defendant details response.

**Parameters:**
- `psrUuid` (optional): UUID of the PSR report (default: 'b7b8b7b8-b7b8-b7b8-b7b8-b7b8b7b8b7b8')
- `status` (optional): HTTP status code (default: 200)
- `customData` (optional): Override specific fields in the response

**Default response:**
```json
{
  "crn": "X320741",
  "eventNumber": 1,
  "name": {
    "forename": "John",
    "middleName": "David",
    "surname": "Smith"
  },
  "dateOfBirth": "1985-06-15",
  "mainAddress": {
    "buildingName": "Acme Building",
    "buildingNumber": "123",
    "streetName": "High Street",
    "district": "Central",
    "town": "Sheffield",
    "county": "South Yorkshire",
    "postcode": "S1 2BJ",
    "noFixedAbode": false
  }
}
```

#### `stubDefendantDetailsNotFound(psrUuid?)`
Returns a 404 error for defendant details not found.

#### `stubDefendantDetailsNoFixedAbode(psrUuid?)`
Returns defendant details with `noFixedAbode: true`.

#### `stubDefendantDetailsServerError(psrUuid?)`
Returns a 500 server error.

### Offences

#### `stubOffences(crn?, eventNumber?, status?, customData?)`
Returns a successful offences response.

**Parameters:**
- `crn` (optional): Case Reference Number (default: 'X320741')
- `eventNumber` (optional): Event number (default: 1)
- `status` (optional): HTTP status code (default: 200)
- `customData` (optional): Override specific fields in the response

**Default response:**
```json
{
  "mainOffence": {
    "date": "2024-01-15",
    "mainCategory": {
      "code": "001",
      "description": "Theft"
    },
    "subCategory": {
      "code": "001-001",
      "description": "Theft from a shop"
    }
  },
  "additionalOffences": [
    {
      "date": "2024-01-15",
      "mainCategory": {
        "code": "002",
        "description": "Criminal damage"
      },
      "subCategory": {
        "code": "002-001",
        "description": "Criminal damage to property"
      }
    }
  ]
}
```

#### `stubOffencesNotFound(crn?, eventNumber?)`
Returns a 404 error for offences not found.

#### `stubOffencesWithMultipleAdditional(crn?, eventNumber?)`
Returns offences with 3 additional offences.

#### `stubOffencesServerError(crn?, eventNumber?)`
Returns a 500 server error.

## Usage in Cypress Tests

```typescript
describe('My Test', () => {
  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')
    cy.signIn()
  })

  it('should fetch defendant details', () => {
    // Use default data
    cy.task('stubDefendantDetails')

    // Or with custom UUID
    cy.task('stubDefendantDetails', 'custom-uuid-here')

    // Your test code here...
  })

  it('should handle missing defendant', () => {
    cy.task('stubDefendantDetailsNotFound', 'missing-uuid')

    // Your test code here...
  })

  it('should fetch offences', () => {
    // Use default CRN and event number
    cy.task('stubOffences')

    // Your test code here...
  })
})
```

## Usage in Application Code

```typescript
import PreSentenceToDeliusService from '../services/preSentenceToDeliusService'
import HmppsAuthClient from '../data/hmppsAuthClient'

// Initialize service
const hmppsAuthClient = new HmppsAuthClient(/* ... */)
const service = new PreSentenceToDeliusService(hmppsAuthClient)

// Fetch defendant details
const defendantDetails = await service.getDefendantDetails(psrUuid)

// Fetch offences
const offenceDetails = await service.getOffences(crn, eventNumber)
```

## Configuration

The API URL is configured in `server/config.ts`:

```typescript
preSentenceToDeliusApi: {
  url: get('PRE_SENTENCE_TO_DELIUS_API_URL', 'http://localhost:9092', requiredInProduction),
  timeout: {
    response: Number(get('TOKEN_VERIFICATION_API_TIMEOUT_RESPONSE', 5000)),
    deadline: Number(get('TOKEN_VERIFICATION_API_TIMEOUT_DEADLINE', 5000)),
  },
  agent: new AgentConfig(),
}
```

For local development, ensure WireMock is running on port 9092 or set the `PRE_SENTENCE_TO_DELIUS_API_URL` environment variable.

## Running Tests

```bash
# Run all integration tests
npm run test:integration

# Run only pre-sentence-to-delius tests
npx cypress run --spec "integration_tests/e2e/api/preSentenceToDelius.cy.ts"
```

## Notes

- All mocks use WireMock under the hood
- The mocks are reset before each test when `cy.task('reset')` is called
- Custom data can be passed to override default responses
- All endpoints require authentication via bearer token (mocked in tests)
