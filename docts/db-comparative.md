# Comparativa: Firebase vs. AWS Amplify vs. Supabase

Esta tabla presenta una comparación entre tres servicios populares de backend en la nube utilizados para el desarrollo de aplicaciones modernas.  
El objetivo es ayudar a los desarrolladores a elegir la opción más adecuada según sus necesidades de escalabilidad, integración, costo y soporte.

| Criterio | **Firebase** | **AWS Amplify** | **Supabase** |
|-----------|---------------|------------------|---------------|
| **Proveedor** | Google Cloud Platform | Amazon Web Services | Open Source (basado en PostgreSQL) |
| **Base de datos principal** | Firestore (NoSQL) / Realtime DB | Amazon DynamoDB / Aurora | PostgreSQL |
| **Facilidad de integración** | Muy sencilla, SDK y CLI bien documentados | Integración sólida con el ecosistema AWS, pero más compleja | Integración sencilla con APIs REST y cliente JS |
| **Escalabilidad** | Alta, administrada automáticamente por Google | Muy alta, con control avanzado sobre recursos AWS | Escalable, aunque depende del hosting y configuración |
| **Costo** | Plan gratuito generoso, pero puede escalar rápido en costo | Pago por uso según servicios de AWS | Plan gratuito generoso y precios transparentes |
| **Autenticación** | Firebase Auth con soporte para Google, Facebook, Email, etc. | Amplify Auth (Cognito) con configuración avanzada | Supabase Auth basado en JWT con soporte social |
| **Almacenamiento de archivos** | Firebase Storage | S3 a través de Amplify Storage | Storage basado en buckets tipo S3 |
| **Seguridad** | Reglas de seguridad granulares (Firestore Rules) | IAM de AWS (muy robusto pero complejo) | Políticas de seguridad basadas en roles (RLS) |
| **Código abierto** | No | No | Sí, completamente open source |
| **Casos de uso recomendados** | Apps móviles/web en tiempo real, MVPs rápidos | Aplicaciones empresariales o integradas con otros servicios AWS | Proyectos que buscan independencia o auto-hospedaje |

---

## Conclusión

- **Firebase** es ideal para desarrollos rápidos con necesidades de tiempo real y despliegue sin complicaciones.  
- **AWS Amplify** ofrece más control, escalabilidad y seguridad empresarial, aunque con mayor complejidad.  
- **Supabase** destaca por su transparencia, bajo costo y modelo open source, ideal para proyectos con preferencia por PostgreSQL y autogestión.

---