document.addEventListener('DOMContentLoaded', function() {
  const toolsHtml = `
    <div class="tools-bubble">
      <div class="tools-header">
        <h3 class="tools-title">Settings</h3>
        <button class="tools-close" id="toolsClose"><i class="fas fa-times"></i></button>
      </div>
      <div class="tools-content">
        <div class="tools-section">
          <div class="tools-section-title">Font Selection</div>
          <select class="font-selector" id="fontSelector">
            <option value="'Nunito', sans-serif">Nunito</option>
            <option value="'Quicksand', sans-serif">Quicksand</option>
            <option value="'Arial', sans-serif">Arial</option>
            <option value="'Times New Roman', serif">Times New Roman</option>
            <option value="'Microsoft YaHei', sans-serif">Microsoft YaHei</option>
          </select>
        </div>
        <div class="tools-section">
          <div class="tools-section-title">Filter Settings</div>
          <a href="/Tools/filter-panel.html" class="filter-settings-link">
            <i class="fas fa-sliders-h"></i>
            <span>Manage Filters</span>
          </a>
        </div>
        <div class="tools-section">
          <div class="tools-section-title">Theme Switch</div>
          <div class="theme-switch-container">
            <div class="theme-switch" id="themeSwitch">
              <div class="theme-icon sun-icon">
                <i class="fas fa-sun"></i>
              </div>
              <div class="theme-icon moon-icon">
                <i class="fas fa-moon"></i>
              </div>
              <div class="switch-inner"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button class="tools-toggle" id="toolsToggle"><i class="fas fa-tools"></i></button>
    <button class="back-to-top" id="backToTop"><i class="fas fa-chevron-up"></i></button>
  `;

  document.body.insertAdjacentHTML('beforeend', toolsHtml);

  const toolsBubble = document.querySelector('.tools-bubble');
  const toolsToggle = document.getElementById('toolsToggle');
  const toolsClose = document.getElementById('toolsClose');
  const backToTop = document.getElementById('backToTop');
  const fontSelector = document.getElementById('fontSelector');
  const themeSwitch = document.getElementById('themeSwitch');

  setTimeout(() => {
    toolsToggle.classList.add('show');
  }, 1000);

  toolsClose.addEventListener('click', () => {
    toolsBubble.classList.remove('show');
    setTimeout(() => {
      toolsToggle.classList.add('show');
    }, 500);
  });

  toolsToggle.addEventListener('click', (e) => {
    e.preventDefault();
    toolsToggle.classList.remove('show');
    toolsBubble.classList.add('show');
  });

  fontSelector.addEventListener('change', (e) => {
    document.body.style.fontFamily = e.target.value;
    localStorage.setItem('selectedFont', e.target.value);
  });

  // 定义全局 themeManager 对象
  window.themeManager = {
    toggleTheme: function() {
      const theme = document.body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      document.body.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      this.updateThemeIcons(theme);

      // 触发主题变更事件
      const event = new CustomEvent('themeChanged', {
        detail: { theme: theme }
      });
      document.dispatchEvent(event);
    },
    updateThemeIcons: function(theme) {
      const themeIcon = document.getElementById('theme-icon');
      if (themeIcon) {
        themeIcon.className = theme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
      }
      const themeSwitch = document.getElementById('themeSwitch');
      if (themeSwitch) {
        themeSwitch.setAttribute('data-theme', theme);
      }
    }
  };

  // 修改 themeSwitch 的事件监听器
  themeSwitch.addEventListener('click', () => {
    window.themeManager.toggleTheme();
  });

  // 初始化主题状态
  const currentTheme = localStorage.getItem('theme') || 'light';
  document.body.setAttribute('data-theme', currentTheme);
  window.themeManager.updateThemeIcons(currentTheme);

  // 添加系统主题变化监听
  if (window.matchMedia) {
    const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    colorSchemeQuery.addEventListener('change', (e) => {
      const newTheme = e.matches ? 'dark' : 'light';
      document.body.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      window.themeManager.updateThemeIcons(newTheme);
    });
  }

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  const savedFont = localStorage.getItem('selectedFont');
  if (savedFont) {
    document.body.style.fontFamily = savedFont;
    fontSelector.value = savedFont;
  }
});