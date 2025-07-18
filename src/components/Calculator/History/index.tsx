import styles from "./index.module.css"

interface Arguments {
    history: string[];
    clearHistory: () => void
    goToCalculusHistory: (calc: string) => void
}

const History = ({ history, clearHistory, goToCalculusHistory }: Arguments) => {
    return (
        <div className={styles.history}>
            <header>
                <h1>History:</h1>
                <img src="trash.png" alt="" onClick={clearHistory} />
            </header>
            <main>
                {history.length == 0 ? <p>No history yet</p> : history.map((calc) => (
                    <p onClick={() => goToCalculusHistory(calc)}>{calc}</p>
                ))}
            </main>
        </div>
    )
};

export default History;
