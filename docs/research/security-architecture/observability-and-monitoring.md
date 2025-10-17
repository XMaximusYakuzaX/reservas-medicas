# Observabilidad y monitorización

**Author:** Cesar Misael García Lopez  
**Date:** 16/10/2025

## Monitoreo

El monitoreo es el proceso de recopilar datos sobre métricas específicas para supervisar el estado y el rendimiento de los sistemas y aplicaciones.

- **Enfoque:** Recopila datos predeterminados, como el uso de CPU, la memoria o el tiempo de respuesta, para evaluar si un sistema funciona como se espera.
- **Capacidad de respuesta:** Es una práctica reactiva que alerta a los equipos cuando se cruzan umbrales predefinidos, indicando un problema conocido.
- **Preguntas que responde:** Responde a la pregunta "¿está funcionando mi sistema?".
- **Limitaciones:** En sistemas distribuidos complejos, el monitoreo tradicional puede no ser suficiente para identificar la causa raíz de problemas inesperados, ya que solo observa los componentes individualmente.

## Observabilidad

La observabilidad es la capacidad de inferir el estado interno de un sistema a partir de sus salidas externas, lo que permite una exploración profunda y la resolución de problemas desconocidos.

- **Enfoque:** Utiliza los datos de telemetría (logs, métricas y trazas) para correlacionar eventos aparentemente no relacionados, comprender el comportamiento del sistema e identificar la causa raíz de los problemas.
- **Capacidad de respuesta:** Es una práctica proactiva que ayuda a predecir problemas analizando tendencias y patrones, permitiendo tomar medidas preventivas.
- **Preguntas que responde:** Responde a la pregunta "¿por qué no funciona mi sistema?".
- **Colaboración:** Fomenta una responsabilidad compartida entre los equipos de desarrollo y operaciones (DevOps), ya que los desarrolladores instrumentan las aplicaciones para generar los datos necesarios.

## Los Tres Pilares de la Observabilidad: Métricas, Logs y Trazas

1. **Métricas:** Son medidas numéricas de un sistema en un punto específico en el tiempo. Son ideales para responder preguntas como "¿Qué está pasando?".
   - *Ejemplo en móvil:* Tasa de frames por segundo (FPS), uso de memoria RAM de la app, porcentaje de fallos (crash rate), latencia de API, número de usuarios activos.

2. **Logs:** Son eventos discretos con una marca de tiempo que describen lo que sucedió en el sistema. Son ideales para responder "¿Por qué pasó?".
   - *Ejemplo en móvil:* Excepción NullPointerException en la pantalla de perfil, log de la respuesta JSON de una API, mensaje de depuración al abrir un archivo.

3. **Trazas (Traces):** Representan el recorrido de una sola solicitud a través de múltiples servicios. Son ideales para responder "¿Cuál fue el camino y dónde estuvo el cuello de botella?".
   - *Ejemplo en móvil:* El viaje de un "tap" en el botón "Comprar" a través de la app, el gateway de pago, el microservicio de inventario y la base de datos.

## Herramientas más usadas

| Herramienta | Tipo de Herramienta | Función Principal | ¿Qué dato maneja? | Rol en el Ecosistema Móvil | Ejemplo de Uso en Móvil |
|-------------|---------------------|-------------------|-------------------|----------------------------|-------------------------|
| **OpenTelemetry (OTel)** | SDK / Estándar (No es un backend) | Instrumentación y Exportación de datos. Proporciona APIs y librerías para generar y enviar telemetría de forma estandarizada. | Métricas, Trazas y Logs (los tres pilares). | Se integra directamente en el código de la app móvil para recolectar datos de forma unificada. Es el "cómo" se recoge la data. | Instrumentar una solicitud de red para medir su latencia y crear una traza de la transacción "Abrir Perfil de Usuario". |
| **Prometheus** | Base de Datos / Recolector | Almacenamiento y consulta de métricas numéricas. Recoge, almacena y permite consultar (con PromQL) datos de series de tiempo. | Métricas (exclusivamente). | Recibe las métricas exportadas por el Collector de OTel (ej: tasa de crashes, uso de memoria, latencia de API). | Almacenar la métrica `app_crash_total` para calcular la tasa de fallos y trigger de alertas. |
| **ELK Stack** | Plataforma de Análisis | Ingestión, almacenamiento y búsqueda de datos logísticos. Es la solución clásica y poderosa para el análisis de logs. | Logs (su especialidad principal). | Recibe los logs estructurados (ej. errores, excepciones, eventos de negocio) exportados por el Collector de OTel. | Buscar todos los logs que contengan "NullPointerException" en la versión 2.1.0 de la app para priorizar un hotfix. |
| **Grafana** | Herramienta de Visualización | Visualización y agregación de datos en paneles (dashboards). No almacena datos, se conecta a otras fuentes. | Métricas, Logs, Trazas (de cualquier fuente). | Une todo. Crea paneles unificados conectándose a Prometheus (métricas), ELK (logs) y otros backends para dar una visión 360º de la salud de la app. | Mostrar en un solo panel: tasa de crashes (de Prometheus), logs de error recientes (de Elasticsearch) y latencia del servicio (de Prometheus). |

## Configuración de alertas y paneles para detección de anomalías y análisis en tiempo real

### 1. OpenTelemetry: La Base de la Instrumentación

**No configura alertas directamente, sino que genera las señales que las activarán.**

**Configuración en Código Móvil (Ejemplo Android/Kotlin):**

```kotlin
// 1. Configuración del SDK de OpenTelemetry
val openTelemetry = OpenTelemetrySdk.builder()
    .setMeterProvider(meterProvider)
    .setTracerProvider(tracerProvider)
    .build()

// 2. Crear un medidor para métricas
val meter = openTelemetry.meterBuilder("com.yourapp.mobile")
    .setInstrumentationVersion("1.0.0")
    .build()

// 3. Definir métricas clave para anomalías
val crashCounter = meter.counterBuilder("app.crashes")
    .setDescription("Número de caídas de la aplicación")
    .setUnit("1")
    .build()

val apiLatencyHistogram = meter.histogramBuilder("api.latency")
    .setDescription("Latencia de las llamadas API")
    .setUnit("ms")
    .build()

// 4. Instrumentar una llamada API
fun callUserProfileApi(userId: String) {
    val tracer = openTelemetry.tracer("api_tracer")
    val span = tracer.spanBuilder("GET /user/profile").startSpan()
    
    try {
        val startTime = System.currentTimeMillis()
        // Llamada real a la API...
        val duration = System.currentTimeMillis() - startTime
        
        // Registrar latencia
        apiLatencyHistogram.record(duration.toDouble(), 
            Attributes.of(
                AttributeKey.stringKey("api.endpoint"), "/user/profile",
                AttributeKey.stringKey("http.status"), "200"
            ))
            
    } catch (e: Exception) {
        crashCounter.add(1, Attributes.of(
            AttributeKey.stringKey("exception.type"), e.javaClass.simpleName
        ))
        span.recordException(e)
        throw e
    } finally {
        span.end()
    }
}