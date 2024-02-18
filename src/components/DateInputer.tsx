import { ChangeEvent, useState } from "react";
import { useAtom } from "jotai";
import { countTimerAtom, remandViewAtom } from "../ts/atom";
import { RemandViewer } from "./RemandViewer";
import { useCountActionJudgement } from "../hooks/useCountActionJudgement";
import { countTimerType } from "../ts/countTimerType";

export const DateInputer = () => {
    let timeInterval: number = 0; // state 管理しようとすると無理だったので props 渡しで一時しのぎ

    const [countTimer, setCountTimer] = useAtom(countTimerAtom);
    const [remandView] = useAtom(remandViewAtom);

    const { countAction_Judgement } = useCountActionJudgement();

    const [isInputVal, setInputVal] = useState<string>('');
    const handleInput = (inputVal: string) => {
        console.log(inputVal);
        setInputVal((_prevInputVal) => inputVal);

        const splitDateTime = inputVal.split('-');
        const userSelectedHoursMinutes = [...splitDateTime][splitDateTime.length - 1].split('T')[1].split(':');

        const userSelectedYear = splitDateTime[0];
        const userSelectedMonth = splitDateTime[1];
        const userSelectedDayDate = [...splitDateTime][splitDateTime.length - 1].split('T')[0];
        const userSelectedHours = userSelectedHoursMinutes[0];
        const userSelectedMinutes = userSelectedHoursMinutes[1];

        const newCountTimerItem: countTimerType = {
            year: userSelectedYear,
            month: userSelectedMonth,
            dayDate: userSelectedDayDate,
            hour: userSelectedHours,
            minute: userSelectedMinutes
        }
        console.log(newCountTimerItem);
        setCountTimer((_prevCountTimer) => newCountTimerItem);
    }

    const handleClick = () => {
        console.log(countTimer, timeInterval);
        if (timeInterval) clearInterval(timeInterval);

        if (countTimer !== null) {
            countAction_Judgement(timeInterval);
        }
    }

    console.log(countTimer);

    return (
        <>
            <input id="datetime" type="datetime-local" value={isInputVal} onInput={(inputVal: ChangeEvent<HTMLInputElement>) => handleInput(inputVal.target.value)} />
            <button type="button" id="runBtn" onClick={handleClick}>run</button>
            {remandView && <RemandViewer />}
        </>
    );
}