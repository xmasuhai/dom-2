// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"jquery.js":[function(require,module,exports) {
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

window.jQuery = function (selectorOrArray) {
  // this.console.log('我是jQuery')
  // 核心代码 接受一个选择器；
  // 根据选择器得到 一些元素；
  // 返回一个对象 这个对象 上有个方法 可以操作 这些元素

  /* 重载判断
   ** selectorOrArray不仅接受选择器 还有数组
   */
  var elements; // 作用域的提升  用const声明的的时候必须直接赋值且不能再改

  if (typeof selectorOrArray === 'string') {
    // const elements = document.querySelectorAll(selectorOrArray)
    elements = document.querySelectorAll(selectorOrArray);
  } else if (selectorOrArray instanceof Array) {
    // const elements = selectorOrArray // 作用域的提升
    elements = selectorOrArray;
  } // 用const防止引用被修改
  // return elements // 不返回此对象
  // 而是返回一个 API 可以操作 elements

  /*
  const api_test = {
          //ES6
          doSth() {
              console.log(elements) // 闭包：函数访问外部 变量
          },
          // ES5
          "doOther": function () {
              console.log(elements)
          }
      }
  */

  /*
  const api = {
      addClass(className) {
          // 遍历所有刚才获取的elements 元素，添加 .className 样式
          for (let i = 0; i < elements.length; i++) {
              elements[i].classList.add(className)
          }
          return this // api
      }
  }
      return api // 这里的 this 是 window // window.jQuery
      // api 的名字其实没有必要 直接返回对象
   */
  // api 的名字没有必要 直接返回对象本身
  // api 对象通常可以在外部的环境中 创建
  // JQ的核心思想
  // 提供一个函数 这个函数接收一个CSS选择器
  // 通过选择器，获取到一些元素 但并不返回元素
  // 而是返回一个对象 这个对象里包含一些方法（函数）
  // 这些方法（函数）去操作获取到的元素
  // 即用闭包维持 函数外的变量 防止被回收机制删除
  // 创建的JQ对象 api 作为返回值 从前面传递到后面 来链式调用
  // 调用后 才知道 this 的具体指向
  // 直接创建匿名的对象 进行链式操作 声明一个对象紧接再调用它 且只用到一次 省略变量名
  // 省略中间过程 留下最简练代码


  return {
    find: function find(selector) {
      var arr = [];

      for (var i = 0; i < elements.length; i++) {
        var elements2 = Array.from(elements[i].querySelectorAll(selector));
        arr = arr.concat(elements2);
      } // elements = arr // 当在改变elements的时候，会影响之前所有保留api对象的引用
      // return this // 返回的是数组 无法进行链式调用
      // return newApi // 不能用原来的api对象 需要更新 api引用
      //
      // const newApi = jQuery(arr) //不能用原来的api对象，需要用jQuery构造一个新的api
      // return newApi


      arr.oldApi = this; // this是旧的api // oldApi是否只放到数组上 而未放到api上

      return jQuery(arr);
    },
    each: function each(fn) {
      // 遍历当前所有元素 即forEach()方法
      for (var i = 0; i < elements.length; i++) {
        fn.call(null, elements[i], i);
      }

      return this; // this就是这个被省略掉的、匿名的api
    },
    print: function print() {
      console.log(elements); // elements就是对应的元素们
    },
    parent: function parent() {
      var array = [];
      /* this 就是当前这个被省略掉的api */

      this.each(function (node) {
        /* 不重复同样的节点 */
        // if (array.indexOf(node.parentNode) >= 0) // 第0个 或 第一个 有就不push
        if (array.indexOf(node.parentNode) === -1) {
          // 第0个 或 第一个 有就不push
          array.push(node.parentNode); // 没有才push
        }
      });
      return jQuery(array);
    },
    children: function children() {
      var array = [];
      /* this 就是当前这个被省略掉的api */

      this.each(function (node) {
        // 遍历 每次 对于每个元素 获取子节点 把不同的放入数组
        // array.push(node.children) // 没有把数组摊平 有不同结构
        array.push.apply(array, _toConsumableArray(node.children)); // 展开操作符... 拆开所有元素 并且合并为一个数组
        // 等价于 array.push(node.children[0], node.children[1],...[2]...)
      });
      return jQuery(array);
    },
    addClass: function addClass(className) {
      /* 遍历所有刚才获取的elements 元素，添加 .className 样式 */
      for (var i = 0; i < elements.length; i++) {
        elements[i].classList.add(className);
      }

      return this;
    },
    oldApi: selectorOrArray.oldApi,
    // 将oldApi属性加到selectorOrArray上
    end: function end() {
      return this.oldApi; // this是新的api2
    }
  };
};

window.jQuery2 = function (selectorOrArray) {
  var elements;

  if (typeof selectorOrArray === 'string') {
    elements = document.querySelectorAll(selectorOrArray);
  } else if (selectorOrArray instanceof Array) {
    elements = selectorOrArray;
  }

  return {
    addClass: function addClass(className) {
      this.each(function (node) {
        node.classList.add(className);
      });
      return this;
    },
    find: function find(selector) {
      var arr = [];
      this.each(function (node) {
        var elements2 = Array.from(node.querySelectorAll(selector));
        arr = arr.concat(elements2);
      });
      arr.oldApi = this; // this是旧的api // oldApi是否只放到数组上 而未放到api上

      return jQuery(arr);
    },
    each: function each(fn) {
      for (var i = 0; i < elements.length; i++) {
        fn.call(null, elements[i], i);
      }

      return this;
    }
  };
};

window.jQuery3 = function (selectorOrArray) {
  var elements;

  if (typeof selectorOrArray === 'string') {
    elements = document.querySelectorAll(selectorOrArray);
  } else if (selectorOrArray instanceof Array) {
    elements = selectorOrArray;
  }

  return {
    addClass: function addClass(className) {
      this.each(function (n) {
        return n.classList.add(className);
      });
    },
    find: function find(selector) {
      var array = [];
      this.each(function (n) {
        array.push.apply(array, _toConsumableArray(n.querySelectorAll(selector)));
      });
      return jQuery(array);
    },
    each: function each(fn) {
      for (var i = 0; i < elements.length; i++) {
        fn.call(null, elements[i], i);
      }
    }
  };
};

window.$ = window.jQuery3;
$('#test').find('.child').addClass('red'); // 请确保这句话成功执行
},{}],"C:/Users/Xmasu/AppData/Roaming/npm/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "7661" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/Xmasu/AppData/Roaming/npm/node_modules/parcel/src/builtins/hmr-runtime.js","jquery.js"], null)
//# sourceMappingURL=/jquery.7a6e0748.js.map