import React, {useEffect, useState, useMemo} from "react";

const Board = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch("https://starnavi-frontend-test-task.herokuapp.com/winners")
            .then(res => res.json())
            .then(res => setData(res))
    }, []);


    const lastLeaders = useMemo(() => {
        if (!data) return;
        const lastLeadersArr = [];
        for (let i = 0; i < 5; i++) {
            lastLeadersArr.push(data[i])
        }
        return lastLeadersArr

    }, [data]);

    return <div className="board">
        <div className="container">

            <h1>Leader Board</h1>
            <ul className="leaders-list">
                {lastLeaders && lastLeaders.map(({id, date, winner}) => <li key={id} className="list-element"><p
                    className="leader-name">{winner}</p><p
                    className="leaders-time">{date}</p></li>)}
            </ul>
        </div>

    </div>
}
export default Board;
