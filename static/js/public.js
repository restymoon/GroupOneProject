// 如果入口是 在iframe中 ，就隐藏页头，并且在 在iframe中 显示内容
$(document).ready(function(){
    if (self != top) { 
        $('.top-header-bar,#new_topHeader').hide();
        $('.new-global-widget').hide();
        $("a").attr("target","_self");
    }
});

/****
 *  页面中点击关闭 - 相当于返回上一页
 *  如果不是当前域名下就跳转到首页
 *  */
function historyGo() {
    if (document.referrer.indexOf(window.location.host) !== -1) {
        self.location = document.referrer;
    } else {
        window.location.href = "/";
    }
}

/*cookie 设置  */
function setCookie(name, value, iDay) {
    var oDate = new Date();
    oDate.setDate(oDate.getDate() + iDay);
    document.cookie = name + '=' + value + ';path=/;expires=' + oDate;
}

function getCookie(name) {
    var arr = document.cookie.split(";");
    for (var i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split("=");
        // console.log(arr2);
        if (arr2[0].trim() === name) {
            return arr2[1];
        }
    }
    return null;
}

function removeCookie(name) {
    setCookie(name, "1", -1);
}

//点击客服按钮
function kfBox() {
    // if(window.location.href.indexOf('join') != -1) {
    //     //打开全屏
    //     window.open("https://tb.53kf.com/code/client/10132869/4", "newwindow", "height=500, width=650, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no")
    //     return false;
    // }
    //打开全屏
    window.open(window.$url_53kefu, "newwindow", "height=541, width=504, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no")
}

// 提示框
!$("#l_msg").length && $('body').append('<div id="l_msg"></div>');

function msg(_cont, _hun, _ct) {
    if (!_hun) _hun = "";
    if (!_ct) _ct = "";
    $('#l_msg').fadeIn().html('<p>' + _cont + '</p><p>' + _hun + '</p><p>' + _ct + '</p>');
    setTimeout(function () {
        $('#l_msg').fadeOut();
    }, 3000)
}

/***
 * 是否静止body滚动
 *  status 传入 true 即禁止body滚动
 *  默认为可以滚动
 */

function body_roll_status(status) {
    if (!window.$page_info.body_roll_stop) {
        if (status) {
            $('body').css({
                'overflow': 'hidden'
            });
        } else {
            $('body').css({
                'overflow': 'inherit'
            });
        }
    }
}


/* 共用js*/
// 判断手机号
function checkMobile(phone) {
    if ((/^1[3-9]\d{9}$/.test(phone))) {
        return true;
    } else {
        return false;

    }
}


/*获取url中传过来的参数*/
function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1),
            strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}
// 得到删除数组中指定索引的值  - 需要重新给原来数组赋值
Array.prototype.del = function (n) {
    if (n < 0) //如果n<0，则不进行任何操作。
        return this;
    else
        return this.slice(0, n).concat(this.slice(n + 1, this.length));
}

//判断当前浏览类型
function BrowserType() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
    var isEdge = userAgent.indexOf("Windows NT 6.1; Trident/7.0;") > -1 && !isIE; //判断是否IE的Edge浏览器
    var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
    var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
    var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器

    if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if (fIEVersion == 7) {
            return "IE7";
        } else if (fIEVersion == 8) {
            return "IE8";
        } else if (fIEVersion == 9) {
            return "IE9";
        } else if (fIEVersion == 10) {
            return "IE10";
        } else if (fIEVersion == 11) {
            return "IE11";
        } else {
            return "0"
        } //IE版本过低
    } //isIE end

    if (isFF) {
        return "FF";
    }
    if (isOpera) {
        return "Opera";
    }
    if (isSafari) {
        return "Safari";
    }
    if (isChrome) {
        return "Chrome";
    }
    if (isEdge) {
        return "Edge";
    }
}

