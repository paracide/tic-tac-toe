import {useState} from "react";


export default function Game() {
    const [history, setHistory] = useState(new Array(new Array<string>()));
    const [currentMove, setCurrentMove] = useState(0);
    const currentSquares = history[currentMove];
    const xIsNext = currentMove % 2 === 0;

    function nextTurn(squares: Array<string>) {
        /*remove additional history when jump*/
        setHistory([...history.slice(0, currentMove + 1), squares]);
        setCurrentMove(currentMove + 1)
    }

    /*jump to previous history*/
    function jumpTo(move: number) {
        setCurrentMove(move);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const moves = history.map((_, index) => {
        const desc = index > 0 ? "Go to move #" + index : "Go to Start";
        return (
            <li>
                <button key={index} onClick={() => jumpTo(index)}>{desc}</button>
            </li>
        );
    })

    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} currentSquares={currentSquares} onFinishClick={nextTurn}/>
            </div>
            <div className="game-info">
                <ol>{moves}</ol>
            </div>
        </div>
    );
}

interface BoardProps {
    xIsNext: boolean;
    currentSquares: Array<string>;
    onFinishClick: (currentSquare: Array<string>) => void;
}

function Board({xIsNext, currentSquares, onFinishClick: finishClick}: BoardProps) {
    let status = '';
    if (!currentSquares) {
        currentSquares = Array(9);
    }
    const winner = calculateWinner(currentSquares);

    /*click function when square clicked*/

    function showXO(index: number) {
        /*if the square has been clicked or the game has the winner, do nothing*/
        if (currentSquares[index] || winner) {
            return;
        }

        const nextSquares = currentSquares.slice();
        nextSquares[index] = xIsNext ? "X" : "O";
        finishClick(nextSquares);
    }

    /*status bar text*/
    if (winner) {
        status = "Winner is " + winner;
    } else {
        status = "Next is " + (xIsNext ? 'X' : 'O');
    }


    return (
        <>
            <div>{status}</div>
            <div className="board-row">
                <Square value={currentSquares[0]} onSquareClick={() => showXO(0)}/>
                <Square value={currentSquares[1]} onSquareClick={() => showXO(1)}/>
                <Square value={currentSquares[2]} onSquareClick={() => showXO(2)}/>
            </div>
            <div className="board-row">
                <Square value={currentSquares[3]} onSquareClick={() => showXO(3)}/>
                <Square value={currentSquares[4]} onSquareClick={() => showXO(4)}/>
                <Square value={currentSquares[5]} onSquareClick={() => showXO(5)}/>
            </div>
            <div className="board-row">
                <Square value={currentSquares[6]} onSquareClick={() => showXO(6)}/>
                <Square value={currentSquares[7]} onSquareClick={() => showXO(7)}/>
                <Square value={currentSquares[8]} onSquareClick={() => showXO(8)}/>
            </div>
        </>
    );
}

function Square({value, onSquareClick}: { value: string; onSquareClick: () => void }) {
    return <button className="square" onClick={onSquareClick}>{value}</button>;
}

function calculateWinner(squares: Array<string>) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
