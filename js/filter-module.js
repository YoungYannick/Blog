// 滤镜模块的默认配置
const defaultFilterConfig = {
  enabled: true,                // 是否启用滤镜
  currentFilter: 'dreamy',      // 当前使用的滤镜
  applyTo: 'background',        // 应用位置: 'background'(仅背景) 或 'global'(全局)
  darkModeAuto: true,           // 暗色模式下是否自动切换滤镜
  darkModeFilter: 'dim',        // 暗色模式下使用的滤镜
  transitionTime: 0.5,          // 滤镜切换过渡时间(秒)
};

// 可用的滤镜预设
const filterPresets = {
  normal: {
    name: 'Normal',
    css: 'none',
    description: 'No filter effect'
  },
  vivid: {
    name: 'Bright',
    css: 'saturate(1.5) contrast(1.2) brightness(1.1)',
    description: 'Enhanced color saturation and contrast'
  },
  warm: {
    name: 'Warm',
    css: 'sepia(0.4) saturate(1.3) brightness(1.1) contrast(1.1)',
    description: 'Rich warm tones'
  },
  cool: {
    name: 'Cool',
    css: 'hue-rotate(15deg) saturate(1.2) brightness(1.1) contrast(1.05)',
    description: 'Fresh cool tones'
  },
  dim: {
    name: 'Dim',
    css: 'brightness(0.9) saturate(0.85) contrast(0.95)',
    description: 'Reduce brightness and saturation'
  },
  vintage: {
    name: 'Retro',
    css: 'sepia(0.35) saturate(0.9) brightness(0.9) contrast(1.1)',
    description: 'Retro style effect'
  },
  vintage2: {
    name: 'Classic',
    css: 'sepia(0.45) saturate(0.8) brightness(0.85) contrast(1.2)',
    description: 'Strong vintage effect'
  },
  noir: {
    name: 'Black & White',
    css: 'grayscale(1) contrast(1.2)',
    description: 'Black and White Effect'
  },
  dreamy: {
    name: 'Dream',
    css: 'brightness(1.05) contrast(0.9) saturate(1.1) blur(0.5px)',
    description: 'Slightly blurred dreamy effect'
  },
  sharp: {
    name: 'Sharpen',
    css: 'contrast(1.4) brightness(1.1) saturate(1.2)',
    description: 'Strong image sharpness'
  },
  pastel: {
    name: 'Soft',
    css: 'saturate(0.8) brightness(1.1) contrast(0.9)',
    description: 'Soft color effect'
  },
  dramatic: {
    name: 'Dramatic',
    css: 'contrast(1.4) brightness(0.9) saturate(1.3) hue-rotate(-5deg)',
    description: 'High contrast dramatic effect'
  },
  cinema: {
    name: 'Cinema',
    css: 'contrast(1.15) saturate(1.2) brightness(1.1) sepia(0.15)',
    description: 'Professional cinematic look'
  },
  sunset: {
    name: 'Sunset',
    css: 'sepia(0.3) contrast(1.1) saturate(1.3) hue-rotate(-15deg) brightness(1.05)',
    description: 'Warm sunset atmosphere'
  },
  forest: {
    name: 'Forest',
    css: 'saturate(1.2) hue-rotate(15deg) brightness(0.95) contrast(1.1)',
    description: 'Deep forest tones'
  },
  neon: {
    name: 'Neon',
    css: 'brightness(1.15) contrast(1.3) saturate(1.6) hue-rotate(5deg)',
    description: 'Vibrant neon effect'
  },
  moonlight: {
    name: 'Moonlight',
    css: 'brightness(1.1) contrast(1.1) saturate(0.8) sepia(0.2) hue-rotate(180deg)',
    description: 'Cool moonlight atmosphere'
  },
  clarity: {
    name: 'Clarity',
    css: 'contrast(1.3) brightness(1.05) saturate(1.1) hue-rotate(-5deg)',
    description: 'Enhanced clarity and detail'
  }
};

// 滤镜模块类
class FilterModule {
  constructor() {
    this.config = { ...defaultFilterConfig };
    this.initialized = false;
    this.styleElement = null;
    this.loadConfig();
  }

  // 加载配置
  loadConfig() {
    try {
      const savedConfig = localStorage.getItem('filterConfig');
      if (savedConfig) {
        this.config = { ...this.config, ...JSON.parse(savedConfig) };
      }
    } catch (e) {
      console.error('Failed to load filter configuration:', e);
    }
  }

  // 保存配置
  saveConfig() {
    try {
      localStorage.setItem('filterConfig', JSON.stringify(this.config));
      return true;
    } catch (e) {
      console.error('Failed to save filter configuration:', e);
      return false;
    }
  }

  // 初始化滤镜模块
  init() {
    if (this.initialized) return;
    
    // 创建样式元素
    this.styleElement = document.createElement('style');
    this.styleElement.id = 'filter-module-styles';
    document.head.appendChild(this.styleElement);
    
    // 监听主题变化
    document.addEventListener('themeChanged', (e) => {
      const isDarkMode = e.detail.theme === 'dark';
      if (this.config.darkModeAuto && this.config.enabled) {
        this.applyFilter(isDarkMode ? this.config.darkModeFilter : this.config.currentFilter);
      } else {
        this.applyCurrentFilter();
      }
    });

    // 添加系统主题变化监听
    if (window.matchMedia) {
      const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
      colorSchemeQuery.addEventListener('change', (e) => {
        const isDarkMode = e.matches;
        if (this.config.darkModeAuto && this.config.enabled) {
          this.applyFilter(isDarkMode ? this.config.darkModeFilter : this.config.currentFilter);
        }
      });
    }
    
    this.initialized = true;
    this.applyCurrentFilter();
    
    console.log('The filter module has been initialized');
  }

