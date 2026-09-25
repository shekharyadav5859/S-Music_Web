import React from "react";
import { Play, Sparkles, Headphones, ArrowRight } from "lucide-react";

import heroImg from "../assets/photo/g.jpg";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 pt-6 pb-8">
      
      {/* Background Glow */}
      <div className="absolute -top-20 left-1/3 w-72 h-72 bg-purple-600/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-10 w-60 h-60 bg-pink-500/10 blur-[100px] rounded-full" />

      <div className="relative max-w-7xl mx-auto">
        <div className="relative min-h-[420px] sm:min-h-[460px] rounded-[30px] overflow-hidden border border-white/10 bg-[#111114]">

          {/* Hero Image */}
          <img
            src={heroImg}
            alt="Featured music"
            className="absolute inset-0 w-full h-full object-cover opacity-45"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

          {/* Content */}
          <div className="relative z-10 flex items-center min-h-[420px] sm:min-h-[460px] px-6 sm:px-10 lg:px-16">
            <div className="max-w-2xl">

              {/* Small Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-sm text-gray-200 mb-6">
                <Sparkles size={15} className="text-purple-400" />
                Your music. Your mood.
              </div>

              {/* Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight text-white">
                Music that
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
                  feels like you.
                </span>
              </h1>

              {/* Description */}
              <p className="mt-5 max-w-lg text-sm sm:text-base text-gray-300 leading-7">
                Discover your favorite songs, artists and timeless melodies.
                Create your own vibe and enjoy every moment with S-Music.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap items-center gap-3 mt-8">

                <button className="group flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-black font-semibold text-sm hover:scale-[1.03] transition-all duration-300">
                  <Play size={18} fill="currentColor" />
                  Start Listening

                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>

                <button className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md text-white font-medium text-sm hover:bg-white/15 transition">
                  <Headphones size={18} />
                  Explore Music
                </button>

              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 sm:gap-10 mt-9">

                <div>
                  <p className="text-xl font-bold text-white">15+</p>
                  <p className="text-xs text-gray-500 mt-1">Songs</p>
                </div>

                <div className="w-px h-8 bg-white/10" />

                <div>
                  <p className="text-xl font-bold text-white">10+</p>
                  <p className="text-xs text-gray-500 mt-1">Artists</p>
                </div>

                <div className="w-px h-8 bg-white/10" />

                <div>
                  <p className="text-xl font-bold text-white">24/7</p>
                  <p className="text-xs text-gray-500 mt-1">Your Vibe</p>
                </div>

              </div>

            </div>
          </div>

          {/* Music Visualizer */}
          <div className="absolute bottom-8 right-8 hidden md:flex items-end gap-1 opacity-70">
            {[20, 35, 50, 28, 45, 65, 38, 55, 30, 48].map(
              (height, index) => (
                <span
                  key={index}
                  style={{ height: `${height}px` }}
                  className="w-1.5 rounded-full bg-purple-400"
                />
              )
            )}
          </div>

        </div>
      </div>
    </section>
  );
}