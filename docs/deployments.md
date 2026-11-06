# Deployments and releases

The environments follow a rolling release-candidate process. Development continues
in dev while a fixed candidate is tested in preprod, then promoted to production.

## Environments

| Environment | Branch / source | Trigger | Approval | Purpose |
| --- | --- | --- | --- | --- |
| dev | `main` | Automatic. Deployed after the pipeline succeeds on `main`. | On PRs | Completed development work awaiting testing. |
| preprod | `preprod/*`, cut from `main` | Automatic. Built and deployed when **Cut preprod** creates the candidate branch, normally after a production release. | None | A fixed release candidate for testing, isolated from further changes to `main`. |
| prod | The existing image from the current `preprod/*` candidate | Manual. Start the **Release** workflow. After deployment succeeds, it cuts the next preprod candidate by default. | None | The tested release promoted from preprod. |

## Release candidate branches

`preprod/*` means branches whose names begin with `preprod/`, for example:

```text
preprod/2026-11-05-1100
```

The **Cut preprod** workflow creates a candidate branch from the latest `main`
commit by default. Subsequent changes to `main` do not automatically enter that
candidate.

The candidate is cut from Git history, not by copying the running dev deployment.

## Normal release cycle

1. Completed development work is merged into `main` and automatically deployed to
   dev after the pipeline succeeds.
2. The current `preprod/*` candidate is tested in preprod.
3. When the preprod testing is complete, run the **Release** workflow to deploy its image to
   production.
4. After the production deployment succeeds, the workflow tags the released commit
   and deletes the old candidate branch.
5. By default, it then runs **Cut preprod**, creating a new `preprod/*` branch from
   the latest `main` and starting its pipeline to deploy the next candidate to preprod.

Dev can therefore contain completed work that has not yet been tested or included
in the current release candidate. Releasing preprod to production normally brings
the latest development baseline into preprod for the next testing cycle.

## Release controls

- The **Release** workflow expects exactly one `preprod/*` candidate branch.
- It checks that the candidate branch matches the latest successful preprod
  deployment before selecting its image for production.
- The released commit is tagged as `release/<version>`.
- The `cut_next` input defaults to `true`.
  - Disable it **only** when releasing without automatically creating the next preprod candidate.
  - If needed, **Cut preprod** can also be run manually, optionally specifying a commit SHA
  instead of using the latest `main`.
- Running **Cut preprod** deletes existing `preprod/*` candidate branches before
  creating a replacement.

## Workflow definitions

- [Pipeline](../.github/workflows/pipeline.yml) - tests, builds and automatic
  deployments to dev or preprod.
- [Release](../.github/workflows/release.yml) - promotes the preprod candidate image
  to production and optionally starts the next candidate cycle.
- [Cut preprod](../.github/workflows/cut_preprod.yml) - creates the next candidate
  branch and starts its pipeline.

For operational commands, see [Kubernetes commands](kubernetes-commands.md).