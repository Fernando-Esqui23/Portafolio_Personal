
// script.js - Versión optimizada y mejorada

// Función para animar elementos al hacer scroll
function setupScrollAnimations() {
    // Configuración del observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -20px 0px'
    };

    // Observer para elementos animables
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Para secciones principales
                if (entry.target.classList.contains('fade-in-section')) {
                    entry.target.classList.add('visible');
                }
                // Para elementos individuales
                else {
                    entry.target.classList.add('animate');
                }
                
                // Animación especial para barras de habilidades
                if (entry.target.classList.contains('habilidad')) {
                    const progressBar = entry.target.querySelector('.progreso');
                    const percentage = entry.target.querySelector('.percentage').getAttribute('data-percent');
                    progressBar.style.width = percentage;
                }
            }
        });
    }, observerOptions);

    // Observar todos los elementos animables
    document.querySelectorAll('.fade-in-section, .proyecto-card, .certificado-card, .habilidad, .sobre-mi-card').forEach((element) => {
        animationObserver.observe(element);
    });
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Agregar clases a secciones
    document.querySelectorAll('.hero, .sobre-mi, .habilidades, .proyectos, .certificados, .contacto').forEach((section) => {
        section.classList.add('fade-in-section');
    });

    // Animación inicial para el hero
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        setTimeout(() => {
            heroSection.classList.add('visible');
        }, 300);
    }

    // Configurar animaciones de scroll
    setupScrollAnimations();

    // [El resto de tu código de traducciones, formulario, etc.]
});

// Agregar clases fade-in-section a las secciones existentes
function addFadeInClasses() {
    const sectionsToAnimate = [
        '.hero',
        '.sobre-mi', 
        '.habilidades', 
        '.proyectos', 
        '.certificados',
        '.contacto'
    ];
    
    sectionsToAnimate.forEach(selector => {
        const section = document.querySelector(selector);
        if (section && !section.classList.contains('fade-in-section')) {
            section.classList.add('fade-in-section');
        }
    });
}

// Inicializar animaciones cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Agregar las clases necesarias
    addFadeInClasses();
    
    // Inicializar animaciones
    setTimeout(() => {
        animateOnScroll();
    }, 100);
    
    // Animación inicial para el hero (aparecer inmediatamente)
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        setTimeout(() => {
            heroSection.classList.add('visible');
        }, 300);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    // Función para cambiar el idioma
    function updateContent(language) {
        // Actualizar atributo lang del HTML
        document.documentElement.lang = language;
        
        // Actualizar todos los elementos con data-i18n
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[language][key]) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translations[language][key];
                } else {
                    element.textContent = translations[language][key];
                }
            }
        });
    }

    

    // Evento para el selector de idioma
    document.getElementById('language-selector').addEventListener('change', (e) => {
        const language = e.target.value;
        localStorage.setItem('language', language);
        updateContent(language);
    });

    // Cargar idioma guardado o predeterminado
    const savedLanguage = localStorage.getItem('language') || 'es';
    document.getElementById('language-selector').value = savedLanguage;
    updateContent(savedLanguage);

    // Resto de tu código existente...
    const contactBtn = document.getElementById("contact-btn");
    const form = document.getElementById("contact-form");
    const formMessage = document.getElementById("form-message");
    const downloadCVBtn = document.getElementById("download-cv");

    contactBtn.addEventListener("click", () => {
        document.getElementById("contacto").scrollIntoView({ behavior: "smooth" });
    });

    downloadCVBtn.addEventListener("click", () => {
        window.open("https://drive.google.com/file/d/1-kUy0xbvhMY-AxBwiYHgmfxBF5bF8kCC/view?usp=drive_link", "_blank");
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();
        
        if (name === "" || email === "" || message === "") {
            formMessage.textContent = translations[document.documentElement.lang]['form-error'] || "Por favor, completa todos los campos.";
            formMessage.style.color = "red";
            return;
        }
        
        formMessage.textContent = translations[document.documentElement.lang]['form-success'] || "Mensaje enviado con éxito.";
        formMessage.style.color = "green";
        form.reset();
    });

    // Animación de habilidades (código existente)
    const cargarBarrasSecuencial = () => {
        const habilidades = document.querySelectorAll('.habilidad');
        
        habilidades.forEach(habilidad => {
            const progreso = habilidad.querySelector('.progreso');
            progreso.style.width = '0%';
            habilidad.classList.remove('animada');
        });
        
        setTimeout(() => {
            habilidades.forEach((habilidad, index) => {
                setTimeout(() => {
                    habilidad.classList.add('animada');
                    const progreso = habilidad.querySelector('.progreso');
                    const percent = habilidad.querySelector('h3').getAttribute('data-percent');
                    progreso.style.width = percent;
                }, index * 300);
            });
        }, 50);
    };

    const observerHabilidades = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                cargarBarrasSecuencial();
            }
        });
    }, { threshold: 0.3 });

    const seccionHabilidades = document.getElementById('habilidades');
    if (seccionHabilidades) {
        observerHabilidades.observe(seccionHabilidades);
    }
});