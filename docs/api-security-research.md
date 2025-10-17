# Research Report: API Security and Data Encryption
**Issue:** #47
**Author:** Saul Israel Cid Dominguez
**Date:** October 16, 2025

## Executive Summary

This document presents research on security best practices applicable to the "Medical Reservations" project. The objective is to analyze and propose concrete solutions to strengthen API and data security, both in transit and at rest. The findings in this report will serve as the basis for security implementation tasks, including Issue #54.

---

## 1. Authentication and Authorization Protocols: OAuth 2.0 & OpenID Connect (OIDC)

### 1.1. What are they?
* **OAuth 2.0 (Authorization Framework):**
    * *It's the industry standard for **authorization**. It allows an application to obtain limited access to a user's resources on a server. It acts like a "valet key": the app can access certain data on the user's behalf without ever knowing their main credentials.*
* **OpenID Connect (Authentication Layer):**
    * *It's an **authentication** layer built on top of OAuth 2.0. Its primary function is to verify a user's *identity* and obtain basic profile information in a standardized way, typically via a JSON Web Token (JWT) called an `id_token`.*
* **Key Difference:**
    * *OAuth 2.0 is about **what an app can do** (permissions), while OIDC is about **who the user is** (identity).*

### 1.2. Why is it crucial for "Medical Reservations"?
* Our authentication with Supabase already implements the principles of these standards through the use of JSON Web Tokens (JWT). Understanding this flow is vital to:
    * Ensure we correctly handle tokens and session lifecycles.
    * Justify the robustness of our login system, as it is based on proven industry standards.
    * Prepare the architecture for future integrations with identity providers like Google, Apple, etc., which use OIDC.

### 1.3. Implementation Proposal and Token Flow
* **Current Flow (Supabase):**
    * *The flow is robust and standard: the



# Informe de Investigación: Seguridad de API y Cifrado de Datos
**Issue:** #47
**Autor:** Saul Israel Cid Dominguez
**Fecha:** 16 de octubre de 2025

## Resumen Ejecutivo

Este documento presenta una investigación sobre las mejores prácticas de seguridad aplicables al proyecto "Reservas Médicas". El objetivo es analizar y proponer soluciones concretas para fortalecer la seguridad de la API y los datos, tanto en tránsito como en reposo. Las conclusiones de este informe servirán como base para las tareas de implementación de seguridad, incluyendo el Issue #54.

---

## 1. Protocolos de Autenticación y Autorización: OAuth 2.0 y OpenID Connect (OIDC)

### 1.1. ¿Qué son?
* **OAuth 2.0 (Authorization Framework):**
    * *[Aquí explica qué es la autorización. Compara cómo le da a una aplicación un "permiso limitado" para acceder a recursos en nombre del usuario, sin exponer sus credenciales principales.]*
* **OpenID Connect (Authentication Layer):**
    * *[Aquí explica qué es la autenticación. Describe cómo OIDC se construye sobre OAuth 2.0 para verificar la *identidad* de un usuario y obtener información básica de su perfil de una manera estandarizada.]*
* **Diferencia Clave:**
    * *[Sintetiza la diferencia: OAuth 2.0 trata sobre **qué puede hacer** una app (permisos), mientras que OIDC trata sobre **quién es** el usuario (identidad).]*

### 1.2. ¿Por qué es crucial para "Reservas Médicas"?
* Nuestra autenticación con Supabase ya implementa los principios de estos estándares mediante el uso de JSON Web Tokens (JWT). Entender este flujo es vital para:
    * Asegurar que manejamos correctamente los tokens y los ciclos de vida de las sesiones.
    * Justificar la robustez de nuestro sistema de inicio de sesión.
    * Preparar la arquitectura para futuras integraciones con proveedores de identidad como Google, Apple, etc., que utilizan OIDC.

### 1.3. Propuesta de Implementación y Flujo de Tokens
* **Flujo Actual (Supabase):**
    * *[Describe brevemente el flujo: el usuario envía credenciales, Supabase las valida y devuelve un `access_token` (JWT) y un `refresh_token`.]*
* **Manejo de Tokens:**
    * `access_token`: Es de corta duración y se debe enviar en la cabecera `Authorization` de cada petición a nuestro backend de Node/Express.
    * `refresh_token`: Es de larga duración y se utiliza para solicitar un nuevo `access_token` cuando el actual expire, evitando que el usuario tenga que iniciar sesión repetidamente. Debe ser almacenado de la forma más segura posible.

---

## 2. Seguridad en la Comunicación de Red

### 2.1. TLS 1.3
* **¿Qué es?**
    * *[Define TLS (Transport Layer Security) como el protocolo criptográfico que proporciona comunicaciones seguras a través de una red. Menciona que HTTPS es la implementación de HTTP sobre TLS.]*
