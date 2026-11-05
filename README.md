# Pre-sentence Service

Pre-Sentence Service allows probation staff to capture and store pre-sentence data.

[![API docs](https://img.shields.io/badge/API_docs_-view-85EA2D.svg?logo=swagger)](https://pre-sentence-service-dev.hmpps.service.justice.gov.uk/api/docs)

[![repo standards badge](https://img.shields.io/badge/dynamic/json?color=blue&style=for-the-badge&logo=github&label=MoJ%20Compliant&query=%24.result&url=https%3A%2F%2Foperations-engineering-reports.cloud-platform.service.justice.gov.uk%2Fapi%2Fv1%2Fcompliant_public_repositories%2Fpre-sentence-service)](https://operations-engineering-reports.cloud-platform.service.justice.gov.uk/public-github-repositories.html#pre-sentence-service "Link to report")

- [Contributing](CONTRIBUTING.md) - branch, testing, pull request, commit, and review guidance
- [Save flows](docs/save-flows.md) - autosave, Save and Continue, sign-out persistence, and side-navigation behavior
- [Deployments and releases](docs/deployments.md) - environments, release candidates and production promotion
- [Kubernetes commands](docs/kubernetes-commands.md) - inspecting deployments and applying temporary or permanent configuration changes
- [Telemetry and logging](docs/telemetry.md) - Application Insights configuration, troubleshooting and logging conventions

## Running the app

Ensure Docker images are up to date:

```sh
docker-compose pull
```

The easiest way to run the app and its dependencies is:

```sh
docker-compose up
```

### Dependencies

The app requires:

- hmpps-auth - authentication
- Redis - session store and token caching
- PostgreSQL - database
- Gotenberg - PDF generator
- LocalStack - cloud service emulator

### Running the app for development

Use Node.js 24 LTS.

Ensure Docker images are up to date, then start the supporting services without the application container:

```sh
docker-compose pull
docker-compose up --scale app=0
```

In a separate terminal, at the project root, install dependencies:

```sh
npm install
```

Build the assets and start the app with automatic reloading:

```sh
AWS_ENDPOINT=http://localhost:4566 npm run start:dev
```

`AWS_ENDPOINT` is only set for use with LocalStack during local development.

Access the service at <http://localhost:3000>.

### Run linter

```sh
npm run lint
```

### Run tests

```sh
npm run test
```

### Running integration tests

Start the test database, Redis and WireMock:

```sh
docker-compose -f docker-compose-test.yml up
```

In a separate terminal at the project root, start the application in test mode:

```sh
AWS_ENDPOINT=http://localhost:4566 npm run start-feature
```

Alternatively, use automatic reloading:

```sh
AWS_ENDPOINT=http://localhost:4566 npm run start-feature:dev
```

`AWS_ENDPOINT` is only set for use with LocalStack during local development.

Run the integration tests headlessly:

```sh
npm run int-test
```

Or open the Cypress UI:

```sh
npm run int-test-ui
```

### Clean database

```sh
npm run clean-db
```

This removes all database tables. Restart the application afterwards to run migrations and recreate the database structure.

## Application Insights and logging

The application uses `@ministryofjustice/hmpps-azure-telemetry` to export
request traces, HTTP dependency telemetry and Bunyan logs to Azure Application Insights.

See [Telemetry and logging](docs/telemetry.md) for configuration, local debugging,
Azure queries and structured logging conventions.

## API documentation

API documentation is provided through Swagger.

When the application is running, access it at:

<http://localhost:3000/api/docs>

## Deployments

Changes merged into `main` deploy automatically to dev. Preprod runs a fixed
`preprod/*` release candidate, whose image is promoted to production through
the manually triggered Release workflow.

After a successful production release, the workflow normally cuts the next
preprod candidate from the latest `main`.

See [Deployments and releases](docs/deployments.md) for environments,
approval controls and the release process.

## Sources of information data

The report answers used by the form, preview and PDF are stored in
`report_details.pages`.

Custom sources are stored separately:

- `sources_of_information` stores the source details.
- `report_sources_of_information` links a custom source to a specific report.