import { HttpService } from '@nestjs/axios';
import { Injectable, RequestMethod } from '@nestjs/common';
import { AxiosError, AxiosRequestConfig } from 'axios';
import Log from 'src/utils/Log';
import { IResponse } from 'src/utils/Response.utils';

export interface IResponseDatabase {
    message: string;
    code: string;
    data: any;
}

@Injectable()
export class DatabaseService {

    constructor(
        private axios: HttpService
    ) { }

    async requestDB(api: string, body?: any, options?: AxiosRequestConfig): Promise<IResponseDatabase> {
        let response: IResponse;
        try {
            const res = await this.axios.axiosRef({
                method: options.method || 'GET',
                url: api,
                data: body
            })
            response = res.data

            return response

        } catch (error) {
            if (error instanceof AxiosError) {
                Log.debug(error.message)
                return
            }
            return
        }

    }



}
