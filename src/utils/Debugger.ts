export default class Debugger {
    private processChild: string
    private clazz: string

    constructor(clazz: string) {
        this.clazz = clazz
    }

    setProcessChild(func: string) {
        this.processChild = func
    }

    log(message: string, data?: any) {
        const format = `[${new Date().toLocaleDateString()}, ${new Date().toLocaleTimeString()} : ${this.clazz}.${this.processChild}] ${message}`
        console.log(format, data)
    }
}