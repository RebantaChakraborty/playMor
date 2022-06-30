import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({ songs, setCurrentSong, currentSongRef, isPlaying, libraryStatus }) => {


    return (
        <div className={`Library ${libraryStatus ? 'openedLibrary' : ''}`} >
            <h2>Library</h2>
            <div className="Library-songs">

                {songs.map(song => <LibrarySong song={song} setCurrentSong={setCurrentSong} songs={songs} id={song.id} key={song.id} currentSongRef={currentSongRef} isPlaying={isPlaying} />)}


            </div>

        </div>
    )
}
export default Library;