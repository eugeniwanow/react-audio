import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlay,
    faPause,
    faAngleLeft,
    faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/Player.scss";

import { playAudio } from "./Util";

export default function Player({
    audioRef,
    currentSong,
    songs,
    isPlaying,
    setSongs,
    setIsPlaying,
    setCurrentSong,
}) {
    // const playSongHandler = () => {
    //     if (isPlaing) {
    //         audioRef.current.pause();
    //         setIsPlaying(!isPlaing);
    //     } else {
    //         audioRef.current.play();
    //         setIsPlaying(!isPlaing);
    //     }
    // };
    useEffect(() => {
        const newSongs = songs.map((song) => {
            if (song.id === currentSong.id) {
                console.log();
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
    }, [currentSong]);
    const playSongHandler = () => {
        isPlaying ? audioRef.current.pause() : audioRef.current.play();
        setIsPlaying(!isPlaying);
    };

    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
    });

    const timeUpdateHandler = (e) => {
        const current = audioRef.current.currentTime.toFixed();
        const duration = audioRef.current.duration.toFixed();
        setSongInfo({ ...songInfo, currentTime: current, duration });
    };

    const getTime = (time) => {
        return (
            Math.floor(time / 60) +
            ":" +
            ("0" + Math.floor(time % 60)).slice(-2)
        );
    };

    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({ ...songInfo, currentTime: e.target.value });
    };

    const skipTrackHandler = async (direction) => {
        let currentIndex = songs.findIndex(
            (song) => song.id === currentSong.id
        );
        let length = songs.length - 1;
        if (direction === "back") {
            if (currentIndex === 0) {
                await setCurrentSong(songs[length]);
            } else {
                await setCurrentSong(songs[currentIndex - 1]);
            }
        } else if (direction === "forward") {
            if (currentIndex === length) {
                await setCurrentSong(songs[0]);
            } else {
                await setCurrentSong(songs[currentIndex + 1]);
            }
        }
        playAudio(isPlaying, audioRef);

        const newSongs = songs.map((song) => {
            if (song.id === currentSong.id) {
                console.log();
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
    };

    const songEndHandler = async () => {
        let currentIndex = songs.findIndex(
            (song) => song.id === currentSong.id
        );
        let length = songs.length - 1;

        if (currentIndex === length) {
            await setCurrentSong(songs[0]);
        } else {
            await setCurrentSong(songs[currentIndex + 1]);
        }
        playAudio(isPlaying, audioRef);
    };

    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <input
                    type="range"
                    min="0"
                    max={songInfo.duration}
                    value={songInfo.currentTime}
                    onChange={dragHandler}
                ></input>
                <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
            </div>
            {/* {audioRef.current.currentTime} */}
            <div className="play-control">
                <FontAwesomeIcon
                    size="2x"
                    className="skip-back"
                    icon={faAngleLeft}
                    onClick={() => skipTrackHandler("back")}
                />
                <FontAwesomeIcon
                    onClick={playSongHandler}
                    size="2x"
                    className="play"
                    icon={isPlaying ? faPause : faPlay}
                />
                <FontAwesomeIcon
                    size="2x"
                    className="skip-forward"
                    icon={faAngleRight}
                    onClick={() => skipTrackHandler("forward")}
                />
            </div>
            <audio
                onTimeUpdate={timeUpdateHandler}
                onLoadedMetadata={timeUpdateHandler}
                ref={audioRef}
                src={currentSong.audio}
                onEnded={songEndHandler}
            ></audio>
        </div>
    );
}
