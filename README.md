# 🏥 Reservas Médicas — App móvil con Expo + React Native + Node/Express + Supabase + APIs de clima

Aplicación móvil que permite a los usuarios autenticarse, consultar su información médica, calcular su IMC y visualizar el clima actual de su ciudad.  
El proyecto combina un **backend Node/Express** con su autenticación JWT y un **frontend móvil en Expo + React Native**, utilizando **SecureStore**, **Supabase** para almacenamiento en la nube y consumo de **OpenWeather** (API principal) con **Open-Meteo** (fallback).

---

## 📘 1. Descripción general del proyecto

### 🎯 Propósito
Desarrollar una aplicación de reservas médicas integrando autenticación segura, almacenamiento de datos del perfil en la nube y consumo de APIs externas.  
El proyecto sirve como práctica integral de **seguridad, integración de servicios en la nube y pruebas unitarias**.

### ⚙️ Objetivos
- Implementar login seguro con **JSON Web Tokens (JWT)**.
- Almacenar token de sesión en **Expo SecureStore**.
- Conectar con un **backend Node/Express local**.
- Guardar y recuperar datos de perfil desde **Supabase**.
- Consultar clima actual mediante APIs (OpenWeather y Open-Meteo).
- Mostrar cálculos automáticos del **Índice de Masa Corporal (IMC)**.

### 🧩 Principales funcionalidades
- Autenticación de usuario (`/auth/login` y `/profile`).
- Registro y actualización de datos médicos (altura, peso, IMC).
- Consulta meteorológica por ciudad.
- Persistencia del token entre sesiones.
- Interfaz amigable con navegación entre pantallas (Login, Home, Perfil, Clima).

---

## 🧠 2. Arquitectura general

El sistema se compone de dos módulos principales:

| Módulo | Descripción |
|--------|--------------|
| **Frontend móvil (Expo + React Native)** | App principal que consume la API, gestiona la sesión y muestra las pantallas. |
| **Backend local (Node/Express)** | API REST que maneja autenticación, validación de tokens y datos demo. |

**Integraciones adicionales:**  
- **Supabase:** base de datos y API para el perfil médico del usuario.  
- **OpenWeather / Open-Meteo:** APIs externas para datos del clima.

---

## 📁 3. Estructura de carpetas

```
reservas-medicas/
│
├── app.json                  # Configuración de Expo (variables extra)
├── App.tsx                   # Punto de entrada principal (AuthProvider + navegación)
├── package.json              # Dependencias y scripts
├── docs/.env.example         # Variables de entorno de ejemplo
├── server/                   # Backend Node/Express
│   ├── index.js              # API con /auth/login y /profile
│   └── package.json          # Dependencias backend
│
└── src/
    ├── api/
    │   ├── http.ts           # Axios base + interceptor JWT
    │   ├── auth.ts           # Funciones login y /profile
    │   ├── weather.ts        # Consumo de APIs OpenWeather / Open-Meteo
    │   ├── supabaseClient.ts # Cliente Supabase
    │   └── profiles.ts       # CRUD + cálculo IMC
    │
    ├── auth/
    │   ├── AuthContext.tsx   # Contexto global + SecureStore
    │   └── useAuth.ts        # Hook de autenticación
    │
    ├── navigation/
    │   └── AppNavigator.tsx  # Stack Navigation (Login, Home, Profile, Weather)
    │
    └── screens/
        ├── LoginScreen.tsx
        ├── HomeScreen.tsx
        ├── WeatherScreen.tsx
        └── ProfileScreen.tsx
```

---

## 🧩 4. Dependencias principales

### Frontend
| Librería | Uso |
|-----------|-----|
| **Expo / React Native** | Framework móvil base |
| **@react-navigation/native** | Navegación entre pantallas |
| **axios** | Llamadas HTTP |
| **expo-secure-store** | Almacenamiento seguro del token |
| **expo-constants** | Variables globales del entorno |
| **react-native-reanimated** | Animaciones |
| **react-native-safe-area-context** | Manejo seguro de áreas visuales |
| **Supabase JS** | Interacción con base de datos en la nube |

### Backend
| Librería | Uso |
|-----------|-----|
| **express** | Servidor HTTP principal |
| **cors** | Permitir peticiones externas |
| **jsonwebtoken** | Generar y validar tokens JWT |
| **bcryptjs** | Cifrado de contraseñas |
| **nodemon** | Auto-reinicio en desarrollo |

