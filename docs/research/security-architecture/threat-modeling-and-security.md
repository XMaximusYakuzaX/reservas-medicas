# Threat Modeling and Security by Design

**Author:** Diego Sánchez Martínez
**Date:** 16/10/2025

---

## 1. Introduction

This document presents a technical overview of **Threat Modeling and Security by Design** principles, focusing on the application of **STRIDE** and **DREAD** methodologies to identify actors, assets, and attack vectors. Additionally, it analyzes the implementation of **Zero Trust Architecture (ZTA)** and **Role-Based Access Control (RBAC)** in enterprise mobile applications.

---

## 2. Threat Modeling Methodologies

### 2.1 STRIDE Model

**Definition:** STRIDE is a framework developed by Microsoft to classify and analyze potential threats in a system.  
It stands for **Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, and Elevation of Privilege**.

|          **Category**           |              **Description**               |                  **Example**                   |
| :-----------------------------: | :----------------------------------------: | :--------------------------------------------: |
|        **S - Spoofing**         |    Impersonation of a user or process.     |        Forged JWT tokens or fake login.        |
|        **T - Tampering**        | Unauthorized modification of data or code. | Altering data in transit through MITM attacks. |
|       **R - Repudiation**       |      Denying an action without proof.      |         Lack of audit trails or logs.          |
| **I - Information Disclosure**  |  Unauthorized exposure of sensitive data.  | Leaked API responses containing personal data. |
| **D - Denial of Service (DoS)** |   Making a system unavailable to users.    |        Flooding endpoints with traffic.        |
| **E - Elevation of Privilege**  |     Gaining unauthorized permissions.      |     Exploiting a bug to get admin access.      |

---

### 2.2 DREAD Model

**Definition:** DREAD is a risk assessment model that helps quantify and prioritize vulnerabilities based on five factors: **Damage, Reproducibility, Exploitability, Affected Users, and Discoverability**.

|      **Factor**      |         **Description**         | **Scoring (1–10)**               |
| :------------------: | :-----------------------------: | :------------------------------- |
| **Damage Potential** |  Impact severity if exploited.  | 1 = Low, 10 = Critical           |
| **Reproducibility**  | Ease of reproducing the attack. | 1 = Hard, 10 = Easy              |
|  **Exploitability**  |    Required effort or skill.    | 1 = High effort, 10 = Low effort |
|  **Affected Users**  |  Percentage of impacted users.  | 1 = Few, 10 = All                |
| **Discoverability**  |   Likelihood of being found.    | 1 = Hidden, 10 = Obvious         |

The average score from these categories determines the overall threat priority.

---

## 3. Security by Design: Zero Trust and RBAC

### 3.1 Zero Trust Architecture (ZTA)

**Concept:**  
Zero Trust assumes that no entity—internal or external—should be automatically trusted.  
Verification is mandatory for every access request, minimizing attack surfaces and lateral movement within a system.

**Core Principles:**

- **Never trust, always verify.**
- **Enforce least privilege access.**
- **Continuously monitor and log activity.**
- **Segment networks and isolate workloads.**

**Implementation Example in Mobile Environments:**

- Authentication with short-lived JWTs.
- Verification through device and user posture.
- Integration with Multi-Factor Authentication (MFA).

---

### 3.2 Role-Based Access Control (RBAC)

**Definition:**  
RBAC defines access permissions based on organizational roles rather than individual users, improving consistency and compliance.

**Benefits:**

- Simplifies authorization management.
- Reduces security misconfigurations.
- Supports regulatory compliance (e.g., ISO 27001, HIPAA).

|   **Role**   |                  **Permissions**                  |
| :----------: | :-----------------------------------------------: |
|  **Admin**   | Full access, user management, and configurations. |
| **Manager**  |        View reports and approve requests.         |
| **Employee** |           Access assigned modules only.           |

---

## 4. Summary

By integrating **STRIDE** and **DREAD**, teams can identify threats systematically and prioritize mitigation actions.  
Combining these with **Zero Trust** and **RBAC** principles ensures that applications are built on secure foundations—minimizing vulnerabilities while maintaining usability and compliance.

---

## 5. References

