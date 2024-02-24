import { countTimerType } from "../ts/countTimerType";

export const useInputValSplitUserSelectedTime = () => {
    const inputValSplitUserSelectedTime: (isInputVal: string) => countTimerType = (isInputVal: string) => {
        const splitDateTime = isInputVal.split('-');
        const userSelectedHoursMinutes = [...splitDateTime][splitDateTime.length - 1].split('T')[1].split(':');
        const userSelectedYear = splitDateTime[0];
        const userSelectedMonth = splitDateTime[1];
        const userSelectedDayDate = [...splitDateTime][splitDateTime.length - 1].split('T')[0];
        const userSelectedHours = userSelectedHoursMinutes[0];
        const userSelectedMinutes = userSelectedHoursMinutes[1];

        const userSelectedTimeObj: countTimerType = {
            year: userSelectedYear,
            month: userSelectedMonth,
            dayDate: userSelectedDayDate,
            hour: userSelectedHours,
            minute: userSelectedMinutes
        };

        return userSelectedTimeObj;
    }

    return { inputValSplitUserSelectedTime }
}