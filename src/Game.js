import React, {useEffect, useState} from "react";

import Options from "../components/Options";
import GridCell from "../components/GridCell";

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
        for (let i = 0; i < gridsNum; i++) {
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
            const randomCell = cells[randomIndex];
            console.log(randomCell)
            onCellChange(randomCell)
        }, 1000)
    }

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
        useCells(cells => {

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
        <div className="game-grid">
            {cells && cells.map(cell => (<GridCell key={cell.id} cell={cell} onClick={onCellClick}/>)) }
        </div>

    </div>
}
export default Game;