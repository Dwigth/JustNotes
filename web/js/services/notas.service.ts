import { HTTPController } from "../actions/http.controller";
import { Nota } from "../helpers/nota";

export class NotasService {
    constructor() { }
    public static async obtenerNotas() {
        return await HTTPController.GET('/notas/obtener');
    }
    public static async agregarNota(nota: Nota) {
        return await HTTPController.POST(nota, '/notas/agregar')
            .then(resultado => {
                console.log(resultado);
                return resultado;
            }).catch(e => console.error(e));
    }
}