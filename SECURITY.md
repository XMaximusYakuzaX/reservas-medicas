# Security Policy – Reservas Médicas (Expo/React Native + Node/Express)

> **Última actualización:** 2025-10-05  
> **Alcance:** cliente **Expo/React Native**, API **Node/Express** de autenticación y servicios (clima), CI/CD y artefactos de desarrollo.

---

## Seguridad

- [x] **Principios de seguridad aplicados** (HTTPS, JWT con expiración, cifrado local, mínimo privilegio, validación estricta).
- [x] **Amenazas identificadas y medidas de mitigación** (fuga de token, MITM, fuerza bruta, CORS, almacenamiento inseguro, dependencias vulnerables).
- [x] **Guías para mantener la seguridad** (no subir llaves, uso de variables de entorno, rotación de secretos, controles en CI/CD).

---

## 1. Principios de seguridad aplicados

### 1.1 Cliente móvil (Expo/React Native)

- **Transporte seguro:** todas las llamadas de red deben realizarse sobre **HTTPS** (TLS 1.2+).
- **Autenticación:** **JWT** con expiración; si se habilita **refresh**, usar endpoint dedicado y rotación.
- **Almacenamiento de credenciales:** token en **Expo SecureStore** (cifrado por el SO). **Nunca** usar AsyncStorage ni exponer en logs.
- **Mínimo privilegio:** solicitar únicamente los permisos necesarios (ubicación, cámara, etc.); revocar/deshabilitar los no usados.
- **Gestión de errores:** mensajes de error neutros hacia el usuario; sin información sensible en mensajes o trazas.
- **Endurecimiento de canal:** considerar **certificate pinning** en builds productivos (via RN/Expo Dev Client compatibles).

### 1.2 API (Node/Express)

- **TLS obligatorio** detrás de reverse proxy (Nginx/Cloud/Heroku/Render).
- **Contraseñas:** **bcrypt** con `salt` (cost ≥ 10).
- **JWT:** firmado con clave robusta; expiración corta (15–60 min); **revocación**/lista negra opcional en logout.
- **Validación:** todas las entradas validadas con **Joi/Zod/Celebrate** antes de la lógica de negocio.
- **Rate limiting:** **express-rate-limit** en rutas sensibles (login, refresh).
- **CORS restrictivo:** lista blanca de orígenes; evitar `'*'` en producción.
- **Cabeceras endurecidas:** **helmet** habilitado.
- **Principio de mínimo privilegio** hacia servicios externos (scopes mínimos).
- **Registro controlado:** sin PII ni tokens en logs; rotación y nivel **warn/error** en producción.

---

## 2. Amenazas identificadas y mitigaciones

| Amenaza                                                   | Impacto                         | Mitigación                                                                             |
| --------------------------------------------------------- | ------------------------------- | -------------------------------------------------------------------------------------- |
| **Fuga de JWT** (capturas, logs, almacenamiento inseguro) | Toma de cuenta                  | Guardar en **SecureStore**; no loguear; expiración y rotación; invalidación en logout. |
| **MITM / tráfico no cifrado**                             | Robo de credenciales/datos      | Enforce **HTTPS**; HSTS en proxy; considerar **pinning** en app.                       |
| **Fuerza bruta en `/auth/login`**                         | Acceso no autorizado            | **Rate limit**, back-off exponencial, respuestas genéricas, monitoreo/alertas.         |
| **Validación insuficiente**                               | Inyección y fallos lógicos      | **Joi/Zod** + sanitización; tipos estrictos; errores controlados.                      |
| **CORS permisivo**                                        | Exposición a sitios maliciosos  | Orígenes permitidos explícitos; bloquear credenciales por defecto.                     |
| **Almacenamiento inseguro en cliente**                    | Robo local de token             | **SecureStore**, limpiar en logout/401, no mostrar en UIs/errores.                     |
| **Dependencias vulnerables**                              | RCE/DoS por paquetes            | `npm audit`, Dependabot/Snyk, actualización periódica y pin de versiones.              |
| **Exposición de secretos** (`.env` en repo)               | Compromiso total                | `.gitignore` para `.env`; **secrets** en CI/CD; rotación y principios de KMS.          |
| **Permisos móviles excesivos**                            | Exposición de datos del usuario | Solicitud just‑in‑time y explicación de propósito; revocar si no se usan.              |

