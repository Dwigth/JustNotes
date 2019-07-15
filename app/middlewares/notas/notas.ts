import { Response, Request } from "express";
import { NotaController } from "../../actions/notas/nota.controller";
import { NOTA } from "../../helpers/notas/nota";

export async function ObtenerNotas(req: Request, res: Response) {
    let response = await NotaController.ObtenerNotas().catch(e => e);
    res.json(response);
}

export async function AgregarNota(req: Request, res: Response) {
    let nota: NOTA = req.body;
    let response = await NotaController.AgregarNota(nota).catch(e => e);
    res.json(response);
}