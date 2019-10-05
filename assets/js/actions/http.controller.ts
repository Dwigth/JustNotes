import { URL, header } from "../config/config";
import { RespuestaPeticion } from "../helpers/respuesta";

export class HTTPController {
    constructor() { }
    public static async POST(data: any, uri: string): Promise<RespuestaPeticion> {
        return await fetch(URL + uri, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: header
        }).then(res => res.json())
            .catch(error => error)
            .then((response: RespuestaPeticion) => response);
    }
    public static async GET(uri: string): Promise<RespuestaPeticion> {
        return await fetch(URL + uri, {
            method: 'GET',
            headers: header
        }).then(res => res.json())
            .catch((error: RespuestaPeticion) => error)
            .then((response: RespuestaPeticion) => response);
    }
}