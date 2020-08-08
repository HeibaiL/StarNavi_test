import React, {useEffect, useState} from 'react';

const CELL_STATUSES = {
    EMPTY: 'EMPTY',
    PENDING: 'PENDING',
    SUCCESS: 'SUCCESS',
    FAILED: 'FAILED'
};

class Cell {
    constructor() {
        this.status = CELL_STATUSES.EMPTY;
    }

    setStatus(status) {
        this.status = status;
    }

    getStatus() {
        return this.status;
    }

    isEmpty() {
        return this.status === CELL_STATUSES.EMPTY;
    }

    isPending() {
        return this.status === CELL_STATUSES.PENDING;
    }
}

class Game {
    constructor(pendingTime, size) {
        this.pendingTime = pendingTime;
        this.size = size;
        this.initGame();
    }

    initGame() {
        this.board = new Array(this.size).fill(null).map(() => new Array(this.size).fill(null).map(() => new Cell()));
        this.timer = null;

        this.userScore = 0;
        this.computerScore = 0;
    }

    startGame() {
        this.chooseCellAndStart();
    }

    resetGame() {
        this.initGame();
        this.startGame();
    }

    chooseCellAndStart() {
        if (this.isGameFinished()) {
            this.showResults();
            return;
        }

        const cell = this._getEmptyCell();

        cell.setStatus(CELL_STATUSES.PENDING);
        this.timer = setTimeout(() => {
            cell.setStatus(CELL_STATUSES.FAILED);
            this.computerScore += 1;
            this.startGame();
        }, this.pendingTime);
    }

    _getEmptyCell() {
        const i = Math.floor(Math.random() * this.size);
        const j = Math.floor(Math.random() * this.size);

        const cell = this.board[i][j];
        return this.board[i][j].isEmpty() ? cell : this._getEmptyCell();
    }

    processUserClick(cell) {
        if (cell.isPending()) {
            clearTimeout(this.timer);
            cell.setStatus(CELL_STATUSES.SUCCESS);
            this.userScore += 1;
            this.chooseCellAndStart();
        }
    }

    isGameFinished() {
        const halfSize = this.size/2;
        const sumScore = this.userScore + this.computerScore;
        return sumScore === this.size * this.size;
    }

    showResults() {
        let result = '';
        if (this.userScore > this.computerScore) {
            result = 'User win!';
        }

        if (this.userScore < this.computerScore) {
            result = 'Computer win!';
        }

        if (this.userScore === this.computerScore) {
            result = 'Draw';
        }

        // window.confirm(`${result}\nСыграть еще раз?`) && this.resetGame();
    }

    getBoard() {
        return this.board;
    }
}

const useGame = ({delay, field}) => {
    const [board, setBoard] = useState(null);
    const [game, setGame] = useState(null);

    useEffect(() => {
        const gameInstance = new Game(delay, field);
        gameInstance.startGame()

        setGame(gameInstance);
        setBoard(gameInstance.getBoard());

        const render = () => {
            setBoard([...gameInstance.getBoard()]);
            window.requestAnimationFrame(render);
        };
        // https://stackoverflow.com/questions/38709923/why-is-requestanimationframe-better-than-setinterval-or-settimeout
        window.requestAnimationFrame(render);
    }, [field]);

    const clickCell = (cell) => {
        game.processUserClick(cell);
    };

    return {
        board,
        clickCell,
    };
};

// const GamePage = () => {
//     const { board, clickCell } = useGame();
//     return (
//         <div>
//             {
//                 board && board.map((row, i) => (
//                     <div className="row" style={{ display: 'flex' }}>
//                         {
//                             row.map((cell, j) => (
//                                 <div
//                                     onClick={() => clickCell(cell)}
//                                     style={{ padding: 5, border: '1px solid #eee' }}
//                                 >
//                                     {i}, {j}, {cell.getStatus()}
//                                 </div>
//                             ))
//                         }
//                     </div>
//                 ))
//             }
//         </div>
//     );
// };

// export default GamePage;
export default useGame;