---
#Identify at least 3 vulnerabilities from OWASP Mobile Top 10 #4
**Proyecto:** Aplicación Móvil "Reservas Médicas"  
**Autor:** Karen Itzel Jiménez Pacheco  
**Fecha:** 04 de octubre de 2025  ---


##  Alcance / Scope

### Español  
El análisis se limita a la revisión de las vulnerabilidades más representativas del estándar **OWASP Mobile Top 10**, tomando en cuenta el comportamiento general de aplicaciones móviles que manejan información sensible, autenticación de usuarios y acceso a recursos del dispositivo.  

### English  
The analysis is limited to reviewing the most representative vulnerabilities of the **OWASP Mobile Top 10** standard, considering typical mobile applications that handle sensitive information, user authentication, and access to device resources.

---

## 🔍 OWASP Mobile Top 10 - Vulnerabilidades Identificadas / Identified Vulnerabilities

### 1. M1 - Improper Platform Usage  
**Descripción (ES):** Uso incorrecto de funciones nativas o APIs del sistema operativo, lo que podría permitir acceso no autorizado a recursos como cámara, GPS o almacenamiento.  
**Impacto:** Riesgo de exposición de información o acceso indebido a datos personales.  
**Recomendación:** Seguir las guías oficiales de Android/iOS, restringir permisos innecesarios y realizar pruebas de permisos antes de publicar la aplicación.  

**Description (EN):** Incorrect use of native system APIs or platform features that may allow unauthorized access to device resources such as the camera, GPS, or storage.  
**Impact:** Risk of data exposure or unauthorized access to user information.  
**Recommendation:** Follow Android/iOS official guidelines, restrict unnecessary permissions, and perform permission validation tests before deployment.  

---

### 2. M2 - Insecure Data Storage  
**Descripción (ES):** Almacenamiento inseguro de datos sensibles (tokens, contraseñas o información médica) en texto plano o sin cifrado adecuado.  
**Impacto:** Pérdida de confidencialidad en caso de acceso físico o remoto al dispositivo.  
**Recomendación:** Implementar cifrado fuerte (AES-256), usar almacenamiento seguro (Keychain, Keystore) y evitar almacenar datos sensibles localmente sin protección.  

**Description (EN):** Storing sensitive information (tokens, passwords, or medical data) in plain text or without proper encryption.  
**Impact:** Loss of confidentiality if the device is accessed physically or remotely.  
**Recommendation:** Implement strong encryption (AES-256), use secure storage (Keychain, Keystore), and avoid storing unprotected sensitive data locally.  

---

### 3. M4 - Insecure Authentication  
**Descripción (ES):** Mecanismos de autenticación débiles que permiten ataques de fuerza bruta o robo de sesiones.  
**Impacto:** Posible suplantación de identidad del usuario o acceso no autorizado a la aplicación.  
**Recomendación:** Implementar autenticación multifactor (MFA), usar tokens de sesión temporales y establecer políticas de contraseñas seguras.  

**Description (EN):** Weak authentication mechanisms that allow brute-force or session hijacking attacks.  
**Impact:** Possible user impersonation or unauthorized access to the application.  
**Recommendation:** Implement multi-factor authentication (MFA), use temporary session tokens, and enforce strong password policies.  

---

## Recommendations to mitigate them.

Las vulnerabilidades detectadas —uso incorrecto de la plataforma, almacenamiento inseguro y autenticación débil— son comunes en proyectos móviles, pero pueden ser mitigadas mediante **prácticas seguras de desarrollo, pruebas continuas y validación de seguridad antes del despliegue**.  

### English  
The analysis shows that mobile application security largely depends on the correct implementation of **OWASP Mobile Top 10** guidelines.  
The identified vulnerabilities —improper platform usage, insecure data storage, and weak authentication— are common in mobile projects but can be mitigated through **secure development practices, continuous testing, and security validation prior to deployment**.

---

## References

- OWASP Mobile Security Project: [https://owasp.org/www-project-mobile-top-10/](https://owasp.org/www-project-mobile-top-10/)  
- Google Developers Security Guidelines: [https://developer.android.com/topic/security](https://developer.android.com/topic/security)  
- Apple Security Documentation: [https://developer.apple.com/security/](https://developer.apple.com/security/)  
- NIST Cybersecurity Framework (CSF)  
- ISO/IEC 27034 – Application Security

---
