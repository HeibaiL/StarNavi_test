import React, {useEffect, useState, useCallback} from "react";

import Options from "../components/Options";
import GridCell from "../components/GridCell";

const Game = () => {
    const [cells, useCells] = useState([]);
    const [gameSettings, useGameSettings] = useState({allSettings: null, chosenSettings: {}});
    const [gameOn, useGameOn] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const [activeCell, setActiveCell] = useState(null);
    const [prevCell, setPrevCell] = useState(null);
    const [successArr, setSuccessArr] = useState([]);
    const [failArr, setFailArr] = useState([]);


    useEffect(() => {
        fetch("https://starnavi-frontend-test-task.herokuapp.com/game-settings")
            .then(res => res.json())
            .then(res => useGameSettings({...gameSettings, allSettings: res}));

    }, []);
    useEffect(() => {
        const cellsNum = gameSettings.chosenSettings.field || 5;
        const cellsArr = [];
        for (let i = 0; i < cellsNum; i++) {
            cellsArr.push({id: i, pending: false, success: false, fail: false});
        }
        useCells(cellsArr)
    }, [gameSettings])

    const onSelectChange = e => {
        const {value} = e.target;
        const chosenSettings = gameSettings.allSettings[value];
        useGameSettings({...gameSettings, chosenSettings})
    }
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
            setTimeout(() => {
                onCellChange(activeCell, "red")
            }, 1000)

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
        <div className="container">
            <Options startGame={togglePlay} onSelectChange={onSelectChange} options={gameSettings.allSettings}/>
            <div className="message">Message here</div>
            <div className="game-grid">
                {cells && cells.map(cell => (<GridCell key={cell.id} cell={cell} onClick={onCellClick}/>))}
            </div>
        </div>


    </div>
}
export default Game;