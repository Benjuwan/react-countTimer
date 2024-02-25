export const useRemandCalcHoursMinutes = () => {
    const remandCalc_Hours = (
        userSelectedYear: string,
        thisYear: number,
        userSelectedMonth: string,
        thisMonth: number,
        userSelectedHours: string,
        maxHours: number
    ) => {
        const isFutureYear: boolean = parseInt(userSelectedYear) > thisYear;
        const isFutureMonths: boolean = parseInt(userSelectedMonth) > thisMonth;
        const nowHours: number = new Date().getHours();
        let calcValue: number = 0;

        if (isFutureYear) {
            if (parseInt(userSelectedHours) - nowHours >= 0) {
                calcValue = parseInt(userSelectedHours) + (maxHours - nowHours);
            } else {
                calcValue = maxHours + (parseInt(userSelectedHours) - nowHours);
            }
        } else {
            if (isFutureMonths) {
                if (parseInt(userSelectedHours) - nowHours >= 0) {
                    calcValue = parseInt(userSelectedHours) + (maxHours - nowHours);
                } else {
                    calcValue = maxHours + (parseInt(userSelectedHours) - nowHours);
                }
            } else {
                calcValue = parseInt(userSelectedHours) - nowHours;
            }
        }

        return calcValue;
    }

    const remandCalc_Minutes: (userSelectedMonth: string, thisMonth: number, userSelectedMinutes: string, maxMinutes: number) => number = (
        userSelectedMonth: string,
        thisMonth: number,
        userSelectedMinutes: string,
        maxMinutes: number
    ) => {
        const isFutureMonths: boolean = parseInt(userSelectedMonth) > thisMonth;
        const nowMinutes: number = new Date().getMinutes();
        let calcValue: number = 0;

        if (isFutureMonths) {
            calcValue = parseInt(userSelectedMinutes) + (maxMinutes - nowMinutes);
        } else {
            const calc = parseInt(userSelectedMinutes) - nowMinutes;
            if (calc < 0) calcValue = maxMinutes + calc;
            else calcValue = calc;
        }

        return calcValue;
    }

    return { remandCalc_Hours, remandCalc_Minutes }
}