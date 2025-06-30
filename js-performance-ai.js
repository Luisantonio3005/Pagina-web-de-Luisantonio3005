/*
 * =======================================================
 *              SISTEMA DE IA DE RENDIMIENTO
 * =======================================================
 * Este script optimiza la carga y la experiencia del usuario
 * de forma inteligente y adaptativa, sin alterar el contenido visual.
 *
 * Funciones Principales:
 * 1. Detección de Capacidades del Dispositivo.
 * 2. Carga Inteligente de Imágenes (Lazy Loading).
 * 3. Optimización de Eventos (Scroll & Resize Debouncing).
 * 4. Inicialización Condicional de Efectos Visuales.
 * =======================================================
 */

class PerformanceAI {
    constructor() {
        this.config = {
            lazyLoadOffset: '200px',
            debounceDelay: 150, // ms
        };
        this.deviceProfile = {
            isMobile: false,
            isLowEnd: false,
            connection: '4g',
        };
        // Inicia la clase tan pronto como se instancia
        this.init();
    }

    /**
     * Inicializa todos los módulos de optimización.
     */
    init() {
        this.detectDeviceProfile();
        this.setupImageLoading();
        this.setupEventListeners();
        this.conditionallyLoadEffects();
        this.logStatus();
    }

    /**
     * Detecta las capacidades del dispositivo para aplicar optimizaciones.
     */
    detectDeviceProfile() {
        this.deviceProfile.isMobile = window.matchMedia('(max-width: 768px)').matches;

        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        if (connection) {
            this.deviceProfile.connection = connection.effectiveType;
            if (['slow-2g', '2g', '3g'].includes(connection.effectiveType)) {
                this.deviceProfile.isLowEnd = true;
            }
        }

        if (navigator.deviceMemory && navigator.deviceMemory < 4) {
            this.deviceProfile.isLowEnd = true;
        }

        if (this.deviceProfile.isLowEnd) {
            document.body.classList.add('low-performance');
        }
    }

    /**
     * Configura el lazy loading para todas las imágenes.
     */
    setupImageLoading() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                        }
                        img.classList.add('loaded');
                        obs.unobserve(img);
                    }
                });
            }, { rootMargin: this.config.lazyLoadOffset });
            images.forEach(img => observer.observe(img));
        } else {
            images.forEach(img => {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
            });
        }
    }

    /**
     * Optimiza los eventos para evitar sobrecargas.
     */
    setupEventListeners() {
        const debounce = (func, delay) => {
            let timeout;
            return (...args) => {
                clearTimeout(timeout);
                timeout = setTimeout(() => func.apply(this, args), delay);
            };
        };

        window.addEventListener('resize', debounce(() => {}, this.config.debounceDelay), { passive: true });
    }

    /**
     * Carga los efectos visuales avanzados solo en dispositivos de gama alta.
     */
    conditionallyLoadEffects() {
        if (!this.deviceProfile.isLowEnd && typeof AdvancedEffects !== 'undefined') {
            new AdvancedEffects().init();
        }
    }

    /**
     * Muestra en consola el perfil del dispositivo.
     */
    logStatus() {
        console.group('🤖 Performance AI Status');
        console.log(`Dispositivo de Gama Baja: ${this.deviceProfile.isLowEnd}`);
        console.log(`Conexión: ${this.deviceProfile.connection}`);
        if (this.deviceProfile.isLowEnd) {
            console.warn('Modo de bajo rendimiento activado. Algunos efectos visuales han sido desactivados.');
        } else {
            console.log('Modo de alto rendimiento activado.');
        }
        console.groupEnd();
    }
}

// Iniciar la IA tan pronto como el script se cargue.
new PerformanceAI();