import { Injectable } from '@nestjs/common';
import { TimeMs } from 'src/utils/TimeMs';
import { EventDto } from './dto/Event.dto';
import { DatabaseService, IResponseDatabase } from 'src/database/database.service';
import ConfigEnv from 'src/ConfigEnv';
import Log from 'src/utils/Log';
import { IFillMissingInformationEvent } from './dto/IFillMissingInformationEvent';

@Injectable()
export class GaleryanService extends TimeMs {
    constructor(
        private dbService: DatabaseService
    ) { super('GaleryanService'); }

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

}