  // 应用当前配置的滤镜
  applyCurrentFilter() {
    if (!this.initialized) {
      this.init();
      return;
    }
  
    const isDarkMode = document.body.getAttribute('data-theme') === 'dark';
    if (this.config.enabled) {
      const filterToApply = isDarkMode && this.config.darkModeAuto ? 
        this.config.darkModeFilter : this.config.currentFilter;
      this.applyFilter(filterToApply);
    } else {
      this.clearFilter();
    }
  }

  // 清除滤镜效果
  clearFilter() {
    if (!this.initialized) {
      this.init();
      return;
    }
    
    const selector = this.config.applyTo === 'global' ? 'body' : '.hero-background img, .box-image, .preview-image';
    
    if (this.styleElement) {
      this.styleElement.textContent = `
        ${selector} {
          filter: none !important;
          transition: filter ${this.config.transitionTime}s ease;
        }
      `;
    }
  }

  // 应用指定滤镜
  applyFilter(filterName) {
    if (!this.initialized) {
      this.init();
      return;
    }
    
    if (!filterPresets[filterName]) {
      console.error(`Filter "${filterName}" does not exist`);
      filterName = 'normal';
    }
    
    const filter = filterPresets[filterName];
    const selector = this.config.applyTo === 'global' ? 'body' : '.hero-background img, .box-image, .preview-image';
    
    // 更新样式
    if (this.styleElement) {
      this.styleElement.textContent = `
        ${selector} {
          filter: ${this.config.enabled ? filter.css : 'none'} !important;
          transition: filter ${this.config.transitionTime}s ease;
        }
      `;
    }
    
    // 更新配置
    const isDarkMode = document.body.getAttribute('data-theme') === 'dark';
    if (!(isDarkMode && this.config.darkModeAuto && filterName === this.config.darkModeFilter)) {
      this.config.currentFilter = filterName;
      this.saveConfig();
    }
  }

  // 切换滤镜启用状态
  toggleEnabled() {
    this.config.enabled = !this.config.enabled;
    this.applyCurrentFilter();
    this.saveConfig();
    return this.config.enabled;
  }

  // 设置滤镜应用位置
  setApplyTo(target) {
    if (target === 'background' || target === 'global') {
      this.config.applyTo = target;
      this.applyCurrentFilter();
      this.saveConfig();
    }
    return this.config.applyTo;
  }

  // 设置暗色模式自动切换
  setDarkModeAuto(enabled) {
    this.config.darkModeAuto = !!enabled;
    this.applyCurrentFilter();
    this.saveConfig();
    return this.config.darkModeAuto;
  }

  // 设置暗色模式滤镜
  setDarkModeFilter(filterName) {
    if (filterPresets[filterName]) {
      this.config.darkModeFilter = filterName;
      if (document.body.getAttribute('data-theme') === 'dark' && this.config.darkModeAuto) {
        this.applyFilter(filterName);
      }
      this.saveConfig();
    }
    return this.config.darkModeFilter;
  }

  // 设置过渡时间
  setTransitionTime(seconds) {
    const time = parseFloat(seconds);
    if (!isNaN(time) && time >= 0) {
      this.config.transitionTime = time;
      this.applyCurrentFilter(); // 重新应用滤镜以更新过渡时间
      this.saveConfig();
    }
    return this.config.transitionTime;
  }

  // 获取所有可用滤镜
  getAvailableFilters() {
    return filterPresets;
  }

  // 获取当前配置
  getConfig() {
    return { ...this.config };
  }
  
  // 重置为默认配置
  resetToDefaults() {
    this.config = { ...defaultFilterConfig };
    this.applyCurrentFilter();
    this.saveConfig();
    return this.config;
  }
  
  // 导出配置为JSON字符串
  exportConfig() {
    return JSON.stringify(this.config, null, 2);
  }
  
  // 导入配置
  importConfig(configStr) {
    try {
      const newConfig = JSON.parse(configStr);
      // 验证必要的字段
      const requiredFields = ['enabled', 'currentFilter', 'applyTo', 'darkModeAuto', 'darkModeFilter'];
      const isValid = requiredFields.every(field => field in newConfig);
      
      if (isValid) {
        this.config = { ...this.config, ...newConfig };
        this.applyCurrentFilter();
        this.saveConfig();
        return true;
      } else {
        console.error('The imported configuration is missing required fields');
        return false;
      }
    } catch (e) {
      console.error('Import configuration failed:', e);
      return false;
    }
  }
}

// 创建全局滤镜模块实例
window.filterModule = new FilterModule();

// 在DOM加载完成后初始化滤镜模块
document.addEventListener('DOMContentLoaded', () => {
  window.filterModule.init();
  
  // 立即检查当前主题并应用相应滤镜
  const currentTheme = document.body.getAttribute('data-theme');
  const isDarkMode = currentTheme === 'dark';
  if (window.filterModule.config.darkModeAuto && window.filterModule.config.enabled) {
    window.filterModule.applyFilter(isDarkMode ? 
      window.filterModule.config.darkModeFilter : 
      window.filterModule.config.currentFilter
    );
  }
});