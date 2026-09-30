<div className="flex items-center gap-3 sm:gap-5 md:gap-6">

  {/* Shuffle */}
  <button
    onClick={() => setShuffle(prev => !prev)}
    className={shuffle ? "text-purple-500" : "text-gray-300 hover:text-white"}
  >
    <Shuffle size={18} />
  </button>

  {/* Previous */}
  <button className="text-gray-300 hover:text-white">
    <SkipBack size={18} fill="currentColor" />
  </button>

  {/* Play / Pause */}
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

  {/* Next */}
  <button className="text-gray-300 hover:text-white">
    <SkipForward size={18} fill="currentColor" />
  </button>

  {/* Repeat */}
  <button
    onClick={() => setRepeat(prev => !prev)}
    className={repeat ? "text-purple-500" : "text-gray-300 hover:text-white"}
  >
    <Repeat size={18} />
  </button>

</div>





