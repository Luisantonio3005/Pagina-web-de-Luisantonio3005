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

        // Ejecutar inicialización
        init();
        setupMobileResizeHandler();

    } catch (error) {
        console.error('Error en la inicialización:', error);
    }
});