# Contributing

Thank you for contributing to Pre-Sentence Service. This guide describes the
branching, testing, pull request, and review expectations for the repository.

## Before you start

- Use Node.js supported by the project: nvm can help you switch between Node versions if needed.
- Do not commit credentials, secrets, production data, or generated build output.

See the [README](../README.md) for local application setup and the
[architecture overview](architecture.md) for the main system components.

## Branching

The branching strategy is currently under review. Until it is confirmed, use the repository's agreed target branch when creating a pull request.

Currently, we ignore the `develop` branch, every piece of work branches off `main` and is merged back into `main`.

## Required checks

Run these commands from the repository root before requesting review:

```bash
npm run lint
npm run typecheck
npm test
```

All three checks should pass. If a check cannot be run locally, explain why in the pull request and include the closest available verification.

## Integration tests

**The GitHub Actions integration-test job is currently temporarily disabled, so they are not currently being run by the CI pipeline.**

**Some Delius API scenarios currently set up stubs without asserting the final application response. This needs addressing**

The repository contains Cypress end-to-end and API tests under
`integration_tests/e2e/`. They cover health checks, authentication and logout,
report API and page access, and Delius-related API stubs. The Cypress
configuration runs files matching `integration_tests/e2e/**/*.cy.*`.

These tests are available for local execution. Integration tests use Docker Compose for the test database, Redis, WireMock, Gotenberg, and LocalStack services.

Local integration tests should still be run for changes that affect routes,
forms, authentication, persistence, external API integrations, or end-to-end
user journeys.

## PDF tests

Run the PDF tests with:

```bash
npm run test:pdf
```

This compiles the Sass assets and runs the tests in `pdf_tests/`. Run PDF tests
when changing report content, templates, styles, page breaks, or PDF generation.

## Commits

- Use a clear, imperative commit subject that describes the change.
- Keep each commit focused on one logical change where practical.
- Do not include secrets, credentials, personal data, or large generated files.
- Include migration and configuration changes in the same focused change when they are required for the application to work.
- Make sure the branch is up to date before merging.

Follow the repository's configured commit-signing requirements where applicable.

## Pull requests

- Use a clear title that describes the change.
- If the work is a complex change then explain the problem, the solution, and any relevant design decisions.
- Link the relevant JIRA ticket in the pull request and add the pull request link to the JIRA ticket.
- Highlight database migrations and configuration changes.
- Mark the pull request as draft if it is not ready for review.
- Keep the pull request focused and avoid unrelated changes.
- Check that the required status checks have passed before requesting approval.

## Review expectations

Reviewers should check that:

- The change addresses the stated problem without unrelated refactoring.
- The required checks and relevant integration or PDF tests pass.
- Authentication, authorisation, validation, error handling, and sensitive data handling remain appropriate.
- Database migrations are safe, ordered correctly, and documented when necessary.
- User-facing changes remain accessible and consistent with GOV.UK/MoJ patterns.
- Operational changes include configuration, deployment, rollback, and monitoring considerations where relevant.
- Documentation and tests have been updated when behaviour or contracts change.

Authors should respond to review comments, resolve completed discussions, and
keep the pull request description current as the implementation changes.
