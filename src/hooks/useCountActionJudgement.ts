import { useAtom } from "jotai";
import { countTimerAtom, timeIntervalAtom } from "../ts/atom";
import { useCountTimerAction } from "./useCountTimerAction";
import { useInputValSplitUserSelectedTime } from "./useInputValSplitUserSelectedTime";

export const useCountActionJudgement = () => {
    const [timeInterval, setTimeInterval] = useAtom(timeIntervalAtom);
    const [countTimer] = useAtom(countTimerAtom);
    const { countTimerAction } = useCountTimerAction();
    const { inputValSplitUserSelectedTime } = useInputValSplitUserSelectedTime();

    const countAction_Judgement: (isInputVal: string) => void = (isInputVal: string) => {
        const userSelectedTimeObj = inputValSplitUserSelectedTime(isInputVal);

        const thisYear = new Date().getFullYear();
        const thisMonth = new Date().getMonth() + 1;
        const today = new Date().getDate();
        const nowHours = new Date().getHours();
        const nowMinutes = new Date().getMinutes();

        const currentNumber = [thisYear, thisMonth, today, nowHours, nowMinutes];

        if (countTimer !== null) {
            const userSelectedValue = `${parseInt(userSelectedTimeObj.year)}${parseInt(userSelectedTimeObj.month)}${parseInt(userSelectedTimeObj.dayDate)}${parseInt(userSelectedTimeObj.hour)}${parseInt(userSelectedTimeObj.minute)}`;

            console.log(currentNumber.join(''), userSelectedValue);
            console.log(parseInt(currentNumber.join('')), parseInt(userSelectedValue));

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