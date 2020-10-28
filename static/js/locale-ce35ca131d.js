'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LANG_DICT = {
    'zh': {
        'yunque': '云雀客服',
        'send': '发送',
        'type-here': '请输入',
        'start-conversation': '立即咨询',
        'at-service': '正在为您服务!',
        'customer-service': '客服',
        'offline-reconnect': '您已断开网络连接，请刷新页面重试',
        'made-by-yunque': '客服软件由云雀数据提供',
        'conversation-finished': '对话已结束，如需继续对话请刷新',
        'mobile-or-wechat': '电话或微信',
        'mobile-field': '电话: ',
        'location-field': '地址: ',
        'submit-failed': '提交出错，请稍后再试',
        'connect-failed': '连接服务器失败，请稍候再试',
        'invalid-window': '无效窗口',
        'history-tip': '您有历史聊天记录，点击载入',
        'send-vibrate-msg': '您发送了一条抖动',
        'network-fail': '由于网络原因，连接已经断开，请刷新页面重新连接',
        'manual-disconnect': '由于长时间没有应答，您已断开连接，请刷新页面以重新连接',
        'submit': '提交',
        'chat-online': '在线咨询 ',
        'new-message': '您收到一条新消息 '
    },

    'en': {
        'yunque': 'Skylark',
        'send': 'Send',
        'type-here': 'Type something here',
        'start-conversation': 'New conversation',
        'at-service': 'is at your service',
        'customer-service': '',
        'offline-reconnect': 'You are offline now, reload the page to reconnect.',
        'made-by-yunque': 'Made with ❤ by Skylark',
        'conversation-finished': 'The conversation has finished. Reload the page to start a new one.',
        'mobile-or-wechat': 'mobile',
        'mobile-field': 'Phone: ',
        'location-field': 'Location: ',
        'submit-failed': 'Something wrong, please try again later.',
        'connect-failed': 'Cannot connect to the server, please try again later.',
        'invalid-window': 'Invalid window',
        'history-tip': 'Click here to view more history',
        'send-vibrate-msg': 'You sent a message with vibration.',
        'network-fail': 'You are offline due to the network, reload the page to reconnect.',
        'manual-disconnect': 'You are offline now, reload the page to reconnect.',
        'submit': 'Submit',
        'chat-online': 'Online chat ',
        'new-message': 'You got a new message '

    }

};

var LangProvider = function () {
    function LangProvider() {
        _classCallCheck(this, LangProvider);

        this.langSet = this.getLangSet();
    }

    _createClass(LangProvider, [{
        key: 'getText',
        value: function getText(key) {
            var result = LANG_DICT[this.langSet][key];

            return result ? result : '';
        }
    }, {
        key: 'getBrowserLanguage',
        value: function getBrowserLanguage() {
            var navigator = window.navigator;
            if (navigator.browserLanguage) {
                return navigator.browserLanguage;
            }

            if (navigator.language) {
                return navigator.language;
            }

            return '';
        }
    }, {
        key: 'getLangSet',
        value: function getLangSet() {
            var lang = this.getBrowserLanguage();

            if (lang.indexOf('zh') === 0) {
                return 'zh';
            }

            return 'en';
        }
    }]);

    return LangProvider;
}();

var langProvider = new LangProvider();
"use strict";

var langSet = langProvider.getLangSet();

if (langSet === 'en') {
    $(".chat-box-en").show(0);
    $(".chat-box-cn").html('');
    $(".chat-box-cn").hide(0);
} else {
    $(".chat-box-en").html('');
}