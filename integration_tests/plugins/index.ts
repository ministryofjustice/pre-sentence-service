import pg from 'pg'
import { resetStubs } from '../mockApis/wiremock'

import auth from '../mockApis/auth'
import tokenVerification from '../mockApis/tokenVerification'

export default (on: (string, Record) => void): void => {
  on('task', {
    reset: resetStubs,

    getSignInUrl: auth.getSignInUrl,
    stubSignIn: auth.stubSignIn,

    stubAuthUser: auth.stubUser,
    stubAuthPing: auth.stubPing,

    stubTokenVerificationPing: tokenVerification.stubPing,
  })

  on('task', {
    resetDatabase() {
      // const pool = new pg.Pool(config.db);
      const pool = new pg.Pool({
        user: 'pre-sentence-service',
        host: 'localhost',
        database: 'pre-sentence-service',
        password: 'pre-sentence-service',
        port: 5432,
      })
      try {
        pool.query(`
            DELETE
            FROM public.field_value;

            INSERT INTO field_value ("reportId", "fieldId", "value", "version")
            VALUES ('0a15ce57-c46e-4b71-84f0-49dbed4bb81e', 1, 'Lenore Marquez', 1),
                   ('0a15ce57-c46e-4b71-84f0-49dbed4bb81e', 2, '18/08/1979', 1),
                   ('0a15ce57-c46e-4b71-84f0-49dbed4bb81e', 3, 'DX12340A', 1),
                   ('0a15ce57-c46e-4b71-84f0-49dbed4bb81e', 6, 'Sheffield Magistrates Court', 1),
                   ('0a15ce57-c46e-4b71-84f0-49dbed4bb81e', 7, 'South Yorkshire', 1),
                   ('0a15ce57-c46e-4b71-84f0-49dbed4bb81e', 8, '23', 1),
                   ('0a15ce57-c46e-4b71-84f0-49dbed4bb81e', 9, '01', 1),
                   ('0a15ce57-c46e-4b71-84f0-49dbed4bb81e', 10, '2022', 1),
                   ('0a15ce57-c46e-4b71-84f0-49dbed4bb81e', 11, 'Stealing mail bags. On 13th January 2022 the defendant stole mail bags from a mail van.', 1),
                   ('0a15ce57-c46e-4b71-84f0-49dbed4bb81e', 39, '01', 1),
                   ('0a15ce57-c46e-4b71-84f0-49dbed4bb81e', 40, '02', 1),
                   ('0a15ce57-c46e-4b71-84f0-49dbed4bb81e', 41, '2022', 1);

            INSERT INTO field_value ("reportId", "fieldId", "value", "version")
            VALUES ('0877ed35-e59a-4e94-b2bd-5d2283dd7dd7', 1, 'Lenore Marquez', 1),
                   ('0877ed35-e59a-4e94-b2bd-5d2283dd7dd7', 2, '18/08/1979', 1),
                   ('0877ed35-e59a-4e94-b2bd-5d2283dd7dd7', 3, 'DX12340A', 1),
                   ('0877ed35-e59a-4e94-b2bd-5d2283dd7dd7', 6, 'Sheffield Magistrates Court', 1),
                   ('0877ed35-e59a-4e94-b2bd-5d2283dd7dd7', 7, 'South Yorkshire', 1),
                   ('0877ed35-e59a-4e94-b2bd-5d2283dd7dd7', 8, '23', 1),
                   ('0877ed35-e59a-4e94-b2bd-5d2283dd7dd7', 9, '01', 1),
                   ('0877ed35-e59a-4e94-b2bd-5d2283dd7dd7', 10, '2022', 1),
                   ('0877ed35-e59a-4e94-b2bd-5d2283dd7dd7', 11, 'Stealing mail bags. On 13th January 2022 the defendant stole mail bags from a mail van.', 1),
                   ('0877ed35-e59a-4e94-b2bd-5d2283dd7dd7', 39, '01', 1),
                   ('0877ed35-e59a-4e94-b2bd-5d2283dd7dd7', 40, '02', 1),
                   ('0877ed35-e59a-4e94-b2bd-5d2283dd7dd7', 41, '2022', 1);
        `)
      } catch (e) {
        // Oh, well.
      }
    },
  })
}
