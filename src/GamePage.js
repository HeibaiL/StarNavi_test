import React, {useEffect, useState} from "react";

import useGame from "./Game";
import Options from "../components/Options";
import useGameSettings from "./fetchData/useGameSettings";
import Board from "../components/Board";

const GamePage = () => {

    const [name, setName] = useState("");
    const [message, setMessage] = useState('Your message');
    const [isPlaying, setPlaying] = useState(false);
    const {gameSettings,setGameSettings} = useGameSettings();

    const onSelectChange = e => {
        const {value} = e.target;
        const chosenSettings = gameSettings.allSettings[value];
        setGameSettings({...gameSettings, chosenSettings: {...chosenSettings, mode: value}})
    };

    const onPlayClick = () => {
        if(!gameSettings.chosenSettings.mode && !name) return setMessage(" Please, choose the game mode and type your name in!")
        if (!gameSettings.chosenSettings.mode) return setMessage("Please, choose the game mode!")
        if (!name) return setMessage("Please, type your name in!")
        setMessage("The game is on!")
        togglePlay()
    }

    const togglePlay = () => {
        setPlaying(!isPlaying)
    }

    const onInputChange = e => {
        const {value} = e.target;
        setName(value)
    }
    const {delay, field} = gameSettings.chosenSettings;

    const {board, game, clickCell} = useGame({
        isPlaying,
        delay,
        field,
        name
    });

    if (game) {
        if (game.isGameFinished()) {
            togglePlay()
        }
    }

    return <div className="game">
        <div className="container">
            <Options startGame={onPlayClick}
                     onSelectChange={onSelectChange}
                     options={gameSettings.allSettings}
                     onInputChange={onInputChange}
                     name={name}
            />
            <div className="message">{message}</div>
            <div>
                <Board board={board} clickCell={clickCell}/>

            </div>
        </div>
    </div>
}
export default GamePage;
