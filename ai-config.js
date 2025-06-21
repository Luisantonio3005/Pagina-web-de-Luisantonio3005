/**
 * ========================================
 * SISTEMA DE IA INTELIGENTE - CONFIGURACIÓN
 * ========================================
 * Sistema que detecta automáticamente el rendimiento del dispositivo
 * y adapta las animaciones y funcionalidades en tiempo real
 */

class AIPerformanceOptimizer {
    constructor() {
        this.performanceScore = 0;
        this.deviceCapabilities = {};
        this.optimizationLevel = 'high';
        this.isInitialized = false;

        // Configuración por defecto
        this.config = {
            animationQuality: 'high',
            particleCount: 8,
            glowIntensity: 1,
            transitionSpeed: 0.3,
            enableHologram: true,
            enableEnergyField: true,
            enableSpatialDistortion: true,
            enableMagneticField: true,
            enableParticles: true,
            enableParallax: true
        };

        this.init();
    }

    /**
     * Inicializar el sistema de IA
     */
    async init() {
        try {
            await this.detectDeviceCapabilities();
            this.calculatePerformanceScore();
            this.applyOptimizations();
            this.setupPerformanceMonitoring();
            // this.createDebugPanel(); // Panel de depuración deshabilitado
            this.isInitialized = true;

            console.log('🤖 Sistema de IA inicializado:', {
                performanceScore: this.performanceScore,
                optimizationLevel: this.optimizationLevel,
                deviceCapabilities: this.deviceCapabilities
            });
        } catch (error) {
            console.error('❌ Error al inicializar sistema de IA:', error);
            this.fallbackToLowPerformance();
        }
    }

    /**
     * Detectar capacidades del dispositivo
     */
    async detectDeviceCapabilities() {
        this.deviceCapabilities = {
            // Detectar CPU y memoria
            hardwareConcurrency: navigator.hardwareConcurrency || 1,
            deviceMemory: navigator.deviceMemory || 1,

            // Detectar GPU
            webgl: this.detectWebGL(),
            webgl2: this.detectWebGL2(),

            // Detectar pantalla
            screenWidth: screen.width,
            screenHeight: screen.height,
            pixelRatio: window.devicePixelRatio || 1,

            // Detectar conexión
            connection: this.detectConnection(),

            // Detectar navegador
            userAgent: navigator.userAgent,

            // Detectar características
            touchSupport: 'ontouchstart' in window,
            hoverSupport: window.matchMedia('(hover: hover)').matches,
            reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        };

        // Detectar rendimiento de animaciones
        this.deviceCapabilities.animationPerformance = await this.testAnimationPerformance();
    }

