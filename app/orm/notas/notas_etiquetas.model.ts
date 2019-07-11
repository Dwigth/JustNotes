
/**
@description: Esta clase representa un modelo SEQUELIZE.
*/

import { Model, Table, Column, DataType } from "sequelize-typescript";
import { NOTAS_ETIQUETAS } from '../../helpers/notas/notas_etiquetas';
@Table({
    tableName: 'notas_etiquetas'
})
export class M_NOTAS_ETIQUETAS extends Model<M_NOTAS_ETIQUETAS> implements NOTAS_ETIQUETAS {
    @Column
    fecha_creacion: string;
    @Column
    id_nota: number;
    @Column
    id_etiqueta: number;
}