import React, {useEffect, useState, useMemo} from "react";

import useLeaderBoard from "../src/fetchData/useLeaderBoard";

const LeaderBoard = () => {
    const {lastLeaders} = useLeaderBoard();

    return <div className="leaderBoard">
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
export default LeaderBoard;
