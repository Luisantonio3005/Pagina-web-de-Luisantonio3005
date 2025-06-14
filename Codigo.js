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

        // Get all navigation links
        const navLinks = document.querySelectorAll('nav ul li a');

        // Add click event listener to each link
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();

                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('active'));

                // Add active class to clicked link
                this.classList.add('active');

                // Get the target section id from the href attribute
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);

                // Scroll to the target section smoothly
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Update active link on scroll
        window.addEventListener('scroll', function() {
            const sections = document.querySelectorAll('section');
            const scrollPosition = window.scrollY;

            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionBottom = sectionTop + section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        });

        // Add loading animation
        const loading = document.getElementById('loading');
        if (loading) {
            window.addEventListener('load', function() {
                loading.style.opacity = '0';
                setTimeout(() => {
                    loading.style.display = 'none';
                }, 500);
            });
        }

    } catch (error) {
        console.error('Error en la inicialización:', error);
        // Fallback para asegurar que el contenido sea visible
        document.querySelectorAll('section, footer').forEach(element => {
            element.classList.add('is-visible');
        });
    }
});