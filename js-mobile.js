/*
 * ========================================
 * JS MOBILE - Navegación Móvil
 * ========================================
 */

document.addEventListener('jsBaseReady', () => {
    try {
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
                const windowHeight = window.innerHeight;
                return rect.top < windowHeight && rect.bottom > 0;
            };

            // Función para actualizar clases de navegación
            const updateNavigationClasses = () => {
                navLinks.forEach(link => {
                    const targetId = link.getAttribute('href');
                    const targetSection = document.querySelector(targetId);

                    if (targetSection) {
                        if (isSectionInViewport(targetSection)) {
                            navLinks.forEach(l => l.classList.remove('active'));
                            link.classList.add('active');
                        }
                    }
                });
            };

            // Navegación inteligente para móviles
            const smartMobileNavigation = (e) => {
                e.preventDefault();
                const targetId = e.currentTarget.getAttribute('href');
                const targetSection = document.querySelector(targetId);

                if (!targetSection) return;

                // Verificar si la sección ya está en el viewport
                if (isSectionInViewport(targetSection)) {
                    // Solo actualizar clases, no hacer scroll
                    navLinks.forEach(l => l.classList.remove('active'));
                    e.currentTarget.classList.add('active');
                    return;
                }

                // Scroll suave optimizado para móviles
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 300; // Más rápido en móviles
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

                // Actualizar clases
                navLinks.forEach(l => l.classList.remove('active'));
                e.currentTarget.classList.add('active');
            };

            // Configurar eventos de scroll
            const handleScroll = () => {
                updateNavigationClasses();
            };

            // Configurar detección de posición
            const setupPositionDetection = () => {
                let scrollTimeout;

                window.addEventListener('scroll', () => {
                    clearTimeout(scrollTimeout);
                    scrollTimeout = setTimeout(handleScroll, 50);
                }, { passive: true });

                // Detección inicial
                handleScroll();
            };

            // Configurar eventos de navegación
            navLinks.forEach(link => {
                link.removeEventListener('click', smartMobileNavigation);
                link.addEventListener('click', smartMobileNavigation);
            });

            // Inicializar detección de posición
            setupPositionDetection();
        };

        // Configurar resize handler para móviles
        const setupMobileResizeHandler = () => {
            let resizeTimeout;

            const handleResize = () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    const isMobile = window.innerWidth <= 767;

                    if (isMobile) {
                        setupMobileViewportDetection();
                    } else {
                        // Resetear para desktop
                        const navLinks = document.querySelectorAll('nav ul li a[href^="#"]');
                        navLinks.forEach(link => {
                            link.removeEventListener('click', smartMobileNavigation);
                        });
                    }
                }, 250);
            };

            window.addEventListener('resize', handleResize, { passive: true });

            // Detección inicial
            handleResize();
        };

        // Inicializar navegación móvil
        setupMobileViewportDetection();
        setupMobileResizeHandler();

    } catch (error) {
        console.error('Error en JS Mobile:', error);
    }
});