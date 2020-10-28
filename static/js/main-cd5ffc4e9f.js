'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

//polyfill
window.addEventListener = window.addEventListener || function (e, f) {
    window.attachEvent('on' + e, f);
};

window.store = {};

try {

    if ((typeof localStorage === 'undefined' ? 'undefined' : _typeof(localStorage)) === 'object') {
        try {
            localStorage.setItem('localStorage', 1);
            localStorage.removeItem('localStorage');
        } catch (e) {
            Storage.prototype._setItem = Storage.prototype.setItem;
            Storage.prototype.setItem = function () {};
        }
    }

    window._localStorage = window.localStorage;
} catch (error) {

    window._localStorage = {
        getItem: function getItem(key) {
            return window.store[key];
        },

        setItem: function setItem(key, val) {
            window.store[key] = val;
        }
    };
}
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

/*!
 * JavaScript Cookie v2.1.1
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;(function (factory) {
	if (typeof define === 'function' && define.amd) {
		define(factory);
	} else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
		module.exports = factory();
	} else {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
})(function () {
	function extend() {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[i];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function init(converter) {
		function api(key, value, attributes) {
			if (window._localStorage) {
				_localStorage.setItem(key, value);
			}

			var result;
			if (typeof document === 'undefined') {
				return;
			}

			// Write

			if (arguments.length > 1) {
				attributes = extend({
					path: '/'
				}, api.defaults, attributes);

				if (typeof attributes.expires === 'number') {
					var expires = new Date();
					expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
					attributes.expires = expires;
				}

				try {
					result = JSON.stringify(value);
					if (/^[\{\[]/.test(result)) {
						value = result;
					}
				} catch (e) {}

				if (!converter.write) {
					value = encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
				} else {
					value = converter.write(value, key);
				}

				key = encodeURIComponent(String(key));
				key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
				key = key.replace(/[\(\)]/g, escape);

				return document.cookie = [key, '=', value, attributes.expires && '; expires=' + attributes.expires.toUTCString(), // use expires attribute, max-age is not supported by IE
				attributes.path && '; path=' + attributes.path, attributes.domain && '; domain=' + attributes.domain, attributes.secure ? '; secure' : ''].join('');
			}

			// Read

			if (!key) {
				result = {};
			}

			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling "get()"
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var rdecode = /(%[0-9A-Z]{2})+/g;
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var name = parts[0].replace(rdecode, decodeURIComponent);
				var cookie = parts.slice(1).join('=');

				if (cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					cookie = converter.read ? converter.read(cookie, name) : converter(cookie, name) || cookie.replace(rdecode, decodeURIComponent);

					if (this.json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					if (key === name) {
						result = cookie;
						break;
					}

					if (!key) {
						result[name] = cookie;
					}
				} catch (e) {}
			}

			return result;
		}

		api.set = api;
		api.get = function (key) {
			if (window._localStorage) {
				return _localStorage.getItem(key);
			}

			return api(key);
		};
		api.getJSON = function () {
			return api.apply({
				json: true
			}, [].slice.call(arguments));
		};
		api.defaults = {};

		api.remove = function (key, attributes) {
			api(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
});
'use strict';

window.DBKF = {};

window.DBKF.configs = {

  //test
  // 'POLLING_SITE': '//imapi.yunque123.cn:9501',
  // 'API_ADDRESS': '//api.yunque123.cn/v1',
  // 'COMPANY_IMAGE_CDN': '//yunque-test001.cdn.yunque123.cn',

  // prod
  'POLLING_SITE': '//imapi-1.yunque360.com',
  'API_ADDRESS': '//api.yunque360.com/v1',
  'COMPANY_IMAGE_CDN': '//yunque-company.cdn.yunque360.com',

  'POLLING_INTERVAL': 15000,

  //'COMPANY_ID': 'cdbfx60eg3k',

  'IMAGE_SERVER': '//yttest001.img-cn-hangzhou.aliyuncs.com',
  'CHAT_IMAGE_SERVER': '//img.yunque123.cn',
  'COMPANY_IMAGE_SERVER': '//img.yunque123.cn'

};

(function () {
  var QueryString = function () {
    // This function is anonymous, is executed immediately and
    // the return value is assigned to QueryString!
    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      // If first entry with this name
      if (typeof query_string[pair[0]] === "undefined") {
        query_string[pair[0]] = decodeURIComponent(pair[1]);
        // If second entry with this name
      } else if (typeof query_string[pair[0]] === "string") {
          var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
          query_string[pair[0]] = arr;
          // If third or later entry with this name
        } else {
            query_string[pair[0]].push(decodeURIComponent(pair[1]));
          }
    }
    return query_string;
  }();

  if (QueryString.company_id) {
    window.DBKF.configs.COMPANY_ID = QueryString.company_id;
  }
  if (QueryString.referrer) {
    window.DBKF.configs.referrer = QueryString.referrer;
  }
  if (QueryString.pv) {
    window.DBKF.configs.pv = QueryString.pv;
  }
  if (QueryString.extra_uid) {
    window.DBKF.configs.extra_uid = QueryString.extra_uid;
  }
  if (QueryString.worker) {
    window.DBKF.configs.specified_worker_name = QueryString.worker;
  }
  if (QueryString.hide_back_btn) {
    window.DBKF.configs.hide_back_btn = true;
  }
})();

Cookies.defaults.expires = 365;
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Utils = function () {
  function Utils() {
    _classCallCheck(this, Utils);
  }

  _createClass(Utils, null, [{
    key: 'uuid',
    value: function uuid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }
  }, {
    key: 'isMobile',
    value: function isMobile() {
      var isMobile = false;
      (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|BDNuomiAppAndroid/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) isMobile = true;
      })(navigator.userAgent || navigator.vendor || window.opera);

      if (!isMobile) {
        if (window.screen && window.screen.width && window.screen.width <= 720) {
          isMobile = true;
        }
      }

      return isMobile;
    }
  }, {
    key: 'isIOSVersion10',
    value: function isIOSVersion10() {
      if (!this.isMobile()) {
        return false;
      }

      if (window.MSStream) {
        // There is some iOS in Windows Phone...
        // https://msdn.microsoft.com/en-us/library/hh869301(v=vs.85).aspx
        return false;
      }
      var match = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),
          version;

      if (match !== undefined && match !== null) {
        version = [parseInt(match[1], 10), parseInt(match[2], 10), parseInt(match[3] || 0, 10)];
        var version = parseFloat(version.join('.'));
        if (version.toString().indexOf('11') === 0) {
          return true;
        }
        if (version.toString().indexOf('10') === 0) {
          return true;
        }
        if (version.toString().indexOf('9') === 0) {
          return true;
        }
        return false;
      }

      return false;
    }
  }, {
    key: 'isIE',
    value: function isIE(version, comparison) {
      var cc = 'IE',
          b = document.createElement('B'),
          docElem = document.documentElement,
          isIE;

      if (version) {
        cc += ' ' + version;
        if (comparison) {
          cc = comparison + ' ' + cc;
        }
      }

      b.innerHTML = '<!--[if ' + cc + ']><b id="iecctest"></b><![endif]-->';
      docElem.appendChild(b);
      isIE = !!document.getElementById('iecctest');
      docElem.removeChild(b);
      return isIE;
    }
  }, {
    key: 'islowerIE10',
    value: function islowerIE10() {
      return this.isIE(8) && this.isIE(9);
    }
  }, {
    key: 'islowerIE9',
    value: function islowerIE9() {
      return this.isIE(8);
    }
  }, {
    key: 'isFixedViewportMobile',
    value: function isFixedViewportMobile() {
      if (this.isMobile() && this.isInCustomerFrame() && window.DBKF && window.DBKF.configs && window.DBKF.configs.COMPANY_ID === 'ca3iv6nheabp') {
        return true;
      }
      return this.isMobile() && window.matchMedia("(min-width: 600px)").matches;
    }
  }, {
    key: 'isInCustomerFrame',
    value: function isInCustomerFrame() {
      try {
        if (window.location == window.parent.location) {
          return false;
        }

        if (window.parent.location.hostname.indexOf('uclient') !== -1 || window.parent.location.href.indexOf('localhost:9000') !== -1) {
          return false;
        }
      } catch (error) {
        return true;
      }

      return true;
    }
  }]);

  return Utils;
}();
"use strict";

function copyToClipboard(text) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val(text).select();
  document.execCommand("copy");
  $temp.remove();

  window.toast("复制成功");
  return true;
}

function makeCall(phoneNumber) {
  if (!Utils.isMobile()) return;

  window.location.href = 'tel:' + phoneNumber;
}
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InfoExtractor = function () {
    function InfoExtractor() {
        _classCallCheck(this, InfoExtractor);
    }

    _createClass(InfoExtractor, null, [{
        key: "parseMessages",
        value: function parseMessages(messages) {
            var _this = this;

            return messages.map(function (msg) {
                if (["worker", "autoreply"].indexOf(msg.cmd) !== -1) {
                    msg.extractedInfo = _this.extract(msg.body);
                }
                return msg;
            });
        }
    }, {
        key: "extract",
        value: function extract(text) {
            text = text.replace(/<\/?[^>]+(>|$)/g, "");
            var result = {};

            if (!text) return;

            var matched = void 0;

            // 获取微信
            matched = text.match(/微信(.*){0,3}[a-zA-Z]([-_a-zA-Z0-9]{5,19})|微信(.*){0,3}1\d{10}|微信(.*){0,3}(\d{5,11})/m);
            if (matched) {
                result.wechat = matched[0].match(/[a-zA-Z]([-_a-zA-Z0-9]{5,19})+|1\d{10}|\d{5,11}/m)[0];
            }

            //获取手机
            matched = text.match(/([^0-9]|^)1\d{10}([^0-9]|$)/m);
            if (matched) {
                result.mobile = matched[0].match(/1\d{10}/m);
            }

            //获取QQ
            matched = text.match(/QQ(：)?(:)?(\s)*(\d{5,11})([^0-9]|$)|qq(：)?(:)?(\s)*([0-9]{5,11})([^0-9]|$)/m);

            if (matched) {
                result.QQ = matched[0].match(/([0-9]{5,11})/m)[0];
            }

            return result;
        }
    }]);

    return InfoExtractor;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sound = function () {
  function Sound() {
    _classCallCheck(this, Sound);
  }

  _createClass(Sound, null, [{
    key: 'init',
    value: function init() {
      this.isMute = Cookies.get('isMute') && Cookies.get('isMute') === 'true' ? true : false;
      this.displaySoundIcon();
    }
  }, {
    key: 'displaySoundIcon',
    value: function displaySoundIcon() {
      if (Utils.isMobile()) {
        $("#play-sound-icon").hide();
        $("#not-play-sound-icon").hide();
        return;
      }

      if (this.isMute) {
        $("#play-sound-icon").hide();
        $("#not-play-sound-icon").show();
      } else {
        $("#not-play-sound-icon").hide();
        $("#play-sound-icon").show();
      }
    }
  }, {
    key: 'toggleSound',
    value: function toggleSound() {

      this.isMute = !this.isMute;
      Cookies.set('isMute', this.isMute);

      if (this.isMute) {
        $("#play-sound-icon").hide();
        $("#not-play-sound-icon").show();
      } else {
        $("#not-play-sound-icon").hide();
        $("#play-sound-icon").show();
      }
    }
  }, {
    key: 'getInternetExplorerVersion',
    value: function getInternetExplorerVersion() {
      var rv = -1; // Return value assumes failure.
      if (navigator.appName == 'Microsoft Internet Explorer') {
        var ua = navigator.userAgent;
        var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null) rv = parseFloat(RegExp.$1);
      }
      return rv;
    }
  }, {
    key: 'playNewMessage',
    value: function playNewMessage() {
      if (window.DBKF && window.DBKF.configs && window.DBKF.configs.uirule && window.DBKF.configs.uirule.enableSound === 'false') {
        return;
      }

      if (Utils.isMobile()) {
        return;
      }

      if (this.isMute) return;
      var ele = document.getElementById('new-message-sound');
      if (ele && ele.play) {
        var promise = ele.play();
        if (promise) {
          promise.then(function (_) {})['catch'](function (error) {});
        }
      }
    }
  }, {
    key: 'playSentMessage',
    value: function playSentMessage() {
      if (Utils.isMobile()) {
        return;
      }

      if (this.isMute) return;
      var ele = document.getElementById('sent-message-sound');
      if (ele && ele.play) {
        var promise = ele.play();
        if (promise) {
          promise.then(function (_) {})['catch'](function (error) {});
        }
      }
    }
  }, {
    key: 'audioWarmUp',
    value: function audioWarmUp() {

      //手机端去掉声音
      if (Utils.isMobile()) {
        return;
      }

      if (!navigator.userAgent.match(/(iPod|iPhone|iPad|XiaoMi)/)) {
        return;
      }

      var audio = document.getElementById('new-message-sound');

      function play() {
        audio.volume = 0;
        Sound.playNewMessage();
        audio.volume = 1;
      }

      window.addEventListener('touchstart', play, false);
      audio.addEventListener('play', function () {
        window.removeEventListener('touchstart', play, false);
      }, false);
    }
  }]);

  return Sound;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var YunqueImage = function () {
  function YunqueImage(CONFIGS) {
    _classCallCheck(this, YunqueImage);

    this.API_ADDRESS = CONFIGS.POLLING_SITE;
  }

  _createClass(YunqueImage, [{
    key: 'sendImage',
    value: function sendImage(file) {
      var _this = this;

      this.file = file;

      try {
        var ext = file.name.split('.').pop();

        return this.getToken(ext).then(this.uploadFile.bind(this)).then(function () {
          return _this.fileName;
        });
      } catch (error) {
        //say something;
      }
    }
  }, {
    key: 'getToken',
    value: function getToken(ext) {
      var data = {
        ext: ext,
        type: 'chat'
      };

      return $.post(this.API_ADDRESS + '/uptoken', data);
    }
  }, {
    key: 'uploadFile',
    value: function uploadFile(res) {
      var data = res.data;

      var host = data.host;

      if (host.indexOf('http') !== -1) {
        host = host.slice(5);
      }

      var viewhost = data.viewhost;
      var OSSAccessKeyId = data.access_id;
      var policy = data.policy;
      var Signature = data.signature;
      var key = data.filename;

      this.fileName = viewhost + '/' + key + '!default';
      var postData = new FormData();
      postData.append('OSSAccessKeyId', OSSAccessKeyId);
      postData.append('policy', policy);
      postData.append('Signature', Signature);
      postData.append('key', key);
      postData.append('file', this.file);

      return $.ajax({
        url: host,
        type: 'POST',
        data: postData,
        processData: false, // tell jQuery not to process the data
        contentType: false // tell jQuery not to set contentType
      });
    }
  }]);

  return YunqueImage;
}();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Message = function () {
  function Message() {
    _classCallCheck(this, Message);
  }

  _createClass(Message, null, [{
    key: "addAdsMessage",
    value: function addAdsMessage(ad) {
      var historyMsg = $(".msg-history");
      if (historyMsg.length) {
        historyMsg.after(this.getAdsMessage(ad));
      } else {
        $("#chat-history").prepend(this.getAdsMessage(ad));
      }
    }
  }, {
    key: "addTempClientMessage",
    value: function addTempClientMessage(msg) {
      msg.body = filterXSS(msg.body);
      $("#chat-history").append(this.getClientMessage(msg));
      this.scrollBottom();
    }
  }, {
    key: "addTempClientImageMessage",
    value: function addTempClientImageMessage(msg) {
      msg.body = filterXSS(msg.body);
      $("#chat-history").append(this.getClientImageMessage(msg));
      this.scrollBottom();
    }
  }, {
    key: "addClientMessage",
    value: function addClientMessage(msg) {
      var insertBefore = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

      if (insertBefore) {
        $("#chat-history").prepend(this.getClientMessage(msg));
      } else {
        $("#chat-history").append(this.getClientMessage(msg));
        this.scrollBottom();
      }
    }
  }, {
    key: "addAgentMessage",
    value: function addAgentMessage(msg) {
      var insertBefore = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

      if (insertBefore) {
        $("#chat-history").prepend(this.getAgentMessage(msg));
      } else {
        $("#chat-history").append(this.getAgentMessage(msg));
        this.scrollBottom();
      }
      $("a").attr("target", "_blank");
    }
  }, {
    key: "addShakeMessage",
    value: function addShakeMessage(msg) {
      var insertBefore = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

      if (insertBefore) {
        $("#chat-history").prepend(this.getShakeMessage(msg));
      } else {
        $("#chat-history").append(this.getShakeMessage(msg));
        this.scrollBottom();
      }
    }
  }, {
    key: "addImageMessage",
    value: function addImageMessage(msg) {
      var insertBefore = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

      if (insertBefore) {
        $("#chat-history").prepend(this.getImageMessage(msg));
      } else {
        $("#chat-history").append(this.getImageMessage(msg));
        this.scrollBottom();
      }
    }
  }, {
    key: "addInfoMessage",
    value: function addInfoMessage(msg) {
      var insertBefore = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

      if (insertBefore) {
        $("#chat-history").prepend(this.getInfoMessage(msg));
      } else {
        $("#chat-history").append(this.getInfoMessage(msg));
        this.scrollBottom();
      }
    }
  }, {
    key: "addHistoryTip",
    value: function addHistoryTip(history) {
      $("#chat-history").prepend(this.getHistoryTip(history));
    }
  }, {
    key: "addDisconnectMessage",
    value: function addDisconnectMessage() {
      $("#chat-history").append(this.getDisconnectMessage());
    }
  }, {
    key: "addNetworkFailMessage",
    value: function addNetworkFailMessage() {
      $("#chat-history").append(this.getNetworkFailMessage());
    }
  }, {
    key: "getAdsMessage",
    value: function getAdsMessage(ad) {
      var text = "\n        <div class=\"msg-wrapper msg-ads\">\n              " + ad + "\n              </div>\n        </div>\n      ";

      return text;
    }
  }, {
    key: "getClientMessage",
    value: function getClientMessage(msg) {
      var text = "\n          <div class=\"msg-wrapper msg-client\" id=\"client-" + msg.cmicrotime + "\">\n            <div class=\"bubble\">\n              <i class=\"iconfont error\">&#xe606;</i>\n              <i class=\"iconfont sending\">&#xe609;</i>\n              <div class=\"bubble-content\">\n              " + msg.body + "\n              </div>\n            </div>\n          </div>\n        ";

      return renderEmoji(text);
    }
  }, {
    key: "getClientImageMessage",
    value: function getClientImageMessage(msg) {
      return "\n          <div class=\"msg-wrapper msg-image sending\" id=\"client-" + msg.cmicrotime + "\">\n\n            <div class=\"image-bubble\">\n              <i class=\"iconfont error\">&#xe606;</i>\n              <i class=\"iconfont sending\">&#xe609;</i>\n              <img src=\"" + msg.body + "\">\n              <div class=\"clearfix\"></div>\n            </div>\n          </div>\n        ";
    }
  }, {
    key: "getAgentMessage",
    value: function getAgentMessage(msg) {
      var extraInfo = '';
      if (msg.extractedInfo && Object.keys(msg.extractedInfo).length) {
        extraInfo += "<div class=\"extra-info\">";
        if (msg.extractedInfo.wechat) {
          extraInfo += "<span class=\"info-tag\"\n          onclick=\"copyToClipboard('" + msg.extractedInfo.wechat + "')\">\n          复制微信\n        </span>";
        }

        if (msg.extractedInfo.mobile) {
          if (Utils.isMobile()) {
            extraInfo += "<a href=\"tel:" + msg.extractedInfo.mobile + "\"><span class=\"info-tag\"\n        >\n        拨打电话\n        </span></a>";
          } else {
            extraInfo += "<span class=\"info-tag\" onclick=\"copyToClipboard('" + msg.extractedInfo.mobile + "')\">\n        复制手机\n        </span>";
          }
        }

        if (msg.extractedInfo.QQ) {
          extraInfo += "<span class=\"info-tag\"\n        onclick=\"copyToClipboard('" + msg.extractedInfo.QQ + "')\">\n        复制QQ\n        </span>";
        }
        extraInfo += "</div>";
      }

      var text = "\n          <div class=\"msg-wrapper msg-agent\">\n            <div class=\"name\">" + msg.agentName + "</div>\n            <div class=\"bubble\">\n              <div>" + msg.body + ("</div>\n            </div>\n            " + extraInfo + "\n          </div>\n        ");

      return text;

      // return renderEmoji(text);
    }
  }, {
    key: "getShakeMessage",
    value: function getShakeMessage(msg) {
      return "\n          <div class=\"msg-wrapper msg-info\" id=\"client-" + msg.cmicrotime + "\">\n            <span style=\"position: relative\"><i class=\"iconfont error\">&#xe606;</i>" + langProvider.getText('send-vibrate-msg') + "</span>\n          </div>\n        ";
    }
  }, {
    key: "getInfoMessage",
    value: function getInfoMessage(msg) {
      return "\n          <div class=\"msg-wrapper msg-info\" id=\"info-" + msg.cmicrotime + "\">\n            " + msg.body + "\n          </div>\n        ";
    }
  }, {
    key: "getImageMessage",
    value: function getImageMessage(msg) {
      msg.body = msg.body.replace('!default', '');
      return "\n          <div class=\"msg-wrapper msg-image\" id=\"client-" + msg.cmicrotime + "\">\n            <div class=\"image-bubble\">\n              <img src=\"" + msg.body + "\" >\n            </div>\n          </div>\n        ";
    }
  }, {
    key: "getHistoryTip",
    value: function getHistoryTip(history) {

      if (history) {
        return "\n          <div class=\"msg-wrapper msg-info msg-history\" id=\"" + history + "\">\n          " + langProvider.getText('history-tip') + "\n          </div>\n        ";
      } else {
        return "\n          <div class=\"msg-wrapper msg-info msg-history\">\n            " + langProvider.getText('history-tip') + "\n          </div>\n        ";
      }
    }
  }, {
    key: "getDisconnectMessage",
    value: function getDisconnectMessage() {
      return "\n          <div class=\"msg-wrapper msg-info\">\n            " + langProvider.getText('manual-disconnect') + "\n\n          </div>\n        ";
    }
  }, {
    key: "getNetworkFailMessage",
    value: function getNetworkFailMessage() {
      return "\n          <div class=\"msg-wrapper msg-info\">\n            " + langProvider.getText('network-fail') + "\n          </div>\n        ";
    }
  }, {
    key: "addHistoryMsgs",
    value: function addHistoryMsgs(id) {
      var _this = this;

      var postData = {
        company_id: window.DBKF.configs.COMPANY_ID,
        uid: Cookies.get("uid")
      };

      if (id) {
        postData.microtime = id;
      }

      $.post(window.DBKF.configs.API_ADDRESS + "/chat/chat/web-history", postData, function (data) {
        var conversation = InfoExtractor.parseMessages(data.result.data);
        $(".chat-history .msg-history").remove();
        _this.renderHistoryMessages(conversation, true);
        if (data.result && data.result.more) {
          _this.addHistoryTip(data.result.data[0].microtime);
        }
      });
    }
  }, {
    key: "scrollBottom",
    value: function scrollBottom() {
      window.setTimeout(function () {
        var element = document.getElementById("chat-history");
        $(element).scrollTop($(element)[0].scrollHeight);
      }, 300);
    }
  }, {
    key: "renderHistoryMessages",
    value: function renderHistoryMessages(messages) {
      var insertBefore = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

      // let i = 0;

      if (insertBefore) {
        for (var i = messages.length - 1; i >= 0; i--) {
          var message = messages[i];
          this.renderHistoryMessage(message, insertBefore);
        }
      } else {
        for (var messageKey in messages) {
          var message = messages[messageKey];
          this.renderHistoryMessage(message, insertBefore);
        }
      }
    }
  }, {
    key: "renderHistoryMessage",
    value: function renderHistoryMessage(message, insertBefore) {
      if (message.cmd === "user") {
        if (message.cmicrotime && $("#client-" + message.cmicrotime).length !== 0) return;

        Message.addClientMessage(message, insertBefore);
      }

      if (message.cmd === "worker") {
        message.agentName = window.DBKF.agentName;
        if (window.LATEST_MESSAGE_IS_USER === true) {} else {
          Sound.playNewMessage();
        }
        Message.addAgentMessage(message, insertBefore);
      }

      if (message.cmd === "autoreply") {
        message.agentName = window.DBKF.agentName;
        if (window.LATEST_MESSAGE_IS_USER === true) {} else {
          Sound.playNewMessage();
        }
        Message.addAgentMessage(message, insertBefore);
      }

      if (message.cmd === "shake") {
        if ($("#client-" + message.cmicrotime).length !== 0) return;
        Message.addShakeMessage(message, insertBefore);
      }

      if (message.cmd === "image") {
        if ($("#image-" + message.cmicrotime).length !== 0) return;
        Message.addImageMessage(message, insertBefore);
      }
    }
  }]);

  return Message;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Commet = function () {
  function Commet(CONFIGS) {
    _classCallCheck(this, Commet);

    this.url = CONFIGS.POLLING_SITE.replace('ws://', '//');
    this.company_id = CONFIGS.COMPANY_ID;
    this.POLLING_INTERVAL = CONFIGS.POLLING_INTERVAL;

    this.connected = false;
    this.uid = '';
    this.send_queue = [];
    this.sending = false;
    this.total = 0;
    this.reLoopCount = 0;
    jQuery.support.cors = true;
    this.connect();
  }

  _createClass(Commet, [{
    key: 'send',
    value: function send(msg) {
      this.send_queue.push(msg);

      if (this.connected && !this.sending) {
        this.sendMessage();
      }
    }
  }, {
    key: 'sendMessage',
    value: function sendMessage() {
      if (this.send_queue.length === 0) {
        this.sending = false;
        return;
      }

      var websocket = this;
      var msg = this.send_queue.pop();
      this.sending = true;

      $.ajax({
        type: "POST",
        dataType: "json",
        url: this.url + '/send',
        data: {
          "uid": websocket.uid,
          "company_id": websocket.company_id,
          "body": msg.body,
          "cmd": msg.cmd,
          "cmicrotime": msg.cmicrotime,
          "worker_name": websocket.worker_name
        },
        success: function success(data, textStatus) {
          //发送数据成功
          if (data.success == "1") {
            if (!!msg.cmicrotime) {
              websocket.onsendSuccess(msg.cmicrotime);
            }

            //继续发送
            websocket.sendMessage();
          } else {
            console.log("ErrorMessage: " + data);

            if (!!msg.cmicrotime) {
              websocket.onsendError(msg.cmicrotime);
            }

            websocket.sendMessage();
          }
        },
        error: function error(XMLHttpRequest, textStatus, errorThrown) {
          var e = {};
          e.data = textStatus;
          websocket.onerror(e);
          if (!!msg.cmicrotime) {
            websocket.onsendError(msg.cmicrotime);
          }

          websocket.sendMessage();
        }
      });
    }
  }, {
    key: 'checkHeadless',
    value: function checkHeadless() {
      if (/bot|googlebot|crawler|spider|robot|crawling/i.test(navigator.userAgent)) {
        return false;
      }

      if (window._phantom || window.__phantomas || window.Buffer || window.emit || window.spawn || window.webdriver || window.domAutomation || window.domAutomationController) {
        return false;
      }

      return true;
    }
  }, {
    key: 'connect',
    value: function connect() {
      //skip headless browser
      if (!this.checkHeadless()) return;

      this.cleanStuff();

      var websocket = this;
      var data = {
        company_id: websocket.company_id,
        referrer: window.DBKF.configs.referrer ? window.DBKF.configs.referrer : '',
        title: window.DBKF.configs.pageTitle ? window.DBKF.configs.pageTitle : '',
        pv: window.DBKF.configs.pv ? window.DBKF.configs.pv : '',
        platform: this.checkPlatform()
      };
      if (window.DBKF.configs.specified_worker_name) {
        data.specified_worker_name = window.DBKF.configs.specified_worker_name;
      }

      var uid = void 0;
      if (window.DBKF.configs.extra_uid && window.DBKF.configs.extra_uid !== 'undefined') {
        uid = window.DBKF.configs.extra_uid;
      }
      if (Cookies.get('uid') && Cookies.get('uid') !== 'undefined') {
        uid = Cookies.get('uid');
      }
      if (uid) {
        data.uid = uid;
      }

      $.ajax({
        type: "POST",
        dataType: "json",
        url: this.url + '/connect',
        data: data,
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        },
        success: function success(data, textStatus) {
          //发送数据成功
          if (data.success === 1) {
            data = data.data;

            websocket.uid = data.uid;

            Cookies.set('uid', websocket.uid);
            if (Utils.isIOSVersion10()) {
              window.parent.postMessage('$YUNQUE_EXTRA_UID=' + websocket.uid, '*');
            }
            window.parent.postMessage('$YUNQUE_UID=' + websocket.uid, '*');

            websocket.connected = true;
            websocket.loop();
            websocket.onopen(data);
          } else {
            //block
            if (data.message == "Big brother is watching you.") {
              window.parent.postMessage('$YUNQUE_BLOCKED', '*');
            }

            //禁用
            if (data.message == "Chat link suspended.") {
              window.parent.postMessage('$YUNQUE_SUSPENDED', '*');
            }

            //
            if (data.message == "No worker online, please connect later.") {
              data = data.data;
              websocket.uid = data.uid;
              Cookies.set('uid', websocket.uid);
              if (Utils.isIOSVersion10()) {
                window.parent.postMessage('$YUNQUE_EXTRA_UID=' + websocket.uid, '*');
              }

              $.ajax({
                type: "GET",
                dataType: "json",
                cache: false,
                url: window.DBKF.configs.POLLING_SITE + '/company?id=' + websocket.company_id,
                success: function success(data, textStatus) {
                  window.DBKF.COMPANY_INFO = JSON.stringify(data.data);
                  window.parent.postMessage('$COMPANY_INFO=' + window.DBKF.COMPANY_INFO, '*');
                  websocket.onNoWorker();
                }
              });
            }
          }
        },
        error: function error(XMLHttpRequest, textStatus, errorThrown) {

          if (!XMLHttpRequest.getAllResponseHeaders()) {
            return;
          }
          alert(langProvider.getText('connect-failed'));
        }
      });
    }
  }, {
    key: 'loop',
    value: function loop() {
      var websocket = this;
      if (!this.connected) return;
      if (websocket.pulling === true) return;
      websocket.pulling = true;

      $.ajax({
        type: "POST",
        dataType: "json",
        url: websocket.url + '/pull',
        timeout: this.POLLING_INTERVAL,
        data: {
          "uid": websocket.uid,
          "company_id": websocket.company_id,
          "from": websocket.total,
          "worker_name": websocket.worker_name

        },
        success: function success(data, textStatus) {
          //从服务器得到数据，显示数据并继续查询
          if (data.success == "1") {
            websocket.reLoopCount = 0;
            websocket.total = data.data.total;

            websocket.worker_name = data.worker ? data.worker.worker_name : '';

            websocket.onmessage(data);
          }
          //未从服务器得到数据，继续查询
          else if (data.success == "0") {
              if (data.message === "Please connect first.") {
                websocket.close(langProvider.getText(langProvider.getText('conversation-finished')));
                return;
              }
            } else {
              console.log("ErrorMessage: " + data);
            }
          websocket.pulling = false;
          websocket.loop();
        },
        //Ajax请求超时，继续查询
        error: function error(XMLHttpRequest, textStatus, errorThrown) {
          // if (textStatus == "timeout") {

          if (websocket.reLoopCount >= 3) {
            websocket.onNetworkFail();
            websocket.pulling = false;
            websocket.close();
          } else {
            setTimeout(function () {
              websocket.reLoopCount++;
              websocket.pulling = false;
              websocket.loop();
            }, 5000);
          }
        }
      });
    }
  }, {
    key: 'close',
    value: function close(msg) {
      this.connected = false;
      this.onclose(msg);
    }
  }, {
    key: 'checkPlatform',
    value: function checkPlatform() {
      var check = false;
      (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|BDNuomiAppAndroid/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
      })(navigator.userAgent || navigator.vendor || window.opera);
      if (!check) {
        if (window.screen && window.screen.width && window.screen.width <= 720) {
          check = true;
        }
      }
      var result = check ? 'mobile' : 'pc';
      return result;
    }
  }, {
    key: 'cleanStuff',
    value: function cleanStuff() {
      $("#input-textarea").val('');
    }
  }, {
    key: 'getSpecificWorker',
    value: function getSpecificWorker() {}
  }]);

  return Commet;
}();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CommentClass = function () {
  function CommentClass() {
    _classCallCheck(this, CommentClass);
  }

  _createClass(CommentClass, null, [{
    key: "submit",
    value: function submit() {
      if (this.sending) return;
      this.triggerBaiduStatisticsByComment();

      var url = window.DBKF.configs.API_ADDRESS;

      var mobileNode = document.getElementById("mobile-input");
      if (!mobileNode || !mobileNode.value) {
        $(".comment-alert").show();
        return;
      }

      var commentNode = document.getElementById("comment-input");
      if (!commentNode || !commentNode.value) {
        $(".comment-alert").show();
        return;
      }

      this.sending = true;

      $.ajax({
        type: "POST",
        dataType: "json",
        url: url + "/chat/chat/message",
        data: {
          uid: Cookies.get("uid"),
          company_id: window.DBKF.configs.COMPANY_ID,
          mobile: mobileNode.value,
          message: commentNode.value,
          referrer: window.DBKF.configs.referrer ? window.DBKF.configs.referrer : "",
          platform: Utils.isMobile() ? 'mobile' : 'pc',
          firsturl: window.DBKF.configs.pv ? window.DBKF.configs.pv : ""
        },
        success: function success(data, textStatus) {
          $(".after-submit").show();
          $(".box-comment .body").hide();
          $(".box-comment .comment-alert").hide();
          this.sending = false;
        },
        error: function error(XMLHttpRequest, textStatus, errorThrown) {
          alert(langProvider.getText('submit-failed'));
          this.sending = false;
        }
      });
    }
  }, {
    key: "triggerBaiduStatisticsByComment",
    value: function triggerBaiduStatisticsByComment() {
      window.parent.postMessage("$YUNQUE_BAIDU_SEND_COMMENT", "*");
    }
  }]);

  return CommentClass;
}();
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function chat() {
  Commet.prototype.onopen = function (data) {
    init();
    displayCompanyName();
    checkHistory(data);
  };

  Commet.prototype.onmessage = function (data) {
    data = data.data;

    if (data.worker === 'dispatcher') {
      return;
    }

    if (window.DBKF.COMPANY_INFO) {
      window.parent.postMessage('$COMPANY_INFO=' + window.DBKF.COMPANY_INFO, '*');
      window.DBKF.COMPANY_INFO = null;
    }

    if (data.worker === 'noworker') {
      ws.onNoWorker();
      return;
    }

    if (_typeof(data.worker) === 'object') {
      displayAgent(data.worker);
    }

    var firstRender = document.getElementById("first-render-div");

    if (data.messages) {
      data.messages = InfoExtractor.parseMessages(data.messages);
    }

    if (!firstRender) {
      var div = document.createElement("div");
      div.style.display = "none";
      div.setAttribute("id", "first-render-div");
      document.body.appendChild(div);

      if (data.messages) {

        if (data.messages.length === 0) {
          window.parent.postMessage("$HAS_NEW_USER_MESSAGE=0", "*");
        } else {
          for (var j = data.messages.length - 1; j >= 0; j--) {
            var item = data.messages[j];
            if (["worker", "autoreply"].indexOf(item.cmd) !== -1) {
              window.parent.postMessage("$LATEST_MESSAGE_IS_USER=0", "*");
              window.LATEST_MESSAGE_IS_USER = false;
              break;
            }
            if (["user", "image", "shake"].indexOf(item.cmd) !== -1) {
              window.parent.postMessage("$LATEST_MESSAGE_IS_USER=1", "*");
              window.LATEST_MESSAGE_IS_USER = true;
              break;
            }
          }

          var flag = false;
          for (var i = 0; i < data.messages.length; i++) {
            var _item = data.messages[i];
            if (["user", "image", "shake"].indexOf(_item.cmd) !== -1) {
              window.parent.postMessage("$HAS_NEW_USER_MESSAGE=1", "*");
              flag = true;
              break;
            }
          }

          if (!flag) {
            window.parent.postMessage("$HAS_NEW_USER_MESSAGE=0", "*");
          }
        }
      }

      Message.renderHistoryMessages(data.messages);
    } else {
      renderNewMessages(data.messages);
    }

    if (data.messages && data.messages.length !== 0) {
      for (var i = 0; i < data.messages.length; i++) {
        var _item2 = data.messages[i];
        if (["worker", "autoreply", "image"].indexOf(_item2.cmd) !== -1) {
          window.parent.postMessage("$HAS_NEW_WORKER_MESSAGE", "*");
        }

        if (["worker", "autoreply"].indexOf(_item2.cmd) !== -1) {
          window.parent.postMessage("$NEW_WORKER_MESSAGE=" + _item2.body, "*");
        }
      }
    }
  };

  Commet.prototype.onclose = function (msg) {
    if (!msg) msg = langProvider.getText('offline-reconnect');

    var inputTextarea = $("#input-textarea");

    inputTextarea.attr("disabled", "disabled");
    inputTextarea.attr("placeholder", msg);
    inputTextarea.addClass('disconnected');
    inputTextarea.val(msg);
    $("#send-btn").hide();

    $(".actions a").hide();
  };

  Commet.prototype.onerror = function () {};

  Commet.prototype.onsendSuccess = function (id) {
    $("#client-" + id).removeClass("sending");
  };

  Commet.prototype.onsendError = function (id) {
    $("#client-" + id).removeClass("sending");
    $("#client-" + id).addClass("error");
  };

  Commet.prototype.onNoWorker = function () {
    displayComment();
    displayAgent({}, false);
    this.close();
  };

  Commet.prototype.onNetworkFail = function () {
    Message.addNetworkFailMessage();
  };

  var ws = new Commet(window.DBKF.configs);
  replaceLogoLink();
  var imageService = new YunqueImage(window.DBKF.configs);

  function init() {
    listenEvent();
  }

  function displayBrandAds() {
    if (document.querySelectorAll('.msg-ads').length) {
      return;
    }

    var rule = isMobile() ? window.DBKF.configs.mwindowrule : window.DBKF.configs.windowrule;

    if (rule.brandAds && $.trim(rule.brandAds) !== "") {
      Message.addAdsMessage(rule.brandAds);
    }
  }

  function displayAgent(data) {
    var hasWorker = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

    var originalData = data;
    if (!window.DBKF.configs.windowrule) {
      $.ajax({
        type: "GET",
        dataType: "json",
        cache: false,
        url: window.DBKF.configs.POLLING_SITE + "/company?id=" + window.DBKF.configs.COMPANY_ID,
        success: function success(data, textStatus) {

          window.DBKF.configs.windowrule = JSON.parse(data.data.windowrule || "[]");
          window.DBKF.configs.mwindowrule = JSON.parse(data.data.mwindowrule || "[]");
          window.DBKF.configs.uirule = JSON.parse(data.data.uirule || "[]");

          var rule = isMobile() ? window.DBKF.configs.mwindowrule : window.DBKF.configs.windowrule;

          //pageWindowTitle 只存在于桌面版windowrule 中
          var framePageTitle = window.DBKF.configs.windowrule && window.DBKF.configs.windowrule.pageWindowTitle ? window.DBKF.configs.windowrule.pageWindowTitle : '在线咨询 ' + data.data.name;

          window.parent.postMessage("$COMPANY_INFO_ANNOTHER=" + framePageTitle, "*");

          updateUI();
          renderColor();

          if (hasWorker === false) {
            return;
          }
          renderStandardWindow();

          changeAvatar(originalData);

          window.parent.postMessage("$CMD_AGENT_AVATAR=" + window.avatarUrl, "*");
          $("#avatar-img").attr("src", window.avatarUrl);

          updateLogoPosition(rule);

          displayBrandAds();

          if (rule && rule.showDialogTitle !== false) {
            $(".box-header .connected .agent-name").text(originalData.nickname);
          }
          window.DBKF.agentName = originalData.nickname;

          window.parent.postMessage("$CMD_AGENT_NAME=" + originalData.nickname, "*");
        }
      });
    } else {
      if (hasWorker === false) {
        renderColor();
        return;
      }
      renderStandardWindow();

      var rule = isMobile() ? window.DBKF.configs.mwindowrule : window.DBKF.configs.windowrule;
      if (data.avatar) {
        window.avatarUrl = window.DBKF.configs.COMPANY_IMAGE_CDN + "/" + data.avatar + "!square";
      } else if (rule.companyLogo) {
        window.avatarUrl = window.DBKF.configs.COMPANY_IMAGE_CDN + "/" + rule.companyLogo + "!square";
      } else {
        window.avatarUrl = "//uworker.yunque360.com/assets/images/blank-avatar.png";
      }
      $("#avatar-img").attr("src", window.avatarUrl);

      updateLogoPosition(rule);

      window.parent.postMessage("$CMD_AGENT_AVATAR=" + window.avatarUrl, "*");

      displayBrandAds();
      updateUI();
      renderColor();

      if (rule && rule.showDialogTitle !== false) {
        $(".box-header .connected .agent-name").text(originalData.nickname);
      }
      window.DBKF.agentName = originalData.nickname;

      window.parent.postMessage("$CMD_AGENT_NAME=" + originalData.nickname, "*");
    }

    if (hasWorker === false) {
      return;
    }

    window.DBKF.agentName = originalData.nickname;

    setTimeout(function () {
      $(".box-header .connect-info").hide();
      $(".box-header .connected").show();
    }, 0);
  }

  function changeAvatar(data) {
    var avatar = data.worker_avatar || data.avatar;
    var rule = isMobile() ? window.DBKF.configs.mwindowrule : window.DBKF.configs.windowrule;
    if (avatar) {
      window.avatarUrl = window.DBKF.configs.COMPANY_IMAGE_CDN + "/" + avatar + "!square";
    } else if (rule.companyLogo) {
      window.avatarUrl = window.DBKF.configs.COMPANY_IMAGE_CDN + "/" + rule.companyLogo + "!square";
    } else {
      window.avatarUrl = "//uworker.yunque360.com/assets/images/blank-avatar.png";
    }
  }

  function updateUI() {
    if ($(".chat-box").hasClass("ui-updated")) {
      return;
    }

    layoutRerender();

    var windowRule = isMobile() ? window.DBKF.configs.mwindowrule : window.DBKF.configs.windowrule;

    if (windowRule.showDialogTitle === false && !windowRule.dialogSubTitle) {
      $(".agent-name").hide();
      $(".company-name").css("top", 0);
      $(".company-name").css("bottom", 0);
      $(".company-name").css("font-size", "14px");
      $(".company-name").css("line-height", "60px");
      if (Utils.isFixedViewportMobile()) {
        $(".company-name").css("font-size", "28px");
        $(".company-name").css("line-height", "120px");
      }
    }
    if (windowRule.showDialogTitle === false && !!windowRule.dialogSubTitle) {
      $(".agent-name").text(windowRule.dialogSubTitle);
    }

    if (windowRule.showSoundSwitcher === false) {
      $("#play-sound-icon").parent('a').hide();
    }

    if (windowRule.showSendPicBtn === false) {
      $("#send-image-btn").parent('a').hide();
    }

    if (windowRule.showEmojiBtn === false) {
      $("#emoji-btn").parent('a').hide();
    }

    if (windowRule.showShakeBtn === false) {
      $("#send-vibration-btn").parent('a').hide();
    }

    if (!Utils.islowerIE9() && windowRule.backgroundStyle === "custom" && windowRule.customBackground) {
      if (window.hasSetBg) return;
      window.hasSetBg = true;

      var url = window.DBKF.configs.COMPANY_IMAGE_CDN + "/" + windowRule.customBackground + "!default";

      $(".chat-history-wrapper").addClass('has-bg');
      // $(".chat-history-wrapper").css('background-image', 'url(' + url +  ')');
      $('head').append('<style>.chat-history-wrapper::before {background-image: url(\'' + url + '\')}</style>');
    }

    if (!Utils.islowerIE9() && windowRule.backgroundStyle === "heart") {
      $("#chat-history").addClass("heart-bg");
    }

    //手机平台特殊商家禁用底部云雀推广链接
    if (isMobile() && window.DBKF.configs.COMPANY_ID && ["c9j7lej2dfdu", "c9mj13plqhh9", "c38r6v0n329o6"].indexOf(window.DBKF.configs.COMPANY_ID) !== -1) {
      $(".yunque-link").click(function (event) {
        event.preventDefault();
      });
    }

    //全平台禁用底部云雀推广链接
    if (window.DBKF.configs.COMPANY_ID && ["caabna227o1v", "ca9oil0sv37b"].indexOf(window.DBKF.configs.COMPANY_ID) !== -1) {
      $(".yunque-link").click(function (event) {
        event.preventDefault();
      });
    }

    $(".chat-box").addClass("ui-updated");
  }

  function layoutRerender() {
    var windowRule = window.DBKF.configs.mwindowrule;
    if (!isMobile() || windowRule.textareaStyle !== "single") return;
    if (windowRule.yqLogoPosition === "bottom") {
      $(".chat-box").addClass("single-bottom");
    }
    if (windowRule.yqLogoPosition === "center") {
      $(".chat-box").addClass("single-center");
    }
    var newHtml = getLayoutHtml(windowRule.yqLogoPosition);
    $(".normal").html(newHtml);
  }

  function getLayoutHtml(position) {
    if (position === "center") {
      return '\n      <div class="center-bar">\n        <div class="pull-left">\n          <a>\n            <i class="iconfont" id="send-image-btn">&#xe66e;</i>\n          </a>\n          <a style="margin-left: 5px;">\n            <i class="iconfont" id="emoji-btn" onclick="triggerEmoji(event)">&#xe79e;</i>\n          </a>\n          <a style="margin-left: 5px;">\n            <i class="iconfont" id="send-vibration-btn">&#xe820;</i>\n          </a>\n          <input type="file" id="image-upload-input" accept="image/*" style="display: none">\n\n        </div>\n        <div class="pull-right yunque-center-logo" style="padding-right: 10px;color: #b7bac2;">\n          <a href="http://yunque360.com" >\n            <i class="icon-gray-bird"></i>\n            ' + langProvider.getText('yunque') + '</a>\n        </div>\n      </div>\n\n      <div class="actions" id="actions-div">\n        <textarea id="input-textarea" rows="1" autocomplete="off" placeholder="' + langProvider.getText('type-here') + '"></textarea>\n\n        <div class="pull-right">\n          <input type="button" id="send-btn" value="' + langProvider.getText('send') + '" class="active">\n        </div>\n      </div>\n\n      ';
    }

    if (position === "bottom") {
      // let width = $(window).width() - 70 - 70;

      // if (window.matchMedia("(min-width: 600px)").matches) {
      //   width = $(window).width() - 140 - 140;
      // }

      return '\n        <div class="actions" id="actions-div">\n            <div class="btn-holders">\n            <a >\n                <i class="iconfont" id="emoji-btn" onclick="triggerEmoji(event)">&#xe79e;</i>\n              </a>\n              <a style="margin-left: 5px;">\n                <i class="iconfont" id="send-image-btn">&#xe66e;</i>\n              </a>\n\n\n              <input type="file" id="image-upload-input" accept="image/*" style="display: none">\n            </div>\n            <div class="text-holder">\n              <textarea id="input-textarea" class="single-bottom-textarea" rows="1" autocomplete="off" placeholder="' + langProvider.getText('type-here') + '"></textarea>\n              <input type="button" id="send-btn" value="' + langProvider.getText('send') + '" class="active">\n            </div>\n\n            <div class="clear-both"></div>\n\n        </div>\n        <div class="box-footer">\n        <div class="contact-info">\n            <a href="http://yunque360.com"  class="yunque-link">\n                <i class="icon-graybird"></i>\n                <span>' + langProvider.getText('made-by-yunque') + '</span>\n            </a>\n        </div>\n    </div>\n        ';
    }
  }

  function renderStandardWindow() {
    if (isMobile()) return;

    var windowStyle = window.DBKF.configs.windowrule.windowStyle;
    if (isInYunqueFrame() && typeof window.DBKF.configs.windowrule.frame_windowStyle !== "undefined") {
      windowStyle = window.DBKF.configs.windowrule.frame_windowStyle;
    }

    if (windowStyle === "standard") {
      window.parent.postMessage("$IS_STANDARD_WINDOW", "*");

      $(".box-body").addClass("standard");
      $(".chat-box").addClass("standard");

      if (window.DBKF.configs.windowrule.companyAd) {
        $("#side-window-logo").attr("src", window.DBKF.configs.COMPANY_IMAGE_CDN + "/" + window.DBKF.configs.windowrule.companyAd + "!default");
      }

      if (window.DBKF.configs.windowrule.companyInfo) {
        $("#side-window-companyInfo").text(window.DBKF.configs.windowrule.companyInfo);
      }

      if (window.DBKF.configs.windowrule.companyNumber) {
        $("#side-window-companyNumber").text(langProvider.getText('mobile-field') + window.DBKF.configs.windowrule.companyNumber);
      }

      if (window.DBKF.configs.windowrule.companyAddress) {
        $("#side-window-companyAddress").text(langProvider.getText('location-field') + window.DBKF.configs.windowrule.companyAddress);
      }
    }
  }

  function isMobile() {
    var isMobile = false;
    (function (a) {
      if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|BDNuomiAppAndroid/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) isMobile = true;
    })(navigator.userAgent || navigator.vendor || window.opera);

    if (!isMobile) {
      if (window.screen && window.screen.width && window.screen.width <= 720) {
        isMobile = true;
      }
    }

    return isMobile;
  }

  function addCss(cssCode) {
    var styleElement = document.createElement("style");
    styleElement.type = "text/css";
    if (styleElement.styleSheet) {
      styleElement.styleSheet.cssText = cssCode;
    } else {
      styleElement.appendChild(document.createTextNode(cssCode));
    }
    document.getElementsByTagName("head")[0].appendChild(styleElement);
  }

  function renderColor() {
    if ($(".chat-box").hasClass("color-rendered")) {
      return;
    }

    var color = window.DBKF.configs.windowrule && window.DBKF.configs.windowrule.windowColor ? window.DBKF.configs.windowrule.windowColor : "#5579ED";
    var mColor = window.DBKF.configs.mwindowrule && window.DBKF.configs.mwindowrule.windowColor ? window.DBKF.configs.mwindowrule.windowColor : "#5579ED";
    color = isMobile() ? mColor : color;

    var sheet = window.document.styleSheets[0];

    addCss('.chat-box .box-header { background-color: ' + color + '; }\n                #send-btn.active { background-color: ' + color + '!important; }\n                #submit-comment-btn { background-color: ' + color + '; }\n                .msg-client .bubble { background-color: ' + color + '; }\n                .msg-client .bubble .arrow { border-left: 6px solid ' + color + '; }\n                #submit-comment-btn { background-color: ' + color + '!important; }\n                #icon-comment-success {color: ' + color + '!important}\n                .extra-info .info-tag { color: ' + color + '; border: 1px solid ' + color + ';}\n        ');

    $(".chat-box").css("visibility", "visible");
    $(".chat-box").addClass('color-rendered');
  }

  function displayCompanyName() {
    $.ajax({
      type: "GET",
      dataType: "json",
      cache: false,
      url: window.DBKF.configs.POLLING_SITE + "/company?id=" + window.DBKF.configs.COMPANY_ID,
      success: function success(data, textStatus) {
        var windowrule = JSON.parse(data.data.windowrule || "[]");
        var mwindowrule = JSON.parse(data.data.mwindowrule || "[]");
        var rule = isMobile() ? mwindowrule : windowrule;
        if (rule.frame_background) {
          var backgroundUrl = window.DBKF.configs.COMPANY_IMAGE_CDN + "/" + rule.frame_background + "!2k";
        }
        window.parent.postMessage("$CMD_FRAME_BACKGROUND=" + backgroundUrl, "*");

        var title = "";
        if (rule && rule.dialogTitle) {
          title = rule.dialogTitle;
        } else {
          title = "欢迎咨询!";
        }
        $(".box-header .connected .company-name").text(title);
        document.title = title;
      }
    });
  }

  function displayAgentFromMessage(data) {
    if (!data.worker) {

      return;
    }

    var worker = data.worker;

    $(".box-header .connected .agent-name").text(worker.nickname);
    window.DBKF.agentName = worker.nickname;
    changeAvatar(data);
    $("#avatar-img").attr('src', window.avatarUrl);
    $(".box-header .connect-info").hide();
    $(".box-header .connected").show();

    window.parent.postMessage("$CMD_AGENT_AVATAR=" + window.avatarUrl, "*");
    window.parent.postMessage("$CMD_AGENT_NAME=" + data.nickname, "*");
  }

  function listenEvent() {
    $("body").on("click", "#send-vibration-btn", function () {
      sendVibration();
    });

    $("body").on("click", "#send-btn", function () {
      $("#input-textarea").blur();
      sendMessage();
    });

    $("body").on("keyup", "#input-textarea", function (event) {
      if (event.which === 13) {
        sendMessage();
      }
      return true;
    });

    $("body").on("paste", "#input-textarea", function (e) {
      var items = e.originalEvent.clipboardData.items;

      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        if (item.type.match(/^image\//)) {
          uploadPastedImage(item.getAsFile());
        }
      }

      return true;
    });

    if (isMobile()) {

      $("body").on("blur", "#input-textarea", function (event) {
        window.setTimeout(function () {
          window.scrollTo(0, 10);
        }, 300);
        window.parent.postMessage("$YUNQUE_SLIGHT_SCROLL_WINDOW", "*");
      });
    }

    $("body").on("keydown", "#input-textarea", throttle(sendPreviewMessage, 2000));

    $("#input-textarea").change();

    $("body").on("click", "#send-image-btn", function () {
      $("#image-upload-input").click();
    });

    $("body").on("change", "#image-upload-input", function () {
      sendImage();
      var control = $("#image-upload-input");
      control.replaceWith(control = control.clone(true));
    });

    $(".chat-history").on("click", ".msg-history", function (e) {
      var id = $(e.target).attr("id");
      Message.addHistoryMsgs(id);
    });

    $("#input-textarea").focus(function () {
      if (Utils.isMobile()) return;
      $(".center-bar").addClass("shadow");
    });

    $("#input-textarea").blur(function () {
      $(".center-bar").removeClass("shadow");
    });

    $("body").on("focus", ".single-bottom-textarea", function () {
      $(".btn-holders").hide();

      // if (Utils.isFixedViewportMobile()) {
      //   $(".single-bottom-textarea").width($(window).width() - 220);

      // } else {
      //   $(".single-bottom-textarea").width($(window).width() - 100);

      // }

      $("#actions-div").addClass('focus');
    });
    $("body").on("blur", ".single-bottom-textarea", function () {
      $(".btn-holders").show();

      // if (window.matchMedia("(min-width: 600px)").matches) {
      //   $(".single-bottom-textarea").width($(window).width() - 200 - 140);

      // } else {
      //   $(".single-bottom-textarea").width($(window).width() - 100 - 70);

      // }
      $("#actions-div").removeClass('focus');
    });
  }

  function sendImage() {
    imageService.sendImage(document.getElementById("image-upload-input").files[0]).then(function (fileName) {
      var cmicrotime = Date.now();
      var data = {
        cmd: "image",
        body: fileName,
        cmicrotime: cmicrotime
      };
      Message.addImageMessage(data);
      ws.send(data);
    });
  }

  function sendVibration() {
    var cmicrotime = Date.now();
    var data = {
      cmd: "shake",
      body: "",
      cmicrotime: cmicrotime
    };
    Sound.playSentMessage();

    $("body").addClass("shake");
    setTimeout(function () {
      $("body").removeClass("shake");
    }, 1000);

    Message.addShakeMessage(data);
    ws.send(data);
  }

  function sendMessage() {
    triggerBaiduStatisticsByMessage();

    var input = document.getElementById("input-textarea");
    if (input.value.trim() === "") return;

    var cmicrotime = Date.now();
    var msg = {
      body: input.value,
      cmicrotime: cmicrotime
    };

    Message.addTempClientMessage(msg);

    ws.send({
      cmd: "user",
      body: renderEmoji(input.value),
      cmicrotime: cmicrotime
    });

    input.value = "";
    Sound.playSentMessage();
    Message.scrollBottom();
  }

  function triggerBaiduStatisticsByMessage() {
    window.parent.postMessage("$YUNQUE_BAIDU_SEND_MESSAGE", "*");
  }

  function sendPreviewMessage() {
    var previewMsgStore = window.previewMsgStore ? window.previewMsgStore : "";

    var input = document.getElementById("input-textarea");
    if (input.value.trim() === "") return;

    if (input.value === previewMsgStore) {
      return;
    } else {
      window.previewMsgStore = input.value;
    }

    var cmicrotime = Date.now();

    ws.send({
      cmd: "typing",
      body: renderEmoji(input.value),
      cmicrotime: cmicrotime
    });
  }

  function renderNewMessages(messages) {
    var insertBefore = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

    for (var messageKey in messages) {
      var message = messages[messageKey];
      renderNewMessage(message, insertBefore);
    }
  }

  function renderNewMessage(message, insertBefore) {
    if (message.cmd === "user") {
      if ($("#client-" + message.cmicrotime).length !== 0) return;

      Message.addClientMessage(message, insertBefore);
    }

    if (message.cmd === "worker") {
      message.agentName = window.DBKF.agentName;
      Sound.playNewMessage();
      Message.addAgentMessage(message, insertBefore);
    }

    if (message.cmd === "autoreply") {
      message.agentName = window.DBKF.agentName;
      Sound.playNewMessage();
      Message.addAgentMessage(message, insertBefore);
    }

    if (message.cmd === "disconnect") {
      // Sound.playNewMessage();
      // Message.addDisconnectMessage(message, insertBefore);
      if (message.body.sender && message.body.sender === "worker") {
        ws.close(langProvider.getText('conversation-finished'));
      }
    }

    if (message.cmd === "shake") {
      if ($("#client-" + message.cmicrotime).length !== 0) return;
      Message.addShakeMessage(message, insertBefore);
    }

    if (message.cmd === "image") {
      if ($("#client-" + message.cmicrotime).length !== 0) return;
      Message.addImageMessage(message, insertBefore);
    }

    if (message.cmd === "block") {
      ws.close();
    }

    if (message.cmd === "force") {
      // displayAgentFromMessage(message.body);
      window.parent.postMessage("$CMD_FORCE", "*");
    }

    // if (message.cmd === "transfer") {
    //   displayAgentFromMessage(message.body);
    // }

    // if (message.cmd === "reassign") {
    //   displayAgentFromMessage(message.body);
    // }

    // if (message.cmd === "doassign") {
    //   displayAgentFromMessage(message.body);
    // }

    if (message.cmd === "invite") {
      // displayAgentFromMessage(message.body);
      window.parent.postMessage("$CMD_INVITE", "*");
    }
  }

  function checkHistory(data, id) {
    var history = data.history;
    if (history === "0" || history === 0 || !history) {
      return;
    }

    Message.addHistoryTip();
  }

  function displayComment() {
    window.parent.postMessage("$NO_WORKER_ONLINE", "*");

    //stupid
    if (window.DBKF.configs.COMPANY_ID === "c9j7lej2dfdu") {
      $("#mobile-input").attr("placeholder", langProvider.getText('mobile-or-wechat'));
    }
    $(".box-header .connect-info").hide();
    $(".box-header .connected").hide();
    $(".chat-box .box-comment").show();
    $(".box-header .comment-info").show();
    $(".chat-box").addClass("offline");
  }

  function throttle(fn, threshhold, scope) {
    threshhold || (threshhold = 250);
    var last, deferTimer;
    return function () {
      var context = scope || this;

      var now = +new Date(),
          args = arguments;
      if (last && now < last + threshhold) {
        // hold on to it
        clearTimeout(deferTimer);
        deferTimer = setTimeout(function () {
          last = now;
          fn.apply(context, args);
        }, threshhold);
      } else {
        last = now;
        fn.apply(context, args);
      }
    };
  }

  function updateSendBtnStatus() {
    var text = $("#input-textarea").val();
    var btn = $("#send-btn");

    if ($.trim(text) === "") {
      btn.removeClass("active");
    } else {
      btn.addClass("active");
    }
  }

  function isInYunqueFrame() {
    return !!window.IS_IN_YUNQUE_FRAME;
  }

  function updateLogoPosition(rule) {
    var yqLogoPosition = rule.yqLogoPosition;
    if (isInYunqueFrame() && !isMobile() && typeof rule.frame_yqLogoPosition !== "undefined") {
      yqLogoPosition = rule.frame_yqLogoPosition;
    }
    if (typeof yqLogoPosition === 'undefined') {
      if (isMobile()) {
        $(".chat-box").addClass("yq-logo-bottom");
      } else {
        $(".chat-box").addClass("yq-logo-bottom");
      }
    } else {
      if (yqLogoPosition === "center") {
        $(".chat-box").addClass("yq-logo-center");
      } else {
        $(".chat-box").addClass("yq-logo-bottom");
      }
    }
  }

  function replaceLogoLink() {
    var link = 'https://yunque360.com?utm_source=logo&utm_medium=logo&utm_campaign=logo&utm_content=' + window.DBKF.configs.COMPANY_ID;
    $('a[href="http://yunque360.com"]').attr('href', link);
  }

  function uploadPastedImage(img) {

    var cmicrotime = Date.now();

    var fileReader = new FileReader();
    fileReader.onload = function (fileLoadedEvent) {
      var srcData = fileLoadedEvent.target.result; // <--- data: base64
      Message.addTempClientImageMessage({
        cmd: "image",
        body: srcData,
        cmicrotime: cmicrotime
      });
    };
    fileReader.readAsDataURL(img);

    imageService.sendImage(img).then(function (fileName) {
      var data = {
        cmd: "image",
        body: fileName,
        cmicrotime: cmicrotime
      };
      // Message.addImageMessage(data);
      ws.send(data);
    });
  }
}
'use strict';

//stupid ie8
listenMessage();

$(function () {

  //audio cannot be played on safari
  // Sound.audioWarmUp();

  //
  if (isMobile()) {
    $('body').addClass('is-mobile');
  }

  listenEvent();

  if (isInYunqueFrame()) {
    window.addEventListener('message', function (event) {
      var message = event.data;
      if (typeof message !== 'string') return;
      if (message.indexOf('$IS_IN_YUNQUE_FRAME') !== -1) {
        window.IS_IN_YUNQUE_FRAME = true;
      }
    });
    window.parent.postMessage('$DOCUMENT_READY', '*');
  }

  if (isInIframe()) {
    // listenMessage();
    if (isInYunqueFrame()) return;
    window.parent.postMessage('$DOCUMENT_READY', '*');
  } else {

    if (!window.DBKF.configs.COMPANY_ID) {
      alert(langProvider.getText('invalid-window'));
      $("body").html('');
      return;
    }
    hideMinimize();

    chat();
  }
});

function listenEvent() {

  Sound.init();

  $("#play-sound-icon, #not-play-sound-icon").click(function () {
    Sound.toggleSound();
  });

  $("#minimize-btn").click(function () {
    window.parent.postMessage('$MINIMIZE', '*');
  });

  $("#back-btn").click(function () {
    window.parent.postMessage('$GO_BACK', '*');
  });

  $("#submit-comment-btn").click(function () {
    CommentClass.submit();
  });

  $("body").click(function () {
    if ($("#emojiHolder").css('display') !== 'none') {
      $("#emojiHolder").hide();
    }
  });

  window.onfocus = function () {
    window.parent.postMessage('$WINDOW_FOCUSED', '*');
  };
}

function chooseEmoji(id) {
  var ele = document.getElementById("input-textarea");
  ele.value += id;

  triggerEmoji();
}

function triggerEmoji(event) {
  if (event || window.event) {
    event = event || window.event; // cross-browser event

    if (event.stopPropagation) {
      // W3C standard variant
      event.stopPropagation();
    } else {
      // IE variant
      event.cancelBubble = true;
    }
  }

  $("#emojiHolder").css("bottom", $(".chat-box").outerHeight() - $(".chat-history").outerHeight() - 40 - 30);
  $("#emojiHolder").toggle();
  return false;
}

function renderEmoji(text) {
  return text.replace(/\$.+?\$/g, function (match) {
    var keyword = match.replace(/\$/g, '');
    return '<img src="//' + window.location.host + '/images/' + keyword + '.png" class="emoji-img">';
  });
}

function listenMessage() {
  // window.parent.postMessage('$DOCUMENT_READY', '*');

  window.addEventListener('message', function (event) {
    var message = event.data;

    if (message.indexOf && message.indexOf('$COMPANY_DATA') !== -1) {
      var data = JSON.parse(message.split('COMPANY_DATA=')[1]);
      window.DBKF.configs.COMPANY_ID = data.company_id;
      window.DBKF.configs.referrer = data.referrer;
      window.DBKF.configs.pageTitle = data.title;
      window.DBKF.configs.pv = data.pv;

      getCompanyInfo(window.DBKF.configs.COMPANY_ID);
      //kick off
      chat();
    }
  }, false);
}

function isMobile() {
  var isMobile = false;
  (function (a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|BDNuomiAppAndroid/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) isMobile = true;
  })(navigator.userAgent || navigator.vendor || window.opera);

  if (!isMobile) {
    if (window.screen && window.screen.width && window.screen.width <= 720) {
      isMobile = true;
    }
  }

  return isMobile;
}

function getCompanyInfo(company_id) {
  $.ajax({
    type: "GET",
    dataType: "json",
    cache: false,
    url: window.DBKF.configs.POLLING_SITE + '/company?id=' + company_id,
    success: function success(data, textStatus) {
      window.DBKF.COMPANY_INFO = JSON.stringify(data.data);
      window.DBKF.configs.windowrule = JSON.parse(data.data.windowrule || '[]');
      window.DBKF.configs.mwindowrule = JSON.parse(data.data.mwindowrule || '[]');
      window.DBKF.configs.uirule = JSON.parse(data.data.uirule || "[]");
    }
  });
}

function isInIframe() {
  try {
    if (window.location == window.parent.location) {
      return false;
    }

    if (window.parent.location.hostname.indexOf('uclient') !== -1) {
      return false;
    }
  } catch (error) {
    return true;
  }

  return false;
}

function isInYunqueFrame() {
  try {
    if (window.location == window.parent.location) {
      return false;
    }

    if (window.parent.location.hostname.indexOf('uclient') !== -1 || window.parent.location.href.indexOf('localhost:9000') !== -1) {
      return true;
    }
  } catch (error) {
    return true;
  }

  return false;
}

function hideMinimize() {
  $("#minimize-btn").hide();

  if (!window.DBKF.configs.hide_back_btn) {
    $("#back-btn").show();
  }
}