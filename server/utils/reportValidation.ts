import { validate } from 'uuid'

const validateUUID = (uuid: string) => {
  return validate(uuid)
}
export default validateUUID
