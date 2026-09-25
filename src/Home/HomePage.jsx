import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Play, Heart } from "lucide-react";
import { songData } from "../data/songbox";
import { Link } from "react-router-dom";

export default function MainPage() {
  const [current, setCurrent] = useState(0);

  const songsPerPage = 4;
  const totalPages = Math.ceil(songData.length / songsPerPage);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? totalPages - 1 : prev - 1
    );
  };

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % totalPages);
    }, 4000);

    return () => clearInterval(timer);
  }, [totalPages]);

  return (
    <main className="bg-black min-h-screen text-white">

      <section className="px-4 sm:px-6 lg:px-8 py-10">

        <div className="max-w-7xl mx-auto">

          {/* Heading */}
          <div className="flex items-end justify-between mb-6">

            <div>
              <p className="text-sm text-purple-400 font-medium">
                Listen Now
              </p>

              <h2 className="text-2xl sm:text-3xl font-bold mt-1">
                Trending Songs
              </h2>
            </div>

            {/* Arrows */}
            <div className="flex gap-2">

              <button
                onClick={prevSlide}
                className="
                  w-10 h-10
                  rounded-full
                  bg-white/5
                  border border-white/10
                  flex items-center justify-center
                  hover:bg-purple-600
                  hover:border-purple-600
                  transition-all
                "
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={nextSlide}
                className="
                  w-10 h-10
                  rounded-full
                  bg-white/5
                  border border-white/10
                  flex items-center justify-center
                  hover:bg-purple-600
                  hover:border-purple-600
                  transition-all
                "
              >
                <ChevronRight size={20} />
              </button>

            </div>
          </div>


          {/* Slider */}
          <div className="overflow-hidden">

            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${current * 100}%)`,
              }}
            >

              {/* 4-4 Songs */}
              {Array.from({ length: totalPages }).map(
                (_, pageIndex) => (

                  <div
                    key={pageIndex}
                    className="
                      min-w-full
                      grid
                      grid-cols-1
                      sm:grid-cols-2
                      md:grid-cols-3
                      lg:grid-cols-4
                      gap-5
                    "
                  >

                    {songData
                      .slice(
                        pageIndex * songsPerPage,
                        pageIndex * songsPerPage + songsPerPage
                      )
                      .map((song) => (

                        /* CARD */
                        <div
                          key={song.id}
                          className="
                            group
                            bg-[#111114]
                            border border-white/10
                            rounded-2xl
                            overflow-hidden
                            hover:-translate-y-1
                            hover:border-purple-500/40
                            transition-all
                            duration-300
                          "
                        >

                          {/* Image */}
                        <Link to={`/One/song/Page/${song.id}/${song.songname}`}
                        state={{song}}
                        >
                          <div className="relative w-full aspect-square overflow-hidden">

                            <img
                              src={song.img}
                              alt={song.songname}
                              className="
                                w-full
                                h-full
                                object-cover
                                group-hover:scale-105
                                transition-transform
                                duration-500
                              "
                            />

                            {/* Play Button */}
                            <button
                              className="
                                absolute
                                bottom-4
                                right-4
                                w-11
                                h-11
                                rounded-full
                                bg-purple-600
                                flex
                                items-center
                                justify-center
                                shadow-lg
                                shadow-purple-500/30
                                opacity-0
                                translate-y-2
                                group-hover:opacity-100
                                group-hover:translate-y-0
                                transition-all
                              "
                            >
                              <Play
                                size={18}
                                fill="white"
                              />
                            </button>

                          </div>
                        
                        </Link>

                          


                          {/* Card Content */}
                          <div className="p-4">

                            <div className="flex items-start justify-between gap-2">

                              <div className="min-w-0">

                                <h3 className="
                                  text-sm
                                  font-semibold
                                  text-white
                                  truncate
                                ">
                                  {song.songname}
                                </h3>

                                <p className="
                                  text-xs
                                  text-gray-500
                                  mt-1
                                  truncate
                                ">
                                  {song.singer}
                                </p>

                              </div>

                              <button
                                className="
                                  shrink-0
                                  text-gray-500
                                  hover:text-pink-500
                                  transition
                                "
                              >
                                <Heart size={18} />
                              </button>

                            </div>


                            {/* Bottom */}
                            <div className="
                              flex
                              justify-between
                              items-center
                              mt-3
                            ">

                              <span className="
                                text-[11px]
                                text-gray-600
                              ">
                                {song.duration}
                              </span>

                              <span className="
                                text-[10px]
                                text-purple-400
                              ">
                                S-Music
                              </span>

                            </div>

                          </div>

                        </div>

                      ))}

                  </div>

                )
              )}

            </div>

          </div>


          {/* Dots */}
          <div className="flex justify-center gap-2 mt-7">

            {Array.from({ length: totalPages }).map(
              (_, index) => (

                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`
                    h-1.5
                    rounded-full
                    transition-all
                    duration-300
                    ${
                      current === index
                        ? "w-8 bg-purple-500"
                        : "w-2 bg-white/20"
                    }
                  `}
                />

              )
            )}

          </div>

        </div>

      </section>

    </main>
  );
}