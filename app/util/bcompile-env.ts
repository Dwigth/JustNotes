/**
 * @fileoverview 
 * Este archivo servirá para sustituir las variables de entorno
 * de la aplicación en todos sus estados a la hora de compilar 
 * para un escenario en especifico.
 * Para su correcto funcionamiento deberás tener el archivo compile-opts.json en raíz.
 * La carpeta 'environment' con sus archivos .pre, .pro.
 */
import fs from 'fs';
import { exec } from 'child_process';
import { environments } from '../../compile-opts.json';
//Obtenener input
let TEMP_SERVER = '';
let TEMP_ENV = '';
let CURRENT_ENV: any = {};
const args = process.argv.slice(2);
// Validamos el primer argumento obtenido del input por consola
if (args[0] === undefined) {
    throw ('No se proporcionó un ambiente de compilación.');
}

/**
 * @description Valida el argumento y devuelve una tupla con un booleano y un ambiente de compilacion en concreto.
 * @param args Argumentos de la linea de comandos.
 */
const valid = (args: Array<string>): [boolean, string] => {
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
}
/**
 * @description Reemplaza la declaración del servidor pasando de http a https.
 * @param obj Objeto de ambiente de compilación obtenido del archivo compile-opts.json.
 * @param origin Cadena de carácteres que representan el contenido de un archivo.
 */
const replaceServer = (obj: any, origin: string) => {
    const serverWithSSL = `const server = https.createServer({
        key: fs.readFileSync('${obj.appendables.SSL_CERT.key}'),
        cert: fs.readFileSync('${obj.appendables.SSL_CERT.cert}')
    }, app)`;
    let result = origin.replace('const server = http.createServer(app)', serverWithSSL);
    return result;
}
/**
 * 
 * @param path Cadena de caracteres que representan una dirección.
 */
const readFile = async (path: string): Promise<string> => {
    let promise = new Promise<string>((resolve: Function, reject: Function) => {
        fs.readFile(path, 'utf8', function (err, fileContents) {
            if (err) reject(err);
            resolve(fileContents)
        });
    });
    return promise;
}

/**
 * @description Cambia el contenido de los archivos
 * @param target Ambiente de compilación.
 */
const changeFile = async (target: string) => {
    if (target == 'pro') {
        CURRENT_ENV = environments.production;
        TEMP_ENV = JSON.stringify(await readFile(CURRENT_ENV.origin));

        let previusServer = await readFile(environments.server);
        TEMP_SERVER = JSON.stringify(previusServer);
        let server = replaceServer(CURRENT_ENV, previusServer);
        fs.writeFile(environments.server, server, (error) => {
            if (error) throw error;
            console.log('Reemplazado modulo http por https');
        });
    } else if (target == 'pre') {
        CURRENT_ENV = environments.preproduction;
        TEMP_ENV = JSON.stringify(await readFile(CURRENT_ENV.origin));
    }

    let changeForEnv = await readFile(CURRENT_ENV.changeFor);
    fs.writeFile(CURRENT_ENV.origin, changeForEnv, (error) => {
        if (error) throw error;
        console.log('Reemplazado archivo environment.');
    });
}

const result = valid(args);
if (result[0]) {
    changeFile(result[1]);
    console.log('Compilando...');
    try {
        exec('tsc', (error, stdout, stderr) => {
            if (error) {
                console.log(error);
            }

            if (result[1] === 'pro') {
                TEMP_SERVER = JSON.parse(TEMP_SERVER);
                fs.writeFile(environments.server, TEMP_SERVER, (error) => {
                    if (error) throw error;
                    console.log('Archivo servidor restaurado.');
                });
            }

            TEMP_ENV = JSON.parse(TEMP_ENV);
            fs.writeFile(CURRENT_ENV.origin, TEMP_ENV, (error) => {
                if (error) throw error;
                console.log('Archivo environment restaurado.');
            });
            // console.log('stdout: ', stdout);
            // console.log('stderr: ', stderr);
        });
    } catch (error) {
        console.log(error);
    }
} else {
    console.error('No se proporcionó un ambiente de compilación.');
}

