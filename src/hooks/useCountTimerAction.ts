import { countTimerType } from "../ts/countTimerType";
import { useAtom } from "jotai";
import { countTimerAtom, remandViewAtom, timeIntervalAtom } from "../ts/atom";
import { useRemandCalc } from "./useRemandCalc";
import { useRemandCalcDayDate } from "./useRemandCalcDayDate";
import { useRemandCalcHoursMinutes } from "./useRemandCalcHoursMinutes";
import { useRemandCalcSeconds } from "./useRemandCalcSeconds";

export const useCountTimerAction = () => {
    const [, setTimeInterval] = useAtom(timeIntervalAtom);
    const [, setCountTimer] = useAtom(countTimerAtom);
    const [, setRemandView] = useAtom(remandViewAtom);

    const countTimerAction: (isInputVal: string) => void = (isInputVal: string) => {
        const splitDateTime = isInputVal.split('-');
        const userSelectedHoursMinutes = [...splitDateTime][splitDateTime.length - 1].split('T')[1].split(':');
        const userSelectedYear = splitDateTime[0];
        const userSelectedMonth = splitDateTime[1];
        const userSelectedDayDate = [...splitDateTime][splitDateTime.length - 1].split('T')[0];
        const userSelectedHours = userSelectedHoursMinutes[0];
        const userSelectedMinutes = userSelectedHoursMinutes[1];

        const thisYear = new Date().getFullYear();
        const thisMonth = new Date().getMonth() + 1;

        const { remandCalc } = useRemandCalc();
        const { remandCalc_DayDate } = useRemandCalcDayDate();
        const { remandCalc_HoursMinutes } = useRemandCalcHoursMinutes();
        const { remandCalc_Seconds } = useRemandCalcSeconds();

        const currTimeInterval: number = setInterval(() => {
            const remandTime_Year = remandCalc(userSelectedYear, thisYear);
            const remandTime_Month = remandCalc(userSelectedMonth, thisMonth);
            const remandTime_DayDate = remandCalc_DayDate(userSelectedYear, userSelectedMonth, thisMonth, userSelectedDayDate);
            const remandTime_Hours = remandCalc_HoursMinutes(userSelectedMonth, thisMonth, userSelectedHours, 24, true);
            const remandTime_Minutes = remandCalc_HoursMinutes(userSelectedMonth, thisMonth, userSelectedMinutes, 60);
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

            console.log(remandTime_Year, remandTime_Month, remandTime_DayDate, remandTime_Hours, remandTime_Minutes, theSeconds);

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