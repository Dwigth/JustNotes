import { Response, Request } from "express";
import { EtiquetasController } from "../../actions/notas/etiquetas.controller";

export async function EtiquetasPorUsuario(req: Request, res: Response) {
    let id = +req.body.id;
    let respuesta = await EtiquetasController.etiquetasPorUsuario(id).catch(e => e);
    res.json(respuesta);
}