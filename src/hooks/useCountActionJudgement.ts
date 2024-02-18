import { useCountTimerAction } from "./useCountTimerAction";

export const useCountActionJudgement = () => {
    const { countTimerAction } = useCountTimerAction();

    const countAction_Judgement = (
        timeInterval: number,
        userSelectedYear: string,
        userSelectedMonth: string,
        userSelectedDayDate: string,
        userSelectedHours: string,
        userSelectedMinutes: string
    ) => {
        const thisYear = new Date().getFullYear();
        const thisMonth = new Date().getMonth() + 1;
        const today = new Date().getDate();
        const nowHours = new Date().getHours();
        const nowMinutes = new Date().getMinutes();

        const currentNumber = [thisYear, thisMonth, today, nowHours, nowMinutes];

        const userSelectedValue = `${parseInt(userSelectedYear)}${parseInt(userSelectedMonth)}${parseInt(userSelectedDayDate)}${parseInt(userSelectedHours)}${parseInt(userSelectedMinutes)}`;
        console.log(currentNumber.join(''), userSelectedValue);

        if (parseInt(currentNumber.join('')) >= parseInt(userSelectedValue)) {
            alert('過去は選択できません');
            return;
        } else {
            countTimerAction(timeInterval, userSelectedYear, userSelectedMonth, userSelectedDayDate, userSelectedHours, userSelectedMinutes);
        }
    }

    return { countAction_Judgement }
}