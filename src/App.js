import React from "react";
import GamePage from "./GamePage"
import LeaderBoard from "../components/leaderBoard"

const App = () => {
    return <div className="app">
        <GamePage/>
        <LeaderBoard/>
    </div>
};
export default App;