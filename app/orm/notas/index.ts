import { M_NOTA } from "./nota.model";
import { M_ETIQUETAS } from "./etiquetas.model";
import { M_NOTAS_ETIQUETAS } from "./notas_etiquetas.model";
import { Model } from "sequelize";

export const MODULE_NOTES_CLASSES: any[] = [
    M_NOTA,
    M_ETIQUETAS,
    M_NOTAS_ETIQUETAS
];