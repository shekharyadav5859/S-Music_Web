import React, { useRef, useState } from 'react'
import { AudioContext } from './AudioContext';

export default function Provider({children}) {
const[curr , setcurr] = useState(null);
const[play ,setplay] = useState(false);
const audioRef = useRef(null);

const playsong = (song)=>{
if(!song) return


if(audioRef.current){
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
}

audioRef.current  = new Audio();
audioRef.current.src = song.song;
setcurr(song);
audioRef.current.play()
.then(()=>setplay(true))
.catch((error)=>console.log(error));

audioRef.current.onended =()=>setplay(false);
}

const togglePlay =()=>{
    if(!audioRef.current)return;

    let audio = audioRef.current;

    if(audio.paused){
        audio.play()
        .then(()=>setplay(true))
        .catch((erorr)=>console.log(erorr));
    }
    else{
        audio.pause();
        setplay(false);
    }
}


  return (
    <AudioContext.Provider
value={{
    play ,
    togglePlay,
    playsong,
    curr
}}
>
{children}
   </AudioContext.Provider>
  )
}
