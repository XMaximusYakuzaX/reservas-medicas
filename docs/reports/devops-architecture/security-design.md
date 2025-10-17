# Security Design (Encryption, Authentication, Session Management)

**Responsible:** Angel Gabriel Carreón Trujillo

The security design of the **Medical Reservations** system is based on the **Zero Trust** model and follows a holistic perspective, requiring that every request, user, or service be validated, authorized, and authenticated without assuming trust.  
Its goal is to safeguard sensitive medical data, user credentials, and essential operations through a combination of **multi-factor authentication (MFA)**, **encryption**, and **secure session management**.

---

## Encryption

### Data in Transit

Data integrity and confidentiality are ensured by transmitting all traffic between the client, server, and external services (APIs) using the **HTTPS (TLS 1.3)** protocol.  
To prevent insecure connections, **HSTS (HTTP Strict Transport Security)** is enforced.  
Communications with the **OpenWeather API** and **Firebase** are also secured through valid digital certificates.

### Data at Rest

Using **expo-secure-store**, tokens and session credentials are stored locally, encrypted with **AES-256**, and bound to the authenticated user.  
In the backend, persistent data (SQLite or Firebase Firestore) is encrypted using the provider’s native tools and restricted according to **Role-Based Access Control (RBAC)**.  
API keys and private keys are not included in the source code; they are managed via **environment variables (.env)** and **GitHub Secrets**.

---

## Key Management

- API keys and service tokens are rotated every **quarter**.
- **Manual review** of access logs and **automatic alerts** in case of misuse.
- All keys are stored **outside version control** with limited permissions.

---

## Authentication

### Implemented Model

**Firebase Authentication** is used with **Multi-Factor Authentication (MFA)** via SMS or email (OTP).  
Additional verification is required for each login attempt from **unknown devices or locations**, using **adaptive authentication** based on risk level.  
Identity validation is reinforced through **Firebase-signed tokens**, which are verified in the backend via the **Firebase Admin SDK**.

### Main Features

- Support for authentication via **password**, **OTP**, and **external providers** (Google, GitHub, Apple).
- **Automatic token validation** on each request (Zero Trust).
- **Account lockout** after multiple failed login attempts.
- **Remote session revocation** for compromised accounts.

---

## Advantages

- Simple and secure operation **without maintaining a custom authentication server**.
- Compliance with **OpenID Connect** and **OAuth 2.0** standards.
- Direct integration with **Expo/React Native** through **expo-firebase-recaptcha**.

---

# Diseño de seguridad (Cifrado, Autenticación, Gestión de Sesiones)

**Responsable:** Angel Gabriel Carreón Trujillo

El diseño de seguridad del sistema **Reservas Médicas** se basa en el modelo **Zero Trust** y tiene una perspectiva holística, que exige que cada solicitud, usuario o servicio sea validado, autorizado y autenticado sin suponer confianza.  
Su objetivo es resguardar los datos médicos sensibles, las credenciales de los usuarios y las operaciones esenciales mediante una combinación de **autenticación multifactor (MFA)**, **cifrado** y **gestión segura de sesiones**.

---

## Cifrado

### Datos en Tránsito

Se garantiza la integridad y confidencialidad de los datos transmitiendo todo el tráfico entre cliente, servidor y servicios externos (APIs) mediante el protocolo **HTTPS (TLS 1.3)**.  
Para prevenir conexiones inseguras, se utiliza **HSTS (HTTP Strict Transport Security)**.  
Las comunicaciones con la **API de OpenWeather** y **Firebase** también están aseguradas mediante certificados digitales válidos.

### Datos en Reposo

Con **expo-secure-store**, se almacenan localmente los tokens y las credenciales de sesión, encriptados con **AES-256** y vinculados al usuario autenticado.  
En el backend, los datos permanentes (**SQLite o Firebase Firestore**) se encriptan utilizando las herramientas nativas del proveedor y se limitan según el **rol de acceso (RBAC)**.  
Las claves API y las claves privadas no están incluidas en el código fuente; se gestionan utilizando **variables de entorno (.env)** y **secretos de GitHub**.

---

## Gestión de Claves

- Cambio de **claves API y tokens de servicio** cada trimestre.
- **Examen manual** de accesos y **alertas automáticas** ante uso inapropiado.
- Todas las claves se guardan **fuera del control de versiones** con permisos limitados.

---

## Autenticación

### Modelo Implementado

Se utiliza **Firebase Authentication** con la capacidad de **autenticación multifactor (MFA)** mediante SMS o correo electrónico (OTP).  
Se requiere una verificación adicional para cada intento de inicio de sesión desde **dispositivos o ubicaciones no conocidas**, aplicando **autenticación adaptativa** en función del nivel de riesgo.  
La validación de identidad se refuerza mediante **tokens firmados por Firebase**, verificados en el backend a través del **SDK de administración de Firebase**.

### Características Principales

- Soporte para autenticación mediante **contraseña**, **OTP** y **proveedores externos** (Google, GitHub, Apple).
- **Validación automática de tokens** en cada solicitud (Zero Trust).
- **Bloqueo de cuentas** tras varios intentos fallidos.
- **Anulación remota de sesiones comprometidas**.

---

## Ventajas

- Ejecución simple y segura **sin necesidad de mantener un servidor propio de autenticación**.
- Cumple con los estándares **OpenID Connect** y **OAuth 2.0**.
- Integración directa con **Expo/React Native** mediante **expo-firebase-recaptcha**.
