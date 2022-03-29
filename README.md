# Pre-sentence Service

Pre-Sentence Service is a service that allows probation staff to capture and store pre-sentence data. 

## Running the app
The easiest way to run the app is to use docker compose to create the service and all dependencies. 

`docker-compose pull`

`docker-compose up`

### Dependencies
The app requires: 
* hmpps-auth - for authentication
* redis - session store and token caching
* postgres - database
* gotenberg - PDF generator

### Runing the app for development

To start the main services excluding the typescript app: 

`docker-compose up --remove-orphans hmpps-auth redis postgres gotenberg`

Install dependencies using `npm install`, ensuring you are using >= `Node v16.14.0` (Gallium) LTS

And then, to build the assets and start the app with nodemon:

`npm run start:dev`

### Run linter

`npm run lint`

### Run tests

`npm run test`

### Running integration tests

For local running, start a test db, redis, and wiremock instance by:

`docker-compose -f docker-compose-test.yml up`

Then run the server in test mode by:

`npm run start-feature` (or `npm run start-feature:dev` to run with nodemon)

And then either, run tests in headless mode with:

`npm run int-test`
 
Or run tests with the cypress UI:

`npm run int-test-ui`

**N.B. Integration tests will populate the database with test data.**

In order to clean the database you can use:

`npm run clean-db`

This will remove all database tables, you must then restart the service in order to run the migrations and reset the database. 

### Dependency Checks

The template project has implemented some scheduled checks to ensure that key dependencies are kept up to date.
If these are not desired in the cloned project, remove references to `check_outdated` job from `.circleci/config.yml`