- [Microsoft STRIDE Threat Model](https://learn.microsoft.com/en-us/security/engineering/threat-modeling-tool-threats)
- [OWASP Threat Modeling](https://owasp.org/www-community/Threat_Modeling)
- [Microsoft DREAD Risk Rating](https://learn.microsoft.com/en-us/archive/blogs/sdl/dreadful)
- [NIST Zero Trust Architecture (SP 800-207)](https://csrc.nist.gov/publications/detail/sp/800-207/final)
- [NIST RBAC Standard](https://csrc.nist.gov/projects/role-based-access-control)

---

# Modelado de Amenazas y Seguridad desde el Diseño

**Autor:** Diego Sánchez Martínez
**Fecha:** 16/10/2025

---

## 1. Introducción

Este documento presenta una visión técnica sobre los principios de **Modelado de Amenazas y Seguridad desde el Diseño**, aplicando los métodos **STRIDE** y **DREAD** para identificar actores, activos y vectores de ataque.  
Además, analiza los marcos de **Arquitectura de Confianza Cero (Zero Trust)** y la implementación de **Control de Acceso Basado en Roles (RBAC)** en aplicaciones móviles empresariales.

---

## 2. Metodologías de Modelado de Amenazas

### 2.1 Modelo STRIDE

**Definición:**  
STRIDE es un marco desarrollado por Microsoft para clasificar y analizar amenazas potenciales en un sistema.  
Su nombre proviene de las siglas: **Suplantación, Manipulación, Repudio, Divulgación de Información, Denegación de Servicio y Elevación de Privilegios**.

|           **Categoría**            |               **Descripción**                |                    **Ejemplo**                    |
| :--------------------------------: | :------------------------------------------: | :-----------------------------------------------: |
|  **S - Suplantación (Spoofing)**   |    Impersonación de usuarios o procesos.     |      Tokens JWT falsificados o fraudulento.       |
|        **T - Manipulación**        |     Modificación no autorizada de datos.     |    Alteración de datos mediante ataques MITM.     |
|   **R - Repudio (Repudiation)**    |    Negación de una acción sin evidencia.     |         Falta de registros o auditorías.          |
| **I - Divulgación de Información** | Exposición no autorizada de datos sensibles. |     Respuestas API con información personal.      |
|   **D - Denegación de Servicio**   | Saturación que impide acceso a los usuarios. |            Ataques de tráfico masivo.             |
|  **E - Elevación de Privilegios**  |    Obtención de permisos no autorizados.     | Explotar errores para acceder como administrador. |

---

### 2.2 Modelo DREAD

**Definición:**  
DREAD es un modelo de evaluación de riesgos que ayuda a cuantificar y priorizar vulnerabilidades con base en cinco factores: **Daño, Reproducibilidad, Explotabilidad, Usuarios Afectados y Descubribilidad**.

|       **Factor**       |            **Descripción**            |           **Escala (1–10)**           |
| :--------------------: | :-----------------------------------: | :-----------------------------------: |
|   **Daño Potencial**   | Severidad del impacto si se explota.  |        1 = Bajo, 10 = Crítico         |
|  **Reproducibilidad**  | Facilidad para reproducir el ataque.  |        1 = Difícil, 10 = Fácil        |
|   **Explotabilidad**   |    Esfuerzo o habilidad necesaria.    | 1 = Alto esfuerzo, 10 = Bajo esfuerzo |
| **Usuarios Afectados** | Porcentaje de usuarios comprometidos. |         1 = Pocos, 10 = Todos         |
|  **Descubribilidad**   |    Probabilidad de ser detectado.     |       1 = Oculto, 10 = Evidente       |

El promedio de estas categorías determina la prioridad de mitigación.

---

## 3. Seguridad desde el Diseño: Confianza Cero y RBAC

### 3.1 Arquitectura de Confianza Cero (Zero Trust)

**Concepto:**  
La confianza cero asume que ningún actor —interno o externo— debe considerarse confiable por defecto.  
Cada solicitud debe verificarse antes de conceder acceso, reduciendo la superficie de ataque y los movimientos laterales.

**Principios Clave:**

- **Nunca confíes, siempre verifica.**
- **Aplica privilegios mínimos.**
- **Monitorea y registra de forma continua.**
- **Segmenta la red y aísla las cargas de trabajo.**

**Ejemplo en entornos móviles:**

- Autenticación con tokens de corta duración.
- Validación del dispositivo y del usuario.
- Integración con autenticación multifactor (MFA).

---

### 3.2 Control de Acceso Basado en Roles (RBAC)

**Definición:**  
RBAC asigna permisos en función de los roles dentro de una organización, en lugar de usuarios individuales, garantizando coherencia y cumplimiento.

**Beneficios:**

- Simplifica la gestión de autorizaciones.
- Reduce errores de configuración.
- Favorece el cumplimiento normativo (p. ej. ISO 27001, HIPAA).

|      **Rol**      |                    **Permisos**                    |
| :---------------: | :------------------------------------------------: |
| **Administrador** | Acceso total, gestión de usuarios y configuración. |
|    **Gerente**    | Consulta de reportes y aprobación de solicitudes.  |
|   **Empleado**    |          Acceso solo a módulos asignados.          |

---

## 4. Resumen

Integrar **STRIDE** y **DREAD** permite identificar amenazas de forma estructurada y priorizar acciones de mitigación.  
Junto con **Confianza Cero** y **RBAC**, se garantiza que las aplicaciones se desarrollen con un enfoque preventivo, minimizando riesgos sin afectar la experiencia del usuario.

---

## 5. Referencias

- [Modelo STRIDE de Microsoft](https://learn.microsoft.com/es-es/security/engineering/threat-modeling-tool-threats)
- [Modelado de Amenazas OWASP](https://owasp.org/www-community/Threat_Modeling)
- [Evaluación DREAD de Microsoft](https://learn.microsoft.com/es-es/archive/blogs/sdl/dreadful)
- [Arquitectura de Confianza Cero - NIST SP 800-207](https://csrc.nist.gov/publications/detail/sp/800-207/final)
- [Estándar RBAC - NIST](https://csrc.nist.gov/projects/role-based-access-control)
