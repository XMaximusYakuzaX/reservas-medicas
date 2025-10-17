# Threats and Risks Description

**Responsible:** Diego Sánchez Martínez

The **DevOps** architecture of the **Medical Reservations** project presents several risk scenarios that must be managed throughout the continuous development and deployment lifecycle.

---

## 1. Insecure Storage of Sensitive Data

**Description:** Risk of exposure of tokens, passwords, or medical information in plain text.

**Impact:** Loss of confidentiality due to physical or remote device access.

**Mitigation Measures:**

- **AES-256 encryption**
- Use of **SecureStore (Expo)**
- Removal of unprotected local data

---

## 2. Insecure Authentication (OWASP M4)

**Description:** Vulnerability in login or session management mechanisms.

**Impact:** Identity spoofing or unauthorized access.

**Mitigation Measures:**

- Implementation of **Multi-Factor Authentication (MFA)**
- Use of **temporary tokens**
- Account lockout policies after multiple failed attempts

---

## 3. Data Interception in Transit

**Description:** _Man-in-the-middle_ attacks or eavesdropping during data transmission.

**Impact:** Leakage of medical data or credentials.

**Mitigation Measures:**

- Use of secure protocols **TLS/HTTPS**
- Valid certificates
- Server validation

---

## 4. Poor Key or Secret Management

**Description:** Exposure of sensitive variables (_API Keys_, _JWT Secrets_) in the repository or runtime environment.

**Impact:** Compromise of external services and loss of integrity.

**Mitigation Measures:**

- Use of secure environments (**non-versioned .env files**)
- Encryption through **KMS**
- Periodic key rotation

---

## 5. Misconfigurations in the Cloud (Supabase)

**Description:** Improper assignment of permissions or **RLS** policies.

**Impact:** Unauthorized access to medical records.

**Mitigation Measures:**

- Application of the **Principle of Least Privilege (PoLP)**
- Continuous audits

---

## 6. Denial-of-Service (DoS) Attacks

**Description:** Overload of requests on APIs or backend services.

**Impact:** Temporary system unavailability.

**Mitigation Measures:**

- Implementation of **rate limiting**
- Continuous **monitoring**
- **Auto-scaling** system configuration

---

# Descripción de Amenazas y Riesgos

**Responsable:** Diego Sánchez Martínez

La arquitectura **DevOps** del proyecto **Reservas Médicas** presenta diversos escenarios de riesgo que deben gestionarse durante el ciclo de vida de desarrollo y despliegue continuo.

---

## 1. Almacenamiento inseguro de datos sensibles

**Descripción:** Riesgo de exposición de tokens, contraseñas o información médica en texto plano.

**Impacto:** Pérdida de confidencialidad ante acceso físico o remoto al dispositivo.

**Medida de mitigación:**

- Cifrado **AES-256**
- Uso de **SecureStore (Expo)**
- Eliminación de datos locales no protegidos

---

## 2. Autenticación insegura (OWASP M4)

**Descripción:** Vulnerabilidad en los mecanismos de login o gestión de sesiones.

**Impacto:** Suplantación de identidad o acceso no autorizado.

**Medida de mitigación:**

- Implementación de **autenticación multifactor (MFA)**
- Uso de **tokens temporales**
- Políticas de bloqueo ante múltiples intentos fallidos

---

## 3. Intercepción de datos en tránsito

**Descripción:** Ataques de tipo _man-in-the-middle_ o escuchas clandestinas durante la transmisión de información.

**Impacto:** Filtración de datos médicos o credenciales.

**Medida de mitigación:**

- Uso de protocolos seguros **TLS/HTTPS**
- Certificados válidos
- Validación del servidor

---

## 4. Gestión deficiente de claves o secretos

**Descripción:** Exposición de variables sensibles (_API Keys_, _JWT Secrets_) en el repositorio o entorno de ejecución.

**Impacto:** Compromiso de servicios externos y pérdida de integridad.

**Medida de mitigación:**

- Uso de entornos seguros (**.env** no versionados)
- Cifrado mediante **KMS**
- Rotación periódica de claves

---

## 5. Configuraciones erróneas en la nube (Supabase)

**Descripción:** Asignación inadecuada de permisos o políticas **RLS**.

**Impacto:** Acceso no autorizado a registros médicos.

**Medida de mitigación:**

- Aplicación del principio de **mínimo privilegio (PoLP)**
- Auditorías continuas

---

## 6. Ataques de denegación de servicio (DoS)

**Descripción:** Sobrecarga de peticiones en APIs o servicios del backend.

**Impacto:** Indisponibilidad temporal del sistema.

**Medida de mitigación:**

- Implementación de **rate limiting**
- **Monitoreo** constante
- **Autoescalado** del sistema

---
