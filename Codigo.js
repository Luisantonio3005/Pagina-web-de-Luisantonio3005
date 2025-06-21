document.addEventListener('DOMContentLoaded', () => {
    try {
        // Configuración inicial
        const body = document.body;
        body.classList.add('js-ready');

        // Función para detectar dispositivos de bajos recursos
        const isLowEndDevice = () => {
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;
            const isSmallScreen = screenWidth <= 720 && screenHeight <= 1280;
            const isVerySmallScreen = screenWidth <= 480 && screenHeight <= 800;
            const isTinyScreen = screenWidth <= 360;
            const isLowMemory = navigator.deviceMemory && navigator.deviceMemory < 4;
            const isSlowConnection = navigator.connection &&
                (navigator.connection.effectiveType === 'slow-2g' ||
                    navigator.connection.effectiveType === '2g');

            return isSmallScreen || isVerySmallScreen || isTinyScreen || isLowMemory || isSlowConnection;
        };

        // Cargar optimizaciones condicionalmente
        const loadLowEndOptimizations = () => {
            if (isLowEndDevice()) {
                console.log('Dispositivo de bajos recursos detectado - cargando optimizaciones');

                // Crear y cargar el CSS de optimizaciones
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = 'low-end-optimizations.css';
                link.id = 'low-end-optimizations';
                document.head.appendChild(link);
            }
        };

        // Función para forzar visibilidad de elementos críticos
        const forceCriticalElementsVisibility = () => {
            // Forzar visibilidad de navegación
            const nav = document.querySelector('nav');
            if (nav) {
                nav.style.display = 'block';
                nav.style.opacity = '1';
                nav.style.visibility = 'visible';
            }

            const navUl = document.querySelector('nav ul');
            if (navUl) {
                navUl.style.display = 'flex';
                navUl.style.opacity = '1';
                navUl.style.visibility = 'visible';
            }

            const navLinks = document.querySelectorAll('nav ul li a');
            navLinks.forEach(link => {
                link.style.display = 'flex';
                link.style.opacity = '1';
                link.style.visibility = 'visible';
            });

            // Forzar visibilidad de habilidades
            const skills = document.querySelector('#mis-habilidades');
            if (skills) {
                skills.style.display = 'block';
                skills.style.opacity = '1';
                skills.style.visibility = 'visible';
            }

            const skillsContainer = document.querySelector('#mis-habilidades .skills-container');
            if (skillsContainer) {
                skillsContainer.style.display = 'grid';
                skillsContainer.style.opacity = '1';
                skillsContainer.style.visibility = 'visible';
            }

            const skillCategories = document.querySelectorAll('#mis-habilidades .skill-category');
            skillCategories.forEach(category => {
                category.style.display = 'block';
                category.style.opacity = '1';
                category.style.visibility = 'visible';
            });

            // Forzar visibilidad de secciones
            const sections = document.querySelectorAll('section');
            sections.forEach(section => {
                section.style.display = 'block';
                section.style.opacity = '1';
                section.style.visibility = 'visible';
            });

            // Forzar visibilidad de textos
            const texts = document.querySelectorAll('h1, h2, h3, p');
            texts.forEach(text => {
                text.style.opacity = '1';
                text.style.visibility = 'visible';
                text.style.display = 'block';
            });
        };

        // Configuración del Intersection Observer
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        // Función para manejar la visibilidad de elementos
        const handleVisibility = (entries) => {
            entries.forEach(entry => {
                const element = entry.target;
                if (entry.isIntersecting) {
                    element.classList.add('is-visible');
                    element.classList.remove('not-visible');
                } else {
                    element.classList.remove('is-visible');
                    element.classList.add('not-visible');
                }
            });
        };

        // Crear y configurar el observer
        const observer = new IntersectionObserver(handleVisibility, observerOptions);

        // Observar elementos
        const observeElements = () => {
            const elements = document.querySelectorAll('section, footer');
            elements.forEach(element => {
                observer.observe(element);
                element.classList.add('not-visible');
            });
        };

        // Función de scroll suave optimizada
        const smoothScroll = (targetId) => {
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;

            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = isLowEndDevice() ? 400 : 600; // Más rápido en dispositivos de bajos recursos
            let start = null;

            const animation = (currentTime) => {
                if (!start) start = currentTime;
                const timeElapsed = currentTime - start;
                const progress = Math.min(timeElapsed / duration, 1);
                const easeProgress = progress * (2 - progress); // Función de easing cuadrática
                window.scrollTo(0, startPosition + distance * easeProgress);

                if (timeElapsed < duration) {
                    requestAnimationFrame(animation);
                }
            };

            requestAnimationFrame(animation);
        };

        // Configurar navegación
        const setupNavigation = () => {
            const navLinks = document.querySelectorAll('nav ul li a');

            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = link.getAttribute('href');

                    // Actualizar clase activa
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');

                    // Scroll suave
                    smoothScroll(targetId);
                });
            });
        };

        // Sistema de detección de viewport para teléfonos
        const setupMobileViewportDetection = () => {
            // Solo aplicar en teléfonos (max-width: 767px)
            if (window.innerWidth > 767) return;

            const navLinks = document.querySelectorAll('nav ul li a[href^="#"]');
            const sections = document.querySelectorAll('section[id]');

            // Función para verificar si una sección está en el viewport
            const isSectionInViewport = (section) => {
                const rect = section.getBoundingClientRect();
                const windowHeight = window.innerHeight;

                // Sección está en viewport si al menos el 50% está visible
                return rect.top < windowHeight * 0.5 && rect.bottom > windowHeight * 0.5;
            };

            // Función para verificar si una sección está completamente visible
            const isSectionFullyVisible = (section) => {
                const rect = section.getBoundingClientRect();
                return rect.top >= 0 && rect.bottom <= window.innerHeight;
            };

            // Función para verificar si una sección está parcialmente visible
            const isSectionPartiallyVisible = (section) => {
                const rect = section.getBoundingClientRect();
                return rect.top < window.innerHeight && rect.bottom > 0;
            };

            // Función para actualizar clases de navegación
            const updateNavigationClasses = () => {
                sections.forEach(section => {
                    const sectionId = section.id;
                    const navLink = document.querySelector(`nav ul li a[href="#${sectionId}"]`);

                    if (navLink) {
                        // Remover todas las clases de estado
                        navLink.classList.remove('section-visible', 'section-in-viewport', 'section-fully-visible', 'section-partially-visible');

                        if (isSectionFullyVisible(section)) {
                            navLink.classList.add('section-visible', 'section-fully-visible');
                            section.classList.add('section-in-viewport', 'section-fully-visible', 'no-scroll-needed');
                        } else if (isSectionPartiallyVisible(section)) {
                            navLink.classList.add('section-partially-visible');
                            section.classList.add('section-partially-visible');
                        }
                    }
                });
            };

            // Función para navegación inteligente en móviles
            const smartMobileNavigation = (e) => {
                e.preventDefault();
                const targetId = e.target.getAttribute('href');
                const targetSection = document.querySelector(targetId);

                if (!targetSection) return;

                // Verificar si la sección ya está en el viewport
                if (isSectionInViewport(targetSection)) {
                    // No hacer scroll, solo actualizar navegación
                    navLinks.forEach(l => l.classList.remove('active'));
                    e.target.classList.add('active');

                    // Agregar clase para evitar animaciones innecesarias
                    targetSection.classList.add('section-already-visible', 'no-animation-needed');

                    // Remover clases después de un tiempo
                    setTimeout(() => {
                        targetSection.classList.remove('section-already-visible', 'no-animation-needed');
                    }, 1000);

                    return;
                }

                // Si no está en viewport, hacer scroll suave
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 400; // Más rápido en móviles
                let start = null;

                const animation = (currentTime) => {
                    if (!start) start = currentTime;
                    const timeElapsed = currentTime - start;
                    const progress = Math.min(timeElapsed / duration, 1);
                    const easeProgress = progress * (2 - progress);
                    window.scrollTo(0, startPosition + distance * easeProgress);

                    if (timeElapsed < duration) {
                        requestAnimationFrame(animation);
                    }
                };

                requestAnimationFrame(animation);

                // Actualizar navegación
                navLinks.forEach(l => l.classList.remove('active'));
                e.target.classList.add('active');
            };

            // Configurar event listeners para navegación móvil
            navLinks.forEach(link => {
                link.addEventListener('click', smartMobileNavigation);
            });

            // Actualizar clases en scroll
            let scrollTimeout;
            const handleScroll = () => {
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    updateNavigationClasses();
                }, 50);
            };

            window.addEventListener('scroll', handleScroll, { passive: true });

            // Actualizar clases inicialmente
            updateNavigationClasses();

            // Sistema de detección de posición exacta
            const setupPositionDetection = () => {
                const observerOptions = {
                    root: null,
                    rootMargin: '-10% 0px -10% 0px',
                    threshold: [0, 0.25, 0.5, 0.75, 1]
                };

                const positionObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        const section = entry.target;
                        const sectionId = section.id;
                        const navLink = document.querySelector(`nav ul li a[href="#${sectionId}"]`);

                        if (navLink) {
                            // Remover clases anteriores
                            section.classList.remove('at-top', 'at-center', 'at-bottom', 'fully-visible', 'partially-visible');
                            navLink.classList.remove('nav-section-visible', 'nav-section-not-visible');

                            if (entry.isIntersecting) {
                                const ratio = entry.intersectionRatio;

                                if (ratio >= 0.8) {
                                    section.classList.add('fully-visible', 'at-center');
                                    navLink.classList.add('nav-section-visible');
                                } else if (ratio >= 0.3) {
                                    section.classList.add('partially-visible');
                                    navLink.classList.add('nav-section-visible');
                                }

                                // Detectar posición específica
                                const rect = section.getBoundingClientRect();
                                const windowHeight = window.innerHeight;

                                if (rect.top >= 0 && rect.top < windowHeight * 0.3) {
                                    section.classList.add('at-top');
                                } else if (rect.bottom <= windowHeight && rect.bottom > windowHeight * 0.7) {
                                    section.classList.add('at-bottom');
                                }
                            } else {
                                navLink.classList.add('nav-section-not-visible');
                            }
                        }
                    });
                }, observerOptions);

                sections.forEach(section => {
                    positionObserver.observe(section);
                });
            };

            setupPositionDetection();
        };

        // Configurar efecto parallax optimizado
        const setupParallax = () => {
            if (isLowEndDevice()) return; // Deshabilitar parallax en dispositivos de bajos recursos

            let ticking = false;

            const handleParallax = () => {
                if (!ticking) {
                    requestAnimationFrame(() => {
                        const scrolled = window.pageYOffset;
                        document.body.style.backgroundPositionY = `${-(scrolled * 0.02)}px`;
                        ticking = false;
                    });
                    ticking = true;
                }
            };

            window.addEventListener('scroll', handleParallax, { passive: true });
        };

        // Configurar animación de carga
        const setupLoadingAnimation = () => {
            const loading = document.getElementById('loading');
            if (loading) {
                window.addEventListener('load', () => {
                    loading.style.opacity = '0';
                    setTimeout(() => {
                        loading.style.display = 'none';
                    }, isLowEndDevice() ? 300 : 500); // Más rápido en dispositivos de bajos recursos
                });
            }
        };

        // Inicializar todo
        const init = () => {
            loadLowEndOptimizations();
            forceCriticalElementsVisibility(); // Forzar visibilidad inmediatamente
            observeElements();
            setupNavigation();
            setupMobileViewportDetection();
            setupParallax();
            setupLoadingAnimation();

            // Forzar visibilidad nuevamente después de un breve delay
            setTimeout(forceCriticalElementsVisibility, 100);
            setTimeout(forceCriticalElementsVisibility, 500);
            setTimeout(forceCriticalElementsVisibility, 1000);
        };

        // Sistema de manejo de resize y orientación para móviles
        const setupMobileResizeHandler = () => {
            let resizeTimeout;

            const handleResize = () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    // Reconfigurar el sistema de detección de viewport si es necesario
                    if (window.innerWidth <= 767) {
                        setupMobileViewportDetection();
                    }

                    // Limpiar clases que puedan haber quedado de orientación anterior
                    const sections = document.querySelectorAll('section');
                    const navLinks = document.querySelectorAll('nav ul li a[href^="#"]');

                    sections.forEach(section => {
                        section.classList.remove(
                            'section-in-viewport', 'section-fully-visible', 'section-partially-visible',
                            'section-already-visible', 'no-animation-needed', 'no-scroll-needed',
                            'at-top', 'at-center', 'at-bottom', 'fully-visible', 'partially-visible'
                        );
                    });

                    navLinks.forEach(link => {
                        link.classList.remove(
                            'section-visible', 'section-in-viewport', 'section-fully-visible',
                            'section-partially-visible', 'nav-section-visible', 'nav-section-not-visible'
                        );
                    });

                    // Reforzar visibilidad después del resize
                    setTimeout(forceCriticalElementsVisibility, 100);
                }, 250);
            };

            window.addEventListener('resize', handleResize, { passive: true });
            window.addEventListener('orientationchange', handleResize, { passive: true });
        };

        // ========================================
        // SISTEMA DE IA INTELIGENTE PARA ADAPTACIÓN DINÁMICA
        // ========================================

        class AdaptiveAI {
            constructor() {
                this.performanceMetrics = {
                    fps: 60,
                    memoryUsage: 0,
                    cpuUsage: 0,
                    batteryLevel: 1,
                    networkSpeed: 'fast',
                    deviceType: 'unknown',
                    animationQuality: 'high',
                    particleCount: 8,
                    glowIntensity: 1,
                    transitionSpeed: 0.3
                };

                this.learningData = {
                    frameDrops: 0,
                    memoryWarnings: 0,
                    batteryDrain: 0,
                    userInteractions: 0,
                    performanceHistory: []
                };

                this.adaptationRules = {
                    lowPerformance: {
                        animationQuality: 'low',
                        particleCount: 0,
                        glowIntensity: 0.3,
                        transitionSpeed: 0.1,
                        enableParallax: false,
                        enableParticles: false,
                        enableHologram: false,
                        enableEnergyField: false
                    },
                    mediumPerformance: {
                        animationQuality: 'medium',
                        particleCount: 3,
                        glowIntensity: 0.6,
                        transitionSpeed: 0.2,
                        enableParallax: true,
                        enableParticles: true,
                        enableHologram: false,
                        enableEnergyField: false
                    },
                    highPerformance: {
                        animationQuality: 'high',
                        particleCount: 6,
                        glowIntensity: 0.8,
                        transitionSpeed: 0.3,
                        enableParallax: true,
                        enableParticles: true,
                        enableHologram: true,
                        enableEnergyField: true
                    },
                    ultraPerformance: {
                        animationQuality: 'ultra-high',
                        particleCount: 12,
                        glowIntensity: 1,
                        transitionSpeed: 0.4,
                        enableParallax: true,
                        enableParticles: true,
                        enableHologram: true,
                        enableEnergyField: true,
                        enableSpatialDistortion: true,
                        enableMagneticField: true
                    }
                };

                this.init();
            }

            // Inicializar el sistema de IA
            init() {
                this.detectDeviceCapabilities();
                this.setupPerformanceMonitoring();
                this.setupAdaptiveLearning();
                this.applyOptimalSettings();
                this.startContinuousOptimization();
            }

            // Detectar capacidades del dispositivo
            detectDeviceCapabilities() {
                // Detección de tipo de dispositivo
                const screenWidth = window.innerWidth;
                const screenHeight = window.innerHeight;
                const pixelRatio = window.devicePixelRatio || 1;
                const memory = navigator.deviceMemory || 4;
                const cores = navigator.hardwareConcurrency || 4;
                const connection = navigator.connection || { effectiveType: '4g' };

                // Clasificación inteligente del dispositivo
                if (screenWidth <= 480 && memory <= 2) {
                    this.performanceMetrics.deviceType = 'low-end-mobile';
                } else if (screenWidth <= 768 && memory <= 4) {
                    this.performanceMetrics.deviceType = 'mid-range-mobile';
                } else if (screenWidth <= 1024 && memory <= 8) {
                    this.performanceMetrics.deviceType = 'tablet';
                } else if (screenWidth > 1024 && memory > 8) {
                    this.performanceMetrics.deviceType = 'high-end-desktop';
                } else {
                    this.performanceMetrics.deviceType = 'standard-desktop';
                }

                // Evaluación de rendimiento basada en múltiples factores
                let performanceScore = 0;

                // Factor de memoria (0-25 puntos)
                performanceScore += Math.min(memory * 5, 25);

                // Factor de CPU (0-25 puntos)
                performanceScore += Math.min(cores * 2.5, 25);

                // Factor de pantalla (0-25 puntos)
                performanceScore += Math.min((screenWidth * screenHeight) / 100000, 25);

                // Factor de conexión (0-25 puntos)
                const connectionScores = { 'slow-2g': 5, '2g': 10, '3g': 15, '4g': 20, '5g': 25 };
                performanceScore += connectionScores[connection.effectiveType] || 15;

                // Clasificación de rendimiento
                if (performanceScore < 30) {
                    this.performanceMetrics.animationQuality = 'low';
                } else if (performanceScore < 60) {
                    this.performanceMetrics.animationQuality = 'medium';
                } else if (performanceScore < 90) {
                    this.performanceMetrics.animationQuality = 'high';
                } else {
                    this.performanceMetrics.animationQuality = 'ultra-high';
                }

                console.log(`🔍 IA detectó: ${this.performanceMetrics.deviceType} (Score: ${performanceScore})`);
            }

            // Configurar monitoreo de rendimiento
            setupPerformanceMonitoring() {
                let frameCount = 0;
                let lastTime = performance.now();
                let frameDrops = 0;

                const measurePerformance = () => {
                    const currentTime = performance.now();
                    const deltaTime = currentTime - lastTime;

                    // Calcular FPS
                    if (deltaTime > 0) {
                        const currentFPS = 1000 / deltaTime;
                        this.performanceMetrics.fps = currentFPS;

                        // Detectar caída de frames
                        if (currentFPS < 30) {
                            frameDrops++;
                            this.learningData.frameDrops++;
                        }
                    }

                    // Monitorear uso de memoria
                    if ('memory' in performance) {
                        this.performanceMetrics.memoryUsage = performance.memory.usedJSHeapSize / performance.memory.jsHeapSizeLimit;
                    }

                    // Monitorear batería
                    if ('getBattery' in navigator) {
                        navigator.getBattery().then(battery => {
                            this.performanceMetrics.batteryLevel = battery.level;
                            if (battery.level < 0.2) {
                                this.learningData.batteryDrain++;
                            }
                        });
                    }

                    lastTime = currentTime;
                    frameCount++;

                    // Ajustar configuración si es necesario
                    if (frameCount % 60 === 0) {
                        this.analyzeAndAdapt();
                    }

                    requestAnimationFrame(measurePerformance);
                };

                requestAnimationFrame(measurePerformance);
            }

            // Sistema de aprendizaje adaptativo
            setupAdaptiveLearning() {
                let interactionCount = 0;
                let lastInteractionTime = Date.now();

                // Monitorear interacciones del usuario
                const trackInteraction = () => {
                    interactionCount++;
                    this.learningData.userInteractions++;
                    lastInteractionTime = Date.now();

                    // Ajustar basado en patrones de uso
                    if (interactionCount > 10) {
                        this.optimizeForUserBehavior();
                    }
                };

                // Event listeners para interacciones
                document.addEventListener('click', trackInteraction, { passive: true });
                document.addEventListener('scroll', trackInteraction, { passive: true });
                document.addEventListener('touchstart', trackInteraction, { passive: true });

                // Monitorear rendimiento en tiempo real
                setInterval(() => {
                    this.learningData.performanceHistory.push({
                        fps: this.performanceMetrics.fps,
                        memoryUsage: this.performanceMetrics.memoryUsage,
                        timestamp: Date.now()
                    });

                    // Mantener solo los últimos 100 registros
                    if (this.learningData.performanceHistory.length > 100) {
                        this.learningData.performanceHistory.shift();
                    }
                }, 1000);
            }

            // Analizar y adaptar configuración
            analyzeAndAdapt() {
                const avgFPS = this.calculateAverageFPS();
                const avgMemoryUsage = this.calculateAverageMemoryUsage();
                const recentFrameDrops = this.learningData.frameDrops;

                // Algoritmo de decisión inteligente
                let shouldDowngrade = false;
                let shouldUpgrade = false;

                // Condiciones para degradar
                if (avgFPS < 30 || avgMemoryUsage > 0.8 || recentFrameDrops > 5) {
                    shouldDowngrade = true;
                }

                // Condiciones para mejorar
                if (avgFPS > 55 && avgMemoryUsage < 0.5 && recentFrameDrops < 2) {
                    shouldUpgrade = true;
                }

                // Aplicar cambios si es necesario
                if (shouldDowngrade) {
                    this.downgradePerformance();
                } else if (shouldUpgrade) {
                    this.upgradePerformance();
                }

                // Resetear contadores
                this.learningData.frameDrops = 0;
            }

            // Calcular FPS promedio
            calculateAverageFPS() {
                const recentFPS = this.learningData.performanceHistory
                    .slice(-10)
                    .map(record => record.fps);

                return recentFPS.reduce((sum, fps) => sum + fps, 0) / recentFPS.length;
            }

            // Calcular uso de memoria promedio
            calculateAverageMemoryUsage() {
                const recentMemory = this.learningData.performanceHistory
                    .slice(-10)
                    .map(record => record.memoryUsage);

                return recentMemory.reduce((sum, usage) => sum + usage, 0) / recentMemory.length;
            }

            // Optimizar basado en comportamiento del usuario
            optimizeForUserBehavior() {
                const timeSinceLastInteraction = Date.now() - this.learningData.userInteractions;

                // Si el usuario está inactivo, reducir animaciones
                if (timeSinceLastInteraction > 30000) {
                    this.applySettings(this.adaptationRules.lowPerformance);
                }
            }

            // Degradar rendimiento
            downgradePerformance() {
                const currentQuality = this.performanceMetrics.animationQuality;

                if (currentQuality === 'ultra-high') {
                    this.applySettings(this.adaptationRules.highPerformance);
                } else if (currentQuality === 'high') {
                    this.applySettings(this.adaptationRules.mediumPerformance);
                } else if (currentQuality === 'medium') {
                    this.applySettings(this.adaptationRules.lowPerformance);
                }
            }

            // Mejorar rendimiento
            upgradePerformance() {
                const currentQuality = this.performanceMetrics.animationQuality;

                if (currentQuality === 'low') {
                    this.applySettings(this.adaptationRules.mediumPerformance);
                } else if (currentQuality === 'medium') {
                    this.applySettings(this.adaptationRules.highPerformance);
                } else if (currentQuality === 'high') {
                    this.applySettings(this.adaptationRules.ultraPerformance);
                }
            }

            // Aplicar configuración óptima inicial
            applyOptimalSettings() {
                const quality = this.performanceMetrics.animationQuality;

                switch (quality) {
                    case 'low':
                        this.applySettings(this.adaptationRules.lowPerformance);
                        break;
                    case 'medium':
                        this.applySettings(this.adaptationRules.mediumPerformance);
                        break;
                    case 'high':
                        this.applySettings(this.adaptationRules.highPerformance);
                        break;
                    case 'ultra-high':
                        this.applySettings(this.adaptationRules.ultraPerformance);
                        break;
                }
            }

            // Aplicar configuración específica
            applySettings(settings) {
                // Actualizar métricas
                this.performanceMetrics.animationQuality = settings.animationQuality;
                this.performanceMetrics.particleCount = settings.particleCount;
                this.performanceMetrics.glowIntensity = settings.glowIntensity;
                this.performanceMetrics.transitionSpeed = settings.transitionSpeed;

                // Aplicar clases CSS
                document.body.classList.remove('ai-low-performance', 'ai-medium-performance', 'ai-high-performance', 'ai-ultra-performance');
                document.body.classList.add(`ai-${settings.animationQuality.replace('-', '-')}-performance`);

                // Aplicar variables CSS
                document.documentElement.style.setProperty('--animation-quality', settings.animationQuality);
                document.documentElement.style.setProperty('--particle-count', settings.particleCount);
                document.documentElement.style.setProperty('--glow-intensity', settings.glowIntensity);
                document.documentElement.style.setProperty('--transition-speed', settings.transitionSpeed + 's');

                // Configurar funcionalidades
                this.configureFeatures(settings);

                console.log(`🤖 IA aplicó: ${settings.animationQuality} (Partículas: ${settings.particleCount}, Glow: ${settings.glowIntensity})`);
            }

            // Configurar características específicas
            configureFeatures(settings) {
                // Parallax
                if (settings.enableParallax) {
                    this.enableParallax();
                } else {
                    this.disableParallax();
                }

                // Partículas
                if (settings.enableParticles) {
                    this.enableParticles();
                } else {
                    this.disableParticles();
                }

                // Efectos avanzados
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

            // Habilitar/deshabilitar características
            enableParallax() {
                document.body.classList.add('parallax-enabled');
            }

            disableParallax() {
                document.body.classList.remove('parallax-enabled');
            }

            enableParticles() {
                document.body.classList.add('particles-enabled');
                this.createParticleSystem();
            }

            disableParticles() {
                document.body.classList.remove('particles-enabled');
                this.removeParticleSystem();
            }

            enableHologram() {
                document.body.classList.add('hologram-enabled');
            }

            enableEnergyField() {
                document.body.classList.add('energy-field-enabled');
            }

            enableSpatialDistortion() {
                document.body.classList.add('spatial-distortion-enabled');
            }

            enableMagneticField() {
                document.body.classList.add('magnetic-field-enabled');
            }

            // Sistema de partículas
            createParticleSystem() {
                const particleContainer = document.createElement('div');
                particleContainer.className = 'ai-particle-container';
                particleContainer.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: 1000;
                `;
                document.body.appendChild(particleContainer);

                this.particleContainer = particleContainer;
                this.animateParticles();
            }

            removeParticleSystem() {
                if (this.particleContainer) {
                    this.particleContainer.remove();
                    this.particleContainer = null;
                }
            }

            animateParticles() {
                if (!this.particleContainer) return;

                const particleCount = this.performanceMetrics.particleCount;
                const particles = [];

                for (let i = 0; i < particleCount; i++) {
                    const particle = document.createElement('div');
                    particle.className = 'ai-particle';
                    particle.style.cssText = `
                        position: absolute;
                        width: 2px;
                        height: 2px;
                        background: var(--neon-blue);
                        border-radius: 50%;
                        opacity: 0;
                        animation: aiParticleFloat 3s ease-in-out infinite;
                        animation-delay: ${Math.random() * 3}s;
                    `;

                    particle.style.left = Math.random() * 100 + '%';
                    particle.style.top = Math.random() * 100 + '%';

                    this.particleContainer.appendChild(particle);
                    particles.push(particle);
                }

                // Limpiar partículas después de la animación
                setTimeout(() => {
                    particles.forEach(p => p.remove());
                    if (this.particleContainer) {
                        this.animateParticles();
                    }
                }, 3000);
            }

            // Optimización continua
            startContinuousOptimization() {
                setInterval(() => {
                    this.analyzeAndAdapt();
                }, 5000); // Analizar cada 5 segundos
            }

            // Obtener métricas actuales
            getMetrics() {
                return {...this.performanceMetrics };
            }

            // Obtener datos de aprendizaje
            getLearningData() {
                return {...this.learningData };
            }
        }

        // Inicializar el sistema de IA
        const adaptiveAI = new AdaptiveAI();

        // Ejecutar inicialización
        init();
        setupMobileResizeHandler();

    } catch (error) {
        console.error('Error en la inicialización:', error);
    }
});