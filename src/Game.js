import React, {useEffect, useState} from "react";

import Grid from "../components/Grid";
import Options from "../components/Options";

const Game = () => {
    const [cells, useCells] = useState(null);
    const [gameSettings, useGameSettings] = useState({"field": 10, "delay": 1000});
    const [gameOn, useGameOn] = useState(false);
    const [availableCells, changeAvailableCells] = useState([]);
    const [intervalId, setIntervalId] = useState();

    const gridsNum = gameSettings && gameSettings.field;

    const updateAvailableCells = num => {
        const updatedArr = availableCells.filter(cellNum => cellNum !== num);
        return changeAvailableCells(updatedArr)
    }

    useEffect(() => {
        const cellsArr = [];
        const availableArr = [];
        for (let i = 1; i <= gridsNum; i++) {                               //this way is much better to not get confused when working with cells indexes
            cellsArr.push({id: i, red: false, green: false, blue: false});
            availableArr.push(i)
        }
        useCells(cellsArr)
        changeAvailableCells(availableArr);

    }, []);

    const findChosenCell = cell => {
        if (cell.blue || cell.green || cell.red) return cell;
    };

    const startGame = () => {
        return setInterval(() => {
            const randomIndex = Math.floor(Math.random() * availableCells.length);
            const randomNumber = randomIndex === 0 ? 0 : availableCells[randomIndex - 1];
            const randomCell = cells[randomNumber];
            onCellChange(randomCell)
        }, 1000)
    };


    useEffect(() => {
        if (gameOn) {
            let game = startGame()
            setIntervalId(game)
        } else {
            clearInterval(intervalId)
        }
    }, [gameOn]);

    const onCellChange = cellArg => {

        const updatedCells = cells.map(cell => (cell.id === cellArg.id ? {...cell, blue: true} : cell));
        useCells(cells=>{

            return updatedCells
        })
    }
    const onCellClick = cellArg => {
        const {id} = cellArg;
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