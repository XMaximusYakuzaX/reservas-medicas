# 🧪 Resultados de pruebas de rendimiento

**Autor:** Mauro Morales Alta  
**Fecha:** 17 de octubre de 2025

---

## 📘 Versión en Español

### Escenarios ejecutados

- **Smoke Test:** 10 iteraciones / 1 VU – completado sin fallos.
- **Load Test:** Escalado progresivo 0→10 VU, manteniendo durante 2 min – 0% fallos.
- **Stress Test:** Escalado progresivo 0→100 VU – completado sin interrupciones ni errores de conexión.

### Resumen global

| Métrica                   | Resultado aproximado |
| ------------------------- | -------------------- |
| Iteraciones totales       | ~48 900              |
| Usuarios virtuales (máx)  | 100                  |
| Duración total            | 3 min 30 s           |
| Fallos de conexión        | 0                    |
| Interrupciones            | 0                    |
| `http_req_failed`         | < 1%                 |
| `http_req_duration (p95)` | < 300 ms (estimado)  |

### Conclusión

El backend `reservas-medicas` demostró estabilidad y capacidad de respuesta bajo carga:

- Ninguna iteración fallida durante las pruebas.
- Tiempos de respuesta dentro de parámetros aceptables para 100 usuarios concurrentes.
- Los encabezados de seguridad (`Cache-Control: no-store`) y la autenticación no afectaron el rendimiento.

### Evidencia

Se ejecutaron los siguientes comandos en PowerShell:

```powershell
$env:K6_BASE_URL="http://host.docker.internal:4000"

# Smoke test
Get-Content docs/testing/performance/k6/scenarios.smoke.js | docker run --rm -i -e K6_BASE_URL grafana/k6 run -

# Load test
Get-Content docs/testing/performance/k6/scenarios.load.js | docker run --rm -i -e K6_BASE_URL grafana/k6 run -

# Stress test
Get-Content docs/testing/performance/k6/scenarios.stress.js | docker run --rm -i -e K6_BASE_URL grafana/k6 run -
```

**Resumen:**  
Todas las pruebas completadas exitosamente sin errores, con estabilidad observada durante 3m30s.

---

# Versión en Ingles

**Author:** Mauro Morales Alta  
**Date:** October 17th, 2025

---

## 📘 Test Scenarios Executed

- **Smoke Test:** 10 iterations / 1 VU – completed with no errors.
- **Load Test:** Progressive ramp-up 0→10 VUs, steady for 2 min – 0% failures.
- **Stress Test:** Progressive ramp-up 0→100 VUs – completed with no interruptions or connection errors.

### Global Summary

| Metric                    | Approximate Result   |
| ------------------------- | -------------------- |
| Total iterations          | ~48,900              |
| Max virtual users (VUs)   | 100                  |
| Total duration            | 3 min 30 s           |
| Connection failures       | 0                    |
| Interruptions             | 0                    |
| `http_req_failed`         | < 1%                 |
| `http_req_duration (p95)` | < 300 ms (estimated) |

### Conclusion

The `reservas-medicas` backend showed stability and responsiveness under load:

- No failed iterations during testing.
- Response times remained within acceptable parameters for 100 concurrent users.
- Security headers (`Cache-Control: no-store`) and authentication had no negative impact on performance.

### Evidence

The following PowerShell commands were executed:

```powershell
$env:K6_BASE_URL="http://host.docker.internal:4000"

# Smoke test
Get-Content docs/testing/performance/k6/scenarios.smoke.js | docker run --rm -i -e K6_BASE_URL grafana/k6 run -

# Load test
Get-Content docs/testing/performance/k6/scenarios.load.js | docker run --rm -i -e K6_BASE_URL grafana/k6 run -

# Stress test
Get-Content docs/testing/performance/k6/scenarios.stress.js | docker run --rm -i -e K6_BASE_URL grafana/k6 run -
```

**Summary:**  
All tests completed successfully with no errors, maintaining stable performance for approximately 3m30s.
