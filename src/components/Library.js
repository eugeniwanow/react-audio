import LibrarySong from "./LibrarySong";

export default function Library({
    songs,
    setSongs,
    setCurrentSong,
    isPlaying,
    setIsPlaying,
    audioRef,
}) {
    return (
        <div className="library">
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map((song, idx) => (
                    <LibrarySong
                        idx={idx}
                        id={song.id}
                        key={song.id}
                        song={song}
                        setSongs={setSongs}
                        setCurrentSong={setCurrentSong}
                        songs={songs}
                        isPlaying={isPlaying}
                        setIsPlaying={setIsPlaying}
                        audioRef={audioRef}
                    />
                ))}
            </div>
        </div>
    );
}
