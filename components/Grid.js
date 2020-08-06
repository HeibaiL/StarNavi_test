import React, {useState, useEffect} from "react";

import GridCell from "../components/GridCell"

const Grid = ({ interval, gridCells, onCellClick}) => {

    const [greenCells, useGreenCells] = useState([]);
    const [redCells, useRedCells] = useState([]);


    return <div className="game-grid">
        {gridCells && gridCells.map(cell => (<GridCell key={cell.id} {...cell} onClick={onCellClick}/>))
        }
    </div>
}
export default Grid;