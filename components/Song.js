import React from 'react';
// import ReactDOM from 'react-dom';


const Song = ({ currentSong }) => {
    // console.log(currentSong.name);
    return (
        <div className="Song-container">
            <img src={currentSong.cover} alt="no-img"></img>

            <h2>{currentSong.name}</h2>
            <h3>{currentSong.artist}</h3>


        </div>

    );


};

export default Song;
