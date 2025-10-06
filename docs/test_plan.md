# Documentación de Pruebas Unitarias – Reservas Médicas

**Autor:** Israel Cid Dominguez
**Fecha:** 5 de Octubre de 2025
**Issue Relacionado:** #9

---

### 1. Introducción

Este documento describe el diseño y propósito de las pruebas unitarias que ya están implementadas en el proyecto Reservas Médicas. El objetivo es asegurar la calidad del código, explicar qué se probó y facilitar el mantenimiento a futuro.

### 2. Objetivos Específicos

Las pruebas implementadas buscan cumplir con los siguientes objetivos:
* **Asegurar la autenticación:** Validar que el login y la gestión de tokens JWT funcionen correctamente.
* **Validar integraciones API:** Comprobar que las llamadas a las APIs externas (clima) y al backend local se comportan como se espera.
* **Garantizar el manejo de errores:** Asegurar que la aplicación responde de forma controlada ante fallos, como un error 401 (No autorizado).

### 3. Alcance

Las pruebas unitarias existentes cubren los siguientes módulos y archivos del proyecto.

| Módulo Probado | Archivo de Prueba | Descripción y Propósito de la Prueba |
| :--- | :--- | :--- |
| **Autenticación de API** | `auth.api.test.ts` | Verifica el flujo completo de autenticación. Asegura que un **login exitoso** guarde el **token** en el dispositivo y devuelva los datos del usuario. También confirma que un **login fallido** con credenciales incorrectas sea rechazado. Finalmente, valida que un usuario con un token válido pueda obtener los datos de su perfil. |
| **Interceptor HTTP (Tokens)** | `http.interceptor.test.ts` | Prueba el componente automático que gestiona las peticiones HTTP. Verifica que, si un usuario ha iniciado sesión, su **token de autorización se adjunte correctamente** a todas las llamadas salientes a la API. Adicionalmente, comprueba una función de seguridad: si la API devuelve un error **401 (No autorizado)**, el token inválido se elimina automáticamente del dispositivo. |
| **API del Clima** | `weather.api.test.ts` | Comprueba el sistema de obtención de datos meteorológicos, que incluye un mecanismo de **fallback (respaldo)**. La prueba valida que la app intente conectarse primero al proveedor principal (OpenWeather). Si este falla, la prueba asegura que la app cambie automáticamente al proveedor de respaldo (Open-Meteo) para garantizar que el usuario siempre reciba la información del clima. |

### 4. Herramientas y Configuración

Las pruebas se implementaron utilizando el siguiente entorno:
* **Framework de Pruebas:** Jest (`jest-expo`).
* **Simulación de Peticiones (Mocks):** `axios-mock-adapter` para evitar llamadas reales a las APIs durante las pruebas.
* **Librerías Adicionales:** `@testing-library/react-native`, `expo-secure-store`.
* **Comando de Ejecución:** Las pruebas se ejecutan desde la raíz del proyecto con el comando `npm test`.

### 5. Buenas Prácticas

Las pruebas están organizadas dentro de la carpeta `__tests__/` para separar el código de la aplicación del código de prueba. Se utilizan `mocks` para aislar las pruebas de dependencias externas, lo que garantiza que los resultados sean consistentes y rápidos.

### 6. Conclusión

La suite de pruebas actual fortalece la calidad y estabilidad del sistema al verificar la funcionalidad crítica de autenticación y consumo de APIs. Esta documentación sirve como guía para entender la cobertura actual de las pruebas.