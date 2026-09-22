# Contributing

Thank you for contributing to Pre-Sentence-Service.

See the [README](../README.md) for local application setup and the
[architecture overview](architecture.md) for a quick overview of the main system components.

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

All three checks should pass.

## PDF tests

Run PDF tests when changing report content, templates, styles, page breaks, or PDF generation:

```bash
npm run test:pdf
```

This compiles the Sass assets and runs the tests in `pdf_tests/`.

## Commits

- Use a clear commit subject that describes the change.
- Try to keep each commit focused on one logical change where practical.
- Do not include secrets, credentials, personal data, or large generated files.
- Include migration and configuration changes in the same focused change when they are required for the application to work.
- Make sure the branch is up to date before merging.

Follow the repository's configured commit-signing requirements where applicable.

## Pull requests

- Use a clear title that describes the change.
- Link the relevant JIRA ticket in the pull request
- Highlight database migrations and configuration changes.
- Mark the pull request as draft if it is not ready for review.
- Check that the required status checks have passed before requesting approval.
