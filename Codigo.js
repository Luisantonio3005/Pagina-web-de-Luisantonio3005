document.addEventListener('DOMContentLoaded', () => {
    // Marcar el body como listo para las animaciones
    document.body.classList.add('js-ready');

    // Configuración del Intersection Observer
    const observerOptions = {
        root: null, // usar el viewport
        rootMargin: '-50px', // margen negativo para activar un poco antes
        threshold: 0.1 // activar cuando al menos 10% de la sección sea visible
    };

    // Callback para el observer
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Cuando la sección entra en vista
                entry.target.classList.add('is-visible');
                entry.target.classList.remove('not-visible');
            } else {
                // Cuando la sección sale de vista
                entry.target.classList.remove('is-visible');
                entry.target.classList.add('not-visible');
            }
        });
    };

    // Crear el observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observar todas las secciones y el footer
    document.querySelectorAll('section, footer').forEach(element => {
        observer.observe(element);
        // Asegurarse de que el elemento comience como no visible
        element.classList.add('not-visible');
    });

    // Función para el scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Envolver el contenido principal
    const main = document.querySelector('main');
    if (main) {
        const wrapper = document.createElement('div');
        wrapper.className = 'content-wrapper';
        main.parentNode.insertBefore(wrapper, main);
        wrapper.appendChild(main);
    }

    // Efecto parallax más suave
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                document.body.style.backgroundPositionY = -(scrolled * 0.05) + 'px';
                ticking = false;
            });
            ticking = true;
        }
    });

    // Animación del título principal
    const mainTitle = document.querySelector('header h1');
    if (mainTitle) {
        mainTitle.addEventListener('mouseover', () => {
            mainTitle.style.animation = 'none';
            setTimeout(() => {
                mainTitle.style.animation = 'neonPulse 2s infinite';
            }, 10);
        });
    }
});