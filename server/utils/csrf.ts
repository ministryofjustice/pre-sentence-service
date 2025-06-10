import { csrfSync } from 'csrf-sync'

export const { csrfSynchronisedProtection } = csrfSync({
  getTokenFromRequest: req => {
    // If the incoming request is a application/x-www-form-urlencoded content type
    // then get the token from the body.
    if (req.is('application/x-www-form-urlencoded')) {
      return req.body['CSRFToken']
    }
    // Otherwise use the header for all other request types
    return req.headers['x-csrf-token']
  },
})
