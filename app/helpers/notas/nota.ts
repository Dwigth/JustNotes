export interface NOTA {
    id_nota: number;
    titulo: string;
    contenido: string;
    lista: boolean;
    color?: string;
    id_usuario: number;
    fecha_creacion: string;
    fecha_modificacion: string;
}