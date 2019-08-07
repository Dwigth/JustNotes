"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author: Dwigth Astacio Hernández
 * @version: 0.0.2
 * @description: Generador de clases e interfaces para sequelize-typescript
 * Input: [0][nomber_modulo]        |Necesario
 *        [1][nombre_clase_ORM]     |Necesario
 *        [2][nombre_interfaz]      |Opcional
 *
 * Directorio actual:       '**\app\util'
 * Directorio modelos ORM:  '**\app\orm\'
 * Directorio interfaces:   '**\app\helpers\'
 *
 * Por convención a las clases se les agregará .model al final de su nombre.
 * Si la clase no existe y la interfaz tampoco se crearán los archivos solicitados.
 * @todo: Si la clase no existe pero la interfaz sí solo se creará la clase y viceversa.
 * Si existe la clase se sobreescribirá.
 * @todo: Si no se especifica el nombre de la interfaz se utilizará el de la clase.
 * @todo: Si ya existe la interfaz copiar su contendio.
 * @todo: Permitir agregar contenido de la interfaz.
 * @todo: Agregar modelo al arreglo de modelos en el archivo index de cada módulo.
 * @example npm run gen agenda AG_NOTIFICACIONES
 */
const fs_1 = __importDefault(require("fs"));
//Obtenener input
const args = process.argv.slice(2);
//obtener directorio actual
const cdir = process.cwd() + '/app/';
//obtener valores de argumentos
let nombre_modulo = args[0];
let nombre_clase_ORM = args[1];
let nombre_interfaz = args[2];
if (nombre_interfaz == null || nombre_interfaz == "") {
    nombre_interfaz = nombre_clase_ORM;
    console.log(`Renombrando interfaz a ${nombre_clase_ORM}`);
}
//asignar direcciones 
const helperDir = `../../helpers/${nombre_modulo}`;
const ormDir = `${cdir}/orm/${nombre_modulo}`;
// const hpdir = `${cdir}/helpers/${nombre_modulo}`;
//verificar direciones
const ormDirExist = verificar_directorio(ormDir);
// const helperDirExist = verificar_directorio(helperDir);
if (ormDirExist) {
    const nombre_clase_dir = `${ormDir}/${nombre_clase_ORM}.model.ts`;
    // const nombre_interfaz_dir = `${helperDir}/${nombre_interfaz}.ts`;
    let comments = `
    /**
    @description: Esta clase representa un modelo SEQUELIZE.
    */`;
    let dataInterface = `export interface ${nombre_interfaz.toUpperCase()}{
    }`;
    let dataORM = `\n
    import { Model, Table, Column, DataType } from "sequelize-typescript";
    import { ${nombre_interfaz.toUpperCase()} } from '${helperDir}/${nombre_clase_ORM}';
    @Table({
        tableName:'${nombre_clase_ORM.toLowerCase()}'
    })
    export class M_${nombre_clase_ORM.toUpperCase()} extends Model<M_${nombre_clase_ORM.toUpperCase()}> implements ${nombre_interfaz.toUpperCase()} {}`;
    let clas = comments + dataORM;
    let inter = dataInterface;
    // console.log(nombre_clase_dir + "\n"+nombre_interfaz_dir);
    // console.log(nombre_interfaz_dir.search("helpers"));
    fs_1.default.writeFileSync(nombre_clase_dir, clas, { encoding: 'utf8' });
    // fs.writeFileSync(nombre_interfaz_dir, inter, { encoding: 'utf8' })
}
function verificar_directorio(dir) {
    return __awaiter(this, void 0, void 0, function* () {
        let chequeo = new Promise((resolve, reject) => {
            let respuesta = fs_1.default.readdirSync(dir, { encoding: "utf8" });
            console.log(respuesta);
            if (respuesta.length >= 1) {
                resolve(true);
            }
            else {
                reject(false);
            }
        });
        return yield chequeo;
    });
}
