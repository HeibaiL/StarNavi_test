import React, {useState, useEffect} from "react";

const GridCell = ({cell, onClick}) => {
    const [color, useColor] = useState('');
    const {success, pending, fail} = cell;

    useEffect(() => {
        if (success) return useColor("red");
        if (pending) return useColor("green")
        if (fail) return useColor("blue")

    }, [cell]);
    return <a className={`grid-element ${color}`} onClick={() => blue ? onClick(cell) : null}/>
}
export default GridCell;