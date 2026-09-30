import React, { useContext } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Heart,
  Volume2,
} from "lucide-react";

import { AudioContext } from "../Audio/AudioContext";

const MusicPlayer = () => {
  const { curr, play, togglePlay } = useContext(AudioContext);

  if (!curr) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[90px] bg-[#111] border-t border-gray-700 z-[9999] text-white">

      <div className="h-full flex items-center px-3 sm:px-5 md:px-6">

        {/* LEFT - SONG INFO */}
        <div className="w-[45%] md:w-1/3 flex items-center gap-2 sm:gap-3 min-w-0">

          <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 bg-purple-600 rounded-md overflow-hidden">
            <img
              src={curr.img}
              alt={curr.songname}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="min-w-0">
            <h3 className="text-xs sm:text-sm font-semibold truncate">
              {curr.songname}
            </h3>

            <p className="hidden sm:block text-[10px] sm:text-xs text-gray-400 truncate">
              {curr.singer}
            </p>
          </div>

          <Heart
            size={18}
            className="hidden sm:block ml-1 shrink-0 text-gray-400 hover:text-white cursor-pointer"
          />
        </div>

        {/* CENTER - CONTROLS */}
        <div className="w-[55%] md:w-1/3 flex flex-col items-center gap-1 sm:gap-2">

          <div className="flex items-center gap-3 sm:gap-5 md:gap-6">

            <button className="text-gray-300 hover:text-white">
              <SkipBack size={18} fill="currentColor" />
            </button>

            <button
              onClick={togglePlay}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition"
            >
              {play ? (
                <Pause fill="black" size={17} />
              ) : (
                <Play fill="black" size={17} />
              )}
            </button>

            <button className="text-gray-300 hover:text-white">
              <SkipForward size={18} fill="currentColor" />
            </button>

          </div>

          {/* PROGRESS */}
          <div className="flex items-center gap-1 sm:gap-2 w-full max-w-[550px]">

            <span className="text-[9px] sm:text-[10px] text-gray-400">
              0:00
            </span>

            <div className="h-1 flex-1 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full w-[30%] bg-purple-500 rounded-full" />
            </div>

            <span className="text-[9px] sm:text-[10px] text-gray-400">
              {curr.duration}
            </span>

          </div>
        </div>

        {/* RIGHT - VOLUME */}
        <div className="hidden md:flex w-1/3 justify-end items-center gap-3">

          <Volume2 size={19} className="text-gray-300" />

          <div className="w-24 h-1 bg-gray-700 rounded-full">
            <div className="w-[70%] h-full bg-purple-500 rounded-full" />
          </div>

        </div>

      </div>
    </div>
  );
};

export default MusicPlayer;



