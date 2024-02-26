export const useRemandCalcHoursMinutes = () => {
    const remandCalcHoursMinutes: (userSelectedValue: string, maxValue: number) => number = (
        userSelectedValue: string,
        maxValue: number,
    ) => {
        let calcValue: number = 0;
        const currentValue: number = maxValue === 24 ? new Date().getHours() : new Date().getMinutes();

        const isPast: boolean = parseInt(userSelectedValue) - currentValue <= 0;
        if (isPast) {
            calcValue = maxValue + (parseInt(userSelectedValue) - currentValue);
        } else {
            calcValue = parseInt(userSelectedValue) - currentValue;
        }

        return calcValue;
    }

    return { remandCalcHoursMinutes }
}