import { ITokenData } from "src/manager-auth/ITokenData";
import { IBuilGaleryan } from "./IBuildGaleryan.dto";

export interface EventDto extends ITokenData {
    buildGaleryan: IBuilGaleryan
}