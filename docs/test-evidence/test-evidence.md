# Evidence of Unit Test Execution – Issue #10

# Evidencia de Ejecución de Pruebas Unitarias – Issue #10

**Author/Autor:** Saul Israel Cid Dominguez
**Date/Fecha:** October 5, 2025
**Related Issue/Issue Relacionado:** #10

---

## 1. Note on Test Commands / Nota sobre los Comandos de Prueba

Two primary commands are used for testing within this project, and it is important to understand their specific purposes:

- `npm test`: This command is used for quick, local checks during development. Its main goal is to simply verify if the tests pass or fail, providing immediate feedback to the developer.
- `npm test -- --coverage`: This command is used to generate the final, formal evidence required for this issue. It not only runs all the tests but also creates a detailed code coverage report. This report (shown in the screenshot below) is crucial as it indicates the percentage of the application's code that was actually verified by the tests.

---

## 1. Nota sobre los Comandos de Prueba

Dos comandos principales se utilizan para las pruebas dentro de este proyecto, y es importante entender sus propósitos específicos:

- `npm test`: Este comando se usa para verificaciones rápidas y locales durante el desarrollo. Su objetivo principal es simplemente saber si las pruebas pasan o fallan, dando retroalimentación inmediata al programador.
- `npm test -- --coverage`: Este comando se usa para generar la evidencia formal y final que se requiere para este issue. No solo ejecuta todas las pruebas, sino que también crea el informe detallado de cobertura de código. Este informe (mostrado en la captura de pantalla a continuación) es crucial, ya que indica el porcentaje del código de la aplicación que fue realmente verificado por las pruebas.

---

## 2. Test Execution Results / Resultados de la Ejecución de Pruebas

**Status:** Completed. / **Estado:** Completado.

The following screenshot shows the successful execution of the test suite using the `npm test -- --coverage` command, including the final code coverage report.

A continuación, se muestra la captura de pantalla de la ejecución exitosa de la suite de pruebas utilizando el comando `npm test -- --coverage`, incluyendo el informe final de cobertura de código.

![Test Results / Resultados de las Pruebas](./docs/test-evidence/test_results.png)

![Test Evidence / Resultados de las Pruebas](./docs/test-evidence/coverage_report.png)

```eof

```
