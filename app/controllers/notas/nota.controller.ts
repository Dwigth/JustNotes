import { RespuestaPeticion } from "../../helpers/util/respuesta";
import { M_NOTA } from "../../orm/notas/nota.model";
import { NOTA } from "../../helpers/notas/nota";
import moment = require("moment");


export class NotaController {
    constructor() { }

    /**
     * Consulta para obtener notas por id de etiqueta
     * SELECT DISTINCT
        N.*
        FROM NOTA AS N
        INNER JOIN NOTAS_ETIQUETAS AS NE
        ON N.ID_NOTA = NE.ID_NOTA
        WHERE NE.ID_ETIQUETA = 1
     */

    /**
     * Consulta para obtener todas las notas con etiquetas
     * SELECT DISTINCT
        N.*,
        ARRAY_AGG( DISTINCT (E.NOMBRE)) ETIQUETAS
        FROM NOTA AS N
        FULL OUTER JOIN NOTAS_ETIQUETAS AS NE
        ON N.ID_NOTA = NE.ID_NOTA
        FULL OUTER JOIN ETIQUETAS AS E
        ON E.ID_ETIQUETA = NE.ID_ETIQUETA
        GROUP BY E.NOMBRE,N.ID_NOTA,N.TITULO,N.CONTENIDO,N.LISTA,N.ID_USUARIO,N.COLOR,N.FECHA_CREACION,N.FECHA_MODIFICACION

     */
    public static async ObtenerNotas(): Promise<RespuestaPeticion> {
        let respuesta: RespuestaPeticion;
        let error = false;
        let extra: any;
        let notas = await M_NOTA.findAll({
            order: [
                ['fecha_modificacion', 'DESC']
            ]
        })
            .then((notas: Array<NOTA>) => {
                // return subdividirArreglo(notas, 4);
                return notas;
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
        return await M_NOTA.create(Nota).then(resultado => {
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
        return await M_NOTA.findAll({ where: { id_nota: Nota.id_nota } })
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

    public static async buscarNota(busqueda: string): Promise<RespuestaPeticion> {
        let respuesta: RespuestaPeticion;
        return await M_NOTA.sequelize.query(`
        SELECT * FROM NOTA WHERE TITULO ILIKE '%${busqueda}%' OR CONTENIDO ILIKE '%${busqueda}%'
        `, { raw: true }).then(notas => {
            return respuesta = {
                error: false,
                msg: 'Exito al realizar la consulta.',
                data: notas[0]
            };
        }).catch((e: any) => {
            console.log(e)
            return respuesta = {
                error: true,
                msg: 'Ha ocurrido un error al buscar la nota.',
                extra: e
            };
        });
    }

    public static async eliminarNota(id_nota: number): Promise<RespuestaPeticion> {
        let respuesta: RespuestaPeticion;
        return M_NOTA.findByPk(id_nota)
            .then(nota => {
                if (nota != null) {
                    nota.destroy();
                    return respuesta = {
                        error: false,
                        msg: 'Exito al realizar la consulta.'
                    };
                } else {
                    return respuesta = {
                        error: true,
                        msg: 'Ha ocurrido un error al buscar la nota.'
                    };
                }
            }).catch(e => {
                return respuesta = {
                    error: true,
                    msg: 'Ha ocurrido un error al buscar la nota.',
                    extra: e
                };
            })
    }
}