import { Response, Request } from "express";
import { NotaController } from "../../controllers/notas/nota.controller";
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
export async function EditarNota(req: Request, res: Response) {
    let nota: NOTA = req.body;
    let response = await NotaController.EditarNota(nota).catch(e => e);
    res.json(response);
}
export async function BuscarNota(req: Request, res: Response) {
    let busqueda = req.body.busqueda;
    let response = await NotaController.buscarNota(busqueda).catch(e => e);
    res.json(response);
}
export async function EliminarNota(req: Request, res: Response) {
    let id = +req.body.id_nota;
    let response = await NotaController.eliminarNota(id).catch(e => e);
    res.json(response);
}