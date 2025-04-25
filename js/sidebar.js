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
  sidebarReady: null,
  sidebarResolve: null,
  init() {
    this.sidebarReady = new Promise(resolve => {
      this.sidebarResolve = resolve;
    });
    this.lastWidth = window.innerWidth;
    this.loadSidebar();
    this.bindEvents();
    this.handleHashChange();
  },
  
  loadSidebar() {
    const titles = document.querySelectorAll('[data-sidebar-title]');
    titles.forEach((title) => {
      const titleText = title.getAttribute('data-sidebar-title');
      const baseId = this.generateSafeId(titleText);
      title.id = baseId;
    });

    if (window.innerWidth <= 900) {
      this.sidebarResolve();
      return;
    }

    if (!document.querySelector('.sidebar-container')) {
      fetch('/Tools/sidebar.html')
        .then(response => response.text())
        .then(html => {
          document.body.insertAdjacentHTML('beforeend', html);
          const pageTitle = document.title.split('-')[0].trim();
          const sidebarTitle = document.querySelector('.sidebar-title');
          if (sidebarTitle) {
            sidebarTitle.textContent = pageTitle;
          }
          this.generateNav();
          this.adjustSidebarWidth();
          this.sidebarResolve();
        });
    } else {
      this.sidebarResolve();
    }
  },
  
  generateNav() {
    const titles = document.querySelectorAll('[data-sidebar-title]');
    if (titles.length === 0) return;

    const nav = document.getElementById('sidebar-nav');
    const ul = document.createElement('ul');
    
    titles.forEach((title) => {
      const titleText = title.getAttribute('data-sidebar-title');
      const level = parseInt(title.getAttribute('data-sidebar-level') || '1');
      const li = document.createElement('li');
      const a = document.createElement('a');

      li.setAttribute('data-level', level);
      a.href = `#${title.id}`;
      a.textContent = titleText;
      a.style.paddingLeft = `${(level - 1) * 0.5}rem`;
      
      li.appendChild(a);
      ul.appendChild(li);
    });

    nav.appendChild(ul);
    this.showSidebar();
    this.updateActiveLink();
  },
  
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
      const sidebarWidth = Math.min(230, rightSpace - 20);
      
      if (sidebarWidth >= 180) {
        sidebar.style.width = `${sidebarWidth}px`;
        sidebar.style.display = 'block';
      } else {
        sidebar.style.display = 'none';
      }
    }
  },
  
  bindEvents() {
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

  isNavigating: false,

  updateActiveLink() {
    if (this.isNavigating) return;

    const titles = document.querySelectorAll('[data-sidebar-title]');
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;

    let currentTitle = null;
    let minDistance = Infinity;

    titles.forEach(title => {
        const rect = title.getBoundingClientRect();
        const distance = Math.abs(rect.top);
        
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
            if (window.location.hash !== `#${currentTitle.id}`) {
                history.replaceState(null, null, `#${currentTitle.id}`);
            }
            this.scrollActiveLinkIntoView(link);
        }
    });
  },
  
  scrollActiveLinkIntoView(activeLink) {
    const sidebar = document.querySelector('.sidebar-container');
    if (!sidebar || !activeLink) return;
    
    const sidebarRect = sidebar.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();
    
    if (linkRect.top < sidebarRect.top || linkRect.bottom > sidebarRect.bottom) {
      const scrollTop = activeLink.offsetTop - (sidebar.clientHeight / 2) + (activeLink.clientHeight / 2);
      sidebar.scrollTop = Math.max(0, scrollTop);
    }
  },

  handleResize() {
    const currentWidth = window.innerWidth;
    const sidebar = document.querySelector('.sidebar-container');
    
    if (this.lastWidth <= 900 && currentWidth > 900) {
      if (sidebar) {
        sidebar.remove();
      }
      this.loadSidebar();
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
        this.isNavigating = true;
        
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });

        history.pushState(null, null, link.getAttribute('href'));
        
        setTimeout(() => {
            this.isNavigating = false;
        }, 1000);
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
      this.sidebarReady.then(() => {
        const targetElement = document.querySelector(hash);
        if (!targetElement) return;

        this.isNavigating = true;

        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        const sidebarLink = document.querySelector(`.sidebar-nav a[href="${hash}"]`);
        if (sidebarLink) {
          document.querySelectorAll('.sidebar-nav a').forEach(link => link.classList.remove('active'));
          sidebarLink.classList.add('active');
          this.scrollActiveLinkIntoView(sidebarLink);
        }

        setTimeout(() => {
          this.isNavigating = false;
        }, 1000);
      });
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
  
document.addEventListener('DOMContentLoaded', () => {
  sidebar.init();
});