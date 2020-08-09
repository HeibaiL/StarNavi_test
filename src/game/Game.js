
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
    constructor(pendingTime, size, userName, setPlayingCallback) {
        this.pendingTime = pendingTime;
        this.size = size;
        this.userName = userName;
        this.setPlaying = setPlayingCallback;
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

    chooseCellAndStart() {
        if (this.isGameFinished()) {
            return this.setPlaying(false)
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
        let equal = false;
        if (this.userScore === halfSize || this.computerScore === halfSize) {
           equal = this.userScore === this.computerScore
        }
        return this.userScore > halfSize || this.computerScore > halfSize || equal
    }

    showWinner() {
        let winner = '';
        if (this.userScore > this.computerScore) {
            winner = this.userName;
        }

        if (this.userScore < this.computerScore) {
            winner = 'Computer'
        }

        if (this.userScore === this.computerScore) {
            winner = 'Draw';
        }
        return winner
    }

    getBoard() {
        return this.board;
    }
}



export default Game;