function BrowserIE() {
    if (!!window.ActiveXObject || "ActiveXObject" in window) {
        return true;
    } else {
        return false;
    }
}
//myBrowser() end

/**
 * 动态加载JS
 * @param {string} url 脚本地址
 * @param {function} callback  回调函数
 */
function dynamic_load_js(url, callback) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    if (typeof (callback) == 'function') {
        script.onload = script.onreadystatechange = function () {
            if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
                callback();
                script.onload = script.onreadystatechange = null;
            }
        };
    }
    head.appendChild(script);
}

/**
 * 动态加载CSS
 * @param {string} url 样式地址
 */
function dynamic_load_css(url) {
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;
    head.appendChild(link);
}


$(function () {
    // 图片懒加载
    if ($(".lazy").length) {
        $(".lazy").lazyload({
            placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEUAAACnej3aAAAAAXRSTlMAQObYZgAAAApJREFUCNdjYAAAAAIAAeIhvDMAAAAASUVORK5CYII=",
            effect: "fadeIn",
            threshold: $(window).height(),
            load: function () {
                $(this).removeClass('lazy')
            }
        });
    }
    // 顶部固定 S
    var scroll_arr = {
        doc_scr: 0,
        l_product_nav: 0,
        t_boxTop: 0,
        isIe: BrowserIE(),
        news_nav_v4_1: false,
        l_product_nav: false,
    };
    /**
     *  如果有指定的di取消顶部固定样式 - nav_hearder_relative || l_product_nav
     */
    $("#l_product_nav").length && (scroll_arr.l_product_nav = true);
    !scroll_arr.l_product_nav && !$("#nav_hearder_relative").length && $(".top-header-bar").length && $(".top-header-bar").addClass('active');
    // 新版v5首页导航
    if ($('.new-nav-bar').length) {
        $("<div id=\"l_header_nav\"></div>").appendTo("body");
        $('.new-nav-bar').clone().appendTo("#l_header_nav");
        $("#l_header_nav .home").removeClass('home');
        scroll_arr.news_nav_v4_1 = true;
        dynamic_load_js(window.$url.oss_file + '/v4/js/news/public.v4.1.js')
    }

    function doc_scroll() {
        scroll_arr.doc_scr = $(document).scrollTop();
        /**
         * 滚动到指定id 后定位该id在顶部
         * 需要定义样式 - active 为固定 没有为正常显示
         *
         */
        if (scroll_arr.l_product_nav) {
            if (scroll_arr.doc_scr > $("#l_product_nav").offset().top) {
                $("#l_product_nav .product-nav").addClass("active");
            } else {
                $("#l_product_nav .product-nav").removeClass("active");
            }
        }
        if (scroll_arr.news_nav_v4_1) {
            if (scroll_arr.doc_scr > 300) {
                $("#l_header_nav").addClass("active");
            } else {
                $("#l_header_nav").removeClass("active");
            }
        }
        // 图片位移动画效果
        if (!scroll_arr.isIe && $(".js-transform").length) {
            $(".js-transform").each(function (i) {
                scroll_arr.t_boxTop = $(this).offset().top;
                if (scroll_arr.doc_scr > scroll_arr.t_boxTop) {
                    $(".js-transform > img").eq(i).css({
                        'transform': 'translateY(' + (scroll_arr.doc_scr - scroll_arr.t_boxTop) / 2 + 'px)',
                        '-webkit-transform': 'translateY(' + (scroll_arr.doc_scr - scroll_arr.t_boxTop) / 2 + 'px)'
                    });
                } else {
                    $(".js-transform > img").eq(i).css({
                        'transform': 'translateY(0px)',
                        '-webkit-transform': 'translateY(0px)'
                    });
                }
            });
        }
    }
    doc_scroll();
    $(document).scroll(doc_scroll);
    // 顶部固定 E

    // 顶部 切换城市功能 S
    /**
     * 选择城市  baike 或者wiki 都会直接php 渲染出来 而且不需要绑定事件跳转页面
     * 婚庆的还是按照之前的逻辑渲染
     * 其余的使用接口获取城市后渲染 然后用js跳转
     */
    if (!$('.regions-channel .select-regions').length) {
        $.get('https://www.mijwed.com/index-cityJson.html', {}, function (e) {
            var data = e.data;
            if (!data) return;
            var city_id = $('.regions-channel').attr('data-city_id');
            var hot_city = "";
            var az_city = "";
            for (var i in data.hot_city) {
                if (data.hot_city.hasOwnProperty(i)) {
                    var element = data.hot_city[i];
                    hot_city += '<a href="javascript:;" title="' + element.city_name + '婚礼策划" class="select-city-btn' + (element.city_id == city_id ? ' selected' : '') + '" data-city_pinyin="' + element.pinyin + '" data-city_id="' + element.city_id + '"><strong>' + element.city_name + '</strong></a>'
                }
            }
            for (var key in data.az_city) {
                if (data.az_city.hasOwnProperty(key)) {
                    az_city += '<dd><span class="title">' + key + '</span><div class="text">'
                    for (var i in data.az_city[key]) {
                        if (data.az_city[key].hasOwnProperty(i)) {
                            var element = data.az_city[key][i];
                            az_city += '<a href="javascript:;" title="' + element.city_name + '婚礼策划" class="select-city-btn' + (element.city_id == city_id ? ' selected' : '') + '" data-city_pinyin="' + element.pinyin + '"  data-city_id="' + element.city_id + '">' + element.city_name + '</a>'
                        }
                    }
                    az_city += '</div></dd>'
                }
            }

            var selectRegions =
                '<div class="select-regions">' +
                '    <dl class="regions">' +
                '        <dd>' +
                '            <span class="title">热门</span>' +
                '            <div class="text line-2">' +
                hot_city +
                '            </div>' +
                '        </dd>' +
                az_city +
                '    </dl>' +
                '</div>';
            $(selectRegions).appendTo($(".regions-channel"));
            selectCity();
        }, 'json');
    } else if (!$('.regions-channel .select-regions').hasClass('wiki')) {
        selectCity();
    }
    function selectCity() {
        $(".select-regions .select-city-btn").on("click", function () {
            var city_id = $(this).attr("data-city_id");
            console.log(city_id)
            if (!city_id) return;
            $.get('/wedding-changeCity.html', {
                to_city_id: city_id
            }, function (res) {
                if (res.error) {
                    window.location.href = 'https://' + $(this).attr("data-city_pinyin") + '.mijwed.com';
                } else {
                    window.location.href = res.data.url;
                }
            }, 'json')
        });
    }
    // 顶部 切换城市功能 E

    // 顶部二维码 S
    $(".qr-code-hover > span").mouseenter(function () {
        $(this).addClass('qr-hover').siblings('span').removeClass('qr-hover');
    });
    $(".qr-code-hover").mouseleave(function () {
        $(".qr-code-hover > span").removeClass('qr-hover');
    });
    // 顶部二维码 E

    /***
     * CSS3 鼠标滚动动画 * 滚动渐入
     * ie 动画默认全部执行 - 否则卡顿
     */
    var isScroll = {
        /*初始化*/
        init: function (_el) {
            if (!scroll_arr.isIe) {
                this.start(_el);
                $(window).on('scroll', function () {
                    isScroll.start(_el)
                });
            } else {
                this.ie_start(_el);
            }
        },
        /*开始*/
        start: function (_el) {
            var self = this;
            $(_el).each(function () {
                var _self = $(this);
                /*滚动高度*/
                var isScrollTop = $(window).scrollTop();
                /*滚动视度*/
                var isWindowHeiget = $(window).height() * 0.8;
                /**/
                if (isScrollTop + isWindowHeiget > $(this).offset().top) {
                    _self.addClass($(this).data('animation'));
                }
            });
        },
        ie_start: function (_el) {
            $(_el).each(function () {
                $(this).addClass($(this).data('animation'));
            });
        }
    }

    $(document).ready(function () {
        isScroll.init('.animatioans');
    });

    // 鼠标右键
    if (window.$page_info && window.$page_info.isProdEnv && !window.$page_info.debug && !!(-1 == window.location.href.indexOf("/wiki") && -1 == window.location.href.indexOf("/baike"))) {
        // 禁止右键
        document.onkeydown = function () {
            var e = window.event || arguments[0];
            //屏蔽F12
            if (e.keyCode == 123) {

                return false;
                //屏蔽Ctrl+Shift+I
            } else if ((e.ctrlKey) && (e.shiftKey) && (e.keyCode == 73)) {

                return false;
                //屏蔽Shift+F10
            } else if ((e.shiftKey) && (e.keyCode == 121)) {
                return false;
            }
        };
        //屏蔽右键单击
        document.oncontextmenu = function () {
            return false;
        }
        //禁止右键功能,单击右键将无任何反应
        var img = $("img");
        img.on("contextmenu", function (e) {
            e.preventDefault()
            return false;
        });
        img.on("dragtart", function (e) {
            e.preventDefault()
            return false;
        });
        img.on("mousedown", function (e) {
            e.preventDefault()
            return false;
        });

    }

    //   2019.09.12 添加底部悬浮广告 S
    if ($(".fixed-footer-new .cont .pic").attr("src")) {
        var cookieFixedAdv = $(".fixed-footer-new .cont .pic").attr("src").replace('https://files.mijwed.com/static/common/seoImg/', '').replace('.png', '')
        if (sessionStorage.getItem('isCloseBottom') != 1) {
            $(".fixed-footer-new").show();
        }
        // 关闭点击事件
        $(".fixed-footer-new .cont .close").click(function () {
            sessionStorage.setItem('isCloseBottom',1);
            $(".fixed-footer-new").hide();
        })
    }
    //   2019.09.12 添加底部悬浮广告 E
    
})


