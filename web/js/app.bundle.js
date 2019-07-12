(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
        fetch(config_1.URL + uri, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: config_1.header
        }).then(res => res.json())
            .catch(error => error)
            .then(response => response);
    }
    static GET(uri) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield fetch(config_1.URL + uri, {
                method: 'GET',
                headers: config_1.header
            }).then(res => res.json())
                .catch(error => error)
                .then((response) => response);
        });
    }
}
exports.HTTPController = HTTPController;

},{"../config/config":5}],2:[function(require,module,exports){
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
const http_controller_1 = require("./http.controller");
class InputController {
    constructor() {
        this.notas = [];
        this.ITitulo = document.getElementById('ITitulo');
        this.IContenido = document.getElementById('IContenido');
        this.IContenedor = document.getElementById('IContenedor');
        this.IConfirmacion = document.getElementById('IConfirmacion');
        this.IConfirmacion.addEventListener('click', () => { this.save(); this.displayITitulo('none'); });
        this.IContenido.addEventListener('click', () => {
            this.displayITitulo('initial');
        });
        this.displayITitulo('none');
        this.getNotas();
    }
    getNotas() {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield http_controller_1.HTTPController.GET('/notas/obtener');
            console.log(data);
            let notas = (data.data != undefined) ? Array.from(data.data) : [];
            this.notas = notas;
            let vc = new vista_controller_1.VistaController(this.notas).renderNotas(this.IContenedor);
        });
    }
    getITitulo() {
        return (this.ITitulo != null) ? this.ITitulo.value : 'Objeto es nulo';
    }
    getIContenido() {
        return (this.IContenido != null) ? this.IContenido.value : 'Objeto es nulo';
    }
    displayITitulo(status) {
        this.ITitulo.style.display = status;
    }
    save() {
        var nota = { titulo: this.getITitulo(), contenido: this.getIContenido() };
        if (nota.contenido !== '') {
            this.notas.push(nota);
            let vc = new vista_controller_1.VistaController(this.notas).renderNotas(this.IContenedor);
            this.clean();
        }
    }
    clean() {
        this.ITitulo.value = "";
        this.IContenido.value = "";
    }
}
exports.InputController = InputController;

},{"./http.controller":1,"./vista.controller":3}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VistaController {
    constructor(notas) {
        this.notas = notas;
    }
    renderNotas(IContenedor) {
        IContenedor.innerHTML = "";
        this.notas.forEach(nota => {
            var elemNota = document.createElement('div');
            elemNota.classList.add('three', 'columns', 'nota-card');
            elemNota.textContent = nota.titulo + ' contenido: ' + nota.contenido;
            IContenedor.appendChild(elemNota);
        });
    }
}
exports.VistaController = VistaController;

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const input_controller_1 = require("./actions/input.controller");
(() => {
    const IC = new input_controller_1.InputController();
})();

},{"./actions/input.controller":2}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.URL = 'http://localhost:2405';
exports.header = {
    'Content-Type': 'application/json'
};

},{}]},{},[4]);
