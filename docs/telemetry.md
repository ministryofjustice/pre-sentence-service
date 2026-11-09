# Telemetry and logging

The application uses
[@ministryofjustice/hmpps-azure-telemetry](https://www.npmjs.com/package/@ministryofjustice/hmpps-azure-telemetry)
to export OpenTelemetry traces and Bunyan logs to Azure Application Insights.

## Initialisation

Telemetry is configured in
[azureAppInsights.ts](../server/utils/azureAppInsights.ts).

[server.ts](../server.ts) imports this module before other application modules so
HTTP, Express and Bunyan instrumentation is registered before those modules load.

Telemetry identifies the application using:

- **Service name:** the name from `package.json`, currently `pre-sentence-service`.
- **Service version:** the build number exposed by
  [applicationVersion.ts](../server/applicationVersion.ts), falling back to the
  package version when no build information file is found.

Request spans use route-based operation names to group requests to the same endpoint.

## Configuration

| Environment variable                    | Purpose                                                                                                  |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `APPLICATIONINSIGHTS_CONNECTION_STRING` | Enables export to the specified Application Insights resource.                                           |
| `DEBUG_TELEMETRY`                       | Set to `true` to output telemetry to the console. Works without a connection string for local debugging. |

With both settings enabled, telemetry is sent to Azure and printed locally.
With neither configured, telemetry is not initialised.

### Deployed environments

[Helm values](../helm_deploy/pre-sentence-service/values.yaml) maps
`APPLICATIONINSIGHTS_CONNECTION_STRING` from the `pre-sentence-service`
Kubernetes secret.

The secret must contain the connection string for the correct environment before
deployment. Do not commit the value to the repository.

Use the complete connection string from the Application Insights resource, not
just its instrumentation key.

## Local debugging

With the supporting services running, enable console telemetry:

```sh
DEBUG_TELEMETRY=true AWS_ENDPOINT=http://localhost:4566 npm run start:dev
```

Leave `APPLICATIONINSIGHTS_CONNECTION_STRING` unset for console-only debugging.

To verify Azure export without deploying:

1. Configure the connection string for a non-production Application Insights
   resource in your local, git-ignored `.env`.
2. Restart the application.
3. Generate an application request:

   ```sh
   curl -i http://localhost:3000/health
   ```

4. Allow a few minutes for batching and ingestion, then check Azure Logs.

## Filtering

The following request paths are excluded from span export:

| Path        | Reason                                                       |
| ----------- | ------------------------------------------------------------ |
| `/ping`     | Frequent Kubernetes liveness and readiness probes.           |
| `/assets/*` | Static resources such as JavaScript, stylesheets and images. |

Matching request spans are excluded whether the request succeeded or failed.
These are span filters, not blanket log filters.

`/health` is retained because it performs dependency checks and can return an
unhealthy response. Outgoing HTTP dependency spans are also retained.

## Structured logging

Use the shared Bunyan [logger](../logger.ts).

Shared classifications are defined in
[logging.ts](../server/utils/logging.ts):

| Constant group       | Purpose                                                            |
| -------------------- | ------------------------------------------------------------------ |
| `LogEvent`           | Request failures, access denials, dependency failures and retries. |
| `LogDependency`      | The dependency involved.                                           |
| `LogOperation`       | The operation, such as connecting or publishing.                   |
| `AccessDeniedReason` | The reason for an explicit access denial.                          |
| `LogHttpMethod`      | HTTP methods used in dependency logs.                              |

These are application conventions, not Azure-defined event types.

### Bunyan argument order

Pass structured fields before the message:

```ts
logger.error(
  {
    err: error,
    event: LogEvent.DependencyFailed,
    dependency: LogDependency.Redis,
    operation: LogOperation.Connect,
  },
  'Error connecting to Redis'
)
```

A message-only call is also valid:

```ts
logger.info('Application started')
```

Passing an object after the message treats it as a formatting argument rather
than structured fields.

### Conventions

- Use shared constants where applicable, not every log needs an event classification.
- Include operations and reasons only when they are known.
- `DependencyFailed` means an observed failure, not necessarily a permanent outage.
- Use `DependencyRetry` only when another attempt is actually being scheduled.
- Keep classification values stable because monitoring queries may depend on them.
- Use actual runtime values for fields such as HTTP status codes.
- Keep human-readable messages alongside the logging call.

### Sensitive data

Do not log credentials, tokens, session contents, report text or unnecessary
personal information. Case identifiers can also be sensitive and should only be
included where justified by the service's logging policy.

Use `err` for error objects when appropriate, but do not assume arbitrary error
objects are safe. HTTP errors can contain request or response details.

## Finding telemetry in Azure

Open **Logs** on the Application Insights resource targeted by the connection
string. Set the time range to include your test, for example **Last 1 hour**.

The following queries use the Application Insights schema. Queries run directly
against a Log Analytics workspace use different names, such as `AppTraces`,
`AppRequests` and `AppDependencies`.

### Application requests

```kusto
requests
| where timestamp > ago(1h)
| where cloud_RoleName == "pre-sentence-service"
| project timestamp, cloud_RoleName, name, url, resultCode, duration, operation_Id
| order by timestamp desc
```

For the local health check, add:

```kusto
| where url contains "localhost:3000/health"
```

Place this filter before `project`. Use the actual host and port if different.

### Application logs

```kusto
traces
| where timestamp > ago(1h)
| where cloud_RoleName == "pre-sentence-service"
| project timestamp, cloud_RoleName, message, severityLevel, customDimensions, operation_Id
| order by timestamp desc
```

Inspect `customDimensions` to establish how the exporter represents structured
fields before building queries or alerts around them.

Calling `/health` generates request telemetry but does not necessarily produce a
Bunyan log. Existing startup messages provide a separate check of log export.

### Failed HTTP dependencies

```kusto
dependencies
| where timestamp > ago(1h)
| where cloud_RoleName == "pre-sentence-service"
| where success == false
| project timestamp, name, target, resultCode, duration, operation_Id
| order by timestamp desc
```

### Slow or failed requests

```kusto
requests
| where timestamp > ago(1h)
| where cloud_RoleName == "pre-sentence-service"
| where success == false or duration > 2000
| project timestamp, name, resultCode, duration, operation_Id
| order by timestamp desc
```

The two-second duration filter is an example for investigation, not an agreed
service performance threshold.

Use `operation_Id` to correlate records from the same trace where available.

## Shutdown

On `SIGTERM` or `SIGINT`, the application stops accepting HTTP requests, waits for
active requests to finish, then calls `flushTelemetry()` before exiting.

There is no application-level shutdown timeout. In Kubernetes, the pod's
termination grace period remains the upper limit before forced termination.
