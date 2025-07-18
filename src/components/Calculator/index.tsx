import { useState } from "react";
import styles from "./index.module.css"

const Calculator = () => {
    const [screenText, setScreenText] = useState<string>("0");
    const [calculus, setCalculus] = useState<string>("");
    const [resultEvaluted, setResultEvaluated] = useState<boolean>(false);
    const [calcHistory, setCalcHistory] = useState<string>("");
    const [history, setHistory] = useState<string[]>([]);

    const numberClick = (number: string) => {
        if (screenText == "0" || !Number(screenText)) {
            return setScreenText(number);
        }
        setScreenText(prev => prev + number)
    }

    const symbolClick = (symbol: string) => {
        setScreenText(symbol == "*" ? "X" : symbol);
        if (Number(screenText)) {
            if (resultEvaluted) {
                setCalculus(prev => prev + symbol);
                setResultEvaluated(false);
            } else {
                setCalculus(prev => prev + screenText + symbol);
            }
        } else {
            setCalculus(prev => prev.slice(0, -1) + symbol);
        }
    }

    const evalCalculus = () => {
        const result = String(eval(calculus + screenText));
        setScreenText(result);
        setCalculus(result);
        setResultEvaluated(true);
        if (calcHistory) setHistory(prev => [...prev, calcHistory])
        setHistory(prev => [...prev, calculus + screenText])
    }

    const clear = () => {
        setCalculus("");
        setScreenText("");
        setResultEvaluated(false);
    }

    const clearHistory = () => setHistory([]);

    const goToCalculusHistory = (calc: string) => {
        const evalCalc = String(eval(calc));
        setCalcHistory(calc);
        setScreenText(evalCalc);
        setCalculus(evalCalc);
        setResultEvaluated(true);
    }

    return (
        <section>
            <div className={styles.calculator}>
                <div className={styles.visor}>{screenText == "0" || !screenText ? "0" : screenText}</div>
                <div className={styles.buttons}>
                    <button className={styles.twoColumns} onClick={clear}>Clear</button>
                    <button className={styles.twoColumns2} onClick={() => setScreenText(prev => prev.slice(0, -1))}>Erase</button>
                    <button onClick={() => numberClick("7")}>7</button>
                    <button onClick={() => numberClick("8")}>8</button>
                    <button onClick={() => numberClick("9")}>9</button>
                    <button className={styles.orange} onClick={() => symbolClick("*")}>X</button>
                    <button onClick={() => numberClick("4")}>4</button>
                    <button onClick={() => numberClick("5")}>5</button>
                    <button onClick={() => numberClick("6")}>6</button>
                    <button className={styles.orange} onClick={() => symbolClick("/")}>/</button>
                    <button onClick={() => numberClick("1")}>1</button>
                    <button onClick={() => numberClick("2")}>2</button>
                    <button onClick={() => numberClick("3")}>3</button>
                    <button className={styles.orange} onClick={() => symbolClick("-")}>-</button>
                    <button className={styles.zero} onClick={() => numberClick("0")}>0</button>
                    <button onClick={evalCalculus}>=</button>
                    <button className={styles.orange} onClick={() => symbolClick("+")}>+</button>
                </div>
            </div>
        </section>
    )
};

export default Calculator;
