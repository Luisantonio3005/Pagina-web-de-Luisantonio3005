// Configuración global
const CONFIG = {
    animationDuration: 500,
    scrollThreshold: 100
};

// Utilidades
const utils = {
    // Debounce para optimizar eventos
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle para optimizar eventos
    throttle(func, limit) {
        let inThrottle;
        return function executedFunction(...args) {
            if (!inThrottle) {
                func(...args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

// Gestión de animaciones
const animations = {
    fadeIn(element) {
        element.style.opacity = 0;
        element.style.display = 'block';

        let opacity = 0;
        const timer = setInterval(() => {
            if (opacity >= 1) {
                clearInterval(timer);
            }
            element.style.opacity = opacity;
            opacity += 0.1;
        }, CONFIG.animationDuration / 10);
    },

    fadeOut(element) {
        let opacity = 1;
        const timer = setInterval(() => {
            if (opacity <= 0) {
                clearInterval(timer);
                element.style.display = 'none';
            }
            element.style.opacity = opacity;
            opacity -= 0.1;
        }, CONFIG.animationDuration / 10);
    }
};

// Gestión de scroll
const scrollHandler = {
    init() {
        window.addEventListener('scroll', utils.throttle(() => {
            this.handleScroll();
        }, 100));
    },

    handleScroll() {
        const scrollPosition = window.scrollY;
        const elements = document.querySelectorAll('.animate-on-scroll');

        elements.forEach(element => {
            if (this.isElementInViewport(element) && !element.classList.contains('animated')) {
                element.classList.add('animated');
                animations.fadeIn(element);
            }
        });
    },

    isElementInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
};

// Gestión de navegación
const navigation = {
    init() {
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.scrollToSection(targetId);
            });
        });
    },

    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            window.scrollTo({
                top: section.offsetTop - 50,
                behavior: 'smooth'
            });
        }
    }
};

// Optimización de carga de imágenes
const imageLoader = {
    init() {
        this.preloadCriticalImages();
        this.setupLazyLoading();
        this.setupImagePlaceholders();
    },

    preloadCriticalImages() {
        const criticalImages = [
            'img/logo.png',
            'img/background.jpg'
        ];

        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    },

    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.loadImage(entry.target);
                        imageObserver.unobserve(entry.target);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            // Fallback para navegadores que no soportan IntersectionObserver
            this.loadAllImages();
        }
    },

    loadImage(img) {
        if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        }
    },

    loadAllImages() {
        document.querySelectorAll('img[data-src]').forEach(img => {
            this.loadImage(img);
        });
    },

    setupImagePlaceholders() {
        document.querySelectorAll('img[data-src]').forEach(img => {
            // Crear placeholder mientras la imagen carga
            const placeholder = document.createElement('div');
            placeholder.className = 'image-placeholder';
            placeholder.style.width = img.width || '100%';
            placeholder.style.height = img.height || '200px';
            placeholder.style.backgroundColor = '#f0f0f0';

            img.parentNode.insertBefore(placeholder, img);
            img.style.display = 'none';

            img.onload = () => {
                placeholder.remove();
                img.style.display = 'block';
            };
        });
    }
};

// Optimizaciones de rendimiento
const performance = {
    init() {
        this.setupPerformanceMonitoring();
        this.optimizeAnimations();
    },

    setupPerformanceMonitoring() {
        if (window.performance && window.performance.timing) {
            window.addEventListener('load', () => {
                const timing = window.performance.timing;
                const loadTime = timing.loadEventEnd - timing.navigationStart;
                console.log('Tiempo de carga:', loadTime + 'ms');
            });
        }
    },

    optimizeAnimations() {
        // Optimizar animaciones usando requestAnimationFrame
        const animatedElements = document.querySelectorAll('.animate');
        animatedElements.forEach(element => {
            element.style.willChange = 'transform, opacity';
        });
    }
};

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar componentes
    initializeComponents();

    // Configurar observadores
    setupObservers();

    // Inicializar cargador de imágenes
    imageLoader.init();
});

// Gestor de componentes
const componentManager = {
    components: new Map(),

    register(name, component) {
        this.components.set(name, component);
    },

    get(name) {
        return this.components.get(name);
    }
};

// Inicialización de componentes
function initializeComponents() {
    // Registrar componentes
    componentManager.register('nav', {
        init() {
            const nav = document.querySelector('nav');
            if (!nav) return;

            // Optimizar navegación
            const links = nav.querySelectorAll('a');
            links.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const target = document.querySelector(link.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                });
            });
        }
    });

    // Inicializar componentes registrados
    componentManager.components.forEach(component => component.init());
}

// Configuración de observadores
function setupObservers() {
    // Observer para animaciones de secciones
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                sectionObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });

    // Observar secciones
    document.querySelectorAll('section').forEach(section => {
        sectionObserver.observe(section);
    });
}

// Inicializar optimizaciones
performance.init();

// Exportar módulos si es necesario
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        utils,
        animations,
        scrollHandler,
        navigation
    };
}