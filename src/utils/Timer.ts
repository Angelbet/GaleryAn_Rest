export function TimeValidation() {
    let timeStart = new Date().getTime();

    return {
        getTimeValidation: () => {
            const diffMilliseconds = new Date(new Date().getTime() - timeStart).getTime()
            return Math.abs(diffMilliseconds) + 'ms';
        },

        awaitTime: async (milliseconds: number) => {
            await new Promise((res) => setTimeout(() => {
                res("")
            }, milliseconds))
        }
    }
}