
/**
@description: Esta clase representa un modelo SEQUELIZE.
*/

import { Model, Table, Column, DataType } from "sequelize-typescript";
import { ETIQUETAS } from '../../helpers/notas/etiquetas';
@Table({
    tableName: 'etiquetas'
})
export class M_ETIQUETAS extends Model<M_ETIQUETAS> implements ETIQUETAS {
    @Column({ primaryKey: true, autoIncrement: true })
    id_etiqueta: number;
    @Column
    nombre: string;
    @Column
    id_usuario: number;
}