import { Body, Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { TimeMs } from 'src/utils/TimeMs';
import { EventDto } from './dto/Event.dto';
import { GaleryanService } from './galeryan.service';
import Log from 'src/utils/Log';
import { DescriptionMessageResponse, EstructResponse } from 'src/utils/Response.utils';
import ConfigEnv from 'src/ConfigEnv';
import { DatabaseService } from 'src/database/database.service';
import { ManagerAuthService } from 'src/manager-auth/ManagerAuth.service';
import { IFillMissingInformationEvent } from './dto/IFillMissingInformationEvent';

@Controller('/api/v1/galeryan')
export class GaleryanController extends TimeMs {

    constructor(
        private gs: GaleryanService,
        private dbService: DatabaseService,
        private mhs: ManagerAuthService
    ) { super('GaleryanController') }

    @Post('/add-event')
    async addEvent(@Body() data: EventDto, @Req() req: Request, @Res() res: Response) {
        super.initTimeValidation('add-event')

        try {
            const tokenData = await this.mhs.isValidToken(req.headers.authorization)

            if (!tokenData.isAuthenticated) {
                Log.debug('Error en validar token', { data, tokenData })
                Log.debug(super.getTimeValidation())
                res.status(HttpStatus.BAD_REQUEST).json(EstructResponse.error(DescriptionMessageResponse.ERROR, null))
                return
            }

            data.userId = tokenData.userId;
            const saved = await this.gs.addEvent(data)

            // enviar email
            /**************/

            if (!saved) {
                Log.debug(super.getTimeValidation())
                Log.debug('Fallo en registro', data)
                res.status(HttpStatus.BAD_REQUEST).json(EstructResponse.error(DescriptionMessageResponse.ERROR, { saved: false }))
                return
            }

            res.status(HttpStatus.OK).json(EstructResponse.ok(DescriptionMessageResponse.OK(), { saved: saved }))

        } catch (error) {
            Log.debug(error.message, error)
            Log.debug(super.getTimeValidation())
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(EstructResponse.error(DescriptionMessageResponse.ERROR, { saved: false }))
            return
        }

        Log.debug(super.getTimeValidation())
    }

    @Post('/fill-information-event')
    async fillMissingInformationEvent(@Body() data: IFillMissingInformationEvent, @Req() req: Request, @Res() res: Response) {
        super.initTimeValidation('fill-information-event')

        try {
            const { authorization } = req.headers

            const tokenData = await this.mhs.isValidToken(authorization)

            if (!tokenData.isAuthenticated) {
                Log.debug('Error en validar token', { data, tokenData })
                Log.debug(super.getTimeValidation())
                res.status(HttpStatus.BAD_REQUEST).json(EstructResponse.error(DescriptionMessageResponse.ERROR, null))
                return
            }

            const saved = await this.gs.fillMissingInformationEvent(data)

            if (!saved) {
                Log.debug('no se pudo guardar data', data)
                Log.debug(super.getTimeValidation())
                res.status(HttpStatus.BAD_REQUEST).json(EstructResponse.error(DescriptionMessageResponse.ERROR, null));
                return
            }

            

        } catch (error) {
            Log.debug(error.message, error)
            Log.debug(super.getTimeValidation())
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(EstructResponse.error(DescriptionMessageResponse.ERROR, { saved: false }))
            return
        }

        Log.debug(super.getTimeValidation())
    }
}