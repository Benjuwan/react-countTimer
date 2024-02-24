import { countTimerType } from "../ts/countTimerType";
import { useAtom } from "jotai";
import { countTimerAtom, remandViewAtom, timeIntervalAtom } from "../ts/atom";
import { useRemandCalc } from "./useRemandCalc";
import { useRemandCalcDayDate } from "./useRemandCalcDayDate";
import { useRemandCalcHoursMinutes } from "./useRemandCalcHoursMinutes";
import { useRemandCalcSeconds } from "./useRemandCalcSeconds";
import { useInputValSplitUserSelectedTime } from "./useInputValSplitUserSelectedTime";

export const useCountTimerAction = () => {
    const [, setTimeInterval] = useAtom(timeIntervalAtom);
    const [, setCountTimer] = useAtom(countTimerAtom);
    const [, setRemandView] = useAtom(remandViewAtom);
    const { inputValSplitUserSelectedTime } = useInputValSplitUserSelectedTime();

    const countTimerAction: (isInputVal: string) => void = (isInputVal: string) => {
        const userSelectedTimeObj: countTimerType = inputValSplitUserSelectedTime(isInputVal);

        const thisYear = new Date().getFullYear();
        const thisMonth = new Date().getMonth() + 1;

        const { remandCalc } = useRemandCalc();
        const { remandCalc_DayDate } = useRemandCalcDayDate();
        const { remandCalc_HoursMinutes } = useRemandCalcHoursMinutes();
        const { remandCalc_Seconds } = useRemandCalcSeconds();

        const currTimeInterval: number = setInterval(() => {
            const remandTime_Year = remandCalc(userSelectedTimeObj.year, thisYear);
            const remandTime_Month = remandCalc(userSelectedTimeObj.month, thisMonth);
            const remandTime_DayDate = remandCalc_DayDate(userSelectedTimeObj.year, userSelectedTimeObj.month, thisMonth, userSelectedTimeObj.dayDate);
            const remandTime_Hours = remandCalc_HoursMinutes(userSelectedTimeObj.month, thisMonth, userSelectedTimeObj.hour, 24, true);
            const remandTime_Minutes = remandCalc_HoursMinutes(userSelectedTimeObj.month, thisMonth, userSelectedTimeObj.minute, 60);
            const theSeconds = remandCalc_Seconds();

            if (
                remandTime_Year === 0 &&
                remandTime_Month === 0 &&
                remandTime_DayDate === 0 &&
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
                dayDate: remandTime_DayDate.toString(),
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