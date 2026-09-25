import React, { useState } from "react";
import {
  Search,
  Bell,
  User,
  Menu,
  X,
  Headphones,
} from "lucide-react";

export default function Navber() {
  const [mobileSearch, setMobileSearch] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/90 backdrop-blur-xl">

        <div className="h-[76px] px-4 sm:px-6 lg:px-8 flex items-center justify-between">

          {/* ================= LOGO ================= */}
          <div className="flex items-center gap-3 shrink-0">

            {/* Mobile Menu */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center text-gray-300 hover:bg-white/10 transition"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Logo */}
            <div className="flex items-center gap-3">

              <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-600 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20">

                <Headphones
                  size={23}
                  strokeWidth={2.3}
                  className="text-white"
                />

                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-pink-400 border-2 border-black" />

              </div>

              <div className="hidden sm:block">
                <h1 className="text-[21px] font-bold tracking-tight text-white leading-none">
                  S<span className="text-violet-500">-Music</span>
                </h1>

                <p className="text-[10px] text-gray-500 mt-1 tracking-[2px] uppercase">
                  Feel the music
                </p>
              </div>

            </div>

          </div>


          {/* ================= SEARCH ================= */}
          <div className="hidden md:block w-[35%] max-w-[480px]">

            <div className="group relative">

              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-violet-400 transition"
              />

              <input
                type="text"
                placeholder="Search songs, artists, albums..."
                className="
                  w-full
                  h-11
                  pl-11
                  pr-12
                  rounded-2xl
                  bg-[#111113]
                  border border-white/[0.08]
                  outline-none
                  text-sm
                  text-white
                  placeholder:text-gray-600
                  transition-all
                  duration-300
                  focus:bg-[#17171a]
                  focus:border-violet-500/50
                  focus:shadow-[0_0_25px_rgba(139,92,246,0.08)]
                "
              />

              <span className="absolute right-3 top-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center w-7 h-6 rounded-md bg-white/5 border border-white/5 text-[10px] text-gray-600">
                /
              </span>

            </div>

          </div>


          {/* ================= RIGHT ================= */}
          <div className="flex items-center gap-1.5 sm:gap-3">

            {/* Mobile Search */}
            <button
              onClick={() => setMobileSearch(!mobileSearch)}
              className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center text-gray-300 hover:bg-white/10 transition"
            >
              {mobileSearch ? <X size={21} /> : <Search size={21} />}
            </button>


            {/* Notification */}
            <button className="relative w-10 h-10 rounded-xl flex items-center justify-center text-gray-300 hover:bg-white/10 transition">

              <Bell size={20} />

              <span className="absolute top-[9px] right-[9px] w-2 h-2 rounded-full bg-violet-500 ring-2 ring-black" />

            </button>


            {/* Divider */}
            <div className="hidden sm:block w-px h-7 bg-white/10 mx-1" />


            {/* Profile */}
            <button className="flex items-center gap-2 p-1.5 sm:pr-3 rounded-xl bg-[#111113] border border-white/[0.08] hover:bg-[#18181b] hover:border-white/15 transition">

              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-pink-500 flex items-center justify-center">

                <User size={17} className="text-white" />

              </div>

              <div className="hidden lg:block text-left">
                <p className="text-xs font-medium text-white">
                  Guest User
                </p>

                <p className="text-[10px] text-gray-500">
                  Free Account
                </p>
              </div>

            </button>

          </div>

        </div>


        {/* ================= MOBILE SEARCH ================= */}
        {mobileSearch && (
          <div className="md:hidden px-4 pb-4">

            <div className="relative">

              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                autoFocus
                type="text"
                placeholder="Search songs, artists..."
                className="
                  w-full
                  h-11
                  pl-11
                  pr-4
                  rounded-xl
                  bg-[#151515]
                  border border-white/10
                  outline-none
                  text-sm
                  text-white
                  placeholder:text-gray-600
                  focus:border-violet-500/50
                "
              />

            </div>

          </div>
        )}

      </header>


      {/* ================= MOBILE MENU ================= */}
      {menuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/80 backdrop-blur-sm">

          <div className="absolute left-0 top-[76px] w-[280px] h-[calc(100vh-76px)] bg-[#0b0b0d] border-r border-white/10 p-5">

            <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">
              Menu
            </p>

            <div className="space-y-2">

              {["Home", "Library", "Artists", "Liked Songs", "Playlists"].map(
                (item) => (
                  <button
                    key={item}
                    onClick={() => setMenuOpen(false)}
                    className="w-full text-left px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition"
                  >
                    {item}
                  </button>
                )
              )}

            </div>

          </div>

        </div>
      )}
    </>
  );
}
