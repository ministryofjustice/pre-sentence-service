import { validate } from 'uuid'

export const validateUUID = (uuid: string) => {
    return validate(uuid)
}