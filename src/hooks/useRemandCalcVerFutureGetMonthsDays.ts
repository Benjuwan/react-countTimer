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

        const thisMonthFinalDayDate: number = new Date(thisYear, thisMonth, 0).getDate(); // 当年当月の最終日付け
        const today: number = new Date().getDate(); // 本日

        /* 今月に対して（未来の）過去月を指定した場合 */
        const isFuture_but_pastMonthsAgainstThisMonths: boolean = parseInt(userSelectedMonth) <= thisMonth;
        if (isFuture_but_pastMonthsAgainstThisMonths) {
            const justNextYear: boolean = parseInt(userSelectedYear) - thisYear === 1;
            const monthsAndDays: monthsAndDaysType = {
                year: justNextYear ? 0 : parseInt(userSelectedYear) - thisYear,
                months: 0,
                days: 0
            }

            const isJanuary: boolean = parseInt(userSelectedMonth) === 1; // 1月のみなのか当月より過去月を含んでいくのか要検証（parseInt(userSelectedMonth) === 1 or parseInt(userSelectedMonth) >= 1）
            let firstMonthReplaceRemandDays: number[] = [];
            if (isJanuary) {
                const remandDayForReplace: number = thisMonthFinalDayDate - today;
                firstMonthReplaceRemandDays = [...thisYearRemandMonths];
                firstMonthReplaceRemandDays.splice(0, 1, remandDayForReplace); // 先頭部分を残りの日数に置換
                // console.log(firstMonthReplaceRemandDays);
            }
            const targetMonths: number[] = isJanuary ? [...firstMonthReplaceRemandDays, ...futureTargetMonths] : [...thisYearRemandMonths, ...futureTargetMonths];
            const targetDays: number = targetMonths.reduce((acuu, curr) => acuu + curr);

            const userSelectedMonthFinalDayDate: number = new Date(parseInt(userSelectedYear), parseInt(userSelectedMonth), 0).getDate();
            const remandDays: number = parseInt(userSelectedDayDate) + (userSelectedMonthFinalDayDate - today);
            const resultDays: number = targetDays + remandDays;

            if (resultDays > 365) {
                monthsAndDays.days = resultDays - 365;
                const nextYear: boolean = parseInt(userSelectedYear) - thisYear >= 1;
                monthsAndDays.year = nextYear ? parseInt(userSelectedYear) - thisYear : 0;
            } else {
                monthsAndDays.days = resultDays;
            }

            return monthsAndDays; // return で処理終了
        }

        const remandDays: number = parseInt(userSelectedDayDate) + (thisMonthFinalDayDate - today);

        const monthsAndDays: monthsAndDaysType = {
            months: futureTargetMonths.length - 1,
            days: remandDays
        }

        return monthsAndDays;
    }

    return { remandCalcVerFuture_GetMonthsDays }
}