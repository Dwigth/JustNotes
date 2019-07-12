import { RespuestaPeticion } from "../../helpers/util/respuesta";
import { M_NOTA } from "../../orm/notas/nota.model";
import { NOTA } from "../../helpers/notas/nota";

export class NotaController {
    constructor() { }
    public static async ObtenerNotas(): Promise<RespuestaPeticion> {
        let respuesta: RespuestaPeticion;
        let error = false;
        let extra: any;
        let notas = await M_NOTA.findAll()
            .then((notas: Array<NOTA>) => notas).catch((e: any) => { extra = e; error = true; return e; });
        return respuesta = {
            data: notas,
            error: error,
            extra: { extra }
        }
    }
}