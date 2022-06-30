export const audioBugFixer = (isPlaying, currentSongRef) => {
    if (isPlaying) {
        const entitySong = currentSongRef.current.play();
        if (entitySong !== undefined) {
            entitySong.then((audio) => {
                currentSongRef.current.play();
            })
        }

    }
};