(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
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

},{"../config/config":6}],3:[function(require,module,exports){
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
            let vc = new vista_controller_1.VistaController(this.notas).render(this.IContenedor);
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
                let vc = new vista_controller_1.VistaController(this.notas).render(this.IContenedor);
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

},{"../services/notas.service":7,"./alert.controllert":1,"./vista.controller":4}],4:[function(require,module,exports){
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
const input_controller_1 = require("./input.controller");
const notas_service_1 = require("../services/notas.service");
const alert_controllert_1 = require("./alert.controllert");
class VistaController {
    constructor(notas) {
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
        this.notas = notas;
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
            IContenedor.append(elemNota);
        });
        this.Masonry = new Masonry('.grid', {
            // options
            itemSelector: '.nota-card',
            columnWidth: 20
        });
        //render etiquetas
        let loadEtiquetas = () => __awaiter(this, void 0, void 0, function* () {
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
            IEtiquetaContenedor.appendChild(label);
            this.etiquetas = yield notas_service_1.NotasService.etiquetasUsuario(1).then((r) => r.data.etiquetas).catch(e => e);
            this.etiquetas.forEach(etiqueta => {
                const label = this.labelsBuilder(etiqueta);
                IEtiquetaContenedor.appendChild(label);
            });
            IEtiquetaContenedor.appendChild(editLabel);
        });
        loadEtiquetas();
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
            headerCard.contentEditable = "true";
            this.backdrop.style.visibility = 'visible';
        });
        contentCard.addEventListener('click', () => {
            contenedorCard.classList.add('nota-click');
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
            this.backdrop.style.visibility = 'hidden';
            this.Masonry.reloadItems();
        });
        contenedorCard.append(headerCard, contentCard, footerCard);
        return contenedorCard;
    }
    labelsBuilder(etiqueta) {
        const base = document.createElement('div');
        base.classList.add('tag-element');
        const icon = document.createElement('i');
        icon.classList.add('material-icons-outlined');
        icon.textContent = 'label';
        base.append(icon);
        base.setAttribute('data-value', etiqueta.nombre);
        return base;
    }
}
exports.VistaController = VistaController;

},{"../services/notas.service":7,"./alert.controllert":1,"./input.controller":3}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const input_controller_1 = require("./actions/input.controller");
(() => {
    const IC = new input_controller_1.InputController();
})();

},{"./actions/input.controller":3}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.URL = 'http://localhost:2405';
exports.header = {
    'Content-Type': 'application/json'
};

},{}],7:[function(require,module,exports){
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

},{"../actions/http.controller":2}]},{},[5]);
