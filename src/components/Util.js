export function playAudio(isPlaying, audioRef) {
    if (isPlaying) {
        audioRef.current.play().then((audio) => {
            audioRef.current.play();
        });
    }
}
