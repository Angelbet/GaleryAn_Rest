import { ITokenData } from "src/manager-auth/ITokenData";
import { IBuilGaleryan } from "./IBuildGaleryan.dto";
import { eTypePackage } from "../enums/eTypePackage";

export interface EventDto extends ITokenData {
    buildGaleryan: IBuilGaleryan;
    typePackage?: eTypePackage
}