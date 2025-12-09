# Informe de Investigación: Paradigmas de Programación y Diseño de Lenguajes

**Universidad Nacional Experimental de Guayana (UNEG)**
**Asignatura:** Lenguaje y Compiladores (2025-II)
**Tema 2:** Los lenguajes de programación

## 📋 Descripción del Proyecto

Este repositorio contiene los códigos fuente y recursos asociados a la Asignación II. El proyecto se divide en dos partes fundamentales:

1.  **Comparativa de Rendimiento:** Implementación de un algoritmo de cálculo intensivo (Números Primos) en **C++**, **Rust** y **Haskell** para comparar tiempos de ejecución y sintaxis.
2.  **Propuesta de Lenguaje (DomoticScript):** Diseño e implementación de un intérprete para un Lenguaje de Dominio Específico (DSL) orientado a la automatización de edificios y sistemas de seguridad.

---

## 👥 Integrantes del Grupo

- **Julio Suarez** - C.I: V-31.074.002
- **Daniel Mata** - C.I: V-30.810.393
- **Gabriel Hernandez** - C.I: V-30.831.045
- **Heirismar Marcano** - C.I: V-30.809.973

---

Propuesta de Lenguaje "DomoticScript"

DomoticScript es una propuesta de Lenguaje de Dominio Específico (DSL) que permite a operarios configurar sistemas automatizados mediante comandos legibles, cumpliendo con los requisitos del "Problema A" (Interfaz Hombre-Máquina).

Características del Lenguaje
Sintaxis: Clara y basada en palabras clave en español (SI, ENTONCES, ACTIVAR, AJUSTAR).

Capacidades: Lectura de sensores simulados, activación de actuadores, bucles y toma de decisiones lógica.

Arquitectura: Intérprete desarrollado en JavaScript (Node.js) que lee archivos de script externos.

💻 Cómo ejecutar el Intérprete
El intérprete se ejecuta sobre Node.js y requiere pasar como argumento la ruta del archivo .txt que contiene el código DomoticScript.

Sintaxis:

Bash

node interprete.js <archivo_codigo.txt>

🧪 Casos de Prueba Disponibles

El repositorio incluye archivos .txt listos para probar los escenarios exigidos:

1. Control de Bombas (Water Pump - Requisito UNEG) Controla bombas basado en niveles de tanque y temperatura del motor.

Bash

node interprete.js tanques.txt 2. Protocolo de Incendio Detección de humo, activación de rociadores y desbloqueo de puertas.

Bash

node interprete.js incendio.txt 3. Oficina Inteligente Ajuste de termostatos y luces para eficiencia energética.

Bash

node interprete.js oficina.txt
📂 Estructura del Repositorio
.
├── interprete.js # Motor del intérprete DomoticScript (Node.js)
├── tanques.txt # Script de prueba: Caso Water Pump
├── incendio.txt # Script de prueba: Caso Seguridad
├── oficina.txt # Script de prueba: Caso Confort
├── primos.cpp # Código de prueba de rendimiento en C++
├── primos.rs # Código de prueba de rendimiento en Rust
├── primos.hs # Código de prueba de rendimiento en Haskell
├── Informe.pdf # Informe académico detallado (Investigación y Análisis)
└── README.md # Documentación del repositorio
