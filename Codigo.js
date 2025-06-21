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
            setupParallax();
            setupLoadingAnimation();

            // Forzar visibilidad nuevamente después de un breve delay
            setTimeout(forceCriticalElementsVisibility, 100);
            setTimeout(forceCriticalElementsVisibility, 500);
            setTimeout(forceCriticalElementsVisibility, 1000);
        };

        // Ejecutar inicialización
        init();

    } catch (error) {
        console.error('Error en la inicialización:', error);
    }
});