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
const nota_controller_1 = require("../../controllers/notas/nota.controller");
function ObtenerNotas(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield nota_controller_1.NotaController.ObtenerNotas().catch(e => e);
        res.json(response);
    });
}
exports.ObtenerNotas = ObtenerNotas;
function AgregarNota(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let nota = req.body;
        let response = yield nota_controller_1.NotaController.AgregarNota(nota).catch(e => e);
        res.json(response);
    });
}
exports.AgregarNota = AgregarNota;
function EditarNota(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let nota = req.body;
        let response = yield nota_controller_1.NotaController.EditarNota(nota).catch(e => e);
        res.json(response);
    });
}
exports.EditarNota = EditarNota;
function BuscarNota(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let busqueda = req.body.busqueda;
        let response = yield nota_controller_1.NotaController.buscarNota(busqueda).catch(e => e);
        res.json(response);
    });
}
exports.BuscarNota = BuscarNota;
function EliminarNota(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let id = +req.body.id_nota;
        let response = yield nota_controller_1.NotaController.eliminarNota(id).catch(e => e);
        res.json(response);
    });
}
exports.EliminarNota = EliminarNota;
