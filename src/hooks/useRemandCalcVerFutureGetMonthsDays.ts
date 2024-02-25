import { monthsAndDaysType } from "../ts/countTimerType";

export const useRemandCalcVerFutureGetMonthsDays = () => {
    const remandCalcVerFuture_GetMonthsDays: (userSelectedYear: string, userSelectedMonth: string, userSelectedDayDate: string, thisYear: number, thisMonth: number) => monthsAndDaysType = (
        userSelectedYear: string,
        userSelectedMonth: string,
        userSelectedDayDate: string,
        thisYear: number,
        thisMonth: number
    ) => {
        const thisYearRemandMonths: number[] = [];
        for (let i = parseInt(userSelectedMonth) + 1; i <= 12; i++) {
            let targetMonth: number = i;
            if (parseInt(userSelectedMonth) - 1 === 1) {
                targetMonth = + 2;
            }
            const finalDayDate = new Date(thisYear, i, 0).getDate();
            thisYearRemandMonths.push(finalDayDate);
        }

        const futureTargetMonths: number[] = [];
        for (let i = 1; i < parseInt(userSelectedMonth); i++) {
            const finalDayDate = new Date(parseInt(userSelectedYear), i, 0).getDate();
            futureTargetMonths.push(finalDayDate);
        }
        console.log(thisYearRemandMonths, futureTargetMonths);

        /*  */
        if (parseInt(userSelectedMonth) <= thisMonth) {
            const targetMonths: number[] = [...thisYearRemandMonths, ...futureTargetMonths];
            const targetDays: number = targetMonths.reduce((acuu, curr) => acuu + curr);

            const monthsAndDays: monthsAndDaysType = {
                year: 0,
                months: futureTargetMonths.length,
                days: targetDays
            }

            return monthsAndDays;
        }

        const thisMonthFinalDayDate: number = new Date(parseInt(userSelectedYear), thisMonth, 0).getDate();
        console.log(thisMonthFinalDayDate);
        const today: number = new Date().getDate();
        const remandDays: number = parseInt(userSelectedDayDate) + (thisMonthFinalDayDate - today);

        const monthsAndDays: monthsAndDaysType = {
            months: futureTargetMonths.length - 1,
            days: remandDays
        }

        return monthsAndDays;
    }

    return { remandCalcVerFuture_GetMonthsDays }
}