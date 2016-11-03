/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _domEvents = __webpack_require__(1);
	
	var _domEvents2 = _interopRequireDefault(_domEvents);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var events = new _domEvents2.default();
	var testArea = document.getElementsByClassName('test-area')[0];
	var clickbleArea = document.getElementsByClassName('clickble-area')[0];
	var bindAllEvents = function bindAllEvents(element, callback) {
	  window.element = element;
	  var key = void 0;
	
	  for (key in element) {
	    if (key.indexOf('on') === 0) {
	      element.addEventListener(key.slice(2), callback);
	    }
	  }
	};
	var createPoint = function createPoint(x, y, className) {
	  var point = document.createElement('div');
	  point.classList.add('point');
	  if (className) {
	    point.classList.add(className);
	  }
	  point.style.left = x + 'px';
	  point.style.top = y + 'px';
	  return point;
	};
	var cleanPoints = function cleanPoints() {
	  testArea.innerHTML = 'Test area';
	  clickbleArea.innerHTML = 'Actions area';
	};
	
	bindAllEvents(testArea, function (evt) {
	  var point = createPoint(evt.x, evt.y, 'evented');
	  point.innerHTML = evt.type + ': [' + evt.x + ', ' + evt.y + ']';
	  testArea.appendChild(point);
	});
	
	document.getElementsByTagName('button')[0].addEventListener('click', function () {
	  var form = document.querySelector('.controls');
	  var x = parseFloat(form.x.value);
	  var y = parseFloat(form.y.value);
	  var opts = {
	    clientX: x,
	    clientY: y,
	    screenX: x,
	    screenY: y
	  };
	
	  events.exec(cleanPoints).exec(function () {
	    testArea.appendChild(createPoint(x, y));
	  }).click(testArea, opts).wait(100).done(function () {});
	});
	
	clickbleArea.addEventListener('click', function (evt) {
	  var border = 5;
	  var x = evt.pageX - clickbleArea.offsetLeft - border;
	  var y = evt.pageY - clickbleArea.offsetTop - border;
	  var opts = {
	    clientX: x,
	    clientY: y,
	    screenX: x,
	    screenY: y
	  };
	
	  events.exec(cleanPoints).exec(function () {
	    clickbleArea.appendChild(createPoint(x, y));
	  }).click(testArea, opts).wait(100).done(function () {});
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _events2 = __webpack_require__(2);
	
	var _events3 = _interopRequireDefault(_events2);
	
	var _utils = __webpack_require__(4);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var emptyFn = function emptyFn() {};
	
	var DomEvents = function () {
	  function DomEvents(options) {
	    _classCallCheck(this, DomEvents);
	
	    this._events = _events3.default;
	    this._queue = [];
	    // TODO: Sync mode
	    this._syncMode = (options || {}).syncMode || false;
	
	    for (var eventName in _events3.default) {
	      if ({}.hasOwnProperty.call(_events3.default, eventName)) {
	        this._registerEvent(eventName);
	      }
	    }
	  }
	
	  _createClass(DomEvents, [{
	    key: '_registerEvent',
	    value: function _registerEvent(eventName) {
	      var _this = this;
	
	      this[eventName] = function () {
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	          args[_key] = arguments[_key];
	        }
	
	        _this._queue.push(function (cont) {
	          var _events;
	
	          var node = args[0],
	              params = args.slice(1);
	
	          (_events = _this._events)[eventName].apply(_events, [true === _utils2.default.isFn(node) ? node() : node].concat(_toConsumableArray(params)));
	          cont();
	        });
	
	        return _this;
	      };
	    }
	  }, {
	    key: '_run',
	    value: function _run() {
	      var _this2 = this;
	
	      var fn = this._queue.shift();
	
	      if ('undefined' !== typeof fn) {
	        fn(function (cont) {
	          return _this2._run(cont);
	        });
	      }
	    }
	  }, {
	    key: 'wait',
	    value: function wait(delay) {
	      this._queue.push(function (cont) {
	        return setTimeout(cont, delay);
	      });
	      return this;
	    }
	  }, {
	    key: 'exec',
	    value: function exec(callback) {
	      this._queue.push(function (cont) {
	        callback();
	        cont();
	      });
	
	      return this;
	    }
	  }, {
	    key: 'async',
	    value: function async(callback) {
	      this._queue.push(function (cont) {
	        return callback(cont);
	      });
	      return this;
	    }
	  }, {
	    key: 'done',
	    value: function done(callback) {
	      this.exec(callback || emptyFn);
	      this._run();
	
	      return this;
	    }
	  }]);
	
	  return DomEvents;
	}();
	
	exports.default = DomEvents;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _happen = __webpack_require__(3);
	
	var _happen2 = _interopRequireDefault(_happen);
	
	var _utils = __webpack_require__(4);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var X = 0;
	var Y = 0;
	
	_happen2.default.at = function (type, x, y, props) {
	  var which = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
	
	  var el = document.elementFromPoint(x, y);
	
	  _happen2.default.once(el, _utils2.default.extend({
	    type: type,
	    clientX: x,
	    clientY: y,
	    screenX: x,
	    screenY: y,
	    which: which,
	    button: 0
	  }, props || {}));
	};
	
	_happen2.default.drag = function (from, to, then) {
	  var step = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 5;
	
	  var fromX = from[X];
	  var fromY = from[Y];
	  var toX = to[X];
	  var toY = to[Y];
	  var dirX = fromX < toX ? step : -step;
	  var dirY = fromY < toY ? step : -step;
	  var moveDone = function moveDone() {
	    _happen2.default.at('mouseup', toX, toY);
	    _happen2.default.mouseClickAt(toX + 1, toY + 1);
	    if (then) {
	      then();
	    }
	  };
	  var move = function move() {
	    var done = true;
	
	    if (step < Math.abs(fromX - toX)) {
	      fromX += dirX;
	      done = false;
	    }
	
	    if (step < Math.abs(fromY - toY)) {
	      fromY += dirY;
	      done = false;
	    }
	
	    if (false === done) {
	      _happen2.default.at('mousemove', fromX, fromY);
	      window.setTimeout(move, 0);
	    } else {
	      moveDone();
	    }
	  };
	
	  _happen2.default.at('mousemove', fromX, fromY);
	  _happen2.default.at('mousedown', fromX, fromY);
	  move();
	};
	
	_happen2.default.drawingClick = function (x, y) {
	  undefined.at('mousedown', x, y);
	  undefined.at('mouseup', x, y);
	};
	
	_happen2.default.mouseClickAt = function (x, y, props) {
	  _happen2.default.at('mousemove', x, y, props);
	  _happen2.default.at('click', x, y, props);
	  _happen2.default.at('mousedown', x, y, props);
	  _happen2.default.at('mouseup', x, y, props);
	};
	
	_happen2.default.contextmenuAt = function (x, y, props) {
	  _happen2.default.at('mousemove', x, y, props);
	  _happen2.default.at('contextmenu', x, y, props, 3);
	  _happen2.default.at('mousedown', x, y, props);
	  _happen2.default.at('mouseup', x, y, props);
	};
	
	exports.default = _happen2.default;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* global module jQuery */
	!(function() {
	    var h = {},
	        events = {
	            mouse: ['click', 'mousedown', 'mouseup', 'mousemove',
	                'mouseover', 'mouseout'],
	            key: ['keydown', 'keyup', 'keypress'],
	            touch:['touchstart', 'touchmove', 'touchend']
	        },
	        s, i;
	
	    // Make inheritance bearable: clone one level of properties
	    function extend(child, parent) {
	        for (var property in parent) {
	            if (typeof child[property] == 'undefined') {
	                child[property] = parent[property];
	            }
	        }
	        return child;
	    }
	
	    // IE<9 doesn't support indexOf
	    function has(x, y) {
	        for (var i = 0; i < x.length; i++) if (x[i] == y) return true;
	        return false;
	    }
	
	    h.makeEvent = function(o) {
	        var evt;
	        if (has(events.key, o.type)) {
	            if (typeof Event === 'function') {
	                evt = new Event(o.type);
	                evt.keyCode = o.keyCode || 0;
	                evt.charCode = o.charCode || 0;
	                evt.shiftKey = o.shiftKey || false;
	                evt.metaKey = o.metaKey || false;
	                evt.ctrlKey = o.ctrlKey || false;
	                evt.altKey = o.altKey || false;
	                evt.relatedTarget = o.relatedTarget;
	            } else {
	                evt = document.createEvent('KeyboardEvent');
	                // https://developer.mozilla.org/en/DOM/event.initKeyEvent
	                // https://developer.mozilla.org/en/DOM/KeyboardEvent
	                evt[(evt.initKeyEvent) ? 'initKeyEvent'
	                    : 'initKeyboardEvent'](
	                    o.type, //  in DOMString typeArg,
	                    true,   //  in boolean canBubbleArg,
	                    true,   //  in boolean cancelableArg,
	                    null,   //  in nsIDOMAbstractView viewArg,  Specifies UIEvent.view. This value may be null.
	                    o.ctrlKey || false,  //  in boolean ctrlKeyArg,
	                    o.altKey || false,  //  in boolean altKeyArg,
	                    o.shiftKey || false,  //  in boolean shiftKeyArg,
	                    o.metaKey || false,  //  in boolean metaKeyArg,
	                    o.keyCode || 0,     //  in unsigned long keyCodeArg,
	                    o.charCode || 0       //  in unsigned long charCodeArg);
	                );
	
	                // Workaround for https://bugs.webkit.org/show_bug.cgi?id=16735
	                if (evt.ctrlKey != (o.ctrlKey || 0) ||
	                  evt.altKey != (o.altKey || 0) ||
	                  evt.shiftKey != (o.shiftKey || 0) ||
	                  evt.metaKey != (o.metaKey || 0) ||
	                  evt.keyCode != (o.keyCode || 0) ||
	                  evt.charCode != (o.charCode || 0)) {
	                    evt = document.createEvent('Event');
	                    evt.initEvent(o.type, true, true);
	                    evt.ctrlKey  = o.ctrlKey || false;
	                    evt.altKey   = o.altKey || false;
	                    evt.shiftKey = o.shiftKey || false;
	                    evt.metaKey  = o.metaKey || false;
	                    evt.keyCode  = o.keyCode || 0;
	                    evt.charCode = o.charCode || 0;
	                }
	            }
	        } else {
	            if (typeof document.createEvent === 'undefined' &&
	                typeof document.createEventObject !== 'undefined') {
	                evt = document.createEventObject();
	                extend(evt, o);
	            } else if (typeof document.createEvent !== 'undefined') {
	                if (has(events.touch, o.type)) {
	                    evt = document.createEvent('UIEvent');
	                    evt.initUIEvent(o.type, true, true, window, o.detail || 1);
	                    extend(evt, o);
	                } else {
	                    // both MouseEvent and MouseEvents work in Chrome
	                    evt = document.createEvent('MouseEvents');
	                    // https://developer.mozilla.org/en/DOM/event.initMouseEvent
	                    evt.initMouseEvent(o.type,
	                        true, // canBubble
	                        true, // cancelable
	                        window, // 'AbstractView'
	                        o.detail || 0, // click count or mousewheel detail
	                        o.screenX || 0, // screenX
	                        o.screenY || 0, // screenY
	                        o.clientX || 0, // clientX
	                        o.clientY || 0, // clientY
	                        o.ctrlKey || 0, // ctrl
	                        o.altKey || false, // alt
	                        o.shiftKey || false, // shift
	                        o.metaKey || false, // meta
	                        o.button || false, // mouse button
	                        o.relatedTarget // relatedTarget
	                    );
	                }
	            }
	        }
	        return evt;
	    };
	
	    h.dispatchEvent = function(x, evt) {
	        // not ie before 9
	        if (typeof x.dispatchEvent !== 'undefined') {
	            x.dispatchEvent(evt);
	        } else if (typeof x.fireEvent !== 'undefined') {
	            x.fireEvent('on' + evt.type, evt);
	        }
	    };
	
	    h.once = function(x, o) {
	        h.dispatchEvent(x, h.makeEvent(o || {}));
	    };
	
	    for (var type in events) {
	        if (!events.hasOwnProperty(type)) continue;
	        var shortcuts = events[type];
	        for (i = 0; i < shortcuts.length; i++) {
	            s = shortcuts[i];
	            h[s] = (function(s) {
	                return function(x, o) {
	                    h.once(x, extend(o || {}, { type: s }));
	                };
	            })(s);
	        }
	    }
	
	    h.dblclick = function(x, o) {
	        h.once(x, extend(o || {}, { type: 'dblclick', detail: 2 }));
	    };
	
	    if (typeof window !== 'undefined') window.happen = h;
	    if (true) module.exports = h;
	
	    // Provide jQuery plugin
	    if (typeof jQuery !== 'undefined' && jQuery.fn) {
	        jQuery.fn.happen = function(o) {
	            if (typeof o === 'string') o = { type: o };
	            for (var i = 0; i < this.length; i++) {
	                h.once(this[i], o);
	            }
	            return this;
	        };
	    }
	})(this);


/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var _arguments = arguments;
	exports.default = {
	  isFn: function isFn(obj) {
	    return obj && 'function' === typeof obj;
	  },
	  extend: function extend(dest) {
	    var extended = dest;
	    var i = void 0;
	    var j = void 0;
	    var len = void 0;
	    var src = void 0;
	
	    for (j = 1, len = _arguments.length; j < len; j++) {
	      src = _arguments[j];
	      for (i in src) {
	        if ({}.hasOwnProperty.call(src, i)) {
	          extended[i] = src[i];
	        }
	      }
	    }
	    return extended;
	  }
	};

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map