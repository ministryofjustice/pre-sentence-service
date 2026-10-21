# Kubernetes Commands

Useful `kubectl` commands for managing secrets, environment variables, and inspecting deployment pods.

## Key Concepts: Secrets vs. Environment Variables

* **App Context**: The Node.js application only reads environment variables (`process.env`). It does not know about Kubernetes Secrets directly.
* **Kubernetes Injection**: Kubernetes reads values from the Secret store and injects them as environment variables into the application container at startup.
* **Secrets (`kubectl patch secret`)**: Permanent cluster change. Updates the underlying secret object saved in the cluster.
* **Direct Env Override (`kubectl set env`)**: Temporary override. Resets automatically on the next CI/CD deployment (`helm upgrade`).

---

## 1. Updating Secrets (Permanent Change)

Update a secret value directly in the cluster namespace (e.g., updating the session timeout duration):

```bash
kubectl patch secret pre-sentence-service -n court-probation-preprod \
  --type=merge \
  -p '{"stringData":{"WEB_SESSION_TIMEOUT_IN_MINUTES":"3"}}'
```

> **Note:** After updating the secret, restart or re-deploy the pods for the change to take effect.

---

## 2. Updating Deployment Environment Variables (Temporary Override)

Set an environment variable directly on a deployment (triggers an immediate rolling restart):

```bash
kubectl set env deployment/pre-sentence-service -n court-probation-dev WEB_SESSION_TIMEOUT_IN_MINUTES=3
```

> **Note:** This override is temporary and will be overwritten whenever a new deployment pipeline runs via Helm.

---

## 3. Checking Rollout Status

Watch the rolling update progress until the new pod is ready and running:

```bash
kubectl rollout status deployment/pre-sentence-service -n court-probation-dev
```

---

## 4. Inspecting Active Environment Variables

Inspect the live environment variables on a running deployment pod without having to decode secrets manually.

To inspect all environment variables:

```bash
kubectl exec deploy/pre-sentence-service -n court-probation-preprod -- env
```

To filter for a specific variable (for example, web session settings):

```bash
kubectl exec deploy/pre-sentence-service -n court-probation-preprod -- env | grep WEB_SESSION
```