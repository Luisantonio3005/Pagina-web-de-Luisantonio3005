/**
 * ========================================
 * ANIMACIONES AVANZADAS DEL SISTEMA DE IA
 * ========================================
 * Animaciones de nivel Dalto para los botones de navegación
 * y efectos visuales avanzados
 */

class AdvancedAnimations {
    constructor() {
        this.isInitialized = false;
        this.animationQueue = [];
        this.particleSystems = new Map();

        this.init();
    }

    /**
     * Inicializar sistema de animaciones
     */
    init() {
        this.setupButtonAnimations();
        this.setupParticleSystems();
        this.setupHologramEffects();
        this.setupEnergyFields();
        this.setupSpatialDistortions();
        this.setupMagneticFields();
        this.isInitialized = true;

        console.log('🎨 Sistema de animaciones avanzadas inicializado');
    }

    /**
     * Configurar animaciones de botones
     */
    setupButtonAnimations() {
        const navButtons = document.querySelectorAll('nav ul li a');

        navButtons.forEach(button => {
            // Efecto de partículas al hacer clic
            button.addEventListener('click', (e) => {
                this.createButtonParticles(e, button);
                this.createRippleEffect(e, button);
                this.createEnergyWave(e, button);
            });

            // Efecto de hover avanzado
            button.addEventListener('mouseenter', (e) => {
                this.createHoverGlow(e, button);
                this.createFloatingParticles(button);
            });

            // Efecto de focus
            button.addEventListener('focus', (e) => {
                this.createFocusRing(e, button);
            });
        });
    }

