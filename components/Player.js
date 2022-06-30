import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faPauseCircle, faPlayCircle } from '@fortawesome/free-solid-svg-icons';
// import { NULL } from 'node-sass';
import { audioBugFixer } from './AudioBugFixer';


const Player = ({ currentSong, isPlaying, setIsPlaying, currentSongRef, setCurrentSong, songs, setSongs }) => {

    //1) To get access to an html element within the DOM , we use the useRef. First it is initialised with a null value and then it is used to create a reference to a DOM element . Once , the reference has been created , then we can use it as we seem fit. For example ,  we used the "useRef" here , to create a refence to the audio file in the JSX part . And then in the currentSongHandler(), function we used the reference , to access the link to the song as soon as the play button has been hit.
    //2)isPlaying checks if the song is playing or not and acts accordingly. It is our play/pause button functionality.
    const [currentSongTimeInfo, setCurrentSongTimeInfo] = useState({ currentTime: 0, duration: 0, animationPercentage: 0 });

    const playSongHandler = () => {
        // currentSongRef.current.play();
        if (!isPlaying) {
            currentSongRef.current.play();
            setIsPlaying(!isPlaying);

        }
        else {
            currentSongRef.current.pause();
            setIsPlaying(!isPlaying);

        }

    }
    const currentSongTimeHandler = (e) => {
        const current = e.target.currentTime;
        const duration = e.target.duration;
        const roundedCurrentTime = Math.round(current);
        const roundedDuration = Math.round(duration);
        const roundedAnimationPercentage = Math.round((roundedCurrentTime / roundedDuration) * 100);
        // console.log(roundedAnimationPercentage);
        setCurrentSongTimeInfo({ ...currentSongTimeInfo, currentTime: current, duration, animationPercentage: roundedAnimationPercentage });

    }
    const currentSongTimeFormatHandler = (time) => {
        // console.log("works");
        return (
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        );

    };
    const songDragger = (e) => {
        // console.log(e.target.value);
        (currentSongRef.current.currentTime = e.target.value);
        setCurrentSongTimeInfo({ ...currentSongTimeInfo, currentTime: e.target.value });


    }
    const skipTrack = (skipType) => {
        let currentTrackIndex = songs.findIndex((song) => song.id === currentSong.id

        );

        if (skipType === "skipBack") {
            if (currentTrackIndex === 0) {
                currentTrackIndex = songs.length;
            }
            setCurrentSong(songs[(currentTrackIndex - 1) % songs.length]);

        }
        else {
            setCurrentSong(songs[(currentTrackIndex + 1) % songs.length]);

        }

    }
    useEffect(() => {
        const newSong = songs.map(song => {
            if (song.id === currentSong.id) {
                return {
                    ...song,
                    active: true,
                };
            }
            else {
                return {
                    ...song,
                    active: false,
                };

            }
        }
        )
        setSongs(newSong);
    }, [currentSong])


    useEffect(() => {
        // console.log("current time is changing");
        if (currentSongTimeInfo.currentTime === currentSongTimeInfo.duration && currentSongTimeInfo.duration !== 0) {
            let currentTrackIndex = songs.findIndex((song) => song.id === currentSong.id

            );

            // console.log("song ended");
            setCurrentSong(songs[(currentTrackIndex + 1) % songs.length]);

        }

    }, [currentSongTimeInfo.currentTime])



    audioBugFixer(isPlaying, currentSongRef);


    //Styles here
    const trackAnimationStylePercentage = { transform: `translateX(${currentSongTimeInfo.animationPercentage}%)` }

    return (
        <div className="player">
            <div className="Time-control">
                <p>{currentSongTimeFormatHandler(currentSongTimeInfo.currentTime)}</p>
                <div className="trackVisual" style={{ background: `linear-gradient(to right,${currentSong.color[0]},${currentSong.color[1]})` }}>
                    <input min={0} max={currentSongTimeInfo.duration || 0} value={currentSongTimeInfo.currentTime} onChange={songDragger} type="range"></input>
                    <div style={trackAnimationStylePercentage} className="trackAnimation"></div>
                </div>
                <p>{currentSongTimeFormatHandler(currentSongTimeInfo.duration || 0)}</p>

            </div>

            <div className="Play-control">
                <FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft} onClick={() => skipTrack("skipBack")} />

                <FontAwesomeIcon onClick={playSongHandler} className="play" size="3x" icon={isPlaying ? faPauseCircle : faPlayCircle} />

                <FontAwesomeIcon className="skip-next" size="2x" icon={faAngleRight} onClick={() => skipTrack("skipNext")} />
            </div>
            <audio onLoadedMetadata={currentSongTimeHandler} onTimeUpdate={currentSongTimeHandler} ref={currentSongRef} src={currentSong.audio}></audio>
        </div>

    )







};


export default Player;
