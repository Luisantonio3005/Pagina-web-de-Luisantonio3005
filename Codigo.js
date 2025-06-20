document.addEventListener('DOMContentLoaded', () => {
    try {
        // Configuración inicial
        const body = document.body;
        body.classList.add('js-ready');

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
            const duration = 600;
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
                    }, 500);
                });
            }
        };

        // Inicializar todo
        const init = () => {
            observeElements();
            setupNavigation();
            setupParallax();
            setupLoadingAnimation();
        };

        // Ejecutar inicialización
        init();

    } catch (error) {
        console.error('Error en la inicialización:', error);
        // Fallback para asegurar que el contenido sea visible
        document.querySelectorAll('section, footer').forEach(element => {
            element.classList.add('is-visible');
        });
    }
});