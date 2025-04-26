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
        <div class="tools-section share-section">
          <div class="tools-section-title">Share</div>
          <button class="share-button" id="shareButton">
            <i class="fas fa-share-alt"></i>
            <span>Share This Page</span>
          </button>
        </div>
      </div>
    </div>
    <button class="tools-toggle" id="toolsToggle"><i class="fas fa-tools"></i></button>
    <button class="back-to-top" id="backToTop"><i class="fas fa-chevron-up"></i></button>
    <div class="share-modal-overlay" id="shareModalOverlay">
      <div class="share-modal">
        <div class="share-modal-header">
          <h3 class="share-modal-title">Share</h3>
          <button class="share-modal-close" id="shareModalClose"><i class="fas fa-times"></i></button>
        </div>
        <div class="share-modal-content">
          <div class="share-image-container">
            <img src="" alt="Share preview" class="share-image" id="shareImage">
          </div>
          
          <div class="share-section-title">Image Options</div>
          <div class="share-options" id="imageOptions">
            <div class="share-option" id="saveImage">
              <div class="share-icon-wrapper">
                <i class="fas fa-download share-icon"></i>
              </div>
              <span class="share-option-label">Save Image</span>
            </div>
          </div>
          
          <div class="share-divider"></div>
          
          <div class="share-section-title">Share Link</div>
          <div id="linkOptionsContainer" class="share-options-scroll">
            <div class="share-options" id="linkOptions">
              <div class="share-option" id="copyLink">
                <div class="share-icon-wrapper">
                  <i class="fas fa-link share-icon"></i>
                </div>
                <span class="share-option-label">Copy Link</span>
              </div>
              <div class="share-option" id="shareTwitter">
                <div class="share-icon-wrapper">
                  <i class="fab fa-twitter share-icon"></i>
                </div>
                <span class="share-option-label">Twitter</span>
              </div>
              <div class="share-option" id="shareFacebook">
                <div class="share-icon-wrapper">
                  <i class="fab fa-facebook-f share-icon"></i>
                </div>
                <span class="share-option-label">Facebook</span>
              </div>
              <div class="share-option" id="shareLinkedIn">
                <div class="share-icon-wrapper">
                  <i class="fab fa-linkedin-in share-icon"></i>
                </div>
                <span class="share-option-label">LinkedIn</span>
              </div>
              <div class="share-option" id="shareReddit">
                <div class="share-icon-wrapper">
                  <i class="fab fa-reddit-alien share-icon"></i>
                </div>
                <span class="share-option-label">Reddit</span>
              </div>
              <div class="share-option" id="shareWhatsApp">
                <div class="share-icon-wrapper">
                  <i class="fab fa-whatsapp share-icon"></i>
                </div>
                <span class="share-option-label">WhatsApp</span>
              </div>
              <div class="share-option" id="shareTelegram">
                <div class="share-icon-wrapper">
                  <i class="fab fa-telegram-plane share-icon"></i>
                </div>
                <span class="share-option-label">Telegram</span>
              </div>
              <div class="share-option" id="shareWeibo">
                <div class="share-icon-wrapper">
                  <i class="fab fa-weibo share-icon"></i>
                </div>
                <span class="share-option-label">Weibo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', toolsHtml);

  const toolsBubble = document.querySelector('.tools-bubble');
  const toolsToggle = document.getElementById('toolsToggle');
  const toolsClose = document.getElementById('toolsClose');
  const backToTop = document.getElementById('backToTop');
  const fontSelector = document.getElementById('fontSelector');
  const themeSwitch = document.getElementById('themeSwitch');

  // 分享功能相关元素
  const shareButton = document.getElementById('shareButton');
  const shareModalOverlay = document.getElementById('shareModalOverlay');
  const shareModalClose = document.getElementById('shareModalClose');
  const shareImage = document.getElementById('shareImage');
  const saveImage = document.getElementById('saveImage');
  const copyLink = document.getElementById('copyLink');
  const shareTwitter = document.getElementById('shareTwitter');
  const shareFacebook = document.getElementById('shareFacebook');
  const shareLinkedIn = document.getElementById('shareLinkedIn');
  const shareReddit = document.getElementById('shareReddit');
  const shareWhatsApp = document.getElementById('shareWhatsApp');
  const shareTelegram = document.getElementById('shareTelegram');
  const shareWeibo = document.getElementById('shareWeibo');
  const imageOptions = document.getElementById('imageOptions');
  const linkOptions = document.getElementById('linkOptions');

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

  // 分享功能相关逻辑

  // 转换原始链接为目标链接格式
  function transformLink(originalUrl) {
    const targetDomain = 'https://youngyannick.eu.org';
    try {
      const url = new URL(originalUrl);
      const queryAndPath = url.search + url.pathname + url.hash;
      if (!queryAndPath || queryAndPath === '/') {
        return targetDomain + '/';
      }
      const pathAndQuery = url.search ? url.search : url.pathname + url.hash;
      return `${targetDomain}?target=${encodeURIComponent(pathAndQuery.startsWith('?') || pathAndQuery === url.pathname + url.hash ? pathAndQuery : '/' + pathAndQuery)}`;
    } catch (error) {
      console.error('Failed to transform link:', error);
      return originalUrl;
    }
  }

  // 检测设备类型和操作系统
  function detectDevice() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // 检测移动设备
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

    // 检测具体操作系统
    const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
    const isAndroid = /Android/i.test(userAgent);
    const isHarmonyOS = /HarmonyOS/i.test(userAgent);

    return {
      isMobile,
      isIOS,
      isAndroid,
      isHarmonyOS
    };
  }

  // 根据设备类型调整分享选项
  function adjustShareOptions() {
    const device = detectDevice();

    // 如果是移动设备，添加原生分享选项
    if (device.isMobile) {
      // 检查是否已经存在原生分享选项
      if (!document.getElementById('nativeShare')) {
        // 添加原生分享选项
        const nativeShare = document.createElement('div');
        nativeShare.className = 'share-option';
        nativeShare.id = 'nativeShare';
        nativeShare.innerHTML = `
          <div class="share-icon-wrapper">
            <i class="fas fa-share share-icon"></i>
          </div>
          <span class="share-option-label">Native Share</span>
        `;

        // 将原生分享选项插入到第一位
        linkOptions.insertBefore(nativeShare, linkOptions.firstChild);

        // 为原生分享添加事件监听
        document.getElementById('nativeShare').addEventListener('click', () => {
          if (navigator.share) {
            navigator.share({
              title: document.title,
              url: transformLink(window.location.href)
            }).catch(err => {
              console.error('Share failed:', err);
              showSuccessToast('Share failed, please try again');
            });
          } else {
            showSuccessToast('Your browser does not support native sharing functionality');
          }
        });
      }
    }
  }

  // 生成分享图片
  function generateShareImage() {
    return new Promise((resolve, reject) => {
      try {
        // 创建一个临时的canvas元素
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // 设置画布大小
        canvas.width = 800;
        canvas.height = 475;

        // 保存初始上下文状态
        ctx.save();

        // 添加圆角矩形遮罩
        const cornerRadius = 20;
        ctx.beginPath();
        ctx.moveTo(cornerRadius, 0);
        ctx.lineTo(canvas.width - cornerRadius, 0);
        ctx.quadraticCurveTo(canvas.width, 0, canvas.width, cornerRadius);
        ctx.lineTo(canvas.width, canvas.height - cornerRadius);
        ctx.quadraticCurveTo(canvas.width, canvas.height, canvas.width - cornerRadius, canvas.height);
        ctx.lineTo(cornerRadius, canvas.height);
        ctx.quadraticCurveTo(0, canvas.height, 0, canvas.height - cornerRadius);
        ctx.lineTo(0, cornerRadius);
        ctx.quadraticCurveTo(0, 0, cornerRadius, 0);
        ctx.closePath();
        ctx.clip(); // 应用裁剪，所有后续绘制都在圆角矩形内

        // 加载背景图片
        const background = new Image();
        background.crossOrigin = 'anonymous';
        background.src = window.location.origin + '/images/banner/13.jpg';

        background.onload = function() {
          // 绘制背景图片，填充整个画布
          ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

          // 添加半透明白色背景以增强文字可读性
          ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          // 加载站点LOGO
          const logo = new Image();
          logo.crossOrigin = 'anonymous';
          logo.src = window.location.origin + '/images/Yannick_64.ico';

          logo.onload = function() {
            // 绘制LOGO
            ctx.drawImage(logo, 40, 40, 64, 64);

            // 设置文本样式
            ctx.fillStyle = '#2c3e50';
            ctx.font = 'bold 28px Quicksand, sans-serif';

            // 绘制站点名称
            ctx.fillText("YoungYannick's Blog", 120, 70);

            // 绘制分割线
            ctx.beginPath();
            ctx.moveTo(40, 120);
            ctx.lineTo(canvas.width - 40, 120);
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.lineWidth = 2;
            ctx.stroke();

            // 绘制文章标题
            ctx.font = 'bold 32px Quicksand, sans-serif';
            const title = document.title;

            // 处理长标题
            const maxWidth = canvas.width - 80;
            let titleLines = [];
            let words = title.split(' ');
            let currentLine = '';

            for (let i = 0; i < words.length; i++) {
              let testLine = currentLine + words[i] + ' ';
              let metrics = ctx.measureText(testLine);
              if (metrics.width > maxWidth && i > 0) {
                titleLines.push(currentLine);
                currentLine = words[i] + ' ';
              } else {
                currentLine = testLine;
              }
            }
            titleLines.push(currentLine);

            // 绘制标题行
            let titleY = 180;
            for (let i = 0; i < titleLines.length; i++) {
              ctx.fillText(titleLines[i], 40, titleY);
              titleY += 40;
            }

            // 绘制分享时间
            ctx.font = '18px Nunito, sans-serif';
            const now = new Date();
            const dateStr = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
            ctx.fillText('Share time: ' + dateStr, 40, titleY + 40);

            // 生成二维码
            const qrCodeSize = 150;
            const qrCodeX = canvas.width - qrCodeSize - 40;
            const qrCodeY = canvas.height - qrCodeSize - 40;

            // 加载QRCode.js
            if (typeof QRCode === 'undefined') {
              const script = document.createElement('script');
              script.src = 'https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.min.js';
              document.head.appendChild(script);

              script.onload = function() {
                generateQRCode();
              };
            } else {
              generateQRCode();
            }

            function generateQRCode() {
              const qr = qrcode(0, 'M');
              qr.addData(transformLink(window.location.href));
              qr.make();

              const qrImg = new Image();
              qrImg.src = qr.createDataURL(4);

              qrImg.onload = function() {
                // 绘制二维码
                ctx.drawImage(qrImg, qrCodeX, qrCodeY, qrCodeSize, qrCodeSize);

                // 二维码说明文字
                ctx.font = '16px Nunito, sans-serif';
                ctx.fillText('Scan and access web pages', qrCodeX + qrCodeSize / 2 - 105, qrCodeY + qrCodeSize + 25);

                // 恢复上下文状态（移除裁剪）
                ctx.restore();

                // 转换canvas为图片URL
                const imageUrl = canvas.toDataURL('image/png');
                resolve(imageUrl);
              };
            }
          };

          logo.onerror = function() {
            // 如果LOGO加载失败，使用备用方案
            ctx.font = 'bold 36px Quicksand, sans-serif';
            ctx.fillText("YoungYannick", 40, 70);

            // 继续其他绘制...
            const imageUrl = canvas.toDataURL('image/png');
            resolve(imageUrl);
          };
        };

        background.onerror = function() {
          // 如果背景图片加载失败，使用默认背景
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          // 继续绘制其他内容...
          const logo = new Image();
          logo.crossOrigin = 'anonymous';
          logo.src = window.location.origin + '/images/Yannick_64.ico';

          logo.onload = function() {
            // 绘制LOGO
            ctx.drawImage(logo, 40, 40, 64, 64);

            // 设置文本样式
            ctx.fillStyle = '#2c3e50';
            ctx.font = 'bold 28px Quicksand, sans-serif';

            // 绘制站点名称
            ctx.fillText("YoungYannick's Blog", 120, 70);

            // 继续其他绘制...
            const imageUrl = canvas.toDataURL('image/png');
            resolve(imageUrl);
          };
        };
      } catch (error) {
        console.error('Failed to generate sharing picture:', error);
        // 返回默认图片
        const defaultImage = window.location.origin + '/images/share-default.jpg';
        resolve(defaultImage);
      }
    });
  }

  // 显示成功通知
  function showSuccessToast(message) {
    const toast = document.createElement('div');
    toast.className = 'success-toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    // 显示通知
    setTimeout(() => {
      toast.classList.add('show');
    }, 10);

    // 自动隐藏
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 3000);
  }

  // 打开分享模态框
  shareButton.addEventListener('click', () => {
    // 显示加载中的图片
    shareImage.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48c3R5bGU+QGtleWZyYW1lcyBsb2FkaW5ne3RvezEwMCV9fWNpcmNsZXtmaWxsOm5vbmU7c3Ryb2tlOiM4N0NFRkE7c3Ryb2tlLXdpZHRoOjI7c3Ryb2tlLWRhc2hhcnJheToxNTAuNjtzdHJva2UtZGFzaG9mZnNldDoxNTA2O3N0cm9rZS1saW5lY2FwOnJvdW5kO3RyYW5zZm9ybS1vcmlnaW46Y2VudGVyO2FuaW1hdGlvbjpsb2FkaW5nIDJzIGVhc2UtaW4tb3V0IGluZmluaXRlfTwvc3R5bGU+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiLz48L3N2Zz4=';

    // 显示模态框
    shareModalOverlay.classList.add('show');

    // 关闭工具气泡
    toolsBubble.classList.remove('show');

    // 生成分享图片
    generateShareImage().then(imageUrl => {
      // 设置分享图片
      shareImage.src = imageUrl;

      // 调整分享选项
      adjustShareOptions();
    }).catch(error => {
      console.error('Failed to generate sharing picture:', error);
      // 使用默认图片
      const defaultImage = window.location.origin + '/images/share-default.jpg';
      shareImage.src = defaultImage;
    });
  });

  // 关闭分享模态框
  shareModalClose.addEventListener('click', () => {
    shareModalOverlay.classList.remove('show');

    // 显示工具切换按钮
    setTimeout(() => {
      toolsToggle.classList.add('show');
    }, 500);
  });

  // 点击模态框外部关闭
  shareModalOverlay.addEventListener('click', (e) => {
    if (e.target === shareModalOverlay) {
      shareModalOverlay.classList.remove('show');

      // 显示工具切换按钮
      setTimeout(() => {
        toolsToggle.classList.add('show');
      }, 500);
    }
  });

  // 保存图片
  saveImage.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = shareImage.src;
    link.download = document.title + '_ShareImage.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // 显示成功通知
    showSuccessToast('Image saved');
  });

  // 复制链接
  copyLink.addEventListener('click', () => {
    const tempInput = document.createElement('input');
    tempInput.value = transformLink(window.location.href);
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    // 显示复制成功提示
    showSuccessToast('Link copied to clipboard');
  });

  // 分享到Twitter
  shareTwitter.addEventListener('click', () => {
    const text = encodeURIComponent(document.title);
    const url = encodeURIComponent(transformLink(window.location.href));
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  });

  // 分享到Facebook
  shareFacebook.addEventListener('click', () => {
    const url = encodeURIComponent(transformLink(window.location.href));
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  });

  // 分享到LinkedIn
  shareLinkedIn.addEventListener('click', () => {
    const url = encodeURIComponent(transformLink(window.location.href));
    const title = encodeURIComponent(document.title);
    window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`, '_blank');
  });

  // 分享到Reddit
  shareReddit.addEventListener('click', () => {
    const url = encodeURIComponent(transformLink(window.location.href));
    const title = encodeURIComponent(document.title);
    window.open(`https://www.reddit.com/submit?url=${url}&title=${title}`, '_blank');
  });

  // 分享到WhatsApp
  shareWhatsApp.addEventListener('click', () => {
    const text = encodeURIComponent(document.title + ' ' + transformLink(window.location.href));
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  });

  // 分享到Telegram
  shareTelegram.addEventListener('click', () => {
    const url = encodeURIComponent(transformLink(window.location.href));
    const text = encodeURIComponent(document.title);
    window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank');
  });

  // 分享到Weibo
  shareWeibo.addEventListener('click', () => {
    const url = encodeURIComponent(transformLink(window.location.href));
    const title = encodeURIComponent(document.title);
    window.open(`http://service.weibo.com/share/share.php?3Atrue&url=${url}&title=${title}`, '_blank');
  });

  // 加载必要的脚本
  function loadScript(src, callback) {
    const script = document.createElement('script');
    script.src = src;
    script.onload = callback;
    document.head.appendChild(script);
  }

  // 加载QRCode.js
  loadScript('https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.min.js', function() {
    console.log('QRCode.js loaded');
  });
});