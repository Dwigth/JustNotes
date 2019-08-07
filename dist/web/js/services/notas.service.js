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
