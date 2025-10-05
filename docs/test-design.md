#  Unit Test Design – Reservas Médicas

## 1. Introducción
Este documento describe el diseño de las pruebas unitarias del proyecto **Reservas Médicas**, con el objetivo de asegurar la calidad del código, la fiabilidad de las funciones críticas y la facilidad de mantenimiento a futuro.

---

## 2. Objetivo de las pruebas unitarias
Las pruebas unitarias permiten:
- Validar el correcto funcionamiento de cada módulo individual (servicios, controladores, modelos, etc.).
- Detectar errores antes de integrar nuevas funcionalidades.
- Facilitar la refactorización del código sin comprometer su estabilidad.

---

## 3. Alcance
Las pruebas unitarias cubren los siguientes componentes del proyecto:

| Módulo | Descripción | Archivo de prueba | Propósito de la prueba |
|--------|--------------|------------------|-------------------------|
| **Controladores de usuarios** | Manejo de registro, login y datos del usuario. | `tests/userController.test.js` | Verificar validaciones y respuestas HTTP correctas. |
| **Controladores de reservas** | Creación, modificación y cancelación de citas. | `tests/reservasController.test.js` | Comprobar que las reservas se registran correctamente en la base de datos. |
| **Servicios de autenticación** | Generación y verificación de tokens JWT. | `tests/authService.test.js` | Asegurar la validez de los tokens y la seguridad de acceso. |
| **Modelos** | Estructura de los datos en la base de datos. | `tests/models.test.js` | Validar esquemas y restricciones en los modelos. |

---

## 4. Herramientas y entorno de prueba
Las pruebas se implementaron usando:

- **Framework:** Jest / Mocha (dependiendo del repositorio).
- **Mocking:** `sinon` o `jest.mock()` para simular dependencias.
- **Cobertura:** `nyc` o `jest --coverage`.
- **Base de datos de prueba:** MongoDB / SQLite en modo temporal (según configuración del proyecto).

Ejemplo de comandos:

```bash
npm install --save-dev jest supertest
npm test
