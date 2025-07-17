import { useState } from "react";
import styles from "./index.module.css"
import History from "./History";

const Calculator = () => {
    const [screenText, setScreenText] = useState<string>("");
    const [calculus, setCalculus] = useState<string>("");
    const [wasCalculusEvaluted, setWasCalculusEvaluated] = useState<boolean>(false);
    const [wasLastNumber, setWasLastNumber] = useState<boolean>(false)
    const [calculusHistory, setCalculusHistory] = useState<string[]>([]);
    const [lastRetrievedHistoryIndex, setLastRetrievedHistoryIndex] = useState<number>(-1);

    const symbolClick = (symbol: string) => {
        setWasLastNumber(false)
        setScreenText(symbol)
        // Fixed the calculus string if you already evaluated the calculus
        if (wasCalculusEvaluted) {
            setWasCalculusEvaluated(false)
            return setCalculus(screenText + symbol);
        }
        // 1+ => 1+++
        if (!wasLastNumber) {
            setCalculus(prev => prev.slice(0, -1))
            return setCalculus(prev => prev + symbol);
        }
        setCalculus(prev => prev + screenText + symbol);
    }

    const numberClick = (number: string) => {
        setWasLastNumber(true)
        // If you clicked a symbol or just started the app, resets the screen text
        if (!parseInt(screenText)) {
            setWasCalculusEvaluated(false)
            return setScreenText(number)
        }
        // If you evaluted the calculus and wanted it to start a new one just by clicking in a number, it resets it
        if (wasCalculusEvaluted) {
            setCalculus("")
            setWasCalculusEvaluated(false)
            return setScreenText(number)
        }
        // Adds another number to the number on the screen text
        setScreenText(prev => prev + number)
    }

    const clear = () => {
        setScreenText("")
        setCalculus("")
    }

    const evalCalculus = () => {
        if (!wasLastNumber) {
            return alert("You need to select a number before evaluating!")
        }
        const calculusEvaluated = String(eval((calculus + screenText)))
        if (lastRetrievedHistoryIndex !== -1) setCalculusHistory(prev => [...prev, calculusHistory[lastRetrievedHistoryIndex]])
        setCalculusHistory(prev => [...prev, calculus + screenText])
        setLastRetrievedHistoryIndex(-1)
        setCalculus(calculusEvaluated)
        setScreenText(calculusEvaluated)
        setWasCalculusEvaluated(true)
    }

    const goBackToEvaluatedCalculus = (index: number) => {
        const evalCalculus = String(eval(calculusHistory[index]))
        setScreenText(evalCalculus);
        setCalculus(evalCalculus);
        setLastRetrievedHistoryIndex(index);
    }

    const clearHistory = () => setCalculusHistory([]);

    return (
        <>
            <section className={styles.calculator}>
                <input className={styles.screen} value={screenText ? screenText : 0} />
                <div className={styles.buttonsHeader}>
                    <button onClick={clear}>Clear</button>
                    <button onClick={() => setScreenText(prev => prev.slice(0, -1))}><img src="https://img.icons8.com/?size=100&id=87017&format=png&color=000000s" alt="" /></button>
                </div>
                <div className={styles.buttons}>
                    <button onClick={() => numberClick("7")}>7</button>
                    <button onClick={() => numberClick("8")}>8</button>
                    <button onClick={() => numberClick("9")}>9</button>
                    <button onClick={() => symbolClick("/")}>/</button>
                    <button onClick={() => numberClick("4")}>4</button>
                    <button onClick={() => numberClick("5")}>5</button>
                    <button onClick={() => numberClick("6")}>6</button>
                    <button onClick={() => symbolClick("*")}>X</button>
                    <button onClick={() => numberClick("1")}>1</button>
                    <button onClick={() => numberClick("2")}>2</button>
                    <button onClick={() => numberClick("3")}>3</button>
                    <button onClick={() => symbolClick("-")}>-</button>
                    <button onClick={() => numberClick("0")} className={styles.spanRow}>0</button>
                    <button onClick={() => evalCalculus()}>=</button>
                    <button onClick={() => symbolClick("+")}>+</button>
                </div>
            </section >
            <History history={calculusHistory} goBackToEvaluatedCalculus={goBackToEvaluatedCalculus} clearHistory={clearHistory} />
        </>
    )
};

export default Calculator;
