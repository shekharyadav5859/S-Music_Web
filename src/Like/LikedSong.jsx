
import React, { useContext, useEffect, useState } from "react";
import { Heart, Play, Trash2, Music2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AudioContext } from "../Audio/AudioContext";
import MusicPlayer from "../BottomPlay/MusicPlayer";

export default function LikedSong() {

  const{curr , playsong} = useContext(AudioContext);
  const navigate = useNavigate();

  const [likedSongs, setLikedSongs] = useState([]);

  // Load liked songs
  useEffect(() => {
    const currentUser =JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
      navigate("/login");
      return;
    }

    setLikedSongs(currentUser.likedSongs || []);
  }, [navigate]);

  // Remove like
  const removeLike = (songId) => {
    const currentUser =JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
      navigate("/login");
      return;
    }

    const updatedLikedSongs =(currentUser.likedSongs || []).filter((song) => song?.id !== songId);

    const updatedUser = {
      ...currentUser,
      likedSongs: updatedLikedSongs,
    };

    // Update current user
    localStorage.setItem("currentUser",JSON.stringify(updatedUser));

    // Update users array
    const users =JSON.parse(localStorage.getItem("users")) || [];

    const updatedUsers = users.map((user) =>
      user.id === currentUser.id
        ? updatedUser
        : user
    );

    localStorage.setItem("users",JSON.stringify(updatedUsers));

    // Update UI immediately
    setLikedSongs(updatedLikedSongs);
  };

  // Play song
  const playSong = (song) => {
    console.log("Playing:", song);

   
  };

  return (
<>

    <div className="min-h-screen bg-black text-white px-4 sm:px-6 lg:px-8 py-6">

      {/* Header */}
      <div className="flex items-center gap-5 mb-8">

        {/* Cover */}
        <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
          <Heart
            size={55}
            className="text-white fill-white"
          />
        </div>

        {/* Info */}
        <div>
          <p className="text-sm text-gray-400 mb-1">
            Playlist
          </p>

          <h1 className="text-3xl sm:text-4xl font-bold">
            Liked Songs
          </h1>

          <p className="text-gray-400 mt-2">
            {likedSongs.length}{" "}
            {likedSongs.length === 1 ? "song" : "songs"}
          </p>
        </div>
      </div>

      {/* Empty State */}
      {likedSongs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">

          <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-5">
            <Music2
              size={35}
              className="text-gray-500"
            />
          </div>

          <h2 className="text-xl font-semibold">
            No liked songs yet
          </h2>

          <p className="text-gray-500 mt-2">
            Songs you like will appear here.
          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-6 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 transition"
          >
            Explore Songs
          </button>
        </div>
      ) : (

        <div className="space-y-2">

          {/* Play All */}
          <button
            onClick={() => playSong(likedSongs[0])}
            className="w-12 h-12 rounded-full bg-purple-600 hover:bg-purple-500 flex items-center justify-center mb-5 transition"
          >
            <Play
              size={21}
              fill="white"
            />
          </button>

          {/* Songs */}
          {likedSongs.map((song, index) => (

            <div
            onClick={()=>playsong(song)}
              key={song.id}
              className="group flex items-center gap-3 sm:gap-4 p-3 rounded-xl hover:bg-white/5 transition"
            >

              {/* Number */}
              <div className="w-6 text-center text-gray-500 text-sm">
                {index + 1}
              </div>

              {/* Image */}
              <img
                src={song.img}
                alt={song.songname}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg object-cover"
              />

              {/* Song Info */}
              <div
                className="flex-1 min-w-0 cursor-pointer"
                onClick={() => playSong(song)}
              >
                <h3 className="font-medium truncate">
                  {song.songname}
                </h3>

                <p className="text-sm text-gray-500 truncate">
                  {song.singer}
                </p>
              </div>

              {/* Duration */}
              <span className="hidden sm:block text-sm text-gray-500">
                {song.duration || "--:--"}
              </span>

              {/* Like */}
              <button
                onClick={() => removeLike(song.id)}
                className="p-2 rounded-full hover:bg-white/10 transition"
                title="Remove from liked songs"
              >
                <Heart
                  size={20}
                  className="text-red-500 fill-red-500"
                />
              </button>

              {/* Delete */}
              <button
                onClick={() => removeLike(song.id)}
                className="p-2 rounded-full hover:bg-white/10 transition"
                title="Remove"
              >
                <Trash2
                  size={19}
                  className="text-gray-400 hover:text-red-400"
                />
              </button>

            </div>
          ))}
        </div>
      )}
    </div>
{curr && <MusicPlayer/>}
    </>
  );
}
