import { eTypeItem } from "../enums/eTypeItem";

export interface EventItemDto {
    typeItem: eTypeItem
    title: string;
    description: string;
    priceUSD: number;

    // POR SI UN ITEM NECESITA CANTIDADES
    count?: number; // CONTEO DE ELECCION
    maxCount?: number // CANTIDAD MAXIMA DE ELECCION
    discount: number; // PORCENTAJE
}