
import Preload from './module/Preload.js';

var Config = {};

/*
 var audioPath = require('../../media/test_audio.mp3');

 var audio = new Audio(audioPath);

 console.log(audio);
 */

// ajax请求链接
Config.requireUrl = '';
// Config.music1 = new Howl({
//     src: [require('../../media/first.mp3')],
//     loop: true,
//     preload: true
// });
// Config.music2 = new Howl({
//     src: [require('../../media/second.mp3')],
//     loop: true,
//     preload: true
// });
// 图片路径前缀
// 如kf文件里图片不使用require时 img地址：Config.imgPath
Config.imgPath = process.env.NODE_ENV === 'handover' ? process.env.PATH : process.env.PATH + 'img/';

Config.scale = 1;

Config.Preload = Preload;

// 预加载的图片
Config.pageImgs = {
    imgs: [
        {
            name: 'bg_load_tips',
            url: require('../../img/bg_load_tips.png')
        },
        {
            name: 'bg_end',
            url: require('../../img/bg_end.jpg')
        },
        {
            name: 'bg_loading',
            url: require('../../img/bg_loading.jpg')
        },
        {
            name: 'loading_line',
            url: require('../../img/loading_line.png')
        },
        {
            name: 'loading_bell',
            url: require('../../img/loading_bell.png')
        },
        {
            name: 'loading_word',
            url: require('../../img/loading_word.png')
        },
        {
            name: 'bg_point',
            url: require('../../img/bg_point.png')
        },
        {
            name: 'bg_choose',
            url: require('../../img/bg_choose.png')
        },
        // {
        //     name: 'carpente',
        //     url: require('../../img/carpente.png')
        // },
        // {
        //     name: 'carpente_choose',
        //     url: require('../../img/carpente_choose.png')
        // },
        // {
        //     name: 'wine',
        //     url: require('../../img/wine.png')
        // },
        {
            name: 'wine_choose',
            url: require('../../img/wine_choose.png')
        },
        {
            name: 'wine_inside',
            url: require('../../img/wine_inside.png')
        },
        // {
        //     name: 'wine_name',
        //     url: require('../../img/wine_name.png')
        // },
        // {
        //     name: 'wine_name_choose',
        //     url: require('../../img/wine_name_choose.png')
        // },
        // {
        //     name: 'wine_pic',
        //     url: require('../../img/wine_pic.png')
        // },
        // {
        //     name: 'professor',
        //     url: require('../../img/professor.png')
        // },
        {
            name: 'professor_choose',
            url: require('../../img/professor_choose.png')
        },
        {
            name: 'professor_inside',
            url: require('../../img/professor_inside.png')
        },
        {
            name: 'wrong_tips',
            url: require('../../img/wrong_tips.png')
        }
        // ,
        // {
        //     name: 'professor_name',
        //     url: require('../../img/professor_name.png')
        // },
        // {
        //     name: 'professor_name_choose',
        //     url: require('../../img/professor_name_choose.png')
        // },
        // {
        //     name: 'professor_pic',
        //     url: require('../../img/professor_pic.png')
        // }
    ],
    sprites: [
        // {
        //     el: $('.kf-b'),
        //     pathPrefix: Config.imgPath,
        //     postfix: 'jpg'
        // }
    ],
    keyimgs: [
        {
            el: $('.kf-b'),
            pathPrefix: Config.imgPath,
            postfix: 'jpg'
        },
        {
            el: $('.kf-a'),
            pathPrefix: Config.imgPath,
            postfix: 'jpg'
        }
    ]
};

module.exports = Config;
