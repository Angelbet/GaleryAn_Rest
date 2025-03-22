import Log from './Log'

const propsResponse = {
    code: {
        ok: "00",
        error: "01",
        unautharized: "41",
        sessionActive: "04",
        timeout: "99"
    }
}

export const DescriptionMessageResponse = {
    DUPLIC_DATA: 'Los datos suministrados estan duplicados.',
    ERROR: 'Hubo un error, por favor intente mas tarde',
    OK: (msg: string = "Solicitud realizada correctamente") => (msg),
    NOT_FOUND_EMPTY: 'Lo sentimos, No se ha encontrado resultados',
    ACCESS_DENIED: 'Acceso denegado',
}

export interface IResponse {
    code: string,
    message: string,
    data: any
}

export class EstructResponse {

    static ok(message: string, data: any = null) {
        return {
            code: propsResponse.code.ok,
            message,
            data
        }
    }

    static error(message: string, error: any) {
        Log.debug('[ERROR]: ', error)
        Log.debug('[ERR_MESSAGE]: ', message)

        return {
            code: propsResponse.code.error,
            message,
            data: null
        }
    }

    static unautharized(message: string, data: any = null) {
        Log.debug('[USER UNAUTHARIZED]: ', message)

        return {
            code: propsResponse.code.unautharized,
            message,
            data
        }
    }

    static sessionActive(message: string, data: any = null) {
        Log.debug('[USER SESSION ACTIVE]: ', message)

        return {
            code: propsResponse.code.sessionActive,
            message,
            data
        }
    }

    static timeout(message: string, error: any = null) {
        Log.debug("[TIMEOUT]", error)

        return {
            code: propsResponse.code.timeout,
            message,
            data: null
        }
    }

}