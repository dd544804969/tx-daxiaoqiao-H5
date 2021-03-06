import Config from './Config.js';
import TD from './module/TD.js';

// 项目初始化的一些函数
// ----- 交接版 start -----
// var initProject = function () {
//     document.body.addEventListener('touchmove', function (e) {
//         e.preventDefault();
//     }, {passive: false});
// };
// ----- 交接版 end -----

// ----- 本地版 start -----

var initProject = function () {
    // cnzz统计代码 强制HTTPS，防劫持
    (function () {
        var cnzzID = '1277416882';
        document.write(unescape('%3Cspan id="cnzz_stat_icon_' + cnzzID + '"%3E%3C/span%3E%3Cscript src="' + 'https://s4.cnzz.com/z_stat.php%3Fid%3D' + cnzzID + '" type="text/javascript"%3E%3C/script%3E'));
        $('#cnzz_stat_icon_' + cnzzID).hide();
    })();

    // 初始化微信接口
    // TD.initWxApi(window.shareText);

    // 阻止微信下拉；原生js绑定覆盖zepto的默认绑定
    document.body.addEventListener('touchmove', function (e) {
        e.preventDefault();
    }, {passive: false});
};

// ----- 本地版 end -----

// 加载页对象
var LoadViewController = function () {
    // 公共变量
    var _that = this;

    // 私有变量
    var _private = {};

    _private.pageEl = $('.m-loading');
     // 加载体现在页面上
    var processLineEl = _private.pageEl.find('.load-process');
    var beginBox = _private.pageEl.find('.begin-box');
    var goTips = beginBox.find('.go-tips');
    var beginTips = beginBox.find('.begin-tips');
    var btnBegin = _private.pageEl.find('.btn-begin');
    var video = $('.m-index .video').get(0);
    var word = $('.bg-box .word');

    _private.isInit = false;

    // 初始化，包括整体页面
    _private.init = function () {
        if (_private.isInit === true) {
            return;
        }
        initProject();

        _private.gload = new Config.Preload(Config.pageImgs);

        _private.gload.onloading = function (p) {
            console.log(p);
            processLineEl.text(p + '%');
        };

        _private.gload.onload = function () {
            processLineEl.hide();
            word.hide();
            beginBox.show();

            btnBegin.on('click', function (e) {
                goTips.show();
                beginTips.hide();
                btnBegin.hide();
                video.play();
                _that.onplay && _that.onplay();
                // ----- 交接版统计 -----
                // PTTSendClick('btn', 'start', '开始播放');
                // ----- 本地版统计 -----
                TD.push('用户操作', '点击按钮', '开始播放', '', e, this);
            });
        };

        _private.gload.onfail = function (msg) {
            console.log(msg);
        };
        _private.isInit = true;
    };

    // 显示
    _that.show = function () {
        _private.pageEl.show();
    };

    // 隐藏
    _that.hide = function () {
        _that.onhide && _that.onhide();
        _private.pageEl.hide();
    };

    // 执行加载
    _that.load = function () {
        _private.gload.load();
    };

    // var rotateELSize = function (e) {
    //     var winWidth = document.documentElement.clientWidth;
    //     var winHeight = document.documentElement.clientHeight;
    //     // var width,height;

    //     if (e && winWidth / winHeight < 1.2 && winWidth / winHeight > 0.8) {
    //         return false;
    //     }

    //     window.addEventListener('resize', rotateELSize);
    // };

    _private.init();
};

module.exports = LoadViewController;
