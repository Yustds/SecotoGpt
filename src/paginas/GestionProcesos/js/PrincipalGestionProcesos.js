class GestionProcesosManager {
  constructor() {
    this.init();
  }

  async init() {
    await this.waitForComponents();
    this.activateAnimations();
    this.removeLoading();
  }

  async waitForComponents() {
    let attempts = 0;
    while (attempts < 30) {
      const header = document.querySelector('#header-placeholder .modern-header');
      const footer = document.querySelector('#footer-placeholder .footer-modern');
      if (header && footer) return;
      await new Promise(res => setTimeout(res, 100));
      attempts++;
    }
  }

  activateAnimations() {
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

  removeLoading() {
    document.body.classList.remove('component-loading');
    const section = document.querySelector('.main-content');
    if (section) section.style.opacity = '1';
  }
}

window.addEventListener('DOMContentLoaded', () => {
  if (!window.gestionProcesosManager) {
    window.gestionProcesosManager = new GestionProcesosManager();
  }
});
