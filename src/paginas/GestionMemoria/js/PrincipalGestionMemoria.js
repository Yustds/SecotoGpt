class GestionMemoriaManager {
  constructor() {
    this.initialized = false;
    this.init();
  }

  async init() {
    console.log('🧠 Inicializando Gestión de Memoria...');
    await this.waitForHeaderFooter();
    this.initializeScrollAnimations();
    this.removeLoadingClass();
    this.initialized = true;
  }

  async waitForHeaderFooter() {
    let tries = 0;
    while (tries < 30) {
      const header = document.querySelector('#header-placeholder .modern-header');
      const footer = document.querySelector('#footer-placeholder .footer-modern');
      if (header && footer) return;
      await new Promise(res => setTimeout(res, 100));
      tries++;
    }
  }

  initializeScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-animate').forEach(el => observer.observe(el));
  }

  removeLoadingClass() {
    document.body.classList.remove('component-loading');
    const section = document.querySelector('.timeline-section');
    if (section) section.style.opacity = '1';
  }
}

window.addEventListener('DOMContentLoaded', () => {
  if (!window.gestionMemoriaManager) {
    window.gestionMemoriaManager = new GestionMemoriaManager();
  }
});
