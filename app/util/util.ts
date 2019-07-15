export function subdividirArreglo(arr: Array<any>, size: number) {
    let resultado: Array<Array<any>> = [];
    const length = arr.length;
    let index = 0;
    for (index = 0; index < length; index += size) {
        let myChunk = arr.slice(index, index + size);
        resultado.push(myChunk);
    }
    return resultado
}