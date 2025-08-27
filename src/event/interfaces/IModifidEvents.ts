import { EventDto } from "src/galeryan/dto/Event.dto"
import { IEventSpecific } from "./IEventSpecific"

export interface IModifidEvents {
    eventId: string
    events: Array<IEventSpecific>
}