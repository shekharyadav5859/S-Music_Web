import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Play,
  Heart,
  MoreHorizontal,
  Music2,
} from "lucide-react";

export default function SongPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const song = location.state?.song;
const [currentSong, setCurrentSong] = useState(null);
const [isPlaying, setIsPlaying] = useState(false);

const playSong = (song) => {
  if (!song) return;

  const audio = new Audio(song.song);

  audio.play();

  setCurrentSong(song);
  setIsPlaying(true);

  console.log(song.song);
};


  if (!song) {
    return (
      <div className="min-h-screen bg-[#090909] text-white flex items-center justify-center">
        <div className="text-center">
          <Music2 size={50} className="mx-auto mb-4 text-gray-500" />

          <h2 className="text-2xl font-semibold">
            Song not found
          </h2>

          <button
            onClick={() => navigate("/")}
            className="mt-6 px-6 py-3 rounded-full bg-white text-black font-medium"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090909] text-white relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 via-[#090909] to-[#090909]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-300 hover:text-white transition mb-10"
        >
          <ArrowLeft size={22} />
          Back
        </button>

        {/* Main Card */}
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Album Image */}
          <div className="flex justify-center">

            <div className="relative group">

              <div className="absolute -inset-5 bg-purple-600/20 blur-3xl rounded-full" />

              <img
                src={song.img}
                alt={song.songname}
                className="
                  relative
                  w-[280px]
                  h-[280px]
                  sm:w-[350px]
                  sm:h-[350px]
                  md:w-[400px]
                  md:h-[400px]
                  object-cover
                  rounded-2xl
                  shadow-2xl
                  transition duration-500
                  group-hover:scale-[1.02]
                "
              />

            </div>

          </div>

          {/* Song Information */}
          <div>

            <p className="text-sm uppercase tracking-[4px] text-purple-400 mb-4">
              Now Playing
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
              {song.songname}
            </h1>

            <p className="text-xl text-gray-400 mt-4">
              {song.singer}
            </p>

            {/* Actions */}
            <div className="flex items-center gap-5 mt-10">

              {/* Play */}
              <button
              type="button"
  onClick={() => {
    console.log("CLICK");
    playSong(song);
  }}
                className="
                  w-16 h-16
                  rounded-full
                  bg-white
                  text-black
                  flex items-center justify-center
                  hover:scale-105
                  transition
                  shadow-xl
                "
              >
                <Play fill="black" size={27} />
              </button>

              {/* Like */}
              <button
                className="
                  w-12 h-12
                  rounded-full
                  border border-gray-700
                  flex items-center justify-center
                  hover:bg-white/10
                  transition
                "
              >
                <Heart size={22} />
              </button>

              {/* More */}
              <button
                className="
                  w-12 h-12
                  rounded-full
                  border border-gray-700
                  flex items-center justify-center
                  hover:bg-white/10
                  transition
                "
              >
                <MoreHorizontal size={22} />
              </button>

            </div>

            {/* Song Details */}
            <div className="mt-12 border-t border-white/10 pt-6">

              <div className="flex justify-between py-3">
                <span className="text-gray-500">
                  Artist
                </span>

                <span className="font-medium">
                  {song.singer}
                </span>
              </div>

              <div className="flex justify-between py-3">
                <span className="text-gray-500">
                  Duration
                </span>

                <span>
                  {song.duration || "--:--"}
                </span>
              </div>

            </div>

          </div>

        </div>

        {/* Bottom Section */}
        <div className="mt-20">

          <h2 className="text-2xl font-semibold mb-6">
            About this song
          </h2>

          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6">

            <p className="text-gray-400 leading-7">
              Listen to {song.songname} by {song.singer}.
              Enjoy your music with S-Music.
            </p>

          </div>

        </div>

      </div>
    </div>
  );
}
