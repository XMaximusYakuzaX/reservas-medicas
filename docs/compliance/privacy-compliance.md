# 🔒 Privacy & Compliance / Privacidad y Cumplimiento

**Autor / Author:** Mauro Morales Alta  
**Fecha / Date:** 17 de octubre de 2025

---

## 🇪🇸 Versión en Español

### 1. Marcos de cumplimiento considerados

- **GDPR (UE):** consentimiento, derecho de acceso, portabilidad y eliminación de datos.
- **CCPA/CPRA (California):** transparencia, opción de exclusión, y derecho a eliminación.
- **HIPAA (Salud):** confidencialidad de los registros médicos.

### 2. Principios aplicados

| Principio                        | Implementación                                                |
| -------------------------------- | ------------------------------------------------------------- |
| Licitud, equidad y transparencia | Pantalla de consentimiento durante el registro.               |
| Limitación de propósito          | Los datos solo se utilizan para agendar y contactar.          |
| Minimización de datos            | Solo se almacenan los campos esenciales.                      |
| Exactitud                        | Perfil de usuario editable.                                   |
| Limitación de almacenamiento     | Retención de 12 meses después de la solicitud de eliminación. |
| Integridad y confidencialidad    | AES-256 en reposo, TLS 1.3 en tránsito.                       |
| Responsabilidad                  | Consentimientos registrados con versión de política.          |

### 3. Derechos del usuario (DSR)

| Derecho                      | Mecanismo                                                      |
| ---------------------------- | -------------------------------------------------------------- |
| Acceso                       | Endpoint de exportación `/user/export`                         |
| Portabilidad                 | Descarga de datos en formato JSON/CSV                          |
| Eliminación                  | Endpoint `/user/delete` (borrado lógico + purga a los 30 días) |
| Restricción de procesamiento | Conmutador en configuración de privacidad                      |
| Retiro del consentimiento    | Gestión en ajustes > Privacidad                                |

### 4. Evidencia de almacenamiento

- Todos los eventos de consentimiento se registran con marca de tiempo y versión de política.
- Los endpoints de API están registrados en Supabase para las acciones de exportación y eliminación.

### 5. Lista de verificación de cumplimiento

- [x] Consentimiento almacenado en la base de datos
- [x] Derecho de acceso implementado
- [x] Derecho al olvido documentado
- [x] Política de privacidad publicada en la app y repositorio
- [x] Preparado para auditorías con registros con sello de tiempo

### 6. Referencias

- Artículos 5–17 del GDPR
- CCPA §1798.100
- HIPAA Security Rule

---

## 🇬🇧 English Version

### 1. Frameworks considered

- **GDPR (EU):** consent, right to access, portability, and erasure.
- **CCPA/CPRA (California):** transparency, opt-out option, and deletion rights.
- **HIPAA (Healthcare):** confidentiality of medical records.

### 2. Principles applied

| Principle                          | Implementation                              |
| ---------------------------------- | ------------------------------------------- |
| Lawfulness, fairness, transparency | Consent screen during registration.         |
| Purpose limitation                 | Data only used for scheduling and contact.  |
| Data minimization                  | Only essential fields stored.               |
| Accuracy                           | Editable user profile.                      |
| Storage limitation                 | Retention 12 months after deletion request. |
| Integrity & confidentiality        | AES-256 at rest, TLS 1.3 in transit.        |
| Accountability                     | Logged consent and policy version.          |

### 3. User Rights (DSR)

| Right               | Mechanism                                                                  |
| ------------------- | -------------------------------------------------------------------------- |
| Access              | Export endpoint `/user/export`                                             |
| Portability         | Download JSON/CSV of data                                                  |
| Erasure             | Delete account endpoint `/user/delete` (soft delete + purge after 30 days) |
| Restrict processing | Toggle in privacy settings                                                 |
| Withdraw consent    | Manage in settings > Privacy                                               |

### 4. Evidence storage

- All consent events logged with timestamp and policy version.
- API endpoints registered in Supabase for export/delete actions.

### 5. Compliance checklist

- [x] Consent stored in database
- [x] Right to access implemented
- [x] Right to be forgotten documented
- [x] Privacy policy published in app and repository
- [x] Audit-ready with timestamped logs
