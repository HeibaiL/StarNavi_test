import React, {useState, useEffect} from "react";
import Game from "./Game";

const useGame = ({delay, field, name, gameFinished, setFinish}) => {
    const [board, setBoard] = useState(null);
    const [game, setGame] = useState(null);
    const [gameId, setGameId] = useState(null);

    useEffect(() => {
        const gameInstance = new Game(delay, field, name, setFinish);
        setGame(gameInstance);
        setBoard(gameInstance.getBoard());

    }, [field, name]);

    const render = () => {
        let id = setInterval(() => {
            setBoard([...game.getBoard()]);
        }, 1000 / 60)
        setGameId(id)
    };


    useEffect(() => {
        if (game) {
            if (gameFinished) {
                game.initGame()
                game.startGame()
                render()
            } else {
                clearInterval(gameId)
            }
        }
    }, [gameFinished])


    const clickCell = (cell) => {
        game.processUserClick(cell);
    };
    return {
        board,
        game,
        clickCell
    };
};
export default useGame