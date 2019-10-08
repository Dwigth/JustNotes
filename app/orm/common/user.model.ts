/**
@description: Esta clase representa un modelo SEQUELIZE.
*/

import { Model, Table, Column, DataType } from "sequelize-typescript";
import { USER } from "../../helpers/common/User";
@Table({
    tableName: 'usuarios'
})
export class M_USER extends Model<M_USER> implements USER {
    @Column({ primaryKey: true, autoIncrement: true })
    id_usuario: number;
    @Column
    nombre_usuario: string;
    @Column
    correo: string;
    @Column
    contrasena: string;
}