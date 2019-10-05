"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const nota_model_1 = require("../../orm/notas/nota.model");
const moment = require("moment");
class NotaController {
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
    static ObtenerNotas() {
        return __awaiter(this, void 0, void 0, function* () {
            let respuesta;
            let error = false;
            let extra;
            let notas = yield nota_model_1.M_NOTA.findAll({
                order: [
                    ['fecha_modificacion', 'DESC']
                ]
            })
                .then((notas) => {
                // return subdividirArreglo(notas, 4);
                return notas;
            }).catch((e) => { extra = e; error = true; return e; });
            return respuesta = {
                data: notas,
                error: error,
                extra: { extra },
                msg: 'Todo bien'
            };
        });
    }
    static AgregarNota(Nota) {
        return __awaiter(this, void 0, void 0, function* () {
            let respuesta;
            return yield nota_model_1.M_NOTA.create(Nota).then(resultado => {
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
        });
    }
    static EditarNota(Nota) {
        return __awaiter(this, void 0, void 0, function* () {
            let respuesta;
            return yield nota_model_1.M_NOTA.findAll({ where: { id_nota: Nota.id_nota } })
                .then((resultado) => __awaiter(this, void 0, void 0, function* () {
                let nota = resultado[0];
                nota.titulo = Nota.titulo;
                nota.contenido = Nota.contenido;
                nota.color = Nota.color;
                nota.lista = Nota.lista;
                nota.fecha_modificacion = moment().format('YYYY-MM-DD HH:m:ss');
                respuesta = yield nota.save().then(r => r).catch(e => e);
                return respuesta = {
                    error: false,
                    msg: 'Se ha guardado la nota exitosamente.',
                    data: respuesta
                };
            })).catch(e => {
                return respuesta = {
                    error: true,
                    msg: 'Ha ocurrido un error al guardar la nota.',
                    extra: e
                };
            });
        });
    }
    static buscarNota(busqueda) {
        return __awaiter(this, void 0, void 0, function* () {
            let respuesta;
            return yield nota_model_1.M_NOTA.sequelize.query(`
        SELECT * FROM NOTA WHERE TITULO ILIKE '%${busqueda}%' OR CONTENIDO ILIKE '%${busqueda}%'
        `, { raw: true }).then(notas => {
                return respuesta = {
                    error: false,
                    msg: 'Exito al realizar la consulta.',
                    data: notas[0]
                };
            }).catch((e) => {
                console.log(e);
                return respuesta = {
                    error: true,
                    msg: 'Ha ocurrido un error al buscar la nota.',
                    extra: e
                };
            });
        });
    }
    static eliminarNota(id_nota) {
        return __awaiter(this, void 0, void 0, function* () {
            let respuesta;
            return nota_model_1.M_NOTA.findByPk(id_nota)
                .then(nota => {
                if (nota != null) {
                    nota.destroy();
                    return respuesta = {
                        error: false,
                        msg: 'Exito al realizar la consulta.'
                    };
                }
                else {
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
            });
        });
    }
}
exports.NotaController = NotaController;
