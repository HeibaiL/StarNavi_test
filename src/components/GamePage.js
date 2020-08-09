import React, {useEffect, useState} from "react";

import useGame from "../game/useGame";
import Options from "./Options";
import Board from "./Board";
import useGameSettings from "../fetchData/useGameSettings";
import useLeaderBoard from "../fetchData/useLeaderBoard";
import {getDate, validate} from "../helpers";

const GamePage = () => {

    const [name, setName] = useState("");
    const [message, setMessage] = useState('Your message');
    const [gameFinished, setFinish] = useState(null);
    const {gameSettings, setGameSettings} = useGameSettings();
    const {updateData, sendData} = useLeaderBoard();

    const {delay, field} = gameSettings.chosenSettings;

    const {board, game, clickCell} = useGame({
        setFinish,
        gameFinished,
        delay,
        field,
        name
    });

    useEffect(() => {
            if (gameFinished === null) return;

            if (!gameFinished) {
                let winner = game.showWinner();
                let message;
                if (winner === "Draw") {
                    message = "Draw"
                } else {
                    message = `${winner} won!`
                }
                setMessage(message);
                const date = getDate();
                const bodyRequest = {winner, date};

                sendData(bodyRequest).then(() => updateData());
            }
        }
        ,
        [gameFinished]
    )

    const onSelectChange = e => {
        const {value} = e.target;
        const chosenSettings = gameSettings.allSettings[value];
        setGameSettings({...gameSettings, chosenSettings: {...chosenSettings, mode: value}})
    };

    const onPlayClick = () => {
        if (!validate(gameSettings.chosenSettings.mode, name, setMessage)) return;
        setMessage("The game is on!")
        setFinish(!gameFinished)
    }

    const onInputChange = e => {
        const {value} = e.target;
        setName(value)
    }


    return <div className="game">
        <div className="container">
            <Options startGame={onPlayClick}
                     onSelectChange={onSelectChange}
                     options={gameSettings.allSettings}
                     onInputChange={onInputChange}
                     name={name}
                     gameFinished={gameFinished}
            />
            <div className="message">{message}</div>
            <div>
                <Board board={board} clickCell={clickCell}/>
            </div>
        </div>
    </div>
}
export default GamePage;
