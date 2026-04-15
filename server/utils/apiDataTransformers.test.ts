import {
  transformName,
  transformAddress,
  transformDefendantDetails,
  formatOffenceDate,
  transformOffence,
  transformOffenceDetails,
} from './apiDataTransformers'
import type { Name, Address, DefendantDetails, Offence, OffenceDetails } from '../@types/preSentenceToDelius'
import config from '../config'

// Mock the config to disable fake offences during tests
jest.mock('../config', () => ({
  __esModule: true,
  default: {
    dev: {
      fakeAdditionalOffences: false,
    },
  },
}))

describe('apiDataTransformers', () => {
  describe('transformName', () => {
    it('should transform name with all parts', () => {
      const apiName: Name = {
        forename: 'John',
        middleName: 'Michael',
        surname: 'Doe',
      }

      expect(transformName(apiName)).toBe('John Michael Doe')
    })

    it('should transform name without middle name', () => {
      const apiName: Name = {
        forename: 'Jane',
        surname: 'Smith',
      }

      expect(transformName(apiName)).toBe('Jane Smith')
    })

    it('should handle empty middle name', () => {
      const apiName: Name = {
        forename: 'Bob',
        middleName: '',
        surname: 'Jones',
      }

      expect(transformName(apiName)).toBe('Bob Jones')
    })
  })

  describe('transformAddress', () => {
    it('should transform complete address', () => {
      const apiAddress: Address = {
        buildingName: 'Flat 5',
        buildingNumber: '42',
        streetName: 'High Street',
        district: 'Camden',
        town: 'London',
        county: 'Greater London',
        postcode: 'NW1 2AB',
      }

      const result = transformAddress(apiAddress)

      expect(result).toEqual({
        'address-buildingName': 'Flat 5',
        'address-number': '42',
        'address-streetName': 'High Street',
        'address-town': 'London',
        'address-district': 'Camden',
        'address-county': 'Greater London',
        'address-postcode': 'NW1 2AB',
      })
    })

    it('should handle missing address fields', () => {
      const apiAddress: Address = {
        streetName: 'Main Road',
        town: 'Bristol',
      }

      const result = transformAddress(apiAddress)

      expect(result).toEqual({
        'address-buildingName': '',
        'address-number': '',
        'address-streetName': 'Main Road',
        'address-town': 'Bristol',
        'address-district': '',
        'address-county': '',
        'address-postcode': '',
      })
    })

    it('should return empty address when undefined', () => {
      const result = transformAddress(undefined)

      expect(result).toEqual({
        'address-buildingName': '',
        'address-number': '',
        'address-streetName': '',
        'address-town': '',
        'address-district': '',
        'address-county': '',
        'address-postcode': '',
      })
    })
  })

  describe('transformDefendantDetails', () => {
    it('should transform complete defendant details', () => {
      const apiData: DefendantDetails = {
        crn: 'X123456',
        eventNumber: 12345,
        name: {
          forename: 'John',
          middleName: 'Michael',
          surname: 'Doe',
        },
        dateOfBirth: '1990-01-15',
        mainAddress: {
          buildingNumber: '10',
          streetName: 'Main Street',
          town: 'London',
          postcode: 'SW1A 1AA',
        },
      }

      const result = transformDefendantDetails(apiData)

      expect(result).toEqual({
        name: 'John Michael Doe',
        dateOfBirth: new Date('1990-01-15'),
        crn: 'X123456',
        'address-buildingName': '',
        'address-number': '10',
        'address-streetName': 'Main Street',
        'address-town': 'London',
        'address-district': '',
        'address-county': '',
        'address-postcode': 'SW1A 1AA',
      })
    })

    it('should handle missing address', () => {
      const apiData: DefendantDetails = {
        crn: 'Y987654',
        eventNumber: 54321,
        name: {
          forename: 'Jane',
          surname: 'Smith',
        },
        dateOfBirth: '1985-06-20',
      }

      const result = transformDefendantDetails(apiData)

      expect(result.name).toBe('Jane Smith')
      expect(result.crn).toBe('Y987654')
      expect(result['address-postcode']).toBe('')
    })
  })

  describe('formatOffenceDate', () => {
    it('should format ISO date to DD/MM/YYYY', () => {
      expect(formatOffenceDate('2024-04-12')).toBe('12/04/2024')
      expect(formatOffenceDate('2023-01-05')).toBe('05/01/2023')
      expect(formatOffenceDate('2025-12-31')).toBe('31/12/2025')
    })

    it('should handle invalid dates gracefully', () => {
      const invalidDate = 'invalid-date'
      const result = formatOffenceDate(invalidDate)
      // Should return NaN/NaN/NaN when parsing fails
      expect(result).toMatch(/NaN/)
    })
  })

  describe('transformOffence', () => {
    it('should transform main offence', () => {
      const offence: Offence = {
        date: '2024-04-12',
        mainCategory: {
          code: '030',
          description: 'Criminal damage',
        },
        subCategory: {
          code: '03001',
          description: 'Criminal damage to property',
        },
      }

      const result = transformOffence(offence, true)

      expect(result).toEqual({
        description: 'Criminal damage to property',
        code: '03001',
        date: '12/04/2024',
        isMainOffence: true,
      })
    })

    it('should transform additional offence', () => {
      const offence: Offence = {
        date: '2024-04-12',
        mainCategory: {
          code: '020',
          description: 'Violence',
        },
        subCategory: {
          code: '02004',
          description: 'Assault on emergency worker',
        },
      }

      const result = transformOffence(offence, false)

      expect(result).toEqual({
        description: 'Assault on emergency worker',
        code: '02004',
        date: '12/04/2024',
        isMainOffence: false,
      })
    })
  })

  describe('transformOffenceDetails', () => {
    it('should transform complete offence details', () => {
      const apiData: OffenceDetails = {
        mainOffence: {
          date: '2024-04-12',
          mainCategory: {
            code: '030',
            description: 'Criminal damage',
          },
          subCategory: {
            code: '03001',
            description: 'Criminal damage to property',
          },
        },
        additionalOffences: [
          {
            date: '2024-04-12',
            mainCategory: {
              code: '020',
              description: 'Violence',
            },
            subCategory: {
              code: '02004',
              description: 'Assault on emergency worker',
            },
          },
          {
            date: '2024-04-12',
            mainCategory: {
              code: '060',
              description: 'Drug offences',
            },
            subCategory: {
              code: '06001',
              description: 'Possession of class A drugs',
            },
          },
        ],
      }

      const result = transformOffenceDetails(apiData)

      expect(result.mainOffence).toEqual({
        description: 'Criminal damage to property',
        code: '03001',
        date: '12/04/2024',
        isMainOffence: true,
      })

      expect(result.additionalOffences).toHaveLength(2)
      expect(result.additionalOffences[0]).toEqual({
        description: 'Assault on emergency worker',
        code: '02004',
        date: '12/04/2024',
        isMainOffence: false,
      })
      expect(result.additionalOffences[1]).toEqual({
        description: 'Possession of class A drugs',
        code: '06001',
        date: '12/04/2024',
        isMainOffence: false,
      })
    })

    it('should handle empty additional offences', () => {
      const apiData: OffenceDetails = {
        mainOffence: {
          date: '2024-01-01',
          mainCategory: {
            code: '010',
            description: 'Theft',
          },
          subCategory: {
            code: '01001',
            description: 'Theft from shop',
          },
        },
        additionalOffences: [],
      }

      const result = transformOffenceDetails(apiData)

      expect(result.mainOffence.description).toBe('Theft from shop')
      expect(result.additionalOffences).toHaveLength(0)
    })

    it('should generate fake additional offences when enabled and no offences exist', () => {
      // Temporarily enable the feature for this test
      const originalValue = config.dev.fakeAdditionalOffences
      config.dev.fakeAdditionalOffences = true

      const apiData: OffenceDetails = {
        mainOffence: {
          date: '2024-01-01',
          mainCategory: {
            code: '010',
            description: 'Theft',
          },
          subCategory: {
            code: '01001',
            description: 'Theft from shop',
          },
        },
        additionalOffences: [],
      }

      const result = transformOffenceDetails(apiData)

      expect(result.mainOffence.description).toBe('Theft from shop')
      expect(result.additionalOffences.length).toBeGreaterThan(0)
      expect(result.additionalOffences.length).toBeLessThanOrEqual(3)
      // Verify the generated offences have the correct structure
      result.additionalOffences.forEach(offence => {
        expect(offence).toHaveProperty('description')
        expect(offence).toHaveProperty('code')
        expect(offence).toHaveProperty('date')
        expect(offence.isMainOffence).toBe(false)
      })

      // Restore original value
      config.dev.fakeAdditionalOffences = originalValue
    })

    it('should not generate fake offences when additional offences already exist', () => {
      // Temporarily enable the feature for this test
      const originalValue = config.dev.fakeAdditionalOffences
      config.dev.fakeAdditionalOffences = true

      const apiData: OffenceDetails = {
        mainOffence: {
          date: '2024-04-12',
          mainCategory: {
            code: '030',
            description: 'Criminal damage',
          },
          subCategory: {
            code: '03001',
            description: 'Criminal damage to property',
          },
        },
        additionalOffences: [
          {
            date: '2024-04-12',
            mainCategory: {
              code: '020',
              description: 'Violence',
            },
            subCategory: {
              code: '02004',
              description: 'Assault on emergency worker',
            },
          },
        ],
      }

      const result = transformOffenceDetails(apiData)

      // Should have exactly 1 additional offence (not generate fake ones)
      expect(result.additionalOffences).toHaveLength(1)
      expect(result.additionalOffences[0].description).toBe('Assault on emergency worker')

      // Restore original value
      config.dev.fakeAdditionalOffences = originalValue
    })
  })
})
