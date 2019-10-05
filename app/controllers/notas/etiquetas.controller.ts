import { RespuestaPeticion } from "../../helpers/util/respuesta";
import { M_ETIQUETAS } from "../../orm/notas/etiquetas.model";

export class EtiquetasController {
    constructor() { }
    public static async etiquetasPorUsuario(id_usuario: number): Promise<RespuestaPeticion> {
        let respuesta: RespuestaPeticion;
        return M_ETIQUETAS.findAll({ where: { id_usuario: id_usuario } })
            .then(resultados => {
                return respuesta = {
                    data: { etiquetas: resultados },
                    error: false,
                    msg: 'Exito'
                };
            }).catch(e => {
                console.log(e);

                return respuesta = {
                    error: true,
                    msg: 'Ha ocurrido un error mientras se consultaban las etiquetas.'
                };
            })
    }
}