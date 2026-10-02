import React, { useEffect, useRef, useState } from "react";
import { AudioContext } from "./AudioContext";
import { songData } from "../data/songbox";

export default function Provider({ children }) {
  const [curr, setCurr] = useState(null);
  const [play, setPlay] = useState(false);
  const [isLoop, setIsLoop] = useState(false);
  const [volume, setVolume] = useState(0.7);

  // Current playing list / queue
  const [queue, setQueue] = useState(songData);

  const [length, setLength] = useState({
    currTime: 0,
    duration: 0,
  });

  const audioRef = useRef(new Audio());


  // PLAY SONG


  const playsong = (song, songs = songData) => {
    if (!song) return;

    const audio = audioRef.current;

    audio.pause();
    audio.currentTime = 0;

    audio.src = song.song;

    setCurr(song);

  
    setQueue(songs);

    setLength({
      currTime: 0,
      duration: 0,
    });

    audio.play()
      .then(() => {
        setPlay(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  // PLAY / PAUSE


  const togglePlay = () => {
    const audio = audioRef.current;

    if (audio.paused) {
      audio
        .play()
        .then(() => {
          setPlay(true);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      audio.pause();
      setPlay(false);
    }
  };

 
  // AUDIO EVENTS
 

  useEffect(() => {
    const audio = audioRef.current;

    const updateTime = () => {
      setLength({
        currTime: audio.currentTime,
        duration: audio.duration || 0,
      });
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateTime);

    audio.onplay = () => {
      setPlay(true);
    };

    audio.onpause = () => {
      setPlay(false);
    };

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateTime);

      audio.onplay = null;
      audio.onpause = null;
    };
  }, []);


  // AUTO NEXT
 

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.onended = () => {
      setPlay(false);

      // Loop OFF →
      if (!isLoop) {
        alternetive();
      }

      // Loop ON →
    };

    return () => {
      audio.onended = null;
    };
  }, [curr, queue, isLoop]);

 
  // SEEK
 

  const seekSong = (percent) => {
    const audio = audioRef.current;

    if (!audio || !audio.duration) return;

    audio.currentTime =
      (percent / 100) * audio.duration;

    setLength({
      currTime: audio.currentTime,
      duration: audio.duration,
    });
  };


  // PREVIOUS SONG


  const backword = () => {
    const audio = audioRef.current;

    if (!audio || !curr || queue.length === 0) return;

    const currIdx = queue.findIndex(
      (song) => song.id === curr.id
    );

    if (currIdx === -1) return;

    // First song 
    if (currIdx <= 0) return;

    const prevSong = queue[currIdx - 1];

    playsong(prevSong, queue);
  };


  // NEXT SONG
 

  const forword = () => {
    const audio = audioRef.current;

    if (!audio || !curr || queue.length === 0) return;

    const currIdx = queue.findIndex(
      (song) => song.id === curr.id
    );

    if (currIdx === -1) return;

    const nextIndex =
      (currIdx + 1) % queue.length;

    const nextSong = queue[nextIndex];

    playsong(nextSong, queue);
  };

 
  // AUTO NEXT
 

  const alternetive = () => {
    if (!curr || queue.length === 0) return;

    const currIdx = queue.findIndex(
      (song) => song.id === curr.id
    );

    if (currIdx === -1) return;

    const nextIndex =
      (currIdx + 1) % queue.length;

    const nextSong = queue[nextIndex];

    playsong(nextSong, queue);
  };


  // LOOP
 

  const loop = () => {
    const audio = audioRef.current;

    if (!audio) return;

    const newLoop = !isLoop;

    audio.loop = newLoop;

    setIsLoop(newLoop);
  };



  const changeVolume = (e) => {
    const rect =
      e.currentTarget.getBoundingClientRect();

    const clickPosition =
      e.clientX - rect.left;

    let newVolume =
      clickPosition / rect.width;

   
    newVolume = Math.max(
      0,
      Math.min(1, newVolume)
    );

    audioRef.current.volume = newVolume;

    setVolume(newVolume);
  };



  return (
    <AudioContext.Provider
      value={{
        play,
        togglePlay,

        curr,
        setCurr,

        playsong,

        queue,

        length,
        seekSong,

        backword,
        forword,
        alternetive,

        isLoop,
        loop,

        changeVolume,
        volume,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}









// import React, { useEffect, useRef, useState } from "react";
// import { AudioContext } from "./AudioContext";
// import { songData } from "../data/songbox";

// export default function Provider({ children }) {
//   const [curr, setCurr] = useState(null);
//   const [play, setPlay] = useState(false);
//   const [isLoop, setIsLoop] = useState(false);
//   const [volume, setVolume] = useState(0.7);

//   const [length, setLength] = useState({
//     currTime: 0,
//     duration: 0,
//   });

  
//   const audioRef = useRef(new Audio());

//   const playsong = (song) => {
//     if (!song) return;
//     const audio = audioRef.current;
//     audio.pause();
//     audio.currentTime = 0;

  
//     audio.src = song.song;

//     setCurr(song);

//     setLength({
//       currTime: 0,
//       duration: 0,
//     });

//     audio.play()
//       .then(() => setPlay(true))
//       .catch((error) => console.log(error));
//   };


//   const togglePlay = () => {
//     const audio = audioRef.current;

//     if (audio.paused) {
//       audio
//         .play()
//         .then(() => setPlay(true))
//         .catch((error) => console.log(error));
//     } else {
//       audio.pause();
//       setPlay(false);
//     }
//   };

 
//   useEffect(() => {
//     const audio = audioRef.current;

//     const updateTime = () => {
//       setLength({
//         currTime: audio.currentTime,
//         duration: audio.duration || 0,
//       });
//     };

//     audio.addEventListener("timeupdate", updateTime);
//     audio.addEventListener("loadedmetadata", updateTime);

//     audio.onplay = () => {
//       setPlay(true);
//     };

//     audio.onpause = () => {
//       setPlay(false);
//     };

//     audio.onended = () => {
//       setPlay(false);

//       setLength((prev) => ({
//         ...prev,
//         currTime: 0,
//       }));
//     };

//     return () => {
//       audio.removeEventListener("timeupdate", updateTime);
//       audio.removeEventListener("loadedmetadata", updateTime);

//       audio.onplay = null;
//       audio.onpause = null;
//       audio.onended = null;
//     };
//   }, []);

// const seekSong = (percent) => {
//   const audio = audioRef.current;

//   if (!audio || !audio.duration) return;

//   audio.currentTime = (percent / 100) * audio.duration;

//   setLength({
//     currTime: audio.currentTime,
//     duration: audio.duration,
//   });
// };


// const backword =()=>{
// const audio = audioRef.current;
// if(!audio)return;

// const currIdx = songData.findIndex((song)=> song.id === curr.id);

// if(currIdx>0){
//   const privsong = songData[currIdx-1];
//   audio.src = privsong.song;
//   audio.currentTime =0;
//   audio.play();
//   setCurr(privsong);
// }
// }
// const forword = () => {
//   const audio = audioRef.current;

//   if (!audio) return;

//   const currIdx = songData.findIndex(
//     (song) => song.id === curr.id
//   );

//   if (currIdx === -1) return;


//   const nextIndex = (currIdx + 1) % songData.length;

//   const nextSong = songData[nextIndex];

//   audio.src = nextSong.song;
//   audio.currentTime = 0;
//   audio.play();

//   setCurr(nextSong);
// };



// const loop = () => {
  
//   const audio = audioRef.current;

//   if (!audio) return;
//   const newLoop = !isLoop;

//   audio.loop = newLoop;
//   setIsLoop(newLoop);
// };


// const alternetive =()=>{
//     const audio = audioRef.current;
//   if (!audio || !curr) return;

//   const currIdx = songData.findIndex(
//     song => song.id === curr.id
//   );

//   if (currIdx === -1) return;

//   const nextIndex = (currIdx + 1) % songData.length;
//   const nextSong = songData[nextIndex];

//   audio.src = nextSong.song;
//   audio.currentTime = 0;
//   audio.play();

//   setCurr(nextSong);
  


// }
// useEffect(() => {
//   const audio = audioRef.current;

//   if (!audio) return;

//   audio.onended = () => {
//     alternetive();
//   };

//   return () => {
//     audio.onended = null;
//   };
// }, [curr]);


// const changeVolume = (e) => {
//   const rect = e.currentTarget.getBoundingClientRect();

//   const clickPosition = e.clientX - rect.left;
//   const volume = clickPosition / rect.width;

//   audioRef.current.volume = volume;
//   setVolume(volume);
// };


//   return (
//     <AudioContext.Provider
//       value={{
//         play,
//         togglePlay,
//         playsong,
//         curr,
//         length,
//         seekSong,
//         backword,
//         forword,
//         setCurr,
//         isLoop,
//         loop,
//         alternetive,
//         changeVolume,
//         volume
//       }}
//     >
//       {children}
//     </AudioContext.Provider>
//   );
// }
