import React, {useEffect} from "react";

import useLeaderBoard from "../fetchData/useLeaderBoard";
import ListElement from "./ListElement";

const LeaderBoard = () => {
    const {lastLeaders, updateData} = useLeaderBoard();

    useEffect(() => {
            updateData()
        }, []
    )
    return <div className="leaderBoard">
        <div className="container">
            <h1>Leader Board</h1>
            <ul className="leaders-list">
                {lastLeaders && lastLeaders.map(({id, date, winner}) => <ListElement key={id} date={date}
                                                                                     winner={winner}/>)}
            </ul>
        </div>

    </div>
}
export default LeaderBoard;
