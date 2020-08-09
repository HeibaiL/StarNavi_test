import React, {useContext} from "react";
import GamePage from "./components/GamePage"
import LeaderBoard from "./components/leaderBoard";

import {LeadersContextProvider,} from "./contextStore/LeadersContext";

const App = () => (
    <div className="app">
        <LeadersContextProvider leadersData={null}>
            <GamePage/>
            <LeaderBoard/>
        </LeadersContextProvider>
    </div>

)


export default App;