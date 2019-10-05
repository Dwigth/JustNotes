"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function subdividirArreglo(arr, size) {
    let resultado = [];
    const length = arr.length;
    let index = 0;
    for (index = 0; index < length; index += size) {
        let myChunk = arr.slice(index, index + size);
        resultado.push(myChunk);
    }
    return resultado;
}
exports.subdividirArreglo = subdividirArreglo;
