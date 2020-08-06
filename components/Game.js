import React, {useEffect, useState} from "react";

import Grid from "../components/Grid";
import Options from "../components/Options";

const Game = () => {
    const [cells, useCells] = useState(null);
    const [gameSettings, useGameSettings] = useState({"field": 10, "delay": 1000});
    const [gameOn, useGameOn] = useState(false);

    const gridsNum = gameSettings && gameSettings.field;

    useEffect(() => {
        const cellsArr = [];
        for (let i = 0; i < gridsNum; i++) {
            cellsArr.push({id: i, red: false, green: false, blue: false});
        }
        useCells(cellsArr)
    }, []);


    useEffect(() => {
        if (gameOn && cells) {
            const randomNum = Math.round(Math.random() * gridsNum);
            const updatedCells = cells.map(cell => (cell.id === randomNum ? {...cell, blue: true} : cell));
            useCells(updatedCells)
        }
    }, [gameOn]);

    const onCellClick = id => {
        const updatedCells = cells.map(cell => (cell.id === id ? {...cell, green: true} : cell));
        useCells(updatedCells)
    };
    const togglePlay = () => {
        return useGameOn(!gameOn);
    }
    return <div className="game">
        <Options startGame={togglePlay}/>
        <Grid gridCells={cells} gameOn={true} onCellClick={onCellClick} gameOn={gameOn}/>
    </div>
}
export default Game;