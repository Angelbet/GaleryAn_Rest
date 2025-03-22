import { TimeValidation } from "./Timer";

export class TimeMs {
    private timeValidation;
    private clazzName: string
    private processChild: string;

    constructor(clazzName: string) {
        this.clazzName = clazzName;
    }

    protected initTimeValidation(processChild: string) {
        this.timeValidation = TimeValidation()
        this.processChild = processChild;
    }

    protected getTimeValidation() {
        return `[${this.clazzName}.${this.processChild ?? ''}] ` + this.timeValidation.getTimeValidation();
    }

    protected getClazzName(processChild: string) {
        return `[${this.clazzName}.${processChild ?? ''}] `;
    }
}