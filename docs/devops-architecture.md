## 4. Arquitectura de CI/CD y DevOps aplicada (Responsable: Mauro Morales Alta)

La arquitectura DevOps del proyecto **Reservas Médicas** se basa en la automatización, la integración continua y la entrega continua (CI/CD), garantizando que cada etapa del ciclo de desarrollo mantenga altos estándares de calidad, seguridad y trazabilidad.

### 4.1. Flujo general del pipeline
El proyecto implementa un flujo **GitHub Flow** con ramas temporales (`feat/`, `fix/`, `docs/`, `test/`) y Pull Requests hacia la rama `main`.  
Las acciones automáticas están definidas dentro de **GitHub Actions** mediante los siguientes workflows:

1. **Quality Check (`.github/workflows/quality.yml`)**
   - Se ejecuta en cada *pull request* hacia `main`.
   - Valida la calidad del código con:
     - `npm run format:check` → Verifica formato con **Prettier**.
     - `npm run lint:check` → Analiza estilo y errores con **ESLint**.
     - Validación de títulos de PR con **Conventional Commits**.
   - Asegura que ningún código inseguro o mal formateado llegue al repositorio principal.

2. **Semantic Release (`.github/workflows/semantic-release.yml`)**
   - Se activa en cada *push* a `main`.
   - Automatiza la creación de versiones semánticas (vX.Y.Z).
   - Genera changelogs y etiquetas de versión basadas en commits tipo *feat*, *fix*, *docs*, etc.
   - Publica releases automáticamente, garantizando trazabilidad continua.

### 4.2. Herramientas y prácticas de DevSecOps
- **Husky + Lint-Staged + Commitlint:** Evitan commits inseguros o con formato incorrecto antes de subir código.
- **Dependabot & npm audit:** Escanean dependencias vulnerables para prevenir riesgos en tiempo de desarrollo.
- **SAST (Static Analysis):** Se integra ESLint como primer control de análisis estático, con potencial expansión a SonarQube o CodeQL.
- **DAST (Dynamic Testing):** Planeado para automatizarse en el pipeline con OWASP ZAP, enlazando los resultados a los issues de seguridad.

### 4.3. Mejores prácticas 2025 integradas
- **Shift-Left Testing:** pruebas de calidad, formato y seguridad ejecutadas desde las primeras etapas del desarrollo.
- **Infraestructura como Código (IaC):** definición de entornos controlados (por ejemplo, `supabase` y `backend/express`) gestionados mediante configuración reproducible.
- **Despliegue continuo seguro:** automatización mediante ramas estables y *releases* controladas.
- **Auditoría automatizada:** los pipelines dejan trazabilidad total de cada cambio (autor, versión, commit, resultado del workflow).

### 4.4. Beneficios obtenidos
- **Integridad:** cada release pasa por validaciones automáticas antes de ser publicada.
- **Seguridad:** los hooks y linters previenen malas prácticas y código vulnerable.
- **Cumplimiento:** las prácticas DevSecOps se alinean con estándares de 2025 (OWASP, NIST SP 800-207, ISO/IEC 27001).
- **Escalabilidad:** la arquitectura es extensible para incluir pruebas SAST/DAST y despliegues progresivos (blue-green o canary).

---