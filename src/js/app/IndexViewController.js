import Config from './Config.js';
import KeyAnimation from './module/KeyAnimation';
import TD from './module/TD.js';
// 加载页对象
var IndexViewController = function () {
    // 公共变量
    var _that = this;

    // 私有变量
    var _private = {};

    _private.pageEl = $('.m-index');
    var videoBox = _private.pageEl.find('.video-box');
    var video = videoBox.find('.video').get(0);
    var endBox = _private.pageEl.find('.end-box');
    var btnHref = endBox.find('.btn-href');
    // var btnShare = endBox.find('.btn-share');
    var btnReplay = endBox.find('.btn-replay');
    var shareFloat = $('.m-share-float');
    var shareBox = shareFloat.find('.share-box');
    var btnSkip = videoBox.find('.btn-skip');
    var kfBox = $('.kf-box');
    var kfCtr = $('.kf-ctr');
    var touchTips = $('.touch-tips');
    var chooseBox = $('.choose-box');
    var suspect = $('.suspect');
    let buffer = Config.Preload.buffer;
    var firstTouch = true;
    var musicPlay = false;
    var hadWrong = false;
    var timer, videoTimer;
    var Kf, kfa;
    var kfNow = 0;
    var kfMax = 45;
    var kfMin = 0;
    var isPlay = false;
    var step = 0;
    var isSkip = false;

    _private.isInit = false;

    // 初始化，包括整体页面
    _private.init = function () {
        if (_private.isInit === true) {
            return;
        }
        video.play();
        videoTimer = setInterval(function () {
            if (!isPlay && video.currentTime > 0.3) {
                clearInterval(videoTimer);
                isPlay = true;
                _that.onplaying && _that.onplaying();
                setTimeout(function () {
                    video.addEventListener('timeupdate', canplayEvent);
                    video.addEventListener('ended', function () {
                        // console.log(123);
                        endBox.show();
                        endBox.addClass('show');
                    });
                }, 2000);
                return false;
            }
        }, 100);

        Kf = new KeyAnimation($('.kf-b'), 'array', buffer.keyimgs['kfb'], {
            fps: 25,
            width: 750 / 2,
            height: 1600 / 2
        });
        kfa = new KeyAnimation($('.kf-a'), 'array', buffer.keyimgs['kfa'], {
            fps: 17,
            width: 750 / 2,
            height: 1600 / 2
        });
        // btnShare.on('click', function (e) {
        //     shareFloat.show();
        //     // ----- 交接版统计 -----
        //     // PTTSendClick('btn', 'share', '分享');
        //     // ----- 本地版统计 -----
        //     // TD.push('用户操作', '点击按钮', '分享', '', e, this);
        // });
        btnReplay.on('click', function (e) {
            replay();
            // ----- 交接版统计 -----
            // PTTSendClick('btn', 'share', '分享');
            // ----- 本地版统计 -----
            TD.push('用户操作', '点击按钮', '重玩', '', e, this);
        });
        btnHref.on('click', function (e) {
            // ----- 交接版统计 -----
            // PTTSendClick('btn', 'download', '跳转');
            // ----- 本地版统计 -----
            TD.push('用户操作', '点击按钮', '立即购买', '', e, this);
        });

        shareFloat.on('click', function (e) {
            $(this).hide();
        });

        btnSkip.on('click', function (e) {
            video.currentTime = video.duration - 2;
            $(this).hide();
            // ----- 交接版统计 -----
            // PTTSendClick('btn', 'skip', '跳过视频');
            // ----- 本地版统计 -----
            // TD.push('用户操作', '点击按钮', '跳过视频', '', e, this);
        });
        suspect.on('click', function () {
            chooseSuspect($(this));
        });
        var shareResize = function (e) {
            setTimeout(function () {
                var width = window.innerWidth;
                var height = window.innerHeight;
                if (e && height / width < 1.2 && height / width > 0.8) {
                    return false;
                }
                if (width > height) {
                    shareBox.css({
                        width: height + 'px',
                        height: width + 'px'
                    });
                    Config.rotateName = 'h';
                } else {
                    shareBox.css({
                        width: width + 'px',
                        height: height + 'px'
                    });
                    Config.rotateName = 'v';
                }
            }, 500);
        };

        $(window).on('resize', shareResize);
        shareResize();
        touchEventHandler();
        _private.isInit = true;
    };
    var canplayEvent = function () {
        // if (!isPlay && video.currentTime > 0.3) {
        //     isPlay = true;
        //     _that.onplaying && _that.onplaying();
        //     return false;
        // }
        // console.log(video.currentTime);
        if (step === 0 && video.currentTime > 0 && video.currentTime < video.duration / 4) {
            step = 1;
            // ----- 交接版统计 -----
            // PTTSendClick('video', 'time', '0/4位置');
            // ----- 本地版统计 -----
            // TD.push('系统事件', '视频进度', '0/4位置', '');
        } else if (video.currentTime > 36 && musicPlay === false) {
            musicPlay = true;
            // Config.music1.play();
            // Config.music1.fade(0, 1, 1000);
        } else if (step === 1 && video.currentTime > 30) {
            step = 2;
            timer = setInterval(function () {
                if (video.currentTime >= 36.8) {
                    TD.push('系统事件', '视频进度', '放大交互', '');
                    clearInterval(timer);
                    kfBox.show();
                    video.pause();
                    kfa.fromTo(0, 24);
                    setTimeout(function () {
                        video.currentTime = 40.4;
                        video.play();
                        setTimeout(function () {
                            video.pause();
                        }, 200);
                    }, 300);
                }
            }, 100);
            // ----- 交接版统计 -----
            // PTTSendClick('video', 'time', '1/4位置');
            // ----- 本地版统计 -----
            // TD.push('系统事件', '视频进度', '1/4位置', '');
        } else if (step === 2 && video.currentTime > 80) {
            step = 3;
            // timer = setInterval(function () {
            //     if (video.currentTime >= 84.32) {
            //         clearInterval(timer);
            //         // Config.music2.play();
            //         // Config.music2.fade(0, 1, 1000);
            //         TD.push('系统事件', '视频进度', '嫌疑人交互', '');
            //         video.pause();
            //         chooseBox.show();
            //     }
            // }, 100);
            // ----- 交接版统计 -----
            // PTTSendClick('video', 'time', '2/4位置');
            // ----- 本地版统计 -----
            // TD.push('系统事件', '视频进度', '2/4位置', '');
        } else if (step === 3 && video.currentTime > video.duration / 4 * 3) {
            step = 4;
            // ----- 交接版统计 -----
            // PTTSendClick('video', 'time', '3/4位置');
            // ----- 本地版统计 -----
            // TD.push('系统事件', '视频进度', '3/4位置', '');
        }
        if (!isSkip && video.currentTime > video.duration / 4) {
            btnSkip.show();
        }
        if (video.currentTime > video.duration - 2) {
            endBox.show();
            btnSkip.hide();
            // alert(video.currentTime + ',' + video.duration);
            video.removeEventListener('timeupdate', canplayEvent);
        }
    };
    var touchEventHandler = function () {
        let startPoint = 0;
        let endPoint = 0;
        let distance = 0;
        let touchSum = 0;
        // let firstTouch = true;
        // let firstPoint = 0;
        // let lastDirection = 0;
        // let touchStartTime = new Date().getTime();
        // let touchEndTime = new Date().getTime();

        // let getPointX = (e) => {
        //     let evt = e;
        //     let pointX = evt.originalEvent.touches[0].clientX;
        //     let pointY = evt.originalEvent.touches[0].clientY;
        //     if (Config.rotateName === 'h') {
        //         return pointY;
        //     } else if (Config.rotateName === 'v') {
        //         return pointX;
        //     } else {
        //         return 0;
        //     }
        // };

        let getPointY = (e) => {
            let evt = e;
            let pointX = evt.originalEvent.touches[0].clientX;
            let pointY = evt.originalEvent.touches[0].clientY;
            if (Config.rotateName === 'v') {
                return -pointY;
            } else if (Config.rotateName === 'h') {
                return pointX;
            } else {
                return 0;
            }
        };

        let touchmoveHandler = (e) => {
            let event = e || window.event;
            // event.stopPropagation();
            console.log('touchmove');
            e.preventDefault();
            // if (videoPlaying) {
            //     return;
            // }
            if (firstTouch) {
                // touchTips.hide();
                $('.kf-a').hide();
                firstTouch = false;
            }
            endPoint = getPointY(event);
            distance = endPoint - startPoint;

            // event.preventDefault();
            // touchEndTime = new Date().getTime();
            // let duration = touchEndTime - touchStartTime;

            if (distance > 1) {
                touchSum--;
                if (touchSum <= -1 && kfNow > kfMin) {
                    Kf.prev();
                    kfNow--;
                    // lastDirection = -1;
                    startPoint = endPoint;
                    // touchStartTime = touchEndTime;
                    touchSum = 0;
                } else {
                    startPoint = endPoint;
                    touchSum = 0;
                }
            } else if (distance < -1) {
                touchSum++;
                if (touchSum >= 1 && kfNow < (kfMax - 1)) {
                    Kf.next();
                    kfNow++;
                    // lastDirection = 1;
                    startPoint = endPoint;
                    // touchStartTime = touchEndTime;
                    touchSum = 0;
                } else {
                    startPoint = endPoint;
                    touchSum = 0;
                }
            }
            // 拉到尽头
            if (kfNow > (kfMax - 2)) {
                touchTips.hide();
                video.play();
                // Config.music1.play();
                // Config.music1.fade(1, 0, 1000);
                kfBox.hide();
            }
        };
        kfCtr.on('touchstart', (e) => {
            let event = e || window.event;
            startPoint = getPointY(event);
            // firstPoint = startPoint;
            // touchStartTime = new Date().getTime();
        });

        kfCtr.on('touchmove', touchmoveHandler);
        // kfCtr.on('touchend', touchendHandler);
    };
    var replay = function () {
        video.currentTime = 0;
        firstTouch = true;
        musicPlay = false;
        hadWrong = false;
        Kf.goto(0);
        kfNow = 0;
        step = 0;
        $('.kf-a').show();
        suspect.removeClass('choose');
        suspect.find('.icon').show();
        video.play();
        video.addEventListener('timeupdate', canplayEvent);
        setTimeout(function () {
            endBox.hide();
        }, 300);
    };
    var chooseSuspect = function (that) {
        that.find('.icon').hide();
        if (that.hasClass('third')) {
            TD.push('选择嫌疑人', '选择成功');
            if (hadWrong === true) {
                $('.wrong-tips').removeClass('wrong');
                setTimeout(function () {
                    // Config.music2.fade(1, 0, 1000);
                    video.play();
                    chooseBox.hide();
                }, 500);
            } else {
                // Config.music2.fade(1, 0, 1000);
                // setTimeout(function () {
                video.play();
                chooseBox.hide();
                // }, 300);
            }
        } else {
            hadWrong = true;
            that.find('.wrong-tips').addClass('wrong');
            suspect.removeClass('choose');
            clearTimeout(timer);
            that.addClass('choose');
            timer = setTimeout(function () {
                that.removeClass('choose');
            }, 1200);
        }
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

    _private.init();
};

module.exports = IndexViewController;
