import { csrfSync } from 'csrf-sync'

export const { csrfSynchronisedProtection } = csrfSync({
  getTokenFromRequest: req => {
    return req.body['CSRFToken']
  },
})
