/**
 * Interfaz de respuesta al cliente
 * @property { error }      - Especifíca si ha ocurrido un error o no durante el procesamiento de la petición.
 * @property { typeError }  - Especifíca el codigo de error de la respuesta de la petición.
 * @property { msg }        - Mensaje de respuesta.
 * @property { data }       - Información de respuesta de la petición.
 */
export interface RespuestaPeticion {
    error?: boolean;
    typeError?: number | string;
    msg?: string;
    data?: {} | any;
    extra?: {};
    [key: string]: any;
}
/**
 * Interfaz para manejar las respuesta a procesos internos
 * @property { error } - Especifica si ha ocurrido un error o no.
 * @property { msg }   - Mensaje de respuesta
 * @property { misc }  - Información adicional que pueda ser procesada.
 * @property { data }  - Información de retorno.
 */
export interface RespuestaInterna {
    error: boolean;
    msg?: string;
    misc?: {};
    data?: {} | any;
}