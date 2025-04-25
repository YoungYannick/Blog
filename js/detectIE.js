(function () {
    // 检测浏览器是否为 Internet Explorer（任何版本）或 Edge 的 IE 兼容模式
    function isIE() {
        try {
            var ua = window.navigator.userAgent.toLowerCase(); // 获取用户代理字符串（转为小写）
            
            // 检测旧版 IE（IE10 及以下）
            var isMSIE = ua.indexOf('msie') > -1 && ua.indexOf('opera') === -1; // 排除 Opera
            
            // 检测 IE11
            var isTrident = ua.indexOf('trident/') > -1;
            
            // 检测 Edge（基于 Chromium）和旧版 Edge，排除它们
            var isEdge = ua.indexOf('edg/') > -1 || ua.indexOf('edge/') > -1;
            
            // 检测 Edge 的 IE 兼容模式（Edge 使用 Trident 引擎）
            var isEdgeCompat = ua.indexOf('trident/') > -1 && (ua.indexOf('edg/') > -1 || ua.indexOf('edge/') > -1);
            
            // 如果是旧版 IE、IE11 或 Edge 的 IE 兼容模式，且不是基于 Chromium 的 Edge，则认为是 IE
            var result = (isMSIE || isTrident || isEdgeCompat) && !isEdge;
            
            // console.log('[detectIE.js] IE 检测结果:', result, '用户代理:', ua);
            return result;
        } catch (e) {
            // 错误处理：如果获取用户代理失败，假设不是 IE
            // console.error('[detectIE.js] IE 检测失败:', e);
            return false;
        }
    }

    // 如果检测到是 IE 或 Edge 的 IE 兼容模式，跳转到空白页面
    if (isIE()) {
        window.location.href = '/Tools/isIE.html';
    }
})();