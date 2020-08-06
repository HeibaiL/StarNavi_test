import React, {useState, useEffect} from "react";

const GridCell = ({red, green, blue, id, onClick}) => {
    const [color, useColor] = useState('');

    useEffect(() => {
        if (red) return useColor("red");
        if (green) return useColor("green")
        if (blue) return useColor("blue")

    }, [red, green,blue])
    return <a className={`grid-element ${color}`} id={id} onClick={() => onClick(id)}/>
}
export default GridCell;