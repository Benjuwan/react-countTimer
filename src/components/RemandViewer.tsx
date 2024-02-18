import { useAtom } from "jotai"
import { countTimerAtom } from "../ts/atom"

export const RemandViewer = () => {
    const [countTimer] = useAtom(countTimerAtom);

    return (
        <div id="result">
            <p>残り：
                <span>{countTimer?.year}</span>年
                <span>{countTimer?.month}</span>ヶ月
                <span>{countTimer?.dayDate}</span>日
                <span>{countTimer?.hour}</span>：<span>{countTimer?.minute}</span>：<span>{countTimer?.second}</span>
            </p>
        </div>
    );
}