* **¿Por qué es crucial para "Reservas Médicas"?**
    * Garantiza la **confidencialidad** e **integridad** de todos los datos intercambiados entre la app móvil y nuestro servidor.
    * Sin TLS, la información médica sensible podría ser interceptada y leída en redes no seguras (ej. Wi-Fi público), en un ataque conocido como *Man-in-the-Middle* (MITM).
* **Propuesta de Implementación:**
    * Asegurar que nuestro servidor backend en Node/Express esté configurado para aceptar únicamente conexiones sobre HTTPS con TLS 1.3.
    * Todas las llamadas a la API desde la aplicación React Native se realizarán a endpoints `https://`.

### 2.2. Pinning de Certificados
* **¿Qué es?**
    * *[Describe el pinning como una técnica de seguridad que "ancla" o "fija" la identidad del servidor remoto en la aplicación cliente. La app confiará exclusivamente en un certificado o clave pública específica, ignorando a las demás autoridades de certificación.]*
* **¿Por qué es crucial para "Reservas Médicas"?**
    * Ofrece una capa de protección adicional contra ataques MITM sofisticados donde un atacante podría presentar un certificado TLS aparentemente válido pero fraudulento. Dada la sensibilidad de los datos médicos, esta es una medida de endurecimiento recomendada.
* **Propuesta de Implementación en React Native/Expo:**
    * *[Investiga y documenta las opciones. Por ejemplo: menciona si Expo lo soporta directamente a través de su configuración o si se necesita "ejectuar" y usar librerías nativas. Evalúa la complejidad vs. el beneficio.]*
    * **Análisis de Riesgos:** El principal riesgo es que si el certificado del servidor cambia, todas las versiones de la app con el "pin" antiguo dejarán de funcionar. Se debe proponer una estrategia de actualización y gestión de certificados.

---

## 3. Gestión Segura de Secretos en el Dispositivo

### 3.1. Android Keystore y iOS Keychain
* **¿Qué son?**
    * *[Describe el Keystore y el Keychain como "cajas fuertes" a nivel de sistema operativo, a menudo respaldadas por hardware, diseñadas para almacenar material criptográfico (claves, tokens, etc.) de forma segura.]*
* **¿Por qué es crucial para "Reservas Médicas"?**
    * Almacenar secretos como el `refresh_token` o claves de API en un almacenamiento no seguro (como `AsyncStorage`) los expone a ser robados si el dispositivo es comprometido. El uso de estos almacenes nativos mitiga ese riesgo significativamente.
* **Propuesta de Implementación con Expo:**
    * Se utilizará la librería `expo-secure-store`.
    * Esta librería actúa como un wrapper, utilizando el Keychain en iOS y el Keystore en Android de forma transparente para el desarrollador.
    * **Acción Concreta:** Se debe refactorizar cualquier código que actualmente guarde el JWT (especialmente el `refresh_token`) en `AsyncStorage` para que utilice `expo-secure-store` en su lugar.

---

## 4. Cifrado de Datos en Reposo (Data at Rest)

### 4.1. Algoritmo AES-256
* **¿Qué es?**
    * *[Define AES (Advanced Encryption Standard) como un algoritmo de cifrado simétrico de estándar mundial. Explica que 256 bits se refiere al tamaño de la clave, considerándose extremadamente seguro y resistente a ataques de fuerza bruta.]*
* **¿Por qué es crucial para "Reservas Médicas"?**
    * Si un usuario guarda datos sensibles localmente en la aplicación (ej. notas, historial de salud) y el dispositivo es robado y su seguridad es vulnerada, el cifrado en reposo asegura que esos datos permanezcan ilegibles para un atacante. Es un pilar para el cumplimiento de normativas de privacidad como GDPR.
* **Propuesta de Implementación:**
    * **Identificar Datos Sensibles:** *[Haz una lista de los posibles datos que se guardarían en el dispositivo y que deberían ser cifrados.]*
    * **Librería a Utilizar:** Investigar y proponer una librería criptográfica para React Native, como `crypto-js` o la API `expo-crypto`.
    * **Flujo de Cifrado/Descifrado:**
        1.  Cuando se vaya a guardar un dato sensible: `Dato en claro -> Cifrar con AES-256 -> Guardar en SQLite/AsyncStorage`.
        2.  Cuando se vaya a leer: `Leer dato cifrado de SQLite/AsyncStorage -> Descifrar con AES-256 -> Mostrar en la app`.
    * **Gestión de la Clave de Cifrado:** La clave utilizada para cifrar los datos también debe ser protegida. Se debe almacenar utilizando `expo-secure-store`.