    /**
     * Crear partículas de botón
     */
    createButtonParticles(event, button) {
        const rect = button.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const particleCount = 8;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'button-particle';
            particle.style.cssText = `
                position: fixed;
                left: ${centerX}px;
                top: ${centerY}px;
                width: 4px;
                height: 4px;
                background: linear-gradient(45deg, #00e5ff, #ff00ff);
                border-radius: 50%;
                pointer-events: none;
                z-index: 10000;
                animation: buttonParticleExplosion 0.8s ease-out forwards;
            `;

            // Dirección aleatoria
            const angle = (i / particleCount) * 2 * Math.PI;
            const distance = 50 + Math.random() * 30;
            const endX = centerX + Math.cos(angle) * distance;
            const endY = centerY + Math.sin(angle) * distance;

            particle.style.setProperty('--end-x', endX + 'px');
            particle.style.setProperty('--end-y', endY + 'px');

            document.body.appendChild(particle);

            // Limpiar partícula después de la animación
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 800);
        }
    }

    /**
     * Crear efecto de ondulación
     */
    createRippleEffect(event, button) {
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        const ripple = document.createElement('div');
        ripple.className = 'ripple-effect';
        ripple.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, rgba(0, 229, 255, 0.6) 0%, transparent 70%);
            border-radius: 50%;
            transform: scale(0);
            animation: rippleExpand 0.6s ease-out;
            pointer-events: none;
        `;

        button.appendChild(ripple);

        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }

    /**
     * Crear onda de energía
     */
    createEnergyWave(event, button) {
        const rect = button.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const wave = document.createElement('div');
        wave.className = 'energy-wave';
        wave.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            width: 0;
            height: 0;
            border: 2px solid #00e5ff;
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 9999;
            animation: energyWaveExpand 1s ease-out;
        `;

        document.body.appendChild(wave);

        setTimeout(() => {
            if (wave.parentNode) {
                wave.parentNode.removeChild(wave);
            }
        }, 1000);
    }

    /**
     * Crear resplandor de hover
     */
    createHoverGlow(event, button) {
        const glow = document.createElement('div');
        glow.className = 'hover-glow';
        glow.style.cssText = `
            position: absolute;
            top: -5px;
            left: -5px;
            right: -5px;
            bottom: -5px;
            background: linear-gradient(45deg, #00e5ff, #ff00ff, #ffff00, #00e5ff);
            background-size: 400% 400%;
            border-radius: 12px;
            opacity: 0;
            animation: glowPulse 2s ease-in-out infinite, glowFadeIn 0.3s ease-out forwards;
            pointer-events: none;
            z-index: -1;
        `;

        button.appendChild(glow);

        button.addEventListener('mouseleave', () => {
            glow.style.animation = 'glowFadeOut 0.3s ease-out forwards';
            setTimeout(() => {
                if (glow.parentNode) {
                    glow.parentNode.removeChild(glow);
                }
            }, 300);
        }, { once: true });
    }

    /**
     * Crear partículas flotantes
     */
    createFloatingParticles(button) {
        const rect = button.getBoundingClientRect();
        const particleCount = 3;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            particle.style.cssText = `
                position: fixed;
                left: ${rect.left + Math.random() * rect.width}px;
                top: ${rect.top + Math.random() * rect.height}px;
                width: 3px;
                height: 3px;
                background: #00e5ff;
                border-radius: 50%;
                pointer-events: none;
                z-index: 10000;
                animation: floatingParticleFloat 2s ease-out forwards;
            `;

            document.body.appendChild(particle);

            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 2000);
        }
    }

    /**
     * Crear anillo de focus
     */
    createFocusRing(event, button) {
        const ring = document.createElement('div');
        ring.className = 'focus-ring';
        ring.style.cssText = `
            position: absolute;
            top: -3px;
            left: -3px;
            right: -3px;
            bottom: -3px;
            border: 2px solid #00e5ff;
            border-radius: 12px;
            opacity: 0;
            animation: focusRingPulse 0.3s ease-out forwards;
            pointer-events: none;
            z-index: -1;
        `;

        button.appendChild(ring);

        button.addEventListener('blur', () => {
            ring.style.animation = 'focusRingFadeOut 0.3s ease-out forwards';
            setTimeout(() => {
                if (ring.parentNode) {
                    ring.parentNode.removeChild(ring);
                }
            }, 300);
        }, { once: true });
    }

    /**
     * Configurar sistemas de partículas
     */
    setupParticleSystems() {
        // Sistema de partículas de fondo
        this.createBackgroundParticles();

        // Sistema de partículas de navegación
        this.createNavigationParticles();
    }

    /**
     * Crear partículas de fondo
     */
    createBackgroundParticles() {
        const container = document.createElement('div');
        container.className = 'background-particles';
        container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            overflow: hidden;
        `;

        document.body.appendChild(container);

        const particleCount = 20;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'background-particle';
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(0, 229, 255, 0.3);
                border-radius: 50%;
                animation: backgroundParticleFloat ${3 + Math.random() * 4}s ease-in-out infinite;
                animation-delay: ${Math.random() * 3}s;
            `;

            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';

            container.appendChild(particle);
        }
    }

    /**
     * Crear partículas de navegación
     */
    createNavigationParticles() {
        const nav = document.querySelector('nav');
        if (!nav) return;

        const container = document.createElement('div');
        container.className = 'navigation-particles';
        container.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;

        nav.appendChild(container);

        // Crear partículas que siguen el cursor
        nav.addEventListener('mousemove', (e) => {
            this.createCursorParticle(e, container);
        });
    }

    /**
     * Crear partícula de cursor
     */
    createCursorParticle(event, container) {
        if (Math.random() > 0.1) return; // Solo 10% de probabilidad

        const particle = document.createElement('div');
        particle.className = 'cursor-particle';
        particle.style.cssText = `
            position: absolute;
            left: ${event.offsetX}px;
            top: ${event.offsetY}px;
            width: 3px;
            height: 3px;
            background: #00e5ff;
            border-radius: 50%;
            animation: cursorParticleFade 1s ease-out forwards;
        `;

        container.appendChild(particle);

        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 1000);
    }

    /**
     * Configurar efectos de holograma
     */
    setupHologramEffects() {
        const hologramElements = document.querySelectorAll('.hologram-enabled nav ul li a');

        hologramElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.createHologramScan(element);
            });
        });
    }

    /**
     * Crear escaneo de holograma
     */
    createHologramScan(element) {
        const scan = document.createElement('div');
        scan.className = 'hologram-scan';
        scan.style.cssText = `
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(0, 229, 255, 0.3), transparent);
            animation: hologramScan 1s ease-in-out;
            pointer-events: none;
        `;

        element.appendChild(scan);

        setTimeout(() => {
            if (scan.parentNode) {
                scan.parentNode.removeChild(scan);
            }
        }, 1000);
    }

    /**
     * Configurar campos de energía
     */
    setupEnergyFields() {
        const energyElements = document.querySelectorAll('.energy-field-enabled nav ul li a');

        energyElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.createEnergyField(element);
            });
        });
    }

    /**
     * Crear campo de energía
     */
    createEnergyField(element) {
        const field = document.createElement('div');
        field.className = 'energy-field';
        field.style.cssText = `
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            border: 2px solid transparent;
            border-radius: 12px;
            background: linear-gradient(45deg, #00e5ff, transparent, #00e5ff);
            background-size: 200% 200%;
            animation: energyFieldPulse 2s ease-in-out infinite;
            pointer-events: none;
            z-index: -1;
        `;

        element.appendChild(field);

        element.addEventListener('mouseleave', () => {
            field.style.animation = 'energyFieldFadeOut 0.3s ease-out forwards';
            setTimeout(() => {
                if (field.parentNode) {
                    field.parentNode.removeChild(field);
                }
            }, 300);
        }, { once: true });
    }

    /**
     * Configurar distorsiones espaciales
     */
    setupSpatialDistortions() {
        const spatialElements = document.querySelectorAll('.spatial-distortion-enabled nav ul li a');

        spatialElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.createSpatialDistortion(element);
            });
        });
    }

    /**
     * Crear distorsión espacial
     */
    createSpatialDistortion(element) {
        const distortion = document.createElement('div');
        distortion.className = 'spatial-distortion';
        distortion.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at center, transparent 0%, rgba(0, 229, 255, 0.1) 50%, transparent 100%);
            animation: spatialDistortionWarp 3s ease-in-out infinite;
            pointer-events: none;
            z-index: -1;
        `;

        element.appendChild(distortion);

        element.addEventListener('mouseleave', () => {
            distortion.style.animation = 'spatialDistortionFadeOut 0.3s ease-out forwards';
            setTimeout(() => {
                if (distortion.parentNode) {
                    distortion.parentNode.removeChild(distortion);
                }
            }, 300);
        }, { once: true });
    }

    /**
     * Configurar campos magnéticos
     */
    setupMagneticFields() {
        const magneticElements = document.querySelectorAll('.magnetic-field-enabled nav ul li a');

        magneticElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.createMagneticField(element);
            });
        });
    }

    /**
     * Crear campo magnético
     */
    createMagneticField(element) {
        const field = document.createElement('div');
        field.className = 'magnetic-field';
        field.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border-radius: 12px;
            background: conic-gradient(from 0deg, transparent, #00e5ff, transparent);
            animation: magneticFieldRotate 4s linear infinite;
            pointer-events: none;
            z-index: -1;
        `;

        element.appendChild(field);

        element.addEventListener('mouseleave', () => {
            field.style.animation = 'magneticFieldFadeOut 0.3s ease-out forwards';
            setTimeout(() => {
                if (field.parentNode) {
                    field.parentNode.removeChild(field);
                }
            }, 300);
        }, { once: true });
    }
}

// Inicializar animaciones avanzadas cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.advancedAnimations = new AdvancedAnimations();
});

// Exportar para uso global
window.AdvancedAnimations = AdvancedAnimations;