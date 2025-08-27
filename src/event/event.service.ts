import { Injectable } from '@nestjs/common';
import ConfigEnv from 'src/ConfigEnv';
import { DatabaseService, IResponseDatabase } from 'src/database/database.service';
import { EventDto } from 'src/galeryan/dto/Event.dto';
import { IFillMissingInformationEvent } from 'src/galeryan/dto/IFillMissingInformationEvent';
import Log from 'src/utils/Log';
import { TimeMs } from 'src/utils/TimeMs';
import { IModifidEvents } from './interfaces/IModifidEvents';
import { IModifidCategories } from './interfaces/IModifidCategories';

@Injectable()
export class EventService extends TimeMs {

    constructor(
        private dbService: DatabaseService
    ) { super('EventService'); }

    async addEvent(data: EventDto): Promise<boolean> {
        try {
            const uri = ConfigEnv().qa.gln_addEvent
            const response: IResponseDatabase = await this.dbService.requestDB(uri, data, {
                method: 'POST',
            })

            if (!response.data.saved) {
                Log.debug('fallo al registrar datos', data)
                Log.debug(super.getClazzName('addEvent'))
                return false
            }

            return response.data.saved

        } catch (error) {
            Log.debug(error.message, error)
            Log.debug(super.getClazzName('addEvent'))
            return false
        }
    }

    async fillMissingInformationEvent(data: IFillMissingInformationEvent) {
        try {
            const response: IResponseDatabase = await this.dbService.requestDB(ConfigEnv().qa.gln_fill_info_event, data, {
                method: "POST",
            })

            if (!response.data.saved) {
                return false;
            }

            return true

        } catch (error) {
            Log.debug(error.message, error)
            Log.debug(super.getClazzName('fillMissingInformationEvent'))
            return false
        }
    }

    async modifidEvents(data: IModifidEvents) {
        const url = ConfigEnv().qa.db_modifid_events

        try {
            const response: IResponseDatabase = await this.dbService.requestDB(url, data, {
                method: "POST"
            })

            if (!response.data.isAdded) {
                return false
            }

            return true

        } catch (error) {
            Log.debug(error.message, error)
            Log.debug(super.getClazzName('modifidEvents'))
            return false
        }
    }

     async modifidCategories(data: IModifidCategories) {
        const url = ConfigEnv().qa.db_modifid_categories

        try {
            const response: IResponseDatabase = await this.dbService.requestDB(url, data, {
                method: "POST"
            })

            if (!response.data.isAdded) {
                return false
            }

            return true

        } catch (error) {
            Log.debug(error.message, error)
            Log.debug(super.getClazzName('modifidEvents'))
            return false
        }
    }
}
