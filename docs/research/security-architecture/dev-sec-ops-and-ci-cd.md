# Shift-Left Security with SAST, DAST, and SCA

**Author:** Edgar Alejandro Cruz Fajardo  
**Date:** October 16, 2025

---

## Shift-Left Security with SAST, DAST, and SCA

_Shift-left_ security means integrating security controls early in the software development lifecycle, ideally during the coding and build phases.

- **SAST (Static Application Security Testing):** Analyzes source code or binaries at build time to detect vulnerabilities before runtime. Helps identify security issues early, during development or pull requests.
- **DAST (Dynamic Application Security Testing):** Tests running applications (usually in staging environments) to identify vulnerabilities from an external attacker’s perspective. Runs after deployment to assess live behavior.
- **SCA (Software Composition Analysis):** Scans software dependencies to detect known vulnerabilities in third-party and open-source components.

Integrating these controls into the CI/CD pipeline automates security checks, allowing developers to detect and fix vulnerabilities earlier and more cost-effectively.

---

## GitOps and Infrastructure as Code (IaC)

**GitOps** is a modern DevOps practice that uses Git repositories as the single source of truth for everything — application code, infrastructure configuration, and operational procedures.

- The entire system state is declared declaratively and stored in Git.
- Changes are automatically applied to keep environments in sync with the repository.
- This approach enhances traceability, reliability, and simplifies rollbacks.

**Key IaC Tools:**

- **Terraform:** Manages multi-cloud infrastructure using HashiCorp Configuration Language (HCL), efficiently handling state and dependencies.
- **AWS CloudFormation:** AWS-native IaC tool that uses JSON or YAML to define and manage resources with deep AWS integration.
- **ArgoCD & Flux:** Kubernetes GitOps tools that continuously synchronize the cluster state with Git. ArgoCD provides a rich UI and multi-cluster support, while Flux is lightweight and extensible.

---

## Progressive Delivery Strategies

These strategies enable safe deployments by limiting exposure and allowing quick rollback if needed:

- **Blue-Green Deployment:** Two identical environments (blue and green); traffic switches to the new one after validation, minimizing downtime.
- **Canary Releases:** Gradual rollout to a small subset of users while monitoring performance and errors before full release.
- **Feature Flags:** Enable or disable features dynamically for specific user segments without redeploying code.

---

## Deployment Orchestration Tools

Orchestration tools automate and manage deployment workflows and platform configurations.

**Main Example:**

- **Cloudomation Engine:** A Python-based platform for integrating, monitoring, and orchestrating multi-technology workflows.

#### Deployment and Workflow Orchestration Tools

- **AWS Step Functions:** Serverless service that coordinates AWS services using state machines, ideal for event-driven architectures and complex ETL workflows.
- **Google Cloud Composer:** Based on Apache Airflow, used to orchestrate complex workflows in data engineering and ML pipelines.
- **Apache Mesos:** Orchestrates containers, virtual machines, and distributed applications at scale, supporting custom solutions.
- **Kubernetes:** The standard container orchestration platform that automates deployment, scaling, and operations.
- **Docker Swarm:** Docker’s native lightweight orchestrator, suitable for small to medium deployments.

### CI/CD and Automation Orchestration Tools

- **Jenkins:** Highly extensible CI/CD tool with a vast plugin ecosystem for automating builds, testing, and deployments.
- **CircleCI:** Cloud-native CI/CD platform supporting multiple operating systems and flexible pipelines.
- **GitLab CI/CD:** Integrated into GitLab, providing complete pipelines from code to deployment with detailed tracking.
- **Spinnaker:** Multi-cloud deployment orchestrator supporting advanced strategies like blue-green and canary releases, enabling safer version management.
- **Ansible:** Agentless automation tool for configuration management and orchestration of complex workflows.

These tools cover everything from cloud infrastructure orchestration to full CI/CD pipeline automation, enabling robust, secure, and efficient DevOps practices.

---

# Seguridad Shift-Left con SAST, DAST y SCA

**Autor:** Edgar Alejandro Cruz Fajardo  
**Fecha:** 16 de octubre de 2025

---

## Seguridad Shift-Left con SAST, DAST y SCA

La seguridad _shift-left_ consiste en integrar controles de seguridad desde las primeras etapas del ciclo de vida del desarrollo de software, especialmente durante las fases de codificación y construcción.

- **SAST (Pruebas de Seguridad de Aplicaciones Estáticas):** Analiza el código fuente o los binarios en tiempo de compilación para detectar vulnerabilidades antes del tiempo de ejecución. Permite encontrar problemas de seguridad de manera temprana, durante el desarrollo o en las _pull requests_.
- **DAST (Pruebas de Seguridad de Aplicaciones Dinámicas):** Evalúa aplicaciones en ejecución (generalmente en entornos de _staging_) para identificar vulnerabilidades desde la perspectiva de un atacante externo. Se ejecuta tras la implementación para probar el comportamiento real.
- **SCA (Análisis de Composición de Software):** Examina las dependencias del software para identificar vulnerabilidades conocidas en bibliotecas de terceros y componentes de código abierto.

