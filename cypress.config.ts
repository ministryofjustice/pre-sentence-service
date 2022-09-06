import { defineConfig } from 'cypress'
import pg from 'pg'

import { resetStubs } from './integration_tests/mockApis/wiremock'
import auth from './integration_tests/mockApis/auth'
import communityApi from './integration_tests/mockApis/communityApi'
import tokenVerification from './integration_tests/mockApis/tokenVerification'

export default defineConfig({
  chromeWebSecurity: false,
  fixturesFolder: 'integration_tests/fixtures',
  screenshotsFolder: 'integration_tests/screenshots',
  videosFolder: 'integration_tests/videos',
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    configFile: 'reporter-config.json',
  },
  videoUploadOnPasses: false,
  taskTimeout: 60000,
  e2e: {
    setupNodeEvents(on) {
      on('task', {
        reset: resetStubs,
        ...auth,
        ...tokenVerification,
        ...communityApi,

        resetDatabase() {
          const pool = new pg.Pool({
            user: 'pre-sentence-service',
            host: 'localhost',
            database: 'pre-sentence-service',
            password: 'pre-sentence-service',
            port: 5432,
          })
          try {
            return pool.query(`
                DELETE
                FROM public.field_value;

                UPDATE
                    public.report
                SET status = 'NOT_STARTED'
                WHERE id = '0a15ce57-c46e-4b71-84f0-49dbed4bb81e';

                INSERT INTO field_value ("reportId", "fieldId", "value", "version")
                VALUES ('0a15ce57-c46e-4b71-84f0-49dbed4bb81e', 1, 'Lenore Marquez', 1),
                       ('0a15ce57-c46e-4b71-84f0-49dbed4bb81e', 2, '18/08/1979', 1),
                       ('0a15ce57-c46e-4b71-84f0-49dbed4bb81e', 3, 'X320741', 1),
                       ('0a15ce57-c46e-4b71-84f0-49dbed4bb81e', 6, 'Sheffield Magistrates Court', 1),
                       ('0a15ce57-c46e-4b71-84f0-49dbed4bb81e', 7, 'South Yorkshire', 1),
                       ('0a15ce57-c46e-4b71-84f0-49dbed4bb81e', 8, '23', 1),
                       ('0a15ce57-c46e-4b71-84f0-49dbed4bb81e', 9, '01', 1),
                       ('0a15ce57-c46e-4b71-84f0-49dbed4bb81e', 10, '2022', 1),
                       ('0a15ce57-c46e-4b71-84f0-49dbed4bb81e', 11,
                        'Stealing mail bags. On 13th January 2022 the defendant stole mail bags from a mail van.', 1),
                       ('0a15ce57-c46e-4b71-84f0-49dbed4bb81e', 39, '01', 1),
                       ('0a15ce57-c46e-4b71-84f0-49dbed4bb81e', 40, '02', 1),
                       ('0a15ce57-c46e-4b71-84f0-49dbed4bb81e', 41, '2022', 1);

                UPDATE
                    public.report
                SET status = 'NOT_STARTED'
                WHERE id = '0877ed35-e59a-4e94-b2bd-5d2283dd7dd7';

                INSERT INTO field_value ("reportId", "fieldId", "value", "version")
                VALUES ('0877ed35-e59a-4e94-b2bd-5d2283dd7dd7', 1, 'Lenore Marquez', 1),
                       ('0877ed35-e59a-4e94-b2bd-5d2283dd7dd7', 2, '18/08/1979', 1),
                       ('0877ed35-e59a-4e94-b2bd-5d2283dd7dd7', 3, 'X320741', 1),
                       ('0877ed35-e59a-4e94-b2bd-5d2283dd7dd7', 6, 'Sheffield Magistrates Court', 1),
                       ('0877ed35-e59a-4e94-b2bd-5d2283dd7dd7', 7, 'South Yorkshire', 1),
                       ('0877ed35-e59a-4e94-b2bd-5d2283dd7dd7', 8, '23', 1),
                       ('0877ed35-e59a-4e94-b2bd-5d2283dd7dd7', 9, '01', 1),
                       ('0877ed35-e59a-4e94-b2bd-5d2283dd7dd7', 10, '2022', 1),
                       ('0877ed35-e59a-4e94-b2bd-5d2283dd7dd7', 11,
                        'Stealing mail bags. On 13th January 2022 the defendant stole mail bags from a mail van.', 1),
                       ('0877ed35-e59a-4e94-b2bd-5d2283dd7dd7', 39, '01', 1),
                       ('0877ed35-e59a-4e94-b2bd-5d2283dd7dd7', 40, '02', 1),
                       ('0877ed35-e59a-4e94-b2bd-5d2283dd7dd7', 41, '2022', 1);
            `)
          } catch (e) {
            return null
          }
        },
      })
    },
    baseUrl: 'http://localhost:3007',
    excludeSpecPattern: '**/!(*.cy).ts',
    specPattern: 'integration_tests/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'integration_tests/support/index.ts',
  },
})
