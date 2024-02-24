import { monthsAndDaysType } from "../ts/countTimerType";

export const useRemandCalcVerFutureGetMonthsDays = () => {
    const remandCalcVerFuture_GetMonthsDays: (userSelectedYear: string, userSelectedMonth: string, userSelectedDayDate: string, thisYear: number, thisMonth: number) => monthsAndDaysType = (
        userSelectedYear: string,
        userSelectedMonth: string,
        userSelectedDayDate: string,
        thisYear: number,
        thisMonth: number
    ) => {
        const thisYearDays: number[] = [];
        for (let i = parseInt(userSelectedMonth) + 1; i <= 12; i++) {
            let targetMonth: number = i;
            if (parseInt(userSelectedMonth) - 1 === 1) {
                targetMonth = + 2;
            }
            const finalDayDate = new Date(thisYear, i, 0).getDate();
            thisYearDays.push(finalDayDate);
        }

        const futureDays: number[] = [];
        for (let i = 1; i < parseInt(userSelectedMonth); i++) {
            const finalDayDate = new Date(parseInt(userSelectedYear), i, 0).getDate();
            futureDays.push(finalDayDate);
        }
        // console.log(thisYearDays, futureDays);

        const targetMonths: number[] = [...thisYearDays, ...futureDays];
        const reduceAry: number = targetMonths.reduce((acuu, curr) => acuu + curr);

        const thisMonthFinalDayDate: number = new Date(parseInt(userSelectedYear), thisMonth, 0).getDate();
        const today: number = new Date().getDate();
        let remandDays: number = parseInt(userSelectedDayDate) + (thisMonthFinalDayDate - today);
        if (reduceAry % 30 !== 0) remandDays = remandDays + Math.floor(reduceAry % 30);

        const monthsAndDays: monthsAndDaysType = {
            months: targetMonths.length,
            days: remandDays
        }

        return monthsAndDays;
    }

    return { remandCalcVerFuture_GetMonthsDays }
}