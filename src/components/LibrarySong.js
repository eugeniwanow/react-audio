import "../styles/LibrarySong.scss";
import { playAudio } from "./Util";

export default function Song({
    id,
    song,
    songs,
    setSongs,
    setCurrentSong,
    isPlaying,
    audioRef,
}) {
    const changeSong = () => {
        const selectedSong = songs.filter((state) => state.id === id);
        setCurrentSong({ ...selectedSong[0] });

        const newSongs = songs.map((song) => {
            if (song.id === id) {
                return {
                    ...song,
                    active: true,
                };
            } else {
                return {
                    ...song,
                    active: false,
                };
            }
        });
        setSongs(newSongs);
        playAudio(isPlaying, audioRef);
    };

    return (
        <div
            className={
                song.active
                    ? "LibrarySong LibrarySong--selected"
                    : "LibrarySong "
            }
            onClick={changeSong}
        >
            <img src={song.cover} alt={song.name} />
            <div className="LibrarySong__title">
                <h3>{song.artist}</h3>
                <p>{song.name}</p>
            </div>
        </div>
    );
}
