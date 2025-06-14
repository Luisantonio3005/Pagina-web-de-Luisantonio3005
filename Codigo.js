console.log("Página Creada por Luis Antonio Canales Guerrero");
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Marcar el body como listo para las animaciones
        document.body.classList.add('js-ready');

        // Configuración del Intersection Observer con opciones optimizadas
        const observerOptions = {
            root: null,
            rootMargin: '-50px',
            threshold: [0.1, 0.5],
            trackVisibility: true,
            delay: 100
        };

        // Callback optimizado para el observer
        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    requestAnimationFrame(() => {
                        entry.target.classList.add('is-visible');
                        entry.target.classList.remove('not-visible');
                    });
                } else {
                    requestAnimationFrame(() => {
                        entry.target.classList.remove('is-visible');
                        entry.target.classList.add('not-visible');
                    });
                }
            });
        };

        // Crear el observer con manejo de errores
        let observer;
        try {
            observer = new IntersectionObserver(observerCallback, observerOptions);
        } catch (error) {
            console.warn('IntersectionObserver no soportado:', error);
            // Fallback para navegadores que no soportan IntersectionObserver
            document.querySelectorAll('section, footer').forEach(element => {
                element.classList.add('is-visible');
            });
            return;
        }

        // Observar elementos con debounce para mejor rendimiento
        const observeElements = () => {
            document.querySelectorAll('section, footer').forEach(element => {
                observer.observe(element);
                element.classList.add('not-visible');
            });
        };

        // Scroll suave optimizado
        const smoothScroll = (e) => {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 1000;
                let start = null;

                const animation = (currentTime) => {
                    if (start === null) start = currentTime;
                    const timeElapsed = currentTime - start;
                    const run = ease(timeElapsed, startPosition, distance, duration);
                    window.scrollTo(0, run);
                    if (timeElapsed < duration) requestAnimationFrame(animation);
                };

                // Función de easing para scroll más suave
                const ease = (t, b, c, d) => {
                    t /= d / 2;
                    if (t < 1) return c / 2 * t * t + b;
                    t--;
                    return -c / 2 * (t * (t - 2) - 1) + b;
                };

                requestAnimationFrame(animation);
            }
        };

        // Aplicar scroll suave a los enlaces internos
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', smoothScroll);
        });

        // Optimización del efecto parallax
        let ticking = false;
        const parallaxEffect = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    document.body.style.backgroundPositionY = `${-(scrolled * 0.05)}px`;
                    ticking = false;
                });
                ticking = true;
            }
        };

        // Usar passive event listener para mejor rendimiento
        window.addEventListener('scroll', parallaxEffect, { passive: true });

        // Animación del título principal optimizada
        const mainTitle = document.querySelector('header h1');
        if (mainTitle) {
            const animateTitle = () => {
                mainTitle.style.animation = 'none';
                requestAnimationFrame(() => {
                    mainTitle.style.animation = 'neonPulse 2s infinite';
                });
            };

            mainTitle.addEventListener('mouseover', animateTitle);
        }

        // Iniciar observación de elementos
        observeElements();

    } catch (error) {
        console.error('Error en la inicialización:', error);
        // Fallback para asegurar que el contenido sea visible
        document.querySelectorAll('section, footer').forEach(element => {
            element.classList.add('is-visible');
        });
    }
});
