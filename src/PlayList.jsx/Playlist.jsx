
import React, { useEffect, useState } from "react";
import {
  Plus,
  Music,
  MoreVertical,
  Trash2,
  Play,
  X,
  ListMusic,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Playlist() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [playlists, setPlaylists] = useState([]);

  const [showCreate, setShowCreate] = useState(false);
  const [playlistName, setPlaylistName] = useState("");

  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

 
  // Load Current User
 
  useEffect(() => {
    const currentUser =
      JSON.parse(localStorage.getItem("currentUser")) || null;

    if (!currentUser) {
      navigate("/login");
      return;
    }

    setUser(currentUser);
    setPlaylists(currentUser.playlists || []);
  }, [navigate]);

  // -----------------------------
  // Save User
  // -----------------------------
  const saveUser = (updatedPlaylists) => {
    const updatedUser = {
      ...user,
      playlists: updatedPlaylists,
    };

    localStorage.setItem(
      "currentUser",
      JSON.stringify(updatedUser)
    );

    // Also update users array
    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const updatedUsers = users.map((item) =>
      item.id === user.id ? updatedUser : item
    );

    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );

    setUser(updatedUser);
    setPlaylists(updatedPlaylists);
  };

  // -----------------------------
  // Create Playlist
  // -----------------------------
  const createPlaylist = () => {
    const name = playlistName.trim();

    if (!name) return;

    const newPlaylist = {
      id: Date.now(),
      name: name,
      songs: [],
      createdAt: new Date().toISOString(),
    };

    const updatedPlaylists = [
      ...playlists,
      newPlaylist,
    ];

    saveUser(updatedPlaylists);

    setPlaylistName("");
    setShowCreate(false);
  };

  // -----------------------------
  // Delete Playlist
  // -----------------------------
  const deletePlaylist = (playlistId) => {
    const updatedPlaylists = playlists.filter(
      (playlist) => playlist.id !== playlistId
    );

    saveUser(updatedPlaylists);

    if (selectedPlaylist?.id === playlistId) {
      setSelectedPlaylist(null);
    }
  };

  // -----------------------------
  // Open Playlist
  // -----------------------------
  const openPlaylist = (playlist) => {
    setSelectedPlaylist(playlist);
  };

  // -----------------------------
  // Close Playlist
  // -----------------------------
  const closePlaylist = () => {
    setSelectedPlaylist(null);
  };

  // -----------------------------
  // Loading
  // -----------------------------
  if (!user) {
    return null;
  }

  // -----------------------------
  // Playlist Details
  // -----------------------------
  if (selectedPlaylist) {
    return (
      <div className="min-h-screen bg-[#09090b] px-4 py-8 text-white sm:px-8">

        {/* Back */}
        <button
          onClick={closePlaylist}
          className="mb-8 flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
        >
          <ArrowLeft size={18} />
          Back to Playlists
        </button>

        {/* Header */}
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end">

          <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-pink-500 shadow-xl shadow-violet-900/20">
            <Music size={55} />
          </div>

          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-widest text-violet-400">
              Playlist
            </p>

            <h1 className="text-3xl font-bold sm:text-4xl">
              {selectedPlaylist.name}
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              {selectedPlaylist.songs.length} songs
            </p>
          </div>

        </div>

        {/* Play Button */}
        {selectedPlaylist.songs.length > 0 && (
          <button
            className="mb-8 flex h-12 w-12 items-center justify-center rounded-full bg-violet-600 transition hover:bg-violet-500"
          >
            <Play size={20} fill="currentColor" />
          </button>
        )}

        {/* Songs */}
        <div className="space-y-2">

          {selectedPlaylist.songs.length === 0 ? (

            <div className="rounded-2xl border border-white/[0.08] bg-[#111113] py-20 text-center">

              <Music
                size={45}
                className="mx-auto mb-4 text-gray-700"
              />

              <h2 className="text-lg font-semibold">
                This playlist is empty
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Add songs to start listening.
              </p>

            </div>

          ) : (

            selectedPlaylist.songs.map((song, index) => (

              <div
                key={song.id || index}
                className="group flex items-center gap-4 rounded-xl px-4 py-3 transition hover:bg-[#18181b]"
              >

                <span className="w-6 text-sm text-gray-600">
                  {index + 1}
                </span>

                <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-lg bg-[#27272a]">

                  {song.img ? (
                    <img
                      src={song.img}
                      alt={song.songname}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Music size={18} />
                  )}

                </div>

                <div className="min-w-0 flex-1">

                  <p className="truncate text-sm font-medium">
                    {song.songname}
                  </p>

                  <p className="truncate text-xs text-gray-500">
                    {song.singer}
                  </p>

                </div>

                <button
                  className="rounded-lg p-2 text-gray-500 opacity-0 transition hover:bg-white/5 hover:text-white group-hover:opacity-100"
                >
                  <Play size={17} />
                </button>

              </div>

            ))

          )}

        </div>

      </div>
    );
  }

  // -----------------------------
  // Main Playlist Page
  // -----------------------------
  return (
    <div className="min-h-screen bg-[#09090b] px-4 py-8 text-white sm:px-8">

      {/* Header */}
      <div className="mb-10 flex items-center justify-between">

        <div>

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-pink-500">
              <ListMusic size={23} />
            </div>

            <h1 className="text-3xl font-bold">
              Your Playlists
            </h1>

          </div>

          <p className="mt-2 text-sm text-gray-500">
            Create and manage your music playlists.
          </p>

        </div>

        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold transition hover:bg-violet-500"
        >
          <Plus size={18} />
          <span className="hidden sm:block">
            Create Playlist
          </span>
        </button>

      </div>

      {/* Empty */}
      {playlists.length === 0 ? (

        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border border-white/[0.08] bg-[#111113] text-center">

          <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600/20 to-pink-500/20">
            <ListMusic
              size={38}
              className="text-violet-500"
            />
          </div>

          <h2 className="text-xl font-semibold">
            No playlists yet
          </h2>

          <p className="mt-2 max-w-sm text-sm text-gray-500">
            Create your first playlist and add your
            favorite songs.
          </p>

          <button
            onClick={() => setShowCreate(true)}
            className="mt-6 flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-gray-200"
          >
            <Plus size={17} />
            Create Playlist
          </button>

        </div>

      ) : (

        /* Playlist Grid */
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {playlists.map((playlist) => (

            <div
              key={playlist.id}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111113] p-4 transition hover:-translate-y-1 hover:border-white/[0.15]"
            >

              {/* Cover */}
              <button
                onClick={() => openPlaylist(playlist)}
                className="relative mb-4 block aspect-square w-full overflow-hidden rounded-xl bg-gradient-to-br from-violet-600 to-pink-500"
              >

                <div className="flex h-full items-center justify-center">

                  <Music
                    size={60}
                    className="text-white/80"
                  />

                </div>

                {/* Play */}
                <div className="absolute bottom-3 right-3 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-white text-black opacity-0 shadow-xl transition group-hover:translate-y-0 group-hover:opacity-100">
                  <Play size={18} fill="currentColor" />
                </div>

              </button>

              {/* Details */}
              <div className="flex items-center justify-between">

                <button
                  onClick={() => openPlaylist(playlist)}
                  className="min-w-0 text-left"
                >
                  <h2 className="truncate text-base font-semibold">
                    {playlist.name}
                  </h2>

                  <p className="mt-1 text-xs text-gray-500">
                    {playlist.songs.length} songs
                  </p>
                </button>

                {/* Delete */}
                <button
                  onClick={() => deletePlaylist(playlist.id)}
                  className="rounded-lg p-2 text-gray-500 transition hover:bg-red-500/10 hover:text-red-400"
                  title="Delete playlist"
                >
                  <Trash2 size={17} />
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

      {/* Create Modal */}
      {showCreate && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
          onClick={() => setShowCreate(false)}
        >

          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-2xl border border-white/[0.08] bg-[#151517] p-6 shadow-2xl"
          >

            {/* Modal Header */}
            <div className="mb-6 flex items-center justify-between">

              <div>

                <h2 className="text-xl font-bold">
                  Create Playlist
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Give your playlist a name.
                </p>

              </div>

              <button
                onClick={() => setShowCreate(false)}
                className="rounded-lg p-2 text-gray-500 hover:bg-white/5 hover:text-white"
              >
                <X size={19} />
              </button>

            </div>

            {/* Input */}
            <input
              type="text"
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  createPlaylist();
                }
              }}
              placeholder="My favorite songs"
              autoFocus
              className="w-full rounded-xl border border-white/[0.08] bg-[#0f0f11] px-4 py-3.5 text-sm text-white outline-none placeholder:text-gray-600 focus:border-violet-500"
            />

            {/* Buttons */}
            <div className="mt-5 flex gap-3">

              <button
                onClick={() => setShowCreate(false)}
                className="flex-1 rounded-xl border border-white/[0.08] py-3 text-sm font-medium text-gray-400 transition hover:bg-white/5 hover:text-white"
              >
                Cancel
              </button>

              <button
                onClick={createPlaylist}
                disabled={!playlistName.trim()}
                className="flex-1 rounded-xl bg-violet-600 py-3 text-sm font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Create
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}
