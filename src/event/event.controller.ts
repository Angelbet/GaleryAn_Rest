import { Body, Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { EventDto } from 'src/galeryan/dto/Event.dto';
import { ManagerAuthService } from 'src/manager-auth/ManagerAuth.service';
import { TimeMs } from 'src/utils/TimeMs';
import { EventService } from './event.service';
import Log from 'src/utils/Log';
import { Request, Response } from 'express';
import { DescriptionMessageResponse, EstructResponse } from 'src/utils/Response.utils';
import { IFillMissingInformationEvent } from 'src/galeryan/dto/IFillMissingInformationEvent';
import { IModifidEvents } from './interfaces/IModifidEvents';
import { IModifidCategories } from './interfaces/IModifidCategories';
import Debugger from 'src/utils/Debugger';

@Controller('/api/v1/event')
export class EventController extends TimeMs {

    private debug: Debugger

    constructor(
        private eventService: EventService,
        private mhs: ManagerAuthService
    ) {
        super('EventController')
        this.debug = new Debugger('EventController')
    }

    @Post('/add-event')
    async addEvent(@Body() data: EventDto, @Req() req: Request, @Res() res: Response) {
        super.initTimeValidation('add-event')

        try {
            const tokenData = await this.mhs.isValidToken(req.headers.authorization)

            if (!tokenData) {
                Log.debug(super.getTimeValidation())
                res.status(HttpStatus.BAD_REQUEST).json(EstructResponse.error(DescriptionMessageResponse.ERROR, null))
                return
            }

            data.userId = tokenData.userId;
            const saved = await this.eventService.addEvent(data)

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
            const tokenData = await this.mhs.isValidToken(req.headers.authorization)

            if (!tokenData) {
                Log.debug(super.getTimeValidation())
                res.status(HttpStatus.BAD_REQUEST).json(EstructResponse.error(DescriptionMessageResponse.ERROR, null))
                return
            }

            const saved = await this.eventService.fillMissingInformationEvent(data)

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

    @Post('/modifid-events')
    async modifidEvents(@Body() data: IModifidEvents, @Req() req: Request, @Res() res: Response) {
        super.initTimeValidation('modifid-events')

        try {
            const tokenData = await this.mhs.isValidToken(req.headers.authorization)

            if (!tokenData) {
                Log.debug(super.getTimeValidation())
                res.status(HttpStatus.BAD_REQUEST).json(EstructResponse.error(DescriptionMessageResponse.ERROR, null))
                return
            }

            const isAdded = await this.eventService.modifidEvents(data)

            if (!isAdded) {
                Log.debug("No se pudo registrar el modifid event.")
                res.status(HttpStatus.OK).json(EstructResponse.error(DescriptionMessageResponse.ERROR, { isAdded }))
                return
            }

            res.status(HttpStatus.OK).json(EstructResponse.ok(DescriptionMessageResponse.OK(), { isAdded }))

        } catch (error) {
            Log.debug(error.message, error)
            Log.debug(super.getTimeValidation())
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(EstructResponse.error(DescriptionMessageResponse.ERROR, { saved: false }))
        }
    }

    @Post('/modifid-categories')
    async modifidCategories(@Body() data: IModifidCategories, @Req() req: Request, @Res() res: Response) {
        super.initTimeValidation('modifid-categories')
        this.debug.setProcessChild('modifid-categories')
        this.debug.log("Entrada:", data)

        try {
            const tokenData = await this.mhs.isValidToken(req.headers.authorization)

            if (!tokenData) {
                Log.debug(super.getTimeValidation())
                res.status(HttpStatus.BAD_REQUEST).json(EstructResponse.error(DescriptionMessageResponse.ERROR, null))
                return
            }

            const isAdded = await this.eventService.modifidCategories(data)

            if (!isAdded) {
                this.debug.log("No se pudo registrar el modifid categories.")
                res.status(HttpStatus.OK).json(EstructResponse.error(DescriptionMessageResponse.ERROR, { isAdded }))
                return
            }

            res.status(HttpStatus.OK).json(EstructResponse.ok(DescriptionMessageResponse.OK(), { isAdded }))

        } catch (error) {
            Log.debug(error.message, error)
            Log.debug(super.getTimeValidation())
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(EstructResponse.error(DescriptionMessageResponse.ERROR, { saved: false }))
        }
    }
}
