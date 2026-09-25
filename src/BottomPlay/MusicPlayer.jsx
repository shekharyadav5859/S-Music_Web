import React, { useEffect, useRef, useState } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat2,
  Volume2,
  VolumeX,
} from "lucide-react";



export default function MusicPlayer() {
  const {
    currentSong,
    isPlaying,
    toggleSong,
    audioRef,
  } = useAudio();

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  const progressRef = useRef(null);

  // ===============================
  // AUDIO PROGRESS
  // ===============================

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const updateProgress = () => {
      setProgress(audio.currentTime);
      setDuration(audio.duration || 0);
    };

    const loadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", loadedMetadata);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", loadedMetadata);
    };
  }, [audioRef, currentSong]);

  // ===============================
  // NO SONG
  // ===============================

  if (!currentSong) {
    return null;
  }

  // ===============================
  // TIME FORMAT
  // ===============================

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // ===============================
  // PROGRESS CHANGE
  // ===============================

  const handleProgress = (e) => {
    const audio = audioRef.current;

    if (!audio) return;

    const value = Number(e.target.value);

    audio.currentTime = value;
    setProgress(value);
  };

  // ===============================
  // VOLUME
  // ===============================

  const handleVolume = (e) => {
    const audio = audioRef.current;

    if (!audio) return;

    const value = Number(e.target.value);

    audio.volume = value;
    setVolume(value);

    if (value === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  // ===============================
  // MUTE
  // ===============================

  const toggleMute = () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (isMuted) {
      audio.volume = volume || 1;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  // ===============================
  // PLAY / PAUSE
  // ===============================

  const handlePlay = () => {
    toggleSong(currentSong);
  };

  return (
    <div
      className="
        fixed
        bottom-0
        left-0
        right-0
        z-[100]
        bg-[#111]
        border-t
        border-gray-800
        text-white
        px-4
        sm:px-6
        py-3
      "
    >

      {/* ===============================
          PROGRESS BAR
      =============================== */}

      <div className="max-w-7xl mx-auto">

        <input
          ref={progressRef}
          type="range"
          min="0"
          max={duration || 0}
          value={progress}
          onChange={handleProgress}
          className="
            w-full
            h-1
            cursor-pointer
            accent-white
          "
        />

        {/* ===============================
            PLAYER
        =============================== */}

        <div className="
          flex
          items-center
          justify-between
          gap-4
          mt-2
        ">

          {/* ================= SONG INFO ================= */}

          <div className="
            flex
            items-center
            gap-3
            min-w-0
            w-[30%]
          ">

            <img
              src={currentSong.img}
              alt={currentSong.songname}
              className="
                w-12
                h-12
                rounded-lg
                object-cover
                flex-shrink-0
              "
            />

            <div className="min-w-0">

              <h3 className="
                font-semibold
                truncate
              ">
                {currentSong.songname}
              </h3>

              <p className="
                text-sm
                text-gray-400
                truncate
              ">
                {currentSong.singer}
              </p>

            </div>

          </div>

          {/* ================= CONTROLS ================= */}

          <div className="
            flex
            items-center
            justify-center
            gap-4
            sm:gap-6
          ">

            <button
              className="
                hidden
                sm:block
                text-gray-400
                hover:text-white
                transition
              "
            >
              <Shuffle size={19} />
            </button>

            <button
              className="
                text-gray-400
                hover:text-white
                transition
              "
            >
              <SkipBack size={21} />
            </button>

            <button
              onClick={handlePlay}
              className="
                w-11
                h-11
                bg-white
                text-black
                rounded-full
                flex
                items-center
                justify-center
                hover:scale-105
                transition
              "
            >
              {isPlaying ? (
                <Pause
                  size={20}
                  fill="currentColor"
                />
              ) : (
                <Play
                  size={20}
                  fill="currentColor"
                />
              )}
            </button>

            <button
              className="
                text-gray-400
                hover:text-white
                transition
              "
            >
              <SkipForward size={21} />
            </button>

            <button
              className="
                hidden
                sm:block
                text-gray-400
                hover:text-white
                transition
              "
            >
              <Repeat2 size={19} />
            </button>

          </div>

          {/* ================= VOLUME ================= */}

          <div className="
            hidden
            md:flex
            items-center
            justify-end
            gap-2
            w-[30%]
          ">

            <span className="
              text-xs
              text-gray-400
              min-w-[38px]
              text-right
            ">
              {formatTime(progress)}
            </span>

            <button
              onClick={toggleMute}
              className="text-gray-400 hover:text-white"
            >
              {isMuted ? (
                <VolumeX size={20} />
              ) : (
                <Volume2 size={20} />
              )}
            </button>

            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolume}
              className="
                w-24
                accent-white
                cursor-pointer
              "
            />

            <span className="
              text-xs
              text-gray-400
              min-w-[38px]
            ">
              {formatTime(duration)}
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}