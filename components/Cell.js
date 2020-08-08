import React from "react";

const Cell = ({cell, clickCell}) => {
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

    return <div
        onClick={() => clickCell(cell)}
        className={`cells ${color}`}
    >
    </div>

}
export default Cell;