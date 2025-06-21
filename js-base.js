/*
 * ========================================
 * JS BASE - Funciones Fundamentales
 * ========================================
 */

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

        // Función de scroll suave optimizada
        const smoothScroll = (targetId) => {
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;

            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = isLowEndDevice() ? 400 : 600;
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

        // Función para forzar visibilidad de elementos críticos
        const forceCriticalElementsVisibility = () => {
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

            const sections = document.querySelectorAll('section');
            sections.forEach(section => {
                section.style.display = 'block';
                section.style.opacity = '1';
                section.style.visibility = 'visible';
            });

            const texts = document.querySelectorAll('h1, h2, h3, p');
            texts.forEach(text => {
                text.style.opacity = '1';
                text.style.visibility = 'visible';
                text.style.display = 'block';
            });
        };

        // Configurar loading animation
        const setupLoadingAnimation = () => {
            const loading = document.getElementById('loading');
            if (loading) {
                setTimeout(() => {
                    loading.style.opacity = '0';
                    setTimeout(() => {
                        loading.style.display = 'none';
                    }, 500);
                }, 1000);
            }
        };

        // Inicialización
        const init = () => {
            setupLoadingAnimation();
            setupNavigation();
            observeElements();
            forceCriticalElementsVisibility();

            // Disparar evento de inicialización completa
            document.dispatchEvent(new CustomEvent('jsBaseReady'));
        };

        // Iniciar
        init();

    } catch (error) {
        console.error('Error en JS Base:', error);
    }
});