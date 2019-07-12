import { Response, Request } from "express";
import { NotaController } from "../../actions/notas/nota.controller";

export async function ObtenerNotas(req: Request, res: Response) {
    let response = await NotaController.ObtenerNotas().catch(e => e);
    res.json(response);
}