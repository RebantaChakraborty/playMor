import React from 'react';
// import ReactDOM from 'react-dom';
import { audioBugFixer } from './AudioBugFixer';


const LibrarySong = ({ song, setCurrentSong, songs, id, currentSongRef, isPlaying }) => {

    const changeCurrentSong = () => {
        setCurrentSong(song);
        currentSongRef.current.play();
        audioBugFixer(isPlaying, currentSongRef);
        //The above function is the replacement of the code written below. We made a file called AudioBugFixer and the function was created and exported individually. Since we have the same problem in the Player Component we donot have to copy the same code. Just import the component and pss isPlaying and currentSongRef.
        // if (isPlaying) {
        //     const entitySong = currentSongRef.current.play();
        //     if (entitySong !== undefined) {
        //         entitySong.then((audio) => {
        //             currentSongRef.current.play();
        //         })
        //     }

        // }
        songs.map(song => {
            if (song.id === id) {
                song.active = true;
            }
            else {
                song.active = false;
            }

        })
    }
    return (
        <div className={`Library-song ${song.active ? "selectedSong" : ""}`} onClick={changeCurrentSong}>
            <img src={song.cover} alt="no-img"></img>
            <div className="songDescription">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>


        </div>

    );


};

export default LibrarySong;
