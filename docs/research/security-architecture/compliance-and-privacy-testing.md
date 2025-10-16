# Compliance and Privacy Testing

**Author:** Karen Itzel Jiménez Pacheco  
**Date:** 16/10/2025

---

## 1. Objective

This document outlines the compliance testing performed to ensure that the application adheres to GDPR, HIPAA, and PCI DSS requirements. The tests focus on verifying explicit consent mechanisms, data portability, and the right to erasure, as well as general privacy principles.

---

## 2. Testing Scenarios

### 2.1 Explicit Consent

- **Objective:** Verify that users provide clear and active consent before their data is collected.
- **Method:** Simulate user registration and check that consent checkboxes or pop-ups are required and cannot be bypassed.
- **Expected Outcome:** All user interactions with personal data require explicit confirmation.

### 2.2 Data Portability

- **Objective:** Confirm that users can export their personal data in a structured, machine-readable format.
- **Method:** Perform an export action (JSON/CSV) and validate completeness and accuracy of exported data.
- **Expected Outcome:** Data exported correctly and securely.

### 2.3 Right to Erasure

- **Objective:** Ensure users can request deletion of their personal data.
- **Method:** Submit deletion requests and verify that all user data is removed from active storage.
- **Expected Outcome:** Data is deleted and logs of requests are maintained for auditing.

---

## 3. Compliance Verification

- All tests executed against GDPR, HIPAA, and PCI DSS guidelines.
- Manual checks and simulated user interactions confirmed proper implementation.
- Privacy principles such as minimization, purpose limitation, and user transparency were verified.

---

## 4. Summary

This testing phase validates that the application respects user privacy, adheres to relevant compliance regulations, and implements the necessary mechanisms to guarantee data protection.

---

## 5. References

- [GDPR Text](https://gdpr-info.eu/)
- [CCPA/CPRA Summary](https://oag.ca.gov/privacy/ccpa)
- [HIPAA Overview](https://www.hhs.gov/hipaa/for-professionals/index.html)
- [PCI DSS Guidelines](https://www.pcisecuritystandards.org/)

---

# Pruebas de Cumplimiento y Privacidad

**Autora:** Karen Itzel Jiménez Pacheco  
**Fecha:** 16/10/2025

---

## 1. Objetivo

Este documento describe las pruebas de cumplimiento realizadas para asegurar que la aplicación cumpla con los requisitos de GDPR, HIPAA y PCI DSS. Las pruebas se enfocan en verificar mecanismos de consentimiento explícito, portabilidad de datos, derecho al olvido y principios generales de privacidad.

---

## 2. Escenarios de Prueba

### 2.1 Consentimiento Explícito

- **Objetivo:** Verificar que los usuarios proporcionen consentimiento claro y activo antes de recolectar sus datos.
- **Método:** Simular el registro de usuarios y comprobar que las casillas de verificación o ventanas emergentes de consentimiento sean obligatorias y no puedan ser omitidas.
- **Resultado Esperado:** Todas las interacciones con datos personales requieren confirmación explícita.

### 2.2 Portabilidad de Datos

- **Objetivo:** Confirmar que los usuarios puedan exportar sus datos personales en un formato estructurado y legible por máquina.
- **Método:** Realizar una acción de exportación (JSON/CSV) y validar que los datos exportados sean completos y correctos.
- **Resultado Esperado:** Los datos se exportan correctamente y de manera segura.

### 2.3 Derecho al Olvido

- **Objetivo:** Asegurar que los usuarios puedan solicitar la eliminación de sus datos personales.
- **Método:** Enviar solicitudes de eliminación y verificar que toda la información del usuario sea removida del almacenamiento activo.
- **Resultado Esperado:** Los datos son eliminados y se mantienen registros de las solicitudes para auditoría.

---

## 3. Verificación de Cumplimiento

- Todas las pruebas se realizaron siguiendo las directrices de GDPR, HIPAA y PCI DSS.
- Se realizaron chequeos manuales y simulaciones de interacción de usuarios para confirmar la correcta implementación.
- Se verificaron principios de privacidad como minimización, limitación de propósito y transparencia hacia el usuario.

---

## 4. Resumen

Esta fase de pruebas valida que la aplicación respeta la privacidad del usuario, cumple con las normativas relevantes y implementa los mecanismos necesarios para garantizar la protección de datos.

---

## 5. Referencias

- [Texto GDPR](https://gdpr-info.eu/)
- [Resumen CCPA/CPRA](https://oag.ca.gov/privacy/ccpa)
- [Resumen HIPAA](https://www.hhs.gov/hipaa/for-professionals/index.html)
- [Guía PCI DSS](https://www.pcisecuritystandards.org/)
