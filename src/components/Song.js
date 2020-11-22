import "../styles/Song.scss";

export default function Song({ currentSong, isPlaying }) {
    return (
        <div className={isPlaying ? "song-container active" : "song-container"}>
            <img src={currentSong.cover} alt={currentSong.name} />
            <h1>{currentSong.artist}</h1>
            <h3>{currentSong.name}</h3>
        </div>
    );
}
