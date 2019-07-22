import express from 'express';
import { ObtenerNotas, AgregarNota, EditarNota, BuscarNota, EliminarNota } from '../../middlewares/notas/notas';
export const notas_router = express.Router();

notas_router.get('/notas/obtener', ObtenerNotas);
notas_router.post('/notas/agregar', AgregarNota);
notas_router.post('/notas/editar', EditarNota);
notas_router.post('/notas/buscar', BuscarNota);
notas_router.post('/notas/eliminar', EliminarNota);