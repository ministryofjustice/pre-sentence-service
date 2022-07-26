import CommunityService from '../../services/communityService'

const offenderInformation = {
  firstName: 'john',
  surname: 'smith',
  dateOfBirth: '1982-10-24',
  gender: 'Male',
  contactDetails: {
    addresses: [
      {
        addressNumber: 32,
        buildingName: 'HMPPS Digital Studio',
        county: 'South Yorkshire',
        district: 'Sheffield City Centre',
        noFixedAbode: false,
        postcode: 'S3 7BS',
        streetName: 'Scotland Street',
        town: 'Sheffield',
      },
    ],
  },
  otherIds: {
    pncNumber: '2004/0712343H',
  },
}

export default class MockCommunityService extends CommunityService {
  constructor() {
    super(undefined)
  }

  async getAllOffenderInformation(token: string) {
    return {
      token,
      ...offenderInformation,
    }
  }
}
