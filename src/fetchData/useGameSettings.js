import React, {useEffect, useState} from "react";

const useGameSettings = () => {

    const [gameSettings, setGameSettings] = useState({
        allSettings: null,
        chosenSettings: {mode: '', delay: 2000, field: 5}
    });

    useEffect(() => {
        fetch("https://starnavi-frontend-test-task.herokuapp.com/game-settings")
            .then(res => res.json())
            .then(res => setGameSettings({...gameSettings, allSettings: res}));

    }, []);
    return {
        gameSettings,
        setGameSettings
    }
}
export default useGameSettings;