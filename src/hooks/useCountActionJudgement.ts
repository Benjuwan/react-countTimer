import { useAtom } from "jotai";
import { countTimerAtom } from "../ts/atom";
import { useCountTimerAction } from "./useCountTimerAction";

export const useCountActionJudgement = () => {
    const [countTimer] = useAtom(countTimerAtom);
    const { countTimerAction } = useCountTimerAction();

    const countAction_Judgement = (
        timeInterval: number
    ) => {
        const thisYear = new Date().getFullYear();
        const thisMonth = new Date().getMonth() + 1;
        const today = new Date().getDate();
        const nowHours = new Date().getHours();
        const nowMinutes = new Date().getMinutes();

        const currentNumber = [thisYear, thisMonth, today, nowHours, nowMinutes];

        if (countTimer !== null) {
            const userSelectedValue = `${parseInt(countTimer.year)}${parseInt(countTimer.month)}${parseInt(countTimer.dayDate)}${parseInt(countTimer.hour)}${parseInt(countTimer.minute)}`;
            console.log(currentNumber.join(''), userSelectedValue);

            if (parseInt(currentNumber.join('')) >= parseInt(userSelectedValue)) {
                alert('過去は選択できません');
                return;
            } else {
                countTimerAction(timeInterval);
            }
        }
    }

    return { countAction_Judgement }
}