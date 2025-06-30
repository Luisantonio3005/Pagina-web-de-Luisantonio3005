/*
 * ========================================
 * EFECTOS VISUALES AVANZADOS (ESTABLE)
 * ========================================
 * Este script gestiona efectos visuales no esenciales
 * como partículas y brillos. Está diseñado para ser
 * ligero y no interferir con el layout o rendimiento.
 */

class AdvancedEffects {
    constructor() {
        // No se inicializa por defecto para esperar la señal de la IA de rendimiento
        this.isInitialized = false;
    }

    /**
     * Inicia los efectos si el dispositivo no es de gama baja.
     */
    init() {
        // La IA de rendimiento (PerformanceAI) decidirá si llamar a este método.
        this.setupButtonEffects();
        this.setupCertificateEffects();
        this.setupSkillEffects();
        this.isInitialized = true;
        console.log('✨ Efectos visuales avanzados inicializados.');
    }

    /**
     * Configura efectos para los botones de navegación.
     */
    setupButtonEffects() {
        const navButtons = document.querySelectorAll('nav ul li a');

        navButtons.forEach(button => {
            // Efecto de partículas al hacer clic
            button.addEventListener('click', (e) => this.createRippleEffect(e, button), { passive: true });

            // Efecto de brillo al pasar el ratón
            button.addEventListener('mouseenter', (e) => this.createHoverGlow(button), { passive: true });
            button.addEventListener('mouseleave', (e) => this.removeHoverGlow(button), { passive: true });
        });
    }

    /**
     * Configura efectos para los certificados.
     */
    setupCertificateEffects() {
        const certificates = document.querySelectorAll('.certificate');
        certificates.forEach(cert => {
            cert.addEventListener('mouseenter', () => this.createHologramScan(cert), { passive: true });
        });
    }

    /**
     * Configura efectos para las habilidades.
     */
    setupSkillEffects() {
        const skillCategories = document.querySelectorAll('.skill-category');
        skillCategories.forEach(skill => {
            skill.addEventListener('mouseenter', () => this.createEnergyField(skill), { passive: true });
        });
    }

    // --- FUNCIONES DE EFECTOS (LIGERAS Y OPTIMIZADAS) ---

    createRippleEffect(event, button) {
        const ripple = document.createElement('span');
        ripple.className = 'ripple-effect';
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
        ripple.style.top = `${event.clientY - rect.top - size / 2}px`;

        // Usar requestAnimationFrame para asegurar que el DOM está listo
        requestAnimationFrame(() => {
            button.appendChild(ripple);
            // Limpiar el elemento después de la animación
            setTimeout(() => ripple.remove(), 600);
        });
    }

    createHoverGlow(button) {
        if (button.querySelector('.hover-glow')) return;
        const glow = document.createElement('span');
        glow.className = 'hover-glow';
        button.appendChild(glow);
    }


    removeHoverGlow(button) {
        const glow = button.querySelector('.hover-glow');
        if (glow) {
            glow.style.opacity = '0';
            setTimeout(() => glow.remove(), 300);
        }
    }

    createHologramScan(element) {
        if (element.querySelector('.hologram-scan')) return;
        const scan = document.createElement('span');
        scan.className = 'hologram-scan';
        element.appendChild(scan);
        setTimeout(() => scan.remove(), 1000);
    }

    createEnergyField(element) {
        if (element.querySelector('.energy-field')) return;
        const field = document.createElement('span');
        field.className = 'energy-field';
        element.appendChild(field);
        setTimeout(() => field.remove(), 2000);
    }
}