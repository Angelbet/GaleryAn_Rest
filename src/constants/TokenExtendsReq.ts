import { Request } from "express";

export interface TokenExtendsReq extends Request {
    tokenData: string
}