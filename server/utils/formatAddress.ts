import { IContextAddress } from '../services/preSentenceToDeliusService'

export default (address: IContextAddress): string => {
  if (address.noFixedAbode) {
    return 'No fixed abode'
  }
  let tmpAddress
  tmpAddress = address.buildingName ? `${address.buildingName}\n` : ''
  tmpAddress = address.addressNumber ? `${tmpAddress}${address.addressNumber}` : tmpAddress
  tmpAddress = address.streetName ? `${tmpAddress} ${address.streetName}` : tmpAddress
  tmpAddress = address.district ? `${tmpAddress}\n${address.district}` : tmpAddress
  tmpAddress = address.town ? `${tmpAddress}\n${address.town}` : tmpAddress
  tmpAddress = address.county ? `${tmpAddress}\n${address.county}` : tmpAddress
  tmpAddress = address.postcode ? `${tmpAddress}\n${address.postcode}` : tmpAddress
  return tmpAddress
}
