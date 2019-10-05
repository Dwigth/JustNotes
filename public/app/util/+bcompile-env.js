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
 * @fileoverview
 * Este archivo servirá para sustituir las variables de entorno
 * de la aplicación en todos sus estados a la hora de compilar
 * para un escenario en especifico.
 * Para su correcto funcionamiento deberás tener el archivo compile-opts.json en raíz.
 * La carpeta 'environment' con sus archivos .pre, .pro.
 */
const fs_1 = __importDefault(require("fs"));
const child_process_1 = require("child_process");
const compile_opts_json_1 = require("../../compile-opts.json");
//Obtenener input
let TEMP_SERVER = '';
let TEMP_ENV = '';
let CURRENT_ENV = {};
const args = process.argv.slice(2);
// Validamos el primer argumento obtenido del input por consola
if (args[0] === undefined) {
    throw ('No se proporcionó un ambiente de compilación.');
}
/**
 * @description Valida el argumento y devuelve una tupla con un booleano y un ambiente de compilacion en concreto.
 * @param args Argumentos de la linea de comandos.
 */
const valid = (args) => {
    let isValid = false;
    let targets = ['pre', 'pro'];
    let finalTarget = '';
    let i;
    for (i = 0; i < targets.length; i++) {
        const elem = targets[i];
        if (args[0].includes(elem)) {
            isValid = true;
            finalTarget = elem;
            break;
        }
    }
    return [isValid, finalTarget];
};
/**
 * @description Reemplaza la declaración del servidor pasando de http a https.
 * @param obj Objeto de ambiente de compilación obtenido del archivo compile-opts.json.
 * @param origin Cadena de carácteres que representan el contenido de un archivo.
 */
const replaceServer = (obj, origin) => {
    const serverWithSSL = `const server = https.createServer({
        key: fs.readFileSync('${obj.appendables.SSL_CERT.key}'),
        cert: fs.readFileSync('${obj.appendables.SSL_CERT.cert}')
    }, app)`;
    let result = origin.replace('const server = http.createServer(app)', serverWithSSL);
    return result;
};
/**
 *
 * @param path Cadena de caracteres que representan una dirección.
 */
const readFile = (path) => __awaiter(this, void 0, void 0, function* () {
    let promise = new Promise((resolve, reject) => {
        fs_1.default.readFile(path, 'utf8', function (err, fileContents) {
            if (err)
                reject(err);
            resolve(fileContents);
        });
    });
    return promise;
});
/**
 * @description Cambia el contenido de los archivos
 * @param target Ambiente de compilación.
 */
const changeFile = (target) => __awaiter(this, void 0, void 0, function* () {
    if (target == 'pro') {
        CURRENT_ENV = compile_opts_json_1.environments.production;
        TEMP_ENV = JSON.stringify(yield readFile(CURRENT_ENV.origin));
        let previusServer = yield readFile(compile_opts_json_1.environments.server);
        TEMP_SERVER = JSON.stringify(previusServer);
        let server = replaceServer(CURRENT_ENV, previusServer);
        fs_1.default.writeFile(compile_opts_json_1.environments.server, server, (error) => {
            if (error)
                throw error;
            console.log('Reemplazado modulo http por https');
        });
    }
    else if (target == 'pre') {
        CURRENT_ENV = compile_opts_json_1.environments.preproduction;
        TEMP_ENV = JSON.stringify(yield readFile(CURRENT_ENV.origin));
    }
    let changeForEnv = yield readFile(CURRENT_ENV.changeFor);
    fs_1.default.writeFile(CURRENT_ENV.origin, changeForEnv, (error) => {
        if (error)
            throw error;
        console.log('Reemplazado archivo environment.');
    });
});
const result = valid(args);
if (result[0]) {
    changeFile(result[1]);
    console.log('Compilando...');
    try {
        child_process_1.exec('tsc', (error, stdout, stderr) => {
            if (error) {
                console.log(error);
            }
            if (result[1] === 'pro') {
                TEMP_SERVER = JSON.parse(TEMP_SERVER);
                fs_1.default.writeFile(compile_opts_json_1.environments.server, TEMP_SERVER, (error) => {
                    if (error)
                        throw error;
                    console.log('Archivo servidor restaurado.');
                });
            }
            TEMP_ENV = JSON.parse(TEMP_ENV);
            fs_1.default.writeFile(CURRENT_ENV.origin, TEMP_ENV, (error) => {
                if (error)
                    throw error;
                console.log('Archivo environment restaurado.');
            });
            // console.log('stdout: ', stdout);
            // console.log('stderr: ', stderr);
        });
    }
    catch (error) {
        console.log(error);
    }
}
else {
    console.error('No se proporcionó un ambiente de compilación.');
}
