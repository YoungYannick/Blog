# YoungYannick's Blog

这是一个基于HTML、CSS和JavaScript构建的个人博客网站。

[English Version](README-EN.md)

## 项目结构

```plaintext
Blog/
├── css/                    		# CSS样式文件
│   ├── bootstrap.min.css   		# Bootstrap框架样式
│   ├── footer.css         		# 页脚组件样式
│   ├── navbar.css         		# 导航栏组件样式
│   ├── sidebar.css        		# 侧边栏组件样式
│   ├── theme.css          		# 主题切换样式
│   ├── tools-bubble.css   		# 工具气泡样式
│   └── toastr.min.css     		# Toastr通知样式
├── js/                     		# JavaScript文件
│   ├── bootstrap.bundle.min.js  	# Bootstrap框架脚本
│   ├── clipboard.min.js   	        # 剪贴板功能
│   ├── filter-module.js  	        # 滤镜模块
│   ├── jquery-3.7.1.js    	        # jQuery库
│   ├── navbar.js          	        # 导航栏功能
│   ├── sidebar.js         	        # 侧边栏功能
│   ├── theme.js           	        # 主题切换功能
│   ├── toastr.min.js      	        # 通知功能
│   └── tools-bubble.js    	        # 工具气泡功能
├── Tools/                  		# 组件模板
│   ├── article-meta.html  		# 文章元数据组件
│   ├── filter-panel.html  		# 滤镜管理面板
│   ├── footer.html       		# 页脚组件
│   ├── navbar.html        		# 导航栏组件
│   └── sidebar.html       		# 侧边栏组件
├── images/                 		# 图片资源
│   ├── banner/           		# 横幅图片
│   ├── content/          		# 内容图片
│   ├── nav/             		# 导航图标
│   ├── sponsor/         		# 赞助相关图片
│   ├── 404.gif         		# 赞助相关图片
│   └── Yannick_64.ico         	        # 站点图标
├── 123pan-unlock-tools-share.html      # 123网盘解锁工具
├── compare.html           		# 文件比较工具
├── free-subscription-share.html        # 免费订阅分享
├── unlock-music-tool-share.html        # 音乐解锁工具分享
├── proxy-tools.html       		# 代理工具
├── regular.html           		# 正则表达式生成器
├── weapon-analysis-tool.html  	        # 武器分析工具分享
├── 404.html              		# 404错误页面
├── about.html             		# 关于页面
├── content.html           		# Forza Horizon 图库
├── index.html             		# 主页
├── privacy.html           		# 隐私政策
├── sitemap.html           		# 站点地图
├── README-EN.md                  	# 项目说明文档英文版
└── README.md                  		# 项目说明文档
```

## 主要功能

### 1. 主题切换
- 支持亮色/暗色主题切换
- 自动保存主题偏好
- 响应系统主题设置

### 2. 响应式设计
- 适配移动端和桌面端
- 流畅的布局切换
- 优化的导航体验

### 3. 工具集成
- 文件比较工具
- 正则表达式生成器
- 武器分析工具分享
- 代理工具分享
- 滤镜管理面板

### 4. 用户界面
- 现代化的设计风格
- 渐变背景动画
- 毛玻璃效果
- 流畅的过渡动画

### 5. 组件化设计
- 可重用的导航栏组件
- 统一的页脚组件
- 文章元数据组件
- 工具气泡组件

## 技术栈
- HTML5
- CSS3
- JavaScript (ES6+)
- jQuery
- Bootstrap 5
- Font Awesome 6
- Google Fonts

## 特色功能
1. 自适应主题系统

    - 支持亮色/暗色模式
    - CSS变量实现主题切换
    - 平滑过渡效果
2. 滤镜系统

    - 多种预设滤镜效果
    - 自定义滤镜配置
    - 暗色模式自动适配
3. 工具气泡

    - 快速设置访问
    - 字体选择器
    - 主题切换器
    - 滤镜设置入口
4. 响应式导航

    - 智能标题显示
    - 移动端优化
    - 下拉菜单支持

## 浏览器支持
- Chrome (推荐)
- Firefox
- Safari
- Edge

## 开发说明
1. 样式规范

    - 使用CSS变量管理主题
    - 模块化的CSS文件组织
    - 响应式设计优先
2. JavaScript模块化

    - 功能模块独立封装
    - 事件委托优化
    - 防抖/节流处理
3. 性能优化

    - 图片懒加载
    - CSS动画性能优化
    - JavaScript代码分割