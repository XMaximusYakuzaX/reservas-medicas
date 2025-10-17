# 🔐 Threat Model / Modelo de Amenazas

**Autor / Author:** Mauro Morales Alta  
**Fecha / Date:** 17 de octubre de 2025

---

## 🇪🇸 Versión en Español

### 1. Descripción General

Este documento identifica las principales amenazas, riesgos y medidas de mitigación para las capas móvil y API del sistema **Reservas Médicas**.

### 2. Actores y Activos

| Actor              | Descripción                                                   |
| ------------------ | ------------------------------------------------------------- |
| Paciente           | Usuario final que gestiona citas y datos médicos.             |
| Doctor             | Profesional que accede a información y horarios de pacientes. |
| Administrador      | Supervisa cuentas, configuraciones y registros de auditoría.  |
| Atacante Externo   | Intenta explotar vulnerabilidades en la API o la app.         |
| Servicios Externos | APIs de clima, notificaciones, etc.                           |

| Activo               | Importancia | Descripción                                   |
| -------------------- | ----------- | --------------------------------------------- |
| Datos personales     | Alta        | Información médica y de contacto confidencial |
| Tokens               | Alta        | Autenticación y sesiones seguras              |
| Base de datos        | Alta        | Repositorio principal de información sensible |
| Almacenamiento móvil | Media       | Caché y datos offline                         |
| Registros (logs)     | Media       | Pueden contener trazas sensibles              |

### 3. Matriz STRIDE

| Amenaza                    | Descripción                                 | Control                                          |
| -------------------------- | ------------------------------------------- | ------------------------------------------------ |
| Suplantación               | Impersonación por autenticación débil       | MFA, rotación de tokens, sesiones seguras        |
| Manipulación               | Alteración de datos en tránsito             | TLS 1.3, HMAC, verificaciones de integridad      |
| Repudio                    | Falta de trazabilidad                       | Registros de auditoría, firma de solicitudes     |
| Divulgación de Información | Exposición de datos mediante APIs inseguras | Validación de entradas, cifrado a nivel de campo |
| DoS                        | Sobrecarga de endpoints                     | Limitación de tasa, monitoreo                    |
| Escalada de Privilegios    | Acceso no autorizado                        | RBAC, privilegios mínimos                        |

### 4. Evaluación DREAD

| Amenaza                    | Daño | Reproducibilidad | Explotabilidad | Usuarios Afectados | Descubribilidad | Puntuación |
| -------------------------- | ---- | ---------------- | -------------- | ------------------ | --------------- | ---------- |
| Suplantación               | 8    | 6                | 6              | 8                  | 5               | 6.6        |
| Manipulación de Datos      | 7    | 5                | 6              | 7                  | 5               | 6.0        |
| Divulgación de Información | 9    | 4                | 5              | 9                  | 4               | 6.2        |
| DoS                        | 6    | 5                | 7              | 6                  | 4               | 5.6        |
| Escalada de Privilegios    | 8    | 6                | 5              | 7                  | 5               | 6.2        |

### 5. Controles Implementados

- TLS 1.3 con certificate pinning
- Autenticación MFA y adaptativa
- RBAC con registros de auditoría
- Cifrado AES-256 para almacenamiento
- Gestión segura de claves (KMS)
- Limitación de tasa y firewall de API (WAF)
- Escaneo SAST/DAST en CI/CD

### 6. Referencias

- Modelo STRIDE / DREAD – Microsoft
- OWASP Top 10 (2023)
- NIST SP 800-207 – Zero Trust Architecture

---

## 🇬🇧 English Version

### 1. Overview

This document identifies key threats, risks, and mitigations for the mobile and API layers of the **Reservas Médicas** system.

### 2. Actors and Assets

| Actor             | Description                                         |
| ----------------- | --------------------------------------------------- |
| Patient           | End-user managing appointments and medical data.    |
| Doctor            | Professional accessing patient info and schedules.  |
| Admin             | Oversees accounts, configurations, and audit logs.  |
| External Attacker | Attempts to exploit vulnerabilities in the API/app. |
| External Services | APIs for weather, notifications, etc.               |

| Asset          | Importance | Description                          |
| -------------- | ---------- | ------------------------------------ |
| Personal data  | High       | Confidential health and contact data |
| Tokens         | High       | Authentication and session tokens    |
| Database       | High       | Main repository for sensitive data   |
| Mobile storage | Medium     | Cache and offline data               |
| Logs           | Medium     | May contain sensitive traces         |

### 3. STRIDE Matrix

| Threat                 | Description                                    | Control                                  |
| ---------------------- | ---------------------------------------------- | ---------------------------------------- |
| Spoofing               | Identity impersonation via weak authentication | MFA, token rotation, secure sessions     |
| Tampering              | Modification of data in transit                | TLS 1.3, HMAC, integrity checks          |
| Repudiation            | Lack of accountability                         | Audit logs, request signing              |
| Information Disclosure | Data exposure via insecure APIs                | Input validation, field-level encryption |
| DoS                    | Overload of endpoints                          | Rate limiting, monitoring                |
| Elevation of Privilege | Unauthorized access escalation                 | RBAC, least privilege                    |

### 4. DREAD Evaluation

| Threat               | Damage | Reproducibility | Exploitability | Affected Users | Discoverability | Score |
| -------------------- | ------ | --------------- | -------------- | -------------- | --------------- | ----- |
| Spoofing             | 8      | 6               | 6              | 8              | 5               | 6.6   |
| Data Tampering       | 7      | 5               | 6              | 7              | 5               | 6.0   |
| Info Disclosure      | 9      | 4               | 5              | 9              | 4               | 6.2   |
| DoS                  | 6      | 5               | 7              | 6              | 4               | 5.6   |
| Privilege Escalation | 8      | 6               | 5              | 7              | 5               | 6.2   |

### 5. Controls Mapping

- TLS 1.3 + certificate pinning
- MFA and adaptive authentication
- RBAC and audit logging
- AES-256 encrypted storage
- Secure key management (KMS)
- Rate limiting and API WAF
- CI/CD security scanning (SAST/DAST)
