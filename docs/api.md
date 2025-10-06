# The API used in the project must be documented, explaining its purpose and justification.

**Autor:** Angel Gabriel Carreon Trujillo   
**Fecha:** 05 de octubre de 2025  

---

## Propósito General/General Purpose

(Es)
El objetivo de esta integración es incluir en la aplicación **Reservas Médicas**, un sistema creado para administrar servicios y citas de salud, datos meteorológicos que sean actuales, confiables y contextualizados.  
 Incorporar el clima en la interfaz no es solamente un tema de estética, sino **una función estratégica que busca optimizar la experiencia del usuario y la eficacia operativa del sistema**.
 Proporciona una **capa de información contextual** que resulta beneficiosa para los usuarios móviles, incorporando servicios externos que ofrecen un valor agregado sin perjudicar el rendimiento ni la seguridad de la aplicación.

Además, el propósito técnico de esta integración es evidenciar cómo se utilizan **servicios REST externos** (APIs públicas) en un ambiente **React Native + Expo**, empleando prácticas adecuadas tales como:
 - Organizar el código en módulos dentro de una carpeta llamada `api/`.
 - Empleo de `axios` para llevar a cabo solicitudes HTTP eficaces.

 - Gestión de errores mediante el uso automático de una fuente alternativa.
 - Aplicación de variables de entorno seguras (Constants.expoConfig.extra).

 Así, la API meteorológica no solo brinda un servicio funcional, sino que **funciona como una ilustración educativa** de cómo establecer integraciones sólidas y seguras en un ecosistema móvil contemporáneo.


(En)
The goal of this integration is to include current, reliable, and contextualized weather data in the **Reservas Médicas** application, a system created to manage healthcare services and appointments.  
 Incorporating weather into the interface is not just a matter of aesthetics, but **a strategic function that seeks to optimize the user experience and the operational efficiency of the system**.
 It provides a **layer of contextual information** that is beneficial to mobile users, incorporating external services that offer added value without compromising the performance or security of the application.
In addition, the technical purpose of this integration is to demonstrate how **external REST services** (public APIs) are used in a **React Native + Expo** environment, employing best practices such as:
- Organizing the code into modules within a folder called `api/`.
- Using `axios` to perform efficient HTTP requests.
 - Managing errors by automatically using an alternative source.
 - Applying secure environment variables (Constants.expoConfig.extra).
 Thus, the weather API not only provides a functional service, but also **serves as an educational illustration** of how to establish robust and secure integrations in a contemporary mobile ecosystem.

---

## Justificación del Uso de la API/Justification for Using the API

(Es)
La decisión de incorporar **OpenWeather** en este proyecto se basa en una mezcla de **parámetros técnicos y funcionales**.  
La justificación se explica a continuación:

### 1.  Fiabilidad y precisión
 Uno de los servicios meteorológicos más empleados a escala mundial es OpenWeather.  Su API proporciona datos en tiempo real con un soporte multilingüe (incluyendo el español), además de métricas adicionales como la presión, humedad, temperatura y descripción textual.  
Esto posibilita brindar información exacta y localizada a los usuarios finales, lo que mejora la utilidad del sistema.

### 2.  Integración fácil y eficaz
Las dos APIs proporcionan puntos finales REST que se pueden utilizar de manera sencilla a través de `axios`, lo cual posibilita:
 - Reducir la complejidad del código.
 - Disminuir los períodos de respuesta.
 - Mantener la compatibilidad con las plataformas para dispositivos móviles (Android e iOS).
La integración se ha creado siguiendo el principio de **bajo acoplamiento**, que permite la sustitución o la ampliación de las fuentes de datos en el futuro sin que otras partes del sistema resulten afectadas.

### 3.  Mantenimiento y escalabilidad
La organización modular del archivo `src/api/weather.ts` hace posible conservar y modernizar el código sin dificultad.  
Esto es particularmente beneficioso en ambientes colaborativos, donde varios desarrolladores tienen la capacidad de entender con rapidez las funcionalidades y expandirlas (como por ejemplo, incluyendo geolocalización o pronóstico extendido).
Asi mismo, se utiliza **TypeScript** para fortalecer el tipado y reducir errores, garantizando que las peticiones a las APIs se hagan de forma controlada.

### 4. Seguridad y buenas prácticas
La clave privada de OpenWeather (`OPENWEATHER_API_KEY`) no se expone en el código fuente, sino que se almacena dentro de la configuración de Expo (`app.json`) o mediante variables de entorno (`.env`).  
Esto evita vulnerabilidades comunes al trabajar con APIs externas, protegiendo tanto la aplicación como las credenciales del desarrollador.

De esta manera, el proyecto no solo integra una funcionalidad útil, sino que refuerza conceptos clave de desarrollo de software móvil moderno.

(En)
The decision to incorporate **OpenWeather** into this project is based on a combination of **technical and functional parameters**.  
The justification is explained below:

### 1.  Reliability and accuracy
 One of the most widely used weather services worldwide is OpenWeather.  Its API provides real-time data with multilingual support (including Spanish), as well as additional metrics such as pressure, humidity, temperature, and textual descriptions.  
This makes it possible to provide accurate and localized information to end users, which improves the usefulness of the system.

### 2.  Easy and effective integration
The two APIs provide REST endpoints that can be easily used through `axios`, which makes it possible to:
 - Reduce code complexity.
 - Decrease response times.
 - Maintain compatibility with mobile platforms (Android and iOS).

The integration has been created following the principle of **loose coupling**, which allows for the replacement or extension of data sources in the future without affecting other parts of the system.

### 3.  Maintenance and scalability
The modular organization of the `src/api/weather.ts` file makes it possible to maintain and modernize the code without difficulty.  

This is particularly beneficial in collaborative environments, where multiple developers have the ability to quickly understand the functionalities and expand them (such as including geolocation or extended forecasts).
Likewise, **TypeScript** is used to strengthen typing and reduce errors, ensuring that requests to APIs are made in a controlled manner.

### 4. Security and best practices
The OpenWeather private key (`OPENWEATHER_API_KEY`) is not exposed in the source code, but is stored within the Expo configuration (`app.json`) or through environment variables (`.env`).  
This avoids common vulnerabilities when working with external APIs, protecting both the application and the developer's credentials.

In this way, the project not only integrates useful functionality, but also reinforces key concepts of modern mobile software development.

---