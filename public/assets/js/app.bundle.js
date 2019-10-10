(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/*!
 * Salvattore 1.0.9 by @rnmp and @ppold
 * https://github.com/rnmp/salvattore
 */
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.salvattore = factory();
  }
}(this, function() {
/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license */

if (!window.matchMedia) {
    window.matchMedia = function() {
        "use strict";

        // For browsers that support matchMedium api such as IE 9 and webkit
        var styleMedia = (window.styleMedia || window.media);

        // For those that don't support matchMedium
        if (!styleMedia) {
            var style       = document.createElement('style'),
                script      = document.getElementsByTagName('script')[0],
                info        = null;

            style.type  = 'text/css';
            style.id    = 'matchmediajs-test';

            script.parentNode.insertBefore(style, script);

            // 'style.currentStyle' is used by IE <= 8 and 'window.getComputedStyle' for all other browsers
            info = ('getComputedStyle' in window) && window.getComputedStyle(style, null) || style.currentStyle;

            styleMedia = {
                matchMedium: function(media) {
                    var text = '@media ' + media + '{ #matchmediajs-test { width: 1px; } }';

                    // 'style.styleSheet' is used by IE <= 8 and 'style.textContent' for all other browsers
                    if (style.styleSheet) {
                        style.styleSheet.cssText = text;
                    } else {
                        style.textContent = text;
                    }

                    // Test if media query is true or false
                    return info.width === '1px';
                }
            };
        }

        return function(media) {
            return {
                matches: styleMedia.matchMedium(media || 'all'),
                media: media || 'all'
            };
        };
    }();
}

/*! matchMedia() polyfill addListener/removeListener extension. Author & copyright (c) 2012: Scott Jehl. Dual MIT/BSD license */
(function(){
    "use strict";

    // Bail out for browsers that have addListener support
    if (window.matchMedia && window.matchMedia('all').addListener) {
        return false;
    }

    var localMatchMedia = window.matchMedia,
        hasMediaQueries = localMatchMedia('only all').matches,
        isListening     = false,
        timeoutID       = 0,    // setTimeout for debouncing 'handleChange'
        queries         = [],   // Contains each 'mql' and associated 'listeners' if 'addListener' is used
        handleChange    = function(evt) {
            // Debounce
            clearTimeout(timeoutID);

            timeoutID = setTimeout(function() {
                for (var i = 0, il = queries.length; i < il; i++) {
                    var mql         = queries[i].mql,
                        listeners   = queries[i].listeners || [],
                        matches     = localMatchMedia(mql.media).matches;

                    // Update mql.matches value and call listeners
                    // Fire listeners only if transitioning to or from matched state
                    if (matches !== mql.matches) {
                        mql.matches = matches;

                        for (var j = 0, jl = listeners.length; j < jl; j++) {
                            listeners[j].call(window, mql);
                        }
                    }
                }
            }, 30);
        };

    window.matchMedia = function(media) {
        var mql         = localMatchMedia(media),
            listeners   = [],
            index       = 0;

        mql.addListener = function(listener) {
            // Changes would not occur to css media type so return now (Affects IE <= 8)
            if (!hasMediaQueries) {
                return;
            }

            // Set up 'resize' listener for browsers that support CSS3 media queries (Not for IE <= 8)
            // There should only ever be 1 resize listener running for performance
            if (!isListening) {
                isListening = true;
                window.addEventListener('resize', handleChange, true);
            }

            // Push object only if it has not been pushed already
            if (index === 0) {
                index = queries.push({
                    mql         : mql,
                    listeners   : listeners
                });
            }

            listeners.push(listener);
        };

        mql.removeListener = function(listener) {
            for (var i = 0, il = listeners.length; i < il; i++){
                if (listeners[i] === listener){
                    listeners.splice(i, 1);
                }
            }
        };

        return mql;
    };
}());

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

(function() {
    "use strict";

    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] ||
            window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent

if (typeof window.CustomEvent !== "function") {
  (function() {
    "use strict";
    function CustomEvent(event, params) {
      params = params || { bubbles: false, cancelable: false, detail: undefined };
      var evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
      return evt;
     }

    CustomEvent.prototype = window.Event.prototype;

    window.CustomEvent = CustomEvent;
  })();
}

/* jshint laxcomma: true */
var salvattore = (function (global, document, undefined) {
"use strict";

var self = {},
    grids = [],
    mediaRules = [],
    mediaQueries = [],
    add_to_dataset = function(element, key, value) {
      // uses dataset function or a fallback for <ie10
      if (element.dataset) {
        element.dataset[key] = value;
      } else {
        element.setAttribute("data-" + key, value);
      }
      return;
    };

self.obtainGridSettings = function obtainGridSettings(element) {
  // returns the number of columns and the classes a column should have,
  // from computing the style of the ::before pseudo-element of the grid.

  var computedStyle = global.getComputedStyle(element, ":before")
    , content = computedStyle.getPropertyValue("content").slice(1, -1)
    , matchResult = content.match(/^\s*(\d+)(?:\s?\.(.+))?\s*$/)
    , numberOfColumns = 1
    , columnClasses = []
  ;

  if (matchResult) {
    numberOfColumns = matchResult[1];
    columnClasses = matchResult[2];
    columnClasses = columnClasses? columnClasses.split(".") : ["column"];
  } else {
    matchResult = content.match(/^\s*\.(.+)\s+(\d+)\s*$/);
    if (matchResult) {
      columnClasses = matchResult[1];
      numberOfColumns = matchResult[2];
      if (numberOfColumns) {
            numberOfColumns = numberOfColumns.split(".");
      }
    }
  }

  return {
    numberOfColumns: numberOfColumns,
    columnClasses: columnClasses
  };
};


self.addColumns = function addColumns(grid, items) {
  // from the settings obtained, it creates columns with
  // the configured classes and adds to them a list of items.

  var settings = self.obtainGridSettings(grid)
    , numberOfColumns = settings.numberOfColumns
    , columnClasses = settings.columnClasses
    , columnsItems = new Array(+numberOfColumns)
    , columnsFragment = document.createDocumentFragment()
    , i = numberOfColumns
    , selector
  ;

  while (i-- !== 0) {
    selector = "[data-columns] > *:nth-child(" + numberOfColumns + "n-" + i + ")";
    columnsItems.push(items.querySelectorAll(selector));
  }

  columnsItems.forEach(function append_to_grid_fragment(rows) {
    var column = document.createElement("div")
      , rowsFragment = document.createDocumentFragment()
    ;

    column.className = columnClasses.join(" ");

    Array.prototype.forEach.call(rows, function append_to_column(row) {
      rowsFragment.appendChild(row);
    });
    column.appendChild(rowsFragment);
    columnsFragment.appendChild(column);
  });

  grid.appendChild(columnsFragment);
  add_to_dataset(grid, 'columns', numberOfColumns);
};


self.removeColumns = function removeColumns(grid) {
  // removes all the columns from a grid, and returns a list
  // of items sorted by the ordering of columns.

  var range = document.createRange();
  range.selectNodeContents(grid);

  var columns = Array.prototype.filter.call(range.extractContents().childNodes, function filter_elements(node) {
    return node instanceof global.HTMLElement;
  });

  var numberOfColumns = columns.length
    , numberOfRowsInFirstColumn = columns[0].childNodes.length
    , sortedRows = new Array(numberOfRowsInFirstColumn * numberOfColumns)
  ;

  Array.prototype.forEach.call(columns, function iterate_columns(column, columnIndex) {
    Array.prototype.forEach.call(column.children, function iterate_rows(row, rowIndex) {
      sortedRows[rowIndex * numberOfColumns + columnIndex] = row;
    });
  });

  var container = document.createElement("div");
  add_to_dataset(container, 'columns', 0);

  sortedRows.filter(function filter_non_null(child) {
    return !!child;
  }).forEach(function append_row(child) {
    container.appendChild(child);
  });

  return container;
};


self.recreateColumns = function recreateColumns(grid) {
  // removes all the columns from the grid, and adds them again,
  // it is used when the number of columns change.

  global.requestAnimationFrame(function render_after_css_mediaQueryChange() {
    self.addColumns(grid, self.removeColumns(grid));
    var columnsChange = new CustomEvent("columnsChange");
    grid.dispatchEvent(columnsChange);
  });
};


self.mediaQueryChange = function mediaQueryChange(mql) {
  // recreates the columns when a media query matches the current state
  // of the browser.

  if (mql.matches) {
    Array.prototype.forEach.call(grids, self.recreateColumns);
  }
};


self.getCSSRules = function getCSSRules(stylesheet) {
  // returns a list of css rules from a stylesheet

  var cssRules;
  try {
    cssRules = stylesheet.sheet.cssRules || stylesheet.sheet.rules;
  } catch (e) {
    return [];
  }

  return cssRules || [];
};


self.getStylesheets = function getStylesheets() {
  // returns a list of all the styles in the document (that are accessible).

  var inlineStyleBlocks = Array.prototype.slice.call(document.querySelectorAll("style"));
  inlineStyleBlocks.forEach(function(stylesheet, idx) {
    if (stylesheet.type !== 'text/css' && stylesheet.type !== '') {
      inlineStyleBlocks.splice(idx, 1);
    }
  });

  return Array.prototype.concat.call(
    inlineStyleBlocks,
    Array.prototype.slice.call(document.querySelectorAll("link[rel='stylesheet']"))
  );
};


self.mediaRuleHasColumnsSelector = function mediaRuleHasColumnsSelector(rules) {
  // checks if a media query css rule has in its contents a selector that
  // styles the grid.

  var i, rule;

  try {
    i = rules.length;
  }
  catch (e) {
    i = 0;
  }

  while (i--) {
    rule = rules[i];
    if (rule.selectorText && rule.selectorText.match(/\[data-columns\](.*)::?before$/)) {
      return true;
    }
  }

  return false;
};


self.scanMediaQueries = function scanMediaQueries() {
  // scans all the stylesheets for selectors that style grids,
  // if the matchMedia API is supported.

  var newMediaRules = [];

  if (!global.matchMedia) {
    return;
  }

  self.getStylesheets().forEach(function extract_rules(stylesheet) {
    Array.prototype.forEach.call(self.getCSSRules(stylesheet), function filter_by_column_selector(rule) {
      // rule.media throws an 'not implemented error' in ie9 for import rules occasionally
      try {
        if (rule.media && rule.cssRules && self.mediaRuleHasColumnsSelector(rule.cssRules)) {
          newMediaRules.push(rule);
        }
      } catch (e) {}
    });
  });

  // remove matchMedia listeners from the old rules
  var oldRules = mediaRules.filter(function (el) {
      return newMediaRules.indexOf(el) === -1;
  });
  mediaQueries.filter(function (el) {
    return oldRules.indexOf(el.rule) !== -1;
  }).forEach(function (el) {
      el.mql.removeListener(self.mediaQueryChange);
  });
  mediaQueries = mediaQueries.filter(function (el) {
    return oldRules.indexOf(el.rule) === -1;
  });

  // add matchMedia listeners to the new rules
  newMediaRules.filter(function (el) {
    return mediaRules.indexOf(el) == -1;
  }).forEach(function (rule) {
      var mql = global.matchMedia(rule.media.mediaText);
      mql.addListener(self.mediaQueryChange);
      mediaQueries.push({rule: rule, mql:mql});
  });

  // swap mediaRules with the new set
  mediaRules.length = 0;
  mediaRules = newMediaRules;
};


self.rescanMediaQueries = function rescanMediaQueries() {
    self.scanMediaQueries();
    Array.prototype.forEach.call(grids, self.recreateColumns);
};


self.nextElementColumnIndex = function nextElementColumnIndex(grid, fragments) {
  // returns the index of the column where the given element must be added.

  var children = grid.children
    , m = children.length
    , lowestRowCount = 0
    , child
    , currentRowCount
    , i
    , index = 0
  ;
  for (i = 0; i < m; i++) {
    child = children[i];
    currentRowCount = child.children.length + (fragments[i].children || fragments[i].childNodes).length;
  if(lowestRowCount === 0) {
    lowestRowCount = currentRowCount;
  }
    if(currentRowCount < lowestRowCount) {
      index = i;
      lowestRowCount = currentRowCount;
    }
  }

  return index;
};


self.createFragmentsList = function createFragmentsList(quantity) {
  // returns a list of fragments

  var fragments = new Array(quantity)
    , i = 0
  ;

  while (i !== quantity) {
    fragments[i] = document.createDocumentFragment();
    i++;
  }

  return fragments;
};


self.appendElements = function appendElements(grid, elements) {
  // adds a list of elements to the end of a grid

  var columns = grid.children
    , numberOfColumns = columns.length
    , fragments = self.createFragmentsList(numberOfColumns)
  ;

  Array.prototype.forEach.call(elements, function append_to_next_fragment(element) {
    var columnIndex = self.nextElementColumnIndex(grid, fragments);
    fragments[columnIndex].appendChild(element);
  });

  Array.prototype.forEach.call(columns, function insert_column(column, index) {
    column.appendChild(fragments[index]);
  });
};


self.prependElements = function prependElements(grid, elements) {
  // adds a list of elements to the start of a grid

  var columns = grid.children
    , numberOfColumns = columns.length
    , fragments = self.createFragmentsList(numberOfColumns)
    , columnIndex = numberOfColumns - 1
  ;

  elements.forEach(function append_to_next_fragment(element) {
    var fragment = fragments[columnIndex];
    fragment.insertBefore(element, fragment.firstChild);
    if (columnIndex === 0) {
      columnIndex = numberOfColumns - 1;
    } else {
      columnIndex--;
    }
  });

  Array.prototype.forEach.call(columns, function insert_column(column, index) {
    column.insertBefore(fragments[index], column.firstChild);
  });

  // populates a fragment with n columns till the right
  var fragment = document.createDocumentFragment()
    , numberOfColumnsToExtract = elements.length % numberOfColumns
  ;

  while (numberOfColumnsToExtract-- !== 0) {
    fragment.appendChild(grid.lastChild);
  }

  // adds the fragment to the left
  grid.insertBefore(fragment, grid.firstChild);
};


self.registerGrid = function registerGrid (grid) {
  if (global.getComputedStyle(grid).display === "none") {
    return;
  }

  // retrieve the list of items from the grid itself
  var range = document.createRange();
  range.selectNodeContents(grid);

  var items = document.createElement("div");
  items.appendChild(range.extractContents());


  add_to_dataset(items, 'columns', 0);
  self.addColumns(grid, items);
  grids.push(grid);
};


self.init = function init() {
  // adds required CSS rule to hide 'content' based
  // configuration.

  var css = document.createElement("style");
  css.innerHTML = "[data-columns]::before{display:block;visibility:hidden;position:absolute;font-size:1px;}";
  document.head.appendChild(css);

  // scans all the grids in the document and generates
  // columns from their configuration.

  var gridElements = document.querySelectorAll("[data-columns]");
  Array.prototype.forEach.call(gridElements, self.registerGrid);
  self.scanMediaQueries();
};

self.init();

return {
  appendElements: self.appendElements,
  prependElements: self.prependElements,
  registerGrid: self.registerGrid,
  recreateColumns: self.recreateColumns,
  rescanMediaQueries: self.rescanMediaQueries,
  init: self.init,

  // maintains backwards compatibility with underscore style method names
  append_elements: self.appendElements,
  prepend_elements: self.prependElements,
  register_grid: self.registerGrid,
  recreate_columns: self.recreateColumns,
  rescan_media_queries: self.rescanMediaQueries
};

})(window, window.document);

return salvattore;
}));

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AlertController {
    constructor() {
        this.AlertElement = document.querySelector('#error-message');
    }
    showAlert(message) {
        this.AlertElement.style.visibility = 'visible';
        this.AlertElement.children[0].textContent = message;
        setTimeout(() => {
            this.AlertElement.style.visibility = 'hidden';
        }, 3000);
    }
}
AlertController.instance = undefined;
exports.AlertController = AlertController;

},{}],3:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
class HTTPController {
    constructor() { }
    static POST(data, uri) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield fetch(config_1.URL + uri, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: config_1.header
            }).then(res => res.json())
                .catch(error => error)
                .then((response) => response);
        });
    }
    static GET(uri) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield fetch(config_1.URL + uri, {
                method: 'GET',
                headers: config_1.header
            }).then(res => res.json())
                .catch((error) => error)
                .then((response) => response);
        });
    }
}
exports.HTTPController = HTTPController;

},{"../config/config":7}],4:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vista_controller_1 = require("./vista.controller");
const notas_service_1 = require("../services/notas.service");
const alert_controllert_1 = require("./alert.controllert");
class InputController {
    constructor() {
        this.notas = [];
        this.ITitulo = document.getElementById('ITitulo');
        this.IContenido = document.getElementById('IContenido');
        this.IContenedor = document.getElementById('IContenedor');
        this.IConfirmacion = document.getElementById('IConfirmacion');
        this.ILista = document.getElementById('ILista');
        this.IBusqueda = document.getElementById('busqueda');
        InputController.Modal = document.getElementById('modal');
        InputController.IRefresh = document.getElementById('IRefresh');
        this.IConfirmacion.addEventListener('click', () => { this.save(); this.afterClickIContenido('none'); });
        this.IContenido.addEventListener('click', () => {
            this.afterClickIContenido('initial');
        });
        this.IBusqueda.addEventListener('keyup', () => {
            this.search(this.IBusqueda.value);
        });
        this.afterClickIContenido('none');
        this.displayNotas();
        InputController.IRefresh.addEventListener('click', () => { this.refresh(); });
    }
    displayNotas() {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield notas_service_1.NotasService.obtenerNotas();
            console.log(data);
            let alert = new alert_controllert_1.AlertController();
            if (data.data == undefined) {
                alert.showAlert('Ha habido un error');
            }
            else {
                alert.showAlert(data.msg);
            }
            let notas = (data.data != undefined) ? Array.from(data.data) : [];
            this.notas = notas;
            let vc = new vista_controller_1.VistaController(this.notas);
            vc.render(this.IContenedor);
        });
    }
    getITitulo() {
        return (this.ITitulo != null) ? this.ITitulo.value : 'Objeto es nulo';
    }
    getIContenido() {
        return (this.IContenido != null) ? this.IContenido.value : 'Objeto es nulo';
    }
    afterClickIContenido(status) {
        this.ITitulo.style.display = status;
        this.IConfirmacion.style.display = status;
        this.ILista.style.display = status;
    }
    save() {
        let current_datetime = new Date();
        let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds();
        console.log(formatted_date);
        var nota = {
            titulo: this.getITitulo(),
            contenido: this.getIContenido(),
            id_usuario: 1,
            lista: false,
            fecha_creacion: formatted_date,
            fecha_modificacion: formatted_date
        };
        if (nota.contenido !== '') {
            notas_service_1.NotasService.agregarNota(nota).finally(() => {
                let vc = new vista_controller_1.VistaController(this.notas).appendNote(nota);
                // let vc = new VistaController(this.notas).render(this.IContenedor);
                this.clean();
                this.displayNotas();
            });
        }
    }
    clean() {
        this.ITitulo.value = "";
        this.IContenido.value = "";
    }
    refresh() {
        InputController.IRefresh.classList.add('refresh');
        this.displayNotas().finally(() => InputController.IRefresh.classList.remove('refresh'));
    }
    static spin(spin) {
        (spin) ? this.IRefresh.classList.add('refresh') : InputController.IRefresh.classList.remove('refresh');
    }
    search(val) {
        return __awaiter(this, void 0, void 0, function* () {
            if (val != '') {
                let data = yield notas_service_1.NotasService.buscarNota(val).catch(e => e);
                let vc = new vista_controller_1.VistaController(data.data).render(this.IContenedor);
            }
            else
                this.displayNotas();
        });
    }
}
exports.InputController = InputController;

},{"../services/notas.service":8,"./alert.controllert":2,"./vista.controller":5}],5:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const input_controller_1 = require("./input.controller");
const notas_service_1 = require("../services/notas.service");
const alert_controllert_1 = require("./alert.controllert");
const salvattore_1 = __importDefault(require("salvattore"));
class VistaController {
    constructor(notas) {
        // Referencia global del objeto Salvatore
        this.salvattore = salvattore_1.default || {};
        this.colors = [
            'FF637D',
            'F4F1BB',
            '66D7D1',
            'EAF2E3',
            'FFF87F',
            'FFFFFF'
        ];
        this.opts = [
            'Agregar etiqueta',
            'Mostrar lista',
            'Eliminar'
        ];
        this.backdrop = document.getElementById('backdrop');
        // this.Masonry = new Masonry('.grid', {
        //     // options
        //     itemSelector: '.nota-card',
        //     columnWidth: 80
        // });
        if (notas != undefined) {
            this.notas = notas;
        }
    }
    setNotas(notas) {
        this.notas = notas;
    }
    appendNote(Note) {
        this.notas.unshift(Note);
        const noteElement = this.cardBuilder(Note);
        this.Masonry.appended([noteElement]);
    }
    /**
     * @param IContenedor Contenedor en el cual se construirán las tarjetas
     */
    render(IContenedor) {
        this.cardContainer = IContenedor;
        this.backdrop = document.getElementById('backdrop');
        const IEtiquetaContenedor = document.getElementById('tags-list');
        IContenedor.innerHTML = "";
        IEtiquetaContenedor.innerHTML = "";
        IContenedor.classList.add('grid');
        this.notas.forEach((nota) => {
            const elemNota = this.cardBuilder(nota);
            // this.salvattore.appendElements(IContenedor, [elemNota]);
            IContenedor.append(elemNota);
        });
        // salvattore.recreateColumns(IContenedor);
        // this.Masonry = new Masonry('.grid', {
        //     // options
        //     itemSelector: '.nota-card',
        //     columnWidth: 20
        // });
        this.loadEtiquetas(IEtiquetaContenedor);
    }
    /**
     * Función que crea el HTML de cada nota.
     * @param data Datos de la nota
     */
    cardBuilder(data) {
        let timer = null;
        const alert = new alert_controllert_1.AlertController();
        const contenedorCard = document.createElement('div');
        contenedorCard.classList.add('nota-card', 'cursor');
        contenedorCard.id = `card_${data.id_nota}`;
        if (data.color != null) {
            contenedorCard.style.backgroundColor = '#' + data.color;
            contenedorCard.classList.add('nota-card-color');
        }
        //creacion de elementos html y adición de clases css
        const headerCard = document.createElement('div');
        const contentCard = document.createElement('div');
        const footerCard = document.createElement('div');
        const opt = document.createElement('div');
        const colors = document.createElement('div');
        const colors_drop = document.createElement('div');
        const more_drop = document.createElement('div');
        const more = document.createElement('div');
        const colorsBtn = document.createElement('i');
        const moreBtn = document.createElement('i');
        headerCard.textContent = data.titulo;
        //si no tiene contenido la nota podrá editarla
        if (data.titulo == '') {
            headerCard.innerHTML = '<br>';
        }
        else {
            headerCard.textContent = data.titulo;
        }
        if (data.contenido == '') {
            contentCard.innerHTML = '<br>';
        }
        else {
            contentCard.textContent = data.contenido;
        }
        colorsBtn.textContent = 'color_lens';
        moreBtn.textContent = 'more_vert';
        headerCard.classList.add('nota-card-header');
        contentCard.classList.add('nota-card-content');
        footerCard.classList.add('nota-card-footer', 'row');
        opt.classList.add('u-full-width');
        colors_drop.classList.add('colors_dropdown');
        more_drop.classList.add('more_dropdown', 'more_list');
        colors.classList.add('six', 'columns');
        colorsBtn.classList.add('material-icons', 'cursor');
        moreBtn.classList.add('material-icons', 'cursor');
        more.classList.add('six', 'columns');
        colors.append(colors_drop, colorsBtn);
        more.append(more_drop, moreBtn);
        opt.append(colors, more);
        footerCard.appendChild(opt);
        //Eventos
        this.colors.forEach(color => {
            const colorCircle = document.createElement('div');
            colorCircle.classList.add('circle');
            colorCircle.style.backgroundColor = '#' + color;
            colorCircle.addEventListener('click', () => {
                console.log(color);
                contenedorCard.style.backgroundColor = '#' + color;
                colors_drop.style.visibility = 'hidden';
                input_controller_1.InputController.spin(true);
                data.color = color;
                notas_service_1.NotasService.editarNota(data).then(r => {
                    if (r) {
                        alert.showAlert(r.msg);
                    }
                    input_controller_1.InputController.spin(false);
                }).catch(e => {
                    if (e) {
                        alert.showAlert('Ha ocurrido un error');
                    }
                    input_controller_1.InputController.spin(false);
                });
            });
            colors_drop.appendChild(colorCircle);
        });
        colorsBtn.addEventListener('mouseover', (ev) => {
            colors_drop.style.visibility = 'visible';
        });
        colors_drop.addEventListener('mouseleave', (ev) => {
            colors_drop.style.visibility = 'hidden';
        });
        this.opts.forEach((option, index) => {
            const optionElem = document.createElement('div');
            optionElem.classList.add('more_list-item');
            optionElem.textContent = option;
            optionElem.addEventListener('click', () => {
                more_drop.style.visibility = 'hidden';
            });
            optionElem.addEventListener('mouseover', (ev) => {
                optionElem.style.backgroundColor = 'rgba(0,0,0,0.05)';
            });
            optionElem.addEventListener('mouseleave', (ev) => {
                optionElem.style.backgroundColor = 'rgba(0,0,0,0)';
            });
            if (index == 2) {
                optionElem.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
                    let r = yield notas_service_1.NotasService.eliminarNota(data.id_nota).then((r) => __awaiter(this, void 0, void 0, function* () {
                        contenedorCard.style.display = 'none';
                        this.notas = [];
                        this.notas = yield notas_service_1.NotasService.obtenerNotas().then((r) => r.data).catch(e => e);
                        console.log(this.notas);
                    })).catch(e => e)
                        .finally(() => {
                        this.render(this.cardContainer);
                    });
                }));
            }
            more_drop.appendChild(optionElem);
        });
        moreBtn.addEventListener('click', () => {
            console.log('more');
            more_drop.style.visibility = 'visible';
        });
        headerCard.addEventListener('click', () => {
            console.log('Carta ', data.id_nota);
            contenedorCard.classList.add('nota-click');
            contenedorCard.classList.add('center-abs-div');
            headerCard.contentEditable = "true";
            this.backdrop.style.visibility = 'visible';
        });
        contentCard.addEventListener('click', () => {
            contenedorCard.classList.add('nota-click');
            contenedorCard.classList.add('center-abs-div');
            contentCard.contentEditable = "true";
            this.backdrop.style.visibility = 'visible';
        });
        headerCard.addEventListener('keydown', (ev) => {
            data.titulo = headerCard.textContent;
            console.log(headerCard.textContent);
            clearTimeout(timer);
            timer = setTimeout(() => { notas_service_1.NotasService.editarNota(data); }, 1000);
        });
        contentCard.addEventListener('keyup', (ev) => {
            data.contenido = contentCard.textContent;
            clearTimeout(timer);
            timer = setTimeout(() => { notas_service_1.NotasService.editarNota(data); }, 1000);
        });
        this.backdrop.addEventListener('click', () => {
            contenedorCard.classList.remove('nota-click');
            contenedorCard.classList.remove('center-abs-div');
            this.backdrop.style.visibility = 'hidden';
            input_controller_1.InputController.Modal.style.visibility = 'hidden';
            this.Masonry.reloadItems();
        });
        contenedorCard.append(headerCard, contentCard, footerCard);
        return contenedorCard;
    }
    labelsBuilder(etiqueta, editable) {
        const base = document.createElement('div');
        base.classList.add('tag-element');
        const icon = document.createElement('i');
        icon.classList.add('material-icons-outlined');
        icon.textContent = 'label';
        base.append(icon);
        if (editable) {
            const nombre = document.createElement('div');
            nombre.textContent = etiqueta.nombre;
            base.appendChild(nombre);
        }
        else {
            base.setAttribute('data-value', etiqueta.nombre);
        }
        return base;
    }
    //render etiquetas
    loadEtiquetas(IEtiquetaContenedor) {
        return __awaiter(this, void 0, void 0, function* () {
            input_controller_1.InputController.Modal.innerHTML = "";
            const label = document.createElement('div');
            label.classList.add('tag-element');
            label.textContent = 'Etiquetas';
            const editLabel = document.createElement('div');
            editLabel.classList.add('tag-element');
            const iconEdit = document.createElement('i');
            iconEdit.classList.add('material-icons-outlined');
            iconEdit.textContent = 'edit';
            editLabel.appendChild(iconEdit);
            editLabel.setAttribute('data-value', 'Editar etiqueta');
            editLabel.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
                this.backdrop.style.visibility = 'visible';
                input_controller_1.InputController.Modal.style.visibility = 'visible';
            }));
            IEtiquetaContenedor.appendChild(label);
            const inputLabels = document.createElement('input');
            inputLabels.classList.add('input-grey');
            inputLabels.placeholder = '¡Crea una nueva etiqueta!';
            inputLabels.style.padding = '10px';
            inputLabels.style.borderRadius = '4px';
            const LabelList = document.createElement('ul');
            this.etiquetas = yield notas_service_1.NotasService.etiquetasUsuario(1).then((r) => r.data.etiquetas).catch(e => e);
            this.etiquetas.forEach(etiqueta => {
                const label = this.labelsBuilder(etiqueta);
                IEtiquetaContenedor.appendChild(label);
                const li = document.createElement('li');
                li.appendChild(this.labelsBuilder(etiqueta, true));
                let name = li.children[0].children[1];
                name.addEventListener('click', () => {
                    name.contentEditable = 'true';
                });
                LabelList.appendChild(li);
            });
            input_controller_1.InputController.Modal.append(inputLabels, LabelList);
            IEtiquetaContenedor.appendChild(editLabel);
            inputLabels.addEventListener('keyup', (e) => {
                if (e.key == 'Enter') {
                    const etiqueta = {
                        nombre: inputLabels.value,
                        id_usuario: 1
                    };
                    const nuevo = this.labelsBuilder(etiqueta, true);
                    LabelList.appendChild(nuevo);
                    inputLabels.value = '';
                }
            });
        });
    }
}
exports.VistaController = VistaController;

},{"../services/notas.service":8,"./alert.controllert":2,"./input.controller":4,"salvattore":1}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const input_controller_1 = require("./actions/input.controller");
(() => {
    const IC = new input_controller_1.InputController();
})();

},{"./actions/input.controller":4}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.URL = 'http://localhost:3000';
exports.header = {
    'Content-Type': 'application/json'
};

},{}],8:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_controller_1 = require("../actions/http.controller");
class NotasService {
    constructor() { }
    static obtenerNotas() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield http_controller_1.HTTPController.GET('/notas/obtener');
        });
    }
    static agregarNota(nota) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield http_controller_1.HTTPController.POST(nota, '/notas/agregar')
                .then(resultado => {
                console.log(resultado);
                return resultado;
            }).catch(e => console.error(e));
        });
    }
    static editarNota(nota) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield http_controller_1.HTTPController.POST(nota, '/notas/editar')
                .then(resultado => {
                return resultado;
            }).catch(e => console.error(e));
        });
    }
    static buscarNota(busqueda) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield http_controller_1.HTTPController.POST({ busqueda: busqueda }, '/notas/buscar')
                .then(resultado => {
                return resultado;
            }).catch(e => console.error(e));
        });
    }
    static etiquetasUsuario(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield http_controller_1.HTTPController.POST({ id: id }, '/usuario/etiquetas')
                .then(resultado => {
                return resultado;
            }).catch(e => console.error(e));
        });
    }
    static eliminarNota(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield http_controller_1.HTTPController.POST({ id_nota: id }, '/notas/eliminar')
                .then(resultado => {
                return resultado;
            }).catch(e => console.error(e));
        });
    }
}
exports.NotasService = NotasService;

},{"../actions/http.controller":3}]},{},[6]);