/*向下滚动封装*/
$.fn.textSlider = function (settings) {
    settings = jQuery.extend({
        speed: settings.speed || "normal"  ,
        line: 1,
        timer: settings.duration || 1500 
    }, settings);
    return this.each(function () {
        $.fn.textSlider.scllor($(this), settings);
    });
};
$.fn.textSlider.scllor = function ($this, settings) {
    var ul = $("ul:eq(0)", $this);
    // var timerID;
    var li = ul.children();
    var liHight = $(li[0]).innerHeight();
    var upHeight = 0 - settings.line * liHight; //滚动的高度；
    var scrollUp = function () {
        ul.animate({
            marginTop: upHeight
        }, settings.speed, function () {
            for (i = 0; i < settings.line; i++) {
                ul.find("li:first", $this).appendTo(ul);
            }
            ul.css({
                marginTop: 0
            });
        });
    
    };
    // var autoPlay = function () {
    // timerID = 
    window.$setInterval=setInterval(scrollUp, settings.timer);
    // };
    // var autoStop = function () {
    //     window.clearInterval(timerID);
    // };
    //事件绑定
    // ul.hover(autoStop, autoPlay).mouseout();
};

// 长期
var $local = {
    set: function (key, value) {
        window.localStorage.setItem(key, JSON.stringify(value)) // 设置指定key的数据（JSON格式）
    },
    get: function (key) {
        return JSON.parse(window.localStorage.getItem(key)) // 获取指定key的数据
    },
    remove: function (key) {
        window.localStorage.removeItem(key) // 删除指定key的数据
    },
    clear: function () {
        window.localStorage.clear() // 清空所有的存储数据
    }
}

// iframe 获取父页面URL
var getParentUrl = function() { 
    var url = null;
    if (parent !== window) { 
        try {
           url = parent.location.href; 
        }catch (e) { 
           url = document.referrer; 
        } 
     }
     return url;
}

