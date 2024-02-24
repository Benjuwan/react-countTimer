export const useRemandCalc = () => {
    const remandCalc: (userSelectedValue: string, currentValue: number) => number = (
        userSelectedValue: string,
        currentValue: number
    ) => {
        return parseInt(userSelectedValue) - currentValue;
    }

    return { remandCalc }
}