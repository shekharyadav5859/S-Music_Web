import React from "react";
import {
  ArrowLeft,
  Play,
  Heart,
  MoreHorizontal,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import MusicPlayer from "../BottomPlay/MusicPlayer";

export default function SingalSong() {
  const location = useLocation();
  const navigate = useNavigate();

  

  // Home se aaya hua song
  const song = location.state?.song;

  // Agar song nahi mila
  if (!song) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">
          Song not found
        </h1>

        <p className="text-gray-400 mt-2">
          Please select a song from Home.
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-6 px-6 py-3 bg-white text-black rounded-full font-semibold hover:scale-105 transition"
        >
          Go Home
        </button>
      </div>
    );
  }

  const isCurrentSong = currentSong?.id === song.id;

  return (

    <>
    <div className="min-h-screen bg-black text-white pb-10">

      {/* ================= BACK ================= */}

      <div className="p-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition"
        >
          <ArrowLeft size={20} />
          Back
        </button>
      </div>

      {/* ================= MAIN ================= */}

      <main className="max-w-6xl mx-auto px-6 py-10">

        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* ================= IMAGE ================= */}

          <div className="flex justify-center">

            <img
              src={song.img}
              alt={song.songname}
              className="
                w-72
                h-72
                sm:w-80
                sm:h-80
                md:w-[420px]
                md:h-[420px]
                object-cover
                rounded-3xl
                shadow-2xl
              "
            />

          </div>

          {/* ================= DETAILS ================= */}

          <div>

            <p className="text-sm text-gray-500 uppercase tracking-[0.3em]">
              Now Playing
            </p>

            <h1 className="
              text-4xl
              sm:text-5xl
              md:text-6xl
              font-bold
              mt-4
              leading-tight
            ">
              {song.songname}
            </h1>

            <p className="text-xl text-gray-400 mt-5">
              {song.singer}
            </p>

            {/* ================= BUTTONS ================= */}

            <div className="flex items-center gap-4 mt-8">

              {/* PLAY */}

              <button
               
                className="
                  flex
                  items-center
                  gap-2
                  bg-white
                  text-black
                  px-7
                  py-3
                  rounded-full
                  font-semibold
                  hover:scale-105
                  transition
                "
              >

                {isCurrentSong && isPlaying ? (
                  <>
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play
                      size={20}
                      fill="currentColor"
                    />
                    <span>Play</span>
                  </>
                )}

              </button>

              {/* HEART */}

              <button
                className="
                  w-12
                  h-12
                  flex
                  items-center
                  justify-center
                  rounded-full
                  bg-gray-800
                  hover:bg-gray-700
                  transition
                "
              >
                <Heart size={22} />
              </button>

              {/* MORE */}

              <button
                className="
                  w-12
                  h-12
                  flex
                  items-center
                  justify-center
                  rounded-full
                  bg-gray-800
                  hover:bg-gray-700
                  transition
                "
              >
                <MoreHorizontal size={22} />
              </button>

            </div>

          </div>

        </div>

      </main>

    </div>
    <MusicPlayer/>
    </>
  );
}