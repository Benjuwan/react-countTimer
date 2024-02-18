import { countTimerType } from "../ts/countTimerType";
import { useAtom } from "jotai";
import { countTimerAtom, remandViewAtom } from "../ts/atom";
import { useRemandCalc } from "./useRemandCalc";
import { useRemandCalcDayDate } from "./useRemandCalcDayDate";
import { useRemandCalcHoursMinutes } from "./useRemandCalcHoursMinutes";
import { useRemandCalcSeconds } from "./useRemandCalcSeconds";

export const useCountTimerAction = () => {
    const [countTimer, setCountTimer] = useAtom(countTimerAtom);
    const [, setRemandView] = useAtom(remandViewAtom);

    const countTimerAction = (
        timeInterval: number
    ) => {
        const thisYear = new Date().getFullYear();
        const thisMonth = new Date().getMonth() + 1;

        const { remandCalc } = useRemandCalc();
        const { remandCalc_DayDate } = useRemandCalcDayDate();
        const { remandCalc_HoursMinutes } = useRemandCalcHoursMinutes();
        const { remandCalc_Seconds } = useRemandCalcSeconds();

        timeInterval = setInterval(() => {
            if (countTimer !== null) {
                const remandTime_Year = remandCalc(countTimer.year, thisYear);
                const remandTime_Month = remandCalc(countTimer.month, thisMonth);
                const remandTime_DayDate = remandCalc_DayDate(countTimer.year, countTimer.month, thisMonth, countTimer.dayDate);
                const remandTime_Hours = remandCalc_HoursMinutes(countTimer.month, thisMonth, countTimer.hour, 24, true);
                const remandTime_Minutes = remandCalc_HoursMinutes(countTimer.month, thisMonth, countTimer.minute, 60);
                const theSeconds = remandCalc_Seconds();

                if (
                    remandTime_Year === 0 &&
                    remandTime_Month === 0 &&
                    remandTime_DayDate === 0 &&
                    remandTime_Hours === 0 &&
                    remandTime_Minutes === 0 &&
                    theSeconds === 0
                ) {
                    clearInterval(timeInterval);
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
                setRemandView(true);
            }
        }, 1000);
    }

    return { countTimerAction }
}