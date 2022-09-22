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
* localstack - Cloud service emulator
* wproofreader - Spellchecking for rich text editor (CKEditor 5)

### Runing the app for development

To start the main services excluding the typescript app: 

`WP_LICENSE_KEY=<LICENSE_KEY> docker-compose up --remove-orphans hmpps-auth redis postgres wiremock community-api localstack gotenberg wproofreader`

Now in a separate terminal window or tab, at the project root.

Install dependencies using `npm install`, ensuring you are using >= `Node v16.15.1` (Gallium) LTS

And then, to build the assets and start the app with nodemon:

`AWS_ENDPOINT=http://localhost:4566 npm run start:dev`

Note: AWS_ENDPOINT is only set for correct use with _localstack_ during local development.

You can now access the service at `http://localhost:3000`

### Run linter

`npm run lint`

### Run tests

`npm run test`

### Running integration tests

For local running, start a test db, redis, and wiremock instance by:

`WP_LICENSE_KEY=<LICENSE_KEY> docker-compose -f docker-compose-test.yml up --remove-orphans`

Then, in a separate terminal window or tab, at the project root; run the server in test mode by:

`AWS_ENDPOINT=http://localhost:4566 npm run start-feature` (or `AWS_ENDPOINT=http://localhost:4566 npm run start-feature:dev` to run with nodemon)

Note: AWS_ENDPOINT is only set for correct use with _localstack_ during local development.

And then either, run tests in headless mode with:

`npm run int-test`
 
Or run tests with the cypress UI:

`npm run int-test-ui`

### Clean database

In order to clean the database you can use:

`npm run clean-db`

This will remove all database tables, you must then restart the service in order to run the migrations and reset the database. 

### Dependency Checks

The template project has implemented some scheduled checks to ensure that key dependencies are kept up to date.
If these are not desired in the cloned project, remove references to `check_outdated` job from `.circleci/config.yml`

## API Documentation

API documentation is provided via Swagger.

Once the applicaiton is running you can access the Swagger UI at:

`http://localhost:3000/api/docs`
