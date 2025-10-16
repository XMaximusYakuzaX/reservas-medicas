# Compliance and Privacy Testing

**Author:** Karen Itzel Jiménez Pacheco  
**Date:** 16/10/2025

---

## 1. Objective

The objective of this issue is to perform compliance tests to verify adherence to GDPR, HIPAA, PCI, and other relevant regulations. These tests ensure that privacy principles and data protection measures are respected in all operations.

---

## 2. GDPR Compliance Tests

| Test             | Description                                                        | Result  | Observations                           |
| ---------------- | ------------------------------------------------------------------ | ------- | -------------------------------------- |
| Explicit Consent | Verify that users actively provide consent before data collection  | Pending | Ensure consent is clear and recorded   |
| Right to Erasure | Verify that users can request deletion of their personal data      | Pending | Procedure must be available and logged |
| Data Portability | Verify that users can export their data in machine-readable format | Pending | Export formats: CSV, JSON              |
| Minimization     | Check that only necessary data is collected                        | Pending | Review all forms and fields            |

---

## 3. HIPAA Compliance Tests (for health-related data)

| Test            | Description                                               | Result  | Observations                      |
| --------------- | --------------------------------------------------------- | ------- | --------------------------------- |
| Data Encryption | Check that sensitive health data is encrypted             | Pending | Encryption at rest and in transit |
| Access Control  | Verify that only authorized personnel access patient data | Pending | Audit user roles and permissions  |
| Audit Logs      | Confirm proper logging of access and modifications        | Pending | Ensure logs are retained securely |

---

## 4. PCI DSS Compliance Tests (for financial data)

| Test                 | Description                                               | Result  | Observations           |
| -------------------- | --------------------------------------------------------- | ------- | ---------------------- |
| Card Data Encryption | Verify that payment card data is encrypted                | Pending | AES-256 recommended    |
| Access Restrictions  | Ensure only necessary personnel can access financial data | Pending | Review access policies |
| Transaction Logs     | Confirm that all transactions are logged and monitored    | Pending | Logs must be auditable |

---

## 5. Summary

This set of tests ensures that personal and sensitive data are handled in compliance with applicable regulations. Implementing and documenting these tests helps maintain privacy, legal compliance, and user trust.

---

## 6. References

- [GDPR Text](https://gdpr-info.eu/)
- [HIPAA Overview](https://www.hhs.gov/hipaa/for-professionals/index.html)
- [PCI DSS Guide](https://www.pcisecuritystandards.org/)

---

# Pruebas de Cumplimiento y Privacidad

**Autora:** Karen Itzel Jiménez Pacheco  
**Fecha:** 16/10/2025

---

## 1. Objetivo

El objetivo de este issue es realizar pruebas de cumplimiento para verificar la adherencia al RGPD, HIPAA, PCI y otras normativas pertinentes. Estas pruebas aseguran que se respeten los principios de privacidad y las medidas de protección de datos en todas las operaciones.

---

## 2. Pruebas de Cumplimiento RGPD

| Prueba                   | Descripción                                                                         | Resultado | Observaciones                                               |
| ------------------------ | ----------------------------------------------------------------------------------- | --------- | ----------------------------------------------------------- |
| Consentimiento Explícito | Verificar que los usuarios den consentimiento activo antes de recolectar datos      | Pendiente | Asegurarse de que el consentimiento sea claro y registrado  |
| Derecho al Olvido        | Verificar que los usuarios puedan solicitar la eliminación de sus datos             | Pendiente | Debe existir un procedimiento y registro de las solicitudes |
| Portabilidad de Datos    | Verificar que los usuarios puedan exportar sus datos en formato legible por máquina | Pendiente | Formatos de exportación: CSV, JSON                          |
| Minimización             | Comprobar que solo se recolecten datos necesarios                                   | Pendiente | Revisar todos los formularios y campos                      |

---

## 3. Pruebas HIPAA (para datos de salud)

| Prueba                 | Descripción                                                        | Resultado | Observaciones                                           |
| ---------------------- | ------------------------------------------------------------------ | --------- | ------------------------------------------------------- |
| Encriptación de Datos  | Verificar que los datos sensibles estén encriptados                | Pendiente | Encriptación en reposo y en tránsito                    |
| Control de Acceso      | Verificar que solo personal autorizado acceda a datos de pacientes | Pendiente | Revisar roles y permisos de usuarios                    |
| Registros de Auditoría | Confirmar que se registren accesos y modificaciones correctamente  | Pendiente | Asegurar que los registros se almacenen de forma segura |

---

## 4. Pruebas PCI DSS (para datos financieros)

| Prueba                           | Descripción                                                      | Resultado | Observaciones                      |
| -------------------------------- | ---------------------------------------------------------------- | --------- | ---------------------------------- |
| Encriptación de Datos de Tarjeta | Verificar que los datos de tarjeta estén encriptados             | Pendiente | Recomendado AES-256                |
| Restricciones de Acceso          | Asegurar que solo personal necesario acceda a datos financieros  | Pendiente | Revisar políticas de acceso        |
| Registros de Transacciones       | Confirmar que todas las transacciones se registren y monitoricen | Pendiente | Los registros deben ser auditables |

---

## 5. Resumen

Este conjunto de pruebas garantiza que los datos personales y sensibles se manejen conforme a las normativas aplicables. Implementar y documentar estas pruebas ayuda a mantener la privacidad, el cumplimiento legal y la confianza del usuario.

---

## 6. Referencias

- [Texto RGPD](https://gdpr-info.eu/)
- [Resumen HIPAA](https://www.hhs.gov/hipaa/for-professionals/index.html)
- [Guía PCI DSS](https://www.pcisecuritystandards.org/)
