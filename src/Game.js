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
    constructor(pendingTime, size, userName) {
        this.pendingTime = pendingTime;
        this.size = size;
        this.userName = userName;
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
            return this.showResults();
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
        const halfSize = (this.size * this.size) / 2;
        return this.userScore > halfSize || this.computerScore > halfSize
    }

    showResults() {
        let result = '';
        if (this.userScore > this.computerScore) {
            result = `${this.userName} win!`;
        }

        if (this.userScore < this.computerScore) {
            result = 'Computer win!';
        }

        if (this.userScore === this.computerScore) {
            result = 'Draw';
        }
        return result
    }

    getBoard() {
        return this.board;
    }
}

const useGame = ({delay, field, name, isPlaying}) => {
    const [board, setBoard] = useState(null);
    const [game, setGame] = useState(null);
    const [gameId, setGameId] = useState(null);

    useEffect(() => {
        const gameInstance = new Game(delay, field, name);
        setGame(gameInstance);
        setBoard(gameInstance.getBoard());

    }, [field, name]);

    const render = () => {
        let id = setInterval(() => {
            setBoard([...game.getBoard()]);
        }, 1000 / 60)
        setGameId(id)
    };
    if(game){
        console.log(game.isGameFinished())
    }

    useEffect(() => {
        if (game) {
            game.initGame()
            if (isPlaying) {
                game.startGame()
                render()
            } else {
                clearInterval(gameId)
            }
        }
    }, [isPlaying])


    const clickCell = (cell) => {
        game.processUserClick(cell);
    };
    return {
        board,
        game,
        clickCell
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