const themeToggle = {
  init() {
    this.setInitialTheme();
    this.bindEvents();
    this.updateThemeIcon();
  },

  setInitialTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.applyTheme(savedTheme);
      return;
    }

    try {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.applyTheme('dark');
      } else {
        this.applyTheme('light');
      }
    } catch (error) {
      this.applyTheme('light');
    }
  },

  toggleTheme(event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme(newTheme);
  },

  applyTheme(theme) {
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop;
    
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    this.updateThemeIcon();
    
    window.scrollTo({
      top: scrollPos,
      behavior: 'instant'
    });
  },

  updateThemeIcon() {
    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) {
      const currentTheme = document.body.getAttribute('data-theme');
      themeIcon.className = currentTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    }
  },

  bindEvents() {
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        const newTheme = e.matches ? 'dark' : 'light';
        this.applyTheme(newTheme);
      });
    }
  }
};

document.addEventListener('DOMContentLoaded', () => themeToggle.init());