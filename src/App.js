import { useState, useRef } from "react";
import "./styles/App.scss";

//Adding Components
import Song from "./components/Song";
import Player from "./components/Player";
import Library from "./components/Library";

//Adding Data
import chillhop from "./data";

export default function App() {
    const audioRef = useRef(null);

    const [songs, setSongs] = useState(chillhop());
    const [currentSong, setCurrentSong] = useState(songs[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    return (
        <div className="App">
            <Library
                songs={songs}
                setSongs={setSongs}
                setCurrentSong={setCurrentSong}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                audioRef={audioRef}
            />
            <div className="App__Player">
                <Song currentSong={currentSong} isPlaying={isPlaying} />
                <Player
                    songs={songs}
                    setSongs={setSongs}
                    audioRef={audioRef}
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                    currentSong={currentSong}
                    setCurrentSong={setCurrentSong}
                />
            </div>
        </div>
    );
}
