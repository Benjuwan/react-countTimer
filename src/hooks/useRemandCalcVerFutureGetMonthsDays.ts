import { monthsAndDaysType } from "../ts/countTimerType";

export const useRemandCalcVerFutureGetMonthsDays = () => {
    const remandCalcVerFuture_GetMonthsDays: (userSelectedYear: string, userSelectedMonth: string, userSelectedDayDate: string, thisYear: number, thisMonth: number) => monthsAndDaysType = (
        userSelectedYear: string,
        userSelectedMonth: string,
        userSelectedDayDate: string,
        thisYear: number,
        thisMonth: number
    ) => {
        /* 指定した月に対する「今年の残り月」 */
        const thisYearRemandMonths: number[] = [];
        for (let i = parseInt(userSelectedMonth) + 1; i <= 12; i++) {
            const finalDayDate = new Date(thisYear, i, 0).getDate();
            thisYearRemandMonths.push(finalDayDate);
        }

        /* 指定した月に対する「来年の経過対象月」 */
        const futureTargetMonths: number[] = [];
        for (let i = 1; i < parseInt(userSelectedMonth); i++) {
            const finalDayDate = new Date(parseInt(userSelectedYear), i, 0).getDate();
            futureTargetMonths.push(finalDayDate);
        }
        // console.log(thisYearRemandMonths, futureTargetMonths);

        /* 今月に対して（未来の）過去月を指定した場合 */
        const isFuture_but_pastMonthsAgainstThisMonths: boolean = parseInt(userSelectedMonth) <= thisMonth;
        if (isFuture_but_pastMonthsAgainstThisMonths) {
            const monthsAndDays: monthsAndDaysType = {
                year: 0,
                months: 0,
                days: 0
            }

            const targetMonths: number[] = [...thisYearRemandMonths, ...futureTargetMonths];
            const targetDays: number = targetMonths.reduce((acuu, curr) => acuu + curr);
            monthsAndDays.days = targetDays;

            return monthsAndDays; // return で処理終了
        }

        const thisMonthFinalDayDate: number = new Date(parseInt(userSelectedYear), thisMonth, 0).getDate();
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