---

## ⚙️ 5. Configuración del entorno

Crea un archivo `.env` (o edita `docs/.env.example`) con tus valores locales:

```bash
# Backend local
API_BASE_URL=http://192.168.x.x:4000

# Clima
OPENWEATHER_API_KEY=tu_api_key

# Supabase
SUPABASE_URL=https://<your-project>.supabase.co
SUPABASE_ANON_KEY=<your-anon-key>
```

> ⚠️ No subas `.env` al repositorio.  
> El archivo `app.json` ya contiene una sección `extra` donde Expo lee las variables al ejecutar el proyecto.

---

## 🧪 6. Instalación y ejecución

### 🔹 Requisitos previos
- Node.js 18+ (recomendado 20 LTS)  
- npm 9 o 10  
- Expo CLI (`npm i -g expo-cli` o usar `npx expo`)  
- Cuenta en OpenWeather (API Key)

---

### 🔹 Instalación del cliente (frontend)
```bash
# Desde la raíz del proyecto
npm install
```

Si faltan dependencias:
```bash
npm i axios jwt-decode @react-navigation/native @react-navigation/native-stack
npx expo install expo-secure-store expo-constants react-native-screens react-native-safe-area-context react-native-reanimated
```

---

### 🔹 Instalación del backend
```bash
cd server
npm install
```

Si no existe el `package.json`, puedes crearlo:
```bash
npm init -y
npm i express cors jsonwebtoken bcryptjs
npm i -D nodemon
```

Agrega en el `package.json` del backend:
```json
"scripts": {
  "dev": "nodemon index.js",
  "start": "node index.js"
}
```

---

### 🔹 Ejecución del backend
```bash
cd server
npm run dev
```
El servidor estará en:
```
http://localhost:4000
```

Credenciales demo:
```
email: demo@med.app
password: 123456
```

---

### 🔹 Ejecución de la app móvil
```bash
npx expo start -c
```

- Selecciona **LAN** o **Tunnel**.
- Abre con la app **Expo Go** (Android/iOS).
- Si usas un dispositivo real, asegúrate de que `API_BASE_URL` apunte a tu **IP LAN** (ejemplo: `http://192.168.3.72:4000`).

---

## 🧾 7. Scripts útiles

| Comando | Descripción |
|----------|--------------|
| `npm start` | Inicia el proyecto Expo |
| `npm run build` | Compila el proyecto |
| `npm run lint` | Linter del código |
| `npm run test` | Ejecuta pruebas (cuando se implementen) |
| `npm run dev` (en `server/`) | Inicia el backend con nodemon |

---

## 🧮 8. Cálculo de IMC (BMI)

La app calcula automáticamente el **Índice de Masa Corporal (IMC)** a partir de la altura y el peso registrados.

```ts
bmi = weight_kg / ((height_cm / 100) ** 2)
```

Categorías:
- <18.5 → Bajo peso  
- 18.5–24.9 → Normal  
- 25–29.9 → Sobrepeso  
- ≥30 → Obesidad

---

## 🧰 9. Solución de errores comunes

| Error | Causa | Solución |
|--------|--------|-----------|
| **Network request failed** | IP incorrecta o puerto cerrado | Usa la IP LAN real y abre el puerto 4000 |
| **Invalid API key** | API de OpenWeather aún no activa | Esperar 1–2 horas después de crear la key |
| **Error 401** | Token expirado | Cerrar sesión y volver a iniciar |
| **Puerto 8081 ocupado** | Conflicto con Metro Bundler | Permitir otro puerto o cerrar procesos anteriores |

---

## 🧪 10. Pruebas y calidad

- **Unit tests con Jest** para módulos:
  - `src/api/http.ts`
  - `src/api/weather.ts`
  - `src/auth/AuthContext.tsx`
  - `server/index.js`

> Cada test verificará la autenticación, conexión al backend, cálculos y respuestas de las APIs.

---

## 🧾 Licencia

Este proyecto se distribuye con fines académicos y de aprendizaje.  
Todos los nombres de APIs y servicios externos pertenecen a sus respectivos propietarios.

---

**Repositorio:** [https://github.com/MaximusYakuza/reservas-medicas](https://github.com/MaximusYakuza/reservas-medicas)  
