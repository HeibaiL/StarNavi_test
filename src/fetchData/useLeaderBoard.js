import React, {useMemo, useState, useContext} from "react";
import {LeadersContext} from "../contextStore/LeadersContext";

const useLeaderBoard = () => {
    const [leaders, setLeaders] = useContext(LeadersContext);

    const updateData = () => {
        return fetch("https://starnavi-frontend-test-task.herokuapp.com/winners")
            .then(res => res.json())
            .then(res => {
                setLeaders(res)
            })
    }
    const resetData = () => {
        setLeaders([])
    }

    const sendData = data => {
        return fetch("https://starnavi-frontend-test-task.herokuapp.com/winners", {
            headers: {
                'Content-Type': 'application/json',
            },
            method: "POST",
            body: JSON.stringify(data)
        })
    }

    const lastLeaders = useMemo(() => {
        const lastLeadersArr = [];
        if (leaders) {

            if (!leaders.length) return lastLeadersArr;
            for (let i = leaders.length - 1; i > leaders.length - 6; i--) {
                lastLeadersArr.push(leaders[i])
            }
            return lastLeadersArr
        }

    }, [leaders]);

    return {
        lastLeaders,
        updateData,
        sendData,
        resetData
    }
}
export default useLeaderBoard;