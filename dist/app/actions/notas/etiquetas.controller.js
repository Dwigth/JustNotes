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
const etiquetas_model_1 = require("../../orm/notas/etiquetas.model");
class EtiquetasController {
    constructor() { }
    static etiquetasPorUsuario(id_usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            let respuesta;
            return etiquetas_model_1.M_ETIQUETAS.findAll({ where: { id_usuario: id_usuario } })
                .then(resultados => {
                return respuesta = {
                    data: { etiquetas: resultados },
                    error: false,
                    msg: 'Exito'
                };
            }).catch(e => {
                console.log(e);
                return respuesta = {
                    error: true,
                    msg: 'Ha ocurrido un error mientras se consultaban las etiquetas.'
                };
            });
        });
    }
}
exports.EtiquetasController = EtiquetasController;
