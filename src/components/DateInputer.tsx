import { ChangeEvent, useState } from "react";
import { useAtom } from "jotai";
import { countTimerAtom } from "../ts/atom";
import { RemandViewer } from "./RemandViewer";
import { useCountActionJudgement } from "../hooks/useCountActionJudgement";

export const DateInputer = () => {
    let timeInterval: number = 0; // state 管理しようとすると無理だったので props 渡しで対応

    const [countTimer, setCountTimer] = useAtom(countTimerAtom);

    const { countAction_Judgement } = useCountActionJudgement();

    const [isInputVal, setInputVal] = useState<string>('');
    const handleInput = (inputVal: string) => {
        setInputVal((_prevInputVal) => inputVal);
    }

    const handleClick = () => {
        console.log(countTimer, timeInterval);
        if (timeInterval) {
            clearInterval(timeInterval);
            setCountTimer(null);
        }

        // console.log(isInputVal);
        const splitDateTime = isInputVal.split('-');
        const userSelectedHoursMinutes = [...splitDateTime][splitDateTime.length - 1].split('T')[1].split(':');

        const userSelectedYear = splitDateTime[0];
        const userSelectedMonth = splitDateTime[1];
        const userSelectedDayDate = [...splitDateTime][splitDateTime.length - 1].split('T')[0];
        const userSelectedHours = userSelectedHoursMinutes[0];
        const userSelectedMinutes = userSelectedHoursMinutes[1];

        countAction_Judgement(timeInterval, userSelectedYear, userSelectedMonth, userSelectedDayDate, userSelectedHours, userSelectedMinutes);
    }

    return (
        <>
            <input id="datetime" type="datetime-local" value={isInputVal} onInput={(inputVal: ChangeEvent<HTMLInputElement>) => handleInput(inputVal.target.value)} />
            <button type="button" id="runBtn" onClick={handleClick}>run</button>
            {countTimer && <RemandViewer />}
        </>
    );
}