Integrar estos controles en la canalización CI/CD permite automatizar la seguridad, ayudando a los desarrolladores a detectar y corregir vulnerabilidades de forma más temprana y rentable.

---

## GitOps e Infraestructura como Código (IaC)

**GitOps** es una práctica moderna de DevOps que utiliza repositorios Git como fuente única de verdad para todo: código de aplicación, configuración de infraestructura y procedimientos operativos.

- Todo el estado del sistema se define de forma declarativa y se almacena en Git.
- Los cambios se aplican automáticamente para mantener los entornos sincronizados con el repositorio.
- Este enfoque mejora la trazabilidad, confiabilidad y facilita las reversiones.

**Herramientas destacadas de IaC:**

- **Terraform:** Gestiona infraestructura multi-nube con el lenguaje HCL de HashiCorp, manteniendo el estado de forma eficiente.
- **AWS CloudFormation:** Herramienta nativa de AWS que utiliza JSON o YAML para definir y gestionar recursos con integración directa.
- **ArgoCD & Flux:** Herramientas de GitOps para Kubernetes que sincronizan el estado del clúster con Git. ArgoCD ofrece una interfaz visual avanzada; Flux es más liviano y extensible.

---

## Estrategias de Entrega Progresiva

Estas estrategias permiten implementar actualizaciones de forma segura, limitando la exposición y facilitando una rápida reversión en caso de fallos:

- **Implementación Blue-Green:** Dos entornos idénticos (azul y verde); el tráfico se cambia al nuevo entorno tras su validación, reduciendo el tiempo de inactividad.
- **Lanzamientos Canary:** Despliegue gradual hacia un subconjunto reducido de usuarios, monitoreando métricas antes del lanzamiento total.
- **Feature Flags:** Activan o desactivan funcionalidades dinámicamente para grupos específicos de usuarios sin necesidad de reimplementar código.

---

## Herramientas de Orquestación de Implementaciones

Las herramientas de orquestación automatizan y gestionan flujos de trabajo de implementación y configuración de plataformas.

**Ejemplo principal:**

- **Cloudomation Engine:** Plataforma basada en Python que permite integrar, monitorizar y orquestar flujos multi-tecnología.

### Herramientas de orquestación de despliegue y flujo de trabajo

- **AWS Step Functions:** Coordina servicios de AWS mediante máquinas de estado, ideal para flujos ETL y arquitecturas orientadas a eventos.
- **Google Cloud Composer:** Basado en Apache Airflow, facilita la orquestación de flujos de trabajo complejos en ingeniería de datos y _ML pipelines_.
- **Apache Mesos:** Orquesta contenedores y máquinas virtuales a gran escala, permitiendo soluciones personalizadas.
- **Kubernetes:** Estándar de orquestación de contenedores, automatiza despliegue, escalado y operación.
- **Docker Swarm:** Alternativa ligera y nativa de Docker, ideal para despliegues medianos.

#### Herramientas de orquestación CI/CD y automatización

- **Jenkins:** Amplia comunidad y ecosistema de plugins para automatizar compilaciones, pruebas y despliegues.
- **CircleCI:** Plataforma nativa en la nube con soporte multi-OS y pipelines flexibles.
- **GitLab CI/CD:** Integrada en GitLab, cubre el ciclo completo desde el código hasta el despliegue.
- **Spinnaker:** Orquestador multi-nube que facilita estrategias como _blue-green_ y _canary_, con fuerte control de versiones.
- **Ansible:** Automatiza configuración y orquestación sin necesidad de agentes, ideal para flujos complejos.

Estas herramientas abarcan desde la orquestación de infraestructura hasta la automatización completa del pipeline CI/CD, permitiendo prácticas DevOps robustas, seguras y eficientes.

---

## Fuentes / Sources

- [Tripwire – Shifting Left: SAST, DAST and SCA Best Practices](https://www.tripwire.com/state-of-security/shifting-left-sast-dast-and-sca-advanced-best-practices)
- [Codefresh – Learn GitOps](https://codefresh.io/learn/gitops/)
- [Spacelift – Terraform vs CloudFormation](https://spacelift.io/blog/terraform-vs-cloudformation)
- [Earthly – Flux vs Argo CD](https://earthly.dev/blog/Flux-vs-Argo-CD/)
- [Fiveable – Blue-Green Deployments & Canary Releases](https://fiveable.me/devops-and-continuous-integration/unit-7/blue-green-deployments-canary-releases-feature-flags/study-guide/KPlobygUjKUSiwZo)
- [Cloudomation Blog – Orchestration Tools](https://cloudomation.com/cloudomation-blog/best-platform-orchestration-tools/)
- [Upwind.io – Shift-Left Security](https://www.upwind.io/glossary/shift-left-security)
- [Spot.io – Understanding GitOps Principles](https://spot.io/resources/gitops/understanding-gitops-principles-workflows-deployment-types/)
- [Datacamp – Cloud Orchestration Tools](https://www.datacamp.com/es/blog/cloud-orchestration-tools)
- [Atlassian – CI/CD Tools](https://www.atlassian.com/es/devops/devops-tools/cicd-tools)
