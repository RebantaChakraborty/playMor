import React, { useState, useRef } from 'react';
import "./styles/App.scss";
import Player from "./components/Player";
import Song from "./components/Song";
import songList from "./components/util";
//data
import Library from './components/Library';
import Nav from './components/Nav';



function App() {
  const [songs, setSongs] = useState(songList());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  //reference to the audio file
  const currentSongRef = useRef('');
  const [libraryStatus, setLibraryStatus] = useState(false);
  return (
    <div className={`App ${libraryStatus ? "libraryOpened" : ""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} setCurrentSong={setCurrentSong} />
      <Player currentSong={currentSong} setCurrentSong={setCurrentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying} currentSongRef={currentSongRef} songs={songs} setSongs={setSongs} />
      <Library songs={songs} setCurrentSong={setCurrentSong} currentSongRef={currentSongRef} isPlaying={isPlaying} libraryStatus={libraryStatus} />
    </div>
  );
}

export default App;
