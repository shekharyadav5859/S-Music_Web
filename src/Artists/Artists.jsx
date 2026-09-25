import React, { useEffect, useState } from "react";
import { Check, ChevronRight, Heart, Play } from "lucide-react";
import { artistsData } from "../data/artists";

export default function Artists() {
  const [visibleCount, setVisibleCount] = useState(4);
  const [likedArtists, setLikedArtists] = useState([]);
  const [loading, setLoading] = useState(false);

  // =========================
  // INFINITE SCROLL
  // =========================

  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 250;

      if (bottom && !loading && visibleCount < artistsData.length) {
        setLoading(true);

        setTimeout(() => {
          setVisibleCount((prev) =>
            Math.min(prev + 4, artistsData.length)
          );

          setLoading(false);
        }, 700);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [visibleCount, loading]);

  // =========================
  // LIKE
  // =========================

  const handleLike = (id) => {
    setLikedArtists((prev) => {
      if (prev.includes(id)) {
        return prev.filter((artistId) => artistId !== id);
      }

      return [...prev, id];
    });
  };

  return (
    <main className="min-h-screen bg-black text-white">

      <section className="px-4 sm:px-6 lg:px-8 py-12">

        <div className="max-w-7xl mx-auto">

          {/* =========================
              HEADER
          ========================= */}

          <div className="flex items-end justify-between mb-8">

            <div>

              <div className="flex items-center gap-2 mb-2">
                <span className="w-8 h-[2px] bg-purple-500" />

                <p className="text-sm text-purple-400 font-medium uppercase tracking-widest">
                  Artists
                </p>
              </div>

              <h2 className="
                text-3xl
                sm:text-4xl
                font-bold
                tracking-tight
              ">
                Meet the <span className="text-purple-500">Artists</span>
              </h2>

              <p className="text-gray-500 mt-2 text-sm">
                Explore your favorite voices and discover new artists.
              </p>

            </div>

            <button
              className="
                hidden
                sm:flex
                items-center
                gap-1
                text-sm
                text-gray-400
                hover:text-white
                transition
              "
            >
              View All
              <ChevronRight size={17} />
            </button>

          </div>


          {/* =========================
              ARTISTS GRID
          ========================= */}

          <div className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-5
          ">

            {artistsData
              .slice(0, visibleCount)
              .map((artist) => {

                const liked = likedArtists.includes(artist.id);

                return (

                  <div
                    key={artist.id}
                    className="
                      group
                      relative
                      overflow-hidden
                      rounded-3xl
                      bg-[#111114]
                      border
                      border-white/[0.08]
                      hover:border-purple-500/40
                      transition-all
                      duration-500
                    "
                  >

                    {/* =========================
                        IMAGE
                    ========================= */}

                    <div className="
                      relative
                      aspect-[4/4.5]
                      overflow-hidden
                    ">

                      <img
                        src={artist.img}
                        alt={artist.name}
                        className="
                          w-full
                          h-full
                          object-cover
                          group-hover:scale-110
                          transition-transform
                          duration-700
                        "
                      />


                      {/* DARK GRADIENT */}

                      <div className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black
                        via-black/20
                        to-transparent
                      " />


                      {/* PLAY BUTTON */}

                      <button
                        className="
                          absolute
                          bottom-5
                          left-5
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
                          translate-y-3
                          group-hover:opacity-100
                          group-hover:translate-y-0
                          transition-all
                          duration-300
                        "
                      >
                        <Play
                          size={18}
                          fill="white"
                        />
                      </button>


                      {/* LIKE */}

                      <button
                        onClick={() => handleLike(artist.id)}
                        className="
                          absolute
                          top-4
                          right-4
                          w-10
                          h-10
                          rounded-full
                          bg-black/40
                          backdrop-blur-md
                          border
                          border-white/10
                          flex
                          items-center
                          justify-center
                          hover:bg-black/70
                          transition
                        "
                      >

                        <Heart
                          size={18}
                          className={
                            liked
                              ? "text-pink-500 fill-pink-500"
                              : "text-white"
                          }
                        />

                      </button>


                      {/* ARTIST INFO ON IMAGE */}

                      <div className="
                        absolute
                        left-5
                        right-5
                        bottom-5
                      ">

                        <div className="flex items-center gap-2">

                          <h3 className="
                            text-xl
                            font-bold
                            text-white
                            truncate
                          ">
                            {artist.name}
                          </h3>

                          {artist.verified && (
                            <span className="
                              w-5
                              h-5
                              rounded-full
                              bg-purple-500
                              flex
                              items-center
                              justify-center
                              shrink-0
                            ">
                              <Check
                                size={12}
                                strokeWidth={3}
                              />
                            </span>
                          )}

                        </div>

                        <p className="
                          text-xs
                          text-gray-300
                          mt-1
                        ">
                          {artist.genre}
                        </p>

                      </div>

                    </div>


                    {/* =========================
                        BOTTOM CONTENT
                    ========================= */}

                    <div className="p-4">

                      <div className="
                        flex
                        items-center
                        justify-between
                      ">

                        <div>

                          <p className="
                            text-[11px]
                            text-gray-500
                            uppercase
                            tracking-wider
                          ">
                            Languages
                          </p>

                          <p className="
                            text-xs
                            text-gray-300
                            mt-1
                          ">
                            {artist.language.join(" • ")}
                          </p>

                        </div>

                        <span className="
                          px-3
                          py-1.5
                          rounded-full
                          bg-purple-500/10
                          border
                          border-purple-500/20
                          text-[10px]
                          text-purple-400
                        ">
                          {artist.type}
                        </span>

                      </div>

                    </div>

                  </div>

                );
              })}

          </div>


          {/* =========================
              LOADING
          ========================= */}

          {visibleCount < artistsData.length && (

            <div className="text-center py-10">

              <div className="
                inline-block
                w-6
                h-6
                border-2
                border-white/10
                border-t-purple-500
                rounded-full
                animate-spin
              " />

              <p className="
                text-gray-600
                text-sm
                mt-3
              ">
                Loading more artists...
              </p>

            </div>

          )}


          {/* =========================
              END
          ========================= */}

          {visibleCount >= artistsData.length && (

            <div className="text-center py-10">

              <p className="text-gray-700 text-sm">
                All artists loaded
              </p>

            </div>

          )}

        </div>

      </section>

    </main>
  );
}