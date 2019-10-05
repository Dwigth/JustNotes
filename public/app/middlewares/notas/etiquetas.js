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
const etiquetas_controller_1 = require("../../controllers/notas/etiquetas.controller");
function EtiquetasPorUsuario(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let id = +req.body.id;
        let respuesta = yield etiquetas_controller_1.EtiquetasController.etiquetasPorUsuario(id).catch(e => e);
        res.json(respuesta);
    });
}
exports.EtiquetasPorUsuario = EtiquetasPorUsuario;
