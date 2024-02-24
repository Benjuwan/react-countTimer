import { useAtom } from "jotai";
import { countTimerAtom, timeIntervalAtom } from "../ts/atom";
import { useCountTimerAction } from "./useCountTimerAction";

export const useCountActionJudgement = () => {
    const [timeInterval, setTimeInterval] = useAtom(timeIntervalAtom);
    const [countTimer] = useAtom(countTimerAtom);
    const { countTimerAction } = useCountTimerAction();

    const countAction_Judgement: (isInputVal: string) => void = (isInputVal: string) => {
        const splitDateTime = isInputVal.split('-');
        const userSelectedHoursMinutes = [...splitDateTime][splitDateTime.length - 1].split('T')[1].split(':');
        const userSelectedYear = splitDateTime[0];
        const userSelectedMonth = splitDateTime[1];
        const userSelectedDayDate = [...splitDateTime][splitDateTime.length - 1].split('T')[0];
        const userSelectedHours = userSelectedHoursMinutes[0];
        const userSelectedMinutes = userSelectedHoursMinutes[1];

        const thisYear = new Date().getFullYear();
        const thisMonth = new Date().getMonth() + 1;
        const today = new Date().getDate();
        const nowHours = new Date().getHours();
        const nowMinutes = new Date().getMinutes();

        const currentNumber = [thisYear, thisMonth, today, nowHours, nowMinutes];

        if (countTimer !== null) {
            const userSelectedValue = `${parseInt(userSelectedYear)}${parseInt(userSelectedMonth)}${parseInt(userSelectedDayDate)}${parseInt(userSelectedHours)}${parseInt(userSelectedMinutes)}`;
            console.log(currentNumber.join(''), userSelectedValue);

            if (parseInt(currentNumber.join('')) >= parseInt(userSelectedValue)) {
                alert('過去は選択できません');
                return;
            } else {
                if (timeInterval !== null) clearInterval(timeInterval);
                setTimeInterval(null);
                countTimerAction(isInputVal);
            }
        }
    }

    return { countAction_Judgement }
}