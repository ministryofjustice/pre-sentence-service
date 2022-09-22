import { IContextOffence } from '../services/preSentenceToDeliusService'

export default (offences: Array<IContextOffence>): string => {
  return offences.map(offence => offence.description).join('\n')
}
