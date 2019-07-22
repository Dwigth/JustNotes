import express from 'express';
import { EtiquetasPorUsuario } from '../../middlewares/notas/etiquetas';
export const etiquetas_router = express.Router();

etiquetas_router.post('/usuario/etiquetas', EtiquetasPorUsuario);