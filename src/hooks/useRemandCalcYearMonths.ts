export const useRemandCalcYearMonths = () => {
    const remandCalcYear: (userSelectedYear: string, thisYear: number, userSelectedMonth: string, thisMonth: number) => number = (
        userSelectedYear: string,
        thisYear: number,
        userSelectedMonth: string,
        thisMonth: number
    ) => {
        let calcValue: number = parseInt(userSelectedYear) - thisYear;
        const isFuture_but_pastMonthsAgainstThisMonths: boolean = parseInt(userSelectedMonth) <= thisMonth;
        if (isFuture_but_pastMonthsAgainstThisMonths && calcValue === 0) {
            return calcValue;
        } else {
            calcValue = parseInt(userSelectedYear) - thisYear;
            return calcValue;
        }
    }

    const remandCalcMonth: (userSelectedMonth: string, thisMonth: number) => number = (
        userSelectedMonth: string,
        thisMonth: number
    ) => {
        let calcValue: number = 0;
        const isNextMonth: boolean = parseInt(userSelectedMonth) - thisMonth === 1;
        const isFuture_but_pastMonthsAgainstThisMonths: boolean = parseInt(userSelectedMonth) <= thisMonth;
        if (isFuture_but_pastMonthsAgainstThisMonths || isNextMonth) {
            return calcValue;
        } else {
            calcValue = parseInt(userSelectedMonth) - thisMonth;
            return calcValue;
        }
    }

    return { remandCalcYear, remandCalcMonth }
}