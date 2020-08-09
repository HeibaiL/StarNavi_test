import React from "react";
import {revertFromCamelCase} from "../helpers";

const Options = ({startGame, onSelectChange, options, onInputChange, name, gameFinished}) => (
    <div className="options">
        <select onChange={onSelectChange} className="game-modes" defaultValue="Pick game mode">
            <option disabled>Pick game mode</option>
            {options && Object.keys(options).map((option, index) =>
                <option value={option} key={index}>{revertFromCamelCase(option)}</option>
            )}
        </select>
        <input placeholder="Enter your name" value={name} className="userName" onChange={onInputChange}/>
        <button onClick={gameFinished ? null : startGame}
                className="play-button">{gameFinished === null ? "Play" : "Play Again"}</button>
    </div>
)
export default Options;