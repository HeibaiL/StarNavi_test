import React, {useEffect, useMemo, useState} from "react";

const useLeaderBoard = () => {

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

    return {
        lastLeaders
    }
}
export default useLeaderBoard;