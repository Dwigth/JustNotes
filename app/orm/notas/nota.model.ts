
/**
@description: Esta clase representa un modelo SEQUELIZE.
*/

import { Model, Table, Column, DataType } from "sequelize-typescript";
import { NOTA } from '../../helpers/notas/nota';
@Table({
    tableName: 'nota'
})
export class M_NOTA extends Model<M_NOTA> implements NOTA {
    @Column({ primaryKey: true, autoIncrement: true })
    id_nota: number;
    @Column
    titulo: string;
    @Column
    contenido: string;
    @Column
    lista: boolean;
    @Column
    id_usuario: number;
}