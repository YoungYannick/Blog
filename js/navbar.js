document.addEventListener('DOMContentLoaded', function() {
  // 获取滚动条宽度
  function getScrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth;
  }

  // 防抖函数
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // 更新导航栏内容的函数
  function updateNavbarContent() {
    const navbarBrand = document.querySelector('#navbar-title-link');
    const navbarTitle = document.getElementById('navbar-title');
    const navbarCenter = document.querySelector('.navbar-center');
    const scrollbarWidth = getScrollbarWidth();
    const isMobile = (window.innerWidth - scrollbarWidth) <= 992;

    function updateTitle() {
      if (!navbarBrand || !navbarTitle) return;
      
      if (isMobile) {
        let titleText = navbarTitle.textContent.trim();
        if (titleText.length > 18) {
          navbarBrand.classList.add('small-font');
        } else {
          navbarBrand.classList.remove('small-font');
        }
        if (titleText.length > 30) {
          titleText = titleText.substring(0, 27) + '...';
        }
        if (titleText) {
          navbarBrand.innerHTML = `
            <img src="/images/Yannick_64.ico" alt="YoungYannick's Blog" />
            ${titleText}
          `;
        } else {
          navbarBrand.innerHTML = `
            <img src="/images/Yannick_64.ico" alt="YoungYannick's Blog" />
            YoungYannick's Blog
          `;
          navbarBrand.classList.remove('small-font');
        }
      } else {
        navbarBrand.innerHTML = `
          <img src="/images/Yannick_64.ico" alt="YoungYannick's Blog" />
          YoungYannick's Blog
        `;
        navbarBrand.classList.remove('small-font');
        if (navbarCenter && navbarTitle) {
          if (navbarTitle.textContent) {
            navbarCenter.textContent = navbarTitle.textContent;
            navbarCenter.style.display = 'block';
          } else {
            navbarCenter.style.display = 'none';
          }
        }
      }
    }

    if (navbarBrand) {
      navbarBrand.href = window.location.protocol + '//' + window.location.host;
    }

    // 设置标题内容监听，使用防抖
    const debouncedUpdateTitle = debounce(updateTitle, 100);
    const titleObserver = new MutationObserver(debouncedUpdateTitle);
    if (navbarTitle) {
      titleObserver.observe(navbarTitle, {
        characterData: true,
        childList: true,
        subtree: true
      });
    }

    // 执行初始更新
    updateTitle();
  }

  // 确保元素存在后执行初始更新
  setTimeout(() => {
    updateNavbarContent();
  }, 100);

  // 监听窗口大小调整，使用防抖
  window.addEventListener('resize', debounce(updateNavbarContent, 100));

  // 导航栏滚动效果（仅电脑端），使用防抖
  const handleScroll = debounce(() => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    const scrollbarWidth = getScrollbarWidth();
    if ((window.innerWidth - scrollbarWidth) > 992) {
      if (window.scrollY > 100) {
        navbar.classList.remove('navbar-transparent');
        navbar.classList.add('navbar-expanded');
      } else {
        navbar.classList.add('navbar-transparent');
        navbar.classList.remove('navbar-expanded');
      }
    }
  }, 50);

  window.addEventListener('scroll', handleScroll);

  // 初始状态
  const navbar = document.querySelector('.navbar');
  const scrollbarWidth = getScrollbarWidth();
  if (navbar && (window.innerWidth - scrollbarWidth) > 992) {
    navbar.classList.add('navbar-transparent');
    handleScroll();
  }

  // 下拉菜单动画
  const dropdowns = document.querySelectorAll('.dropdown');
  dropdowns.forEach(dropdown => {
    const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
    
    dropdown.addEventListener('show.bs.dropdown', function() {
      this.querySelector('.dropdown-menu').classList.add('show');
      if (dropdownToggle) {
        dropdownToggle.setAttribute('aria-expanded', 'true');
      }
    });
    
    dropdown.addEventListener('hide.bs.dropdown', function() {
      this.querySelector('.dropdown-menu').classList.remove('show');
      if (dropdownToggle) {
        dropdownToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
});