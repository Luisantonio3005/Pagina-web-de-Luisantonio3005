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
            const isLowMemory = navigator.deviceMemory && navigator.deviceMemory < 4;
            const isSlowConnection = navigator.connection &&
                (navigator.connection.effectiveType === 'slow-2g' || navigator.connection.effectiveType === '2g');
            return isSmallScreen || isLowMemory || isSlowConnection;
        };

        // Función de scroll suave optimizada
        const smoothScroll = (targetId) => {
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;

            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = isLowEndDevice() ? 400 : 800;
            let start = null;

            const animation = (currentTime) => {
                if (!start) start = currentTime;
                const timeElapsed = currentTime - start;
                const progress = Math.min(timeElapsed / duration, 1);
                const easeProgress = 0.5 * (1 - Math.cos(Math.PI * progress)); // Ease in-out
                window.scrollTo(0, startPosition + distance * easeProgress);
                if (timeElapsed < duration) requestAnimationFrame(animation);
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
                    smoothScroll(targetId);
                });
            });
        };

        // --- LAZY LOADING PARA IMÁGENES ---
        const setupLazyLoading = () => {
            const lazyImages = document.querySelectorAll('img[loading="lazy"]');

            if ('IntersectionObserver' in window) {
                const lazyImageObserver = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const lazyImage = entry.target;
                            lazyImage.classList.add('is-visible');
                            lazyImageObserver.unobserve(lazyImage);
                        }
                    });
                });

                lazyImages.forEach(lazyImage => {
                    lazyImageObserver.observe(lazyImage);
                });
            }
        };

        // --- NUEVO SISTEMA DE ANIMACIÓN ESTABLE ---
        const setupScrollAnimations = () => {
            const elementsToAnimate = document.querySelectorAll('header, section, footer');

            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1 // Animar cuando el 10% del elemento es visible
            };

            const handleIntersection = (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        // Una vez animado, no es necesario seguir observándolo
                        observer.unobserve(entry.target);
                    }
                });
            };

            const observer = new IntersectionObserver(handleIntersection, observerOptions);

            elementsToAnimate.forEach(el => {
                // Añadir clase base para preparar la animación desde CSS
                el.classList.add('animate-on-scroll');
                observer.observe(el);
            });
        };

        // Configurar loading animation
        const setupLoadingAnimation = () => {
            const loading = document.getElementById('loading');
            if (loading) {
                window.addEventListener('load', () => {
                    loading.style.opacity = '0';
                    setTimeout(() => {
                        loading.style.display = 'none';
                    }, 500);
                });
            }
        };

        // Inicialización
        const init = () => {
            setupLoadingAnimation();
            setupNavigation();
            setupScrollAnimations(); // Activar el nuevo sistema de animación
            setupLazyLoading(); // Activar lazy loading

            // Disparar evento de inicialización completa para otros scripts
            document.dispatchEvent(new CustomEvent('jsBaseReady'));
        };

        // Iniciar
        init();

    } catch (error) {
        console.error('Error en JS Base:', error);
    }
});