export const useRemandCalcDayDate = () => {
    const remandCalc_DayDate = (
        userSelectedYear: string,
        userSelectedMonth: string,
        thisMonth: number,
        userSelectedDayDate: string,
    ) => {
        const isFutureMonths = parseInt(userSelectedMonth) - thisMonth;
        if (isFutureMonths >= 1) {
            const thisMonthFinalDayDate = new Date(parseInt(userSelectedYear), thisMonth, 0).getDate();
            const today = new Date().getDate();
            return parseInt(userSelectedDayDate) + (thisMonthFinalDayDate - today);
        } else {
            return isFutureMonths;
        }
    }

    return { remandCalc_DayDate }
}