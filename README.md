# Pre-sentence Service

Pre-Sentence Service is a service that allows probation staff to capture and store pre-sentence data. 

[![API docs](https://img.shields.io/badge/API_docs_-view-85EA2D.svg?logo=swagger)](https://pre-sentence-service-dev.hmpps.service.justice.gov.uk/api/docs)

[![repo standards badge](https://img.shields.io/badge/dynamic/json?color=blue&style=for-the-badge&logo=github&label=MoJ%20Compliant&query=%24.result&url=https%3A%2F%2Foperations-engineering-reports.cloud-platform.service.justice.gov.uk%2Fapi%2Fv1%2Fcompliant_public_repositories%2Fpre-sentence-service)](https://operations-engineering-reports.cloud-platform.service.justice.gov.uk/public-github-repositories.html#pre-sentence-service "Link to report")

- [Contributing](CONTRIBUTING.md) - branch, testing, pull request, commit, and review guidance
- [Save flows](docs/save-flows.md) - autosave, Save and Continue, sign-out persistence, and side-navigation behavior
- [Kubernetes commands](docs/kubernetes-commands.md) - inspecting deployments and applying temporary or permanent configuration changes

## Running the app
Ensure docker images are up-to-date

`docker-compose pull`

The easiest way to run the app is to use docker compose to create the service and all dependencies.

`docker-compose up`

### Dependencies
The app requires:
* hmpps-auth - for authentication
* redis - session store and token caching
* postgres - database
* gotenberg - PDF generator
* localstack - Cloud service emulator

### Runing the app for development

Ensure docker images are up-to-date

`docker-compose pull`

To start the main services excluding the typescript app: 

`docker-compose up --scale app=0`

Now in a separate terminal window or tab, at the project root.

Install dependencies using `npm install`, ensuring you are using >= `Node v24.0.0` LTS

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

`docker-compose -f docker-compose-test.yml up`

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

## API Documentation

API documentation is provided via Swagger.

Once the applicaiton is running you can access the Swagger UI at:

`http://localhost:3000/api/docs`

### Deployments

| Env     | Branch  | Trigger   | Approval | Examples                                    |
|---------|---------|-----------|----------|---------------------------------------------|
| dev     | develop | Automatic | None     | When PR is merged to develop branch         |
| preprod | main    | Automatic | None     | When PR is merged to main                   |
| prod    | main    | Automatic | Manual   | When deployment is manually approved in GHA |

**Additional protections:**
1. Commits must be signed
2. Only developers with write access can merge PRs to `develop` and `main` branches.
3. Only developers with write access can approve deployments to prod.
