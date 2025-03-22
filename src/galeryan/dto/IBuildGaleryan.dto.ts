import { eStatusCode } from "../enums/eStatusCode";
import { eTypePackage } from "../enums/eTypePackage";
import { EventItemDto } from "./EventItem.dto";

export interface IBuilGaleryan {
    status?: eStatusCode;
    typePackage: eTypePackage;
    total: number;
    items: Array<EventItemDto>
    discount: number; // PORCENTAJE
}