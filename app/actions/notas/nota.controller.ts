import { RespuestaPeticion } from "../../helpers/util/respuesta";
import { M_NOTA } from "../../orm/notas/nota.model";
import { NOTA } from "../../helpers/notas/nota";
import { subdividirArreglo } from "../../util/util";
import moment = require("moment");

export class NotaController {
    constructor() { }
    public static async ObtenerNotas(): Promise<RespuestaPeticion> {
        let respuesta: RespuestaPeticion;
        let error = false;
        let extra: any;
        let notas = await M_NOTA.findAll({ order: [['fecha_modificacion', 'DESC']] })
            .then((notas: Array<NOTA>) => {
                return subdividirArreglo(notas, 4);
                // return notas;
            }).catch((e: any) => { extra = e; error = true; return e; });
        return respuesta = {
            data: notas,
            error: error,
            extra: { extra },
            msg: 'Todo bien'
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

    public static async EditarNota(Nota: NOTA): Promise<RespuestaPeticion> {
        let respuesta: RespuestaPeticion;
        return M_NOTA.findAll({ where: { id_nota: Nota.id_nota } })
            .then(async resultado => {
                let nota = resultado[0];
                nota.titulo = Nota.titulo;
                nota.contenido = Nota.contenido;
                nota.color = Nota.color;
                nota.lista = Nota.lista;
                nota.fecha_modificacion = moment().format('YYYY-MM-DD HH:m:ss');
                respuesta = await nota.save().then(r => r).catch(e => e);
                return respuesta = {
                    error: false,
                    msg: 'Se ha guardado la nota exitosamente.',
                    data: respuesta
                };
            }).catch(e => {
                return respuesta = {
                    error: true,
                    msg: 'Ha ocurrido un error al guardar la nota.',
                    extra: e
                };
            })
    }
}