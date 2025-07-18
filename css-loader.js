/*
 * ========================================
 * CSS LOADER - Sistema de Carga Modular
 * ========================================
 */

class CSSLoader {
    constructor() {
        this.loadedFiles = new Set();
        this.performanceScore = 0;
        this.deviceCapabilities = {};
    }

    // Detectar capacidades del dispositivo
    detectDeviceCapabilities() {
        const capabilities = {
            // CPU y memoria
            deviceMemory: navigator.deviceMemory || 4,
            hardwareConcurrency: navigator.hardwareConcurrency || 4,

            // GPU
            webgl: this.detectWebGL(),

            // Conexión
            connection: this.detectConnection(),

            // Pantalla
            screen: {
                width: screen.width,
                height: screen.height,
                pixelRatio: window.devicePixelRatio || 1
            },

            // Navegador
            userAgent: navigator.userAgent
        };

        this.deviceCapabilities = capabilities;
        return capabilities;
    }

    // Detectar WebGL
    detectWebGL() {
        try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            return {
                available: !!gl,
                vendor: gl ? gl.getParameter(gl.VENDOR) : null,
                renderer: gl ? gl.getParameter(gl.RENDERER) : null
            };
        } catch (e) {
            return { available: false, vendor: null, renderer: null };
        }
    }

    // Detectar tipo de conexión
    detectConnection() {
        if (navigator.connection) {
            return {
                effectiveType: navigator.connection.effectiveType,
                downlink: navigator.connection.downlink,
                rtt: navigator.connection.rtt
            };
        }
        return { effectiveType: 'unknown', downlink: 10, rtt: 50 };
    }

    // Calcular score de rendimiento
    calculatePerformanceScore() {
        const capabilities = this.deviceCapabilities;
        let score = 0;

        // Memoria (0-25 puntos)
        score += Math.min(capabilities.deviceMemory * 5, 25);

        // CPU (0-25 puntos)
        score += Math.min(capabilities.hardwareConcurrency * 2.5, 25);

        // GPU (0-25 puntos)
        score += capabilities.webgl.available ? 25 : 10;

        // Conexión (0-25 puntos)
        const connectionScore = {
            'slow-2g': 5,
            '2g': 10,
            '3g': 15,
            '4g': 20,
            'unknown': 15
        };
        score += connectionScore[capabilities.connection.effectiveType] || 15;

        this.performanceScore = Math.round(score);
        return this.performanceScore;
    }

    // Determinar nivel de rendimiento
    getPerformanceLevel() {
        if (this.performanceScore >= 80) return 'high';
        if (this.performanceScore >= 50) return 'medium';
        return 'low';
    }

    // Cargar archivo CSS
    loadCSS(href, id = null) {
        return new Promise((resolve, reject) => {
            if (this.loadedFiles.has(href)) {
                resolve();
                return;
            }

            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            if (id) link.id = id;

            link.onload = () => {
                this.loadedFiles.add(href);
                console.log(`CSS cargado: ${href}`);
                resolve();
            };

            link.onerror = () => {
                console.error(`Error cargando CSS: ${href}`);
                reject(new Error(`No se pudo cargar ${href}`));
            };

            document.head.appendChild(link);
        });
    }

    // Cargar CSS base
    async loadBaseCSS() {
        try {
            await this.loadCSS('estilos-base.css', 'css-base');
            console.log('CSS base cargado');
        } catch (error) {
            console.error('Error cargando CSS base:', error);
        }
    }

    // Cargar CSS de componentes
    async loadComponentsCSS() {
        try {
            await this.loadCSS('estilos-componentes.css', 'css-components');
            console.log('CSS de componentes cargado');
        } catch (error) {
            console.error('Error cargando CSS de componentes:', error);
        }
    }

    // Cargar CSS responsive
    async loadResponsiveCSS() {
        try {
            await this.loadCSS('estilos-responsive.css', 'css-responsive');
            console.log('CSS responsive cargado');
        } catch (error) {
            console.error('Error cargando CSS responsive:', error);
        }
    }

    // Cargar sistema de IA según rendimiento
    async loadAICSS() {
        const performanceLevel = this.getPerformanceLevel();

        try {
            await this.loadCSS('sistema-ia.css', 'css-ai');

            // Aplicar clases según el rendimiento
            document.body.classList.add(`performance-${performanceLevel}`);
            document.body.classList.add(`device-${performanceLevel}-end`);

            console.log(`Sistema de IA cargado con nivel: ${performanceLevel}`);
        } catch (error) {
            console.error('Error cargando sistema de IA:', error);
        }
    }

    // Cargar todos los CSS en orden
    async loadAllCSS() {
        console.log('Iniciando carga de CSS...');

        // Detectar capacidades primero
        this.detectDeviceCapabilities();
        this.calculatePerformanceScore();

        console.log('Capacidades detectadas:', this.deviceCapabilities);
        console.log('Score de rendimiento:', this.performanceScore);
        console.log('Nivel de rendimiento:', this.getPerformanceLevel());

        // Cargar en orden
        await this.loadBaseCSS();
        await this.loadComponentsCSS();
        await this.loadResponsiveCSS();
        await this.loadAICSS();

        console.log('Todos los CSS cargados correctamente');

        // Disparar evento de carga completa
        document.dispatchEvent(new CustomEvent('cssLoaded', {
            detail: {
                performanceScore: this.performanceScore,
                performanceLevel: this.getPerformanceLevel(),
                deviceCapabilities: this.deviceCapabilities
            }
        }));
    }

    // Mostrar panel de debug
    showDebugPanel() {
        const panel = document.createElement('div');
        panel.className = 'debug-panel show';
        panel.innerHTML = `
            <div class="debug-info">Score: ${this.performanceScore}/100</div>
            <div class="debug-info">Nivel: ${this.getPerformanceLevel()}</div>
            <div class="debug-info">Memoria: ${this.deviceCapabilities.deviceMemory}GB</div>
            <div class="debug-info">CPU: ${this.deviceCapabilities.hardwareConcurrency} cores</div>
            <div class="debug-info">GPU: ${this.deviceCapabilities.webgl.available ? 'Sí' : 'No'}</div>
            <div class="debug-info">Conexión: ${this.deviceCapabilities.connection.effectiveType}</div>
        `;
        document.body.appendChild(panel);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const cssLoader = new CSSLoader();

    // Cargar todos los CSS
    cssLoader.loadAllCSS();

    // Mostrar panel de debug en desarrollo
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        setTimeout(() => cssLoader.showDebugPanel(), 1000);
    }

    // Hacer disponible globalmente
    window.cssLoader = cssLoader;
});

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CSSLoader;
}