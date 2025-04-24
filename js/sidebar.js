/**
 * 侧边栏组件使用说明：
 * 1. 在页面中引入：
 *    <link rel="stylesheet" href="/css/sidebar.css">
 *    <script src="/js/sidebar.js"></script>
 * 
 * 2. 在需要生成导航的元素上添加属性：
 *    <div data-sidebar-title="标题名称" data-sidebar-level="1">
 *      内容
 *    </div>
 * 
 * 3. data-sidebar-level 说明：
 *    - 1: 一级标题
 *    - 2: 二级标题
 *    - 3: 三级标题
 *    不设置默认为1
 */

const sidebar = {
    init() {
      this.lastWidth = window.innerWidth;
      this.loadSidebar();
      this.bindEvents();
      this.handleHashChange();
    },
  
    loadSidebar() {
      // 检查宽度是否满足显示条件
      if (window.innerWidth <= 900) return;
  
      if (!document.querySelector('.sidebar-container')) {
        fetch('/Tools/sidebar.html')
          .then(response => response.text())
          .then(html => {
            document.body.insertAdjacentHTML('beforeend', html);
            // 设置侧边栏标题
            const pageTitle = document.title.split('-')[0].trim();
            const sidebarTitle = document.querySelector('.sidebar-title');
            if (sidebarTitle) {
              sidebarTitle.textContent = pageTitle;
            }
            this.generateNav();
            this.adjustSidebarWidth();
          });
      }
    },
  
    generateNav() {
      const titles = document.querySelectorAll('[data-sidebar-title]');
      if (titles.length === 0) return;
  
      const nav = document.getElementById('sidebar-nav');
      const ul = document.createElement('ul');
      
      titles.forEach((title) => {
        // 使用data-sidebar-title作为ID
        const titleText = title.getAttribute('data-sidebar-title');
        const safeId = this.generateSafeId(titleText);
        title.id = safeId;
  
        const level = parseInt(title.getAttribute('data-sidebar-level') || '1');
        const li = document.createElement('li');
        const a = document.createElement('a');
        
        a.href = `#${safeId}`;
        a.textContent = titleText;
        a.style.paddingLeft = `${(level - 1) * 0.5}rem`;
        
        li.appendChild(a);
        ul.appendChild(li);
      });
  
      nav.appendChild(ul);
      this.showSidebar();
      this.updateActiveLink(); // 初始化时更新活动链接
    },
  
    // 生成安全的ID
    generateSafeId(text) {
      return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    },
  
    showSidebar() {
      const sidebar = document.querySelector('.sidebar-container');
      if (sidebar) {
        sidebar.style.display = 'block';
        
        requestAnimationFrame(() => {
          sidebar.style.opacity = '1';
          sidebar.style.transform = 'translateX(0)';
        });
      }
    },
  
    adjustSidebarWidth() {
      const sidebar = document.querySelector('.sidebar-container');
      const content = document.querySelector('.container') || document.querySelector('.custom-container');
      
      if (sidebar && content) {
        const contentRect = content.getBoundingClientRect();
        const rightSpace = window.innerWidth - (contentRect.left + contentRect.width);
        const sidebarWidth = Math.min(230, rightSpace - 20); // 减小安全边距到20px
        
        if (sidebarWidth >= 180) { // 降低最小宽度要求到180px
          sidebar.style.width = `${sidebarWidth}px`;
          sidebar.style.display = 'block';
        } else {
          sidebar.style.display = 'none';
        }
      }
    },
  
    bindEvents() {
      // 使用节流优化滚动事件
      let scrollTimeout;
      window.addEventListener('scroll', () => {
        if (!scrollTimeout) {
          scrollTimeout = setTimeout(() => {
            this.updateActiveLink();
            this.checkSidebarPosition();
            scrollTimeout = null;
          }, 100);
        }
      });
  
      // 使用节流优化调整大小事件
      let resizeTimeout;
      window.addEventListener('resize', () => {
        if (!resizeTimeout) {
          resizeTimeout = setTimeout(() => {
            this.handleResize();
            resizeTimeout = null;
          }, 100);
        }
      });
  
      document.addEventListener('themeChanged', () => {
        this.handleThemeChange();
      });
  
      document.addEventListener('click', (e) => {
        if (e.target.closest('.sidebar-nav a')) {
          e.preventDefault();
          this.handleNavClick(e);
        }
      });
    },
  
    updateActiveLink() {
        const titles = document.querySelectorAll('[data-sidebar-title]');
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
    
        let currentTitle = null;
        let minDistance = Infinity;
    
        titles.forEach(title => {
            const rect = title.getBoundingClientRect();
            const distance = Math.abs(rect.top);
            
            // 找到距离视口顶部最近的标题
            if (distance < minDistance && rect.top <= windowHeight / 3) {
                minDistance = distance;
                currentTitle = title;
            }
        });
    
        const links = document.querySelectorAll('.sidebar-nav a');
        links.forEach(link => {
            link.classList.remove('active');
            if (currentTitle && link.getAttribute('href') === `#${currentTitle.id}`) {
                link.classList.add('active');
                // 更新浏览器 URL，但不触发滚动
                if (window.location.hash !== `#${currentTitle.id}`) {
                    history.replaceState(null, null, `#${currentTitle.id}`);
                }
            }
        });
    },
  
    handleResize() {
      const currentWidth = window.innerWidth;
      const sidebar = document.querySelector('.sidebar-container');
      
      // 修改宽度判断条件
      if (this.lastWidth <= 900 && currentWidth > 900) {
        if (sidebar) {
          sidebar.remove(); // 移除旧的侧边栏
        }
        this.loadSidebar(); // 重新加载侧边栏
      } else if (currentWidth > 900) {
        this.adjustSidebarWidth();
        this.checkSidebarPosition();
      } else if (sidebar) {
        sidebar.style.display = 'none';
      }
      
      this.lastWidth = currentWidth;
    },
  
    handleThemeChange() {
      const sidebar = document.querySelector('.sidebar-container');
      if (sidebar) {
        const theme = document.body.getAttribute('data-theme');
        sidebar.setAttribute('data-theme', theme);
      }
    },
  
    handleNavClick(e) {
      const link = e.target.closest('a');
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
  
      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
  
        history.pushState(null, null, link.getAttribute('href'));
      }
    },
  
    checkSidebarPosition() {
      const sidebar = document.querySelector('.sidebar-container');
      if (!sidebar) return;
  
      const footer = document.querySelector('.footer');
      if (!footer) return;
  
      const footerRect = footer.getBoundingClientRect();
      const sidebarRect = sidebar.getBoundingClientRect();
  
      if (footerRect.top <= window.innerHeight) {
        const overlap = window.innerHeight - footerRect.top;
        sidebar.style.maxHeight = `calc(100vh - 120px - ${overlap}px)`;
      } else {
        sidebar.style.maxHeight = 'calc(100vh - 120px)';
      }
    },
  
    handleHashChange() {
      const scrollToElement = (hash) => {
        const targetElement = document.querySelector(hash);
        if (targetElement) {
          setTimeout(() => {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }, 100);
        }
      };
  
      window.addEventListener('hashchange', () => {
        if (window.location.hash) {
          scrollToElement(window.location.hash);
        }
      });
  
      if (window.location.hash) {
        scrollToElement(window.location.hash);
      }
    }
  };
  
  // 初始化侧边栏
  document.addEventListener('DOMContentLoaded', () => {
    sidebar.init();
  });