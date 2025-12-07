class DomoticInterpreter {
  constructor() {
    // Simulación del estado de los sensores y dispositivos (Memoria)
    this.estado = {
      LUCES_SALA: 'OFF',
      AIRE_SALA: 'OFF',
      MOVIMIENTO_SALA: '0', // 0 es falso, 1 es verdadero
      TEMP_SERVER: 30,
      VENTILADOR_EMERGENCIA: 'OFF',
    }
  }

  // Función principal que recibe el código en texto
  ejecutar(codigo) {
    const lineas = codigo.split('\n')

    console.log('--- INICIANDO EJECUCIÓN DOMOTICSCRIPT ---')

    for (let i = 0; i < lineas.length; i++) {
      let linea = lineas[i].trim()
      if (!linea || linea.startsWith('//')) continue // Ignorar vacíos y comentarios

      this.procesarLinea(linea)
    }

    console.log('--- ESTADO FINAL DEL SISTEMA ---')
    console.log(this.estado)
  }

  procesarLinea(linea) {
    const partes = linea.split(' ')
    const comando = partes[0]

    // 1. Comandos de Acción Directa
    if (comando === 'ACTIVAR') {
      const dispositivo = partes[1]
      this.estado[dispositivo] = 'ON'
      console.log(`[ACCION] Activando ${dispositivo}`)
    } else if (comando === 'DESACTIVAR') {
      const dispositivo = partes[1]
      this.estado[dispositivo] = 'OFF'
      console.log(`[ACCION] Desactivando ${dispositivo}`)
    }

    // 2. Lógica Condicional Simple (SI ... ENTONCES ...)
    // Sintaxis soportada: SI (SENSOR == VALOR) ENTONCES ACTIVAR DISPOSITIVO
    else if (comando === 'SI') {
      // Esto es un parser muy básico usando regex para extraer partes
      // Busca patrón: SI (SENSOR operador VALOR) ENTONCES COMANDO_ACCION OBJETO
      const match = linea.match(/SI \((.*?) (==|>) (.*?)\) ENTONCES (.*?) (.*)/)

      if (match) {
        const sensor = match[1] // Ejemplo: LEER_SENSOR(MOVIMIENTO_SALA) -> limpiamos esto abajo
        const operador = match[2]
        const valorComparar = match[3]
        const accion = match[4]
        const objetivo = match[5]

        // Extraeoms el nombre real del sensor si viene como LEER_SENSOR(X)
        const nombreSensor = sensor.replace('LEER_SENSOR(', '').replace(')', '')
        const valorReal = this.estado[nombreSensor]

        // Evaluamos la condición
        let condicionCumplida = false
        if (operador === '==' && valorReal == valorComparar)
          condicionCumplida = true
        if (operador === '>' && valorReal > valorComparar)
          condicionCumplida = true

        if (condicionCumplida) {
          console.log(`[CONDICION] Verdadera: ${nombreSensor} es ${valorReal}`)
          // Llamada recursiva para ejecutar la acción de la derecha
          this.procesarLinea(`${accion} ${objetivo}`)
        } else {
          console.log(`[CONDICION] Falsa: ${nombreSensor} es ${valorReal}`)
        }
      }
    }
  }
}

const miCodigo = `
PROGRAMA
ACTIVAR LUCES_SALA
// Simulamos que detectamos movimiento (0 = no hay nadie)
SI (LEER_SENSOR(MOVIMIENTO_SALA) == 0) ENTONCES DESACTIVAR LUCES_SALA
SI (LEER_SENSOR(TEMP_SERVER) > 25) ENTONCES ACTIVAR VENTILADOR_EMERGENCIA
FIN_PROGRAMA
`

const codigoIncendio = `
PROGRAMA
// --- PROTOCOLO DE INCENDIO ---

// Si detecta humo (1 = Si), activa los rociadores de agua
SI (LEER_SENSOR(SENSOR_HUMO) == 1) ENTONCES ACTIVAR ROCIADORES_TECHO

// Si hay fuego, apaga el aire para no avivar las llamas
SI (LEER_SENSOR(SENSOR_HUMO) == 1) ENTONCES DESACTIVAR AIRE_CENTRAL

// Desbloquea las puertas para evacuación
SI (LEER_SENSOR(TEMPERATURA_SALA) > 45) ENTONCES ACTIVAR DESBLOQUEO_PUERTAS

ACTIVAR ALARMA_SONORA
FIN_PROGRAMA
`

const codigoTanques = `
PROGRAMA
// --- CONTROL DE BOMBAS DE AGUA ---

// Si el tanque principal está casi vacío (menos de 10 litros), llenar
SI (LEER_SENSOR(NIVEL_TANQUE_1) < 10) ENTONCES ACTIVAR BOMBA_PRINCIPAL

// Protección: Si el motor se calienta demasiado, apagarlo inmediatamente
SI (LEER_SENSOR(TEMP_MOTOR) > 90) ENTONCES DESACTIVAR BOMBA_PRINCIPAL

// Si hay presión en la tubería, abrir la válvula de paso
SI (LEER_SENSOR(PRESION_AGUA) > 50) ENTONCES ACTIVAR VALVULA_SALIDA

FIN_PROGRAMA
`

const codigoOficina = `
PROGRAMA
// --- RUTINA DE CONFORT MATUTINO ---

// Ajustar clima a 22 grados
AJUSTAR TERMOSTATO 22

// Abrir persianas
ACTIVAR PERSIANAS_ELECTRICAS

// Si hay mucha luz solar afuera, apagar luces internas para ahorrar
SI (LEER_SENSOR(LUMENES_SOL) > 800) ENTONCES DESACTIVAR LUCES_TECHO

// Preparar cafetera
ACTIVAR MAQUINA_CAFE
FIN_PROGRAMA
`

const interprete = new DomoticInterpreter()

interprete.ejecutar(codigoIncendio)
interprete.ejecutar(codigoTanques)
interprete.ejecutar(codigoOficina)
interprete.ejecutar(miCodigo)
