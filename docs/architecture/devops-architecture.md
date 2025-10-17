# DevOps Architecture, Design, and Results – Reservas Médicas

## 1. Overview

This document summarizes the DevSecOps architecture, design decisions, compliance integration, and testing outcomes.

## 2. Security Design

### Authentication & Sessions

- Endpoint `/auth/login` validated by OWASP ZAP (no vulnerabilities).
- JWT tokens with short expiration and refresh rotation.
- MFA planned for privileged roles.

### Encryption

- TLS 1.3 enforced; pinning for mobile pending.
- AES-256 used for sensitive data at rest.
- No hardcoded secrets (managed in `.env` and KMS).

### Authorization & RBAC

| Role    | Permissions                |
| ------- | -------------------------- |
| Patient | CRUD on own appointments   |
| Doctor  | Access assigned patients   |
| Admin   | System configuration, logs |

### Secure Headers

- `Cache-Control: no-store` (detected by ZAP, correct behavior).
- HSTS and CSP configured for production builds.

## 3. Compliance Integration

- GDPR and CCPA controls documented (see `privacy-compliance.md`).
- Consent and erasure flows defined.
- Audit logs capture data access, exports, and deletions.

## 4. DevSecOps Pipeline (CI/CD)

| Stage     | Tool                              | Purpose                 |
| --------- | --------------------------------- | ----------------------- |
| Lint/Test | ESLint + Jest                     | Code quality            |
| SAST      | CodeQL                            | Static analysis         |
| DAST      | OWASP ZAP                         | Vulnerability scan      |
| Perf      | k6                                | Load and stress testing |
| Release   | GitHub Actions + Semantic Release | Automated versioning    |

### Workflow

1. Push → Lint/Test → Security scans
2. Pull Request → k6 load test → Review
3. Merge to main → Auto release via semantic versioning

## 5. Observability

- Logs: Winston + Supabase logs.
- Metrics: Request latency, error rate, uptime.
- Alerts: via Grafana or Sentry webhook integration.

## 6. Test Results Summary

| Test Type  | Tool         | Result                                    |
| ---------- | ------------ | ----------------------------------------- |
| Pentest    | OWASP ZAP    | 0 High, 0 Medium, 0 Low (2 Informational) |
| Load       | k6           | P95 < 300 ms, error rate < 1%             |
| Stress     | k6           | System stable up to 100 VUs               |
| Compliance | Manual check | 100% controls implemented                 |

## 7. Future Work

- Integrate MFA fully.
- Implement mobile certificate pinning.
- Automate ZAP and k6 into CI workflow.
- Expand observability dashboards.
