// script.js
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
        window.open("https://drive.google.com/file/d/1JnY9rhJTlOCDCPTEP4X18Z5-RExSMykZ/view?usp=sharing", "_blank");
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