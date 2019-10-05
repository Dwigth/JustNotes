"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notas_1 = require("../../middlewares/notas/notas");
exports.notas_router = express_1.default.Router();
exports.notas_router.get('/notas/obtener', notas_1.ObtenerNotas);
exports.notas_router.post('/notas/agregar', notas_1.AgregarNota);
exports.notas_router.post('/notas/editar', notas_1.EditarNota);
exports.notas_router.post('/notas/buscar', notas_1.BuscarNota);
exports.notas_router.post('/notas/eliminar', notas_1.EliminarNota);
