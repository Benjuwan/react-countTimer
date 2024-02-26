export const useRemandCalcHoursMinutes = () => {
    const remandCalcHoursMinutes: (userSelectedValue: string, maxValue: number) => number = (
        userSelectedValue: string,
        maxValue: number,
    ) => {
        let calcValue: number = 0;
        const currentValue: number = maxValue === 24 ? new Date().getHours() : new Date().getMinutes() + 1; // 秒数の数値（の加算分）を考慮して分の数値には +1

        const isPast: boolean = parseInt(userSelectedValue) - currentValue < 0;
        if (isPast) {
            calcValue = maxValue + (parseInt(userSelectedValue) - currentValue);
        } else if (parseInt(userSelectedValue) - currentValue === 0) {
            return calcValue;
        } else {
            calcValue = parseInt(userSelectedValue) - currentValue;
        }

        return calcValue;
    }

    return { remandCalcHoursMinutes }
}