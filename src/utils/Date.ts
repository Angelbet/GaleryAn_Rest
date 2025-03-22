// const DateUtils = {}

const DateUtils = () => {
    const getDiffDateForDays = (d1: Date, d2: Date): number => {
        const millis1 = d1.getTime()
        const millis2 = d2.getTime()

        const diffMillis = millis2 - millis1

        const diffDays = diffMillis / 1000 / 60 / 60 / 24
        return Math.abs(diffDays)
    }

    const getDiffDateCurrent = (d2: Date): number => {
        const diffDays = getDiffDateForDays(d2, new Date())
        return diffDays;
    }

    const getDiffDateForYear = (d1: Date, d2: Date): number => {
        const diffDays = getDiffDateForDays(d1, d2)

        return diffDays / 360;
    }

    const getDiffDateCurrentYear = (d2: Date): number => {
        const diffDays = getDiffDateForDays(new Date(d2), new Date())

        return Math.floor(diffDays / 360);
    }

    return {
        getDiffDateForDays,
        getDiffDateCurrent,
        getDiffDateForYear,
        getDiffDateCurrentYear
    }
}

export default DateUtils