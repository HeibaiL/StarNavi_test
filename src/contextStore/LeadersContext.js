import React, {useState, createContext, useContext} from "react";

export const LeadersContext = createContext();

export const LeadersContextProvider = ({leadersData, children}) => {
        const [leaders, setLeaders] = useState(leadersData);
        const leadersContext = [leaders, setLeaders];
        return <LeadersContext.Provider value={leadersContext}>{children}</LeadersContext.Provider>
    };

export const {Consumer: LeadersContextConsumer} = LeadersContext;