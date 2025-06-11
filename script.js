// Configuración de animaciones al hacer scroll
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -20px 0px'
    };

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
                    const percentage = progressBar?.getAttribute('data-percent') ||
                                       entry.target.querySelector('.percentage')?.getAttribute('data-percent') || '0%';
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

// Función para cambiar el idioma
function updateContent(language) {
    document.documentElement.lang = language;

    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[language] && translations[language][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[language][key];
            } else {
                element.textContent = translations[language][key];
            }
        }
    });
}

const form = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        formMessage.textContent = "¡Mensaje enviado con éxito!";
        formMessage.className = "success";
        form.reset();
      } else {
        formMessage.textContent = "Hubo un error al enviar el mensaje.";
        formMessage.className = "error";
      }
    } catch (error) {
      formMessage.textContent = "Error de red. Intenta nuevamente.";
      formMessage.className = "error";
    }
  });
}


// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function () {
    // Agregar clases a secciones para animación
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

    // 👉 Botones "Habilidades / Intereses"
    const buttons = document.querySelectorAll('.switch-btn');
    const contents = {
        skills: document.getElementById('skills-content'),
        interests: document.getElementById('interests-content')
    };

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const target = button.dataset.target;
            for (const key in contents) {
                if (contents[key]) {
                    contents[key].style.opacity = 0;
                    contents[key].style.transition = "opacity 0.3s ease";
                    setTimeout(() => {
                        contents[key].style.display = (key === target) ? 'block' : 'none';
                        contents[key].style.opacity = (key === target) ? 1 : 0;
                    }, 200);
                }
            }

            if (target === 'skills') {
                const habilidadElements = document.querySelectorAll('#skills-content .habilidad');

                 habilidadElements.forEach(hab => {
                hab.classList.remove('animate');

                const progressBar = hab.querySelector('.progreso');
                const percentage = progressBar?.getAttribute('data-percent') || '0%';
                           hab.querySelector('.percentage')?.getAttribute('data-percent') || '0%';

            // Resetear la barra inmediatamente
            progressBar.style.transition = 'none';
            progressBar.style.width = '0%';
            });

        // Esperar un poco para forzar el reinicio visual
        setTimeout(() => {
            habilidadElements.forEach(hab => {
                hab.classList.add('animate');
                const progressBar = hab.querySelector('.progreso');
                const percentage = progressBar?.getAttribute('data-percent') || '0%';
                                    hab.querySelector('.percentage')?.getAttribute('data-percent') || '0%';

            // Aplicar la animación ahora sí
            progressBar.style.transition = 'width 1s cubic-bezier(0.65, 0, 0.35, 1)';
            progressBar.style.width = percentage;
        });
    }, 100); // importante que sea mínimo 50-100 ms
}


            // ✅ Animación para tags de intereses
            if (target === 'interests') {
                const tags = document.querySelectorAll('#interests-content .tag');
                tags.forEach((tag, index) => {
                    tag.classList.remove('fade-in-tag');
                    setTimeout(() => {
                        tag.classList.add('fade-in-tag');
                    }, index * 100);
                });
            }
        });
    });

    // Selector de idioma
    const languageSelector = document.getElementById('language-selector');
    if (languageSelector) {
        languageSelector.addEventListener('change', (e) => {
            const language = e.target.value;
            localStorage.setItem('language', language);
            updateContent(language);
        });

        // Cargar idioma guardado o predeterminado
        const savedLanguage = localStorage.getItem('language') || 'es';
        languageSelector.value = savedLanguage;
        updateContent(savedLanguage);
    }

    // Botones y formulario
    const contactBtn = document.getElementById("contact-btn");
    const form = document.getElementById("contact-form");
    const formMessage = document.getElementById("form-message");
    const downloadCVBtn = document.getElementById("download-cv");

    if (contactBtn) {
        contactBtn.addEventListener("click", () => {
            document.getElementById("contacto").scrollIntoView({ behavior: "smooth" });
        });
    }

    if (downloadCVBtn) {
        downloadCVBtn.addEventListener("click", () => {
            window.open("https://drive.google.com/file/d/1-kUy0xbvhMY-AxBwiYHgmfxBF5bF8kCC/view?usp=drive_link", "_blank");
        });
    }

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();

            if (name === "" || email === "" || message === "") {
                formMessage.textContent = translations[document.documentElement.lang]?.['form-error'] || "Por favor, completa todos los campos.";
                formMessage.className = 'error';
                return;
            }

            formMessage.textContent = translations[document.documentElement.lang]?.['form-success'] || "Mensaje enviado con éxito.";
            formMessage.className = 'success';
            form.reset();
        });
    }

    
});
