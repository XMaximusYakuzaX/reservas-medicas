# Cloud Database Service Documentation

## English Version

**Add description of cloud database service and justification #6**
  
**Author:** Diego Sanchez Martinez  
**Date:** October 05, 2025

---

### CLOUD DATABASE SERVICE: SUPABASE

#### General Description

Supabase is a Backend-as-a-Service (BaaS) platform that provides a fully managed PostgreSQL database, along with features like authentication, storage, and automatic APIs. It serves as an open source alternative to Firebase, combining the power of a traditional relational database with the scalability and ease of use of modern cloud services.

- **Name:** Supabase
- **Provider:** Supabase Inc. (open source platform)
- **Database type:** PostgreSQL relational with REST API and real-time capabilities

#### Main Features

- PostgreSQL database with automatic scaling and integrated backups
- Automatically generated REST API from database schema
- Real-time subscriptions through WebSockets for instant data updates
- Integrated authentication system with multiple providers (email, Google, GitHub, etc.)
- File storage with granular security policies
- Intuitive dashboard interface for administration and monitoring
- Automatic TypeScript types generation for safer development

#### Technical Justification

For the "Medical Reservations" application, Supabase was selected for offering the perfect balance between power and ease of use. Being built on PostgreSQL, it allows complex queries and table relationships that are essential for managing medical appointments, patients, doctors, and schedules. The Supabase JS library integrates natively with React Native, providing a smooth development experience with production-ready authentication and real-time capabilities that enable instant notifications when there are changes in reservations.

#### Project Benefits

- Native SQL for complex medical availability and schedule queries
- Integrated authentication that accelerates user system development
- Real-time capabilities to immediately notify reservation changes
- Generous free plan ideal for university project development
- Open source that allows future migration if needed
- Automatic TypeScript types generation that reduces code errors

---

## Versión en Español

**Add description of cloud database service and justification #6**
  
**Autor:** Diego Sanchez Martinez  
**Fecha:** 05 de octubre de 2025

---

### SERVICIO DE BASE DE DATOS EN LA NUBE: SUPABASE

#### Descripción General

Supabase es una plataforma de backend como servicio (BaaS) que proporciona una base de datos PostgreSQL totalmente administrada, junto con características como autenticación, almacenamiento y APIs automáticas. Funciona como una alternativa open source a Firebase, combinando la potencia de una base de datos relacional tradicional con la escalabilidad y facilidad de uso de los servicios en la nube modernos.

- **Nombre:** Supabase
- **Proveedor:** Supabase Inc. (plataforma open source)
- **Tipo de base de datos:** PostgreSQL relacional con API REST y capacidades en tiempo real

#### Características Principales

- Base de datos PostgreSQL con escalado automático y backups integrados
- API REST generada automáticamente a partir del esquema de base de datos
- Suscripciones en tiempo real mediante WebSockets para datos actualizados al instante
- Sistema de autenticación integrado con múltiples proveedores (email, Google, GitHub, etc.)
- Almacenamiento de archivos con políticas de seguridad granulares
- Interface de dashboard intuitiva para administración y monitoreo
- Generación automática de tipos TypeScript para desarrollo más seguro

#### Justificación Técnica

Para la aplicación "Reservas Médicas", Supabase fue seleccionado por ofrecer el equilibrio perfecto entre potencia y facilidad de uso. Al estar construido sobre PostgreSQL, permite realizar consultas complejas y relaciones entre tablas que son esenciales para gestionar citas médicas, pacientes, doctores y horarios. La biblioteca Supabase JS se integra nativamente con React Native, proporcionando una experiencia de desarrollo fluida con autenticación lista para producción y capacidades de tiempo real que permiten notificaciones instantáneas cuando hay cambios en las reservas.

#### Beneficios para el Proyecto

- SQL nativo para consultas complejas de disponibilidad médica y horarios
- Autenticación integrada que acelera el desarrollo del sistema de usuarios
- Capacidades de tiempo real para notificar cambios en reservas inmediatamente
- Plan gratuito generoso ideal para el desarrollo universitario del proyecto
- Código abierto que permite migración futura si es necesario
- Generación automática de tipos TypeScript que reduce errores en el código

#### Referencias Bibliográficas

1. Documentación de Supabase. (2024). *Guía de Inicio con Supabase*. Recuperado de https://supabase.com/docs
2. Repositorio GitHub de Supabase. (2024). *Librería Cliente Supabase JS*. Recuperado de https://github.com/supabase/supabase-js
3. Documentación de PostgreSQL. (2024). *Documentación Oficial de PostgreSQL*. Recuperado de https://www.postgresql.org/docs/