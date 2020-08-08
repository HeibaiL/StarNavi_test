import React from "react";
import Cell from "./Cell";

const Board = ({board, clickCell}) => {
    return <>
        {board && board.map((row, i) => (
            <div className="board" key={i}>
                {
                    row.map((cell, j) => {
                      return  <Cell cell={cell} key={j} clickCell={clickCell}/>
                    })
                }
            </div>
        ))
        }
    </>
}
export default Board;