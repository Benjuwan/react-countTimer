import { ChangeEvent, useState } from "react";
import { useAtom } from "jotai";
import { countTimerAtom, remandViewAtom } from "../ts/atom";
import { RemandViewer } from "./RemandViewer";
import { useCountActionJudgement } from "../hooks/useCountActionJudgement";
import { countTimerType } from "../ts/countTimerType";

export const DateInputer = () => {
    const [countTimer, setCountTimer] = useAtom(countTimerAtom);
    const [remandView] = useAtom(remandViewAtom);

    const { countAction_Judgement } = useCountActionJudgement();

    const [isInputVal, setInputVal] = useState<string>('');
    const handleInput = (inputVal: string) => {
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
        setCountTimer((_prevCountTimer) => newCountTimerItem);
    }

    const handleClick = () => {
        if (countTimer !== null) countAction_Judgement(isInputVal);
    }

    return (
        <>
            <input id="datetime" type="datetime-local" value={isInputVal} onInput={(inputVal: ChangeEvent<HTMLInputElement>) => handleInput(inputVal.target.value)} />
            <button type="button" id="runBtn" onClick={handleClick}>run</button>
            {remandView && <RemandViewer />}
        </>
    );
}