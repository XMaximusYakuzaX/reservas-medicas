# Profiles Table Documentation

**Author:** Edgar Alejandro C.  
**Date:** October 05, 2025

---

## Table Description

The `profiles` table stores user profile information such as email, height, weight, and BMI (Body Mass Index).  
Each record is linked to an authenticated user through a unique `id` (UUID).

---

## Columns

| Column       | Type        | Description                                 |
|---------------|-------------|---------------------------------------------|
| id            | uuid        | Unique identifier for the user (Primary Key) |
| email         | text        | User's email address                        |
| height_cm     | numeric     | User height in centimeters                  |
| weight_kg     | numeric     | User weight in kilograms                    |
| bmi           | numeric     | Calculated Body Mass Index value            |
| bmi_label     | text        | BMI classification label                    |
| updated_at    | timestamptz | Date and time when the profile was last updated (default: `now()`) |

---

## Security Policies

Row-Level Security (RLS) is enabled to ensure users can **only access or modify their own data**.  
The following policies are applied:

- **profiles_select_own** → Allows authenticated users to select their own profile.  
- **profiles_upsert_own** → Allows authenticated users to insert their own profile data.  
- **profiles_update_own** → Allows authenticated users to update only their own data.

---

## SQL Script

The complete SQL script for this configuration can be found in:  
📄 [`/docs/sql/profiles_table.sql`](./sql/profiles_table.sql)

---

# Documentación de la Tabla Profiles

**Autor:** Edgar Alejandro C.  
**Fecha:** 05 de octubre de 2025

---

## Descripción de la Tabla

La tabla `profiles` almacena información del perfil del usuario, como correo electrónico, altura, peso y el IMC (Índice de Masa Corporal).  
Cada registro está vinculado a un usuario autenticado mediante un identificador único `id` (UUID).

---

## Columnas

| Columna     | Tipo        | Descripción                                  |
|--------------|-------------|----------------------------------------------|
| id           | uuid        | Identificador único del usuario (Clave primaria) |
| email        | text        | Correo electrónico del usuario               |
| height_cm    | numeric     | Altura del usuario en centímetros            |
| weight_kg    | numeric     | Peso del usuario en kilogramos               |
| bmi          | numeric     | Valor calculado del Índice de Masa Corporal  |
| bmi_label    | text        | Etiqueta de clasificación del IMC            |
| updated_at   | timestamptz | Fecha y hora de la última actualización del perfil (por defecto: `now()`) |

---

## Políticas de Seguridad

La Seguridad a Nivel de Fila (Row-Level Security, RLS) está habilitada para garantizar que los usuarios **solo puedan acceder o modificar sus propios datos**.  
Se aplican las siguientes políticas:

- **profiles_select_own** → Permite a los usuarios autenticados consultar su propio perfil.  
- **profiles_upsert_own** → Permite a los usuarios autenticados insertar los datos de su propio perfil.  
- **profiles_update_own** → Permite a los usuarios autenticados actualizar únicamente sus propios datos.

---

## Script SQL

El script SQL completo para esta configuración se encuentra en:  
📄 [`/docs/sql/profiles_table.sql`](./sql/profiles_table.sql)
