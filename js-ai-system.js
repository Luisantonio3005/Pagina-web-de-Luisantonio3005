/*
 * ========================================
 * JS AI SYSTEM - Sistema de IA Adaptativo
 * ========================================
 */

// Archivo desactivado para mejorar la estabilidad y el rendimiento.
// La lógica de optimización y animación ha sido centralizada y refactorizada.

document.addEventListener('jsBaseReady', () => {
    try {
        class AdaptiveAI {
            constructor() {
                this.metrics = {
                    fps: [],
                    memoryUsage: [],
                    interactionCount: 0,
                    scrollEvents: 0,
                    clickEvents: 0,
                    hoverEvents: 0
                };

                this.settings = {
                    enableParallax: true,
                    enableParticles: true,
                    enableHologram: false,
                    enableEnergyField: false,
                    enableSpatialDistortion: false,
                    enableMagneticField: false,
                    particleCount: 20,
                    animationComplexity: 'medium'
                };

                this.learningData = {
                    userBehavior: {},
                    performanceHistory: [],
                    deviceCapabilities: {}
                };

                this.isOptimizing = false;
                this.optimizationInterval = null;
            }

            init() {
                this.detectDeviceCapabilities();
                this.setupPerformanceMonitoring();
                this.setupAdaptiveLearning();
                this.applyOptimalSettings();
                this.startContinuousOptimization();
            }

            detectDeviceCapabilities() {
                this.learningData.deviceCapabilities = {
                    deviceMemory: navigator.deviceMemory || 4,
                    hardwareConcurrency: navigator.hardwareConcurrency || 4,
                    webgl: this.detectWebGL(),
                    connection: this.detectConnection(),
                    screen: {
                        width: screen.width,
                        height: screen.height,
                        pixelRatio: window.devicePixelRatio || 1
                    }
                };
            }

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

            setupPerformanceMonitoring() {
                let lastTime = performance.now();
                let frameCount = 0;

                const measurePerformance = () => {
                    const currentTime = performance.now();
                    frameCount++;

                    if (currentTime - lastTime >= 1000) {
                        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                        this.metrics.fps.push(fps);

                        // Mantener solo los últimos 10 valores
                        if (this.metrics.fps.length > 10) {
                            this.metrics.fps.shift();
                        }

                        // Medir uso de memoria si está disponible
                        if (performance.memory) {
                            const memoryUsage = performance.memory.usedJSHeapSize / 1024 / 1024; // MB
                            this.metrics.memoryUsage.push(memoryUsage);

                            if (this.metrics.memoryUsage.length > 10) {
                                this.metrics.memoryUsage.shift();
                            }
                        }

                        lastTime = currentTime;
                        frameCount = 0;
                    }

                    requestAnimationFrame(measurePerformance);
                };

                requestAnimationFrame(measurePerformance);
            }

            setupAdaptiveLearning() {
                // Trackear interacciones del usuario
                const trackInteraction = () => {
                    this.metrics.interactionCount++;

                    // Analizar y adaptar cada 10 interacciones
                    if (this.metrics.interactionCount % 10 === 0) {
                        this.analyzeAndAdapt();
                    }
                };

                // Eventos de scroll
                window.addEventListener('scroll', () => {
                    this.metrics.scrollEvents++;
                    trackInteraction();
                }, { passive: true });

                // Eventos de click
                document.addEventListener('click', () => {
                    this.metrics.clickEvents++;
                    trackInteraction();
                });

                // Eventos de hover
                document.addEventListener('mouseover', () => {
                    this.metrics.hoverEvents++;
                    trackInteraction();
                });
            }

            analyzeAndAdapt() {
                const avgFPS = this.calculateAverageFPS();
                const avgMemory = this.calculateAverageMemoryUsage();

                // Guardar datos de rendimiento
                this.learningData.performanceHistory.push({
                    timestamp: Date.now(),
                    fps: avgFPS,
                    memory: avgMemory,
                    settings: {...this.settings }
                });

                // Mantener solo los últimos 50 registros
                if (this.learningData.performanceHistory.length > 50) {
                    this.learningData.performanceHistory.shift();
                }

                // Optimizar basado en el rendimiento
                this.optimizeForUserBehavior();
            }

            calculateAverageFPS() {
                if (this.metrics.fps.length === 0) return 60;
                return this.metrics.fps.reduce((a, b) => a + b, 0) / this.metrics.fps.length;
            }

            calculateAverageMemoryUsage() {
                if (this.metrics.memoryUsage.length === 0) return 0;
                return this.metrics.memoryUsage.reduce((a, b) => a + b, 0) / this.metrics.memoryUsage.length;
            }

            optimizeForUserBehavior() {
                const avgFPS = this.calculateAverageFPS();
                const avgMemory = this.calculateAverageMemoryUsage();

                // Si el rendimiento es bajo, degradar características
                if (avgFPS < 30 || avgMemory > 100) {
                    this.downgradePerformance();
                }
                // Si el rendimiento es alto, mejorar características
                else if (avgFPS > 55 && avgMemory < 50) {
                    this.upgradePerformance();
                }
            }

            downgradePerformance() {
                this.settings.enableParticles = false;
                this.settings.enableHologram = false;
                this.settings.enableEnergyField = false;
                this.settings.enableSpatialDistortion = false;
                this.settings.enableMagneticField = false;
                this.settings.particleCount = Math.max(5, this.settings.particleCount - 5);
                this.settings.animationComplexity = 'low';

                this.applySettings(this.settings);
                console.log('🔧 IA degradó rendimiento para mejor estabilidad');
            }

            upgradePerformance() {
                this.settings.enableParticles = true;
                this.settings.enableHologram = true;
                this.settings.enableEnergyField = true;
                this.settings.enableSpatialDistortion = true;
                this.settings.enableMagneticField = true;
                this.settings.particleCount = Math.min(30, this.settings.particleCount + 5);
                this.settings.animationComplexity = 'high';

                this.applySettings(this.settings);
                console.log('🚀 IA mejoró rendimiento para mejor experiencia');
            }

            applyOptimalSettings() {
                const avgFPS = this.calculateAverageFPS();

                if (avgFPS < 40) {
                    this.settings.animationComplexity = 'low';
                    this.settings.enableParticles = false;
                } else if (avgFPS > 50) {
                    this.settings.animationComplexity = 'high';
                    this.settings.enableParticles = true;
                }

                this.applySettings(this.settings);
            }

            applySettings(settings) {
                this.settings = {...settings };
                this.configureFeatures(settings);
            }

            configureFeatures(settings) {
                if (settings.enableParallax) {
                    this.enableParallax();
                } else {
                    this.disableParallax();
                }

                if (settings.enableParticles) {
                    this.enableParticles();
                } else {
                    this.disableParticles();
                }

                if (settings.enableHologram) {
                    this.enableHologram();
                }

                if (settings.enableEnergyField) {
                    this.enableEnergyField();
                }

                if (settings.enableSpatialDistortion) {
                    this.enableSpatialDistortion();
                }

                if (settings.enableMagneticField) {
                    this.enableMagneticField();
                }
            }

            enableParallax() {
                // Implementar efecto parallax
            }

            disableParallax() {
                // Desactivar efecto parallax
            }

            enableParticles() {
                this.createParticleSystem();
            }

            disableParticles() {
                this.removeParticleSystem();
            }

            enableHologram() {
                // Activar efectos holográficos
            }

            enableEnergyField() {
                // Activar campos de energía
            }

            enableSpatialDistortion() {
                // Activar distorsiones espaciales
            }

            enableMagneticField() {
                // Activar campos magnéticos
            }

            createParticleSystem() {
                const particleContainer = document.createElement('div');
                particleContainer.className = 'particle-system';
                particleContainer.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: 1;
                `;

                document.body.appendChild(particleContainer);
                this.animateParticles(particleContainer);
            }

            removeParticleSystem() {
                const particleSystem = document.querySelector('.particle-system');
                if (particleSystem) {
                    particleSystem.remove();
                }
            }

            animateParticles(container) {
                const particleCount = this.settings.particleCount;

                for (let i = 0; i < particleCount; i++) {
                    setTimeout(() => {
                        this.createParticle(container);
                    }, i * 100);
                }
            }

            createParticle(container) {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: absolute;
                    width: 2px;
                    height: 2px;
                    background: rgba(0, 229, 255, 0.6);
                    border-radius: 50%;
                    pointer-events: none;
                `;

                const startX = Math.random() * window.innerWidth;
                const startY = window.innerHeight + 10;
                const endX = startX + (Math.random() - 0.5) * 200;
                const endY = -10;
                const duration = Math.random() * 3000 + 2000;

                particle.style.left = startX + 'px';
                particle.style.top = startY + 'px';

                container.appendChild(particle);

                particle.animate([
                    { transform: 'translate(0, 0)', opacity: 1 },
                    { transform: `translate(${endX - startX}px, ${endY - startY}px)`, opacity: 0 }
                ], {
                    duration: duration,
                    easing: 'linear'
                }).onfinish = () => {
                    particle.remove();
                };
            }

            startContinuousOptimization() {
                this.optimizationInterval = setInterval(() => {
                    this.analyzeAndAdapt();
                }, 10000); // Optimizar cada 10 segundos
            }

            getMetrics() {
                return {
                    ...this.metrics
                };
            }

            getLearningData() {
                return this.learningData;
            }
        }

        // Inicializar sistema IA
        window.adaptiveAI = new AdaptiveAI();
        window.adaptiveAI.init();

        console.log('🤖 Sistema de IA adaptativo inicializado');

    } catch (error) {
        console.error('Error en JS AI System:', error);
    }
});