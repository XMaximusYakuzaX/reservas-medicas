# Unit Test Design – Medical Reservations

## 1. Introduction

This document describes the design of the **unit tests** for the **Medical Reservations** project, a mobile application developed with **React Native + Expo**.  
The goal is to ensure code quality, the reliability of critical functions (authentication, API consumption, and utilities), and to facilitate continuous system maintenance.

---

## 2. Objectives of Unit Testing

The unit tests in this project aim to:

- Validate the behavior of **isolated modules** (services/API/utils) without real dependencies.
- **Detect regressions** early when integrating new features.
- Verify **client-side security controls** (headers, token handling, cleanup on 401).
- Maintain a **stable and reproducible test base**, decoupled from the Internet or external providers.
- Ensure correct communication between the mobile client and public services (APIs) under various scenarios.

---

## 3. Scope

Unit tests cover the following project components:

| Module                            | Description                                                       | Test File                            | Test Purpose                                                                                                                                                       |
| --------------------------------- | ----------------------------------------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Authentication API (auth.api)** | Login, profile retrieval, and secure storage.                     | `__tests__/auth.api.test.ts`         | Verify storage in **Expo SecureStore** using `token` and `user` keys, and validate the payload returned by the API.                                                |
| **HTTP Interceptors**             | Headers and global error handling.                                | `__tests__/http.interceptor.test.ts` | Ensure `Authorization: Bearer <token>` is added when a token exists, and **clear** storage (`token`, `user`) on **401** responses.                                 |
| **Weather API (weather.api)**     | Integration with OpenWeather (primary) and Open-Meteo (fallback). | `__tests__/weather.api.test.ts`      | Validate that the **primary provider** is used when it responds with 200, and that there is an **automatic fallback** if it fails, normalizing the numeric `temp`. |

---

## 4. Tools and Test Environment

- **Framework:** Jest (preset **`jest-expo`**).
- **HTTP Mocking:** `axios-mock-adapter` to intercept and simulate network responses.
- **Auxiliary libraries:** `@testing-library/react-native` and `@testing-library/jest-native` for idiomatic RN assertions.
- **Coverage:** `jest --coverage` to measure test effectiveness.
- **Mobile environment:** React Native + Expo (no dependency on real devices).
- **External services:** Supabase and public APIs; **not** contacted during tests (everything is mocked).

**Commands used**

```bash
npm test
npm run test:watch         # interactive execution
npm run test:ci            # CI mode (sequential)
```

---

## 5. Test Case Matrix by Module

### 5.1 Authentication (`auth.api`)

- **Login stores credentials** → expects `SecureStore.setItemAsync('token', <jwt>)` and `SecureStore.setItemAsync('user', <json>)`, returning the user.
- **Profile** → `getProfile()` returns data when the backend responds 200.
- **Errors** → normalized error messages are propagated when the API fails.

### 5.2 HTTP Interceptors (`http`)

- **Request** → if a token exists in SecureStore, the interceptor adds `Authorization: Bearer <token>` to the headers.
- **Response (401)** → upon receiving 401, `token` and `user` are cleared from SecureStore (defensive logout).

### 5.3 Weather (`weather.api`)

- **Primary provider** → if the OpenWeather URL responds 200 with `{ temp: <n> }`, return the value with `source='OpenWeather'`.
- **Fallback** → if the primary fails, query Open-Meteo and return `{ temp: <n> }` with `source='Open-Meteo'`.
- **Normalization** → `temp` is always numeric; `desc` is optional.

---

## 6. Adopted Best Practices

- Place tests under `__tests__/` with descriptive module names.
- Use the **Arrange–Act–Assert** pattern in every test case.
- **Deterministic tests**: no real network calls or time dependencies.
- Assertions on **side effects** (e.g., writes/deletes in SecureStore).
- Suggested coverage threshold: **≥ 80%** for critical modules (auth, http).

---

## 7. Execution and Continuous Integration

- Test suites are executed locally with `npm test` and can be integrated into a CI pipeline using `npm run test:ci`.
- The `jest-expo` preset ensures compatibility with React Native/Expo APIs during tests.
- Network mocks (`axios-mock-adapter`) ensure execution **does not depend** on the Internet or real keys.

---

## 8. Conclusion

The unit test design of **Medical Reservations** prioritizes **reliability, security, and reproducibility**.  
Using Jest with `jest-expo` and `axios-mock-adapter` enables testing authentication, interceptors, and API consumption without relying on external services.  
This approach reduces regressions, increases code confidence, and facilitates the team’s continuous integration process.

---

# Diseño de Pruebas Unitarias – Reservas Médicas

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

| Módulo                              | Descripción                                                     | Archivo de prueba                    | Propósito de la prueba                                                                                                                                     |
| ----------------------------------- | --------------------------------------------------------------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **API de Autenticación (auth.api)** | Login, obtención de perfil y almacenamiento seguro.             | `__tests__/auth.api.test.ts`         | Verificar almacenamiento en **Expo SecureStore** con claves `token` y `user`, y validar el payload devuelto por la API.                                    |
| **Interceptores HTTP**              | Cabeceras y manejo de errores globales.                         | `__tests__/http.interceptor.test.ts` | Asegurar que se añade `Authorization: Bearer <token>` cuando existe token y que se **limpia** el almacenamiento (`token`, `user`) ante respuestas **401**. |
| **API Meteorológica (weather.api)** | Integración con OpenWeather (primario) y Open‑Meteo (fallback). | `__tests__/weather.api.test.ts`      | Validar que se usa el **proveedor primario** cuando responde 200 y que existe **fallback automático** si falla, normalizando `temp` numérico.              |

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

---

_Author: Cesar Misael Garcia Lopez_

_Date: October 05, 2025_
