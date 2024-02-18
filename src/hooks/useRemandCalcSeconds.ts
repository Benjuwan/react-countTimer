export const useRemandCalcSeconds = () => {
    const remandCalc_Seconds = () => {
        let theSeconds = 59;
        const nowSeconds = new Date().getSeconds();
        return theSeconds - nowSeconds;
    }

    return { remandCalc_Seconds }
}