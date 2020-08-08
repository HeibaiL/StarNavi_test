import React, {useEffect, useState} from "react";

import useGame from "./Game";
import Options from "../components/Options";

const GamePage = () => {
    const [gameSettings, useGameSettings] = useState({
        allSettings: null,
        chosenSettings: {mode: '', delay: 2000, field: 5}
    });
    const [name, setName] = useState("");
    const [message, setMessage] = useState('Your message');
    const [isPlaying, setPlaying] = useState(false)

    useEffect(() => {
        fetch("https://starnavi-frontend-test-task.herokuapp.com/game-settings")
            .then(res => res.json())
            .then(res => useGameSettings({...gameSettings, allSettings: res}));

    }, []);


    const onSelectChange = e => {
        const {value} = e.target;
        const chosenSettings = gameSettings.allSettings[value];
        useGameSettings({...gameSettings, chosenSettings: {...chosenSettings, mode: value}})
    };

    const onPlayClick = () => {
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
console.log(isPlaying)

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
                {
                    board && board.map((row, i) => (
                        <div className="board" key={i}>
                            {
                                row.map((cell, j) => {
                                    let color;
                                    switch (cell.getStatus()) {
                                        case 'PENDING':
                                            color = `blue`
                                            break;
                                        case 'FAILED':
                                            color = 'red'
                                            break;
                                        case 'SUCCESS':
                                            color = 'green'
                                    }
                                    return <div key={j}
                                                onClick={() => clickCell(cell)}
                                                className={`cells ${color}`}
                                    >
                                    </div>
                                })
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
}
export default GamePage;
