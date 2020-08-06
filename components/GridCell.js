import React, {useState, useEffect} from "react";

const GridCell = ({cell, id, onClick}) => {
    const [color, useColor] = useState('');
    const {red, green, blue} = cell;
    useEffect(() => {
        if (red) return useColor("red");
        if (green) return useColor("green")
        if (blue) return useColor("blue")

    }, [red, green, blue])
    return <a className={`grid-element ${color}`} onClick={() => blue ? onClick(cell) : null}/>
}
export default GridCell;