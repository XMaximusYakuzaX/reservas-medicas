# Unit Test Design – Reservas Médicas

## 1. Introducción
Este documento describe el diseño de las **pruebas unitarias** del proyecto **Reservas Médicas**, una aplicación móvil desarrollada con **React Native + Expo**. El objetivo es asegurar la calidad del código, la fiabilidad de las funciones críticas (autenticación, consumo de APIs y utilidades) y facilitar el mantenimiento continuo del sistema.

---

## 2. Objetivos de las pruebas unitarias
Las pruebas unitarias en este proyecto buscan:
- Validar el comportamiento de **módulos aislados** (servicios/API/utils) sin dependencias reales.
- **Detectar regresiones** tempranas al integrar nuevas funcionalidades.
- Verificar **controles de seguridad** en cliente (cabeceras, manejo de tokens, borrado ante 401).
- Mantener una **base de pruebas estable y reproducible**, desacoplada de Internet o proveedores externos.
- Asegurar la correcta comunicación entre el cliente móvil y servicios públicos (APIs) bajo distintos escenarios.

---

## 3. Alcance
Las pruebas unitarias cubren los siguientes componentes del proyecto:

| Módulo | Descripción | Archivo de prueba | Propósito de la prueba |
|---|---|---|---|
| **API de Autenticación (auth.api)** | Login, obtención de perfil y almacenamiento seguro. | `__tests__/auth.api.test.ts` | Verificar almacenamiento en **Expo SecureStore** con claves `token` y `user`, y validar el payload devuelto por la API. |
| **Interceptores HTTP** | Cabeceras y manejo de errores globales. | `__tests__/http.interceptor.test.ts` | Asegurar que se añade `Authorization: Bearer <token>` cuando existe token y que se **limpia** el almacenamiento (`token`, `user`) ante respuestas **401**. |
| **API Meteorológica (weather.api)** | Integración con OpenWeather (primario) y Open‑Meteo (fallback). | `__tests__/weather.api.test.ts` | Validar que se usa el **proveedor primario** cuando responde 200 y que existe **fallback automático** si falla, normalizando `temp` numérico. |

---

## 4. Herramientas y entorno de prueba

- **Framework:** Jest (preset **`jest-expo`**).
- **Mocking HTTP:** `axios-mock-adapter` para interceptar y simular respuestas de red.
- **Bibliotecas auxiliares:** `@testing-library/react-native` y `@testing-library/jest-native` para aserciones idiomáticas en RN.
- **Cobertura:** `jest --coverage` para medir efectividad de pruebas.
- **Entorno móvil:** React Native + Expo (sin dependencias de dispositivos reales).
- **Servicios externos:** Supabase y APIs públicas; **no** se contactan en tests (todo se simula).

**Comandos usados**

```bash
npm test
npm run test:watch         # ejecución interactiva
npm run test:ci            # modo CI (secuencial)
```

---

## 5. Matriz de casos por módulo

### 5.1 Autenticación (`auth.api`)
- **Login almacena credenciales** → se espera `SecureStore.setItemAsync('token', <jwt>)` y `SecureStore.setItemAsync('user', <json>)` y retorno del usuario.
- **Perfil** → `getProfile()` devuelve datos cuando el backend responde 200.
- **Errores** → se propagan mensajes de error normalizados cuando la API falla.

### 5.2 Interceptores HTTP (`http`)
- **Request** → si existe token en SecureStore, el interceptor agrega `Authorization: Bearer <token>` a los headers.
- **Response (401)** → al recibir 401, se borran `token` y `user` de SecureStore (logout defensivo).

### 5.3 Clima (`weather.api`)
- **Proveedor primario** → si la URL de OpenWeather responde 200 con `{ temp: <n> }`, se retorna el valor y `source='OpenWeather'`.
- **Fallback** → si falla el primario, se consulta Open‑Meteo y se retorna `{ temp: <n> }` con `source='Open-Meteo'`.
- **Normalización** → `temp` siempre es numérico; `desc` es opcional.

---

## 6. Buenas prácticas adoptadas

- Colocar las pruebas en `__tests__/` y usar nombres descriptivos por módulo.
- Patrón **Arrange–Act–Assert** en cada caso.
- Tests **deterministas**: sin llamadas reales de red ni dependencias de tiempo.
- Aserciones sobre **efectos colaterales** (p. ej., escritura/borrado en SecureStore).
- Umbral sugerido de cobertura: **≥ 80 %** en módulos críticos (auth, http).

---

## 7. Ejecución e integración continua

- Las suites se ejecutan con `npm test` localmente y pueden integrarse a un pipeline CI con `npm run test:ci`.
- El preset `jest-expo` garantiza compatibilidad con APIs de React Native/Expo durante los tests.
- Los mocks de red (axios‑mock‑adapter) permiten que la ejecución **no dependa** de Internet ni de claves reales.

---

## 8. Conclusión

El diseño de pruebas unitarias de **Reservas Médicas** prioriza **fiabilidad, seguridad y reproducibilidad**. El uso de Jest con `jest-expo` y `axios-mock-adapter` permite validar autenticación, interceptores y consumo de APIs sin depender de servicios externos.  
Este enfoque reduce regresiones, mejora la confianza en el código y facilita la integración continua del equipo.
