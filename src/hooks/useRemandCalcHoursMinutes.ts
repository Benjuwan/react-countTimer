export const useRemandCalcHoursMinutes = () => {
    const remandCalc_HoursMinutes: (userSelectedMonth: string, thisMonth: number, userSelectedValue: string, defaultValue: number, hoursBool?: boolean) => number = (
        userSelectedMonth: string,
        thisMonth: number,
        userSelectedValue: string,
        defaultValue: number,
        hoursBool: boolean = false
    ) => {
        const isFutureMonths: number = parseInt(userSelectedMonth) - thisMonth;
        const nowHours: number = new Date().getHours();
        const nowMinutes: number = new Date().getMinutes();
        let calcValue: number = 0;

        if (isFutureMonths >= 1) {
            if (hoursBool) calcValue = parseInt(userSelectedValue) + (defaultValue - nowHours);
            else calcValue = parseInt(userSelectedValue) + (defaultValue - nowMinutes);
        } else {
            if (hoursBool) calcValue = parseInt(userSelectedValue) - nowHours;
            else {
                const calc = parseInt(userSelectedValue) - nowMinutes;
                if (calc < 0) calcValue = defaultValue + calc;
                else calcValue = calc;
            }
        }

        if (calcValue <= 1) return 0;
        else return calcValue;
    }

    return { remandCalc_HoursMinutes }
}