import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import {
  Play,
  Heart,
  MoreHorizontal,
  Check,
} from "lucide-react";

import { songData } from "../data/songbox";
import { artistsData } from "../data/artists";
import MusicPlayer from "../BottomPlay/MusicPlayer";
import { AudioContext } from "../Audio/AudioContext";

export default function OneArtists() {
  const { name } = useParams();
  const { curr, playsong } = useContext(AudioContext);

  // Artist find
  const artist = artistsData.find(
    (artist) => artist.name === name
  );

  // Artist ke songs
 const artistSongs = songData.filter((song) =>
  song.singer
    .toLowerCase()
    .includes(name.toLowerCase())
);

  if (!artist) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-2xl">Artist not found</h1>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white pb-20">

      {/* ================= HEADER ================= */}

      <section className="relative overflow-hidden">

        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={artist.img}
            alt=""
            className="w-full h-full object-cover blur-2xl opacity-20 scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/80 to-black" />
        </div>


        {/* Artist Content */}

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-16 pb-10">

          <div className="flex flex-col md:flex-row items-center md:items-end gap-8">

            {/* Artist Image */}

            <div className="relative shrink-0">

              <img
                src={artist.img}
                alt={artist.name}
                className="
                  w-48
                  h-48
                  sm:w-56
                  sm:h-56
                  rounded-full
                  object-cover
                  border-4
                  border-white/10
                  shadow-2xl
                "
              />

              {/* Verified */}

              {artist.verified && (
                <div className="
                  absolute
                  bottom-3
                  right-3
                  w-8
                  h-8
                  rounded-full
                  bg-purple-600
                  flex
                  items-center
                  justify-center
                  border-4
                  border-black
                ">
                  <Check size={16} />
                </div>
              )}

            </div>


            {/* Artist Info */}

            <div className="text-center md:text-left">

              <p className="text-sm text-purple-400 uppercase tracking-widest mb-2">
                Artist
              </p>

              <h1 className="
                text-4xl
                sm:text-5xl
                lg:text-6xl
                font-bold
                tracking-tight
              ">
                {artist.name}
              </h1>

              <p className="text-gray-400 mt-3">
                {artist.genre} • {artist.language.join(" • ")}
              </p>

              <p className="text-gray-500 text-sm mt-2">
                {artistSongs.length} songs
              </p>

            </div>

          </div>


          {/* Buttons */}

          <div className="flex justify-center md:justify-start items-center gap-3 mt-8">

            <button className="
              flex
              items-center
              gap-2
              px-6
              py-3
              rounded-full
              bg-purple-600
              hover:bg-purple-500
              transition
              font-medium
              shadow-lg
              shadow-purple-500/20
            ">
              <Play size={18} fill="white" />
              Play All
            </button>

            <button className="
              w-11
              h-11
              rounded-full
              border
              border-white/10
              bg-white/5
              flex
              items-center
              justify-center
              hover:bg-white/10
              transition
            ">
              <Heart size={19} />
            </button>

          </div>

        </div>

      </section>


      {/* ================= SONG LIST ================= */}

      <section className="max-w-7xl mx-auto px-5 sm:px-8 mt-6">

        <div className="flex items-center justify-between mb-5">

          <div>
            <p className="text-xs text-purple-400 uppercase tracking-widest">
              Music
            </p>

            <h2 className="text-2xl font-bold mt-1">
              Songs by {artist.name}
            </h2>
          </div>

        </div>


        {/* Songs */}

        <div className="space-y-2">

          {artistSongs.map((song, index) => (

            <div
              key={song.id}
         onClick={() => {
  if (artistSongs.length > 0) {
    playsong(artistSongs[0], artistSongs);
  }
}}
              className="
                group
                flex
                items-center
                gap-4
                p-3
                rounded-xl
                hover:bg-white/[0.06]
                transition
                cursor-pointer
              "
            >

              {/* Number */}

              <span className="
                w-6
                text-center
                text-sm
                text-gray-600
                group-hover:text-purple-400
              ">
                {index + 1}
              </span>


              {/* Image */}

             <div className="relative w-12 h-12 shrink-0 overflow-hidden rounded-lg">

  <img
    src={song.img}
    alt={song.songname}
    className="
      w-full
      h-full
      object-cover
      object-center
    "
  />

  <div
    className="
      absolute
      inset-0
      bg-black/50
      opacity-0
      group-hover:opacity-100
      flex
      items-center
      justify-center
      transition
    "
  >
    <Play size={17} fill="white" />
  </div>

</div>


              {/* Song Info */}

              <div className="min-w-0 flex-1">

                <h3 className="
                  font-medium
                  truncate
                  group-hover:text-purple-400
                  transition
                ">
                  {song.songname}
                </h3>

                <p className="text-xs text-gray-500 truncate">
                  {song.singer}
                </p>

              </div>


              {/* Duration */}

              <span className="hidden sm:block text-sm text-gray-500">
                {song.duration}
              </span>


              {/* More */}

              <button className="
                w-9
                h-9
                rounded-full
                flex
                items-center
                justify-center
                text-gray-500
                hover:text-white
                hover:bg-white/10
                transition
              ">
                <MoreHorizontal size={19} />
              </button>

            </div>

          ))}

        </div>

      </section>
{curr && < MusicPlayer/>}
    </main>
  );
}
