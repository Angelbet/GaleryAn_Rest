import { Injectable } from "@nestjs/common";
import { TimeMs } from "src/utils/TimeMs";
import { ITokenData } from "./ITokenData";
import ConfigEnv from "src/ConfigEnv";
import { HttpService } from "@nestjs/axios";
import { IResponseDatabase } from "src/database/database.service";
import Log from "src/utils/Log";

@Injectable()
export class ManagerAuthService extends TimeMs {
    constructor(
        private axios: HttpService
    ) {
        super("ManagerAuthService")
    }

    async isValidToken(token: string): Promise<ITokenData> | null {
        try {
            token = this.extractTokenFromHeader(token);
            const url = ConfigEnv().qa.token_valid
            const resData = await this.axios.axiosRef.post(url, { token })

            const response: IResponseDatabase = resData.data
            const tokenData: ITokenData = response.data

            if (!tokenData) {
                Log.debug('token invalido', { tokenData })
                Log.debug(super.getTimeValidation())
                // res.status(HttpStatus.BAD_REQUEST).json(EstructResponse.error(DescriptionMessageResponse.ERROR, null))
                return null
            }
            
            return tokenData
            
        } catch (error) {
            Log.debug(error.message, error)
            return null
        }
    }

    private extractTokenFromHeader(token: string): string | undefined {
        const [type, _token] = token.split(' ') ?? [];
        return type === 'Bearer' ? _token : undefined;
      }
}