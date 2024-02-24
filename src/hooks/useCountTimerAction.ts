import { countTimerType, monthsAndDaysType } from "../ts/countTimerType";
import { useAtom } from "jotai";
import { countTimerAtom, remandViewAtom, timeIntervalAtom } from "../ts/atom";
import { useRemandCalc } from "./useRemandCalc";
import { useRemandCalcDayDate } from "./useRemandCalcDayDate";
import { useRemandCalcHoursMinutes } from "./useRemandCalcHoursMinutes";
import { useRemandCalcSeconds } from "./useRemandCalcSeconds";
import { useRemandCalcVerFutureGetMonthsDays } from "./useRemandCalcVerFutureGetMonthsDays";
import { useInputValSplitUserSelectedTime } from "./useInputValSplitUserSelectedTime";

export const useCountTimerAction = () => {
    const [, setTimeInterval] = useAtom(timeIntervalAtom);
    const [, setCountTimer] = useAtom(countTimerAtom);
    const [, setRemandView] = useAtom(remandViewAtom);
    const { inputValSplitUserSelectedTime } = useInputValSplitUserSelectedTime();

    const countTimerAction: (isInputVal: string) => void = (isInputVal: string) => {
        const userSelectedTimeObj: countTimerType = inputValSplitUserSelectedTime(isInputVal);

        const thisYear: number = new Date().getFullYear();
        const thisMonth: number = new Date().getMonth() + 1;

        const { remandCalc } = useRemandCalc();
        const { remandCalc_DayDate } = useRemandCalcDayDate();
        const { remandCalc_HoursMinutes } = useRemandCalcHoursMinutes();
        const { remandCalc_Seconds } = useRemandCalcSeconds();
        const { remandCalcVerFuture_GetMonthsDays } = useRemandCalcVerFutureGetMonthsDays();

        const currTimeInterval: number = setInterval(() => {
            const remandTime_Year: number = remandCalc(userSelectedTimeObj.year, thisYear);
            let remandTime_Month: number = remandCalc(userSelectedTimeObj.month, thisMonth);
            let remandTime_Daydate: number = remandCalc_DayDate(userSelectedTimeObj.year, userSelectedTimeObj.month, thisMonth, userSelectedTimeObj.dayDate);
            const remandTime_Hours: number = remandCalc_HoursMinutes(userSelectedTimeObj.month, thisMonth, userSelectedTimeObj.hour, 24, true);
            const remandTime_Minutes: number = remandCalc_HoursMinutes(userSelectedTimeObj.month, thisMonth, userSelectedTimeObj.minute, 60);
            const theSeconds: number = remandCalc_Seconds();

            /* 指定数値が翌年以上の場合の「月」と「日」*/
            if (parseInt(userSelectedTimeObj.year) > thisYear) {
                const remandCalcVerFutureGetMonthsDays: monthsAndDaysType = remandCalcVerFuture_GetMonthsDays(
                    userSelectedTimeObj.year,
                    userSelectedTimeObj.month,
                    userSelectedTimeObj.dayDate,
                    thisYear,
                    thisMonth
                );
                remandTime_Month = remandCalcVerFutureGetMonthsDays.months;
                remandTime_Daydate = remandCalcVerFutureGetMonthsDays.days;
            }

            if (
                remandTime_Year === 0 &&
                remandTime_Month === 0 &&
                remandTime_Daydate === 0 &&
                remandTime_Hours === 0 &&
                remandTime_Minutes === 0 &&
                theSeconds === 0
            ) {
                clearInterval(currTimeInterval);
                setTimeInterval(null);
                setRemandView(false);
                return;
            }

            const newCountTimerItem: countTimerType = {
                year: remandTime_Year.toString(),
                month: remandTime_Month.toString(),
                dayDate: remandTime_Daydate.toString(),
                hour: remandTime_Hours.toString().padStart(2, '0'),
                minute: remandTime_Minutes.toString().padStart(2, '0'),
                second: theSeconds.toString().padStart(2, '0')
            }
            setCountTimer((_prevCountTimer) => newCountTimerItem);
            setTimeInterval((_prevTimeInterval) => currTimeInterval);
            setRemandView(true);
        }, 1000);
    }

    return { countTimerAction }
}