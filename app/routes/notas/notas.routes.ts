import express, { Response, Request } from 'express';
import { ObtenerNotas, AgregarNota } from '../../middlewares/notas/notas';
export const notas_router = express.Router();

notas_router.get('/notas/obtener', ObtenerNotas);
notas_router.post('/notas/agregar', AgregarNota);