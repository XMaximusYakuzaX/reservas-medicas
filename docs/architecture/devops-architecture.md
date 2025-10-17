# 🧩 DevOps Architecture, Design, and Results / Arquitectura, Diseño y Resultados DevOps

**Autor / Author:** Mauro Morales Alta  
**Fecha / Date:** 17 de octubre de 2025

---

## 1. Overview / Visión General

**English:**  
This document summarizes the DevSecOps architecture, design decisions, compliance integration, and testing outcomes.

**Español:**  
Este documento resume la arquitectura DevSecOps, las decisiones de diseño, la integración de cumplimiento normativo y los resultados de las pruebas.

---

## 2. Security Design / Diseño de Seguridad

### 🔐 Authentication & Sessions / Autenticación y Sesiones

- Endpoint `/auth/login` validado por OWASP ZAP (sin vulnerabilidades).
- Tokens JWT con expiración corta y rotación de actualización.
- MFA planificado para roles privilegiados.

### 🔒 Encryption / Cifrado

- TLS 1.3 aplicado; el pinning para móviles está pendiente.
- AES-256 utilizado para datos sensibles en reposo.
- Sin secretos codificados (gestionados en `.env` y KMS).

### 🧾 Authorization & RBAC / Autorización y Control de Accesos

| Rol / Role            | Permisos / Permissions                                                |
| --------------------- | --------------------------------------------------------------------- |
| Paciente / Patient    | CRUD en sus propias citas / CRUD on own appointments                  |
| Doctor / Doctor       | Acceso a pacientes asignados / Access assigned patients               |
| Administrador / Admin | Configuración del sistema y registros / System configuration and logs |

### 🧱 Secure Headers / Encabezados Seguros

- `Cache-Control: no-store` (detectado por ZAP, comportamiento correcto).
- HSTS y CSP configurados para entornos de producción.

---

## 3. Compliance Integration / Integración de Cumplimiento

**English:**

- GDPR and CCPA controls documented (see `privacy-compliance.md`).
- Consent and erasure flows defined.
- Audit logs capture data access, exports, and deletions.

**Español:**

- Controles de GDPR y CCPA documentados (ver `privacy-compliance.md`).
- Flujos de consentimiento y eliminación definidos.
- Los registros de auditoría capturan accesos, exportaciones y eliminaciones de datos.

---

## 4. DevSecOps Pipeline (CI/CD)

| Etapa / Stage | Herramienta / Tool                | Propósito / Purpose                                 |
| ------------- | --------------------------------- | --------------------------------------------------- |
| Lint/Test     | ESLint + Jest                     | Calidad del código / Code quality                   |
| SAST          | CodeQL                            | Análisis estático / Static analysis                 |
| DAST          | OWASP ZAP                         | Escaneo de vulnerabilidades / Vulnerability scan    |
| Perf          | k6                                | Pruebas de carga y estrés / Load and stress testing |
| Release       | GitHub Actions + Semantic Release | Versionado automático / Automated versioning        |

### ⚙️ Workflow / Flujo de Trabajo

1. **Push → Lint/Test → Security Scans**
2. **Pull Request → Prueba de carga con k6 → Revisión**
3. **Merge a main → Liberación automática mediante semantic versioning**

---

## 5. Observability / Observabilidad

- **Logs:** Winston + registros de Supabase.
- **Métricas:** Latencia de peticiones, tasa de errores, disponibilidad.
- **Alertas:** Integración con Grafana o Sentry vía webhooks.

---

## 6. Test Results Summary / Resumen de Resultados de Pruebas

| Tipo de Prueba / Test Type | Herramienta / Tool | Resultado / Result                                                                   |
| -------------------------- | ------------------ | ------------------------------------------------------------------------------------ |
| Pentest                    | OWASP ZAP          | 0 Alta, 0 Media, 0 Baja (2 Informativas) / 0 High, 0 Medium, 0 Low (2 Informational) |
| Carga / Load               | k6                 | P95 < 300 ms, tasa de error < 1%                                                     |
| Estrés / Stress            | k6                 | Sistema estable hasta 100 VUs / Stable up to 100 VUs                                 |
| Cumplimiento / Compliance  | Manual             | 100% de controles implementados / 100% controls implemented                          |

---

## 7. Future Work / Trabajo Futuro

**English:**

- Integrate MFA fully.
- Implement mobile certificate pinning.
- Automate ZAP and k6 into CI workflow.
- Expand observability dashboards.

**Español:**

- Integrar completamente MFA.
- Implementar pinning de certificados móviles.
- Automatizar ZAP y k6 en el flujo CI.
- Ampliar los tableros de observabilidad.