> **Nota:** esta tabla debe revisarse en cada release y tras cambios en dependencias o ámbitos de permisos.

---

## 3. Guías de seguridad operativa

### 3.1 Variables y secretos

- **Nunca** subir llaves ni tokens al repositorio.
- Usar `.env` locales y **Secrets** del proveedor (GitHub Actions, Vercel, Render, etc.).
- **Rotación** inmediata ante sospecha o baja de un colaborador.
- `.env` debe estar listado en `.gitignore`.

**Ejemplo de `.env.example` (cliente y server):**

```dotenv
# Backend local (Auth API)
API_BASE_URL=http://10.0.2.2:4000          # Emulador Android
# API_BASE_URL=http://localhost:4000       # Web/PC
# API_BASE_URL=http://<IP_LAN_PC>:4000     # Dispositivo real

# Clima
OPENWEATHER_API_KEY=tu_api_key

# Server (si aplica)
JWT_SECRET=change_me_in_prod
NODE_ENV=development
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX=10
```

### 3.4 Gestión de tokens

- **Access token** con `exp` corto; **refresh token** (si existe) con mayor protección (cookie httpOnly en web o SecureStore en móvil) y **rotación** por uso.
- Al recibir **401**: limpiar SecureStore y redirigir a **login**.
- En logout: invalidar/blacklistear refresh tokens (si aplica).

### 3.5 Dependencias y builds

- Ejecutar `npm audit` en cliente y server; habilitar **Dependabot**.
- Distinguir dependencias `dependencies`/`devDependencies`; bloquear con `package-lock.json`.
- Revisar _changelogs_ de librerías críticas (axios, jwt, express, react‑native).

### 3.6 Logging y monitoreo

- No registrar PII ni tokens.
- Alertas por picos de 4xx/5xx y múltiples intentos fallidos de login.
- Trazabilidad con IDs de correlación (sin PII).

### 3.7 Build/Release y control de acceso

- Revisiones obligatorias (PR + code‑owners si aplica).
- Requerir 2FA en GitHub para colaboradores.
- Principio de **least privilege** en accesos a cloud/CI.

### 3.8 Clasificación de datos (orientativo)

- **Sensible:** credenciales, tokens, PII → cifrado en tránsito y reposo; acceso restringido.
- **Interno:** logs sin PII, métricas → acceso limitado al equipo.
- **Público:** documentación general del proyecto.

### 3.9 Plan de respuesta a incidentes (resumen)

1. Contener: revocar/rotar **JWT_SECRET** y llaves de terceros.
2. Erradicar: cerrar sesiones/invalidar tokens; parchar dependencias.
3. Recuperar: validar integridad; forzar actualización de app si aplica.
4. Informar: comunicar a interesados según severidad/alcance.

---

## 4. Checklist de verificación (para PRs)

- [ ] Tráfico **HTTPS** verificado y CORS restrictivo configurado.
- [ ] **Helmet** y **rate‑limit** activos en API.
- [ ] Validación de entrada con **Joi/Zod/Celebrate** en rutas sensibles.
- [ ] Token **JWT** en **SecureStore** y limpieza en logout/401.
- [ ] `.env` no committeado; `secrets` configurados en CI/CD.
- [ ] `npm audit` sin vulnerabilidades críticas o con mitigaciones documentadas.
- [ ] Permisos móviles mínimos y justificados.
- [ ] Logs sin PII ni tokens; alertas configuradas.

---

## 5. Divulgación responsable

No publiques detalles de vulnerabilidades en issues abiertos.  
Reporta de forma privada al mantenedor o crea un **Security Advisory** en GitHub, incluyendo pasos de reproducción, alcance e impacto.

---