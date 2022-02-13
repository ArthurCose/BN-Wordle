// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
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

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
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
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"7nZVA":[function(require,module,exports) {
"use strict";
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "890e741a975ef6c8";
function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F() {
            };
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = it.call(o);
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it.return != null) it.return();
            } finally{
                if (didErr) throw err;
            }
        }
    };
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function accept(fn) {
            this._acceptCallbacks.push(fn || function() {
            });
        },
        dispose: function dispose(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? 'wss' : 'ws';
    var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/'); // $FlowFixMe
    ws.onmessage = function(event) {
        checkedAssets = {
        };
        acceptedAssets = {
        };
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            var assets = data.assets.filter(function(asset) {
                return asset.envHash === HMR_ENV_HASH;
            }); // Handle HMR Update
            var handled = assets.every(function(asset) {
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                assets.forEach(function(asset) {
                    hmrApply(module.bundle.root, asset);
                });
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else window.location.reload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            var _iterator = _createForOfIteratorHelper(data.diagnostics.ansi), _step;
            try {
                for(_iterator.s(); !(_step = _iterator.n()).done;){
                    var ansiDiagnostic = _step.value;
                    var stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                    console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
                }
            } catch (err) {
                _iterator.e(err);
            } finally{
                _iterator.f();
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log('[parcel] ✨ Error resolved');
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    var errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    var _iterator2 = _createForOfIteratorHelper(diagnostics), _step2;
    try {
        for(_iterator2.s(); !(_step2 = _iterator2.n()).done;){
            var diagnostic = _step2.value;
            var stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
            errorHTML += "\n      <div>\n        <div style=\"font-size: 18px; font-weight: bold; margin-top: 20px;\">\n          \uD83D\uDEA8 ".concat(diagnostic.message, "\n        </div>\n        <pre>").concat(stack, "</pre>\n        <div>\n          ").concat(diagnostic.hints.map(function(hint) {
                return '<div>💡 ' + hint + '</div>';
            }).join(''), "\n        </div>\n        ").concat(diagnostic.documentation ? "<div>\uD83D\uDCDD <a style=\"color: violet\" href=\"".concat(diagnostic.documentation, "\" target=\"_blank\">Learn more</a></div>") : '', "\n      </div>\n    ");
        }
    } catch (err) {
        _iterator2.e(err);
    } finally{
        _iterator2.f();
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        var deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                var oldDeps = modules[asset.id][1];
                for(var dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    var id = oldDeps[dep];
                    var parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            var fn = new Function('require', 'module', 'exports', asset.output);
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id1) {
    var modules = bundle.modules;
    if (!modules) return;
    if (modules[id1]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        var deps = modules[id1][1];
        var orphans = [];
        for(var dep in deps){
            var parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id1];
        delete bundle.cache[id1]; // Now delete the orphans.
        orphans.forEach(function(id) {
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id1);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    var parents = getParents(module.bundle.root, id);
    var accepted = false;
    while(parents.length > 0){
        var v = parents.shift();
        var a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            var p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push.apply(parents, _toConsumableArray(p));
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {
    };
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"8lqZg":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _game = require("./ui/game");
var _gameDefault = parcelHelpers.interopDefault(_game);
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const game = new _gameDefault.default();
let previousTime;
function gameLoop(time) {
    if (previousTime == undefined) {
        previousTime = time;
        requestAnimationFrame(gameLoop);
        return;
    }
    const delta = (time - previousTime) / 1000;
    previousTime = time;
    game.update(delta);
    game.render(canvas, ctx);
    requestAnimationFrame(gameLoop);
}
window.addEventListener("load", function() {
    gameLoop(0);
});

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","./ui/game":"aPgjf"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"aPgjf":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _grid = require("./grid");
var _gridDefault = parcelHelpers.interopDefault(_grid);
var _inventory = require("./inventory");
var _inventoryDefault = parcelHelpers.interopDefault(_inventory);
var _runLine = require("./run_line");
var _runLineDefault = parcelHelpers.interopDefault(_runLine);
var _sharedConstants = require("./shared_constants");
var _inputManager = require("../input_manager");
var _random = require("../random");
var _generation = require("../generation");
var _words = require("../words");
var _wordsDefault = parcelHelpers.interopDefault(_words);
var _arrayShuffle = require("array-shuffle");
var _arrayShuffleDefault = parcelHelpers.interopDefault(_arrayShuffle);
class Game {
    #inventory = new _inventoryDefault.default();
    #grid = new _gridDefault.default();
    #inputManager = new _inputManager.InputManager();
    #runLine = new _runLineDefault.default(this.#grid);
    #focusedUI = this.#inventory;
    constructor(){
        const word = _random.randomItem(_wordsDefault.default);
        this.#runLine.setWord(word);
        this.#inventory.setShapes(_arrayShuffleDefault.default(_generation.generateWordShapes(word)));
        this.focusOn(this.#inventory);
        this.#inventory.onRun = ()=>{
            this.focusOn(this.#runLine);
        };
        this.#inventory.onSelection = (shape)=>{
            this.#grid.cursorPos = {
                x: Math.floor(_sharedConstants.GRID_BLOCK_SIDE_LEN / 2),
                y: Math.floor(_sharedConstants.GRID_BLOCK_SIDE_LEN / 2)
            };
            this.#grid.selectShape(shape);
            this.focusOn(this.#grid);
        };
        this.#inventory.onExit = (index)=>{
            this.#grid.cursorPos = {
                x: _sharedConstants.GRID_BLOCK_SIDE_LEN - 1,
                y: index
            };
            this.focusOn(this.#grid);
        };
        this.#grid.onReturnShape = (shape)=>{
            this.#inventory.addShape(shape);
        };
        this.#grid.onExit = (cursorPos)=>{
            this.#inventory.cursorIndex = cursorPos.y;
            this.focusOn(this.#inventory);
        };
        this.#runLine.onExit = ()=>{
            this.focusOn(this.#inventory);
        };
    }
    focusOn(ui) {
        this.#focusedUI?.removeFocus();
        this.#focusedUI = ui;
        this.#inputManager.flush();
        ui.giveFocus();
        this.update(0);
    }
    update(delta) {
        this.#focusedUI.update(this.#inputManager, delta);
        this.#inputManager.flush();
    }
    render(canvas, ctx) {
        ctx.fillStyle = "orange";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        this.#grid.render(ctx);
        this.#inventory.render(ctx);
        this.#runLine.render(ctx);
    }
}
exports.default = Game;

},{"./grid":"9trj0","./inventory":"eQQVx","./shared_constants":"ldZyS","../input_manager":"Oqiei","../random":"1fE0k","../generation":"g07oX","../words":"gEDpQ","array-shuffle":"jrjcr","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","./run_line":"6xrmZ"}],"9trj0":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _inputManager = require("../input_manager");
var _sharedConstants = require("./shared_constants");
const GRID_BORDER_SIZE = 6;
class Grid {
    #hasFocus = false;
    #focusedTime = 0;
    #selectedShape = null;
    #shapes = [];
    cursorPos = {
        x: 2,
        y: 2
    };
    onExit = ()=>{
    };
    onReturnShape = (shape)=>{
    };
    setShapes(shapes) {
        this.#shapes = shapes;
    }
    selectShape(shape) {
        this.#selectedShape = shape;
    }
     #hasSameColorNeighbor(shape, x, y) {
        const hasSameColor = (x1, y1)=>{
            const s = this.getShape(x1, y1);
            return s && s != shape && s.color == shape.color;
        };
        return hasSameColor(x - 1, y) || hasSameColor(x + 1, y) || hasSameColor(x, y - 1) || hasSameColor(x, y + 1);
    }
    isValid() {
        for(let y2 = 0; y2 < _sharedConstants.GRID_BLOCK_SIDE_LEN; y2++)for(let x2 = 0; x2 < _sharedConstants.GRID_BLOCK_SIDE_LEN; x2++){
            const shape1 = this.getShape(x2, y2);
            if (!shape1) continue;
            if (this.#hasSameColorNeighbor(shape1, x2, y2)) return false;
        }
        return true;
    }
     #grabShape() {
        const shape = this.getShape(this.cursorPos.x, this.cursorPos.y);
        if (!shape) return null;
        const index = this.#shapes.indexOf(shape);
        this.#shapes.splice(index, 1);
        this.#selectedShape = shape;
        this.cursorPos.x = shape.x;
        this.cursorPos.y = shape.y;
        return shape;
    }
     #keepSelectedShapeInBounds() {
        if (!this.#selectedShape) return;
        let moved = false;
        do {
            for(let x = 0; x < _sharedConstants.GRID_BLOCK_SIDE_LEN; x++){
                if (this.#selectedShape.existsAt(x, -1)) this.#selectedShape.y += 1;
                if (this.#selectedShape.existsAt(x, _sharedConstants.GRID_BLOCK_SIDE_LEN)) this.#selectedShape.y -= 1;
            }
            for(let y = 0; y < _sharedConstants.GRID_BLOCK_SIDE_LEN; y++){
                if (this.#selectedShape.existsAt(-1, y)) this.#selectedShape.x += 1;
                if (this.#selectedShape.existsAt(_sharedConstants.GRID_BLOCK_SIDE_LEN, y)) this.#selectedShape.x -= 1;
            }
        }while (moved)
        this.cursorPos.x = this.#selectedShape.x;
        this.cursorPos.y = this.#selectedShape.y;
    }
     #placeSelectedShape() {
        if (!this.#selectedShape) return false;
        for(let x = 0; x < _sharedConstants.GRID_BLOCK_SIDE_LEN; x++)for(let y = 0; y < _sharedConstants.GRID_BLOCK_SIDE_LEN; y++){
            if (!this.#selectedShape.existsAt(x, y)) continue;
            const shape = this.getShape(x, y);
            if (shape) // todo: play sfx on fail?
            return false;
        }
        this.#shapes.push(this.#selectedShape);
        this.#selectedShape = null;
        return true;
    }
    getShape(x3, y3) {
        return this.#shapes.find((shape2)=>shape2.existsAt(x3, y3)
        );
    }
    giveFocus() {
        this.#hasFocus = true;
        this.#focusedTime = 0;
    }
    removeFocus() {
        this.#hasFocus = false;
    }
    update(inputManager, delta) {
        this.#focusedTime += delta;
        const left = inputManager.justPressed(_inputManager.InputEnum.LEFT) || inputManager.justRepeated(_inputManager.InputEnum.LEFT);
        const right = inputManager.justPressed(_inputManager.InputEnum.RIGHT) || inputManager.justRepeated(_inputManager.InputEnum.RIGHT);
        const up = inputManager.justPressed(_inputManager.InputEnum.UP) || inputManager.justRepeated(_inputManager.InputEnum.UP);
        const down = inputManager.justPressed(_inputManager.InputEnum.DOWN) || inputManager.justRepeated(_inputManager.InputEnum.DOWN);
        if (left) this.cursorPos.x -= 1;
        if (right) this.cursorPos.x += 1;
        if (up) this.cursorPos.y -= 1;
        if (down) this.cursorPos.y += 1;
        if (!this.#selectedShape && this.cursorPos.x >= _sharedConstants.GRID_BLOCK_SIDE_LEN) this.onExit(this.cursorPos);
        this.cursorPos.x = Math.max(0, this.cursorPos.x);
        this.cursorPos.x = Math.min(_sharedConstants.GRID_BLOCK_SIDE_LEN - 1, this.cursorPos.x);
        this.cursorPos.y = Math.max(0, this.cursorPos.y);
        this.cursorPos.y = Math.min(_sharedConstants.GRID_BLOCK_SIDE_LEN - 1, this.cursorPos.y);
        if (this.#selectedShape) {
            this.#selectedShape.x = this.cursorPos.x;
            this.#selectedShape.y = this.cursorPos.y;
            if (inputManager.justPressed(_inputManager.InputEnum.L)) this.#selectedShape.rotateLeft();
            if (inputManager.justPressed(_inputManager.InputEnum.R)) this.#selectedShape.rotate();
            this.#keepSelectedShapeInBounds();
            if (inputManager.justPressed(_inputManager.InputEnum.A)) this.#placeSelectedShape();
            else if (inputManager.justPressed(_inputManager.InputEnum.B)) {
                const shape3 = this.#selectedShape;
                this.#selectedShape = null;
                this.#shapes = this.#shapes.filter((s)=>s != shape3
                );
                this.onReturnShape(shape3);
            }
        } else {
            if (inputManager.justPressed(_inputManager.InputEnum.A)) this.#grabShape();
            else if (inputManager.justPressed(_inputManager.InputEnum.B)) this.onExit(this.cursorPos);
        }
    }
    render(ctx) {
        // border
        ctx.fillStyle = _sharedConstants.BORDER_COLOR;
        ctx.fillRect(_sharedConstants.GRID_RENDER_OFFSET_X - GRID_BORDER_SIZE, _sharedConstants.GRID_RENDER_OFFSET_Y - GRID_BORDER_SIZE, _sharedConstants.GRID_RENDER_SIDE_LEN + GRID_BORDER_SIZE * 2, _sharedConstants.GRID_RENDER_SIDE_LEN + GRID_BORDER_SIZE * 2);
        // background
        ctx.fillStyle = "#124D7F";
        ctx.fillRect(_sharedConstants.GRID_RENDER_OFFSET_X, _sharedConstants.GRID_RENDER_OFFSET_Y, _sharedConstants.GRID_RENDER_SIDE_LEN, _sharedConstants.GRID_RENDER_SIDE_LEN);
        // blocks
        for(let x4 = 0; x4 < _sharedConstants.GRID_BLOCK_SIDE_LEN; x4++)for(let y4 = 0; y4 < _sharedConstants.GRID_BLOCK_SIDE_LEN; y4++){
            const shape4 = this.getShape(x4, y4);
            if (shape4) {
                ctx.fillStyle = shape4.color;
                ctx.fillRect(_sharedConstants.GRID_RENDER_OFFSET_X + _sharedConstants.BLOCK_RENDER_SIDE_LEN * x4, _sharedConstants.GRID_RENDER_OFFSET_Y + _sharedConstants.BLOCK_RENDER_SIDE_LEN * y4, _sharedConstants.BLOCK_RENDER_SIDE_LEN, _sharedConstants.BLOCK_RENDER_SIDE_LEN);
            }
            if (this.#selectedShape && this.#selectedShape.existsAt(x4, y4)) {
                ctx.globalAlpha = 0.75;
                ctx.fillStyle = this.#selectedShape.color;
                ctx.fillRect(_sharedConstants.GRID_RENDER_OFFSET_X + _sharedConstants.BLOCK_RENDER_SIDE_LEN * x4, _sharedConstants.GRID_RENDER_OFFSET_Y + _sharedConstants.BLOCK_RENDER_SIDE_LEN * y4, _sharedConstants.BLOCK_RENDER_SIDE_LEN, _sharedConstants.BLOCK_RENDER_SIDE_LEN);
                ctx.globalAlpha = 1;
            }
        }
        ctx.fillStyle = "#00000033";
        ctx.beginPath();
        // to the right
        ctx.moveTo(_sharedConstants.GRID_RENDER_OFFSET_X, _sharedConstants.GRID_RENDER_OFFSET_Y + _sharedConstants.BLOCK_RENDER_SIDE_LEN * 2);
        ctx.lineTo(_sharedConstants.GRID_RENDER_OFFSET_X + _sharedConstants.GRID_RENDER_SIDE_LEN, _sharedConstants.GRID_RENDER_OFFSET_Y + _sharedConstants.BLOCK_RENDER_SIDE_LEN * 2);
        // center
        ctx.lineTo(_sharedConstants.GRID_RENDER_OFFSET_X + _sharedConstants.GRID_RENDER_SIDE_LEN, _sharedConstants.GRID_RENDER_OFFSET_Y + _sharedConstants.BLOCK_RENDER_SIDE_LEN * 2.5);
        // back to the left
        ctx.lineTo(_sharedConstants.GRID_RENDER_OFFSET_X + _sharedConstants.GRID_RENDER_SIDE_LEN, _sharedConstants.GRID_RENDER_OFFSET_Y + _sharedConstants.BLOCK_RENDER_SIDE_LEN * 3);
        ctx.lineTo(_sharedConstants.GRID_RENDER_OFFSET_X, _sharedConstants.GRID_RENDER_OFFSET_Y + _sharedConstants.BLOCK_RENDER_SIDE_LEN * 3);
        // auto closes
        ctx.fill();
        // draw cursor
        if (this.#hasFocus) {
            const { x: x5 , y: y5  } = this.cursorPos;
            ctx.strokeStyle = "#E02828";
            ctx.strokeRect(_sharedConstants.GRID_RENDER_OFFSET_X + _sharedConstants.BLOCK_RENDER_SIDE_LEN * x5 + 0.5, _sharedConstants.GRID_RENDER_OFFSET_Y + _sharedConstants.BLOCK_RENDER_SIDE_LEN * y5 + 0.5, _sharedConstants.BLOCK_RENDER_SIDE_LEN - 1, _sharedConstants.BLOCK_RENDER_SIDE_LEN - 1);
            const shape5 = this.getShape(x5, y5);
            if (!this.#selectedShape && shape5) {
                ctx.font = "16px bn6-bold";
                ctx.fillText(shape5.letter, _sharedConstants.GRID_RENDER_OFFSET_X + _sharedConstants.BLOCK_RENDER_SIDE_LEN * x5 + 6, _sharedConstants.GRID_RENDER_OFFSET_Y + _sharedConstants.BLOCK_RENDER_SIDE_LEN * y5 + 3);
            }
        }
    }
}
exports.default = Grid;

},{"../input_manager":"Oqiei","./shared_constants":"ldZyS","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"Oqiei":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "InputEnum", ()=>InputEnum
);
parcelHelpers.export(exports, "InputManager", ()=>InputManager
);
const InputEnum = {
    UP: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3,
    A: 4,
    B: 5,
    START: 6,
    L: 7,
    R: 8
};
const KeyboardBinding = {
    ArrowUp: InputEnum.UP,
    ArrowDown: InputEnum.DOWN,
    ArrowLeft: InputEnum.LEFT,
    ArrowRight: InputEnum.RIGHT,
    KeyZ: InputEnum.A,
    KeyX: InputEnum.B,
    Enter: InputEnum.START,
    KeyA: InputEnum.L,
    KeyS: InputEnum.R
};
class InputManager {
    #pressed = [];
    #repeated = [];
    #held = [];
    #released = [];
    constructor(){
        document.addEventListener("keydown", (e)=>{
            const input = KeyboardBinding[e.code];
            if (input != undefined) {
                if (this.#held[input]) this.#repeated[input] = true;
                else {
                    this.#pressed[input] = true;
                    this.#held[input] = true;
                }
            }
        });
        document.addEventListener("keyup", (e)=>{
            const input = KeyboardBinding[e.code];
            if (input != undefined) {
                this.#released[input] = true;
                this.#held[input] = false;
            }
        });
    }
    justPressed(input) {
        return this.#pressed[input] == true;
    }
    justRepeated(input) {
        return this.#repeated[input] == true;
    }
    justReleased(input) {
        return this.#released[input] == true;
    }
    isDown(input) {
        return this.#held[input] == true;
    }
    flush() {
        this.#pressed = [];
        this.#released = [];
        this.#repeated = [];
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ldZyS":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "BLOCK_RENDER_SIDE_LEN", ()=>BLOCK_RENDER_SIDE_LEN
);
parcelHelpers.export(exports, "GRID_BLOCK_SIDE_LEN", ()=>GRID_BLOCK_SIDE_LEN
);
parcelHelpers.export(exports, "GRID_BLOCK_CENTER", ()=>GRID_BLOCK_CENTER
);
parcelHelpers.export(exports, "GRID_RENDER_SIDE_LEN", ()=>GRID_RENDER_SIDE_LEN
);
parcelHelpers.export(exports, "GRID_RENDER_OFFSET_X", ()=>GRID_RENDER_OFFSET_X
);
parcelHelpers.export(exports, "GRID_RENDER_OFFSET_Y", ()=>GRID_RENDER_OFFSET_Y
);
parcelHelpers.export(exports, "INVENTORY_OFFSET_X", ()=>INVENTORY_OFFSET_X
);
parcelHelpers.export(exports, "INVENTORY_OFFSET_Y", ()=>INVENTORY_OFFSET_Y
);
parcelHelpers.export(exports, "BORDER_COLOR", ()=>BORDER_COLOR
);
parcelHelpers.export(exports, "GRID_BACKGROUND_COLOR", ()=>GRID_BACKGROUND_COLOR
);
const BLOCK_RENDER_SIDE_LEN = 20;
const GRID_BLOCK_SIDE_LEN = 5;
const GRID_BLOCK_CENTER = Math.floor(GRID_BLOCK_SIDE_LEN / 2);
const GRID_RENDER_SIDE_LEN = GRID_BLOCK_SIDE_LEN * BLOCK_RENDER_SIDE_LEN;
const GRID_RENDER_OFFSET_X = BLOCK_RENDER_SIDE_LEN;
const GRID_RENDER_OFFSET_Y = BLOCK_RENDER_SIDE_LEN * 1.5;
const INVENTORY_OFFSET_X = GRID_RENDER_OFFSET_X + GRID_RENDER_SIDE_LEN + BLOCK_RENDER_SIDE_LEN;
const INVENTORY_OFFSET_Y = GRID_RENDER_OFFSET_Y;
const BORDER_COLOR = "#889EB3";
const GRID_BACKGROUND_COLOR = "#124D7F";

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"eQQVx":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _sharedConstants = require("./shared_constants");
var _inputManager = require("../input_manager");
var _random = require("../random");
class Inventory {
    #hasFocus = false;
    #focusTime = 0;
    #shapes = [];
    cursorIndex = 0;
    onRun = ()=>{
    };
    onExit = (gridPos)=>{
    };
    onSelection = (shape)=>{
    };
    giveFocus() {
        this.#hasFocus = true;
        this.#focusTime = 0;
    }
    removeFocus() {
        this.#hasFocus = false;
        this.#focusTime = 0;
    }
    setShapes(shapes) {
        shapes.forEach((shape)=>{
            shape.x = Math.floor(_sharedConstants.GRID_BLOCK_SIDE_LEN / 2);
            shape.y = Math.floor(_sharedConstants.GRID_BLOCK_SIDE_LEN / 2);
            shape.rotation = _random.randomInt(4);
        });
        this.#shapes = shapes;
    }
    addShape(shape) {
        shape.x = Math.floor(_sharedConstants.GRID_BLOCK_SIDE_LEN / 2);
        shape.y = Math.floor(_sharedConstants.GRID_BLOCK_SIDE_LEN / 2);
        this.#shapes.push(shape);
    }
    update(inputManager, delta) {
        this.#focusTime += delta;
        if (inputManager.justPressed(_inputManager.InputEnum.LEFT)) {
            this.onExit(this.cursorIndex);
            return;
        }
        const pressedUp = inputManager.justPressed(_inputManager.InputEnum.UP) || inputManager.justRepeated(_inputManager.InputEnum.UP);
        const pressedDown = inputManager.justPressed(_inputManager.InputEnum.DOWN) || inputManager.justRepeated(_inputManager.InputEnum.DOWN);
        if (pressedUp) this.cursorIndex -= 1;
        if (pressedDown) this.cursorIndex += 1;
        this.cursorIndex = Math.max(0, this.cursorIndex);
        this.cursorIndex = Math.min(this.#shapes.length, this.cursorIndex);
        if (inputManager.justPressed(_inputManager.InputEnum.A)) {
            if (this.cursorIndex < this.#shapes.length) {
                const [removedShape] = this.#shapes.splice(this.cursorIndex, 1);
                this.onSelection(removedShape);
            } else this.onRun();
        }
    }
    render(ctx) {
        ctx.font = "16px bn6-bold";
        ctx.textBaseline = "top";
        const width = 26;
        const height = 15;
        for(let i = 0; i < this.#shapes.length; i++){
            const shape = this.#shapes[i];
            const startX = _sharedConstants.INVENTORY_OFFSET_X;
            const startY = _sharedConstants.INVENTORY_OFFSET_Y + _sharedConstants.BLOCK_RENDER_SIDE_LEN * i;
            // render border
            ctx.fillStyle = _sharedConstants.BORDER_COLOR;
            ctx.fillRect(startX - 2, startY - 2, width + 4, height + 4);
            // render bg
            ctx.fillStyle = _sharedConstants.GRID_BACKGROUND_COLOR;
            ctx.fillRect(startX, startY, width, height);
            // render mini shape
            ctx.fillStyle = shape.color;
            for(let x = 0; x < 5; x++)for(let y = 0; y < 5; y++){
                if (!shape.existsAt(x, y)) continue;
                ctx.fillRect(startX + x * 3 + 11, startY + y * 3, 3, 3);
            }
            ctx.fillStyle = "white";
            ctx.fillText(shape.letter, startX + 1, startY + 1);
        }
        // render run button
        {
            const startX = _sharedConstants.INVENTORY_OFFSET_X;
            const startY = _sharedConstants.INVENTORY_OFFSET_Y + _sharedConstants.BLOCK_RENDER_SIDE_LEN * this.#shapes.length;
            // render border
            ctx.fillStyle = _sharedConstants.BORDER_COLOR;
            ctx.fillRect(startX - 2, startY - 2, width + 4, height + 4);
            // render bg
            ctx.fillStyle = "lime";
            ctx.fillRect(startX, startY, width, height);
            ctx.fillStyle = "white";
            ctx.fillText("RUN", startX + 1, startY + 1);
        }
        if (this.#hasFocus) {
            const startX = _sharedConstants.INVENTORY_OFFSET_X - 9 + Math.sin(this.#focusTime * 16);
            const startY = _sharedConstants.INVENTORY_OFFSET_Y + _sharedConstants.BLOCK_RENDER_SIDE_LEN * this.cursorIndex;
            ctx.strokeStyle = "green";
            ctx.fillStyle = "lime";
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(startX + 8, startY + height / 2);
            ctx.lineTo(startX, startY + height);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        }
    }
}
exports.default = Inventory;

},{"./shared_constants":"ldZyS","../input_manager":"Oqiei","../random":"1fE0k","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1fE0k":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// [0, n)
parcelHelpers.export(exports, "randomInt", ()=>randomInt
);
parcelHelpers.export(exports, "randomItem", ()=>randomItem
);
function randomInt(n) {
    return Math.floor(Math.random() * n);
}
function randomItem(array) {
    return array[randomInt(array.length)];
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"g07oX":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "generateWordShapes", ()=>generateWordShapes
);
parcelHelpers.export(exports, "generateFillerShapes", ()=>generateFillerShapes
);
var _shape = require("./shape");
var _shapeDefault = parcelHelpers.interopDefault(_shape);
var _random = require("./random");
const GRID_SIDE_LEN = 5;
let COLORS = [
    "#DE1100",
    "#D688C0",
    "#2880D9",
    "#19C000",
    "#D8DA00",
    "#D8D8D8"
];
const MAX_SHAPE_SIZE = 4;
const MAX_COLORS = 4;
function generateColors() {
    const colors = [];
    while(colors.length < MAX_COLORS){
        const color = _random.randomItem(COLORS);
        if (!colors.includes(color)) colors.push(color);
    }
    return colors;
}
function internalGenerateWordShapes(word) {
    let shapes = [];
    let nextRun = [];
    let colors = generateColors();
    let colorOffset = _random.randomInt(colors.length);
    for(let i = 0; i < GRID_SIDE_LEN; i++){
        const shape = new _shapeDefault.default();
        shape.color = colors[(i + colorOffset) % colors.length];
        shape.x = i;
        shape.y = 2;
        shape.letter = word[i];
        shape.set(shape.x, shape.y, true);
        shapes.push(shape);
        nextRun.push({
            shape,
            x: shape.x,
            y: shape.y - 1
        });
        nextRun.push({
            shape,
            x: shape.x,
            y: shape.y + 1
        });
        if (word[i] == word[i + 1]) {
            // merge repeated letter
            shape.set(shape.x + 1, shape.y, true);
            i++;
            nextRun.push({
                shape,
                x: shape.x + 1,
                y: shape.y - 1
            });
            nextRun.push({
                shape,
                x: shape.x + 1,
                y: shape.y + 1
            });
        }
    }
    const spread = ({ shape , x , y  })=>{
        nextRun.push({
            shape: shape,
            x: x - 1,
            y: y
        });
        nextRun.push({
            shape: shape,
            x: x + 1,
            y: y
        });
        nextRun.push({
            shape: shape,
            x: x,
            y: y - 1
        });
        nextRun.push({
            shape: shape,
            x: x,
            y: y + 1
        });
    };
    function hasSameColorNeighbor(shape1, x1, y1) {
        function hasSameColor(x, y) {
            const s = shapes.find((shape)=>shape.existsAt(x, y)
            );
            return s && s != shape1 && s.color == shape1.color;
        }
        return hasSameColor(x1 - 1, y1) || hasSameColor(x1 + 1, y1) || hasSameColor(x1, y1 - 1) || hasSameColor(x1, y1 + 1);
    }
    while(nextRun.length > 0){
        const run = nextRun;
        nextRun = [];
        for (const { shape: shape2 , x , y  } of run){
            if (x < 0 || y < 0 || x >= GRID_SIDE_LEN || y >= GRID_SIDE_LEN) continue;
            const otherShape = shapes.find((shape)=>shape.existsAt(x, y)
            );
            if (otherShape) continue;
            const growShape = ()=>{
                // spread if we can, or drop this search
                if (hasSameColorNeighbor(shape2, x, y)) return;
                if (shape2.countBlocks() >= MAX_SHAPE_SIZE || !shape2.canSet(x, y)) return;
                shape2.set(x, y, true);
                spread({
                    shape: shape2,
                    x,
                    y
                });
            };
            const tryLater = ()=>{
                // do nothing, but try again next run
                nextRun.push({
                    shape: shape2,
                    x,
                    y
                });
            };
            const options = [
                growShape,
                tryLater
            ];
            _random.randomItem(options)();
        }
    }
    return shapes;
}
function generateWordShapes(word) {
    let shapes;
    do shapes = internalGenerateWordShapes(word);
    while (shapes.filter((shape)=>shape.isColumn()
    ).length > 1)
    for (const shape4 of shapes)shape4.recalculateCenter();
    return shapes;
}
function generateFillerShapes(word) {
    let shapes;
    do shapes = internalGenerateWordShapes(word);
    while (shapes.filter((shape)=>shape.isColumn()
    ).length > 1)
    return shapes;
}

},{"./shape":"3rNg0","./random":"1fE0k","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"3rNg0":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
const MAX_SHAPE_SIDE_LEN = 5;
const CENTER_LEN = Math.floor(MAX_SHAPE_SIDE_LEN / 2);
class Shape {
    #blocks = [];
    constructor(){
        this.color = "";
        this.letter = "";
        this.x = 0;
        this.y = 0;
        this.rotation = 0;
        for(let i = 0; i < MAX_SHAPE_SIDE_LEN * MAX_SHAPE_SIDE_LEN; i++)this.#blocks[i] = false;
    }
    isColumn() {
        let count = 0;
        for(let i = 0; i < MAX_SHAPE_SIDE_LEN; i++)for(let j = 0; j < MAX_SHAPE_SIDE_LEN; j++){
            const index = i * MAX_SHAPE_SIDE_LEN + j;
            if (!this.#blocks[index]) continue;
            if (j != CENTER_LEN) // found a block outside of a column
            return false;
            count++;
        }
        // 1x1 is not a column
        return count > 1;
    }
    rotate() {
        this.rotation += 1;
        this.rotation %= 4;
    }
    rotateLeft() {
        this.rotation -= 1;
        if (this.rotation < 0) this.rotation = 3;
    }
    canSet(x, y) {
        const index = this.getIndex(x, y);
        return index >= 0 && index < MAX_SHAPE_SIDE_LEN * MAX_SHAPE_SIDE_LEN;
    }
    set(x, y, value) {
        const index = this.getIndex(x, y);
        this.#blocks[index] = value;
    }
    existsAt(x, y) {
        const index = this.getIndex(x, y);
        return this.#blocks[index] == true;
    }
    countBlocks() {
        let count = 0;
        for(let i = 0; i < this.#blocks.length; i++)if (this.#blocks[i]) count++;
        return count;
    }
    recalculateCenter() {
        const bounds = {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        };
        const validPositions = [];
        for(let i = 0; i < MAX_SHAPE_SIDE_LEN; i++)for(let j = 0; j < MAX_SHAPE_SIDE_LEN; j++){
            const index = i * MAX_SHAPE_SIDE_LEN + j;
            if (!this.#blocks[index]) continue;
            const x = j - CENTER_LEN;
            const y = i - CENTER_LEN;
            if (x < bounds.left) bounds.left = x;
            if (y < bounds.top) bounds.top = y;
            if (x > bounds.right) bounds.right = x;
            if (y > bounds.bottom) bounds.bottom = y;
            validPositions.push({
                x,
                y
            });
        }
        const trueCenter = {
            x: (bounds.left + bounds.right) / 2,
            y: (bounds.bottom + bounds.top) / 2
        };
        validPositions.sort((posA, posB)=>{
            const manhattanDistA = Math.abs(trueCenter.x - posA.x) + Math.abs(trueCenter.y - posA.y);
            const manhattanDistB = Math.abs(trueCenter.x - posB.x) + Math.abs(trueCenter.y - posB.y);
            return manhattanDistA < manhattanDistB ? -1 : 1;
        });
        const newCenter = validPositions[0];
        this.x -= newCenter.x;
        this.y -= newCenter.y;
        const updatedBlocks = [
            ...this.#blocks
        ];
        for(let i1 = 0; i1 < MAX_SHAPE_SIDE_LEN; i1++)for(let j1 = 0; j1 < MAX_SHAPE_SIDE_LEN; j1++){
            let value = false;
            const oldX = j1 + newCenter.x;
            const oldY = i1 + newCenter.y;
            if (oldX >= 0 && oldY >= 0 && oldX < MAX_SHAPE_SIDE_LEN && oldY < MAX_SHAPE_SIDE_LEN) {
                const index = oldY * MAX_SHAPE_SIDE_LEN + oldX;
                value = this.#blocks[index];
            }
            const index = i1 * MAX_SHAPE_SIDE_LEN + j1;
            updatedBlocks[index] = value;
        }
        this.#blocks = updatedBlocks;
    }
    getIndex(x, y) {
        x = x - this.x;
        y = y - this.y;
        let transformedX, transformedY;
        switch(this.rotation){
            case 0:
                // [x-y-, x+y-]
                // [x-y+, x+y+]
                transformedX = x;
                transformedY = y;
                break;
            case 1:
                // 90 clockwise
                // [x-y+, x-y-]
                // [x+y+, x+y-]
                transformedX = y;
                transformedY = CENTER_LEN - x - 2;
                break;
            case 2:
                // 180
                // [x+y+, x-y+]
                // [x+y-, x-y-]
                transformedX = CENTER_LEN - x - 2;
                transformedY = CENTER_LEN - y - 2;
                break;
            case 3:
                // 270
                // [x+y-, x+y+]
                // [x-y-, x-y+]
                transformedX = CENTER_LEN - y - 2;
                transformedY = x;
                break;
        }
        transformedX += CENTER_LEN;
        transformedY += CENTER_LEN;
        if (transformedX < 0 || transformedY < 0 || transformedX >= MAX_SHAPE_SIDE_LEN || transformedY >= MAX_SHAPE_SIDE_LEN) return -1;
        return transformedY * MAX_SHAPE_SIDE_LEN + transformedX;
    }
}
exports.default = Shape;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gEDpQ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = [
    // misc
    "ZENNY",
    "CHIPS",
    "CYBER",
    "PANEL",
    "COLOR",
    "POINT",
    "GAUGE",
    "VIRUS",
    "DRILL",
    "SNEAK",
    "HPMEM",
    "BREAK",
    // NCP
    "SHOES",
    "HUMOR",
    "TANGO",
    "ARMOR",
    "BLOCK",
    // humans
    "CHAUD",
    "BARYL",
    // navis
    "GLIDE",
    "PROTO",
    // "NUMBR", // NumbrMan Chips + NumberMan
    "MAGIC",
    "SKULL",
    "SHARK",
    "PHARO",
    // "SHADO",
    // "MAGNT",
    // "NAPLM",
    "METAL",
    "JAPAN",
    // "BUBBL",
    "SPARK",
    "VIDEO",
    "SHADE",
    "COSMO",
    "MEDDY",
    "CHAOS",
    "SPOUT",
    "BLAST",
    "JUDGE",
    "ERASE",
    "TENGU",
    "BEAST",
    "CACHE",
    "KENDO",
    "LASER",
    "QUICK",
    "STONE",
    // chips
    "STEAL",
    "CLOUD",
    "INVIS",
    "POPUP",
    "SWORD",
    "BLADE",
    "PUNCH",
    "LANCE",
    "GUARD",
    "RECOV",
    "ARROW",
    "SPICE",
    "SHAKE",
    "PANIC",
    "BATCH",
    "SNAKE",
    "QUAKE",
    "DELTA",
    "STAGE",
    // viruses
    "BILLY",
    "FISHY",
    "RATTY",
    "PUFFY",
    "JELLY",
    "BUNNY",
    "POWIE",
    "PENGI",
    "VINEY",
    "ALPHA",
    "TOTEM",
    "TWINS",
    "KILBY",
    "WALLA",
    "BATTY",
    "HANDI",
    "ZOMON",
    "BRUTE",
    "HEADY",
    "GOLEM", 
];

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jrjcr":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function arrayShuffle(array) {
    if (!Array.isArray(array)) throw new TypeError(`Expected an array, got ${typeof array}`);
    array = [
        ...array
    ];
    for(let index = array.length - 1; index > 0; index--){
        const newIndex = Math.floor(Math.random() * (index + 1));
        [array[index], array[newIndex]] = [
            array[newIndex],
            array[index]
        ];
    }
    return array;
}
exports.default = arrayShuffle;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6xrmZ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _inputManager = require("../input_manager");
var _sharedConstants = require("./shared_constants");
class RunLine {
    #progress = 0;
    #grid;
    #word;
    #builtWord;
    #validGrid;
    constructor(grid, word){
        this.#grid = grid;
    }
    onSuccess = ()=>{
    };
    onExit = ()=>{
    };
    setWord(word) {
        this.#word = word;
    }
    giveFocus() {
        this.#progress = 0;
        this.#builtWord = null;
    }
    removeFocus() {
        this.#progress = 0;
    }
     #reviewGrid() {
        this.#builtWord = "";
        for(let i = 0; i < _sharedConstants.GRID_BLOCK_SIDE_LEN; i++){
            const shape = this.#grid.getShape(i, _sharedConstants.GRID_BLOCK_CENTER);
            this.#builtWord += shape ? shape.letter : "?";
        }
        this.#validGrid = this.#grid.isValid();
    }
    update(inputManager, delta) {
        this.#progress = Math.min(1, this.#progress + delta / 2);
        const accept = inputManager.justPressed(_inputManager.InputEnum.A);
        const cancel = inputManager.justPressed(_inputManager.InputEnum.B);
        if ((accept || cancel) && this.#progress == 1) this.onExit();
        if (!this.#builtWord && this.#progress == 1) this.#reviewGrid();
    }
     #renderLine(ctx) {
        ctx.beginPath();
        const progressWidth = _sharedConstants.GRID_RENDER_SIDE_LEN * this.#progress;
        // to the right
        ctx.moveTo(_sharedConstants.GRID_RENDER_OFFSET_X, _sharedConstants.GRID_RENDER_OFFSET_Y + _sharedConstants.BLOCK_RENDER_SIDE_LEN * 2);
        ctx.lineTo(_sharedConstants.GRID_RENDER_OFFSET_X + progressWidth, _sharedConstants.GRID_RENDER_OFFSET_Y + _sharedConstants.BLOCK_RENDER_SIDE_LEN * 2);
        // center
        ctx.lineTo(_sharedConstants.GRID_RENDER_OFFSET_X + progressWidth, _sharedConstants.GRID_RENDER_OFFSET_Y + _sharedConstants.BLOCK_RENDER_SIDE_LEN * 2.5);
        // back to the left
        ctx.lineTo(_sharedConstants.GRID_RENDER_OFFSET_X + progressWidth, _sharedConstants.GRID_RENDER_OFFSET_Y + _sharedConstants.BLOCK_RENDER_SIDE_LEN * 3);
        ctx.lineTo(_sharedConstants.GRID_RENDER_OFFSET_X, _sharedConstants.GRID_RENDER_OFFSET_Y + _sharedConstants.BLOCK_RENDER_SIDE_LEN * 3);
        ctx.fill();
    }
     #renderText(ctx1, offsetX, offsetY) {
        for(let i = 0; i < _sharedConstants.GRID_BLOCK_SIDE_LEN * this.#progress - 0.5; i++){
            const shape = this.#grid.getShape(i, _sharedConstants.GRID_BLOCK_CENTER);
            ctx1.font = "16px bn6-bold";
            ctx1.fillText(shape ? shape.letter : "?", _sharedConstants.GRID_RENDER_OFFSET_X + _sharedConstants.BLOCK_RENDER_SIDE_LEN * i + 6 + offsetX, _sharedConstants.GRID_RENDER_OFFSET_Y + _sharedConstants.BLOCK_RENDER_SIDE_LEN * _sharedConstants.GRID_BLOCK_CENTER + 3 + offsetY);
        }
    }
    render(ctx2) {
        ctx2.fillStyle = "#ffff0066";
        this.#renderLine(ctx2);
        // text shadow
        this.#renderText(ctx2, 1, 1);
        if (this.#progress < 1) ctx2.fillStyle = "black";
        else if (this.#builtWord == this.#word) ctx2.fillStyle = this.#validGrid ? "lime" : "orange";
        else ctx2.fillStyle = "red";
        this.#renderText(ctx2, 0, 0);
    }
}
exports.default = RunLine;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","./shared_constants":"ldZyS","../input_manager":"Oqiei"}]},["7nZVA","8lqZg"], "8lqZg", "parcelRequire7258")

//# sourceMappingURL=index.975ef6c8.js.map
