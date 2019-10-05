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
