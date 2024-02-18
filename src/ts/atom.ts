import { atom } from "jotai";
import { countTimerType } from "./countTimerType";

export const remandViewAtom = atom(false);

// const countTimerDefault: countTimerType = {
//     year: '0',
//     month: '0',
//     dayDate: '0',
//     hour: '0',
//     minute: '0',
//     second: '0'
// }

// export const countTimerAtom = atom(countTimerDefault);
export const countTimerAtom = atom<countTimerType | null>(null);

export const timeIntervalAtom = atom(0);