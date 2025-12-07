class DomoticInterpreter {
    constructor() {
        // Simulación del estado de los sensores y dispositivos (Memoria)
        this.estado = {
            "LUCES_SALA": "OFF",
            "AIRE_SALA": "OFF",
            "MOVIMIENTO_SALA": "0", // 0 es falso, 1 es verdadero
            "TEMP_SERVER": 30,
            "VENTILADOR_EMERGENCIA": "OFF"
        };
    }

    // Función principal que recibe el código en texto
    ejecutar(codigo) {
        const lineas = codigo.split('\n');
        
        console.log("--- INICIANDO EJECUCIÓN DOMOTICSCRIPT ---");
        
        for (let i = 0; i < lineas.length; i++) {
            let linea = lineas[i].trim();
            if (!linea || linea.startsWith("//")) continue; // Ignorar vacíos y comentarios

            this.procesarLinea(linea);
        }
        
        console.log("--- ESTADO FINAL DEL SISTEMA ---");
        console.log(this.estado);
    }

    procesarLinea(linea) {
        const partes = linea.split(' ');
        const comando = partes[0];

        // 1. Comandos de Acción Directa
        if (comando === "ACTIVAR") {
            const dispositivo = partes[1];
            this.estado[dispositivo] = "ON";
            console.log(`[ACCION] Activando ${dispositivo}`);
        } 
        else if (comando === "DESACTIVAR") {
            const dispositivo = partes[1];
            this.estado[dispositivo] = "OFF";
            console.log(`[ACCION] Desactivando ${dispositivo}`);
        }
        
        // 2. Lógica Condicional Simple (SI ... ENTONCES ...)
        // Sintaxis soportada: SI (SENSOR == VALOR) ENTONCES ACTIVAR DISPOSITIVO
        else if (comando === "SI") {
            // Esto es un parser muy básico usando regex para extraer partes
            // Busca patrón: SI (SENSOR operador VALOR) ENTONCES COMANDO_ACCION OBJETO
            const match = linea.match(/SI \((.*?) (==|>) (.*?)\) ENTONCES (.*?) (.*)/);
            
            if (match) {
                const sensor = match[1]; // Ej: LEER_SENSOR(MOVIMIENTO_SALA) -> limpiamos esto abajo
                const operador = match[2];
                const valorComparar = match[3];
                const accion = match[4];
                const objetivo = match[5];

                // Extraer nombre real del sensor si viene como LEER_SENSOR(X)
                const nombreSensor = sensor.replace("LEER_SENSOR(", "").replace(")", "");
                const valorReal = this.estado[nombreSensor];

                // Evaluar condición
                let condicionCumplida = false;
                if (operador === "==" && valorReal == valorComparar) condicionCumplida = true;
                if (operador === ">" && valorReal > valorComparar) condicionCumplida = true;

                if (condicionCumplida) {
                    console.log(`[CONDICION] Verdadera: ${nombreSensor} es ${valorReal}`);
                    // Llamada recursiva para ejecutar la acción de la derecha
                    this.procesarLinea(`${accion} ${objetivo}`);
                } else {
                    console.log(`[CONDICION] Falsa: ${nombreSensor} es ${valorReal}`);
                }
            }
        }
    }
}

// --- PRUEBA DEL LENGUAJE ---

const miCodigo = `
PROGRAMA
ACTIVAR LUCES_SALA
// Simulamos que detectamos movimiento (0 = no hay nadie)
SI (LEER_SENSOR(MOVIMIENTO_SALA) == 0) ENTONCES DESACTIVAR LUCES_SALA
SI (LEER_SENSOR(TEMP_SERVER) > 25) ENTONCES ACTIVAR VENTILADOR_EMERGENCIA
FIN_PROGRAMA
`;

const interprete = new DomoticInterpreter();
interprete.ejecutar(miCodigo);