    /**
     * Detectar WebGL
     */
    detectWebGL() {
        try {
            const canvas = document.createElement('canvas');
            return !!(window.WebGLRenderingContext &&
                (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
        } catch (e) {
            return false;
        }
    }

    /**
     * Detectar WebGL2
     */
    detectWebGL2() {
        try {
            const canvas = document.createElement('canvas');
            return !!(window.WebGL2RenderingContext && canvas.getContext('webgl2'));
        } catch (e) {
            return false;
        }
    }

    /**
     * Detectar tipo de conexión
     */
    detectConnection() {
        if ('connection' in navigator) {
            const connection = navigator.connection;
            return {
                effectiveType: connection.effectiveType || 'unknown',
                downlink: connection.downlink || 0,
                rtt: connection.rtt || 0,
                saveData: connection.saveData || false
            };
        }
        return { effectiveType: 'unknown', downlink: 0, rtt: 0, saveData: false };
    }

    /**
     * Probar rendimiento de animaciones
     */
    async testAnimationPerformance() {
        return new Promise((resolve) => {
            const startTime = performance.now();
            let frameCount = 0;

            const testAnimation = () => {
                frameCount++;
                if (performance.now() - startTime < 1000) {
                    requestAnimationFrame(testAnimation);
                } else {
                    const fps = frameCount;
                    resolve(fps);
                }
            };

            requestAnimationFrame(testAnimation);
        });
    }

    /**
     * Calcular puntuación de rendimiento
     */
    calculatePerformanceScore() {
        let score = 0;

        // Puntuación por CPU
        score += Math.min(this.deviceCapabilities.hardwareConcurrency * 10, 50);

        // Puntuación por memoria
        score += Math.min(this.deviceCapabilities.deviceMemory * 20, 30);

        // Puntuación por GPU
        if (this.deviceCapabilities.webgl2) score += 20;
        else if (this.deviceCapabilities.webgl) score += 10;

        // Puntuación por pantalla
        const screenArea = this.deviceCapabilities.screenWidth * this.deviceCapabilities.screenHeight;
        if (screenArea > 2000000) score += 10; // Pantallas grandes
        else if (screenArea > 1000000) score += 5; // Pantallas medianas

        // Puntuación por conexión
        const connection = this.deviceCapabilities.connection;
        if (connection.effectiveType === '4g') score += 10;
        else if (connection.effectiveType === '3g') score += 5;

        // Puntuación por rendimiento de animaciones
        if (this.deviceCapabilities.animationPerformance > 50) score += 20;
        else if (this.deviceCapabilities.animationPerformance > 30) score += 10;
        else if (this.deviceCapabilities.animationPerformance > 15) score += 5;

        this.performanceScore = Math.min(score, 100);

        // Determinar nivel de optimización
        if (this.performanceScore >= 80) this.optimizationLevel = 'ultra-high';
        else if (this.performanceScore >= 60) this.optimizationLevel = 'high';
        else if (this.performanceScore >= 40) this.optimizationLevel = 'medium';
        else this.optimizationLevel = 'low';
    }

    /**
     * Aplicar optimizaciones basadas en el rendimiento
     */
    applyOptimizations() {
        const body = document.body;

        // Remover clases anteriores
        body.classList.remove('ai-low-performance', 'ai-medium-performance', 'ai-high-performance', 'ai-ultra-performance');

        // Aplicar clase de rendimiento
        body.classList.add(`ai-${this.optimizationLevel.replace('-', '-')}-performance`);

        // Configurar variables CSS
        this.setCSSVariables();

        // Aplicar características específicas
        this.applyFeatures();

        // Crear partículas si está habilitado
        if (this.config.enableParticles && this.optimizationLevel !== 'low') {
            this.createParticles();
        }
    }

    /**
     * Configurar variables CSS
     */
    setCSSVariables() {
        const root = document.documentElement;

        switch (this.optimizationLevel) {
            case 'ultra-high':
                root.style.setProperty('--animation-quality', 'ultra-high');
                root.style.setProperty('--particle-count', '12');
                root.style.setProperty('--glow-intensity', '1');
                root.style.setProperty('--transition-speed', '0.4s');
                break;
            case 'high':
                root.style.setProperty('--animation-quality', 'high');
                root.style.setProperty('--particle-count', '6');
                root.style.setProperty('--glow-intensity', '0.8');
                root.style.setProperty('--transition-speed', '0.3s');
                break;
            case 'medium':
                root.style.setProperty('--animation-quality', 'medium');
                root.style.setProperty('--particle-count', '3');
                root.style.setProperty('--glow-intensity', '0.6');
                root.style.setProperty('--transition-speed', '0.2s');
                break;
            case 'low':
                root.style.setProperty('--animation-quality', 'low');
                root.style.setProperty('--particle-count', '0');
                root.style.setProperty('--glow-intensity', '0.3');
                root.style.setProperty('--transition-speed', '0.1s');
                break;
        }
    }

    /**
     * Aplicar características específicas
     */
    applyFeatures() {
        const body = document.body;
        const features = ['hologram', 'energy-field', 'spatial-distortion', 'magnetic-field', 'particles', 'parallax'];

        features.forEach(feature => {
            const prop = `enable${feature.charAt(0).toUpperCase() + feature.slice(1)}`;
            if (this.config[prop]) {
                body.classList.add(`${feature}-enabled`);
            } else {
                body.classList.remove(`${feature}-enabled`);
            }
        });
    }

    /**
     * Crear partículas
     */
    createParticles() {
        if (document.getElementById('particle-container')) return;

        const container = document.createElement('div');
        container.id = 'particle-container';
        document.body.appendChild(container);

        for (let i = 0; i < this.config.particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            container.appendChild(particle);
        }
    }

    /**
     * Monitorear rendimiento y ajustar
     */
    setupPerformanceMonitoring() {
        setInterval(() => {
            this.testAnimationPerformance().then(fps => {
                this.updatePerformanceIndicator(fps);
                if (fps < 30 && this.optimizationLevel !== 'low') {
                    this.downgradePerformance();
                } else if (fps > 55 && this.optimizationLevel !== 'ultra-high') {
                    this.upgradePerformance();
                }
            });
        }, 5000);
    }

    /**
     * Degradar rendimiento
     */
    downgradePerformance() {
        const levels = ['low', 'medium', 'high', 'ultra-high'];
        const currentLevelIndex = levels.indexOf(this.optimizationLevel);
        if (currentLevelIndex > 0) {
            this.optimizationLevel = levels[currentLevelIndex - 1];
            this.applyOptimizations();
        }
    }

    /**
     * Mejorar rendimiento
     */
    upgradePerformance() {
        const levels = ['low', 'medium', 'high', 'ultra-high'];
        const currentLevelIndex = levels.indexOf(this.optimizationLevel);
        if (currentLevelIndex < levels.length - 1) {
            this.optimizationLevel = levels[currentLevelIndex + 1];
            this.applyOptimizations();
        }
    }

    /**
     * Crear panel de depuración (DESHABILITADO)
     */
    createDebugPanel() {
        // La creación del panel está deshabilitada
        return;
    }

    /**
     * Actualizar indicador de rendimiento (en consola)
     */
    updatePerformanceIndicator(fps) {
        console.log(`[AI] FPS: ${fps} | Nivel: ${this.optimizationLevel}`);
    }

    /**
     * Fallback a rendimiento bajo
     */
    fallbackToLowPerformance() {
        this.optimizationLevel = 'low';
        this.applyOptimizations();
    }

    /**
     * Obtener configuración actual
     */
    getConfig() {
        return {
            performanceScore: this.performanceScore,
            optimizationLevel: this.optimizationLevel,
            ...this.config
        };
    }

    /**
     * Actualizar configuración
     */
    updateConfig(newConfig) {
        this.config = {...this.config, ...newConfig };
        this.applyOptimizations();
    }
}

// Inicializar el sistema de IA
document.addEventListener('DOMContentLoaded', () => {
    window.aiOptimizer = new AIPerformanceOptimizer();
});