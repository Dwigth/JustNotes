import { RespuestaPeticion } from "../../helpers/util/respuesta";
import { M_NOTA } from "../../orm/notas/nota.model";
import { NOTA } from "../../helpers/notas/nota";
import { subdividirArreglo } from "../../util/util";

export class NotaController {
    constructor() { }
    public static async ObtenerNotas(): Promise<RespuestaPeticion> {
        let respuesta: RespuestaPeticion;
        let error = false;
        let extra: any;
        let notas = await M_NOTA.findAll()
            .then((notas: Array<NOTA>) => {
                return subdividirArreglo(notas, 4);
                // return notas;
            }).catch((e: any) => { extra = e; error = true; return e; });
        return respuesta = {
            data: notas,
            error: error,
            extra: { extra }
        }
    }
    public static async AgregarNota(Nota: NOTA): Promise<RespuestaPeticion> {
        let respuesta: RespuestaPeticion;
        return M_NOTA.create(Nota).then(resultado => {
            return respuesta = {
                error: false,
                msg: 'Se ha guardado la nota exitosamente.',
                data: resultado
            };
        }).catch(e => {
            return respuesta = {
                error: true,
                msg: 'Ha ocurrido un error al guardar la nota.',
                extra: e
            };
        });
    }
}