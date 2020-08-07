import React from "react";

const Options = ({startGame, onSelectChange, options}) => {
    return <div className="options">
        <select onChange={onSelectChange} className="game-modes" defaultValue="Pick game mode">
            <option disabled>Pick game mode</option>
            {options && Object.keys(options).map((option, index) =>
                <option value={option} key={index}>{option
                    .replace(/([A-Z])/g, ' $1')
                    .replace(/^./, str => str.toUpperCase())}</option>
            )}
        </select>
        <input placeholder="Enter your name" className="userName"/>
        <button onClick={startGame} className="play-button"> PLAY</button>
    </div>
}
export default Options;