import React, {useEffect, useState, useCallback} from "react";

import Options from "../components/Options";
import GridCell from "../components/GridCell";

const Game = () => {
    const [cells, useCells] = useState(null);
    const [gameSettings, useGameSettings] = useState({"field": 10, "delay": 1000});
    const [gameOn, useGameOn] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const [activeCell, setActiveCell] = useState(null);
    const [successArr, setSuccessArr] = useState([]);
    const [failArr, setFailArr] = useState([]);


    const gridsNum = gameSettings && gameSettings.field;

    useEffect(() => {
        const cellsArr = [];
        for (let i = 0; i < gridsNum; i++) {
            cellsArr.push({id: i, red: false, green: false, blue: false});
        }
        useCells(cellsArr)
    }, []);

    useEffect(() => {
        if (gameOn) {
            const activeInterval = setInterval(() => {
                const randomIndex = Math.floor(Math.random() * gridsNum);
                const randomCell = cells[randomIndex];
                setActiveCell(randomCell)
            }, 1000)

            setIntervalId(activeInterval)
        } else {
            clearInterval(intervalId)
        }
        return () => clearInterval(intervalId);
    }, [gameOn]);


    useEffect(() => {
        if (activeCell) {
            const success = successArr.some(el => el.id === activeCell.id);
            onCellChange(activeCell, "blue")
        }
    }, [activeCell, successArr]);


    const onCellChange = (cellArg, color) => {
        const updatedCells = cells && cells.map(cell => (cell.id === cellArg.id ? {...cell, [color]: true} : cell));
        useCells(updatedCells)

    };

    const onCellClick = cellArg => {
        const {id} = cellArg;
        const updatedCells = cells.map(cell => (cell.id === id ? {...cell, green: true} : cell));
        setSuccessArr(successArr.concat(cellArg))
        useCells(updatedCells)
    };
    const togglePlay = () => {
        return useGameOn(!gameOn);
    }

    return <div className="game">
        <Options startGame={togglePlay}/>
        <div className="game-grid">
            {cells && cells.map(cell => (<GridCell key={cell.id} cell={cell} onClick={onCellClick}/>))}
        </div>

    </div>
}
export default Game;