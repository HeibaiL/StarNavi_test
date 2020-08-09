import React from "react";

const ListElement = ({winner, date}) => (
    <li className="list-element">
        <p className="leader-name">{winner}</p>
        <p className="leaders-time">{date}</p>
    </li>
);
export default ListElement;